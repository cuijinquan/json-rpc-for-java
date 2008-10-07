{
    executed:false,
    check : function(o){
      try{ 
        return this.doFun(function(){
           var arg = Digit.check.arguments, o = Digit.check.arguments[0],
           integralNum=18, decimalNum=0, max =999999999999, min=-999999999999;
           if(1 < arg.length){
             integralNum = arg[1][0],decimalNum = arg[1][1];
             if(2 < arg[1].length){
               max = arg[1][2],min = arg[1][3];
             }
           }
            if(0 < decimalNum) 
             o.maxLength = decimalNum + integralNum + 2;
           else
             o.maxLength = integralNum + 1;  
           var reg = "/^" + ((0>min) ? "-{0,1}" : "") + "\\d{0," + integralNum + "}";  
           if(0 < decimalNum) reg += "(\\.\\d{0," + decimalNum + "})?";
           reg += "$/";
           o.reg = eval(reg + ";"), o.max = max, o.min = min, o.mylen = 3;
           Digit.addEvent(o, "paste", Digit.str_onpaste);
           Digit.addEvent(o, "drop", Digit.sz_ondrop);
           Digit.addEvent(o, "keypress", Digit.sz_onkeypress);
           Digit.addEvent(o, "blur", Digit.sz_onblur);
        });
      }catch(e){alert(e.message)}
    },
    
    str_onpaste : function(evt){
      e = (evt || event || window.event),o = e.srcElement || e.target;
      var data = Digit.getClipboard();
      return Digit.regInput(o, o.reg, data);
    },
    
    sz_ondrop : function(evt){
      e = (evt || event || window.event),o = e.srcElement || e.target;
      var data = event.dataTransfer.getData('Text');
      return Digit.regInput(o, o.reg, data);
    },
	
    sz_onkeypress : function(evt){
      e = (evt || event || window.event),o = e.srcElement || e.target;
      var data = String.fromCharCode(event.keyCode);
      return Digit.regInput(o, o.reg, data);
    },
    
    sz_onblur : function(evt){
      var e = (evt || event || window.event),o = e.srcElement || e.target;
      if (o.reg.test(o.value)){
        if ("" == o.value || 
		    ("false" == o.isRequired && "" == o.value) || 
		    (o.max >= o.value && o.min <= o.value)) {
			return eval(o.mylen + ";");
		}
      }
      o.focus(), o.select(), alert("输入值必须在[" + o.min + " - " + o.max + "]之间");
    },
    
    regInput : function(obj, reg, inputStr){
      try{
	    var docSel  = document.selection.createRange();
	    if(null != docSel && null != docSel.parentElement() && "INPUT" != docSel.parentElement().tagName)
	       return false;
	    oSel = docSel.duplicate(),oSel.text = "";
	    var srcRange = obj.createTextRange();
	    if(null == oSel || null == srcRange || null == reg)return false;
	    oSel.setEndPoint("StartToStart", srcRange);
	    var str = oSel.text + inputStr + srcRange.text.substr(oSel.text.length);
	    return reg.test(str);
      }catch(e){alert(e.message);}
      return false;
    },
    
    doFun : function(fn){
      if(this.executed)return false;
      this.executed = true;
      fn.apply(this);
      this.executed = false;
    },
    
    addEvent : function(o, type, fn){
      if (!o["xui" + type]){
 		o["xui" + type] = true;          
        if(Browser.isIE()){
          o.detachEvent("on" + type, fn);
          o.attachEvent("on" + type, fn);
        } else {
          o.removeEventListener(type, fn, false);
          o.addEventListener(type, fn, false);
        }
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