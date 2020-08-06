import React from 'react';
import PropTypes from 'prop-types';
import { RadioInput } from '../../customInput';
const Header = ({ index, title, subtitle, description }) => (
  <div>
    <p>{title}</p>
    <h3>{index}</h3>
    <h3>{subtitle}</h3>
    <h4>{description}</h4>
  </div>
);
Header.propTypes = {
  description: PropTypes.string,
  index: PropTypes.number,
  subtitle: PropTypes.string,
  title: PropTypes.string
};
const MachanicalIndex = props => {
  console.log();
  return (
    <div>
      <Header
        description="请从以下三种标定方法中选择一种记录物块放置平面的高度"
        index={1}
        subtitle="Z 轴标定"
        title="机械臂标定"
      />
      <div>
        <RadioInput />
        <span>{'物块放置平面与机械臂放置平面重合'}</span>
      </div>
      <div>
        <RadioInput />
        <span>{'拖动机械臂至工具末端与物块防止平面接触'}</span>
      </div>
      <div>
        <RadioInput />
        <span>{'输入物块放置平面与机械臂放置平面的相对高度'}</span>
        <input type="number" />
        <span>{'mm'}</span>
      </div>
    </div>);
};
MachanicalIndex.propTypes = {
};
const MachanicalRecord = () => {
  console.log();
  return (
    <div>
      <Header
        description="请将标定卡片放置在抓取平面上并调整卡片至完全出现在拍摄范围内, 在标定期间请不要移动卡片"
        index={2}
        subtitle="X-Y平面标定"
        title="机械臂标定"
      />
      <div>
        <span>{'(1)'}</span>
        <span>{'移动机械臂直至末端与 A 点接触'}</span>
      </div>
      <div>
        <span>{'(2)'}</span>
        <span>{'点击"记录A点"'}</span>
        <button>{'记录A点'}</button>
      </div>
      <div>
        <span>{'(3)'}</span>
        <span>{'移动机械臂直至末端与 B 点接触'}</span>
      </div>
      <div>
        <span>{'(4)'}</span>
        <span>{'点击"记录B点"'}</span>
        <button>{'记录B点'}</button>
      </div>
    </div>
  );
};
 
export {
  MachanicalIndex,
  MachanicalRecord
}
;
