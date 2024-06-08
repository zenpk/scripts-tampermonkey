// ==UserScript==
// @name         Log kashi
// @namespace    https://github.com/zenpk/scripts-tampermonkey
// @version      0.1
// @description  I get your kashi anyway :p
// @author       zenpk
// @match        https://www.uta-net.com/song/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uta-net.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const kashiArea = document.getElementById("kashi_area");
  console.log(kashiArea.innerText);
})();
