{
    init  : "",
	//dependency:Browser.js,Event.js,Reg.js,Clipboard.js    
	check : function(o){
      o.maxLength = 6;
      Event.add(o, "keypress", this.checkPress);
      Event.add(o, "paste", this.checkPaste);
      Event.add(o, "drop", this.checkDrop);
      Event.add(o, "blur", this.checkBlur);
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
      s = Reg.getContent(o, data),reg = Issue.getRegStr(s);o.reg = eval(reg + ";");
      isReg = Reg.check(o, o.reg, data), isPaste = e.ctrlKey && data.toLowerCase() == "v";
      if (!isReg && 8!=key && 0!=key &&!isPaste)
        if(e.preventDefault)e.preventDefault(); 
      return isReg;
    },
    checkPaste : function(evt){
      var e = (evt || event || window.event),o = e.srcElement || e.target,
      data = Clipboard.getData(), s = Reg.getContent(o, data),reg = Issue.getRegStr(s);
      o.reg = eval(reg + ";");
      isReg = Reg.check(o, o.reg, data);
      if(!isReg && e.preventDefault) e.preventDefault();
      return isReg;
    },
    checkDrop : function(evt){
      var e = (evt || event || window.event),o = e.srcElement || e.target,
      data = e.dataTransfer.getData('Text'), s = Reg.getContent(o, data),reg = Issue.getRegStr(s);
      o.reg = eval(reg + ";");
      isReg = Reg.check(o, o.reg, data);      
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
    ffcheck : function(evt){
      var e = (evt || event || window.event),o = e.srcElement || e.target, s=o.value,
      reg = eval(this.getRegStr(s) + ";"), isReg = reg.test(s);
      Event.add(o, "blur", this.checkBlur);
      if(!isReg){
        o.value = this.init;
      }
      this.init = o.value;  
      return isReg;
    }
}