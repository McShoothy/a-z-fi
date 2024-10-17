import { NextApiRequest, NextApiResponse } from 'next'
import { Poster } from '@/types'

const posters: Poster[] = [
  {
    id: 1,
    title: 'Retro Web',
    description: 'A poster celebrating the early days of the web',
    imageUrl: '/images/retro-web-poster.jpg',
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(posters)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
