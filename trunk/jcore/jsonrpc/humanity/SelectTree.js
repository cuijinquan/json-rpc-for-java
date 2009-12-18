{
    /* 初始化下拉树，包括事件的一次性绑定 */
     initSlctTree:function(o)
    {
       var id = o;
       o = $("#" + o);
       window.hdAll.push(function(){o.hide()});
       var oI = o.next(":input:first"), oTb = $(Base.p(oI[0], "TABLE"))
       oI.focus(function()
       {
           window.hdAll.start();
           var oSlct = $(XuiTree.slctCls), i,
                 oPos = oI.position();
	       o.css({left:oPos.left + "px", top: (oPos.top + oI.height()) + "px", width:oTb.width() + 'px'});
	       o.show();
	       
          if(1 < oSlct.length)
           {
             for(i = oSlct.length - 2; 0 <= --i; )
               $(oSlct[i]).removeClass("x-tree-selected");
              oSlct = oSlct[oSlct.length - 1];
              XuiTree.curTree.select(oSlct, null);
              Base.fnSciv($("#" + id)[0], oSlct);top.document.title = [oSlct.id, new Date().getTime()]; 
           }
       }).keydown(function(e)
       {
           if(9 == e.which)return o.hide(),true;
           o.show();
           XuiTree.curTree = XuiTree.XuiTreeCc[id];
           o.keydown(e);
           $(this).focus();
       }).change(function(){
           if(0 == this.value.trim().length)$(this).next().val('');
       }).blur(function(){
           if(!$(this).next().val())this.value = '';
       });
       /* 后面图标的点击 */
       oTb.click(function(){oI.focus()});
    }
}