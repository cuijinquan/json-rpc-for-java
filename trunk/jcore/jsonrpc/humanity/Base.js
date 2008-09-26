{
  bIE: -1 < navigator.userAgent.indexOf("MSIE"),
  nVer: this.bIE ? parseFloat(/MSIE\s*(\d\.\d)/.exec(navigator.userAgent)[1]): 0,
  bUnload: (Array.prototype.each = function(f){var t = this, i = 0;for(;i < t.length; i++)f.apply(t[i], [t[i]]);return this}, 1),
  a:[],nDatetime:24 * 60 * 60 * 1000,
  p:function(o,szTagName)
  {
    var i = 0;
    while(o && i++ < 500)
    {
      if((o = o.parentNode).nodeName === szTagName)
        return o;
    }
  },
  A:function(a)
  {
   if(0 == arguments.length)
     a = this.A.caller.arguments;
    var i = 0, b = [];
    for(; i < a.length; i++)
       b.push(a[i]);
    return b;
  }, 
  id:function(s)
  {
    return s && s['constructor'] && String == s['constructor'] ? document.getElementById(s) : s
  },
  fireEvent:function(szElement,szEvent)
  {  
    if(document.all)
       this.id(szElement).fireEvent('on' + szEvent);  
    else{  
      var evt = document.createEvent('HTMLEvents');  
      evt.initEvent(szEvent,true,true);
      this.id(szElement).dispatchEvent(evt);
    }
  },
  bind:function(fn, o)
  {
     var _t = this, a = _t.A(arguments);a.shift();a.shift();
     return function(e)
     {
        fn.apply(o, _t.A(arguments).concat(a));
     }
  },
  unLoad:function(o, t, f)
  {
    var b = this.a, i;
    if(b)
    {
	    i = b.length - 1;
	    if(_this.bIE)for(; i > -1; i--)b[i][0].detachEvent(b[i][1], b[i][2]);
	    else for(; i > -1; i--)b[i][0].removeEventListener(b[i][1], b[i][2], false);
	    delete b, delete this.a;
    }
  },detachEvent:function(o, type, fn)
  {
    o = o || document.body;
    o.detachEvent ? o.detachEvent("on" + type, fn) : o.removeEventListener(type, fn, false);
  },
  addEvent:function()
  {
    var o = arguments[0], t = arguments[1], f = arguments[2], _this = this, fn = function(){
      _this.bIE && o.attachEvent('on' + t, f) || o.addEventListener(t, f, false);
      o != window && _this.a.push([o, t, f]);
      _this.bUnload && (_this.bUnload = 0, _this.addEvent(window, "unload", _this.unLoad));
    };
    'load' != t && window.setTimeout(fn, 13) || fn();
    return this;
  },
  getCookie:function(k)
  {
    var a = (document.cookie || '').split(";");
    for (var i = 0; i < a.length; i++)
    {
       var b = a[i].split("=");
       if(k == b[0].replace(/(^\s*)|(\s*$)/g, ''))
         return unescape(b[1]);
    }
    return "";
  },
  setCookie: function(k, v)
  {
    var d = new Date(), s = k + "=" + escape(v) + ";expires=";
    d.setTime(d.getTime() + 365 * this.nDatetime);
    if(!v)s += "Fri, 31 Dec 1999 23:59:59 GMT;";
    else s += d.toGMTString();
    document.cookie = s;
    return this;
  },
  clearScroll:function(o)
  {
    var k = this.id(o).id;
    delete top.__aScroll[k];
    this.setCookie(k, null);
  },
  autoSaveScroll: function(o)
  {
    top.__aScroll || (top.__aScroll = []);
    o = this.id(o);
    var t = this, k = o.id, s = t.getCookie(k) || top.__aScroll[k];
    s && t.addEvent(window, 'load', function(e){o.scrollTop = s,t.setCookie(k, null),delete top.__aScroll[k]});
    t.addEvent(o, 'scroll', function(e)
    {
      e = t.FromEventObj(e);
      window.setTimeout(function(){
        t.setCookie(k, top.__aScroll[k] = e.scrollTop);
      }, 13);
    });
    return this;
  },
  updateUi:function(o)
  {
    var s = [];
    if(!o.data)return alert("updateUi调用参数不正确，没有指定参数data");
    o.data.each(function(){ s.push(this.join(","))});
    JsonRpcClient().AJAX({
       data: "__ajaxParam_=" + s.join('|'),
       url: o.url || document.location.href,
       bAsync: !!o.fn,
       clbkFun: o.fn || function () {
    try {
      alert(arguments[0]);
    }catch (e) {}
  }});
  },
  createDiv:function()
  {
     var o = null, b = !!arguments[0] || false,
         p = arguments[0], k, a1 = [];
     if(p && p["id"] && (o = this.id(p["id"])))return o;
     o = document.createElement("div")
     if(b)
     {
       for(k in p)
          o[k] = p[k];
     }
     document.body.appendChild(o);
     if(!this.id("xuiSelectShdow"))
     {
       a1.push("<div class=\"x-shadow\" id=\"xuiSelectShdow\">");
       a1.push("<div class=\"xst\"><div class=\"xstl\"></div><div class=\"xstc\" id=\"xuislctsd1\"></div><div class=\"xstr\"></div></div>");
       a1.push("<div class=\"xsc\" id=\"xuislctsd2\"><div class=\"xsml\"></div><div class=\"xsmc\" id=\"xuislctsd3\"></div><div class=\"xsmr\"></div></div>");
       a1.push("<div class=\"xsb\"><div class=\"xsbl\"></div><div class=\"xsbc\" id=\"xuislctsd4\"></div><div class=\"xsbr\"></div></div></div>");
       this.insertHtml(document.body, "beforeend", a1.join(""));
       a1 = null;
     }
     return o;
  },
  regTimer:function(fn, n)
  {
    var nTime = setInterval(function()
    {
      if(fn())clearInterval(nTime);
    }, n || 13);
    return nTime;
  },clearTimer:function(n){clearInterval(n)},
  getOffset:function(o)
  {
    var a = [o.offsetLeft, o.offsetTop, o.offsetWidth,o.offsetHeight, 0, 0], r;
    if(o.getBoundingClientRect)
    {
       r = o.getBoundingClientRect();
       a[0] = r.left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) - document.documentElement.clientLeft;
       a[1] = r.top + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - document.documentElement.clientTop;
    }
    else
    {
        while(o = o.offsetParent)
        {
          a[0] += (o.offsetLeft || 0) - (o.scrollLeft || 0);
          a[1] += (o.offsetTop || 0) - (o.scrollTop || 0);
          a[4] += o.scrollLeft || 0;
          a[5] += o.scrollTop || 0;
          if(document.body == o)break;
        }
     }
     return a;
   },
  FromEventObj: function(e){return (e = e || window.event).target || e.srcElement},
  preventDefault:function(e)
  {
      return e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  },
  stopPropagation:function(e)
  {
     return e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
  },insertHtml:function(el, where, html){
  where = where.toLowerCase();
  if(el.insertAdjacentHTML){
      switch(where){
          case "beforebegin":
              el.insertAdjacentHTML('BeforeBegin', html);
              return el.previousSibling;
          case "afterbegin":
              el.insertAdjacentHTML('AfterBegin', html);
              return el.firstChild;
          case "beforeend":
              el.insertAdjacentHTML('BeforeEnd', html);
              return el.lastChild;
          case "afterend":
              el.insertAdjacentHTML('AfterEnd', html);
              return el.nextSibling;
      }
  }
  var range = el.ownerDocument.createRange(), frag;
  switch(where){
       case "beforebegin":
          range.setStartBefore(el);
          frag = range.createContextualFragment(html);
          el.parentNode.insertBefore(frag, el);
          return el.previousSibling;
       case "afterbegin":
          if(el.firstChild){
              range.setStartBefore(el.firstChild);
              frag = range.createContextualFragment(html);
              el.insertBefore(frag, el.firstChild);
              return el.firstChild;
          }else{
              el.innerHTML = html;
              return el.firstChild;
          }
      case "beforeend":
          if(el.lastChild){
              range.setStartAfter(el.lastChild);
              frag = range.createContextualFragment(html);
              el.appendChild(frag);
              return el.lastChild;
          }else{
              el.innerHTML = html;
              return el.lastChild;
          }
      case "afterend":
          range.setStartAfter(el);
          frag = range.createContextualFragment(html);
          el.parentNode.insertBefore(frag, el.nextSibling);
          return el.nextSibling;
      }
  },/* 操作输入对象o上的选择、光标位置，e为事件对象，没有时为null */
  /* FireFox下n2等于光标位置 */
  fnMvIstPoint: function(o, e, n1, n2)
  {
    try{
     e = e || window.event || null;
     o = o || e.target || e.srcElement;
     var bErr = false;
     o.focus && o.focus();
     if(document.selection)
     {
      try{
        /* To get cursor position, get empty selection range*/
        var oSel = document.selection.createRange();
        /* Move selection start to 0 position */
        oSel.moveStart ('character', -o.value.length);
        /* Move selection start and end to desired position */
        oSel.moveStart('character', n1);
        oSel.moveEnd('character', n2 || 0);
        r.select();
        }catch(e){bErr=true}
     }
     if(bErr)
     {
	     if(o.createTextRange)
	     {
	  	    var r = o.createTextRange();
	  	    r.moveStart('character', n1);
	  	    r.moveEnd('character', n2 || 0);
	  	    r.select();
	     }
	     else
	     {
	         o.startSelection = n1;
	         o.selectionEnd = n2 || n1 || 0;
	         o.focus();
	         /*o.select();*/
	     }
     }
    }catch(e){alert(e.message)}
  }, /* 判断n是否为闰年 */
     isLeapYear:function(n)
     {
        return(0 == n % 400 || (0 == n % 4 && 0 != n % 100))
     }
}