{
      radioOver:function(o){
        if(-1 == o.className.indexOf("x-form-check-checked")){
          o.className = "x-form-radio-wrap-inner x-form-check-over";
        }
      },
      radioOut:function(o){
        if(-1 == o.className.indexOf("x-form-check-checked")){
          o.className = "x-form-radio-wrap-inner";
      }
      },
      radioPress:function (o){
        o.className = "x-form-radio-wrap-inner x-form-check-checked";
      var radio = o.getElementsByTagName("input")[0], 
          a = document.getElementsByName(radio.name);
      radio.checked = true;
      for(i = 0; i < a.length; i++){
        if(a[i] != radio){
          a[i].parentNode.className = "x-form-radio-wrap-inner",
           a[i].checked = false;
        }
      }  
     }
}