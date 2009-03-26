{
  bIE: false,
  nVer: 0,
  replaceHtml: function(el, html) {
	var oldEl = typeof el === "string" ? document.getElementById(el) : el;
	if(this.isIE)return oldEl.innerHTML = html, oldEl;
	var newEl = oldEl.cloneNode(false);
	newEl.innerHTML = html;
	oldEl.parentNode.replaceChild(newEl, oldEl);
	return newEl;
},/* 获取top中的菜单数据 */
getMenuData:function()
{
   return window.topMenu || (window.topMenu = top.frames[0].topMenu);
},
/* 弹出消息提示 */
PopMsgWin:function(o)
{
   Base.PopMsgWin.obj = o;
   var aTp = [Ext.MessageBox.INFO, Ext.MessageBox.QUESTION, Ext.MessageBox.WARNING, Ext.MessageBox.ERROR], obj = {
           title: '系统提示信息',
           msg: o.message || o,
           buttons: {"ok": "确定"},
           fn: function(btn){
              if("ok" == btn)
              {
                if(o.okScript)
                  try{if("function" == typeof o.okScript)o.okScript();else eval(o.okScript)}catch(e){};
                if(o.okUrl)location.href = contextPath + o.okUrl;
              }
              else if("no" == btn)
              {
                 if(o.errScript)try{if("function" == typeof o.errScript)o.errScript();else eval(o.errScript)}catch(e){};
                 if(o.errUrl)location.href = contextPath + o.errUrl;
              }
              if(o.field)
              {
                var oIp = Base.getObj(o.field);
                if(0 < oIp.length)oIp.focus();else (oIp = Base.getObj("dto(" + o.field + ")")).focus();
              }
           },
           icon: aTp[o.type || 0]
       };
   if(o.field)obj.animEl = this.getObj(o.field).focus().attr("id");
   if(o.errUrl || o.errScript || 1 == o.type)obj.buttons = {"ok": "确定", "no": "取消"};
   Ext.MessageBox.show(obj);
},/* 异步更新指定property或者id的对象，包括：输入对象、panel、grid */
AjaxUpdateUi: function(szProperty, szReqCode, szUrl, szData, szDesId, isAsync)
{
   var form, reqCode;
   if (!szUrl && (form = $("form:first")[0])
            && form.action && "undefind" != typeof 
              (reqCode = $("input[name=reqCode]")[0]).value){
     szUrl = form.action + "?" + "reqCode=" + (szReqCode || reqCode.value);
   } else {
     /*如果设置了szData的话，reqCode就没有被设置*/
     szReqCode && (szUrl = contextPath + szUrl + "?reqCode=" + szReqCode) || (szUrl = contextPath + szUrl);  
   }
   szData || (szData = ":input");
   var _t = this;
   if(szReqCode)Base.setValue("reqCode", szReqCode);
   $(document).ready(function()
   {
     var obj = _t.getObj(szProperty), szId;
     obj.attr('id', szId = obj.attr('id') || szProperty);
     ("undefined" == typeof isAsync)&&(isAsync = !szDesId);
     if(!szReqCode && obj.attr('reqCode'))Base.setValue("reqCode", szReqCode = obj.attr('reqCode'));
     _t.updateUi({url:szUrl,bAsync: isAsync,postData:[_t.getAllInput(szData)],data:[[szDesId || szId,1,""]],fn:function(s){
        
        var o = null; 
        if(0 < obj.length)
          o = "INPUT" == obj[0].nodeName ? $(_t.p(obj[0],"DIV")).parent("div") : obj;
        var script = "", n = s.indexOf("<script");
        if(-1 < n)
        {
           script = s.substr(n);
           script = script.substr(0, script.lastIndexOf("</" + "script>"));
           script = script.replace(/^\s*<script[^>]*>\s*<!--\/\/--><!\[CDATA\[\/\/><!--/, "");
           script = script.replace(/\/\/--><!\]\]>\s*$/, "");
        }
        s = s.substr(s.indexOf("<body>") + 6);
        if(!szDesId)
        {
          s = s.replace(/^\s*<div[^>]*>/gmi, "");
          s = s.substr(0, s.lastIndexOf("</div>"));
        }
        try{
          script && ((false == isAsync)&& eval(script) || setTimeout(function(){eval(script)}, 777));
        }catch(e){
          alert("异步调用错误:执行返回的脚本出错" + ",错误消息是:" + e.message);
        }
        if ("undefined" == typeof Base.PopMsgWin.obj || 3 != Base.PopMsgWin.obj.type ){
          if(o && s && 20 < s.length){o[0].innerHTML = s;}
        }
     }});
   });
   if(false == isAsync){return Base.PopMsgWin.obj.type;}/*如果是同步的话，返回错误的类型值*/
},
/*异步更新tab页的内容*/
/*tabId: tab页的id， reqCode: action的方法, url,:请求的url, data:请求的数据, destId:请求异步内容的id*/
AjaxTab: function(tabId, szReqCode, url, data, destId){
   var _t = this;
   /*如果没有设置reqCode并且设置了data的话，reqCode就没有被设置*/
   (szReqCode && (url = contextPath + url + "?reqCode=" + szReqCode)) || (url = contextPath + url);
   data || (data = ":input");
   if(szReqCode)Base.setValue("reqCode", szReqCode);
   $(document).ready(function(){
     var szId = tabId + "_body";
     _t.updateUi({url:url,bAsync: !destId,postData:[_t.getAllInput(data)],data:[[destId || szId,1,""]],fn:function(s){
        var o =  _t.getDom(szId);
        var script = "", n = s.indexOf("<script");
        if(-1 < n)
        {
           script = s.substr(n);
           script = script.substr(0, script.lastIndexOf("</" + "script>"));
           script = script.replace(/^\s*<script[^>]*>\s*<!--\/\/--><!\[CDATA\[\/\/><!--/, "");
           script = script.replace(/\/\/--><!\]\]>\s*$/, "");
        }
        s = s.substr(s.indexOf("<body>") + 6);
        if(!destId)
        {
          s = s.replace(/^\s*<div[^>]*>/gmi, "");
          s = s.substr(0, s.lastIndexOf("</div>"));
        }
        if(s && 20 < s.length)o.innerHTML = s;
        try{script && eval(script)}catch(e){alert(e.message);}
     }});
   });
},
fsubmit:function(n, oWin)
{
    var e = window.event, ocss, o = {
           msg: '正在处理中, 请稍等...',
           progressText: 'doing...',
           width:300,
           wait:true,
           waitConfig: {interval:200},
           icon:'ext-mb-download'
       };
    if(e && e.srcElement)o.animEl = e.srcElement;
    Ext.MessageBox.show(o);
    o = $("div.x-window-dlg").find("div[@id^=ext-]");
    o.find("div").css(ocss = {"float":"none", "clear":"both"}).find("span").css(ocss);
    (oWin || window).document.forms[n || 0].submit();
},getObj: function(s)
{
   var o = $("#" + s);
   if(0 < o.length)return o;
   return $(":input[@name=" + s + "]");
}, /* 隐藏指定名字或id的对象 */
hideObj:function(szNameOrId)
{
  var o = $("#" + szNameOrId);
  if(0 < o.length)
  {
     if("x-panel" == o.attr("class"))o = o.parent("div");
     o.hide();
  }
  else (o = $(":input[@name=" + szNameOrId + "]").parent("div").parent("div")).hide();
}, /* 显示指定名字或id的对象 */
showObj:function(szNameOrId, bDisb)
{
  var o = $("#" + szNameOrId);
  if(0 < o.length)
  {
     if("x-panel" == o.attr("class"))o = o.parent("div");
     o.show();
  }
  else (o = $(":input[@name=" + szNameOrId + "]").parent("div").parent("div")).show();
  o = o.children("*");
  o.not(":input").attr("disabled", bDisb = !!bDisb);
  (o = o.find(":input")).attr("readonly", bDisb);
  if(bDisb)o.addClass("readOnly");else o.removeClass("readOnly");
}
,/* 传递Xpath szData指定的数据，并更新flash区域的查询 */
doUpdateCollection:function(szCollectionId, szData)
{
  szCollectionId.swf().doUpdateCollection(this.getAllInput(szData));
},getAllInput:function(s)
{
   var a = [], _t = Base,o = $(s || ":input"), ecd = _t.decodeStr, s;
   if(0 < o.size())
   o.each(function(){
      if(this.name && (s = escape(ecd($(this).val()))))
      a.push(this.name + "=" + s);
   });
   else{
      var p = s.split("&"), u;
      for(var i = 0; i < p.length; i++)
      {
        u = p[i].split("=");
        if(u[0] && (s = escape(ecd(u[1]))))
        a.push(u[0] + "=" + s);
      }
   }
   return a.join("&");
},
  init: function()
  {
      Ext.BLANK_IMAGE_URL = g_sysInfo[2] + "default/s.gif";
      $(function(){$($(document)[0]).keydown(function(e) {
            var k, c;
            if(e)k = e.which || e.charCode || e.keyCode, c = e.metaKey || e.ctrlKey;
            else if(window.event) k = window.event.keyCode || 0, c = window.event.ctrlKey || 0;
            if(c && 192 == k)
              top.frames[2].document.getElementById('ksjr').focus();
         });});
         window.XuiComboBox = Ext.extend(Ext.form.ComboBox,{
            forceSelection: true,
            mode: 'local',/* 本地数据模式 */
            triggerAction: 'all',
            emptyText: '请选择...',
            allowDomMove:true,
            selectOnFocus:true, /* 加入该属性才会自动将值填充到hiddenName中去*/
            resizable:true,
            mySlc:function(s, id, cbk)
            {
               s && (this.onSelect=function(o){
                  this.setValue(o.data[s]);
                  this.collapse();
                  if("function" == typeof cbk)cbk(o.data);
               }); 
               return this;
            }
          });
         window.XuiDateField = Ext.extend(Ext.form.DateField,{
    	 defaultAutoCreate : {tag: "input", type: "text", size: 21, maxLength:21, autocomplete: "off"}
    	 ,onResize:function(){
    	   if(!this.wrap)return this;
    	   this.wrap.setWidth("100%");
    	   this.el.setWidth(this.wrap.getWidth() - this.trigger.getWidth() + 2);
    	   $(this.el.dom).css('top',-1);
    	   /* Ext.form.DateField.superclass.onResize.apply(this, [this.wrap.getWidth(), this.wrap.getHeight()]);*/ 
    	   var a = window.xuiResize.a, fn, t = this, fn1 = arguments.callee;
    	   if(!a[t.el.dom.name])
    	   {
    	      a[t.el.dom.name] = true;
    	      fn = window.xuiResize.start;
    	      window.xuiResize.start = function()
    	      {
    	         setTimeout(function(){fn1.apply(t)}, 13);
    	         fn();
    	      };
    	   }
    	  }
        });
        $(window).resize(window.xuiResize = function(){window.xuiResize.start()});
        window.xuiResize.start = function(){},window.xuiResize.a = [];       
        var ua = navigator.userAgent.toLowerCase(), _t = this;
        _t.isStrict = document.compatMode == "CSS1Compat",
	    _t.isOpera = ua.indexOf("opera") > -1,
	    _t.isSafari = (/webkit|khtml/).test(ua),
	    _t.chrome = (/chrome/).test(ua),
	    _t.isSafari3 = _t.isSafari && ua.indexOf('webkit/5') != -1,
	    _t.isOmniweb = -1 < ua.indexOf("omniweb"),
	    _t.bIE = _t.isIE = (!_t.isOpera && ua.indexOf("msie") > -1 && !_t.isOmniweb),
	    _t.isIE7 = !_t.isOpera && ua.indexOf("msie 7") > -1,
	    _t.isIE6 = !_t.isOpera && ua.indexOf("msie 6") > -1,
	    _t.isGecko = !_t.isSafari && ua.indexOf("gecko") > -1,
	    _t.isGecko3 = !_t.isSafari && ua.indexOf("rv:1.9") > -1,
	    _t.isBorderBox = _t.isIE && !_t.isStrict,
	    _t.isWindows = (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1),
	    _t.isMac = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1),
	    _t.isAir = (ua.indexOf("adobeair") != -1),
	    _t.isLinux = (ua.indexOf("linux") != -1),
	    _t.isSecure = window.location.href.toLowerCase().indexOf("https") === 0; 
	    _t.isW3C = !!document.getElementById;
        _t.isIE5 = _t.isW3C && _t.isIE;
        _t.isNS6 = _t.isW3C && "Netscape" == navigator.appName;
        window.getAllInput = _t.getAllInput;
        jQuery.fn.extend({
           getValue:(_t.getValue = function(s){
             var s1;
             if(s)s1 = $(":input[@name=" + s + "]").val();
             else s1 = this.val()
             if("undefined" == (s1 || typeof s1))s1 = "";
             return s1;
           }),
           setValue:(_t.setValue = function(s, s2){
              if(!s)return this;
              if(2 == arguments.length)
              {
                 $(":input[@name=" + s + "]").val(s2);
              }
              else this.val(s);
           }),
           setFocus:(_t.setFocus = function(s){
              var o = this;
              if(s)o = $(":input[@name=" + s + "]");
              if(0 == o.length)o = ("#" + s);
              o.focus();
           }),
           setReadOnly:(_t.setReadOnly = function(s, b){
              var o = this;
              if(s)o = $(":input[@name=" + s + "]");
              if("undefined" == typeof b || true == b)
                   o.attr("readonly", "readonly").addClass("readOnly");
              else o.removeAttr("readonly").removeClass("readOnly");
           }),
           enabledButton:(_t.enabledButton = function(s){
              var o = this, s1 = "x-btn-disabled", s2 = "disabled";
              if(s)o = $("#" + s);
              o.removeClass(s1);
              o = o.find("table");
              o.removeAttr(s2).find("div").removeAttr(s2);
           }),
           disabledButton:(_t.disabledButton = function(s){
              var o = this, s1 = "x-btn-disabled", s2 = "disabled";
              if(s)o = $("#" + s);
              o.addClass(s1);
              o = o.find("table");
              o.attr(s2, s2).find("div").attr(s2, s2);
           }),
           addRedStar:(_t.addRedStar = function(s)
           {
             var o = this;
             if(s)
             {
                var i,a = s.split(/[,;\|\s]/);
                for(i = 0; i < a.length; i++)
                {
                  o = _t.getObj(a[i]).parent("div").parent("div");
                  if(0 == o.find("b").length)
                  _t.insertHtml(o.find("nobr")[0], "AfterBegin", "<b class=\"redStar\">*</b>");
                  o.find("input:first").attr("isRequired", "true");
                }
             }
             else o.each(function()
             {
                var o1 = $(this).parent("div").parent("div");
                if(0 == o1.find("b").length)
                _t.insertHtml(o1.find("nobr")[0], "AfterBegin", "<b class=\"redStar\">*</b>");
                o1.find("input:first").attr("isRequired", "true");
             });
           }),
           delRedStar:(_t.delRedStar = function(s)
           {
             var o = this;
             if(s)
             {
                var i,a = s.split(/[,;\|\s]/);
                for(i = 0; i < a.length; i++)
                {
                  o = _t.getObj(a[i]).parent("div").parent("div");
                  o.find("b").remove();
                  o.find("input:first").removeAttr("isRequired");
                }
             }
             else o.each(function()
             {
                var o1 = $(this).parent("div").parent("div");
                o1.find("b").remove();
                o1.find("input:first").removeAttr("isRequired");
             });
           }),
           validateForm: (_t.validateForm = function(s)
           {
             var o = this, bR = true;
             if(s)
             {
                var i,a = s.split(/[;,\s\|]/), oCur;
                for(i = 0; i < a.length; i++)
                {
                   oCur = $(_t.getObj(a[i]));
                   if("true" == oCur.attr("isRequired") && !oCur.val())
                   {
                      if("hidden" == oCur.attr("type"))oCur = oCur.prev();
                      oCur.focus();
                      alert($(_t.p(oCur[0], "DIV")).parent("div").find("nobr").text() + " 不能为空");
                      return false;
                   }
                }
             }
             else
             {
               if(!o.length)o = $(":input");
               if(o.length)
               try{
                 o.each(function()
                 {
                   var oCur = $(this);
                   if("true" == oCur.attr("isRequired") && !oCur.val())
                   {
                      if("hidden" == oCur.attr("type"))oCur = oCur.prev();
                      oCur.focus();alert($(_t.p(oCur[0], "DIV")).parent("div").find("nobr").text() + " 不能为空");
                      bR = false;
                      throw "stop";
                   }
                 });
               }catch(e){}
             }
             return bR;
           })
        });
        window.getBrowserObjects = function()
       {
      var tempArr = [];
      for (var name in navigator)
      {
        var value = navigator[name];
        switch (typeof(value))
        {
            case "string":
            case "boolean":
                tempArr.push("navigator." + name + "=" + escape(value));
                break;
        }
       }
       for (var name in screen)
       {
         var value = screen[name];
         switch (typeof(value))
         {
            case "number":
                tempArr.push("screen." + name + "=" + escape(value));
                break;
          }
        }        
        return tempArr.join("&");
      };
      if(_t.bIE)
      { 
       _t.nVer = parseFloat(/MSIE\s*(\d(\.\d)?);/g.exec(navigator.userAgent)[1]) ||  0;
       if(7 > _t.nVer)
         try{document.execCommand("BackgroundImageCache", false, true)}catch(e){}
      }
      _t.trim = String.prototype.trim = function(s){return (s||this).replace(/(^\s*)|(\s*$)/gm, "")};
      String.prototype.swf = function(){
         return -1 != navigator.appName.indexOf("Microsoft") ? window[this] || document.getElementById(this): document[this];
      };
      Array.prototype.indexOf = function(f){
        for(var i = 0; i < this.length; i++)
         if(this[i] == f)return i;
        return -1;
      };
      $(document).ready(function(){
      if(!_t.getDom("xuiSelectShdow"))
      {
       var a1 = [];
       a1.push("<div class=\"x-shadow\" id=\"xuiSelectShdow\">");
       a1.push("<div class=\"xst\"><div class=\"xstl\"></div><div class=\"xstc\" id=\"xuislctsd1\"></div><div class=\"xstr\"></div></div>");
       a1.push("<div class=\"xsc\" id=\"xuislctsd2\"><div class=\"xsml\" id=\"showdxsml\"></div><div class=\"xsmc\" id=\"xuislctsd3\"></div><div class=\"xsmr\"></div></div>");
       a1.push("<div class=\"xsb\"><div class=\"xsbl\"></div><div class=\"xsbc\" id=\"xuislctsd4\"></div><div class=\"xsbr\"></div></div></div>");
       _t.insertHtml(document.body, "beforeend", a1.join(""));
       a1 = null;
       if(_t.bIE && 5 < _t.nVer && 7 > _t.nVer)
       	  _t.getDom("xuiSelectShdow").style.filter = "progid:DXImageTransform.Microsoft.alpha(opacity=30) progid:DXImageTransform.Microsoft.Blur(pixelradius=4)";
      }
      $(window).error(function(){return false});
      });
      Function.prototype.bind = function(o)
	  {
	     var _t = this, a = Base.A(arguments);a.shift();
	     return function(e)
	     {
	        _t.apply(o || _t, Base.A(arguments).concat(a));
	     }
	  };
	  /* 扩展jQuery insertNode函数，兼容FF没有 insertAdjacentElement函数 */
	  $.fn.insertNode = function(where, node){
	    return this.each(function(){
	      if (this.insertAdjacentElement){
	        this.insertAdjacentElement(where, node);
	      } else {
	        switch(where){
	          case "beforeBegin":
	            this.parentNode.insertBefore(node,this); 
	            break;
	          case "afterBegin" :  
	            this.insertBefore(node,this.firstChild); 
	            break;
	          case "beforeEnd":
	            this.appendChild(node);
	            break;   
	          case "afterEnd":
	            if(this.nextSibling){
	              this.parentNode.insertBefore(node,this.nextSibling);
	            } else {
	              this.parentNode.appendChild(node);
	            }  
	            break;   
	        }
	      }
	    });
	  };
      return this;
  },binds: function(a)
  {
     for(var i = 0; i < a.length; i++)
       this[a[i]] = this[a[i]].bind(this);
  },
  /* 一些初始化动作 */
  bUnload: (Array.prototype.each = function(f){var t = this, i = 0;for(;i < t.length; i++)f.apply(t[i], [t[i]]);return this},1),
  a:[],nDatetime:24 * 60 * 60 * 1000,
  /* 获取对象o的父亲节点 ，例如 Base.p(o, 'TR') */
  p:function(o,szTagName)
  {
    var i = 0;
    while(o && i++ < 500)
    {
      if(o = o.parentNode)
      {
        if("BODY" == o.nodeName)return null;
        if(o.nodeName === szTagName)return o;
      }else break;
    }
    return null;
  }, /* 将a转换为有效的Array */
  A:function(a)
  {
   if(0 == arguments.length)
     a = arguments.callee.caller.arguments;
    var i = 0, b = [];
    for(; i < a.length; i++)
       b.push(a[i]);
    return b;
  }, /* 获取id为s的对象 */
  getDom:function(s)
  {
     if(!s || !document)return null;
     var o = ("string" == typeof s ? document.getElementById(s) : s), k;
     /* for(k in this)o[k] = this[k]; */
     
    return o;
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
       this.getDom(szElement).fireEvent('on' + szEvent);
    else{
      var evt = document.createEvent('HTMLEvents');
      evt.initEvent(szEvent,true,true);
      this.getDom(szElement).dispatchEvent(evt);
    }
  }, /* 将对象o绑定给fn函数 */
  bind:function(fn, o)
  {
     var _t = this, a = _t.A(arguments);a.shift();a.shift();
     return function(e)
     {
        return fn.apply(o || _t, _t.A(arguments).concat(a));
     }
  }, /* unLoad窗口无效时卸载事件绑定 */
  unLoad:function(o, t, f)
  {
    var _this = Base || this, b = _this.a, i;
    if(b)
    {
	    i = b.length - 1;
	    if(_this.bIE)for(; i > -1; i--)b[i][0].detachEvent(b[i][1], b[i][2]);
	    else for(; i > -1; i--)b[i][0].removeEventListener(b[i][1], b[i][2], false);
	    delete b, delete _this.a;
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
    var k = this.getDom(o).id;
    delete top.__aScroll[k];
    this.setCookie(k, null);
  }, /* 设置对象o自动保存滚动条信息,例如：Base.autoSaveScroll(o) */
  autoSaveScroll: function(o)
  {
    top.__aScroll || (top.__aScroll = []);
    o = this.getDom(o);
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
  },decodeStr: function(s)
  {/* \u4E00-\u9FA5 */
        return (s || '').replace(/[^\0-\255]/gm, function()
        {
          return "&#" + arguments[0].charCodeAt(0) + ";";
        })
  }, /* 异步刷新区域的封装，还没有实现完整 */
  updateUi:function(o)
  {
    var s = [], s1 = [""], o1, _t = this, s2;
    if(!o.data)return alert("updateUi调用参数不正确，没有指定参数data");
    /* post数据，格式为["aac001", "#myTab:input", "divId1"] */
    o.postData && o.postData.each(function()
    {
       o1 = $(this.toString());
       if(o1[0] && !o1[0].nodeName)o1 = $("#"+ this + " :input");
       if(o1[0] && !o1[0].nodeName)o1 = $(":input[@name=" + this + "]");
       if(o1 && 0 < o1.length)
       {
          o1.each(function()
          {
             if(this.name && (s2 = $(this).val()))
               s1.push(this.name + "=" + escape(_t.decodeStr(s2)));
          });
       }
       else s1.push(this);
    });
    /* data为请求刷新的对象，格式为[id,1或true表示过滤后面的字段,需要过滤的字段] */
    o.data.each(function(){s.push(this.join(","))});
    JsonRpcClient().AJAX({
       data: "__ajaxParam_=" + s.join('|') + s1.join("&"),
       url: o.url || document.location.href,
       bAsync: o.bAsync && !!o.fn,
       clbkFun: function(){
       try {
           o.fn && o.fn.apply(this, arguments);
       }catch(e){}
       }});
  }, /* 创建图层 */
  createDiv:function()
  {
     var o = null, b = !!arguments[0] || false,
         p = arguments[0], k;
     if(p && p["id"] && (o = this.getDom(p["id"])))return o;
     o = document.createElement("div");
     if(b)
     {
       p["className"] || (p["className"] = "x-combo-list");
       for(k in p)o[k] = p[k];
     }
     document.body.appendChild(o);
     return o;
  },/* 显示阴影图层 */
  showShadow:function(o)
  {
      var old = o;
      var w = parseFloat(this.getStyle(o, "width")) + 10, h = parseFloat(this.getStyle(o, "height") || 1) + 7,
          oTmp = this.getDom("xuiSelectShdow") || {}, obj = oTmp.style,
         left = parseFloat(this.getStyle(o, "left")) - 4, top = parseFloat(this.getStyle(o, "top")) - 2 , 
         zIndex = (this.getStyle(o, "zIndex") || 11000) - 1;
     if(!obj || !h || !w || 12 > h)return this;
     o = o.style;
     $(oTmp).css({width:w + "px", height: h + "px", top: top + "px", left: left + "px", zIndex: zIndex, position: "absolute"});
     if(!(obj = this.getDom("xuislctsd4")))return this;
     if(12 < w)
     obj.style.width = this.getDom("xuislctsd3").style.width =
     this.getDom("xuislctsd1").style.width = (w - 12) + "px";
     obj = this.getDom("xuislctsd2");
     obj.style.height = (h - 12) + "px";
     o = obj.getElementsByTagName("div");
     for(w = 0; w < o.length; w++)o[w].style.height = obj.style.height;
     oTmp.style.display = old.style.display = "block";
  },hiddenShadow:function(o)
  {
    var oTmp;
    if(oTmp = this.getDom("xuiSelectShdow"))oTmp.style.display='none';
    o.style.display = 'none';
    return this;
  },
  regTimer:function(fn, n)
  {
    var _t = this,nTime = window.setInterval(function()
    {
      if(fn(_t))window.clearInterval(nTime);
    }, n || 13);
    return nTime;
  },clearTimer:function(n){n && window.clearInterval(n)},
   addInvalid: function(o)
   {
      this.addClass("x-form-invalid", o);
   },delInvalid: function(o)
   {
      this.delClass("x-form-invalid", o);
   },
   /* 给o增加class为s */
   addClass: function(s, o)
   {
      o.className = (o.className || s).replace(new RegExp( "\\s?" + s, "g"), "") + " " + s;
      return this;
   }, /* 去除o中s的class */
   delClass: function(s, o)
   {
      o.className = (o.className || "").replace(new RegExp( "\\s?" + s, "g"), "");
      return this;
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
  }, /* 在对象el中插入html代码 */
  insertHtml:function(el, where, html){
  where = where.toLowerCase();if(!el)return this;
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
     },getStyle : function(){
         var view = document.defaultView, propCache = {}, 
            camelRe = /(-[a-z])/gi,
            camelFn = function(m, a){ return a.charAt(1).toUpperCase(); };  
        return view && view.getComputedStyle ?
            function(el, prop){
                var v, cs, camel;
                if(prop == 'float'){
                    prop = "cssFloat";
                }
                if(v = el.style[prop]){
                    return v;
                }
                if(cs = view.getComputedStyle(el, "")){
                    if(!(camel = propCache[prop])){
                        camel = propCache[prop] = prop.replace(camelRe, camelFn);
                    }
                    return cs[camel];
                }
                return null;
            } :
            function(el, prop){
                var v, cs, camel,
                    camelRe = /(-[a-z])/gi,
                    camelFn = function(m, a){ return a.charAt(1).toUpperCase(); }; 
                if(prop == 'opacity'){
                    if(typeof el.style.filter == 'string'){
                        var m = el.style.filter.match(/alpha\(opacity=(.*)\)/i);
                        if(m){
                            var fv = parseFloat(m[1]);
                            if(!isNaN(fv)){
                                return fv ? fv / 100 : 0;
                            }
                        }
                    }
                    return 1;
                }else if(prop == 'float'){
                    prop = "styleFloat";
                }
                if(!(camel = propCache[prop])){
                    camel = propCache[prop] = prop.replace(camelRe, camelFn);
                }
                if(v = el.style[camel]){
                    return v;
                }
                if(cs = el.currentStyle){
                    return cs[camel];
                }
                return null;
            };
    }(),
    getScroll : function(d){
        var doc = document;
        if(d == doc || d == doc.body){
            var l, t;
            if(this.isIE && this.isStrict){
                l = doc.documentElement.scrollLeft || (doc.body.scrollLeft || 0);
                t = doc.documentElement.scrollTop || (doc.body.scrollTop || 0);
            }else{
                l = window.pageXOffset || (doc.body.scrollLeft || 0);
                t = window.pageYOffset || (doc.body.scrollTop || 0);
            }
            return {left: l, top: t};
        }else{
            return {left: d.scrollLeft, top: d.scrollTop};
        }
    },
     getViewWidth : function(full) {
            return full ? this.getDocumentWidth() : this.getViewportWidth();
        },

        getViewHeight : function(full) {
            return full ? this.getDocumentHeight() : this.getViewportHeight();
        },

        getDocumentHeight: function() {
            var scrollHeight = (this.compatMode != "CSS1Compat") ? document.body.scrollHeight : document.documentElement.scrollHeight;
            return Math.max(scrollHeight, this.getViewportHeight());
        },

        getDocumentWidth: function() {
            var scrollWidth = (this.compatMode != "CSS1Compat") ? document.body.scrollWidth : document.documentElement.scrollWidth;
            return Math.max(scrollWidth, this.getViewportWidth());
        },

        getViewportHeight: function(){
            if(this.isIE){
                return this.isStrict ? document.documentElement.clientHeight :
                         document.body.clientHeight;
            }else{
                return self.innerHeight;
            }
        },

        getViewportWidth: function() {
            if(this.isIE){
                return this.isStrict ? document.documentElement.clientWidth :
                         document.body.clientWidth;
            }else{
                return self.innerWidth;
            }
        },
    getOffset: function(o){
    /* offsetLeft, offsetTop */
    var a = [o.offsetLeft, o.offsetTop, o.offsetWidth,o.offsetHeight, 0, 0], r, parent, n;
    if(o.getBoundingClientRect)
    {
       r = o.getBoundingClientRect();
       var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
           scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
       a[0] = parseInt(r.left + scrollLeft);
       a[1] = parseInt(r.bottom + scrollTop);
    }
    else if(document.getBoxObjectFor)
	{
	  r = document.getBoxObjectFor(o); 
	  var s = this.getStyle(o, "borderLeftWidth"),
	      borderLeft = s ? parseInt(s) : 0, 
	      borderTop = (s = this.getStyle(o, "borderTopWidth")) ? parseInt(s) : 0; 
	  a[0] = r.x - borderLeft, a[1] = r.y - borderTop;
	}
    else /* safari & opera */
    {
        a[0] = a[1] = a[4] = a[5] = 0;
        a[1] += o.clientHeight;
        parent = o;
        if(o != parent.offsetParent)
        {
	        while(parent && document.body != parent)
	        {
	          a[0] += (parent.offsetLeft || 0);
	          a[1] += (parent.offsetTop || 0);
	          a[4] += (parent.scrollLeft || 0);
	          a[5] += (parent.scrollTop || 0);
	          if(!this.isNS6)
	          {
	             if(n = parseInt(parent.currentStyle.borderLeftWidth, 10))a[0] += n;
	             if(n = parseInt(parent.currentStyle.borderTopWidth, 10))a[1] += n;
              }
	          parent = parent.offsetParent
	        }
        }
     }
     return a;
    }, isCSS1Compat: (document.compatMode == "CSS1Compat"),
    /*collection的链接标签,根据url打开一个新的窗口*/
	openWin: function(o, a){
	  var p = o["param"], dto = o["dto"], target = o["target"] || null,
	  url = '_self' != target ? o["url"] + p + "&xui_pop_win=true" : o["url"] + p, 
	  width = o["width"] || 800, height = o["height"] || 600,
	  option = "height=" + height + ",width=" + width + ",top=" + parseInt((screen.height - height)/2 * 0.75) + ",left=" + parseInt((screen.width - width)/2) + ",status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes";
	  if ("undefined" != typeof dto){
	    var _this = this;
	    $(dto).each(function(){
	      var value = _this.getObj(this).val();
	      if(null != value && "" != value){
	        url += "&" + this + "=" + escape(_this.decodeStr(value));
	      }
	    });
	  }
	  window.open(url, target, option);
	  return false;
	},
	/*按钮的弹出窗口. url:指定的路径, width:宽度, height:高度, param:参数*/
	/*param:参数需要是数组,例如["aac001", "aac002"]*/
	openBtnWin : function(url, param, width, height){
	   var p = "", _this = this, o = null;
	   $(param).each(function(){
	     var value = _this.getObj(this).val();
	     if(null != value){
	        p += "&" + this + "=" + escape(_this.decodeStr(value));
	      }
	   });
	   o = {"url":url, "param":p, "width":width, "height":height};
	   this.openWin(o, null);
	},
    showDiv: function(o, oDiv, w, h, left)
	{
	  var oR = this.getOffset(o), style = oDiv.style, k, 
	      hs = [ document.documentElement.scrollHeight, document.documentElement.clientHeight,
	             document.documentElement.scrollWidth, document.documentElement.clientWidth],
 	      p = { left: (left || (oR[0] - (this.bIE ? 2 : 0))) + "px", 
              top: (oR[1] - (this.bIE ? 5 : 2)) + "px", 
              position: "absolute",
              width: parseInt(w || o.clientWidth || oR[2]) + "px"};

      if(h)p["height"] = parseInt(h, 10) + 'px'; 
      for(k in p)style[k] = p[k];
      // $()
      style["display"] = "block";
      /* 修正显示定位 */
      style["height"] = $(oDiv).height() + "px";
      if(4 == arguments.length)
      oDiv.style.width = Math.max(parseInt($(o).width(), 10), parseInt(oDiv.style.width, 10)) + "px";
      hs[4] = parseInt(oDiv.style.top, 10);
      hs[5] = parseInt(oDiv.style.height, 10);
      hs[6] = parseInt(oDiv.style.left, 10);
      hs[7] = parseInt(oDiv.style.width, 10);
      if(hs[4] + hs[5] > hs[1] + document.documentElement.scrollTop)oDiv.style.top = (hs[4] - hs[5] - $(o).height()) + "px";
      if(hs[6] + hs[7] > hs[3] + document.documentElement.scrollLeft)oDiv.style.left = (hs[6] - hs[7] - $(o).width()) + "px";
      this.showShadow(oDiv);
	}	
}