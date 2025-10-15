import type { VercelRequest, VercelResponse } from '@vercel/node'

// Proxy para a API do RD Station
// Front chama /api/rdstation/... e esta função chama o RD Station, evitando CORS

const RD_BASE = 'https://crm.rdstation.com/api/v1'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const token = process.env.VITE_RD_TOKEN || ''
    if (!token) {
      res.status(500).json({ error: 'Missing VITE_RD_TOKEN environment variable' })
      return
    }

    // Monta a url downstream removendo o prefixo /api/rdstation
    const downstreamPath = (req.url || '').replace(/^\/api\/rdstation/, '') || ''
    const sep = downstreamPath.includes('?') ? '&' : '?'
    const url = `${RD_BASE}${downstreamPath}${sep}token=${token}`

    const headers: Record<string, string> = {
      accept: 'application/json',
    }
    const contentType = req.headers['content-type']
    if (contentType) headers['content-type'] = String(contentType)

    const upstream = await fetch(url, {
      method: req.method,
      headers,
      body:
        req.method && !['GET', 'HEAD'].includes(req.method)
          ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body))
          : undefined,
    })

    const text = await upstream.text()
    res.status(upstream.status)
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json')
    // Permitir CORS (se for usado diretamente)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.send(text)
  } catch (err: any) {
    res.status(500).json({ error: 'Proxy error', detail: String(err?.message || err) })
  }
}


