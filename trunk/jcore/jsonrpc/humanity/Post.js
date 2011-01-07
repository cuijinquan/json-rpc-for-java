{
    executed:false,
    check : function(o){
           var o = arguments[0];
           o.reg = /^[1-9]\d{5}$/;
    },    
    sz_onblur : function(evt){
      if(window.bBoBq)return true;window.bBoBq = true;
      var e = (evt || event || window.event),o = e.srcElement || e.target;
      o.value = o.value.trim();
      if(0 == o.value.length){
        Base.delInvalid(o);
      	return window.bBoBq = false,true;
      }
      if (!o.reg.test(o.value)){
      	Base.addInvalid(o);
      	o = $(o);
      	window.g_fcsfld = o.attr("name") || o.attr("id");
        alt("输入的邮政编码无效，请检查并改正");
        setTimeout(function(){o.focus();
        o.select();},1);
        return window.bBoBq = false;
      }else{
      	Base.delInvalid(o);
      	window.bBoBq = false;
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