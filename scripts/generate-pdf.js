import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

async function generatePdf() {
  const pdfDoc = await PDFDocument.create();
  
  // Standard A4 dimensions in points (72 points per inch)
  const a4Width = 595.28;
  const a4Height = 841.89;

  const page1ImagePath = path.join(process.cwd(), 'public', 'admission-form-page-1.jpg');
  const page2ImagePath = path.join(process.cwd(), 'public', 'admission-form-page-2.jpg');

  const page1Bytes = fs.readFileSync(page1ImagePath);
  const page2Bytes = fs.readFileSync(page2ImagePath);

  const page1Image = await pdfDoc.embedJpg(page1Bytes);
  const page2Image = await pdfDoc.embedJpg(page2Bytes);

  // Page 1
  const page1 = pdfDoc.addPage([a4Width, a4Height]);
  page1.drawImage(page1Image, {
    x: 0,
    y: 0,
    width: a4Width,
    height: a4Height,
  });

  // Page 2
  const page2 = pdfDoc.addPage([a4Width, a4Height]);
  page2.drawImage(page2Image, {
    x: 0,
    y: 0,
    width: a4Width,
    height: a4Height,
  });

  pdfDoc.setTitle('Phikiswayo Primary School Admission Application Form');
  pdfDoc.setAuthor('Phikiswayo Primary School');
  pdfDoc.setSubject('Official Admission Application Form Grades R - 7');
  pdfDoc.setKeywords(['admission', 'phikiswayo', 'primary school', 'application', 'grades r-7', 'ntuzuma']);
  pdfDoc.setProducer('Phikiswayo Primary School Administration');
  pdfDoc.setCreator('Phikiswayo Primary School');

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(process.cwd(), 'public', 'admission-form.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Successfully generated PDF at ${outputPath} (${(pdfBytes.length / 1024).toFixed(1)} KB)`);
}

generatePdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
