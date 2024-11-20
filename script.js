document.getElementById("download-btn").addEventListener("click", () => {
  const resume = document.getElementById("resume");
  const opt = {
    filename: "Santosh_Resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] },
  };
  html2pdf().set(opt).from(resume).save();
});
