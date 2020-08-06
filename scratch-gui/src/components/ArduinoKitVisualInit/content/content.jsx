/* eslint-disable react/jsx-no-bind */
import React, { useRef, useEffect } from 'react';
import styles from './content.css';
import { FormattedMessage, defineMessages, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
const Button = props => (
  <button
    className={styles.recordButton}
    onClick={props.handleRecord}
  >
    <FormattedMessage
      defaultMessage="Record"
      id="gui.arduinokit.step1record"
    />
  </button>
);

Button.propTypes = {
  handleRecord: PropTypes.func
};
const VSInitialization = () => (
  <div className={styles.guidePageTitle}>
    <FormattedMessage
      defaultMessage="Visual Sorting Initialization"
      id="gui.arduinokit.sortingtitle"
    />
  </div>
);
export const GuidePage = ({ scanCOMs, handleSelect }) => {
  const onDownload = () => {
    window.open('https://pixycam.com/downloads-pixy2');
  };
  const select = useRef(null);
  useEffect(() => () => {
    handleSelect(select.current.value);
  }, []);
  return (
    <div className={styles.guidePage}>
      <VSInitialization />
      <div className={styles.guidePageContent}>
        <FormattedMessage
          defaultMessage="The Initialization includes Coordinate Calibration and Color Calibration.
        Before the Initialization please make sure："
          id="gui.arduinokit.guidepagecontent"
        />
        <ol>
          <li>
            <FormattedMessage
              defaultMessage="The Arduino Skill Kit has already been installed on Magician properly;"
              id="gui.arduinokit.guidepagecontent.item1"
            />
          </li>
          <li>
            <FormattedMessage
              defaultMessage="Magician has already been connected to local computer;"
              id="gui.arduinokit.guidepagecontent.item2"
            />
            <select
              id=""
              name=""
              ref={select}
            >
              {scanCOMs.map(COM => (
                <option
                  key={COM}
                  value={COM}
                >{COM}</option>
              ))}
            </select>
          </li>

          <li>
            <FormattedMessage
              defaultMessage="PixyMon has already been installed on local computer"
              id="gui.arduinokit.guidepagecontent.item3"
            />
            <button
              className={styles.downloadButton}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={onDownload}
            >
              <FormattedMessage
                defaultMessage="Download"
                id="gui.arduinokit.guidepagedownload"
              />
            </button>
          </li>
        </ol>

      </div>
    </div>
  );
};
GuidePage.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  scanCOMs: PropTypes.array.isRequired
};
export const Step1 = ({ handleRecord, poseData }) => (
  <div className={styles.guidePage}>
    <VSInitialization />
    <div className={styles.guidePageContent}>
      <div className={styles.stepTitle}><FormattedMessage
        defaultMessage="Step 1：Record The Base Level"
        id="gui.arduinokit.step1title"
      /></div>
      <span><FormattedMessage
        defaultMessage='Please level the base where the blocks will be placed,
      move the robort arm till the suction cup is tightly in contact with the base
      and click the "Record" button to record the base level'
        id="gui.arduinokit.step1body"
      /></span>
      <div className={styles.step1Setting}>
        <span className={styles.step1SettingDesc}><FormattedMessage
          defaultMessage="Robot Arm Position"
          id="gui.arduinokit.step1position"
        /></span>
        <div>
          <span>{'Z'}</span>
          <input
            readOnly
            id="robotArmPos"
            name="robotArmPos"
            type="text"
            value={poseData.z ? poseData.z : 0}
          />
        </div>
      </div>
      <div className={styles.recordButtonWrapper}>
        <Button handleRecord={handleRecord} />
      </div>
    </div>
  </div>
);
const posDataProptypes = PropTypes.shape({
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
  r: PropTypes.number
});
Step1.propTypes = {
  handleRecord: PropTypes.func.isRequired,
  poseData: posDataProptypes
};

