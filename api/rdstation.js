// Função serverless para proxy da API do RD Station
// Evita problemas de CORS ao fazer chamadas do frontend

const RD_BASE = 'https://crm.rdstation.com/api/v1';

module.exports = async function handler(req, res) {
  try {
    const token = process.env.VITE_RD_TOKEN || '';
    if (!token) {
      res.status(500).json({ error: 'Missing VITE_RD_TOKEN environment variable' });
      return;
    }

    // Monta a URL removendo o prefixo /api/rdstation
    const downstreamPath = (req.url || '').replace(/^\/api\/rdstation/, '') || '';
    const sep = downstreamPath.includes('?') ? '&' : '?';
    const url = `${RD_BASE}${downstreamPath}${sep}token=${token}`;

    // Configura headers
    const headers = { 
      'accept': 'application/json' 
    };
    
    const contentType = req.headers['content-type'];
    if (contentType) {
      headers['content-type'] = String(contentType);
    }

    // Faz a requisição para o RD Station
    const upstream = await fetch(url, {
      method: req.method || 'GET',
      headers: headers,
      body: (req.method && !['GET', 'HEAD'].includes(req.method))
        ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body))
        : undefined,
    });

    // Retorna a resposta
    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.send(text);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ 
      error: 'Proxy error', 
      detail: String(err && err.message ? err.message : err) 
    });
  }
};