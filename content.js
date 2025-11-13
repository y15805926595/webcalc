document.addEventListener("selectionchange", () => {
  const selection = window.getSelection();
  const text = selection.toString().trim();

  if (text) {
    console.log("Text selected:", text);
    chrome.runtime.sendMessage({
      type: "TEXT_SELECTED",
      text: text,
    });
  }
});
