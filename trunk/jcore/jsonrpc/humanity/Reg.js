{
    check : function(obj, reg, inputStr){
      var s = this.getContent(obj, inputStr);
      return reg.test(s);
    },
    getContent : function(obj, inputStr){
      if(Browser.isIE()){
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
      }catch(e){alert(e.message);}
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