const colors = defineMessages({
  red: {
    id: 'gui.arduinokit.colorRed',
    defaultMessage: 'Red'
  },
  blue: {
    id: 'gui.arduinokit.colorBlue',
    defaultMessage: 'Blue'
  },
  yellow: {
    id: 'gui.arduinokit.colorYellow',
    defaultMessage: 'Yellow'
  },
  green: {
    id: 'gui.arduinokit.colorGreen',
    defaultMessage: 'Green'
  }
});
const Step2ColorInput = props => (
  <div className={styles.step2ColorInput} >
    <div
      className={styles.blockColor}
      style={{
        backgroundColor: props.color
      }}
    />
    <span style={{ width: '3rem' }}>{props.intl.formatMessage(colors[props.color])}</span>
    <input
      name={props.color}
      type="text"
    />
    <span>{'mm'}</span>
  </div>
);
Step2ColorInput.propTypes = {
  intl: intlShape
};
Step2ColorInput.propTypes = {
  color: PropTypes.string
};
export const Step2 = ({ intl, handleRecord }) => {
  const colorSettings = ['red', 'yellow', 'blue', 'green'].map(color => (
    <Step2ColorInput
      color={color}
      intl={intl}
      key={color}
    />
  ));
  const ref = useRef(null);
  const clickRecord = () => {
    const { blue, green, red, yellow } = ref.current.getElementsByTagName('input');
    handleRecord({ blue: blue.value, green: green.value, red: red.value, yellow: yellow.value });
  };
  return (
    <div className={styles.guidePage}>
      <VSInitialization />
      <div className={styles.guidePageContent}>
        <div className={styles.stepTitle}><FormattedMessage
          defaultMessage="Step 2：Set Different Color Blocks' Height"
          id="gui.arduinokit.step2title"
        /></div>
        <div><FormattedMessage
          defaultMessage="Please Input different color blocks' height.
    The program supports four colors' recognition.
    Blocks with the same color should be with the same height during each Visual Sorting operation. "
          id="gui.arduinokit.step2content"
        /></div>
        <div
          className={styles.step2Setting}
          ref={ref}
        >
          {colorSettings}
        </div>
        <div className={styles.recordButtonWrapper}>
          <Button handleRecord={clickRecord} />
        </div>
      </div>
      
    </div>
  );
};
Step2.propTypes = {
  handleRecord: PropTypes.func.isRequired,
  intl: intlShape
};

