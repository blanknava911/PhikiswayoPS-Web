import { jsPDF } from 'jspdf';

export function generateAdmissionPdf(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4', // 210 x 297 mm
  });

  const margin = 10;
  const pageWidth = 210;
  const contentWidth = pageWidth - margin * 2; // 190 mm

  // Helper drawing functions
  const drawCell = (
    x: number,
    y: number,
    w: number,
    h: number,
    label: string = '',
    sublabel: string = ''
  ) => {
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.rect(x, y, w, h);
    if (label) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(0, 0, 0);
      doc.text(label, x + 1.5, y + 3.8);
    }
    if (sublabel) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(80, 80, 80);
      doc.text(sublabel, x + 1.5, y + 7.5);
    }
  };

  const drawIdBoxes = (x: number, y: number, count: number = 13, boxW: number = 4.2, boxH: number = 5.2) => {
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.25);
    for (let i = 0; i < count; i++) {
      doc.rect(x + i * boxW, y, boxW, boxH);
    }
  };

  const drawCrest = (cx: number, cy: number, scale: number = 0.45) => {
    // Mini vector shield crest for top right
    doc.saveGraphicsState();
    doc.setFillColor(255, 33, 33);
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);

    // Outer shield shape approximation
    const ox = cx;
    const oy = cy;
    doc.rect(ox - 12 * scale, oy - 14 * scale, 24 * scale, 26 * scale, 'FD');
    
    // Cross bar
    doc.setFillColor(0, 0, 0);
    doc.rect(ox - 12 * scale, oy - 2 * scale, 24 * scale, 2.5 * scale, 'F');
    doc.rect(ox - 1.2 * scale, oy - 2 * scale, 2.4 * scale, 14 * scale, 'F');

    // Title inside crest
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4);
    doc.setTextColor(255, 255, 255);
    doc.text("PHIKISWAYO", ox, oy - 6 * scale, { align: 'center' });

    doc.restoreGraphicsState();
  };

  // ==========================================
  // PAGE 1
  // ==========================================
  let y = margin;

  // Title Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text("APPLICATION FOR ADMISSION TO SCHOOL", margin, y + 4);
  
  // Page number
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text("1", pageWidth - margin - 2, y + 4);
  
  // Underline title
  doc.setLineWidth(0.6);
  doc.line(margin, y + 5.5, margin + 85, y + 5.5);

  y += 9;

  // School Details (Left) and School Info (Right)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text("PHIKISWAYO PRIMARY SCHOOL", margin, y + 3.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text("A348 KHANGELA STREET", margin, y + 7.5);
  doc.text("DURBAN", margin, y + 11.5);
  doc.text("4360", margin, y + 15.5);

  // Phone / Fax / Year (Center Column)
  doc.text("Telephone:", margin + 65, y + 4);
  doc.setFont('helvetica', 'bold');
  doc.text("081 509 1460 / 075 - 2402030", margin + 82, y + 4);
  
  doc.setFont('helvetica', 'normal');
  doc.text("Fax:", margin + 65, y + 9);
  doc.text("Year: ________________", margin + 65, y + 15);

  // School crest on right
  drawCrest(pageWidth - margin - 15, y + 8, 1);

  y += 20;

  // Note Box
  doc.setFillColor(248, 248, 248);
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.3);
  doc.rect(margin, y, contentWidth, 8, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.text("Note: ", margin + 2, y + 3.8);
  doc.setFont('helvetica', 'normal');
  const noteText = "This form must be completed in full. All changes to be initialed or signed by parent / guardian. Completing the form does not necessarily mean that the learner has been accepted into the school.";
  doc.text(doc.splitTextToSize(noteText, contentWidth - 14), margin + 11, y + 3.8);

  y += 10;

  // Grade / Accession Row
  drawCell(margin, y, 40, 7.5, "Grade Applied For:");
  drawCell(margin + 40, y, 45, 7.5, "Highest Grade Passed:");
  drawCell(margin + 85, y, 55, 7.5, "Year When Grade was passed:");
  drawCell(margin + 140, y, 50, 7.5, "Accession No:");

  y += 9.5;

  // Surname / Initials / Nick Name
  drawCell(margin, y, 95, 7.5, "Surname:");
  drawCell(margin + 98, y, 37, 7.5, "Initials:");
  drawCell(margin + 138, y, 52, 7.5, "Nick Name:");

  y += 9.5;

  // First Name / Other Names
  drawCell(margin, y, 95, 7.5, "First Name:");
  drawCell(margin + 98, y, 92, 7.5, "Other Names:");

  y += 9.5;

  // Date of Birth & Gender
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.3);
  doc.rect(margin, y, 95, 7.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text("Date Of Birth:", margin + 1.5, y + 4.8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text("YYYY", margin + 24, y + 2.8);
  doc.rect(margin + 23, y + 3.5, 14, 3.2);
  doc.text("MM", margin + 40, y + 2.8);
  doc.rect(margin + 39, y + 3.5, 8, 3.2);
  doc.text("DD", margin + 50, y + 2.8);
  doc.rect(margin + 49, y + 3.5, 8, 3.2);

  // Gender
  doc.rect(margin + 98, y, 92, 7.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text("Gender:", margin + 100, y + 4.8);
  doc.setFont('helvetica', 'normal');
  doc.text("Male:", margin + 120, y + 4.8);
  doc.rect(margin + 130, y + 2, 7, 4);
  doc.text("Female:", margin + 148, y + 4.8);
  doc.rect(margin + 162, y + 2, 7, 4);

  y += 9.5;

  // Race & Identification / Passport
  drawCell(margin, y, 95, 7.5, "Race:");
  doc.rect(margin + 98, y, 92, 7.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text("Identification or Passport No:", margin + 100, y + 4.8);
  drawIdBoxes(margin + 136, y + 1.5, 13, 3.8, 4.8);

  y += 9.5;

  // Country of Residence & Citizenship
  drawCell(margin, y, 95, 7.5, "Country of Residence:");
  drawCell(margin + 98, y, 92, 7.5, "Citizenship:");

  y += 9.5;

  // Province of Residence
  drawCell(margin, y, contentWidth, 7, "If SA, indicate province of residence:");

  y += 9;

  // Physical Address & Home Tel / Emergency Tel / Learner Cell
  drawCell(margin, y, 105, 17, "Physical Address:");
  drawCell(margin + 107, y, 40, 8.5, "Home Telephone:");
  drawCell(margin + 147, y, 43, 8.5, "Emergency Telephone:");
  drawCell(margin + 107, y + 8.5, 83, 8.5, "Learner Cell:");

  y += 18.5;

  // City / Suburb & Learner Email
  drawCell(margin, y, 105, 7.5, "City/Suburb:");
  drawCell(margin + 107, y, 83, 7.5, "Learner Email Address:");

  y += 9.5;

  // Code & Language Preferences
  drawCell(margin, y, 28, 7.5, "Code:");
  drawCell(margin + 30, y, 65, 7.5, "Home Language:");
  drawCell(margin + 98, y, 92, 7.5, "Preferred Language of Instruction:");

  y += 9.5;

  // Boarder & Deceased Parent & Mode of Transport
  doc.rect(margin, y, 45, 7.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text("Boarder:", margin + 1.5, y + 4.8);
  doc.setFont('helvetica', 'normal');
  doc.text("Yes", margin + 18, y + 4.8);
  doc.rect(margin + 25, y + 2, 5, 4);
  doc.text("No", margin + 33, y + 4.8);
  doc.rect(margin + 38, y + 2, 5, 4);

  doc.rect(margin + 48, y, 70, 7.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text("Deceased Parent:", margin + 49.5, y + 3.2);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text("Mother", margin + 50, y + 6.2);
  doc.rect(margin + 60, y + 3.8, 4, 3);
  doc.text("Father", margin + 68, y + 6.2);
  doc.rect(margin + 77, y + 3.8, 4, 3);
  doc.text("Both", margin + 85, y + 6.2);
  doc.rect(margin + 93, y + 3.8, 4, 3);

  drawCell(margin + 120, y, 70, 7.5, "Mode of transport:");

  y += 9.5;

  // Religion & Pre-primary education
  drawCell(margin, y, 55, 7.5, "Religion:");
  doc.rect(margin + 58, y, 132, 7.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.text("For Grade 1 only: Indicate pre-primary education:", margin + 60, y + 4.8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text("None", margin + 122, y + 4.8);
  doc.rect(margin + 130, y + 2.2, 5, 3.8);
  doc.text("Non Formal", margin + 138, y + 4.8);
  doc.rect(margin + 154, y + 2.2, 5, 3.8);
  doc.text("Formal", margin + 162, y + 4.8);
  doc.rect(margin + 173, y + 2.2, 5, 3.8);

  y += 9.5;

  // SECTION: Previous School Information
  doc.setFillColor(235, 235, 235);
  doc.rect(margin, y, contentWidth, 4.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text("Previous School Information", margin + 2, y + 3.2);

  y += 5.5;

  drawCell(margin, y, contentWidth, 7, "Name of Previous School:");
  y += 8;
  drawCell(margin, y, contentWidth, 7, "Previous School Address:");
  y += 8;

  drawCell(margin, y, 28, 6.5, "Code:");
  drawCell(margin + 30, y, 80, 6.5, "Province:");
  drawCell(margin + 112, y, 78, 6.5, "Country:");

  y += 8.5;

  // SECTION: Learner Medical Information
  doc.setFillColor(235, 235, 235);
  doc.rect(margin, y, contentWidth, 4.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text("Learner Medical Information", margin + 2, y + 3.2);

  y += 5.5;

  drawCell(margin, y, 85, 6.5, "Medical Aid Number:");
  drawCell(margin + 87, y, 103, 6.5, "Medical Aid Name:");
  y += 7.5;

  drawCell(margin, y, 85, 6.5, "Medical Aid Main Member:");
  drawCell(margin + 87, y, 103, 6.5, "Doctor Name:");
  y += 7.5;

  drawCell(margin, y, 95, 6.5, "Doctor's Address:");
  drawCell(margin + 97, y, 93, 6.5, "Doctor Telephone Number:");
  y += 7.5;

  drawCell(margin, y, contentWidth, 6.5, "Medical Condition:");
  y += 7.5;

  drawCell(margin, y, contentWidth, 6.5, "Special Problems Requiring Counseling:");
  y += 8;

  // Dexterity & Social Grants
  doc.rect(margin, y, 110, 6.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text("Dexterity of Learner:", margin + 1.5, y + 4.2);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text("Right Handed", margin + 35, y + 4.2);
  doc.rect(margin + 52, y + 1.5, 4, 3.5);
  doc.text("Left Handed", margin + 60, y + 4.2);
  doc.rect(margin + 76, y + 1.5, 4, 3.5);
  doc.text("Ambidextrous", margin + 83, y + 4.2);
  doc.rect(margin + 102, y + 1.5, 4, 3.5);

  // Social Grants
  doc.rect(margin + 112, y, 38, 6.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text("Reg. Social Grant", margin + 113.5, y + 4.2);
  doc.setFont('helvetica', 'normal');
  doc.text("YES", margin + 138, y + 4.2);
  doc.rect(margin + 144, y + 1.5, 3.5, 3.5);
  doc.text("NO", margin + 148, y + 4.2);

  doc.rect(margin + 152, y, 38, 6.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text("Rec. Social Grant", margin + 153.5, y + 4.2);
  doc.setFont('helvetica', 'normal');
  doc.text("YES", margin + 178, y + 4.2);
  doc.rect(margin + 184, y + 1.5, 3.5, 3.5);
  doc.text("NO", margin + 188, y + 4.2);

  y += 8.5;

  // Documents note at bottom of page 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text("If the learner is accepted, the following documents must be submitted to the school:", margin, y + 2.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text("1. Copy of Immunisation Records.", margin, y + 6);
  doc.text("2. Copy of Birth Certificate", margin + 70, y + 6);
  doc.text("3. Progress Report from Previous School", margin, y + 9.5);
  doc.text("4. Transfer Letter from Previous School", margin + 70, y + 9.5);

  // ==========================================
  // PAGE 2
  // ==========================================
  doc.addPage();
  y = margin;

  // Header Page 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text("APPLICATION FOR ADMISSION TO SCHOOL", margin, y + 4);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text("2", pageWidth - margin - 2, y + 4);
  doc.setLineWidth(0.6);
  doc.line(margin, y + 5.5, margin + 85, y + 5.5);

  y += 9;

  // Siblings Section
  doc.setFillColor(235, 235, 235);
  doc.rect(margin, y, contentWidth, 4.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text("Siblings", margin + 2, y + 3.2);

  y += 5.5;

  drawCell(margin, y, 90, 6.5, "Number of other Children at this school:");
  drawCell(margin + 92, y, 98, 6.5, "Position in the family (e.g first):");

  y += 7.5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text("Please supply full names below:", margin + 1, y + 3);
  y += 4;

  // Table header & rows for siblings
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, y, 140, 5, 'FD');
  doc.rect(margin + 140, y, 50, 5, 'FD');
  doc.text("Name:", margin + 2, y + 3.5);
  doc.text("Grade:", margin + 142, y + 3.5);
  y += 5;

  for (let i = 0; i < 3; i++) {
    doc.rect(margin, y, 140, 5.5);
    doc.rect(margin + 140, y, 50, 5.5);
    y += 5.5;
  }

  y += 2;

  // Parent / Guardian Information
  doc.setFillColor(235, 235, 235);
  doc.rect(margin, y, contentWidth, 5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text("Parent / Guardian Information", margin + 2, y + 3.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text("Complete a SEPARATE parent form for each parent living at a different physical address", margin + 50, y + 3.5);

  y += 6;

  // Title / Initials / Surname
  drawCell(margin, y, 30, 7, "Title:");
  drawCell(margin + 32, y, 38, 7, "Initials:");
  drawCell(margin + 72, y, 118, 7, "Surname:");

  y += 8;

  // First Name & Gender
  drawCell(margin, y, 95, 7, "First Name:");
  doc.rect(margin + 98, y, 92, 7);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text("Gender:", margin + 100, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text("Male:", margin + 120, y + 4.5);
  doc.rect(margin + 130, y + 2, 6, 3.5);
  doc.text("Female:", margin + 148, y + 4.5);
  doc.rect(margin + 162, y + 2, 6, 3.5);

  y += 8;

  // Home Language & Race
  drawCell(margin, y, 95, 7, "Home Language:");
  drawCell(margin + 98, y, 92, 7, "Race:");

  y += 8;

  // Identification Number / Passport / Account Payer
  doc.rect(margin, y, 78, 7.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text("Identification Number:", margin + 1.5, y + 4.5);
  drawIdBoxes(margin + 28, y + 1.2, 13, 3.6, 4.8);

  drawCell(margin + 80, y, 50, 7.5, "Or Passport number:");

  doc.rect(margin + 132, y, 58, 7.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text("Account Payer:", margin + 134, y + 4.8);
  doc.setFont('helvetica', 'normal');
  doc.text("Yes", margin + 156, y + 4.8);
  doc.rect(margin + 163, y + 2, 5, 3.8);
  doc.text("No", margin + 172, y + 4.8);
  doc.rect(margin + 178, y + 2, 5, 3.8);

  y += 9;

  // Residential Street Address / City / Code
  drawCell(margin, y, contentWidth, 7, "Residential Street Address:");
  y += 8;
  drawCell(margin, y, 135, 7, "City/Suburb:");
  drawCell(margin + 137, y, 53, 7, "Code:");

  y += 8.5;

  // Occupation & Employer
  drawCell(margin, y, 95, 7, "Occupation:");
  drawCell(margin + 98, y, 92, 7, "Employer:");

  y += 8.5;

  // Spouse Details
  drawCell(margin, y, 95, 7, "Surname of Spouse:");
  drawCell(margin + 98, y, 92, 7, "First Name:");

  y += 8.5;

  drawCell(margin, y, 95, 7.5, "Occupation of Spouse:");
  doc.rect(margin + 98, y, 92, 7.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.text("Learner resides with this parent/s:", margin + 100, y + 4.8);
  doc.setFont('helvetica', 'normal');
  doc.text("Yes", margin + 150, y + 4.8);
  doc.rect(margin + 157, y + 2, 5, 3.8);
  doc.text("No", margin + 167, y + 4.8);
  doc.rect(margin + 173, y + 2, 5, 3.8);

  y += 9;

  // Spouse ID / Relationship / Marital Status
  doc.rect(margin, y, 78, 7.5);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text("Spouse ID Number:", margin + 1.5, y + 4.5);
  drawIdBoxes(margin + 26, y + 1.2, 13, 3.6, 4.8);

  drawCell(margin + 80, y, 55, 7.5, "Relationship to Learner:");
  drawCell(margin + 137, y, 53, 7.5, "Marital status of parent:");

  y += 9;

  // Correspondence Details
  doc.setFillColor(235, 235, 235);
  doc.rect(margin, y, contentWidth, 4.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text("Correspondence Details", margin + 2, y + 3.2);

  y += 5.5;

  drawCell(margin, y, 35, 6.5, "Title:");
  drawCell(margin + 37, y, 153, 6.5, "Surname:");
  y += 7.5;

  drawCell(margin, y, contentWidth, 6.5, "Postal Address:");
  y += 7.5;

  drawCell(margin, y, 135, 6.5, "City/Suburb:");
  drawCell(margin + 137, y, 53, 6.5, "Code:");

  y += 8;

  // Other Contact Details
  doc.setFillColor(235, 235, 235);
  doc.rect(margin, y, contentWidth, 4.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text("Other Contact Details", margin + 2, y + 3.2);

  y += 5.5;

  drawCell(margin, y, 95, 6, "Home Telephone:");
  drawCell(margin + 98, y, 92, 6, "Work Telephone:");
  y += 7;

  drawCell(margin, y, 95, 6, "Fax Number:");
  drawCell(margin + 98, y, 92, 6, "Cell Number:");
  y += 7;

  drawCell(margin, y, 95, 6, "Spouse Work Telephone Number:");
  drawCell(margin + 98, y, 92, 6, "Spouse Cell Number:");
  y += 7;

  drawCell(margin, y, 95, 6, "E-mail Address:");
  drawCell(margin + 98, y, 92, 6, "Spouse E-Mail Address:");

  y += 8;

  // Declaration
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text("I hereby declare that to the best of my knowledge, the above information as supplied is accurate and correct.", margin, y + 3);

  y += 5.5;

  doc.text("Name of Parent / Guardian (Please Print) : ____________________________________________________________________", margin, y + 3);
  y += 5.5;

  doc.text("Signature of Parent / Guardian : _______________________________________________________________________________", margin, y + 3);
  y += 5.5;

  doc.text("Date: ______ / ______ / ____________", margin, y + 3);

  y += 6.5;

  // Office Use Only Table
  doc.setFillColor(235, 235, 235);
  doc.rect(margin, y, contentWidth, 4.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text("Office use only:", margin + 2, y + 3.2);

  y += 5;

  drawCell(margin, y, 45, 6, "1. Date:");
  drawCell(margin + 45, y, 75, 6, "2. Accepted:");
  drawCell(margin + 120, y, 70, 6, "3. Accession Number:");
  y += 6.5;

  drawCell(margin, y, 45, 6, "4. Rejected:");
  drawCell(margin + 45, y, 145, 6, "5. Reason for Rejection:");
  y += 6.5;

  doc.rect(margin, y, contentWidth, 6);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.text("6. Documentation Received:", margin + 1.5, y + 4);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.text("6a Immunisation Record [ ]", margin + 42, y + 4);
  doc.text("6b Birth Certificate [ ]", margin + 80, y + 4);
  doc.text("6c Progress Report [ ]", margin + 115, y + 4);
  doc.text("6d Transfer Letter [ ]", margin + 152, y + 4);

  return doc;
}
