package jcore.jsonrpc.servlet;

import java.io.BufferedReader;
import java.io.CharArrayWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import jcore.jsonrpc.common.Content;
import jcore.jsonrpc.common.JSONRPCBridge;

/***
 * JSON-RPC对web的服务通道
 * @author 夏天
 *
 */
public class JSONRPCServlet extends HttpServlet {
	private final static int buf_size = 4096;
	private final static long serialVersionUID = 2;
	private String charset = "UTF-8";
	private ServletConfig config = null;
	
	public void init(ServletConfig config)throws ServletException
	{
		this.config = config;
		super.init(config);
	}
	
	/***
	 * 这里初始化启动的时候需要注册的对象
	 */
	public void myInit(ServletConfig config, JSONRPCBridge brg)
	{
		
		String szPam = null;
		charset = "UTF-8"; 
		szPam = config.getInitParameter("regAppClassNames");
		if(null != szPam && 0 < szPam.trim().length())
		{
			szPam = szPam.replaceAll("[\\s]", "");
			String []arrTmp = szPam.split("[;]");
			if(0 < arrTmp.length)
			{
				for(int i = 0; i < arrTmp.length; i++)
				{
					String []aT = arrTmp[i].split("[\\|:]");
					try {
						Object o = Class.forName(aT[1]).newInstance();
						brg.registerObject(aT[0], o);
						o = null;
					} catch (InstantiationException e) {
						e.printStackTrace();
					} catch (IllegalAccessException e) {
						e.printStackTrace();
					} catch (ClassNotFoundException e) {
						e.printStackTrace();
					}
					aT = null;
				}
			}
			arrTmp = null;
		}
		
	}

    public void service(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ClassCastException {

    	 HttpSession session = request.getSession(false);
    	 if(null == session)session = request.getSession(true);
    	 if(null != session)
    	 {
    		 JSONRPCBridge brg = (JSONRPCBridge)session.getAttribute(Content.RegSessionJSONRPCName);
    		 // 如果是第一次就注册对象
			 if(null == brg)
			 {
				 session.setAttribute(Content.RegSessionJSONRPCName, brg = new JSONRPCBridge().setSession(session));
				 myInit(this.config, brg);
			 }
    		 response.setContentType("text/plain;charset=" + charset);
	        OutputStream out = response.getOutputStream();
	        BufferedReader in = new BufferedReader(new InputStreamReader(request.getInputStream(), charset));

	        // 读取request中的JSON对象
	        CharArrayWriter data = new CharArrayWriter();
	        char buf[] = new char[buf_size];
	        int ret;
	        while ((ret = in.read(buf, 0, buf_size)) != -1)
	            data.write(buf, 0, ret);
	        
            String szData = data.toString();
            byte[] bout = null;
            if(null != szData && 0 < szData.length())
            	bout = brg.ExecObjectMethod(request, szData).toString().getBytes("UTF-8");
            // 返回注册中的对象
            else
            {
            	bout = brg.getRegObjsToString().getBytes();
            }
	        response.setIntHeader("Content-Length", bout.length);

	        out.write(bout);
	        out.flush();
	        out.close();
	        session.setAttribute(Content.RegSessionJSONRPCName, brg);
    	 }
    }
}
