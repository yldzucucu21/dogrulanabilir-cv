import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../src/lib/store'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
    const cats = db.getCategories()
    return res.status(200).json(cats)
  }

  if(req.method === 'POST'){
    const { name } = req.body || {}
    if(!name) return res.status(400).json({ error: 'name required' })
    const cats = db.addCategory(name)
    return res.status(201).json(cats)
  }

  res.setHeader('Allow', ['GET','POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
