import { stampBlockchain } from '../lib/api'

export default function BlockchainStamp({payload}:{payload:any}){
  async function onStamp(){
    const res = await stampBlockchain(payload)
    alert('Blockchain Damgası Oluşturuldu!\n\nDamga ID (Hash):\n' + res.id + '\n\nBu kodu kopyalayın ve /verify sayfasında doğrulayabilirsiniz.')
  }
  return <button className="btn" onClick={onStamp} style={{background:'#f59e0b'}}>Blockchain Damgala</button>
}
