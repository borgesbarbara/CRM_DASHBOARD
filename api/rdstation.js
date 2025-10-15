// Função serverless para proxy da API do RD Station
export default async function handler(req, res) {
  // Habilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const token = process.env.VITE_RD_TOKEN;
    if (!token) {
      console.error('Missing VITE_RD_TOKEN environment variable');
      res.status(500).json({ error: 'Configuration error: missing API token' });
      return;
    }

    // Extrai o path após /api/rdstation
    const { query } = req;
    const pathMatch = req.url.match(/\/api\/rdstation(.*)$/);
    const apiPath = pathMatch ? pathMatch[1] : '';
    
    // Monta a URL para o RD Station
    const baseUrl = 'https://crm.rdstation.com/api/v1';
    const separator = apiPath.includes('?') ? '&' : '?';
    const fullUrl = `${baseUrl}${apiPath}${separator}token=${token}`;
    
    console.log('Proxying request to:', fullUrl.replace(token, '***'));

    // Faz a requisição para o RD Station
    const response = await fetch(fullUrl, {
      method: req.method || 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    
    // Retorna a resposta
    res.status(response.status);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json');
    res.send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Internal proxy error', 
      message: error.message || 'Unknown error'
    });
  }
}