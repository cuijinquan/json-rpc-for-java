/*
 * 版权所有归《JavaScript高级应用与实践》(电子工业出版社.博文视点)的作者夏天所有
 * V1.3 支持任何语言编码
 * */
function JsonRpcClient(url) {
	url || (url = ("undefined" === typeof contextPath ? "." : contextPath) + "/JRPC");
	if (this === window)
		return JsonRpcClient._cache || (JsonRpcClient._cache = new JsonRpcClient(url));
	this["url"] = url;
	var _this = this, obj = {}, bind = function (f, o) {
		return function () {
			return f.apply(o, arguments);
		};
	}, _A = function (p) {
		var r = [], i = 0, j = p.length;
		for (; i < j; i++)
			r.push(p[i]);
		return r;
	}, AJAX = function (o) {
		if (window === this)
			return new AJAX(o);
		var _this = this, fncbk = function(){if (4 === _this.xml.readyState) {
			200 === _this.xml.status && o.clbkFun && o.clbkFun(_this.xml.responseText.replace(/&#(\d+);/gm, function()
			{
			   return String.fromCharCode(arguments[1]);
			})), delete _this.xml.onreadystatechange, delete _this.xml;
	    }};
		if (this.xml = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()) {
			this.xml.open("POST", o.url + (-1 < o.url.indexOf("?") ? '&' : '?') + new Date().getTime(), o.bAsync, "", "");
			// this.bGzip || (this.bGzip = false);if(this.bGzip)this.xml.setRequestHeader("Accept-Encoding","gzip, deflate"),
			this.xml.setRequestHeader("XUIAJAX",1);
			this.xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
			this.xml.setRequestHeader("user-agent", navigator.userAgent);
			o.bAsync && (this.xml.onreadystatechange = function () {
				fncbk();
			});
			this.xml.send(o.data && o.data.replace(/[\u4E00-\u9FA5]/gm, function()
			{
			   return "&#" + arguments[0].charCodeAt(0) + ";";
			}) || "");
			if(!o.bAsync)
			  fncbk();
		}
	};this.AJAX = AJAX;
	
	AJAX({url:url, bAsync:false, clbkFun:function () {
		try {
			eval("obj = " + arguments[0]);
		}catch (e) {}
	}});
	obj = obj.result;
	var fnRpcCall = function () {
		var params = _A(arguments), cbk = params[0], bAsync = "function" === typeof (cbk || ""), oRst = {};
		bAsync && params.shift();
		AJAX({url:this.url, bAsync:bAsync, data:"{\"method\":\"" + this.methodName + "\",\"_id_\":\"" + this["_id_"] + "\",\"params\":" + (function (arg) {
			var b = [], szTp ,o2json = function(oTmp1)
			{
			   var k, aTmp = [], fnTmp = function(oTmp)
			   {
				   if ("number" === (szTp = typeof oTmp))
				       return isFinite(oTmp) ? oTmp : 0;
				   else if("boolean" === szTp || null == oTmp)
						return oTmp;
				   else return "\"" + (oTmp || "").toString().replace(/([\r\n\t\b\f"])/gm, "\\$1") + "\"";
			   };// 限制只处理一级深度的对象
			   if("object" === typeof oTmp1 && oTmp1)
			   {
			      for(k in oTmp1)
			         aTmp.push("'" + k + "':" + fnTmp(oTmp1[k]));
			      return "\"{" + aTmp.join(",").replace(/([\r\n\t\b\f"])/gm, "\\$1") + "}\"";			
			   }
			   else return fnTmp(oTmp1);
			};
			for (var i = 0; i < arg.length; i++)
			    b.push(o2json(arg[i]));
			return "[" + b.join(",") + "]";
		})(params) + "}", clbkFun:function () {
			try {
				eval("var oTmp = " + arguments[0]);
				if (null != oTmp && "object" === typeof oTmp) {
					if (Array === (oTmp["constructor"] || "")) {
						oRst = [];
						for (var i = 0; i < oTmp.length; i++)
							if ("object" === typeof oTmp[i])
								_this.fnMakeObj(oTmp[i], oRst[i] = {});
							else oRst[i] = oTmp[i];
					} else _this.fnMakeObj(oTmp, oRst);
				} else oRst = oTmp;
				bAsync && cbk.apply(oRst, [oRst]);
			}catch (e){}
		}});
		return oRst;
	};
	this.fnMakeObj = function (o, oRstObj) {
		var oT = oRstObj;
		o.name && (oT = (oRstObj[o.name] = {}));
		for (var k in o) {
			if ("methods" === k) {
				for (var i = o[k].length - 1; i >= 0; i--)
					oT[o[k][i]] = bind(fnRpcCall, {url:_this.url, methodName:o[k][i], "_id_":o["_id_"]});
				delete o[k];
			} else {
				if (o[k] && "object" === o[k]["constructor"])
					o[k]["name"] = k, _this.fnMakeObj(o[k], oT);
				else oT[k] = o[k];
			}
		}
	};
	if(obj)for (var i = 0; i < obj.length; i++)this.fnMakeObj(obj[i], _this);
	this.cacheObj = [];this.LoadJsObj = function(s)
	{
	  var o = null;
	  try{o = _this.cacheObj[s] || (_this.cacheObj[s] = eval("1," + _this._LoadJsObj.getJsObj(s).getResult()))}catch(e){alert(e.message)};
	  if(o)
	  {
	     if(!o.init)o.init = function()
	     {
	        var o = JsonRpcClient().LoadJsObj("Base"), a = o.A(arguments).concat([o]), k, i;
            for(i = 0; i < a.length; i++)
              for(k in a[i])this[k] = a[i][k];
	        return this
	     };
	     _this.cacheObj[s] = o = o.init();
	     eval("window." + s + "=o;");
	  }
	  return o
	};
}
var rpc = JsonRpcClient(), Base = rpc.LoadJsObj("Base"),
    XUI = function()
    {
        var o = Base, a = o.A(arguments), k, i;
        for(i = 0; i < a.length; i++)
           for(k in a[i])o[k] = a[i][k];
        return o;
    };