export const Step3 = ({ handleRecord, poseData }) => {
  const ref = useRef(null);
  const clickRecord = () => {
    const inputEles = ref.current.getElementsByTagName('input');
    const { x, y, z } = inputEles;
    handleRecord({ x: x.value, y: y.value, z: z.value });
  };
  const useCurrentMagicianLocation = () => {
    handleRecord();
  };
  return (
    <div className={styles.guidePage}>
      <VSInitialization />
      <div className={styles.guidePageContent}>
        <div className={styles.stepTitle}>
          <FormattedMessage
            defaultMessage="Step 3：Record Visual Rocognition Location"
            id="gui.arduinokit.step3title"
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <FormattedMessage
            defaultMessage="The current Visual Sorting Program can only perform visual recognition
          at one specific location every time after the initialization.
        Please choose one of the two methods below to record the visual recognition location.
        There is an offset between the Tool Center Point of the Magician and the camera location.
        After recording the location."
            id="gui.arduinokit.step3content"
          />
          <span
            style={{
              color: 'red',
              display: 'block',
              fontWeight: 'bold',
              margin: '0.4rem 0'
            }}
          >
            <FormattedMessage
              defaultMessage="Please don't move the robotic arm before the initialization is finished!!"
              id="gui.arduinokit.step3warning"
            />
          </span>
          <div className={styles.step3Items}>
            <div className={styles.step3Item}>
              <FormattedMessage
                defaultMessage="Method1"
                id="gui.arduinokit.step3method1"
              />
              <FormattedMessage
                defaultMessage="Record Magician's Current Location"
                id="gui.arduinokit.step3recordlocation"
              />
              <div
                style={{
                  display: 'flex'
                }}
              >
                {['X', 'Y', 'Z'].map(cord => (<div key={cord}>
                  <span>{cord}</span>
                  <input
                    readOnly
                    value={poseData[cord.toLowerCase()]}
                  />
                </div>))}

              </div>
              <Button handleRecord={useCurrentMagicianLocation} />
            </div>
            <div className={styles.step3Item}>
              <div
                className={styles.step3Item2}
                ref={ref}
              >
                <FormattedMessage
                  defaultMessage="Method2"
                  id="gui.arduinokit.step3method2"
                />
                <div
                  style={{
                    display: 'flex'
                  }}
                >
                  {['X', 'Y', 'Z'].map(cord => (
                    <div key={cord}>
                      <span>{cord}</span>
                      <input
                        id={cord}
                        name={cord.toLowerCase()}
                        type="text"

                      />
                    </div>
                  ))}
                </div>
                <FormattedMessage
                  defaultMessage="Input Magician's Location"
                  id="gui.arduinokit.step3inputlocation"
                />
              </div>
              <Button handleRecord={clickRecord} />
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
};
Step3.propTypes = {
  handleRecord: PropTypes.func.isRequired,
  poseData: PropTypes.any
};

export const Step4 = () => (
  <div className={styles.guidePage}>
    <VSInitialization />
    <div className={styles.guidePageContent}>
      <div className={styles.stepTitle}>
        <FormattedMessage
          defaultMessage="Step 4：Record PixyMon Selection Frame Location"
          id="gui.arduinokit.step4title"
        />
      </div>
      <div>
        <FormattedMessage
          defaultMessage="After Opening PixyMon, place three random color blocks inside the camera view.
          Please try to line the edges of the blocks with horizontal or vertical
          direction and make sure all the blocks are fully included in the camera view.
          Don't move the blocks before the Coordinate Calibration is finished."
          id="gui.arduinokit.step4content"
        />
      </div>
      <img
        src={require('./pixy.png')}
        style={{
          height: '30vh'
        }}
      />
    </div>
  </div>
);

const SubStep4Inputs = () => [null, null, null].map((data, index) => (
  <div
    key={index}
    style={{
      display: 'flex',
      justifyContent: 'space-evenly',
      margin: '0.3rem 0',
      alignItems: 'center'
    }}
  >
    <span
      style={{
        marginRight: '0.5rem'
      }}
    >
      <FormattedMessage
        defaultMessage="Point"
        id="gui.arduinokit.step4point"
      />{index + 1}</span>
    {['X', 'Y', 'H', 'W'].map(cord => (
      <div key={cord}>
        <span
          style={{
            display: 'inline-block',
            width: '1rem'
          }}
        >{cord}</span>
        <input
          name={`${cord.toLowerCase()}-${index + 1}`}
          type="text"
        />
      </div>
    ))}
  </div>
));
export const SubStep4 = ({ handleRecord }) => {
  const ref = useRef(null);
  const clickRecord = () => {
    const inputEles = ref.current.getElementsByTagName('input');
    const point1 =
    { x: inputEles['x-1'].value, y: inputEles['y-1'].value, h: inputEles['h-1'].value, w: inputEles['w-1'].value };
    const point2 =
    { x: inputEles['x-2'].value, y: inputEles['y-2'].value, h: inputEles['h-2'].value, w: inputEles['w-2'].value };
    const point3 =
    { x: inputEles['x-3'].value, y: inputEles['y-3'].value, h: inputEles['h-3'].value, w: inputEles['w-3'].value };
    handleRecord({ point1, point2, point3 });
  };
  return (
    <div className={styles.guidePage}>
      <VSInitialization />
      <div className={styles.guidePageContent}>
        <div className={styles.stepTitle}>
          <FormattedMessage
            defaultMessage="Step 4：Record PixyMon Selection Frame Location"
            id="gui.arduinokit.step4title"
          />
        </div>
        <div>
          <FormattedMessage
            defaultMessage="Select 'Action' in the PixyMon window and
          use 'Signature' function to mark the blocks by frame slections.
          Please try to accurately select the diagonal points of the blocks.
          Everytime after a frame selection,
          an array including the selected frame's top left point's X, Y coordinates and the Height and
          Width of the selection frame will be displayed in the Task windows at the lower part of the PixyMon window.
          Please record the arrays' data in the input boxes below and remember the boxes' sequence."
            id="gui.arduinokit.step4content1"
          />
        </div>
        <div
          ref={ref}
          style={{ display: 'flex',
            width: '100%',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
            margin: '1rem 0' }}
        >
          <SubStep4Inputs />
        </div>
        <Button handleRecord={clickRecord} />
      </div>
    </div>
  );
};
SubStep4.propTypes = {
  handleRecord: PropTypes.func.isRequired
};

const Step5Inputs = ({ handleRecord, freshBlocks, poseData }) => {
  const refs = {
    ref1: useRef(null),
    ref2: useRef(null),
    ref3: useRef(null)
  };

  const clickRecord = index => {
    const input1Eles = refs.ref1.current.getElementsByTagName('input');
    const input2Eles = refs.ref2.current.getElementsByTagName('input');
    const input3Eles = refs.ref3.current.getElementsByTagName('input');
    if (index === 1) {
      handleRecord({ block1: {
        x: input1Eles['x-1'].value,
        y: input1Eles['y-1'].value,
        z: input1Eles['z-1'].value
      } });
    } else if (index === 2) {
      handleRecord({ block2: {
        x: input2Eles['x-2'].value,
        y: input2Eles['y-2'].value,
        z: input2Eles['z-2'].value
      } });
    } else if (index === 3) {
      handleRecord({ block3: {
        x: input3Eles['x-3'].value,
        y: input3Eles['y-3'].value,
        z: input3Eles['z-3'].value
      } });
    }
  };
  return [null, null, null].map((data, index) => (
    <div
      key={index}
      ref={refs[`ref${index + 1}`]}
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '0.3rem 0',
        fontSize: '1.2rem',
        alignItems: 'center'
      }}
    >
      <span
        style={{
          marginRight: '0.5rem'
        }}
      >
        <FormattedMessage
          defaultMessage="Block"
          id="gui.arduinokit.step4block"
        />{index + 1}</span>
      {['X', 'Y', 'Z'].map(cord => (
        <div key={cord}>
          <span
            style={{
              display: 'inline-block',
              width: '1rem'
            }}
          >{cord}</span>
          <input
            name={`${cord.toLowerCase()}-${index + 1}`}
            type="text"
            value={freshBlocks[`block${index + 1}`][cord.toLowerCase()] ?
              freshBlocks[`block${index + 1}`][cord.toLowerCase()] :
              poseData[cord.toLowerCase()]}
          />
        </div>
      ))}
      <Button handleRecord={clickRecord.bind(null, index + 1)} />
    </div>
  ));
};
Step5Inputs.propTypes = {
  freshBlocks: PropTypes.shape({
    block1: PropTypes.bool,
    block2: PropTypes.bool,
    block3: PropTypes.bool
  }),
  handleRecord: PropTypes.func.isRequired,
  poseData: posDataProptypes
};
export const Step5 = ({ ...inputProps }) => (
  <div className={styles.guidePage}>
    <VSInitialization />
    <div className={styles.guidePageContent}>
      <div className={styles.stepTitle}>
        <FormattedMessage
          defaultMessage="Step 5：Record Marked Blocks's Robotic Arm Coordinates"
          id="gui.arduinokit.step5title"
        />
      </div>
      <div>
        <FormattedMessage
          defaultMessage="Move the robotic arm till the suction cup is tightly
          in contact with each of the marked blocks separately.
          Click the 'Record' buttons below to record the XYZ coordinates of the three marked blocks.
          Please make sure the sequence of the points you record is the same as the blocks'
          sequence in step 4."
          id="gui.arduinokit.step5content"
        />
      </div>
      <div
        style={{ display: 'flex',
          flex: '1',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
          margin: '1rem 0' }}
      >
        <Step5Inputs {...inputProps} />
      </div>
    </div>
  </div>
);


