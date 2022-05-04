
/*! pbd-sdk 1.0.0 https://github.com/https://github.com/TimeOne-Group/pbd-sdk#readme @license GPL-3.0 */
(function () {
  'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "html {\n  background-color: #005da9;\n  color: #ffd300;\n  width: 100%;\n  height: 100%; }\n  html button {\n    appearance: none;\n    background: none;\n    border: none;\n    cursor: pointer;\n    outline: none;\n    padding: 0.5rem;\n    background-color: #ffd300;\n    color: #005da9;\n    border-radius: 5px;\n    font-weight: 700; }\n    html button:hover {\n      background-color: #c1a000; }\n  html #app {\n    display: flex;\n    flex-direction: row;\n    box-sizing: border-box;\n    font-weight: normal;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    height: 100%; }\n    html #app #title {\n      text-align: center; }\n    html #app #menu {\n      padding: 1rem;\n      display: flex;\n      flex-direction: column;\n      width: 300px;\n      border-right: 1px solid #ffd300; }\n      html #app #menu b {\n        padding: 1rem 0; }\n      html #app #menu a {\n        color: #ffd300; }\n      html #app #menu button {\n        margin-bottom: 1rem; }\n    html #app #page {\n      flex: 1;\n      padding: 1rem; }\n      html #app #page .buttons-card {\n        margin-bottom: 1rem; }\n      html #app #page .card {\n        display: flex;\n        justify-content: space-around; }\n      html #app #page .state-card {\n        min-width: 400px;\n        color: white;\n        background-color: #002039cc;\n        padding: 1rem;\n        border-radius: 5px;\n        width: fit-content; }\n      html #app #page .banner {\n        display: block; }\n";
  styleInject(css_248z);

})();
