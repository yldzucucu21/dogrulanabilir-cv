import { useRouter } from 'next/router'
import useSWR from 'swr'
import CvDocument from '../src/components/CvDocument'
import { exportAsImage, exportAsPdf } from '../src/lib/export'
import BlockchainStamp from '../src/components/BlockchainStamp'
import LinkedinShare from '../src/components/LinkedinShare'
import { fetcher } from '../src/lib/api'

export default function PreviewCv(){
  const router = useRouter()
  const { id } = router.query
  const { data: cv } = useSWR(id ? `/api/cvs/${id}` : null, fetcher)

  if (!cv) return <div className="container"><div className="card">Yükleniyor...</div></div>

  const handlePdfExport = () => {
    exportAsPdf('cv-root', id as string)
  }

  return (
    <div className="container">
      <h2>CV Önizleme: {cv.title}</h2>
      <div className="row">
        <div className="col card" id="cv-root">
          <CvDocument profile={cv.profile} items={cv.items} />
        </div>
        <div className="col card">
          <h3>İşlemler</h3>
          <div style={{display:'grid',gap:8}}>
            <button className="btn" onClick={() => exportAsImage('cv-root')} style={{background:'#7c3aed'}}>PNG İndir</button>
            <button className="btn" onClick={handlePdfExport} style={{background:'#dc2626'}}>PDF İndir (Doğrulama Kodlu)</button>
            <LinkedinShare title={cv.title} url={`http://localhost:3000/preview-cv?id=${id}`} />
            <BlockchainStamp payload={{cvId:id,title:cv.title,profile:cv.profile}} />
          </div>
          <div style={{marginTop:16,padding:12,background:'#f0fdf4',borderRadius:8,border:'1px solid #86efac'}}>
            <div style={{fontSize:12,fontWeight:600,color:'#15803d',marginBottom:4}}>CV Doğrulama Kodu:</div>
            <div style={{fontSize:14,fontWeight:700,color:'#16a34a',fontFamily:'monospace'}}>CV-{String(id).toUpperCase()}</div>
            <div style={{fontSize:11,color:'#15803d',marginTop:4}}>PDF'de otomatik olarak eklenir</div>
          </div>
        </div>
      </div>
    </div>
  )
}
