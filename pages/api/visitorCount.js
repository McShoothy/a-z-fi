let count = 0;

export default function handler(req, res) {
  if (req.method === 'POST') {
    count++;
  }
  res.status(200).json({ count });
}
