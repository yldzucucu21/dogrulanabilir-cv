import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../src/lib/store'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
    res.status(200).json(db.getAll())
    return
  }
  if(req.method === 'POST'){
    const body = req.body
    const cv = db.save(body)
    res.status(201).json(cv)
    return
  }
  res.status(405).end()
}
