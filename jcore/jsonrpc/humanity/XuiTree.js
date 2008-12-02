{
   XuiTreeCc: [], /* cache */
   curTree: null, /* 当前激活的tree */
   ext: function(oSrc, oDes)
   {
      for(var k in oSrc)oDes[k] = oSrc[k];
      return oDes;
   },upperNode: function()
    {
       var o = XuiTree.curTree.lastSlctNode;
       if(0 < o.childNodes.length && o.isExpand)
          o.isExpand = false, o.doExpand();
       else if(o.parent)o.parent.select(o.parent.Dom.prev("div")[0], null);
    },
    pervNode: function()
    {
       var o = XuiTree.curTree.lastSlctNode, szId = o.id, o1, o2, bNoP = true;
       o1 = (o2 = $("#" + szId)).prev("li");
       if(0 == o1.size())o1 = o2.parent().parent(), bNoP = false;
       if(0 < o1.size())
       {
          if(bNoP)
          {
             o2 = XuiTree.curTree.allTreeCc[o1.attr('id')];
             if(0 < o2.childNodes.length && o2.isExpand)
               o1 = $(o2.Dom).find("li:last");
          }
          o.select(o1.find("div")[0], null);
       }
    },
    lowerNode: function()
    {
       var o = XuiTree.curTree.lastSlctNode;
       if(0 < o.childNodes.length && !o.isExpand)
          o.isExpand = true, o.doExpand();
       else XuiTree.nextNode();
    },
    nextNode: function()
    {
       var o = XuiTree.curTree.lastSlctNode, szId = o.id, o1, o2 = $("#" + szId);
       if(0 < o.childNodes.length && o.isExpand)
           o.select(o2.find("li:first div")[0], null);
       else
       {
          o1 = o2.next("li:first");
          if(0 == o1.size())o1 = o2.parent().parent().next("li");
          if(0 < o1.size())
          {
              o.select(o1.find("div")[0], null);
          }
       }
    },
    /* 键盘的接收 */
    onkeydown: function(e)
    {
	    e = window.event || e; var key = e.keyCode || e.which;
	    if(XuiTree.curTree)
	    switch(key)
	    {
	      case 37 : this.upperNode(); break;  /* Arrow left, shrink child node */
	      case 38 : this.pervNode();  break;  /* Arrow up */
	      case 39 : this.lowerNode(); break;  /* Arrow right, expand child node */
	      case 40 : this.nextNode();  break;  /* Arrow down */
	    }
    },init: function()
   {
      this.onkeydown = this.bind(this.onkeydown);
      this.addEvent(document, "keydown", this.onkeydown);
      this.ext(this, this.TreeNode.prototype);
      /* 属性 */
      this.ext({
        addData: [],       /* 新选择的checkbox数据 */
        delData: [],       /* 去除选择状态的数据 */
        oldData: [],       /* 操作前的状态 */
        allTreeCc: [],     /* cache所有子节点对象的引用 */
        parent: null,      /* 父亲节点 */
        childNodes:[],     /* 子节点 */
        isChecked: false,  /* 多个选择点的状态 */
        isSelected: false, /* 选择状态 */
        isExpand:   false, /* 是否是展开的状态 */
        tree: null,        /* 树对象 */
        seq: 0,            /* 当前父亲节点内的序号 */
        html: null,        /* html代码 */
        doParentCheckedFlg: true, /* 默认会执行父亲节点的选择方法 */
        doChildCheckedFlg: true,  /* 默认会执行子节点的选择方法 */
        label: null,       /* 描述 */
        depth: 0,          /* 深度 */
        nodeIcon: 'x-tree-node-icon', /* 当前节点默认的图标定义 */
        url: 'javascript:void(0)',
        target: null,      /* 页面重定位置 */
        id: null,          /* 当前节点id */
        Dom: null,         /* 当前节点Dom对象 */
        checkValue: "df",
        allowCheck: true, /* 允许选择 */
        bExpandAll: false, /* 全部展开 */
        lastSlctNd: null,  /* 最后一次选择的对象 */

        /* 方法 */
        /* 获取去除选择的数据 */
        getDelData: function(d)
        {
           var o = d || this.tree.delData, k, a = [];
           for(k in o)if("function" != typeof o[k])a.push(o[k]);
           return a.join("\n");
        },
        /* 获取新选择的数据 */
        getAddData: function()
        {
           return this.getDelData(this.tree.addData);
        },
        /* 获取checkbox对象的id */
        getCheckBoxId: function()
        {
           return this.id + "_chkbx";
        },/* 插入 checkbox */
        insertBfLabel: function(oSelf)
        {
           if(oSelf.allowCheck && oSelf.checkValue)
           {
             var bCkd = oSelf.parent && oSelf.parent.doChildCheckedFlg && oSelf.parent.isChecked || oSelf.isChecked,
                 szId = oSelf.getCheckBoxId();
             oSelf.tree.oldData[szId] = bCkd;
             return [ "<input onclick=\"return XuiTree.getTreeNode('",
                oSelf.tree.id, "','", oSelf.id, "')",
                ".checked(this.checked, "
                ,oSelf.doChildCheckedFlg,
                ", event,this)\" type=\"checkbox\" value=\"",
                oSelf.checkValue,
                "\"",
                (bCkd ? " checked=\"true\"" : ""),
                " id=\"", szId, "\"",
                ">"].join("");
           }
           return "";
        }, /* 后期扩展label前插入html */
        insertAftLabel: function(oSelf){return ''}, /* 后期扩展label后插入html */
        /* 更新选择对象的数据 */
        upCkBxData: function(szId, bCkd, szValue)
        {
           var _t = this;
           if(!szId)return this;
           if(bCkd == _t.tree.oldData[szId])/* 还原 */
              delete _t.tree.addData[szId], delete _t.tree.delData[szId];
           else
           {
              if(bCkd)_t.tree.addData[szId] = szValue,delete _t.tree.delData[szId];
              else    _t.tree.delData[szId] = szValue,delete _t.tree.addData[szId];
           }
        },
        /* 同时触发父亲节点和子节点的同名方法，允许设置标志不触发父亲节点、子节点方法 */
        checked: function(bCkd, bDoCld, e, o)
        {
           var oCeckBox, szId, _t = this, nTm = this.tree.nDelay;
           if(!this.Dom || 0 == this.Dom.size()) oCeckBox = $(o), szId = oCeckBox.attr("id");
           else
           {
           	  oCeckBox = this.Dom.prev().find(":checkbox:first"),
              szId = oCeckBox.attr("id");
           }
           if(bDoCld && _t.doChildCheckedFlg && 0 < _t.childNodes.length)
              _t.Dom.find("a.x-tree-node-anchor :checkbox").each(function()
             {
               var oTis = $(this).attr("checked", bCkd);
               _t.upCkBxData(oTis.attr("id"), bCkd, oTis.val());
             });
           oCeckBox.attr("checked", _t.isChecked = bCkd), _t.upCkBxData(szId, bCkd, oCeckBox.val());
           _t.regTimer(function(o)
           {
             var Dom = _t.tree.Dom;
             Dom.next(":input[@name=" + _t.tree.id + "_add]").val(_t.getAddData());
             Dom.next(":input[@name=" + _t.tree.id + "_del]").val(_t.getDelData());
             return true;
           }, nTm);
           /* 父亲节点选择 */
           if(_t.doParentCheckedFlg && _t.parent)_t.parent.checked(0 < _t.parent.Dom.find(":input:checked").size(), false, e);
           e && _t.stopPropagation(e);
           return _t;
        },
        /* 高亮选中 */
        select: function(o, e)
        {
           var s = "x-tree-selected", o = $(o);
           if(this.tree.lastSlctNd && o != this.tree.lastSlctNd)this.tree.lastSlctNd.removeClass(s);
           (this.tree.lastSlctNd = o).addClass(s);
           this.tree.lastSlctNode = this.tree.allTreeCc[o.parent().attr("id")];
           e && o.find(":checkbox:first").click();
           XuiTree.curTree = this.tree;
           var oTree = $(XuiTree.curTree.tree.inserDom);
           o[0].scrollIntoView && o[0].scrollIntoView();
           return this;
        },
         /* 展开切换 */
        doExpand: function(e, bKgFlg)
        {
           var oUl = this.Dom, i = 0, j = this.childNodes.length,
              _t = this, nTm = this.tree.nDelay, s = "x-tree-ec-icon", p = oUl.parent(),
              oDiv = p.find("div.x-tree-node-el:first").removeClass("x-tree-node-collapsed").removeClass("x-tree-node-expanded"),
              oImg = oDiv.find("img." + s + ":first"), x = 0, aH = [], w = 0,
              setCls = function()
              {
               if(_t.isExpand)
               {
                  if(0 == _t.depth || _t.parent && _t.parent.childNodes.length - 1 == _t.seq)
                  s += " x-tree-elbow-end-minus";
                  else s += " x-tree-elbow-minus";
               }
               else
               {
                  if(0 == _t.depth || _t.parent && _t.parent.childNodes.length - 1 == _t.seq)
                    s += " x-tree-elbow-end-plus";
                  else s += " x-tree-elbow-plus";
               }
               oImg.attr('class', s);
              };
           if(bKgFlg)this.isExpand = !this.isExpand;
           if(this.isExpand = (this.isExpand && 0 < this.Dom.length && 0 < j))
           {
              /* 用《JavaScript高级应用与实践》中描述的8分法 */
              if(!_t.doExpandFlg)
              {
                 var n = j % 8, y = (j - n) / 8;
                 for(;i < n; i++)
                 {
                   _t.childNodes[i].draw();
                   aH.push(_t.childNodes[i].html);
                 }
                 for(;0 < y; y--)
                 {
                     _t.childNodes[i].draw();
                     aH.push(_t.childNodes[i++].html);
                     _t.childNodes[i].draw();
                     aH.push(_t.childNodes[i++].html);
                     _t.childNodes[i].draw();
                     aH.push(_t.childNodes[i++].html);
                     _t.childNodes[i].draw();
                     aH.push(_t.childNodes[i++].html);
                     _t.childNodes[i].draw();
                     aH.push(_t.childNodes[i++].html);
                     _t.childNodes[i].draw();
                     aH.push(_t.childNodes[i++].html);
                     _t.childNodes[i].draw();
                     aH.push(_t.childNodes[i++].html);
                     _t.childNodes[i].draw();
                     aH.push(_t.childNodes[i++].html);
                 }
                 _t.Dom[0] = _t.replaceHtml(_t.Dom[0], aH.join(""));
                 for(; w < j; w++)if(0 < _t.childNodes[w].childNodes.length)_t.childNodes[w].Dom = $("#" + _t.childNodes[w].id).find("ul:hidden");
                 _t.doExpandFlg = true;
              }              
              oUl.show(), oDiv.addClass("x-tree-node-expanded");
              setCls();
           }
           else oUl.hide(), oDiv.addClass("x-tree-node-collapsed"),setCls();
           e && (this.stopPropagation(e),this.preventDefault(e));
           return this;
        }, /* 展开所有子节点 */
        expandAll: function()
        {
           if(this.Dom)
           {
              this.isExpand = true, this.doExpand();
              var p = this.childNodes, i = 0, j = p.length;
              for(; i < j; i++)
                 if(0 < p[i].childNodes.length)
                    p[i].regTimer(function(o){
                       o.isExpand = true, o.doExpand(), o.expandAll();
                       return true;
                    }, 777);
           }else this.tree.bExpandAll = true;
        }, /* 折叠所有子节点 */
        collapseAll: function()
        {
           this.tree.bExpandAll = false;
           if(this.Dom)
           {
              if(this != this.tree)this.isExpand = false, this.doExpand();
              for(var p = this.childNodes, i = 0, j = p.length; i < j; i++)
                 if(0 < p[i].childNodes.length)
                   p[i].regTimer(function(o)
                 {
                   o.isExpand = false, o.doExpand(), o.collapseAll();
                   return true;
                 }, p[i].tree.nDelay);
           }
        },/* 生成Html代码 */
        draw: function()
        {
           if(this.html)return this;
           var a = [], bHvCld = 0 < this.childNodes.length,
               i = 1, s = ['x-tree-node-el'], szClsTmp = '';
           if(0 == this.depth)
              a.push("<ul class=\"x-tree-root-ct x-tree-lines\">");
           a.push("<li class=\"x-tree-node depth" + this.depth + "\" id=\"" + this.id + "\">");
           a.push("<div unselectable=\"on\" class=\"");
           s.push("depth" + this.depth);
           /* 选择状态 */
           if(this.isSelected)s.push("x-tree-selected");
           else s.push("x-unselectable");

           /*有子节点 */
           if(bHvCld)
           {
              /* 展开 */
              if(this.isExpand)s.push("x-tree-node-expanded");
              else s.push("x-tree-node-collapsed");
              s.push("folder");
           }
           else s.push("x-tree-node-leaf file");
           a.push(s.join(' '));
           a.push("\"");
           /* 事件 */
           a.push(" onmouseover=\"$(this).addClass('x-tree-node-over')\" onmouseout=\"$(this).removeClass('x-tree-node-over')\"");
           a.push(" onclick=\"XuiTree.getTreeNode('" + this.tree.id + "','" + this.id + "').select(this,event)\"");
           a.push(">");
           /* 缩进的计算 */
           if(0 < this.depth)
           {
              a.push("<span class=\"x-tree-node-indent\">");
              /* 空白格子 */
              a.push("<img class=\"x-tree-icon\" src=\"" + g_sysInfo[2] + "default/s.gif\"/>");
              szClsTmp = 'x-tree-elbow-line';
              if(this.parent && this.parent.parent && this.parent.seq == this.parent.parent.childNodes.length - 1)szClsTmp = 'x-tree-icon';
              for(;i < this.depth; i++)
                a.push("<img class=\""), a.push(szClsTmp), a.push("\" src=\""),
                a.push(g_sysInfo[2]), a.push("default/s.gif\"/>");
              a.push("</span>");
           }
           /* 树干形式图标 */
           s = ['x-tree-ec-icon'];
           /* 展开 */
           if(bHvCld)
           {
              if(this.isExpand)s.push('x-tree-elbow-minus');
              else
              {
                  if(0 == this.depth || (null != this.parent && this.seq == (this.parent.childNodes.length - 1)))
                      s.push("x-tree-elbow-end-plus");
                  else s.push("x-tree-elbow-plus");
              }
           }
           else
           {
              /* 结尾 */
              if(0 == this.depth || (null != this.parent && this.seq == (this.parent.childNodes.length - 1)))
                s.push('x-tree-elbow-end');
              else s.push('x-tree-elbow');
           }
           s = s.join(' ');
           a.push("<img class=\"" + s + "\" src=\"" + g_sysInfo[2] + "default/s.gif\"");
           if(bHvCld)a.push(" onclick=\"XuiTree.getTreeNode('" + this.tree.id + "','" + this.id + "').doExpand(event, true)\"");
           a.push("/>");

           /* 当前节点图标 */
           a.push("<img unselectable=\"on\" class=\"" + this.nodeIcon + "\" src=\"" + g_sysInfo[2] + "default/s.gif\"/>");

           /* 描述部分 */
           a.push("<a href=\"" + this.url + "\" class=\"x-tree-node-anchor\" hidefocus=\"on\"");
           if(this.target)a.push(" target=\"" + this.target + "\"");
           a.push("><span unselectable=\"on\">");
           a.push(this.insertBfLabel(this)),a.push(this.label),a.push(this.insertAftLabel(this));
           a.push("</span></a>");
           a.push("</div>");

           if(bHvCld)
           {
              a.push("<ul style=\"display:" + (this.isExpand ? "block" : "none") + ";\" class=\"x-tree-node-ct\">");
              a.push("</ul>");
           }
           a.push("</li>");
           if(0 == this.depth)
           {
               a.push("</ul>"), a.push("<input type=\"hidden\" name=\"" + this.id + "_add\"/>"),
               a.push("<input type=\"hidden\" name=\"" + this.id + "_del\"/>");
           }
           this.html = a.join("");
           if(0 == this.depth && this.inserDom)
           {
           	  this.tree.inserDom = this.replaceHtml(this.tree.inserDom, this.html),
           	  this.Dom = $("#" + this.id).find("ul.x-tree-node-ct:first"),
              this.isExpand = true, this.doExpand();
              if(this.tree.bExpandAll)this.expandAll(), this.tree.bExpandAll = false;
           }
           return this;
        }
      }, this.TreeNode.prototype);
      return this;
   },/* 获取缓存中的树节点对象 */
   getTreeNode: function(szTreeId, szNdId)
   {
       return XuiTree.XuiTreeCc[szTreeId].allTreeCc[szNdId];
   },
   TreeNode: function(o)
   {
      this.ext(o, this);/* 参数与应用到当前对象 */
      this['tree'] || (this['tree'] = this), this.tree.nDelay || (this.tree.nDelay = 13);
      /* 根节点的缓存 */
      if(0 == this.depth)XuiTree.XuiTreeCc[this.id] = this;
      XuiTree.XuiTreeCc[this.tree.id]['allTreeCc'][this.id] = this;
      var _t = this, i = 0, j = this.childNodes.length,
          depth = this.depth + 1, bHvId = !!this.id, nTm = this.tree.nDelay;
      for(;i < j; i++)
      {
        /* 子节点的属性处理 */
        _t.ext({tree: _t['tree'], parent: _t, depth: depth, seq: i, id: [_t.id, depth, i].join('_')}, _t.childNodes[i]);
        _t.childNodes[i] = new arguments.callee(_t.childNodes[i]);
      }

      /* 无阻塞模式工作 */
      if(null == this.parent || this.parent.isExpand)
      this.regTimer(function()
      {
        _t.draw();
        return true;
      }, nTm);

      return this;
   }
}