export const readFileFromInput = files => new Promise((resolve, reject) => {
  if (FileReader && files && files.length) {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.readAsDataURL(files[0]);
  } else {
    reject(new Error('No file at all'));
  }
});

export const importCalibrateData = () => new Promise(resolve => {
  const tempInput = document.createElement('input');
  tempInput.type = 'file';
  tempInput.accept = '.text';
  tempInput.onchange = e => {
    const files = e.target.files;
    const fr = new FileReader();
    fr.onload = () => resolve(JSON.parse(fr.result));
    fr.readAsText(files[0]);
  };
  tempInput.click();
});

export const exportCalibrateData = data => {
  const bl = new Blob([JSON.stringify(data)]);
  const tempA = document.createElement('a');
  tempA.href = URL.createObjectURL(bl);
  tempA.download = 'CalibrateData.text';
  tempA.click();
};
