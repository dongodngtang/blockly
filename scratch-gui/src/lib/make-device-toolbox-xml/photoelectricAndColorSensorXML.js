export const photoelectricAndColorSensorAdded = () => window.photoelectricAndColorSensorAdded;

export const photoelectricAndColorSensorXml = function(canCalibrate) {
  return `
    <category name="%{BKY_EXTENSION_PHOTOELECTRONICCOLORSENSOR_NAME}"
    id="photoelectricAndColorSensor"
    iconURI="${require('./blockIcons/Photoelectric_Color_Sensor.png')}">
      <label text="%{BKY_CATEGORY_PHOTOELECTRIC_SENSOR_LABEL}" category-label="false"></label>    
        <block type="PhotoelectricSensor_SetInfraredSensor"></block>
        <block type="PhotoelectricSensor_GetInfraredSensor"></block>

        ${canCalibrate ? ` <block type="PhotoelectricSensor_SetSeeedLightSensor"></block>
        <block type="PhotoelectricSensor_GetSeeedLightSensor"></block>` : ''}

        <label text="%{BKY_CATEGORY_COLOR_SENSOR_LABEL}" category-label="false"></label>
        <block type="PhotoelectricSensor_SetColorSensor"></block>
        <block type="PhotoelectricSensor_GetColorSensor"></block>
    </category>
    `;
};
