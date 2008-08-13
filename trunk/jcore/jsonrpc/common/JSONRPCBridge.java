package jcore.jsonrpc.common;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.ParseException;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/***
 * 
 * @author 夏天
 *
 */
public class JSONRPCBridge implements Serializable{
	private static final long serialVersionUID = 1L;
	// 为了集群中使用内存复制使用
	private HttpSession session = null;
	// 注册中的对象
	private Map globalMap = Collections.synchronizedMap(new HashMap());
	
	// 缓存顶级的被注册对象的JSON格式
	private Map cache = Collections.synchronizedMap(new HashMap());
	// 顶级对象链路
	private Map links = Collections.synchronizedMap(new HashMap());
	// 顶级被注册的名字
	private Map topNms = Collections.synchronizedMap(new HashMap());
	
	/***
	 * 返回所有注册全局的对象为JSON的字符串格式
	 * @return
	 */
	public String getRegObjsToString()
	{
		StringBuffer buf = new StringBuffer("{\"result\":[");
		int n = 0;
		Iterator oIt = topNms.entrySet().iterator();
		while(oIt.hasNext())
		{
			if(0 < n)
				buf.append(",");
			Map.Entry oKey = (Map.Entry)oIt.next();
			
			// 为了提高性能，采用cache
			String szTmp  = (String)cache.get(oKey.getKey());
			if(null == szTmp)
			{
				// 只对顶级注册的进行获取, oKey.getValue()只是全局中的key
				szTmp = new ObjectToJSON(getObject(oKey.getValue().toString()), this).toJSON(oKey.getKey().toString());
				// szTmp = szTmp.replaceFirst("\\{", "{name:\"" + oKey.getKey() + "\",");
				cache.put(oKey.getKey(), szTmp);
				// 再次调用，以便集群环境下能正常工作
				if(null != session)
					session.setAttribute(Content.RegSessionJSONRPCName, this);
			}
			n++;
			buf.append(szTmp);
		}
		buf.append("]}");
		return buf.toString();
	}
	
	/***
	 * 构造函数，构造后一定要setSession
	 */
	public JSONRPCBridge(){}
	
	/***
	 * 构造的时候可以带上session对象
	 * @param session
	 */
	public JSONRPCBridge(HttpSession session)
	{
		this.session = session;
	}
	
	/***
	 * 注册父亲对象链路
	 * @param nSelfHashCode
	 * @param nParentHashCode
	 * @return
	 */
	public JSONRPCBridge registerParentObject(int nSelfHashCode, int nParentHashCode)
	{
		String szKeyName = nSelfHashCode + "";
		if(null == links.get(szKeyName))
		{
			// 注册
			links.put(szKeyName, nParentHashCode + "");
		}
		// 再次调用，以便集群环境下能正常工作
		if(null != session)
			session.setAttribute(Content.RegSessionJSONRPCName, this);
		return this;
	}
	
	/***
	 * 移除对象对应的顶级对象的注册信息
	 * @param nSelfHashCode
	 */
	public void removeParentRegInfo(int nSelfHashCode)
	{
		String szKeyName = nSelfHashCode + "";
		links.remove(szKeyName);
		
		// 移除子对象
		Iterator oIt = links.entrySet().iterator();
		while(oIt.hasNext())
		{
			Map.Entry oKey = (Map.Entry)oIt.next();
			String szChildId = (String)oKey.getValue();
			if(szKeyName.equals(szChildId))
			{
				links.remove(szChildId);
				removeObject(Integer.parseInt((String)oKey.getKey()));
			}
		}

		
		// 再次调用，以便集群环境下能正常工作
		if(null != session)
			session.setAttribute(Content.RegSessionJSONRPCName, this);
	}
	
	/***
	 * 获取对象的顶级对象
	 * @param nSelfHashCode
	 * @return
	 */
	public Object getParentObject(int nSelfHashCode)
	{
		String szKeyName = nSelfHashCode + "";
		int nRst = 0;
		while(0 == nRst)
		{
			Object o = links.get(szKeyName);
			if(null == o)
				break;
			nRst = Integer.parseInt((String)o);
		}
		if(0 < nRst)
			return this.getObject(nRst + "");
		return null;
	}
	
