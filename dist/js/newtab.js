/*! (c) Philipp König under GPL-3.0 */
(e=>{"use strict";window.EntryHelper=function(e){let t={},s={},o=!1;this.init=(()=>new Promise(i=>{o=e.helper.model.getData("u/showHidden"),e.helper.model.call("entries").then(e=>{t=e.entries,s=e.amounts,i()})})),this.getAmount=(e=>{if(s[e]){let t=s[e].visible;return o&&(t+=s[e].hidden),t}return null}),this.getAllPinnedData=(()=>Object.values(t.pinned)),this.getAllBookmarkData=(()=>Object.values(t.bookmarks)),this.getData=(e=>{let s=null;return"object"==typeof t.bookmarks[e]?(s=t.bookmarks[e],"object"==typeof t.pinned[e]&&(s.pinnedIndex=t.pinned[e].index)):"object"==typeof t.directories[e]&&(s=t.directories[e]),s}),this.addData=((e,s,o)=>{"object"==typeof t.bookmarks[e]?("pinnedIndex"===s&&"object"==typeof t.pinned[e]&&(t.pinned[e].index=o),t.bookmarks[e][s]=o):"object"==typeof t.directories[e]&&(t.directories[e][s]=o)}),this.isVisible=(e=>{let s=!1;return"object"==typeof t.bookmarks[e]?s=!1===t.bookmarks[e].hidden:"object"==typeof t.directories[e]&&(s=!1===t.directories[e].hidden),s})},window.EditHelper=function(t){let s=!1;this.init=(async()=>{s=location.href.search(/#edit$/)>-1,e("EDITBUTTON").on("click",e=>{e.preventDefault(),s||history.pushState({},null,location.href+"#edit")})})},window.SearchHelper=function(t){let s={};this.init=(async()=>{n()});let o=s=>{let o=e("ul."+t.opts.classes.suggestions+" > li."+t.opts.classes.active),i="next"===s?0:-1;o.length()>0&&(i=o.prevAll("li").length()+("next"===s?1:-1),o.removeClass(t.opts.classes.active));let l=!1;if(i>=0){let s=e("ul."+t.opts.classes.suggestions+" > li").eq(i);s.length()>0&&(l=!0,s.addClass(t.opts.classes.active),t.opts.elm.search.field[0].value=s.text().trim())}!1===l&&(t.opts.elm.search.field[0].value=t.opts.elm.search.field.data("typedVal"))},i=e=>{e&&e.trim().length>0&&(0===e.search(/https?\:\/\//)||0===e.search(/s?ftps?\:\/\//)||0===e.search(/chrome\:\/\//)?chrome.tabs.update({url:e}):chrome.tabs.update({url:"https://www.google.com/search?q="+encodeURIComponent(e)}))},l=t=>new Promise(o=>{if(t)if(s[t])o(s[t]);else{let i=encodeURIComponent(t),l=(e=[])=>{s[t]=e,o(e)};e.xhr("http://google.com/complete/search?client=chrome&q="+i,{responseType:"json"}).then(e=>{try{if(e.response&&e.response[0]===t){let t=[],s=[];e.response[1].forEach((o,i)=>{"NAVIGATION"===e.response[4]["google:suggesttype"][i]?t.push({type:"url",label:o}):s.push({type:"word",label:o})}),l(t.concat(s))}}catch(e){l()}},()=>{l()})}else o([])}),n=()=>{t.opts.elm.search.submit.on("click",e=>{e.preventDefault(),e.stopPropagation();let s=t.opts.elm.search.field[0].value;s&&s.trim().length>0?i(s):chrome.tabs.update({url:"https://www.google.com"})}),t.opts.elm.search.field.on("keyup click",s=>{s.preventDefault(),s.stopPropagation();let n=s.currentTarget.value,a=event.which||event.keyCode;13===a?i(n):40===a?o("next"):38===a?o("prev"):(t.opts.elm.search.field.data("typedVal",n),l(n).then(s=>{if(e("ul."+t.opts.classes.suggestions).remove(),s.length>0){let o=e("<ul />").addClass(t.opts.classes.suggestions).insertAfter(t.opts.elm.search.field);s.some((s,i)=>{if(e("<li />").attr(t.opts.attr.type,s.type).text(s.label).appendTo(o),i>4)return!0}),o.css({top:t.opts.elm.search.field[0].offsetTop+"px",left:t.opts.elm.search.field[0].offsetLeft+"px"})}}))}),e(document).on("mousemove","ul."+t.opts.classes.suggestions+" > li",s=>{e("ul."+t.opts.classes.suggestions+" > li").removeClass(t.opts.classes.active),e(s.currentTarget).addClass(t.opts.classes.active)}).on("click","ul."+t.opts.classes.suggestions+" > li",s=>{s.preventDefault(),s.stopPropagation();let o=e(s.currentTarget).text().trim();t.opts.elm.search.field[0].value=o,i(o)}),e(document).on("click",()=>{e("ul."+t.opts.classes.suggestions).remove(),t.opts.elm.search.field[0].focus()}),e(window).on("resize",()=>{e("ul."+t.opts.classes.suggestions).remove()})}},window.ShortcutsHelper=function(e){this.init=(async()=>{e.opts.elm.topNav.on("click","a."+e.opts.classes.chromeApps,e=>{e.preventDefault(),chrome.tabs.update({url:"chrome://apps"})})})},window.TopPagesHelper=function(t){let s=null;this.init=(async()=>{o(),s=t.helper.model.getData("n/topPagesType"),l()});let o=()=>{e(window).on("resize",()=>{let e=i(),s=t.opts.elm.topPages.children("li").length();e.total!==s&&l()})},i=()=>{let e={total:8,rows:2};return window.innerWidth>650?e.total=8:window.innerWidth>490?e.total=6:window.innerWidth>340?e.total=4:e.total=0,window.innerHeight<280?e.total=0:window.innerHeight<420&&(e.total/=2,e.rows=1),e},l=()=>{a().then(s=>{let o=i();t.opts.elm.topPages.html(""),t.opts.elm.topPages.attr(t.opts.attr.perRow,o.total/o.rows),s.forEach(s=>{let o=e("<li />").html("<a href='"+s.url+"' title='"+s.title+"'><span>"+s.title+"</span></a>").appendTo(t.opts.elm.topPages);t.helper.model.call("favicon",{url:s.url}).then(e=>{e.img&&o.find("> a > span").prepend("<img src='"+e.img+"' />")});let i=e("<img />").appendTo(o.children("a"));t.helper.model.call("thumbnail",{url:s.url}).then(e=>{e.img&&i.attr("src",e.img).addClass(t.opts.classes.visible)})})})},n=()=>new Promise(e=>{t.helper.entry.init().then(()=>{e()})}),a=()=>new Promise(e=>{let t=i();if(t.total>0)switch(s){case"mostUsed":case"recentlyUsed":n().then(()=>{let t=r(s);e(t)});break;case"topPages":default:chrome.topSites.get(s=>{let o=s.slice(0,t.total);e(o)})}else e([])}),r=e=>{let s=i(),o=t.helper.entry.getAllBookmarkData(),l=t.helper.model.getData("u/mostViewedPerMonth"),n=t.helper.i18n.getLocaleSortCollator();"recentlyUsed"===e?o.sort((e,s)=>{let o=t.helper.entry.getData(e.id),i=t.helper.entry.getData(s.id),l=o?o.views.lastView:0,a=i?i.views.lastView:0;return l===a?n.compare(e.title,s.title):a-l}):"mostUsed"===e&&o.sort((e,s)=>{let o=t.helper.entry.getData(e.id),i=t.helper.entry.getData(s.id),a=o?o.views[l?"perMonth":"total"]:0,r=i?i.views[l?"perMonth":"total"]:0;return a===r?n.compare(e.title,s.title):r-a});let a=[];return o.some(e=>{if(t.helper.entry.isVisible(e.id)&&(a.push(e),a.length>=s.total))return!0}),a}},window.newtab=function(){this.opts={classes:{building:"building",initLoading:"initLoading",loading:"loading",chromeApps:"chromeApps",suggestions:"suggestions",active:"active",visible:"visible",darkMode:"dark"},attr:{type:"data-type",perRow:"data-perRow"},elm:{body:e("body"),title:e("head > title"),content:e("section#content"),topNav:e("section#content > nav"),search:{field:e("div#search > input[type='text']"),submit:e("div#search > button[type='submit']")},topPages:e("ul.topPages")},manifest:chrome.runtime.getManifest()},this.run=(()=>{chrome.permissions.contains({permissions:["tabs","topSites"]},function(e){e?t():chrome.tabs.update({url:"chrome-search://local-ntp/local-ntp.html"})})});let t=()=>{o(),s();let t=this.helper.template.loading().appendTo(this.opts.elm.body);this.opts.elm.body.addClass(this.opts.classes.initLoading),this.helper.model.init().then(()=>(!0===this.helper.model.getData("a/darkMode")&&this.opts.elm.body.addClass(this.opts.classes.darkMode),this.helper.i18n.init())).then(()=>(this.helper.font.init(),this.helper.stylesheet.init(),this.helper.stylesheet.addStylesheets(["newtab"],e(document)),this.helper.i18n.parseHtml(document),this.helper.topPages.init(),this.helper.search.init(),this.helper.shortcuts.init(),this.helper.edit.init(),e.delay(500))).then(()=>{t.remove(),this.opts.elm.body.removeClass([this.opts.classes.building,this.opts.classes.initLoading])})},s=()=>{this.helper={model:new window.ModelHelper(this),template:new window.TemplateHelper(this),i18n:new window.I18nHelper(this),font:new window.FontHelper(this),stylesheet:new window.StylesheetHelper(this),search:new window.SearchHelper(this),entry:new window.EntryHelper(this),shortcuts:new window.ShortcutsHelper(this),topPages:new window.TopPagesHelper(this),edit:new window.EditHelper(this)}},o=()=>{this.opts.manifest.content_scripts[0].css.forEach(t=>{e("head").append("<link href='"+chrome.extension.getURL(t)+"' type='text/css' rel='stylesheet' />")});let t=(e=0)=>{let s=this.opts.manifest.content_scripts[0].js[e];if(void 0!==s){let o=document.createElement("script");document.head.appendChild(o),o.onload=(()=>t(e+1)),o.src="/"+s}};t()}},(new window.newtab).run()})(jsu);