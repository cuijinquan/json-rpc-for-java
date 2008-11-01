{
  oCur:null,
  /* 锁定区域宽度的智能控制 */
  atRsLkWidth:function(szId)
  {
     var oTd = $("#" + szId + "_lc"), w = 0, n = 10, w1 = $("#" + szId).width();
     oTd.find("table.x-grid3-header td[class]").not(":hidden").each(function()
     {
        w += $(this).width();
     });
     oTd.css({width: (w + n) + "px"}).next().each(function()
     {
        oTd = $(this);oTd.css({width: (w1 - w - n) + "px"})
        .find("div.x-grid3-scroller").css({width: oTd.width() + "px"});
     });
  }, /* 添加collection进行处理 */
  addResize: function(szId)
  {
     var _t = this, b = $("#" + szId + " td[@class*='" + szId + "_hd_']");
     _t.oCur = _t.getDom(szId); /* 当前操作的collection对象 */
     _t.onResize = function(szId)
     {
         var a = $("#" + szId + " td[@class*='" + szId + "_fst_']").not(":hidden"), w, o, o1,
             b = $("#" + szId + " td[@class*='" + szId + "_hd_']"),
             b1 = $("#" + szId + " td[@class*='" + szId + "_ft_']").not(":hidden"), i, /* 标题行中的Td */
             sta = $("#" + szId + " div[@class=statistics] > table td"); /* 标题行中统计信息的Td */;
         i = 0;
         b.not(":hidden").each(function()
         {
            o = $(this);
            if(-1 < o.attr("class").indexOf("x-grid3-hd"))
            {
	            if(b.length > i)
	            {
	                var setTdw = function(oTd, w)
	                {
	                   oTd.css({width: w+ "px"});
	                };
	                /* 数据体第一行中的td对象 */
		            o1 = $(a[i]);w = o1.width();
		            if(0 < w)
		              setTdw(o, w), setTdw($(b1[i]), w),
		              setTdw($(o).find("div[@class*=x-grid3-hd-]"), w);
		            /*调整统计信息的列宽度*/
		            /*setTdw($(sta[i]), w);*/
		            /* Fixed */
		            if(0 < i)
		            {  /* o 为标题 */
		               var nC = o.offset().left - o1.offset().left;
		               if(0 != nC)
		               {
		                 $(b[i - 1]).each(function()
		                 {
		                     var oP = $(this);
		                     w = oP.width() - nC;
		                     setTdw(oP, w);
		                 });
		               }
		            }
	            }
	            i++;
            }
         });
         _t.atRsLkWidth(szId);
     };
         
     /* 滚动条图层宽度的设置 */
     $("#" + szId + " div[@class=x-grid3-scroller]").each(function()
     {
        w = $(this);w.css({width: (w.width() + 10)+ "px"}).parent("td").css({width: w.width() + "px"});
     }).scroll(function()
     {
        var o = $(this);
        $("#" + szId + "_scroll").attr("scrollTop", o.attr("scrollTop"));
        $("#" + szId + " div[@class=x-grid3-header-inner]").attr("scrollLeft", o.attr("scrollLeft"));
     });
     $(document).ready(function()
     {
        _t.onResize(szId);
     });     
     i = 0;
     w = $("#" + szId + "_xh div[@class*=x-grid3-row][@id*=" + szId + "_R_]");
     /* 行高度调整 */
     $("#" + szId + " div[@class=x-grid3-body]").find("div[@class*=x-grid3-row][@id*=" + szId + "_R_]").each(function()
     {
        $(w[i++]).css({height: $(this).height() + "px"});
     });
     /* 数据展示区域高度的校正，确保设置同样高度的collection，在有不同功能区时外观高度一致 */
     var oClct = $("#" + szId), h = oClct.attr("scrollHeight") - oClct.height();
     $("#" + szId + " div.x-grid3-scroller").add($("#" + szId + "_scroll")).each(function()
     {
        oClct = $(this);oClct.css({height: (oClct.height() - h) + "px"});
     });
     
     i = 0;
     b.each(function()
     {
        if(b.length > i++)/* 控制最后一列不处理 */
          $(this).mousemove(function(e)
          {
           e = e || window.event;
           var o = $(this), x = e.x || e.pageX, y = e.y || e.pageY, offset = o.offset(), 
               n = Math.abs(offset.left + o.width() - x);
           if( n <= 3)o[0].style.cursor = "col-resize";
           else o[0].style.cursor = "default";
          }).mousedown(function(e)
          {
           e = e || window.event; /* oTd当前td */
           var o = _t.oTd = $(this), x = e.x || e.pageX, y = e.y || e.pageY, offset = o.offset(), 
               w = o.width() + (_t.isIE ? 3 : 0), fnTmp;
           if("col-resize" == o.css("cursor"))
           {
              var o1 = _t.RsProxy.style, o2 = _t.RsMarker.style;
              o2.left = offset.left + "px", o1.left = (offset.left + w) + "px",
              o1.height = o2.height = ($("#" + szId + " div[@class=x-grid3-scroller]").height() + o.height()) + "px",
              o1.top = o2.top = offset.top + "px", o1.display = o2.display = "block";
              _t.RsMarker["_x"] = e.screenX;
              $(document).bind("mouseup", function(e)
		        {
		           var x = e.x || e.pageX, y = e.y || e.pageY, o1 = _t.RsProxy.style, o2 = _t.RsMarker.style, 
		               w = (parseInt(o1.left) - parseInt(o2.left)) + "px", s;
		           if(_t.oTd)
		           {
		              s = /(x\-grid3\-td\-\d+)/g.exec(_t.oTd.attr("class"));
		              if(s)
		              {
		                 _t.oTd.css({width: w, cursor:"default"});
		                 /* 远控设置style */
                         rpc.XuiRpc.setCollectionColWidth(szId, parseInt(/(\d+)$/g.exec(s[1])[1]) - 1, w);
		                 $("#" + szId + " td[@class*=" + s[1] + "]").css({width: w}).find
		                 ("[@class*=x-grid3-hd]").each(function()
		                 {
		                    if("TD" == this.nodeName || "DIV" == this.nodeName)
		                    $(this).css({width: w});
		                 });
		                 _t.onResize(szId);
		                 _t.oTd = null;
		                 $(document).unbind("mousemove", fnTmp);
		                 $(document).unbind("mouseup", arguments.callee);
		              }
		              else arguments.callee(e);
		           }
		           _t.RsMarker["_x"] = 0;
		           o1.display = o2.display = "none";
		        }).mousemove(fnTmp = function(e)
		         {
		           e = e || window.event;
		           if(!_t.oTd)return true;
		           var o = _t.oTd, x = e.x || e.pageX, y = e.y || e.pageY, offset = o.offset(), 
		               n = Math.abs(offset.left + o.width() - x);
		           if("block" == _t.RsMarker.style.display)
		           {
		              _t.RsProxy.style.left = (parseInt(_t.RsProxy.style.left) + e.screenX - _t.RsMarker["_x"]) + "px";
		              _t.RsMarker["_x"] = e.screenX;
		           }
		           e && (_t.preventDefault(e), _t.stopPropagation(e));
		        });
           }
           else _t.RsProxy.style.display = _t.RsMarker.style.display = "none";
        })});
  },/* 隐藏列 */
  onclickColSlct:function(szId, n, oLi,e)
  {
    this.oCur = this.getDom(szId);var o = $("#" + szId + " td[class*=x-grid3-td-" + n + "]"), s = o[0].style.display;
    if("none" == o[0].style.display)
       o.show(), s = 'block';
    else o.hide(), s = 'none';
    /* 远控设置style */
    rpc.XuiRpc.setCollectionColStyle(szId, n - 1, "display", s);
    $(oLi).toggleClass("x-menu-item-checked");
    e && (this.preventDefault(e), this.stopPropagation(e));
    this.onResize(szId);
    return false;
  },/* 显示排序图层 */
  showSortClct:function(e,o,szId)
  {
     var _t = this, o1 = $(_t.sortClct), o2 = $(o),offset = o2.offset();
     _t.oCur = _t.getDom(szId); /* 当前collection */
     o1.css({display:'block', left: offset.left + "px", top: (offset.top + o2.height()) + "px"});
     _t.showDiv(o, _t.sortClct, o1.width(), o1.height());
     _t.sortClct["collectionId"] = szId;
     _t.oCurCol = _t.p(o, "TD");
     e && (_t.preventDefault(e), _t.stopPropagation(e));
     $(document).unbind("click", _t.hide2);
     $(document).bind("click",_t.hide2);
  }, /* 显示选择列是否显示的图层 */
  showSlctCols: function(e, o1)
  {
    var _t = this, a = [], szId = _t.oCur.id,
       o2 = $(_t.clctSlctCols), i = 1;
    $("#" + szId + " td[@class*=" + szId + "_hd_]").each(function()
    {
       var o = $(this), s = o.attr("class");
       if(-1 < s.indexOf("-" + i))
       {
	     a.push("<li onmouseover=\"$(this).addClass('x-menu-item-active')\" onmouseout=\"$(this).removeClass('x-menu-item-active')\" class=\"x-menu-list-item" + ("none" !=o[0].style.display ? " x-menu-item-checked" : "") + "\" onclick=\"Collection.onclickColSlct('" + szId + "', " + (i++) + ", this,event)\"><a href=\"javascript:void(0)\" class=\"x-menu-itemx-menu-check-item\"><img class=\"x-menu-item-icon\" src=\"" + g_sysInfo[2] + "default/s.gif\"/>");
	     a.push(o.text());
	     a.push("</a></li>");
       }
    });
    $(_t.clctSlctCols).find("ul")[0].innerHTML = a.join("");
    _t.showDiv(o1, _t.clctSlctCols, o2.width(), 0, $(o1).offset().left + $(o1).width());
    $(_t.clctSlctCols).css({display:'block',overflow:'visible',height:'auto'});
  },hide2:function(e)
  {
    this.clearTm();
    this.hFlg=true,this.hiddenClct(e);
  },hiddenClct: function(e)
  {
    e = e || window.event;
    var _t = this,x = e.x || e.pageX, y = e.y || e.pageY;
     _t.clctTm = _t.regTimer(function()
    {
      var bHd = 0, bShow = "block" == _t.clctSlctCols.style.display,
          o1 = $(_t.clctSlctCols);
      if("block" == _t.clctSlctCols.style.display)
      {
         if(x < o1.offset().left || y < o1.offset().top || 
            x > o1.offset().left + o1.width() || 
            y > o1.offset().top + o1.height())bHd = 1;
      }
      if("block" == _t.sortClct.style.display)
      {
        o1 = $(_t.sortClct);
        if(x < o1.offset().left || y < o1.offset().top || 
            x > o1.offset().left + o1.width() || 
            y > o1.offset().top + o1.height())bHd += 1;
        else bHd -= 1;
      }
      if(0 < bHd)
         _t.hiddenShadow(_t.clctSlctCols),
         _t.hiddenShadow(_t.sortClct),
         $(document).unbind("click", _t.hide2);
      return true;
    }, 333);
    e && (_t.preventDefault(e), _t.stopPropagation(e));
  }, clearTm: function(e)
  {
    var _t = this;
    _t.hFlg = false, _t.clearTimer(_t.clctTm);
    e && (_t.preventDefault(e), _t.stopPropagation(e));
  },/* 事件，当前对象，collection ID，字段名 */
  clickForEdit:function(e, o, szClctId, szFldNm, n)
  {
     var _t = this, szId = szClctId + "_" + szFldNm + "_" + n, oIptDiv = _t.getDom(szId), 
         nBorder = 5, szRcls = /(?:\b|\s)(R\d+)(?:\b|\s)/g.exec(_t.p(o, "DIV").className)[1], 
        fnG = function(oIptDiv)
        {
          return _t.p(_t.p(oIptDiv, "DIV"), "DIV");
        }, oI = oIptDiv; 
     if(!oI || !/INPUT|SELECT|TEXTAREA/gi.exec(oI.nodeName))return _t;
     _t.oCur = _t.getDom(szClctId), o = $(o);
     /* 调用rpc更新数据，如果更新失败，则提示并还原数据，否则隐藏输入对象 */
     oI["xuiBlur"] = function()
     {
        var pall = $(fnG(oI)), bRst = false, szVal = pall.find(":input:last").val(), szErr
            oTds = $("#" + szClctId + " div." + szRcls + " td[@class*=x-grid3-td-]").not(".x-grid3-td-numberer"),
            oHds = $("#" + szClctId + " td[@class*=" + szClctId + "_hd_]"),
            oParm = {}, aF = [], y = 0, oRst = null, 
            oDv = o.find(":first"), szOldvl = oDv.text();
        oDv.text(szVal);
        /* rpc提交 */
        if(oTds.size() == oHds.size())
           oHds.each(function()
           {
              var szFd;
              aF.push(szFd = $(this).attr("field"));
              oParm[szFd] = $(oTds[y++]).text();
           });
        oParm[aF[/x-grid3-col-(\d+)/g.exec(oDv.attr("class"))[1]]  + "_old"] = szOldvl;
        oRst = rpc.XuiRpc.EditCollectionRow(szClctId, oParm, false);
        if(szErr = rpc.XuiRpc.getErrMsg())
           alert(szErr);
        /* 数据的回写 */
        if(oRst)
        {
           y = 0, oTds.each(function()
           {
              $(this).find(":first").text(oRst[aF[y++]]);
           });
        }
        pall.hide();
     };
     if(0 == $(fnG(oI)).find("table").size())
     $(oIptDiv).bind("blur", function()
     {
        oI["xuiBlur"]();
        $(this).unbind("blur", arguments.callee);
     });
     oIptDiv = fnG(oIptDiv);
     oIptDiv = $(oIptDiv);
     var oOffset = $("#" + szClctId).offset();
     oIptDiv.css({ zIndex:9999, width: (o.width() + nBorder)+ "px", top: (o.offset().top - oOffset.top) + "px", 
      left: (o.offset().left - oOffset.left) + "px", display:'block', position:'absolute', height: o.height() + "px"}).find(":input").val(o.text());
     $(oI).focus();
  },

    /*点击列标志*/
  colClicktag : false,
  
  closeClicktag : function(e){
    e = e || window.event, o = e.target || e.srcElement;
    this.colClicktag = false;
    var proxy = document.getElementById("drag-proxy");
    var top = document.getElementById("moveTop"), bottom = document.getElementById("moveBottom");
    proxy.style.visibility = "hidden";
    top.style.visibility = "hidden";
    bottom.style.visibility = "hidden";
    if (this.oCurCol.move && o && o.className){
      if ("TD" != o.nodeName) o = $(o).parent()[0];
      var col1 = "." + o.className.split(" ")[2],
      col2 = "." + this.oCurCol.className.split(" ")[2];
      
      for (var i=0, target=$(col1), source=$(col2); i<target.length; i++){
        Element(target[i]).insertNode("afterEnd", source[i]);
      }
    }
  },
  
  colDrag : function(e, content){
    e = e || window.event, o = e.target || e.srcElement;
    o = $(o), x = e.x || e.pageX, offset = o.offset(), n = offset.left + o.width() - x;
    if(this.colClicktag){ 
      /*增加列名*/
      var ghost = document.getElementById("drag-ghost");
      var html = "<div style=\"margin: 0pt; width: 120px; height:16px; float: none;\" unselectable=\"on\" class=\"x-grid3-hd-inner x-grid3-hd-common\">"
                 + $(this.oCurCol).text();
                 + "</div>";
      ghost.innerHTML = html;           
	  
	  /*修改位置*/	
      var proxy = document.getElementById("drag-proxy"),
      top = document.getElementById("moveTop"), bottom = document.getElementById("moveBottom"),
      div = this.oCurCol.getElementsByTagName("div")[0], link = this.oCurCol.getElementsByTagName("a")[0],
      notCurrent = o[0] != this.oCurCol && o[0] != div && o[0] != link && "DIV" == o[0].nodeName && (o[0].className.indexOf("hd") > -1);      
      proxy.style.visibility = "visible";
      proxy.style.left = (e.clientX+12) + "px";
      proxy.style.top = (e.clientY+20) + "px";
      if (n <= o.width()/2 && notCurrent){
        proxy.className = "x-dd-drag-proxy x-dd-drop-ok x-grid3-col-dd";
        top.style.visibility = "visible";
        top.style.top = (offset.top - 10) + "px";
        top.style.left = offset.left + o.width() + "px";
        bottom.style.visibility = "visible";
        bottom.style.top = offset.top + 20 + "px";
        bottom.style.left = offset.left + o.width() + "px";        
        this.oCurCol.move = true;
      }else {
        proxy.className = "x-dd-drag-proxy x-dd-drop-nodrop x-grid3-col-dd";
        top.style.visibility = "hidden";
        bottom.style.visibility = "hidden";
      }  
    }
  },

  init: function()
  {
     var _t = this;
     _t.binds(["clickForEdit", "clearTm", "hiddenClct", "hide2", "onclickColSlct"]);
     _t.clctTm = 0;
      _t.insertHtml(document.body, "beforeend", "<div id=\"sortClct\" class=\"x-layer x-menu\" style=\"position:absolute; z-index: 15000; display:none;\"><a onclick=\"return false;\" href=\"javascript:void(0)\" class=\"x-menu-focus\"></a><ul class=\"x-menu-list\"><li class=\"x-menu-list-item\"><a href=\"javascript:void(0)\" class=\"x-menu-item xg-hmenu-sort-asc\"><img class=\"x-menu-item-icon\" src=\"" + g_sysInfo[2] + "default/s.gif\"/>Sort Ascending</a></li><li class=\"x-menu-list-item\"><a href=\"javascript:void(0)\" class=\"x-menu-item xg-hmenu-sort-desc\"><img class=\"x-menu-item-icon\" src=\"" + g_sysInfo[2] + "default/s.gif\"/>SortDescending</a></li><li class=\"x-menu-list-itemx-menu-sep-li\"><span class=\"x-menu-sep\"></span></li><li class=\"x-menu-list-item\"><a href=\"javascript:void(0)\" onclick=\"Collection.showSlctCols(event, this)\" class=\"x-menu-item x-menu-item-arrow\"><img class=\"x-menu-item-icon x-cols-icon\" src=\"" + g_sysInfo[2] + "default/s.gif\"/>Columns</a></li></ul></div><div class=\"x-grid3-resize-marker\" id=\"x-grid3-resize-marker\">&nbsp;</div><div class=\"x-grid3-resize-proxy\" id=\"x-grid3-resize-proxy\">&nbsp;</div><div id=\"clctSlctCols\" class=\"x-layer x-menu\" style=\"position: absolute; z-index: 15005; display:none;\"><a onclick=\"return false;\" href=\"javascript:void\" class=\"x-menu-focus\"></a><ul class=\"x-menu-list\"></ul></div>");
     _t.clctSlctCols = _t.getDom("clctSlctCols");
     _t.RsMarker = _t.getDom("x-grid3-resize-marker");/* 前 */
     _t.RsProxy  = _t.getDom("x-grid3-resize-proxy"); /* 后 */
     $(_t.sortClct = _t.getDom("sortClct"))
     .mousemove(_t.clearTm).mouseover(_t.clearTm).find("li[@class=x-menu-list-item]")
     .mouseover(function()
     {
       $(this).addClass('x-menu-item-active');
     }).mouseout(function()
     {
       $(this).removeClass('x-menu-item-active');
     }); /* 排序对象 */
     $(_t.sortClct).mousemove(_t.clearTm).mouseover(_t.clearTm);
     
      /* 插入列移动Div */
     _t.insertHtml(document.body, "beforeend", "<div id=\"drag-proxy\" class=\"x-dd-drag-proxy x-dd-drop-nodrop x-grid3-col-dd\" style=\"position: absolute; z-index: 15000; visibility: hidden; left: -10000px; top: -10000px;\">"
     	+ "<div class=\"x-dd-drop-icon\"></div>"
     	+ "<div id=\"drag-ghost\" class=\"x-dd-drag-ghost\"></div>"
     	+ "</div>");
     	
    /* 插入列移动标识 */
    _t.insertHtml(document.body, "beforeend", "<div id=\"moveTop\" class=\"col-move-top\"> </div>"
      + "<div id=\"moveBottom\" class=\"col-move-bottom\"> </div>"); 	
     	
     /* 列绑定事件 */
     $(".x-grid3-hd").mousedown(function(e){
       var o = $(this), x = e.x || e.pageX, offset = o.offset(), n = offset.left + o.width() - x;
	   if (n > 3){       
         /* 缓存当前列 */
         _t.oCurCol = this;
         _t.colClicktag = true;
         var proxy = document.getElementById("drag-proxy");
         proxy.style.left = (e.clientX+12) + "px";
         proxy.style.top = (e.clientY+20) + "px";
         
         _t.closeClicktag = _t.bind(_t.closeClicktag, _t),
         _t.colDrag = _t.bind(_t.colDrag, _t);
         $(document).unbind("mouseup",_t.closeClicktag).unbind("mousemove", _t.colDrag)
                  .bind("mouseup",_t.closeClicktag).bind("mousemove", _t.colDrag);           
       }           
     });	     
     
     return this;
  }
}