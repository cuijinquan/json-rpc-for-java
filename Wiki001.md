
```

1、根据自己的项目情况，我们重新做了扩展：
// Yhsi2JsonRpcObj extends JsonRpcObject

package com.yinhai.yhsi2.web.common;
import com.yinhai.webframework.session.UserSession;
import jcore.jsonrpc.common.JsonRpcObject;

public abstract class Yhsi2JsonRpcObj extends JsonRpcObject {
         // 我们包装后的session对象，有自动清除内存对象的功能
	 private UserSession us = null;
	 public Yhsi2JsonRpcObj() {
		super();
	}

			
	/***
	 * 
	 * @return
	 */
	public UserSession getUs() {
		if(null == us)
			us = UserSession.getUserSession(getRequest());
		return us;
	}
}

2、用于被注册的AJAX异步java对象
package com.yinhai.insurance.employee.web;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.yinhai.insurance.common.apps.domain.EmpoyeeBaseInfoVO;
import com.yinhai.insurance.common.apps.service.BaseCommonService;
import com.yinhai.insurance.common.apps.service.EmployeeCommonService;
import com.yinhai.insurance.common.apps.service.EmployerCommonService;
import com.yinhai.insurance.employee.apps.dao.Ac01Dao;
import com.yinhai.insurance.employer.apps.bpo.EmployerDivideBpo;
import com.yinhai.sysframework.app.domain.Key;
import com.yinhai.sysframework.organization.IUser;
import com.yinhai.sysframework.service.ServiceLocator;
import com.yinhai.sysframework.system.service.BaseSystemService;
import com.yinhai.yhsi2.apps.common.util.Yhsi2Constants;
import com.yinhai.yhsi2.web.common.Yhsi2JsonRpcObj;

/***
 * 
 * @author 夏天
 *
 */
public class EmployeeInsuranceAddJsonRpc extends Yhsi2JsonRpcObj {

	/**
	 * 查询个人基本信息
	 */
	private static final long serialVersionUID = 1105031294407735871L;
	
	/***
	 * 获取"缴费基数"
	 * @param aac040 - 缴费工资，申报工资
	 * @param aae140 - 险种类型
	 * @param yac505 - 缴费人员类别
	 * @param aab001 - 单位编号
	 * @param aac001 - 个人编号 
	 * @return
	 */
	public BigDecimal getContributionBase(BigDecimal aac040, String aae140, String yac505, String aab001, String aac001)
	{
		try
		{
			// aae002 - 费款所属期 参保日期的下一期 BaseCommonService.getAae002
			ServiceLocator svs = ServiceLocator.getInstance();
			BaseCommonService bs = (BaseCommonService)svs.getService("baseCommonService");
			return bs.getContributionBase(aac040, aae140, bs.getAae002(aab001, aac001, aae140, getUs().getUser().getOrgId()), yac505, getUs().getUser().getOrgId());// UserSession.getUserSession(getRequest())
		}catch(Exception e)
		{
			e.printStackTrace();
			setErrMsg(e.getMessage());
		}
		return null;
	}
	
	// JsonRpcClient().ac01.test(function(s){alert(s)}, 1212,"good", 98);
	/***
	 * 查询个人基本信息
	 */
	public EmpoyeeBaseInfoVO getEmployeeBaseInfo(String aac001)
	{
		try
		{
			EmpoyeeBaseInfoVO ac01Domain = ((EmployeeCommonService)ServiceLocator.getInstance().getService("employeeCommonService")).getEmployeeBaseInfo(aac001, null, null);
			if (Yhsi2Constants.AAE120_ZX.equalsIgnoreCase(ac01Domain.getAae120())) 
				setErrMsg("输入个人编号" + aac001 + "基本信息已被注销，不能进行任何业务经办");
			else if(Yhsi2Constants.AAC008_YS.equals(ac01Domain.getAac008()))
				setErrMsg("遗属人员不能参加保险！");
			else return ac01Domain;
		}catch(Exception e)
		{
			setErrMsg(e.getMessage());
		}
		return null;
	}
	
	// 保存被分立的人员信息，并查询这些人各险种的欠款合计信息
	public List saveAddQueryForDivide(String szData, String aab001_sour)
	{
		IUser user = this.getUs().getUser();
		try
		{
		    // 处理， 查询各项险种欠费合计
			ServiceLocator service = ServiceLocator.getInstance();
			EmployerDivideBpo employerDivideBpo = ((EmployerDivideBpo)service
					.getService("employerDivideBpo"));
			List lst = employerDivideBpo.saveTmp_debtdivide(szData, aab001_sour, user);
			return lst;
		}catch(Exception e)
		{
			this.setErrMsg(e.getMessage());
		}
		if(0 == getErrMsg().length())
			setErrMsg("获取人员各险种的欠款信息时发生未知的错误，请检查存储过程！");
		return null;
	}

}

3、jsp中的使用
<script type="text/javascript" language="javascript">
document.body.style.overflowX = "hidden";
var save = $I("save"), rpc = JsonRpcClient().ac01;

// 3种养老险种
function yac033Change(o, n)
{
   var s = o.value.trim(), s2 = "yic646_" + n;
   if(s)
   {
      s = parseInt(s.replace(/\-/g, ''));
      if(19960101 >= s && s2.getObj())
        s2.setValue("1996-01-01");
   }
}

function fnAab001ButtonQuery()
{
  fnCommQueryButton('../employer/commonQueryAction.do?reqCode=query.ab01Dao.queryDomainObjects&cleardata=true&dto(aab001)=' + 'dto(aab001)'.getValue(),'query');  
}

// 查询个人基本信息
function fnAac001ButtonQuery()
{
  fnCommQueryButton('../employer/commonQueryAction.do?reqCode=query.ac01Dao.queryDomainObjects&cleardata=true&dto(aac001)=' + 'dto(aac001)'.getValue(),'query');  
}

// 填写缴费基数
function getContributionBase()
{
   for(var i = 0; i < 15; i++)
   {
      var szCode = 9 >= i ? ("0" + i) : i, oAae140 = $("dto(aae140_" + szCode + ")"), s;
      // 住院医疗保险 没有 缴费基数
       if(null == oAae140 || oAae140.disabled || 11 === (s = oAae140.value.trim() || 0))
         continue;
        // 补充医疗保险 的缴费基数同基本医疗保险，而且这两个保险必须在同一单位参保
        if('<%=com.yinhai.yhsi2.apps.common.util.Yhsi2Constants.AAE140_BCYL%>' === s)
           continue;
        // 乡镇养老保险/机关事业养老保险  需要特殊处理
        else if('<%=com.yinhai.yhsi2.apps.common.util.Yhsi2Constants.AAE140_JGYL%>' === s || '<%=com.yinhai.yhsi2.apps.common.util.Yhsi2Constants.AAE140_XZYL%>' === s)
        {
            window.top.g_oLastPopObj = $("descdto(yac505_" + s + ")");
            getContributionBaseForYAC505();
        }
        else 
        {
	        if(s2 = parseFloat(rpc.getContributionBase(parseFloat("aac040".getValue()), s,("yac505_" + s).getValue(), "aab001".getValue(), "aac001".getValue())))
	        {
	          ($("dto(yac004_" + s + ")") || {}).value = s2;
	          // 基本医疗的时候同时填写补充医疗的基数
	          if("<%=com.yinhai.yhsi2.apps.common.util.Yhsi2Constants.AAE140_JBYL%>" === s)($("dto(yac004_" + '<%=com.yinhai.yhsi2.apps.common.util.Yhsi2Constants.AAE140_BCYL%>' + ")") || {}).value = s2;
	        }
	        else if(s = rpc.getErrMsg().trim())alert(s);
        }
   }
}

// 填写缴费基数
function getContributionBaseForYAC505()
{
  try{
     var s = window.top.g_oLastPopObj.name.substr(8, 9), o = s.getObj(), szYac505 = s.getValue(), 
         szCode = s.substr(s.lastIndexOf("_") + 1, 2), oAae140 = $("dto(aae140_" + szCode + ")"),
         nSbgz = parseFloat("aac040".getValue());
         s = oAae140.value;
     // 如果选机关事业、机关个人，则申报控制为4项工资之和
     if(s === "<%=com.yinhai.yhsi2.apps.common.util.Yhsi2Constants.AAE140_XZYL%>")
     {
         var i = 0, j = 0, nFlg = 0, obj = "aac040".getObj();
         for(; i < 15; i++)
	     {
	       var szCode = 9 >= i ? ("0" + i) : i, oAae140 = $("dto(aae140_" + szCode + ")");
	       if(null === oAae140 || oAae140.disabled)
	         continue;
	       if(oAae140.checked)
	         j++, ("11" == oAae140.value || "10" == oAae140.value) && (nFlg++);
	     }
	     if("<%=com.yinhai.yhsi2.apps.common.util.Yhsi2Constants.YAC505_10JGGR%>" === szYac505 || "<%=com.yinhai.yhsi2.apps.common.util.Yhsi2Constants.YAC505_10JG%>" === szYac505)
	     {
	        nSbgz = (parseFloat(("aac040_1_" + s).getValue()) || 0) + (parseFloat(("aac040_2_" + s).getValue()) || 0)
	              + (parseFloat(("aac040_3_" + s).getValue()) || 0) + (parseFloat(("aac040_4_" + s).getValue()) || 0);
	        fnSetAtbts("aac040_1_" + s + ",aac040_2_" + s + ",aac040_3_" + s + ",aac040_4_" + s, 4);
	        fnAddRedStars("aac040_1_" + s + ",aac040_2_" + s + ",aac040_3_" + s + ",aac040_4_" + s, true);
	        if(nFlg == j)
              fnAddRedStar(obj, false);
            else fnAddRedStar(obj);
	     }
	     else
	     {
	        fnAddRedStar(obj);
	        fnAddRedStars("aac040_1_" + s + ",aac040_2_" + s + ",aac040_3_" + s + ",aac040_4_" + s, false);
	        fnSetAtbts("aac040_1_" + s + ",aac040_2_" + s + ",aac040_3_" + s + ",aac040_4_" + s, 5);
	     }
     }
     else if(s === "<%=com.yinhai.yhsi2.apps.common.util.Yhsi2Constants.AAE140_JGYL%>")
     {
         nSbgz = (parseFloat(("aac040_1_" + s).getValue()) || 0) + (parseFloat(("aac040_2_" + s).getValue()) || 0)
	              + (parseFloat(("aac040_3_" + s).getValue()) || 0) + (parseFloat(("aac040_4_" + s).getValue()) || 0);
     }
     
     if(s2 = parseFloat(rpc.getContributionBase(nSbgz, s,("yac505_" + s).getValue(), "aab001".getValue(), "aac001".getValue())))
        ($("dto(yac004_" + s + ")") || {}).value = s2;
     else if(s = rpc.getErrMsg().trim())alert(s);
   }catch(e){alert(e.message)}
}

$("dto(aac040)") && fnAddEvent($("dto(aac040)"), "onchange", getContributionBase);

// 单位、个人编码OnChange事件
function fnQueryOnchange(e, o)
{
  if("dto(aac001)" === o.name && 0 == "aab001".getValue().length)
  {
      if(0 < o.value.length)
      {
		  var ac01 = rpc.getEmployeeBaseInfo(o.value), errMsg = rpc.getErrMsg();
		  if(0 < errMsg.length)
		  {
		     "aac002".setValue(''),
		     "aac003".setValue(''),
		     "aac004".setValue(''),
		     "aac005".setValue(''),
		     "aac008".setValue('');
		     return o.focus(), alert(errMsg), false;
		  }
		  for(var k in ac01)
		    if(6 == k.length)
		     k.getObj() && k.setValue(ac01[k]);
		  fnSetAtbt("dto(aac001)".getObj(),1),
		  fnSetAtbt("dto(aab001)".getObj(),4),
		  "aab001".focus();
		  // 关闭错误消息提示
		  (o = $I("msgt")) && o.removeNode(true);
	  }
  }
  else
  {
	  var oF = document.forms[0];
	  if(top.aab001_length <= o.value.trim().length)
	     F(oF, oF.action, "query");
  }
}

// 保存时检查
function checkSubmitSave()
{
   return validateForm(document.forms[0]);
}

// save按钮状态控制
function checkSave()
{
   for(var i = 0; i < 15; i++)
   {
      var szCode = 9 >= i ? ("0" + i) : i, oAae140 = $("dto(aae140_" + szCode + ")");
       if(null == oAae140 || oAae140.disabled)
         continue;
       if(oAae140.checked)
          return fnSetAtbt(save,4);
   }
   fnSetAtbt(save,5);
}

// 全险种选择，并处理险种的互斥关系：
// bA、只能选一个：01企业养老保险、06机关事业养老保险、10乡镇事业养老保险
// bB、08补充医疗保险依赖于03基本医疗保险
// bC、11住院医疗与03基本医疗保险参保缴费是互斥
function fnXzCheckAll(o)
{
    var bA = false, bC = false, s;
    for(var i = 0; i < 15; i++)
    {
       var szCode = 9 >= i ? ("0" + i) : i, oAae140 = $("dto(aae140_" + szCode + ")");
       if(null === oAae140 || oAae140.disabled)
         continue;
       oAae140.checked = o.checked;
       fnCheckAae140(oAae140);
    }
    checkSave();
}
// 单险种的选择
function fnCheckAae140(o)
{
   // 03: 基本医疗保险
   var a = arguments, aae140_03 = $("dto(aae140_03)") || {}, s = o.value, bCk = false;
   
   if(o.checked)
   {
       switch(s)
	   {
	      // bA、只能选一个：01企业养老保险、06机关事业养老保险、10乡镇事业养老保险
	      case "<%=com.yinhai.yhsi2.apps.common.util.Yhsi2Constants.AAE140_YL%>":
	         ($("dto(aae140_06)") || {}).checked = ($("dto(aae140_10)") || {}).checked = bCk,
	         hidenTab("mytabs", "tab06"), hidenTab("mytabs", "tab10");
	         break;
	      case "<%=com.yinhai.yhsi2.apps.common.util.Yhsi2Constants.AAE140_JGYL%>":
	         ($("dto(aae140_01)") || {}).checked = ($("dto(aae140_10)") || {}).checked = bCk,
	         hidenTab("mytabs", "tab01"), hidenTab("mytabs", "tab10");
	         break;
	      case "10":
	         ($("dto(aae140_06)") || {}).checked = ($("dto(aae140_01)") || {}).checked = bCk,
	         hidenTab("mytabs", "tab06"), hidenTab("mytabs", "tab01");
	         break;
	      // bC、11住院医疗与03基本医疗保险参保缴费是互斥
	      case "11":
	         ($("dto(aae140_03)") || {}).checked = bCk,
	         hidenTab("mytabs", "tab03");
	         // 补充医疗也跟随处理
	         ($("dto(aae140_08)") || {}).checked = bCk,
	         hidenTab("mytabs", "tab08");
	         break;
	      // bB、08补充医疗保险依赖于03基本医疗保险
	      case "08":
	         showTab("mytabs", "tab03");
	         !aae140_03.checked && o.setAttribute("03", true);
	         aae140_03.checked = true;
	         // 住院医疗
	         ($("dto(aae140_11)") || {}).checked = false,
	         hidenTab("mytabs", "tab11");
	         break;
	      // 单独选择"基本医疗保险"则去除标志
	      case "03":
	         // bC、11住院医疗与03基本医疗保险参保缴费是互斥
	         ($("dto(aae140_11)") || {}).checked = bCk,
	         hidenTab("mytabs", "tab11");
	         ($("dto(aae140_08)") || {removeAttribute:function(){}}).removeAttribute("03");
	         break;
	   }
	   
	   showTab("mytabs", "tab" + s);	   
   }
   else
   {
       hidenTab("mytabs", "tab" + s);
       // 取消”补充医疗保险“
	   if("08" == s && o.getAttribute("03"))
	      aae140_03.checked = false,
	      hidenTab("mytabs", "tab03");
	   if("03" == s)($("dto(aae140_08)") || {}).checked = false, hidenTab("mytabs", "tab08");
   }
   if(1 === a.length)checkSave();
   
   // 只选择住院医疗时，申报工资可以不填写
   // 机关养老也可以不需要输入申报工资
   var i = 0, j = 0, nFlg = 0, oTmp;
   o = "aac040".getObj();
   for(; i < 15; i++)
    {
       var szCode = 9 >= i ? ("0" + i) : i, oAae140 = $("dto(aae140_" + szCode + ")");
       if(null === oAae140 || oAae140.disabled)
         continue;
       if(oAae140.checked)
         j++, ("11" == oAae140.value || "06" == oAae140.value || (oTmp = "yac505_10".getObj() && "yac505_10".getValue() || '',
         "10" == oAae140.value && ("1003" == oTmp || "1001" == oTmp))) && (nFlg++);
    }
    if(nFlg == j)
      fnAddRedStar(o, false);
    else fnAddRedStar(o);
    
}

// ykc295 风险金的处理
function yac505_11Change()
{
  var s = "ykc295", o = s.getObj();
  if("1104" === "yac505_11".getValue())
    fnSetAtbt(o, 0),fnAddRedStar(o);
  else o.value = '', fnSetAtbt(o, 1),fnAddRedStar(o, false);
}

// 个人基本信息输入对象颜色的处理
fnAddOnload(function()
{
   var o = $("descdto(yac505_11)");
   o && o.fireEvent("onchange");
   o = "descdto(aac004)".getObj();
   o.disabled = false;
   fnSetAtbt(o,1);
   o = "descdto(aac005)".getObj();
   o.disabled = false;
   fnSetAtbt(o,1);
   o = "descdto(aac008)".getObj();
   o.disabled = false;
   fnSetAtbt(o,1);
});
</script>


4、saveAddQueryForDivide方法的调用，返回List的使用演示
fnAddOnload(
	function (){
		var newRadioButton = document.createElement("<INPUT TYPE='checkbox' NAME='mycheckall' onclick='mycheckAll(this);'>");
		var oCollection = $I("dtgrd");
		oCollection.rows[0].cells[0].insertBefore(newRadioButton);
		oCollection.rows[0].cells[0].onclick = null;
		
		// 绑定onchange事件
		var ab17TbCls = $I("ab17List").rows;
		for(var i = 1; i < ab17TbCls.length; i++)
		{
		   if(0 < ab17TbCls[i].innerText.trim().length)
		   {
		       fnAddEvent(ab17TbCls[i].cells[6].childNodes[0], "onchange", function()
		       {
		          this.cells[7].childNodes[0].value = (parseFloat(this.cells[5].innerText) - parseFloat(this.cells[6].childNodes[0].value.trim() || 0)).toFixed(2)
		       }.bind1(ab17TbCls[i]));
		   }
		}
		
		var divide = JsonRpcClient().divide;
		// 点“待转基金”tab时保存选择的被分立人员信息，并查询各险种欠费合计信息
		fnAddEvent($I("tabs0head2"), "onclick", function()
		{
		    // 为newTag准备数据
		    for(var i = 0; i < g_szarrTdcTbIds.length; i++)
		       fnMkSlctData(g_szarrTdcTbIds[i]);
		    // 退休人员一起处理
		    var s = $('dto(dtgrd_SlctCRVls)').value.trim() + $('dto(dtgrd2_SlctCRVls)').value.trim(), a = null, o, fnc = arguments.callee, j;
		    if(s && fnc.s != s && 'dto(aab001_new)'.getObj().readOnly)
		    {
		        try
		        {
			        fnc.s = s, a = divide.saveAddQueryForDivide(s, 'dto(aab001_old)'.getValue()) || [];
			        var ab17Tb = $I("ab17List"), r, i, szErrMsg = divide.getErrMsg();
			        // 将a填充到列上
			        
			        if(0 <= (j = a.length - 1) && ab17Tb)
			        {
			          r = ab17Tb.rows;
			          $I('save').disabled=false;
			          for(; 0 <= j; j--)
			          {
			             for(i = 1; i < r.length; i++)
			             {
			                if(a[j]["aae140"] === r[i].cells[8].innerText.trim())
			                   r[i].cells[4].innerText = a[j]["debtsummed"],
			                   r[i].cells[5].innerText = a[j]["debtdivided"],
			                   r[i].cells[7].childNodes[0].value = (parseFloat(r[i].cells[5].innerText) - parseFloat(r[i].cells[6].childNodes[0].value.trim() || 0)).toFixed(2);
			             }
			          }
			        }else $I('save').disabled=true;
			        if(0 < szErrMsg.length)alert(szErrMsg);
			    }catch(e){}
		    }
		    // 清空欠费列
		    else
		    {
	            var ab17Tb = $I("ab17List"), i;
		        if(ab17Tb)
		        {
		             r = ab17Tb.rows;
		             for(i = 1; i < r.length; i++)
		             {
		                if(0 < r[i].innerText.trim().length)
		                   r[i].cells[5].innerText = 
		                   r[i].cells[6].childNodes[0].value = 
		                   r[i].cells[7].childNodes[0].value = '0.00';
		             }
		        }
		    }
		    o = $I("dtgrdfzflt");
		    o.value = '';
		    o.onchange(); 
		    $I("dtgrdOptQy").style.visibility = "visible";
		    o = $I("dtgrd2fzflt");
		    o.value = '';
		    o.onchange(); 
		});
		
	   var ab17Tb = $I("ab17List"), r,i;
	   if(ab17Tb)
	   {
	      r = ab17Tb.rows;
	      for(i = 0; i < r.length; i++)
	         r[i].cells[8].style.display = "none", 0 < i && 0 < r[i].cells[0].innerText.trim().length && fnSetAtbt(r[i].cells[7].childNodes[0], 1);
	   }
	}
);

```