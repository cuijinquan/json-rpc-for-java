{
  bIE: false,
  nVer: 0,
  init: function()
  {
     this.bIE = -1 < navigator.userAgent.indexOf("MSIE");
     if(this.bIE)
     {
       this.nVer = parseFloat(/MSIE\s*(\d(\.\d)?);/g.exec(navigator.userAgent)[1]) ||  0;
       if(7 > this.nVer)
         try{document.execCommand("BackgroundImageCache", false, true)}catch(e){}
     }
     return this;
  },
  /* 一些初始化动作 */
  bUnload: (Array.prototype.each = function(f){var t = this, i = 0;for(;i < t.length; i++)f.apply(t[i], [t[i]]);return this}, 1),
  a:[],nDatetime:24 * 60 * 60 * 1000,
  /* 获取对象o的父亲节点 ，例如 Base.p(o, 'TR') */
  p:function(o,szTagName)
  {
    var i = 0;
    while(o && i++ < 500)
    {
      if((o = o.parentNode).nodeName === szTagName)
        return o;
    }
  }, /* 将a转换为有效的Array */
  A:function(a)
  {
   if(0 == arguments.length)
     a = this.A.caller.arguments;
    var i = 0, b = [];
    for(; i < a.length; i++)
       b.push(a[i]);
    return b;
  }, /* 获取id为s的对象 */
  id:function(s)
  {
    return s && s['constructor'] && String == s['constructor'] ? document.getElementById(s) : s
  },
  getByTagName: function(s,o)
  {
     return (o || document).getElementsByTagName(s)
  },
  getByName: function(s, o)
  {
     return (o || document).getElementsByName(s)
  }, /* 触发事件，例如: Base.fireEvent(o, 'click') */
  fireEvent:function(szElement,szEvent)
  {
    if(document.all)
       this.id(szElement).fireEvent('on' + szEvent);
    else{
      var evt = document.createEvent('HTMLEvents');
      evt.initEvent(szEvent,true,true);
      this.id(szElement).dispatchEvent(evt);
    }
  }, /* 将对象o绑定给fn函数 */
  bind:function(fn, o)
  {
     var _t = this, a = _t.A(arguments);a.shift();a.shift();
     return function(e)
     {
        fn.apply(o || _t, _t.A(arguments).concat(a));
     }
  }, /* unLoad窗口无效时卸载事件绑定 */
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
  }, /* 卸载事件,例如：Base.detachEvent(o, 'click', fn) */
  detachEvent:function(o, type, fn)
  {
    o = o || document.body;
    o.detachEvent ? o.detachEvent("on" + type, fn) : o.removeEventListener(type, fn, false);
  }, /* 绑定事件,例如：Base.addEvent(o, 'click', fn) */
  addEvent:function()
  {
    var o = arguments[0], t = arguments[1], f = arguments[2], _this = this, fn = function(){
      _this.bIE && o.attachEvent('on' + t, f) || o.addEventListener(t, f, false);
      o != window && _this.a.push([o, t, f]);
      _this.bUnload && (_this.bUnload = 0, _this.addEvent(window, "unload", _this.unLoad));
    };
    'load' != t && window.setTimeout(fn, 13) || fn();
    return this;
  }, /* 获取名字为k的cookie,例如：Base.getCookie('myVar') */
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
  }, /* 设置名字为k的cookie,例如：Base.setCookie(k,'myVar') */
  setCookie: function(k, v)
  {
    var d = new Date(), s = k + "=" + escape(v) + ";expires=";
    d.setTime(d.getTime() + 365 * this.nDatetime);
    if(!v)s += "Fri, 31 Dec 1999 23:59:59 GMT;";
    else s += d.toGMTString();
    document.cookie = s;
    return this;
  }, /* 清楚保留的o滚动条信息,例如：Base.clearScroll(o) */
  clearScroll:function(o)
  {
    var k = this.id(o).id;
    delete top.__aScroll[k];
    this.setCookie(k, null);
  }, /* 设置对象o自动保存滚动条信息,例如：Base.autoSaveScroll(o) */
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
  }, /* 异步刷新区域的封装，还没有实现完整 */
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
  }, /* 创建图层 */
  createDiv:function()
  {
     var o = null, b = !!arguments[0] || false,
         p = arguments[0], k, a1 = [];
     if(p && p["id"] && (o = this.id(p["id"])))return o;
     o = document.createElement("div")
     if(b)
     {
       p["className"] || (p["className"] = "x-combo-list");
       for(k in p)o[k] = p[k];
     }
     document.body.appendChild(o);
     if(!this.id("xuiSelectShdow"))
     {
       a1.push("<div class=\"x-shadow\" id=\"xuiSelectShdow\">");
       a1.push("<div class=\"xst\"><div class=\"xstl\"></div><div class=\"xstc\" id=\"xuislctsd1\"></div><div class=\"xstr\"></div></div>");
       a1.push("<div class=\"xsc\" id=\"xuislctsd2\"><div class=\"xsml\" id=\"showdxsml\"></div><div class=\"xsmc\" id=\"xuislctsd3\"></div><div class=\"xsmr\"></div></div>");
       a1.push("<div class=\"xsb\"><div class=\"xsbl\"></div><div class=\"xsbc\" id=\"xuislctsd4\"></div><div class=\"xsbr\"></div></div></div>");
       this.insertHtml(document.body, "beforeend", a1.join(""));
       a1 = null;
       if(this.bIE && 5 < this.nVer && 7 > this.nVer)
       	  this.id("xuiSelectShdow").style.filter = "progid:DXImageTransform.Microsoft.alpha(opacity=30) progid:DXImageTransform.Microsoft.Blur(pixelradius=4)";
     }
     return o;
  },/* 显示阴影图层 */
  showShadow:function(o)
  {
      var old = o;
      o = o.currentStyle || o.runtimeStyle || o.style || null;
      var w = parseFloat(o.width) + 10, h = parseFloat(o.height || 1) + 7,oTmp = this.id("xuiSelectShdow") || {},
         obj = oTmp.style,
         left = parseFloat(o.left) - 4, top = parseFloat(o.top) - 2 , zIndex = (o.zIndex || 11000) - 1;
     if(!obj || !h || !w || 12 > h)return this;
     obj.width = w + "px", obj.height = h + "px",
     obj.top = top + "px", obj.left = left + "px",
     obj.zIndex = zIndex, obj.position = "absolute";
     oTmp = obj;
     if(!(obj = this.id("xuislctsd4")))return this;
     obj.style.width = this.id("xuislctsd3").style.width =
     this.id("xuislctsd1").style.width = (w - 12) + "px";
     obj = this.id("xuislctsd2");
     obj.style.height = (h - 12) + "px";
     o = obj.getElementsByTagName("div");
     for(w = 0; w < o.length; w++)o[w].style.height = obj.style.height;
     oTmp.display = old.display = "block";
  },hiddenShadow:function(o)
  {
    var oTmp;
    if(oTmp = this.id("xuiSelectShdow"))oTmp.style.display='none';
    o.style.display = 'none',o.innerHTML = "";
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
  /* 事件返回false */
  preventDefault:function(e)
  {
      e = e || window.event;
      return e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  }, /* 停止事件往上层传递 */
  stopPropagation:function(e)
  {
     e = e || window.event;
     return e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
  },  /* 在对象el中插入html代码 */
  insertHtml:function(el, where, html){
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
  fnMvIstPoint: function(o, n1, n2, e)
  {
    try{
     e = e || window.event || null;
     o = o || e.target || e.srcElement || null;
     var bErr = false;
     if("undefined" != typeof document.selection)
     {
      try{
        /* To get cursor position, get empty selection range*/
        var oSel = document.selection.createRange();
        /* Move selection start to 0 position */
        oSel.moveStart ('character', -o.value.length);
        oSel.moveEnd("character", -o.value.length);
        /* Move selection start and end to desired position */
        oSel.moveStart('character', n1);
        oSel.moveEnd('character', n2 || 0);
        r.select();
        }catch(e){bErr=true;}
     }
     if(bErr && o.createTextRange)
     {
  	    var r = o.createTextRange();
  	    /* r.moveStart('character', -o.value.length), r.moveEnd('character', -o.value.length); */
  	    r.moveStart('character', n1);
  	    /* r.moveEnd('character', n2 || 0); */
  	    r.collapse(true);
  	    r.select();
     }else
     {
         o.startSelection = n1 - 1;
         o.selectionEnd = n2 || n1 || 0;
         o.focus();
     }
    }catch(e){}
  }, /* 判断n是否为闰年 */
     isLeapYear:function(n)
     {
        return(0 == n % 400 || (0 == n % 4 && 0 != n % 100))
     },/* 获取对象o，或者今天是星期几，返回0是星期天，或者getWeek(2009,12,30) */
    getWeek:function(o)
    {
       if(3 == arguments.length)arguments[1]--,o = new Date(arguments[0], arguments[1], arguments[2]);
       return o.getDay();
       /* 两种计算星期几的公式 
       var y = o.getFullYear(), m = o.getMonth() + 1, day = o.getDate(),
           ds = day, i,
           a = this.pkData = [31,(this.isLeapYear(y) ? 29 : 28),31,30,31,30,31,31,30,31,30,31];
       this.year = y, this.month = m, this.day = day;
           for(i = 0; i < m - 1; i++)
              ds += a[i];
       // return parseInt((ds + 2 * m + 3 * (m + 1) / 5 + y + y / 4 - y / 100 + y / 400) % 7);
       return y--, parseInt((y + y / 4 - y / 100 + y / 400 + ds) % 7)
       */
    }, /* 保证fn只能在一个线程里执行 */
     RunOne: function(fn, o)
     {
        var _t = this;
        new function(){
	        if(this._RunOne)return o || _t;
	        this._RunOne = true;
	        fn.call(o || _t);
	        this._RunOne = false;
        }
     },/* 显示图层，包含阴影图层；o为参照定位图层显示位置的对象，oDiv为要显示的图层对象，w为宽度，默认为o的宽度就设置为0，h为显示高度 */
	showDiv: function(o, oDiv, w, h)
	{
	  var oR = this.getOffset(o), style = oDiv.style, k, 
	  p = { height: (h || 1) + 'px', left: (oR[0] - (this.bIE ? 2 : 0)) + "px", 
              top: (oR[1] + oR[3] - (this.bIE ? 5 : 2)) + "px", display:'block',
              position: "absolute",
              width: ((this.bIE ? 2 : 0) + parseInt(w || o.clientWidth || oR[2])) + "px"};
      for(k in p)style[k] = p[k];
      this.showShadow(oDiv);
	}
}