import useSWR from 'swr'
import Link from 'next/link'
import { fetcher } from '../src/lib/api'

export default function MyCvs(){
  const { data: cvs } = useSWR('/api/cvs', fetcher)
  const { data: stamps } = useSWR('/api/blockchain/stamps', fetcher)

  function isStamped(cvId:string){
    if(!stamps) return false
    return stamps.some((s:any)=>s.payload?.cvId === cvId)
  }

  return (
    <div className="container">
      <h2>CV'lerim</h2>
      <div className="card">
        {(cvs||[]).map((c:any) => (
          <div key={c.id} style={{padding:12,borderBottom:'1px solid #eee',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <strong>{c.title}</strong>
                {isStamped(c.id) && <span style={{background:'#10b981',color:'white',padding:'2px 8px',borderRadius:4,fontSize:12}}>✓ Onaylı</span>}
                {!isStamped(c.id) && <span style={{background:'#6b7280',color:'white',padding:'2px 8px',borderRadius:4,fontSize:12}}>Damgalanmamış</span>}
              </div>
              <div className="muted">{c.items?.length || 0} bölüm</div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <Link href={`/preview-cv?id=${c.id}`}><button className="btn">Önizle</button></Link>
            </div>
          </div>
        ))}
        {(!cvs || cvs.length===0) && <div className="muted" style={{padding:20,textAlign:'center'}}>Henüz CV oluşturmadınız</div>}
      </div>
    </div>
  )
}
