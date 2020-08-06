import Papa from 'papaparse';

export default () => new Promise((resolve, reject) => {
  const fileInput = document.createElement('input');
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('accept', '.txt'); // parser auto-detects delimiter
  fileInput.onchange = e => {
    const file = e.target.files[0];
    const fr = new FileReader();
    fr.onload = function (evt){
      resolve(evt.target.result);
    };
    fr.readAsText(file);
  };
  document.body.appendChild(fileInput);
  fileInput.click();
});
