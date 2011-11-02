(function(){var _jQuery=window.jQuery,_$=window.$;var jQuery=window.jQuery=window.$=function(selector,context){return new jQuery.fn.init(selector,context)};var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/,isSimple=/^.[^:#\[\.]*$/,undefined;jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;if(selector.nodeType){this[0]=selector;this.length=1;return this}if(typeof selector=="string"){var match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1])selector=jQuery.clean([match[1]],context);else{var elem=document.getElementById(match[3]);if(elem){if(elem.id!=match[3])return jQuery().find(selector);return jQuery(elem)}selector=[]}}else return jQuery(context).find(selector)}else if(jQuery.isFunction(selector))return jQuery(document)[jQuery.fn.ready?"ready":"load"](selector);return this.setArray(jQuery.makeArray(selector))},jquery:"1.2.6",size:function(){return this.length},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num]},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret},setArray:function(elems){this.length=0;Array.prototype.push.apply(this,elems);return this},each:function(callback,args){return jQuery.each(this,callback,args)},index:function(elem){var ret=-1;return jQuery.inArray(elem&&elem.jquery?elem[0]:elem,this)},attr:function(name,value,type){var options=name;if(name.constructor==String)if(value===undefined)return this[0]&&jQuery[type||"attr"](this[0],name);else{options={};options[name]=value}return this.each(function(i){for(name in options)jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name))})},css:function(key,value){if((key=='width'||key=='height')&&parseFloat(value)<0)value=undefined;return this.attr(key,value,"curCSS")},text:function(text){if(typeof text!="object"&&text!=null)return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8)ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this])})});return ret},wrapAll:function(html){if(this[0])jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;while(elem.firstChild)elem=elem.firstChild;return elem}).append(this);return this},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html)})},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html)})},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1)this.appendChild(elem)})},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1)this.insertBefore(elem,this.firstChild)})},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this)})},after:function(){return this.domManip(arguments,false,true,function(elem){if(this.parentNode)this.parentNode.insertBefore(elem,this.nextSibling)})},end:function(){return this.prevObject||jQuery([])},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem)});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems)},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");container.appendChild(clone);return jQuery.clean([container.innerHTML])[0]}else return this.cloneNode(true)});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined)this[expando]=null});if(events===true)this.find("*").andSelf().each(function(i){if(this.nodeType==3)return;var events=jQuery.data(this,"events");for(var type in events)for(var handler in events[type])jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data)});return ret},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i)})||jQuery.multiFilter(selector,this))},not:function(selector){if(selector.constructor==String)if(isSimple.test(selector))return this.pushStack(jQuery.multiFilter(selector,this,true));else selector=jQuery.multiFilter(selector,this);var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector})},add:function(selector){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),typeof selector=='string'?jQuery(selector):jQuery.makeArray(selector))))},is:function(selector){return!!selector&&jQuery.multiFilter(selector,this).length>0},hasClass:function(selector){return this.is("."+selector)},val:function(value){if(value==undefined){if(this.length){var elem=this[0];if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";if(index<0)return null;for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;if(one)return value;values.push(value)}}return values}else return(this[0].value||"").replace(/\r/g,"")}return undefined}if(value.constructor==Number)value+='';return this.each(function(){if(this.nodeType!=1)return;if(value.constructor==Array&&/radio|checkbox/.test(this.type))this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0);else if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(value);jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0)});if(!values.length)this.selectedIndex=-1}else this.value=value})},html:function(value){return value==undefined?(this[0]?this[0].innerHTML:null):this.empty().append(value)},replaceWith:function(value){return this.after(value).remove()},eq:function(i){return this.slice(i,i+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)}))},andSelf:function(){return this.add(this.prevObject)},data:function(key,value){var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data===undefined&&this.length)data=jQuery.data(this[0],key);return data===undefined&&parts[1]?this.data(parts[0]):data}else return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value)})},removeData:function(key){return this.each(function(){jQuery.removeData(this,key)})},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);if(reverse)elems.reverse()}var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr"))obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"));var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;if(jQuery.nodeName(elem,"script"))scripts=scripts.add(elem);else{if(elem.nodeType==1)scripts=scripts.add(jQuery("script",elem).remove());callback.call(obj,elem)}});scripts.each(evalScript)})}};jQuery.fn.init.prototype=jQuery.fn;function evalScript(i,elem){if(elem.src)jQuery.ajax({url:elem.src,async:false,dataType:"script"});else jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"");if(elem.parentNode)elem.parentNode.removeChild(elem)}function now(){return+new Date}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2}if(typeof target!="object"&&typeof target!="function")target={};if(length==i){target=this;--i}for(;i<length;i++)if((options=arguments[i])!=null)for(var name in options){var src=target[name],copy=options[name];if(target===copy)continue;if(deep&&copy&&typeof copy=="object"&&!copy.nodeType)target[name]=jQuery.extend(deep,src||(copy.length!=null?[]:{}),copy);else if(copy!==undefined)target[name]=copy}return target};var expando="jQuery"+now(),uuid=0,windowData={},exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,defaultView=document.defaultView||{};jQuery.extend({noConflict:function(deep){window.$=_$;if(deep)window.jQuery=_jQuery;return jQuery},isFunction:function(fn){return!!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/^[\s[]?function/.test(fn+"")},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");script.type="text/javascript";if(jQuery.browser.msie)script.text=data;else script.appendChild(document.createTextNode(data));head.insertBefore(script,head.firstChild);head.removeChild(script)}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase()},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];if(!id)id=elem[expando]=++uuid;if(name&&!jQuery.cache[id])jQuery.cache[id]={};if(data!==undefined)jQuery.cache[id][name]=data;return name?jQuery.cache[id][name]:id},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];name="";for(name in jQuery.cache[id])break;if(!name)jQuery.removeData(elem)}}else{try{delete elem[expando]}catch(e){if(elem.removeAttribute)elem.removeAttribute(expando)}delete jQuery.cache[id]}},each:function(object,callback,args){var name,i=0,length=object.length;if(args){if(length==undefined){for(name in object)if(callback.apply(object[name],args)===false)break}else for(;i<length;)if(callback.apply(object[i++],args)===false)break}else{if(length==undefined){for(name in object)if(callback.call(object[name],name,object[name])===false)break}else for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}return object},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value))value=value.call(elem,i);return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className))elem.className+=(elem.className?" ":"")+className})},remove:function(elem,classNames){if(elem.nodeType==1)elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return!jQuery.className.has(classNames,className)}).join(" "):""},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name]}callback.call(elem);for(var name in options)elem.style[name]=old[name]},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0});val-=Math.round(padding+border)}if(jQuery(elem).is(":visible"))getWH();else jQuery.swap(elem,props,getWH);return Math.max(0,val)}return jQuery.curCSS(elem,name,force)},curCSS:function(elem,name,force){var ret,style=elem.style;function color(elem){if(!jQuery.browser.safari)return false;var ret=defaultView.getComputedStyle(elem,null);return!ret||ret.getPropertyValue("color")==""}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(style,"opacity");return ret==""?"1":ret}if(jQuery.browser.opera&&name=="display"){var save=style.outline;style.outline="0 solid black";style.outline=save}if(name.match(/float/i))name=styleFloat;if(!force&&style&&style[name])ret=style[name];else if(defaultView.getComputedStyle){if(name.match(/float/i))name="float";name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var computedStyle=defaultView.getComputedStyle(elem,null);if(computedStyle&&!color(elem))ret=computedStyle.getPropertyValue(name);else{var swap=[],stack=[],a=elem,i=0;for(;a&&color(a);a=a.parentNode)stack.unshift(a);for(;i<stack.length;i++)if(color(stack[i])){swap[i]=stack[i].style.display;stack[i].style.display="block"}ret=name=="display"&&swap[stack.length-1]!=null?"none":(computedStyle&&computedStyle.getPropertyValue(name))||"";for(i=0;i<swap.length;i++)if(swap[i]!=null)stack[i].style.display=swap[i]}if(name=="opacity"&&ret=="")ret="1"}else if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase()});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var left=style.left,rsLeft=elem.runtimeStyle.left;elem.runtimeStyle.left=elem.currentStyle.left;style.left=ret||0;ret=style.pixelLeft+"px";style.left=left;elem.runtimeStyle.left=rsLeft}}return ret},clean:function(elems,context){var ret=[];context=context||document;if(typeof context.createElement=='undefined')context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;jQuery.each(elems,function(i,elem){if(!elem)return;if(elem.constructor==Number)elem+='';if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">"});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--)div=div.lastChild;if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];for(var j=tbody.length-1;j>=0;--j)if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length)tbody[j].parentNode.removeChild(tbody[j]);if(/^\s/.test(elem))div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild)}elem=jQuery.makeArray(div.childNodes)}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select")))return;if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options)ret.push(elem);else ret=jQuery.merge(ret,elem)});return ret},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8)return undefined;var notxml=!jQuery.isXMLDoc(elem),set=value!==undefined,msie=jQuery.browser.msie;name=notxml&&jQuery.props[name]||name;if(elem.tagName){var special=/href|src|style/.test(name);if(name=="selected"&&jQuery.browser.safari)elem.parentNode.selectedIndex;if(name in elem&&notxml&&!special){if(set){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode)throw"type property can't be changed";elem[name]=value}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name))return elem.getAttributeNode(name).nodeValue;return elem[name]}if(msie&&notxml&&name=="style")return jQuery.attr(elem.style,"cssText",value);if(set)elem.setAttribute(name,""+value);var attr=msie&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);return attr===null?undefined:attr}if(msie&&name=="opacity"){if(set){elem.zoom=1;elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(value)+''=="NaN"?"":"alpha(opacity="+value*100+")")}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100)+'':""}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase()});if(set && -1 == String(value).indexOf("NaN"))elem[name]=value;return elem[name]},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"")},makeArray:function(array){var ret=[];if(array!=null){var i=array.length;if(i==null||array.split||array.setInterval||array.call)ret[0]=array;else while(i)ret[--i]=array[i]}return ret},inArray:function(elem,array){for(var i=0,length=array.length;i<length;i++)if(array[i]===elem)return i;return-1},merge:function(first,second){var i=0,elem,pos=first.length;if(jQuery.browser.msie){while(elem=second[i++])if(elem.nodeType!=8)first[pos++]=elem}else while(elem=second[i++])first[pos++]=elem;return first},unique:function(array){var ret=[],done={};try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;ret.push(array[i])}}}catch(e){ret=array}return ret},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;i<length;i++)if(!inv!=!callback(elems[i],i))ret.push(elems[i]);return ret},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;i<length;i++){var value=callback(elems[i],i);if(value!=null)ret[ret.length]=value}return ret.concat.apply([],ret)}});var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing"}});jQuery.each({parent:function(elem){return elem.parentNode},parents:function(elem){return jQuery.dir(elem,"parentNode")},next:function(elem){return jQuery.nth(elem,2,"nextSibling")},prev:function(elem){return jQuery.nth(elem,2,"previousSibling")},nextAll:function(elem){return jQuery.dir(elem,"nextSibling")},prevAll:function(elem){return jQuery.dir(elem,"previousSibling")},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem)},children:function(elem){return jQuery.sibling(elem.firstChild)},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes)}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);if(selector&&typeof selector=="string")ret=jQuery.multiFilter(selector,ret);return this.pushStack(jQuery.unique(ret))}});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;return this.each(function(){for(var i=0,length=args.length;i<length;i++)jQuery(args[i])[original](this)})}});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1)this.removeAttribute(name)},addClass:function(classNames){jQuery.className.add(this,classNames)},removeClass:function(classNames){jQuery.className.remove(this,classNames)},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames)},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);jQuery.removeData(this)});if(this.parentNode)this.parentNode.removeChild(this)}},empty:function(){jQuery(">*",this).remove();while(this.firstChild)this.removeChild(this.firstChild)}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments)}});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px")}});function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0}var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");jQuery.extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2])},"#":function(a,i,m){return a.getAttribute("id")==m[2]},":":{lt:function(a,i,m){return i<m[3]-0},gt:function(a,i,m){return i>m[3]-0},nth:function(a,i,m){return m[3]-0==i},eq:function(a,i,m){return m[3]-0==i},first:function(a,i){return i==0},last:function(a,i,m,r){return i==r.length-1},even:function(a,i){return i%2==0},odd:function(a,i){return i%2},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a},"only-child":function(a){return!jQuery.nth(a.parentNode.lastChild,2,"previousSibling")},parent:function(a){return a.firstChild},empty:function(a){return!a.firstChild},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden"},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden"},enabled:function(a){return!a.disabled},disabled:function(a){return a.disabled},checked:function(a){return a.checked},selected:function(a){return a.selected||jQuery.attr(a,"selected")},text:function(a){return"text"==a.type},radio:function(a){return"radio"==a.type},checkbox:function(a){return"checkbox"==a.type},file:function(a){return"file"==a.type},password:function(a){return"password"==a.type},submit:function(a){return"submit"==a.type},image:function(a){return"image"==a.type},reset:function(a){return"reset"==a.type},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button")},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},has:function(a,i,m){return jQuery.find(m[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem}).length}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r)}return cur},find:function(t,context){if(typeof t!="string")return[t];if(context&&context.nodeType!=1&&context.nodeType!=9)return[];context=context||document;var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t);var foundToken=false,re=quickChild,m=re.exec(t);if(m){nodeName=m[1].toUpperCase();for(var i=0;ret[i];i++)for(var c=ret[i].firstChild;c;c=c.nextSibling)if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName))r.push(c);ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0)continue;foundToken=true}else{re=/^([>+~])\s*(\w*)/i;if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling)if(n.nodeType==1){var id=jQuery.data(n);if(m=="~"&&merge[id])break;if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~")merge[id]=true;r.push(n)}if(m=="+")break}}ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0])ret.shift();done=jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length)}else{var re2=quickID;var m=re2.exec(t);if(m){m=[0,m[2],m[3],m[1]]}else{re2=quickClass;m=re2.exec(t)}m[2]=m[2].replace(/\\/g,"");var elem=ret[ret.length-1];if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2])oid=jQuery('[@id="'+m[2]+'"]',elem)[0];ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[]}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object")tag="param";r=jQuery.merge(r,ret[i].getElementsByTagName(tag))}if(m[1]==".")r=jQuery.classFilter(r,m[2]);if(m[1]=="#"){var tmp=[];for(var i=0;r[i];i++)if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];break}r=tmp}ret=r}t=t.replace(re2,"")}}if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t)}}if(t)ret=[];if(ret&&context==ret[0])ret.shift();done=jQuery.merge(done,ret);return done},classFilter:function(r,m,not){m=" "+m+" ";var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;if(!not&&pass||not&&!pass)tmp.push(r[i])}return tmp},filter:function(t,r,not){var last;while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break}}if(!m)break;if(m[1]==":"&&m[2]=="not")r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3]);else if(m[1]==".")r=jQuery.classFilter(r,m[2],not);else if(m[1]=="["){var tmp=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2]))z=jQuery.attr(a,m[2])||'';if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not)tmp.push(a)}r=tmp}else if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling)if(n.nodeType==1)n.nodeIndex=c++;merge[id]=true}var add=false;if(first==0){if(node.nodeIndex==last)add=true}else if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0)add=true;if(add^not)tmp.push(node)}r=tmp}else{var fn=jQuery.expr[m[1]];if(typeof fn=="object")fn=fn[m[2]];if(typeof fn=="string")fn=eval("false||function(a,i){return "+fn+";}");r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r)},not)}}return{r:r,t:t}},dir:function(elem,dir){var matched=[],cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1)matched.push(cur);cur=cur[dir]}return matched},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir])if(cur.nodeType==1&&++num==result)break;return cur},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&n!=elem)r.push(n)}return r}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8)return;if(jQuery.browser.msie&&elem.setInterval)elem=window;if(!handler)return null;if(!handler.guid)handler.guid=this.guid++;if(data!=undefined){var fn=handler;handler=this.proxy(fn,function(){return fn.apply(this,arguments)});handler.data=data}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){if(typeof jQuery!="undefined"&&!jQuery.event.triggered)return jQuery.event.handle.apply(arguments.callee.elem,arguments)});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener)elem.addEventListener(type,handle,false);else if(elem.attachEvent)elem.attachEvent("on"+type,handle)}}handlers[handler.guid]=handler;jQuery.event.global[type]=true});elem=null},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8)return;var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)=="."))for(var type in events)this.remove(elem,type+(types||""));else{if(types.type){handler=types.handler;types=types.type}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");type=parts[0];if(events[type]){if(handler)delete events[type][handler.guid];else for(handler in events[type])if(!parts[1]||events[type][handler].type==parts[1])delete events[type][handler];for(ret in events[type])break;if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener)elem.removeEventListener(type,jQuery.data(elem,"handle"),false);else if(elem.detachEvent)elem.detachEvent("on"+type,jQuery.data(elem,"handle"))}ret=null;delete events[type]}}})}for(ret in events)break;if(!ret){var handle=jQuery.data(elem,"handle");if(handle)handle.elem=null;jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle")}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data);if(type.indexOf("!")>=0){type=type.slice(0,-1);var exclusive=true}if(!elem){if(this.global[type])jQuery("*").add([window,document]).trigger(type,data)}else{if(elem.nodeType==3||elem.nodeType==8)return undefined;var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;if(event){data.unshift({type:type,target:elem,preventDefault:function(){},stopPropagation:function(){},timeStamp:now()});data[0][expando]=true}data[0].type=type;if(exclusive)data[0].exclusive=true;var handle=jQuery.data(elem,"handle");if(handle)val=handle.apply(elem,data);if((!fn||(jQuery.nodeName(elem,'a')&&type=="click"))&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false)val=false;if(event)data.shift();if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));if(ret!==undefined)val=ret}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,'a')&&type=="click")){this.triggered=true;try{elem[type]()}catch(e){}}this.triggered=false}return val},handle:function(event){var val,ret,namespace,all,handlers;event=arguments[0]=jQuery.event.fix(event||window.event);if(!event.type)return false;namespace=event.type.split(".");event.type=namespace[0];namespace=namespace[1];all=!namespace&&!event.exclusive;handlers=(jQuery.data(this,"events")||{})[event.type];for(var j in handlers){var handler=handlers[j];if(all||handler.type==namespace){event.handler=handler;event.data=handler.data;if(!handler.apply)return this;ret=handler.apply(this,arguments);if(val!==false)val=ret;if(ret===false){event.preventDefault();event.stopPropagation()}}}return val},fix:function(event){if(event[expando]==true)return event;var originalEvent=event;event={originalEvent:originalEvent};var props="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");for(var i=props.length;i;i--)event[props[i]]=originalEvent[props[i]];event[expando]=true;event.preventDefault=function(){if(originalEvent.preventDefault)originalEvent.preventDefault();originalEvent.returnValue=false};event.stopPropagation=function(){if(originalEvent.stopPropagation)originalEvent.stopPropagation();originalEvent.cancelBubble=true};event.timeStamp=event.timeStamp||now();if(!event.target)event.target=event.srcElement||document;if(event.target.nodeType==3)event.target=event.target.parentNode;if(!event.relatedTarget&&event.fromElement)event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement;if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0)}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode))event.which=event.charCode||event.keyCode;if(!event.metaKey&&event.ctrlKey)event.metaKey=event.ctrlKey;if(!event.which&&event.button)event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));return event},proxy:function(fn,proxy){proxy.guid=fn.guid=fn.guid||proxy.guid||this.guid++;return proxy},special:{ready:{setup:function(){bindReady();return},teardown:function(){return}},mouseenter:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);return true},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);return true},handler:function(event){if(withinElement(event,this))return true;event.type="mouseenter";return jQuery.event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(jQuery.browser.msie)return false;jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true},teardown:function(){if(jQuery.browser.msie)return false;jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);return true},handler:function(event){if(withinElement(event,this))return true;event.type="mouseleave";return jQuery.event.handle.apply(this,arguments)}}}};jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data)})},one:function(type,data,fn){var one=jQuery.event.proxy(fn||data,function(event){jQuery(this).unbind(event,one);return(fn||data).apply(this,arguments)});return this.each(function(){jQuery.event.add(this,type,one,fn&&data)})},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn)})},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn)})},triggerHandler:function(type,data,fn){return this[0]&&jQuery.event.trigger(type,data,this[0],false,fn)},toggle:function(fn){var args=arguments,i=1;while(i<args.length)jQuery.event.proxy(fn,args[i++]);return this.click(jQuery.event.proxy(fn,function(event){this.lastToggle=(this.lastToggle||0)%i;event.preventDefault();return args[this.lastToggle++].apply(this,arguments)||false}))},hover:function(fnOver,fnOut){return this.bind('mouseenter',fnOver).bind('mouseleave',fnOut)},ready:function(fn){bindReady();if(jQuery.isReady)fn.call(document,jQuery);else jQuery.readyList.push(function(){return fn.call(this,jQuery)});return this}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.call(document)});jQuery.readyList=null}jQuery(document).triggerHandler("ready")}}});var readyBound=false;function bindReady(){if(readyBound)return;readyBound=true;if(document.addEventListener&&!jQuery.browser.opera)document.addEventListener("DOMContentLoaded",jQuery.ready,false);if(jQuery.browser.msie&&window==top)(function(){if(jQuery.isReady)return;try{document.documentElement.doScroll("left")}catch(error){setTimeout(arguments.callee,0);return}jQuery.ready()})();if(jQuery.browser.opera)document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return}jQuery.ready()},false);if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return}if(numStyles===undefined)numStyles=jQuery("style, link[rel=stylesheet]").length;if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return}jQuery.ready()})()}jQuery.event.add(window,"load",jQuery.ready)}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,"+"mousedown,mouseup,mousemove,mouseover,mouseout,change,select,"+"submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name)}});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem)try{parent=parent.parentNode}catch(error){parent=elem}return parent==elem};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind()});jQuery.fn.extend({_load:jQuery.fn.load,load:function(url,params,callback){if(typeof url!='string')return this._load(url);var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off)}callback=callback||function(){};var type="GET";if(params)if(jQuery.isFunction(params)){callback=params;params=null}else{params=jQuery.param(params);type="POST"}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified")self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText);self.each(callback,[res.responseText,status,res])}});return this},serialize:function(){return jQuery.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type))}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val}}):{name:elem.name,value:val}}).get()}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f)}});var jsc=now();jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data=null}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type})},getScript:function(url,callback){return jQuery.get(url,null,callback,"script")},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;data={}}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type})},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings)},ajaxSettings:{url:location.href,global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));var jsonp,jsre=/=\?(&|$)/g,status,data,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!="string")s.data=jQuery.param(s.data);if(s.dataType=="jsonp"){if(type=="GET"){if(!s.url.match(jsre))s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?"}else if(!s.data||!s.data.match(jsre))s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?";s.dataType="json"}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;if(s.data)s.data=(s.data+"").replace(jsre,"="+jsonp+"$1");s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();complete();window[jsonp]=undefined;try{delete window[jsonp]}catch(e){}if(head)head.removeChild(script)}}if(s.dataType=="script"&&s.cache==null)s.cache=false;if(s.cache===false&&type=="GET"){var ts=now();var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"")}if(s.data&&type=="GET"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null}if(s.global&&!jQuery.active++)jQuery.event.trigger("ajaxStart");var remote=/^(?:\w+:)?\/\/([^\/?#]+)/;if(s.dataType=="script"&&type=="GET"&&remote.test(s.url)&&remote.exec(s.url)[1]!=location.host){var head=document.getElementsByTagName("head")[0];var script=document.createElement("script");script.src=s.url;if(s.scriptCharset)script.charset=s.scriptCharset;if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;success();complete();head.removeChild(script)}}}head.appendChild(script);return undefined}var requestDone=false;var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();if(s.username)xhr.open(type,s.url,s.async,s.username,s.password);else xhr.open(type,s.url,s.async);try{if(s.data)xhr.setRequestHeader("Content-Type",s.contentType);if(s.ifModified)xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT");xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default)}catch(e){}if(s.beforeSend&&s.beforeSend(xhr,s)===false){s.global&&jQuery.active--;xhr.abort();return false}if(s.global)jQuery.event.trigger("ajaxSend",[xhr,s]);var onreadystatechange=function(isTimeout){if(!requestDone&&xhr&&(xhr.readyState==4||isTimeout=="timeout")){requestDone=true;if(ival){clearInterval(ival);ival=null}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xhr)&&"error"||s.ifModified&&jQuery.httpNotModified(xhr,s.url)&&"notmodified"||"success";if(status=="success"){try{data=jQuery.httpData(xhr,s.dataType,s.dataFilter)}catch(e){status="parsererror"}}if(status=="success"){var modRes;try{modRes=xhr.getResponseHeader("Last-Modified")}catch(e){}if(s.ifModified&&modRes)jQuery.lastModified[s.url]=modRes;if(!jsonp)success()}else jQuery.handleError(s,xhr,status);complete();if(s.async)xhr=null}};if(s.async){var ival=setInterval(onreadystatechange,13);if(s.timeout>0)setTimeout(function(){if(xhr){xhr.abort();if(!requestDone)onreadystatechange("timeout")}},s.timeout)}try{xhr.send(s.data)}catch(e){jQuery.handleError(s,xhr,null,e)}if(!s.async)onreadystatechange();function success(){if(s.success)s.success(data,status);if(s.global)jQuery.event.trigger("ajaxSuccess",[xhr,s])}function complete(){if(s.complete)s.complete(xhr,status);if(s.global)jQuery.event.trigger("ajaxComplete",[xhr,s]);if(s.global&&!--jQuery.active)jQuery.event.trigger("ajaxStop")}return xhr},handleError:function(s,xhr,status,e){if(s.error)s.error(xhr,status,e);if(s.global)jQuery.event.trigger("ajaxError",[xhr,s,e])},active:0,httpSuccess:function(xhr){try{return!xhr.status&&location.protocol=="file:"||(xhr.status>=200&&xhr.status<300)||xhr.status==304||xhr.status==1223||jQuery.browser.safari&&xhr.status==undefined}catch(e){}return false},httpNotModified:function(xhr,url){try{var xhrRes=xhr.getResponseHeader("Last-Modified");return xhr.status==304||xhrRes==jQuery.lastModified[url]||jQuery.browser.safari&&xhr.status==undefined}catch(e){}return false},httpData:function(xhr,type,filter){var ct=xhr.getResponseHeader("content-type"),xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.tagName=="parsererror")throw"parsererror";if(filter)data=filter(data,type);if(type=="script")jQuery.globalEval(data);if(type=="json")data=eval("("+data+")");return data},param:function(a){var s=[];if(a.constructor==Array||a.jquery)jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value))});else for(var j in a)if(a[j]&&a[j].constructor==Array)jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this))});else s.push(encodeURIComponent(j)+"="+encodeURIComponent(jQuery.isFunction(a[j])?a[j]():a[j]));return s.join("&").replace(/%20/g,"+")}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");if(this.style.display=="none")this.style.display="block";elem.remove()}}).end()},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");if(this.style)this.style.display="none"}).end()},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle.apply(this,arguments):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]()})},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback)},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback)},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback)},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback)},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback)},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback)},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1)return false;var opt=jQuery.extend({},optall),p,hidden=jQuery(this).is(":hidden"),self=this;for(p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden)return opt.complete.call(this);if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow}}if(opt.overflow!=null)this.style.overflow="hidden";opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val))e[val=="toggle"?hidden?"show":"hide":val](prop);else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;start=((end||1)/e.cur(true))*start;self.style[name]=start+unit}if(parts[1])end=((parts[1]=="-="?-1:1)*end)+start;e.custom(start,end,unit)}else e.custom(start,val,"")}});return true})},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;type="fx"}if(!type||(typeof type=="string"&&!fn))return queue(this[0],type);return this.each(function(){if(fn.constructor==Array)queue(this,type,fn);else{queue(this,type).push(fn);if(queue(this,type).length==1)fn.call(this)}})},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;if(clearQueue)this.queue([]);this.each(function(){for(var i=timers.length-1;i>=0;i--)if(timers[i].elem==this){if(gotoEnd)timers[i](true);timers.splice(i,1)}});if(!gotoEnd)this.dequeue();return this}});var queue=function(elem,type,array){if(elem){type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array)q=jQuery.data(elem,type+"queue",jQuery.makeArray(array))}return q};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);q.shift();if(q.length)q[0].call(this)})};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:jQuery.fx.speeds[opt.duration])||jQuery.fx.speeds.def;opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false)jQuery(this).dequeue();if(jQuery.isFunction(opt.old))opt.old.call(this)};return opt},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;if(!options.orig)options.orig={}}});jQuery.fx.prototype={update:function(){if(this.options.step)this.options.step.call(this.elem,this.now,this);(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width")this.elem.style.display="block"},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null)return this.elem[this.prop];var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd)}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;for(var i=0;i<timers.length;i++)if(!timers[i]())timers.splice(i--,1);if(!timers.length){clearInterval(jQuery.timerId);jQuery.timerId=null}},13)}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height")this.elem.style[this.prop]="1px";jQuery(this.elem).show()},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(gotoEnd){var t=now();if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim)if(this.options.curAnim[i]!==true)done=false;if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none")this.elem.style.display="block"}if(this.options.hide)this.elem.style.display="none";if(this.options.hide||this.options.show)for(var p in this.options.curAnim)jQuery.attr(this.elem.style,p,this.options.orig[p])}if(done)this.options.complete.call(this.elem);return false}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(fx){fx.elem.scrollLeft=fx.now},scrollTop:function(fx){fx.elem.scrollTop=fx.now},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now)},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit}}});jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;if(elem)with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),css=jQuery.curCSS,fixed=css(elem,"position")=="fixed";if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop)}else{add(elem.offsetLeft,elem.offsetTop);while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2)border(offsetParent);if(!fixed&&css(offsetParent,"position")=="fixed")fixed=true;offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;offsetParent=offsetParent.offsetParent}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(css(parent,"display")))add(-parent.scrollLeft,-parent.scrollTop);if(mozilla&&css(parent,"overflow")!="visible")border(parent);parent=parent.parentNode}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute"))add(-doc.body.offsetLeft,-doc.body.offsetTop);if(fixed)add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop))}results={top:top,left:left}}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true))}function add(l,t){left+=parseInt(l,10)||0;top+=parseInt(t,10)||0}return results};jQuery.fn.extend({position:function(){var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,'marginTop');offset.left-=num(this,'marginLeft');parentOffset.top+=num(offsetParent,'borderTopWidth');parentOffset.left+=num(offsetParent,'borderLeftWidth');results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}}return results},offsetParent:function(){var offsetParent=this[0].offsetParent;while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,'position')=='static'))offsetParent=offsetParent.offsetParent;return jQuery(offsetParent)}});jQuery.each(['Left','Top'],function(i,name){var method='scroll'+name;jQuery.fn[method]=function(val){if(!this[0])return;return val!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[method]=val}):this[0]==window||this[0]==document?self[i?'pageYOffset':'pageXOffset']||jQuery.boxModel&&document.documentElement[method]||document.body[method]:this[0][method]}});jQuery.each(["Height","Width"],function(i,name){var tl=i?"Left":"Top",br=i?"Right":"Bottom";jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+num(this,"padding"+tl)+num(this,"padding"+br)};jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+num(this,"border"+tl+"Width")+num(this,"border"+br+"Width")+(margin?num(this,"margin"+tl)+num(this,"margin"+br):0)}})})();	(function($) {
    $.toJSON = function(o)
    {
        if (typeof(JSON) == 'object' && JSON.stringify)
            return JSON.stringify(o);
        var type = typeof(o);
        if (o === null)
            return "null";
        if (type == "undefined")
            return undefined;
        if (type == "number" || type == "boolean")
            return o + "";
        if (type == "string")
            return $.quoteString(o);
        if (type == 'object')
        {
            if (typeof o.toJSON == "function") 
                return $.toJSON( o.toJSON() );
            if (o.constructor === Date)
            {
                var month = o.getUTCMonth() + 1;
                if (month < 10) month = '0' + month;
                var day = o.getUTCDate();
                if (day < 10) day = '0' + day;
                var year = o.getUTCFullYear();
                var hours = o.getUTCHours();
                if (hours < 10) hours = '0' + hours;
                var minutes = o.getUTCMinutes();
                if (minutes < 10) minutes = '0' + minutes;
                var seconds = o.getUTCSeconds();
                if (seconds < 10) seconds = '0' + seconds;
                var milli = o.getUTCMilliseconds();
                if (milli < 100) milli = '0' + milli;
                if (milli < 10) milli = '0' + milli;
                return '"' + year + '-' + month + '-' + day + 'T' +
                             hours + ':' + minutes + ':' + seconds + 
                             '.' + milli + 'Z"'; 
            }
            if (o.constructor === Array) 
            {
                var ret = [];
                for (var i = 0; i < o.length; i++)
                    ret.push( $.toJSON(o[i]) || "null" );
                return "[" + ret.join(",") + "]";
            }
            var pairs = [];
            for (var k in o) {
                var name;
                var type = typeof k;
                if (type == "number")
                    name = '"' + k + '"';
                else if (type == "string")
                    name = $.quoteString(k);
                else
                    continue;
                if (typeof o[k] == "function") 
                    continue;
                var val = $.toJSON(o[k]);
                pairs.push(name + ":" + val);
            }
            return "{" + pairs.join(", ") + "}";
        }
    };
    $.evalJSON = function(src)
    {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);
        return eval("(" + src + ")");
    };
    $.secureEvalJSON = function(src)
    {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);
        var filtered = src;
        filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
        filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        if (/^[\],:{}\s]*$/.test(filtered))
            return eval("(" + src + ")");
        else
            throw new SyntaxError("Error parsing JSON, source is not valid.");
    };
    $.quoteString = function(string)
    {
        if (string.match(_escapeable))
        {
            return '"' + string.replace(_escapeable, function (a) 
            {
                var c = _meta[a];
                if (typeof c === 'string') return c;
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };
    var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    var _meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    };
})(jQuery);function JsonRpcClient(url) {
	url || (url = ("undefined" == typeof contextPath ? "." : contextPath) + "/CMHS");
	if (this == window) {
		return JsonRpcClient._cache || (JsonRpcClient._cache = new JsonRpcClient(url));
	}
	this["url"] = url;
	var _this = this, obj = {}, bind = function (f, o) {
		return function () {
			return f.apply(o, arguments);
		};
	}, _A = function (p) {
		var r = [], i = 0, j = p.length;
		for (; i < j; i++) {
			r.push(p[i]);
		}
		return r;
	}, AJAX = function (o) {
		if (window == this) {
			return new AJAX(o);
		}
		var _this = this, lct = document.location, fncbk = function () {
			if (_this.xml && 4 == _this.xml.readyState) {
				(200 == _this.xml.status || 404 == _this.xml.status || 500 == _this.xml.status) && o.clbkFun && o.clbkFun(_this.xml.responseText.replace(/&#(\d+);/gm, function () {
					return String.fromCharCode(arguments[1]);
				})), _this.xml && (delete _this.xml.onreadystatechange, delete _this.xml);
			}
		};
		if (-1 == o.url.indexOf("http:")) {
			o.url = [lct.protocol, "//", lct.host].join("") + o.url;
		}
		if (this.xml = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()) {
			o.bAsync && (this.xml.onreadystatechange = function () {
				fncbk();
			});
			this.xml.open("POST", o.url + (-1 < o.url.indexOf("?") ? "&" : "?") + "xui=" + new Date().getTime() + ("undefined" != typeof g_szJsessionid ? "&jsessionid=" + g_szJsessionid : ""), o.bAsync, "", "");
			this.xml.setRequestHeader("XUIAJAX", 1);
			this.xml.setRequestHeader("CMHS", "JsonRpc");
			this.xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
			this.xml.setRequestHeader("user-agent", navigator.userAgent);
			this.xml.send(o.data && o.data.replace(/[\u4E00-\u9FA5]/gm, function () {
				return "&#" + arguments[0].charCodeAt(0) + ";";
			}) || "");
			if (!o.bAsync) {
				fncbk();
			}
		}
	};
	this.AJAX = AJAX;
	AJAX({url:url, bAsync:false, clbkFun:function () {
		try {
			eval("obj = " + arguments[0]);
		}
		catch (e) {
		}
	}});
	obj = obj.result;
	var fnGetAllIpt = function(){
	    var tps, i = 0,j, b, aIps = _A(document.getElementsByTagName("input")).concat(_A(document.getElementsByTagName("select"))).concat(_A(document.getElementsByTagName("textarea"))), oAs = {};
	    for(; i < aIps.length; i++)
	    {
	       if(!aIps[i].name)continue;
	       tps = aIps[i].type;
	       if("select-multiple" == tps)
	       {
	          var vs = [];
	          b = aIps[i].getElementsByTagName("option");
	          for(j = 0; j < b.length; j++)if(b[j].selected)vs.push(encodeURIComponent(b[j].value));
	          oAs[aIps[i].name] = vs.join(",");
	       }
	       else if((b = "checkbox" == tps || "radio" == tps) && aIps[i].checked || !b)
	       {
	          if(aIps[i].name)oAs[aIps[i].name] = encodeURIComponent(aIps[i].value); 
	       }
	    }aIps = null;
	    return oAs;
	}, fnTmp = function (oTmp) {
		if ("number" == (szTp = typeof oTmp)) {
			return isFinite(oTmp) ? oTmp : 0;
		} else {
			if ("boolean" == szTp || null == oTmp) {
				return oTmp;
			} else {
				k = {"\r":"", "\n":"\\n", "\t":"\\t", "\b":"\\b", "\f":"\\f", "\"":"\\\""};
				return "'" + encodeURIComponent(oTmp || "").toString().replace(/([\r\n\t\b\f"])/gm, function (a, b) {
					return "\\" + k[b];
				}) + "'";
			}
		}
	}, o2json = function (oTmp1) {
		var k, aTmp = [];
		if ("object" == typeof oTmp1 && oTmp1) {
			for (k in oTmp1) {
				oTmp1[k] && aTmp.push("'" + k + "':" + fnTmp(oTmp1[k]));
			}
			return "\"{" + aTmp.join(",").replace(/([\r\n\t\b\f"])/gm, "\\$1") + "}\"";
		} else {
			return fnTmp(oTmp1);
		}
	}, fnRpcCall = function () {
		var params = _A(arguments), cbk = params[0], bAsync = "function" == typeof (cbk || ""), oRst = {};
		bAsync && params.shift();
		AJAX({url:this.url, bAsync:bAsync, data:"{\"allPms\":" + o2json(fnGetAllIpt()) + ",\"method\":\"" + this.methodName + "\",\"_id_\":\"" + this["_id_"] + "\",\"params\":" + (function (arg) {
			var b = [], szTp;
			for (var i = 0; i < arg.length; i++) {
				b.push(o2json(arg[i]));
			}
			return "[" + b.join(",") + "]";
		})(params) + "}", clbkFun:function () {
			try {
				eval("var oTmp = " + arguments[0]);
				if (null != oTmp && "object" == typeof oTmp) {
					if (Array == (oTmp["constructor"] || "")) {
						oRst = [];
						for (var i = 0; i < oTmp.length; i++) {
							if ("object" == typeof oTmp[i]) {
								_this.fnMakeObj(oTmp[i], oRst[i] = {});
							} else {
								oRst[i] = oTmp[i];
							}
						}
					} else {
						_this.fnMakeObj(oTmp, oRst);
					}
				} else {
					oRst = oTmp;
				}
				bAsync && cbk.apply(oRst, [oRst]);
			}
			catch (e) {
			}
		}});
		return oRst;
	};
	this.fnMakeObj = function (o, oRstObj) {
		var oT = oRstObj;
		o._name_ && (oT = (oRstObj[o._name_] = {}));
		for (var k in o) {
			if ("methods" == k) {
				for (var i = o[k].length - 1; i >= 0; i--) {
					oT[o[k][i]] = bind(fnRpcCall, {url:_this.url, methodName:o[k][i], "_id_":o["_id_"]});
				}
				delete o[k];
			} else {
				if (o[k] && "object" == o[k]["constructor"]) {
					o[k]["_name_"] = k, _this.fnMakeObj(o[k], oT);
				} else {
					oT[k] = o[k];
				}
			}
		}
	};
	if (obj) {
		for (var i = 0; i < obj.length; i++) {
			this.fnMakeObj(obj[i], _this);
		}
	}
	this.cacheObj = [];
	this.LoadJsObj = function (s) {
		if ("undefined" == typeof _this._LoadJsObj) {
			return this;
		}
		eval("var o = window." + s + ";");
		if (o) {
			return o;
		}
		try {
			o = _this.cacheObj[s] || (_this.cacheObj[s] = eval("1," + _this._LoadJsObj.getJsObj(s).getResult()));
		}
		catch (e) {
		}
		if (o) {
			if (o.init) {
				o = o.init();
			} else {
				if (Base) {
					for (var k in Base) {
						if (!o[k]) {
							o[k] = Base[k];
						}
					}
				}
			}
			_this.cacheObj[s] = o;
			eval("window." + s + "=o;");
		}
		return o;
	};
	this.getRpcObj = function (s) {
		return _this._LoadJsObj.getRpcObj(s);
	};
}
var rpc = JsonRpcClient(), XUI = function () {
	var o = "undefined" == typeof Base && rpc.LoadJsObj("Base") || Base, a = o.A(arguments).concat([o]), k, i, p = a[0];
	for (i = 1; i < a.length; i++) {
		for (k in a[i]) {
			if (!p[k]) {
				p[k] = a[i][k];
			}
		}
	}
	return p;
};var fnEC = function(event){var s = event.target.nodeName;if("INPUT" == s || "TEXTAREA" == s)return true;return "undefined" == typeof g_bMenu? false: g_bMenu};
$(window).bind("error",fnEC);
$(document.documentElement).bind("contextmenu",fnEC);
top.g_myTPWin = window.g_myTPWin = top.g_myTPWin || fnGetPWin();
try{if(!noPrint){
top.printWin = window.printWin = top.printWin  || (top.g_myTPWin.printWin || top.printWin || g_myTPWin.frames["prtFrm"]);
}top.mWin = window.mWin = top.mWin || g_myTPWin.frames["bottom_frame"];
}catch(e){}

function fnGetPWin()
{
  var w = window;
  try
  {
     if(w.g_myTPWin)return g_myTPWin;
      while(w.opener || w.dialogArguments)
      {
        w = (w.dialogArguments || w.opener || w).top;
        if(w.g_myTPWin)return w.g_myTPWin
       }
   }catch(e){}
   return w.top
}
var g_nfnLoadsts = new Date().getTime();
/* 显示加载状态 */
function fnLoadsts(b)
{
   $(document).ready(function(){
       if(333 > new Date().getTime() - g_nfnLoadsts)return;
	   if(b)fnShowMask();else g_nfnLoadsts = new Date().getTime(), fnHidMask();
   });
}
if(!noPrint && !noLockPage){
function doPrintWithDialog(){printWin.document.printApplet.doPrintWithDialog();}
function doPrintWithDialog(reportName){printWin.document.printApplet.doPrintWithDialog(reportName);}
function doPrintNoBKWithDialog(){printWin.document.printApplet.doPrintNoBKWithDialog()}
function doPrintNoBKWithDialog(reportName){printWin.document.printApplet.doPrintNoBKWithDialog(reportName)}
function doPrint()
{
   if(0 == arguments.length)printWin.document.printApplet.doPrint();
   else printWin.document.printApplet.doPrint(arguments[0]);
}
function doPrintNoBK()
{
   if(0 == arguments.length)printWin.document.printApplet.doPrintNoBK();
   else printWin.document.printApplet.doPrintNoBK(arguments[0]);
}

function doPrinterWithDialog(s){printWin.document.printApplet.doPrinterWithDialog(s);}
function doPrinterWithDialog(reportName,s){printWin.document.printApplet.doPrinterWithDialog(reportName,s);}
function doPrinterNoBKWithDialog(s){printWin.document.printApplet.doPrinterNoBKWithDialog(s)}
function doPrinterNoBKWithDialog(reportName,s){printWin.document.printApplet.doPrinterNoBKWithDialog(reportName,s)}
function doPrinter(arg,s)
{
   if(1 == arguments.length)printWin.document.printApplet.doPrinter(arg);
   else printWin.document.printApplet.doPrinter(arg,s);
}
function doPrinterNoBK(arg,s)
{
   if(1 == arguments.length)printWin.document.printApplet.doPrinterNoBK(arg);
   else printWin.document.printApplet.doPrinterNoBK(arg,s);
}

function doView()
{
   if(0 == arguments.length)printWin.document.printApplet.doView();
   else printWin.document.printApplet.doView(arguments[0]);
}
function doViewNoBK()
{
   if(0 == arguments.length)printWin.document.printApplet.doViewNoBK();
   else printWin.document.printApplet.doViewNoBK(arguments[0]);
}
}
/*
szProperty 需要更新的界面组件id，tab除外，不刷新界面就为null
szReqCode 需要执行的后台Action方法
szUrl 请求的url，默认为当前Form中的Action
szData 传递到后台的数据，默认为:input，也就是界面中所有输入对象的内容都传递到后台，aac098=23984&ak9098=sdfs
szDesId 被请求的页面中对象的id
isAsync是否异步的标志
*/
AjaxUpdateUi = function(){return Base.AjaxUpdateUi.apply(Base, Base.A(arguments))};
/* 
设置元素值，参数【元素property】
'xzd003'.getValue(); 
*/
String.prototype.getValue = function(){return Base.getValue(this)};
String.prototype.execGetAllInput = function(b){if(0 == arguments.length)return this.bGetAllInput; this.bGetAllInput = b;return this;};
/* 
设置元素值，参数【元素property, 替换值】
'xzd001'.setValue('100001');
*/
String.prototype.setValue = function(s){return Base.setValue(this, s)};
/*
获得指定对象，参数【元素property】
var colorObj = "color4".getObj();
*/
String.prototype.getObj = function(s){return Base.getObj(this)};
/*
设置焦点，参数【元素property】
'dto(xzd003)'.setFocus();
将元素设置是否只读，参数【元素property, 是否为只读】
'xzd003'.setReadOnly(); 
'xzd003'.setReadOnly(false);
*/
String.prototype.setReadOnly = function(b){if("BUTTON" == $("#" + this).attr("nodeName"))return b || undefined == b ? this.disabledButton() : this.enabledButton();else return Base.setReadOnly(this, b)};
/* 
将按钮设置是否可用
"addButton".enabledButton();
"addButton".disabledButton();
将页面元素改为是否必选，参数【元素property】
'xzd001'.addRedStar();
'xzd001'.delRedStar();
*/
$("enabledButton,disabledButton,addRedStar,delRedStar,showObj,hideObj".split(",")).each(function(){
    var _this = this;
    String.prototype[this] = function(){
        var _t = this;
        $(document).ready(function(){
			return Base[_this](_t);
		});
	};
});
String.prototype.focus = function(){return this.setFocus()};
String.prototype.setFocus = function(s){return Base.setFocus(this,s)};

/* 
检查页面元素，参数【需要检查的元素(如不传入全部检查)】
if(Base.validateForm('yka339,yka096')){
	……
    alert('通过');
}else{
	……
    alert('未通过');
}
*/
String.prototype.validateForm = function(){return Base.validateForm(this)};
/*
检查checkbox是否选中
if('myDataGridId'.swf().isChecked()){
    ……
}else{
   alert('请勾选你要删除的数据！');
}
*/
String.prototype.isFunc = function(f)
{
   if(!this.swf() || "function" != typeof this.swf()[f])return alert(this + "." + f + " \u7ec4\u4ef6: \u8fd8\u672a\u521d\u59cb\u5316\u5b8c\u6210\uff0c\u8bf7\u7a0d\u7b49"),false;
   return true;
}
String.prototype.isChecked = function(){if(this.isFunc('isChecked'))return this.swf().isChecked()};
/*
针对页面表格区域异步刷新(特点：不走jsp标签解析，效率高)
Base.doUpdateCollection(szCollectionId, szData, szReqCode)
szCollectionId： 表格的id
szData：传递到后台的数据(默认为:input)
szReqCode：请求的ReqCode(reqCode不传递默认为DataGrid组件中指定的reqCode)
*/
String.prototype.doUpdateCollection = function(){return Base.doUpdateCollection.apply(Base, [this, ":input"].concat(Base.A(arguments)))};
/*
JsonRpc异步方法(特点：不走jsp标签解析，效率高)

	1、实现异步方法的类需要继承com.yinhai.xui.base.common.YHBaseJsonRpc或实现接口implementsIJsonRpcObject,Serializable。
	2、实现异步方法的类的包路径为，免注册默认包名：jcore.jsonrpc.rpcobj 
	   (若非默认包下注册，在Action中注册：jcore.jsonrpc.common.JsonRpcRegister.registerObject(us, "XRpc", XRpc.class);)
	3、在js中调用异步：rpc.类名.方法名(参数);
		【java类代码】
		package jcore.jsonrpc.rpcobj;
		public class XRpc extends YHBaseJsonRpc {
			……
			public Object getFltCodeList(String s, Map m){
				……
	           return Object;
			}
			……
		}
		【javascript调用】
		var obj = rpc.XRpc.getFltCodeList("YAB109", {aac001:"1001",aac003:"张三"});
		alert('张三的年龄为：' + obj['age']);
		【web配置】
		<servlet>
	   <servlet-name>CommonHttpServlet</servlet-name>
	   <servlet-class>com.yinhai.xui.servlet.CommonHttpServlet </servlet-class>
	   <load-on-startup>3</load-on-startup>
	    </servlet>
		<servlet-mapping>
	   <servlet-name>CommonHttpServlet</servlet-name>
	   <url-pattern>/CMHS</url-pattern>
	    </servlet-mapping>
普通异步的刷新，针对panel、form、grid、各种输入对象
	Base.AjaxUpdateUi(szProperty, szReqCode, szUrl, szData, szDesId, isAsync)
	szProperty 需要更新的界面组件id，tab除外，不刷新界面就为null
	szReqCode 需要执行的后台Action方法
	szUrl 请求的url，默认为当前Form中的Action
	szData 传递到后台的数据，默认为:input，也就是界面中所有输入对象的内容都传递到后台，aac098=23984&ak9098=sdfs
	szDesId 被请求的页面中对象的id
	isAsync是否异步的标志
	<xui:selectInput key="数据多下拉" onchange="Base.AjaxUpdateUi(null,'myForm')" property="mymaxSlct" id="mySlctFltTst" collection="YAE049"/>
针对property、id的tab对象进行异步方法
	Base.AjaxTab(tabid, reqCode, url, data, destid)
	tabid table页的id
	reqCode action中的方法名
	url 请求的url
	data 请求的数据，如没有数据为null
	destid 异步请求内容的id
	<xui:tab key="部门管理" id="departList" onclick="Base.AjaxTab('departList', 'list', '/system/security/departList.do', null, 'departLists');" />
对列表指定的行数据进行更新，参数【更新的对象数据，行号】
'myDataGrieTest'.fnUpdateRow({aac004:'234',age:999}, 1);
选中列表单行，参数【行号，更新数据(没有就为null)，是否选中】
'myDataGridId'.fnCheckedRow(1, null);
'myDataGridId'.fnCheckedRow(1, {aac001:'100001'}, true);
对列表中单行数据进行删除，参数【行号】
'myDataGrieTest'.fnDeleteRow(2);
将checkbox全部选中
"myDataGridId".fnCheckedAll(true);
"myDataGridId".fnCheckedAll(false);
设置checkbox、radio点击前调用的js方法，setCheckMethod参数【js方法名】，myJsFuncName【行数据,当前的选择状态,是否为全选】
'myDataGrieTest'.setCheckMethod("myJsFuncName");
function myJsFuncName(o, bOldCheckFlag, bCheckAllFlg)
{
    ……
    return false;
}
获取列表选择行数，返回对象数组
var rowArray = "myDataGridId".fnGetChckAllRows();
*/
String.prototype.fnGetChckAllRows = function(){var o;if(this.isFunc('fnGetChckAllRows'))return (o = this.swf()).fnGetChckAllRows.apply(o, Base.A(arguments))};
String.prototype.fnGetHighlightRows = function(){var o;if(this.isFunc('fnGetHighlightRows'))return (o = this.swf()).fnGetHighlightRows()};
/*
设置编辑前的回调函数，如果该函数返回false则该行不允许编辑，参数【js方法名】
'myDataGrieTest'.setBfEditCbk("myJsFuncName");
根据业务规则控制单元格的可编辑状态
function myJsFuncName(o, szCurFldName)
{
   每行都有隐藏属性"_rowId_"，当前行号
   if(szCurFldName != "jcp002")return true;
   包含肉的才允许编辑
   return (-1 < o.jcp002.indexOf("肉")); 
}
对列表单行数据进行增加，参数【行数据】
'myDataGrieTest'.fnAddRow({aac002:324,aack03:'sdf'});
*/
String.prototype.updateColCodeTb = function(){
  var o, _t = this, a = arguments;
   Base.regTimer(function(){
    o = _t.swf();
    if("function" == typeof o['updateColCodeTb'])
       return o.updateColCodeTb.apply(o, [a[0]].concat(a[1])), true;
    return false;
    }); 
};
/*
对列表中的数据进行过滤，参数【过滤条件输入对象，列名(过滤对象)】
'mydataGridId'.setFilterExpression (this,'xzd001')
*/
String.prototype.setFilterExpression = function(o1, s){
   if(2 == arguments.length)
   {
      var a = s.split(/[,;\s]/g), b = [], i = 0;
      if(o1.value.trim())
      for(; i < a.length; i++)
        b.push(a[i] + " && -1 < String(" + a[i] + ").indexOf('" + o1.value + "')");
      return this.setFilterExpression(b.join("||"));
   }
   var o;
   if(window["XTDataGrid"] && (o = XTDataGrid.getXTDataGrid(this)))
   {
       o.setFilterExpression(o1);
       return true;
   }
   return (o = this.swf()).setFilterExpression.apply(o, Base.A(arguments))
};
/*
获取列表行数据，参数【行号(为-1返回所有数据)】
var o = 'myDataGrieTest'.getData(1);
*/
String.prototype.getData = function(){var o;if(this.isFunc('getData'))return (o = this.swf()).getData.apply(o, Base.A(arguments))};
/*
当表格数据加载完成后调用js方法，setDataCmpltCbk参数【js方法名】，调用方法参数【当前页数据记录数，列表组件的ID】
'myDataGrieTest'.setDataCmpltCbk("myJsFuncName");
function myJsFuncName(n, id)
{
	……
}
*/
String.prototype.setDataCmpltCbk = function(){
	var o, _arg = arguments, _t = this;
	window[_t + "_dcmlt_fn"] = "function" == typeof _arg[0] ? _arg[0] : null;
	window[_t + "setDataCmpltCbk"] = "string" == typeof _arg[0] ? _arg[0]: (_t + "_dcmlt_fn");
	$(document).ready(function(){
	   Base.regTimer(function(){
	    var obj = _t.swf();
	    if(obj && "function" == typeof obj.getDataCnt && "function" == typeof obj.getDataCpltFlg && obj.getDataCpltFlg())
	    {
	        try{eval(window[_t + "setDataCmpltCbk"] + "(" + obj.getDataCnt() + ", '" + _t + "');");}catch(e){}
	        return true;
	    }
	    return false;
	   }, 777);
	});
};

/*
   数据加载完后，执行指定的代码片段
   "mygood".setQueryCmpltCheckCbk("if(5 < n)alert('good: ' + n);");
*/
String.prototype.setQueryCmpltCheckCbk = function(s){
    this.setDataCmpltCbk(function(n, id){
       new Function('n', 'id', s)(n, id);
	});
};
/*
获取列表选择行数，返回行数
var rowNum = "myDataGridId".fnGetChckNm();
*/
String.prototype.fnGetChckNm = function(){var o;if(this.isFunc('fnGetChckNm'))return (o = this.swf()).fnGetChckNm.apply(o, Base.A(arguments))};
/*
设置列表中列的隐藏或显示，参数【列名，是否隐藏】
"myDataGridId".fnHidCol("xzd003", true);
改变默认reqCode方法，参数【方法名】
'myDataGrieTest'.setReqCode('delete');
'myDataGrieTest'.setDelCbk("fnMyDelCbk");
*/
$("setClickCbk,setNoCopy,setClctAndBtn,setStyle,scrollToIndex,fnCheckedAll,setReqCode,setDelCbk,clearData,setDataChgCbk,setCbk,fnHidCol,fnDeleteRow,fnAddRow,setBfEditCbk,fnSetAdvcDg,setCheckMethod,fnUpdateRow,fnCheckedRow".split(",")).each(function(){
    var _this = this;
    String.prototype[this] = function(){
		var  _arg = arguments, _t = this;
		$(function(){
		   Base.regTimer(function(){
		   var obj  = _t.swf();
		   if(obj && "function" == typeof obj[_this])
		      return obj[_this].apply(obj,_arg),true;
		    return false;
		   });
		});
	};
});

/*表格数据修改后进行回调的示例，其中type的值传入有：add,move,refresh,remove,replace,expand,reset,update 
function fnDataChgCbk(aDatas, type)
{
   top.alert("数据影响记录数(删除的时候会大于1)：" + aDatas.length);
   var o = aDatas[aDatas.length - 1];
   for(var k in o)
   {
       top.alert(k + " = " + o[k]); // 为2的才允许编辑
       o[k] = 2;
   }
   return aDatas;
}*/
/* 其中type的值传入有：add,move,refresh,remove,replace,expand,reset,update */
/* 
设置表格数据修改后回调的函数，参数【js方法名】
'myDataGrieTest'.setDataChgCbk("myJsFuncName");
function myJsFuncName(o, t)
{
   if("update" != t || !o)return false;
   if(0 < (o.jcp002 = String(o.jcp002).trim()).length)
   {
      var bRst = MyZw.updateXTCP01(o.jcp002, Number(o.jcp001));
      var sErr = MyZw.getErrMsg();
      if(sErr)alert(sErr);
      else if(bRst) alert("保存成功");
    }
    return o;
}
*/
/*
获取列表数据(必须在数据加载完后获取，否则数据记录数不真实)
var listdata = 'myDataGrieTest'.getDataCnt();
*/
String.prototype.getDataCnt = function(){var o;return (o = this.swf()).getDataCnt.apply(o, Base.A(arguments))};
/*
清空列表数据
'myDataGrieTest'.clearData();
*/

/* 单文件上传: 设置成功上传后回调的js方法名 */
/* 单文件上传: 检查是否已经选择了文件，并返回选择的文件名 */
String.prototype.getUpFlNm = function(){return Base.getObj("_" + this + "S").val()};
/* 单文件上传: 检查是否已经上传了选择了文件，并返回上传成功的文件名 */
String.prototype.isUpFl = function(){return Base.getObj("_" + this + "S_]").val()};

/* 清除指定区域中所有输入对象的值,bRvFlg为真就排除szFlt中指定的字段不清除，否则只清除szFlt指定的字段 */
function fnClear(szId, szFlt, bRvFlg)
{
   if("undefined" == typeof bRvFlg)bRvFlg = false;
   if("undefined" == typeof szFlt)szFlt = "";
   var obj = $("#" + szId).find(":input[type!=button]");
   if(bRvFlg)
	   obj.each(function(){
	      if(szFlt && -1 < szFlt.indexOf(this.name))return this;
	      var o = $(this);
	      if("radio" == o.attr("type") || "checkbox" == o.attr("type"))
	          o.attr("checked", false);
	      else o.val("")
	   });
   else 
   obj.each(function(){
          if(szFlt && -1 == szFlt.indexOf(this.name))return this;
	      var o = $(this);
	      if("radio" == o.attr("type") || "checkbox" == o.attr("type"))
	          o.attr("checked", false);
	      else o.val("")
	   });
}

/* 双击拷贝当前单元格数据 .... onclick="mycp"*/
function mycp(o, s)
{
   /*window.clipboardData.setData("Text", o[s]);*/
   return o;
}

function validateForm(s){return Base.validateForm(s)};
function fsubmit(){return Base.fsubmit()};
function dpsubmit(){return Base.fsubmit(0,window,true)};
function showDialog(s, w, h)
{
   return window.open(s, '', "width=" + w + ",height=" + h);
}
/* 建立下拉树
fn   创建树的函数
szTrId 树id
v 树的输入值
b 必输项标志
iptId 输入框 ID
oStyle 包含图层宽高
 */
function fnCrtPopTreeSelect(fn, szTrId, v, b,iptId,oStyle)
{
  fn();
  window[szTrId+"slctFlag"]=true;
  window[szTrId+"slctIptId"]=iptId;
  SelectTree.initSlctTree(szTrId,oStyle);
/*
	(window[szTrId + "_ext"] = new Ext.form.ComboBox({  
	    store:new Ext.data.SimpleStore({fields:[],data:[[]]}),  
	    editable:true,  
	    mode: 'local',  
	    name:"dto(" +szRdId + "_d)",
	    value: v || '',
	    allowBlank:!b,
	    forceSelection:true,  
	    triggerAction:'all', 
	    maxHeight: 200,  
	    tpl: '<div style="height:200px"><div id="' + szTrId + '"></div></div>',
	    selectedClass:'',  
	    onSelect:Ext.emptyFn  
	})).render(szRdId);
	var oW = $("#" + szRdId + " div.x-form-field-wrap"), w = oW.width(),oIpt;
	if(36 < w)
	(oIpt = oW.width(w  - 36).find(":input")).css("width", "100%");
	*/
	 /*
	 $(oIpt[0]).focus(function(){$(this).next().click();});
    $(oIpt[0]).focus(function(){
	     // window[szTrId + "_ext"].onTriggerClick(false);
	     // window[szTrId + "_ext"].expand();
	     // window[szTrId + "_ext"].fireEvent('expand', window[szTrId + "_ext"]);
	 });*/
	 /*
	 if(oIpt && 0 < oIpt.length)
	$(oIpt[0]).change(function(){$($("#" + szRdId).parent().find(":input")[1]).val("")});
	fnInitPopTree(fn, szTrId, w - 19, oW);
	*/
}

/* 初始化下拉树 */
function fnInitPopTree(fn, id, w, o)
{
   Base.regTimer(function(){
        if(null == document.getElementById(id))return false;
        fn();
        $("#" + id).width(w).parent().parent().width(w).parent().width(w);
        return true;
   }, 777);
}
/* 下拉树选择的时候调用 */
function ckt(szIptNm, v, szDesc, szTrId)
{
   szIptNm.setValue(v);
   var o = $("#" + szTrId),oIpt = o.next(":input:first");
   if(szDesc != oIpt.val())oIpt.val(szDesc),oIpt.change();
   setTimeout(function(){
   o.hide();
   window.nxtfcs(null, o[0]);
   },13);
}

function reset(){document.forms[0].reset()}
function cpyobj(o, o1)
{
    if("undefined" == typeof window[o] || !window[o])window[o] = {};
    if(o1 && o1['orgId'] && o1['data'])
    {
        var a = [], k, b = o1.data;
        for(k = 0, j = b.length; k < j; k++)
        {
            a.push({"validFlag": b[k][0], "py": b[k][1], "codeValue": b[k][2], "codeDESC":  b[k][3], "orgId": o1.orgId, "codeTypeDESC": o1.codeTypeDESC,"codeType":o1.codeType});
        }
        window[o] = a;
    }
    else if(0 < (o1['length'] || 0))window[o] = o1;
    else for(var k in o1){if(-1 == "each,indexOf".indexOf(k))window[o][k] = o1[k];}
    return window[o];
}

/*
   获取指定输入对象前的描述
   fnGetLabel(szProperty);
   fnGetLabel(szId);
*/
function fnGetLabel(s)
{
    var o = document.getElementById("label_" + s);
    if(o)return o.innerText.replace(/^\s*\**/, "");
    else 
    {
       o = document.getElementById(s);
       if(o)return o.innerText.replace(/^\s*\**/, "");
    }
    o = document.getElementsByName(s);
    if(0 == o.length)o = document.getElementById(s);
    if(o)
    {
        if("DIV" == o.nodeName)return o.innerText.replace(/^\s*\**/, "");
        if("INPUT" == o.nodeName || "TEXTAREA" == o.nodeName)return o.parentNode.parentNode.innerText.replace(/^\s*\**/, "");
    }
    return "";
}

/**
 * 刷新指定区域所有旧值
 * @param {Object} szId
 * @param {Object} bCrtHidIpt
 */
function uptAOlData(szId, bCrtHidIpt)
{
    window.g_aOlds = new Object({});
    $(document).ready(function(){
          setTimeout(function(){
             var o, o1, o2,o3;
			 o3 = "string" == typeof szId && $("#" + szId)[0] || $(szId)[0];
			 o3 = $(o3).find(":input");
			 if(o3 && 0 < o3.length)
             o3.each(function(){
                if(this.name){
					if( this.type!="button") {
							/* 字段名，描述，新值(下拉描述)，旧值(下拉描述)(,下拉列表新值，旧值) */
							g_aOlds[this.name]={};
							g_aOlds[this.name]={
							desc:$((o = $(Base.p(this, "DIV"))).parent("div")).find("label").text().replace(/^\s*\**/, ""), 
							val:this.value,
							sel_desc:$(this).parent().find("input[type='text']").attr("id") && Select.getDescByValue(this.value,$(this).parent().find(":input[type='text']").attr("id")) || null,
							checked:this.checked
							};
						  bCrtHidIpt && (this.name + "_old").setValue(this.value);
					}
				}
             });
          }, 13);
    });
}
/**
 * 取得指定区域内的有变化的值。
 * @param {Object} szId
 */
function getAllchgData(szId){
	var oData = window.g_aOlds,o3,chgData = {};
			 o3 = "string" == typeof szId && $("#" + szId)[0] || $(szId)[0];
			 o3 = $(o3).find(":input");var chk,oChk,isChk=false;
			 if(o3 && 0 < o3.length)
             o3.each(function(){
			 	if (this.name) {
			 	try{chk = this.checked;}catch(e){chk = false;}
			 	try{oChk = oData[this.name]["checked"];}catch(e){oChk = false;}
			 	if(this.type=="checkbox" || this.type=="radio") isChk = true;
			 		if(this.type!="button"){
					if (null != oData[this.name] && ((isChk && chk != oChk) || (this.value != oData[this.name].val))) 
						chgData[this.name] = {
							o_desc: oData[this.name]&&oData[this.name]["desc"] || null,  
							n_desc: $((o = $(Base.p(this, "DIV"))).parent("div")).find("label").text().replace(/^\s*\**/, ""), 
							o_val: oData[this.name]&&oData[this.name]["val"] || null, 
							n_val: this.value, 
							o_sel_desc: oData[this.name]&&oData[this.name]["sel_desc"] || null, 
							n_sel_desc: $(this).parent().find("input[type='text']").attr("id") && Select.getDescByValue(this.value, $(this).parent().find(":input[type='text']").attr("id")) || null 
						};
						
			 		}
			 	}
			 });
	return chgData;
}
function fnAct()
{
	try{
	 if(!window.event)return;
     var oTp = fnGetPWin() || top, bMs = "mousemove" == event.type;
	 if(oTp.fnLocks && !oTp.fnLocks.bLc)
	 {
	   if(bMs)
	   {
	      if((fnAct.x || fnAct.y) && fnAct.x == event.x && fnAct.y == event.y)return false;
	      fnAct.x = event.x, fnAct.y = event.y;
	   }
	   var nCur = new Date().getTime();
	   if(nCur - oTp.g_nLockTim > 5000)
  	      oTp.status = (bMs ? "鼠标事件" : "键盘事件") + "  激活系统于 " + oTp.g_nLockTim;
	   oTp.g_nLockTim = nCur;
	 }
  }catch(e){}
}
$(document).keydown(fnAct).mousemove(fnAct);
/* maxlength的统一检查，主要是对汉字长度的检查 */
$(document).click(function(event){
	var o = event.target;
	if(o.type && o.readOnly && (o.type == "text" || o.type == "textarea"))window.clipboardData.setData("text",o.value);
}).keydown(function(e){
if(e && 8 == e.keyCode)
{
	var s = $(document.activeElement || this).attr("nodeName");
	if("INPUT" == s || "TEXTAREA" == s)return true;
	return false;
}return true;
}).ready(function(){try{
		//$(":input[type=text][radyonly]")
		
     fnGetPWin().g_nLockTim  = new Date().getTime();
      if("undefined" != typeof g_szJsessionid)'jsessionid'.setValue(g_szJsessionid);
      if(window.opener)window.focus();
     if("undefined" != typeof g_szJsessionid)$.cookie("jsessionid", g_szJsessionid);
     /* 右键 */
     window.fnRightClick = function(){
     if("undefined" != typeof g_bMenu && !g_bMenu)
       $("object").each(function(){
         if(this.id){RightClick.init(this.id.substr(0, this.id.length - 1))}
        })};window.fnRightClick();
     
      /* 模式窗口自适应大小处理 */
     if("undefined" != typeof g_bNoAutoResize && !g_bNoAutoResize)
     Base.regTimer(function(){
        var w = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - 10,
              h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        var d = document.body.getBoundingClientRect();
        if(window.dialogHeight)
        document.body.scroll='no',window.dialogHeight = h + "px",
        w > parseInt(window.dialogWidth) && (window.dialogWidth = w + "px");
        return false;
     }, 777);
     /* 新旧值的处理 */
	 if(hvOldVl)uptAOlData(document, false);
     /* form对象 */
     window.form = document.forms[0];
     setTimeout(function(){
	     $("label").each(function(){
	         var t = this;
	         setTimeout(function(){try{t.parentNode.title = t.innerText;}catch(e){}/*$(t).bt(t.innerText, {positions: ['bottom','top'] })*/}, 13);
	     });
      var iCnt=1;
     $(":input").focus(fnFcs).each(function(){
	 	if(this.type=="checkbox" || this.type=="radio"){
			var id = this.id || this.name+this.type+(iCnt++);
			this.id = id;
			var _l =$(Base.p(this, "DIV")).parent("div").find("label");
			_l.attr("for",id);_l.css("cursor","hand");
		}else $(this).attr("autocomplete", "on");
	 }).filter("[maxlength]").each(function(){
         var obj = $(this);
         if("hidden" != obj.attr('type') && !obj.attr('readonly') && !obj.attr('disabled') && (obj.attr("name") || obj.attr("id")))
         {
              var o = $(this);
              if(0 < o.attr("maxlength"))
              o.blur(function(){
                    if(window.g_fcinIpt)return true;
                    window.g_fcinIpt = true;
                    var o = $(this), s = o.val().trim(), l = o.attr("maxlength"),l2;
                    if((l2 = s.replace(/[^\u00-\uff\-: \.a-zA-Z0-9]/gm,"dd").length) > l)
                    {
                       window.g_fcsfld = o.attr("name") || o.attr("id");
                       alt("输入的一个汉字长度等于两字节\n\n你输入的长度(" + l2 + "字节)不能大于系统设置的： " + l + "字节");
                       o.focus();
                     } 
                    return window.g_fcinIpt = false;
              });
         }
     });
     }, 777);
     }catch(e){}
}).click(function(e){
    var s = e.target.nodeName, id= e.target.id || '';
    if(-1 == 'INPUT,SELECT'.indexOf(s))
        hdAll.start();
});

$.fn.selection = function (start, end) {
	if (start !== undefined) {
		return this.each(function () {
			if (this.createTextRange) {
				var selRange = this.createTextRange();
				if (end === undefined || start == end) {
					selRange.move("character", start);
					selRange.select();
				} else {try{
					selRange.collapse(true);
					selRange.moveStart("character", start);
					selRange.moveEnd("character", end);
					selRange.select();}catch(e){}
				}
			} else {
				if (this.setSelectionRange) {
					this.setSelectionRange(start, end);
				} else {
					if (this.selectionStart) {
						this.selectionStart = start;
						this.selectionEnd = end;
					}
				}
			}
		});
	}
	var field = this[0];
	if (field.createTextRange) {
		var range = document.selection.createRange(), orig = field.value, teststring = "<->", textLength = range.text.length;
		range.text = teststring;
		var caretAt = field.value.indexOf(teststring);
		field.value = orig;
		this.selection(caretAt, caretAt + textLength);
		return {start:caretAt, end:caretAt + textLength};
	} else {
		if (field.selectionStart !== undefined) {
			return {start:field.selectionStart, end:field.selectionEnd};
		}
	}
};
/* 获取下拉列表缓存数据 */
function getCCLst(szId, szClct)
{
   Base.regTimer(function(){
        if(!window.g_myTPWin || !window.slctIptData[szId])return false;
        var oW = g_myTPWin.frames["topFrame"];
        g_myTPWin["AllAppCd_"] || (g_myTPWin["AllAppCd_"] = {});
        g_myTPWin["AllAppCd_"][szClct] = g_myTPWin["AllAppCd_"][szClct] || oW.XtZPS.getAppCode(szClct);
        window.slctIptData[szId]["collection"] = g_myTPWin["AllAppCd_"][szClct];
        return true;
   }, 13);
}
/* 获取码表 */
function getCCAppCode(szClct)
{
        var oW = g_myTPWin.frames["topFrame"];
        g_myTPWin["AllAppCd_"] || (g_myTPWin["AllAppCd_"] = {});
        return g_myTPWin["AllAppCd_"][szClct] = g_myTPWin["AllAppCd_"][szClct] || oW.XtZPS.getAppCode(szClct);
}
/*码表转换*/
function ac2L(szClct)
{
        var i,j,a = getCCAppCode(szClct), o = [];
        if(a)for(i = 0, j = a.length; i < j; i++)o.push([a[i]['codeValue'], a[i]['codeDESC']]);
        return o;
}

/* 获取缓存码表的对象 */
function getCcObj()
{
   var id = 'ccCodeListS';
   if(!g_myTPWin)return null;
   try{return window.g_myTPWin.frames["topFrame"].XtZPS;}catch(e){}return null;
}
/* 显示设置flash缓存的界面 */
function fnShowSetShare()
{
    if(window.g_swfShare && window.g_swfShare.isShow())return ;
    var s = getCcObj();
    if("undefined" != typeof Ext)
    window.g_swfShare || (window.g_swfShare = new Ext.Window({
         html: s.outerHTML,
         width:350,
         height:280,
         minWidth:220,
         minHeight:150,
         layout: "fit",
         title: "\u8bf7\u4e3a\u672c\u7cfb\u7edf\u8bbe\u7f6e\u65e0\u9650\u5236\u7684\u7f13\u5b58\u7a7a\u95f4"
      }));
      window.g_swfShare.show();
      
      Base.regTimer(function(){
        var o = 'ccCodeList'.swf(); 
        if(!o)return false;
        if("function" == typeof o.showSettings)o.showSettings();
        return true;
   }, 13);
}

/* 从本地缓存中获取过滤后的下拉列表数据 */
function getFltCodeList(sClc, szFltReg, szFldName, bFlg)
{
   if("undefind" == typeof bFlg)bFlg = true;
   if("undefind" == typeof szFldName)szFldName = "codeValue";
   if("undefind" == typeof szFltReg)szFltReg = "";
   var s = getCcObj();
   if(s && "function" == typeof s.getFltCodeList)
   {
      s = s.getFltCodeList(sClc, szFltReg, szFldName, bFlg);
      return s;
    }
    return (rpc.XRpc || rpc.getRpcObj("jcore.jsonrpc.rpcobj.XRpc")).getFltCodeList(sClc, szFltReg, szFldName, bFlg);
}
/* 整理下拉列表数据:allowEdit,valueField,displayFields,displayWidth,selectCallBack,collection */
function fnMkSlctDt(a)
{
   return {allowEdit:a[0], valueField:a[1], displayFields:a[2],displayWidth:a[3], selectCallBack:a[4], collection:a[5],filterFields:6 < a.length ? a[6] : null};
}
window.hdAll = {start:function(){
       /* 隐藏下拉、日期图层 if(-1 == "_Xui_SelectDiv,_Xui_DatePicker".indexOf(id))*/
       {$("#_Xui_SelectDiv").hide();$("#_Xui_DatePicker").hide();}
    },
    push:function(fn)
    {
       var f = this.start;
       this.start = function()
       {
          f();
          fn();
       };
    }};
/* 更新指定的码表 */
function fnUpDtCodeTable(s)
{
   var obj = getCcObj();
    setTimeout(function(){if(obj && "function" == typeof obj.getCodeList)obj.getCodeList(s)},13);
    return obj;
}
/* 生成flash代码，避免输出大量html代码、避免ie7显示“激活ActiveX” */
function fnMkSwf(id, s, p, w, h, nm)
{
   $(document).ready(function(){
   nm || (nm = id + "S");
   p || (p = "");
   w || (w = "100%");
   h || (h = "100%");
   var k = contextPath + "/skin/" + s + ".swf?" + p;
   $("#" + id).html(['<object type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="', contextPath,'/skin/swflash.cab#version=10,0,0,0" width="', w,'" height="', h,'" id="', nm, '" align="top">',
'<param name="allowFullScreen" value="true">',
'<param name="menu" value="false">',
('null' != p ? ('<param name="FlashVars" value="' + p + '">') : ''),
'<param name="allowScriptAccess" value="always">',
'<param name="loop" value="false">',
'<param name="movie" value="', k,'">',
'<param name="SeamlessTabbing" value="true">',
'<param name="wmode" value="opaque">',
'<embed allowFullScreen="true" menu="false" allowScriptAccess="always" loop="false" src="', k,'" SeamlessTabbing="true" wmode="opaque" width="', w,'" height="', h,'" name="', nm, '" align="top" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer_cn" />',
'</object>'].join(''));
});
}
$.fn.tip = function(s)
{
    if(!s)return this;
    var id = "_tipMsg_", obj = $("#" + id);
	if(0 == obj.length)
	{
		$("body").append("<div id=" + id + " class='ErrTip'></div>");
		obj = $("#" + id)
	}
	obj.html(s);
	var oPos = this.position();
	if(0 < oPos.left)
	{
	obj.show();
	obj.css({left:oPos.left + "px", top: (oPos.top - obj.height()) + "px"});
	}else obj.hide();
	return this;
}
/* 隐藏tipMsg */
function HidTip(){$("#_tipMsg_").hide()}

/* 转换DataGrid中点击行的数据 */
function cvtRowObj(o)
{
   var k, o1,b1;
   for(k in o)
   {
      o1 = o[k];
      if(o1 && "object" == typeof o1 && o1.hasOwnProperty("time") && o1.hasOwnProperty("fullYear"))
      {
          var m = o1['month'] + 1, d = o1['date'];
          m <= 9 && (m = "0" + m);
          d <= 9 && (d = "0" + d);
          o[k] = [o1['fullYear'], m, d].join("-");
          if(0 < parseInt(o1['hours']) && 0 < parseInt(o1['minutes']) && 0 < parseInt(o1['seconds']))
             o[k]  = o1 = o1 + " " + [o1['hours'] || 0, o1['minutes'] || 0, o1['seconds'] || 0].join(":") + "." + (o1["milliseconds"] || 0);
      }
   }
   return o;
}

/* 封装从大数据组件行数据（DataGrid）拷贝数据到表单中,
o 行数据对象
s 正向过滤的字段名（除开这些字段都复制内容到输入对象中），反向过滤则只负责这些字段
b 反向过滤时的标志，默认为false 
*/
function cpRow(o, s, b)
{
   var k, o1,b1;
   if("undefined" != typeof s)s = s.split(/[,;]/);
   else s = [];
   if("undefined" == typeof b)b = false;
   for(k in o)
   {
      o1 = o[k];
      if(o1 && "object" == typeof o1 && o1.hasOwnProperty("time") && o1.hasOwnProperty("fullYear"))
      {
          o[k]  = o1 = [
          o1['fullYear'], 
          o1['month'] + 1 <= 9 ? "0"+(o1['month'] + 1):o1['month'] + 1, 
          o1['date'] <= 9 ? "0"+o1['date'] : o1['date']
          ].join("-");
          if(0 < o1['hours'] && o1['hours'] && o1['minutes'] && o1['seconds'] && o1["milliseconds"]){
	          	 var hh =o1['hours'] || 0 , mm = o1['minutes'] || 0, ss = o1['seconds'] || 0;
	             o[k]  = o1 = o1 + " " + [
	             hh <=9 ? "0"+hh:hh,
	             mm <=9 ? "0"+mm:mm,
	             ss <=9 ? "0"+ss:ss
	             ].join(":") + "." + (o1["milliseconds"] || 0);
             }
      }
      b1 = -1 == s.indexOf(k) && -1 == s.indexOf("dto(" + k + ")");
      if( null != o1 && "" != o1 && ((!b && b1) || (b && !b1)))
        k.setValue(o1);
   }
   return o;
}

/* checkbox、radio在只读、禁用的时候嵌套的函数 
   修复retun false导致将之前的状态消除
*/
function fnCrCheck(fn, o)
{
    var o1 = $(Base.p(Base.p(o, "DIV"), "DIV")), s = o.name.replace(/\)|\(/gm,"_") + "__", o2 = document.getElementById(s);
    if(o1.hasClass("readOnly"))return o2 && o.name.setValue(o2.value),false;
    s.setValue(o.value);
    return fn.apply(o);
}

/* URL跳转 */
function fnUrl(s)
{
   if(-1 < s.indexOf("?"))s += "&";
   else s += "?";
   s += "jsessionid=" + g_szJsessionid;
   window.location = s;
}
function fnAddOnload(o)
{
   $(document).ready(function(){
      if("function" == typeof o)o();
      else eval(o);
   });
}
var g_nDelay = 1, g_nLstTm = 0,g_nMaskCnt = 0,g_oLstfcs = null;
/* 蒙层 width:4000px;height:4000px; onclick=fnHidMask() */
if("undefined" != typeof g_sysInfo)
{
var g_oMask = null;
function fnShowMask()
{
   if(!g_oMask)
   {
      g_oMask = document.createElement("<div style='vertical-align:middle;text-align:center;left:0;top:0;background-color:#eeeeee;z-index:999999999;display:none;position:absolute;-moz-opacity:0.85;opacity:0.85;filter:alpha(opacity=85)'></div>");
      if(noLockPage){g_oMask.innerHTML = "<span style='font-size:250%!important;font-weight:bold;position:relative;top:40%;-moz-opacity:1;opacity:1;filter:alpha(opacity=100);color:red'>交互处理中<br><b id=myglld style='position:relative;top:-180px'></b></span>";}
     else{g_oMask.innerHTML = "<span style='font-size:250%!important;font-weight:bold;position:relative;top:40%;-moz-opacity:1;opacity:1;filter:alpha(opacity=100);color:red'>交互处理中<br><img style='position:relative;top:-180px' src=" + g_sysInfo[2] + "loading2.gif></span>";}
if(document.body)document.body.appendChild(g_oMask);
   }
   if(!g_oMask || !g_oMask.style)return;
  g_nLstTm = new Date().getTime();
  g_nMaskCnt = 1;
  var g_oW = $(window);
  g_oMask.style.width = g_oW.width() + "px",g_oMask.style.height = g_oW.height() + "px";
  setTimeout(function(){
      if(2 != g_nMaskCnt && new Date().getTime() - g_nLstTm >= g_nDelay * 1000)
      {
		  g_oMask.style.display = "block";
		  g_oMask.scrollIntoView();
		  document.body.scroll = 'no';
		  g_oLstfcs = document.activeElement;
		  if(g_oLstfcs && (g_oLstfcs.nodeName == "INPUT" || g_oLstfcs.nodeName == "TEXTAREA"))$(g_oLstfcs).blur();
		  else g_oLstfcs = null;
          if(noLockPage){
		  if("function" == typeof window['g_rmv'])window.g_rmv();
          window.g_rmv = spinner("myglld", 66, 15, 25, 2, "#ff0000");}
	  }
	  g_nMaskCnt = 0;
  }, g_nDelay * 1000);
}
function fnHidMask()
{
  if(!g_oMask)return;
  g_nMaskCnt = 2;
  g_nLstTm = new Date().getTime();
  g_oMask.style.display = "none";
  document.body.scroll = 'auto';
  if(g_oLstfcs)$(g_oLstfcs).focus();
  g_oLstfcs = null;
}
}
if(!noLockPage){
/*输入长度提示*/
var oPB = null;
if("function"==typeof $)
{
	$(document).ready(function(){
			$(document).keyup(function(e)
			{
					 if(!oPB)
					 {
						 oPB = document.createElement("div");
						oPB.id="g_oPopWin";
						oPB.style.display="none";
						if(document.body)document.body.appendChild(oPB),
						oPB.style.backgroundColor="lightyellow",
						oPB.style.border="1px solid #000000",
						oPB.style.position="absolute",
						oPB.style.fontSize="9pt",
						oPB.style.overflow = "visible",
						oPB.style.width="25px";
						oPB.style.zIndex = 99999999;
					 }
					 var o = e.target || e.srcElement;
					 if(13 == e.keyCode || e.repeat)
					    return $(oPB).hide(),false;
					 if(o.type && -1 < "text,textarea".indexOf(o.type) && 0 < o.value.length && !o.readOnly)
					 {
					        var r=document.selection.createRange();
					        var oTmp=r.getBoundingClientRect();
					        var nHeight=oTmp.bottom - oTmp.top;
					        var nW=20;
					        var nL=oTmp.right;
					        nHeight=18 < nHeight ? 15 : nHeight;
					        oPB.style.left=nL;
					        oPB.style.top=oTmp.bottom - 2 * nHeight + $(document).scrollTop();
					        if(oPB.innerHTML != o.value.length)oPB.innerHTML=String(o.value).replace(/[^\u00-\uff\-: \.a-zA-Z0-9]/gm,"dd").length;          
					        $(oPB).show();
					 }
					 else $(oPB).hide();
			});
	});
}
window.onblur = function()
{
  if(oPB)$(oPB).hide();
};
}
/*
按钮弹出窗口
Base.openBtnWin(url, param, width, height)
url 窗口页面指定的路径
param 传入的参数
width 弹出窗口的宽度
height 弹出窗口的高度

如果要使用原始弹出窗口open，可以使用：
window.opn(url, targetName, parms);
*/

$.cookie = function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({}, options);
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
/*将form表单中所有数据转换为Object，也就是可以作为rpc的Map或者bean对象的入口参数
这样，rpc中可以获得界面中的所有输入对象值，
var o = rpc.Yzyz.saveAc01_AC01A1(fnForm2Map());// public Object saveAc01_AC01A1(Map m)
*/
function fnForm2Map()
{
   var o = {};
  $(":input").each(function(){
      /* 没有name的就不传递了，没有value值的也不传递了 */
      if(this.name && "" != this.value)
      {
        if((this.type != "checkbox" && this.type != "radio") || this.checked)
      	    o[this.name] = this.value;
      }
  });
  return o;
}

/*
   为指定的下拉列表设置异步功能
     szId 下拉列表的id
     fnRpc rpc的调用函数，返回list，传入当前的输入值，进行过滤
     举例：fnSetSelectAjax("myldh", rpc.Yzyz.getLdhLst);
*/
function fnSetSelectAjax(szId, fnRpc)
{
    $($("#" + szId + " :input")[0]).keyup(function()
	{
	    if("" != this.value.trim())
	    {
	        if(!window[szId + "_oldVl_"] || window[szId + "_oldVl_"] && window[szId + "_oldVl_"] != this.value.trim())
	        {
	            fnSetSelectAjax[szId] = true;
		        window[szId + "_oldVl_"] = this.value.trim();
		        var o = $('#_Xui_SelectDiv'), s, h;
		        Select.upi4ajx();
			    Select.setData(szId, s = fnRpc(this.value.trim()));
			    h = s.length * 18;
			    if(120 < h)h = 120;
			    o.height(h + "px").html(s = Select.getSelectDataStr($("#" + szId)[0], null,s));
			    window.hdAll.start();
			    Select.show();
		    }
	    }
	});	
}

/* 收起指定的panel，用例：fnHidPanel('myPanelId'); */
function fnHidPanel(szId)
{
   $(document).ready(function(){$("#" + szId + " div.x-tool").click()});
}

/* 表格选择关联按钮的状态 */
function fnClctAndBtn(szClctId, szBtns)
{
    $(document).ready(function(){
        var s, a = szBtns.split(/[,;\s]/), i;
        window[s = szClctId + "_ckmtd"] = function(n){
           if(0 < n)for(i = 0; i < a.length; i++)a[i].enabledButton();
           else for(i = 0; i < a.length; i++)a[i].disabledButton();
        };
        szClctId.setClctAndBtn(s);
   });
}

/* 优化flash组件的输出，并解决需要激活的bug: 组件id,高度,flash文件路径,是否为ie,参数，版本 */
function outSwf(szId, height, szSwfName, isIE, flashVars,ver)
{
		if(null != flashVars && "null" != flashVars)flashVars = flashVars.trim();
		else flashVars = "";
		var a = [], b, c;
		if(isIE)
		{
			if(null == height)height = "100%";
			a = ["<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"" + contextPath + "/skin/swflash.cab#version=" + ver + "\" width=100% height=" + height + " id=" + szId + "S align=top>"
			,"<param name=allowScriptAccess value=always>"
			,"<param name=allowNetworking value=all>"
			,"<param name=allowFullScreen value=true>"
			,"<param name=movie value=" + szSwfName + ">"
			,"<param name=loop value=false>"
			,"<param name=SeamlessTabbing value=true>"
			,"<param name=menu value=false>"
			,"<param name=devicefont value=true>"
			,"<param name=wmode value=opaque>"];
			if(0 < flashVars.length)
				a.push("<param name=FlashVars value=\""),a.push(flashVars),a.push("\">");
			a.push("</object>");
		}
		else
		{
			a = ["<embed SeamlessTabbing=true src=\"" + szSwfName + "\""];
			if(0 < flashVars.length)
				a.push.apply(a, [" FlashVars=\"", flashVars, "\""
			," loop=false menu=false wmode=opaque width=100% height=\"" + height + "\" name=" + szId + "S align=top allowScriptAccess=always allowFullScreen=true type=\"application/x-shockwave-flash\" pluginspage=http://www.adobe.com/go/getflashplayer_cn />"]);
		}
		c = Base.getDom(szId);
		b = c.getElementsByTagName("div");
		if(0 < b.length)c = b[b.length - 1];
		$(c).insertBefore($(a.join("")));
}
/* 功能描述：增加判断指定区域输入对象是否已经输入值,s是指定区域的id，如果不为真则判断整个form */
/* 返回信息：有输入返回true, 否则返回false */
function IsInput(s)
{
   var o, j = 0;
   if(s)o = $("#" + s + " input[type=text]");
   else o = $("input[type=text]");
   o.each(function(){
      if("" != $(this).val())j++;
   });
   return j;
}
/* 功能描述：自动给DataGrid列绑定弹出窗口事件【datagrid的id，绑定列的列名，包含有弹出窗属性的Object对象】 */
function winOpen(dGid,dItemName,o){
	var target = o.target || "_blank",pArr=[
		"width=" + (o.width || "600"),
		"height=" + (o.height || "450"),
		"menubar=" + (o.menubar || "yes"),
		"resizable=" + (o.resizable || "yes"),
		"scrollbars=" + (o.scrollbars || "yes"),
		"location=" + (o.location || "yes"),
		"status=" + (o.status || "yes"),
		"toolbar=" + (o.toolbar || "yes"),
		"top=" + (o.top || "0"),
		"left=" + (o.left || "0"),
	];
	var cbkName = 'winOpenFn_'+dGid+"_"+dItemName;
	dGid.setClickCbk(cbkName,dItemName);
	window[cbkName] = function(o1,curFld){
		if(dItemName == curFld){
			var p = "",url = o.url;
			if(o.prarms) 
			o.prarms.split(/[,;\s]/).each(function(){
				p += "&"+this+"="+encodeURIComponent(o1[this]);//escape
			});else
			{
				for(var k in o1)p+="&"+k+"="+encodeURIComponent(o1[k]);
			}
			if(url && url.indexOf("?")==-1){
				  url +="?cTm="+new Date().getTime(); 
			}
			url += p+"&jsesionid="+g_szJsessionid;
			window.opn(url,target,pArr.join(","));
		}
	};
}
/* 通过区域ID 校验 表单元素  id:区域id(panel,tabs,tab等),s:需要校验的Input对象,以",隔开，不输入则校验所有"**/
function validateById(id,s){
	var o,a=[];
	if(id)o=$("#"+id);
	if(!o)return true;
	if(s);
	else{
		o.find(":input:not(:checkbox[checked=false])").each(function(){
			a.push(this.name);
		});
		s = a.join(",");
	}
	return Base.validateForm(s);	
}

var g_bAnm = false;
/* 动画tip */
function fnSetATip(o, s)
{
   Base.getObj(o).bt({
		  showTip: function(box){if(g_bAnm)return;g_bAnm = true;
		    var $content = $('.bt-content', box).hide();
		    if(!$content)return; 
		    var $canvas = $('canvas', box).hide();
		    if(0 == $canvas.size() && !$canvas[0]['width'])return;
		    var origWidth = $canvas[0].width,
		          origHeight = $canvas[0].height;
		    $(box).show(); 
		    $canvas.css({width: origWidth * .5, height: origHeight * .5, left: origWidth * .25, top: origHeight * .25, opacity: .1})
		      .show()
		      .animate({width: origWidth, height: origHeight, left: 0, top: 0, opacity: 1}, 400, 'easeOutBounce',
		        function(){$content.show()} 
		        );g_bAnm = false;
		  },
		  hideTip: function(box, callback)
		  {if(g_bAnm)return;g_bAnm = true;
		    var $content = $('.bt-content', box).hide();
		    if(!$content)return; 
		    var $canvas = $('canvas', box);
		    var origWidth = $canvas[0].width;
		    var origHeight = $canvas[0].height;
		    $canvas.animate({width: origWidth * .5, height: origHeight * .5, left: origWidth * .25, top: origHeight * .25, opacity: 0}, 400, 'swing', callback); 
		  g_bAnm = false;},
		  positions: ['left', 'right', 'bottom','top'],
		  trigger:['focus','blur'],
		  shrinkToFit: true,
		  hoverIntentOpts: {
		    interval: 0,
		    timeout: 0
		  }
		});
}
/*右键屏蔽*/
var RightClick = {
	init: function (id) {
		var FlashObjectID = id + "S";
	    (window['_FlsID_'] || (window['_FlsID_'] = {}))[FlashObjectID] = 1;
		var FlashContainerID = id;
		this.Cache = FlashObjectID;
		if(window.addEventListener){
		     /*必须处理所有的对象*/
			 window.addEventListener("mousedown", function(ev) {
			  	return function(ev) {
			    if (ev.button != 0) {
					RightClick.killEvents(ev);
					if(window['_FlsID_'][ev.target.id] && RightClick.Cache == ev.target.id) {
			    		document.getElementById(ev.target.id).rightClick();
					}
					RightClick.Cache = ev.target.id;
				}
			  }
	       }(), true);
		} else {
		    var o = document.getElementById(FlashContainerID);
		    if(o)
		    {
			o.onmouseup = function() { o.releaseCapture(); }
			document.oncontextmenu = function(){ if(window.event.srcElement.id == FlashObjectID) { return false; } else { RightClick.Cache = "nan"; }}
			o.onmousedown = function() {
			  	if (event.button > 1) {
					if(window.event.srcElement.id == FlashObjectID && RightClick.Cache == FlashObjectID) {
						document.getElementById(FlashObjectID).rightClick(); 
					}
					o.setCapture();
					if(window.event.srcElement.id)
					RightClick.Cache = window.event.srcElement.id;
				}
	       }}
		}
	},
	killEvents: function(eventObject) {
		if(eventObject) {
			if (eventObject.stopPropagation) eventObject.stopPropagation();
			if (eventObject.preventDefault) eventObject.preventDefault();
			if (eventObject.preventCapture) eventObject.preventCapture();
	   		if (eventObject.preventBubble) eventObject.preventBubble();
		}
	}
};
/*隐藏panel*/
function hidePanel(o){
	var _t = $(o),body = $("body"),id = _t.attr("id"),f = _t.css("display"),panel_tip = $("#panel_tip"+id),h=30,w=60,all_tip = $(".x-panel-tip"),hd = _t.find(".x-panel-header"),panel_tip_main = $("#panel_tip_main");
	if(!panel_tip_main[0])$("<div id='panel_tip_main'></div>").css({position:"fixed",top:"30px",left:"0px"}).prependTo(body);
	_t.fadeOut("slow",function(){
		if(!panel_tip[0]){
			$("<div></div>")
					.click(function(){
						panel_tip = $(this); 
						_t.fadeIn("slow",function(){panel_tip.fadeOut("slow")});	
					})
					.css({
					 }).addClass("x-panel-tip")
					 	.attr("id","panel_tip"+id).attr("title","展开["+hd.text()+"]面板")
					 .hover(function(){
					 	$(this).addClass("x-panel-tip-over");
					 }
					 ,function(){
					 	$(this).removeClass("x-panel-tip-over");
					 })
					 .append("<div class='x-panel-tip-text'>"+hd.text()+"</div>")
					 .append("<span style='float:left;width:15px;height:15px'></span>")
					 .prependTo($("#panel_tip_main"));
		}
		else{panel_tip.show()}
	});
}
function hisMsgTip (){
	//创建悬浮tip
	var dom = self.parent.parent.parent.parent.frames['mainFrame'].document,_dom = $(dom);
	if(!_dom.find("#msgTip")[0])
		$("<div>点<br>击</div>").attr("id","msgTip")
		.attr("title","点击查看历史消息记录。")
		.click(function(){
			crtHisMsgList();
			_dom.find("#_layer1").css({width:_dom.width(),height:_dom.height()})
			.fadeIn("slow",function(){
				_dom.find("#msgLstMain").slideDown("slow");
			});
		})
		.css({position:"fixed",top:"0px",left:"0px",height:"30px",cursor:"hand"})
		.hover(function(){
			
		},function(){
			
		})
		.prependTo(_dom.find("body"));
	
}
function nowTime (d){
	return [d.getHours(),d.getMinutes() < 10 ? "0"+d.getMinutes() : d.getMinutes(),d.getSeconds() < 10 ? "0"+d.getSeconds():d.getSeconds()].join(":");
}
function crtHisMsgList(){
	var dom = self.parent.parent.parent.parent.frames['mainFrame'].document,_dom = $(dom);
	//创建消息列表	
	if(!_dom.find("#_layer1")[0])
		$("<div><div/>")
		.css({position:"absolute",left:0,top:0,"z-index":99998,"background-color":"#cccccc",display:"none",filter:"alpha(opacity=75)"})
		.attr("id","_layer1").prependTo(_dom.find("body"));
	if(!_dom.find("#msgLstMain")[0])
		$("<div></div>")
		.attr("id","msgLstMain")
		.addClass("x-msg-layer")
		.prependTo(_dom.find("body"))
		.append($("<div id='title'><font>历史消息记录查看</font></div>").append($("<span></span>")))
		.append("<div id='main'></div>");
	var main = _dom.find("#msgLstMain").find("#main");
	main.find("#msgLst").remove();
	main.append("<table id='msgLst' cellpadding='0' cellspacing='0'><tr><th>消息内容</th><th>时间</th></tr></table>");
	var g_msgs = top.g_allMsg || [],msgLstMain = _dom.find("#msgLstMain"),newRow,newCell,newCell1,t = _dom.find("#msgLst")[0];
	$(g_msgs).each(function(i){
		newRow = t.insertRow(i+1);
		newCell = newRow.insertCell();
		newCell.innerHTML = this.msg;
		newCell.setAttribute("title",this.msg);
		newCell1 = newRow.insertCell();
		newCell1.innerHTML = nowTime(this.now);
	});
	msgLstMain.css({top:(dom.documentElement.clientHeight-msgLstMain.height())/2,left:(dom.documentElement.clientWidth-msgLstMain.width())/2});
	msgLstMain.find("span").hover(
		function(){$(this).addClass("x-msg-span-over");},
		function(){$(this).removeClass("x-msg-span-over")})
	.click(function(){
		msgLstMain.slideUp("slow",function(){
		_dom.find("#_layer1").fadeOut();
	})});
	$(t).find("tr").hover(function(){$(this).css("background","#d8d8d8")},function(){$(this).css("background","#ffffff")});
}
$(document).ready(function(){
	if(top.g_allMsg && top.g_allMsg.length > 0)hisMsgTip();
});

/* 动态滚轮spinner("holder", 46, 15, 25, 1, "#000"); */
function spinner(holderid, R1, R2, count, stroke_width, colour) {
                var sectorsCount = count || 12,
                    color = colour || "#fff",
                    width = stroke_width || 15,
                    r1 = Math.min(R1, R2) || 35,
                    r2 = Math.max(R1, R2) || 60,
                    cx = r2 + width,
                    cy = r2 + width,
                    r = Raphael(holderid, r2 * 2 + width * 2, r2 * 2 + width * 2),
                    
                    sectors = [],
                    opacity = [],
                    beta = 2 * Math.PI / sectorsCount,
 
                    pathParams = {stroke: color, "stroke-width": width, "stroke-linecap": "round"};
                    Raphael.getColor.reset();
                for (var i = 0; i < sectorsCount; i++) {
                    var alpha = beta * i - Math.PI / 2,
                        cos = Math.cos(alpha),
                        sin = Math.sin(alpha);
                    opacity[i] = 1 / sectorsCount * i;
                    sectors[i] = r.path([["M", cx + r1 * cos, cy + r1 * sin], ["L", cx + r2 * cos, cy + r2 * sin]]).attr(pathParams);
                    if (color == "rainbow") {
                        sectors[i].attr("stroke", Raphael.getColor());
                    }
                }
                var tick;
                (function ticker() {
                    opacity.unshift(opacity.pop());
                    for (var i = 0; i < sectorsCount; i++) {
                        sectors[i].attr("opacity", opacity[i]);
                    }
                    r.safari();
                    tick = setTimeout(ticker, 1000 / sectorsCount);
                })();
                return function () {
                    clearTimeout(tick);
                    r.remove();
                };
}

/* 指定id = s的表格的高度自动调整到页面没有滚动条 */
function fnAutoResize(s)
{
   s = $("#" + s);
   var a = $(document.body).attr("scrollHeight"), b = $("html").height(), h = s.height();
   h = h - (a - b) ;
   if(0 < h)s.height(h);
}
/* panel start */
function phd(o)
{
   return $(o).parent().parent().toggleClass('x-panel-collapsed')
}
function pms(o)
{
   return $(o).addClass('x-tool-toggle-over')
}
function pmo(o)
{
   return $(o).removeClass('x-tool-toggle-over')
}
/* panel end */
/* select input start */
function sis(o,w)
{
   return Select.showSelectDiv(window.event,w && {width: w} || {},o)
}
function sisi(o,w)
{
   return Select.showSelectDiv(window.event,w&&{width: w}||{},$(Base.p(o,'TABLE')).find(':input')[0])
}
function sso(o)
{
   o.className='x-form-trigger x-form-trigger-over'
}
function sst(o)
{
   this.className='x-form-trigger'
}
/* date input start */
function dpc(o)
{
   return DatePicker.showSelectDiv(window.event,o)
}
function dpk(o)
{
   return DatePicker.onkeydown(window.event,o)
}
function dpu(o)
{
   return DatePicker.onkeyup(window.event,o)
}

function dpb(o)
{
   return DatePicker.onblur(window.event,o)
}
function dps(o)
{
   return DatePicker.showSelectDiv(window.event,$(Base.p(o,'TABLE')).find(':input')[0])
}
function dpmo(o)
{
   $(o).addClass('x-form-trigger-over')
}
function dpmt(o)
{
   $(o).removeClass('x-form-trigger-over')
}
function stt()
{
  $(document).ready(function()
  {setTimeout(function(){
     var t = $("#fullpathtd");
     if(document.title && (document.title = document.title.trim()) && 0 < t.size())t.html(t.html().trim()+"&#65306;"+document.title)
     },13);
  });
}
function soi(o)
{
  return Select.onInput(window.event,o)
}
function sok(o)
{
  return Select.onkeydown(window.event,o)
}
var Base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = Base64._utf8_decode(output);
 
		return output;
 
	},
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
		return string;
	}
};
/* 导出数据提交 */
function fnExportSubmit()
{
    var oF = $("form:first"), s = oF.attr("target");
    oF.attr("target", "prtFrm");
    oF.submit();
    oF.attr("target", s);
}
/* 功能描述：将json-rpc返回的对象：domain、vo、map、表格行点击返回的对象的值赋予到界面上*/
function fn_JsonUpdateTextAll(i,o)
{
   var o1 = cvtRowObj(o || i), k;
   for(k in o1)if(null != o1[k])k.setValue(o1[k]);
}
/* 功能描述：获取json-rpc返回的对象：domain、vo、map、表格行点击返回的对象中指定名称的字段值*/
function fn_getJsonText(o,name)
{
  
   if(o && (name in o) && null != o[name])
      return o[name];         
   return "";
}
/* 解压普通表格数据，并创建他 */
function fnMakeTable(id,s)
{
  if(g_myTPWin && "function" == typeof g_myTPWin.top['fnUnBase64Gzip'])$("#" + id).html(g_myTPWin.top.fnUnBase64Gzip(s).replace(/(^")|("$)/gm, ""));
}
/* 输入对象获得焦点时处理外观 */
function fnFcs(obj)
{
    if(window.g_fcsfld)
    {
       var oLst = $("#" + window.g_fcsfld);
       if(0 == oLst.length)oLst = $(document.getElementsByName(window.g_fcsfld)[0]);
       oLst.removeClass('myfocusfg');
    }
    var o = null; 
    if((obj || window.event) && (o = obj || window.event.srcElement))
    {
        window.g_fcsfld = o.name || o.id || (o.id = "ID" + new Date().getTime());
        $(o).addClass("myfocusfg")
    }
    return true;
}

function fnShowChangeFiledsList(sId,okFn,cancelFn){
	var o  = getAllchgData(sId),s,_t,i = 0,sStyle = "",chk = "",_chk = "";
	if(o)
	{
		s = ["<div style='height:260px;width:100%;overflow-y:auto;overflow-x:hidden;'>"];
		s.push("<table cellpadding=0 cellspacing=0 class='change_win_table'");
		s.push("<tr style='background:#cccccc;text-align:center;font-weight:600'><td width=110>字段名称</td><td width=170>变更前</td><td width=170>变更后</td></tr>");
		for(var k in o){
			if(null != o[k]){
			i++; 
			if(i % 2 == 0)sStyle = "background:#f5f4eb;";
			else sStyle="background:#ffffff;";
			s.push("<tr style=font-weight:normal;text-align:left;"+sStyle+">");
			_t = o[k];
			if(_t.type == "checkbox" || _t.type == "radio")
			{
				chk = _t.o_checked ? "|选中":"|取消";
				_chk = _t.n_checked ? "|选中":"|取消";
			}
			s.push("<td>"+(_t['n_desc'])+"</td>");
			s.push("<td>"+((_t['o_sel_desc'] || _t['o_val'] || "&nbsp") + chk)+"</td>");
			s.push("<td style='color:red'>"+(_t['n_sel_desc'] || _t['n_val'] ||"&nbsp")+ _chk+"</td>");
			s.push("</tr>");
			}
		}
		if(i == 0)s .push("<tr><td colspan=3 style='line-height:40px;background:#ffffff;text-align:center;font-weight:600;font-size:18px'>没有获取到有变更的字段。</td></tr>");
		s.push("</table></div>");
	}
	else{
		s= "没有获取到有变更的字段。";
	}
	s.push("<div style='text-align:center;margin-top:10px'><button id='myOkBtn' class='button'>确定</button><button id='myCancelBtn' class='button' style='margin-left:10px'>取消</button></div>")
	var oElement = $(s.join(""));
	if("function" == typeof okFn){oElement.find("#myOkBtn").click(okFn);}
	if("function" == typeof cancelFn)oElement.find("#myCancelBtn").click(function(){fnCloseWin();cancelFn()});
	fnShowWin(500,300,"变更列表",oElement);
}  
function fnShowWin(w,h,title,s,cbk){
	var layer = $("#chgLayer"),chgOpenWin = $("#chgOpenWin");
	if(layer[0] && chgOpenWin[0]) return layer.fadeIn(300,function(){chgOpenWin.show().find(".x-panel-bwrap").html("").append(s)});
	$("<div>").css({
		width:$(document).width(),
		height:$(document).height(),
		position:"absolute",
		top:"0px",
		left:"0px",
		background:"#cccccc",
		filter:"alpha(opacity=60)",
		display:"none"
	}).attr("id","chgLayer").fadeIn(300,function(){
			var arr = ["<div class='x-panel' id='chgOpenWin' style='"];
				arr.push("position:absolute;top:100px;width:"+w+"px;z-index:99999999;display:none'>");
				arr.push("<div class='x-panel-header x-unselectable'>");
				arr.push("<span class=x-panel-header-text style='float:left'>"+title+"</span>");
				arr.push("<div style='float:right;margin:0px 5px 0px 0px;width:15px;height:15px' id='closeBtn' src='" + g_sysInfo[2] + "tool-sprites.gif'></div></div>");
				arr.push("<div class='x-panel-bwrap' style='height:"+h+"px;background:#ffffff'></div>");
				arr.push("</div>");
		$(arr.join(""))
			.show().appendTo($("body"))
			.css({
				left:($(document).width() - w)/2
			}).keydown(function(){
				if(event.keyCode =  27) $("#closeBtn").click();
			})
			.find("#closeBtn").css({
				background:"url("+g_sysInfo[2]+"default/panel/tool-sprites.gif)",
				"background-position":"0px 0px",
				cursor:"pointer"
			}).hover(function(){
				$(this).css({"background-position":"0px 0px"})
			},function(){
				$(this).css({"background-position":"-15px 0px"})
			}).click(function(){
				fnCloseWin(cbk);
			});
	$("#chgOpenWin").find(".x-panel-bwrap").append(s)
	}).appendTo($("body"));
}
function fnCloseWin(cbk){
	var layer = $("#chgLayer"),chgOpenWin = $("#chgOpenWin");
	cbk = "function" == typeof cbk ?cbk : function(){};
	if(layer[0] && chgOpenWin[0]) 
		chgOpenWin.hide(function(){layer.fadeOut(300,cbk)});
}

/* 调试阶段使用,slct需要优化的码表,other,{slct:["aac001,Collecton"], other:["当前执行的Action及方法耗时：:【63】【 com.yinhai.yhcip.app.log.dao.sqlmap.Ae09DaoSqlMap.update"]}*/
function fnDebug(o)
{
	if(!window['g_bDebug'] || !o  || !o.other)return;
	var url = location.href,w = 420,h = 200,mh = 400;
	if(url.indexOf("left.do") != -1)return ;
	$("<div/>").css({position:"fixed",right:0,bottom:0,cursor:"pointer",width:32,height:32})
	.html("<img src='"+g_sysInfo[2]+"/bug.gif'>")
	.click(function(){
		crtTable(o);
		$("#chgOpenWin_bug").fadeIn(400);
	})
	.attr("title","打开调试信息")
	.appendTo($("body"));
				var arr = ["<div class='x-panel' id='chgOpenWin_bug' style='"];
				arr.push("position:fixed;width:"+w+"px;z-index:99999999;display:none'>");
				arr.push("<div class='x-panel-header x-unselectable'>");
				arr.push("<span class=x-panel-header-text style='float:left'>页面调试信息[<a style='font-size:12px !important' href='javascript:void(0)' onclick=\"fnOpenConstConfig()\"''>配置常量</a>]</span>");
				arr.push("<div style='float:right;margin:0px 5px 0px 0px;width:15px;height:15px' id='closeBtn_bug' ></div>");
				arr.push("<div style='float:right;margin:0px 5px 0px 0px;width:15px;height:15px' id='maxBtn_bug' ></div></div>");
				arr.push("<div class='x-panel-bwrap' style='height:"+h+"px;background:#ffffff;overflow-y:scroll !important;overflow-x:hidden ;';></div>");
				arr.push("</div>");
		var obj = $(arr.join(""));
			obj.css({
				right:0,bottom:0
			}).keydown(function(){
				if(event.keyCode =  27) $("#closeBtn_bug").click();
			})
			.find("#closeBtn_bug").css({
				background:"url("+g_sysInfo[2]+"default/panel/tool-sprites.gif)",
				"background-position":"0px 0px",
				cursor:"pointer"
			}).hover(function(){
				$(this).css({"background-position":"0px 0px"})
			},function(){
				$(this).css({"background-position":"-15px 0px"})
			}).click(function(){
				$("#chgOpenWin_bug").fadeOut(400);
			}).attr("title","关闭/ESC");
		obj.find("#maxBtn_bug").css({
				background:"url("+g_sysInfo[2]+"default/panel/tool-sprites.gif)",
				"background-position":"0px 330px",
				cursor:"pointer"
			}).hover(function(){
				$(this).css({"background-position":"0px 330px"})
			},function(){
				$(this).css({"background-position":"-15px 330px"})
			}).toggle(function(){
				$("#chgOpenWin_bug").width($(document).width()).find(".x-panel-bwrap").height(mh);
			},function(){
				$("#chgOpenWin_bug").width(w).find(".x-panel-bwrap").height(h);
			}).attr("title","最大化/还原");	
		obj.appendTo($("body"));
		crtTable(o);
		function crtTable(o){
			var s = [],oo = o.other, i = 0;
		s.push("<table cellpadding=0 cellspacing=0 class='change_win_table' style='width:90%!important；margin:0 auto'>");
		
		if(o.slct){
			s.push("<tr><td colspan=2 style='color:red;font-size:12px'>码表警告，以下码表数量超过500条：</td></tr>")
			s.push("<tr style='background:#cccccc;text-align:center;font-weight:600'><td>Property</td><td width=60>Collection</td><tr>");
			var _t = o.slct.split(";");
			for(var j = 0; j < _t.length;j++){
				s.push("<tr>");
				s.push("<td>"+_t[j].split(",")[0]+"</td>");
				s.push("<td>"+_t[j].split(",")[0]+"</td>");
				s.push("</tr>");
			}
			s.push("<tr><td colspan=2 style='color:red;font-size:12px'>资源耗时：</td></tr>")
		}
		s.push("<tr style='background:#cccccc;text-align:center;font-weight:600'><td>资源</td><td width=80>耗时</td><tr>");
		for(var k in oo){
			i++;
			if(i%2 ==0)
			s.push("<tr style='background:#f5f4eb;'>");
			else
			s.push("<tr>");
			s.push("<td>"+k+"</td>");
			s.push("<td>"+oo[k]+"</td>");
			s.push("</tr>");
		}
		s.push("</table>");
		$("#chgOpenWin_bug .x-panel-bwrap").html("").html(s.join(""));
		}
}
function fnOpenConstConfig(){
			window.open(contextPath+"/system/config/constConfigMainAction.do","","width=570,height=640");
}
function fnCheckedAllChk(id,o){
if(confirm('点击[确定]全选/取消全选，点击[取消]反选'))
 {
	if(o.checked)
		$("#"+id+" :input[type=checkbox]").attr('checked','true');
	else
		$("#"+id+" :input[type=checkbox]").removeAttr('checked');
 }else{
	$("#"+id+" :input[type=checkbox]").each(function(i){
		if(i != 0){
			if(this.checked)this.checked = false;
			else this.checked = true;
		}
	});
 }
}
var g_tCltId = [];
function fnAddTableId(id){
	g_tCltId.push(id);
}
function ock(fn,id,td){
	$(document).ready(function(){
		if("function" != typeof fn) return alert(fn+"不是一个函数名。");
		var _t = document.getElementById(id+"_T");
		if(!_t)return;		
		var row = _t.rows[0],colname,o={},r;
		for(var j = 0;j < row.cells.length;j++){
			colname = row.cells[j].colname,r = $(td).parent("tr")[0];
			if('chkCol' == colname){
				o['dgSelected'] = $(r.cells[j]).find("input").attr("checked");
			}		
			else
				o[colname] = r.cells[j].innerText;
			o["_rowId_"] = r.rowIndex;	
		}
		fn(o);
	});
}
function fnGetTableData(id){
		var _t = $("#"+id).find("table").eq(0),postAll = _t.attr("pAll"),g_tableData = {};
		if(0 == _t.length || 1 > _t[0].rows.length)return;
		var row = _t[0].rows[0], r,colname,slct = _t.attr("slct"),f = 8;
		if(!postAll && !slct)return;
		for(var i = 1 ;i < _t[0].rows.length;i++){
			r = _t[0].rows[i];
			if(!postAll && !$(r.cells[0]).find("input").attr("checked")) continue;
			var o={};
			for(var j = 0;j < r.cells.length;j++){
				colname = row.cells[j].colname;
				if('chkCol' == colname){
					o['dgSelected'] = $(r.cells[j]).find("input").attr("checked");
				}		
				else
					o[colname] = r.cells[j].innerText;
			}
			o["_rowId_"] = i;
			if(1 == postAll && !$(r.cells[0]).find("input").attr("checked"))
				g_tableData[i]=[64,o];
			else if($(r.cells[0]).find("input").attr("checked"))
				g_tableData[i]=[8,o];
		}
		(id+"S_edit").setValue("ss");
		(id+"S_edit").setValue($.toJSON(g_tableData));
}

/*  令制定输入对象禁止拷贝、复制、粘贴、拖放粘贴，适用Ta+2.0, 2011-7-25 夏天
    使用:fnNoSlctCpyPs('输入对象的property');
 */
function fnNoSlctCpyPs(s)
{
    var i = $(":input"), fn = function(){return false;}, oW = $(window);
    i.each(function()
    {
         var oT = $(this), s1 = oT.attr('name');
         if(s === s1 || s1 === 'dto(' + s + ')')
         {
            oT.bind('dragenter',fn).bind('copy', fn).bind('paste', fn).bind('cut', fn);
            var fn1;
            oW.bind('unload', fn1 = function()
            {
                 oW.unbind('unload', fn1);
                 oT.unbind('dragenter',fn).unbind('copy', fn).unbind('paste', fn).unbind('cut', fn)
            });
         }
    });
}
var Base = ({
  bIE: false,nVer: 0,replaceHtml: function(el,html) {
var oldEl=typeof el==="string" ? document.getElementById(el) : el;
if(this.isIE)return Base.clearChldNd(oldEl).innerHTML=html,oldEl;
var newEl=oldEl.cloneNode(false);
Base.clearChldNd(newEl).innerHTML=html;
oldEl.parentNode.replaceChild(newEl,oldEl);
return newEl;
},
getMenuData:function()
{
   return window.topMenu || (window.topMenu=top.frames[0].topMenu);
},
clearChldNd:function(o)
{
    var i,t,k;
    for(i=o.childNodes.length; 0 <=--i;)
    {
        try{
        if(o.childNodes)
        {
        t=o.childNodes.item(i);
        if(t)
        {
        if(t.clearAttributes)t.clearAttributes();
        if(t.childNodes && 0 < t.childNodes.length)Base.clearChldNd(t);
        if(o.removeChild)o.removeChild(t);
        }
        }
        }catch(e){try{o.innerHTML=""}catch(e){}}
     }
     return o;
},
getInputDiv:function(o)
{
   var _t=Base;
   if(o)return $(_t.p(_t.p(_t.getObj(o)[0],"DIV",10),"DIV",3));
   return o;
},
fnSciv:function(c,a,b,n)
{
if("string"==typeof c)
c=$("#" + c)[0],a=$("#" + a)[0];
if(a && 0==(c.scrollTop=a.offsetTop))
   c.scrollTop=$(a).position().top;
c.scrollTop=c.scrollTop;
if(!c.scrollTop)return;
if((b || n && 0 < --n) && "BODY" !=c.nodeName)
  this.fnSciv(c.parentNode,c,b);
},
PopMsgWin:function(o)
{
   if(!o)return false;
   alert(o);
},
AjaxUpdateUi: function(szProperty,szReqCode,szUrl,szData,szDesId,isAsync,callBackFn)
{
   var form,reqCode,a=arguments,cbk=a[a.length - 1],bHvCbk="function"==typeof cbk;
   if(bHvCbk)
   {
   callBackFn=cbk;
   if(2==a.length)szReqCode=null;
   else if(3==a.length)szUrl=null;
   else if(4==a.length)szData=null;
   else if(5==a.length)szDesId=null;
   else if(6==a.length)isAsync=false;
   } 
   if (!szUrl && (form=$("form:first")[0])
            && form.action && "undefind" !=typeof 
              (reqCode=$("input[name=reqCode]")[0]).value){
     szUrl=form.action + "?" + "reqCode=" + (szReqCode || reqCode.value);
   } else {
     var separator=szUrl &&  -1 < szUrl.indexOf("?") ? "&" : "?";
     szReqCode && (szUrl=contextPath + szUrl + separator + "reqCode=" + szReqCode) || (szUrl=contextPath + szUrl);  
   }
   szData || (szData=":input:not(:checkbox[checked=false])");
   var _t=this;
   if(szReqCode)Base.setValue("reqCode",szReqCode);
   $(document).ready(function()
   {
     var obj=$(szProperty && _t.getObj(szProperty) || $(document)),szId;
     obj.attr('id',szId=obj.attr('id') || szProperty);
     ("undefined"==typeof isAsync)&&(isAsync=!szDesId);
     if(!szReqCode && obj.attr('reqCode'))Base.setValue("reqCode",szReqCode=obj.attr('reqCode'));
     _t.updateUi({url:szUrl,bAsync: isAsync,postData:[_t.getAllInput(szData)],data:[[szDesId || szId,1,""]],fn:function(s){
        var o=null,szStyle="";  
        if(0 < obj.length)
          o="INPUT"==obj[0].nodeName ? $(_t.p(obj[0],"DIV")).parent("div") : obj;
        var script="",n=s.indexOf("<script");
        if(-1 < n) 
        {
           script=s.substr(n);
           script=script.substr(0,script.lastIndexOf("</" + "script>"));
           script=script.replace(/^\s*<script[^>]*>\s*/,"");
           script=script.replace(/\s*$/,"");
           s=s.substr(0,n);
        }
        s=s.replace(/(^\s*)|(\s*$)/gmi,'');
        if(!szDesId && s)
        {
          if(-1 < (n=s.indexOf(">")))
          {
               szStyle=s.substr(0,n);
               if(-1 < (n=szStyle.indexOf("style=\"")))
               {
                 szStyle=szStyle.substr(n + 7);
                 szStyle=szStyle.substr(0,szStyle.indexOf('"'));
               }else szStyle=""; 
          }
          
          s=s.replace(/<!--[^\-]*-->/gmi,"").replace(/(^\s*)|(\s*$)/gmi,"");
          s=s.replace(/^\s*<div[^>]*>/mi,"");
          var nT=s.lastIndexOf("</div>");
          if(0 < nT)s=s.substr(0,nT);
        }
        if ("undefined"==typeof Base.PopMsgWin.obj || 3 !=Base.PopMsgWin.obj.type ){
        if(s && o && "#document" !=o.attr("nodeName") && s){Base.clearChldNd(o[0]).innerHTML=s;if(szStyle)o.attr('style',szStyle);}
if($.isFunction(callBackFn))callBackFn();
        }
        try{
          if(script){if(false==isAsync)eval(script);else setTimeout(function(){eval(script)},777)};
        }catch(e){
          alert("\u5f02\u6b65\u8c03\u7528\u9519\u8bef:\u6267\u884c\u8fd4\u56de\u7684\u811a\u672c\u51fa\u9519" + ",\u9519\u8bef\u6d88\u606f\u662f:" + e.message);
        }
    }});
   }); 
   if(false==isAsync){return (Base.PopMsgWin.obj||{}).type;}
},
AjaxSyn : function(id,isAsync){
  return this.AjaxUpdateUi(id,null,null,null,null,isAsync);
},AjaxTab: function(tabId,szReqCode,url,data,destId,szCallBackFn){
if(destId==tabId)destId=null;
Base.AjaxUpdateUi(tabId,szReqCode,url,data,destId,szCallBackFn);
},fsubmit:function(n,oWin,bNLd)
{
    if("undefined" !=typeof window.g_bSubmit && window.g_bSubmit)return alert("请不要重复提交");
    if(!bNLd)fnLoadsts(1);
    mkClctDt();
    if(!bNLd)
 $(":input[type=button]").each(function(){
    $(this).attr("disabled",true);
    $(Base.p(this,"TABLE")).addClass("z-btn-dsb");
    });try{var o=window.event.srcElement;if(o.type=='button')o.name.setValue(o.value);}catch(e){}
    window.g_bSubmit=!bNLd;
    (oWin || window).document.forms[n || 0].submit();
},getObj: function(s)
{
   var o=document.getElementsByName(s);
   if(o && 0 < o.length)return $(Base.A(o));
   o=document.getElementsByName("dto(" + s + ")");
   if(o && 0 < o.length)return $(Base.A(o));
   o=$("#" + s);
   if(0 < o.length)return o;
  return s;
},
hideObj:function(szNameOrId)
{
  var o=$("#" + szNameOrId);
  if(0 < o.length)
     o.hide();
  else
  {
     o=$(":input[name=" + szNameOrId + "]");
     if(0==o.length)o=$(":input[name=dto(" + szNameOrId + ")]");
     if(0 < o.length)
     {
     o=Base.p(o[0],"DIV");o=Base.p(o,"DIV");
     o=$(o);
     if(0 < o.length)o.hide();
     }
  }
},
showObj:function(szNameOrId)
{
  var o=$("#" + szNameOrId);
  if(0 < o.length)
     o.show();
  else
  {
     o=$(":input[name=" + szNameOrId + "]");
     if(0==o.length)o=$(":input[name=dto(" + szNameOrId + ")]");
      if(0 < o.length)
      {
     o=Base.p(o[0],"DIV");o=Base.p(o,"DIV");
     o=$(o);
     if(0 < o.length)o.show();
     }
  }
},
doUpdateCollection:function(szCollectionId,szData,szReqCode)
{
  var o,_t=this,s,argF=arguments[arguments.length - 1];
  try{
     if(window["XTDataGrid"] && (o=XTDataGrid.getXTDataGrid(szCollectionId)))
         return Base.AjaxUpdateUi(szCollectionId,szReqCode || o.opt.reqCode);
  }catch(e){alert(e.message)}
  $(document).ready(function(){
     
     
     o=szCollectionId.swf();
      if(!o)return AjaxUpdateUi(szCollectionId,szReqCode,null,szData);
      if($.isFunction(argF))
      {
         window[s=szCollectionId + "DataChgCbk"]=argF;
        szCollectionId.setDataCmpltCbk(s);
     }
      if(o && o.doUpdateCollection){o.doUpdateCollection(_t.getAllInput(szData),szReqCode || null);}
     else window[szCollectionId+"S_cache"]=function(){_t.doUpdateCollection(szCollectionId,szData,szReqCode);}
     
   });
},getAllInput:function(s)
{
mkClctDt();
   var a=[],_t=Base,o=$(s || ":input:not(:checkbox[checked=false])"),ecd=_t.decodeStr;
   if(0 < o.size())
   o.each(function(){
      if ("checkbox"==this.type && false==this.checked)return true; //排除没有勾选的checkbox
      if ("radio"==this.type && false==this.checked)return true;    //排除没有选择的radiobox
      if(this.name)
      s=encodeURIComponent(ecd($(this).val())),a.push(this.name + "=" + s);
   });
   else{
      var p=s.split("&"),u;
      for(var i=0; i < p.length; i++)
      {
        u=p[i].split("=");
        if(u[0])
        s=encodeURIComponent(ecd(u[1])),a.push(u[0] + "=" + s);
      }
   }
   return a.join("&");
},init: function()
  {
      if("undefined" !=typeof Base)return this;
      Array.prototype.each=function(f){var t=this,i=0;for(;i < t.length; i++)f.apply(t[i],[t[i]]);return this};
       
     $(window).unload(function(){
        top.g_nPgCntTm || (top.g_nPgCntTm=0);
        if(top.g_nPgCntTm < new Date().getTime())
        top.g_nPgCntTm=new Date().getTime()
        setTimeout(function(){var o=getCcObj();
        if(o && "function"==typeof o.getCodeList)o.getCodeList()},13);
     }).load(function(){
        var  n=new Date().getTime();
        "undefined"==typeof top.g_nPgCntTm && (top.g_nPgCntTm=n);
     });
     
      if(-1==String(window.alert).indexOf("g_fcsfld"))
      {
      window._alt=window.alert;
      window.alt=function(s){
      /*var msgs=top["g_allMsg"] || [],s=arguments[0];
      msgs.push({msg:s,now:new Date()});
      top["g_allMsg"]=msgs;
      hisMsgTip();*/
      return _alt(s);
      };
      window.cfm=window.confirm;
      window.alert=function(o)
      {
          if("undefined" !=typeof g_fcsfld && g_fcsfld)g_fcsfld.setFocus(),g_fcsfld=null;
          if(!("object"==typeof o && null !=o && o.hasOwnProperty('message')))return window.alt(o);
          var fnTmp=window.alt;
          if(0 < o.type)
          {
              if(!(o.okScript || o.okUrl || o.errScript || o.errUrl))return window.alt(o.message);
              if(window.cfm(o.message))
              {
                  if(o.okScript){
                    if("function"==typeof o.okScript)o.okScript();
                    else eval(o.okScript);
                  }
                  if(o.okUrl)location.href=contextPath + o.okUrl;
              }
              else 
              {
                 if(o.errScript)
                 {
                    if("function"==typeof o.errScript)o.errScript();
                    else eval(o.errScript);
                 }
                 if(o.errUrl)location.href=contextPath + o.errUrl;
              }
          }
          else
          {
              if("undefined" !=typeof g_bNoTimeoutAlt && g_bNoTimeoutAlt) alt(o.message);
              else  setTimeout(function(){alt(o.message);},13);
              if(o.okScript){
                    if("function"==typeof o.okScript)o.okScript();
                    else eval(o.okScript);
               }
              if(o.okUrl)location.href=contextPath + o.okUrl;
          }
         
      };
       window.confirm=function(s,fn,fn1)
      {
         if(1==arguments.length)return window.cfm(s);
         var o={type:1,message:String(s)};
         if(fn)o.okScript=fn;if(fn1)o.errScript=fn1;
         return Base.PopMsgWin(o);
      };
      window.opn=window.open;
      window.open=function(s,t,p)
      {
          var i,a=(p||"").toLowerCase().replace(/\s/g,'').split(","),b,g="=",u=s.split(/\?/);
          for(i=0; i < a.length; i++)
          {
             b=a[i].split(g);
             if(2==b.length)
             {
                switch(b[0])
                {
                   case "left":b[0]="dialogLeft";break;
                   case "top":b[0]="dialogTop";break;
                   case "width":b[0]="dialogWidth";break;
                   case "height":b[0]="dialogHeight";break;
                }
                if(!isNaN(Number(b[1])))b[1]=Number(b[1]) + "px"; 
                a[i]=b.join(g);
             }
          }
          a.push("center=1");a.push("help=0");a.push("resizable=1");a.push("scroll=1");a.push("status=0");
          p=a.join(";").replace(/=/g,":");
          if(1==u.length)u[0] +="?";
          if(-1==s.indexOf("jsessionid"))u[u.length - 1] +="&jsessionid=" + g_szJsessionid;
          s=u.join("?");
          return window.showModalDialog(s,window,p);
      };
      }
      
      if(window.dialogArguments)window.opener=window.dialogArguments;
        $(function(){
         
         $($(document)[0]).keydown(window.nxtfcs=function(e,oI) {
            var k,c;
            if(e)k=e.which || e.charCode || e.keyCode,c=e.metaKey || e.ctrlKey;
            else if(window.event) k=window.event.keyCode || 0,c=window.event.ctrlKey || 0;
            if(c && 192==k)
              top.frames[1].document.getElementById('menuId').focus();
             
            
            if(oI || (document.activeElement && 13==k))
            {
               if(e){e.returnValue=false;e.cancelBubble=true};
               var oCur=oI || document.activeElement,szNdNm=oCur.nodeName,a=$(":input"),i=0,bStart=false;
               /* oCur.onchange && oCur.onchange();  // 20101018 注释onchange执行2次造成SuggestFramework执行不正确*/
               if("function"==typeof oCur.onblur && !oCur.onblur())
                    return oCur.select(),false;
                if("BUTTON"==szNdNm)
                   ;// $(oCur).click();
               else if("INPUT"==szNdNm || "SELECT"==szNdNm)
               {
                 
                  for(i=0; i <  a.length; i++)
                   {
                      if(bStart)
                      {
                          if(0==$(a[i]).height() || "hidden"==$(a[i]).attr("type") || $(a[i]).attr("readOnly") || $(a[i]).attr("disabled"))continue;
                      $(a[i]).focus();
                      break;
                      }
                      if(a[i]==oCur)bStart=true;
                   }
                   return false;
               }
            }
            return true;
         });});
         
        $(window).resize(window.xuiResize=function(){window.xuiResize.start()});
        window.xuiResize.start=function(){},window.xuiResize.a=[];       
        var ua=navigator.userAgent.toLowerCase(),_t=this;
        _t.isStrict=document.compatMode=="CSS1Compat",_t.isOpera=ua.indexOf("opera") > -1,_t.isSafari=(/webkit|khtml/).test(ua),_t.chrome=(/chrome/).test(ua),_t.isSafari3=_t.isSafari && ua.indexOf('webkit/5') !=-1,_t.isOmniweb=-1 < ua.indexOf("omniweb"),_t.bIE=_t.isIE=(!_t.isOpera && ua.indexOf("msie") > -1 && !_t.isOmniweb),_t.isIE7=!_t.isOpera && ua.indexOf("msie 7") > -1,_t.isIE6=!_t.isOpera && ua.indexOf("msie 6") > -1,_t.isGecko=!_t.isSafari && ua.indexOf("gecko") > -1,_t.isGecko3=!_t.isSafari && ua.indexOf("rv:1.9") > -1,_t.isBorderBox=_t.isIE && !_t.isStrict,_t.isWindows=(ua.indexOf("windows") !=-1 || ua.indexOf("win32") !=-1),_t.isMac=(ua.indexOf("macintosh") !=-1 || ua.indexOf("mac os x") !=-1),_t.isAir=(ua.indexOf("adobeair") !=-1),_t.isLinux=(ua.indexOf("linux") !=-1),_t.isSecure=window.location.href.toLowerCase().indexOf("https")===0; 
    _t.isW3C=!!document.getElementById;
        _t.isIE5=_t.isW3C && _t.isIE;
        _t.isNS6=_t.isW3C && "Netscape"==navigator.appName;
        window.getAllInput=_t.getAllInput;
        window.mkClctDt=function(){
               $("#_Xui_SelectDiv").hide();
               var a=window.mkClct || [],i,o,b=window.g_tCltId || [],j;
               for(i=a.length; 0 <=--i;)
                   if((o=a[i].swf()) && "function"==typeof o.mkSubmit)o.mkSubmit();
               for(j=b.length; 0 <=--j;)
               fnGetTableData(b[j]);    
           };
        jQuery.fn.extend({
           getValue:(_t.getValue=function(s){
             var s1,oI,szTp;
             if(s)
             {
                 oI=$(_t.getObj(s));
                 if("DIV"==oI.attr("nodeName"))
                    oI=$(oI.find("input,textarea")[0]);
                 s1=oI.val();
                 if("checkbox"==(szTp=$(oI[0]).attr("type")) && !oI.attr("checked"))
                     s1=null;
                 if("radio"==szTp)
                 {
                     s1=null;
                     oI.each(function(){
                         if(this.checked)s1=this.value;
                     });
                 }
             }
             else s1=this.val();
             if("undefined"==(s1 || typeof s1))s1="";
             return s1;
           }),setValue:(_t.setValue=function(s,s2){
              if(!s)return this;
              if(null==s2 || "undefined"==typeof s2 || "null"==s2 || "undefined"==s2)s2="";
              s2=String(s2);
              s2=("undefined"==typeof s2 ? "" : s2);
              window.bBoBq=true;
              var n,fnMl=function(s,o)
              {
                  s=String(s); 
                  n=o.attr("maxlength") || 999999;
                  if(s.length > n)s=s.substr(0,n);
                  return s;
              };
              if(2==arguments.length)
              {
                 s2 || (s2="");
                 if("string" !=typeof s2 && s2['time'])
                 {
                     var o=s2,fnT=function(n){return 10 > n? "0" + n: n};o.month++;
                     s2=[o.fullYear,fnT(o.month),fnT(o.date)].join("-");
                     if(o.seconds || o.hours || o.minutes)
                     s2 +=" " + [fnT(o.hours),fnT(o.minutes),fnT(o.seconds)].join(":");
                     fnT=null;
                 }
                 var oIpt=$(_t.getObj(s)),szNm=$(oIpt[0]).attr("nodeName");
                 if("DIV"==szNm)
                 {
                    oIpt=$(oIpt.find("input,textarea")[0]),szNm=$(oIpt[0]).attr("nodeName")
                 }
                 if("TEXTAREA" !=szNm)
                 {
                 if(0==oIpt.length || "INPUT" !=szNm)
                 {
                   var oFom=$("form");
                   if(0 < oFom.length)oFom=oFom[0];
                   else oFom=$("body")[0];
                   Base.insertHtml(oFom,"beforeend","<input type='hidden' value=\"" + s2.replace(/"/gm,"&#34;").replace(/>/gm,"&gt;").replace(/</gm,"&lt;") + "\" name=\"" + s + "\"  id=\"" + s + "\">");
                  }
                 else{
                     if("hidden"==oIpt.attr("type"))
                     {
                         oIpt.val(s2);
                     oIpt=Base.getInputDiv(oIpt)[0];
                     oIpt=$(Base.A(oIpt.getElementsByTagName("INPUT")));
                     if(2==oIpt.length && -1 < String($(oIpt[0]).attr("onkeydown")).indexOf("sok(this)"))
                        $(oIpt[0]).val(Select.getDescByValue(s2,oIpt[0]));
                     }
                     else if("checkbox"==oIpt.attr("type"))oIpt.attr("checked",true),(oIpt.attr("name") + "__").setValue(s2);
                     else if("radio"==$(oIpt[0]).attr("type"))
                         oIpt.each(function(){
                             if(this.value==s2)this.checked=true,(this.name + "__").setValue(s2);
                         });
                     else oIpt.val(fnMl(s2,oIpt));
                 }
                 }else oIpt.val(fnMl(s2,oIpt));
              }
              else this.val(fnMl(s || "",this));
              window.bBoBq=false;
           }),setFocus:(_t.setFocus=function(s){
              var o=this,szTitle,arg=arguments;
              $(document).ready(function(){
              if(s)o=$(_t.getObj(s));
              if(0==o.length)o=("#" + s);
              if("hidden"==o.attr("type"))
              {
                 if("INPUT"==o.prev().attr("nodeName"))
                      o=o.prev();
              }
              else if("DIV"==o.attr("nodeName"))
                  o=o.find(":input:first");
              window.g_fcsfld=o.attr("name") || o.attr("id");
              o.focus();
              if(szTitle=(o.attr("title") || arg[1] || o.parent("div").parent("div." + xuiInput).attr("title")))
              o.attr("title",szTitle=szTitle.replace(/\n/gm,"<br>"));
              });
           }),setReadOnly:(_t.setReadOnly=function(s,b){
              var o=this,p;
              if(s)
              {
                 o=$("#" + s);
                 if(0==o.size())
                 {
                         $(":input").each(function(){
                         if(this.name==s || this.name=="dto(" + s + ")")
                         {
                            o=$(this);
                            // if("hidden"==o.attr("type"))o=o.prev();
                            p=Base.getInputDiv(o);
                            o=$(p.find(":input")[0]);
                            if("undefined"==typeof b || true==b)
                                o.attr("readonly","readonly"),p.addClass("readOnly");
                            else o.removeAttr("readonly"),p.removeClass("readOnly");
                         }
                        });
                    return this;
                 }
              }
               if("undefined"==typeof b || true==b){
                   $(o.find(":input")[0]).attr("readonly","readonly");o.addClass("readOnly");
                   }
            else {$(o.find(":input")[0]).removeAttr("readonly");o.removeClass("readOnly");}
           }),enabledButton:(_t.enabledButton=function(s){
  var o=this;
             if(s)o=$("#" + s);
             if(0==o.size())o=$("button[name=" + s + "]");
             o.removeAttr('disabled');
           }),disabledButton:(_t.disabledButton=function(s){
              var o=this;
              if(s)o=$("#" + s);
              if(0==o.size())o=$("button[name=" + s + "]");
              o.attr('disabled',"true");
           }),addRedStar:(_t.addRedStar=function(s)
           {
             var o=this;
             if(s)
             {
                var i,a=s.split(/[,;\|\s]/);
                for(i=0; i < a.length; i++)
                {
                  o=_t.getInputDiv(a[i]);
                  if(0==o.find("b").length)
                  {
                      var o34=o.find("nobr");
                      if(0==o34.size())o34=o.find("label");
                        _t.insertHtml(o34[0],"AfterBegin","<b class=\"redStar\">*</b>");
                  }
                  o.find("input,textarea:first").attr("isRequired","true");
                  if(o.find("input,textarea")[1])o.find("input,textarea").eq(1).attr("isRequired","true");
                }}else o.each(function()
             {
                var o1=_t.getInputDiv(this);
                if(0==o1.find("b").length)
                {
                   var o34=o1.find("nobr");
                   if(0==o34.size())o34=o1.find("label");
                   _t.insertHtml(o34[0],"AfterBegin","<b class=\"redStar\">*</b>");
                }
                o1.find("input,textarea:first").attr("isRequired","true");
                if(o1.find("input,textarea")[1])o1.find("input,textarea").eq(1).attr("isRequired","true");
             });
           }),delRedStar:(_t.delRedStar=function(s)
           {
             var o=this;
             if(s)
             {
                var i,a=s.split(/[,;\|\s]/);
                for(i=0; i < a.length; i++)
                {
                  if(0 >=$(Base.getObj(a[i])).length)continue;
                  o=Base.getInputDiv(a[i]);// _t.getObj(a[i]).parent().parent();
                  o.find("b").remove();
                  o.find("input,textarea:first").removeAttr("isRequired");
                  if(o.find("input,textarea")[1])o.find("input,textarea").eq(1).removeAttr("isRequired");
                }
             }
             else o.each(function()
             {
                var o1=Base.getInputDiv(this);// $(this).parent("div").parent("div");
                o1.find("b").remove();
                o1.find("input,textarea:first").removeAttr("isRequired");
                if(o1.find("input,textarea")[1])o1.find("input,textarea").eq(1).removeAttr("isRequired");
             });
           }),validateForm: (_t.validateForm=function(s,ids)
           {
              if(s==document.forms[0])s=":input";
              var oBts=ids && ids.split(/[;,\t\s\|]/) || [],i=0;
              for(i=0; i < oBts.length; i++)oBts[i].disabledButton();
              if(!Base.validateForm1(s))
              {
                 for(i=0; i < oBts.length; i++)oBts[i].enabledButton();
                 return false;
              }
              return true;
           }),validateForm1: (_t.validateForm1=function(s)
           {
             var o=this,bR=true;
             if(s)
             {
                var i,a=s.split(/[;,\s\|]/),oCur;
                for(i=0; i < a.length; i++)
                {
                   oCur=$(_t.getObj(a[i]));
                   if("true"==oCur.attr("isRequired") && !oCur.val().trim() || -1 < (oCur.attr("class") || '').indexOf("x-form-invalid"))
                   {
                      if("hidden"==oCur.attr("type"))oCur=oCur.prev();
                      window.g_fcsfld=oCur.attr("name") || oCur.attr("id");
                      alert($(_t.p(oCur[0],"DIV")).parent("div").find("label").text().replace(/^\s*\**/,"") + " 不能为空");
                      return false;
                   }
                }
             }
             else
             {
               if("undefined"==typeof o.length)o=$(":input:not(:checkbox[checked=false])");
               if(o.length)
               try{
                 o.each(function()
                 {
                   var oCur=$(this);
                   if("true"==oCur.attr("isRequired") && !oCur.val().trim())
                   {
                      if("hidden"==oCur.attr("type"))oCur=oCur.prev();
                      g_fcsfld=oCur.attr("name") || oCur.attr("id");
                      var oDv9=$(_t.p(oCur[0],"DIV")).parent("div");
                      if('none' !=oDv9.css("display")){alert(oDv9.find("label").text().replace(/^\s*\**/,"") + "  不能为空");
                      bR=false;
                      throw "stop";}
                   }
                 });
               }catch(e){}
             }
             return bR;
           })
        });
        window.getBrowserObjects=function()
       {
      var tempArr=[];
      for (var name in navigator)
      {
        var value=navigator[name];
        switch (typeof(value))
        {
            case "string":
            case "boolean":
                tempArr.push("navigator." + name + "=" + escape(value));
                break;
        }
       }
       for (var name in screen)
       {
         var value=screen[name];
         switch (typeof(value))
         {
            case "number":
                tempArr.push("screen." + name + "=" + escape(value));
                break;
          }
        }        
        return tempArr.join("&");
      };
      if(_t.bIE)
      { 
       _t.nVer=parseFloat(/MSIE\s*(\d(\.\d)?);/g.exec(navigator.userAgent)[1]) ||  0;
       if(7 > _t.nVer)
         try{document.execCommand("BackgroundImageCache",false,true)}catch(e){}
      }
      _t.trim=String.prototype.trim=function(s){return (s||this.toString()).replace(/(^\s*)|(\s*$)/gm,"")};
      window.swf=String.prototype.swf=function(s){
         var id=(s || this) + "S";
         return -1 !=navigator.appName.indexOf("Microsoft") ? window[id] || document.getElementById(id): document[id];
      };
      Array.prototype.indexOf=function(f){
        for(var i=0; i < this.length; i++)
         if(this[i]==f)return i;
        return -1;
      };
      $(document).ready(function(){
         $(window).error(function(){return false});
      });
      Function.prototype.bind=function(o)
  {
     var _t=this,a=Base.A(arguments);a.shift();
     return function(e)
     {
        _t.apply(o || _t,Base.A(arguments).concat(a));
     }
  };
  
  $.fn.insertNode=function(where,node){
    return this.each(function(){
      if (this.insertAdjacentElement){
        this.insertAdjacentElement(where,node);
      } else {
        switch(where){
          case "beforeBegin":
            this.parentNode.insertBefore(node,this); 
            break;
          case "afterBegin" :  
            this.insertBefore(node,this.firstChild); 
            break;
          case "beforeEnd":
            this.appendChild(node);
            break;   
          case "afterEnd":
            if(this.nextSibling){
              this.parentNode.insertBefore(node,this.nextSibling);
            } else {
              this.parentNode.appendChild(node);
            }  
            break;   
        }
      }
    });
  };
      return this;
  },binds: function(a)
  {
     for(var i=0; i < a.length; i++)
       this[a[i]]=this[a[i]].bind(this);
  },
  bUnload: 1,a:[],nDatetime:24 * 60 * 60 * 1000,
  p:function(o,szTagName,n)
  {
    var i=0;
    while(o && i++ < (n || 50))
    {
      if(o=o.parentNode)
      {
        if(!o || "BODY"==o.nodeName || "HTML"==o.nodeName)return null;
        if(o.nodeName===szTagName)return o;
      }else break;
    }
    return null;
  },
  A:function(a)
  {
   if(0==arguments.length)
     a=arguments.callee.caller.arguments;
    var i=0,b=[];
    for(; i < a.length; i++)
       b.push(a[i]);
    return b;
  },
  getDom:function(s)
  {
     if(!s || !document)return null;
     var o=("string"==typeof s ? document.getElementById(s) : s),k;
     
     
    return o;
  },getByTagName: function(s,o)
  {
     return (o || document).getElementsByTagName(s)
  },getByName: function(s,o)
  {
     return (o || document).getElementsByName(s)
  },
  fireEvent:function(szElement,szEvent)
  {
    if(document.all)
       this.getDom(szElement).fireEvent('on' + szEvent);
    else{
      var evt=document.createEvent('HTMLEvents');
      evt.initEvent(szEvent,true,true);
      this.getDom(szElement).dispatchEvent(evt);
    }
  },
  bind:function(fn,o)
  {
     var _t=this,a=_t.A(arguments);a.shift();a.shift();
     return function(e)
     {
        return fn.apply(o || _t,_t.A(arguments).concat(a));
     }
  },
  unLoad:function(o,t,f)
  {
    var _this=Base || this,b=_this.a,i;
    if(b)
    {
    i=b.length - 1;
    if(_this.bIE)for(; i > -1; i--)b[i][0].detachEvent(b[i][1],b[i][2]);
    else for(; i > -1; i--)b[i][0].removeEventListener(b[i][1],b[i][2],false);
    delete b,delete _this.a;
    }
  },
  detachEvent:function(o,type,fn)
  {
    o=o || document.body;
    o.detachEvent ? o.detachEvent("on" + type,fn) : o.removeEventListener(type,fn,false);
  },
  addEvent:function()
  {
    var o=arguments[0],t=arguments[1],f=arguments[2],_this=this,fn=function(){
      _this.bIE && o.attachEvent('on' + t,f) || o.addEventListener(t,f,false);
      o !=window && _this.a.push([o,t,f]);
      _this.bUnload && (_this.bUnload=0,_this.addEvent(window,"unload",_this.unLoad));
    };
    'load' !=t && window.setTimeout(fn,13) || fn();
    return this;
  },
  getCookie:function(k)
  {
    var a=(document.cookie || '').split(";");
    for (var i=0; i < a.length; i++)
    {
       var b=a[i].split("=");
       if(k==b[0].replace(/(^\s*)|(\s*$)/g,''))
         return unescape(b[1]);
    }
    return "";
  },
  setCookie: function(k,v)
  {
    var d=new Date(),s=k + "=" + escape(v) + ";expires=";
    d.setTime(d.getTime() + 365 * this.nDatetime);
    if(!v)s +="Fri,31 Dec 1999 23:59:59 GMT;";
    else s +=d.toGMTString();
    document.cookie=s;
    return this;
  },
  clearScroll:function(o)
  {
    var k=this.getDom(o).id;
    delete top.__aScroll[k];
    this.setCookie(k,null);
  },
  autoSaveScroll: function(o)
  {
    top.__aScroll || (top.__aScroll=[]);
    o=this.getDom(o);
    var t=this,k=o.id,s=t.getCookie(k) || top.__aScroll[k];
    s && t.addEvent(window,'load',function(e){o.scrollTop=s,t.setCookie(k,null),delete top.__aScroll[k]});
    t.addEvent(o,'scroll',function(e)
    {
      e=t.FromEventObj(e);
      window.setTimeout(function(){
        t.setCookie(k,top.__aScroll[k]=e.scrollTop);
      },13);
    });
    return this;
  },decodeStr: function(s)
  {
        return (s || '').replace(/[^\0-\255]/gm,function()
        {
          return "&#" + arguments[0].charCodeAt(0) + ";";
        })
  },
  updateUi:function(o)
  {
    var s=[],s1=[""],o1,_t=this,s2;
    if(!o.data)return alert("updateUi调用参数不正确，没有指定参数data");
    
    o.postData && o.postData.each(function()
    {
       o1=$(this.toString());
       if(o1[0] && !o1[0].nodeName)o1=$("#"+ this + " :input:not(:checkbox[checked=false])");
       if(o1[0] && !o1[0].nodeName)o1=$(":input[name=" + this + "]");
       if(o1 && 0 < o1.length)
       {
          o1.each(function()
          {
             if(this.name && (s2=$(this).val()))
               s1.push(this.name + "=" + escape(_t.decodeStr(s2)));
          });
       }
       else s1.push(this);
    });
    
    o.data.each(function(){s.push(this.join(","))});
    if("undefined" !=typeof Base && Base.XuiLoading)Base.XuiLoading();//show
    o.url=o.url || document.location.href;
    if("undefined" !=typeof g_szJsessionid)
    {
        if(-1==o.url.indexOf("?"))o.url +="?jsessionid=" + g_szJsessionid;
        else o.url +="&jsessionid=" + g_szJsessionid;
    }
    if(-1==o.url.indexOf("?"))o.url +="?_ntm_=" + new Date().getTime();
    else o.url +="&_ntm_=" + new Date().getTime();
    fnLoadsts(1);
    $.ajax({
    cache:false,async:o.bAsync && !!o.fn,beforeSend:function(xml){
        xml.setRequestHeader("XUIAJAX",1);
  xml.setRequestHeader("CMHS","JsonRpc");
      },data: "__ajaxParam_=" + s.join('|') + s1.join("&"),url: o.url || document.location.href,type:"post",dataType:"html",complete:function(obj){
    fnLoadsts();
    o.fn(obj.responseText);
    }
    }); 
    
  },
  createDiv:function()
  {
     var o=null,b=!!arguments[0] || false,p=arguments[0],k;
      p && !p["id"] && (p["id"]="_Xui_SelectDiv");
     if(p && p["id"] && (o=this.getDom(p["id"])))return o;
     o=document.createElement("div");
     if(b)
     {
       p["className"] || (p["className"]="x-combo-list");
       for(k in p)o[k]=p[k];
     }
     document.body.appendChild(o);
     return o;
  },
  showShadow:function(o)
  {
      var old=o;
      var w=parseFloat(this.getStyle(o,"width")) + 10,h=parseFloat(this.getStyle(o,"height") || 1) + 7,oTmp=this.getDom("xuiSelectShdow") || {},obj=oTmp.style,left=parseFloat(this.getStyle(o,"left")) - 4,top=parseFloat(this.getStyle(o,"top")) - 2,zIndex=(this.getStyle(o,"zIndex") || 11000) - 1;
     if(!obj || !h || !w || 12 > h)return this;
     o=o.style;
     $(oTmp).css({width:w + "px",height: h + "px",top: top + "px",left: left + "px",zIndex: zIndex,position: "absolute"});
     if(!(obj=this.getDom("xuislctsd4")))return this;
     if(12 < w)
     obj.style.width=this.getDom("xuislctsd3").style.width=this.getDom("xuislctsd1").style.width=(w - 12) + "px";
     obj=this.getDom("xuislctsd2");
     obj.style.height=(h - 12) + "px";
     o=obj.getElementsByTagName("div");
     for(w=0; w < o.length; w++)o[w].style.height=obj.style.height;
     oTmp.style.display=old.style.display="block";
  },hiddenShadow:function(o)
  {
    var oTmp;
    if(oTmp=this.getDom("xuiSelectShdow"))oTmp.style.display='none';
    o.style.display='none';
    return this;
  },regTimer:function(fn,n)
  {
    var _t=this,nTime=window.setInterval(function()
    {
      if(fn(_t))window.clearInterval(nTime);
    },n || 13);
    return nTime;
  },clearTimer:function(n){n && window.clearInterval(n)},addInvalid: function(o)
   {
      this.addClass("x-form-invalid",o);
   },delInvalid: function(o)
   {
      this.delClass("x-form-invalid",o);
   },
   addClass: function(s,o)
   {
      $(o).addClass(s);
      return this;
   },
   delClass: function(s,o)
   {
      $(o).removeClass(s);
      return this;
   },FromEventObj: function(e){return (e=e || window.event).target || e.srcElement},
  preventDefault:function(e)
  {
      e=e || window.event || {};
      return e.preventDefault ? e.preventDefault() : (e.returnValue=false);
  },
  stopPropagation:function(e)
  {
     e=e || window.event || {};
     return e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true);
  },
  insertHtml:function(el,where,html){
  where=where.toLowerCase();if(!el)return this;
  if(el.insertAdjacentHTML){
      switch(where){
          case "beforebegin":
              el.insertAdjacentHTML('BeforeBegin',html);
              return el.previousSibling;
          case "afterbegin":
              el.insertAdjacentHTML('AfterBegin',html);
              return el.firstChild;
          case "beforeend":
              el.insertAdjacentHTML('BeforeEnd',html);
              return el.lastChild;
          case "afterend":
              el.insertAdjacentHTML('AfterEnd',html);
              return el.nextSibling;
      }
  }
  var range=el.ownerDocument.createRange(),frag;
  switch(where){
       case "beforebegin":
          range.setStartBefore(el);
          frag=range.createContextualFragment(html);
          el.parentNode.insertBefore(frag,el);
          return el.previousSibling;
       case "afterbegin":
          if(el.firstChild){
              range.setStartBefore(el.firstChild);
              frag=range.createContextualFragment(html);
              el.insertBefore(frag,el.firstChild);
              return el.firstChild;
          }else{
              Base.clearChldNd(el).innerHTML=html;
              return el.firstChild;
          }
      case "beforeend":
          if(el.lastChild){
              range.setStartAfter(el.lastChild);
              frag=range.createContextualFragment(html);
              el.appendChild(frag);
              return el.lastChild;
          }else{
              Base.clearChldNd(el).innerHTML=html;
              return el.lastChild;
          }
      case "afterend":
          range.setStartAfter(el);
          frag=range.createContextualFragment(html);
          el.parentNode.insertBefore(frag,el.nextSibling);
          return el.nextSibling;
      }
  },
  
  fnMvIstPoint: function(o,n1,n2,e)
  {
    try{
     e=e || window.event || null;
     o=o || e.target || e.srcElement || null;
     var bErr=false;
     if("undefined" !=typeof document.selection)
     {
      try{
        
        var oSel=document.selection.createRange();
        
        oSel.moveStart ('character',-o.value.length);
        oSel.moveEnd("character",-o.value.length);
        
        oSel.moveStart('character',n1);
        oSel.moveEnd('character',n2 || 0);
        r.select();
        }catch(e){bErr=true;}
     }
     if(bErr && o.createTextRange)
     {
      var r=o.createTextRange();
      
      r.moveStart('character',n1);
      
      r.collapse(true);
      r.select();
     }else
     {
         o.startSelection=n1 - 1;
         o.selectionEnd=n2 || n1 || 0;
         o.focus();
     }
    }catch(e){}
  },
     isLeapYear:function(n)
     {
        return(0==n % 400 || (0==n % 4 && 0 !=n % 100))
     },
    getWeek:function(o)
    {
       if(3==arguments.length)arguments[1]--,o=new Date(arguments[0],arguments[1],arguments[2]);
       return o.getDay();     
    },
     RunOne: function(fn,o)
     {
        var _t=this;
        new function(){
        if(this._RunOne)return o || _t;
        this._RunOne=true;
        fn.call(o || _t);
        this._RunOne=false;
        }
     },getStyle : function(){
         var view=document.defaultView,propCache={},camelRe=/(-[a-z])/gi,camelFn=function(m,a){ return a.charAt(1).toUpperCase(); };  
        return view && view.getComputedStyle ?
            function(el,prop){
                var v,cs,camel;
                if(prop=='float'){
                    prop="cssFloat";
                }
                if(v=el.style[prop]){
                    return v;
                }
                if(cs=view.getComputedStyle(el,"")){
                    if(!(camel=propCache[prop])){
                        camel=propCache[prop]=prop.replace(camelRe,camelFn);
                    }
                    return cs[camel];
                }
                return null;
            } :
            function(el,prop){
                var v,cs,camel,camelRe=/(-[a-z])/gi,camelFn=function(m,a){ return a.charAt(1).toUpperCase(); }; 
                if(prop=='opacity'){
                    if(typeof el.style.filter=='string'){
                        var m=el.style.filter.match(/alpha\(opacity=(.*)\)/i);
                        if(m){
                            var fv=parseFloat(m[1]);
                            if(!isNaN(fv)){
                                return fv ? fv / 100 : 0;
                            }
                        }
                    }
                    return 1;
                }else if(prop=='float'){
                    prop="styleFloat";
                }
                if(!(camel=propCache[prop])){
                    camel=propCache[prop]=prop.replace(camelRe,camelFn);
                }
                if(v=el.style[camel]){
                    return v;
                }
                if(cs=el.currentStyle){
                    return cs[camel];
                }
                return null;
            };
    }(),getScroll : function(d){
        var doc=document;
        if(d==doc || d==doc.body){
            var l,t;
            if(this.isIE && this.isStrict){
                l=doc.documentElement.scrollLeft || (doc.body.scrollLeft || 0);
                t=doc.documentElement.scrollTop || (doc.body.scrollTop || 0);
            }else{
                l=window.pageXOffset || (doc.body.scrollLeft || 0);
                t=window.pageYOffset || (doc.body.scrollTop || 0);
            }
            return {left: l,top: t};
        }else{
            return {left: d.scrollLeft,top: d.scrollTop};
        }
    },getViewWidth : function(full) {
            return full ? this.getDocumentWidth() : this.getViewportWidth();
        },getViewHeight : function(full) {
            return full ? this.getDocumentHeight() : this.getViewportHeight();
        },getDocumentHeight: function() {
            var scrollHeight=(this.compatMode !="CSS1Compat") ? document.body.scrollHeight : document.documentElement.scrollHeight;
            return Math.max(scrollHeight,this.getViewportHeight());
        },getDocumentWidth: function() {
            var scrollWidth=(this.compatMode !="CSS1Compat") ? document.body.scrollWidth : document.documentElement.scrollWidth;
            return Math.max(scrollWidth,this.getViewportWidth());
        },getViewportHeight: function(){
            if(this.isIE){
                return this.isStrict ? document.documentElement.clientHeight :
                         document.body.clientHeight;
            }else{
                return self.innerHeight;
            }
        },getViewportWidth: function() {
            if(this.isIE){
                return this.isStrict ? document.documentElement.clientWidth :
                         document.body.clientWidth;
            }else{
                return self.innerWidth;
            }
        },getOffset: function(o){
    
    var a=[o.offsetLeft,o.offsetTop,o.offsetWidth,o.offsetHeight,0,0],r,parent,n;
    if(o.getBoundingClientRect)
    {
       r=o.getBoundingClientRect();
       var scrollTop=Math.max(document.documentElement.scrollTop,document.body.scrollTop),scrollLeft=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
       a[0]=parseInt(r.left + scrollLeft);
       a[1]=parseInt(r.bottom + scrollTop);
    }
    else if(document.getBoxObjectFor)
{
  r=document.getBoxObjectFor(o); 
  var s=this.getStyle(o,"borderLeftWidth"),borderLeft=s ? parseInt(s) : 0,borderTop=(s=this.getStyle(o,"borderTopWidth")) ? parseInt(s) : 0; 
  a[0]=r.x - borderLeft,a[1]=r.y - borderTop;
}
    else 
    {
        a[0]=a[1]=a[4]=a[5]=0;
        a[1] +=o.clientHeight;
        parent=o;
        if(o !=parent.offsetParent)
        {
        while(parent && document.body !=parent)
        {
          a[0] +=(parent.offsetLeft || 0);
          a[1] +=(parent.offsetTop || 0);
          a[4] +=(parent.scrollLeft || 0);
          a[5] +=(parent.scrollTop || 0);
          if(!this.isNS6)
          {
             if(n=parseInt(parent.currentStyle.borderLeftWidth,10))a[0] +=n;
             if(n=parseInt(parent.currentStyle.borderTopWidth,10))a[1] +=n;
              }
          parent=parent.offsetParent
        }
        }
     }
     return a;
    },isCSS1Compat: (document.compatMode=="CSS1Compat"),
openWin: function(o,a){
  var p=o["param"],dto=o["dto"],target=o["target"] || null,url='_self' !=target ? o["url"] + p + "&xui_pop_win=true" : o["url"] + p,width=o["width"] || 800,height=o["height"] || 600,option="height=" + height + ",width=" + width + ",top=" + parseInt((screen.height - height)/2 * 0.75) + ",left=" + parseInt((screen.width - width)/2) + ",status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes";
  if ("undefined" !=typeof dto){
    var _this=this;
    $(dto).each(function(){
      var value=_this.getObj(this).val();
      if(null !=value && "" !=value){
        url +="&" + this + "=" + escape(_this.decodeStr(value));
      }
    });
  }
  window.open(url,target,option);
  return false;
},

openBtnWin : function(url,param,width,height){
   var p="",_this=this,o=null;
  width || (width=950);
   height || (height=760);
   if(param)
   $(param).each(function(){
     var os=_this.getObj(this),value=$(os[os.length - 1]).val();
     if(null !=value){
        p +="&" + this + "=" + escape(_this.decodeStr(value));
      }
   });
   o={"url":url,"param":p,"width":width,"height":height};
   this.openWin(o,null);
},showDiv: function(o,oDiv,w,h,left)
{if(!o)return;
if(this.bIE)
{
  var nS=document.documentElement.scrollHeight,oD=$(oDiv);
  obj=o.getBoundingClientRect();
  oD.css({left:(obj.left + document.documentElement.scrollLeft) + "px",top:(obj.bottom + document.documentElement.scrollTop + document.body.scrollTop)+ "px",width:(w || (obj.right - obj.left)) + "px"});
  if(h)oD.css({height:h + "px"});
  oD.css({position: "absolute",zIndex: 10000,display: 'block'});
  if(document.documentElement.scrollHeight > nS)oDiv.style.top=(obj.bottom - $(o).height() - oD.height() + document.documentElement.scrollTop + document.body.scrollTop) + "px";
}else
{
  var oR=this.getOffset(o),style=oDiv.style,k,hs=[ document.documentElement.scrollHeight,document.documentElement.clientHeight,document.documentElement.scrollWidth,document.documentElement.clientWidth],p={ left: (left || (oR[0] - (this.bIE ? 2 : 0))) + "px",top: (oR[1] - (this.bIE ? 5 : 2)) + "px",position: "absolute",width: parseInt(w || o.clientWidth || oR[2]) + "px"};

      if(h)p["height"]=parseInt(h,10) + 'px'; 
      for(k in p)style[k]=p[k];
      style["display"]="block";
      
      style["height"]=$(oDiv).height() + "px";
      if(4==arguments.length)
      oDiv.style.width=Math.max(parseInt($(o).width(),10),parseInt(oDiv.style.width,10)) + "px";
      hs[4]=parseInt(oDiv.style.top,10);
      hs[5]=parseInt(oDiv.style.height,10);
      hs[6]=parseInt(oDiv.style.left,10);
      hs[7]=parseInt(oDiv.style.width,10);
      if(hs[4] + hs[5] > hs[1] + document.documentElement.scrollTop + 40)oDiv.style.top=(hs[4] - hs[5] - $(o).height()) + "px";
      if(hs[6] + hs[7] > hs[3] + document.documentElement.scrollLeft)oDiv.style.left=(hs[6] - hs[7] - $(o).width()) + "px";
      }
      this.showShadow(oDiv);
}
}).init(), DatePicker = XUI({
    dpIpt: null,
    XuiDatePicker: null,
    xuiDPRows: null,
    xuiCurYear:null,xuiSlctMY:null,slctM: 0,slctY: 0,szSfmVal:"",
    year:0,month:0,day:0,dpMax: null,dpMin: null,
    pkData: [],
    upi4ajx:function(){
     if(DatePicker.dpIpt && DatePicker.dpIpt.name)DatePicker.dpIpt=document.getElementsByName(DatePicker.dpIpt.name)[0];
     if(this.dpIpt && this.dpIpt.name)this.dpIpt=document.getElementsByName(this.dpIpt.name)[0];
  },initPkData:function(nY,m,d)
    {
       var o=new Date(this.year=parseInt(nY,10),(this.month=parseInt(m,10)) - 1,this.day=parseInt(d,10));
       this.pkData=[31,(this.isLeapYear(nY) ? 29 : 28),31,30,31,30,31,31,30,31,30,31];
       return this;
    },
setDate:function()
{
    var a=this.A(arguments),b;
    if(3==a.length)a[3]=true;
    
    if(this.year)
       b=[this.year,this.month,this.day,false],this.year=this.month=this.day=0,this.setDate.apply(this,b);
    if(a[3])this.year=parseInt(a[0],10),this.month=parseInt(a[1],10),this.day=parseInt(a[2],10);
    this.initPkData(this.year,this.month,this.day);
},
showXuiSlctMY: function(y)
{
   var o=this.xuiSlctMY,oTb=this.getByTagName("TABLE",o)[0],i,j,r,k=4,p,oldY=this.year,yy=y || this.slctY || oldY,y1=this.slctY || oldY,m=this.slctM || this.month;
   this.year=y || oldY;
   this.oldYear=this.year; 
   for(i=0; i < oTb.rows.length; i++)
   {
      r=oTb.rows[i];
      for(j=0; j < r.cells.length; j++)
      {
         if(2 > j)
         {
            if(m==(i * 2 + (j + 1)))
              this.addClass("x-date-mp-sel",r.cells[j]);
            else this.delClass("x-date-mp-sel",r.cells[j]);
         }
         else if(0 < i && 1 < j)
         {
            this.getByTagName("A",r.cells[j])[0].innerHTML=p=(yy - k) + (j - 2) * 5;
            if((r.cells[j].textContent || r.cells[j].innerText)==y1)this.addClass("x-date-mp-sel",r.cells[j]);
            else this.delClass("x-date-mp-sel",r.cells[j]);
         }
      }
      k--;
   }   
   this.year=oldY;
   o.style.display="block";
   this.dpIpt.focus();
},slctOk:function() 
{
   this.year=this.slctY || this.year;
   this.month=this.slctM || this.month;
   this.pkData[1]=this.isLeapYear(this.year) ? 29 : 28;
   if(this.pkData[this.month - 1] < this.day)
     this.day=this.pkData[this.month - 1];
   this.addDate(0);
   this.hiddenXuiSlctMY();
},slctMY: function(e,o) 
{
   var n=parseInt((o.textContent || o.innerText).replace(/\s/g,""),10);
   o=this.p(o,"TD");
   if(1 < o.cellIndex)
     this.slctY=n;
   else this.slctM=n;
   
   this.showXuiSlctMY(false);
},hiddenXuiSlctMY: function() 
{
   this.xuiSlctMY.style.display="none";
   this.dpIpt.focus();
   window.bBoBq=false;
},
initDivHtml:function()
{
    var i,j,a=["<ul class=\"x-menu-list\"><li class=\"x-menu-list-item x-menu-date-item\"><div style=\"-moz-user-select: none; width: 176.5px;\" class=\"x-date-picker x-unselectable\"><table style=\"width:175px;height:186px;\" cellspacing=\"0\"><tbody>","<tr><td class=\"x-date-left\"><a onclick=\"DatePicker.month--,DatePicker.addDate(0)\" class=\"x-unselectable\" style=\"-moz-user-select: none;\" href=\"javascript:void(0)\" title=\"\u4e0a\u6708(Ctrl+Left)\">&nbsp;</a></td><td class=\"x-date-middle\" align=\"center\"><table style=\"width: auto;\" class=\"x-btn-wrap x-btn\" border=\"0\" cellpadding=\"0\"cellspacing=\"0\"><tbody><tr class=\"x-btn-with-menu\"><td class=\"x-btn-left\"><i>&nbsp;</i></td><td class=\"x-btn-center\"><em unselectable=\"on\" onclick=\"DatePicker.showXuiSlctMY()\"><button class=\"x-btn-text\" type=\"button\" id=\"xuiCurYear\"></button></em></td><td class=\"x-btn-right\"><i>&nbsp;</i></td></tr></tbody></table></td><td class=\"x-date-right\"><a onclick=\"DatePicker.month++,DatePicker.addDate(0)\" class=\"x-unselectable\" style=\"-moz-user-select: none;\" href=\"javascript:void(0)\" title=\"\u4e0b\u6708(Ctrl+Right)\">&nbsp;</a></td></tr>"];

a.push("<tr><td colspan=\"3\"><table class=\"x-date-inner\" cellspacing=\"0\" style=\"height:139px;\"><thead><tr><th title=\"\u661f\u671f\u5929\"><span>\u65e5</span></th><th title=\"\u661f\u671f\u4e00\"><span>\u4e00</span></th><th title=\"\u661f\u671f\u4e8c\"><span>\u4e8c</span></th><th title=\"\u661f\u671f\u4e09\"><span>\u4e09</span></th><th title=\"\u661f\u671f\u56db\"><span>\u56db</span></th><th title=\"\u661f\u671f\u4e94\"><span>\u4e94</span></th><th title=\"\u661f\u671f\u516d\"><span>\u516d</span></th></tr></thead><tbody id=\"xuiDatePicker\">");
for (j=0; j < 6; j++) {
a.push("<tr>");
for (i=0; i < 7; i++) {
a.push("<td onclick=\"return DatePicker.click(event,this)\"><a href=\"javascript:void(0)\" hidefocus=\"on\"><em><span></span></em></a></td>");
}
a.push("</tr>");
}


a.push("</tbody></table></td></tr><tr><td colspan=\"3\" class=\"x-date-bottom\" align=\"center\"><table onclick=\"DatePicker.selectToday()\" style=\"width: auto;\" class=\"x-btn-wrap x-btn\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><td class=\"x-btn-left\"><i>&nbsp;</i></td><td class=\"x-btn-center\"><em unselectable=\"on\"><button class=\"x-btn-text\" type=\"button\">\u4eca\u5929</button></em></td><td class=\"x-btn-right\"><i>&nbsp;</i></td></tr></tbody></table></td></tr></tbody></table><div id=\"xuiSlctMY\" class=\"x-date-mp\" style=\"display: none; width: 175px; height: 193px; position: absolute; left: 0px; top: 0px; z-index: auto;\"><table cellspacing=\"0\" border=\"0\" style=\"width: 175px; height: 193px;\"><tbody><tr><td class=\"x-date-mp-month\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">1</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">2</a></td><td align=\"center\" class=\"x-date-mp-ybtn\"><a class=\"x-date-mp-prev\" onclick=\"DatePicker.showXuiSlctMY(DatePicker.oldYear -=10)\"></a></td><td align=\"center\" class=\"x-date-mp-ybtn\"><a class=\"x-date-mp-next\" onclick=\"DatePicker.showXuiSlctMY(DatePicker.oldYear +=10)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">3</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">4</a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">5</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">6</a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">7</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">8</a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">9</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">10</a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr><td class=\"x-date-mp-month\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">11</a></td><td class=\"x-date-mp-month x-date-mp-sep\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\">12</a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td><td class=\"x-date-mp-year\"><a href=\"javascript:void(0)\" onclick=\"DatePicker.slctMY(event,this)\"></a></td></tr><tr class=\"x-date-mp-btns\"><td colspan=\"4\"><button class=\"x-date-mp-ok\" type=\"button\" onclick=\"DatePicker.slctOk()\">\u786e\u5b9a</button><button class=\"x-date-mp-cancel\" type=\"button\" onclick=\"DatePicker.hiddenXuiSlctMY()\">\u53d6\u6d88</button></td></tr></tbody></table></div></div></li></ul>");

    return a.join("");
}, 
isInvalid: function(y,m,d)
{
      var dpMax=null,dpMin=null,nCurTm,bRst=true;
      if(this.dpMax)
      {
         dpMax=this.dpMax.split("-");
         if(3==dpMax.length)
            dpMax=new Date(parseInt(dpMax[0],10),parseInt(dpMax[1],10) - 1,parseInt(dpMax[2],10)).getTime();
         else dpMax=null;
      }
      if(this.dpMin)
      {
         dpMin=this.dpMin.split("-");
         if(3==dpMin.length)
           dpMin=new Date(parseInt(dpMin[0],10),parseInt(dpMin[1],10) - 1,parseInt(dpMin[2],10)).getTime();
         else dpMin=null;
      }
      if(dpMax || dpMin)
      {
         nCurTm=new Date(y,m - 1,d).getTime();
         if(dpMax && dpMin)bRst=nCurTm <=dpMax && nCurTm >=dpMin;
         else if(dpMax && !dpMin)bRst=nCurTm <=dpMax;
         else if(dpMin && !dpMax)bRst=nCurTm >=dpMin;
      }
      return !bRst;
},pushData: function()
{
  
  var a=this.A(arguments),r=a[5] || [],i,bEq=(this.year==a[0] && this.month==a[1]),c,d=new Date(),bTd=(d.getFullYear()==a[0] && (d.getMonth() + 1)==a[1]),nTdDay=d.getDate(); 
  delete d;
  for(i=0; i < a[3]; i++)
  {
     c=[a[4]];
     if(bEq && a[2]==this.day)c.push("x-date-selected");
     if(bTd && nTdDay==a[2])c.push("x-date-today");
     if(this.isInvalid(a[0],a[1],nCur=a[2]++))c.push("x-date-disabled");
     r.push([a[0],a[1],nCur,c.join(" ")]);
  }
  return r;
},
setValueD: function(e)
{
   DatePicker.upi4ajx();
   if("undefined"==typeof this.dpIpt.value || this.dpIpt.readOnly || this.dpIpt.disabled || "focus"==(window.event || {}).type)return false;
   var _t=this,s,o=_t.dpIpt,d=o.value.length,nTmp;
   _t.fnNoInput(function(){
        if(!o.maxLength || 23 < o.maxLength)
            o.maxLength=10;
        if(o.value && 10 <=d)
           _t.szSfmVal=o.value.substr(10,d - 10);
        if(19 <=o.maxLength)
        {
           d=new Date(); _t.szSfmVal=" " + (10 > (nTmp=d.getHours()) ? "0" + nTmp: nTmp)
                + ":" + (10 > (nTmp=d.getMinutes()) ? "0" + nTmp: nTmp) + ":" + 
                (10 > (nTmp=d.getSeconds()) ? "0" + nTmp: nTmp);delete d;
        }else _t.szSfmVal="";
        
   _t.month=parseInt(_t.month,10);
   _t.day=parseInt(_t.day,10);
   _t.year=parseInt(_t.year,10);
   if(!_t.isInvalid(_t.year,_t.month,_t.day))
   {
       if(!_t.szSfmVal && 10 < o.maxLength)_t.szSfmVal=o.value.substr(10);
   if(!e)
   s=[_t.year,9 < _t.month ? _t.month : "0" + _t.month,9 < _t.day ? _t.day : (0 < _t.day ? "0" + _t.day : 0)].join("-");
   else s=[_t.year,9 < _t.month ? _t.month : "0" + _t.month,_t.day].join("-");
   if(10==s.length && 10 < o.maxLength) s +=_t.szSfmVal;
   o.value=s.substr(0,o.maxLength || 10);
   if(o.onchange)o.onchange();
   }
   });
   Base.delInvalid(o);HidTip();
},updataTBody: function(e,bNSv)
{
   
   var m=this.month - 1,n=this.getWeek(this.year,this.month,1),r=this.xuiDPRows.childNodes,d,y=this.year,_t=this;
   if(0 >=m)m=12,y--;
   
   d=this.pushData(y,m,this.pkData[m - 1] - n + 1,n,"x-date-prevday");
   
   d=this.pushData(this.year,this.month,1,this.pkData[this.month - 1],"x-date-active",d);
   
       y=this.year,m=this.month + 1; if(12 < m)m=1,y +=1;
       d=this.pushData(y,m,1,42 - n - this.pkData[this.month - 1],"x-date-nextday",d);
       y=-1,n=0;
       for(i=0; i < d.length; i++)
       {
         if(0==i % 7)y++,n=0;
         if(6 <=y)break;
         this.getByTagName("A",r[y].childNodes[n])[0].className=r[y].childNodes[n].className=d[i][3];
         this.getByTagName("SPAN",r[y].childNodes[n])[0].innerHTML=d[i][2];
         r[y].childNodes[n].title=[d[i][0],d[i][1],d[i][2]].join("-");
         n++;
       }
       this.xuiCurYear.innerHTML=this.year + "\u5e74" + this.month + "\u6708";
       
       if(!bNSv)this.setValueD(e);
       
   !this.dpIpt["xuiBlur"] && this.dpIpt.focus();
},addDate: function(n)
{
   
   n=parseInt(this.day,10) + n;
   var y=this.year,m=this.month,d=this.pkData[m - 1];
   if(1 > m) m=this.month=12;
   else if(12 < m) m=this.month=1;
   if(0==n)
   {
      m--;
          if(1 > m)y--,m=12;
      n=this.pkData[m - 1];
   }
   else if(0 < n && n < d)this.day=n;
   else if(0 >=n)
   {
      m--;
      if(1 > m)y--,m=12;
      n +=this.pkData[m - 1];
   }
   else if(n > d)
   {
      m++;
      if(12 < m)y++,m=1;
      n -=d;
   }
   this.pkData[1]=this.isLeapYear(y) ? 29 : 28;
   
   return this.day=n,this.month=m,this.year=y,this.updataTBody(),this;
},
fnBq:function()
{
    if(null==this.dpIpt)return;
    DatePicker.upi4ajx();
    var o=this.dpIpt,n=o.value.length,a=o.value.split(/[-\\s:\.]/);
   if(3 <=a.length)
    {
       this.initPkData(a[0],a[1],a[2]);
       if(2==this.month && this.day > this.pkData[this.month - 1])
         o.value=this.year + "-" + a[1] + "-"
                     + this.pkData[this.month - 1]
                     + o.value.substr(10,o.value.length - 10); 
    }
    if(4==n || 7==n)o.value +="-";
    if(10 < o.maxLength)
    {
        if(10==n)o.value +=" ";
        else if(13==n || 16==n)o.value +=":";
    }
    this.fnMvIstPoint(o,o.value.length,o.value.length,null);
},
fnNoInput:function(fn){
  var _t=this;
   window.bBoBq=true;fn();setTimeout(function(){window.bBoBq=false},13);
},onkeyup:function(e,oIpt){
    var s=oIpt.value;
    s=s.replace(/[^\d]/g,'');
    if(8==s.length  && 10==oIpt.maxLength)
    {
       DatePicker.convertIptDate(oIpt);
       if(oIpt.onchange)oIpt.onchange(oIpt);
    }
},
    onkeydown:function(e,oIpt)
   {
    e=e || window.event;
     var n=e.which || e.keyCode,_t=this,x,k;
     if(!_t.XuiDatePicker)return false;
     DatePicker.upi4ajx();
     if("none"==_t.XuiDatePicker.style.display)
     {
        window.bBoBq=false;
        _t.showSelectDiv(e,oIpt);
        if(40==n && e.ctrlKey)_t.showSelectDiv(e,oIpt);
        return true;
     }
      switch(n)
     {
        case 46: 
                 return true; 
        case 8: 
              /* _t.fnNoInput(function(){
                  if(document.selection)document.selection.clear();
                  _t.fnMvIstPoint(oIpt,oIpt.value.length,oIpt.value.length,null);
               });*/
               return true;
        case 35:
        case 36:
        case 109:
        case 116:
        case 9:
               return true;
        case 83: 
           _t.stopPropagation(e),_t.preventDefault(e);
           if(e.ctrlKey)
             return _t.showXuiSlctMY(),false;
           return false;
           break;       
        
        case 27:
           if("block"==_t.xuiSlctMY.style.display)
                _t.hiddenXuiSlctMY();
           else _t.hidden();
           break;
        
        case 13:
           $(oIpt).blur();
           if(window[oIpt.id+"_validate"]){this.stopPropagation(e),this.preventDefault(e);oIpt.focus();return false;}
           if(e.ctrlKey)
           {
              _t.selectToday();
              return true;
           }
           if("block"==_t.xuiSlctMY.style.display)
           {
              _t.slctOk();
              return true;
           }
           _t.hidden();
           _t.bIE ? (e.keyCode=9) : '';
          
           break;
        case 38: 
           n=-7;
           var bSMy="block"==_t.xuiSlctMY.style.display;
           if(e.ctrlKey)
           {
              if(bSMy)
          {
              _t.slctY=(_t.slctY || _t.year) - 1;
              _t.showXuiSlctMY(false);
              return true;
          }
              else n=0,_t.year--,_t.pkData[1]=_t.isLeapYear(_t.year) ? 29 : 28;
           }
           if(!bSMy)_t.addDate(n);
           _t.stopPropagation(e),_t.preventDefault(e);
           return false;
        case 40: 
           n=7;
           var bSMy="block"==_t.xuiSlctMY.style.display;
           if(e.ctrlKey)
           {
              if(bSMy)
          {
              _t.slctY=(_t.slctY || _t.year) + 1;
              _t.showXuiSlctMY(false);
              return true;
          }
              else n=0,_t.year++,_t.pkData[1]=_t.isLeapYear(_t.year) ? 29 : 28;
           }
           if(!bSMy)_t.addDate(n);
           _t.stopPropagation(e),_t.preventDefault(e);
           return false;
        case 37: 
           n=-1;
           var bSMy="block"==_t.xuiSlctMY.style.display;
           if(e.ctrlKey)
           {
              if(bSMy)
          {
              _t.slctM=(_t.slctM || _t.month) - 1;
              if(1 > _t.slctM)_t.slctM=12;
              _t.showXuiSlctMY(false);
              return true;
          }
          else
          {
              _t.month--;
              if(1 > _t.month)_t.month=12,_t.year--,_t.pkData[1]=_t.isLeapYear(_t.year) ? 29 : 28;
              var nTmp=_t.pkData[_t.month - 1];
              if(2==_t.month && nTmp < _t.day)
                 _t.day=nTmp;
              n=0;
              }
           }
           if(!bSMy)_t.addDate(n);
           _t.stopPropagation(e),_t.preventDefault(e);
           return false;
        case 39: 
           n=1;
           var bSMy="block"==_t.xuiSlctMY.style.display;
           if(e.ctrlKey)
           {
              if(bSMy)
          {
              _t.slctM=(_t.slctM || _t.month) + 1;
              if(12 < _t.slctM)_t.slctM=1;
              _t.showXuiSlctMY(false);
              return true;
          }
          else
          {
              _t.month++;
              var nTmp=_t.pkData[_t.month - 1];
              if(12 < _t.month)_t.month=1,_t.year++,_t.pkData[1]=_t.isLeapYear(_t.year) ? 29 : 28;
              if(2==_t.month && nTmp < _t.day)
                 _t.day=nTmp;
              n=0;
              }
           }
           if(!bSMy)_t.addDate(n);
           _t.stopPropagation(e),_t.preventDefault(e);
           return false;
        default:
           if(!e.shiftKey){
           if((n > 47 && n < 58) || (n > 95 && n < 106))
           return true;
           if((n > 188 && n<192) || (n > 108 && n < 112) || n==32)
           {
           var _d=oIpt.value,l=_d.length;
           _d=_d.replace(new RegExp("[\/|\.|\-|\ \:]","gm"),"-");
           if(l !=0 &&  _d.lastIndexOf("-") !=l-1) 
           return true;
           }
           }else{
           var _d=oIpt.value,l=_d.length;
           if(n==186 && 1!=l && _d.lastIndexOf(":") !=l-1) return true;
           }
           _t.stopPropagation(e),_t.preventDefault(e);
           return false;
     }
  },onInput: function(e,o)
   {
   },click:function(e,o)
{
   if(-1 < o.className.indexOf("x-date-disabled"))return this;
   DatePicker.upi4ajx();
   var a=o.title.split("-");
   this.year=a[0],this.month=a[1],this.day=a[2];
   e && (this.stopPropagation(e),this.preventDefault(e));
   this.setValueD();
   this.hidden();
   return false;
},selectToday:function()
{
   var d=new Date();
   this.year=d.getFullYear(),this.month=d.getMonth() + 1,this.day=d.getDate();
   this.setValueD();
   this.hidden();
},hidden: function()
{
   this.hiddenShadow(this.XuiDatePicker);
   this.dpIpt["xuiBlur"] && this.dpIpt["xuiBlur"]();
},
showSelectDiv: function(e,o)
{
  /*if(window.bBoBq)return;// window.bBoBq=true;*/
    this.event=e=e || window.event;
    var _t=this;
      o=_t.dpIpt=(o || _t.FromEventObj(e))
    if(o.readOnly || o.disabled || "undefined"==typeof o.value)return false;
    e && (this.stopPropagation(e),this.preventDefault(e));
    $(o).selection(0,o.value.length);
  var bFirst=!_t.XuiDatePicker,s=(o['value'] || "").trim(),oDiv=_t.XuiDatePicker || (_t.XuiDatePicker=_t.createDiv({className: "x-menu x-menu-plain x-date-menu",id:"_Xui_DatePicker"}));
 _t.fnNoInput(function(){
 window.hdAll.start();
 if(!o.onkeyup)$(o).keyup(function(){_t.onkeyup(e,o)});
  
  if(bFirst)
  {
    oDiv.innerHTML=_t.initDivHtml();
    _t.xuiDPRows=_t.getDom("xuiDatePicker");
    _t.xuiCurYear=_t.getDom("xuiCurYear");
    _t.xuiSlctMY=_t.getDom("xuiSlctMY");
  }
  _t.dpMax=o.getAttribute("max");
  _t.dpMin=o.getAttribute("min");
  _t.clearTimer(oDiv["tmer"]);
  s=s.split("-");
  if(3==s.length)
     _t.setDate.apply(_t,s);
  else s=new Date(),_t.setDate(s.getFullYear(),s.getMonth() + 1,s.getDate());
  _t.updataTBody();
  if(!(o.readOnly || o.disabled))
     _t.showDiv(o,oDiv,173,188,0);
   _t.validateIptDateTime(o);
  });
  window.bBoBq=false;
},onblur: function(e,oIpt)
{
if(window.bBoBq)return true;
var _t=DatePicker,o=_t.XuiDatePicker,bRsr=true;
_t.fnNoInput(function(){
if(o)o["tmer"]=_t.regTimer(function(e)
    {
    return _t.hidden(),true;
    },333);
    if(oIpt.value !="" && oIpt.readOnly !=true){_t.convertIptDate(oIpt);bRsr=_t.validateIptDateTime(oIpt)}else{ Base.delInvalid(oIpt);HidTip();}
    });
    try{if(!bRsr)oIpt.focus();}catch(e){}
    return bRsr;
},convertIptDate:function(oIpt){
var _t=oIpt,s=oIpt.value,l=s.length,_m,_d,_s=s.replace(new RegExp("[\/|\.|\-]","gm"),"-"),__s=s.replace(new RegExp("[\/|\.|\-]","gm"),""),dArr=_s.split(" ")[0].split("-");
    if(null !=dArr[0] && ""!=dArr[0]){
    var _y=parseInt(dArr[0],10);
     if(_y <=30 && _y > 9) _y="20" + _y;
     else if(_y < 10) _y="200"+_y;
     else if(_y >=30 && _y < 100) _y="19" + _y;
     else if(_y >=100 && _y < 1000) _y=_y + "0";
     dArr[0]=_y;
    }else{dArr[0]="1900"}
    if(null !=dArr[1] && "" !=dArr[1]){
    _m=parseInt(dArr[1],10);
    if(_m < 10)_m="0" + _m;
    dArr[1]=_m;
    if(_m==0)  _m="01";
    }else{dArr[1]="01"}
    if(null !=dArr[2] && ""!=dArr[2]){
    _d=parseInt(dArr[2],10);
    if(_d < 10)_d="0" + _d;
    dArr[2]=_d;
    }
    else{dArr[2]="01"};
    if(__s.length==8){
    dArr[0]=__s.substr(0,4);
    dArr[1]=__s.substr(4,2);
    dArr[2]=__s.substr(6,2);
    }
    dArr.splice(3,dArr.length-3);
    _d=dArr.join("-");
    //处理时分秒
    t=_s.split(" ")[1];
    if(t){
    tArr=t.split(":");
    if(tArr[0] !=null && ""!=tArr[0]){
    var _h=parseInt(tArr[0],10);
    if(_h < 10)tArr[0]="0"+_h;
    }
    if(tArr[1] !=null && ""!=tArr[1]){
    var _mm=parseInt(tArr[1],10);
    if(_mm < 10)tArr[1]="0"+_mm;
    }else tArr[1]="00";
    if(tArr[2] !=null && ""!=tArr[2]){
    var _s,_ss,sArr=tArr[2].split("-");
    if(sArr.length==1){
    _s=parseInt(sArr[0],10);
    if(_s < 10)tArr[2]="0"+_s;
    }
    else{
    if(null !=sArr[0] && ""!=sArr[0]){
    _s=parseInt(sArr[0],10);
    if(_s < 10)_s="0"+_s;
    }
    else _s="00";
    if(null !=sArr[1] && ""!=sArr[1]){
    _ss=parseInt(sArr[1],10);
    tArr[2]=_s+"."+_ss;
    }
    else tArr[2]=_s+".0";
    }
    }else tArr[2]="00.0";
    tArr.splice(3,tArr.length-3);
    t=" "+tArr.join(":");
    }else
    {
    t=" 00:00:00.0";
    }
    oIpt.value=(_d + t).substr(0,oIpt.maxLength);
},validateIptDateTime :function(oIpt){
var _t=oIpt,maxL=_t.maxLength,val=_t.value,date,time,msg;
if(maxL > 10){
date=val.split(" ")[0];
time=val.split(" ")[1];
}else{
date=val;
}
window.validateDate=function(){
    var noArr=date.split("-"),year=eval(noArr[0]),month=eval(noArr[1]),day=eval(noArr[2]);
    if (month > 12 ) {msg="输入的[月份]值无效，超出最大范围。";return false;}
    else if (year > 9999 ) {msg="输入的[年份]值无效，超出最大范围。";return false;}
    else if (day > 31 ) {msg="输入的[日期]值无效，超出最大范围。";return false;}
    if ((month==4 || month==6 || month==9 || month==11) && day > 30){
    msg="输入的["+month+"月]为小月，日最大为30。";
    return false;
    }
    if (month==2){
    if (year % 4==0){
     if(year % 100==0 && year % 400 !=0 && day > 28){msg="输入的["+year+"]年不是闰年，2月不能大于28天。" ;return false;}
     if(year % 400==0 && day > 29){msg="输入的["+year+"]年是闰年，2月不能大于29天。" ;return false;}
     if(year % 100 !=0 && day > 29){msg="输入的["+year+"]年是闰年，2月不能大于29天。" ;return false;}
    }else if (year % 4 !=0 && day > 28){msg="输入的["+year+"]不是闰年，2月不能大于28天。" ; return false;}
  }
    return true;
    };
    window.validateTime=function(){
    if(time !="" && time !=null){
    var noArr=time.split(":"),hour=eval(noArr[0] ||"0" ),min=eval(noArr[1] || "0"),sec=noArr[2]||"0",ss=eval(sec.split(".")[1] || "0"),sec=eval(sec.split(".")[0] || "0"); 
    if(hour >23){{msg="输入的[小时]值无效，超出最大范围。";return false;}}
    if(min > 59){{msg="输入的[分钟]值无效，超出最大范围。";return false;}}
    if(sec > 59){{msg="输入的[秒钟]值无效，超出最大范围。";return false;}}
    if(ss > 999){{msg="输入的[毫秒]值无效，超出最大范围。";return false;}}
    return true;
    }
    return true;
    };
    if(!validateDate() || !validateTime()){
    window[oIpt.id+"_validate"]=true;
    return this.setErrMsg(msg,oIpt);
    }
    else{
     Base.delInvalid(oIpt);HidTip();
     window[oIpt.id+"_validate"]=false;
     return true;
    }
},setErrMsg :function(msg,oIpt){
msg=msg.replace(new RegExp("[\\[]","gm"),"[<b>");
msg=msg.replace(new RegExp("[\\]]","gm"),"</b>]");
$(oIpt).focus().tip(msg);
Base.addInvalid(oIpt);
var e=window.event;
this.stopPropagation(e),this.preventDefault(e)
return false;
}
}).init(), Digit = XUI({
    executed:false,check : function(o){
      try{ 
        return this.doFun(function(){
           var arg=Digit.check.arguments,o=Digit.check.arguments[0],integralNum=18,decimalNum=0,max=999999999999,min=-999999999999;
           if (o.register) return;
           if(1 < arg.length){
             integralNum=arg[1][0] || integralNum,decimalNum=arg[1][1] || decimalNum;
             if(2 < arg[1].length){
               if (0==arg[1][2]) max=0;
               if (0==arg[1][3]) min=0;
               max=arg[1][2] || max,min=arg[1][3] || min;
             }
           }
           if(0 < decimalNum) 
             o.maxLength=decimalNum + integralNum + 2;
           else
             o.maxLength=integralNum + 1;  
           var reg="/^" + ((0>min) ? "-{0,1}" : "") + "\\d{0," + integralNum + "}";  
           if(0 < decimalNum) reg +="(\\.\\d{0," + decimalNum + "})?";
           reg +="$/";
           o.reg=eval(reg + ";"),o.max=max,o.min=min,o.mylen=3;
           //Digit.addEvent(o,"paste",this.str_onpaste);
           //Digit.addEvent(o,"drop",this.sz_ondrop);
           Digit.addEvent(o,"keypress",this.sz_onkeypress);
           Digit.addEvent(o,"blur",this.sz_onblur.bind(this));
           o.register=true;
        });
      }catch(e){alert(e.message)}
    },str_onpaste : function(evt){
      e=(evt || event || window.event),o=e.srcElement || e.target,data=Digit.getClipboard(),isReg=Digit.regInput(o,o.reg,data);
      if(!isReg && e.preventDefault) e.preventDefault();
      return isReg;
    },sz_ondrop : function(evt){
      e=(evt || event || window.event),o=e.srcElement || e.target,data=e.dataTransfer.getData('Text'),isReg=Digit.regInput(o,o.reg,data);
      if(!isReg && e.preventDefault) e.preventDefault();
      return isReg;
    },sz_onkeypress : function(evt){      
      e=(evt || event || window.event),o=e.srcElement || e.target,key=window.event ? e.keyCode:e.which,data=String.fromCharCode(key),isReg=Digit.regInput(o,o.reg,data);
      if (!isReg && 8!=key && 45!=key && 0!=key 
           &&!(e.ctrlKey && data.toLowerCase()=="v")){
        if(e.preventDefault)e.preventDefault(); 
      } 
      return isReg;
    },fnNoInput:function(fn){
  var _t=this;
   _t.bBoBq=true;fn();setTimeout(function(){_t.bBoBq=false},13);
},sz_onblur : function(evt){
      var e=(evt || event || window.event),o=e.srcElement || e.target,_t=this;
      if(_t.bBoBq || o.readOnly)return false;
      _t.fnNoInput(function(){
      if (o.reg.test(o.value)){
        if (""==o.value || 
    ("false"==o.isRequired && ""==o.value) || 
    (o.max >=o.value && o.min <=o.value)) {
    Base.delInvalid(o);
return eval(o.mylen + ";");
}
      }
      Base.addInvalid(o);
      o.name.setFocus();
      // setTimeout(function(){o.focus(),o.select();},1);
      alert("\u8f93\u5165\u503c\u5fc5\u987b\u5728[" + o.min + " - " + o.max + "]\u4e4b\u95f4,\u5e76\u4e14\u5c0f\u6570\u70b9\u4f4d\u6570\u6b63\u786e");
      });
    },regInput : function(obj,reg,inputStr){
      if(this.isIE){
        return Digit.ieContentContact(obj,reg,inputStr);
      } else {
        return Digit.ffContentContact(obj,reg,inputStr);
      }  
      return false;  
    },ieContentContact : function(obj,reg,inputStr){
      try{
    var docSel=document.selection.createRange();
    if(null !=docSel && null !=docSel.parentElement() && "INPUT" !=docSel.parentElement().tagName || docSel.parentElement().readOnly)
       return false;
    oSel=docSel.duplicate(),oSel.text="";
    var srcRange=obj.createTextRange();
    if(null==oSel || null==srcRange || null==reg)return false;
    oSel.setEndPoint("StartToStart",srcRange);
    var str=oSel.text + inputStr + srcRange.text.substr(oSel.text.length);
    return reg.test(str);
      }catch(e){alert(e.message);}
    },ffContentContact : function(obj,reg,inputStr){
      try{
        var n=obj.selectionStart,old=obj.value,behind=old.substr(n),front=old.substr(0,(old.length-behind.length)),str=front + inputStr + behind;
        return reg.test(str);
      }catch(e){alert(e.message);}
    },//防止正在执行的函数被重复执行
    doFun : function(fn){
      if(Digit.executed)return false;
      Digit.executed=true;
      fn.apply(this);
      Digit.executed=false;
    },addEvent : function(o,type,fn){
      if (!o["xui" + type]){
 o["xui" + type]=true;          
        if(this.isIE){
          o.detachEvent("on" + type,fn);
          o.attachEvent("on" + type,fn);
        } else {
          o.removeEventListener(type,fn,false);
          o.addEventListener(type,fn,false);
        }
      }
    },getClipboard : function(){
      if (window.clipboardData) return(window.clipboardData.getData('Text'));
  else if (window.netscape) {
      netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
      var clip=Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
      if (!clip) return;
      var trans=Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
      if (!trans) return;
      trans.addDataFlavor('text/unicode');
      clip.getData(trans,clip.kGlobalClipboard);
      var str=new Object(),len=new Object();
      try {
         trans.getTransferData('text/unicode',str,len);
      }
      catch(error) {return null;}
      if (str) {
         if (Components.interfaces.nsISupportsWString) 
           str=str.value.QueryInterface(Components.interfaces.nsISupportsWString);
         else if (Components.interfaces.nsISupportsString) 
           str=str.value.QueryInterface(Components.interfaces.nsISupportsString);
         else str=null;
      }
      if (str) return(str.data.substring(0,len.value / 2));
   }
   return null;
}
}).init(), Utils = XUI({
  ltrim : function(s){
    for(var i=0;i<s.length;i++)
      if(s.charAt(i)!=" ")
        return s.substring(i,s.length);
    return "";
  },rtrim : function(s){
    for(var i=s.length-1;i>=0;i--)
      if(s.charAt(i) !=" ")
        return s.substring(0,i+1);
    return "";    
  },trim : function(s){
    return Utils.rtrim(Utils.ltrim(s));
  },isStrEmpty : function(s){
    return s=="" || s.length==0;
  },isNotNull : function(o){
    return null !=o && "object"==typeof o;
  },isDateNumberFormat : function(M,D,Y){
    Months=[31,28,31,30,31,30,31,31,30,31,30,31];
    Leap=false;
    if((Y % 4==0) && ((Y % 100 !=0) || (Y %400==0)))
        Leap=true;
    if((D < 1) || (D > 31) || (M < 1) || (M > 12) || (Y < 0))
        return(false);
    if((D > Months[M-1]) && !((M==2) && (D > 28)))
        return(false);
    if(!(Leap) && (M==2) && (D > 28))
        return(false);
    if((Leap) && (M==2) && (D > 29))
        return(false);
    return true;
  }
}).init(), IdCard = XUI({
    check : function(input,sex,birthday,empty){
      if(window.bBoBq)return true;
      window.bBoBq=true;
      sex=$("input[name='" + sex + "']")[0];
      birthday=$("input[name='" + birthday + "']")[0];
      if("undefined" !=typeof birthday && "INPUT" !=birthday.nodeName)birthday=$(birthday).find(":input:first")[0];
      if(false==empty){
        if(Utils.isStrEmpty(input.value)){
          alt("身份证号码录入的数据不能为空" );
          setTimeout(function(){input.focus();input.select();},1);
          Base.addInvalid(input);
      return window.bBoBq=false;
        }
      }
      input.value=Utils.trim(input.value).replace(/[^\dXx]/g,"");
      if (input.value && 'x'==input.value.substr(input.value.length-1,1))
       input.value=input.value.toUpperCase();
      if(true==empty && Utils.isStrEmpty(input.value)){
        Base.delInvalid(input);
        return window.bBoBq=false,true;
      }  
      if (15==Utils.trim(input.value).length)
        return IdCard.check15(input,sex,birthday);
      else if (18==Utils.trim(input.value).length){
        return window.bBoBq=false,IdCard.check18(input,sex,birthday);
      } else {
        alt("身份证号码长度错误！");
        setTimeout(function(){input.focus();input.select();},1);
        Base.addInvalid(input);
        return window.bBoBq=false;
      } 
      Base.delInvalid(input);
      window.bBoBq=false;
      return true;
    },check18 : function(input,sex,birthday,bFlg){
      var year,month,day,date; 
      year=input.value.substr(6,4);
  month=input.value.substr(10,2);
  day=input.value.substr(12,2);
      if(!Utils.isDateNumberFormat(month,day,year)){
        if(!bFlg)alt("身份证号码日期部分错误！"+year+"-"+month+"-"+day);
        setTimeout(function(){input.focus();input.select();},1);
        Base.addInvalid(input);
        return false;
      }
      var tmp=input.value.replace(/\d/gmi,"");
      if (!(""==tmp || "X"==tmp)){
        if(!bFlg)alt("输入的身份证中有不合法的字符!");
    setTimeout(function(){input.focus();input.select();},1);
    Base.addInvalid(input);
    return false;
      }
      if (!IdCard.upgrade(input.value)){
        if(!bFlg)alt("输入的身份证校验位不合法!!!");
    setTimeout(function(){input.focus();input.select();},1);
    Base.addInvalid(input);
    return false;        
      }
      date=year+"-"+month+"-"+day;
      if(Utils.isNotNull(birthday)) birthday.value=date;
      if(Utils.isNotNull(sex)){ 
        if (input.value.substr(16,1)%2==1){
          this.setDescByValue(sex,"1");
    }  
    if (input.value.substr(16,1)%2==0){
      this.setDescByValue(sex,"2");
    }
      } 
      Base.delInvalid(input);
      return true;
    },
    setDescByValue : function(o,v){
      Base.setValue(o.name,v);
    },check15 : function(input,sex,birthday,bFlg){
      var year,month,day,date; 
      year="19" + input.value.substr(6,2);
  month=input.value.substr(8,2);
  day=input.value.substr(10,2);
      if(!Utils.isDateNumberFormat(month,day,year)){
        if(!bFlg)alt("身份证号码日期部分错误！"+year+"-"+month+"-"+day);
        setTimeout(function(){input.focus();input.select();},1);
        Base.addInvalid(input);
        return false;
      }
      date=year+"-"+month+"-"+day;
      if(Utils.isNotNull(birthday)) birthday.value=date;
      if(Utils.isNotNull(sex)){ 
        if (input.value.substr(14,1)%2==1){
          this.setDescByValue(sex,"1");
    }  
    if (input.value.substr(14,1)%2==0){
      this.setDescByValue(sex,"2");
    }
      }
       
      input.value=IdCard.upgrade(input.value);    
      Base.delInvalid(input);
      return true;
    },upgrade : function(szStr){
      var s=szStr,b15=false;
  s=Utils.trim(s);
  if(15==s.length)
    b15=true,s=s.substr(0,6) + '19' + s.substr(6);
  var wi=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
  var m=['1','0','X','9','8','7','6','5','4','3','2'];
  var nSum=0;
  for(var i=0; i < 17; i++)
    nSum +=wi[i] * s.substr(i,1);
  if(b15)
    return s + m[nSum % 11];
  else
    return s.substr(17,1)==m[nSum % 11];
    }  
  }).init(), Issue = XUI({
    check : function(o,max,min){
      o.maxLength=6; o.max=max; o.min=min;
      o=$(o);
      if(!o.attr('mybind'))
      {
          o.attr('mybind',true);
      o.keypress(this.checkPress.bind(this)).blur(this.checkBlur.bind(this));
      }
    },getRegStr : function(s){
      var n=s.length;
      if(4 >=n)return "/^\\d*$/";
      else if(5==n) return "/^\\d{4}[0-1]$/";
      else return "/^\\d{4}((1[0-2])|(0[1-9]))$/";
    },checkPress : function(evt){
      var e=(evt || event || window.event),o=e.srcElement || e.target,key=window.event ? e.keyCode:e.which,data=String.fromCharCode(key),s=Issue.getContent(o,data),reg=Issue.getRegStr(s);o.reg=eval(reg + ";");
      isReg=Issue.regcheck(o,o.reg,data),isPaste=e.ctrlKey && data.toLowerCase()=="v";
      if (!isReg && 8!=key && 0!=key &&!isPaste)
        if(e.preventDefault)e.preventDefault(); 
      return isReg;
    },checkPaste : function(evt){
      var e=(evt || event || window.event),o=e.srcElement || e.target,data=Issue.getData(),s=Issue.getContent(o,data),reg=Issue.getRegStr(s);
      o.reg=eval(reg + ";");
      isReg=Issue.regcheck(o,o.reg,data);
      if(!isReg && e.preventDefault) e.preventDefault();
      return isReg;
    },checkDrop : function(evt){
      var e=(evt || event || window.event),o=e.srcElement || e.target,data=e.dataTransfer.getData('Text'),s=Issue.getContent(o,data),reg=Issue.getRegStr(s);
      o.reg=eval(reg + ";");
      isReg=Issue.regcheck(o,o.reg,data);      
      if(!isReg && e.preventDefault) e.preventDefault();
      return isReg;      
    },checkBlur : function(evt){
      var e=(evt || event || window.event),o=e.srcElement || e.target,length=o.value.length;
      if(0 < length && o.maxLength !=length){
        Base.addInvalid(o);
        alt("输入期号不完整！");
      }else if (o.max && o.value > o.max){
        Base.addInvalid(o);
        alt("输入期号不能大于" + o.max);
      } else if (o.min && o.value < o.min){
        Base.addInvalid(o);
        alt("输入期号不能小于" + o.min);
      }
      else{
        Base.delInvalid(o);
      }
    },getData : function(){
      if (window.clipboardData) return(window.clipboardData.getData('Text'));
  else if (window.netscape) {
      netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
      var clip=Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
      if (!clip) return;
      var trans=Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
      if (!trans) return;
      trans.addDataFlavor('text/unicode');
      clip.getData(trans,clip.kGlobalClipboard);
      var str=new Object(),len=new Object();
      try {
         trans.getTransferData('text/unicode',str,len);
      }
      catch(error) {return null;}
      if (str) {
         if (Components.interfaces.nsISupportsWString) 
           str=str.value.QueryInterface(Components.interfaces.nsISupportsWString);
         else if (Components.interfaces.nsISupportsString) 
           str=str.value.QueryInterface(Components.interfaces.nsISupportsString);
         else str=null;
      }
      if (str) return(str.data.substring(0,len.value / 2));
   }
   return null;
},regcheck : function(obj,reg,inputStr){
      var s=Issue.getContent(obj,inputStr);
      return reg.test(s);
    },getContent : function(obj,inputStr){
      if(Base.bIE){
        return this.ieGetContent(obj,inputStr);
      } else {
        return this.ffGetContent(obj,inputStr);
      }  
    },ieGetContent : function(obj,inputStr){
      try{
    var docSel=document.selection.createRange();
    if(null !=docSel && null !=docSel.parentElement() && "INPUT" !=docSel.parentElement().tagName)
       return false;
    oSel=docSel.duplicate(),oSel.text="";
    var srcRange=obj.createTextRange();
    if(null==oSel || null==srcRange)return false;
    oSel.setEndPoint("StartToStart",srcRange);
    var str=oSel.text + inputStr + srcRange.text.substr(oSel.text.length);
    return str;
      }catch(e){"ieGetContent error:" + alt(e.message);}
    },ffGetContent : function(obj,inputStr){
      try{
        var n=obj.selectionStart,old=obj.value,behind=old.substr(n),front=old.substr(0,(old.length-behind.length)),str=front + inputStr + behind;
        return str;
      }catch(e){alt(e.message);}
    }
}).init(), Select = XUI({ data:null,SelectDiv:false,
  inputObj:null,
  descObj:null,
  oFrom:null,
  oShdow:null,
  bFltFlg: false,
  xfcSlctDivId: '_Xui_SelectDiv',upi4ajx:function(){
     if(Select.descObj && Select.descObj.id)this.descObj=Select.descObj=document.getElementById(Select.descObj.id);
     if(this.descObj && this.descObj.id)this.descObj=Select.descObj=document.getElementById(this.descObj.id);
     this.inputObj=Select.inputObj=$(this.descObj).next()[0];
  },getSlctObj:function(szId)
  {
    return (window.slctIptData || {})[szId]||{};
  },setData:function(szId,a){this.getSlctObj("S" + szId)["collection"]=a;},getData:function(szId) 
  {
    var slcObj=this.getSlctObj(szId),rst=slcObj["collection"],i,s,o,k,key="_id",aT;
    if(rst && 0 < rst.length && rst[0] && (!rst[0][key] || ""==rst[0][key].replace(/\d/g,"")))
    {
        for(i=0; i < rst.length; i++)
        {
          s=[],o=rst[i];
          if(slcObj.filterFields)
          {
             aT=String(slcObj.filterFields).split(/[,;\s]/);
             for(k=0; k < aT.length; k++)
               if(key !=aT[k])
                s.push(o[aT[k]]);
          }
          else{
            for(k in o)
              if(key !=k)
                s.push(o[k]);
          }
          if(0 < s.length)
          rst[i][key]=s.join(",").toLowerCase();
        }
    }
    if(this.data && 0==this.data.length)this.data=null;
    var oTmp09=this.getSlctObj(szId);
    
    if(fnSetSelectAjax[szId.substring(1)])return (oTmp09["collection"] || this.data || []);
    return (this.data || oTmp09["collection"] || [])
  },
  lightRow:function(n,flg,e)
  {
    var o=this.SelectDiv,tb=this.getByTagName("table",o),b=0 < tb.length && 0 < tb[0].rows.length,r=b ? tb[0].rows : null;
    
    if(!b || !o)return  false;
    if(r.length > o["_lstNum"])
       r[0 <=o["_lstNum"]? o["_lstNum"] : 0].className='slcthand';
    if(0 > n)n=r.length - 1;
    if(r.length <=n)n=0;
    r[n].className='cursor slctOver'; 
    if(!flg && 0 <=n && r.length > n)this.fnSciv(this.SelectDiv,r[n]);
    o["_lstNum"]=n;
    if(3==arguments.length)
      return this.stopPropagation(e),this.preventDefault(e),false;
    return n;
  },getSelectDataStr:function(oE,w,data)
  {
    var _t=Select,a=data || _t.getData(oE.id),a1=["<div class=\"cursor selectInput_FloatDiv\"><table cellPadding=0 border=0 class=xuiTable cellSpacing=0 style=\"border:0;width:100%;margin:0;padding:0;\">"],i,j,o,k,b=_t.getSlctObj(oE.id)["displayFields"],bDisp=!b,key="_id_";
     if(bDisp)
        b=window['slctIptData']["S" + oE.id]["displayFields"],bDisp=!b;
    !bDisp && (b=b.split(/[,;\|\/]/));
    if(!a ||!a.length || 0==a.length)return "";
    for(i=0; i < a.length; i++)
    {
      o=a[i];
      a1.push("<tr data='" + $.toJSON(o) + "' class=cursor");
      if(noLockPage && 1==i % 2)a1.push(" style=\"background-color" + slctRowBgColor2 + ":\"");
      a1.push(" onclick=\"Select.onSelect(event,this)\" onmouseover=\"return Select.lightRow(this.rowIndex,true,event)\"\">");
      var szK1=String((_t.descObj || oE || {value:''}).value || "").trim().replace(/([()\|\$\.\\])/g,"\\\1"),reg9=new RegExp("(" + szK1 + ")","gmi"),fnTrpc=function(s89){
         if(0==szK1.length)return s89;
         s89 || (s89="");
         return s89.replace(reg9,"<b>$1</b>");      
      };
      if(bDisp)
      {
          for(k in o)
           if(key !=k && "_id" !=k && "function" !=typeof o[k])
           {
             a1.push("<td><nobr>"),a1.push(fnTrpc(o[k])),a1.push(" </nobr></td>");
           }
      }
      else if(o)
      {
        for(j=0; j < b.length; j++)
          if(key !=b[j] && "_id" !=b[j])
          {
             a1.push("<td><nobr>"),a1.push(fnTrpc(o[b[j]])),a1.push(" </nobr></td>");
          }
      }
      a1.push("</tr>");
    }
    a1.push("</table></div>");
    var s=a1.join("");
    _t.bHvRplc=false;
    return s;
  },
  setValueX:function(s,n,e)
  {
     Select.upi4ajx();
     var _t=this,descObj=this.descObj,inputObj=this.inputObj,bEdit="true"==_t.getSlctObj(_t.descObj.id)['allowEdit'];
     if(1==n && descObj)descObj.value=s;
     else if(2==n && inputObj)inputObj.value=s;
     else if(descObj && inputObj)
        inputObj.value=descObj.value=s;
      if(""==_t.descObj.value && !bEdit)_t.inputObj.value="";
     if(e)this.preventDefault(e),this.stopPropagation(e);
     if(noLockPage && 0==String(descObj.value).trim().length)descObj.value=pleaseSelect;
     return this;
  },
  getDescByValue:function(s,o){
      o || (o=this.descObj.id);
      if("string" !=typeof o)o=o.id;
      if("undefined"==typeof window['slctIptData'])return "";
      var obj=window['slctIptData'][o];
      
      if(!obj)return $("#" + o).parent().find(":input")[1].value;
      var a=obj.valueField.split(/[,;\|\s]/),d=a[a.length - 1],i,v=a[0];
      a=obj.collection;
      if(a)
      for(i=a.length; 0 <=--i;)
      {
          if(a[i][v]==s)
          {
              return a[i][d];
          }
      }
      return s;
  },
  getValueByDesc:function(s)
  {
     var oT=this.getSlctObj(this.descObj.id),a=oT["collection"],i,b=(oT['valueField'] || "").split(/[,; ]/),b2=1 < b.length;
     
     if(oT['valueField'])
     {
         if(b2 && a)
     for(i=0; i < a.length; i++)
     {
        if(a[i] && s==a[i][b[1]])
          return a[i][b[0]];
     }
     if(a)
     for(i=0; i < a.length; i++)
     {
        if(a[i] && a[i][b[0]] && -1 < String(a[i][b[0]]).indexOf(s))
          return a[i][b[0]];
     }
     }
     return null;
  },
  onSelect:function(e,oTr)
  {
     Select.upi4ajx();
     var rData=null,o=this.SelectDiv,id=o.id,oIpt=o[id] && this.getDom(o[id]) || null,a,n="number"==typeof oTr.rowIndex ? oTr.rowIndex : oTr,oT=this.getSlctObj(oIpt.id) || {},dt=this.getData(oIpt.id) || [],cbk=oT['selectCallBack'];
     try{rData=eval("1," + oTr.data);}catch(e){}
     if(0 <=n && dt.length > n)
     {
       if(rData)
       for(var kr in rData)dt[n][kr]=rData[kr];
       
       if(oT['valueField'])
       { 
         a=(oT['valueField'] || "").split(/[,; ]/);
         oIpt.value=(1 < a.length ? dt[n][a[1]] : dt[n][a[0]]);
         this.setValueX(dt[n][a[0]],2,e);
       } 
       cbk && new Function("dt","n","oIpt",cbk +"(dt[n],oIpt,n);")(dt,n,oIpt);
       o["_lstNum"]=n;
     }else o["_over"]=1;
     this.hidden(e);
     this.delInvalid(oIpt);
     if("click"==e.type) window.nxtfcs(e,Select.descObj);
     if(e)this.preventDefault(e),this.stopPropagation(e);
  },
  isShow: function(e,obj,oE)
  {
     var o=this.SelectDiv,szId=o.id;
     return(o && "block"==o.style.display && o[szId]==oE.id);
  },hidden: function()
  {
     this.hiddenShadow(this.getDom(Select.xfcSlctDivId));
     this.updata((this.descObj || {}).value || "");
     this.descObj["xuiBlur"] && this.descObj["xuiBlur"]();
  },
  updata:function(s)
  {
    if(!this.descObj)return this;
    if(0==s.length)return this.data=null,this;
    var n,id=this.descObj.id,b=[],w=[],c=[],a=(this.getData(id),this.getSlctObj(id)["collection"]);
    if(!a || 0==a.length)return 0;
    for(n=0; n < a.length; n++)
      if(a[n]){
      if(a[n]["_id"] && -1 < a[n]["_id"].indexOf(s.toLowerCase() +","))
         b.push(a[n]);
      else  if(a[n]["_id"] && -1 < a[n]["_id"].indexOf(s.toLowerCase()))
         w.push(a[n]);
      else c.push(a[n]);}
    this.data=b.concat(w);
    
    Select.data=this.data=this.data.concat(c),Select.bFltFlg=false;
    return b.length;
  },
  show: function()
  { 
    var o=this.SelectDiv,obj=this.getSlctObj(this.descObj.id);
    if(null==obj.displayWidth)obj.displayWidth=obj.clientWidth;
    
       this.showDiv(this.p(this.descObj,"DIV"),this.SelectDiv,parseInt(obj.displayWidth,10),150);
      if(noLockPage) this.fnResize();
  },
fnNoInput:function(fn){
  var _t=this;
   window.bBoBq=true;fn();setTimeout(function(){window.bBoBq=false},13);
},
  onInput:function(e,oIpt)
  {
     var _t=this;
     if(window.bBoBq)return false;
     _t.fnNoInput(function(){
       _t.stopPropagation(e),_t.preventDefault(e);
       if(oIpt.readOnly || oIpt.disabled)return false;
       if(_t.isIE)
       {
         _t.descObj=oIpt;
         _t.detachEvent(oIpt,"propertychange",_t[oIpt.id] && _t[oIpt.id].onpropertychange || oIpt["onpropertychange"] || function(){});
         oIpt["onpropertychange"]=null;
       }
       _t.getData(oIpt.id);
       var n=0,o=_t.SelectDiv,oT=_t.getSlctObj(oIpt.id),s=oIpt.value.replace(/(^\s+)|(\s+$)/g,"");
       if(o)
       {
       
       n=_t.updata(s); 
       
       s=_t.getValueByDesc(s) || oT["allowEdit"] && s || "";
       _t.setValueX(s,2,e);
       
          _t.delInvalid(oIpt),_t.showSelectDiv(e,{width: o.style.width},oIpt,_t.data);
       }
       if(_t.isIE)
   {
       _t.addEvent(oIpt,"propertychange",(_t[oIpt.id] || (_t[oIpt.id]={})).onpropertychange=function(e)
       {
          _t.onInput.call(_t,e,oIpt);
       });
   }
   });
  },
  onkeydown:function(e,oIpt)
  {
     
     if(oIpt.readOnly || oIpt.disabled)return false;
     e=e || window.event;
     Select.upi4ajx();
     var n=e.which || e.keyCode,o=this.SelectDiv,oT=this.getSlctObj(oIpt.id),i=o["_lstNum"] || 0;
     if(-1==o["_lstNum"])o["_lstNum"]=0,i=-1;
     switch(n)
     {
        
        
        case 27:this.hidden(e);break;
        
        case 13:
           this.onSelect(e,i);
           this.hidden(e);
           this.bIE ? (e.keyCode=9) : '';
           window.nxtfcs(e,this.descObj);
           break;
        case 38: 
           i=this.lightRow(i - 1);
           this.stopPropagation(e),this.preventDefault(e);
           return false;
        case 40: 
           this.show();
           i=this.lightRow(i + 1);
           this.stopPropagation(e),this.preventDefault(e);
           return false;
        default:;
     }
     return true;
  },
  showSelectDiv: function(e,obj,oE)
  {
   if(oE.readOnly || oE.disabled)return false;
    var b3=(3==arguments.length),_t=this;
    e=e || window.event;
    return this.RunOne(function(){
       _t.data=[];
      if(0==_t.getData(oE.id).length)$('#' + Select.xfcSlctDivId).hide();
      if(oE.readOnly || oE.disabled || (this.isShow(e,obj,oE) && b3))return false;
      var o=this.SelectDiv,szId,oTable=(this.oFrom=this.p(oE,"TABLE")),oR=this.getOffset(oE),h=oR[3],w=parseInt((obj||{}).width || $(oE.parentNode).width()),k,fns=_t.bind(function()
        {
          var o=this.SelectDiv;
          if(0 < (this.getData(oE.id) || []).length)
          {
          o["tmer"] && _t.clearTimer(o["tmer"]);
              if(o.style.height)
                 this.show();
          }
          o["_in_"]=true
        });
    
    _t.inputObj=(_t.descObj=oE).parentNode.getElementsByTagName("input")[1];
    if(!o)
    {
       this.SelectDiv=o=this.createDiv({id:Select.xfcSlctDivId});
       this.addEvent(o,"mousedown",fns)
           .addEvent(o,"scroll",fns)
           .addEvent(o,"mouseup",fns).addEvent(o,"mouseout",_t.bind(_t.hiddenSelectDiv));
       this.oShdow=this.getDom("xuiSelectShdow");
    }
    szId=o.id;
    
    o[szId]=oE.id,o["_lstNum"]=-1,o["_blur_"]=false,fns();

    
    
    
    if(!oE[szId])
    {
       oE[szId]=o.id,this.addEvent(oE,"blur",function()
           {  window.bBoBq=true;
              var bEdit="true"==_t.getSlctObj(_t.descObj.id)['allowEdit'] || window['slctIptData'][_t.descObj.id]["allowEdit"];
              
              if(!_t.inputObj.value)
              { 
                 if(bEdit) _t.inputObj.value=_t.descObj.value;
                else if(_t.descObj.value)_t.descObj.value='';
              }
              else
              {
                 if(!_t.getValueByDesc(_t.descObj.value) &&  !bEdit)
                    _t.descObj.value=_t.inputObj.value='';
              }
              if(""==_t.descObj.value && !bEdit)_t.inputObj.value="";
              o["_blur_"]=true,_t.hiddenSelectDiv();
              if(noLockPage && 0==String(_t.descObj.value).trim().length)_t.descObj.value=pleaseSelect;
              window.bBoBq=false;
           });
    }
    _t.updata(oE.value);
     o.innerHTML=_t.getSelectDataStr(oE,w)
    if(o.innerHTML)
    {
        if(this.bHvRplc)this.lightRow(this.SelectDiv["_lstNum"]=0);
        var nTm=new Date().getTime();
        window.hdAll.start();
        _t.show();
    }
    
    e && this.stopPropagation(e),this.preventDefault(e);
    });    
  },fnResize:function(){
    if(noLockPage){
      var oDiv=$("#_Xui_SelectDiv"),oT=$(oDiv.find("table")[0]),n;
      if((n=oT.height()) < parseInt(slctHeight))oDiv.height(n + 'px');
      oDiv.width($(oDiv.find("table")[0]).width());
    }
  },
  hiddenSelectDiv:function()
  {
    var _t=Select,o=_t.SelectDiv;
    o["_tm_"]=new Date().getTime();
    o["_in_"]=false;
    
    o["tmer"]=_t.regTimer(function(e)
    {
       if(o["_blur_"])
       {
       if(o["_in_"])return true;
       if(333 < new Date().getTime() - o["_tm_"])
          return _t.hidden(e),true;
       }
       return false
    },333);
  }
}).init(), XuiTree = XUI({
   XuiTreeCc: [],
   curTree: null,
   idCnt:1,slctCls:"div.x-tree-selected",ext: function(oSrc,oDes)
   {
      for(var k in oSrc)
      {
         if(oDes[k])oDes[k + "_old"]=oDes[k];
         oDes[k]=oSrc[k];
      }
      return oDes;
   },
   ext4id: function(id,o)
   {
      var k,p=this.TreeNode.prototype;
      for(k in o)
      {
         if(p[k])
         {
             p[k + "_old"]=p[k];
             (function(i){
         p[i]=function()
         {
             if(this.tree.id==id)return o[i].apply(this,arguments);
             else return this[i + "_old"].apply(this,arguments);
         };
         })(k);
         }
         else p[k]=o[k];
      }
      return this.TreeNode;
   },
   upperNode: function()
    {
       var o=XuiTree.curTree.lastSlctNode;
       if(!o)return this;
       if(0 < o.childNodes.length && o.isExpand)
          o.isExpand=false,o.doExpand();
       else if(o.parent)o.parent.select(o.parent.Dom.prev("div")[0],null);
    },pervNode: function()
    {
       var o=XuiTree.curTree.lastSlctNode;if(!o)return this;
       var szId=o.id,o1,o2,bNoP=true;
       o1=(o2=$("#" + szId)).prev("li");
       if(0==o1.size())o1=o2.parent().parent(),bNoP=false;
       if(0 < o1.size())
       {
          if(bNoP)
          {
             o2=XuiTree.curTree.allTreeCc[o1.attr('id')];
             if(0 < o2.childNodes.length && o2.isExpand)
               o1=$(o2.Dom).find("li:last");
          }
          o.select(o1.find("div")[0],null);
       }
    },lowerNode: function()
    {
       var o=XuiTree.curTree.lastSlctNode;
       if(0 < o.childNodes.length && !o.isExpand)
          o.isExpand=true,o.doExpand();
       else XuiTree.nextNode();
    },nextNode: function()
    {
       var o=XuiTree.curTree.lastSlctNode;if(!o)return this;
       var szId=o.id,o1,o2=$("#" + szId),o3;
       if(0 < o.childNodes.length && o.isExpand)
       {
           o1=o2.find("li:first div")[0];
           o3=o2.find(XuiTree.slctCls);
           if(0 < o3.length && o1==o3[0])
           {
              o1=o3.find("div:first");
              if(0==o1.length)
              {
                  o1=o3.parent().find("div");
                  if(1 < o1.length)o1=o1[1];
                  else o1=o1[0];
              }else o1=o1[0];
           }
           o.select(o1,null);
       }
       else
       {
          o1=o2.next("li:first");
          while(("LI"==o2.attr("nodeName") || "UL"==o2.attr("nodeName")) && 0==o1.size())o1=(o2=o2.parent().parent()).next("li");
          if(0 < o1.size())
              o.select(o1.find("div")[0],null);
       }
    },
    onkeydown: function(e)
    {
    e=window.event || e; var key=e.keyCode || e.which,o;
    if(XuiTree.curTree)
    switch(key)
    {
      case 37 : this.upperNode(); break;  
      case 38 : this.pervNode();  break;  
      case 39 : this.lowerNode(); break;  
      case 40 : this.nextNode();  break;  
      case 13:
         key=$("#" + XuiTree.curTree.id).find(XuiTree.slctCls);
         o=key.find("a");
         if(0 < o.length)
         {
            if(o.attr("onclick"))
         o.click();
          else if(o.attr("href"))
      {
             if(o.attr("target"))opn(o.attr("href"),o.attr("target"));
             else window.location=o.attr("href");
       }
         }
         else
         {
         if(key.attr("onclick"))
         key.click();
         else if(key.attr("href"))window.location=key.attr("href");
         }
         break;
    }
    },
    upDataTree:function(id)
    {
       var oTree,a,b,c,k;
       if(oTree=XuiTree.XuiTreeCc[id])
       {
          a=oTree.oldData,b=oTree.addData,c=oTree.delData;
          for(k in c)delete a[k]; for(k in b)a[k]=b[k];
          oTree.delData=[],oTree.addData=[],oTree.oldData=a;
       }
    },init: function()
   {
      XUI(this);
      this.onkeydown=this.bind(this.onkeydown);
      this.addEvent(document,"keydown",this.onkeydown);
      this.ext(this,this.TreeNode.prototype);
      
      this.ext({
        addData: [],
        delData: [],
        oldData: [],
        allTreeCc: [],
        parent: null,
        childNodes:[],
        isChecked: false,
        isSelected: false,
        bRmOld: false,
        isExpand:   false,
        tree: null,
        seq: 0,
        html: null,
        doParentCheckedFlg: true,
        doChildCheckedFlg: true,
        label: null,
        depth: 0,
        nodeIcon: 'x-tree-node-icon',
        url: 'javascript:void(0)',target: null,
        id: null,
        Dom: null,
        checkValue: null,onclick: null,
        allowCheck: false,
        bExpandAll: false,
        lastSlctNd: null,
        loadLazy:false,
        nodeId:null,

        
        
        getDelData: function(d)
        {
           var o=d || this.tree.delData,k,a=[];
           for(k in o)if("function" !=typeof o[k])a.push(o[k]);
           return a.join("\n");
        },
        getAddData: function()
        {
           return this.getDelData(this.tree.addData);
        },
        getCheckBoxId: function()
        {
           return this.id + "_chkbx";
        },
        insertBfLabel: function(oSelf)
        {
           if(oSelf.allowCheck && oSelf.checkValue)
           {
              var bCkd=oSelf.isChecked,p=oSelf.parent,szId=oSelf.getCheckBoxId();
             if(oSelf.doChildCheckedFlg && p) 
             {
                 /*bCkd=bCkd || p.isChecked;
             /*while(p && (null==p.checkValue || p.isChecked) && p !=oSelf.tree)
             {
                if(p.isChecked)
                {
                   bCkd=oSelf.isChecked=p.isChecked;
                   break;
                }
                p=p.parent;
             }commented by liding*/
             }
             return [ "<input style=\"cursor:default\" onclick=\"return XuiTree.getTreeNode('",oSelf.tree.id,"','",oSelf.id,"')",".checked(this.checked,",oSelf.doChildCheckedFlg,
                ",event,this)\" type=\"checkbox\" value=\"",oSelf.checkValue,"\"",(bCkd ? " checked=\"true\"" : "")," id=\"",szId,"\"",">"].join("");
           }
           return "";
        },
        insertAftLabel: function(oSelf){return ''},
        
        upCkBxData: function(szId,bCkd,o)
        {
           var _t=this,szValue=o.checkValue;
           if(!szId)return this;
           if("boolean" !=typeof this.tree.oldData[szId] || null==this.tree.oldData[szId])
             this.tree.oldData[szId]=o.isChecked;
           if(!bCkd==_t.tree.oldData[szId])
              delete _t.tree.addData[szId],delete _t.tree.delData[szId];
           else
           {
              if(bCkd)_t.tree.addData[szId]=szValue,delete _t.tree.delData[szId];
              else    _t.tree.delData[szId]=szValue,delete _t.tree.addData[szId];
           }
        },
        upCkBxDataAllCld: function(o,b)
        {
           var szId=o.id,i=0,d=o.depth + 1,j=o.childNodes.length;
           
           for(; i < j; i++)
           {
              if(0 < o.childNodes[i].childNodes.length) {
              
            o.childNodes[i].isChecked=b;
            szId=[o.id,d,i].join("_");
            this.upCkBxData(szId,b,o.childNodes[i]);
              this.upCkBxDataAllCld(o.childNodes[i],b);
            
              } else {  
               o.childNodes[i].isChecked=b; 
                 szId=[o.id,d,i].join("_");
                 this.upCkBxData(szId,b,o.childNodes[i]);
              }
           }
        },
        upCkBxDataAllParent: function(o,b)
        {
           while(o=o.parent)
           {
              this.upCkBxData(o.id,b,o);
           }
        },
        checked: function(bCkd,bDoCld,e,o)
        {
           var oCeckBox,szId,_t=this,nTm=this.tree.nDelay;
           if(!this.Dom || 0==this.Dom.size()) oCeckBox=$(o),szId=oCeckBox.attr("id");
           else
           {
             oCeckBox=this.Dom.prev().find(":checkbox:first"),szId=oCeckBox.attr("id");
           }
           if(bDoCld && 0 < _t.childNodes.length) 
           {
              _t.Dom.find("div.x-tree-node-el :checkbox").each(function()
             {
                 $(this).attr("checked",bCkd);
             });
             _t.upCkBxDataAllCld(_t,bCkd);
           }
           _t.isChecked=bCkd; 
           _t.upCkBxData(szId,bCkd,_t),oCeckBox.attr("checked",bCkd); 
           _t.regTimer(function(o)
           {
             $(document.getElementsByName(_t.tree.id + "_add")[0]).val(_t.getAddData());
             $(document.getElementsByName(_t.tree.id + "_del")[0]).val(_t.getDelData());
             return true;
           },nTm);
           
           if(_t.tree.doParentCheckedFlg)
           {
               if(_t.parent)_t.parent.checked(0 < _t.parent.Dom.find(":input:checked").size(),false,e);
           }
           else if(bCkd)
           {
               if(_t.parent)_t.parent.checked(0 < _t.parent.Dom.find(":input:checked").size(),false,e);
           }
           e && _t.stopPropagation(e);
           return _t;
        },
        select: function(o,e,bClick)
        {
           var s="x-tree-selected",o=$(o),szId,oT;
           if(this.tree.lastSlctNd && o !=this.tree.lastSlctNd)this.tree.lastSlctNd.removeClass(s);
           (this.tree.lastSlctNd=o).addClass(s);
           if(oT=this.tree.allTreeCc[szId=o.parent().attr("id")])
               this.tree.lastSlctNode=oT;
           e && o.find(":checkbox:first").click();
           XuiTree.curTree=this.tree;
           this.fnSciv($("#" + XuiTree.curTree.id)[0],o.find("a").parent()[0]);
           if(this.tree.bRmOld)
           $.cookie(this.tree.id,o.attr('id') + ',' + o[0].innerText);
           
           if(this.tree.bRmOld || bClick)
           {
                 var key=$("#" + this.tree.id).find(XuiTree.slctCls);
         o=key.find("a");
         if(0 < o.length)
         {
            if(o.attr("onclick"))
         o.click();
         else if(o.attr("href"))
         {
             if(o.attr("target"))opn(o.attr("href"),o.attr("target"));
             else window.location=o.attr("href");
         }
         }
         else
         {
         if(key.attr("onclick"))
         key.click();
         else if(key.attr("href"))window.location=key.attr("href");
         }
           }
           return this;
        },
        doExpand: function(e,bKgFlg)
        {
          if(this.loadLazy && this.childNodes.length==0)
           {
           var slctFlag="",slctIptId="";
   if(window[this.tree.id+"slctFlag"]) slctFlag=window[this.tree.id+"slctFlag"];      
   if(window[this.tree.id+"slctIptId"]) slctIptId=window[this.tree.id+"slctIptId"];
           var treeId=this.tree.id,aResult=rpc.getRpcObj('com.yinhai.xui.taglib.tree.TreeLoadLazyRpc').getChileTreeNode(treeId.substr(0,treeId.length-4),"",this.nodeId,slctFlag,slctIptId);
           if(aResult){
              this.childNodes=aResult;
              new (XuiTree.TreeNode)(this);
              if(this.parent.target)
              for(var i=0; i < this.childNodes.length; i++)
                 if(!this.childNodes[i].target)this.childNodes[i].target=this.parent.target;
              XuiTree.XuiTreeCc[this.tree.id]['allTreeCc'][this.id]=this;
           }
           }
             var oUl=this.Dom || $("#"+this.id).find("ul.x-tree-node-ct:first"),i=0,j=this.childNodes.length,_t=this,nTm=this.tree.nDelay,s="x-tree-ec-icon",p=oUl.parent(),oDiv=p.find("div.x-tree-node-el:first").removeClass("x-tree-node-collapsed").removeClass("x-tree-node-expanded"),oImg=oDiv.find("img." + s + ":first"),x=0,aH=[],w=0,setCls=function()
              {
               if(_t.isExpand)
               {
                  if(0==_t.depth || _t.parent && _t.parent.childNodes.length - 1==_t.seq)
                  s +=" x-tree-elbow-end-minus";
                  else s +=" x-tree-elbow-minus";
               }
               else
               {
                  if(_t.loadLazy ||0==_t.depth || _t.parent && _t.parent.childNodes.length - 1==_t.seq)
                    s +=" x-tree-elbow-end-plus";
                  else s +=" x-tree-elbow-plus";
               }
               oImg.attr('class',s);
              };
              this.Dom=oUl;
           if(bKgFlg)this.isExpand=!this.isExpand;
           if(this.isExpand=(this.isExpand && 0 < this.Dom.length && 0 < j))
           {
              
              if(!_t.doExpandFlg)
              {
                 var n=j % 8,y=(j - n) / 8;
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
                 _t.Dom[0]=_t.replaceHtml(_t.Dom[0],aH.join(""));
                 for(; w < j; w++)if(0 < _t.childNodes[w].childNodes.length)_t.childNodes[w].Dom=$("#" + _t.childNodes[w].id).find("ul:hidden");
                 _t.doExpandFlg=true;
              }              
              oUl.show(),oDiv.addClass("x-tree-node-expanded");
              setCls();XuiTree.XuiTreeCc[this.id]=this;
           }
           else oUl.hide(),oDiv.addClass("x-tree-node-collapsed"),setCls(),XuiTree.XuiTreeCc[this.id]=this;
           e && (this.stopPropagation(e),this.preventDefault(e));
           if(this.tree.bRmOld)
           {
               s=$.cookie(this.tree.id);
               if(s)
               {
                   var aTmp1=s.split([,]),oTmp1=$("#"+aTmp1[0]);
                   if(0 < s.length && "undefined"==typeof this.tree.bExecClk && oTmp1[0] && aTmp1[1]==oTmp1[0].innerText)
               {
                  this.tree.bExecClk=true;
                  this.select(oTmp1[0],null);
               }
               }
           }
           return this;
        },
        expandAll: function()
        {
           if(this.Dom)
           {
              this.isExpand=true,this.doExpand();
              var p=this.childNodes,i=0,j=p.length;
              for(; i < j; i++)
                 if(0 < p[i].childNodes.length)
                 {
                    p[i].regTimer(function(o){
                       try{o.isExpand=true,o.doExpand(),o.expandAll();}catch(e){}
                    return true;},133);
                 }
           }else this.tree.bExpandAll=true;
        },
        collapseAll: function()
        {
           this.tree.bExpandAll=false;
           if(this.Dom)
           {
              if(this !=this.tree)this.isExpand=false,this.doExpand();
              for(var p=this.childNodes,i=0,j=p.length; i < j; i++)
                 if(0 < p[i].childNodes.length)
                   p[i].regTimer(function(o)
                 {
                   o.isExpand=false,o.doExpand(),o.collapseAll();
                   return true;
                 },p[i].tree.nDelay);
           }
        },
        draw: function()
        {
           if(this.html)return this;
           var a=[],bHvCld=0 < this.childNodes.length,i=1,s=['x-tree-node-el'],szClsTmp='';
           if(0==this.depth)
              a.push("<ul class=\"x-tree-root-ct x-tree-lines\">");
           a.push("<li class=\"x-tree-node depth" + this.depth + "\" id=\"" + this.id + "\">");
           a.push("<div id=\"i" + (XuiTree.idCnt++) + "\" unselectable=\"on\" class=\"");
           s.push("depth" + this.depth);
           
           if(this.isSelected)s.push("x-tree-selected");
           else s.push("x-unselectable");

           
           if(bHvCld)
           {
              
              if(this.isExpand)s.push("x-tree-node-expanded");
              else s.push("x-tree-node-collapsed");
              s.push("folder");
           }
           else s.push("x-tree-node-leaf file");
           a.push(s.join(' '));
           a.push("\"");
           
           a.push(" onmouseover=\"$(this).addClass('x-tree-node-over')\" onmouseout=\"$(this).removeClass('x-tree-node-over')\"");
           
           a.push(" onclick=\"return XuiTree.getTreeNode('" + this.tree.id + "','" + this.id + "').select(this,event,true)");
           if(bHvCld || this.loadLazy)a.push(",XuiTree.getTreeNode('" + this.tree.id + "','" + this.id + "').doExpand(event,true)");
           a.push(",false\"");
           a.push(">");
           
           if(0 < this.depth)
           {
              
              a.push("<span class=\"x-tree-node-indent\">");
              
              a.push("<img class=\"x-tree-icon\" src=\"" + g_sysInfo[2] + "default/s.gif\"/>");
              
              
              szClsTmp='x-tree-elbow-line';
              var oTmp=this.parent,aTmp=[],szCls='';
              while(oTmp && oTmp.parent)
              {
                 szCls="x-tree-icon";
                 if(oTmp.seq < oTmp.parent.childNodes.length - 1)
                    szCls="x-tree-elbow-line";
                 aTmp.push("<img class=\"" + szCls + "\" src=\"" + 
                     g_sysInfo[2] + "default/s.gif\"/>");
                 oTmp=oTmp.parent;
              }/*
              if(this.parent && this.parent.parent && this.parent.seq==this.parent.parent.childNodes.length - 1)szClsTmp='x-tree-icon';
              for(;i < this.depth; i++)
                a.push("<img class=\""),a.push(szClsTmp),a.push("\" src=\""),a.push(g_sysInfo[2]),a.push("default/s.gif\"/>");
                */
              a=a.concat(aTmp.reverse());
              a.push("</span>");
           }
           
           s=['x-tree-ec-icon'];
           
           if(bHvCld || this.loadLazy)
           {
              if(this.isExpand)s.push('x-tree-elbow-minus');
              else
              {
                  if(0==this.depth || (null !=this.parent && this.seq==(this.parent.childNodes.length - 1)))
                      s.push("x-tree-elbow-end-plus");
                  else s.push("x-tree-elbow-plus");
              }
           }
           else
           {
              
              if(0==this.depth || (null !=this.parent && this.seq==(this.parent.childNodes.length - 1)))
                s.push('x-tree-elbow-end');
              else s.push('x-tree-elbow');
           }
           s=s.join(' ');
           a.push("<img class=\"" + s + "\" src=\"" + g_sysInfo[2] + "default/s.gif\"");
           if(bHvCld || this.loadLazy)a.push(" onclick=\"XuiTree.getTreeNode('" + this.tree.id + "','" + this.id + "').doExpand(event,true)\"");
           a.push("/>");
           
            if(-1 < this.nodeIcon.indexOf("."))
                 a.push("<img height=16 width=16  unselectable=\"on\"  src=\"" + g_sysInfo[2] + "tree/" + this.nodeIcon + "\"/>");
           else a.push("<img unselectable=\"on\" class=\"" + this.nodeIcon + "\" src=\"" + g_sysInfo[2] + "default/s.gif\"/>");
           
           a.push(this.insertBfLabel(this));
           
           a.push("<a " + (this.onclick ? "onclick=\"" + this.onclick + "\" " : "") + "href=\"" + this.url + "\" class=\"x-tree-node-anchor\" hidefocus=\"on\"");
           if(this.target)a.push(" target=\"" + this.target + "\"");
           a.push("><span unselectable=\"on\">");
           a.push(this.label),a.push(this.insertAftLabel(this));
           a.push("</span></a>");
           a.push("</div>");

           if(bHvCld || this.loadLazy)
           {
              a.push("<ul style=\"display:" + (this.isExpand ? "block" : "none") + ";\" class=\"x-tree-node-ct\">");
              a.push("</ul>");
           }
           a.push("</li>");
           if(0==this.depth)
           {
               a.push("</ul>"),a.push("<input type=\"hidden\" name=\"" + this.id + "_add\"/>"),a.push("<input type=\"hidden\" name=\"" + this.id + "_del\"/>");
           }
           this.html=a.join("");
           if(0==this.depth && this.insertDom)
           {
             this.tree.insertDom=this.replaceHtml(this.tree.insertDom,this.html),this.Dom=$("#" + this.id).find("ul.x-tree-node-ct:first"),this.isExpand=true,this.doExpand();
              if(this.tree.bExpandAll)this.expandAll(),this.tree.bExpandAll=false;
              
              
              if(!this.tree.bRmOld || !$.cookie(this.tree.id))this.select(this.Dom.prev("div")[0],null);
           }
           return this;
        }
      },this.TreeNode.prototype);
      return this;
   },
   getTreeNode: function(szTreeId,szNdId)
   {
       return XuiTree.XuiTreeCc[szTreeId].allTreeCc[szNdId];
   },TreeNode: function(o)
   {
      this.ext(o,this);
      this['tree'] || (this['tree']=this),this.tree.nDelay || (this.tree.nDelay=13);
      
      if(0==this.depth)XuiTree.XuiTreeCc[this.id]=this;
      XuiTree.XuiTreeCc[this.tree.id]['allTreeCc'][this.id]=this;
      var _t=this,i=0,j=this.childNodes.length,depth=this.depth + 1,bHvId=!!this.id,nTm=this.tree.nDelay;
      for(;i < j; i++)
      {
        
        _t.ext({tree: _t['tree'],parent: _t,depth: depth,seq: i,id: [_t.id,depth,i].join('_')},_t.childNodes[i]);
        _t.childNodes[i]=new arguments.callee(_t.childNodes[i]);
      }
      
      if(null==this.parent || this.parent.isExpand)
      this.regTimer(function()
      {
        _t.draw();
        return true;
      },nTm);
      if(null==this.tree.id)this.tree.id=this.treeid;
      this.tree.bRmOld=window[this.tree.id.substr(0,this.tree.id.length - 4) + '_bRmOld'] || false;
      return this;
   }
}).init(), Mail = XUI({
    executed:false,check : function(o){
           var o=arguments[0];
           o.reg=/^[0-9|a-z|A-Z]{1,}[0-9|a-z|A-Z|_|-]*@[0-9|a-z|A-Z|_|-]*(\.[0-9|a-z|A-Z|_|-]*){1,3}$/;
    },sz_onblur : function(evt){
      if(window.bBoBq)return true;window.bBoBq=true;
      var e=(evt || event || window.event),o=e.srcElement || e.target;
      o.value=o.value.trim();
      if(0==o.value.length){
        Base.delInvalid(o);
      return window.bBoBq=false,true;
      }
      if (!o.reg.test(o.value)){
      Base.addInvalid(o);
      o=$(o);
      window.g_fcsfld=o.attr("name") || o.attr("id");
      alt("邮件地址无效，请检查并改正");
       setTimeout(function(){o.focus();
        o.select();},1);
        return window.bBoBq=false;
      }else{
      Base.delInvalid(o);
      window.bBoBq=false
      return true;
      }
    },getClipboard : function(){
      if (window.clipboardData) return(window.clipboardData.getData('Text'));
  else if (window.netscape) {
      netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
      var clip=Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
      if (!clip) return;
      var trans=Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
      if (!trans) return;
      trans.addDataFlavor('text/unicode');
      clip.getData(trans,clip.kGlobalClipboard);
      var str=new Object(),len=new Object();
      try {
         trans.getTransferData('text/unicode',str,len);
      }
      catch(error) {return null;}
      if (str) {
         if (Components.interfaces.nsISupportsWString) 
           str=str.value.QueryInterface(Components.interfaces.nsISupportsWString);
         else if (Components.interfaces.nsISupportsString) 
           str=str.value.QueryInterface(Components.interfaces.nsISupportsString);
         else str=null;
      }
      if (str) return(str.data.substring(0,len.value / 2));
   }
   return null;
}
}).init(), Phone = XUI({
    executed:false,check : function(o){
           var o=arguments[0];
           var reg=/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
           o.reg=eval(reg + ";");
           o=$(o);
           if(!o.attr("_blr"))
           {
              o.attr("_blr",true);
              o.blur(this.sz_onblur.bind(this));
           }
    },sz_onblur : function(evt){
      var e=(evt || event || window.event),o=e.srcElement || e.target;
      o.value=o.value.trim();
      if(0==o.value.length){
        Base.delInvalid(o);
      return true;
      }
      if (!o.reg.test(o.value)){
      Base.addInvalid(o);
      o=$(o);
      window.g_fcsfld=o.attr("name") || o.attr("id");
        alt("输入的电话号码无效，请检查并改正");
        o.select();
        return false;
      }else{
      Base.delInvalid(o);
      return true;
      }
    },getClipboard : function(){
      if (window.clipboardData) return(window.clipboardData.getData('Text'));
  else if (window.netscape) {
      netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
      var clip=Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
      if (!clip) return;
      var trans=Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
      if (!trans) return;
      trans.addDataFlavor('text/unicode');
      clip.getData(trans,clip.kGlobalClipboard);
      var str=new Object(),len=new Object();
      try {
         trans.getTransferData('text/unicode',str,len);
      }
      catch(error) {return null;}
      if (str) {
         if (Components.interfaces.nsISupportsWString) 
           str=str.value.QueryInterface(Components.interfaces.nsISupportsWString);
         else if (Components.interfaces.nsISupportsString) 
           str=str.value.QueryInterface(Components.interfaces.nsISupportsString);
         else str=null;
      }
      if (str) return(str.data.substring(0,len.value / 2));
   }
   return null;
}
}).init(), Post = XUI({
    executed:false,check : function(o){
           var o=arguments[0];
           o.reg=/^[1-9]\d{5}$/;
    },sz_onblur : function(evt){
      if(window.bBoBq)return true;window.bBoBq=true;
      var e=(evt || event || window.event),o=e.srcElement || e.target;
      o.value=o.value.trim();
      if(0==o.value.length){
        Base.delInvalid(o);
      return window.bBoBq=false,true;
      }
      if (!o.reg.test(o.value)){
      Base.addInvalid(o);
      o=$(o);
      window.g_fcsfld=o.attr("name") || o.attr("id");
        alt("输入的邮政编码无效，请检查并改正");
        setTimeout(function(){o.focus();
        o.select();},1);
        return window.bBoBq=false;
      }else{
      Base.delInvalid(o);
      window.bBoBq=false;
      return true;
      }
    },getClipboard : function(){
      if (window.clipboardData) return(window.clipboardData.getData('Text'));
  else if (window.netscape) {
      netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
      var clip=Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
      if (!clip) return;
      var trans=Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
      if (!trans) return;
      trans.addDataFlavor('text/unicode');
      clip.getData(trans,clip.kGlobalClipboard);
      var str=new Object(),len=new Object();
      try {
         trans.getTransferData('text/unicode',str,len);
      }
      catch(error) {return null;}
      if (str) {
         if (Components.interfaces.nsISupportsWString) 
           str=str.value.QueryInterface(Components.interfaces.nsISupportsWString);
         else if (Components.interfaces.nsISupportsString) 
           str=str.value.QueryInterface(Components.interfaces.nsISupportsString);
         else str=null;
      }
      if (str) return(str.data.substring(0,len.value / 2));
   }
   return null;
}
}).init(), SelectTree = XUI({
    
     initSlctTree:function(o,oStyle)
    {
       var id=o;
       o=$("#" + o);
       window.hdAll.push(function(){o.hide()});
       var oI=o.next(":input:first"),oTb=$(Base.p(oI[0],"TABLE"))
       oI.focus(function()
       {
         if(oI.attr("readonly") || oI.attr("disabled")) return;
           window.hdAll.start();
           var oSlct=$(XuiTree.slctCls),i,oPos=oI.position();
       o.css({left:oPos.left + "px",top: (oPos.top + oI.height()) + "px"});
        if(oStyle && oStyle.width )o.css("width",oStyle.width.replace(/[^\d]/g,""));
       else o.css("width",oTb.width()+'px');
       if(oStyle && oStyle.height)o.css("height",oStyle.height.replace(/[^\d]/g,"")+'px');
       o.show();
       
          if(1 < oSlct.length)
           {
             
             var xxx=-1,kk;
             o.find(".x-tree-selected").each(function(){
               xxx++;
               if(-1==this.innerHTML.indexOf(oI[0].nextSibling.value))
                 $(this).removeClass("x-tree-selected");
               else kk=xxx;
             });
             
              oSlct=oSlct[kk];XuiTree.curTree.select(oSlct,null,null);

              Base.fnSciv($("#" + id)[0],oSlct);
           }
       }).keydown(function(e)
       {
          if(oI.attr("readonly") || oI.attr("disabled")) return;
           if(9==e.which)return o.hide(),true;
           o.show();
           XuiTree.curTree=XuiTree.XuiTreeCc[id];
           o.keydown(e);
           $(this).focus();
       }).change(function(){
           if(0==this.value.trim().length)$(this).next().val('');
       }).blur(function(){
           if(!$(this).next().val())this.value='';
       });
       
       oTb.click(function(){oI.focus()});
    }
}).init(), MultiSelect = XUI({
  openMultiSelectDiv:function (e,o1,input){
  var o=$("#"+o1.id);
  input=$(input);
  if(input.attr("readonly"))return;
  o.attr("class","MultiSelectShow");
  oPos=input.position();    
  o.css({left:oPos.left+"px",top: (oPos.top+input.height()+4)+"px",width:(o1 && o1.width && parseInt(o1.width) || (input.width()+15))+"px"});

  o.find("Object,embed").width(o.width() + "px");
  var _o=o.find("#buttons");_o.css({"background-position":"1px","margin-top":"10px","margin-right":(o.width()-_o.width())/2});
  _o.find(".z-btn").css({"margin-right":"10px"});
  //处理文本框过滤
  var colsArr=eval(top.fnUnBase64Gzip($(o.find(".x-hide-display")[0]).text())),s="";
  for(i=0;i<colsArr.length;i++){
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
  }).hover(function(){
$(this).removeClass("button");
  $(this).addClass("button1");
  },function(){
  $(this).removeClass("button1");
  $(this).addClass("button");
  }
  );
  },hiddenMultiSelectDiv:function(id)
  {  
   $("#"+id).attr("class","MultiSelectHid");
   $("#"+id).css({left:"-3000px"});
  },selectedOk:function(o,input,_dg_id){
  var oArr=$(_dg_id.fnGetChckAllRows()),s="[",displayFields=o.attr("displayFields");
  if(oArr.size()!=0){ 
if(displayFields){
  oArr.each(function(){
  _t=this;
s+=_t[displayFields]+",";
  });
  input.val("共"+oArr.size()+"项："+s+"]");}
  else 
  input.val("[已经选择 "+oArr.size()+" 项]")
  }
  else input.val("");
  MultiSelect.hiddenMultiSelectDiv(o.attr("id"));
  }
}).init(), NewTab = XUI({
  tw :133,th :30,moveCount :0,
    closeTab : function(id,szid)
    {
      var tabs=$("#" + id),_t=NewTab.getHeader(szid),nextTab,tab_ul=$("#" + id + "_ul"),allshowTab=tab_ul.find("li").not(".x-tab-item-li-hide");
      if(window["g_active" + id]==szid)
      {
        nextTab=_t.nextAll(":not(.x-tab-item-li-hide)").not(".x-tab-item-li-disabled")[0] || _t.prevAll(":not(.x-tab-item-li-hide)").not(".x-tab-item-li-disabled")[0] || _t;
        this.tabLoad(id,$(nextTab));
      }
      _t.addClass("x-tab-item-li-hide");
      $("#" + szid).css("display","none");
      window["no_active" + "_" + szid]=false;
    },
    closeOtherTab : function(tabs,szid)
    {
    var tab_ul=$("#" + tabs + "_ul"),allshowTab=tab_ul.find("li").not(".x-tab-item-li-hide"),scDiv=$("#"+tabs+"_sc")[0] || $("#" + tabs + "_hdPanel")[0];
    if(allshowTab.size()  !=1)
    {
    tab_ul.find("li[id!=" + szid + "_hd]").each(function()
    {
    $(this).addClass("x-tab-item-li-hide");
    $("#" + $(this).attr("id") + "_body").css("display","none");
     window["no_active" + "_" + szid]=false;
    });
    $("#" + szid).css("display","block");
    this.tabLoad(tabs,NewTab.getHeader(szid));
    scDiv.scrollLeft=0;
    scDiv.scrollTop=0;
    }
    },
    showTab : function(id,o)
    {
      var myTab=$("#" + id),b=myTab.find("#" + o);
      NewTab.getHeader(o).removeClass("x-tab-item-li-hide");
      window["no_active" + "_" + o]=true;
      window.btInit();
    },
    disableTab : function(id,tab)
    {
    var _t=NewTab.getHeader(tab);
    _t.find("em").addClass("x-tab-item-li-em-disabled");
    _t.addClass("x-tab-item-li-disabled");
    if(window["g_active" + id]==tab)
    {
    nextTab=_t.nextAll(":not(.x-tab-item-li-hide)")[0] || _t.prevAll(":not(.x-tab-item-li-hide)")[0] || _t;
      this.tabLoad(id,$(nextTab));
    }
    _t.unbind("click");
    _t.unbind('contextmenu');
    },
    enableTab : function(id,tab)
    {
    var _t=NewTab.getHeader(tab);
    _t.find("em").removeClass("x-tab-item-li-em-disabled");
    _t.removeClass("x-tab-item-li-disabled");
    _t.unbind("click",window[tab+"_click"]);
    _t.bind("click",window[tab+"_click"]);
    NewTab.addContextMenu(id,_t);
    },toggleStyle : function(cStyle,o,show){
    },moveToTab : function(id,active){
     },
    setActiveTab : function(id,active)
    {
     var tab_ul=$("#" + id + "_ul"),o;
     if(null !=active && "null" !=active)
     {
      o=tab_ul.find("#" + active + "_hd")[0] || tab_ul.find("li:contains('" + active + "')")[0];
      o=$(o);
      this.tabLoad(id,o);
      this.enableTab(id,NewTab.getBodyId(o.attr("id")));
     }else {
      var ftabs=tab_ul.find("li"),nextTab;
      nextTab=ftabs.nextAll(":not(.x-tab-item-li-hide)").not(".x-tab-item-li-disabled")[0] || ftabs.prevAll(":not(.x-tab-item-li-hide)").not(".x-tab-item-li-disabled")[0] || ftabs;
      this.tabLoad(id,$(nextTab));
      this.enableTab(id,nextTab.attr("id"));
     }
     try{window[active+"_click"]();}catch(e){}
     },getDisplayWidth : function(id,index){
   },
   tabScrollRightHandler : function(id,speed){
   var n=3,k=0,tabs=$("#" + id),tabs_panel=document.getElementById(id + "_hdPanel"),w=$(tabs_panel).width(),aLi=$("#" + id + "_ul").find("li:not(.x-tab-item-li-hide)"),tn=aLi.length,aW=this.getAllTabWidth(aLi);
   if(w >=aW || this.moveCount==tn - 1)return;
   _tw=aLi.eq(this.moveCount).attr("offsetWidth");this.moveCount++;
   Base.regTimer(function(){
     if(k + n > _tw)n=_tw - k;
     tabs_panel.scrollLeft +=n;
     k +=n;
     if(_tw==k )return true;
     n *=5;
     return false;
   },33);
      },getAllTabWidth :function(aLi){
      var w=0;
      aLi.each(function(){
      w +=$(this).width();
      });
      return w;
      }, 
     tabScrollLeftHandler : function(id,speed){
   var n=3,k=0,tabs=$("#" + id),tabs_panel=document.getElementById(id + "_hdPanel"),aLi=$("#" + id + "_ul").find("li:not(.x-tab-item-li-hide)"),tn=aLi.length,aW=this.getAllTabWidth(aLi);
   if(tabs_panel.scrollLeft <=0 || this.moveCount <=0)return;
   _tw=aLi.eq(this.moveCount-1).attr("offsetWidth");this.moveCount--;
   Base.regTimer(function(){
     if(k + n > _tw)n=_tw - k;
     tabs_panel.scrollLeft -=n;
     k +=n;
     if(_tw==k)return true;
     n *=5;
     return false;
   },33);
     }, 
      tabScrollTopHandler : function(id,speed){
      var n=3,k=0,tabs=$("#"+id),tabs_panel=document.getElementById(id+"_sc"),_th=this.th;
   if(tabs_panel.scrollTop <=0)return;
   Base.regTimer(function(){
     if(k + n > _th)n=_th - k;
     tabs_panel.scrollTop-=n;
     k +=n;
     if(_th==k )return true;
     n *=2;
     return false;
   },13);
      }, 
      tabScrollDownHandler : function(id,speed){
      var n=3,k=0,tabs=$("#"+id),tabs_panel=document.getElementById(id+"_sc"),_th=this.th,tn=$("#"+id+"_ul").find("li:not(.x-tab-item-li-hide)").length,h=$(tabs_panel).height();
   if(tn*_th <=h || tabs_panel.scrollTop >=(tn-3)*_th)return;
   Base.regTimer(function(){
     if(k + n > _th)n=_th - k;
     tabs_panel.scrollTop+=n;
     k +=n;
     if(_th==k)return true;
     n *=2;
     return false;
   },13);
   
      },
     tabLoad : function(id,span,hide,ld){
      // 1.先显示当前页（若隐藏），设置激活样式
      // 2.保存激活信息（tabs,form）
      // 3.除去其他激活样式
      // 4.焦点处于第一个 input对象
    var tabs_ul=$("#"+id+"_ul"),curTab=span,tabs=$("#"+id),hd_id=curTab.attr("id"),curTab_body=NewTab.getBodyId(hd_id);
    NewTab.showTab(id,curTab_body);
   var spans=curTab.find("span");
    spans.filter(".x-tab-item-text").addClass("x-tab-item-text-active");
    spans.filter(".x-tab-item-bg-right").addClass("x-tab-item-bg-right-active");
    spans.filter(".x-tab-item-bg-left").addClass("x-tab-item-bg-left-active");
    /** 显示当前TAB_BODY **/
    $("#"+curTab_body).css("display","block").removeClass("x-hide-display");
    tabs_ul.find("li[id!="+curTab.attr("id")+"]").each(function(){
    spans=$(this).find("span");
    spans.filter(".x-tab-item-text").removeClass("x-tab-item-text-active");
    spans.filter(".x-tab-item-bg-right").removeClass("x-tab-item-bg-right-active");
    spans.filter(".x-tab-item-bg-left").removeClass("x-tab-item-bg-left-active");
    var cur_hdId=$(this).attr("id");
    $("#"+NewTab.getBodyId(cur_hdId)).addClass("x-hide-display");
    });
    var tabs_h=$("#"+id).find("ol:first").height(),_tabbody=$("#"+NewTab.getBodyId(curTab.attr("id"))),tab_h=_tabbody.height();
    if(window["g_"+id+"_hgt"]){
    if(tab_h && _tabbody.attr("havHgt"))
    $("#"+id).find("ol:first").height(tab_h);
    else  
    $("#"+id).find("ol:first").height(window["g_"+id+"_hgt"]);
    }
    try{if(!ld){ $("#"+curTab_body).find(":input[type!=hidden]").eq(0).focus();}}catch(e){}
    window["g_active"+id]=curTab_body;
    (id+"_Act").setValue(curTab_body);
    },tabOver : function(o,show){
    },tablist : function(id,o){
    },isAllHide : function(id){
    },getNextShowTab : function(id,index){
    },slidet : function(id,o,index){
    },
    getHeader : function(id){
    return $("#"+id+"_hd");
    },
    getBodyId : function(id){
    return id.substr(0,id.length-3);
    },
    updateTab : function(tabs,id){
    var tab=NewTab.getHeader(id),tab_body=$("#"+id);
    if(typeof tab.attr("reqCode") !="undefined"){
    Base.AjaxUpdateUi(id,tab.attr("reqCode"));
    }
    else if(typeof tab.attr("url") !="undefined")
    {
    document.getElementById("iframe_"+id).src=tab.attr("url");
    }
    window["g_Refreshed_"+id]=true;
    },
    addTab :function(tabs,o){
    return createTabItem(tabs,o);
    },
    createTabItem : function(tabs,o,flg){
    var arr=eval("["+window["g_existTabs"]+"]"),tab_ul=$("#"+tabs+"_ul"),tabs_o=$("#"+tabs),bodys=tabs_o.find("ol:first");
    if($.inArray(o.id,arr)>0){
    bodys[0].removeChild(document.getElementById(o.id));
    tab_ul[0].removeChild(document.getElementById(o.id+"_hd"));
    }
var li,url=o.url!=null?" url='"+o.url+"'":" ",reqCode=o.reqCode!=null?" reqCode='"+o.reqCode+"'":" ";
var itemsCodeArr=[
"<li  class='x-tab-item-li' isTab='true'","id="+o.id+"_hd mode='"+o.mode+"' "+url+reqCode+" >","<span class='x-tab-item-bg-left'/>","<span class='x-tab-item-text' title="+o.key+">","<em>"+o.key+"</em></span>","<span class='x-tab-item-bg-right'/>","</li>"
    ];
    li=$(itemsCodeArr.join(""));
    li.data("Clk",o.onclick);
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
   var mode=o.mode || "";
   tab_ul.append(li);
    switch(mode.toUpperCase()){
   case "H":
   NewTab.closeTab(tabs,o.id);
   break;
   case "D":
   if(!(o.id==window["g_initAct"] || o.key==window["g_initAct"]))
   NewTab.disableTab(tabs,o.id);
   else mode="E";
   break;
   }
   var tab_body=tabs_o.find("#"+o.id),ol=tabs_o.find("ol:first");
   if(null==tab_body[0]){
   ol.append($("<div/>").addClass("newTab_body x-hide-display").attr("id",o.id).css("height",o.height || "auto"));
   }
   if(null !=o.url){
   var iframe_id="iframe_"+o.id;
   tabs_o.find("#"+o.id)
   .append($("<iframe frameborder='no' border='0' marginwidth='0' marginheight='0'/>")
   .attr("src",o.url).addClass("x-tab-iten-body-iframe")
   .attr("id",iframe_id)
   .height("100%"));
   }
   if(url.trim() !="" || reqCode.trim() !="")window["g"+tabs+"_"+o.id+"_Refresh"]="Refresh";
   if(mode.toUpperCase()!="D"){
   NewTab.addContextMenu(tabs,li);
   }
   if(o.height){
   tabs_o.find("#"+o.id).css("height",o.height).attr("havHgt",true);
   }else
   {
   tabs_o.find("#"+o.id).css("height","auto");
   }
   window["g_existTabs"]+=",'"+o.id+"'";
     },
     createTabsHeader : function(o){
     if(o.haveAjax && window["g_existTabs"]){window["g_existTabs"]=[]};
     var allTab=o.alltab,tabs=$("#"+o.id);
     if($("#"+o.id+'_hdPanel')[0])return;
     window["g_initAct"]=o.active;
     window["g_"+o.id+"_hgt"]=o.height;
     var hPos=o.hPos || "T",tabArr=[];
     if(hPos=="T" || hPos=="B"){
    var htmlCodeArr=[
     "<div id='"+o.id+"_mLeft' ></div>","<div id='"+o.id+"_mRight' ></div>","<div id='"+o.id+"_hdPanel'>","<ul class='x-tab-item-ul' id='"+o.id+"_ul'>","</ul>","</div>"
     ],header=$(htmlCodeArr.join(""));
    header.addClass("x-tabs-panel");
    if(hPos=="T")tabs.prepend(header);else  tabs.append(header);
             if(!noLockPage){
    $("#"+o.id+"_mRight").click(function(){
    NewTab.tabScrollRightHandler(o.id);
    }).attr("title","向右滑动").addClass("x-tabs-panel-mright");
    $("#"+o.id+"_mLeft").click(function(){
    NewTab.tabScrollLeftHandler(o.id);
    }).attr("title","向左滑动").addClass("x-tabs-panel-mleft");
            }
     }else if(hPos=="L" || hPos=="R"){
     header=[
     "<div id='"+o.id+"_hdPanel'>","<div id='"+o.id+"_mLeft' ></div>","<div id='"+o.id+"_sc'><ul id='"+o.id+"_ul'>","</ul></div>","<div id='"+o.id+"_mRight' ></div>","</div>"
     ].join("");
     header=$(header);
     if(hPos=="L"){
     header.addClass("x-tabs-panel-left");
     tabs.prepend(header);
     tabs.find("ol:first").css("width","auto");
     }else{
     header.addClass("x-tabs-panel-right");
     var ol=tabs.find("ol:first").css({"width":tabs.width()-142,"float":"left"});
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
     if(hPos=="L" || hPos=="R"){
     $("#"+o.id+"_ul").find(".x-tab-item-text").css("width","122");
     }
     if(o.alltab.length==0)return;
     var tab_ul=$("#"+o.id+"_ul"),activeTab=tab_ul.find("#"+o.active+"_hd")[0] || tab_ul.find("li:contains("+o.active+")")[0] || tab_ul.find("li").not(".x-tab-item-li-hide").not(".x-tab-item-li-disabled")[0],activeTab=$(activeTab);
 this.tabLoad(o.id,activeTab,null,true);
 eval(activeTab.data("Clk"));
     },
     addContextMenu : function(tabs,li){
$("#contextMenuSource").remove(); 
var is_Refresh=window["g"+tabs+"_"+NewTab.getBodyId(li[0].id)+"_Refresh"];
     var contextMenuSource=[
     "<div class='contextMenu' id='contextMenuSource'><ul>","<li id='close'><img src='"+g_sysInfo[2]+"/default/tabs/remove_outline.png' /> 关闭当前</li>","<li id='closeOther'><img src='"+g_sysInfo[2]+"/default/tabs/remove.png' /> 关闭其他</li>","<li id='refresh'><img src='"+g_sysInfo[2]+"/default/tabs/refresh.png' /> 刷新当前</li></ul></div>"
     ],cm=$(contextMenuSource.join("")).addClass("x-tabs-contextMenu");
     $("body").append(cm);
     li.contextMenu("contextMenuSource",{
      bindings:{
      "close":function(_t){
    NewTab.closeTab(tabs,NewTab.getBodyId(_t.id));
      },"closeOther":function(_t){
    NewTab.closeOtherTab(tabs,NewTab.getBodyId(_t.id));
      },"refresh":function(_t){
    NewTab.updateTab(tabs,NewTab.getBodyId(_t.id));
      }
      },isRefresh:is_Refresh
     });
     },changeTitle : function(tabs,id,s){
     $("#"+tabs+"_ul").find("#"+id+"_hd").find("em").text(s);
     $("#"+tabs+"_ul").find("#"+id+"_hd").find("span").eq(1).attr("title",s);
     },init: function()
    {
     XUI(this);
     window.Tab=this;return this;
  }
     }).init()/*
 * Raphael 1.4.7 - JavaScript Vector Library
 *
 * Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael=function(){function l(){if(l.is(arguments[0],U)){for(var a=arguments[0],b=Ca[K](l,a.splice(0,3+l.is(a[0],P))),c=b.set(),d=0,f=a[o];d<f;d++){var e=a[d]||{};sb.test(e.type)&&c[F](b[e.type]().attr(e))}return c}return Ca[K](l,arguments)}l.version="1.4.7";var V=/[, ]+/,sb=/^(circle|rect|path|ellipse|text|image)$/,p="prototype",z="hasOwnProperty",C=document,aa=window,Qa={was:Object[p][z].call(aa,"Raphael"),is:aa.Raphael};function H(){}var x="appendChild",K="apply",M="concat",Da="createTouch"in C,
A="",N=" ",D=String,G="split",Ra="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend orientationchange touchcancel gesturestart gesturechange gestureend"[G](N),Ea={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},R="join",o="length",fa=String[p].toLowerCase,v=Math,Y=v.max,ba=v.min,P="number",ga="string",U="array",O="toString",ca="fill",tb=Object[p][O],E=v.pow,F="push",ja=/^(?=[\da-f]$)/,Sa=/^url\(['"]?([^\)]+?)['"]?\)$/i,ub=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+(?:\s*,\s*[\d\.]+)?)\s*\)|rgba?\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%(?:\s*,\s*[\d\.]+%)?)\s*\)|hsb\(\s*([\d\.]+(?:deg|\xb0)?\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hsb\(\s*([\d\.]+(?:deg|\xb0|%)\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\)|hsl\(\s*([\d\.]+(?:deg|\xb0)?\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hsl\(\s*([\d\.]+(?:deg|\xb0|%)\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i,
Q=v.round,W="setAttribute",y=parseFloat,ha=parseInt,Fa=" progid:DXImageTransform.Microsoft",sa=String[p].toUpperCase,ta={blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/",opacity:1,path:"M0,0",r:0,rotation:0,rx:0,ry:0,scale:"1 1",src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt",
"stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",translation:"0 0",width:0,x:0,y:0},Ga={along:"along",blur:P,"clip-rect":"csv",cx:P,cy:P,fill:"colour","fill-opacity":P,"font-size":P,height:P,opacity:P,path:"path",r:P,rotation:"csv",rx:P,ry:P,scale:"csv",stroke:"colour","stroke-opacity":P,"stroke-width":P,translation:"csv",width:P,x:P,y:P},I="replace";l.type=aa.SVGAngle||C.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure",
"1.1")?"SVG":"VML";if(l.type=="VML"){var da=C.createElement("div");da.innerHTML='<v:shape adj="1"/>';da=da.firstChild;da.style.behavior="url(#default#VML)";if(!(da&&typeof da.adj=="object"))return l.type=null;da=null}l.svg=!(l.vml=l.type=="VML");H[p]=l[p];l._id=0;l._oid=0;l.fn={};l.is=function(a,b){b=fa.call(b);return b=="object"&&a===Object(a)||b=="undefined"&&typeof a==b||b=="null"&&a==null||b=="array"&&Array.isArray&&Array.isArray(a)||fa.call(tb.call(a).slice(8,-1))==b};l.setWindow=function(a){aa=
a;C=aa.document};function ua(a){if(l.vml){var b=/^\s+|\s+$/g;ua=Z(function(d){var f;d=D(d)[I](b,A);try{var e=new aa.ActiveXObject("htmlfile");e.write("<body>");e.close();f=e.body}catch(g){f=aa.createPopup().document.body}e=f.createTextRange();try{f.style.color=d;var h=e.queryCommandValue("ForeColor");h=(h&255)<<16|h&65280|(h&16711680)>>>16;return"#"+("000000"+h[O](16)).slice(-6)}catch(i){return"none"}})}else{var c=C.createElement("i");c.title="Rapha\u00ebl Colour Picker";c.style.display="none";C.body[x](c);
ua=Z(function(d){c.style.color=d;return C.defaultView.getComputedStyle(c,A).getPropertyValue("color")})}return ua(a)}function Ta(){return"hsb("+[this.h,this.s,this.b]+")"}function vb(){return"hsl("+[this.h,this.s,this.l]+")"}function wb(){return this.hex}l.hsb2rgb=function(a,b,c){if(l.is(a,"object")&&"h"in a&&"s"in a&&"b"in a){c=a.b;b=a.s;a=a.h}return l.hsl2rgb(a,b,c/2)};l.hsl2rgb=function(a,b,c){if(l.is(a,"object")&&"h"in a&&"s"in a&&"l"in a){c=a.l;b=a.s;a=a.h}if(a>1||b>1||c>1){a/=255;b/=255;c/=
255}var d={},f=["r","g","b"],e;if(b){b=c<0.5?c*(1+b):c+b-c*b;c=2*c-b;for(var g=0,h=f.length;g<h;g++){e=a+1/3*-(g-1);e<0&&e++;e>1&&e--;d[f[g]]=e*6<1?c+(b-c)*6*e:e*2<1?b:e*3<2?c+(b-c)*(2/3-e)*6:c}}else d={r:c,g:c,b:c};d.r*=255;d.g*=255;d.b*=255;a=(~~d.r)[O](16);f=(~~d.g)[O](16);b=(~~d.b)[O](16);a=a[I](ja,"0");f=f[I](ja,"0");b=b[I](ja,"0");d.hex="#"+a+f+b;d.toString=wb;return d};l.rgb2hsb=function(a,b,c){if(b==null&&l.is(a,"object")&&"r"in a&&"g"in a&&"b"in a){c=a.b;b=a.g;a=a.r}if(b==null&&l.is(a,ga)){var d=
l.getRGB(a);a=d.r;b=d.g;c=d.b}if(a>1||b>1||c>1){a/=255;b/=255;c/=255}var f=Y(a,b,c),e=ba(a,b,c);d=f;if(e==f)return{h:0,s:0,b:f,toString:Ta};else{var g=f-e;e=g/f;a=a==f?(b-c)/g:b==f?2+(c-a)/g:4+(a-b)/g;a/=6;a<0&&a++;a>1&&a--}return{h:a,s:e,b:d,toString:Ta}};l.rgb2hsl=function(a,b,c){if(b==null&&l.is(a,"object")&&"r"in a&&"g"in a&&"b"in a){c=a.b;b=a.g;a=a.r}if(b==null&&l.is(a,ga)){var d=l.getRGB(a);a=d.r;b=d.g;c=d.b}if(a>1||b>1||c>1){a/=255;b/=255;c/=255}var f=Y(a,b,c),e=ba(a,b,c);d=(f+e)/2;if(e==f)a=
{h:0,s:0,l:d};else{var g=f-e;e=d<0.5?g/(f+e):g/(2-f-e);a=a==f?(b-c)/g:b==f?2+(c-a)/g:4+(a-b)/g;a/=6;a<0&&a++;a>1&&a--;a={h:a,s:e,l:d}}a.toString=vb;return a};var xb=/,?([achlmqrstvxz]),?/gi,ka=/\s*,\s*/,yb={hs:1,rg:1};l._path2string=function(){return this.join(",")[I](xb,"$1")};function Z(a,b,c){function d(){var f=Array[p].slice.call(arguments,0),e=f[R]("\u25ba"),g=d.cache=d.cache||{},h=d.count=d.count||[];if(g[z](e))return c?c(g[e]):g[e];h[o]>=1000&&delete g[h.shift()];h[F](e);g[e]=a[K](b,f);return c?
c(g[e]):g[e]}return d}l.getRGB=Z(function(a){if(!a||(a=D(a)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1};if(a=="none")return{r:-1,g:-1,b:-1,hex:"none"};!(yb[z](a.substring(0,2))||a.charAt()=="#")&&(a=ua(a));var b,c,d,f,e;if(a=a.match(ub)){if(a[2]){d=ha(a[2].substring(5),16);c=ha(a[2].substring(3,5),16);b=ha(a[2].substring(1,3),16)}if(a[3]){d=ha((e=a[3].charAt(3))+e,16);c=ha((e=a[3].charAt(2))+e,16);b=ha((e=a[3].charAt(1))+e,16)}if(a[4]){a=a[4][G](ka);b=y(a[0]);c=y(a[1]);d=y(a[2]);f=y(a[3])}if(a[5]){a=
a[5][G](ka);b=y(a[0])*2.55;c=y(a[1])*2.55;d=y(a[2])*2.55;f=y(a[3])}if(a[6]){a=a[6][G](ka);b=y(a[0]);c=y(a[1]);d=y(a[2]);(a[0].slice(-3)=="deg"||a[0].slice(-1)=="\u00b0")&&(b/=360);return l.hsb2rgb(b,c,d)}if(a[7]){a=a[7][G](ka);b=y(a[0])*2.55;c=y(a[1])*2.55;d=y(a[2])*2.55;(a[0].slice(-3)=="deg"||a[0].slice(-1)=="\u00b0")&&(b/=360*2.55);return l.hsb2rgb(b,c,d)}if(a[8]){a=a[8][G](ka);b=y(a[0]);c=y(a[1]);d=y(a[2]);(a[0].slice(-3)=="deg"||a[0].slice(-1)=="\u00b0")&&(b/=360);return l.hsl2rgb(b,c,d)}if(a[9]){a=
a[9][G](ka);b=y(a[0])*2.55;c=y(a[1])*2.55;d=y(a[2])*2.55;(a[0].slice(-3)=="deg"||a[0].slice(-1)=="\u00b0")&&(b/=360*2.55);return l.hsl2rgb(b,c,d)}a={r:b,g:c,b:d};b=(~~b)[O](16);c=(~~c)[O](16);d=(~~d)[O](16);b=b[I](ja,"0");c=c[I](ja,"0");d=d[I](ja,"0");a.hex="#"+b+c+d;isFinite(y(f))&&(a.o=f);return a}return{r:-1,g:-1,b:-1,hex:"none",error:1}},l);l.getColor=function(a){a=this.getColor.start=this.getColor.start||{h:0,s:1,b:a||0.75};var b=this.hsb2rgb(a.h,a.s,a.b);a.h+=0.075;if(a.h>1){a.h=0;a.s-=0.2;
a.s<=0&&(this.getColor.start={h:0,s:1,b:a.b})}return b.hex};l.getColor.reset=function(){delete this.start};var zb=/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,Ab=/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig;l.parsePathString=Z(function(a){if(!a)return null;var b={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},c=[];if(l.is(a,U)&&l.is(a[0],U))c=va(a);c[o]||D(a)[I](zb,function(d,f,e){var g=[];d=fa.call(f);e[I](Ab,function(h,i){i&&g[F](+i)});if(d=="m"&&g[o]>2){c[F]([f][M](g.splice(0,2)));d="l";
f=f=="m"?"l":"L"}for(;g[o]>=b[d];){c[F]([f][M](g.splice(0,b[d])));if(!b[d])break}});c[O]=l._path2string;return c});l.findDotsAtSegment=function(a,b,c,d,f,e,g,h,i){var j=1-i,m=E(j,3)*a+E(j,2)*3*i*c+j*3*i*i*f+E(i,3)*g;j=E(j,3)*b+E(j,2)*3*i*d+j*3*i*i*e+E(i,3)*h;var n=a+2*i*(c-a)+i*i*(f-2*c+a),r=b+2*i*(d-b)+i*i*(e-2*d+b),q=c+2*i*(f-c)+i*i*(g-2*f+c),k=d+2*i*(e-d)+i*i*(h-2*e+d);a=(1-i)*a+i*c;b=(1-i)*b+i*d;f=(1-i)*f+i*g;e=(1-i)*e+i*h;h=90-v.atan((n-q)/(r-k))*180/v.PI;(n>q||r<k)&&(h+=180);return{x:m,y:j,
m:{x:n,y:r},n:{x:q,y:k},start:{x:a,y:b},end:{x:f,y:e},alpha:h}};var xa=Z(function(a){if(!a)return{x:0,y:0,width:0,height:0};a=wa(a);for(var b=0,c=0,d=[],f=[],e,g=0,h=a[o];g<h;g++){e=a[g];if(e[0]=="M"){b=e[1];c=e[2];d[F](b);f[F](c)}else{b=Bb(b,c,e[1],e[2],e[3],e[4],e[5],e[6]);d=d[M](b.min.x,b.max.x);f=f[M](b.min.y,b.max.y);b=e[5];c=e[6]}}a=ba[K](0,d);e=ba[K](0,f);return{x:a,y:e,width:Y[K](0,d)-a,height:Y[K](0,f)-e}});function va(a){var b=[];if(!l.is(a,U)||!l.is(a&&a[0],U))a=l.parsePathString(a);for(var c=
0,d=a[o];c<d;c++){b[c]=[];for(var f=0,e=a[c][o];f<e;f++)b[c][f]=a[c][f]}b[O]=l._path2string;return b}var Ha=Z(function(a){if(!l.is(a,U)||!l.is(a&&a[0],U))a=l.parsePathString(a);var b=[],c=0,d=0,f=0,e=0,g=0;if(a[0][0]=="M"){c=a[0][1];d=a[0][2];f=c;e=d;g++;b[F](["M",c,d])}g=g;for(var h=a[o];g<h;g++){var i=b[g]=[],j=a[g];if(j[0]!=fa.call(j[0])){i[0]=fa.call(j[0]);switch(i[0]){case "a":i[1]=j[1];i[2]=j[2];i[3]=j[3];i[4]=j[4];i[5]=j[5];i[6]=+(j[6]-c).toFixed(3);i[7]=+(j[7]-d).toFixed(3);break;case "v":i[1]=
+(j[1]-d).toFixed(3);break;case "m":f=j[1];e=j[2];default:for(var m=1,n=j[o];m<n;m++)i[m]=+(j[m]-(m%2?c:d)).toFixed(3)}}else{b[g]=[];if(j[0]=="m"){f=j[1]+c;e=j[2]+d}i=0;for(m=j[o];i<m;i++)b[g][i]=j[i]}j=b[g][o];switch(b[g][0]){case "z":c=f;d=e;break;case "h":c+=+b[g][j-1];break;case "v":d+=+b[g][j-1];break;default:c+=+b[g][j-2];d+=+b[g][j-1]}}b[O]=l._path2string;return b},0,va),oa=Z(function(a){if(!l.is(a,U)||!l.is(a&&a[0],U))a=l.parsePathString(a);var b=[],c=0,d=0,f=0,e=0,g=0;if(a[0][0]=="M"){c=
+a[0][1];d=+a[0][2];f=c;e=d;g++;b[0]=["M",c,d]}g=g;for(var h=a[o];g<h;g++){var i=b[g]=[],j=a[g];if(j[0]!=sa.call(j[0])){i[0]=sa.call(j[0]);switch(i[0]){case "A":i[1]=j[1];i[2]=j[2];i[3]=j[3];i[4]=j[4];i[5]=j[5];i[6]=+(j[6]+c);i[7]=+(j[7]+d);break;case "V":i[1]=+j[1]+d;break;case "H":i[1]=+j[1]+c;break;case "M":f=+j[1]+c;e=+j[2]+d;default:for(var m=1,n=j[o];m<n;m++)i[m]=+j[m]+(m%2?c:d)}}else{m=0;for(n=j[o];m<n;m++)b[g][m]=j[m]}switch(i[0]){case "Z":c=f;d=e;break;case "H":c=i[1];break;case "V":d=i[1];
break;case "M":f=b[g][b[g][o]-2];e=b[g][b[g][o]-1];default:c=b[g][b[g][o]-2];d=b[g][b[g][o]-1]}}b[O]=l._path2string;return b},null,va);function ya(a,b,c,d){return[a,b,c,d,c,d]}function Ua(a,b,c,d,f,e){var g=1/3,h=2/3;return[g*a+h*c,g*b+h*d,g*f+h*c,g*e+h*d,f,e]}function Va(a,b,c,d,f,e,g,h,i,j){var m=v.PI,n=m*120/180,r=m/180*(+f||0),q=[],k,t=Z(function(J,ia,za){var Cb=J*v.cos(za)-ia*v.sin(za);J=J*v.sin(za)+ia*v.cos(za);return{x:Cb,y:J}});if(j){w=j[0];k=j[1];e=j[2];B=j[3]}else{k=t(a,b,-r);a=k.x;b=k.y;
k=t(h,i,-r);h=k.x;i=k.y;v.cos(m/180*f);v.sin(m/180*f);k=(a-h)/2;w=(b-i)/2;B=k*k/(c*c)+w*w/(d*d);if(B>1){B=v.sqrt(B);c=B*c;d=B*d}B=c*c;var L=d*d;B=(e==g?-1:1)*v.sqrt(v.abs((B*L-B*w*w-L*k*k)/(B*w*w+L*k*k)));e=B*c*w/d+(a+h)/2;var B=B*-d*k/c+(b+i)/2,w=v.asin(((b-B)/d).toFixed(7));k=v.asin(((i-B)/d).toFixed(7));w=a<e?m-w:w;k=h<e?m-k:k;w<0&&(w=m*2+w);k<0&&(k=m*2+k);if(g&&w>k)w-=m*2;if(!g&&k>w)k-=m*2}m=k-w;if(v.abs(m)>n){q=k;m=h;L=i;k=w+n*(g&&k>w?1:-1);h=e+c*v.cos(k);i=B+d*v.sin(k);q=Va(h,i,c,d,f,0,g,m,
L,[k,q,e,B])}m=k-w;f=v.cos(w);e=v.sin(w);g=v.cos(k);k=v.sin(k);m=v.tan(m/4);c=4/3*c*m;m=4/3*d*m;d=[a,b];a=[a+c*e,b-m*f];b=[h+c*k,i-m*g];h=[h,i];a[0]=2*d[0]-a[0];a[1]=2*d[1]-a[1];if(j)return[a,b,h][M](q);else{q=[a,b,h][M](q)[R]()[G](",");j=[];h=0;for(i=q[o];h<i;h++)j[h]=h%2?t(q[h-1],q[h],r).y:t(q[h],q[h+1],r).x;return j}}function la(a,b,c,d,f,e,g,h,i){var j=1-i;return{x:E(j,3)*a+E(j,2)*3*i*c+j*3*i*i*f+E(i,3)*g,y:E(j,3)*b+E(j,2)*3*i*d+j*3*i*i*e+E(i,3)*h}}var Bb=Z(function(a,b,c,d,f,e,g,h){var i=f-2*
c+a-(g-2*f+c),j=2*(c-a)-2*(f-c),m=a-c,n=(-j+v.sqrt(j*j-4*i*m))/2/i;i=(-j-v.sqrt(j*j-4*i*m))/2/i;var r=[b,h],q=[a,g];v.abs(n)>1000000000000&&(n=0.5);v.abs(i)>1000000000000&&(i=0.5);if(n>0&&n<1){n=la(a,b,c,d,f,e,g,h,n);q[F](n.x);r[F](n.y)}if(i>0&&i<1){n=la(a,b,c,d,f,e,g,h,i);q[F](n.x);r[F](n.y)}i=e-2*d+b-(h-2*e+d);j=2*(d-b)-2*(e-d);m=b-d;n=(-j+v.sqrt(j*j-4*i*m))/2/i;i=(-j-v.sqrt(j*j-4*i*m))/2/i;v.abs(n)>1000000000000&&(n=0.5);v.abs(i)>1000000000000&&(i=0.5);if(n>0&&n<1){n=la(a,b,c,d,f,e,g,h,n);q[F](n.x);
r[F](n.y)}if(i>0&&i<1){n=la(a,b,c,d,f,e,g,h,i);q[F](n.x);r[F](n.y)}return{min:{x:ba[K](0,q),y:ba[K](0,r)},max:{x:Y[K](0,q),y:Y[K](0,r)}}}),wa=Z(function(a,b){var c=oa(a),d=b&&oa(b);a={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null};b={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null};function f(q,k){var t;if(!q)return["C",k.x,k.y,k.x,k.y,k.x,k.y];!(q[0]in{T:1,Q:1})&&(k.qx=k.qy=null);switch(q[0]){case "M":k.X=q[1];k.Y=q[2];break;case "A":q=["C"][M](Va[K](0,[k.x,k.y][M](q.slice(1))));break;case "S":t=k.x+(k.x-
(k.bx||k.x));k=k.y+(k.y-(k.by||k.y));q=["C",t,k][M](q.slice(1));break;case "T":k.qx=k.x+(k.x-(k.qx||k.x));k.qy=k.y+(k.y-(k.qy||k.y));q=["C"][M](Ua(k.x,k.y,k.qx,k.qy,q[1],q[2]));break;case "Q":k.qx=q[1];k.qy=q[2];q=["C"][M](Ua(k.x,k.y,q[1],q[2],q[3],q[4]));break;case "L":q=["C"][M](ya(k.x,k.y,q[1],q[2]));break;case "H":q=["C"][M](ya(k.x,k.y,q[1],k.y));break;case "V":q=["C"][M](ya(k.x,k.y,k.x,q[1]));break;case "Z":q=["C"][M](ya(k.x,k.y,k.X,k.Y));break}return q}function e(q,k){if(q[k][o]>7){q[k].shift();
for(var t=q[k];t[o];)q.splice(k++,0,["C"][M](t.splice(0,6)));q.splice(k,1);i=Y(c[o],d&&d[o]||0)}}function g(q,k,t,L,B){if(q&&k&&q[B][0]=="M"&&k[B][0]!="M"){k.splice(B,0,["M",L.x,L.y]);t.bx=0;t.by=0;t.x=q[B][1];t.y=q[B][2];i=Y(c[o],d&&d[o]||0)}}for(var h=0,i=Y(c[o],d&&d[o]||0);h<i;h++){c[h]=f(c[h],a);e(c,h);d&&(d[h]=f(d[h],b));d&&e(d,h);g(c,d,a,b,h);g(d,c,b,a,h);var j=c[h],m=d&&d[h],n=j[o],r=d&&m[o];a.x=j[n-2];a.y=j[n-1];a.bx=y(j[n-4])||a.x;a.by=y(j[n-3])||a.y;b.bx=d&&(y(m[r-4])||b.x);b.by=d&&(y(m[r-
3])||b.y);b.x=d&&m[r-2];b.y=d&&m[r-1]}return d?[c,d]:c},null,va),Wa=Z(function(a){for(var b=[],c=0,d=a[o];c<d;c++){var f={},e=a[c].match(/^([^:]*):?([\d\.]*)/);f.color=l.getRGB(e[1]);if(f.color.error)return null;f.color=f.color.hex;e[2]&&(f.offset=e[2]+"%");b[F](f)}c=1;for(d=b[o]-1;c<d;c++)if(!b[c].offset){a=y(b[c-1].offset||0);e=0;for(f=c+1;f<d;f++)if(b[f].offset){e=b[f].offset;break}if(!e){e=100;f=d}e=y(e);for(e=(e-a)/(f-c+1);c<f;c++){a+=e;b[c].offset=a+"%"}}return b});function Xa(a,b,c,d){if(l.is(a,
ga)||l.is(a,"object")){a=l.is(a,ga)?C.getElementById(a):a;if(a.tagName)return b==null?{container:a,width:a.style.pixelWidth||a.offsetWidth,height:a.style.pixelHeight||a.offsetHeight}:{container:a,width:b,height:c}}else return{container:1,x:a,y:b,width:c,height:d}}function Ia(a,b){var c=this;for(var d in b)if(b[z](d)&&!(d in a))switch(typeof b[d]){case "function":(function(f){a[d]=a===c?f:function(){return f[K](c,arguments)}})(b[d]);break;case "object":a[d]=a[d]||{};Ia.call(this,a[d],b[d]);break;default:a[d]=
b[d];break}}function ma(a,b){a==b.top&&(b.top=a.prev);a==b.bottom&&(b.bottom=a.next);a.next&&(a.next.prev=a.prev);a.prev&&(a.prev.next=a.next)}function Ya(a,b){if(b.top!==a){ma(a,b);a.next=null;a.prev=b.top;b.top.next=a;b.top=a}}function Za(a,b){if(b.bottom!==a){ma(a,b);a.next=b.bottom;a.prev=null;b.bottom.prev=a;b.bottom=a}}function $a(a,b,c){ma(a,c);b==c.top&&(c.top=a);b.next&&(b.next.prev=a);a.next=b.next;a.prev=b;b.next=a}function ab(a,b,c){ma(a,c);b==c.bottom&&(c.bottom=a);b.prev&&(b.prev.next=
a);a.prev=b.prev;b.prev=a;a.next=b}function bb(a){return function(){throw new Error("Rapha\u00ebl: you are calling to method \u201c"+a+"\u201d of removed object");}}var cb=/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;l.pathToRelative=Ha;if(l.svg){H[p].svgns="http://www.w3.org/2000/svg";H[p].xlink="http://www.w3.org/1999/xlink";Q=function(a){return+a+(~~a===a)*0.5};var u=function(a,b){if(b)for(var c in b)b[z](c)&&a[W](c,D(b[c]));else{a=C.createElementNS(H[p].svgns,a);a.style.webkitTapHighlightColor="rgba(0,0,0,0)";
return a}};l[O]=function(){return"Your browser supports SVG.\nYou are running Rapha\u00ebl "+this.version};var db=function(a,b){var c=u("path");b.canvas&&b.canvas[x](c);b=new s(c,b);b.type="path";ea(b,{fill:"none",stroke:"#000",path:a});return b},pa=function(a,b,c){var d="linear",f=0.5,e=0.5,g=a.style;b=D(b)[I](cb,function(m,n,r){d="radial";if(n&&r){f=y(n);e=y(r);m=(e>0.5)*2-1;E(f-0.5,2)+E(e-0.5,2)>0.25&&(e=v.sqrt(0.25-E(f-0.5,2))*m+0.5)&&e!=0.5&&(e=e.toFixed(5)-1.0E-5*m)}return A});b=b[G](/\s*\-\s*/);
if(d=="linear"){var h=b.shift();h=-y(h);if(isNaN(h))return null;h=[0,0,v.cos(h*v.PI/180),v.sin(h*v.PI/180)];var i=1/(Y(v.abs(h[2]),v.abs(h[3]))||1);h[2]*=i;h[3]*=i;if(h[2]<0){h[0]=-h[2];h[2]=0}if(h[3]<0){h[1]=-h[3];h[3]=0}}b=Wa(b);if(!b)return null;i=a.getAttribute(ca);(i=i.match(/^url\(#(.*)\)$/))&&c.defs.removeChild(C.getElementById(i[1]));i=u(d+"Gradient");i.id="r"+(l._id++)[O](36);u(i,d=="radial"?{fx:f,fy:e}:{x1:h[0],y1:h[1],x2:h[2],y2:h[3]});c.defs[x](i);c=0;for(h=b[o];c<h;c++){var j=u("stop");
u(j,{offset:b[c].offset?b[c].offset:!c?"0%":"100%","stop-color":b[c].color||"#fff"});i[x](j)}u(a,{fill:"url(#"+i.id+")",opacity:1,"fill-opacity":1});g.fill=A;g.opacity=1;return g.fillOpacity=1},Ja=function(a){var b=a.getBBox();u(a.pattern,{patternTransform:l.format("translate({0},{1})",b.x,b.y)})},ea=function(a,b){var c={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},d=a.node,f=a.attrs,e=
a.rotate();function g(k,t){if(t=c[fa.call(t)]){var L=k.attrs["stroke-width"]||"1";k={round:L,square:L,butt:0}[k.attrs["stroke-linecap"]||b["stroke-linecap"]]||0;for(var B=[],w=t[o];w--;)B[w]=t[w]*L+(w%2?1:-1)*k;u(d,{"stroke-dasharray":B[R](",")})}}b[z]("rotation")&&(e=b.rotation);var h=D(e)[G](V);if(h.length-1){h[1]=+h[1];h[2]=+h[2]}else h=null;y(e)&&a.rotate(0,true);for(var i in b)if(b[z](i))if(ta[z](i)){var j=b[i];f[i]=j;switch(i){case "blur":a.blur(j);break;case "rotation":a.rotate(j,true);break;
case "href":case "title":case "target":var m=d.parentNode;if(fa.call(m.tagName)!="a"){var n=u("a");m.insertBefore(n,d);n[x](d);m=n}m.setAttributeNS(a.paper.xlink,i,j);break;case "cursor":d.style.cursor=j;break;case "clip-rect":m=D(j)[G](V);if(m[o]==4){a.clip&&a.clip.parentNode.parentNode.removeChild(a.clip.parentNode);var r=u("clipPath");n=u("rect");r.id="r"+(l._id++)[O](36);u(n,{x:m[0],y:m[1],width:m[2],height:m[3]});r[x](n);a.paper.defs[x](r);u(d,{"clip-path":"url(#"+r.id+")"});a.clip=n}if(!j){(j=
C.getElementById(d.getAttribute("clip-path")[I](/(^url\(#|\)$)/g,A)))&&j.parentNode.removeChild(j);u(d,{"clip-path":A});delete a.clip}break;case "path":if(a.type=="path")u(d,{d:j?(f.path=oa(j)):"M0,0"});break;case "width":d[W](i,j);if(f.fx){i="x";j=f.x}else break;case "x":if(f.fx)j=-f.x-(f.width||0);case "rx":if(i=="rx"&&a.type=="rect")break;case "cx":h&&(i=="x"||i=="cx")&&(h[1]+=j-f[i]);d[W](i,j);a.pattern&&Ja(a);break;case "height":d[W](i,j);if(f.fy){i="y";j=f.y}else break;case "y":if(f.fy)j=-f.y-
(f.height||0);case "ry":if(i=="ry"&&a.type=="rect")break;case "cy":h&&(i=="y"||i=="cy")&&(h[2]+=j-f[i]);d[W](i,j);a.pattern&&Ja(a);break;case "r":a.type=="rect"?u(d,{rx:j,ry:j}):d[W](i,j);break;case "src":a.type=="image"&&d.setAttributeNS(a.paper.xlink,"href",j);break;case "stroke-width":d.style.strokeWidth=j;d[W](i,j);f["stroke-dasharray"]&&g(a,f["stroke-dasharray"]);break;case "stroke-dasharray":g(a,j);break;case "translation":j=D(j)[G](V);j[0]=+j[0]||0;j[1]=+j[1]||0;if(h){h[1]+=j[0];h[2]+=j[1]}Aa.call(a,
j[0],j[1]);break;case "scale":j=D(j)[G](V);a.scale(+j[0]||1,+j[1]||+j[0]||1,isNaN(y(j[2]))?null:+j[2],isNaN(y(j[3]))?null:+j[3]);break;case ca:if(m=D(j).match(Sa)){r=u("pattern");var q=u("image");r.id="r"+(l._id++)[O](36);u(r,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1});u(q,{x:0,y:0});q.setAttributeNS(a.paper.xlink,"href",m[1]);r[x](q);j=C.createElement("img");j.style.cssText="position:absolute;left:-9999em;top-9999em";j.onload=function(){u(r,{width:this.offsetWidth,height:this.offsetHeight});
u(q,{width:this.offsetWidth,height:this.offsetHeight});C.body.removeChild(this);a.paper.safari()};C.body[x](j);j.src=m[1];a.paper.defs[x](r);d.style.fill="url(#"+r.id+")";u(d,{fill:"url(#"+r.id+")"});a.pattern=r;a.pattern&&Ja(a);break}m=l.getRGB(j);if(m.error){if(({circle:1,ellipse:1}[z](a.type)||D(j).charAt()!="r")&&pa(d,j,a.paper)){f.gradient=j;f.fill="none";break}}else{delete b.gradient;delete f.gradient;!l.is(f.opacity,"undefined")&&l.is(b.opacity,"undefined")&&u(d,{opacity:f.opacity});!l.is(f["fill-opacity"],
"undefined")&&l.is(b["fill-opacity"],"undefined")&&u(d,{"fill-opacity":f["fill-opacity"]})}m[z]("o")&&u(d,{"fill-opacity":m.o>1?m.o/100:m.o});case "stroke":m=l.getRGB(j);d[W](i,m.hex);i=="stroke"&&m[z]("o")&&u(d,{"stroke-opacity":m.o>1?m.o/100:m.o});break;case "gradient":(({circle:1,ellipse:1})[z](a.type)||D(j).charAt()!="r")&&pa(d,j,a.paper);break;case "opacity":case "fill-opacity":if(f.gradient){if(m=C.getElementById(d.getAttribute(ca)[I](/^url\(#|\)$/g,A))){m=m.getElementsByTagName("stop");m[m[o]-
1][W]("stop-opacity",j)}break}default:i=="font-size"&&(j=ha(j,10)+"px");m=i[I](/(\-.)/g,function(k){return sa.call(k.substring(1))});d.style[m]=j;d[W](i,j);break}}Db(a,b);if(h)a.rotate(h.join(N));else y(e)&&a.rotate(e,true)},eb=1.2,Db=function(a,b){if(!(a.type!="text"||!(b[z]("text")||b[z]("font")||b[z]("font-size")||b[z]("x")||b[z]("y")))){var c=a.attrs,d=a.node,f=d.firstChild?ha(C.defaultView.getComputedStyle(d.firstChild,A).getPropertyValue("font-size"),10):10;if(b[z]("text")){for(c.text=b.text;d.firstChild;)d.removeChild(d.firstChild);
b=D(b.text)[G]("\n");for(var e=0,g=b[o];e<g;e++)if(b[e]){var h=u("tspan");e&&u(h,{dy:f*eb,x:c.x});h[x](C.createTextNode(b[e]));d[x](h)}}else{b=d.getElementsByTagName("tspan");e=0;for(g=b[o];e<g;e++)e&&u(b[e],{dy:f*eb,x:c.x})}u(d,{y:c.y});a=a.getBBox();(a=c.y-(a.y+a.height/2))&&isFinite(a)&&u(d,{y:c.y+a})}},s=function(a,b){this[0]=a;this.id=l._oid++;this.node=a;a.raphael=this;this.paper=b;this.attrs=this.attrs||{};this.transformations=[];this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1};!b.bottom&&
(b.bottom=this);(this.prev=b.top)&&(b.top.next=this);b.top=this;this.next=null};s[p].rotate=function(a,b,c){if(this.removed)return this;if(a==null){if(this._.rt.cx)return[this._.rt.deg,this._.rt.cx,this._.rt.cy][R](N);return this._.rt.deg}var d=this.getBBox();a=D(a)[G](V);if(a[o]-1){b=y(a[1]);c=y(a[2])}a=y(a[0]);if(b!=null)this._.rt.deg=a;else this._.rt.deg+=a;c==null&&(b=null);this._.rt.cx=b;this._.rt.cy=c;b=b==null?d.x+d.width/2:b;c=c==null?d.y+d.height/2:c;if(this._.rt.deg){this.transformations[0]=
l.format("rotate({0} {1} {2})",this._.rt.deg,b,c);this.clip&&u(this.clip,{transform:l.format("rotate({0} {1} {2})",-this._.rt.deg,b,c)})}else{this.transformations[0]=A;this.clip&&u(this.clip,{transform:A})}u(this.node,{transform:this.transformations[R](N)});return this};s[p].hide=function(){!this.removed&&(this.node.style.display="none");return this};s[p].show=function(){!this.removed&&(this.node.style.display="");return this};s[p].remove=function(){if(!this.removed){ma(this,this.paper);this.node.parentNode.removeChild(this.node);
for(var a in this)delete this[a];this.removed=true}};s[p].getBBox=function(){if(this.removed)return this;if(this.type=="path")return xa(this.attrs.path);if(this.node.style.display=="none"){this.show();var a=true}var b={};try{b=this.node.getBBox()}catch(c){}finally{b=b||{}}if(this.type=="text"){b={x:b.x,y:Infinity,width:0,height:0};for(var d=0,f=this.node.getNumberOfChars();d<f;d++){var e=this.node.getExtentOfChar(d);e.y<b.y&&(b.y=e.y);e.y+e.height-b.y>b.height&&(b.height=e.y+e.height-b.y);e.x+e.width-
b.x>b.width&&(b.width=e.x+e.width-b.x)}}a&&this.hide();return b};s[p].attr=function(a,b){if(this.removed)return this;if(a==null){a={};for(var c in this.attrs)if(this.attrs[z](c))a[c]=this.attrs[c];this._.rt.deg&&(a.rotation=this.rotate());(this._.sx!=1||this._.sy!=1)&&(a.scale=this.scale());a.gradient&&a.fill=="none"&&(a.fill=a.gradient)&&delete a.gradient;return a}if(b==null&&l.is(a,ga)){if(a=="translation")return Aa.call(this);if(a=="rotation")return this.rotate();if(a=="scale")return this.scale();
if(a==ca&&this.attrs.fill=="none"&&this.attrs.gradient)return this.attrs.gradient;return this.attrs[a]}if(b==null&&l.is(a,U)){b={};c=0;for(var d=a.length;c<d;c++)b[a[c]]=this.attr(a[c]);return b}if(b!=null){c={};c[a]=b;ea(this,c)}else a!=null&&l.is(a,"object")&&ea(this,a);return this};s[p].toFront=function(){if(this.removed)return this;this.node.parentNode[x](this.node);var a=this.paper;a.top!=this&&Ya(this,a);return this};s[p].toBack=function(){if(this.removed)return this;if(this.node.parentNode.firstChild!=
this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild);Za(this,this.paper)}return this};s[p].insertAfter=function(a){if(this.removed)return this;var b=a.node||a[a.length].node;b.nextSibling?b.parentNode.insertBefore(this.node,b.nextSibling):b.parentNode[x](this.node);$a(this,a,this.paper);return this};s[p].insertBefore=function(a){if(this.removed)return this;var b=a.node||a[0].node;b.parentNode.insertBefore(this.node,b);ab(this,a,this.paper);return this};s[p].blur=
function(a){var b=this;if(+a!==0){var c=u("filter"),d=u("feGaussianBlur");b.attrs.blur=a;c.id="r"+(l._id++)[O](36);u(d,{stdDeviation:+a||1.5});c.appendChild(d);b.paper.defs.appendChild(c);b._blur=c;u(b.node,{filter:"url(#"+c.id+")"})}else{if(b._blur){b._blur.parentNode.removeChild(b._blur);delete b._blur;delete b.attrs.blur}b.node.removeAttribute("filter")}};var fb=function(a,b,c,d){var f=u("circle");a.canvas&&a.canvas[x](f);a=new s(f,a);a.attrs={cx:b,cy:c,r:d,fill:"none",stroke:"#000"};a.type="circle";
u(f,a.attrs);return a},gb=function(a,b,c,d,f,e){var g=u("rect");a.canvas&&a.canvas[x](g);a=new s(g,a);a.attrs={x:b,y:c,width:d,height:f,r:e||0,rx:e||0,ry:e||0,fill:"none",stroke:"#000"};a.type="rect";u(g,a.attrs);return a},hb=function(a,b,c,d,f){var e=u("ellipse");a.canvas&&a.canvas[x](e);a=new s(e,a);a.attrs={cx:b,cy:c,rx:d,ry:f,fill:"none",stroke:"#000"};a.type="ellipse";u(e,a.attrs);return a},ib=function(a,b,c,d,f,e){var g=u("image");u(g,{x:c,y:d,width:f,height:e,preserveAspectRatio:"none"});g.setAttributeNS(a.xlink,
"href",b);a.canvas&&a.canvas[x](g);a=new s(g,a);a.attrs={x:c,y:d,width:f,height:e,src:b};a.type="image";return a},jb=function(a,b,c,d){var f=u("text");u(f,{x:b,y:c,"text-anchor":"middle"});a.canvas&&a.canvas[x](f);a=new s(f,a);a.attrs={x:b,y:c,"text-anchor":"middle",text:d,font:ta.font,stroke:"none",fill:"#000"};a.type="text";ea(a,a.attrs);return a},kb=function(a,b){this.width=a||this.width;this.height=b||this.height;this.canvas[W]("width",this.width);this.canvas[W]("height",this.height);return this},
Ca=function(){var a=Xa[K](0,arguments),b=a&&a.container,c=a.x,d=a.y,f=a.width;a=a.height;if(!b)throw new Error("SVG container not found.");var e=u("svg");c=c||0;d=d||0;f=f||512;a=a||342;u(e,{xmlns:"http://www.w3.org/2000/svg",version:1.1,width:f,height:a});if(b==1){e.style.cssText="position:absolute;left:"+c+"px;top:"+d+"px";C.body[x](e)}else b.firstChild?b.insertBefore(e,b.firstChild):b[x](e);b=new H;b.width=f;b.height=a;b.canvas=e;Ia.call(b,b,l.fn);b.clear();return b};H[p].clear=function(){for(var a=
this.canvas;a.firstChild;)a.removeChild(a.firstChild);this.bottom=this.top=null;(this.desc=u("desc"))[x](C.createTextNode("Created with Rapha\u00ebl"));a[x](this.desc);a[x](this.defs=u("defs"))};H[p].remove=function(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var a in this)this[a]=bb(a)}}if(l.vml){var lb={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},Eb=/([clmz]),?([^clmz]*)/gi,Fb=/-?[^,\s-]+/g,qa=1000+N+1000,na=10,ra={path:1,rect:1},Gb=function(a){var b=/[ahqstv]/ig,
c=oa;D(a).match(b)&&(c=wa);b=/[clmz]/g;if(c==oa&&!D(a).match(b))return a=D(a)[I](Eb,function(i,j,m){var n=[],r=fa.call(j)=="m",q=lb[j];m[I](Fb,function(k){if(r&&n[o]==2){q+=n+lb[j=="m"?"l":"L"];n=[]}n[F](Q(k*na))});return q+n});b=c(a);var d;a=[];for(var f=0,e=b[o];f<e;f++){c=b[f];d=fa.call(b[f][0]);d=="z"&&(d="x");for(var g=1,h=c[o];g<h;g++)d+=Q(c[g]*na)+(g!=h-1?",":A);a[F](d)}return a[R](N)};l[O]=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\u00ebl "+
this.version};db=function(a,b){var c=S("group");c.style.cssText="position:absolute;left:0;top:0;width:"+b.width+"px;height:"+b.height+"px";c.coordsize=b.coordsize;c.coordorigin=b.coordorigin;var d=S("shape"),f=d.style;f.width=b.width+"px";f.height=b.height+"px";d.coordsize=qa;d.coordorigin=b.coordorigin;c[x](d);d=new s(d,c,b);f={fill:"none",stroke:"#000"};a&&(f.path=a);d.isAbsolute=true;d.type="path";d.path=[];d.Path=A;ea(d,f);b.canvas[x](c);return d};ea=function(a,b){a.attrs=a.attrs||{};var c=a.node,
d=a.attrs,f=c.style,e;e=(b.x!=d.x||b.y!=d.y||b.width!=d.width||b.height!=d.height||b.r!=d.r)&&a.type=="rect";var g=a;for(var h in b)if(b[z](h))d[h]=b[h];if(e){d.path=mb(d.x,d.y,d.width,d.height,d.r);a.X=d.x;a.Y=d.y;a.W=d.width;a.H=d.height}b.href&&(c.href=b.href);b.title&&(c.title=b.title);b.target&&(c.target=b.target);b.cursor&&(f.cursor=b.cursor);"blur"in b&&a.blur(b.blur);if(b.path&&a.type=="path"||e)c.path=Gb(d.path);b.rotation!=null&&a.rotate(b.rotation,true);if(b.translation){e=D(b.translation)[G](V);
Aa.call(a,e[0],e[1]);if(a._.rt.cx!=null){a._.rt.cx+=+e[0];a._.rt.cy+=+e[1];a.setBox(a.attrs,e[0],e[1])}}if(b.scale){e=D(b.scale)[G](V);a.scale(+e[0]||1,+e[1]||+e[0]||1,+e[2]||null,+e[3]||null)}if("clip-rect"in b){e=D(b["clip-rect"])[G](V);if(e[o]==4){e[2]=+e[2]+ +e[0];e[3]=+e[3]+ +e[1];h=c.clipRect||C.createElement("div");var i=h.style,j=c.parentNode;i.clip=l.format("rect({1}px {2}px {3}px {0}px)",e);if(!c.clipRect){i.position="absolute";i.top=0;i.left=0;i.width=a.paper.width+"px";i.height=a.paper.height+
"px";j.parentNode.insertBefore(h,j);h[x](j);c.clipRect=h}}if(!b["clip-rect"])c.clipRect&&(c.clipRect.style.clip=A)}if(a.type=="image"&&b.src)c.src=b.src;if(a.type=="image"&&b.opacity){c.filterOpacity=Fa+".Alpha(opacity="+b.opacity*100+")";f.filter=(c.filterMatrix||A)+(c.filterOpacity||A)}b.font&&(f.font=b.font);b["font-family"]&&(f.fontFamily='"'+b["font-family"][G](",")[0][I](/^['"]+|['"]+$/g,A)+'"');b["font-size"]&&(f.fontSize=b["font-size"]);b["font-weight"]&&(f.fontWeight=b["font-weight"]);b["font-style"]&&
(f.fontStyle=b["font-style"]);if(b.opacity!=null||b["stroke-width"]!=null||b.fill!=null||b.stroke!=null||b["stroke-width"]!=null||b["stroke-opacity"]!=null||b["fill-opacity"]!=null||b["stroke-dasharray"]!=null||b["stroke-miterlimit"]!=null||b["stroke-linejoin"]!=null||b["stroke-linecap"]!=null){c=a.shape||c;f=c.getElementsByTagName(ca)&&c.getElementsByTagName(ca)[0];e=false;!f&&(e=f=S(ca));if("fill-opacity"in b||"opacity"in b){a=((+d["fill-opacity"]+1||2)-1)*((+d.opacity+1||2)-1)*((+l.getRGB(b.fill).o+
1||2)-1);a<0&&(a=0);a>1&&(a=1);f.opacity=a}b.fill&&(f.on=true);if(f.on==null||b.fill=="none")f.on=false;if(f.on&&b.fill)if(a=b.fill.match(Sa)){f.src=a[1];f.type="tile"}else{f.color=l.getRGB(b.fill).hex;f.src=A;f.type="solid";if(l.getRGB(b.fill).error&&(g.type in{circle:1,ellipse:1}||D(b.fill).charAt()!="r")&&pa(g,b.fill)){d.fill="none";d.gradient=b.fill}}e&&c[x](f);f=c.getElementsByTagName("stroke")&&c.getElementsByTagName("stroke")[0];e=false;!f&&(e=f=S("stroke"));if(b.stroke&&b.stroke!="none"||
b["stroke-width"]||b["stroke-opacity"]!=null||b["stroke-dasharray"]||b["stroke-miterlimit"]||b["stroke-linejoin"]||b["stroke-linecap"])f.on=true;(b.stroke=="none"||f.on==null||b.stroke==0||b["stroke-width"]==0)&&(f.on=false);a=l.getRGB(b.stroke);f.on&&b.stroke&&(f.color=a.hex);a=((+d["stroke-opacity"]+1||2)-1)*((+d.opacity+1||2)-1)*((+a.o+1||2)-1);h=(y(b["stroke-width"])||1)*0.75;a<0&&(a=0);a>1&&(a=1);b["stroke-width"]==null&&(h=d["stroke-width"]);b["stroke-width"]&&(f.weight=h);h&&h<1&&(a*=h)&&(f.weight=
1);f.opacity=a;b["stroke-linejoin"]&&(f.joinstyle=b["stroke-linejoin"]||"miter");f.miterlimit=b["stroke-miterlimit"]||8;b["stroke-linecap"]&&(f.endcap=b["stroke-linecap"]=="butt"?"flat":b["stroke-linecap"]=="square"?"square":"round");if(b["stroke-dasharray"]){a={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};f.dashstyle=a[z](b["stroke-dasharray"])?a[b["stroke-dasharray"]]:
A}e&&c[x](f)}if(g.type=="text"){f=g.paper.span.style;d.font&&(f.font=d.font);d["font-family"]&&(f.fontFamily=d["font-family"]);d["font-size"]&&(f.fontSize=d["font-size"]);d["font-weight"]&&(f.fontWeight=d["font-weight"]);d["font-style"]&&(f.fontStyle=d["font-style"]);g.node.string&&(g.paper.span.innerHTML=D(g.node.string)[I](/</g,"&#60;")[I](/&/g,"&#38;")[I](/\n/g,"<br>"));g.W=d.w=g.paper.span.offsetWidth;g.H=d.h=g.paper.span.offsetHeight;g.X=d.x;g.Y=d.y+Q(g.H/2);switch(d["text-anchor"]){case "start":g.node.style["v-text-align"]=
"left";g.bbx=Q(g.W/2);break;case "end":g.node.style["v-text-align"]="right";g.bbx=-Q(g.W/2);break;default:g.node.style["v-text-align"]="center";break}}};pa=function(a,b){a.attrs=a.attrs||{};var c="linear",d=".5 .5";a.attrs.gradient=b;b=D(b)[I](cb,function(i,j,m){c="radial";if(j&&m){j=y(j);m=y(m);E(j-0.5,2)+E(m-0.5,2)>0.25&&(m=v.sqrt(0.25-E(j-0.5,2))*((m>0.5)*2-1)+0.5);d=j+N+m}return A});b=b[G](/\s*\-\s*/);if(c=="linear"){var f=b.shift();f=-y(f);if(isNaN(f))return null}var e=Wa(b);if(!e)return null;
a=a.shape||a.node;b=a.getElementsByTagName(ca)[0]||S(ca);!b.parentNode&&a.appendChild(b);if(e[o]){b.on=true;b.method="none";b.color=e[0].color;b.color2=e[e[o]-1].color;a=[];for(var g=0,h=e[o];g<h;g++)e[g].offset&&a[F](e[g].offset+N+e[g].color);b.colors&&(b.colors.value=a[o]?a[R]():"0% "+b.color);if(c=="radial"){b.type="gradientradial";b.focus="100%";b.focussize=d;b.focusposition=d}else{b.type="gradient";b.angle=(270-f)%360}}return 1};s=function(a,b,c){this[0]=a;this.id=l._oid++;this.node=a;a.raphael=
this;this.Y=this.X=0;this.attrs={};this.Group=b;this.paper=c;this._={tx:0,ty:0,rt:{deg:0},sx:1,sy:1};!c.bottom&&(c.bottom=this);(this.prev=c.top)&&(c.top.next=this);c.top=this;this.next=null};s[p].rotate=function(a,b,c){if(this.removed)return this;if(a==null){if(this._.rt.cx)return[this._.rt.deg,this._.rt.cx,this._.rt.cy][R](N);return this._.rt.deg}a=D(a)[G](V);if(a[o]-1){b=y(a[1]);c=y(a[2])}a=y(a[0]);if(b!=null)this._.rt.deg=a;else this._.rt.deg+=a;c==null&&(b=null);this._.rt.cx=b;this._.rt.cy=c;
this.setBox(this.attrs,b,c);this.Group.style.rotation=this._.rt.deg;return this};s[p].setBox=function(a,b,c){if(this.removed)return this;var d=this.Group.style,f=this.shape&&this.shape.style||this.node.style;a=a||{};for(var e in a)if(a[z](e))this.attrs[e]=a[e];b=b||this._.rt.cx;c=c||this._.rt.cy;var g=this.attrs,h;switch(this.type){case "circle":a=g.cx-g.r;e=g.cy-g.r;h=g=g.r*2;break;case "ellipse":a=g.cx-g.rx;e=g.cy-g.ry;h=g.rx*2;g=g.ry*2;break;case "image":a=+g.x;e=+g.y;h=g.width||0;g=g.height||
0;break;case "text":this.textpath.v=["m",Q(g.x),", ",Q(g.y-2),"l",Q(g.x)+1,", ",Q(g.y-2)][R](A);a=g.x-Q(this.W/2);e=g.y-this.H/2;h=this.W;g=this.H;break;case "rect":case "path":if(this.attrs.path){g=xa(this.attrs.path);a=g.x;e=g.y;h=g.width;g=g.height}else{e=a=0;h=this.paper.width;g=this.paper.height}break;default:e=a=0;h=this.paper.width;g=this.paper.height;break}b=b==null?a+h/2:b;c=c==null?e+g/2:c;b=b-this.paper.width/2;c=c-this.paper.height/2;var i;d.left!=(i=b+"px")&&(d.left=i);d.top!=(i=c+"px")&&
(d.top=i);this.X=ra[z](this.type)?-b:a;this.Y=ra[z](this.type)?-c:e;this.W=h;this.H=g;if(ra[z](this.type)){f.left!=(i=-b*na+"px")&&(f.left=i);f.top!=(i=-c*na+"px")&&(f.top=i)}else if(this.type=="text"){f.left!=(i=-b+"px")&&(f.left=i);f.top!=(i=-c+"px")&&(f.top=i)}else{d.width!=(i=this.paper.width+"px")&&(d.width=i);d.height!=(i=this.paper.height+"px")&&(d.height=i);f.left!=(i=a-b+"px")&&(f.left=i);f.top!=(i=e-c+"px")&&(f.top=i);f.width!=(i=h+"px")&&(f.width=i);f.height!=(i=g+"px")&&(f.height=i)}};
s[p].hide=function(){!this.removed&&(this.Group.style.display="none");return this};s[p].show=function(){!this.removed&&(this.Group.style.display="block");return this};s[p].getBBox=function(){if(this.removed)return this;if(ra[z](this.type))return xa(this.attrs.path);return{x:this.X+(this.bbx||0),y:this.Y,width:this.W,height:this.H}};s[p].remove=function(){if(!this.removed){ma(this,this.paper);this.node.parentNode.removeChild(this.node);this.Group.parentNode.removeChild(this.Group);this.shape&&this.shape.parentNode.removeChild(this.shape);
for(var a in this)delete this[a];this.removed=true}};s[p].attr=function(a,b){if(this.removed)return this;if(a==null){a={};for(var c in this.attrs)if(this.attrs[z](c))a[c]=this.attrs[c];this._.rt.deg&&(a.rotation=this.rotate());(this._.sx!=1||this._.sy!=1)&&(a.scale=this.scale());a.gradient&&a.fill=="none"&&(a.fill=a.gradient)&&delete a.gradient;return a}if(b==null&&l.is(a,ga)){if(a=="translation")return Aa.call(this);if(a=="rotation")return this.rotate();if(a=="scale")return this.scale();if(a==ca&&
this.attrs.fill=="none"&&this.attrs.gradient)return this.attrs.gradient;return this.attrs[a]}if(this.attrs&&b==null&&l.is(a,U)){var d={};c=0;for(b=a[o];c<b;c++)d[a[c]]=this.attr(a[c]);return d}if(b!=null){d={};d[a]=b}b==null&&l.is(a,"object")&&(d=a);if(d){if(d.text&&this.type=="text")this.node.string=d.text;ea(this,d);if(d.gradient&&({circle:1,ellipse:1}[z](this.type)||D(d.gradient).charAt()!="r"))pa(this,d.gradient);(!ra[z](this.type)||this._.rt.deg)&&this.setBox(this.attrs)}return this};s[p].toFront=
function(){!this.removed&&this.Group.parentNode[x](this.Group);this.paper.top!=this&&Ya(this,this.paper);return this};s[p].toBack=function(){if(this.removed)return this;if(this.Group.parentNode.firstChild!=this.Group){this.Group.parentNode.insertBefore(this.Group,this.Group.parentNode.firstChild);Za(this,this.paper)}return this};s[p].insertAfter=function(a){if(this.removed)return this;if(a.constructor==X)a=a[a.length];a.Group.nextSibling?a.Group.parentNode.insertBefore(this.Group,a.Group.nextSibling):
a.Group.parentNode[x](this.Group);$a(this,a,this.paper);return this};s[p].insertBefore=function(a){if(this.removed)return this;if(a.constructor==X)a=a[0];a.Group.parentNode.insertBefore(this.Group,a.Group);ab(this,a,this.paper);return this};var Hb=/ progid:\S+Blur\([^\)]+\)/g;s[p].blur=function(a){var b=this.node.runtimeStyle,c=b.filter;c=c.replace(Hb,A);if(+a!==0){this.attrs.blur=a;b.filter=c+N+Fa+".Blur(pixelradius="+(+a||1.5)+")";b.margin=l.format("-{0}px 0 0 -{0}px",Q(+a||1.5))}else{b.filter=
c;b.margin=0;delete this.attrs.blur}};fb=function(a,b,c,d){var f=S("group"),e=S("oval");f.style.cssText="position:absolute;left:0;top:0;width:"+a.width+"px;height:"+a.height+"px";f.coordsize=qa;f.coordorigin=a.coordorigin;f[x](e);e=new s(e,f,a);e.type="circle";ea(e,{stroke:"#000",fill:"none"});e.attrs.cx=b;e.attrs.cy=c;e.attrs.r=d;e.setBox({x:b-d,y:c-d,width:d*2,height:d*2});a.canvas[x](f);return e};function mb(a,b,c,d,f){return f?l.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z",
a+f,b,c-f*2,f,-f,d-f*2,f*2-c,f*2-d):l.format("M{0},{1}l{2},0,0,{3},{4},0z",a,b,c,d,-c)}gb=function(a,b,c,d,f,e){var g=mb(b,c,d,f,e);a=a.path(g);var h=a.attrs;a.X=h.x=b;a.Y=h.y=c;a.W=h.width=d;a.H=h.height=f;h.r=e;h.path=g;a.type="rect";return a};hb=function(a,b,c,d,f){var e=S("group"),g=S("oval");e.style.cssText="position:absolute;left:0;top:0;width:"+a.width+"px;height:"+a.height+"px";e.coordsize=qa;e.coordorigin=a.coordorigin;e[x](g);g=new s(g,e,a);g.type="ellipse";ea(g,{stroke:"#000"});g.attrs.cx=
b;g.attrs.cy=c;g.attrs.rx=d;g.attrs.ry=f;g.setBox({x:b-d,y:c-f,width:d*2,height:f*2});a.canvas[x](e);return g};ib=function(a,b,c,d,f,e){var g=S("group"),h=S("image");g.style.cssText="position:absolute;left:0;top:0;width:"+a.width+"px;height:"+a.height+"px";g.coordsize=qa;g.coordorigin=a.coordorigin;h.src=b;g[x](h);h=new s(h,g,a);h.type="image";h.attrs.src=b;h.attrs.x=c;h.attrs.y=d;h.attrs.w=f;h.attrs.h=e;h.setBox({x:c,y:d,width:f,height:e});a.canvas[x](g);return h};jb=function(a,b,c,d){var f=S("group"),
e=S("shape"),g=e.style,h=S("path"),i=S("textpath");f.style.cssText="position:absolute;left:0;top:0;width:"+a.width+"px;height:"+a.height+"px";f.coordsize=qa;f.coordorigin=a.coordorigin;h.v=l.format("m{0},{1}l{2},{1}",Q(b*10),Q(c*10),Q(b*10)+1);h.textpathok=true;g.width=a.width;g.height=a.height;i.string=D(d);i.on=true;e[x](i);e[x](h);f[x](e);g=new s(i,f,a);g.shape=e;g.textpath=h;g.type="text";g.attrs.text=d;g.attrs.x=b;g.attrs.y=c;g.attrs.w=1;g.attrs.h=1;ea(g,{font:ta.font,stroke:"none",fill:"#000"});
g.setBox();a.canvas[x](f);return g};kb=function(a,b){var c=this.canvas.style;a==+a&&(a+="px");b==+b&&(b+="px");c.width=a;c.height=b;c.clip="rect(0 "+a+" "+b+" 0)";return this};var S;C.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!C.namespaces.rvml&&C.namespaces.add("rvml","urn:schemas-microsoft-com:vml");S=function(a){return C.createElement("<rvml:"+a+' class="rvml">')}}catch(Pb){S=function(a){return C.createElement("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}Ca=
function(){var a=Xa[K](0,arguments),b=a.container,c=a.height,d=a.width,f=a.x;a=a.y;if(!b)throw new Error("VML container not found.");var e=new H,g=e.canvas=C.createElement("div"),h=g.style;f=f||0;a=a||0;d=d||512;c=c||342;d==+d&&(d+="px");c==+c&&(c+="px");e.width=1000;e.height=1000;e.coordsize=na*1000+N+na*1000;e.coordorigin="0 0";e.span=C.createElement("span");e.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";g[x](e.span);h.cssText=
l.format("width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",d,c);if(b==1){C.body[x](g);h.left=f+"px";h.top=a+"px";h.position="absolute"}else b.firstChild?b.insertBefore(g,b.firstChild):b[x](g);Ia.call(e,e,l.fn);return e};H[p].clear=function(){this.canvas.innerHTML=A;this.span=C.createElement("span");this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";this.canvas[x](this.span);this.bottom=
this.top=null};H[p].remove=function(){this.canvas.parentNode.removeChild(this.canvas);for(var a in this)this[a]=bb(a);return true}}H[p].safari=navigator.vendor=="Apple Computer, Inc."&&(navigator.userAgent.match(/Version\/(.*?)\s/)[1]<4||aa.navigator.platform.slice(0,2)=="iP")?function(){var a=this.rect(-99,-99,this.width+99,this.height+99).attr({stroke:"none"});aa.setTimeout(function(){a.remove()})}:function(){};function Ib(){this.returnValue=false}function Jb(){return this.originalEvent.preventDefault()}
function Kb(){this.cancelBubble=true}function Lb(){return this.originalEvent.stopPropagation()}var Mb=function(){if(C.addEventListener)return function(a,b,c,d){var f=Da&&Ea[b]?Ea[b]:b;function e(g){if(Da&&Ea[z](b))for(var h=0,i=g.targetTouches&&g.targetTouches.length;h<i;h++)if(g.targetTouches[h].target==a){i=g;g=g.targetTouches[h];g.originalEvent=i;g.preventDefault=Jb;g.stopPropagation=Lb;break}return c.call(d,g)}a.addEventListener(f,e,false);return function(){a.removeEventListener(f,e,false);return true}};
else if(C.attachEvent)return function(a,b,c,d){function f(g){g=g||aa.event;g.preventDefault=g.preventDefault||Ib;g.stopPropagation=g.stopPropagation||Kb;return c.call(d,g)}a.attachEvent("on"+b,f);function e(){a.detachEvent("on"+b,f);return true}return e}}(),$=[];function Ka(a){for(var b=a.clientX,c=a.clientY,d,f=$.length;f--;){d=$[f];if(Da)for(var e=a.touches.length,g;e--;){g=a.touches[e];if(g.identifier==d.el._drag.id){b=g.clientX;c=g.clientY;(a.originalEvent?a.originalEvent:a).preventDefault();
break}}else a.preventDefault();d.move&&d.move.call(d.el,b-d.el._drag.x,c-d.el._drag.y,b,c)}}function La(){l.unmousemove(Ka).unmouseup(La);for(var a=$.length,b;a--;){b=$[a];b.el._drag={};b.end&&b.end.call(b.el)}$=[]}for(da=Ra[o];da--;)(function(a){l[a]=s[p][a]=function(b){if(l.is(b,"function")){this.events=this.events||[];this.events.push({name:a,f:b,unbind:Mb(this.shape||this.node||C,a,b,this)})}return this};l["un"+a]=s[p]["un"+a]=function(b){for(var c=this.events,d=c[o];d--;)if(c[d].name==a&&c[d].f==
b){c[d].unbind();c.splice(d,1);!c.length&&delete this.events;return this}return this}})(Ra[da]);s[p].hover=function(a,b){return this.mouseover(a).mouseout(b)};s[p].unhover=function(a,b){return this.unmouseover(a).unmouseout(b)};s[p].drag=function(a,b,c){this._drag={};this.mousedown(function(d){(d.originalEvent||d).preventDefault();this._drag.x=d.clientX;this._drag.y=d.clientY;this._drag.id=d.identifier;b&&b.call(this,d.clientX,d.clientY);!$.length&&l.mousemove(Ka).mouseup(La);$.push({el:this,move:a,
end:c})});return this};s[p].undrag=function(a,b,c){for(b=$.length;b--;){$[b].el==this&&$[b].move==a&&$[b].end==c&&$.splice(b,1);!$.length&&l.unmousemove(Ka).unmouseup(La)}};H[p].circle=function(a,b,c){return fb(this,a||0,b||0,c||0)};H[p].rect=function(a,b,c,d,f){return gb(this,a||0,b||0,c||0,d||0,f||0)};H[p].ellipse=function(a,b,c,d){return hb(this,a||0,b||0,c||0,d||0)};H[p].path=function(a){a&&!l.is(a,ga)&&!l.is(a[0],U)&&(a+=A);return db(l.format[K](l,arguments),this)};H[p].image=function(a,b,c,
d,f){return ib(this,a||"about:blank",b||0,c||0,d||0,f||0)};H[p].text=function(a,b,c){return jb(this,a||0,b||0,c||A)};H[p].set=function(a){arguments[o]>1&&(a=Array[p].splice.call(arguments,0,arguments[o]));return new X(a)};H[p].setSize=kb;H[p].top=H[p].bottom=null;H[p].raphael=l;function nb(){return this.x+N+this.y}s[p].resetScale=function(){if(this.removed)return this;this._.sx=1;this._.sy=1;this.attrs.scale="1 1"};s[p].scale=function(a,b,c,d){if(this.removed)return this;if(a==null&&b==null)return{x:this._.sx,
y:this._.sy,toString:nb};b=b||a;!+b&&(b=a);var f,e,g=this.attrs;if(a!=0){var h=this.getBBox(),i=h.x+h.width/2,j=h.y+h.height/2;f=a/this._.sx;e=b/this._.sy;c=+c||c==0?c:i;d=+d||d==0?d:j;h=~~(a/v.abs(a));var m=~~(b/v.abs(b)),n=this.node.style,r=c+(i-c)*f;j=d+(j-d)*e;switch(this.type){case "rect":case "image":var q=g.width*h*f,k=g.height*m*e;this.attr({height:k,r:g.r*ba(h*f,m*e),width:q,x:r-q/2,y:j-k/2});break;case "circle":case "ellipse":this.attr({rx:g.rx*h*f,ry:g.ry*m*e,r:g.r*ba(h*f,m*e),cx:r,cy:j});
break;case "text":this.attr({x:r,y:j});break;case "path":i=Ha(g.path);for(var t=true,L=0,B=i[o];L<B;L++){var w=i[L],J=sa.call(w[0]);if(!(J=="M"&&t)){t=false;if(J=="A"){w[i[L][o]-2]*=f;w[i[L][o]-1]*=e;w[1]*=h*f;w[2]*=m*e;w[5]=+!(h+m?!+w[5]:+w[5])}else if(J=="H"){J=1;for(var ia=w[o];J<ia;J++)w[J]*=f}else if(J=="V"){J=1;for(ia=w[o];J<ia;J++)w[J]*=e}else{J=1;for(ia=w[o];J<ia;J++)w[J]*=J%2?f:e}}}e=xa(i);f=r-e.x-e.width/2;e=j-e.y-e.height/2;i[0][1]+=f;i[0][2]+=e;this.attr({path:i});break}if(this.type in
{text:1,image:1}&&(h!=1||m!=1))if(this.transformations){this.transformations[2]="scale("[M](h,",",m,")");this.node[W]("transform",this.transformations[R](N));f=h==-1?-g.x-(q||0):g.x;e=m==-1?-g.y-(k||0):g.y;this.attr({x:f,y:e});g.fx=h-1;g.fy=m-1}else{this.node.filterMatrix=Fa+".Matrix(M11="[M](h,", M12=0, M21=0, M22=",m,", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");n.filter=(this.node.filterMatrix||A)+(this.node.filterOpacity||A)}else if(this.transformations){this.transformations[2]=
A;this.node[W]("transform",this.transformations[R](N));g.fx=0;g.fy=0}else{this.node.filterMatrix=A;n.filter=(this.node.filterMatrix||A)+(this.node.filterOpacity||A)}g.scale=[a,b,c,d][R](N);this._.sx=a;this._.sy=b}return this};s[p].clone=function(){if(this.removed)return null;var a=this.attr();delete a.scale;delete a.translation;return this.paper[this.type]().attr(a)};var ob=Z(function(a,b,c,d,f,e,g,h,i){for(var j=0,m,n=0;n<1.01;n+=0.01){var r=la(a,b,c,d,f,e,g,h,n);n&&(j+=E(E(m.x-r.x,2)+E(m.y-r.y,
2),0.5));if(j>=i)return r;m=r}});function Ma(a,b){return function(c,d,f){c=wa(c);for(var e,g,h,i,j="",m={},n=0,r=0,q=c.length;r<q;r++){h=c[r];if(h[0]=="M"){e=+h[1];g=+h[2]}else{i=Nb(e,g,h[1],h[2],h[3],h[4],h[5],h[6]);if(n+i>d){if(b&&!m.start){e=ob(e,g,h[1],h[2],h[3],h[4],h[5],h[6],d-n);j+=["C",e.start.x,e.start.y,e.m.x,e.m.y,e.x,e.y];if(f)return j;m.start=j;j=["M",e.x,e.y+"C",e.n.x,e.n.y,e.end.x,e.end.y,h[5],h[6]][R]();n+=i;e=+h[5];g=+h[6];continue}if(!a&&!b){e=ob(e,g,h[1],h[2],h[3],h[4],h[5],h[6],
d-n);return{x:e.x,y:e.y,alpha:e.alpha}}}n+=i;e=+h[5];g=+h[6]}j+=h}m.end=j;e=a?n:b?m:l.findDotsAtSegment(e,g,h[1],h[2],h[3],h[4],h[5],h[6],1);e.alpha&&(e={x:e.x,y:e.y,alpha:e.alpha});return e}}var Nb=Z(function(a,b,c,d,f,e,g,h){for(var i={x:0,y:0},j=0,m=0;m<1.01;m+=0.01){var n=la(a,b,c,d,f,e,g,h,m);m&&(j+=E(E(i.x-n.x,2)+E(i.y-n.y,2),0.5));i=n}return j}),pb=Ma(1),Ba=Ma(),Na=Ma(0,1);s[p].getTotalLength=function(){if(this.type=="path"){if(this.node.getTotalLength)return this.node.getTotalLength();return pb(this.attrs.path)}};
s[p].getPointAtLength=function(a){if(this.type=="path"){if(this.node.getPointAtLength)return this.node.getPointAtLength(a);return Ba(this.attrs.path,a)}};s[p].getSubpath=function(a,b){if(this.type=="path"){if(v.abs(this.getTotalLength()-b)<1.0E-6)return Na(this.attrs.path,a).end;b=Na(this.attrs.path,b,1);return a?Na(b,a).end:b}};l.easing_formulas={linear:function(a){return a},"<":function(a){return E(a,3)},">":function(a){return E(a-1,3)+1},"<>":function(a){a*=2;if(a<1)return E(a,3)/2;a-=2;return(E(a,
3)+2)/2},backIn:function(a){var b=1.70158;return a*a*((b+1)*a-b)},backOut:function(a){a-=1;var b=1.70158;return a*a*((b+1)*a+b)+1},elastic:function(a){if(a==0||a==1)return a;var b=0.3,c=b/4;return E(2,-10*a)*v.sin((a-c)*2*v.PI/b)+1},bounce:function(a){var b=7.5625,c=2.75;if(a<1/c)a=b*a*a;else if(a<2/c){a-=1.5/c;a=b*a*a+0.75}else if(a<2.5/c){a-=2.25/c;a=b*a*a+0.9375}else{a-=2.625/c;a=b*a*a+0.984375}return a}};var T={length:0};function qb(){var a=+new Date;for(var b in T)if(b!="length"&&T[z](b)){var c=
T[b];if(c.stop||c.el.removed){delete T[b];T[o]--}else{var d=a-c.start,f=c.ms,e=c.easing,g=c.from,h=c.diff,i=c.to,j=c.t,m=c.prev||0,n=c.el,r=c.callback,q={},k;if(d<f){r=l.easing_formulas[e]?l.easing_formulas[e](d/f):d/f;for(var t in g)if(g[z](t)){switch(Ga[t]){case "along":k=r*f*h[t];i.back&&(k=i.len-k);e=Ba(i[t],k);n.translate(h.sx-h.x||0,h.sy-h.y||0);h.x=e.x;h.y=e.y;n.translate(e.x-h.sx,e.y-h.sy);i.rot&&n.rotate(h.r+e.alpha,e.x,e.y);break;case P:k=+g[t]+r*f*h[t];break;case "colour":k="rgb("+[Oa(Q(g[t].r+
r*f*h[t].r)),Oa(Q(g[t].g+r*f*h[t].g)),Oa(Q(g[t].b+r*f*h[t].b))][R](",")+")";break;case "path":k=[];e=0;for(var L=g[t][o];e<L;e++){k[e]=[g[t][e][0]];for(var B=1,w=g[t][e][o];B<w;B++)k[e][B]=+g[t][e][B]+r*f*h[t][e][B];k[e]=k[e][R](N)}k=k[R](N);break;case "csv":switch(t){case "translation":k=h[t][0]*(d-m);e=h[t][1]*(d-m);j.x+=k;j.y+=e;k=k+N+e;break;case "rotation":k=+g[t][0]+r*f*h[t][0];g[t][1]&&(k+=","+g[t][1]+","+g[t][2]);break;case "scale":k=[+g[t][0]+r*f*h[t][0],+g[t][1]+r*f*h[t][1],2 in i[t]?i[t][2]:
A,3 in i[t]?i[t][3]:A][R](N);break;case "clip-rect":k=[];for(e=4;e--;)k[e]=+g[t][e]+r*f*h[t][e];break}break}q[t]=k}n.attr(q);n._run&&n._run.call(n)}else{if(i.along){e=Ba(i.along,i.len*!i.back);n.translate(h.sx-(h.x||0)+e.x-h.sx,h.sy-(h.y||0)+e.y-h.sy);i.rot&&n.rotate(h.r+e.alpha,e.x,e.y)}(j.x||j.y)&&n.translate(-j.x,-j.y);i.scale&&(i.scale+=A);n.attr(i);delete T[b];T[o]--;n.in_animation=null;l.is(r,"function")&&r.call(n)}c.prev=d}}l.svg&&n&&n.paper&&n.paper.safari();T[o]&&aa.setTimeout(qb)}function Oa(a){return Y(ba(a,
255),0)}function Aa(a,b){if(a==null)return{x:this._.tx,y:this._.ty,toString:nb};this._.tx+=+a;this._.ty+=+b;switch(this.type){case "circle":case "ellipse":this.attr({cx:+a+this.attrs.cx,cy:+b+this.attrs.cy});break;case "rect":case "image":case "text":this.attr({x:+a+this.attrs.x,y:+b+this.attrs.y});break;case "path":var c=Ha(this.attrs.path);c[0][1]+=+a;c[0][2]+=+b;this.attr({path:c});break}return this}s[p].animateWith=function(a,b,c,d,f){T[a.id]&&(b.start=T[a.id].start);return this.animate(b,c,d,
f)};s[p].animateAlong=rb();s[p].animateAlongBack=rb(1);function rb(a){return function(b,c,d,f){var e={back:a};l.is(d,"function")?(f=d):(e.rot=d);b&&b.constructor==s&&(b=b.attrs.path);b&&(e.along=b);return this.animate(e,c,f)}}s[p].onAnimation=function(a){this._run=a||0;return this};s[p].animate=function(a,b,c,d){if(l.is(c,"function")||!c)d=c||null;var f={},e={},g={};for(var h in a)if(a[z](h))if(Ga[z](h)){f[h]=this.attr(h);f[h]==null&&(f[h]=ta[h]);e[h]=a[h];switch(Ga[h]){case "along":var i=pb(a[h]),
j=Ba(a[h],i*!!a.back),m=this.getBBox();g[h]=i/b;g.tx=m.x;g.ty=m.y;g.sx=j.x;g.sy=j.y;e.rot=a.rot;e.back=a.back;e.len=i;a.rot&&(g.r=y(this.rotate())||0);break;case P:g[h]=(e[h]-f[h])/b;break;case "colour":f[h]=l.getRGB(f[h]);i=l.getRGB(e[h]);g[h]={r:(i.r-f[h].r)/b,g:(i.g-f[h].g)/b,b:(i.b-f[h].b)/b};break;case "path":i=wa(f[h],e[h]);f[h]=i[0];j=i[1];g[h]=[];i=0;for(m=f[h][o];i<m;i++){g[h][i]=[0];for(var n=1,r=f[h][i][o];n<r;n++)g[h][i][n]=(j[i][n]-f[h][i][n])/b}break;case "csv":j=D(a[h])[G](V);i=D(f[h])[G](V);
switch(h){case "translation":f[h]=[0,0];g[h]=[j[0]/b,j[1]/b];break;case "rotation":f[h]=i[1]==j[1]&&i[2]==j[2]?i:[0,j[1],j[2]];g[h]=[(j[0]-f[h][0])/b,0,0];break;case "scale":a[h]=j;f[h]=D(f[h])[G](V);g[h]=[(j[0]-f[h][0])/b,(j[1]-f[h][1])/b,0,0];break;case "clip-rect":f[h]=D(f[h])[G](V);g[h]=[];for(i=4;i--;)g[h][i]=(j[i]-f[h][i])/b;break}e[h]=j}}this.stop();this.in_animation=1;T[this.id]={start:a.start||+new Date,ms:b,easing:c,from:f,diff:g,to:e,el:this,callback:d,t:{x:0,y:0}};++T[o]==1&&qb();return this};
s[p].stop=function(){T[this.id]&&T[o]--;delete T[this.id];return this};s[p].translate=function(a,b){return this.attr({translation:a+" "+b})};s[p][O]=function(){return"Rapha\u00ebl\u2019s object"};l.ae=T;function X(a){this.items=[];this[o]=0;this.type="set";if(a)for(var b=0,c=a[o];b<c;b++)if(a[b]&&(a[b].constructor==s||a[b].constructor==X)){this[this.items[o]]=this.items[this.items[o]]=a[b];this[o]++}}X[p][F]=function(){for(var a,b,c=0,d=arguments[o];c<d;c++)if((a=arguments[c])&&(a.constructor==s||
a.constructor==X)){b=this.items[o];this[b]=this.items[b]=a;this[o]++}return this};X[p].pop=function(){delete this[this[o]--];return this.items.pop()};for(var Pa in s[p])if(s[p][z](Pa))X[p][Pa]=function(a){return function(){for(var b=0,c=this.items[o];b<c;b++)this.items[b][a][K](this.items[b],arguments);return this}}(Pa);X[p].attr=function(a,b){if(a&&l.is(a,U)&&l.is(a[0],"object")){b=0;for(var c=a[o];b<c;b++)this.items[b].attr(a[b])}else{c=0;for(var d=this.items[o];c<d;c++)this.items[c].attr(a,b)}return this};
X[p].animate=function(a,b,c,d){(l.is(c,"function")||!c)&&(d=c||null);var f=this.items[o],e=f,g,h=this,i;d&&(i=function(){!--f&&d.call(h)});c=l.is(c,ga)?c:i;for(g=this.items[--e].animate(a,b,c,i);e--;)this.items[e].animateWith(g,a,b,c,i);return this};X[p].insertAfter=function(a){for(var b=this.items[o];b--;)this.items[b].insertAfter(a);return this};X[p].getBBox=function(){for(var a=[],b=[],c=[],d=[],f=this.items[o];f--;){var e=this.items[f].getBBox();a[F](e.x);b[F](e.y);c[F](e.x+e.width);d[F](e.y+
e.height)}a=ba[K](0,a);b=ba[K](0,b);return{x:a,y:b,width:Y[K](0,c)-a,height:Y[K](0,d)-b}};X[p].clone=function(a){a=new X;for(var b=0,c=this.items[o];b<c;b++)a[F](this.items[b].clone());return a};l.registerFont=function(a){if(!a.face)return a;this.fonts=this.fonts||{};var b={w:a.w,face:{},glyphs:{}},c=a.face["font-family"];for(var d in a.face)if(a.face[z](d))b.face[d]=a.face[d];if(this.fonts[c])this.fonts[c][F](b);else this.fonts[c]=[b];if(!a.svg){b.face["units-per-em"]=ha(a.face["units-per-em"],10);
for(var f in a.glyphs)if(a.glyphs[z](f)){c=a.glyphs[f];b.glyphs[f]={w:c.w,k:{},d:c.d&&"M"+c.d[I](/[mlcxtrv]/g,function(g){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[g]||"M"})+"z"};if(c.k)for(var e in c.k)if(c[z](e))b.glyphs[f].k[e]=c.k[e]}}return a};H[p].getFont=function(a,b,c,d){d=d||"normal";c=c||"normal";b=+b||{normal:400,bold:700,lighter:300,bolder:800}[b]||400;if(l.fonts){var f=l.fonts[a];if(!f){a=new RegExp("(^|\\s)"+a[I](/[^\w\d\s+!~.:_-]/g,A)+"(\\s|$)","i");for(var e in l.fonts)if(l.fonts[z](e))if(a.test(e)){f=
l.fonts[e];break}}var g;if(f){e=0;for(a=f[o];e<a;e++){g=f[e];if(g.face["font-weight"]==b&&(g.face["font-style"]==c||!g.face["font-style"])&&g.face["font-stretch"]==d)break}}return g}};H[p].print=function(a,b,c,d,f,e){e=e||"middle";var g=this.set(),h=D(c)[G](A),i=0;l.is(d,c)&&(d=this.getFont(d));if(d){c=(f||16)/d.face["units-per-em"];var j=d.face.bbox.split(V);f=+j[0];e=+j[1]+(e=="baseline"?j[3]-j[1]+ +d.face.descent:(j[3]-j[1])/2);j=0;for(var m=h[o];j<m;j++){var n=j&&d.glyphs[h[j-1]]||{},r=d.glyphs[h[j]];
i+=j?(n.w||d.w)+(n.k&&n.k[h[j]]||0):0;r&&r.d&&g[F](this.path(r.d).attr({fill:"#000",stroke:"none",translation:[i,0]}))}g.scale(c,c,f,e).translate(a-f,b-e)}return g};var Ob=/\{(\d+)\}/g;l.format=function(a,b){var c=l.is(b,U)?[0][M](b):arguments;a&&l.is(a,ga)&&c[o]-1&&(a=a[I](Ob,function(d,f){return c[++f]==null?A:c[f]}));return a||A};l.ninja=function(){Qa.was?(Raphael=Qa.is):delete Raphael;return l};l.el=s[p];return l}();
(function($){
	$.fn.btn = function(){
		return this;
	};
	$(window.btInit = function(){
	    if("function" == typeof window['fnRightClick'])window['fnRightClick']();
	    $("div.x-panel").each(function(){
	       var o = $(this);
	       if("100%" == o.css("width"))
	          o.css("width", "99%");
	    });
	    $(".readOnly input,.readOnly textarea").select(function(){document.selection.empty();return false});
		$("button").each(function(){
		     if("undefined" != typeof g_bUseBtn && g_bUseBtn)
		     {
			     $(this).hover(
				  function () {
				    $(this).removeClass("button").addClass("button1");
				  },
				  function () {
				    $(this).removeClass("button1").addClass("button");
				  }
				); 
				if(this.createTextRange)
				{
				    var o = this, oR = o.createTextRange();
		            if(0 < oR.boundingWidth)o.style.width = oR.boundingWidth + 12;
	                oR = null;
	            }
            }
			else $(this).removeAttr("class").btn().init();
		});/*
		$("input[type='reset']").each(function(){
			$(this).btn().init().click(function(){
				var form = $(this).parents("form")[0];
				if(form)
					form.reset();
			});
		});
		$("input[type='submit']").each(function(){
			$(this).btn().init().click(function(){
				var form = $(this).parents("form")[0];
				if(form)
					form.submit();
			});
		});*/
	})
})(jQuery);	var infosoftglobal = {};
infosoftglobal.FusionChartsUtil = {};
infosoftglobal.FusionCharts = function(swf, id, w, h, debugMode, registerWithJS, c, scaleMode, lang, detectFlashVersion, autoInstallRedirect){
	if (!document.getElementById) { return; }
	
	//Flag to see whether data has been set initially
	this.initialDataSet = false;
	
	//Create container objects
	this.params = {};
	this.variables = {};
	this.attributes = [];
	
	//Set attributes for the SWF
	if(swf) { this.setAttribute('swf', swf); }
	if(id) { this.setAttribute('id', id); }

	debugMode = debugMode ? debugMode : 0;
	this.addVariable('debugMode', debugMode);

	w=w.toString().replace(/\%$/,"%25");
	if(w) { this.setAttribute('width', w); }
	h=h.toString().replace(/\%$/,"%25");
	if(h) { this.setAttribute('height', h); }

	
	//Set background color
	if(c) { this.addParam('bgcolor', c); }
	
	//Set Quality	
	this.addParam('quality', 'high');
	
	//Add scripting access parameter
	this.addParam('allowScriptAccess', 'always');
	
	//Pass width and height to be appended as chartWidth and chartHeight
	this.addVariable('chartWidth', w);
	this.addVariable('chartHeight', h);

	//Whether in debug mode
	//Pass DOM ID to Chart
	this.addVariable('DOMId', id);
	//Whether to registed with JavaScript
	registerWithJS = registerWithJS ? registerWithJS : 0;
	this.addVariable('registerWithJS', registerWithJS);
	
	//Scale Mode of chart
	scaleMode = scaleMode ? scaleMode : 'noScale';
	this.addVariable('scaleMode', scaleMode);
	
	//Application Message Language
	lang = lang ? lang : 'EN';
	this.addVariable('lang', lang);
	
	//Whether to auto detect and re-direct to Flash Player installation
	this.detectFlashVersion = detectFlashVersion?detectFlashVersion:1;
	this.autoInstallRedirect = autoInstallRedirect?autoInstallRedirect:1;
	
	//Ger Flash Player version 
	this.installedVer = infosoftglobal.FusionChartsUtil.getPlayerVersion();
	
	if (!window.opera && document.all && this.installedVer.major > 7) {
		// Only add the onunload cleanup if the Flash Player version supports External Interface and we are in IE
		infosoftglobal.FusionCharts.doPrepUnload = true;
	}
}

infosoftglobal.FusionCharts.prototype = {
	setAttribute: function(name, value){
		this.attributes[name] = value;
	},
	getAttribute: function(name){
		return this.attributes[name];
	},
	addParam: function(name, value){
		this.params[name] = value;
	},
	getParams: function(){
		return this.params;
	},
	addVariable: function(name, value){
		this.variables[name] = value;
	},
	getVariable: function(name){
		return this.variables[name];
	},
	getVariables: function(){
		return this.variables;
	},
	getVariablePairs: function(){
		var variablePairs = [];
		var key;
		var variables = this.getVariables();
		for(key in variables){
			variablePairs.push(key +"="+ variables[key]);
		}
		return variablePairs;
	},
	getSWFHTML: function() {
		var swfNode = "";
		if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) { 
			// netscape plugin architecture			
			swfNode = '<embed type="application/x-shockwave-flash"  src="'+ this.getAttribute('swf') +'" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'"  ';
			swfNode += ' id="'+ this.getAttribute('id') +'" name="'+ this.getAttribute('id') +'" ';
			var params = this.getParams();
			 for(var key in params){ swfNode += [key] +'="'+ params[key] +'" '; }
			var pairs = this.getVariablePairs().join("&");
			 if (pairs.length > 0){ swfNode += 'flashvars="'+ pairs +'"'; }
			swfNode += '/>';
		} else { // PC IE			
			swfNode = '<object id="'+ this.getAttribute('id') +'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+ this.getAttribute('width') +'" height="'+ this.getAttribute('height') +'">';
			swfNode += '<param name="movie" value="'+ this.getAttribute('swf') +'" />';
			swfNode += '<param name="wmode" value="opaque" />'; 
			var params = this.getParams();
			for(var key in params) {
			 swfNode += '<param name="'+ key +'" value="'+ params[key] +'" />';
			}
			var pairs = this.getVariablePairs().join("&");			
			if(pairs.length > 0) {swfNode += '<param name="flashvars" value="'+ pairs +'" />';}
			swfNode += "</object>";
		}
		return swfNode;
	},
	setDataURL: function(strDataURL){
		//This method sets the data URL for the chart.
		//If being set initially
		if (this.initialDataSet==false){
			this.addVariable('dataURL',strDataURL);
			//Update flag
			this.initialDataSet = true;
		}else{
			//Else, we update the chart data using External Interface
			//Get reference to chart object
			var chartObj = infosoftglobal.FusionChartsUtil.getChartObject(this.getAttribute('id'));
			
			if (!chartObj.setDataURL)
			{
				__flash__addCallback(chartObj, "setDataURL");
			}
			
			chartObj.setDataURL(strDataURL);
		}
		return this;
	},
	//This function :
	//fixes the double quoted attributes to single quotes
	//Encodes all quotes inside attribute values
	//Encodes % to %25 and & to %26;
	encodeDataXML: function(strDataXML){
		
			var regExpReservedCharacters=["\\$","\\+"];
			var arrDQAtt=strDataXML.match(/=\s*\".*?\"/g);
			if (arrDQAtt){
				for(var i=0;i<arrDQAtt.length;i++){
					var repStr=arrDQAtt[i].replace(/^=\s*\"|\"$/g,"");
					repStr=repStr.replace(/\'/g,"%26apos;");
					var strTo=strDataXML.indexOf(arrDQAtt[i]);
					var repStrr="='"+repStr+"'";
					var strStart=strDataXML.substring(0,strTo);
					var strEnd=strDataXML.substring(strTo+arrDQAtt[i].length);
					var strDataXML=strStart+repStrr+strEnd;
				}
			}
			
			strDataXML=strDataXML.replace(/\"/g,"%26quot;");
			strDataXML=strDataXML.replace(/%(?![\da-f]{2}|[\da-f]{4})/ig,"%25");
			strDataXML=strDataXML.replace(/\&/g,"%26");

			return strDataXML;

	},
	setDataXML: function(strDataXML){
		//If being set initially
		if (this.initialDataSet==false){
			//This method sets the data XML for the chart INITIALLY.
			this.addVariable('dataXML',this.encodeDataXML(strDataXML));
			//Update flag
			this.initialDataSet = true;
		}else{
			//Else, we update the chart data using External Interface
			//Get reference to chart object
			var chartObj = infosoftglobal.FusionChartsUtil.getChartObject(this.getAttribute('id'));
			chartObj.setDataXML(strDataXML);
		}
		return this;
	},
	setTransparent: function(isTransparent){
		//Sets chart to transparent mode when isTransparent is true (default)
		//When no parameter is passed, we assume transparent to be true.
		if(typeof isTransparent=="undefined") {
			isTransparent=true;
		}			
		//Set the property
		if(isTransparent)
			this.addParam('WMode', 'transparent');
		else
			this.addParam('WMode', 'Opaque');
	},
	
	render: function(elementId){
		//First check for installed version of Flash Player - we need a minimum of 8
		if((this.detectFlashVersion==1) && (this.installedVer.major < 8)){
			if (this.autoInstallRedirect==1){
				//If we can auto redirect to install the player?
				var installationConfirm = window.confirm("You need Adobe Flash Player 8 (or above) to view the charts. It is a free and lightweight installation from Adobe.com. Please click on Ok to install the same.");
				if (installationConfirm){
					window.location = "http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash";
				}else{
					return false;
				}
			}else{
				//Else, do not take an action. It means the developer has specified a message in the DIV (and probably a link).
				//So, expect the developers to provide a course of way to their end users.
				//window.alert("You need Adobe Flash Player 8 (or above) to view the charts. It is a free and lightweight installation from Adobe.com. ");
				return false;
			}			
		}else{
			//Render the chart
			var n = (typeof elementId == 'string') ? document.getElementById(elementId) : elementId;
			// If loaded in IE and scaleMode and width/height specified in %, load the chart using onload event 
			if(  this.getVariable('scaleMode').search(/noscale/i)>=0 &&  
		         ( this.getAttribute('width').search("%")>0 || 
        		    this.getAttribute('height').search("%")>0) )
			{
				//store current object reference
				var obj=this;
				if(window.addEventListener) {
					//add onload event on firefox                                 
			        window.addEventListener("load",function()
                        { n.innerHTML = obj.getSWFHTML(); },false );
				} else if(window.attachEvent) {
					//add onload event on IE
					var fn = function() 
						{n.innerHTML = obj.getSWFHTML(); }, fn1 = function(bRsr){
					// There is reasonable, in our project
					if("undefined" != typeof g_bHvAjax || bRsr)fn();
					else window.attachEvent("onload", fn );
					};
					fn1(typeof g_bHvAjax);
					n.attachEvent("onresize", function(){fn1(1); });					
				} else { 
					// if all onload fails fails
					n.innerHTML = this.getSWFHTML();		
				}				
			} else {
				//Normal case. Instantly load the chart
				n.innerHTML = this.getSWFHTML();
			}
			
			//Added <FORM> compatibility
			//Check if it's added in Mozilla embed array or if already exits 
			if(!document.embeds[this.getAttribute('id')] && !window[this.getAttribute('id')])
		      	window[this.getAttribute('id')]=document.getElementById(this.getAttribute('id')); 
				//or else document.forms[formName/formIndex][chartId]			
			return true;		
		}
	}
}

/* ---- detection functions ---- */
infosoftglobal.FusionChartsUtil.getPlayerVersion = function(){
	var PlayerVersion = new infosoftglobal.PlayerVersion([0,0,0]);
	if(navigator.plugins && navigator.mimeTypes.length){
		var x = navigator.plugins["Shockwave Flash"];
		if(x && x.description) {
			PlayerVersion = new infosoftglobal.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split("."));
		}
	}else if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") >= 0){ 
		//If Windows CE
		var axo = 1;
		var counter = 3;
		while(axo) {
			try {
				counter++;
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+ counter);
				PlayerVersion = new infosoftglobal.PlayerVersion([counter,0,0]);
			} catch (e) {
				axo = null;
			}
		}
	} else { 
		// Win IE (non mobile)
		// Do minor version lookup in IE, but avoid Flash Player 6 crashing issues
		try{
			var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		}catch(e){
			try {
				var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				PlayerVersion = new infosoftglobal.PlayerVersion([6,0,21]);
				axo.AllowScriptAccess = "always"; // error if player version < 6.0.47 (thanks to Michael Williams @ Adobe for this code)
			} catch(e) {
				if (PlayerVersion.major == 6) {
					return PlayerVersion;
				}
			}
			try {
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			} catch(e) {}
		}
		if (axo != null) {
			PlayerVersion = new infosoftglobal.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));
		}
	}
	return PlayerVersion;
}
infosoftglobal.PlayerVersion = function(arrVersion){
	this.major = arrVersion[0] != null ? parseInt(arrVersion[0]) : 0;
	this.minor = arrVersion[1] != null ? parseInt(arrVersion[1]) : 0;
	this.rev = arrVersion[2] != null ? parseInt(arrVersion[2]) : 0;
}
// ------------ Fix for Out of Memory Bug in IE in FP9 ---------------//
/* Fix for video streaming bug */
infosoftglobal.FusionChartsUtil.cleanupSWFs = function() {
	var objects = document.getElementsByTagName("OBJECT");
	for (var i = objects.length - 1; i >= 0; i--) {
		objects[i].style.display = 'none';
		for (var x in objects[i]) {
			if (typeof objects[i][x] == 'function') {
				objects[i][x] = function(){};
			}
		}
	}
}
// Fixes bug in fp9
if (infosoftglobal.FusionCharts.doPrepUnload) {
	if (!infosoftglobal.unloadSet) {
		infosoftglobal.FusionChartsUtil.prepUnload = function() {
			__flash_unloadHandler = function(){};
			__flash_savedUnloadHandler = function(){};
			window.attachEvent("onunload", infosoftglobal.FusionChartsUtil.cleanupSWFs);
		}
		window.attachEvent("onbeforeunload", infosoftglobal.FusionChartsUtil.prepUnload);
		infosoftglobal.unloadSet = true;
	}
}
/* Add document.getElementById if needed (mobile IE < 5) */
if (!document.getElementById && document.all) { document.getElementById = function(id) { return document.all[id]; }}
/* Add Array.push if needed (ie5) */
if (Array.prototype.push == null) { Array.prototype.push = function(item) { this[this.length] = item; return this.length; }}

/* Function to return Flash Object from ID */
infosoftglobal.FusionChartsUtil.getChartObject = function(id)
{
  var chartRef=null;
  if (navigator.appName.indexOf("Microsoft Internet")==-1) {
    if (document.embeds && document.embeds[id])
      chartRef = document.embeds[id]; 
	else
	chartRef  = window.document[id];
  }
  else {
    chartRef = window[id];
  }
  if (!chartRef)
	chartRef  = document.getElementById(id);
  
  return chartRef;
}
/* Aliases for easy usage */
var getChartFromId = infosoftglobal.FusionChartsUtil.getChartObject;
var FusionCharts = infosoftglobal.FusionCharts;/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);/* Copyright (c) 2006 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $LastChangedDate: 2007-07-21 18:45:56 -0500 (Sat, 21 Jul 2007) $
 * $Rev: 2447 $
 *
 * Version 2.1.1
 */
(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if($.browser.msie&&/6.0/.test(navigator.userAgent)){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var prop=function(n){return n&&n.constructor==Number?n+'px':n;},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild);});}return this;};})(jQuery);// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// Known Issues:
//
// * Patterns are not implemented.
// * Radial gradient are not implemented. The VML version of these look very
//   different from the canvas one.
// * Clipping paths are not implemented.
// * Coordsize. The width and height attribute have higher priority than the
//   width and height style values which isn't correct.
// * Painting mode isn't implemented.
// * Canvas width/height should is using content-box by default. IE in
//   Quirks mode will draw the canvas using border-box. Either change your
//   doctype to HTML5
//   (http://www.whatwg.org/specs/web-apps/current-work/#the-doctype)
//   or use Box Sizing Behavior from WebFX
//   (http://webfx.eae.net/dhtml/boxsizing/boxsizing.html)
// * Non uniform scaling does not correctly scale strokes.
// * Optimize. There is always room for speed improvements.

// Only add this code if we do not already have a canvas implementation
if (!document.createElement('canvas').getContext) {

(function() {

  // alias some functions to make (compiled) code shorter
  var m = Math;
  var mr = m.round;
  var ms = m.sin;
  var mc = m.cos;
  var abs = m.abs;
  var sqrt = m.sqrt;

  // this is used for sub pixel precision
  var Z = 10;
  var Z2 = Z / 2;

  /**
   * This funtion is assigned to the <canvas> elements as element.getContext().
   * @this {HTMLElement}
   * @return {CanvasRenderingContext2D_}
   */
  function getContext() {
    return this.context_ ||
        (this.context_ = new CanvasRenderingContext2D_(this));
  }

  var slice = Array.prototype.slice;

  /**
   * Binds a function to an object. The returned function will always use the
   * passed in {@code obj} as {@code this}.
   *
   * Example:
   *
   *   g = bind(f, obj, a, b)
   *   g(c, d) // will do f.call(obj, a, b, c, d)
   *
   * @param {Function} f The function to bind the object to
   * @param {Object} obj The object that should act as this when the function
   *     is called
   * @param {*} var_args Rest arguments that will be used as the initial
   *     arguments when the function is called
   * @return {Function} A new function that has bound this
   */
  function bind(f, obj, var_args) {
    var a = slice.call(arguments, 2);
    return function() {
      return f.apply(obj, a.concat(slice.call(arguments)));
    };
  }

  var G_vmlCanvasManager_ = {
    init: function(opt_doc) {
      if (/MSIE/.test(navigator.userAgent) && !window.opera) {
        var doc = opt_doc || document;
        // Create a dummy element so that IE will allow canvas elements to be
        // recognized.
        doc.createElement('canvas');
        doc.attachEvent('onreadystatechange', bind(this.init_, this, doc));
      }
    },

    init_: function(doc) {
      // create xmlns
      if (!doc.namespaces['g_vml_']) {
        doc.namespaces.add('g_vml_', 'urn:schemas-microsoft-com:vml',
                           '#default#VML');

      }
      if (!doc.namespaces['g_o_']) {
        doc.namespaces.add('g_o_', 'urn:schemas-microsoft-com:office:office',
                           '#default#VML');
      }

      // Setup default CSS.  Only add one style sheet per document
      if (!doc.styleSheets['ex_canvas_']) {
        var ss = doc.createStyleSheet();
        ss.owningElement.id = 'ex_canvas_';
        ss.cssText = 'canvas{display:inline-block;overflow:hidden;' +
            // default size is 300x150 in Gecko and Opera
            'text-align:left;width:300px;height:150px}' +
            'g_vml_\\:*{behavior:url(#default#VML)}' +
            'g_o_\\:*{behavior:url(#default#VML)}';

      }

      // find all canvas elements
      var els = doc.getElementsByTagName('canvas');
      for (var i = 0; i < els.length; i++) {
        this.initElement(els[i]);
      }
    },

    /**
     * Public initializes a canvas element so that it can be used as canvas
     * element from now on. This is called automatically before the page is
     * loaded but if you are creating elements using createElement you need to
     * make sure this is called on the element.
     * @param {HTMLElement} el The canvas element to initialize.
     * @return {HTMLElement} the element that was created.
     */
    initElement: function(el) {
      if (!el.getContext) {

        el.getContext = getContext;

        // Remove fallback content. There is no way to hide text nodes so we
        // just remove all childNodes. We could hide all elements and remove
        // text nodes but who really cares about the fallback content.
        el.innerHTML = '';

        // do not use inline function because that will leak memory
        el.attachEvent('onpropertychange', onPropertyChange);
        el.attachEvent('onresize', onResize);

        var attrs = el.attributes;
        if (attrs.width && attrs.width.specified) {
          // TODO: use runtimeStyle and coordsize
          // el.getContext().setWidth_(attrs.width.nodeValue);
          el.style.width = attrs.width.nodeValue + 'px';
        } else {
          el.width = el.clientWidth;
        }
        if (attrs.height && attrs.height.specified) {
          // TODO: use runtimeStyle and coordsize
          // el.getContext().setHeight_(attrs.height.nodeValue);
          el.style.height = attrs.height.nodeValue + 'px';
        } else {
          el.height = el.clientHeight;
        }
        //el.getContext().setCoordsize_()
      }
      return el;
    }
  };

  function onPropertyChange(e) {
    var el = e.srcElement;

    switch (e.propertyName) {
      case 'width':
        el.style.width = el.attributes.width.nodeValue + 'px';
        el.getContext().clearRect();
        break;
      case 'height':
        el.style.height = el.attributes.height.nodeValue + 'px';
        el.getContext().clearRect();
        break;
    }
  }

  function onResize(e) {
    var el = e.srcElement;
    if (el.firstChild) {
      el.firstChild.style.width =  el.clientWidth + 'px';
      el.firstChild.style.height = el.clientHeight + 'px';
    }
  }

  G_vmlCanvasManager_.init();

  // precompute "00" to "FF"
  var dec2hex = [];
  for (var i = 0; i < 16; i++) {
    for (var j = 0; j < 16; j++) {
      dec2hex[i * 16 + j] = i.toString(16) + j.toString(16);
    }
  }

  function createMatrixIdentity() {
    return [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];
  }

  function matrixMultiply(m1, m2) {
    var result = createMatrixIdentity();

    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        var sum = 0;

        for (var z = 0; z < 3; z++) {
          sum += m1[x][z] * m2[z][y];
        }

        result[x][y] = sum;
      }
    }
    return result;
  }

  function copyState(o1, o2) {
    o2.fillStyle     = o1.fillStyle;
    o2.lineCap       = o1.lineCap;
    o2.lineJoin      = o1.lineJoin;
    o2.lineWidth     = o1.lineWidth;
    o2.miterLimit    = o1.miterLimit;
    o2.shadowBlur    = o1.shadowBlur;
    o2.shadowColor   = o1.shadowColor;
    o2.shadowOffsetX = o1.shadowOffsetX;
    o2.shadowOffsetY = o1.shadowOffsetY;
    o2.strokeStyle   = o1.strokeStyle;
    o2.globalAlpha   = o1.globalAlpha;
    o2.arcScaleX_    = o1.arcScaleX_;
    o2.arcScaleY_    = o1.arcScaleY_;
    o2.lineScale_    = o1.lineScale_;
  }

  function processStyle(styleString) {
    var str, alpha = 1;

    styleString = String(styleString);
    if (styleString.substring(0, 3) == 'rgb') {
      var start = styleString.indexOf('(', 3);
      var end = styleString.indexOf(')', start + 1);
      var guts = styleString.substring(start + 1, end).split(',');

      str = '#';
      for (var i = 0; i < 3; i++) {
        str += dec2hex[Number(guts[i])];
      }

      if (guts.length == 4 && styleString.substr(3, 1) == 'a') {
        alpha = guts[3];
      }
    } else {
      str = styleString;
    }

    return {color: str, alpha: alpha};
  }

  function processLineCap(lineCap) {
    switch (lineCap) {
      case 'butt':
        return 'flat';
      case 'round':
        return 'round';
      case 'square':
      default:
        return 'square';
    }
  }

  /**
   * This class implements CanvasRenderingContext2D interface as described by
   * the WHATWG.
   * @param {HTMLElement} surfaceElement The element that the 2D context should
   * be associated with
   */
  function CanvasRenderingContext2D_(surfaceElement) {
    this.m_ = createMatrixIdentity();

    this.mStack_ = [];
    this.aStack_ = [];
    this.currentPath_ = [];

    // Canvas context properties
    this.strokeStyle = '#000';
    this.fillStyle = '#000';

    this.lineWidth = 1;
    this.lineJoin = 'miter';
    this.lineCap = 'butt';
    this.miterLimit = Z * 1;
    this.globalAlpha = 1;
    this.canvas = surfaceElement;

    var el = surfaceElement.ownerDocument.createElement('div');
    el.style.width =  surfaceElement.clientWidth + 'px';
    el.style.height = surfaceElement.clientHeight + 'px';
    el.style.overflow = 'hidden';
    el.style.position = 'absolute';
    surfaceElement.appendChild(el);

    this.element_ = el;
    this.arcScaleX_ = 1;
    this.arcScaleY_ = 1;
    this.lineScale_ = 1;
  }

  var contextPrototype = CanvasRenderingContext2D_.prototype;
  contextPrototype.clearRect = function() {
    this.element_.innerHTML = '';
  };

  contextPrototype.beginPath = function() {
    // TODO: Branch current matrix so that save/restore has no effect
    //       as per safari docs.
    this.currentPath_ = [];
  };

  contextPrototype.moveTo = function(aX, aY) {
    var p = this.getCoords_(aX, aY);
    this.currentPath_.push({type: 'moveTo', x: p.x, y: p.y});
    this.currentX_ = p.x;
    this.currentY_ = p.y;
  };

  contextPrototype.lineTo = function(aX, aY) {
    var p = this.getCoords_(aX, aY);
    this.currentPath_.push({type: 'lineTo', x: p.x, y: p.y});

    this.currentX_ = p.x;
    this.currentY_ = p.y;
  };

  contextPrototype.bezierCurveTo = function(aCP1x, aCP1y,
                                            aCP2x, aCP2y,
                                            aX, aY) {
    var p = this.getCoords_(aX, aY);
    var cp1 = this.getCoords_(aCP1x, aCP1y);
    var cp2 = this.getCoords_(aCP2x, aCP2y);
    bezierCurveTo(this, cp1, cp2, p);
  };

  // Helper function that takes the already fixed cordinates.
  function bezierCurveTo(self, cp1, cp2, p) {
    self.currentPath_.push({
      type: 'bezierCurveTo',
      cp1x: cp1.x,
      cp1y: cp1.y,
      cp2x: cp2.x,
      cp2y: cp2.y,
      x: p.x,
      y: p.y
    });
    self.currentX_ = p.x;
    self.currentY_ = p.y;
  }

  contextPrototype.quadraticCurveTo = function(aCPx, aCPy, aX, aY) {
    // the following is lifted almost directly from
    // http://developer.mozilla.org/en/docs/Canvas_tutorial:Drawing_shapes

    var cp = this.getCoords_(aCPx, aCPy);
    var p = this.getCoords_(aX, aY);

    var cp1 = {
      x: this.currentX_ + 2.0 / 3.0 * (cp.x - this.currentX_),
      y: this.currentY_ + 2.0 / 3.0 * (cp.y - this.currentY_)
    };
    var cp2 = {
      x: cp1.x + (p.x - this.currentX_) / 3.0,
      y: cp1.y + (p.y - this.currentY_) / 3.0
    };

    bezierCurveTo(this, cp1, cp2, p);
  };

  contextPrototype.arc = function(aX, aY, aRadius,
                                  aStartAngle, aEndAngle, aClockwise) {
    aRadius *= Z;
    var arcType = aClockwise ? 'at' : 'wa';

    var xStart = aX + mc(aStartAngle) * aRadius - Z2;
    var yStart = aY + ms(aStartAngle) * aRadius - Z2;

    var xEnd = aX + mc(aEndAngle) * aRadius - Z2;
    var yEnd = aY + ms(aEndAngle) * aRadius - Z2;

    // IE won't render arches drawn counter clockwise if xStart == xEnd.
    if (xStart == xEnd && !aClockwise) {
      xStart += 0.125; // Offset xStart by 1/80 of a pixel. Use something
                       // that can be represented in binary
    }

    var p = this.getCoords_(aX, aY);
    var pStart = this.getCoords_(xStart, yStart);
    var pEnd = this.getCoords_(xEnd, yEnd);

    this.currentPath_.push({type: arcType,
                           x: p.x,
                           y: p.y,
                           radius: aRadius,
                           xStart: pStart.x,
                           yStart: pStart.y,
                           xEnd: pEnd.x,
                           yEnd: pEnd.y});

  };

  contextPrototype.rect = function(aX, aY, aWidth, aHeight) {
    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
  };

  contextPrototype.strokeRect = function(aX, aY, aWidth, aHeight) {
    var oldPath = this.currentPath_;
    this.beginPath();

    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
    this.stroke();

    this.currentPath_ = oldPath;
  };

  contextPrototype.fillRect = function(aX, aY, aWidth, aHeight) {
    var oldPath = this.currentPath_;
    this.beginPath();

    this.moveTo(aX, aY);
    this.lineTo(aX + aWidth, aY);
    this.lineTo(aX + aWidth, aY + aHeight);
    this.lineTo(aX, aY + aHeight);
    this.closePath();
    this.fill();

    this.currentPath_ = oldPath;
  };

  contextPrototype.createLinearGradient = function(aX0, aY0, aX1, aY1) {
    var gradient = new CanvasGradient_('gradient');
    gradient.x0_ = aX0;
    gradient.y0_ = aY0;
    gradient.x1_ = aX1;
    gradient.y1_ = aY1;
    return gradient;
  };

  contextPrototype.createRadialGradient = function(aX0, aY0, aR0,
                                                   aX1, aY1, aR1) {
    var gradient = new CanvasGradient_('gradientradial');
    gradient.x0_ = aX0;
    gradient.y0_ = aY0;
    gradient.r0_ = aR0;
    gradient.x1_ = aX1;
    gradient.y1_ = aY1;
    gradient.r1_ = aR1;
    return gradient;
  };

  contextPrototype.drawImage = function(image, var_args) {
    var dx, dy, dw, dh, sx, sy, sw, sh;

    // to find the original width we overide the width and height
    var oldRuntimeWidth = image.runtimeStyle.width;
    var oldRuntimeHeight = image.runtimeStyle.height;
    image.runtimeStyle.width = 'auto';
    image.runtimeStyle.height = 'auto';

    // get the original size
    var w = image.width;
    var h = image.height;

    // and remove overides
    image.runtimeStyle.width = oldRuntimeWidth;
    image.runtimeStyle.height = oldRuntimeHeight;

    if (arguments.length == 3) {
      dx = arguments[1];
      dy = arguments[2];
      sx = sy = 0;
      sw = dw = w;
      sh = dh = h;
    } else if (arguments.length == 5) {
      dx = arguments[1];
      dy = arguments[2];
      dw = arguments[3];
      dh = arguments[4];
      sx = sy = 0;
      sw = w;
      sh = h;
    } else if (arguments.length == 9) {
      sx = arguments[1];
      sy = arguments[2];
      sw = arguments[3];
      sh = arguments[4];
      dx = arguments[5];
      dy = arguments[6];
      dw = arguments[7];
      dh = arguments[8];
    } else {
      throw Error('Invalid number of arguments');
    }

    var d = this.getCoords_(dx, dy);

    var w2 = sw / 2;
    var h2 = sh / 2;

    var vmlStr = [];

    var W = 10;
    var H = 10;

    // For some reason that I've now forgotten, using divs didn't work
    vmlStr.push(' <g_vml_:group',
                ' coordsize="', Z * W, ',', Z * H, '"',
                ' coordorigin="0,0"' ,
                ' style="width:', W, 'px;height:', H, 'px;position:absolute;');

    // If filters are necessary (rotation exists), create them
    // filters are bog-slow, so only create them if abbsolutely necessary
    // The following check doesn't account for skews (which don't exist
    // in the canvas spec (yet) anyway.

    if (this.m_[0][0] != 1 || this.m_[0][1]) {
      var filter = [];

      // Note the 12/21 reversal
      filter.push('M11=', this.m_[0][0], ',',
                  'M12=', this.m_[1][0], ',',
                  'M21=', this.m_[0][1], ',',
                  'M22=', this.m_[1][1], ',',
                  'Dx=', mr(d.x / Z), ',',
                  'Dy=', mr(d.y / Z), '');

      // Bounding box calculation (need to minimize displayed area so that
      // filters don't waste time on unused pixels.
      var max = d;
      var c2 = this.getCoords_(dx + dw, dy);
      var c3 = this.getCoords_(dx, dy + dh);
      var c4 = this.getCoords_(dx + dw, dy + dh);

      max.x = m.max(max.x, c2.x, c3.x, c4.x);
      max.y = m.max(max.y, c2.y, c3.y, c4.y);

      vmlStr.push('padding:0 ', mr(max.x / Z), 'px ', mr(max.y / Z),
                  'px 0;filter:progid:DXImageTransform.Microsoft.Matrix(',
                  filter.join(''), ", sizingmethod='clip');")
    } else {
      vmlStr.push('top:', mr(d.y / Z), 'px;left:', mr(d.x / Z), 'px;');
    }

    vmlStr.push(' ">' ,
                '<g_vml_:image src="', image.src, '"',
                ' style="width:', Z * dw, 'px;',
                ' height:', Z * dh, 'px;"',
                ' cropleft="', sx / w, '"',
                ' croptop="', sy / h, '"',
                ' cropright="', (w - sx - sw) / w, '"',
                ' cropbottom="', (h - sy - sh) / h, '"',
                ' />',
                '</g_vml_:group>');

    this.element_.insertAdjacentHTML('BeforeEnd',
                                    vmlStr.join(''));
  };

  contextPrototype.stroke = function(aFill) {
    var lineStr = [];
    var lineOpen = false;
    var a = processStyle(aFill ? this.fillStyle : this.strokeStyle);
    var color = a.color;
    var opacity = a.alpha * this.globalAlpha;

    var W = 10;
    var H = 10;

    lineStr.push('<g_vml_:shape',
                 ' filled="', !!aFill, '"',
                 ' style="position:absolute;width:', W, 'px;height:', H, 'px;"',
                 ' coordorigin="0 0" coordsize="', Z * W, ' ', Z * H, '"',
                 ' stroked="', !aFill, '"',
                 ' path="');

    var newSeq = false;
    var min = {x: null, y: null};
    var max = {x: null, y: null};

    for (var i = 0; i < this.currentPath_.length; i++) {
      var p = this.currentPath_[i];
      var c;

      switch (p.type) {
        case 'moveTo':
          c = p;
          lineStr.push(' m ', mr(p.x), ',', mr(p.y));
          break;
        case 'lineTo':
          lineStr.push(' l ', mr(p.x), ',', mr(p.y));
          break;
        case 'close':
          lineStr.push(' x ');
          p = null;
          break;
        case 'bezierCurveTo':
          lineStr.push(' c ',
                       mr(p.cp1x), ',', mr(p.cp1y), ',',
                       mr(p.cp2x), ',', mr(p.cp2y), ',',
                       mr(p.x), ',', mr(p.y));
          break;
        case 'at':
        case 'wa':
          lineStr.push(' ', p.type, ' ',
                       mr(p.x - this.arcScaleX_ * p.radius), ',',
                       mr(p.y - this.arcScaleY_ * p.radius), ' ',
                       mr(p.x + this.arcScaleX_ * p.radius), ',',
                       mr(p.y + this.arcScaleY_ * p.radius), ' ',
                       mr(p.xStart), ',', mr(p.yStart), ' ',
                       mr(p.xEnd), ',', mr(p.yEnd));
          break;
      }


      // TODO: Following is broken for curves due to
      //       move to proper paths.

      // Figure out dimensions so we can do gradient fills
      // properly
      if (p) {
        if (min.x == null || p.x < min.x) {
          min.x = p.x;
        }
        if (max.x == null || p.x > max.x) {
          max.x = p.x;
        }
        if (min.y == null || p.y < min.y) {
          min.y = p.y;
        }
        if (max.y == null || p.y > max.y) {
          max.y = p.y;
        }
      }
    }
    lineStr.push(' ">');

    if (!aFill) {
      var lineWidth = this.lineScale_ * this.lineWidth;

      // VML cannot correctly render a line if the width is less than 1px.
      // In that case, we dilute the color to make the line look thinner.
      if (lineWidth < 1) {
        opacity *= lineWidth;
      }

      lineStr.push(
        '<g_vml_:stroke',
        ' opacity="', opacity, '"',
        ' joinstyle="', this.lineJoin, '"',
        ' miterlimit="', this.miterLimit, '"',
        ' endcap="', processLineCap(this.lineCap), '"',
        ' weight="', lineWidth, 'px"',
        ' color="', color, '" />'
      );
    } else if (typeof this.fillStyle == 'object') {
      var fillStyle = this.fillStyle;
      var angle = 0;
      var focus = {x: 0, y: 0};

      // additional offset
      var shift = 0;
      // scale factor for offset
      var expansion = 1;

      if (fillStyle.type_ == 'gradient') {
        var x0 = fillStyle.x0_ / this.arcScaleX_;
        var y0 = fillStyle.y0_ / this.arcScaleY_;
        var x1 = fillStyle.x1_ / this.arcScaleX_;
        var y1 = fillStyle.y1_ / this.arcScaleY_;
        var p0 = this.getCoords_(x0, y0);
        var p1 = this.getCoords_(x1, y1);
        var dx = p1.x - p0.x;
        var dy = p1.y - p0.y;
        angle = Math.atan2(dx, dy) * 180 / Math.PI;

        // The angle should be a non-negative number.
        if (angle < 0) {
          angle += 360;
        }

        // Very small angles produce an unexpected result because they are
        // converted to a scientific notation string.
        if (angle < 1e-6) {
          angle = 0;
        }
      } else {
        var p0 = this.getCoords_(fillStyle.x0_, fillStyle.y0_);
        var width  = max.x - min.x;
        var height = max.y - min.y;
        focus = {
          x: (p0.x - min.x) / width,
          y: (p0.y - min.y) / height
        };

        width  /= this.arcScaleX_ * Z;
        height /= this.arcScaleY_ * Z;
        var dimension = m.max(width, height);
        shift = 2 * fillStyle.r0_ / dimension;
        expansion = 2 * fillStyle.r1_ / dimension - shift;
      }

      // We need to sort the color stops in ascending order by offset,
      // otherwise IE won't interpret it correctly.
      var stops = fillStyle.colors_;
      stops.sort(function(cs1, cs2) {
        return cs1.offset - cs2.offset;
      });

      var length = stops.length;
      var color1 = stops[0].color;
      var color2 = stops[length - 1].color;
      var opacity1 = stops[0].alpha * this.globalAlpha;
      var opacity2 = stops[length - 1].alpha * this.globalAlpha;

      var colors = [];
      for (var i = 0; i < length; i++) {
        var stop = stops[i];
        colors.push(stop.offset * expansion + shift + ' ' + stop.color);
      }

      // When colors attribute is used, the meanings of opacity and o:opacity2
      // are reversed.
      lineStr.push('<g_vml_:fill type="', fillStyle.type_, '"',
                   ' method="none" focus="100%"',
                   ' color="', color1, '"',
                   ' color2="', color2, '"',
                   ' colors="', colors.join(','), '"',
                   ' opacity="', opacity2, '"',
                   ' g_o_:opacity2="', opacity1, '"',
                   ' angle="', angle, '"',
                   ' focusposition="', focus.x, ',', focus.y, '" />');
    } else {
      lineStr.push('<g_vml_:fill color="', color, '" opacity="', opacity,
                   '" />');
    }

    lineStr.push('</g_vml_:shape>');

    this.element_.insertAdjacentHTML('beforeEnd', lineStr.join(''));
  };

  contextPrototype.fill = function() {
    this.stroke(true);
  }

  contextPrototype.closePath = function() {
    this.currentPath_.push({type: 'close'});
  };

  /**
   * @private
   */
  contextPrototype.getCoords_ = function(aX, aY) {
    var m = this.m_;
    return {
      x: Z * (aX * m[0][0] + aY * m[1][0] + m[2][0]) - Z2,
      y: Z * (aX * m[0][1] + aY * m[1][1] + m[2][1]) - Z2
    }
  };

  contextPrototype.save = function() {
    var o = {};
    copyState(this, o);
    this.aStack_.push(o);
    this.mStack_.push(this.m_);
    this.m_ = matrixMultiply(createMatrixIdentity(), this.m_);
  };

  contextPrototype.restore = function() {
    copyState(this.aStack_.pop(), this);
    this.m_ = this.mStack_.pop();
  };

  function matrixIsFinite(m) {
    for (var j = 0; j < 3; j++) {
      for (var k = 0; k < 2; k++) {
        if (!isFinite(m[j][k]) || isNaN(m[j][k])) {
          return false;
        }
      }
    }
    return true;
  }

  function setM(ctx, m, updateLineScale) {
    if (!matrixIsFinite(m)) {
      return;
    }
    ctx.m_ = m;

    if (updateLineScale) {
      // Get the line scale.
      // Determinant of this.m_ means how much the area is enlarged by the
      // transformation. So its square root can be used as a scale factor
      // for width.
      var det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
      ctx.lineScale_ = sqrt(abs(det));
    }
  }

  contextPrototype.translate = function(aX, aY) {
    var m1 = [
      [1,  0,  0],
      [0,  1,  0],
      [aX, aY, 1]
    ];

    setM(this, matrixMultiply(m1, this.m_), false);
  };

  contextPrototype.rotate = function(aRot) {
    var c = mc(aRot);
    var s = ms(aRot);

    var m1 = [
      [c,  s, 0],
      [-s, c, 0],
      [0,  0, 1]
    ];

    setM(this, matrixMultiply(m1, this.m_), false);
  };

  contextPrototype.scale = function(aX, aY) {
    this.arcScaleX_ *= aX;
    this.arcScaleY_ *= aY;
    var m1 = [
      [aX, 0,  0],
      [0,  aY, 0],
      [0,  0,  1]
    ];

    setM(this, matrixMultiply(m1, this.m_), true);
  };

  contextPrototype.transform = function(m11, m12, m21, m22, dx, dy) {
    var m1 = [
      [m11, m12, 0],
      [m21, m22, 0],
      [dx,  dy,  1]
    ];

    setM(this, matrixMultiply(m1, this.m_), true);
  };

  contextPrototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
    var m = [
      [m11, m12, 0],
      [m21, m22, 0],
      [dx,  dy,  1]
    ];

    setM(this, m, true);
  };

  /******** STUBS ********/
  contextPrototype.clip = function() {
    // TODO: Implement
  };

  contextPrototype.arcTo = function() {
    // TODO: Implement
  };

  contextPrototype.createPattern = function() {
    return new CanvasPattern_;
  };

  // Gradient / Pattern Stubs
  function CanvasGradient_(aType) {
    this.type_ = aType;
    this.x0_ = 0;
    this.y0_ = 0;
    this.r0_ = 0;
    this.x1_ = 0;
    this.y1_ = 0;
    this.r1_ = 0;
    this.colors_ = [];
  }

  CanvasGradient_.prototype.addColorStop = function(aOffset, aColor) {
    aColor = processStyle(aColor);
    this.colors_.push({offset: aOffset,
                       color: aColor.color,
                       alpha: aColor.alpha});
  };

  function CanvasPattern_() {}

  // set up externs
  G_vmlCanvasManager = G_vmlCanvasManager_;
  CanvasRenderingContext2D = CanvasRenderingContext2D_;
  CanvasGradient = CanvasGradient_;
  CanvasPattern = CanvasPattern_;

})();

} // if
/*
 * @name BeautyTips
 * @desc a tooltips/baloon-help plugin for jQuery
 *
 * @author Jeff Robbins - Lullabot - http://www.lullabot.com
 * @version 0.9.5-rc1  (5/20/2009)
 */
jQuery.bt={version:"0.9.5-rc1"};(function($){jQuery.fn.bt=function(content,options){if(typeof content!="string"){var contentSelect=true;options=content;content=false;}else{var contentSelect=false;}if(jQuery.fn.hoverIntent&&jQuery.bt.defaults.trigger=="hover"){jQuery.bt.defaults.trigger="hoverIntent";}return this.each(function(index){var opts=jQuery.extend(false,jQuery.bt.defaults,jQuery.bt.options,options);opts.spikeLength=numb(opts.spikeLength);opts.spikeGirth=numb(opts.spikeGirth);opts.overlap=numb(opts.overlap);var ajaxTimeout=false;if(opts.killTitle){$(this).find("[title]").andSelf().each(function(){if(!$(this).attr("bt-xTitle")){$(this).attr("bt-xTitle",$(this).attr("title")).attr("title","");}});}if(typeof opts.trigger=="string"){opts.trigger=[opts.trigger];}if(opts.trigger[0]=="hoverIntent"){var hoverOpts=jQuery.extend(opts.hoverIntentOpts,{over:function(){this.btOn();},out:function(){this.btOff();}});$(this).hoverIntent(hoverOpts);}else{if(opts.trigger[0]=="hover"){$(this).hover(function(){this.btOn();},function(){this.btOff();});}else{if(opts.trigger[0]=="now"){if($(this).hasClass("bt-active")){this.btOff();}else{this.btOn();}}else{if(opts.trigger[0]=="none"){}else{if(opts.trigger.length>1&&opts.trigger[0]!=opts.trigger[1]){$(this).bind(opts.trigger[0],function(){this.btOn();}).bind(opts.trigger[1],function(){this.btOff();});}else{$(this).bind(opts.trigger[0],function(){if($(this).hasClass("bt-active")){this.btOff();}else{this.btOn();}});}}}}}this.btOn=function(){if(typeof $(this).data("bt-box")=="object"){this.btOff();}opts.preBuild.apply(this);$(jQuery.bt.vars.closeWhenOpenStack).btOff();$(this).addClass("bt-active "+opts.activeClass);if(contentSelect&&opts.ajaxPath==null){if(opts.killTitle){$(this).attr("title",$(this).attr("bt-xTitle"));}content=$.isFunction(opts.contentSelector)?opts.contentSelector.apply(this):eval(opts.contentSelector);if(opts.killTitle){$(this).attr("title","");}}if(opts.ajaxPath!=null&&content==false){if(typeof opts.ajaxPath=="object"){var url=eval(opts.ajaxPath[0]);url+=opts.ajaxPath[1]?" "+opts.ajaxPath[1]:"";}else{var url=opts.ajaxPath;}var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}var cacheData=opts.ajaxCache?$(document.body).data("btCache-"+url.replace(/\./g,"")):null;if(typeof cacheData=="string"){content=selector?$("<div/>").append(cacheData.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):cacheData;}else{var target=this;var ajaxOpts=jQuery.extend(false,{type:opts.ajaxType,data:opts.ajaxData,cache:opts.ajaxCache,url:url,complete:function(XMLHttpRequest,textStatus){if(textStatus=="success"||textStatus=="notmodified"){if(opts.ajaxCache){$(document.body).data("btCache-"+url.replace(/\./g,""),XMLHttpRequest.responseText);}ajaxTimeout=false;content=selector?$("<div/>").append(XMLHttpRequest.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):XMLHttpRequest.responseText;}else{if(textStatus=="timeout"){ajaxTimeout=true;}content=opts.ajaxError.replace(/%error/g,XMLHttpRequest.statusText);}if($(target).hasClass("bt-active")){target.btOn();}}},opts.ajaxOpts);jQuery.ajax(ajaxOpts);content=opts.ajaxLoading;}}var shadowMarginX=0;var shadowMarginY=0;var shadowShiftX=0;var shadowShiftY=0;if(opts.shadow&&!shadowSupport()){opts.shadow=false;jQuery.extend(opts,opts.noShadowOpts);}if(opts.shadow){if(opts.shadowBlur>Math.abs(opts.shadowOffsetX)){shadowMarginX=opts.shadowBlur*2;}else{shadowMarginX=opts.shadowBlur+Math.abs(opts.shadowOffsetX);}shadowShiftX=(opts.shadowBlur-opts.shadowOffsetX)>0?opts.shadowBlur-opts.shadowOffsetX:0;if(opts.shadowBlur>Math.abs(opts.shadowOffsetY)){shadowMarginY=opts.shadowBlur*2;}else{shadowMarginY=opts.shadowBlur+Math.abs(opts.shadowOffsetY);}shadowShiftY=(opts.shadowBlur-opts.shadowOffsetY)>0?opts.shadowBlur-opts.shadowOffsetY:0;}if(opts.offsetParent){var offsetParent=$(opts.offsetParent);var offsetParentPos=offsetParent.offset();var pos=$(this).offset();var top=numb(pos.top)-numb(offsetParentPos.top)+numb($(this).css("margin-top"))-shadowShiftY;var left=numb(pos.left)-numb(offsetParentPos.left)+numb($(this).css("margin-left"))-shadowShiftX;}else{var offsetParent=($(this).css("position")=="absolute")?$(this).parents().eq(0).offsetParent():$(this).offsetParent();var pos=$(this).btPosition();var top=numb(pos.top)+numb($(this).css("margin-top"))-shadowShiftY;var left=numb(pos.left)+numb($(this).css("margin-left"))-shadowShiftX;}var width=$(this).btOuterWidth();var height=$(this).outerHeight();if(typeof content=="object"){var original=content;var clone=$(original).clone(true).show();var origClones=$(original).data("bt-clones")||[];origClones.push(clone);$(original).data("bt-clones",origClones);$(clone).data("bt-orig",original);$(this).data("bt-content-orig",{original:original,clone:clone});content=clone;}if(typeof content=="null"||content==""){return;}var $text=$('<div class="bt-content"></div>').append(content).css({padding:opts.padding,position:"absolute",width:(opts.shrinkToFit?"auto":opts.width),zIndex:opts.textzIndex,left:shadowShiftX,top:shadowShiftY}).css(opts.cssStyles);var $box=$('<div class="bt-wrapper"></div>').append($text).addClass(opts.cssClass).css({position:"absolute",width:opts.width,zIndex:opts.wrapperzIndex,visibility:"hidden"}).appendTo(offsetParent);if(jQuery.fn.bgiframe){$text.bgiframe();$box.bgiframe();}$(this).data("bt-box",$box);var scrollTop=numb($(document).scrollTop());var scrollLeft=numb($(document).scrollLeft());var docWidth=numb($(window).width());var docHeight=numb($(window).height());var winRight=scrollLeft+docWidth;var winBottom=scrollTop+docHeight;var space=new Object();var thisOffset=$(this).offset();space.top=thisOffset.top-scrollTop;space.bottom=docHeight-((thisOffset+height)-scrollTop);space.left=thisOffset.left-scrollLeft;space.right=docWidth-((thisOffset.left+width)-scrollLeft);var textOutHeight=numb($text.outerHeight());var textOutWidth=numb($text.btOuterWidth());if(opts.positions.constructor==String){opts.positions=opts.positions.replace(/ /,"").split(",");}if(opts.positions[0]=="most"){var position="top";for(var pig in space){position=space[pig]>space[position]?pig:position;}}else{for(var x in opts.positions){var position=opts.positions[x];if((position=="left"||position=="right")&&space[position]>textOutWidth+opts.spikeLength){break;}else{if((position=="top"||position=="bottom")&&space[position]>textOutHeight+opts.spikeLength){break;}}}}var horiz=left+((width-textOutWidth)*0.5);var vert=top+((height-textOutHeight)*0.5);var points=new Array();var textTop,textLeft,textRight,textBottom,textTopSpace,textBottomSpace,textLeftSpace,textRightSpace,crossPoint,textCenter,spikePoint;switch(position){case"top":$text.css("margin-bottom",opts.spikeLength+"px");$box.css({top:(top-$text.outerHeight(true))+opts.overlap,left:horiz});textRightSpace=(winRight-opts.windowMargin)-($text.offset().left+$text.btOuterWidth(true));var xShift=shadowShiftX;if(textRightSpace<0){$box.css("left",(numb($box.css("left"))+textRightSpace)+"px");xShift-=textRightSpace;}textLeftSpace=($text.offset().left+numb($text.css("margin-left")))-(scrollLeft+opts.windowMargin);if(textLeftSpace<0){$box.css("left",(numb($box.css("left"))-textLeftSpace)+"px");xShift+=textLeftSpace;}textTop=$text.btPosition().top+numb($text.css("margin-top"));textLeft=$text.btPosition().left+numb($text.css("margin-left"));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={y:textBottom+opts.spikeLength,x:((textRight-textLeft)*0.5)+xShift,type:"spike"};crossPoint=findIntersectX(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textBottom);crossPoint.x=crossPoint.x<textLeft+opts.spikeGirth/2+opts.cornerRadius?textLeft+opts.spikeGirth/2+opts.cornerRadius:crossPoint.x;crossPoint.x=crossPoint.x>(textRight-opts.spikeGirth/2)-opts.cornerRadius?(textRight-opts.spikeGirth/2)-opts.CornerRadius:crossPoint.x;points[points.length]={x:crossPoint.x-(opts.spikeGirth/2),y:textBottom,type:"join"};points[points.length]={x:textLeft,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:textTop,type:"corner"};points[points.length]={x:textRight,y:textTop,type:"corner"};points[points.length]={x:textRight,y:textBottom,type:"corner"};points[points.length]={x:crossPoint.x+(opts.spikeGirth/2),y:textBottom,type:"join"};points[points.length]=spikePoint;break;case"left":$text.css("margin-right",opts.spikeLength+"px");$box.css({top:vert+"px",left:((left-$text.btOuterWidth(true))+opts.overlap)+"px"});textBottomSpace=(winBottom-opts.windowMargin)-($text.offset().top+$text.outerHeight(true));var yShift=shadowShiftY;if(textBottomSpace<0){$box.css("top",(numb($box.css("top"))+textBottomSpace)+"px");yShift-=textBottomSpace;}textTopSpace=($text.offset().top+numb($text.css("margin-top")))-(scrollTop+opts.windowMargin);if(textTopSpace<0){$box.css("top",(numb($box.css("top"))-textTopSpace)+"px");yShift+=textTopSpace;}textTop=$text.btPosition().top+numb($text.css("margin-top"));textLeft=$text.btPosition().left+numb($text.css("margin-left"));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={x:textRight+opts.spikeLength,y:((textBottom-textTop)*0.5)+yShift,type:"spike"};crossPoint=findIntersectY(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textRight);crossPoint.y=crossPoint.y<textTop+opts.spikeGirth/2+opts.cornerRadius?textTop+opts.spikeGirth/2+opts.cornerRadius:crossPoint.y;crossPoint.y=crossPoint.y>(textBottom-opts.spikeGirth/2)-opts.cornerRadius?(textBottom-opts.spikeGirth/2)-opts.cornerRadius:crossPoint.y;points[points.length]={x:textRight,y:crossPoint.y+opts.spikeGirth/2,type:"join"};points[points.length]={x:textRight,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:textTop,type:"corner"};points[points.length]={x:textRight,y:textTop,type:"corner"};points[points.length]={x:textRight,y:crossPoint.y-opts.spikeGirth/2,type:"join"};points[points.length]=spikePoint;break;case"bottom":$text.css("margin-top",opts.spikeLength+"px");$box.css({top:(top+height)-opts.overlap,left:horiz});textRightSpace=(winRight-opts.windowMargin)-($text.offset().left+$text.btOuterWidth(true));var xShift=shadowShiftX;if(textRightSpace<0){$box.css("left",(numb($box.css("left"))+textRightSpace)+"px");xShift-=textRightSpace;}textLeftSpace=($text.offset().left+numb($text.css("margin-left")))-(scrollLeft+opts.windowMargin);if(textLeftSpace<0){$box.css("left",(numb($box.css("left"))-textLeftSpace)+"px");xShift+=textLeftSpace;}textTop=$text.btPosition().top+numb($text.css("margin-top"));textLeft=$text.btPosition().left+numb($text.css("margin-left"));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={x:((textRight-textLeft)*0.5)+xShift,y:shadowShiftY,type:"spike"};crossPoint=findIntersectX(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textTop);crossPoint.x=crossPoint.x<textLeft+opts.spikeGirth/2+opts.cornerRadius?textLeft+opts.spikeGirth/2+opts.cornerRadius:crossPoint.x;crossPoint.x=crossPoint.x>(textRight-opts.spikeGirth/2)-opts.cornerRadius?(textRight-opts.spikeGirth/2)-opts.cornerRadius:crossPoint.x;points[points.length]={x:crossPoint.x+opts.spikeGirth/2,y:textTop,type:"join"};points[points.length]={x:textRight,y:textTop,type:"corner"};points[points.length]={x:textRight,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:textTop,type:"corner"};points[points.length]={x:crossPoint.x-(opts.spikeGirth/2),y:textTop,type:"join"};points[points.length]=spikePoint;break;case"right":$text.css("margin-left",(opts.spikeLength+"px"));$box.css({top:vert+"px",left:((left+width)-opts.overlap)+"px"});textBottomSpace=(winBottom-opts.windowMargin)-($text.offset().top+$text.outerHeight(true));var yShift=shadowShiftY;if(textBottomSpace<0){$box.css("top",(numb($box.css("top"))+textBottomSpace)+"px");yShift-=textBottomSpace;}textTopSpace=($text.offset().top+numb($text.css("margin-top")))-(scrollTop+opts.windowMargin);if(textTopSpace<0){$box.css("top",(numb($box.css("top"))-textTopSpace)+"px");yShift+=textTopSpace;}textTop=$text.btPosition().top+numb($text.css("margin-top"));textLeft=$text.btPosition().left+numb($text.css("margin-left"));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={x:shadowShiftX,y:((textBottom-textTop)*0.5)+yShift,type:"spike"};crossPoint=findIntersectY(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textLeft);crossPoint.y=crossPoint.y<textTop+opts.spikeGirth/2+opts.cornerRadius?textTop+opts.spikeGirth/2+opts.cornerRadius:crossPoint.y;crossPoint.y=crossPoint.y>(textBottom-opts.spikeGirth/2)-opts.cornerRadius?(textBottom-opts.spikeGirth/2)-opts.cornerRadius:crossPoint.y;points[points.length]={x:textLeft,y:crossPoint.y-opts.spikeGirth/2,type:"join"};points[points.length]={x:textLeft,y:textTop,type:"corner"};points[points.length]={x:textRight,y:textTop,type:"corner"};points[points.length]={x:textRight,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:crossPoint.y+opts.spikeGirth/2,type:"join"};points[points.length]=spikePoint;break;}var canvas=document.createElement("canvas");$(canvas).attr("width",(numb($text.btOuterWidth(true))+opts.strokeWidth*2+shadowMarginX)).attr("height",(numb($text.outerHeight(true))+opts.strokeWidth*2+shadowMarginY)).appendTo($box).css({position:"absolute",zIndex:opts.boxzIndex});if(typeof G_vmlCanvasManager!="undefined"){canvas=G_vmlCanvasManager.initElement(canvas);}if(opts.cornerRadius>0){var newPoints=new Array();var newPoint;for(var i=0;i<points.length;i++){if(points[i].type=="corner"){newPoint=betweenPoint(points[i],points[(i-1)%points.length],opts.cornerRadius);newPoint.type="arcStart";newPoints[newPoints.length]=newPoint;newPoints[newPoints.length]=points[i];newPoint=betweenPoint(points[i],points[(i+1)%points.length],opts.cornerRadius);newPoint.type="arcEnd";newPoints[newPoints.length]=newPoint;}else{newPoints[newPoints.length]=points[i];}}points=newPoints;}var ctx=canvas.getContext("2d");if(opts.shadow&&opts.shadowOverlap!==true){var shadowOverlap=numb(opts.shadowOverlap);switch(position){case"top":if(opts.shadowOffsetX+opts.shadowBlur-shadowOverlap>0){$box.css("top",(numb($box.css("top"))-(opts.shadowOffsetX+opts.shadowBlur-shadowOverlap)));}break;case"right":if(shadowShiftX-shadowOverlap>0){$box.css("left",(numb($box.css("left"))+shadowShiftX-shadowOverlap));}break;case"bottom":if(shadowShiftY-shadowOverlap>0){$box.css("top",(numb($box.css("top"))+shadowShiftY-shadowOverlap));}break;case"left":if(opts.shadowOffsetY+opts.shadowBlur-shadowOverlap>0){$box.css("left",(numb($box.css("left"))-(opts.shadowOffsetY+opts.shadowBlur-shadowOverlap)));}break;}}drawIt.apply(ctx,[points],opts.strokeWidth);ctx.fillStyle=opts.fill;if(opts.shadow){ctx.shadowOffsetX=opts.shadowOffsetX;ctx.shadowOffsetY=opts.shadowOffsetY;ctx.shadowBlur=opts.shadowBlur;ctx.shadowColor=opts.shadowColor;}ctx.closePath();ctx.fill();if(opts.strokeWidth>0){ctx.shadowColor="rgba(0, 0, 0, 0)";ctx.lineWidth=opts.strokeWidth;ctx.strokeStyle=opts.strokeStyle;ctx.beginPath();drawIt.apply(ctx,[points],opts.strokeWidth);ctx.closePath();ctx.stroke();}opts.preShow.apply(this,[$box[0]]);$box.css({display:"none",visibility:"visible"});opts.showTip.apply(this,[$box[0]]);if(opts.overlay){var overlay=$('<div class="bt-overlay"></div>').css({position:"absolute",backgroundColor:"blue",top:top,left:left,width:width,height:height,opacity:".2"}).appendTo(offsetParent);$(this).data("overlay",overlay);}if((opts.ajaxPath!=null&&opts.ajaxCache==false)||ajaxTimeout){content=false;}if(opts.clickAnywhereToClose){jQuery.bt.vars.clickAnywhereStack.push(this);$(document).click(jQuery.bt.docClick);}if(opts.closeWhenOthersOpen){jQuery.bt.vars.closeWhenOpenStack.push(this);}opts.postShow.apply(this,[$box[0]]);};this.btOff=function(){var box=$(this).data("bt-box");opts.preHide.apply(this,[box]);var i=this;i.btCleanup=function(){var box=$(i).data("bt-box");var contentOrig=$(i).data("bt-content-orig");var overlay=$(i).data("bt-overlay");if(typeof box=="object"){$(box).remove();$(i).removeData("bt-box");}if(typeof contentOrig=="object"){var clones=$(contentOrig.original).data("bt-clones");$(contentOrig).data("bt-clones",arrayRemove(clones,contentOrig.clone));}if(typeof overlay=="object"){$(overlay).remove();$(i).removeData("bt-overlay");}jQuery.bt.vars.clickAnywhereStack=arrayRemove(jQuery.bt.vars.clickAnywhereStack,i);jQuery.bt.vars.closeWhenOpenStack=arrayRemove(jQuery.bt.vars.closeWhenOpenStack,i);$(i).removeClass("bt-active "+opts.activeClass);opts.postHide.apply(i);};opts.hideTip.apply(this,[box,i.btCleanup]);};var refresh=this.btRefresh=function(){this.btOff();this.btOn();};});function drawIt(points,strokeWidth){this.moveTo(points[0].x,points[0].y);for(i=1;i<points.length;i++){if(points[i-1].type=="arcStart"){this.quadraticCurveTo(round5(points[i].x,strokeWidth),round5(points[i].y,strokeWidth),round5(points[(i+1)%points.length].x,strokeWidth),round5(points[(i+1)%points.length].y,strokeWidth));i++;}else{this.lineTo(round5(points[i].x,strokeWidth),round5(points[i].y,strokeWidth));}}}function round5(num,strokeWidth){var ret;strokeWidth=numb(strokeWidth);if(strokeWidth%2){ret=num;}else{ret=Math.round(num-0.5)+0.5;}return ret;}function numb(num){return parseInt(num)||0;}function arrayRemove(arr,elem){var x,newArr=new Array();for(x in arr){if(arr[x]!=elem){newArr.push(arr[x]);}}return newArr;}function canvasSupport(){var canvas_compatible=false;try{canvas_compatible=!!(document.createElement("canvas").getContext("2d"));}catch(e){canvas_compatible=!!(document.createElement("canvas").getContext);}return canvas_compatible;}function shadowSupport(){try{var userAgent=navigator.userAgent.toLowerCase();if(/webkit/.test(userAgent)){return true;}else{if(/gecko|mozilla/.test(userAgent)&&parseFloat(userAgent.match(/firefox\/(\d+(?:\.\d+)+)/)[1])>=3.1){return true;}}}catch(err){}return false;}function betweenPoint(point1,point2,dist){var y,x;if(point1.x==point2.x){y=point1.y<point2.y?point1.y+dist:point1.y-dist;return{x:point1.x,y:y};}else{if(point1.y==point2.y){x=point1.x<point2.x?point1.x+dist:point1.x-dist;return{x:x,y:point1.y};}}}function centerPoint(arcStart,corner,arcEnd){var x=corner.x==arcStart.x?arcEnd.x:arcStart.x;var y=corner.y==arcStart.y?arcEnd.y:arcStart.y;var startAngle,endAngle;if(arcStart.x<arcEnd.x){if(arcStart.y>arcEnd.y){startAngle=(Math.PI/180)*180;endAngle=(Math.PI/180)*90;}else{startAngle=(Math.PI/180)*90;endAngle=0;}}else{if(arcStart.y>arcEnd.y){startAngle=(Math.PI/180)*270;endAngle=(Math.PI/180)*180;}else{startAngle=0;endAngle=(Math.PI/180)*270;}}return{x:x,y:y,type:"center",startAngle:startAngle,endAngle:endAngle};}function findIntersect(r1x1,r1y1,r1x2,r1y2,r2x1,r2y1,r2x2,r2y2){if(r2x1==r2x2){return findIntersectY(r1x1,r1y1,r1x2,r1y2,r2x1);}if(r2y1==r2y2){return findIntersectX(r1x1,r1y1,r1x2,r1y2,r2y1);}var r1m=(r1y1-r1y2)/(r1x1-r1x2);var r1b=r1y1-(r1m*r1x1);var r2m=(r2y1-r2y2)/(r2x1-r2x2);var r2b=r2y1-(r2m*r2x1);var x=(r2b-r1b)/(r1m-r2m);var y=r1m*x+r1b;return{x:x,y:y};}function findIntersectY(r1x1,r1y1,r1x2,r1y2,x){if(r1y1==r1y2){return{x:x,y:r1y1};}var r1m=(r1y1-r1y2)/(r1x1-r1x2);var r1b=r1y1-(r1m*r1x1);var y=r1m*x+r1b;return{x:x,y:y};}function findIntersectX(r1x1,r1y1,r1x2,r1y2,y){if(r1x1==r1x2){return{x:r1x1,y:y};}var r1m=(r1y1-r1y2)/(r1x1-r1x2);var r1b=r1y1-(r1m*r1x1);var x=(y-r1b)/r1m;return{x:x,y:y};}};jQuery.fn.btPosition=function(){function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0;}var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,"marginTop");offset.left-=num(this,"marginLeft");parentOffset.top+=num(offsetParent,"borderTopWidth");parentOffset.left+=num(offsetParent,"borderLeftWidth");results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}return results;};jQuery.fn.btOuterWidth=function(margin){function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0;}return this["innerWidth"]()+num(this,"borderLeftWidth")+num(this,"borderRightWidth")+(margin?num(this,"marginLeft")+num(this,"marginRight"):0);};jQuery.fn.btOn=function(){return this.each(function(index){if(jQuery.isFunction(this.btOn)){this.btOn();}});};jQuery.fn.btOff=function(){return this.each(function(index){if(jQuery.isFunction(this.btOff)){this.btOff();}});};jQuery.bt.vars={clickAnywhereStack:[],closeWhenOpenStack:[]};jQuery.bt.docClick=function(e){if(!e){var e=window.event;}if(!$(e.target).parents().andSelf().filter(".bt-wrapper, .bt-active").length&&jQuery.bt.vars.clickAnywhereStack.length){$(jQuery.bt.vars.clickAnywhereStack).btOff();$(document).unbind("click",jQuery.bt.docClick);}};jQuery.bt.defaults={trigger:"hover",clickAnywhereToClose:true,closeWhenOthersOpen:false,shrinkToFit:false,width:"200px",padding:"10px",spikeGirth:10,spikeLength:15,overlap:0,overlay:false,killTitle:true,textzIndex:9999,boxzIndex:9998,wrapperzIndex:9997,offsetParent:null,positions:["most"],fill:"rgb(255, 255, 102)",windowMargin:10,strokeWidth:1,strokeStyle:"#000",cornerRadius:5,centerPointX:0.5,centerPointY:0.5,shadow:false,shadowOffsetX:2,shadowOffsetY:2,shadowBlur:3,shadowColor:"#000",shadowOverlap:false,noShadowOpts:{strokeStyle:"#999"},cssClass:"",cssStyles:{},activeClass:"bt-active",contentSelector:"$(this).attr('title')",ajaxPath:null,ajaxError:"<strong>ERROR:</strong> <em>%error</em>",ajaxLoading:"<blink>Loading...</blink>",ajaxData:{},ajaxType:"GET",ajaxCache:true,ajaxOpts:{},preBuild:function(){},preShow:function(box){},showTip:function(box){$(box).show();},postShow:function(box){},preHide:function(box){},hideTip:function(box,callback){$(box).hide();callback();},postHide:function(){},hoverIntentOpts:{interval:300,timeout:500}};jQuery.bt.options={};})(jQuery);/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 *//*
 * ContextMenu - jQuery plugin for right-click context menus
 *
 * Author: Chris Domigan
 * Contributors: Dan G. Switzer, II
 * Parts of this plugin are inspired by Joern Zaefferer's Tooltip plugin
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Version: r2
 * Date: 16 July 2007
 *
 * For documentation visit http://www.trendskitchens.co.nz/jquery/contextmenu/
 *
 */

(function($) {

 	var menu, shadow, trigger, content, hash, currentTarget;
  var defaults = {
    menuStyle: {
      listStyle: 'none',
      padding: '1px',
      margin: '0px',
      backgroundColor: '#fff',
      border: '1px solid #999',
      width: '90px',
      filter:"alpha(opacity=80)"
    },
    itemStyle: {
      margin: '0px',
      color: '#000',
      display: 'block',
      cursor: 'default',
      padding: '3px',
      border: '1px solid #fff',
      backgroundColor: 'transparent',
      "font-size":"13px"
    },
    itemHoverStyle: {
      backgroundColor: '#3d95d5',
      color:"#FFFFFF"
      //filter:"progid:DXImageTransform.Microsoft.Gradient(gradientType=1,startColorStr=#3d95d5,endColorStr=#ffffff)"
    },
    eventPosX: 'pageX',
    eventPosY: 'pageY',
    shadow : true,
    onContextMenu: null,
    onShowMenu: null
 	};

  $.fn.contextMenu = function(id, options) {
    if (!menu) {                                      // Create singleton menu
      menu = $('<div id="jqContextMenu"></div>')
               .hide()
               .css({position:'absolute', zIndex:'500'})
               .appendTo('body')
               .bind('click', function(e) {
                 e.stopPropagation();
               });
    }
    if (!shadow) {
      shadow = $('<div></div>')
                 .css({backgroundColor:'#000',position:'absolute',opacity:0.2,zIndex:499})
                 .appendTo('body')
                 .hide();
    }
    hash = hash || [];
    hash.push({
      id : id,
      menuStyle: $.extend({}, defaults.menuStyle, options.menuStyle || {}),
      itemStyle: $.extend({}, defaults.itemStyle, options.itemStyle || {}),
      itemHoverStyle: $.extend({}, defaults.itemHoverStyle, options.itemHoverStyle || {}),
      bindings: options.bindings || {},
      shadow: options.shadow || options.shadow === false ? options.shadow : defaults.shadow,
      onContextMenu: options.onContextMenu || defaults.onContextMenu,
      onShowMenu: options.onShowMenu || defaults.onShowMenu,
      eventPosX: options.eventPosX || defaults.eventPosX,
      eventPosY: options.eventPosY || defaults.eventPosY
    });

    var index = hash.length - 1;
    $(this).bind('contextmenu', function(e) {
      // Check if onContextMenu() defined
      var bShowContext = (!!hash[index].onContextMenu) ? hash[index].onContextMenu(e) : true;
      if (bShowContext) display(index, this, e, options);
      var last = $(menu).find("li:last");
      if(options.isRefresh){last.show();shadow.height(menu.height());}else {last.hide();shadow.height(menu.height());};
      return false;
    });
    return this;
  };

  function display(index, trigger, e, options) {
    var cur = hash[index];
    content = $('#'+cur.id).find('ul:first').clone(true);
    content.css(cur.menuStyle).find('li').css(cur.itemStyle).hover(
      function() {
        $(this).css(cur.itemHoverStyle);
      },
      function(){
        $(this).css(cur.itemStyle);
      }
    ).find('img').css({verticalAlign:'middle',paddingRight:'2px',width:"14px",height:"14px"});

    // Send the content to the menu
    menu.html(content);

    // if there's an onShowMenu, run it now -- must run after content has been added
		// if you try to alter the content variable before the menu.html(), IE6 has issues
		// updating the content
    if (!!cur.onShowMenu) menu = cur.onShowMenu(e, menu);

    $.each(cur.bindings, function(id, func) {
      $('#'+id, menu).bind('click', function(e) {
        hide();
        func(trigger, currentTarget);
      });
    });

    menu.css({'left':e[cur.eventPosX],'top':e[cur.eventPosY]}).show();
    if (cur.shadow) shadow.css({width:menu.width(),height:menu.height(),left:e.pageX+2,top:e.pageY+2}).show();
    $(document).one('click', hide);
  }

  function hide() {
    menu.hide();
    shadow.hide();
  }

  // Apply defaults
  $.contextMenu = {
    defaults : function(userDefaults) {
      $.each(userDefaults, function(i, val) {
        if (typeof val == 'object' && defaults[i]) {
          $.extend(defaults[i], val);
        }
        else defaults[i] = val;
      });
    }
  };

})(jQuery);

$(function() {
  $('div.contextMenu').hide();
});/**
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