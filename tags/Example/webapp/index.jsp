<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
  </head>
  
  <body>
   <script type="text/javascript">
   var contextPath = "<%=path%>";// 关键的地方
   </script>
  <script type="text/javascript" charset="UTF-8" src="JsonRpcClient.js"></script>
   <script type="text/javascript">
   function fnTest()
   {
      var i,a, o, k, myrpc = rpc.MyTestRpc;
      alert(myrpc.getTestMsg());
      a = myrpc.testGetList();
      for(i = 0; i < a.length; i++)
      {
         o = a[i];
         for(k in o)
         {
            alert(k + " = " + o[k]);
         }
      }
   }
   
   </script>
   <input name="mytest1">
   <input name="mytest2">
   <input name="mytest3">
   <button onclick=fnTest()>test</button>
  </body>
</html>