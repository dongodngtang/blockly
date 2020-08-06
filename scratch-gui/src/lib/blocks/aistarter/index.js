import { aiStarterBlocks } from './aistarter';
import { aiStarterMathBlocks } from './aistarterMath';
import { aiStarterTextBlocks } from './aistarterText';

export const aiStarterAllBlocks = intl => {
  aiStarterBlocks(intl);
  aiStarterMathBlocks();
  aiStarterTextBlocks();
};
