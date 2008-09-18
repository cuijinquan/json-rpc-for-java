{
  bIE: -1 < navigator.userAgent.indexOf("MSIE"),
  bUnload: (Array.prototype.each = function(f){var t = this, i = 0;for(;i < t.length; i++)f.apply(t[i], [t[i]]);return this}, 1),
  a:[],nDatetime:24 * 60 * 60 * 1000,
  A:function(a)/*将对象a转换为有效的Array*/
  {
    var i = 0, b = [];
    for(; i < a.length; i++)
       b.push(a[i]);
    return b;
  },/*根据ID获取对象*/
  id:function(s)
  {
    return String == s['constructor'] ? document.getElementById(s) : s
  },/*将对象o绑定到fn作为他的上下文this*/
  bind:function(fn, o)
  {
     return function(e)
     {
        fn.apply(o, arguments);
     }
  },
  unLoad:function(o, t, f)
  {
    var a = this.a, i = a.length - 1;
    if(_this.bIE)for(; i > -1; i--)a[i][0].detachEvent(a[i][1], a[i][2]);
    else for(; i > -1; i--)a[i][0].removeEventListener(a[i][1], a[i][2], false);
    delete a, delete this.a;
  },/*绑定对象*/
  addEvent:function()
  {
    var o = arguments[0], t = arguments[1], f = arguments[2], _this = this, fn = function(){
      _this.bIE && o.attachEvent('on' + t, f) || o.addEventListener(t, f, false);
      o != window && _this.a.push([o, t, f]);
      _this.bUnload && (_this.bUnload = 0, _this.addEvent(window, "unload", _this.unLoad));
    };
    'load' != t && window.setTimeout(fn, 13) || fn();
    return this;
  },/*获取cookie*/
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
  },/*设置cookie*/
  setCookie: function(k, v)
  {
    var d = new Date(), s = k + "=" + escape(v) + ";expires=";
    d.setTime(d.getTime() + 365 * this.nDatetime);
    if(!v)s += "Fri, 31 Dec 1999 23:59:59 GMT;";
    else s += d.toGMTString();
    document.cookie = s;
    return this;
  },/*清除保留滚动条的标志*/
  clearScroll:function(o)
  {
    var k = this.id(o).id;
    delete top.__aScroll[k];
    this.setCookie(k, null);
  },/*自动保存滚动条位置*/
  autoSaveScroll: function(o)
  {
    top.__aScroll || (top.__aScroll = []);
    o = this.id(o);
    var t = this, k = o.id, s = t.getCookie(k) || top.__aScroll[k];
    s && t.addEvent(window, 'load', function(e){o.scrollTop = s,t.setCookie(k, null),delete top.__aScroll[k]});
    t.addEvent(o, 'scroll', function(e)
    {
      e = e || window.event, e = e.target || e.srcElement;
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
  },/*创建div对象*/
  createDiv:function()
  {
     var o = document.createElement("div"), b = !!arguments[0] || false,
         p = arguments[0], k;
     if(b)
     {
       for(k in p)
          o[k] = p[k];
     }
     return o;
  },/*一个Timer定时器*/
  regTimer:function(fn)
  {
    var nTime = setInterval(function()
    {
      if(fn())clearInterval(nTime);
    }, 13);
  },/*获取对象的*/
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
  /*事件发生的对象*/
  _oFromEvent: function(e){return (e = e || window.event).target || e.srcElement},
  /*获取事件下的输入对象*/ 
  getSelectDataStr:function(oE)
  { 
   	var _t = this, a = slctIptData[oE.id]["collection"], a1 = ["<table style=\"width:100%;\">"], i, j, o, k,
             b = slctIptData[oE.id]["displayFields"], bDisp = !b;
    !bDisp && (b = b.split(/[,;\|\/]/));
   	for(i = 0; i < a.length; i++)
    {
      o = a[i];
      a1.push("<tr>");
      if(bDisp)
      {
          for(k in o)
     	  if("_id_" != k) 
             a1.push("<td>"), a1.push(o[k]), a1.push("</td>");
      }
      else
      {
        for(j = 0; j < b.length; j++)
        {
          a1.push("<td>"), a1.push(o[b[j]]), a1.push("</td>");
        }
      }
      a1.push("</tr>");
    }
    a1.push("</table>");
    return a1.join("")
  },
  /*显示下拉列表*/
  showSelectDiv: function(e, obj)
  {
    var _t = this, szId = "_Xui_SelectDiv", o = this.id(szId), 
        oE = _t._oFromEvent(e), oR = _t.getOffset(oE),h = oR[3] - 1, w = oR[2], 
        p = {left: oR[0] + "px", top: (oR[1] + h) + "px", display:'block', 
        width: ((_t.bIE ? 2 : 0) + ((obj||{}).width || oE.clientWidth || w)) + "px"}, 
        k;
    
    if(!o)
    {
       o = this.createDiv({className:"selectInput_FloatDiv", id: szId}),
       document.body.appendChild(o);
    }
    o.innerHTML = _t.getSelectDataStr(oE);
    /* 如果上方的空间大于现实高度就在上面显示*/
    if(190 < p.top - document.body.scrollTop)p.top =  p.top - (o.clientHeight || 170) - h;
    /* 离开的时候隐藏*/
    !oE[szId] && _t.addEvent(oE, 'blur', _t.bind(_t.hiddenSelectDiv, _t)), oE[szId] = o.id;
    for(k in p)
      o.style[k] = p[k];
    this.stopPropagation(e);
  },/*隐藏selectInput*/
  hiddenSelectDiv:function()
  {
    this.id('_Xui_SelectDiv').style.display = 'none';
  },/*事件返回false*/
  preventDefault:function(e)
  {
      return e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  },/*停止事件往父亲对象传递事件*/
  stopPropagation:function(e)
  {
     return e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
  }
}