import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end()
  const {title,url} = req.body
  // In gerçek kullanım LinkedIn OAuth + share API gerekli. Burada mock dönüyoruz.
  res.status(200).json({ok:true,shared:{title,url}})
}
