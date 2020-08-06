## 安装环境依赖

- node([下载地址](https://nodejs.org/en/) 自带npm)
- yarn(`npm install yarn -g`)
- python([下载地址](https://www.python.org/downloads/) 选择2.x版本)
* 须注意环境变量的问题, 可分别在终端中使用 `node -v ` `yarn -v` `python -V`进行检测, 须正常显示版本号

## 安装项目依赖

* Windows环境下需要使用远端服务器进行编译, 所以需要服务器密钥(向主福申请), 修改build-blocks.js中的密钥位置, 然后执行
`yarn install:all`

## 调试scratch-gui部分

`yarn test:gui`

## 打包成 electron 客户端
执行命令`yarn build:ele` 可执行文件放在`dobot-scratch-app/dist`中. 需注意以下事项:

- 在 `dobot-scratch-app/package.json` 中更改版本号, 遵循语义化版本控制.
  - `x.x.x-alpha.x` 为测试版本
  - `x.x.x-beta.x` 为预发布版本
  - `x.x.x-rc.x` 为release candidate版本
  - `x.x.x-stable.x` 为最终发行版本
  - 具体规则请参考[点击](http://192.168.0.11:10080/sw/group-wiki/wikis/home)
- 每次打包都会在最后一个数字上+1, 比如`1.0.0-alpha.1`执行完打包命令后,会变成`1.0.0-alpha.2`
- 如果 `dobotlink` 或者人工智能中间层项目 `PyImageOM` 项目有更新, 需将他们的相关文件复制到`dobot-scratch-app/Resources` 中.

### 注意: 
因系统平台的差异性, 如果有更换平台打包, 需要重新 先执行 `yarn build:dep` 打包依赖包, 再执行`yarn build:ele`, 避免 sha1 的校验和以及路径的下划线区别问题.

## 项目结构

```
├── closure-library     // 谷歌编译环境    
├── dobot-scratch-app   // electron生成exe文件夹
├── scratch-blocks      // scratch 积木相关文件
├── scratch-gui         // 应用主界面
├── scratch-l10n        // 全球化
└── scratch-vm          // 积木运行时
```

## 新增积木配置

### 方法 1: 积木基础配置 在scratch-blocks中配置

> 不推荐, 不到万不得已不要使用该方式, 需要重新 build scratch-blocks 项目, 耗时长, 且在 windows 下有平台问题, 会导致 build 失败.

积木配置文件夹在`vertical_folder`中, block的结构类似于

```js
// 添加id为motion_movesteps的积木
Blockly.Blocks['motion_movesteps'] = {
  // 初始化方法, 为积木的配置
  init: function() {
    this.jsonInit({
      // 具体的MOTION_MOVESTEPS在editor/blocks的各个国际化的json中, 例如中文版的就是   移动 %1 步, % 表示积木中有多少个args, 与arg0中的数量必须保持一致
      "message0": Blockly.Msg.MOTION_MOVESTEPS,
      "args0": [
          // 详见下方解释
        {
          "type": "input_value",
          "name": "STEPS"
        }
      ],
      // 所属的积木类
      "category": Blockly.Categories.motion,
      // 表示是什么样子的积木
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};
```
#### json配置中必须要有上述四个字段: `message0, args0, category, extensions`

#### ags0中必要的字段为type和name

积木的变量type有很多中, 
- 输入类型
    - input_value: 输入字符串值, 默认name为VALUE
    - field_number: 输入数字, 默认name为NUMBER
    - field_dropdown: 下拉框, 需要额外配置options字段, 为一个二维数组\[\[ '下拉框显示的名字', '对应的值'\]\], 一般情况下这两个是相同的, 注意, **对应的值一定为字符串类型**
- 样式类型
    - field_image: icon, 配置有些不一样, 需要输入icon的地址
        - `src: Blockly.mainWorkspace.options.pathToMedia + 实际icon的地址`, pathToMedia在`./static/blocks-media/`中, 所以要先将图片资源放进去
        - `width` 宽 若是积木最前面的icon为40px, 还有一种是较小的图标(如重复执行积木)为24px
        - `height` 高 与宽相等.
    - field_vertical_separator: 竖形间隔符
    - input_statement: 包含其他积木, 可参照控制类的重复执行

name通常情况可采用默认值, 但必须保证name唯一.

#### category为积木类别, 即所属的flyout

- 在constants.js的Blockly.Categories中进行类别的添加 (scratch-blocks\core\constants.js)

#### extensions为积木的样式, 是一个数组
- 第一个为颜色
- 第二个为积木类别, 所有的类别都是在vertical_extensions注册的
    - shape_statement: 有上下文的执行类积木
    - shape_hat: 开始类积木
    - shape_end: 结束类积木
    - output_number: 数值类输出积木
    - output_string: 字符串类输出积木
    - output_boolean: 布尔类输出积木

### 方法 2: 在 GUI 中进行override

参见`scratch-gui/src/lib/blocks`中的写法, 使用 `scratch-blocks` 暴露出的接口进行配置以及 override.

### 方法 3: 扩展积木的配置, `scratch-vm` 中

扩展的配置均写在 `scratch-vm/src/extensions`中, 可在任意一个积木文件夹的 `index.js` 中搜索 `getInfo`, 里面写的就是配置信息.
```js
return {
  // 扩展 ID, 用于区分角色对应的 extension
  id: Scratch3MagicianBlocks.EXTENSION_ID,
  // 扩展名
  name: Scratch3MagicianBlocks.EXTENSION_NAME,
  // 积木盒该扩展的 icon
  blockIconURI: blockIconURI,
  // 是否显示状态按钮, 我们的积木均为 false
  showStatusButton: false,
  // 该类对应的积木有哪些
  blocks: [{
    opcode: 'Magician_Home',
    text: formatMessage({
      id: 'Magician.Magician_Home',
      default: 'Home',
      description: 'Set Home'
    }),
    blockType: BlockType.COMMAND
  }
}
```

### 修改积木在flyout中显示的样式, 包括显示的顺序, 在scratch-gui中配置

文件位置: scratch-gui\src\lib\make-device-toolbox-xml.js

基本样式:
```xml
<category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC">
  <block type="motion_movesteps">
    <value name="STEPS">
      <shadow type="math_number">
        <field name="NUM">2</field>
      </shadow>
    </value>
  </block>
</category>
```
`block`的`type`就与之前定义的`block name`保持一致
`value`的`name`与`block`定义的`args0`中的`name`一致
`shadow`和`field`根据数据类型, 如果是数字类型则分别为`math_number`和`NUM`, 如果是文本类型则为`text`和`TEXT`, field中填默认值
还有一种很常见的为下拉框, 下拉框默认没有样式

当然还有最简单的直接一个积木名, 作为占位符的存在
```xml
<block type="control_start_as_clone"></block>
```
积木盒颜色配置在`core\colours.js` 定义三色 分别是 积木和颜色, 积木颜色, 外框颜色

在`blocks_vertical\vertical_extensions.js`添加积木盒名字进行注册

### 积木对应的函数方法, 在scratch-vm中配置

```js
moveSteps (args, util) {
  const steps = Cast.toNumber(args.STEPS);
  const radians = MathUtil.degToRad(90 - util.target.direction);
  const dx = steps * Math.cos(radians);
  const dy = steps * Math.sin(radians);
  util.target.setXY(util.target.x + dx, util.target.y + dy);
}
```
每个方法会传入两个参数, 第一个为积木所携带的参数, 即在配置是的args0, 第二个util是包含renderTarget的对象, 如果不涉及舞台的交互, 可忽略第二个参数.这里面就是对应的积木调用方法, 相对应的硬件接口也应该在此被调用.

### 积木盒与硬件角色的绑定
在`scratch-gui\src\lib\libraries\devices.jsx`中添加硬件角色配置, 与普通硬件的区别是有isDevice和deviceName这两个json字段.须唯一. 然后在`scratch-gui\src\lib\make-device-toolbox-xml.js`中按照deviceName进行相应字段的添加, 如果需要有连接的icon, 需要在顶部`category`设置`showStatusButton="true"`字段.

### 角色与扩展积木的绑定

- `scratch-vm\src\extensions\device_extension`中新建一个扩展的配置
- `scratch-vm\src\extension-support\extension-manager.js`中注册扩展ID, 注意此处是唯一的ID, 后续需要用到, ID的配置需要扩展名+FOR+对于哪个设备, 比如`SlidingRailFORMagician`
- `scratch-gui\src\lib\libraries\extensions\deviceExtensions.jsx`中添加该扩展, 其中的`extensionId: xxx`就是上一步注册的扩展ID.

#### 添加新积木后注意需要在 `sb3.js` 文件`CORE_EXTENSIONS` 对象中添加对应积木 `id` 字段 如 AI类型积木中的 `AIVoice_ManualVoice` 需要添加 `AIVoice` 字段

### 硬件连接流程

- 在`scratch-gui\src\lib\libraries\devices.jsx`中添加在 `deviceConnectionList`中, `extensionid` 要与 `deviceChooseList` 的`deviceName`保持一致, 配置连接相关信息.

### blockly 导入 gui
- 将在 scratch-blocks 中打包好的压缩文件 js 放到 gui/blockjs 中再执行`yarn test:gui`

### 关于版本与流程控制:

1. 推送到远端时会对 gui, vm, l10n, blocks 分别进行 eslint 验证, 如果出错会推送失败, 请根据出错信息进行代码修改.

2. 远端已配置的 CI 任务:
  - dev 分支进行 lint 检测
  - master 分支会进行打包.

3. 开发流程:
  - 开发新需求时, 从最新的 dev 上 checkout 到 本地开发分支feature/A `git checkout -b feature/A`
  - 在feature/A上持续开发完毕后, 先查看 dev 分支是否有更新`git pull origin dev --rebase`解决完冲突后, `git push origin [本地名]:[远端名]` 上传到远端
  - 在 gitlab 上将 feature/A 合并到 dev 分支, 互相提 review, 写清修改内容, 不要直接推送到 dev 上, 更不能推到 master!
  - 合并之后尽量删除远端分支, 另开新分支开发新功能
  - 当要发布版本时, 将 dev 分支合并到 master 分支上并打 tag 表明是什么版本 
4. 打包版本时：（每次打包前都检查）
  - window：
    - 先将window新版DobotLink安装到电脑，再运行DobotLink在插件功能中打开ArduionPlugin功能，关闭DobotLink，再找到安装路径，找到压缩文件arduino （svn） 解压放到DobotLink路径下，再将路径下的DobotLink文件夹直接放到`dobot-scratch-app/build/winResources`下。 若AI程序有更新，则需将 `PyImageOM` 项目打包的文件更名为`AI`后放到`dobot-scratch-app/build/winResources`下。
  - Mac：
    - 先将Mac新版DobotLink安装到电脑，再运行DobotLink在插件功能中打开ArduionPlugin功能，关闭DobotLink，打开包文件，找到压缩文件arduino （svn） 解压放到`DobotLink/Contents/Rescources`路径下，再将路径下的DobotLink文件夹直接放到`dobot-scratch-app/build/macResources`下。 若AI程序有更新，则需将 `PyImageOM` 项目打包的文件更名为`AI`后放到`dobot-scratch-app/build/winResources`下。

### 注意事项：
 + 对已正式发版积木尽量不要删除，会造成旧版本保存程序新版本无法打开。做修改时尽量不要修改`积木定义字段`与`参数name`，会造成加载程序积木参数空缺