/**
* @fileOverview  事件处理类
* @namespace XTDataGrid
* @param {options} 选项
* @constructor
* @author <a href="http://code.google.com/p/json-rpc-for-java/@gmail.com">夏天</a>
* @version 1.0
*/
function XTDataGrid(options)
{
    var ext =   XTDataGrid.extend;
    if("undefined" === typeof window.XtZPS)window.XtZPS = new XtZPStream(window['contextPath'] || "", "/");
    
    ext(ext(this.opt = {}, this.getOpt()), options || {});
    this.id = "string" === typeof this.opt.container ? this.opt.container : "";
  ext(this, {
       Evt: new XTDataGrid.Evt(),
       extend: ext,
       clone: function(o)
       {
           var k = {};
           ext(k, o);
           return k
       },
       e:function()
    {   
       return "var _t = this, opt = _t.opt,header = _t.Evt.header, cell = _t.Evt.cell, checkbox = _t.Evt.checkbox, row = _t.Evt.row, tb = _t.Evt.tb,data = _t.data;"
    },
        init:function(){
           opt.selectType && opt.lockCol++;
           opt.showSN && opt.lockCol++;
           _t.extend(opt.pos,{cs:opt.lockCol, ce:opt.hdopt.length});
           // 注册render计算功能的实现
           this.regCalculate();
        },
        /*
        生成正文区域的html
        */
        render: function(a)
        {
            if(_t._rdFlg)return;_t._rdFlg = true;
            var oPos = _t.getRollPos(), 
                  i = Math.min(a.length, oPos ? oPos.s : opt.pos.s), 
                  n = Math.min(a.length, oPos ? oPos.e: (i + opt.pos.e)), 
                  rstLc = [],s,clk = "", b = [], lc = [], rSF = function(){return ''};
             
             // 行业务规则改变行外观
             if(opt.rowStyleExpression)
                rSF = XTDataGrid.evalExpFun.call(this,opt.rowStyleExpression);
            for(; i < n; i++)
            {
               if(!a[i])continue;
               _t.cvtArrayToMap(i);
                           
               rstLc = [];
               clk = [" onclick=\"XTDataGrid.onRowClick('",  _t.id, "',", i, ")\""].join("");
               s = rSF(a[i]);
               if(s)s = [' style="', s, '"'].join("");
               b.push('<div' + clk + s + ' class="tr ' + (0 === i % 2 ? 'r' : 't') + ' r' + i + (a[i][opt.highlightRow]? " highlightRow" : "") +'">' + (row.onRender.notification.apply(_t, [a[i], i, rstLc]) || "") + '</div>');
               lc.push('<div' + clk + s + ' class="tr ' + (0 === i % 2 ? 'r' : 't') + ' r' + i+ (a[i][opt.highlightRow]? " highlightRow" : "") + '">' + rstLc.join("") + '</div>');
             }
             if(!oPos) _t.xtBdLc.html(lc.join("")), _t.xtBdbdi.html(b.join(""));
             else
             {
                 // 删除前面，后面插入
                 if(oPos.bQ)
                 {
                     _t.xtBdLc.find("div.tr:lt(" + oPos.k + ")").remove();
                     _t.xtBdbdi.find("div.tr:lt(" + oPos.k + ")").remove();
                     _t.xtBdLc.append(lc.join("")), _t.xtBdbdi.append(b.join(""));
                 }
                 else
                 {
                     oPos.k = opt.pos.e - oPos.k - 1;
                     _t.xtBdLc.find("div.tr:gt(" + oPos.k + ")").remove();
                     _t.xtBdbdi.find("div.tr:gt(" + oPos.k + ")").remove();
                     _t.xtBdLc.prepend(lc.join("")), _t.xtBdbdi.prepend(b.join(""));
                 }
             }
             
             // 保留old，便于第二次渲染的时候，只渲染变化区域
             ext(opt.oldPos = {}, opt.pos);
             _t.opt.noRender = true;
             _t._rdFlg = false;
        },
        /*
        各区域宽度、高度的计算设置
        */
        fnResize: function()
        {
            var h = parseInt(opt.height - 4), i = opt.lockCol, n = 0, j = 0, m = opt.hdopt.length, dCnt, oPc = _t.xtTbDTGrd.parent();
            
            _t.xtTbDTGrd.width(oPc.width());
           // 组件宽度处理
           _t.xtTbDTGrd.width(_t.xtTbDTGrd.width());
           // 锁定列宽度和
           n += i;
           // 锁定区域的宽度，跳过不显示的列
           while(0 < i && m > j)
           {
               if(opt.hdopt[j].display)
               {
                   n += parseInt(opt.hdopt[j].width);
                   i--;
               }
               j++;
           }
           _t.xtBdLc.width(n);
           _t.xtFtLc.width(n);
           // 高度应该减去头、尾部区域
           h = h - _t.xtHd.height() - _t.xtFt.height() - _t.xtCtrl.height();
           _t.xtBd.height(h);
           h -= opt.scrollHW;
           _t.xtBdLc.height(h),  _t.xtBdbd.height(h), _t.xtBdSclRgt.height(h);
           
           // 修正xtBdbd的宽度 = xtBd - xtBdLc - scrollHW
           _t.xtBdbd.width(_t.xtBd.width() - opt.scrollHW - _t.xtBdLc.width() - 2);
           // 根据数据设置滚动条（xtBdSclRgt，xtBdSclBt）的宽度和高度
           _t.xtBdSclRgt_div.height(opt.zxSclH = parseInt((opt.dCnt = dCnt = _t.getDataCnt()) * opt.rH + opt.rH * 2));
           _t.xtBdSclRgt_div.height(opt.zxSclHs = _t.xtBdSclRgt_div.height());
           // opt.zxSclHs = (opt.zxSclHs / opt.zxSclH);
           _t.setJls(dCnt);
           
           /* 头区域高度设置
           setTimeout(function(){
               _t.xtHdw.find("." + opt.csl[10]).height(_t.xtHdw.height());
           },13);*/
        },
        /* 更新记录数 */
        setJls: function(n)
        {
            setTimeout(function(){
               _t.xtCtrl.find(".jsq").text("记录数: " + n);
             },13);
        },
        /*
        只能执行一次，组件属性绑定
        */
        myEvl: function()
        {
           // 行点击事件的注册
           if(opt.onRowClick)
           {
              opt.rowClickEvt = new XTDataGrid.Event();
              opt.rowClickEvt.attachEvent(opt.onRowClick);
              _t.xtBdLc.addClass('hdCur'); _t.xtBdbdi.addClass('hdCur');
           }
           setTimeout(function(){
               // 滚动事件绑定
               _t.xtBdSclRgt.scroll(function()
               {
                   return tb.onScroll.notification.apply(_t, [1]);
               });
                _t.xtBdSclBt.scroll(function()
               {
                   return tb.onScroll.notification.apply(_t, [0]);
               });
               _t.xtTbDTGrd.mousewheel(function(e, d){
                   var dir = d > 0 ?  -1 : 1,  vel = Math.abs(d) * dir * opt.rH;
                   _t.xtBdSclRgt.scrollTop(_t.xtBdSclRgt.scrollTop() + vel);
                   tb.onScroll.notification.apply(_t, [1]);
                   e.stopPropagation();
                   return false;
               }).keydown(function(e){// 键盘事件的翻页控制 .mouseover(function(){_t.xtTbDTGrd.focus();})
                   var n = e.keyCode,b = 0, bSgSlct = !opt.mHighlight && "undefined" != typeof _t.nLstHighlight;// 有高亮单选
                   switch(n)
                   {
                       case 13:{XTDataGrid.onRowClick(_t.id, _t.nLstHighlight);break;}
                       case 33:{b = 1;_t.xtBdSclRgt.scrollTop(_t.xtBdSclRgt.scrollTop() - opt.rH * opt.pos.e);break;}
                       case 34:{b = 1;_t.xtBdSclRgt.scrollTop(_t.xtBdSclRgt.scrollTop() + opt.rH * opt.pos.e);break;}
                       case 35:{b = 1;_t.xtBdSclRgt.scrollTop(opt.zxSclHs - opt.rH * opt.pos.e);break;}
                       case 36:{b = 1;_t.xtBdSclRgt.scrollTop(0);break;}
                       // 向上键盘
                       case 38:
                       {
                           if(bSgSlct)
                           {
                              if(0 < _t.nLstHighlight)
                                 _t.highlightRow.call(_t, _t.nLstHighlight--,false),
                                 _t.highlightRow.call(_t, _t.nLstHighlight,true);
                                 if(0 === _t.nLstHighlight)
                                 {
                                     _t.xtBdSclRgt.scrollTop(0);
                                 }
                                 else if(_t.nLstHighlight < opt.pos.s)
                                 return tb.onScroll.notification.apply(_t, [1, 0 < opt.pos.s ? opt.pos.s-1: opt.pos.s]);
                           }
                           else b = 1,
                           _t.xtBdSclRgt.scrollTop(_t.xtBdSclRgt.scrollTop() - opt.rH);
                           break;
                       }
                       // 向下键盘
                       case 40:
                       {
                           if(bSgSlct)
                           {
                               if(opt.dCnt > _t.nLstHighlight + 1)
                               {
                                 _t.highlightRow.call(_t, _t.nLstHighlight++,false);
                                 _t.highlightRow.call(_t, _t.nLstHighlight,true);
                                 if(_t.nLstHighlight > opt.pos.s + opt.pos.e - 1)
                                 return tb.onScroll.notification.apply(_t, [1, opt.pos.s+1]);
                               }
                           }
                           // 还需要加入自动翻页控制，只滚动一条
                           else
                           b = 1,
                           _t.xtBdSclRgt.scrollTop(_t.xtBdSclRgt.scrollTop() + opt.rH );
                           break;
                        }
                   }
                   b && tb.onScroll.notification.apply(_t, [1]);
               });
               
               // _t._parent = opt.container.parent();
               // _t._parent_w = _t._parent.width();
               $(window).resize(function()
               {
                    _t.fnResize();
               });
           },13);
           
           // 必须在getData前执行
           _t.getXTDataGrid(_t.id = opt.container.attr('id') || "Id" + new Date().getTime(),  _t);
           XTDataGrid.getXTDataGrid = _t.getXTDataGrid;
            _t.fnResize();
           // 每页最多显示的记录数
           opt.pos.e = Math.floor(_t.xtBdbd.height() / opt.rH);
           
           // 数据渲染
           _t.getColPos();
           if(0 < _t.opt.data.length)_t.renderArea();
           else _t.getData();
           // 实际行高度
           opt.rH = _t.xtBdLc.find("div.r:first").height() || opt.rH;
           // 初始化序列号位置
           this._CntIdNm = 0;
        },
        getXTDataGrid: XTDataGrid.getXTDataGrid,
        getId: function()
        {
            return XTDataGrid._nm + this.id + this._CntIdNm++;
        },
        // 绑定
        bind: function(o, fn)
        {
            return function()
            {
                return fn.apply(o, arguments);
            }
        },
        /*
        初始化时执行生成表格骨架代码，tb.onRender中使用
        */
        html: function(s)
        {
           var cnt = opt.container;
           (opt.container = ("string" === typeof cnt ? $("#" + cnt) : $(cnt))).append(s);
           cnt = opt.container;
           // 生成一些快捷访问对象，以便后期多次获取而造成性能问题
           $(_t.opt.csl).each(function(){
              _t[this] = cnt.find("div." + this);
           });
           _t["xtBdSclRgt_div"] = _t.xtBdSclRgt.find("div");
           _t["xtBdSclBt_div"] = _t.xtBdSclBt.find("div");
           _t.myEvl();
        }
     });
     
     eval(this.e());
     this.init();
     this.Evt.tb.onRender.notification.apply(this);     
}

 /*
 * @description 将n继承到o(copy n 到o)
 * @static
 * @returns o
 */
