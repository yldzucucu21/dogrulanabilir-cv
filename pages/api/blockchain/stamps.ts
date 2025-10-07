import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../src/lib/store'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
    res.status(200).json(db.getStamps())
    return
  }
  res.status(405).end()
}
