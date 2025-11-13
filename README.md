# 网页选数计算器插件 / Web Number Calculator Extension

这是一个Microsoft Edge浏览器插件，允许用户在浏览网页时直接使用侧边栏进行简单的数学计算。

This is a Microsoft Edge browser extension that allows users to perform simple mathematical calculations using the sidebar while browsing the web.

## 功能特点 / Features

- 双击网页上的数字自动添加到计算器中
- 通过侧边栏显示和操作，保持在浏览器上方
- 支持基本的算术运算：加、减、乘、除
- 提供键盘快捷键支持
- 选中数字时提供视觉反馈

- Double-click on numbers on web pages to automatically add them to the calculator
- Displayed and operated through the sidebar, staying above the browser
- Support for basic arithmetic operations: addition, subtraction, multiplication, division
- Keyboard shortcut support
- Visual feedback when selecting numbers

## 安装方法 / Installation

1. 打开Microsoft Edge浏览器
2. 在地址栏输入 `edge://extensions/` 并按Enter
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择本插件的文件夹
6. 插件将被安装并显示在扩展栏中

1. Open Microsoft Edge browser
2. Enter `edge://extensions/` in the address bar and press Enter
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked extension"
5. Select the folder containing this extension
6. The extension will be installed and displayed in the extensions bar

## 使用说明 / Usage

1. 点击插件图标或使用快捷键 `Ctrl+Shift+K` 打开侧边栏
2. 浏览网页时，双击任意数字文本将其添加到计算器中
3. 在侧边栏中点击操作符按钮(+、-、×、÷)或使用键盘输入对应的符号
4. 点击"="按钮或按Enter键执行计算
5. 计算结果将显示在侧边栏中
6. 点击"C"按钮或按Esc键清空计算器

1. Click the extension icon or use the shortcut `Ctrl+Shift+K` to open the sidebar
2. While browsing a webpage, double-click any number text to add it to the calculator
3. Click the operator buttons (+, -, ×, ÷) in the sidebar or use the corresponding keyboard symbols
4. Click the "=" button or press Enter to perform the calculation
5. The calculation result will be displayed in the sidebar
6. Click the "C" button or press Esc to clear the calculator

## 键盘快捷键 / Keyboard Shortcuts

- `+`: 选择加法运算 / Select addition operation
- `-`: 选择减法运算 / Select subtraction operation
- `*`: 选择乘法运算 / Select multiplication operation
- `/`: 选择除法运算 / Select division operation
- `Enter`: 执行计算 / Perform calculation
- `Esc`: 重置计算器 / Reset calculator
- `Ctrl+Shift+K`: 打开/关闭侧边栏 / Open/close sidebar
- `Backspace`: 删除最后输入的字符 / Delete the last input character
- `C` or `c`: 重置计算器 / Reset calculator
- `Ctrl+V` 或 `Cmd+V`: 粘贴数字 / Paste number

## 文件结构 / File Structure

- `manifest.json`: 插件配置文件 / Extension configuration file
- `background.js`: 后台脚本，处理消息和侧边栏逻辑 / Background script, handles messages and sidebar logic
- `content.js`: 内容脚本，注入网页并监听双击事件 / Content script, injects into web pages and listens for double-click events
- `sidebar.html`: 侧边栏UI界面 / Sidebar UI interface
- `sidebar.js`: 侧边栏交互逻辑 / Sidebar interaction logic
- `icon.svg`: 插件图标源文件 / Extension icon source file

## 注意事项 / Notes

1. 插件当前使用icon.svg作为图标文件，无需单独创建PNG图标文件
2. 插件能识别网页上的数字文本
3. 支持整数、小数和负数
4. 显示计算历史记录，方便查看计算过程

1. The extension currently uses icon.svg as the icon file; no need to create separate PNG icon files
2. The extension can recognize numeric text on web pages
3. Supports integers, decimals, and negative numbers
4. Displays calculation history for easy tracking of calculation processes

## 更新记录 / Changelog

### v1.0.0
- 初始版本发布 / Initial version release
- 实现基本计算功能 / Implemented basic calculation functionality
- 支持双击选择网页上的数字 / Support for double-clicking to select numbers on web pages
- 提供键盘快捷键支持 / Provided keyboard shortcut support

## 许可证 / License

本插件采用MIT许可证。

This extension is licensed under the MIT License.
