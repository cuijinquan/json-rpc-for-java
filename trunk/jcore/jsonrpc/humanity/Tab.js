{   
    // \u521d\u59cb\u5316\u5bbd\u5ea6. id: tabs\u6807\u7b7e\u7684id 
    initWidth : function(id){
      var o = $("#" + id), width = o.width(), o1;
      o.width(width);
      (o1 = $("#" + id)).width(width - 2);
      o.find("div.x-tab-panel-header").width(width - 2-2);
      o.find("div.x-tab-panel-body").each(function(){
        $(this).width(width - 5-2);
      });
      return o1;
    },
    
    // \u521d\u59cb\u5316\u5bbd\u5ea6. id: tabs\u6807\u7b7e\u7684id, active:\u8bbe\u7f6e\u9009\u4e2dtab\u7684id
    TabsInit:function(id, active){
       XUI(this);
       var i = 1, tabs = this.initWidth(id)[0], _t = this;
       tabs.headers = {};
       $("#" + id + " span.x-tab-strip-text").each(function(){
          var o = $(this), p = o.parent(), w = p.width(), li=_t.p(o[0], "LI");
          p.width('100%');
          if(o.width() < 122){
            p.width(w);
          }  
          tabs.headers["index" + i] = {"id": li.id}; 
          i++;
       });
       tabs.max = i - 1;
        try{this.setActiveTab(id, active);}catch(e){}
    },
    
    //\u5173\u95ed\u6807\u7b7e\u9875.id: tabs\u6807\u7b7e\u7684id, o:li\u7ec4\u4ef6
    closeTab : function(id, o){
      var myTab = $("#" + id), tabs = $("#" + id)[0],
      li = "LI" == o.nodeName ? o : this.p(o, "LI"),
      b = myTab.find("#" + li.id + "_body"), 
      index = parseInt(li.attributes['index'].nodeValue) + 1,
      h = tabs.headers["index" + index];
      var name = li.className,length = name.indexOf("x-item-disabled");
      if (length > -1)return false; 
      if(h){
        next = myTab.find("#" + h["id"] + " span.x-tab-strip-text")[0];
        this.tabLoad(id, next);
      }
      this.tabScrollRightHandler(id);
      $(b).css("display", "none");
      this.disableTab(id, li.id);
    },
    
    //\u5c06tab\u9875\u7f6e\u7070. id:tabs\u6807\u7b7e\u7684id, tab:\u9700\u8981\u7f6e\u7070\u6807\u7b7e\u9875\u7684id
    disableTab : function(id, tab){
      var li = $("#" + id + " #" + tab), _t = this;
      this.toggleStyle("x-item-disabled", li[0], true);
    },
    
    //\u5c06\u7f6e\u7070\u7684tab\u9875\u6062\u590d. id:tabs\u6807\u7b7e\u7684id, tab:\u9700\u8981\u7f6e\u7070\ufffd\ufffd\ufffd\u7b7e\u9875\u7684id
    enableTab : function(id, tab){
      var li = $("#" + id + " #" + tab), _t = this;
      this.toggleStyle("x-item-disabled", li[0], false);
    },
    
    //\u5c06\u4e3aname\u7684class\u6837\u5f0f\uff0c\u589e\u52a0\u6216\u8005\u662f\u5220\u9664\u5728\u6307\u5b9a\u7684\u5bf9\u8c61\u4e0a.\u5982\u679c\u8fd4\u56de\u662f\u771f\u7684\u7684\u8bdd,\u8868\u793a\u589e\u52a0\u6216\u8005\u5220\u9664\u6210\u529f
    toggleStyle : function(cStyle, o, show){
      if (!o)return false;
      o = $(o);
      var bRst = o.attr("className").indexOf(cStyle); 
      show ? o.addClass(cStyle) : o.removeClass(cStyle);
      return -1 < bRst;
    },
    
    //\u5982\u679c\u6307\u5b9a\u7684tab\u9875\u88ab\u9690\u85cf\uff0c\u5219\u6ed1\u52a8\u81f3\u53ef\u89c1. id:\u6807\u7b7e\u9875tabs\u7684id\uff0cactive:\u6ed1\u52a8\u5230\u6307\u5b9a\u6807\u7b7e\u9875\u7684id
    moveToTab : function(id, active){
      try{
        var o = $("#" + id + " #" + active)[0], 
        index = parseInt(o.attributes['index'].nodeValue),
        tabs = $("#" + id)[0], left = tabs.left || 1,
        speed = 400;
        if(index < left){
          for(var i = 0; i < left - index; i++)
            this.tabScrollLeftHandler(id, speed);
        } else {
          for(var i = left; i < index - 1; i++)
	        this.tabScrollRightHandler(id, speed);
        }
      }catch(e){alert(e.message);}
    },
    
    //\u8bbe\u7f6e\u9009\u4e2d\u7684tab\u9875. id:\u6807\u7b7e\u9875tabs\u7684id\uff0cactive:\u6307\u5b9a\u9009\u4e2d\u7684\u6807\u7b7e\u9875\u7684id
    setActiveTab : function(id, active){
     var myTab = $("#" + id), o = myTab.find("#" + active)[0];
     if(o){
      this.moveToTab(id, active);
      this.tabLoad(id, o);
     } else {
      var ftab = myTab.find("span.x-tab-strip-text")[0];
      this.tabLoad(id, ftab);
     }
    },
    
    //\u83b7\u53d6\u663e\u793a\u4e86\u7684\u6807\u7b7e\u9875\u7684\u6574\u4e2a\u5bbd\u5ea6
    getDisplayWidth : function(id, index){
      var tabs = $("#" + id)[0], count = 0, myTab = $("#" + id);
      for(var i = index; i <= tabs.max; i++){
        var h = tabs.headers["index" + i];
        var hid = "#" + h["id"];
        var show = myTab.find(hid).css("display");
        if ("none" != show) count += show.width();
      }
      return count;
    },
    
    //\u6807\u7b7e\u9875\u5411\u5de6\u6ed1\u52a8\u51fd\u6570.
    tabScrollRightHandler : function(id, speed){
      speed = speed || 25;
      var tabs = $("#" + id)[0],
      index = tabs.left || 1, 
      index = (1 != index) && "sub" == tabs.action ? (index + 1): index;
      var h = tabs.headers["index" + index], myTab = $("#" + id);
      current = myTab.find("#" + h["id"])[0];
      if("none" == $(current).css("display")){
        tabs.left = ++index;
        h = tabs.headers["index"+index];
        current = myTab.find("#" + h["id"])[0];
      }
      var eachw = $(current).width() < 140 ? 140 : $(current).width(), 
      r = parseInt($(current).css("right")), timer = null, 
      count = tabs.getElementsByTagName("LI").length/2, prew = tabs.w || 0,
      twidth = $(tabs).width(),
      rslider = myTab.find("#xui_tab_r_slider")[0], 
      lslider = myTab.find("#xui_tab_l_slider")[0];
      if (!tabs.stop){
          var tmpw = 0;
	      for(i=count; i>0; i--){
	        var tmph = tabs.headers["index"+i], th = $("#" + id + " #" + tmph["id"]);
	        
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
        tabs.left = ++index, tabs.w = prew + eachw, tabs.action = "add";
        tabs.stop = undefined;
		clearTimeout(timer);        
      } else {
        r += speed;
         myTab.find("li.x-tab-with-icon").each(function(){
          r = isNaN(r) ? 0 : r;
          $(this).css("right", (r + "px"));
        });  
        timer = setTimeout("Tab.tabScrollRightHandler('" + id + "');", 13);
      }
    },
    
    //\u6807\u7b7e\u9875\u5411\u5de6\u6ed1\u52a8\u51fd\u6570.  
    tabScrollLeftHandler : function(id, speed){
      speed = speed || 25;
      var tabs = $("#" + id)[0], index = (tabs.left) || 1, myTab = $("#" + id), 
      index = "add" == tabs.action ? (index - 1): index, 
      h = tabs.headers["index" + index],
      current = myTab.find("#" + h["id"])[0];
      if("none" == $(current).css("display")){
        tabs.left = --index;
        h = tabs.headers["index" + index];
        current = myTab("#" + h["id"])[0];
      }
      var oCur = $(current), eachw = oCur.width() < 140 ? 140 : oCur.width(), 
      r = parseInt(oCur.css("right")), timer = null, prew = tabs.w || 0,
      rslider = myTab.find("#xui_tab_r_slider")[0], 
      lslider = myTab.find("#xui_tab_l_slider")[0];
	  if(r<0) {
	    this.toggleStyle("x-tab-scroller-left-disabled", lslider, true);
	    return;
	  }
      if(r <= prew-eachw){
        this.toggleStyle("x-tab-scroller-right-disabled", rslider, false);
        tabs.left = --index; tabs.w = prew - eachw;tabs.action = "sub";
        clearTimeout(timer);
      } else {
         r -= speed;
         if(isNaN(r))r = 0;
         myTab.find("li.x-tab-with-icon").each(function(){
          r = isNaN(r) ? 0 : r;
          $(this).css("right", (r + "px"));
        }); 
        timer = setTimeout("Tab.tabScrollLeftHandler('" + id + "');", 10);
      }
    },
    
    
    tabLoad : function(id, span, hide){
        var o = $("LI" == span.nodeName ? span : this.p(span,"LI")),  szId = o.attr('id'),
        name = o.attr('class'),length = name.indexOf("x-item-disabled");
        if (length > -1)return false;
	    var oTab = $("#" + id), aid = oTab.attr('active') || "xui_no_active";
	    if(szId == aid)return false;
	    oTab.find("#" + szId + "_body").removeClass("x-hide-display");
	    oTab.find("#"+aid).removeClass("x-tab-strip-active");
	    oTab.find("#" + aid + "_body").addClass("x-hide-display");
	    o.removeClass("x-tab-strip-over").addClass("x-tab-strip-active");
	    oTab.attr('active', szId);
	    this.setValue("_tabActive_", szId);
	    if(hide){
	      o.css("display", "none");
	    }
	    var input = oTab.find("#" + szId + "_body" + " input:first");
	    if(0 < input.length)$(input).focus();
    },
    
    //\u8bbe\u7f6eonmouse over\u548cout\u7684\u6837\u5f0f
	tabOver : function(o, show){
	  var name = o.className, length = name.indexOf("x-item-disabled");
      if (length > -1)return false; 
      
	  this.toggleStyle("x-tab-strip-over", o, show);
    },
    
    //\u70b9\u51fb\u6807\u7b7e\u9875\u5934\uff0c\u9ad8\u4eae\u663e\u793a\u6807\u9898
    tablist : function(id, o){
      var div = $("#" + id + "tabslist"), li = this.p(o, "LI"), oLi = $(li), 
      left = oLi.offset().left + "px", top = (oLi.offset().top + 23)+"px";
      div.css({"display":"block", "left":left, "top":top});
      _t = this;
      $(document).bind("click", function(e){
        var id2 = "#" + id + "tabslist", div = $(id2),
        e = e || window.event, src = e.target || e.srcElement;
        if ("x-tab-strip-close2" == src.className)return;
        var p = _t.p(src, "DIV");
        if (p && id2 == ("#" + p.id))return;
        if ("none" != div.css("display")){
	     div.css("display", "none");
	    }
      });
    },
    
    //\u5224\u65ad\u662f\u5426\u6240\u6709\u7684\u6807\u7b7e\u9875\u90fd\u662f\u9690\u85cf\u7684
    isAllHide : function(id){
      var tabs = $("#" + id)[0], oTab = $("#" + id);
      for(var i = 1; i <= tabs.max; i++){
        var h = tabs.headers["index" + i];
        var hid = "#" + h["id"];
        var show = oTab.find(hid).css("display");
        if ("none" != show) return false;
      }
      return true;
    },
    
    //\u83b7\u53d6\u4e0b\u4e00\u4e2a\u975e\u9690\u85cf\u7684\u6807\u7b7e\u9875
    getNextShowTab : function(id, index){
      var tabs = $("#" + id)[0];
      if(this.isAllHide(id))return undefined;
      var h = tabs.headers["index" + index];
      index = index % tabs.max;
      var nh = tabs.headers["index" + (index + 1)];
      if(nh && nh["id"]){
        var css = $("#" + id + " #" + nh["id"]).css("display");
        if("none" == css){
          index++;return this.getNextShowTab(id, index);
        }else{
          return nh["id"];
        }  
      }else{
        return undefined;
      }
    },
    
    //\u5c06\u9690\u85cf\u7684\u6807\u7b7e\u9875\u663e\u793a
    showTab : function(id, o, index){
      var tabs = $("#" + id)[0], hide = this.isAllHide(id);
      var li = this.p(o, "LI"),
      b = this.toggleStyle("x-menu-item-checked", li, false), 
      h = tabs.headers["index" + index],
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
    
    //\u70b9\u51fb\u6807\u7b7e\u9875\u7684\u4e0b\u62c9\u9009\u6846\u83dc\u5355\u65f6\uff0c\u6ed1\u52a8\u5230\u5bf9\u5e94\u7684\u6807\u7b7e\u9875\u4e0a
    slidet : function(id, o, index){
      var tabs = $("#")[0],
      h = tabs.headers["index" + index], active = h["id"],
      current = $("#" + id + " #" + active)[0];
      if("none" == $(current).css("display"))return;
      this.setActiveTab(id, active);
    }
}