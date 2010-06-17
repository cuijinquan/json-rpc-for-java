{
    executed:false,
    check : function(o){
      try{ 
        return this.doFun(function(){
           var arg = Digit.check.arguments, o = Digit.check.arguments[0],
           integralNum=18, decimalNum=0, max =999999999999, min=-999999999999;
           if (o.register) return;
           if(1 < arg.length){
             integralNum = arg[1][0] || integralNum, decimalNum = arg[1][1] || decimalNum;
             if(2 < arg[1].length){
               if (0 == arg[1][2]) max = 0;
               if (0 == arg[1][3]) min = 0;
               max = arg[1][2] || max, min = arg[1][3] || min;
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
           //Digit.addEvent(o, "paste", this.str_onpaste);
           //Digit.addEvent(o, "drop", this.sz_ondrop);
           Digit.addEvent(o, "keypress", this.sz_onkeypress);
           Digit.addEvent(o, "blur", this.sz_onblur.bind(this));
           o.register = true;
        });
      }catch(e){alert(e.message)}
    },
    
    str_onpaste : function(evt){
      e = (evt || event || window.event),o = e.srcElement || e.target,
      data = Digit.getClipboard(), isReg = Digit.regInput(o, o.reg, data);
      if(!isReg && e.preventDefault) e.preventDefault();
      return isReg;
    },
    
    sz_ondrop : function(evt){
      e = (evt || event || window.event),o = e.srcElement || e.target,
      data = e.dataTransfer.getData('Text'), isReg = Digit.regInput(o, o.reg, data);
      if(!isReg && e.preventDefault) e.preventDefault();
      return isReg;
    },
	
    sz_onkeypress : function(evt){      
      e = (evt || event || window.event),o = e.srcElement || e.target,
      key = window.event ? e.keyCode:e.which, data = String.fromCharCode(key),
      isReg = Digit.regInput(o, o.reg, data);
      if (!isReg && 8!=key && 45!=key && 0!=key 
           &&!(e.ctrlKey && data.toLowerCase() == "v")){
        if(e.preventDefault)e.preventDefault(); 
      } 
      return isReg;
    },
    fnNoInput:function(fn){
	  var _t = this;
	   _t.bBoBq = true;fn();setTimeout(function(){_t.bBoBq = false},13);
	},
    sz_onblur : function(evt){
      var e = (evt || event || window.event),o = e.srcElement || e.target, _t = this;
      if(_t.bBoBq)return false;
      _t.fnNoInput(function(){
      if (o.reg.test(o.value)){
        if ("" == o.value || 
		    ("false" == o.isRequired && "" == o.value) || 
		    (o.max >= o.value && o.min <= o.value)) {
		    Base.delInvalid(o);
			return eval(o.mylen + ";");
		}
      }
      Base.addInvalid(o);
      o.name.setFocus();
      // setTimeout(function(){o.focus(),o.select();},1);
      alert("\u8f93\u5165\u503c\u5fc5\u987b\u5728[" + o.min + " - " + o.max + "]\u4e4b\u95f4,\u5e76\u4e14\u5c0f\u6570\u70b9\u4f4d\u6570\u6b63\u786e");
      });
    },
    
    regInput : function(obj, reg, inputStr){
      if(this.isIE){
        return Digit.ieContentContact(obj, reg, inputStr);
      } else {
        return Digit.ffContentContact(obj, reg, inputStr);
      }  
      return false;  
    },
    
    ieContentContact : function(obj, reg, inputStr){
      try{
	    var docSel  = document.selection.createRange();
	    if(null != docSel && null != docSel.parentElement() && "INPUT" != docSel.parentElement().tagName || docSel.parentElement().readOnly)
	       return false;
	    oSel = docSel.duplicate(),oSel.text = "";
	    var srcRange = obj.createTextRange();
	    if(null == oSel || null == srcRange || null == reg)return false;
	    oSel.setEndPoint("StartToStart", srcRange);
	    var str = oSel.text + inputStr + srcRange.text.substr(oSel.text.length);
	    return reg.test(str);
      }catch(e){alert(e.message);}
    },
    
    ffContentContact : function(obj, reg, inputStr){
      try{
        var n=obj.selectionStart, old=obj.value, 
        behind=old.substr(n), front=old.substr(0,(old.length-behind.length)),
        str = front + inputStr + behind;
        return reg.test(str);
      }catch(e){alert(e.message);}
    },
    
    //防止正在执行的函数被重复执行
    doFun : function(fn){
      if(Digit.executed)return false;
      Digit.executed = true;
      fn.apply(this);
      Digit.executed = false;
    },
    
    addEvent : function(o, type, fn){
      if (!o["xui" + type]){
 		o["xui" + type] = true;          
        if(this.isIE){
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