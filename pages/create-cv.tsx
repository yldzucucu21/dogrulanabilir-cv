import { useState } from 'react'
import CvDocument from '../src/components/CvDocument'
import DraggableList from '../src/components/DraggableList'
import { saveCv } from '../src/lib/api'
import { exportAsImage, exportAsPdf } from '../src/lib/export'

export default function CreateCv(){
  const [profile,setProfile] = useState({
    fullName: 'İsim Soyisim',
    title: 'Pozisyon',
    contact: 'Şehir • e-posta • telefon',
    photo: '',
    about: '',
    linkedin: '',
    github: '',
    portfolio: ''
  })

  // Sertifika dosyası yükleme
  const [certificateFile, setCertificateFile] = useState<{name:string, url:string, type:string}|null>(null)
  const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCertificateFile({
          name: file.name,
          url: reader.result as string,
          type: file.type
        })
      }
      reader.readAsDataURL(file)
    }
  }
  const removeCertificate = () => setCertificateFile(null)

  const [items,setItems] = useState([
    {id:'0',title:'Kariyer Hedefi',description:'Kariyer hedeflerinizi ve kendinizi tanıtan kısa bir yazı ekleyin.',category:'Kariyer Hedefi / Hakkımda'},
    {id:'1',title:'Kişisel Bilgiler',description:'Açıklama ekleyebilirsiniz.',category:'Kişisel Bilgiler'},
    {id:'2',title:'Eğitim',description:'Açıklama ekleyebilirsiniz.',category:'Eğitim Bilgileri'},
    {id:'3',title:'İş Deneyimi',description:'Açıklama ekleyebilirsiniz.',category:'Deneyim / İş Deneyimi'},
    {id:'4',title:'Yetenekler',description:'Açıklama ekleyebilirsiniz.',category:'Yetenekler / Teknik Beceriler'}
  ])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile({...profile, photo: reader.result as string})
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setProfile({...profile, photo: ''})
  }

  const onSave = async ()=>{
    const fullProfile = certificateFile ? {...profile, certificateFile} : profile
    const res = await saveCv({title:profile.fullName,profile: fullProfile,items})
    alert('Kaydedildi: '+res.id)
  }

  const handleExportPdf = async () => {
    // CV kaydedilmişse ID'sini kullan, yoksa geçici ID oluştur
    let cvId = 'temp-' + Date.now()
    try {
      const fullProfile = certificateFile ? {...profile, certificateFile} : profile
      const res = await saveCv({title:profile.fullName,profile: fullProfile,items})
      cvId = res.id
    } catch(e) {
      console.log('CV kaydedilemedi, geçici ID kullanılıyor')
    }
    await exportAsPdf('cv-preview-root', cvId)
  }

  return (
    <div className="container">
      <h2>CV Oluştur</h2>
      <div className="row">
        <div className="col card">
          <h3>Profil</h3>
          
          <div style={{marginBottom:16}}>
            <label style={{display:'block',marginBottom:8,fontWeight:600,fontSize:14}}>Profil Fotoğrafı</label>
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              {profile.photo ? (
                <div style={{position:'relative'}}>
                  <img 
                    src={profile.photo} 
                    alt="Profil" 
                    style={{
                      width:120,
                      height:120,
                      borderRadius:'50%',
                      objectFit:'cover',
                      border:'3px solid #e5e7eb',
                      boxShadow:'0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <button 
                    onClick={removePhoto}
                    style={{
                      position:'absolute',
                      top:-8,
                      right:-8,
                      background:'#ef4444',
                      color:'white',
                      border:'none',
                      borderRadius:'50%',
                      width:28,
                      height:28,
                      cursor:'pointer',
                      fontWeight:'bold',
                      fontSize:16,
                      boxShadow:'0 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >×</button>
                </div>
              ) : (
                <div style={{
                  width:120,
                  height:120,
                  borderRadius:'50%',
                  background:'#f3f4f6',
                  border:'2px dashed #9ca3af',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  fontSize:48,
                  color:'#9ca3af'
                }}>👤</div>
              )}
              <div style={{flex:1}}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoUpload}
                  id="photo-upload"
                  style={{display:'none'}}
                />
                <label 
                  htmlFor="photo-upload"
                  className="btn"
                  style={{cursor:'pointer',display:'inline-block'}}
                >
                  {profile.photo ? 'Fotoğrafı Değiştir' : 'Fotoğraf Yükle'}
                </label>
                <p className="muted" style={{marginTop:8,fontSize:12}}>
                  Profesyonel bir fotoğraf seçin (JPG, PNG)
                </p>
              </div>
            </div>
          </div>

          <div style={{display:'grid',gap:8}}>
            <input className="input" placeholder="Ad Soyad" value={profile.fullName} onChange={e=>setProfile({...profile,fullName:e.target.value})} />
            <input className="input" placeholder="Pozisyon / Ünvan" value={profile.title} onChange={e=>setProfile({...profile,title:e.target.value})} />
            <input className="input" placeholder="İletişim (e-posta, telefon, şehir)" value={profile.contact} onChange={e=>setProfile({...profile,contact:e.target.value})} />
            <input className="input" placeholder="LinkedIn bağlantısı (https://...)" value={profile.linkedin} onChange={e=>setProfile({...profile,linkedin:e.target.value})} />
            <input className="input" placeholder="GitHub bağlantısı (https://...)" value={profile.github} onChange={e=>setProfile({...profile,github:e.target.value})} />
            <input className="input" placeholder="Portföy/Website (https://...)" value={profile.portfolio} onChange={e=>setProfile({...profile,portfolio:e.target.value})} />
            <textarea 
              className="input" 
              placeholder="Hakkımda / Kariyer Hedefi (kısa özet)" 
              value={profile.about} 
              onChange={e=>setProfile({...profile,about:e.target.value})}
              rows={3}
            />
          </div>

          <div style={{marginTop:16}}>
            <label style={{display:'block',marginBottom:8,fontWeight:600,fontSize:14}}>Sertifika Dosyası (PDF veya Görsel)</label>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <input type="file" accept="application/pdf,image/*" id="certificate-upload" style={{display:'none'}} onChange={handleCertificateUpload} />
              <label htmlFor="certificate-upload" className="btn" style={{cursor:'pointer',display:'inline-block'}}>Dosya Yükle</label>
              {certificateFile && (
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  {certificateFile.type.startsWith('image') ? (
                    <img src={certificateFile.url} alt="Sertifika" style={{width:60,height:60,objectFit:'cover',borderRadius:6,border:'1px solid #e5e7eb'}} />
                  ) : (
                    <a href={certificateFile.url} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb',fontWeight:500}}>{certificateFile.name}</a>
                  )}
                  <button onClick={removeCertificate} style={{background:'#ef4444',color:'white',border:'none',borderRadius:'50%',width:24,height:24,cursor:'pointer',fontWeight:'bold'}}>×</button>
                </div>
              )}
            </div>
            <p className="muted" style={{marginTop:8,fontSize:12}}>PDF veya görsel formatında sertifika yükleyebilirsiniz.</p>
          </div>

          <h3 style={{marginTop:16}}>Bölümler</h3>
          <DraggableList items={items} onChange={setItems} />

          <div style={{marginTop:12,display:'flex',gap:8,flexWrap:'wrap'}}>
            <button className="btn" onClick={onSave}>Kaydet</button>
            <button className="btn" onClick={handleExportPdf} style={{background:'#dc2626'}}>PDF İndir</button>
            <button className="btn" onClick={()=>exportAsImage('cv-preview-root')} style={{background:'#7c3aed'}}>PNG İndir</button>
          </div>
        </div>

        <div className="col card">
          <h3>Önizleme</h3>
          <div id="cv-preview-root">
            <CvDocument profile={profile} items={items} />
          </div>
          <div style={{marginTop:12}}>
            <button className="btn" onClick={()=>exportAsImage('cv-preview-root')}>Görsel Olarak İndir</button>
            <button className="btn" style={{marginLeft:8}} onClick={()=>exportAsPdf('cv-preview-root')}>PDF Olarak İndir</button>
          </div>
        </div>
      </div>
    </div>
  )
}
