{
    add : function(o, type, fn){
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
    }
}