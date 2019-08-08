// ==UserScript==
// @name           AutoBlocker
// @namespace      GreenScreens
// @description    Stop auto play videos and audios
// @copyright      2017+, Tom
// @version        1.2
// @license        BSD
// @author         Green Screens Ltd.
// @homepageURL    https://www.greenscreens.io/
// @supportURL     https://github.com/greenscreens-io/tampermonkey/issues
// @updateURL      https://raw.githubusercontent.com/greenscreens-io/tampermonkey/master/autoplay.user.js
// @downloadURL    https://raw.githubusercontent.com/greenscreens-io/tampermonkey/master/autoplay.user.js
// @match          http*://*/*
// @exclude        http*://localhost*
// @exclude        http*://*greenscreens.io*
// @exclude        http*://mail.google*/*
// @grant          GM_deleteValue
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_openInTab
// @grant          GM_getResourceURL
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceUrl
// @grant          GM_xmlHttpRequest
// @grant          unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    var tid = 0;
    function clear() {
        if (tid===0) {
            tid = setInterval(clear, 5000);
        }
        document.querySelectorAll('video, audio').forEach(function(v){
            if ((v.lastTime || 0) < v.currentTime) {
                v.volume=0;
                v.muted=true;
                v.loop=false;
                v.autoplay=false;
                v.defaultMuted=true;              
                v.pause();
            }
            v.lastTime = v.currentTime;
            return true;
        });
    }
    tid = setInterval(clear, 5000);
    document.addEventListener("DOMContentLoaded", clear);

})();