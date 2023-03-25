export default async function handler(req, res) {

    const owner = req.query.owner;

    const url = `https://nftmintapi-production.up.railway.app/api/ERC721Transfers?owner=${owner}`;
  
    try {
      const response = await fetch(url);
  
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  
      const data = await response.json();
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  