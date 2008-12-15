{
    /*id: tabs标签的id tabstest1*/
    initWidth : function(id){
      var width = $("#" + id).width();
      $("#" + id).width(width);
      $("#" + id + "xui_tabs").width(width-2);
      $("#" + id + " div.x-tab-panel-header").width(width-2);
      $("#" + id + " div.x-tab-panel-body").each(function(){
        $(this).width(width-2);
      });
    },
    TabsInit:function(id, active){
       this.initWidth(id);
       $("#" + id + " span.x-tab-strip-text").each(function(){
          var o = $(this), p = o.parent(), w = p.width();
          p.width('100%');
          if(o.width() < 122)p.width(w);
       });
       this.setActiveTab(id, active);
    },
    /* 将为name的class样式，增加或者是删除在指定的对象上.如果返回是真的的话,表示增加或者删除成功*/
    toggleStyle : function(cStyle, o, show){
      if (!o)return false;
      var name = o.className,length = name.indexOf(cStyle);
      if(show){
        if(length <= -1){
          o.className += " " + cStyle;
          return true;
        }  
      }else{
        if(length > -1){
          o.className = name.substring(0,length);
          return true;
        }  
      }
      return false;
    },
    
    /*如果指定的tab页被隐藏，则滑动至可见.FIXME:每页的宽度要传递进去*/
    moveToTab : function(id, active){
      try{
        var o = $("#" + active)[0], tabs = $("#"+id+"xui_tabs")[0], 
        index = parseInt(o.attributes['index'].nodeValue);
        //tabs.stop = index;
        for(var i=0; i<index-1; i++)
	        this.tabScrollRightHandler(id);
      }catch(e){alert(e.message);}
    },
    
    /*设置选中的tab页*/
    setActiveTab : function(id, active){
     var o = $("#" + id + " #" + active)[0];
     if(o){
      this.moveToTab(id, active);
      this.tabLoad(id, o);
     } else {
      var ftab = $("#" + id +" li")[0];
      this.toggleStyle("x-tab-strip-active", ftab, true)
      this.tabLoad(id, ftab);
     }
    },
    tabScrollRightHandler : function(id){
      var tabs = $("#"+id+"xui_tabs")[0], 
      index = tabs.left || 1, 
      index = (1 != index) && "sub"==tabs.action?(index+1):index,
      //current = $("#"+id+"xui_tabs").find("#tab"+index)[0],
      current = $("#"+id+" #tab"+index)[0],
      eachw = $(current).width() < 140 ? 140 : $(current).width(), 
      r = parseInt($(current).css("right")), timer = null, 
      count = tabs.getElementsByTagName("LI").length, prew = tabs.w || 0,
      twidth = $(tabs).width();
      if (!tabs.stop){
          var tmpw = 0;
	      for(i=count-1; i>=0; i--){
	        tmpw += $("#"+id+" #tab"+i).width();
	        if (tmpw > twidth){
	          tabs.stop = i+2;
	          break;
	        }
	      }
      }
      if (index >= count || index > tabs.stop){
        return;
      }
      if (r >= (eachw + prew)){
        tabs.left = ++index;tabs.w = prew + eachw;tabs.action="add";
		clearTimeout(timer);        
      } else {
        r += 15;
        $("#"+id+" li.x-tab-with-icon").each(function(){
          $(this).css("right", (r+"px"));
        });  
        timer = setTimeout("Tab.tabScrollRightHandler('"+id+"');", 20);
      }
    },
      
    tabScrollLeftHandler : function(id){
      var tabs = $("#"+id+"xui_tabs")[0], index = (tabs.left) || 1, 
      index = "add"==tabs.action?(index-1):index, current = $("#"+id+" #tab"+index)[0],
      eachw = $(current).width() < 140 ? 140 : $(current).width(), 
      r = parseInt($(current).css("right")), timer = null, prew = tabs.w || 0;
	  document.title = ["index:",index, "eachw:",eachw, "r:", r, "prew:", prew];      
	  if(r<0) return;
      if(r <= prew-eachw){
        tabs.left = --index; tabs.w = prew - eachw;tabs.action="sub";
        clearTimeout(timer);
      } else {
        r -= 15;
        $("#"+id+" li.x-tab-with-icon").each(function(){
          $(this).css("right", (r+"px"));
        });  
        timer = setTimeout("Tab.tabScrollLeftHandler('"+id+"');", 20);
      }
    },
    /*加载tab页的内容*/
    tabLoad : function(id, o){
	    var tab = document.getElementById(id+"xui_tabs"), aid = tab.active || "xui_no_active",
	    active = $("#"+id+" #"+aid)[0],
	    abody = $("#" + id + " #" + aid + "_body")[0],
	    cbody = $("#"+id + " #" + o.id + "_body")[0];
	    this.toggleStyle("x-tab-strip-active", active, false);
	    this.toggleStyle("x-hide-display", abody, true);
	    this.toggleStyle("x-tab-strip-over", o, false);
	    this.toggleStyle("x-tab-strip-active", o, true);
	    this.toggleStyle("x-hide-display", cbody, false);
	    tab.active = o.id;
    },
	/*设置onmouse over和out的样式*/
	tabOver : function(o, show){
	  if (name.indexOf("x-tab-strip-active") <= -1){
	    this.toggleStyle("x-tab-strip-over", o, show);
	  }
    }  
}