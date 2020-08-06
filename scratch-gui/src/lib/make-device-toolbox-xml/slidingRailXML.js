export const slidingRailXmlAdded = () => window.slidingRailXmlAdded;

export const slidingRailXml = function(canCalibrate) {
  return `
    <category name="%{BKY_SlidingRail_EXTENSION_NAME}"
      id="slidingRail"
      iconURI="${require('./blockIcons/LinearRailKit.png')}"
    >
      <label text="%{BKY_CATEGORY_SETTING_LABEL}" category-label="false"></label>
        ${canCalibrate ? ` <block type="SlidingRail_SetLinearRail">
        </block>` : `<block type="SlidingRail_MagicBox_SetLinearRail">
        </block>`}

        <block type="SlidingRail_SetPTPLParams">
          <value name="velocity">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
          </value>
          <value name="acceleration">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
          </value>
        </block>
        <block type="SlidingRail_SetJOGLParams">
          <value name="velocity">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
          </value>
          <value name="acceleration">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
          </value>
        </block>

        <label text="%{BKY_CATEGORY_MOTION}" category-label="false"></label>

        <block type="SlidingRail_MoveLinearRailTo">
          <value name="value">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
          </value>
        </block>
    </category>
    `;
};