	/***
	 * 注册对象
	 * @param nHashCodeName 利用hashcode注册对象，防止同一实例注册多次
	 * @param o
	 * @return this
	 */
	public JSONRPCBridge registerObject(int nHashCodeName, Object o)
	{
		String szKeyName = nHashCodeName + "";
		if(null == globalMap.get(szKeyName))
		{
			// 注册
			globalMap.put(szKeyName, o);
		}
		// 再次调用，以便集群环境下能正常工作
		if(null != session)
			session.setAttribute(Content.RegSessionJSONRPCName, this);
		return this;
	}
	
	public JSONRPCBridge registerObject(String szKeyName, Object o)
	{
		if(null != szKeyName && 0 < szKeyName.trim().length())
		{
			if(null == topNms.get(szKeyName))
				topNms.put(szKeyName, o.hashCode() + "");
			return registerObject(o.hashCode(), o);
		}
		return this;
	}
	
	/***
	 * 移除注册的对象
	 * @param nHashCodeName 利用hashcode注册对象，防止同一实例注册多次
	 * @return this
	 */
	public JSONRPCBridge removeObject(int nHashCodeName)
	{
		String szKeyName = nHashCodeName + "";
		// 移除
		globalMap.remove(szKeyName);
		// 再次调用，以便集群环境下能正常工作
		if(null != session)
			session.setAttribute(Content.RegSessionJSONRPCName, this);
		return this;
	}
	
	/***
	 * 移除对象
	 * @param szKeyName
	 * @param o
	 * @return
	 */
	public JSONRPCBridge removeObject(String szKeyName, Object o)
	{
		if(null != szKeyName && 0 < szKeyName.trim().length())
		{
			topNms.remove(szKeyName);
			return removeObject(o.hashCode());
		}
		return this;
	}	
	
	/***
	 * 判断对象o是否是为不需要注册的"简单"对象
	 * @param o
	 * @return
	 */
	private boolean isSimpleType(Object o)
	{
		if(null == o)return false;
		String szType = o.getClass().getName();
		Pattern pa = Pattern.compile("^class \\[[ZBCISJFDL]");
		Matcher m = pa.matcher(szType);
		
		if(-1 < ",java.lang.String,java.util.Date,java.sql.Timestamp,java.lang.Boolean,java.lang.Character,java.lang.Short,java.lang.Integer,java.lang.Long,java.lang.Float,java.lang.Double,boolean,char,byte,short,int,long,float,double,".indexOf("," + szType + ",") || m.find())
		{
			// 清除对象使用关联关系，便于内存的有效利用
			m = null;
			pa = null;
			szType = null;
			return true;
		}
		// 清除对象使用关联关系，便于内存的有效利用
		m = null;
		pa = null;
		szType = null;
		return false;
	}
	
	
	/***
	 * 解码html方式编码的中文汉字
	 * ，例如将：
	 *  "&#24322;&#24120;" 解码为 "异常" 
	 * 符合的汉字正则表达式范围是：[\u4E00-\u9FA5]
	 * @param szStr
	 * @return
	 */
	public String decodeUnicodeHtm(String szStr)
	{
		Pattern p = Pattern.compile("&#(\\d+);", Pattern.MULTILINE);
		Matcher m = p.matcher(szStr);
		StringBuffer buf = new StringBuffer();
		while(m.find())
			m.appendReplacement(buf, (char)Integer.valueOf(m.group(1)).intValue() + "");
		m.appendTail(buf);
		return buf.toString();
	}
	
