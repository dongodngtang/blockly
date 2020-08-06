import priteLibrary from './sprites.json';

const spriteLibraryContent = [
  {
    name: 'John(1)',
    md5: require('./sprite/john-a.png'),
    rawURL: require('./sprite/john-a.png'),
    type: 'sprite',
    tags: [
      'people'
    ],
    info: [
      0,
      4,
      1
    ],
    json: {
      objName: 'John(1)',
      costumes: [
        {
          costumeName: 'John(1)-a',
          baseLayerID: -1,
          baseLayerMD5: require('./sprite/john-a.png'),
          bitmapResolution: 1
        },
        {
          costumeName: 'John(1)-b',
          baseLayerID: -1,
          baseLayerMD5: require('./sprite/john-b.png'),
          bitmapResolution: 1
        }
      ],
      currentCostumeIndex: 0,
      scratchX: -20,
      scratchY: -38,
      scale: 1,
      direction: 90,
      rotationStyle: 'normal',
      isDraggable: false,
      visible: true,
      spriteInfo: {}
    }
  },
  {
    name: 'John(2)',
    md5: require('./sprite/john-c.png'),
    rawURL: require('./sprite/john-c.png'),
    type: 'sprite',
    tags: [
      'people'
    ],
    info: [
      0,
      4,
      1
    ],
    json: {
      objName: 'John(2)',
      costumes: [
        {
          costumeName: 'John(2)-a',
          baseLayerID: -1,
          baseLayerMD5: require('./sprite/john-c.png'),
          bitmapResolution: 1
        },
        {
          costumeName: 'John(2)-b',
          baseLayerID: -1,
          baseLayerMD5: require('./sprite/john-d.png'),
          bitmapResolution: 1
        }
      ],
      currentCostumeIndex: 0,
      scratchX: -20,
      scratchY: -38,
      scale: 1,
      direction: 90,
      rotationStyle: 'normal',
      isDraggable: false,
      visible: true,
      spriteInfo: {}
    }
  },
  {
    name: 'Kelly(1)',
    md5: require('./sprite/kelly-a.png'),
    rawURL: require('./sprite/kelly-a.png'),
    type: 'sprite',
    tags: [
      'people'
    ],
    info: [
      0,
      4,
      1
    ],
    json: {
      objName: 'Kelly(1)',
      costumes: [
        {
          costumeName: 'kelly(1)-a',
          baseLayerID: -1,
          baseLayerMD5: require('./sprite/kelly-a.png'),
          bitmapResolution: 1
        },
        {
          costumeName: 'kelly(1)-b',
          baseLayerID: -1,
          baseLayerMD5: require('./sprite/kelly-b.png'),
          bitmapResolution: 1
        }
      ],
      currentCostumeIndex: 0,
      scratchX: -20,
      scratchY: -38,
      scale: 1,
      direction: 90,
      rotationStyle: 'normal',
      isDraggable: false,
      visible: true,
      spriteInfo: {}
    }
  },
  {
    name: 'Kelly(2)',
    md5: require('./sprite/kelly-c.png'),
    rawURL: require('./sprite/kelly-c.png'),
    type: 'sprite',
    tags: [
      'people'
    ],
    info: [
      0,
      4,
      1
    ],
    json: {
      objName: 'Kelly(2)',
      costumes: [
        {
          costumeName: 'kelly(2)-a',
          baseLayerID: -1,
          baseLayerMD5: require('./sprite/kelly-c.png'),
          bitmapResolution: 1
        },
        {
          costumeName: 'kelly(2)-b',
          baseLayerID: -1,
          baseLayerMD5: require('./sprite/kelly-d.png'),
          bitmapResolution: 1
        }
      ],
      currentCostumeIndex: 0,
      scratchX: -20,
      scratchY: -38,
      scale: 1,
      direction: 90,
      rotationStyle: 'normal',
      isDraggable: false,
      visible: true,
      spriteInfo: {}
    }
  },
  
  
  {
    name: 'Mr Lee',
    md5: require('./sprite/mrlee-a.png'),
    rawURL: require('./sprite/mrlee-a.png'),
    type: 'sprite',
    tags: [
      'people'
    ],
    info: [
      0,
      4,
      1
    ],
    json: {
      objName: 'Mr Lee',
      costumes: [
        {
          costumeName: 'Mr Lee-a',
          baseLayerID: -1,
          baseLayerMD5: require('./sprite/mrlee-a.png'),
          bitmapResolution: 1
        },
        {
          costumeName: 'Mr Lee-b',
          baseLayerID: -1,
          baseLayerMD5: require('./sprite/mrlee-b.png'),
          bitmapResolution: 1
        },
        {
          costumeName: 'Mr Lee-c',
          baseLayerID: -1,
          baseLayerMD5: require('./sprite/mrlee-c.png'),
          bitmapResolution: 1
        }
      ],
      currentCostumeIndex: 0,
      scratchX: -20,
      scratchY: -38,
      scale: 1,
      direction: 90,
      rotationStyle: 'normal',
      isDraggable: false,
      visible: true,
      spriteInfo: {}
    }
  }
].concat(priteLibrary);

export default spriteLibraryContent;
