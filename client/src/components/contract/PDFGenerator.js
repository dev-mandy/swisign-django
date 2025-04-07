import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const generatePDF = async (elementId) => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  try {
    // 스크롤된 내용까지 모두 캡처하기 위한 옵션 설정
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      scrollY: -window.scrollY,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    });

    // A4 사이즈 정의 (pt 단위)
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // 캔버스 비율 계산하여 높이 설정
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;
    
    // 첫 페이지 추가
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    
    // 여러 페이지가 필요한 경우 처리
    heightLeft -= pdf.internal.pageSize.getHeight();
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }
    
    // PDF 파일 저장
    pdf.save('contract.pdf');
  } catch (error) {
    console.error('PDF 생성 중 오류 발생:', error);
  }
};

export default generatePDF;
