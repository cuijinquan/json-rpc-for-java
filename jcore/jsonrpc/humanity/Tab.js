{
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
       XUI(this);
       this.initWidth(id);
       var i=1, tabs = $("#"+id+"xui_tabs")[0], _t = this;
       tabs.headers = new Object();
       $("#" + id + " span.x-tab-strip-text").each(function(){
          var o = $(this), p = o.parent(), w = p.width(), li=_t.p(o[0], "LI");
          p.width('100%');
          if(o.width() < 122){
            p.width(w);
          }  
          tabs.headers["index"+i] = {"id":li.id}; 
          i++;
       });
       tabs.max = i-1;
       this.setActiveTab(id, active);
    },
    
    closeTab : function(id, o){
      var tabs = $("#"+id+"xui_tabs")[0],
      li = "LI" == o.nodeName ? o : this.p(o, "LI"),
      b = $("#" + id + " #" + li.id + "_body"), 
      index = parseInt(li.attributes['index'].nodeValue) + 1,
      h = tabs.headers["index"+index];
      var name = li.className,length = name.indexOf("x-item-disabled");
      if (length > -1)return false; 
      if(h){
        next = $("#" + id + " #" + h["id"] + " span.x-tab-strip-text")[0];
        this.tabLoad(id, next);
      }
      this.tabScrollRightHandler(id);
      $(b).css("display", "none");
      this.disableTab(id, li.id);
    },
    
    disableTab : function(id, tab){
      var li = $("#" + id + " #" + tab), _t = this;
      this.toggleStyle("x-item-disabled", li[0], true);
    },
    
    enableTab : function(id, tab){
      var li = $("#" + id + " #" + tab), _t = this;
      this.toggleStyle("x-item-disabled", li[0], false);
    },
    
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
    
    moveToTab : function(id, active){
      try{
        var o = $("#" + id + " #" + active)[0], 
        index = parseInt(o.attributes['index'].nodeValue),
        tabs = $("#"+id+"xui_tabs")[0], left = tabs.left || 1,
        speed = 400;
        if(index < left){
          for(var i=0; i<left-index; i++)
            this.tabScrollLeftHandler(id, speed);
        } else {
          for(var i=left; i<index-1; i++)
	        this.tabScrollRightHandler(id, speed);
        }
      }catch(e){alert(e.message);}
    },
    
    setActiveTab : function(id, active){
     var o = $("#" + id + " #" + active)[0];
     if(o){
      this.moveToTab(id, active);
      this.tabLoad(id, o);
     } else {
      var ftab = $("#" + id +" span.x-tab-strip-text")[0];
      this.tabLoad(id, ftab);
     }
    },
    
    getDisplayWidth : function(id, index){
      var tabs = $("#"+id+"xui_tabs")[0], count = 0;
      for(var i=index; i<=tabs.max; i++){
        var h = tabs.headers["index"+i];
        var hid = "#" + id + " #" + h["id"];
        var show = $(hid).css("display");
        if ("none" != show) count += $(hid).width();
      }
      return count;
    },
    
    tabScrollRightHandler : function(id, speed){
      speed = speed || 25;
      var tabs = $("#"+id+"xui_tabs")[0],
      index = tabs.left || 1, 
      index = (1 != index) && "sub"==tabs.action?(index+1):index;
      var h = tabs.headers["index"+index];
      current = $("#" + id + " #" + h["id"])[0];
      if("none" == $(current).css("display")){
        tabs.left = ++index;
        h = tabs.headers["index"+index];
        current = $("#" + id + " #" + h["id"])[0];
      }
      var eachw = $(current).width() < 140 ? 140 : $(current).width(), 
      r = parseInt($(current).css("right")), timer = null, 
      count = tabs.getElementsByTagName("LI").length, prew = tabs.w || 0,
      twidth = $(tabs).width(),
      rslider = $("#" + id + " #xui_tab_r_slider")[0], 
      lslider = $("#" + id + " #xui_tab_l_slider")[0];
      if (!tabs.stop){
          var tmpw = 0;
	      for(i=count-1; i>=0; i--){
	        var tmph = tabs.headers["index"+i], th = $("#" + id + " #" + tmph["id"]);
	        /*if("none" == th.css("display"))continue;*/
	        tmpw += th.width();
	        if (tmpw > twidth){
	          tabs.stop = i+2;
	          break;
	        }
	      }
      }
      if (index >= count || index > tabs.stop){
        this.toggleStyle("x-tab-scroller-right-disabled", rslider, true);
        return;
      }
      if (r >= (eachw + prew)){
        this.toggleStyle("x-tab-scroller-left-disabled", lslider, false);
        tabs.left = ++index;tabs.w = prew + eachw;tabs.action="add";
        tabs.stop = undefined;
		clearTimeout(timer);        
      } else {
        r += speed;
        $("#"+id+" li.x-tab-with-icon").each(function(){
          $(this).css("right", (r+"px"));
        });  
        timer = setTimeout("Tab.tabScrollRightHandler('"+id+"');", 10);
      }
    },
      
    tabScrollLeftHandler : function(id, speed){
      speed = speed || 25;
      var tabs = $("#"+id+"xui_tabs")[0], index = (tabs.left) || 1, 
      index = "add"==tabs.action?(index-1):index, 
      h = tabs.headers["index"+index],
      current = $("#" + id + " #" + h["id"])[0];
      if("none" == $(current).css("display")){
        tabs.left = --index;
        h = tabs.headers["index"+index];
        current = $("#" + id + " #" + h["id"])[0];
      }
      var eachw = $(current).width() < 140 ? 140 : $(current).width(), 
      r = parseInt($(current).css("right")), timer = null, prew = tabs.w || 0,
      rslider = $("#" + id + " #xui_tab_r_slider")[0], 
      lslider = $("#" + id + " #xui_tab_l_slider")[0];
	  if(r<0) {
	    this.toggleStyle("x-tab-scroller-left-disabled", lslider, true);
	    return;
	  }
      if(r <= prew-eachw){
        this.toggleStyle("x-tab-scroller-right-disabled", rslider, false);
        tabs.left = --index; tabs.w = prew - eachw;tabs.action="sub";
        clearTimeout(timer);
      } else {
        r -= speed;
        $("#"+id+" li.x-tab-with-icon").each(function(){
          $(this).css("right", (r+"px"));
        });  
        timer = setTimeout("Tab.tabScrollLeftHandler('"+id+"');", 10);
      }
    },
    
    tabLoad : function(id, span, hide){
        var o = "LI" == span.nodeName ? span : this.p(span,"LI"), 
        name = o.className,length = name.indexOf("x-item-disabled");
        if (length > -1)return false;
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
	    if(hide){
	      $(o).css("display", "none");
	    }
    },
    
	tabOver : function(o, show){
	  var name = o.className,length = name.indexOf("x-item-disabled");
      if (length > -1)return false; 
      /*
	  if (name.indexOf("x-tab-strip-active") <= -1){
	    this.toggleStyle("x-tab-strip-over", o, show);
	  }
	  */
	  this.toggleStyle("x-tab-strip-over", o, show);
    },
    
    tablist : function(id, o){
      var div = $("#" + id + "tabslist"), li = this.p(o, "LI"),
      left = $(li).offset().left+"px", top = ($(li).offset().top+23)+"px";
      div.css({"display":"block", "left":left, "top":top});
      _t = this;
      $(document).bind("click", function(e){
        var id2 = "#" + id + "tabslist", div = $(id2),
        e = e || window.event, src = e.target || e.srcElement;
        if ("x-tab-strip-close2" == src.className)return;
        var p = _t.p(src, "DIV");
        if (p && id2 == ("#"+p.id))return;
        if ("none" != div.css("display")){
	     div.css("display", "none");
	    }
      });
    },
    
    isAllHide : function(id){
      var tabs = $("#"+id+"xui_tabs")[0];
      for(var i=1; i<=tabs.max; i++){
        var h = tabs.headers["index"+i];
        var hid = "#" + id + " #" + h["id"];
        var show = $(hid).css("display");
        if ("none" != show) return false;
      }
      return true;
    },
    
    getNextShowTab : function(id, index){
      var tabs = $("#"+id+"xui_tabs")[0];
      if(this.isAllHide(id))return undefined;
      var h = tabs.headers["index"+index];
      index = index%tabs.max;
      var nh = tabs.headers["index"+(index+1)];
      if(nh && nh["id"]){
        var css = $("#"+id+" #"+nh["id"]).css("display");
        if("none" == css){
          index++;return this.getNextShowTab(id, index);
        }else{
          return nh["id"];
        }  
      }else{
        return undefined;
      }
    },
    
    showTab : function(id, o, index){
      var tabs = $("#"+id+"xui_tabs")[0], hide = this.isAllHide(id);
      var li = this.p(o, "LI"),
      b = this.toggleStyle("x-menu-item-checked", li, false), 
      h = tabs.headers["index"+index],
      cid = "#" + id + " #" + h["id"], cbid = cid + "_body", 
      next = undefined, nid = "", nbid = "";
      if (!b){
		$(li).addClass("x-menu-item-checked").removeClass("x-menu-item-unchecked");
		$(cid).css("display", "block");
      } else {
        $(li).addClass("x-menu-item-unchecked");
        $(cid).css("display", "none");
        if (this.isAllHide(id)){
          $(cid).css("display", "block");
          return;
        }
        if (tabs.active == h["id"]){
	        next = this.getNextShowTab(id,index);
	        if (next){
	          nid = "#" + id + " #" + next; nbid = nid + "_body";
              $(cid).removeClass("x-tab-strip-active");
              $(nid).addClass("x-tab-strip-active");
              $(cbid).addClass("x-hide-display");
              $(nbid).removeClass("x-hide-display");
              tabs.active = next;
              tabs.left = index+1;
              tabs.action = "add";
            } else {
              $(cbid).addClass("x-hide-display");
            }
        } else { 
          $(cbid).addClass("x-hide-display");
        }
      }  
    },
    
    slidet : function(id, o, index){
      var tabs = $("#"+id+"xui_tabs")[0],
      h = tabs.headers["index"+index], active = h["id"],
      current = $("#" + id + " #" + active)[0];
      if("none" == $(current).css("display"))return;
      this.setActiveTab(id, active);
    }
}