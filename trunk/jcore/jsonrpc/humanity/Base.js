1,{
  bIE: -1 < navigator.userAgent.indexOf("MSIE"),
  bUnload: 1,
  a:[],
  A:function(a)
  {
    var i = 0, b = [];
    for(; i < a.length; i++)
       b.push(a[i]);
    return b;
  },
  id:function(s)
  {
    return String == s['constructor'] ? document.getElementById(s) : s
  },
  unLoad:function(o, t, f)
  {
    var a = this.a, i = a.length - 1;
    if(_this.bIE)for(; i > -1; i--)a[i][0].detachEvent(a[i][1], a[i][2]);
    else for(; i > -1; i--)a[i][0].removeEventListener(a[i][1], a[i][2], false);
    delete a, delete this.a;
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
    var aCookie = (document.cookie || '').split(";");
    for (var i = 0; i < aCookie.length; i++)
    {
       var aCrumb = aCookie[i].split("=");
       if (k === aCrumb[0])
         return unescape(aCrumb[1]);
    }
    return "";
  },
  setCookie: function(k, v)
  {
    var aCookie = (document.cookie || '').split(";");
    if(0 < aCookie.length)
    {
      for (var i = aCookie.length - 1; i > -1; i--)
      {
         var aCrumb = aCookie[i].split("="), d = new Date();
         if (k === aCrumb[0])
         {
           d.setYear(d.getYear() + 1);
           null != v && (aCookie[i] = k + "=" + escape(v) + ";expires=" + d.toGMTString()) || (aCookie[i] = '' + ";expires=Fri, 31 Dec 1999 23:59:59 GMT;");
           break;
         }
      }
      document.cookie = aCookie.join(";");
    }
    else document.cookie = k + "=" + escape(v) + ";" + aCookie.join(";");
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
    var t = this, k = o.id, s = t.getCookie(k) || top.__aScroll[k], b = true;
    s && t.addEvent(window, 'load', function(e){b = false,o.scrollTop = s,t.setCookie(k, null),delete top.__aScroll[k]});
    t.addEvent(o, 'scroll', function(e)
    {
      e = e || window.event, e = e.target || e.srcElement;
      window.setTimeout(function(){
        b && t.setCookie(k, top.__aScroll[k] = e.scrollTop);document.title = k + "[" + t.getCookie(k) + "]";
      }, 13);
    });
    return this;
  }
}