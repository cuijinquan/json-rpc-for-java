{
    executed:false,
    check : function(o){
           var o = arguments[0];
           var reg = /^[0-9|a-z|A-Z]{1,}[0-9|a-z|A-Z|_|-]*@[0-9|a-z|A-Z|_|-]*(\.[0-9|a-z|A-Z|_|-]*){1,3}$/;
           o.reg = eval(reg + ";");
           o = $(o);
           if(!o.attr("_blr"))
           {
              o.attr("_blr", true);
              o.blur(this.sz_onblur.bind(this));
           }
    },    
    sz_onblur : function(evt){
      var e = (evt || event || window.event),o = e.srcElement || e.target;
      o.value = o.value.trim();
      if(0 == o.value.length){
        Base.delInvalid(o);
      	return true;
      }
      if (!o.reg.test(o.value)){
      	Base.addInvalid(o);
      	o = $(o);
      	window.g_fcsfld = o.attr("name") || o.attr("id");
        return alt("邮件地址无效，请检查并改正"),false;
      }else{
      	Base.delInvalid(o);
      	return true;
      }
    },
    
    getClipboard : function(){
      if (window.clipboardData) return(window.clipboardData.getData('Text'));
	  else if (window.netscape) {
	      netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
	      var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
	      if (!clip) return;
	      var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
	      if (!trans) return;
	      trans.addDataFlavor('text/unicode');
	      clip.getData(trans,clip.kGlobalClipboard);
	      var str = new Object(),len = new Object();
	      try {
	         trans.getTransferData('text/unicode',str,len);
	      }
	      catch(error) {return null;}
	      if (str) {
	         if (Components.interfaces.nsISupportsWString) 
	           str=str.value.QueryInterface(Components.interfaces.nsISupportsWString);
	         else if (Components.interfaces.nsISupportsString) 
	           str=str.value.QueryInterface(Components.interfaces.nsISupportsString);
	         else str = null;
	      }
	      if (str) return(str.data.substring(0,len.value / 2));
	   }
	   return null;
	}
}