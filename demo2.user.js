// ==UserScript==
// @name           WebTerminalScripts-Demo2
// @namespace      http://www.greenscreens.io
// @description    Screen extract shortcut and external definition resources
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
// @grant          GM_getResourceURL
// @grant          GM_getResourceUrl
// @grant          GM_xmlhttpRequest
// @grant          GM_xmlHttpRequest
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    // export screen to excel
    function doExport() {

        var root = "https://raw.githubusercontent.com/greenscreens-io/greenscreens-etl/master/etl/";

        // we can use screen hash to receive specific json definition
        // var cfg = Tn5250.Application.getConfig();
        // root + cfg.attrHash + '.json';

        Tn5250.Base.loadResource(root + "wrkactjob.json", "json").then(function(def){
            return Tn5250.Base.loadResource(root + "wrkactjob.xlsx", "binary").then(function(doc){

                def.templates.excel = root + def.templates.excel;
                def.templates.word = root + def.templates.word;

                var screen = Tn5250.Application.screenExtract();
                Tn5250.Export.exportExcel(screen, def, doc, function(cc){
                    console.log(cc);
                });
                return true;
            });
        });

        /*
        // if resource is not available due to CORS, try to use TamperMonkey requester
        GM_xmlhttpRequest({
          method: "GET",
          url: root + "wrkactjob.json",  // root + cfg.attrHash + '.json';
          onload: function(response) {
           var obj = JSON.parse(response.responseText);
           obj.templates.excel = root + obj.templates.excel;
           obj.templates.word = root + obj.templates.word;
           var screen = Tn5250.Application.screenExtract();
           Tn5250.ETL.extract(obj, screen, false, function(){});
          }
        });
        */
    }

    function onShortcut(e){
        // alt+e
        if (e.which === 69 && e.altKey) {
            e.preventDefault();
            e.stopPropagation();
            doExport();
        }
    }
    
    function onTest() {
       Tn5250.Prompts.notify('Hello from context menu');
     }
     
    function onTerminal() {
        document.addEventListener("keydown", onShortcut);
        Tn5250.Prompts.notify('Screen extract shortcut added ALT + E');
        // NOTE: Custom menu item available as of 3.0.8.  
        Tn5250.Prompts.initContext(null, {test : {name:'Test', callback : onTest}});        
    }

    // start script initialization when web terminal connected
    window.addEventListener('greenscreens', onTerminal);

})();