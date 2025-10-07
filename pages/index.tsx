import Link from 'next/link'

export default function Home(){
  return (
    <div className="container">
      <h1>CV Sistemi</h1>
      <div className="card">
        <p>Hoş geldiniz. CV oluşturmak veya var olanları yönetmek için aşağıyı kullanın.</p>
        <div style={{display:'flex',gap:12}}>
          <Link href="/create-cv"><button className="btn">Yeni CV Oluştur</button></Link>
          <Link href="/my-cvs"><button className="btn" style={{background:'#10b981'}}>CV'lerim</button></Link>
        </div>
      </div>
    </div>
  )
}
