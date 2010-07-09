closeTab : function(id,szid){
      var tabs = $("#"+id),_t=NewTab.getHeader(szid),nextTab,tab_ul = $("#"+id+"_ul"),allshowTab = tab_ul.find("li").not(".x-tab-item-li-hide");
      if(allshowTab.size() != 1){
	      if(window["g_active"+id] == szid){
	      	  nextTab = _t.nextAll(":not('.x-tab-item-li-hide')").not(".x-tab-item-li-disabled")[0]|| _t.prevAll(":not(.x-tab-item-li-hide)").not(".x-tab-item-li-disabled")[0] || _t;
	      	  this.tabLoad(id,$(nextTab));
	      }
	      _t.addClass("x-tab-item-li-hide");
	      $("#"+szid).css("display","none");
	      window["no_active"+"_"+szid]=false;
      }
    },
    closeOtherTab : function(tabs,szid){
    	var tab_ul = $("#"+tabs+"_ul"),allshowTab = tab_ul.find("li").not(".x-tab-item-li-hide");
    	if(allshowTab.size() != 1){
	    	tab_ul.find("li[id!="+szid+"_hd]").each(function(){
	    		$(this).addClass("x-tab-item-li-hide");
	    		$("#"+$(this).attr("id")+"_body").css("display","none");
	    		 window["no_active"+"_"+szid]=false;
	    	});
	    	$("#"+szid).css("display","block");	
	    	this.tabLoad(tabs,NewTab.getHeader(szid));
    	}
    },
    showTab : function(id,o){
      var myTab=$("#"+id),b=myTab.find("#"+o);
      NewTab.getHeader(o).removeClass("x-tab-item-li-hide");
      window["no_active"+"_"+o]=true;
    },
    disableTab : function(id,tab){
    	var _t = NewTab.getHeader(tab);
    	_t.find("em").addClass("x-tab-item-li-em-disabled");
    	_t.addClass("x-tab-item-li-disabled");
    	if(window["g_active"+id]==tab){
    		nextTab = _t.nextAll(":not('.x-tab-item-li-hide')")[0]|| _t.prevAll(":not(.x-tab-item-li-hide)")[0] || _t;
	      	this.tabLoad(id,$(nextTab));
    	}
    	_t.unbind("click");
    },
    enableTab : function(id,tab){
    	var _t = NewTab.getHeader(tab);
    	_t.find("em").removeClass("x-tab-item-li-em-disabled");
    	_t.removeClass("x-tab-item-li-disabled");
    	_t.click(function(){window[tab+"_click"]()});
    	NewTab.addContextMenu(id,_t);
    },
    toggleStyle : function(cStyle,o,show){
    },
    moveToTab : function(id,active){
     },
     /* 通过TAB ID激活TAB */
    setActiveTab : function(id,active){
     var tab_ul=$("#"+id+"_ul"),o;
     if(null != active && "null" != active){
      o=tab_ul.find("#"+active+"_hd")[0] || tab_ul.find("li:contains('"+active+"')")[0];
      o = $(o);
      this.tabLoad(id,o);
      this.enableTab(id,NewTab.getBodyId(o.attr("id")));
     }else {
      var ftabs= tab_ul.find("li"),nextTab;
      nextTab = nextTab = ftabs.nextAll(":not('.x-tab-item-li-hide')").not(".x-tab-item-li-disabled")[0]|| ftabs.prevAll(":not(.x-tab-item-li-hide)").not(".x-tab-item-li-disabled")[0] || ftabs;
      this.tabLoad(id,$(nextTab));
      this.enableTab(id,nextTab.attr("id"));
     }
     },
   	getDisplayWidth : function(id,index){
   	},
  	 tabScrollRightHandler : function(id,speed){
      },  
     tabScrollLeftHandler : function(id,speed){
     },
     tabLoad : function(id,span,hide){
      // 1.先显示当前页（若隐藏），设置激活样式
      // 2.保存激活信息（tabs,form）
      // 3.除去其他激活样式
      // 4.焦点处于第一个 input对象
	    var tabs_ul = $("#"+id+"_ul"),curTab = span,tabs = $("#"+id),
	    hd_id=curTab.attr("id"),
	    curTab_body = NewTab.getBodyId(hd_id);
	    NewTab.showTab(id,curTab.attr("id"));
	   	var spans = curTab.find("span");
    	spans.filter(".x-tab-item-text").addClass("x-tab-item-text-active");
    	spans.filter(".x-tab-item-bg-right").addClass("x-tab-item-bg-right-active");
    	spans.filter(".x-tab-item-bg-left").addClass("x-tab-item-bg-left-active");
    	/** 显示当前TAB_BODY **/
    	$("#"+curTab_body).css("display","block").removeClass("x-hide-display");
	    tabs_ul.find("li[id!="+curTab.attr("id")+"]").each(function(){
	    	spans = $(this).find("span");
	    	spans.filter(".x-tab-item-text").removeClass("x-tab-item-text-active");
	    	spans.filter(".x-tab-item-bg-right").removeClass("x-tab-item-bg-right-active");
	    	spans.filter(".x-tab-item-bg-left").removeClass("x-tab-item-bg-left-active");
	    	var cur_hdId = $(this).attr("id");
	    	$("#"+NewTab.getBodyId(cur_hdId)).addClass("x-hide-display").removeAttr("style");
	    });
	   try{$("#"+curTab.attr("id")).find(":input[type!=hidden]").eq(0).focus();}catch(e){}
	    window["g_active"+id]=curTab_body;
	    (id+"_Act").setValue(curTab_body);
    },
	tabOver : function(o,show){
    },
    tablist : function(id,o){
    },
    isAllHide : function(id){
    },
    getNextShowTab : function(id,index){
    },
    slidet : function(id,o,index){
    },
    getHeader : function(id){
    	return $("#"+id+"_hd");
    },
    getBodyId : function(id){
    	return id.substr(0,id.length-3);
    },
    /**
    *  右键菜单刷新TAB (tabsID,tabID)    
    **/
    updateTab : function(tabs,id){
    	var tab = NewTab.getHeader(id),tab_body = $("#"+id);
    	if(typeof tab.attr("reqCode") != "undefined"){
    		Base.AjaxUpdateUi(id,tab.attr("reqCode"));
    	}
    	else if(typeof tab.attr("url") != "undefined")
    	{
    		document.getElementById("iframe_"+id).src=tab.attr("url");
    	}
    	window["g_Refreshed_"+id]=true;
    },
    createTabItem : function(tabs,o){
		var li,tab_ul=$("#"+tabs+"_ul"),tabs_o=$("#"+tabs),
		url=o.url!=null?" url='"+o.url+"'":" ",
		reqCode=o.reqCode!=null?" reqCode='"+o.reqCode+"'":" ";
		var itemsCodeArr=[
		"<li  class='x-tab-item-li' isTab='true'",
		"id="+o.id+"_hd mode='"+o.mode+"' "+url+reqCode+" >",
		"<span class='x-tab-item-bg-left'/>",
		"<span class='x-tab-item-text' title="+o.key+">",
		"<em>"+o.key+"</em></span>",
		"<span class='x-tab-item-bg-right'/>",
		"</li>"
	    	];    		
    	li = $(itemsCodeArr.join(""));
	    li.click(function(){
   			NewTab.tabLoad(tabs,li);
   			if(window["g_Refreshed_"+o.id]==null)
   			NewTab.updateTab(tabs,o.id);
 			eval(o.onclick);
   		});
   		window[o.id+"_click"]=function(){
   			NewTab.tabLoad(tabs,li);
   			if(window["g_Refreshed_"+o.id]==null)
   			NewTab.updateTab(tabs,li);
 			eval(o.onclick);
 		};
   		var mode =o.mode || "";
	   	tab_ul.append(li);
	   	 switch(mode.toUpperCase()){
	   		case "H":
	   			NewTab.closeTab(tabs,o.id);
	   		break;
	   		case "D":
	   			NewTab.disableTab(tabs,o.id)
	   		break;
	   	}
	   	var tab_body = tabs_o.find("#"+o.id),ol=tabs_o.find("ol:first");
	   	if(null==tab_body[0]){
	   		ol.append($("<div/>").addClass("newTab_body x-hide-display").attr("id",o.id));
	   	}
	   	if(null != o.url){
	   		var iframe_id = "iframe_"+o.id;
	   		tabs_o.find("#"+o.id)
	   		.append($("<iframe frameborder='no' border='0' marginwidth='0' marginheight='0'/>")
	   		.attr("src",o.url).addClass("x-tab-iten-body-iframe")
	   		.attr("id",iframe_id)
	   		.height(ol.height()));
	   	}
	   	if(mode.toUpperCase()!="D"){
	   		NewTab.addContextMenu(tabs,li);
	   	}
     },
     createTabsHeader : function(o){
     var allTab=o.alltab,tabs=$("#"+o.id);
     if($("#"+o.id+'_hdPanel')[0])return;
     var htmlCodeArr=[
     "<div id='"+o.id+"_hdPanel' class='x-tabs-panel'>",
     "<div id='"+o.id+"_mLeft' class='x-tabs-panel-mleft'></div>",
     "<ul class='x-tab-item-ul' id='"+o.id+"_ul'/>",
     //"<div id='"+o.id+"_rReft' class='x-tabs-panel-rleft'></div>",
     "</div>"
     ];
     var leftM =  $("#"+o.id+"_rReft");
     tabs.prepend(htmlCodeArr.join(""));
     $(allTab).each(function(){
    	 NewTab.createTabItem(o.id,this);
     });
     //this.addContextMenu(o.id);
     var tab_ul =  $("#"+o.id+"_ul"),
     activeTab = tab_ul.find("#"+o.active+"_hd")[0] || tab_ul.find("li:contains("+o.active+")")[0] || tab_ul.find("li").not(".x-tab-item-li-hide")[0]
     ,activeTab=$(activeTab);
	 this.tabLoad(o.id,activeTab);
	 window["g_active"+o.id]=activeTab.attr("id");
     },
     addContextMenu : function(tabs,li){
		//alt(li.html());
		$("#contextMenuSource").remove();
     	var contextMenuSource=[
     	"<div class='contextMenu' id='contextMenuSource'><ul>",
        "<li id='close'><img src='"+g_sysInfo[2]+"/default/tabs/remove_outline.png' /> 关闭当前</li>",
        "<li id='closeOther'><img src='"+g_sysInfo[2]+"/default/tabs/remove.png' /> 关闭其他</li>",
        "<li id='refresh'><img src='"+g_sysInfo[2]+"/default/tabs/refresh.png' /> 刷新当前</li></ul></div>"
     	];
     	$("body").append(contextMenuSource.join(""));
     	li.contextMenu("contextMenuSource",{
     		 bindings:{
     		 	"close":function(_t){
   		 			NewTab.closeTab(tabs,NewTab.getBodyId(_t.id));
     		 	},
     		 	"closeOther":function(_t){
   		 			NewTab.closeOtherTab(tabs,NewTab.getBodyId(_t.id));
     		 	},
     		 	"refresh":function(_t){
   		 			NewTab.updateTab(tabs,NewTab.getBodyId(_t.id));
     		 	}
     		 }
     	});
     }