XTDataGrid.extend = function(o, n)
{
   for(var k in n)
       o[k] = n[k];
   return o
};
XTDataGrid.extend(XTDataGrid,{
log: function(e, fnName)
{alert(e)
    // e && alert(fnName + ":\n" + e.message);
},
evalExpFun: function(s)
{
    var fn = XTDataGrid.evalExpression[s] || (XTDataGrid.evalExpression[s] = 
    new Function("r", [ "var _rst_,_s = '';for(var k in r)_s += 'r[\"' + k + '\"]=' + k + ';',eval('var '+k+'=r.'+k+';');_rst_ = ",
       s,
       ";",
       "eval(_s);",
       "return _rst_;"].join("")));
     return fn
},
 /**
   * @description 表达式计算
   * @static
   * @param {Object} r  行数据
   * @param {String} s  表达式
   * @returns(String) 计算结果
*/
evalExpression: function(r, s, _this)
{
     return this.evalExpFun(s).call(_this,r)
},
getXTDataGrid: function(id,o)
{
   return o && (window[XTDataGrid._nm + id] = o) || window[XTDataGrid._nm + id];
}
});/**
* @fileOverview  全局选项
* @author <a href="http://code.google.com/p/json-rpc-for-java/@gmail.com">夏天</a>
* @version 1.0
*/
XTDataGrid.prototype.getOpt = function(){return {
lockCol: 0,                 // 锁定列数
csl: ["xtTbDTGrd", "xtHd", "xtBd", "xtBdLc"/* 3 */, 
       "xtBdbd", "xtBdSclRgt", "xtBdSclBt", "xtFt"/* 7 */, "xtCtrl", "xtHdw", "xtHdCell"/* 10 */, "xtCell", "xtBdbdi", "xtFtLc", "xtFtBd"],  // css定义
zxSclH:0,                   // 纵向高度
data:[],                       // 数据
SnName: "_SN_",        // 序列列字段名称
slctTpName: "_selectType_",            // 选择列字段名
highlightRow: "_highlightRow_",      // 高亮状态列字段名
mHighlight: false,        // 允许多选
scrollHW:  18,            // 滚动条宽高
pageSize:  0,             // 需要给予数据库分页时指定
selectCnt:0,               // checkbox选择记录数 selectCnt
selectName: "selected", // 和xface一直
container: document.body, // 容器对象的id或者对象
hdopt:[],                  // 头列信息选项 
pos: {s: 0},               // 显示数据的开始行数
showHeader:true,   // 显示header
showSN: false,        // 显示序列号列
SNw: "70px",           // 序列号列宽度
showCtrlBar: true, // 显示控制区域：分页、导出按钮区域
showEvlBar: false,  // 显示合计区域
rH: 22,                   // 计算显示行高度的滚动条，越大越好
dataRowHeight: '1.4em', // 数据区域行高度
headerRowHeight: '1.7em', // 数据区域行高度

checkMethod: null,// 选择：选择前回调,只填写函数名，入参为：组件id，行号，返回true则允许操作，否则不允许操作
selectType: null,    // 选择类型：checkbox、radio
checkExpression: null,// 选择状态控制的表达式,例如："9000 < ((aac001 + ok) / 3.79).toFixed(2)"
// 选择状态控制的方法,参数：行数据，行号 ，返回的串将作为html组合到checkbox代码里，例如控制checkbox的disabled,readonly
checkExpressionFun: null,
checkDisplayExpression: null,// checkbox可见控制的表达式, 表达式为fasle则隐藏, 例如："1120 ===aac001?false:true"

backgroundColor: 'transparent', // 背景颜色  
rowStyleExpression: null,// row Style表达式
onRowClick: null,             // 行点击事件，入参是行数据
width: "100%",                       // 宽度px ,默认为100%
height: 600                           //  高度px
}
};


