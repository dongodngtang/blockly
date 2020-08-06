import ScratchBlocks from 'scratch-blocks';

export const colors = [{
  colour: '#4F98FC',
  secondaryColour: '#006cff'
},
{
  colour: '#9966FF',
  secondaryColour: '#774DCB'
},
{
  colour: '#D65CD6',
  secondaryColour: '#BD42BD'
},
{
  colour: '#f34f00',
  secondaryColour: '#fb4f4f'
},
{
  colour: '#9868FC',
  secondaryColour: '#7d55d0'
},
{
  colour: '#FF661A',
  secondaryColour: '#FF5500'
},
{
  colour: '#8006CA',
  secondaryColour: '#8006CA'
},
{
  colour: '#0FBD8C',
  secondaryColour: '#0F9D11'
},
{
  colour: '#c2d356',
  secondaryColour: '#ffd356'
},
{
  colour: '#4cbfe6',
  secondaryColour: '#2e8eb8'
},
{
  colour: '#FF1493',
  secondaryColour: '#FF69B4'
},
{
  colour: '#40BF4A',
  secondaryColour: '#389438'
},
{
  colour: '#8006CA',
  secondaryColour: '#B07EC8'
},
{
  colour: '#0AAA78',
  secondaryColour: '#0AAA78'
},
{
  colour: '#f34f00',
  secondaryColour: '#FFB464'
},
{
  colour: '#5B67f6',
  secondaryColour: '#cccccc'
}
];

export const blockSeparator = '<sep gap="36"/>';

export const translatorFn = (id, defaultValue) => () => ScratchBlocks.ScratchMsgs.translate(id, defaultValue);
