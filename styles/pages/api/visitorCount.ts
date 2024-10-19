import { NextApiRequest, NextApiResponse } from 'next'

let visitorCount = 0

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    visitorCount++
    res.status(200).json({ count: visitorCount })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