/**
* @fileOverview  列选项
* @author <a href="http://code.google.com/p/json-rpc-for-java/@gmail.com">夏天</a>
* @version 1.0
*/
XTDataGrid.prototype.cellOpt = {
resize: true,             // 允许调整快读
sort: true,                 // 允许排序 
sortDesc: false,        // 降序
desc: null,                // 列描述
image:null,              // 图片列
name: null,               // 获取数据的字段名  
width: '100px',         // 宽度，px
display: true,            // 显示
onCellClick: null,      // 列单元格点击，头部不参与点击
onCellDblClick: null,      // 列单元格双击击，头部不参与点击
cellValueExpression: null,// cell value 表达式
cellRenderFunc: null,       // value 渲染，支持html，参数：行数据，当前字段文本,列头信息,行号，列号
cellStyleExpression:  null// cell style 表达式
};/**
* @fileOverview  事件处理类
* @namespace XTDataGrid.Event
* @constructor
* @author <a href="http://code.google.com/p/json-rpc-for-java/@gmail.com">夏天</a>
* @version 1.0
*/
XTDataGrid.extend(XTDataGrid, {
_nm: "XTDataGrid",
Event:function(bFst)
{
   var a = [],i;
   
   /*
   * @description 注册事件函数
   * @public
   * @param {function} fnCbk  回调函数
   * @returns XTDataGrid.Event
   */
   function attachEvent(fnCbk)
   {
      bFst ? a.splice(0,0,fnCbk): a.push(fnCbk);
      return this;
   } 
   
   /*
   * @description 执行注册事件，如果中间有返回false的则终止后的事件执行
   * @public
   * @returns {boolean}
   */
   function notification()
   {
      var rst;
      for(i = 0; i < a.length; i++)
      {
          try{
          if(!(rst = a[i].apply(this, arguments)))break;
          }catch(e){XTDataGrid.log(e, "notification" + a[i])}
      }
      if(i === a.length)return rst;
      return i === a.length
   }
   /*
   * @description 注销事件函数
   * @public
   * @param {function} fnCbk  回调函数
   * @returns XTDataGrid.Event
   */
   function detachEvent(fnCbk)
   {
      for(i = a.length; 0 <= --i; )
      {
          if(fnCbk === a[i])a.splice(i, 1);
      }
      return this;
   }
   return {"attachEvent":attachEvent, "detachEvent": detachEvent, "notification":notification, size:function(){return a.length}}
}});

