/* ./src/app/common/pdf-recovery.service.ts */
import {Injectable} from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfRecoveryService {

  async generateAndDownload(profileName: string): Promise<void> {
    const element = document.getElementById('secbase-recovery-template');

    if (!element) {
      throw new Error('Recovery template DOM node not found.');
    }

    // Capture the DOM node. Scale: 2 ensures high DPI/Retina clarity in the PDF.
    const canvas = await html2canvas(element, {scale: 2, useCORS: true, logging: false});

    const imgDate = canvas.toDataURL('image/png');

    // Create A4 sized PDF matching our CSS dimensions
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [800, 1131]});

    // Embed the image filling the entire page
    pdf.addImage(imgDate, 'PNG', 0, 0, 800, 1131);

    // Trigger local browser download
    const fileName = `secbase-recovery-${profileName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    pdf.save(fileName);
  }
}
