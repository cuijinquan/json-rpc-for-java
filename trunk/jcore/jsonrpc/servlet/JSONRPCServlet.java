package jcore.jsonrpc.servlet;

import java.io.BufferedReader;
import java.io.CharArrayWriter;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URL;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import jcore.jsonrpc.common.Content;
import jcore.jsonrpc.common.JSONRPCBridge;
import jcore.jsonrpc.common.JsonRpcRegister;
import jcore.jsonrpc.common.face.ISecureCheck;
import jcore.jsonrpc.humanity.LoadJsObj;
import jcore.jsonrpc.tools.Tools;

/*******************************************************************************
 * JSON-RPC对web的服务通道
 * 
 * @author 夏天
 */
public class JSONRPCServlet extends HttpServlet {
    private final static int buf_size = 4096;

    private final static long serialVersionUID = 2;

    private String charset = "UTF-8";

    // 支持Gzip，默认不支持
    // private boolean bGzip = false;
    // 安全检查的类
    private ISecureCheck check = null;
    private String secureCheck = null;

    private ServletConfig config = null;

    public void destroy() {
	super.destroy();
	config = null;
	check = null;
	secureCheck = null;
	this.charset = null;
    }

    public void init(ServletConfig config) throws ServletException {
	this.config = config;
	super.init(config);
    }

    public String rootPath = java.net.URLDecoder.decode(JSONRPCServlet.class.getResource("/").getFile());

    public String szPkg = "/jcore/jsonrpc/rpcobj";
    public boolean bInit = false;
    // searchAllClass(JSONRPCServlet.class.getResource(szPkg).getFile());
    public void searchAllClass(HttpServletRequest request, String s) {
	if(bInit)return;
	s = java.net.URLDecoder.decode(s);
	File f = new File(s);
	File[] fs = f.listFiles();
	if(null == fs)return;
//	System.out.println((null == fs) + "[" + fs.length + "]");
	for (int i = 0; i < fs.length; i++) {
	    if (fs[i].isDirectory())
		searchAllClass(request, fs[i].getAbsolutePath());
	    else {
		String s1 = fs[i].getAbsolutePath().substring(rootPath.length() - 1);
		if(-1 < s1.indexOf(".svn"))continue;
		s1 = s1.substring(0, s1.indexOf(".")).replaceAll("\\\\", ".");
		String pknm = "jcore.jsonrpc.rpcobj";
		if (s1.startsWith(pknm))
		    try {
			JsonRpcRegister.registerObject(request, s1.substring(pknm.length() + 1), Class.forName(s1));
		    } catch (Exception e) {
			e.printStackTrace();
		    }
	    }
	}
    }

    /***************************************************************************
     * 这里初始化启动的时候需要注册的对象
     */
    public void myInit(ServletConfig config, JSONRPCBridge brg) {
	String szPam = null;
	secureCheck = config.getInitParameter("secureCheck");
	if (null != secureCheck) {
	    try {
		check = (ISecureCheck) Class.forName(secureCheck).newInstance();
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	}
	charset = "UTF-8";
	// 配置中指定默认支持gzip
	// bGzip = "true".equals(config.getInitParameter("gzip"));
	szPam = config.getInitParameter("regAppClassNames");
	if (null != szPam && 0 < szPam.trim().length()) {
	    szPam = szPam.replaceAll("[\\s]", "");
	    String[] arrTmp = szPam.split("[;]");
	    if (0 < arrTmp.length) {
		for (int i = 0; i < arrTmp.length; i++) {
		    String[] aT = arrTmp[i].split("[\\|:]");
		    try {
			Object o = Class.forName(aT[1]).newInstance();
			brg.registerObject(aT[0], o);
			o = null;
		    } catch (Exception e) {
			e.printStackTrace();
		    }
		    aT = null;
		}
	    }
	    arrTmp = null;
	}
	config = null;
    }

    public void service(HttpServletRequest request, HttpServletResponse response) throws IOException,
	    ClassCastException {
	// 安全处理
	if (null != check && !check.secureCheck(request, response))
	    return;
	HttpSession session = request.getSession(false);

	if (null == session)
	    session = request.getSession(true);
	if (null != session) {
	    JSONRPCBridge brg = (JSONRPCBridge) session.getAttribute(Content.RegSessionJSONRPCName);
	    // 如果是第一次就注册对象
	    if (null == brg) {
		session.setAttribute(Content.RegSessionJSONRPCName, brg = new JSONRPCBridge().setSession(session));
	    }
	    if (null != this.config)
		myInit(this.config, brg);
	    JsonRpcRegister.registerObject(request, "_LoadJsObj", LoadJsObj.class);
	    URL url = JSONRPCServlet.class.getResource(szPkg);
	    if(null != url)searchAllClass(request, url.getFile());
	    bInit = true;
	    OutputStream out = null;
	    // String szGzip = request.getHeader("Accept-Encoding");
	    // if (null != szGzip && -1 < szGzip.indexOf("gzip")
	    // && (bGzip || "1".equals("JSONAccept-Encoding"))){
	    // response.setContentType("text/plain;charset=" + charset);
	    // response.setHeader("Content-Encoding", "GZIP");
	    // out = new GZIPOutputStream(response.getOutputStream());
	    // }
	    // else
	    {
		response.setContentType("text/plain;charset=" + charset);
		out = response.getOutputStream();
	    }

	    BufferedReader in = new BufferedReader(new InputStreamReader(request.getInputStream(), charset));

	    // 读取request中的JSON对象
	    CharArrayWriter data = new CharArrayWriter();
	    char buf[] = new char[buf_size];
	    int ret;
	    while ((ret = in.read(buf, 0, buf_size)) != -1)
		data.write(buf, 0, ret);

	    String szData = data.toString();
	    data.close();
	    data = null;
	    in.close();
	    in = null;
	    byte[] bout = null;
	    if (null != szData && 0 < szData.length()) {
		Object obj = brg.ExecObjectMethod(request, szData);
		if (null != obj)
		    bout = Tools.encodeUnicodeHtm(obj.toString()).getBytes("UTF-8");
	    }
	    // 返回注册中的对象
	    else {
		bout = brg.getRegObjsToString().getBytes();
	    }
	    if (null != bout) {
		response.setIntHeader("Content-Length", bout.length);
		out.write(bout);
	    }
	    out.flush();
	    out.close();
	    session.setAttribute(Content.RegSessionJSONRPCName, brg);
	}
    }
}