/**
* @fileOverview  自定义事件
* @namespace XTDataGrid.Evt
* @constructor
* @author <a href="http://code.google.com/p/json-rpc-for-java/@gmail.com">夏天</a>
* @version 1.0
*/
XTDataGrid.extend(XTDataGrid, {Evt:function(){
  var e = XTDataGrid.Event;
  return {
  header:{
      // 将该事件返回的html显示出来，如果开发者注册了新的，则需要返回false，系统才不会执行后续的渲染
    "onRender": new e(true),
    // 头列点击
    "onHeaderCellClick": new e(),
    // 列宽度改变后执行
    "onHeaderCellResize":  new e(),
    // 列从显示状态隐藏后执行
    "onHeaderCellHide":  new e(),
    // 列从隐藏状态显示后执行
    "onHeaderCellShow":  new e()
  },
  cell:{
    // 将该事件返回的html显示出来，如果开发者注册了新的，则需要返回false，系统才不会执行后续的渲染
    "onRender": new e(true),
    
    // 编辑前, 返回false就不允许编辑
    "onBeforeEdit": new e(),
    // 单元格数据改变，用来做列动态计算，与其他html DOM对象关联
    "onCellChange": new e(),
        // 鼠标移动在单元格上触发
        "onMouseOver": new e(),
    // 外观改变
    "onCellStyleChange": new e(),
    // 行数据变化是，自动触发单元格计算，并计算求和等功能的变化
    "onCalculate": new e()
  },
  checkbox:{
       // 将该事件返回的html显示出来，如果开发者注册了新的，则需要返回false，系统才不会执行后续的渲染
    "onRender": new e(true),
    // 点击前, 返回false就不允许选择
    "onBeforeClick": new e(), 
    // 选择后执行
    "onClick": new e()
  },
  row:{
      // 将该事件返回的html显示出来，如果开发者注册了新的，则需要返回false，系统才不会执行后续的渲染
    "onRender": new e(true),
    // 点击前, 返回false就不允许点击
    "onBeforeClick": new e(), 
    // 点击
    "onClick": new e(),
    // 外观改变
    "onRowStyleChange": new e()
  },
  tb:{
      // 将该事件返回的html显示出来，如果开发者注册了新的，则需要返回false，系统才不会执行后续的渲染
    "onRender": new e(true),
        // 将该事件返回的html显示出来，如果开发者注册了新的，则需要返回false，系统才不会执行后续的渲染
        "onBodyRender": new e(true),
        "onBodyLcRender": new e(true),
        "onBodybdRender": new e(true),
        "onFtRender": new e(true),
        "onCtrlRender": new e(true),
    // 宽高发生变化
    "onResize": new e(),
    
        // body滚动条发生变化
         "onScroll": new e(),
    // 日志消息
    "onLog": new e()
  }
  }
}});


