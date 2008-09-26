﻿{ data:(window.Base = rpc.LoadJsObj("Base"),null),SelectDiv:false,inputObj:null,descObj:null,oFrom:null,
  getObj:function(szId)
  {
    return slctIptData[szId]||{};
  }, setData:function(szId,a){this.getObj(szId)["collection"] = a;},
  getData:function(szId) /* 获取下拉列表数据 */
  {
    var rst = this.getObj(szId)["collection"], i, s, o, k, key = "_id_";
    if(0 < rst.length && "" == rst[0][key].replace(/\d/g, ""))
    {
        for(i = 0; i < rst.length; i++)
        {
          s = [], o = rst[i];
          for(k in o)
             if(key != k)
                s.push(o[k]);
          rst[i][key] = s.join("\t");
        }
    }
    return this.data || this.getObj(szId)["collection"]
  }, /* 高亮显示指定的行 */
  lightRow:function(n,flg,e)
  {
    var o = this.SelectDiv, tb = o.getElementsByTagName("table"), b = 0 < tb.length && 0 < tb[0].rows.length, r = b ? tb[0].rows : null;
    if(!b)return false;
    if(r.length > o["_lstNum"])
       r[o["_lstNum"] || 0].className='slcthand';
    if(-1 == n)n = r.length - 1;
    if(r.length <= n || 0 > n)n = 0;
    r[n].className='cursor slctOver';
    if(!flg)r[n].scrollIntoView(true);
    o["_lstNum"] = n;
    if(3 == arguments.length)
      return Base.stopPropagation(e),Base.preventDefault(e), false;
    return n;
  },
  getSelectDataStr:function(oE, w)
  {
    var _t = this, a = this.getData(oE.id), a1 = ["<div class=\"cursor selectInput_FloatDiv\"><table cellPadding=\"0\" border=\"0\" class=\"xuiTable\" cellSpacing=\"0\" style=\"border:0px;width:100%;margin:0px;padding:0px;\">"], i, j, o, k,
        b = this.getObj(oE.id)["displayFields"], bDisp = !b, key = "_id_";
    !bDisp && (b = b.split(/[,;\|\/]/));
    for(i = 0; i < a.length; i++)
    {
      o = a[i];
      a1.push("<tr title=\"");
      a1.push(o[key]);
      a1.push("\" onclick=\"Select.onSelect(event, this)\" class=\"cursor\" onmouseover=\"return Select.lightRow(this.rowIndex,true,event)\"\">");
      if(bDisp)
      {
          for(k in o)
           if(key != k)
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
  setValue:function(s, n,e)
  {
     var descObj = this.descObj, inputObj = this.inputObj;
     if(1 == n && descObj)descObj.value = s;
     else if(2 == n && inputObj)inputObj.value = s;
     else if(descObj && inputObj)
        inputObj.value = descObj.value = s;
     if(e)Base.preventDefault(e), Base.stopPropagation(e);
     return this;
  },/* 通过描述得到value */
  getValueByDesc:function(s)
  {
     var oT = this.getObj(this.descObj.id), a = oT["collection"], i, b = (oT['valueField'] || "").split(/[,; ]/), b2 = 1 < b.length;
     if(oT['valueField'] && b2)
     for(i = 0; i < a.length; i++)
     {
        if(s == a[i][b[1]])
          return a[i][b[0]];
     }
     return null;
  }, /* 选择的处理 */
  onSelect:function(e, oTr)
  {
     var o = this.SelectDiv, id = o.id, oIpt = o[id] && Base.id(o[id]) || null,a,
         n = "number" == typeof oTr.rowIndex ? oTr.rowIndex : oTr, oT = this.getObj(oIpt.id) || {},
         dt = this.getData(oIpt.id) || [], cbk = oT['selectCallBack'];
     if(0 <= n && dt.length > n)
     {
       /* 处理选择 */
       if(oT['valueField'])
       { /* value处理 */
         a = (oT['valueField'] || "").split(/[,; ]/);
         this.setValue(dt[n][a[0]], 2, e);
         oIpt.value = (1 < a.length ? dt[n][a[1]] : dt[n][a[0]]);
       } /* 回调处理 */
       cbk && new Function("dt", "n", "oIpt", cbk +"(dt[n], oIpt);")(dt, n, oIpt);
       o["_lstNum"] = n;
     }else o["_over"] = 1;
     this.hidden();
     if(e)Base.preventDefault(e), Base.stopPropagation(e);
  }, /* 检查当前输入对象的显示图层是否正在显示 */
  isShow: function(e, obj, oE)
  {
     var o = this.SelectDiv, szId = o.id;
     return(o && "block" == o.style.display && o[szId] == oE.id);
  },
  hidden: function()
  {
     Base.hiddenShadow(Base.id("_Xui_SelectDiv"));
     this.updata((this.descObj || {}).value || "");
  }, /* 更新data数据 */
  updata:function(s)
  {
    if(!this.descObj)return this;
    if(0 == s.length)return this.data = null, this;
    var n, id = this.descObj.id, b = [], a = (this.getData(id), this.getObj(id)["collection"]);
    for(n = 0; n < a.length; n++)
      if(-1 < a[n]["_id_"].indexOf(s))
         b.push(a[n]);
    this.data = 0 < b.length ? b : null;
  },
  show: function()
  {
     Base.showShadow(Base.id("_Xui_SelectDiv"), this.oFrom);
  }, /* 检索过滤处理 */
  onInput:function(e, oIpt)
  {
     return Base.RunOne(function()
     {
       this.getData(oIpt.id);
       var n = 0, o = this.SelectDiv, oT = this.getObj(oIpt.id),
           s = oIpt.value.replace(/(^\s+)|(\s+$)/g, "");
       /* 检索过滤处理 */
       this.updata(s);
       n = this.getData(oIpt.id).length;
       if(oT["allowEdit"] || 1 == n)
       {
          s = this.getValueByDesc(s);
          s && this.setValue(s, 2, e);
       }
       else if(oIpt.getAttribute("oldValue") != s || 0 == n)
          this.setValue("", 2, e);
       if(0 < n)
          this.showSelectDiv(e, {width: o.style.width}, oIpt, this.data);
       else this.hidden();
       Base.stopPropagation(e),Base.preventDefault(e);
     }, this);
  }, /* 键盘事件处理 */
  onkeydown:function(e, oIpt)
  {
     e = e || window.event;
     var n = e.which || e.keyCode, o = this.SelectDiv, oT = this.getObj(oIpt.id), i = o["_lstNum"] || 0;
     switch(n)
     {
        /* 接受连续退格键 e.repeat, 8 */
        /*Esc 关闭图层*/
        case 27:this.hidden();break;
        /* 回车选择 */
        case 13:
           this.onSelect(null, i);
           Base.bIE ? (e.keyCode = 9) : (e.which = 9);
           this.hidden();
           break;
        case 38: /* 上 */
           i = this.lightRow(i - 1);
           break;
        case 40: /* 下 */
           i = this.lightRow(i + 1);
           break;
        default:;
     }
     return true;
  },onResize:function()
  {
    var o = Base.id("_Xui_SelectDiv");
    o && Base.showShadow(o, this.oFrom);
  }, /* 显示下拉列表图层 */
  showSelectDiv: function(e, obj, oE)
  {
    var b3 = (3 == arguments.length);
    e = e || window.event;
    if(oE.readOnly || oE.disabled || (this.isShow(e, obj, oE) && b3))return false;
    var _t = this, o = this.SelectDiv, szId, oTable = (this.oFrom = Base.p(oE,"TABLE")),
        oR = Base.getOffset(oTable),h = oR[3], w = oR[2],
        p = { height:'1px', left: (oR[0] - (8 <= Base.nVer ? 6 : 0)) + "px", 
              top: (oR[1] + h - (Base.bIE ? 3 : 2)) + "px", display:'block',
              position: "absolute",
              width: ((Base.bIE ? 2 : 0) + parseInt((obj||{}).width || oTable.clientWidth || w)) + "px"},
        k,show = function(event)
        {
          o["tmer"] && Base.clearTimer(o["tmer"]);
	      o.style.display = 'block';
          if(0 < (Select.getData(oE.id) || []).length)
          {
              if(o.style.height)              
                 _t.show();
          }
        },
        fns = function(){show(),o["_in_"] = true};
    /* 输入对象 */
    _t.inputObj = (_t.descObj = oE).parentNode.getElementsByTagName("input")[1];
    if(!o)
    {
       this.SelectDiv = o = Base.createDiv({className:"x-combo-list", id:"_Xui_SelectDiv"});
       Base.addEvent(o, "mousemove", fns).addEvent(o, "mousedown", fns)
           .addEvent(o, "scroll", fns).addEvent(o, "resize", _t.onResize)
           .addEvent(o, "mouseup", fns).addEvent(o, "mouseout", _t.hiddenSelectDiv);
    }
    szId = o.id;
    /* 状态的处理: 输入对象的id保留 */
    o[szId] = oE.id, o["_lstNum"] = 0, o["_blur_"]= false, fns();

    /* 修正显示图层的上下位置 */
    if(190 < p.top - document.body.scrollTop)p.top =  p.top - (o.clientHeight || 170) - h;
    /* 失去焦点就隐藏 */
    if(!oE[szId])
    {
       oE[szId] = o.id,
       Base.addEvent(oE, "blur", function(){o["_blur_"]=true,_t.hiddenSelectDiv()})
           .addEvent(oE, "mousemove", function(e)
               {
                 o["tmer"] && Base.clearTimer(o["tmer"]),
                 _t.updata(oE.value),
                 Base.fnMvIstPoint(oE, oE.value.length, oE.value.length, e);
               });
    }
    for(k in p)o.style[k] = p[k];
    _t.updata(oE.value);
    if(0 < oE.value.length)this.onInput(e, oE);
    o.innerHTML = _t.getSelectDataStr(oE, p.width);
    var nTm = new Date().getTime();
    Base.regTimer(function()
    {
       var oTable = o.getElementsByTagName("table"),n = Math.min(170, k = 2 + (o.scrollHeight || 0 < oTable.length && oTable[0].clientHeight || 0));
       if(0 < oTable.length && (15 < n || 1000 < new Date().getTime() - nTm))
       {
         o.getElementsByTagName("div")[0].style["height"] = o.style["height"] = n + "px";
         Base.showShadow(o, oTable);
         return true;
       }
       return false
    });
   
    this.lightRow(0);
    Base.stopPropagation(e),Base.preventDefault(e);
  }, /* 隐藏图层的方法 */
  hiddenSelectDiv:function()
  {
    var o = Select.SelectDiv;
    o["_tm_"] = new Date().getTime();
    o["_in_"] = false;
    /* 注册自动关闭,防止重入，如果重入就回启动多个timer服务定时器 */
    o["tmer"] = Base.regTimer(function(e)
    {
       if(o["_blur_"])
       {
	       if(o["_in_"])return true;
	       if(333 < new Date().getTime() - o["_tm_"])
	          return Select.hidden(), true;
       }
       return false
    }, 333);
  }
}