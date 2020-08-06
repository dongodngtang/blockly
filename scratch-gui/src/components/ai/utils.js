export const getUsbCamera = arr => {
  for (let i = 0; i < arr.length; i++){
    const item = arr[i];
    for (let j = 0; j < item.length; j++){
      if (item[j].toLowerCase().includes('usb')){
        return item;
      }
    }
  }
};

export const orderChange = (arr, usbCamera) => {
  let filterArr;
  const temp = arr;
  temp.forEach((item, index) => {
    item.forEach(element => {
      if (element === usbCamera[1]){
        filterArr = temp.filter((_, ind) => ind !== index);
      }
    });
  });
  const tempArr = [];
  tempArr[0] = usbCamera;
  return tempArr.concat(filterArr);
};
