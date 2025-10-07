import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../src/lib/store'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  const { id } = req.query
  if(!id || Array.isArray(id)) return res.status(400).end()
  const cv = db.getById(id)
  if(!cv) return res.status(404).end()
  res.status(200).json(cv)
}
