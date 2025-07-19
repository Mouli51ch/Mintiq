import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(process.cwd(), 'nftTxMap.json');

function loadMap() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch {}
  return {};
}

function saveMap(map) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(map, null, 2), 'utf-8');
}

let nftTxMap = loadMap();

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { tokenId, transactionHash } = req.body;
    nftTxMap[tokenId] = transactionHash;
    saveMap(nftTxMap);
    res.status(200).json({ success: true });
  } else if (req.method === 'GET') {
    const { tokenId } = req.query;
    res.status(200).json({ transactionHash: nftTxMap[tokenId] || null });
  } else {
    res.status(405).end();
  }
} 