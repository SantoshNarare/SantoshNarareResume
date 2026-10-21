document.getElementById("download-btn").addEventListener("click", async () => {
  const resume = document.getElementById("resume");
  const worker = html2pdf()
    .set({
      filename: "Santosh_Narare_Resume.pdf",
      margin: 0,
      html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(resume);

  const canvas = await worker.toCanvas().get("canvas");
  const pdf = await worker.toPdf().get("pdf");

  // html2pdf slices tall content across pages; replace them with one A4 page
  // and scale the whole resume to fit it.
  pdf.addPage("a4", "portrait");
  while (pdf.internal.getNumberOfPages() > 1) pdf.deletePage(1);

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const ratio = Math.min(pageW / canvas.width, pageH / canvas.height);
  const imgW = canvas.width * ratio;
  const imgH = canvas.height * ratio;
  pdf.addImage(
    canvas.toDataURL("image/jpeg", 0.98),
    "JPEG",
    (pageW - imgW) / 2,
    0,
    imgW,
    imgH
  );
  pdf.save("Santosh_Narare_Resume.pdf");
});
