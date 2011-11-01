function fnGetPWin()
{
  var w = window;
  if(w.g_myTPWin)return g_myTPWin;
  try
  {
      while(w.opener || w.dialogArguments)
      {
        w = (w.dialogArguments || w.opener || w).top;
        if(w.g_myTPWin)return w.g_myTPWin
       }
   }catch(e){}
   return w.top
}
top.g_myTPWin = window.g_myTPWin = top.g_myTPWin || fnGetPWin();
try{
top.printWin = window.printWin = top.printWin  || (top.g_myTPWin.printWin || top.printWin || g_myTPWin.frames["prtFrm"]);
top.mWin = window.mWin = top.mWin || g_myTPWin.frames["bottom_frame"];
}catch(e){}
var xfc = function(s)
   {
      document.write('<link rel=stylesheet href="'+s+(-1 == s.indexOf("?") ? "?" : "&") +'jsessionid='+g_szJsessionid+'" type=text/css>')
    },xui = function(s)
    {
      document.write("<script charset=UTF-8 src='"+s+(-1 == s.indexOf("?") ? "?" : "&") +"jsessionid="+g_szJsessionid+"'></scr"+"ipt>")
    };
function fnOutJs(s)
{
  var a = s.split(/[;,]/), i, o = {};
  for(i = 0; i < a.length; i++)
  {
     if(o[a[i]] || 0 == a[i].length)continue;
     xui(g_sysInfo[0] + a[i]);
     o[a[i]] = 1;
  }
}
function fnOutCss(s, sp)
{
  var a = s.split(/[;,]/), i, o = {};
  for(i = 0; i < a.length; i++)
  {
     if(o[a[i]] || 0 == a[i].length)continue;
     xfc(g_sysInfo[1] + a[i]);
     o[a[i]] = 1;
  }
}
function fnSetGlb()
{
   var a = [], i = 0;
   Array.prototype.push.apply(a,arguments);
   top.g_szJsessionid = window.g_szJsessionid = a[i++];
   top.g_bDebug = window.g_bDebug = a[i++];
   top.g_bMenu = window.g_bMenu = a[i++];
   top.g_bUseBtn = window.g_bUseBtn = a[i++];
   top.g_bNoAutoResize = window.g_bNoAutoResize = a[i++];
   top.g_bNoTimeoutAlt = window.g_bNoTimeoutAlt = a[i++];
   top.contextPath = window.contextPath = a[i++];
   top.noLockPage = window.noLockPage = a[i++];
   top.g_sysInfo = window.g_sysInfo = a[i++];
   top.xuiInput = window.xuiInput = a[i++];
   top.slctHeight = window.slctHeight = a[i++];
   top.slctRowBgColor2 = window.slctRowBgColor2 = a[i++];
   top.pleaseSelect = window.pleaseSelect = a[i++];
   top.noPrint = window.noPrint = a[i++];
   top.hvOldVl = window.hvOldVl = a[i++];
   
}