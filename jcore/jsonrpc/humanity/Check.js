		  { initStyle:"x-form-check-wrap-inner",
		    overStyle:"x-form-check-wrap-inner x-form-check-over",
		    checkedStyle:"x-form-check-wrap-inner x-form-check-checked",
		    checkedFocus:"x-form-check-wrap-inner x-form-check-checked-focus",
		    
		    over:function(o){
		      if(Check.isReadonly(o.className))return false;
		      if(!Check.isChecked(o.className)){
		        o.className = Check.overStyle;
		      } else{
		        o.className = Check.checkedFocus;
		      }  
		    },
		    out:function(o){
		      if(Check.isReadonly(o.className))return false;
		      if(!Check.isChecked(o.className)){
			    o.className = Check.initStyle;
			  } else{
			    o.className = Check.checkedStyle;
			  }   
		    },
		    check:function(o){
		      if(Check.isReadonly(o.className))return false;
		      var checkbox = o.getElementsByTagName("input")[0]; 
		      if (!Check.isChecked(o.className)){
		        o.className = Check.checkedStyle;
		        checkbox.checked = true;
		      }else{
		        o.className = Check.overStyle;
		        checkbox.checked = false;
		      }
		    },
		    isChecked:function(className){
		      return -1 != className.indexOf("x-form-check-checked");
		    },
		    isReadonly:function(className){
		      return -1 != className.indexOf("readonly");
		    }
		  }  