const Step6Input = ({ intl, handleFinishWithOption }) => (
  <div className={styles.step6Input}>
    {['red', 'yellow', 'blue', 'green'].map(color => (
      <div
        className={styles.step6InnerInput}
        key={color}
      >
        <span>
          <span
            style={{
              width: '3rem',
              display: 'inline-block'
            }}
          >
            {intl.formatMessage(colors[color])}
          </span>
          <FormattedMessage
            defaultMessage=" match Signature"
            id="gui.arduinokit.step6sig"
          /></span>
        <select
          id="signature"
          name={`${color}signature`}
        >
          <option value="0">{'none'}</option>
          <option value="1">{'Signature1'}</option>
          <option value="2">{'Signature2'}</option>
          <option value="3">{'Signature3'}</option>
          <option value="4">{'Signature4'}</option>
        </select>
      </div>
    ))}
    <div className={styles.finishButton}>
      <button
        className={styles.recordButton}
        onClick={handleFinishWithOption}
      >
        <FormattedMessage
          defaultMessage="Finish"
          id="gui.arduinokit.finish"
        />
      </button>
    </div>
  </div>
);
Step6Input.propTypes = {
  handleFinishWithOption: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};
export const Step6 = ({ intl, handleFinish, handleRecord }) => {
  const ref = useRef(null);
  const handleFinishWithOption = () => {
    const selects = ref.current.getElementsByTagName('select');
    const redSig = selects[0].value;
    const yellowSig = selects[1].value;
    const blueSig = selects[2].value;
    const greenSig = selects[3].value;
    handleRecord({
      red: redSig,
      yellow: yellowSig,
      blue: blueSig,
      green: greenSig
    });
    handleFinish();
  };
  return (
    <div className={styles.guidePage}>
      <VSInitialization />
      <div className={styles.guidePageContent}>
        <div className={styles.stepTitle}>
          <FormattedMessage
            defaultMessage="Step 6：Color Calibration"
            id="gui.arduinokit.step6title"
          />
        </div>
        <div>
          <FormattedMessage
            defaultMessage="Remove the blocks for Coordinate Calibration and place blocks with the colors needed
          to be recognized in the camera view(Color types and numbers are determined by the user,
            if only one color is required, then only one block needed to be placed. If four colors are required,
            then four blocks with four colors needed to be placed).
            Please try to line the edges of the blocks with horizontal and vertical direction.
            Select 'Action' in the PixyMon window and use Signature 1,2,3 and 4 to marked corresponding colors
            and match different colors and signatures in the below selection boxes."
            id="gui.arduinokit.step6content"
          />
        </div>
        <div
          ref={ref}
          style={{ display: 'flex',
            width: '100%',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
            margin: '1rem 0' }}

        >
          <Step6Input
            handleFinishWithOption={handleFinishWithOption}
            intl={intl}
          />
        </div>
      </div>
    </div>
  );
};
Step6.propTypes = {
  handleFinish: PropTypes.func.isRequired,
  handleRecord: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};