XTDataGrid.extend(XTDataGrid,{
/*
  全选按钮，全选不会对规则表达式产生的结果进行影响
*/
onClickCheckAll: function(id, oHtml)
{
    var o = XTDataGrid.getXTDataGrid(id), a = o.opt.data, j, i = a.length,fn;
    // 选择与按钮状态关联selectCnt
    if(o._selectAll = oHtml.checked)o.opt.selectCnt = a.length;
    else o.opt.selectCnt = 0;
    if(fn = window[id + "_ckmtd"])fn(o.opt.selectCnt);
    
    // 对当前页进行处理
    for(j = o.opt.pos.s, i = j + o.opt.pos.e; i < j; j++)
    {
        if(oHtml.checked)a[j][o.opt.selectName] = oHtml.checked;
        else  delete a[j][o.opt.selectName];
    }
    
    // 最后一次选择的位置
    o.opt.oldPos = null;
    o.renderArea();
    return true;
},
onClickCheck: function(id, i, oHtml)
{
    var o = XTDataGrid.getXTDataGrid(id), fn = o.opt.checkMethod, bCk;
    delete o._selectAll; 
    if(fn)
    {
        // 设置行选择状态
        return o.getRowData(i)[o.opt.selectName] = fn.call(o, id, i, oHtml);
    }
    bCk = o.opt.checkExpression && XTDataGrid.evalExpression(o.getRowData(i), o.opt.checkExpression,o) || false;
    // 设置行选择状态
    o.getRowData(i)[o.opt.selectName] = bCk || oHtml.checked;
    // 选择与按钮状态关联
    if(oHtml.checked)o.opt.selectCnt++;
    else o.opt.selectCnt--;
    if(fn = window[id + "_ckmtd"])fn(o.opt.selectCnt);
    
    if(bCk)return false;
    return true;
},
   /**
   * @description 单元格点击
   * @public
   * @param {String} id  容器、组件的id
   * @param {Number} n  行号
   * @param {String} name  列字段名
   * @param {Number} i  列顺序号
   * @returns 
*/
onCellClick: function(id,n, name, i){
    var _k = XTDataGrid.getXTDataGrid(id);
    return _k.opt.hdopt[i].onCellClickEvt.notification.apply(_k, [_k.opt.data[n], id,n, name]);    
},
 /**
   * @description 行点击
   * @public
   * @param {String} id  容器、组件的id
   * @param {Number} n  行号
   * @returns 
*/
onRowClick: function(id,n, bNoClk){
    var _k = XTDataGrid.getXTDataGrid(id), k = "highlightRow", s;
    // 非多选，去除最后一次选择的状态
    if(!_k.opt.mHighlight)
    {
       if("undefined" != typeof _k.nLstHighlight)_k.highlightRow.call(_k, _k.nLstHighlight,false);
       _k.nLstHighlight = n;
    }
    // 设置高亮状态
    _k.toggleHighlightRow.call(_k, n);
    // 开发人员设置的事件回调
    if(!bNoClk && _k.opt.rowClickEvt)return _k.opt.rowClickEvt.notification.apply(_k, [_k.opt.data[n],id,  n]);
    return true;    
}
}); /**
* @fileOverview  计算处理：
* 1、实时求和、平均、最大、最小计算
* 2、列数据关系、行数据关系计算
* 3、行、列外观依据数据业务逻辑计算
* 4、数据改变通知
* @author <a href="http://code.google.com/p/json-rpc-for-java/@gmail.com">夏天</a>
* @version 1.0
*/
XTDataGrid.extend(XTDataGrid.prototype,{
/*码表转换*/
acMap: function(a)
{
        var i,j , o = {};
        if(a)for(i = 0, j = a.length; i < j; i++)o[a[i][0]] = a[i][1];
        return o;
},
setHighlight:function(n)
{
   XTDataGrid.onRowClick(this.id, n, true);
},
setFilterExpression: function(s)
{
   var fnFilterExpression = XTDataGrid.evalExpFun.call(this, s || "1"), a = [], b = this.opt.oldData || this.opt.data, i, j;
   this.opt.oldData = b;
   if(!s){this.opt.data = b;this.opt.oldData = null;}
   else
   {
     for(i = 0, j  = b.length; i < j; i++)
     {
        // 过滤表达式
         try{if(b[i] && fnFilterExpression(b[i]))a.push(b[i]);}catch(e){} 
     }
     this.opt.data = a;
   }
   this.setJls(this.opt.data.length);
   delete this.nLstHighlight;
   this.opt.oldPos = null;
   this.xtBdSclRgt.scrollTop(this.opt.pos.s = 0);
   this.renderArea();
},
/*
  计算数据正文区显示的开始列和结束列，优化作用，只渲染可见区域
*/
getColPos: function()
{
    eval(this.e());
    var a = opt.hdopt, nW = _t.xtBdbdi.width(), nPs = _t.xtBdSclBt.scrollLeft(), 
          nCe = a.length, nCw = 0, i = opt.lockCol, pos = opt.pos, j = a.length, x = 1, bFlg = true;
    // 列结束位置
    _t.extend(pos, {ce:nCe});
    // 可显示列宽度和 不能大于nCw ---不大于可见区域的正文部分的宽度
    for(; i < j; i++)
    {
        if(a[i].display)// 只计算可见的列
        {
           nCw = parseInt(a[i].width);
           if(nPs > nCw)// 滚动条位置大于当前列，就继续
           {
               nPs -= nCw;
               if(nPs < nCw && 0 < nPs)x++;
           }
           else if(nW > nCw)
           {
               pos.ce = i, nW -= nCw;
               if(nW < nCw)x++;
           }
           else if(0 < nW)
           {
               x++;
               break;
           }
        }
    }
    pos.ce += x;
    _t.opt.pos = pos;
    return pos;
},
/*
   计算显示变化区域，计算目的：排除不变化的、不需要渲染的行，
   便于渲染时，只渲染变化区域
*/
getRollPos: function()
{
    eval(this.e());
    if(!opt.oldPos)return 0;
    // bQ true表示需要删除前面的
    var pos = opt.pos, oldPos = opt.oldPos, n = pos.s - oldPos.s, bQ = 0 < n;
    if(pos.e < Math.abs(n))return 0;
    // 变的部分
    return { bQ: bQ,  
                 s: (bQ ? (oldPos.s + pos.e): pos.s), 
                 e: (bQ ? (pos.s + pos.e): oldPos.s), k: Math.abs(n)}
},
/* 高亮指定行 */
highlightRow: function(n,b)
{
    var _k = this, s, k = "highlightRow";
    if(b)_k.xtBdLc.find("div.r" + n).addClass(k), _k.xtBdbdi.find("div.r" + n).addClass(k);
    else _k.xtBdLc.find("div.r" + n).removeClass(k),_k.xtBdbdi.find("div.r" + n).removeClass(k);
    if(s = _k.getRowData(n))
    s[_k.opt.highlightRow] = b || null;
},
/* 高亮指定行 */
toggleHighlightRow: function(n)
{
    var _k = this, s, k = "highlightRow";
     s = _k.xtBdLc.find("div.r" + n).toggleClass(k).attr("class");
    _k.xtBdbdi.find("div.r" + n).toggleClass(k);
    if(s)_k.getRowData(n)[_k.opt.highlightRow] = -1 < s.indexOf(k);
}
}); /**
* @fileOverview  数据模型
数据状态：1 checkbox选择， 2 高亮选择  4  有改变编辑  8 新增加  16 删除
* @author <a href="http://code.google.com/p/json-rpc-for-java/">夏天</a>
* @version 1.0
*/
XTDataGrid.extend(XTDataGrid.prototype,{
/*
   重新查询时执行
*/
clearData: function()
{
     var _t = this;
     _t.opt.hdColInfoA = null;
     _t.opt.data = [];
     _t.opt.noRender = false;
     _t.opt.pos.s = 0;
     _t.opt.oldPos = null;
     _t.opt.oldData = null;
},
/*使用的时候，转换一行数据*/
cvtArrayToMap: function(p)
{
    var _t = this, a = _t.opt.hdColInfoA, j = _t.opt.data.length, o, x;
    if(0 == j)return;
    // 还没有构造头信息
    if(!a)a = _t.opt.hdColInfoA = _t.opt.data.shift();
    
    j = _t.opt.data[p];
    if(j.length)
    {
       o = {};
       for(x = a.length; 0 <= --x; )
          o[a[x]] = j[x];
       _t.opt.data[p] = o;
    }
    return _t.opt.data[p];
},
/* 异步模式获取数据*/
getData: function(custOpt){
    var scCls = "com.rmUzWqQrYQmyYvFT1de0faT7JWvJJ3Ja.ReadQueryGzipData.readDataForGzip",_t = this, ctx = window['contextPath'] || "", nMax = custOpt && custOpt.nMax || 50000, nMx = nMax + 1, cbk = function(o)
    { 
        // 停止指令发出则停止
        if(_t.opt.stopQueryFlag || nMax <= _t.opt.data.length)return _t.opt.stopQueryFlag = false;
       
        if(o && o.data && o.data.length)
        {
            if(0 == _t.opt.data.length)_t.opt.data = o.data;
            else
            { 
                if(_t.opt.hdColInfoA)o.data.shift();
                 try{Array.prototype.push.apply(_t.opt.data, o.data); }catch(e){alert("Array.prototype.push.apply:: " + e.message)}
            }
            if(!_t.opt.noRender)_t.render(_t.opt.data);
        }
        if(0 < _t.opt.data.length && (o && o.data && _t.opt.pos.e <= o.data.length) && nMax > _t.opt.data.length)
        {
           nMx -= (o && o.data && o.data.length || 0);
            XtZPS.readStm(
            {
               parameters: custOpt.parameters, 
               hdColInfoA: _t.opt.hdColInfoA || null,
               sqlId: custOpt.sqlId, 
               nS: _t.opt.data.length,
               nE:  Math.min(nMx, custOpt.nE || 888),
               xtStreamCbk: scCls 
            }, cbk,  ctx);
        }
         _t.fnResize();
    };
    if(custOpt && custOpt.sqlId )_t.opt.custOpt = custOpt; // 分页时使用
    
    if(0 === _t.opt.data.length && custOpt && custOpt.parameters)this.clearData(),
    XtZPS.readStm(
    { 
       parameters: custOpt.parameters, /* xtStreamCbkRow  xtStreamCbk*/ 
       nS:custOpt.nS || 0,
       sqlId: custOpt.sqlId, 
       nE: Math.min(_t.opt.pos.e || 50,  custOpt && custOpt.nMax || _t.opt.pos.e),
       xtStreamCbk: scCls
    }, cbk,  ctx);
    return this.opt.data;
},
/*
* 获取当前需要显示的数据
*/
renderArea: function(){
    this.render(this.getData());
},
getRowData: function(i){
    eval(this.e());
    return opt.data[i];
},
getDataCnt: function(){
    if(!this.opt.hdColInfoA)this.opt.hdColInfoA = this.opt.data.shift();
    return this.opt.data.length;
}
}); 
XTDataGrid.extend(XTDataGrid,{
/* 翻页使用 */
fnPage: function(id, bQh, bGo,nP)
{
    var o = XTDataGrid.getXTDataGrid(id), opt = o.opt, n = 0, oCurIpt, nCurPg = 0, pgSz;
    pgSz = o.xtCtrl.find("input[name=" + id + "_pgsz]");
    opt.pageSize = parseInt(pgSz.attr("value") || "0");
    if(0 == opt.pageSize || !opt.custOpt)return;
    oCurIpt = o.xtCtrl.find("input[name=" + id + "_curPg]");
    nCurPg = nP || parseInt(oCurIpt.attr('value') || "0") || 0;
    if(bGo)n = (nCurPg - 1) * opt.pageSize;// 页面跳转
    else n = bQh ? (nCurPg++ * opt.pageSize ) :  ((--nCurPg - 1) * opt.pageSize);// 上下翻页
    if(1 > nCurPg)nCurPg = 1;
    if(0 > n)n = 0;
    
     XTDataGrid.queryData({
       id: id, 
       sqlId:  opt.custOpt.sqlId, 
       pm:     opt.custOpt.parameters,
       nS: n,
       nMax: opt.pageSize,
       nE: Math.min(opt.pageSize, 888)
   });
   oCurIpt.attr('value', nCurPg);
},
/* 查询数据 */
queryData: function(opt)
{
  $(document).ready(function(){setTimeout(function(){
       var o = XTDataGrid.getXTDataGrid(opt.id);
       o.opt.data = [];
       o.opt.stopQueryFlag = false;
       o.opt.hdColInfoA = null;
       o.getData({nS: opt.nS, nE:opt.nE, nMax:opt.nMax, sqlId:opt.sqlId, parameters: opt.pm});
       }, 133);
   });
},/* 停止当前的查询 */
stopQuery: function(id)
{
   XTDataGrid.getXTDataGrid(id).opt.stopQueryFlag = true;
}
});/**
* @fileOverview  计算处理：
* 1、实时求和、平均、最大、最小计算
* 2、列数据关系、行数据关系计算
* 3、行、列外观依据数据业务逻辑计算
* 4、数据改变通知
* 5、计算可见区域，计算需要显示的数据的开始列、开始行、结束列、结束行
* @author <a href="http://code.google.com/p/json-rpc-for-java/@gmail.com">夏天</a>
* @version 1.0
*/
XTDataGrid.extend(XTDataGrid.prototype,{
regCalculate: function(){
    eval(this.e());
    header.onRender.attachEvent(function(){
        var a = opt.hdopt, k = [], i, j, o, lc = opt.lockCol, x, aRst = [];
        // checkbox
        if(opt.selectType)a.splice(0,0,{desc:"<input title=全选操作 name=" + this.id+ "_CheckAll onclick=\"return XTDataGrid.onClickCheckAll('" + this.id + "',this)\" type=checkbox>", width:'40px', sort:0, resize:0, name:opt.slctTpName});
        // 序列号
        if(opt.showSN)a.splice(0,0,{desc:'SN', width:opt.SNw, sort:0, resize:0, name: opt.SnName});
        j = a.length;
        opt.bdiW = 0;

        for(i = 0; i < j; i++)
        {
            a[i] = o = _t.extend(_t.clone(_t.cellOpt), a[i]); 
            if(!o.display)continue;
            if(o.collection)o.acMap = _t.acMap(o.codeTable);
            
            if(o.onCellClick || o.onCellDblClick)
            {
                if(!a[i]['onCellClickEvt'])a[i].onCellClickEvt = new XTDataGrid.Event();
                a[i].onCellClickEvt.attachEvent(o.onCellClick || o.onCellDblClick);
            }
            x = [];
            x.push('<div class="lcHd ' + opt.csl[10] + '" style="width:' + o.width  + '"><div class=txt>');
            x.push(o.desc || "");
            x.push("</div>");
            // 排序
            if(o.sort) x.push('<div class=sortIndicator/>');
            if(o.resize) x.push('<div class=resizableHandle/>');
            x.push("</div>");
            // 处理锁定头信息
            if(0 < lc--)aRst.push(x.join(""));
            else k.push(x.join("")), opt.bdiW +=  parseInt(o.width);
        }
        opt.hdopt = a;
        return opt.showHeader && ["<div class=", opt.csl[9],">", aRst.join(""), "<div class=", opt.csl[1] ,">",
             // 锁定区域处理: selectType, 锁定列
             
             // 列处理
             k.join(""),   
             "</div></div>"].join("")
    });
    /* 单元格
    * @param {Object} r  行数据
    * @param {String} t   当前单元格数据
    * @param {Object} cellOpt   列头信息
    * @param {Number}i  行号
    * @param {Number} nC   列号
    * @returns {String}
    */
    cell.onRender.attachEvent(function(r, t, cellOpt, i, nC){
         var a = [], s = "", clk = "";
         // 行业务规则改变行外观
         if(cellOpt.cellStyleExpression)
            s = XTDataGrid.evalExpression(r, cellOpt.cellStyleExpression,this);
         clk = cellOpt.onCellClick ? "onclick" : (cellOpt.onCellDblClick ? "ondblclick" : "");
         if(clk)clk = [" " + clk + "=\"XTDataGrid.onCellClick('",  _t.id, "',", i, ",'", cellOpt.name, "',", nC ,")\""].join("");
         // cl + 列号，用于通过css 控制列隐藏
         a.push('<div rc="' + i + ',' + nC + '" ' + clk + ' class="cl' + nC+ (clk ? " hdCur" : '') + " " + opt.csl[11]  + '" style="width:' + cellOpt.width + ";" + s +'">');
         if(cellOpt.cellValueExpression)
             t = XTDataGrid.evalExpression(r, cellOpt.cellValueExpression,this);
         
         if(cellOpt.name)r[cellOpt.name] = t;
         if(cellOpt.cellRenderFunc)t = cellOpt.cellRenderFunc.call(this, r, t, cellOpt, i, nC);
         
         if(cellOpt.image)a.push("<center><img src=" + g_sysInfo[2] + "grid/" + cellOpt.image + "></center>"); 
         else a.push(cellOpt.acMap && cellOpt.acMap[t] || t);
         a.push("</div>");
         return a.join("");
    });
    // checkbox
    checkbox.onRender.attachEvent(function(r, i, slcHd){
         var a = [],s = "", szCk = "", bHd = opt.checkDisplayExpression ?  XTDataGrid.evalExpression(r, opt.checkDisplayExpression) : true;
         if(opt.selectType && bHd)
         {
            if(_t._selectAll)r[opt.selectName] = _t._selectAll;
            else if(undefined != _t._selectAll)delete r[opt.selectName];
             // 点击事件处理
             s = [" onclick=\"return XTDataGrid.onClickCheck('" + this.id + "', " ,i, ', this)"'].join("");
             // 表达式计算
             szCk = opt.checkExpression && XTDataGrid.evalExpression(r, opt.checkExpression,this) ? " checked" : "";
             // 全选
             if(!szCk && (_t._selectAll || r[opt.selectName]))szCk = " checked";
             // 数据回写
             r[opt.selectName] = !!szCk;
             
             a = ["<input",s,
                  szCk,
                 " type=",
                opt.selectType,
                opt.checkExpressionFun ? opt.checkExpressionFun.call(this,r, i) : "",
                " name=",
                _t.id,
                i ,
                ">"];
         }
         return a.join("");
    });
    // 行渲染
    row.onRender.attachEvent(function(r, i, rstLc){
         var hdopt = opt.hdopt, y= opt.lockCol, j = hdopt.length, x = 0, a = [], lc = [], vl, t, u = i + 1;
         if(0 < y)
         // 锁定列处理, 跳过不显示的列
         for(x = 0; j > x; x++)
         {
             t = hdopt[x];
             if(t.display)
             {
                 // 序号
                 if(t.name === opt.SnName)vl = u;
                 // checkbox
                 else if(t.name === opt.slctTpName)
                     vl = checkbox.onRender.notification.apply(_t, [r, i, t]) || "";
                 else vl = r[t.name || ''] || '';
                 // 数据正文区域
                 lc.push(cell.onRender.notification.apply(_t, [r, 
                 vl, 
                 t, i, x]) || "");
                 if(0 >= --y){x++;break;}
             }
         }
         rstLc.push(lc.join(""));
         for(j = Math.min(j,opt.pos.ce); x < j; x++)
         {
             t = hdopt[x];
             if(t.display)
             // 数据正文区域
              a.push(cell.onRender.notification.apply(_t, [r, r[t.name || ''] || '', t,i, x]) || "");
         }
         return a.join("");
    });
    // 合计区域
    tb.onFtRender.attachEvent(function(){
         return opt.showEvlBar && ["<div class=" + opt.csl[14] +">",
             opt.lockCol ? "<div class=" + opt.csl[13] +">锁定区域</div>" : "",
             "<div class=", opt.csl[7] ,">",
             "合计区域",       
             "</div></div>"].join("")
    });
    // 控制区域
    tb.onCtrlRender.attachEvent(function(){
         return opt.showCtrlBar && ["<div class=", opt.csl[8] ,">",
              // 分页控制区域       
             0 < opt.pageSize ? [,
             "<div title=首页 onclick=\"XTDataGrid.fnPage('",_t.id,,"',false,1,1)\" class=\"page_first\"/>",
             "<div title=上一页 onclick=\"XTDataGrid.fnPage('",_t.id,,"',false)\" class=\"prevIco\"/>",
             "<div title=下一页 onclick=\"XTDataGrid.fnPage('",_t.id,,"',true)\" class=\"nextIco\"/>" ,
             "<div class=gotoI title=\"当前页、跳转到的页\"><input onchange=\"XTDataGrid.fnPage('",_t.id,"',true,1)\" value=1 name=\"", _t.id,"_curPg\"></div>",
             "<div title=跳转到指定页 onclick=\"XTDataGrid.fnPage('",_t.id,"',true,1)\" class=\"gotoIco\"/>" ,
             "<div class=pgSzI title=每页显示记录数><input onchange=\"XTDataGrid.fnPage('",_t.id,"',true,1)\" value=", opt.pageSize, " name=\"", _t.id,"_pgsz\"></div>"
             ].join(""): "", 
             "<span class=jsq></span>",
             "<div title=停止数据加载 onclick=\"XTDataGrid.stopQuery('",_t.id,"')\" class=\"stop\"/>",
             "</div>"].join("")
    });
    // 左边锁定区域
     tb.onBodyLcRender.attachEvent(function(){
         return opt.lockCol && ["<div class=", opt.csl[3] ," style='background-color:" + opt.backgroundColor + ";'>",
             "</div>"].join("")
    });
    // 正文数据区 + 右边滚动条 + 下边滚动区域
     tb.onBodybdRender.attachEvent(function(){
         return ["<div class=", opt.csl[4] ,"><div class=", opt.csl[12] ,">",
             "</div></div>",
             // 右边滚动条
             '<div class=', opt.csl[5] ,' style="width: ', opt.scrollHW, 'px"><div></div></div>',
             // 下边滚动条
             '<div class=', opt.csl[6] ,' style="height: ', opt.scrollHW, 'px"><div></div></div>'
             ].join("")
    });
    // 表格正文体处理: 左边锁定区域 + 正文数据区 + 右边滚动条 + 下边滚动区域
    tb.onBodyRender.attachEvent(function(){
         return ['<div class=', opt.csl[2] ,' style="width: 100%; ">',
             tb.onBodyLcRender.notification.apply(this, arguments) || "",       
             tb.onBodybdRender.notification.apply(this, arguments) || "",
             "</div>"].join("")
    });
    // 表格渲染
    tb.onRender.attachEvent(function(){
           var s;
         this.html(s = [this.style(),'<div class=', opt.csl[0] ,' style="background-color:',  opt.backgroundColor,';width: ',
             opt.width,
             ';">',
             header.onRender.notification.apply(this, arguments) || "",
             tb.onBodyRender.notification.apply(this, arguments),
             tb.onFtRender.notification.apply(this, arguments) || "",
             tb.onCtrlRender.notification.apply(this, arguments) || "",
             "</div>"].join("")
          );
          return s;
    });
    
    // 数据滚动条处理
    tb.onScroll.attachEvent(function(b, nS){
         if(_t.scrollFlg)
         {
            if(33 > new Date().getTime() - _t.scrollTm)return false;
         }
         _t.scrollFlg = true;
         _t.scrollTm = new Date().getTime();
         var o, cnt = _t.opt.container;
         if(b)// 上下翻动
         {
              var n = nS;
              if(!n)
              {
                 n = Math.floor(_t.xtBdSclRgt.scrollTop() / opt.zxSclHs * opt.zxSclH / (opt.rH - 2));
                 if(n > opt.dCnt)n = opt.dCnt - opt.pos.e + 1;
              } 
              
              if(n != opt.pos.s)
              {
                  opt.pos.s = n;
                  _t.xtBdSclBt.scrollLeft(0);
                  setTimeout(function(){
                     _t.renderArea();
                     _t.scrollFlg = false;
                  },13);
              }
         }
         else
         {
             setTimeout(function(){
                 o = -_t.xtBdSclBt.scrollLeft()+ 'px';
                 _t.xtHd.css({"margin-left": o});
                 _t.xtFt.css({"margin-left": o});
                 // 数据的横向滚动
                 _t.xtBdbdi.css({"margin-left": o});
                 opt.oldPos = null;
                 _t.getColPos();
                 _t.renderArea();
                 _t.scrollFlg = false;
             },13);
         }
         return true;
    });
}
}); 

