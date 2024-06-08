// ==UserScript==
// @name         Translate Shortcut
// @namespace    https://github.com/zenpk/scripts-tampermonkey
// @version      0.1
// @description  Shortcut to translate the selection text using Google Translate
// @author       zenpk
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=translate.google.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  document.addEventListener("keydown", promptTranslate);

  function promptTranslate(evt) {
    if (evt.ctrlKey && evt.key === ".") {
      const selectionText = window.getSelection().toString();
      const translateText = prompt("Google Translate", selectionText);
      if (translateText.length <= 0) {
        return;
      }
      const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=1280,height=480,left=100,top=100`;
      open(
        "https://translate.google.com/?sl=auto&tl=zh-CN&text=" +
          translateText +
          "&op=translate",
        "translation",
        params
      );
    }
  }
})();
