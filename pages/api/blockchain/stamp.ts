import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../src/lib/store'
import crypto from 'crypto'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end()
  const { payload, cvId } = req.body
  const hash = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex')
  const stamp = {id: hash, timestamp: Date.now(), payload}
  if(cvId){
    const saved = db.saveStampToCv(cvId, stamp)
    if(!saved) return res.status(404).json({error:'cv not found'})
  } else {
    db.saveStamp(stamp)
  }
  res.status(201).json(stamp)
}
