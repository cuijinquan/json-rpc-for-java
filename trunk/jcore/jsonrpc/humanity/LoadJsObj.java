package jcore.jsonrpc.humanity;

import java.io.Reader;

import jcore.jsonrpc.common.Content;
import jcore.jsonrpc.common.JsonRpcObject;
import jcore.jsonrpc.common.ResultObject;
import jcore.jsonrpc.tools.Tools;

/***
 * 获取JS对象
 * @author 夏天
 *
 */
public class LoadJsObj extends JsonRpcObject{
	private static final long serialVersionUID = -1988214985561562945L;
	/***
	 * 通过js对象名获取对象，区分大小写
	 * @param szName
	 * @return
	 * @throws Exception
	 */
	public ResultObject getJsObj(String szName) 
	{
		ResultObject oRst = new ResultObject();
		Reader f = null;
		try
		{
			f = Tools.getResourceAsReader("jcore/jsonrpc/humanity/" + szName + ".js");
			if(null != f)
			{
				StringBuffer buf = new StringBuffer();
				char []b = new char[1024];
				int j = 0;
				while(1024 == (j = f.read(b, 0, 1024)))
				{
					buf.append(b, 0, j);
				}
				if(0 < j)
					buf.append(b, 0, j);
				String s = buf.toString().trim().replaceAll("\\/\\*[^\\*]+\\*\\/", "");
				s = Content.JS(new String(s.getBytes(), "UTF-8"));
				s = s.replaceFirst("^\\\\ufeff", "");
				s = s.replaceAll("[\\t ]*\\r\\n[\\t ]*\\r\\n", "\r\n");
				s = s.replaceAll("[ \\t]*\\n[\\t ]+", "\n");
				// s = s.replaceAll("([^\\r])\\n", "$1");
				System.out.println("var " + szName + " = (" + s + ").init();");
				oRst.setResult(s);
			}
			else oRst.setErrMsg("指定的对象不存在，请确认大小写是否正确。");
		}catch(Exception e)
		{
			log.debug(e);
			oRst.setErrMsg(e.getMessage());
		}
		finally
		{
			if(null != f)
				try{f.close();}catch(Exception e)
				{
					oRst.setErrMsg(e.getMessage());
				}
			f = null;
		}
		return oRst;
	}
}
