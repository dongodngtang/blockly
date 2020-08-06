const blockSeparator = '<sep gap="36"/>';
export const aistarterTextXML = function () {
  return `
    <category name="%{BKY_AISTARTER_TEXT}" 
    id="AISTARTER_TEXT" colour="#5B67f6" secondaryColour="#5B67A5">
        <block type="AIStarter_string">
            <value name="string">
                <shadow type="text">
                    <field name="TEXT">item</field>
                </shadow>
            </value>
        </block>
        <block type="AIStarter_char">
            <value name="string">
                <shadow type="text">
                    <field name="TEXT">a</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="AIStarter_string_changeType">
            <value name="string">
                <shadow type="text">
                    <field name="TEXT">123</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="AIStarter_string_connection">
            <value name="string1">
                <shadow type="text">
                    <field name="TEXT">item</field>
                </shadow>
            </value>
            <value name="string2">
                <shadow type="text">
                    <field name="TEXT">item</field>
                </shadow>
            </value>
        </block>
        
        <block type="AIStarter_string_indexOf">
            <value name="string1">
                <shadow type="text">
                    <field name="TEXT">Dobot</field>
                </shadow>
            </value>
            <value name="string2">
                <shadow type="text">
                    <field name="TEXT">t</field>
                </shadow>
            </value>
        </block>
        <block type="AIStarter_string_Extract">
            <value name="inputString">
                <shadow type="text">
                    <field name="TEXT">substring</field>
                </shadow>
            </value>
            <value name="startNum">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="endNum">
                <shadow type="math_number">
                    <field name="NUM">3</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="AIStarter_string_toUpperCase">
            <value name="inputString">
                <shadow type="text">
                    <field name="TEXT">String</field>
                </shadow>
            </value>
        </block>
        <block type="AIStarter_string_trim">
            <value name="inputString">
                <shadow type="text">
                    <field name="TEXT">String</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="AIStarter_String_Begin">
            <value name="inputString">
                <shadow type="text">
                    <field name="TEXT">String</field>
                </shadow>
            </value>
            <value name="beginString">
                <shadow type="text">
                    <field name="TEXT">S</field>
                </shadow>
            </value>
        </block>
        <block type="AIStarter_String_End">
            <value name="inputString">
                <shadow type="text">
                    <field name="TEXT">String</field>
                </shadow>
            </value>
            <value name="endString">
                <shadow type="text">
                    <field name="TEXT">g</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="AIStarter_String_DataTypeChange">
            <value name="inputString">
                <shadow type="text">
                    <field name="TEXT">String</field>
                </shadow>
            </value>
            <value name="endString">
                <shadow type="text">
                    <field name="TEXT">g</field>
                </shadow>
            </value>
        </block>
        <block type="AIStarter_String_KeepDecimals">
            <value name="inputString">
                <shadow type="math_number">
                    <field name="NUM">6.666</field>
                </shadow>
            </value>
            <value name="inputNumber">
                <shadow type="math_number">
                    <field name="NUM">2</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="AIStarter_String_getLength">
            <value name="inputString">
                <shadow type="text">
                    <field name="TEXT">String</field>
                </shadow>
            </value>
        </block>
        <block type="AIStarter_String_charAt">
            <value name="inputString">
                <shadow type="text">
                    <field name="TEXT">String</field>
                </shadow>
            </value>
            <value name="inputNumber">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="AIStarter_String_Base">
            <value name="inputString">
                <shadow type="text">
                    <field name="TEXT">String</field>
                </shadow>
            </value>
        </block>
        ${blockSeparator}
        <block type="AIStarter_String_ASCLL2char">
            <value name="inputString">
                <shadow type="math_number">
                    <field name="NUM">233</field>
                </shadow>
            </value>
        </block>
        <block type="AIStarter_String_char2ASCLL">
            <value name="inputString">
                <shadow type="text">
                    <field name="TEXT">a</field>
                </shadow>
            </value>
        </block>
    </category>
    `;
};
