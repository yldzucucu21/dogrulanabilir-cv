import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Verify(){
  const router = useRouter()
  const [verifyCode, setVerifyCode] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (router.query.code) {
      setVerifyCode(router.query.code as string)
    }
  }, [router.query.code])

  async function handleVerifyCv(){
    if(!verifyCode.trim()) return alert('Lütfen doğrulama kodunu girin')
    setLoading(true)
    try {
      // CV-XXX formatından sadece ID'yi al
      const cvId = verifyCode.replace(/^CV-/i, '').toLowerCase()
      
      const res = await fetch(`/api/cvs/${cvId}`)
      if(res.ok) {
        const cv = await res.json()
        setResult({success: true, cv})
      } else {
        setResult({error:'CV bulunamadı'})
      }
    } catch(e){
      setResult({error:'Hata oluştu'})
    }
    setLoading(false)
  }

  async function handleVerifyStamp(){
    if(!verifyCode.trim()) return alert('Lütfen damga kodunu girin')
    setLoading(true)
    try {
      const res = await fetch('/api/blockchain/stamps')
      const stamps = await res.json()
      const found = stamps.find((s:any)=>s.id === verifyCode.trim())
      if(found) {
        setResult({success: true, stamp: found})
      } else {
        setResult({error:'Damga bulunamadı'})
      }
    } catch(e){
      setResult({error:'Hata oluştu'})
    }
    setLoading(false)
  }

  return (
    <div className="container">
      <h2>CV Doğrulama Sistemi</h2>
      <div className="card">
        <p className="muted">CV doğrulama kodunu veya blockchain damga kodunu girerek CV'nin doğruluğunu kontrol edin.</p>
        
        <div style={{display:'grid',gap:12,marginTop:16}}>
          <input 
            className="input" 
            placeholder="Doğrulama kodu (örn: CV-ABC123 veya damga hash'i)" 
            value={verifyCode}
            onChange={e=>setVerifyCode(e.target.value)}
          />
          <div style={{display:'flex',gap:8}}>
            <button className="btn" onClick={handleVerifyCv} disabled={loading} style={{flex:1,background:'#3b82f6'}}>
              {loading ? 'Doğrulanıyor...' : 'CV Doğrula'}
            </button>
            <button className="btn" onClick={handleVerifyStamp} disabled={loading} style={{flex:1,background:'#f59e0b'}}>
              {loading ? 'Doğrulanıyor...' : 'Damga Doğrula'}
            </button>
          </div>
        </div>

        {result && result.success && result.cv && (
          <div style={{marginTop:20,padding:16,background:'#d1fae5',borderRadius:8,border:'2px solid #10b981'}}>
            <h3 style={{color:'#047857',margin:0}}>✅ Bu CV Doğrulandı ve Sistemimizde Kayıtlıdır</h3>
            <div style={{marginTop:12}}>
              <div style={{padding:12,background:'white',borderRadius:6}}>
                <div><strong>Adı Soyadı:</strong> {result.cv.profile?.fullName || 'Belirtilmemiş'}</div>
                <div style={{marginTop:6}}><strong>Pozisyon:</strong> {result.cv.profile?.title || 'Belirtilmemiş'}</div>
                <div style={{marginTop:6}}><strong>CV ID:</strong> <code>{result.cv.id}</code></div>
                <div style={{marginTop:6}}><strong>Bölüm Sayısı:</strong> {result.cv.items?.length || 0}</div>
                {result.cv.stamps && result.cv.stamps.length > 0 && (
                  <div style={{marginTop:6}}><strong>Blockchain Damgaları:</strong> {result.cv.stamps.length} adet</div>
                )}
              </div>
              <div style={{marginTop:12,padding:8,background:'#ecfdf5',borderRadius:4}}>
                <strong style={{color:'#047857',fontSize:12}}>✓ Bu CV dijital olarak doğrulanmıştır ve güvenilirdir.</strong>
              </div>
            </div>
          </div>
        )}

        {result && result.success && result.stamp && (
          <div style={{marginTop:20,padding:16,background:'#d1fae5',borderRadius:8,border:'2px solid #10b981'}}>
            <h3 style={{color:'#047857',margin:0}}>✅ Bu CV Blockchain'de Damgalıdır</h3>
            <div style={{marginTop:12}}>
              <div><strong>Damga Tarihi:</strong> {new Date(result.stamp.timestamp).toLocaleString('tr-TR')}</div>
              <div style={{marginTop:8}}><strong>Damga Hash:</strong> <code style={{fontSize:11}}>{result.stamp.id}</code></div>
              <div style={{marginTop:12,padding:12,background:'white',borderRadius:6}}>
                <strong>CV Bilgileri:</strong>
                <pre style={{marginTop:8,fontSize:12}}>{JSON.stringify(result.stamp.payload, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}

        {result && result.error && (
          <div style={{marginTop:20,padding:16,background:'#fee2e2',borderRadius:8,border:'2px solid #dc2626'}}>
            <h3 style={{color:'#b91c1c',margin:0}}>❌ {result.error}</h3>
            <p className="muted" style={{marginTop:8}}>Bu doğrulama kodu veritabanında bulunamadı. Lütfen doğru kodu girdiğinizden emin olun.</p>
          </div>
        )}

        <div style={{marginTop:24,padding:16,background:'#f9fafb',borderRadius:8,border:'1px solid #e5e7eb'}}>
          <h4 style={{margin:'0 0 12px 0',fontSize:14,fontWeight:600}}>Nasıl Doğrulama Yaparım?</h4>
          <ul style={{margin:0,paddingLeft:20,fontSize:13,color:'#6b7280',lineHeight:1.8}}>
            <li>PDF CV'nizin sağ alt köşesinde bulunan doğrulama kodunu (CV-XXX) kopyalayın</li>
            <li>Yukarıdaki alana yapıştırın ve "CV Doğrula" butonuna tıklayın</li>
            <li>Blockchain damga doğrulaması için damga hash'ini girip "Damga Doğrula" seçin</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
