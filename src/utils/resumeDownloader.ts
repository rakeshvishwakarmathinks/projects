import { jsPDF } from 'jspdf';

/**
 * Programmatically generates and initiates the download of Rakesh Vishwakarma's Professional UX Resume as a beautiful, high-fidelity PDF.
 */
export function downloadResume() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4' // A4 is 595.28 x 841.89 pt
  });

  const COL_LEFT_X = 40;
  const COL_RIGHT_X = 165;
  const RIGHT_COL_WIDTH = 390;
  const FULL_WIDTH = 515;
  const TOTAL_HEIGHT = 841.89;

  // Color Palette
  const COLOR_PRIMARY = [15, 23, 42]; // slate-900 (deep charcoal)
  const COLOR_SECONDARY = [51, 65, 85]; // slate-700 (body text)
  const COLOR_MUTED = [100, 116, 139]; // slate-500 (dates, metadata)
  const COLOR_ACCENT = [37, 99, 235]; // blue-600 (links, accents)
  const COLOR_BRAND = [29, 78, 216]; // blue-700 (companies)

  // Typography Settings
  const size_name = 23;
  const size_title = 14;
  const size_section_header = 10.5;
  const size_body_company = 9.5;
  const size_body = 8.5;
  const size_meta = 8;

  // Helper to draw horizontal lines
  function drawDividerLine(y: number) {
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.8);
    doc.line(COL_LEFT_X, y, COL_LEFT_X + FULL_WIDTH, y);
  }

  // Helper to wrap and draw paragraph block
  function drawWrappedText(text: string, x: number, y: number, maxWidth: number, size: number, style: 'normal' | 'bold' | 'oblique' = 'normal', color = COLOR_SECONDARY, spacing = 11.5): number {
    doc.setFont('Helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line: string, i: number) => {
      doc.text(line, x, y + (i * spacing));
    });
    return lines.length * spacing;
  }

  // Helper to draw bullet point list item
  function drawBulletPoint(text: string, x: number, y: number, maxWidth: number, size: number, color = COLOR_SECONDARY, spacing = 11.5): number {
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(size);
    doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.text('•', x, y);

    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(color[0], color[1], color[2]);
    const indent = 10;
    const lines = doc.splitTextToSize(text, maxWidth - indent);
    lines.forEach((line: string, i: number) => {
      doc.text(line, x + indent, y + (i * spacing));
    });
    return lines.length * spacing;
  }

  // ==========================================
  // PAGE 1: HEADER & EXPERIENCE PART 1
  // ==========================================
  
  let y = 50;

  // LEFT Header Details
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_name);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('Rakesh Vishwakarma', COL_LEFT_X, y);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(size_title);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text('Product Design Lead', COL_LEFT_X, y + 17);

  // RIGHT Header Details
  const right_align_x = COL_LEFT_X + FULL_WIDTH;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_meta);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('+91 902-723-2745', right_align_x, y - 8, { align: 'right' });

  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  doc.text('v.raksh777@gmail.com', right_align_x, y + 2, { align: 'right' });

  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  
  // LinkedIn Link (using text + link markup)
  doc.text('LinkedIn', right_align_x, y + 12, { align: 'right' });
  doc.link(right_align_x - 36, y + 5, 36, 10, { url: 'https://www.linkedin.com/in/rakeshvishwakarma95/' });

  // Portfolio Link
  doc.text('Portfolio', right_align_x, y + 22, { align: 'right' });
  doc.link(right_align_x - 36, y + 15, 36, 10, { url: 'https://vraksh.com' });

  y += 40;
  drawDividerLine(y);
  y += 20;

  // SECTION 1: SUMMARY
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_section_header);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('Summary', COL_LEFT_X, y + 1);

  const summaryText = 'Product design lead with 6+ years of experience driving enterprise product direction and AI transformation initiatives. Shaping long-term vision and development through strategic lens across US, European, and Asian markets.';
  y += drawWrappedText(summaryText, COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body_company, 'normal', COLOR_SECONDARY, 13);
  
  y += 12;
  drawDividerLine(y);
  y += 18;

  // SECTION 2: EXPERIENCE
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_section_header);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('Experience', COL_LEFT_X, y);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(size_meta + 0.5);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text('6+ years', COL_LEFT_X, y + 11);

  // MathWorks Role
  let MathWorks_Y = y;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_body_company + 1);
  doc.setTextColor(COLOR_BRAND[0], COLOR_BRAND[1], COLOR_BRAND[2]);
  doc.text('MathWorks', COL_LEFT_X, MathWorks_Y + 14);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_body);
  doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  doc.text('Senior Product Designer', COL_LEFT_X, MathWorks_Y + 27);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(size_meta);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text('April 2022 - Present', COL_LEFT_X, MathWorks_Y + 38);
  doc.text('Bangalore, India', COL_LEFT_X, MathWorks_Y + 48);

  // Right column MathWorks details
  doc.setFont('Helvetica', 'oblique');
  doc.setFontSize(size_body);
  doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  
  const mwIntro = 'MathWorks helps engineers and scientists build and simulate real-world systems.';
  y += drawWrappedText(mwIntro, COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body, 'oblique', COLOR_SECONDARY, 11);
  
  y += 12;
  y += drawWrappedText('Achievements', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body, 'bold', COLOR_PRIMARY, 11);
  y += 3;
  y += drawBulletPoint('Architected the MATLAB App Designer Copilot blueprint, scaling into MATLAB Copilot to serve 5M+ global users; awarded the Clippy Award for Best AI Innovation (2024–25).', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);
  y += 4;
  y += drawBulletPoint('Directed UX strategy for Motor Control portfolio, launching a new flagship no-code Simulink suite for 1.1M+ users; accelerated simulation and catalyzed 80% revenue growth (2024).', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);

  y += 8;
  y += drawWrappedText('Product contributions', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body, 'bold', COLOR_PRIMARY, 11);
  y += 3;
  y += drawBulletPoint('Led the OPC UA Explorer App as a greenfield innovation initiative to transition 130,000+ engineers from legacy industrial protocols to OPC UA standard.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);
  y += 4;
  y += drawBulletPoint('Engineered Claude-powered AI design workflows to standardize design outputs; slashing time-to-MVP by 50% for MATLAB development teams.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);
  y += 4;
  y += drawBulletPoint('Established UX guardrails for the $900M+ MATLAB/Simulink portfolio, unifying product workflows across global engineering teams.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);

  y += 8;
  y += drawWrappedText('Team and community contributions', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body, 'bold', COLOR_PRIMARY, 11);
  y += 3;
  y += drawBulletPoint('Mentoring a distributed team of 24 design and research professionals across three continents (US, Europe, and India).', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);
  y += 4;
  y += drawBulletPoint('Steered the User Connect program, bridging 55 enterprise clients with product teams, securing long-term client commitments and driving product adoption.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);
  y += 4;
  y += drawBulletPoint('Co-led accessibility initiative, training 5,000+ employees with specialized curriculum to foster an inclusive software experience.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);

  y += 18;

  // Dream11 Role
  let Dream11_Y = y;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_body_company + 1);
  doc.setTextColor(COLOR_BRAND[0], COLOR_BRAND[1], COLOR_BRAND[2]);
  doc.text('Dream11', COL_LEFT_X, Dream11_Y + 14);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_body);
  doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  doc.text('Product Designer', COL_LEFT_X, Dream11_Y + 27);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(size_meta);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text('July 2021 - March 2022', COL_LEFT_X, Dream11_Y + 38);
  doc.text('Mumbai, India', COL_LEFT_X, Dream11_Y + 48);

  const d11Intro = 'Dream11 helps sports enthusiasts engage with live matches through real-time fantasy gaming.';
  y += drawWrappedText(d11Intro, COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body, 'oblique', COLOR_SECONDARY, 11);

  y += 12;
  y += drawWrappedText('Achievements', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body, 'bold', COLOR_PRIMARY, 11);
  y += 3;
  y += drawBulletPoint('Defined UX strategy for Leaderboard verticals, shaping the core gameplay experience for 220M+ active users; contributing to $400M in business impact.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);
  y += 4;
  y += drawBulletPoint('Optimized in-game user retention by 37% through a one-click player substitution feature, streamlining the team management workflow.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);

  y += 8;
  y += drawWrappedText('Product contributions', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body, 'bold', COLOR_PRIMARY, 11);
  y += 3;
  y += drawBulletPoint('Led product roadmap for the React Native migration; overhauled cross-platform design systems to embed systemic compliance.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);
  y += 4;
  y += drawBulletPoint('Governed the Leaderboard design system strategy, streamlining execution workflows to enable high-velocity engineering feature deployment.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);

  y += 8;
  y += drawWrappedText('Team and community contributions', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body, 'bold', COLOR_PRIMARY, 11);
  y += 3;
  y += drawBulletPoint('Institutionalized the studio\'s mentorship and critique rituals, driving a high-growth design culture to raise collective execution standards.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);

  // Footer - Page 1
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_meta);
  doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.text('2 more on LinkedIn \u2192', COL_LEFT_X, TOTAL_HEIGHT - 35);
  doc.link(COL_LEFT_X, TOTAL_HEIGHT - 44, 110, 12, { url: 'https://www.linkedin.com/in/rakeshvishwakarma95/' });

  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text('Page 1 / 2', COL_LEFT_X + FULL_WIDTH, TOTAL_HEIGHT - 35, { align: 'right' });


  // ==========================================
  // PAGE 2: UPPER HEADER & EXPERIENCE CONTINUOUS & DETAILS
  // ==========================================
  doc.addPage();
  y = 48;

  // Running Header Page 2
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text('Rakesh Vishwakarma  \u2022  Product Design Lead', COL_LEFT_X, y);
  doc.text('+91 902-723-2745  \u2022  v.raksh777@gmail.com', COL_LEFT_X + FULL_WIDTH, y, { align: 'right' });

  y += 8;
  drawDividerLine(y);
  y += 24;

  // HealthPole Role
  let HealthPole_Y = y;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_body_company + 1);
  doc.setTextColor(COLOR_BRAND[0], COLOR_BRAND[1], COLOR_BRAND[2]);
  doc.text('HealthPole', COL_LEFT_X, HealthPole_Y + 14);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_body);
  doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  doc.text('Product Designer', COL_LEFT_X, HealthPole_Y + 27);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(size_meta);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text('April 2021 - June 2021', COL_LEFT_X, HealthPole_Y + 38);
  doc.text('Pune, India', COL_LEFT_X, HealthPole_Y + 48);

  const hpIntro = 'HealthPole helps medical and pharma providers integrate and scale clinical networks.';
  y += drawWrappedText(hpIntro, COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body, 'oblique', COLOR_SECONDARY, 11);

  y += 12;
  y += drawBulletPoint('Led zero-to-one UX for three mobile and two web apps; established core interaction guidelines and monetization strategies for Indian Doctors Network App.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);
  y += 4;
  y += drawBulletPoint('Architected core marketplace experiences for doctors, clinics, and pharma partners; unified multi-stakeholder transactional workflows.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);
  y += 4;
  y += drawBulletPoint('Standardized the multi-product design blueprint, optimizing development workflows to maximize engineering throughput and velocity.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);

  y += 18;

  // GMetri Role
  let GMetri_Y = y;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_body_company + 1);
  doc.setTextColor(COLOR_BRAND[0], COLOR_BRAND[1], COLOR_BRAND[2]);
  doc.text('GMetri', COL_LEFT_X, GMetri_Y + 14);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_body);
  doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  doc.text('UX Fellow', COL_LEFT_X, GMetri_Y + 27);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(size_meta);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text('Jan 2020 - April 2020', COL_LEFT_X, GMetri_Y + 38);
  doc.text('Bangalore, India', COL_LEFT_X, GMetri_Y + 48);

  const gmetriIntro = 'GMetri is a no-code metaverse platform building immersive spatial enterprise experiences.';
  y += drawWrappedText(gmetriIntro, COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body, 'oblique', COLOR_SECONDARY, 11);

  y += 12;
  y += drawBulletPoint('Architected a content repository framework to streamline 3D asset management and simplify spatial authoring workflows for creators.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);
  y += 4;
  y += drawBulletPoint('Designed immersive 360\u00B0 VR training ecosystems, optimizing interaction models to elevate user learning retention from 40% to 95%.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);
  y += 4;
  y += drawBulletPoint('Developed gamified VR modules for e-commerce product demonstrations to increase user engagement and conversion.', COL_RIGHT_X, y, RIGHT_COL_WIDTH, size_body);

  y += 24;
  drawDividerLine(y);
  y += 20;

  // TWO COLUMN GRID BOTTOM: Education (Left) & Additional Info (Right)
  const COL_E_WIDTH = 230;
  const COL_I_WIDTH = 250;
  const COL_I_X = COL_LEFT_X + COL_E_WIDTH + 35;

  let y_grid = y;
  let y_left = y_grid;
  let y_right = y_grid;

  // Left Column: Education
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_section_header);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('Education', COL_LEFT_X, y_left);
  y_left += 16;

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_body);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('M.Des in User Experience', COL_LEFT_X, y_left);
  y_left += 11;

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(size_body - 0.5);
  doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  y_left += drawWrappedText('National Institute of Fashion Technology,\nBangalore, India, 2018-2020', COL_LEFT_X, y_left, COL_E_WIDTH, size_body - 0.5, 'normal', COLOR_SECONDARY, 10.5);
  
  y_left += 14;

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_body);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('B. Tech in Electrical and Electronics Engineering', COL_LEFT_X, y_left);
  y_left += 11;

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(size_body - 0.5);
  doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
  y_left += drawWrappedText('College of Engineering Roorkee University,\nRoorkee, India, 2012\u20132016', COL_LEFT_X, y_left, COL_E_WIDTH, size_body - 0.5, 'normal', COLOR_SECONDARY, 10.5);


  // Right Column: Additional Information
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_section_header);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('Additional information', COL_I_X, y_right);
  y_right += 16;

  // Publications
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_meta + 0.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('Publications', COL_I_X, y_right);
  y_right += 11;

  y_right += drawBulletPoint('Co-design of Physical Spaces with Neurodivergent Individuals \u2013 Springer, 2024', COL_I_X, y_right, COL_I_WIDTH, size_body - 0.5, COLOR_SECONDARY, 10);
  y_right += 2;
  y_right += drawBulletPoint('Stability Analysis of Inverted Pendulum \u2013 IJETR, 2016', COL_I_X, y_right, COL_I_WIDTH, size_body - 0.5, COLOR_SECONDARY, 10);
  y_right += 12;

  // Certifications
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_meta + 0.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('Certifications', COL_I_X, y_right);
  y_right += 11;

  y_right += drawBulletPoint('IBM, Generative AI: Prompt Engineering Basics', COL_I_X, y_right, COL_I_WIDTH, size_body - 0.5, COLOR_SECONDARY, 10);
  y_right += 2;
  y_right += drawBulletPoint('IBM, Generative AI: Introduction and Applications', COL_I_X, y_right, COL_I_WIDTH, size_body - 0.5, COLOR_SECONDARY, 10);
  y_right += 2;
  y_right += drawBulletPoint('IDF, Accessibility: How To Design For All', COL_I_X, y_right, COL_I_WIDTH, size_body - 0.5, COLOR_SECONDARY, 10);
  y_right += 12;

  // Live Products
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(size_meta + 0.5);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text('Live Products', COL_I_X, y_right);
  y_right += 11;

  const liveProducts = [
    'OPC UA Explorer, 2026',
    'Motor Characteristic Analyzer, 2025',
    'Motor Parameter Estimator, 2024',
    'Motor Hardware Configurator, 2024',
    'MATLAB Sonify, 2024',
    'IO Device Builder, 2023',
    'Dream11 Leaderboards, 2022'
  ];

  liveProducts.forEach((prod) => {
    y_right += drawBulletPoint(prod, COL_I_X, y_right, COL_I_WIDTH, size_body - 0.5, COLOR_SECONDARY, 10);
    y_right += 1.5;
  });

  // Footer - Page 2
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(size_meta);
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text('Page 2 / 2', COL_LEFT_X + FULL_WIDTH, TOTAL_HEIGHT - 35, { align: 'right' });

  // Initiate PDF download
  doc.save('Rakesh_Vishwakarma_Resume.pdf');
}
