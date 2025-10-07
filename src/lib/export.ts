import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportAsImage(elementId:string){
  const el = document.getElementById(elementId)
  if(!el) return
  const canvas = await html2canvas(el)
  const data = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = data
  a.download = 'cv.png'
  a.click()
}

export async function exportAsPdf(elementId:string, cvId?:string){
  const el = document.getElementById(elementId)
  if(!el) return
  
  const canvas = await html2canvas(el, {scale: 2})
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p','pt','a4')
  const imgProps = (pdf as any).getImageProperties(imgData)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
  
  // Ana CV içeriğini ekle
  pdf.addImage(imgData,'PNG',0,0,pdfWidth,pdfHeight)
  
  // Doğrulama kodu ekle (sağ alt köşe)
  if(cvId) {
    const pageHeight = pdf.internal.pageSize.getHeight()
    const verificationCode = `CV-${cvId.toUpperCase()}`
    const verifyUrl = `${window.location.origin}/verify?code=${cvId}`
    
    // Arka plan kutusu
    pdf.setFillColor(249, 250, 251)
    pdf.rect(pdfWidth - 180, pageHeight - 60, 170, 50, 'F')
    
    // Çerçeve
    pdf.setDrawColor(209, 213, 219)
    pdf.setLineWidth(1)
    pdf.rect(pdfWidth - 180, pageHeight - 60, 170, 50)
    
    // Doğrulama kodu metni
    pdf.setFontSize(8)
    pdf.setTextColor(107, 114, 128)
    pdf.text('Doğrulama Kodu:', pdfWidth - 175, pageHeight - 45)
    
    pdf.setFontSize(10)
    pdf.setTextColor(37, 99, 235)
    pdf.setFont('helvetica', 'bold')
    pdf.text(verificationCode, pdfWidth - 175, pageHeight - 32)
    
    pdf.setFontSize(7)
    pdf.setTextColor(107, 114, 128)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Bu CV dijital olarak doğrulanabilir.', pdfWidth - 175, pageHeight - 18)
    
    // QR kod için placeholder (basit dikdörtgen - gerçek QR için kütüphane gerekir)
    pdf.setFillColor(37, 99, 235)
    pdf.setDrawColor(37, 99, 235)
    
    // Mini QR kod simgesi
    const qrSize = 35
    const qrX = pdfWidth - 55
    const qrY = pageHeight - 55
    
    // QR kod pattern (basitleştirilmiş)
    pdf.setFillColor(255, 255, 255)
    pdf.rect(qrX, qrY, qrSize, qrSize, 'F')
    pdf.setFillColor(0, 0, 0)
    pdf.rect(qrX, qrY, qrSize, qrSize)
    
    // QR içi pattern
    for(let i = 0; i < 5; i++) {
      for(let j = 0; j < 5; j++) {
        if((i + j) % 2 === 0) {
          pdf.setFillColor(0, 0, 0)
        } else {
          pdf.setFillColor(255, 255, 255)
        }
        pdf.rect(qrX + 2 + i * 6, qrY + 2 + j * 6, 5, 5, 'F')
      }
    }
  }
  
  pdf.save('cv.pdf')
}
