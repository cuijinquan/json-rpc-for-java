{   
    /* 初始化宽度. id: tabs标签的id */
    initWidth : function(id){
      return $("#" + id);
    },
    
    /* 初始化宽度. id: tabs标签的id, active:设置选中tab的id */
    TabsInit:function(id, active){
       XUI(this);
       var i = 1, tabs = this.initWidth(id)[0], _t = this;
       if(!tabs)return this;
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
    
    /* 关闭标签页.id: tabs标签的id, o:需要关闭tab的id属性值 */
    closeTab : function(id, o){
      var myTab = $("#" + id), tabs = $("#" + id)[0], o = $("#"+o)[0],
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
      $(li).css("display", "none");
      $(b).css("display", "none");
      this.disableTab(id, li.id);
    },
    
    /* 显示标签页.id: tabs标签的id, o:需要显示tab的id属性值 */
    showTab : function(id, o){
      var myTab = $("#" + id), tabs = $("#" + id)[0], o = $("#"+o)[0],
      li = "LI" == o.nodeName ? o : this.p(o, "LI"),
      b = myTab.find("#" + li.id + "_body");
      $(li).css("display", "block");
      $(b).css("display", "block");
      this.enableTab(id, li.id);
    },
    
    /* 将tab页置灰. id:tabs标签的id, tab:需要置灰标签页的id */
    disableTab : function(id, tab){
      var li = $("#" + id + " #" + tab), _t = this;
      this.toggleStyle("x-item-disabled", li[0], true);
    },
    
    /* 将置灰的tab页恢复. id:tabs标签的id, tab:需要置灰 签页的id*/
    enableTab : function(id, tab){
      var li = $("#" + id + " #" + tab), _t = this;
      this.toggleStyle("x-item-disabled", li[0], false);
    },
    
    /* 将为name的class样式，增加或者是删除在指定的对象上.如果返回是真的的话,表示增加或者删除成功 */
    toggleStyle : function(cStyle, o, show){
      if (!o)return false;
      o = $(o);
      var bRst = o.attr("className").indexOf(cStyle); 
      show ? o.addClass(cStyle) : o.removeClass(cStyle);
      return -1 < bRst;
    },
    
    /* 如果指定的tab页被隐藏，则滑动至可见. id:标签页tabs的id，active:滑动到指定标签页的id */
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
    
    /* 设置选中的tab页. id:标签页tabs的id，active:指定选中的标签页的id */
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
    
    /* 获取显示了的标签页的整个宽度 */
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
    
    /* 标签页向左滑动函数. */
    tabScrollRightHandler : function(id, speed){
      speed = speed || 25;
      var tabs = $("#" + id)[0],
      index = tabs.left || 1, 
      index = (1 != index) && "sub" == tabs.action ? (index + 1): index;
      var h = tabs.headers["index" + index], myTab = $("#" + id);
      if("undefined" == typeof h)return this;
      current = myTab.find("#" + h["id"])[0];
      if("none" == $(current).css("display")){
        tabs.left = ++index;
        h = tabs.headers["index"+index];
        current = myTab.find("#" + h["id"])[0];
      }
      var eachw = $(current).width() < 140 ? 140 : $(current).width(), 
      r = parseInt($(current).css("right")), timer = null, 
      count = parseInt(tabs.getElementsByTagName("LI").length/2), prew = tabs.w || 0,
      twidth = $(tabs).width(),
      rslider = myTab.find("#xui_tab_r_slider")[0], 
      lslider = myTab.find("#xui_tab_l_slider")[0];
      if (!tabs.stop){
          var tmpw = 0;
	      for(i=count; i>0; i--){
	        var tmph = tabs.headers["index"+i];
	        if(!tmph)continue;
	        var th = $("#" + id + " #" + tmph["id"]);
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
    
    /*标签页向左滑动函数.*/  
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
	    if(window.event)
	     $(document).ready(function(){
	    var input = oTab.find("#" + szId + "_body" + " input:first");
	    if(0 < input.length)$(input).focus();
	    });
    },
    
    /*设置onmouse over和out的样式*/
	tabOver : function(o, show){
	  var name = o.className, length = name.indexOf("x-item-disabled");
      if (length > -1)return false; 
      
	  this.toggleStyle("x-tab-strip-over", o, show);
    },
    
    /*点击标签页头，高亮显示标题*/
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
    
    /*判断是否所有的标签页都是隐藏的*/
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
    
    /*获取下一个非隐藏的标签页*/
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
        
    /*点击标签页的下拉选框菜单时，滑动到对应的标签页上*/
    slidet : function(id, o, index){
      var tabs = $("#")[0],
      h = tabs.headers["index" + index], active = h["id"],
      current = $("#" + id + " #" + active)[0];
      if("none" == $(current).css("display"))return;
      this.setActiveTab(id, active);
    }
}