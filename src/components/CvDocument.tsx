export default function CvDocument({profile,items}:{profile?:any,items:any[]}){
  // Kategorilere göre grupla
  const groupedItems = items.reduce((acc: any, item) => {
    const cat = item.category || 'Diğer'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})

  return (
    <div style={{padding:24,background:'white',borderRadius:8,boxShadow:'0 4px 20px rgba(2,6,23,0.06)'}}>
      <div style={{display:'flex',gap:20,alignItems:'center',marginBottom:16}}>
        {profile?.photo && (
          <img 
            src={profile.photo} 
            alt="Profil Fotoğrafı" 
            style={{
              width:100,
              height:100,
              borderRadius:'50%',
              objectFit:'cover',
              border:'3px solid #e5e7eb',
              boxShadow:'0 2px 8px rgba(0,0,0,0.1)',
              flexShrink:0
            }}
          />
        )}
        <div style={{flex:1}}>
          <h1 style={{margin:0,fontSize:28,fontWeight:700}}>{profile?.fullName || 'İsim Soyisim'}</h1>
          <div style={{fontSize:16,marginTop:6,color:'#4b5563',fontWeight:500}}>{profile?.title || 'Pozisyon'}</div>
          <div style={{fontSize:14,marginTop:4,color:'#6b7280'}}>{profile?.contact || 'İletişim bilgileri'}</div>
          {/* Bağlantılar */}
          {(profile?.linkedin || profile?.github || profile?.portfolio) && (
            <div style={{marginTop:8,display:'flex',gap:12,flexWrap:'wrap'}}>
              {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb',fontWeight:500}}>LinkedIn</a>}
              {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer" style={{color:'#374151',fontWeight:500}}>GitHub</a>}
              {profile.portfolio && <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" style={{color:'#059669',fontWeight:500}}>Portföy</a>}
            </div>
          )}
        </div>
      </div>
      {/* Sertifika dosyası */}
      {profile?.certificateFile && (
        <div style={{marginBottom:16}}>
          <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>Sertifika Dosyası:</div>
          {profile.certificateFile.type && profile.certificateFile.type.startsWith('image') ? (
            <img src={profile.certificateFile.url} alt="Sertifika" style={{width:120,height:120,objectFit:'cover',borderRadius:8,border:'1px solid #e5e7eb'}} />
          ) : (
            <a href={profile.certificateFile.url} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb',fontWeight:500}}>{profile.certificateFile.name || 'Sertifika dosyasını görüntüle'}</a>
          )}
        </div>
      )}

      {profile?.about && (
        <div style={{
          padding:16,
          background:'#f0f9ff',
          borderRadius:8,
          border:'1px solid #bfdbfe',
          marginBottom:16
        }}>
          <h3 style={{margin:'0 0 8px 0',fontSize:14,fontWeight:700,color:'#1e40af',textTransform:'uppercase'}}>Hakkımda</h3>
          <p style={{margin:0,fontSize:14,color:'#1f2937',lineHeight:1.6,whiteSpace:'pre-wrap'}}>
            {profile.about}
          </p>
        </div>
      )}

      <hr style={{margin:'20px 0',border:'none',borderTop:'2px solid #e5e7eb'}} />

      {Object.entries(groupedItems).map(([category, categoryItems]: [string, any]) => (
        <div key={category} style={{marginBottom:20}}>
          <h2 style={{
            margin:'0 0 12px 0',
            fontSize:20,
            fontWeight:700,
            color:'#1f2937',
            borderBottom:'2px solid #3b82f6',
            paddingBottom:6,
            display:'inline-block'
          }}>
            {category}
          </h2>
          {categoryItems.map((it: any) => (
            <div key={it.id} style={{marginTop:12,paddingLeft:8,borderLeft:'3px solid #e5e7eb'}}>
              <h3 style={{margin:'0 0 6px 0',fontSize:16,fontWeight:600,color:'#374151'}}>{it.title}</h3>
              <div style={{fontSize:14,color:'#6b7280',lineHeight:1.6,whiteSpace:'pre-wrap'}}>
                {it.description || 'Açıklama ekleyebilirsiniz.'}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
