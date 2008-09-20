{ data:(window.Base = rpc.LoadJsObj("Base"),null),SelectDiv:false,xuiSelectShdow:null,
  getObj:function(szId)
  {
    return slctIptData[szId]||{};
  },
  getData:function(szId) /* 获取下拉列表数据 */
  {
    return this.data || this.getObj(szId)["collection"]
  }, /* 高亮显示指定的行 */
  lightRow:function(n,flg)
  {
    var o = this.SelectDiv, tb = o.getElementsByTagName("table"), b = 0 < tb.length && 0 < tb[0].rows.length, r = b ? tb[0].rows : null;
    if(!b)return false;
    r[o["_lstNum"] || 0].className='slcthand';
    if(-1 == n)n = r.length - 1;
    if(r.length <= n || 0 > n)n = 0;
    r[n].className='cursor slctOver';
    if(!flg)r[n].scrollIntoView(true);
    o["_lstNum"] = n;
    return n;
  },
  showShadow:function(o)
  {
     if("none" == o.display)return;
     var w = parseFloat(o.width) + 10, h = parseFloat(o.height || 1) + 2,
         obj = (this.xuiSelectShdow || (this.xuiSelectShdow = Base.id("xuiSelectShdow"))).style,
         left = parseFloat(o.left) - 4, top = parseFloat(o.top) + 2, zIndex = o.zIndex - 1;
     obj.width = w + "px", obj.height = h + "px",
     obj.top = top + "px", obj.left = left + "px",
     obj.zIndex = zIndex, obj.position = "absolute", obj.display = "block";

     Base.id("xuislctsd4").style.width = Base.id("xuislctsd3").style.width =
     Base.id("xuislctsd1").style.width = (w - 12) + "px";
     obj = Base.id("xuislctsd2");
     obj.style.height = (h - 12) + "px";
     o = obj.getElementsByTagName("div");
     for(w = 0; w < o.length; w++)o[w].style.height = obj.style.height;
  },
  getSelectDataStr:function(oE, w)
  {
    var _t = this, a = this.getData(oE.id), a1 = ["<div class=\"cursor selectInput_FloatDiv\"><table cellPadding=\"0\" border=\"0\" cellSpacing=\"0\" style=\"border:0px;width:100%;margin:0px;padding:0px;\">"], i, j, o, k,
        b = this.getObj(oE.id)["displayFields"], bDisp = !b;
    !bDisp && (b = b.split(/[,;\|\/]/));
    for(i = 0; i < a.length; i++)
    {
      o = a[i];
      a1.push("<tr onclick=\"Select.onSelect(event, this)\" class=\"cursor\" onmouseover=\"this.title=this.innerText||this.textContent;Select.lightRow(this.rowIndex, true)\"\">");
      if(bDisp)
      {
          for(k in o)
           if("_id_" != k)
             a1.push("<td><nobr>"), a1.push(o[k]), a1.push("</nobr></td>");
      }
      else
      {
        for(j = 0; j < b.length; j++)
          a1.push("<td><nobr>"), a1.push(o[b[j]]), a1.push("</nobr></td>");
      }
      a1.push("</tr>");
    }
    a1.push("</table></div>");
    return a1.join("")
  }, /* 给对象设置value */
  setValue:function(szId,s)
  {
     var o = Base.id(szId), i,old;
     if(o)
     {
      o.value = s; /* checkbox 的处理 */
      if("checkbox" === (o.type || ""))o.checked=true;
      Base.fireEvent(o, "change");
      szId = o.id;
     }
     old = o;
     o = document.getElementsByName(szId);
     if(old == i)return this;

     if(o.length) /* radio box的处理 */
     {
       for(i = 0; i < o.length; i++)
       {
          if((o[i].value || '') === s)
          {
             o[i].checked=true;
             Base.fireEvent(o[i], "change");
             break;
          }
       }
     }
     else
     {
        o = old.parentNode.getElementsByTagName("input");
        if(1 < o.length && "hidden" == (o[1].type || ''))
           o[1].value = s;
     }
     return this;
  }, /* 选择的处理 */
  onSelect:function(e, oTr)
  {
     var o = this.SelectDiv, id = o.id, oIpt = Base.id(o[id]),a,
         n = "number" == typeof oTr.rowIndex ? oTr.rowIndex : oTr, oT = this.getObj(oIpt.id), dt = this.getData(oIpt.id),
         cbk = oT['selectCallBack'];
     if(0 <= n && dt.length > n)
     {
        o["_tm"] = 13;
       /* 处理选择 */
       if(oT['valueField'])
       {
         /* value处理 */
         a = oT['valueField'].split(/[,; ]/);
         this.setValue(oIpt, dt[n][a[0]]);
         if(1 < a.length)oIpt.value = dt[n][a[1]];
       } /* 回调处理 */
       cbk && cbk(dt[n], oIpt);
       if(e)Base.preventDefault(e), Base.stopPropagation(e);
       o["_lstNum"] = n;
       this.xuiSelectShdow.style.display = o.style.display = 'none';
     }else o["_over"] = 1;
  }, /* 检查当前输入对象的显示图层是否正在显示 */
  isShow: function(e, obj, oE)
  {
     var o = this.SelectDiv, szId = o.id;
     return(o && "block" == o.style.display && o[szId] == oE.id);
  }, /* 检索过滤处理 */
  onInput:function(e, oIpt)
  {
     var n = 0, o = this.SelectDiv, oT = this.getObj(oIpt.id), k,
         s = oIpt.value.replace(/(^\s+)|(\s+$)/g, ""), a = oT["collection"], b = [];
     /* _inInput 防止重入 */
     if(o && !o["_inInput"])
     {
       o["_inInput"] = true, this.data = null;
       /* 检索过滤处理 */
       if(0 < s.length)
       {
          for(n = 0; n < a.length; n++)
             for(k in a[n])
              if("_id_" != k && -1 < a[n][k].indexOf(s))
              {
                 b.push(a[n]);
                 break;
              }
          this.data = b;
       }
       this.showSelectDiv(e, {width:o.style.width}, oIpt, b);
       o["_inInput"] = false;
     }
  }, /* 键盘事件处理 */
  onkeydown:function(e, oIpt)
  {
     e = e || window.event;
     var n = e.which || e.keyCode, o = this.SelectDiv, oT = this.getObj(oIpt.id), i = o["_lstNum"] || 0;
     switch(n)
     {
        /* 接受连续退格键 e.repeat, 8 */
        /*Esc 关闭图层*/
        case 27:o["_tm"] = 13, this.xuiSelectShdow.style.display = o.style.display = 'none';break;
        /* 回车选择 */
        case 13:
           this.onSelect(null, i);
           o["_tm"] = i;
           Base.bIE ? (e.keyCode = 9) : (e.which = 9);
           this.xuiSelectShdow.style.display = o.style.display = 'none';
           break;
        case 38: /* 上 */
           i = this.lightRow(i - 1);
           break;
        case 40: /* 下 */
           i = this.lightRow(i + 1);
           break;
        default:;
     }
     return n;
  }, /* 显示下拉列表图层 */
  showSelectDiv: function(e, obj, oE)
  {
    var b3 = (3 == arguments.length);
    if(oE.readOnly || oE.disabled || (this.isShow(e, obj, oE) && b3))return false;
    var _t = this, o = this.SelectDiv, szId,
        oR = Base.getOffset(oE),h = oR[3] - 1, w = oR[2],
        p = {height:'1px',left: (oR[0] - (Base.bIE ? 2 : 0)) + "px", top: (oR[1] + h) + "px", display:'block',
        position: "absolute",
        width: ((Base.bIE ? 2 : 0) + parseInt((obj||{}).width || oE.clientWidth || w)) + "px"},
        k, fns = [function(){o["_over"] = 1, o["_tm"] = 3000},
                  function(){o["_over"] = null,o["_tm"] = 13}];
    if(!o)
    {
       this.SelectDiv = o = Base.createDiv({className:"x-combo-list", id:"_Xui_SelectDiv"});
       document.body.appendChild(o);
       Base.addEvent(o, "mousemove", fns[0]).addEvent(o, "mousedown", fns[0])
           .addEvent(o, "mouseup", fns[0]).addEvent(o, "mouseout", fns[1]);
       var a1 = [];
       a1.push("<div class=\"x-shadow\" id=\"xuiSelectShdow\" style=\"display: block;\">");
       a1.push("<div class=\"xst\"><div class=\"xstl\"></div><div class=\"xstc\" id=\"xuislctsd1\"></div><div class=\"xstr\"></div></div>");
       a1.push("<div class=\"xsc\" id=\"xuislctsd2\"><div class=\"xsml\"></div><div class=\"xsmc\" id=\"xuislctsd3\"></div><div class=\"xsmr\"></div></div>");
       a1.push("<div class=\"xsb\"><div class=\"xsbl\"></div><div class=\"xsbc\" id=\"xuislctsd4\"></div><div class=\"xsbr\"></div></div></div>");
       var oTmp = Base.createDiv();
       oTmp.innerHTML = a1.join("");
       document.body.appendChild(oTmp);
       oTmp = a1 = null;
    }
    szId = o.id;
    /* 状态的处理: 输入对象的id保留 */
    o[szId] = oE.id, o["_over"] = 1, o["_tm"] = 13, o["_lstNum"] = 0, o["_in"] = false;

    /* 修正显示图层的上下位置 */
    if(190 < p.top - document.body.scrollTop)p.top =  p.top - (o.clientHeight || 170) - h;
    /* 失去焦点就隐藏 */
    if(!oE[szId])
    {
       oE[szId] = o.id,
       Base.addEvent(oE, "blur", _t.hiddenSelectDiv).addEvent(oE, "mousemove", fns[0])
           .addEvent(oE, "mouseout", function(e)
           {
             _t.lightRow(-2)
           });
    }
    for(k in p)o.style[k] = p[k];
    if(b3) /* 清除过滤显示数据 */
	   _t.data  = null;
    if(0 < oE.value.length)this.onInput(e, oE);
    o.innerHTML = _t.getSelectDataStr(oE, p.width);
    setTimeout(function(){
      o.childNodes[0].style["height"] = o.style["height"] = Math.min(170, k = 2 + (o.scrollHeight || o.getElementsByTagName("table")[0].clientHeight)) + "px";
      _t.showShadow(o.style);
    }, 33);
    this.lightRow(0);
    Base.stopPropagation(e);
    Base.preventDefault(e);
  }, /* 隐藏图层的方法 */
  hiddenSelectDiv:function()
  {
    var o = this.SelectDiv;
    /* 注册自动关闭,防止重入，如果重入就回启动多个timer服务定时器 */
    if(o && !o["_in"])
    {
      o["_over"] = null;
      o["_in"] = true;
      Base.regTimer(function(e)
      {
         if(!o["_over"])
            return o["_in"] = false, o.style.display = 'block', true;
         return false
      },o["_tm"]);
    }
  }
}