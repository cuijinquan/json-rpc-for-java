package jcore.jsonrpc.humanity;

import java.io.InputStream;

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
		InputStream f = null;
		try
		{
			f = Tools.getResourceAsStream("jcore/jsonrpc/humanity/" + szName + ".js");
			if(null != f)
			{
				StringBuffer buf = new StringBuffer();
				byte []b = new byte[1024];
				int j = 0;
				while(1024 == (j = f.read(b, 0, 1024)))
				{
					buf.append(new String(b, "UTF-8"));
				}
				if(0 < j)
				{
					byte []b1 = new byte[j];
					System.arraycopy(b, 0, b1, 0, j);
					buf.append(new String(b1, "UTF-8"));
				}
				String s = Content.JS(buf.toString().trim()).replaceAll("\\/\\*[^\\*]+\\*\\/", "");
//				s = Content.JS(s);
				s = s.replaceFirst("^\\\\ufeff", "");
				s = s.replaceAll("([\\t ]*\\r\\n[\\t ]*)+", "\r\n");
				s = s.replaceAll("[ \\t]*\\n[\\t ]+", "\n");
				s = s.replaceAll("([^\\r])\\n", "$1");
				// System.out.println(szName);
//				if("Base".equals(szName))
//				 System.out.println("var " + szName + " = (" + s + ").init();");
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
