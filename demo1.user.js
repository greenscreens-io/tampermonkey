// ==UserScript==
// @name           WebTerminalScripts-Demo1
// @namespace      http://www.greenscreens.io
// @description    Sample Hello world script
// @copyright      2017. Green Screens Ltd.
// @version        1.0
// @license        BSD
// @author         Green Screens Ltd.
// @homepage       http://www.greenscreens.io
// @icon           http://www.greenscreens.io/assets/images/logo.png
// @supportURL     https://github.com/greenscreens-io/tampermonkey/issues
// @updateURL      https://raw.githubusercontent.com/greenscreens-io/tampermonkey/master/demo1.user.js
// @downloadURL    https://raw.githubusercontent.com/greenscreens-io/tampermonkey/master/demo1.user.js
// @run-at         document-end
// @match          http*://*/lite*
// @grant          none
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    // will execute when terminal is connected
    function onTerminal() {
        // show notification message when terminal starts
        Tn5250.Prompts.notify('Welcome to 5250 Terminal');
    }
    
    // register Web Terminal start event
    window.addEventListener('greenscreens', onTerminal);
})();