XTDataGrid.extend(XTDataGrid.prototype,{
/*
* css定义
*/
style: function(){
    eval(this.e());
    return ["<style>.xtHdw .xtHdCell{height:", opt.headerRowHeight,";line-height:", opt.headerRowHeight,";}.xtFt, .xtFtLc, .r, .t{height:", opt.dataRowHeight,";line-height:", opt.dataRowHeight,";}</style>"].join("");
}
}); /* Copyright (c) 2009 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 *
 * Version: 3.0.2
 * 
 * Requires: 1.2.2+
 */
(function(c){var a=["DOMMouseScroll","mousewheel"];c.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var d=a.length;d;){this.addEventListener(a[--d],b,false)}}else{this.onmousewheel=b}},teardown:function(){if(this.removeEventListener){for(var d=a.length;d;){this.removeEventListener(a[--d],b,false)}}else{this.onmousewheel=null}}};c.fn.extend({mousewheel:function(d){return d?this.bind("mousewheel",d):this.trigger("mousewheel")},unmousewheel:function(d){return this.unbind("mousewheel",d)}});function b(f){var d=[].slice.call(arguments,1),g=0,e=true;f=c.event.fix(f||window.event);f.type="mousewheel";if(f.wheelDelta){g=f.wheelDelta/120}if(f.detail){g=-f.detail/3}d.unshift(f,g);return c.event.handle.apply(this,d)}})(jQuery);function XtZPStream(contextPath, swfPath)
{
    swfPath || (swfPath = ""), contextPath || (contextPath = "");
    document.getElementsByTagName("body")[0].id = "rmUzWqQrYQmyYvFT1de0faT7JWvJJ3Ja";
    document.write("<object style=\"position:absolute;z-index:99;left:0;top:0;width:1px;height:1px\" classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0\" id=myZPStreamXt width=215 height=138 align=middle><param name=allowScriptAccess value=sameDomain><param name=movie value="+swfPath
    +"XtZPStream.swf><param name=menu value=false><param name=quality value=high><embed style=\"position:absolute;z-index:99;left:0;top:0;width:1px;height:1px\" src="+
    swfPath+"XtZPStream.swf menu=false quality=high width=215 height=138 swLiveConnect=true id=myZPStreamXt name=myZPStreamXt align=middle allowScriptAccess=sameDomain type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer_cn\"></embed></object>");
    /*
        1、必须用这种方式(解决非ie下错误：NPMethod called on non-NPObject wrapped JSObject)，否则IE之外的其他浏览器不可用
        2、IE下个月直接用XtZPStream
    */
    var XtZPS = (-1 != navigator.appName.indexOf('Microsoft') ? window[ "myZPStreamXt"] || document.getElementById( "myZPStreamXt"): document[ "myZPStreamXt"]) || (function()
    {
        var k, id = "myZPStreamXt",o = {},
              mySwf = (-1 != navigator.appName.indexOf('Microsoft') ? window[id] || document.getElementById(id): document[id]);
        for(k in mySwf)
        {
           if("function" == typeof mySwf[k])o[k] = mySwf[k];
        } 
        return o;
    })();
    // 唯一id的生成
    XtZPS.nextId=function()
      {
          window.xtstrmId || (window.xtstrmId = 0);
          return "cbk" + (window.xtstrmId = xtstrmId++);
      };
    // 获取远程java类对应的rpc javascript对象，包含指定类的属性、方法
    XtZPS.getRpcObj = function(s, myCbk)
    {
        XtZPS.setLogCbk(null, false);
          var n = s.lastIndexOf("."), szClsNm = -1 < n ? s.substr(n + 1) : s, szId = XtZPS.nextId();
            window[szId] = function(r)
          {
             window[szId] = null;
             var oRst,a, i;
             eval("oRst = " + r + ";");
             if(oRst && (a = oRst.methods))
             {
                 oRst.methods = null;
                 for(i = 0; i < a.length; i++)
                 {
                    (function(s6){
                      // 每个函数的方法定义
                      oRst[s6] = function(oData, fnCbk1)
                      {
                          var szTmp = XtZPS.nextId();
                          window[szTmp] = function(or)
                          {
                              window[szTmp] = null;
                              (fnCbk1 || function(or){})(or);
                          };
                          oData || (oData = {});
                          oData.xtStreamCbk = [s, s6].join(".");
                          XtZPS.readStream(oData, szTmp, contextPath);
                      };
                    })(a[i]);
                 }
             }
             window[szClsNm] = oRst;
             myCbk && myCbk.apply(oRst, [oRst]);
          };
          XtZPS.readStream({getRpcObj: s}, szId, contextPath);
      };
      XtZPS.readStm = function(o, fnCbk, ctx)
      {
            var szTmp = XtZPS.nextId();
          window[szTmp] = function(or)
          {
               // window[szTmp] = null;// 如果比注释，第二行就不调用了
               (fnCbk || function(){})(or);
          };
              XtZPS.readStream(o, szTmp, ctx);
      };
      return XtZPS;
   };