export interface ReportMeasurement {
  id: number;
  systolic: number;
  diastolic: number;
  pulse: number;
  date: string; 
  time: string; 
}

export interface ReportLabels {
  title: string;
  generatedBy: string;
  headerTime: string;
  headerPressure: string;
  headerPulse: string;
  footer: string;
}

export const generateReportHtml = (measurements: ReportMeasurement[], labels: ReportLabels) => {
  let rows = '';
  let lastDate = '';
    
  measurements.forEach(m => {
    const currentDate = m.date;
    const currentTime = m.time;

    if (currentDate !== lastDate) {
      rows += `
      <tr class="day-header-row">
          <td colspan="3" class="day-header">📅 ${currentDate}</td>
      </tr>
      `;
      lastDate = currentDate;
    }
    rows += `
      <tr>
        <td>${currentTime}</td>
        <td><strong>${m.systolic}/${m.diastolic}</strong></td>
        <td>${m.pulse}</td>
      </tr>
    `;
  });

  return `
    <html>
      <head>
        <style>
          body { font-family: 'Helvetica', sans-serif; padding: 20px; color: #111827; }
          h1 { color: #2563EB; text-align: center; margin-bottom: 5px; }
          p { text-align: center; color: #6B7280; font-size: 12px; margin-top: 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #EFF6FF; color: #1E40AF; padding: 12px; text-align: left; border-bottom: 2px solid #2563EB; }
          td { border-bottom: 1px solid #E5E7EB; padding: 10px; color: #374151; }
          
          .day-header-row td { border-top: 2px solid #9CA3AF; border-bottom: 1px solid #E5E7EB; }
          .day-header { 
            background-color: #F3F4F6; 
            font-weight: bold; 
            color: #111827; 
            padding-top: 15px; 
            padding-bottom: 15px;
          }
          .footer { margin-top: 30px; text-align: center; color: #9CA3AF; font-size: 10px; border-top: 1px solid #E5E7EB; padding-top: 10px; }
        </style>
      </head>
      <body>
        <h1>${labels.title}</h1>
        <p>${labels.generatedBy}</p>
        
        <table>
          <tr>
            <th>${labels.headerTime}</th>
            <th>${labels.headerPressure}</th>
            <th>${labels.headerPulse}</th>
          </tr>
          <tbody>
            ${rows}
          </tbody>
        </table>

        <div class="footer">
          ${labels.footer}
        </div>
      </body>
    </html>
  `;
};