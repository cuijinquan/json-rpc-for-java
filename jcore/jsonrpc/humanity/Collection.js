{
  oCur:null,
  onResize: new function()
  {
     var _t = this;
     _t.start || (_t.start = function(){});
     _t.add = function(fn)
     {
        var f = _t.start;
        _t.start = fn;
        f.call(this);
        return _t;
     };
  }, /* 添加collection进行处理 */
  addResize: function(szId)
  {
     var _t = this, 
         b = $("#" + szId + " div[@class=x-grid3-header-offset] > table td"), i; /* 标题行中的Td */
     _t.oCur = _t.getDom(szId); /* 当前操作的collection对象 */
     _t.onResize.add(function()
     {
         var a = $("#" + szId + " div[@class*=x-grid3-row]:first td"), w, o, o1;
         i = 0;
         b.each(function()
         {
            o = $(this);
            if(-1 < o.attr("class").indexOf("x-grid3-hd"))
            {
	            if(b.length - 1 > i)
	            {
	                var setTdw = function(oTd, w)
	                {
	                   oTd.css({width: w+ "px"});
	                };
	                /* 数据体第一行中的td对象 */
		            o1 = $(a[i]);w = o1.width();
		            setTdw(o, w);
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
     });
     _t.onResize.start();
     
     /* 设置序号列高度 */
     var oXh = $("#" + szId + "_xh tr"),i = 0;
     $("#" + szId + " div[@class=x-grid3-body] div[@class*=x-grid3-row]").each(function()
     {
        if(0 < i)
        {
	        var o1 = $(oXh[i - 1]), o2 = $(this), n = o2.offset().top - $(oXh[i]).offset().top;
	        /*o1.css("height", (o1.height() - n)  + "px");*/
        }
        i++;
     });
     
     /* 滚动条图层宽度的设置 */
     $("#" + szId + " div[@class=x-grid3-scroller]").each(function()
     {
        w = $(this);w.css({width: w.width() + "px"});
     }).scroll(function()
     {
        var o = $(this);
        $("#" + szId + "_scroll").attr("scrollTop", o.attr("scrollTop"));
        $("#" + szId + " div[@class=x-grid3-header-inner]").attr("scrollLeft", o.attr("scrollLeft"));
     });
     i = 0;
     b.each(function()
     {
        if(b.length - 1 > i++)/* 控制最后一列不处理 */
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
		                 
		                 $("#" + szId + " td[@class*=" + s[1] + "]").css({width: w}).find
		                 ("[@class*=x-grid3-hd]").each(function()
		                 {
		                    if("TD" == this.nodeName || "DIV" == this.nodeName)
		                    $(this).css({width: w});
		                 });
		                 _t.onResize.start();
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
		        });
           }
           else _t.RsProxy.style.display = _t.RsMarker.style.display = "none";
        })});
  },/* 隐藏列 */
  onclickColSlct:function(szId, n, oLi,e)
  {
    this.oCur = this.getDom(szId);var o = $("#" + szId + " td[class*=x-grid3-td-" + n + "]");
    "none" == o[0].style.display ? o.show() : o.hide();
    $(oLi).toggleClass("x-menu-item-checked");
    this.sortClct.focus();
    e && (this.preventDefault(e), this.stopPropagation(e));
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

    $(_t.p(_t.oCurCol, "TR")).children().each(function()
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
    _t.showDiv(o1, _t.clctSlctCols, o2.width(), o2.height(), $(o1).offset().left + $(o1).width());
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
     var _t = this, szId = szClctId + "_" + szFldNm + "_" + n, oIptDiv = _t.getDom(szId), nBorder = 5,
        fnG = function(oIptDiv)
        {
          return _t.p(_t.p(oIptDiv, "DIV"), "DIV");
        }, oI = oIptDiv; 
     if(!oIptDiv || !/INPUT|SELECT|TEXTAREA/gi.exec(oIptDiv.nodeName))return _t;
     _t.oCur = _t.getDom(szClctId), o = $(o);
     $(oIptDiv).bind("blur", function()
     {
        var oIpt = $(fnG(this)).hide();
        o.find(":first").text($(this).val());
        $(this).unbind("blur", arguments.callee);
     });
     oIptDiv = fnG(oIptDiv);
     oIptDiv = $(oIptDiv);
     var oOffset = $("#" + szClctId).offset();
     oIptDiv.css({ zIndex:9999, width: (o.width() + nBorder)+ "px", top: (o.offset().top - oOffset.top) + "px", 
      left: (o.offset().left - oOffset.left) + "px", display:'block', position:'absolute', height: o.height() + "px"}).find(":input").val(o.text());
     $(oI).focus();
  },
   
  init: function()
  {
     var _t = this;
     _t.binds(["clickForEdit", "clearTm", "hiddenClct", "hide2", "onclickColSlct"]);
     _t.clctTm = 0;
     $(document).ready(function()
     {
        _t.onResize.start();
     });
      _t.insertHtml(document.body, "beforeend", "<div id=\"sortClct\" class=\"x-layer x-menu\" style=\"position:absolute; z-index: 15000; display:none;\"><a onclick=\"return false;\" href=\"javascript:void(0)\" class=\"x-menu-focus\"></a><ul class=\"x-menu-list\"><li class=\"x-menu-list-item\"><a href=\"javascript:void(0)\" class=\"x-menu-itemxg-hmenu-sort-asc\"><img class=\"x-menu-item-icon\" src=\"" + g_sysInfo[2] + "default/s.gif\"/>Sort Ascending</a></li><li class=\"x-menu-list-item\"><a href=\"javascript:void(0)\" class=\"x-menu-itemxg-hmenu-sort-desc\"><img class=\"x-menu-item-icon\" src=\"" + g_sysInfo[2] + "default/s.gif\"/>SortDescending</a></li><li class=\"x-menu-list-itemx-menu-sep-li\"><span class=\"x-menu-sep\"></span></li><li class=\"x-menu-list-item\"><a href=\"javascript:void(0)\" onclick=\"Collection.showSlctCols(event, this)\" class=\"x-menu-itemx-menu-item-arrow\"><img class=\"x-menu-item-icon x-cols-icon\" src=\"" + g_sysInfo[2] + "default/s.gif\"/>Columns</a></li></ul></div><div class=\"x-grid3-resize-marker\" id=\"x-grid3-resize-marker\">&nbsp;</div><div class=\"x-grid3-resize-proxy\" id=\"x-grid3-resize-proxy\">&nbsp;</div><div id=\"clctSlctCols\" class=\"x-layer x-menu\" style=\"position: absolute; z-index: 15005; display:none;\"><a onclick=\"return false;\" href=\"javascript:void\" class=\"x-menu-focus\"></a><ul class=\"x-menu-list\"></ul></div>");
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
     
     
     return this;
  }
}