export const fetcher = (url:string) => fetch(url).then(r=>r.json())

export async function saveCv(body:any){
  const res = await fetch('/api/cvs',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)})
  return res.json()
}

export async function stampBlockchain(payload:any){
  const res = await fetch('/api/blockchain/stamp',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)})
  return res.json()
}

export async function shareLinkedin(data:any){
  const res = await fetch('/api/linkedin/share',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(data)})
  return res.json()
}
