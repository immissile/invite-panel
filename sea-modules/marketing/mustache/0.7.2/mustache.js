/*! mustache - v0.7.2 - 2013-05-13
* Copyright (c) 2013 ; Licensed  */
define("sea-modules/marketing/mustache/0.7.2/mustache",[],function(t,e){(function(t,n){if("object"==typeof e&&e)n(e);else{var i={};n(i),"function"==typeof define&&define.amd?define(i):t.Mustache=i}})(this,function(t){function e(t,e){return k.call(t,e)}function n(t){return!e(v,t)}function i(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function r(t){return(t+"").replace(/[&<>"'\/]/g,function(t){return _[t]})}function a(t){this.string=t,this.tail=t,this.pos=0}function o(t,e){this.view=t||{},this.parent=e,this._cache={}}function s(){this.clearCache()}function c(e,n,i,r){for(var a,o,s,l="",u=0,h=e.length;h>u;++u)switch(a=e[u],o=a[1],a[0]){case"#":if(s=i.lookup(o),"object"==typeof s)if(b(s))for(var p=0,f=s.length;f>p;++p)l+=c(a[4],n,i.push(s[p]),r);else s&&(l+=c(a[4],n,i.push(s),r));else if("function"==typeof s){var g=null==r?null:r.slice(a[3],a[5]);s=s.call(i.view,g,function(t){return n.render(t,i)}),null!=s&&(l+=s)}else s&&(l+=c(a[4],n,i,r));break;case"^":s=i.lookup(o),(!s||b(s)&&0===s.length)&&(l+=c(a[4],n,i,r));break;case">":s=n.getPartial(o),"function"==typeof s&&(l+=s(i));break;case"&":s=i.lookup(o),null!=s&&(l+=s);break;case"name":s=i.lookup(o),null!=s&&(l+=t.escape(s));break;case"text":l+=o}return l}function l(t){for(var e,n=[],i=n,r=[],a=0,o=t.length;o>a;++a)switch(e=t[a],e[0]){case"#":case"^":r.push(e),i.push(e),i=e[4]=[];break;case"/":var s=r.pop();s[5]=e[2],i=r.length>0?r[r.length-1][4]:n;break;default:i.push(e)}return n}function u(t){for(var e,n,i=[],r=0,a=t.length;a>r;++r)e=t[r],e&&("text"===e[0]&&n&&"text"===n[0]?(n[1]+=e[1],n[3]=e[3]):(n=e,i.push(e)));return i}function h(t){return[RegExp(i(t[0])+"\\s*"),RegExp("\\s*"+i(t[1]))]}function p(e,r){function o(){if(E&&!P)for(;U.length;)delete x[U.pop()];else U=[];E=!1,P=!1}if(e=e||"",r=r||t.tags,"string"==typeof r&&(r=r.split(g)),2!==r.length)throw Error("Invalid tags: "+r.join(", "));for(var s,c,p,v,k,w=h(r),b=new a(e),_=[],x=[],U=[],E=!1,P=!1;!b.eos();){if(s=b.pos,p=b.scanUntil(w[0]))for(var C=0,j=p.length;j>C;++C)v=p.charAt(C),n(v)?U.push(x.length):P=!0,x.push(["text",v,s,s+1]),s+=1,"\n"==v&&o();if(!b.scan(w[0]))break;if(E=!0,c=b.scan(y)||"name",b.scan(f),"="===c?(p=b.scanUntil(m),b.scan(m),b.scanUntil(w[1])):"{"===c?(p=b.scanUntil(RegExp("\\s*"+i("}"+r[1]))),b.scan(d),b.scanUntil(w[1]),c="&"):p=b.scanUntil(w[1]),!b.scan(w[1]))throw Error("Unclosed tag at "+b.pos);if(k=[c,p,s,b.pos],x.push(k),"#"===c||"^"===c)_.push(k);else if("/"===c){if(0===_.length)throw Error('Unopened section "'+p+'" at '+s);var A=_.pop();if(A[1]!==p)throw Error('Unclosed section "'+A[1]+'" at '+s)}else if("name"===c||"{"===c||"&"===c)P=!0;else if("="===c){if(r=p.split(g),2!==r.length)throw Error("Invalid tags at "+s+": "+r.join(", "));w=h(r)}}var A=_.pop();if(A)throw Error('Unclosed section "'+A[1]+'" at '+b.pos);return x=u(x),l(x)}var f=/\s*/,g=/\s+/,v=/\S/,m=/\s*=/,d=/\s*\}/,y=/#|\^|\/|>|\{|&|=|!/,k=RegExp.prototype.test,w=Object.prototype.toString,b=Array.isArray||function(t){return"[object Array]"===w.call(t)},_={"&":"&","<":"<",">":">",'"':'"',"'":"'","/":"/"};a.prototype.eos=function(){return""===this.tail},a.prototype.scan=function(t){var e=this.tail.match(t);return e&&0===e.index?(this.tail=this.tail.substring(e[0].length),this.pos+=e[0].length,e[0]):""},a.prototype.scanUntil=function(t){var e,n=this.tail.search(t);switch(n){case-1:e=this.tail,this.pos+=this.tail.length,this.tail="";break;case 0:e="";break;default:e=this.tail.substring(0,n),this.tail=this.tail.substring(n),this.pos+=n}return e},o.make=function(t){return t instanceof o?t:new o(t)},o.prototype.push=function(t){return new o(t,this)},o.prototype.lookup=function(t){var e=this._cache[t];if(!e){if("."==t)e=this.view;else for(var n=this;n;){if(t.indexOf(".")>0){e=n.view;for(var i=t.split("."),r=0;e&&i.length>r;)e=e[i[r++]]}else e=n.view[t];if(null!=e)break;n=n.parent}this._cache[t]=e}return"function"==typeof e&&(e=e.call(this.view)),e},s.prototype.clearCache=function(){this._cache={},this._partialCache={}},s.prototype.compile=function(e,n){var i=this._cache[e];if(!i){var r=t.parse(e,n);i=this._cache[e]=this.compileTokens(r,e)}return i},s.prototype.compilePartial=function(t,e,n){var i=this.compile(e,n);return this._partialCache[t]=i,i},s.prototype.getPartial=function(t){return t in this._partialCache||!this._loadPartial||this.compilePartial(t,this._loadPartial(t)),this._partialCache[t]},s.prototype.compileTokens=function(t,e){var n=this;return function(i,r){if(r)if("function"==typeof r)n._loadPartial=r;else for(var a in r)n.compilePartial(a,r[a]);return c(t,n,o.make(i),e)}},s.prototype.render=function(t,e,n){return this.compile(t)(e,n)},t.name="mustache.js",t.version="0.7.2",t.tags=["{{","}}"],t.Scanner=a,t.Context=o,t.Writer=s,t.parse=p,t.escape=r;var x=new s;t.clearCache=function(){return x.clearCache()},t.compile=function(t,e){return x.compile(t,e)},t.compilePartial=function(t,e,n){return x.compilePartial(t,e,n)},t.compileTokens=function(t,e){return x.compileTokens(t,e)},t.render=function(t,e,n){return x.render(t,e,n)},t.to_html=function(e,n,i,r){var a=t.render(e,n,i);return"function"!=typeof r?a:(r(a),void 0)}})});