	/***
	 * 执行JSON-RPC请求的方法，并返回JSON格式的结果
	 * @param szParm
	 * @return
	 */
	public String ExecObjectMethod(HttpServletRequest request, String szParm)
	{
		try {
			szParm = decodeUnicodeHtm(szParm);
			JSONObject oJson = new JSONObject(szParm);
			String szName = oJson.getString("id"), 
			       szMeshod = oJson.getString("method");
			JSONArray oParams = (JSONArray)oJson.get("params");
			
			Object o = getObject(szName);
			
			if(null != o)
			{
				int nParentHashCode = o.hashCode();
				Object oParent = this.getParentObject(nParentHashCode);
				if(null != oParent)
					nParentHashCode = oParent.hashCode();
				else oParent = o;
				
				// 如果是要求释放对象内存资源
				if("release".equals(szMeshod))
				{
					// 移除对象注册信息
					removeObject(oParent.hashCode());
					Iterator oIt = topNms.entrySet().iterator();
					while(oIt.hasNext())
					{
						Map.Entry oKey = (Map.Entry)oIt.next();
						if(szName.equals(oKey.getValue()))
						{
							topNms.remove(oKey.getKey());
							break;
						}
					}
					// 移除顶级对象注册信息
					removeParentRegInfo(oParent.hashCode());
					return "true";
				}
				
				Class c = o.getClass();
				Method []m = c.getMethods();
				
				// 注入 reqeust 对象 start
				try
				{
					Class cTmp = c.getSuperclass();
					int i = 10;
					Method setReqeust = null;
					while(null == setReqeust && 0 < i--)
					{
						try{setReqeust = cTmp.getDeclaredMethod("setRequest", new Class[]{javax.servlet.http.HttpServletRequest.class});}catch(Exception e){}
						if(null != cTmp)
							cTmp = cTmp.getSuperclass();
						else break;
					}
					if(null != setReqeust)
						setReqeust.invoke(o, new Object[]{request});
					setReqeust = null;
				}catch(Exception e){e.printStackTrace();}
				// 注入 reqeust 对象 end
				
				for(int i = 0; i < m.length; i++)
				{
					if(szMeshod.equals(m[i].getName()) && oParams.length() == m[i].getParameterTypes().length)
					{
						try {
							// 构造参数
							Object []aParam = new Object[oParams.length()];
							Class []oTyps = m[i].getParameterTypes();
							for(int j = 0; j < aParam.length; j++)
							{
								aParam[j] = oParams.get(j);
								String szNm = oTyps[j].getName();
								if(!szNm.equals(aParam[j].getClass().getName()))
								{
									if(szNm.equals("java.util.Date"))
										aParam[j] = (Object)new Date(Long.parseLong(aParam[j].toString()));
									else if(szNm.equals("java.math.BigDecimal"))
										aParam[j] = (Object)new BigDecimal(aParam[j].toString());
									else if(szNm.equals("java.lang.Float"))
										aParam[j] = (Object)new Float(aParam[j].toString());
								}
							}
							oTyps = null;
							oParams = null;
							Object oRst = null;
							try
							{
								oRst = m[i].invoke(o, aParam);
							} catch (Exception e) {
								// 如果发生异常，这里自动调用： setErrMsg  填写错误消息
								Method setErrMsg = null;
								Class cTmp = oParent.getClass();
								i = 20;
								while(null == setErrMsg && 0 < i--)
								{
									try{setErrMsg = cTmp.getDeclaredMethod("setErrMsg", new Class[]{java.lang.String.class});}catch(Exception e1){}
									if(null != cTmp)
										cTmp = cTmp.getSuperclass();
									else break;
								}
								if(null != setErrMsg)
								{
									String szErrMsg = e.getMessage();
									if(null == szErrMsg && null != e.getCause())
										szErrMsg = e.getCause().getMessage();
									setErrMsg.invoke(oParent, new Object[]{szErrMsg});
								}
								setErrMsg = null;
							}
							aParam = null;
							if(null != oRst)
							{
								// 不是简单类型就注册他
								if(!isSimpleType(oRst))
								{
									// 设置顶级对象
									registerObject(oRst.hashCode(), oRst).registerParentObject(oRst.hashCode(), nParentHashCode);
								}
								String szOut = new ObjectToJSON(oRst, this).toJSON(null);
								return szOut;
							}
							return "true";
						} catch (Exception e) {
							e.printStackTrace();
						}
						break;
					}
				}
			}
		} catch (ParseException e) {
		}
		return "false";
	}
	
	/***
	 * 根据注册路径获取注册对象，如果找不到就返回null
	 * @param szKeyName
	 * @return
	 */
	public Object getObject(String szKeyName)
	{
		return globalMap.get(szKeyName);
	}
	
	/***
	 * 设置session对象
	 * @param session
	 * @return
	 */
	public JSONRPCBridge setSession(HttpSession session) {
		this.session = session;
		return this;
	}

}
