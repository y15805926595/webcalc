// 简易计算器后台脚本
// 主要功能：处理扩展按钮点击，打开侧边栏

// 监听扩展按钮点击事件
chrome.action.onClicked.addListener((tab) => {
  // 打开侧边栏
  chrome.sidePanel.open({
    tabId: tab.id,
  });
});

// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TEXT_SELECTED") {
    console.log(message);
    chrome.runtime.sendMessage({
      type: "UPDATE_SELECTED_TEXT",
      text: message.text,
    });
  }
});

// 设置侧边栏默认路径
chrome.sidePanel
  .setPanelBehavior({
    openPanelOnActionClick: true,
  })
  .catch((error) => {
    console.error("设置侧边栏行为失败:", error);
  });

console.log("简易计算器后台脚本已启动");
