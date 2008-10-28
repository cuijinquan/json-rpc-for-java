{
   IE:"IE", FF:"FireFox", SF:"Safari", OP:"opera",
   getOs : function(){
     if(navigator.userAgent.indexOf("MSIE")>=0)return this.IE;
	 if(isFirefox=navigator.userAgent.indexOf("Firefox")>=0)return this.FF; 
	 if(isSafari=navigator.userAgent.indexOf("Safari")>=0)return this.SF;  
	 if(isOpera=navigator.userAgent.indexOf("Opera")>=0)return this.OP;  
	 return "unexpected";
   },
   isIE : function(){return this.IE == this.getOs();},
   isFF : function(){return this.FF == this.getOs();},
   isSF : function(){return this.SF == this.getOs();},
   isOP : function(){return this.OP == this.getOs();}
}