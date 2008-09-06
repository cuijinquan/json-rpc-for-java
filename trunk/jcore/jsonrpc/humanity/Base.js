1,{
  bIE: -1 < navigator.userAgent.indexOf("MSIE"),
  bUnload: (Array.prototype.each = function(f){var t = this, i = 0;for(;i < t.length; i++)f.apply(t[i], [t[i]]);return this}, 1),
  a:[],nDatetime:24 * 60 * 60 * 1000,
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
      e = e || window.event, e = e.target || e.srcElement;
      window.setTimeout(function(){
        t.setCookie(k, top.__aScroll[k] = e.scrollTop);
      }, 13);
    });
    return this;
  },
  updateUi(o)
  {
    var s = '';alert(o.data.each)
    if(!o.data)return alert("updateUi调用参数不正确，没有指定参数data");
    o.data.each(function(){ s += this.join(",") + '|'});
    JsonRpcClient().AJAX({
       data: "__ajaxParam_=" + s,
       url: o.url || document.location, 
       bAsync: !!o.fn, clbkFun:o.fn || function () {
		try {
			alert(arguments[0]);
		}catch (e) {}
	}});
  }
}