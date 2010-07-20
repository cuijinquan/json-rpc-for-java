{
  	tw :133,  
  	th :30,  
  	/* 隐藏指定id的Tab， 参数【tabs的id，需要隐藏的tab的id】 */
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
    /* 隐藏指定id的Tab之外的Tab ，参数【tabs的id，需要隐藏的tab的id】 */
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
     /* 显示指定id的Tab ，参数【tabs的id，需要显示的tab的id】 */
    showTab : function(id,o){
      var myTab=$("#"+id),b=myTab.find("#"+o);
      NewTab.getHeader(o).removeClass("x-tab-item-li-hide");
      window["no_active"+"_"+o]=true;
    },
     /* 禁用指定id的Tab ，参数【tabs的id，需要禁用的tab的id】 */
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
    /* 取消禁用指定id的Tab ，参数【tabs的id，需要取消禁用的tab的id】 */
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
    /* 激活指定id的Tab ，激活【tabs的id，需要取消禁用的tab的id】 */
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
   	/* 向右滑动整个tabs头部 ，参数【tabs的id，滑动速度】 */
  	 tabScrollRightHandler : function(id,speed){
  	 		var n = 3, k = 0, tabs = $("#"+id),tabs_panel = document.getElementById(id+"_hdPanel"),
  	 		w=$(tabs_panel).width(),tn = $("#"+id+"_ul").find("li:not('.x-tab-item-li-hide')").length,_tw=this.tw;
  	 		if(w >= tn*_tw || tabs_panel.scrollLeft >= (tn-3)*_tw)return;
  	 		Base.regTimer(function(){
  	 		  if(k + n > _tw)n = _tw - k;
  	 		  tabs_panel.scrollLeft+=n;
  	 		  k += n;
  	 		  if(_tw == k )return true;
  	 		  n *= 7;
  	 		  return false;
  	 		}, 13);
      }, 
      /* 向左滑动整个tabs头部 ，参数【tabs的id，滑动速度】 */ 
     tabScrollLeftHandler : function(id,speed){
  	 		var n = 3, k = 0, tabs = $("#"+id),tabs_panel = document.getElementById(id+"_hdPanel"),_tw=this.tw;
  	 		if(tabs_panel.scrollLeft <= 0)return;
  	 		Base.regTimer(function(){
  	 		  if(k + n > _tw)n = _tw - k;
  	 		  tabs_panel.scrollLeft-=n;
  	 		  k += n;
  	 		  if(_tw == k)return true;
  	 		  n *= 7;
  	 		  return false;
  	 		}, 13);
     },
     /* 向上滑动整个tabs头部 ，用于tab头部左右布局的时候，参数【tabs的id，滑动速度】 */ 
      tabScrollTopHandler : function(id,speed){
      		var n = 3, k = 0, tabs = $("#"+id),tabs_panel = document.getElementById(id+"_sc"),_th=this.th;
  	 		if(tabs_panel.scrollTop <= 0)return;
  	 		Base.regTimer(function(){
  	 		  if(k + n > _th)n = _th - k;
  	 		  tabs_panel.scrollTop-=n;
  	 		  k += n;
  	 		  if(_th == k )return true;
  	 		  n *= 2;
  	 		  return false;
  	 		}, 13);
      },
      /* 向下滑动整个tabs头部 ，用于tab头部左右布局的时候，参数【tabs的id，滑动速度】 */ 
      tabScrollDownHandler : function(id,speed){
      		var n = 3, k = 0, tabs = $("#"+id),tabs_panel = document.getElementById(id+"_sc"),_th=this.th
      		,tn = $("#"+id+"_ul").find("li:not('.x-tab-item-li-hide')").length,h = $(tabs_panel).height();
  	 		if(tn*_th <= h || tabs_panel.scrollTop >= (tn-3)*_th)return;
  	 		Base.regTimer(function(){
  	 		  if(k + n > _th)n = _th - k;
  	 		  tabs_panel.scrollTop+=n;
  	 		  k += n;
  	 		  if(_th == k)return true;
  	 		  n *= 2;
  	 		  return false;
  	 		}, 13);
  	 		
      },
     /* 加载Tab页 ，参数【tabs的id，需要加载的tab对象】 */
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
	   try{$("#"+curTab_body).find(":input[type!=hidden]").eq(0).focus();}catch(e){alt(e.message)}
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
    /* 通过tab的id获取tab的头部对象，参数【tab的id】 */
    getHeader : function(id){
    	return $("#"+id+"_hd");
    },
    /*通过tab的头部id获取tab的id，参数【tab头部的id】 */
    getBodyId : function(id){
    	return id.substr(0,id.length-3);
    },
    /*  右键菜单或者单击头部刷新TAB，参数【(tabs的ID,tab的ID】 */
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
    /* 创建tab对象 ，提供给开发人员调用，参数【tabs的id，包含创建tab需要的信息的object对象，是否是通过JavaScriptAPI添加】 */
    addTab :function(tabs,o){
    	return createTabItem(tabs,o);
    },
     /* 创建tab对象 ，参数【tabs的id，包含创建tab需要的信息的object对象，是否是通过JavaScriptAPI添加】 */
    createTabItem : function(tabs,o,flg){
    	var arr = eval("["+window["g_existTabs"]+"]");
    	if($.inArray(o.id,arr)>0 && flg == null){ alt("新添加的Tab的ID已经存在。");return;}
    	else if($.inArray(o.id,arr)>0)	return;
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
	   	window["g_existTabs"]+=",'"+o.id+"'";
     },
     /* 创建tabs的头部分 ，参数【包含有tabs、所有tab信息的object对象】 */
     createTabsHeader : function(o){
     var allTab=o.alltab,tabs=$("#"+o.id);
     if($("#"+o.id+'_hdPanel')[0])return;
    
     var hPos = o.hPos || "T",tabArr=[];
     if(hPos == "T" || hPos == "B"){
	   	 var htmlCodeArr=[
	     "<div id='"+o.id+"_mLeft' ></div>",
	     "<div id='"+o.id+"_mRight' ></div>",
	     "<div id='"+o.id+"_hdPanel'>",
	     "<ul class='x-tab-item-ul' id='"+o.id+"_ul'>",
	     "</ul>",
	     "</div>"
	     ], header=$(htmlCodeArr.join(""));
   		 header.addClass("x-tabs-panel");
   		 if(hPos == "T")tabs.prepend(header);else  tabs.append(header);
   		 $("#"+o.id+"_mRight").click(function(){
   		 	NewTab.tabScrollRightHandler(o.id);
   		 }).attr("title","向右滑动").addClass("x-tabs-panel-mright");
   		 $("#"+o.id+"_mLeft").click(function(){
   		 	NewTab.tabScrollLeftHandler(o.id);
   		 }).attr("title","向左滑动").addClass("x-tabs-panel-mleft");
     }else if(hPos == "L" || hPos == "R"){
     	header = [
     	"<div id='"+o.id+"_hdPanel'>",
    	"<div id='"+o.id+"_mLeft' ></div>",
     	"<div id='"+o.id+"_sc'><ul id='"+o.id+"_ul'>",
     	"</ul></div>",
     	"<div id='"+o.id+"_mRight' ></div>",
     	"</div>"		
     	].join("");
     	header = $(header);
     	if(hPos == "L"){
     		header.addClass("x-tabs-panel-left");
     		tabs.prepend(header);
     		tabs.find("ol:first").css("width","auto");
     	}else{
     		header.addClass("x-tabs-panel-right");
     		var ol = tabs.find("ol:first").css({"width":tabs.width()-142,"float":"left"});
			tabs.append(header);	
			tabs.resize(function(){
				ol.css({"width":tabs.width()-142,"float":"left"});
			});
     	}
     	$("#"+o.id+"_mRight").click(function(){
     		 	NewTab.tabScrollDownHandler(o.id);
     	}).attr("title","向下滑动").addClass("x-tabs-panel-mdown");
     	$("#"+o.id+"_mLeft").click(function(){
     		 	NewTab.tabScrollTopHandler(o.id);
     	}).attr("title","向上滑动").addClass("x-tabs-panel-mup");
     	header.css("height",o.height);
     	header.find("#"+o.id+"_sc").css({"height":header.height()-50,overflow:"hidden"});
     	tabs.css("background","");
     }
     $(allTab).each(function(){
    	 NewTab.createTabItem(o.id,this,"_flg");
     });
     var tab_ul =  $("#"+o.id+"_ul"),
     activeTab = tab_ul.find("#"+o.active+"_hd")[0] || tab_ul.find("li:contains("+o.active+")")[0] || tab_ul.find("li").not(".x-tab-item-li-hide")[0]
     ,activeTab=$(activeTab);
	 this.tabLoad(o.id,activeTab);
     },
     /* 给一个tab对象的头部添加右键菜单 ，参数【tabs的id，tab头部分的li节点对象】 */
     addContextMenu : function(tabs,li){
		$("#contextMenuSource").remove(); 
     	var contextMenuSource=[
     	"<div class='contextMenu' id='contextMenuSource'><ul>",
        "<li id='close'><img src='"+g_sysInfo[2]+"/default/tabs/remove_outline.png' /> 关闭当前</li>",
        "<li id='closeOther'><img src='"+g_sysInfo[2]+"/default/tabs/remove.png' /> 关闭其他</li>",
        "<li id='refresh'><img src='"+g_sysInfo[2]+"/default/tabs/refresh.png' /> 刷新当前</li></ul></div>"
     	],cm=$(contextMenuSource.join("")).addClass("x-tabs-contextMenu");
     	
     	$("body").append(cm);
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
     }