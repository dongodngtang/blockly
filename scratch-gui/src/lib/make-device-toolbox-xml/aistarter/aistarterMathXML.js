const blockSeparator = '<sep gap="36"/>';
export const aistarterMathXML = function () {
  return `
    <category name="%{BKY_AISTARTER_MATH}" 
    id="AISTARTER_MATH" colour="#40BF4A" secondaryColour="#389438">
      <block type="AIStarter_number">
        <value name="NUM">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
      </block>
      ${blockSeparator}
      <block type="AIStarter_operator_add">
        <value name="NUM1">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="NUM2">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
      </block>
      <block type="AIStarter_operator_subtract">
        <value name="NUM1">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="NUM2">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
      </block>
      <block type="AIStarter_operator_multiply">
        <value name="NUM1">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="NUM2">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
      </block>
      <block type="AIStarter_operator_divide">
        <value name="NUM1">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="NUM2">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
      </block>
      ${blockSeparator}
      <block type="AIStarter_operator_random">
          <value name="FROM">
              <shadow type="math_number">
                  <field name="NUM">1</field>
              </shadow>
          </value>
          <value name="TO">
              <shadow type="math_number">
                  <field name="NUM">10</field>
              </shadow>
          </value>
      </block>
      <block type="AIStarter_operator_MaxMin">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
      ${blockSeparator}
      <block type="AIStarter_operator_lt">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        <block type="AIStarter_operator_equals">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        <block type="AIStarter_operator_gt">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="AIStarter_operator_and"/>
        <block type="AIStarter_operator_or"/>
        <block type="AIStarter_operator_not"/>
        ${blockSeparator}
        <block type="AIStarter_operator_bitwise">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="AIStarter_operator_mathop">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="AIStarter_operator_GetBytes">
            <value name="value">
                <shadow type="text">
                    <field name="TEXT"></field>
                </shadow>
            </value>
        </block>
        <block type="AIStarter_operator_constraint">
            <value name="value">
                <shadow type="text">
                    <field name="TEXT"></field>
                </shadow>
            </value>
            <value name="low">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="high">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
    </category>
    `;
};
