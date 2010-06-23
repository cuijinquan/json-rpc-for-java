{
	  openMultiSelectDiv:function (e,o1,input){
	  var o = $("#"+o1.id);
	  input = $(input);
	  if(input.attr("readonly"))return;
	  o.attr("class","MultiSelectShow");
	  oPos=input.position();    
	  o.css({left:oPos.left+"px",top: (oPos.top+input.height()+4)+"px",width:(o1 && o1.width && parseInt(o1.width) || (input.width()+15))+"px"});
	
	  o.find("Object,embed").width(o.width() + "px");
	  var _o=o.find("#buttons");_o.css({"background-position":"1px","margin-top":"10px","margin-right":(o.width()-_o.width())/2});
	  _o.find(".z-btn").css({"margin-right":"10px"});
	  //处理文本框过滤
	  var colsArr = eval($(o.find(".x-hide-display")[0]).text()),s="";
	  for(i = 0;i<colsArr.length;i++){
	  	s+=colsArr[i]["name"]+",";
	  }
	  var dg=o.find("Object,embed"),_dg_id=dg.attr("id");
	  _dg_id=_dg_id.substr(0,_dg_id.length-1);
	  input.keyup(function(){
	  	_dg_id.setFilterExpression(this,s);
	  });
	  //一系列事件
	  o.keypress(function(e){
	  	if(e.keyCode==27)MultiSelect.hiddenMultiSelectDiv(o1.id);
	  });
	  input.keypress(function(e){
	  	if(e.keyCode==27)MultiSelect.hiddenMultiSelectDiv(o1.id);
	  });
	  $("#MultiSelect-OK-Butt").click(function(){
	  	MultiSelect.selectedOk(o,input,_dg_id);
	  });
	  },
	  hiddenMultiSelectDiv:function(id)
	  {  
	   	$("#"+id).attr("class","MultiSelectHid");
	   	$("#"+id).css({left:"-3000px"});
	  },
	  selectedOk:function(o,input,_dg_id){
	  	var oArr = $(_dg_id.fnGetChckAllRows()),s="[",displayFields = o.attr("displayFields");
	  	if(oArr.size()!=0){ 
		if(displayFields){
		  	oArr.each(function(){
		  		_t = this;
				s+=_t[displayFields]+",";	
		  	});
		  	input.val("共"+oArr.size()+"项："+s+"]");}
	  	else 
	  		input.val("[已经选择 "+oArr.size()+" 项]")
	  	}
	  	else input.val("");
	  	MultiSelect.hiddenMultiSelectDiv(o.attr("id"));
	  }
}