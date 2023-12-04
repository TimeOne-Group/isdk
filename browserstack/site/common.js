/*! isdk 2.6.2 https://github.com/TimeOne-Group/isdk#readme @license GPL-3.0 */
!function(){"use strict";!function(n,e){void 0===e&&(e={});var t=e.insertAt;if(n&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],d=document.createElement("style");d.type="text/css","top"===t&&o.firstChild?o.insertBefore(d,o.firstChild):o.appendChild(d),d.styleSheet?d.styleSheet.cssText=n:d.appendChild(document.createTextNode(n))}}("html {\n  background-color: #005da9;\n  color: #ffd300;\n  width: 100%;\n  height: 100%; }\n  html button {\n    appearance: none;\n    background: none;\n    border: none;\n    cursor: pointer;\n    outline: none;\n    padding: 0.5rem;\n    background-color: #ffd300;\n    color: #005da9;\n    border-radius: 5px;\n    font-weight: 700; }\n    html button:hover {\n      background-color: #c1a000; }\n  html #app {\n    display: flex;\n    flex-direction: row;\n    box-sizing: border-box;\n    font-weight: normal;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    height: 100%; }\n    html #app #title {\n      text-align: center; }\n    html #app #menu {\n      padding: 1rem;\n      display: flex;\n      flex-direction: column;\n      width: 300px;\n      border-right: 1px solid #ffd300; }\n      html #app #menu b {\n        padding: 1rem 0; }\n      html #app #menu a {\n        color: #ffd300; }\n      html #app #menu button {\n        margin-bottom: 1rem; }\n    html #app #page {\n      flex: 1;\n      padding: 1rem; }\n      html #app #page .buttons-card {\n        margin-bottom: 1rem; }\n      html #app #page .card {\n        display: flex;\n        justify-content: space-around; }\n      html #app #page .state-card {\n        min-width: 400px;\n        color: white;\n        background-color: #002039cc;\n        padding: 1rem;\n        border-radius: 5px;\n        width: fit-content; }\n      html #app #page .banner {\n        display: block; }\n")}();
