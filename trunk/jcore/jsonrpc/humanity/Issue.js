{
    check : function(o){
      o.maxLength = 6;
      this.addEvent(o, "keypress", this.checkPress);
      this.addEvent(o, "paste", this.checkPaste);
      this.addEvent(o, "drop", this.checkDrop);
      this.addEvent(o, "blur", this.checkBlur);
    },
    getRegStr : function(s){
      var n = s.length;
      if(4 >= n)return "/^\\d*$/";
      else if(5 == n) return "/^\\d{4}[0-1]$/";
      else return "/^\\d{4}((1[0-2])|(0[1-9]))$/";
    },
    checkPress : function(evt){
      var e = (evt || event || window.event),o = e.srcElement || e.target,
      key = window.event ? e.keyCode:e.which, data = String.fromCharCode(key),
      s = Issue.getContent(o, data),reg = Issue.getRegStr(s);o.reg = eval(reg + ";");
      isReg = Issue.regcheck(o, o.reg, data), isPaste = e.ctrlKey && data.toLowerCase() == "v";
      if (!isReg && 8!=key && 0!=key &&!isPaste)
        if(e.preventDefault)e.preventDefault(); 
      return isReg;
    },
    checkPaste : function(evt){
      var e = (evt || event || window.event),o = e.srcElement || e.target,
      data = this.getData(), s = Issue.getContent(o, data),reg = Issue.getRegStr(s);
      o.reg = eval(reg + ";");
      isReg = Issue.regcheck(o, o.reg, data);
      if(!isReg && e.preventDefault) e.preventDefault();
      return isReg;
    },
    checkDrop : function(evt){
      var e = (evt || event || window.event),o = e.srcElement || e.target,
      data = e.dataTransfer.getData('Text'), s = Issue.getContent(o, data),reg = Issue.getRegStr(s);
      o.reg = eval(reg + ";");
      isReg = Issue.regcheck(o, o.reg, data);      
      if(!isReg && e.preventDefault) e.preventDefault();
      return isReg;      
    },
    checkBlur : function(evt){
      var e = (evt || event || window.event),o = e.srcElement || e.target,
      length = o.value.length;
      if(0 < length && o.maxLength != length){
        setTimeout(function(){o.focus(),o.select();},1);
        alert("输入期号不完整！");
      }
    },
    getData : function(){
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
	},
	regcheck : function(obj, reg, inputStr){
      var s = Issue.getContent(obj, inputStr);
      return reg.test(s);
    },
    getContent : function(obj, inputStr){
      if(this.bIE){
        return this.ieGetContent(obj, inputStr);
      } else {
        return this.ffGetContent(obj, inputStr);
      }  
    },
    ieGetContent : function(obj, inputStr){
      try{
	    var docSel  = document.selection.createRange();
	    if(null != docSel && null != docSel.parentElement() && "INPUT" != docSel.parentElement().tagName)
	       return false;
	    oSel = docSel.duplicate(),oSel.text = "";
	    var srcRange = obj.createTextRange();
	    if(null == oSel || null == srcRange)return false;
	    oSel.setEndPoint("StartToStart", srcRange);
	    var str = oSel.text + inputStr + srcRange.text.substr(oSel.text.length);
	    return str;
      }catch(e){"ieGetContent error:" + alert(e.message);}
    },
    ffGetContent : function(obj, inputStr){
      try{
        var n=obj.selectionStart, old=obj.value, 
        behind=old.substr(n), front=old.substr(0,(old.length-behind.length)),
        str = front + inputStr + behind;
        return str;
      }catch(e){alert(e.message);}
    }
}