export default function LinkedinShare({title,url}:{title:string,url:string}){
  function onShare(){
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank')
  }
  return <button className="btn" onClick={onShare} style={{background:'#0077b5'}}>LinkedIn'de Paylaş</button>
}
