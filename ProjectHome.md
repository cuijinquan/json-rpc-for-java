# 强荐友人新RPC框架 #

[来自java eye/it eye的1.0详细报道](http://www.iteye.com/news/22527)

```
特点是什么
1、JS2Java RPC：能够在javascript的web浏览器环境中指定java类，获取该类实例的属性，
调用该实例的方法

2、支持复杂js对象作为入参：能够传递复杂的JavaScript Object对象作为调用参数，
在java中得到对应的Map对象

3、自动压缩、解压传递的数据：调用过程中传递的数据自动进行压缩传输，后台自动解压，
然后转换为Map给开发人员；因此从一定层面上保护、加密了传输的数据

4、JS回调函数中能够接收java返回的复杂对象：java中可以返回复杂的对象，
比如Map、List，在javascript中对应为Object和Array

5、友好逐行数据输出并回调：java中可以将List逐行输出到浏览器中，
框架每接收到一条数据，能够自动回调给定的javascript方法，
从而实现数据流的逐行输出；
该接口继承与“com.ibatis.sqlmap.client.event.RowHandler”
因此很容易将ibatis的数据流逐行输出给浏览器，从而实现非常友好的数据加载方式

6、支持回调全异步（观察者模式）：所有的过程调用都采用异步方式，
可以指定回调函数，用来接收返回的对象，并进行其他处理

7、日志回调：L异步过程可以设置日志回调函数，让你掌控全过程

```

# 相关链接 #
继（本开源作者的书）《[JavaScript高级应用与实践](http://www.china-pub.com/39669)》之后推出的开源代码——json-rpc-for-java light AJAX framework：

[微博](http://weibo.com/11602011)
[作者csdn博客](http://blog.csdn.net/jxpath) | [作者新浪600多万次点击博客](http://blog.sina.com.cn/jcore) | [作者网站](http://m9m.3322.org)

[作者的经典博客(通过代理才可以访问，链接中已经包含代理http://jsonrpc.blogspot.com)](http://daili.bz/browse.php?u=Oi8vanNvbnJwYy5ibG9nc3BvdC5jb20v&b=13&f=norefer)


[作者强力推荐淘宝店](http://shop59667442.taobao.com)

[三维条码名片生成器(科技含量身份的象征)](http://xface.8800.org:88/index1.jsp)
# json-rpc常见问题 #
1、为什么json-rpc总是无法正确运行？

答：请检查你的所有Filter代码，其中不能有类似request.getParameter的代码，或者你根据头信息判断后再获取，例如来自json-rpc的请求，会有附加的头信息：CMHS
因为，本json-rpc会有request.getInputStream这样的代码，在这一的代码之前不能调用request.getParameter

# 支持的浏览器 #
IE6、IE7、IE8、FireFox(×)、Opera(×)、Safari(×)、Google Chrome(×)等等

目前应用验证环境：tomcat系列、jboss系列、weblogic系列等均有实际项目应用

hp unix、linux、windowsXP, win 2008,win7

# 已知使用本开源的部分项目 #
## 某软件公司 ##
```
天津档案信息管理系统
天津城乡居民医疗支付管理系统
（北京）宏观决策分析软件
中国天津人力资源管理信息系统
四川省金保工程
成都就业升级
广东揭阳大医保项目
阳江社保
广东异地医疗系统
贵港市城镇居民医疗保险管理系统
贵州省新农保信息管理系统
安顺金保工程
六盘水金保工程
贵州省劳动就业信息系统
延边州档案管理系统
吉林省新农保系统(吉林新农保乡村服务平台、公共服务平台)
吉林省省直档案系统
新农保的外网查询工程
长春社保管理信息系统(三版)
广元金保项目
随州市金保工程项目
咸宁市金保工程
荆州市金保工程
宝鸡新农保
西安一体化项目
成都市水务局升级改造项目
四川省脐血库管理系统
成都燃气项目管理系统
汶川公路震害信息查询系统
成都市人民防空办室行政审批系统
北碚区域卫生信息平台
青川县区域卫生信息平台
```

# 最新功能 #
1、异步调用支持传入复合对象作为异步方法的参数，例如：
rpc.XRpc.myFunc({aac002:345,kad:'good'});
Java中可以为Map或者JavaBean对象

2、增加防止对象成员变量引用自身导致的死循环递归堆栈溢出

3、增加直接访问父类属性、方法的功能

4、支持级联调用：返回java对象，继续调用该对象的方法

5、<font color='red>只要继承于jcore.jsonrpc.common.JsonRpcObject的json-rpc服务类，可以直接调用getAllInputParms()获得界面中所有输入对象的值</font'>

6、<font color='red>只要包名为jcore.jsonrpc.rpcobj可以不用注册【免注册】就可以直接调用，见后面示例</font'>

<h2>工程svn下载地址</h2>
<a href='http://json-rpc-for-java.googlecode.com/svn/trunk/'>http://json-rpc-for-java.googlecode.com/svn/trunk/</a>
<h2>示例工程下载地址</h2>
测试环境：MyEclipse、Jre1.4、tomcat 5.0<br>
如果你要测试，可以采用相应的环境，不一定要那么高版本的环境<br>
<br>
svn:<a href='http://json-rpc-for-java.googlecode.com/svn/tags/Example'>Example</a>

rar:<a href='http://json-rpc-for-java.googlecode.com/files/JsonRpcForJava3.2_sample.rar'>3.2example</a>

<h1>最新当前版本下载地址</h1>
<a href='http://json-rpc-for-java.googlecode.com/svn/trunk/JSON-RPC.jar'>JSON-RPC.jar(65.1 KB)</a> |<br>
<a href='http://json-rpc-for-java.googlecode.com/svn/trunk/JsonRpcClient.js'>JsonRpcClient.js(6.34 KB)</a> |<br>
<br>
<a href='http://json-rpc-for-java.googlecode.com/svn/tags/Example/lib/commons-logging-api.jar'>支持包：commons-logging.jar(51.6 KB)</a> |<br>
<a href='http://json-rpc-for-java.googlecode.com/svn/tags/Example/lib/commons-logging.jar'>支持包：commons-logging-api.jar(21.8 KB)</a> |<br>
<br>
<a href='https://json-rpc-for-java.googlecode.com/svn/trunk/JsonRpcClient_min.js'>JsonRpcClient_min.js(3.66 KB)</a> |<br>
<a href='http://json-rpc-for-java.googlecode.com/svn/trunk/JSON-RPC'>for Java使用说明.doc JSON-RPC for Java使用说明.doc</a> |<br>
<a href='http://json-rpc-for-java.googlecode.com/svn/trunk/JSON-RPC'>for Java使用说明.pdf JSON-RPC for Java使用说明.pdf</a>

<h1>概述</h1>
json-rpc-for-java，是仅仅不到100行的javascript代码和不到10个java文件实现的超级轻量级的通过<br>
javaScript快速调用java对象并返回任意对象的轻量级框架，并且支持级联调用，也就是说不需要额外<br>
的JavaScript编程，就可以通过javascript调用被注册的java对象并返回java对象，如果被返回的对象<br>
还有方法，这个在javascript中返回的java对象的变量，你还可以继续调用它的方法.....这就是这个轻<br>
量级json-rpc-for-java的神奇之处。<br>
当返回的是java对象List的时候，在javascript中体现为ArrayList，如果是Map，着体现为js中的<br>
Object，其他的和java中的调用基本相同。<br>
特殊的地方是，通过JS调用java对象方法的时候只能传入简单类型的参数，比<br>
如：String,int,float,long等。<br>
<br>
<h1>注意事项</h1>
如果你的java服务对象返回的是Object、Bean、Map或者自定义对象，不能有属性_name<i>、</i>id<i>，这两个属性被本框架内部使用</i>


<h1>json rpc for java的使用</h1>
请从http://code.google.com/p/json-rpc-for-java/downloads/list<br>
下载<br>
<br>
<br>
<a href='http://www.china-pub.com/39669'><img src='http://images.china-pub.com/ebook35001-40000/39669/zcover.jpg' /></a>

<h1>调用未注册和配置的类方法</h1>
1、	首先，被调用的类需要继承jcore.jsonrpc.common.JsonRpcObject或实现接口jcore.jsonrpc.common.face.IjsonRpcObject，并有默认的构造函数；<br>
例如：<br>
<pre><code><br>
package test.rpc;<br>
import jcore.jsonrpc.common.JsonRpcObject;<br>
public class MyTestRpc extends JsonRpcObject {<br>
	/**<br>
	 * 调用：rpc.getRpcObj('test.rpc.MyTestRpc').getTestMsg()<br>
	 * @return<br>
	 */<br>
	public String getTestMsg()<br>
	{<br>
		return "噢，成功了！";<br>
	}<br>
}<br>
</code></pre>
2、	JSP的JavaScript中调用的方式，例如：alert(rpc.getRpcObj('test.rpc.MyTestRpc').getTestMsg());<br>
<br>
或者<br>
1、	首先，被调用的类需要继承jcore.jsonrpc.common.JsonRpcObject或实现接口jcore.jsonrpc.common.face.IjsonRpcObject，并有默认的构造函数；<br>
例如：<br>
<pre><code>package jcore.jsonrpc.rpcobj; // 必须是jcore.jsonrpc.rpcobj包下才可以免注册<br>
import jcore.jsonrpc.common.JsonRpcObject;<br>
public class MyTestRpc extends JsonRpcObject {<br>
	/**      直接使用类名MyTestRpc就可以调用，如下：<br>
	 * 调用：rpc.MyTestRpc.getTestMsg()<br>
	 * @return<br>
	 */<br>
	public String getTestMsg()<br>
	{<br>
		return "噢，成功了！";<br>
	}<br>
}<br>
</code></pre>
2、	JSP的JavaScript中调用的方式，例如：alert(rpc.MyTestRpc.getTestMsg());<br>
<h1>推荐音乐</h1>
<h2>【水月洞天】片头曲曲名：绝世</h2>
词曲：唐健<br>
<br>
演唱：张克帆<br>
<br>
世间种种的诱惑　不惊不扰我清梦<br>
<blockquote>山高路远不绝我　追踪你绝美的笑容<br>
登高一呼时才懂　始终在为你心痛<br>
俯首对花影摇动　都是东风在捉弄</blockquote>

<blockquote>世间种种的迷惑　都是因你而猜错<br>
水光月光又交融　描述这朗朗的夜空<br>
生死到头的相从　似狂花落叶般从容<br>
当一切泯灭如梦　就在远山被绝世尘封</blockquote>

<blockquote>啊...<br>
水光月光又交融　描述这朗朗的夜空<br>
生死到头的相从　似狂花落叶般从容</blockquote>

<blockquote>啊...<br>
不扰我清梦　泯灭如梦<br>
都是东风在捉弄　像落叶般从容</blockquote>




Related Links<br>
<br>
Following the "JavaScript and Practice of advanced applications," after the introduction of open-source code - json-rpc-for-java light AJAX framework:<br>
<br>
Csdn blog authors | Author Sina more than 600 million hits blog | author site<br>
<br>
Browser support<br>
<br>
IE6, IE7, IE8, FireFox ?(×), Opera (×), Safari (×), Google Chrome (×), etc.<br>
<br>
Asynchronous call to support the introduction of asynchronous composite object as a method parameter<br>
<br>
Download svn project<br>
<br>
<a href='http://json-rpc-for-java.googlecode.com/svn/trunk/'>http://json-rpc-for-java.googlecode.com/svn/trunk/</a>

Download sample project<br>
<br>
Test environment: MyEclipse?, Jre1.4, tomcat 5.0 If you want to test the environment can be used, need not be so high version of the environment 2.8.1example<br>
<br>
Download the latest version of the current<br>
<br>
JSON-RPC.jar | JsonRpcClient.js<br>
<br>
Overview<br>
<br>
json-rpc-for-java, is only less than 100 lines of javascript code and less than 10 java files to achieve the adoption of the super-lightweight java objects javaScript quick call and return to the lightweight arbitrary object framework, and support level joint call, which means no additional JavaScript? programming, they can be registered through the javascript to call the java object and return java object, the object is returned if there are ways to return to this in the javascript in the java object variables, You can also continue to call it ..... This is the way to the lightweight json-rpc-for-java's magic. When they returned to the List when the java object, embodied in the javascript for the ArrayList?, If it is Map, reflected in the js in the Object, and other java call in basically the same. Special place is that by JS call java object can only be imported when the parameters of simple types, such as: String, int, float, long, etc..<br>
<br>
Notes<br>
<br>
If you return to the java client is the Object, Bean, Map or custom objects, can not have attributes name<i>, id</i>, these two attributes for internal use by the framework<br>
<br>
json rpc for java use<br>
<br>
Please download <a href='http://code.google.com/p/json-rpc-for-java/downloads/list'>http://code.google.com/p/json-rpc-for-java/downloads/list</a>



Call not the registration and configuration of the class method<br>
<br>
1, first of all, is called the class needs to inherit jcore.jsonrpc.common.JsonRpcObject? Or the realization of interface jcore.jsonrpc.common.face.IjsonRpcObject?, And the default constructor; such as:<br>
<br>
package test.rpc;<br>
import jcore.jsonrpc.common.JsonRpcObject;<br>
public class MyTestRpc extends JsonRpcObject (<br>
<blockquote>/ <br>
<ul><li>Call: rpc.getRpcObj ( 'test.rpc.MyTestRpc'). GetTestMsg ()<br>
</li><li>@ Return<br>
</li><li>/<br>
</li></ul>public String getTestMsg ()<br>
(<br>
<blockquote>return "Oh, a success!";<br>
</blockquote>)<br>
)<br>
2, JSP's JavaScript? Way call, for example: alert (rpc.getRpcObj ( 'test.rpc.MyTestRpc?'). GetTestMsg ());