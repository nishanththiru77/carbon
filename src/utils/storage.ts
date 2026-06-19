export const saveReport = (report: any) => {
  const reports = getReports();
  const newReport = {
    ...report,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  localStorage.setItem('carbonWise_reports', JSON.stringify([newReport, ...reports]));
  return newReport;
};

export const getReports = () => {
  const reports = localStorage.getItem('carbonWise_reports');
  return reports ? JSON.parse(reports) : [];
};

export const clearReports = () => {
  localStorage.removeItem('carbonWise_reports');
};
