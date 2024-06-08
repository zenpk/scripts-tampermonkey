// ==UserScript==
// @name         YouTube swap comments and recommendations
// @namespace    https://github.com/zenpk/scripts-tampermonkey
// @version      0.2
// @description  Provide a button to swap the comments section (bottom) and the recommendations section (right)
// @author       zenpk
// @match        https://www.youtube.com/watch*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/497343/YouTube%20swap%20comments%20and%20recommendations.user.js
// @updateURL https://update.greasyfork.org/scripts/497343/YouTube%20swap%20comments%20and%20recommendations.meta.js
// ==/UserScript==

(function () {
  "use strict";
  const timeoutValue = 200;
  const topLevelButtonsQuery =
    "#actions-inner > #menu > ytd-menu-renderer > #top-level-buttons-computed";

  function waitForLoaded() {
    const shareButton = document.querySelector(
      `${topLevelButtonsQuery} > yt-button-view-model`
    );
    console.log(
      `[Swap script] trying to find the share button: ${shareButton}`
    );
    if (shareButton) {
      addSwapButton();
    } else {
      setTimeout(waitForLoaded, timeoutValue);
    }
  }

  waitForLoaded();

  function addSwapButton() {
    const buttonParent =
      document.querySelector(topLevelButtonsQuery).parentNode;
    const swapButton = document.createElement("button");
    swapButton.innerHTML = "Swap";
    swapButton.addEventListener("click", swapSections);
    swapButton.classList.add(
      "yt-spec-button-shape-next",
      "yt-spec-button-shape-next--tonal",
      "yt-spec-button-shape-next--mono",
      "yt-spec-button-shape-next--size-m",
      "yt-spec-button-shape-next--icon-leading"
    );
    swapButton.style.marginLeft = "0.75rem";
    buttonParent.appendChild(swapButton);
    const comments = document.querySelector("#comments");
    const contents = document.querySelector(
      "#related > ytd-watch-next-secondary-results-renderer > #items > ytd-rich-grid-renderer > #contents"
    );
    const commentsParent = comments.parentNode;
    const contentsParent = contents.parentNode;
    let swapped = false;

    function swapSections() {
      if (swapped) {
        commentsParent.removeChild(contents);
        contentsParent.removeChild(comments);
        commentsParent.appendChild(comments);
        contentsParent.appendChild(contents);
      } else {
        commentsParent.removeChild(comments);
        contentsParent.removeChild(contents);
        commentsParent.appendChild(contents);
        contentsParent.appendChild(comments);
      }
      swapped = !swapped;
    }
  }
})();
