package caideli.controller;
import java.util.List;

import javax.annotation.Resource;



import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;







import caideli.annotation.NoLogin;
import caideli.base.BaseController;
import caideli.bean.BackPower;
import caideli.service.BackPowerService;
import caideli.tool.LoggerFactary;
/**
 * 
 * @author caideli
 * ClassName BackPowerController.java  @date 2015年9月21日下午1:44:58
 */
@Controller("powerController")
public class BackPowerController extends BaseController {
	
	/**  */
	private static final long serialVersionUID = 1L;
	/** 权限service */
	@Resource
	private BackPowerService backPowerService;
	/**日志配置*/
	private Logger TIMER_LOGGER = LoggerFactary.getLogger(LoggerFactary.QUERY_TIME);
	/** 测试分页 */
	@NoLogin
	@RequestMapping(value="/backBone/test")
	public ModelAndView login(HttpServletRequest request,HttpServletResponse response){ 
		//appointJsonView(result);
		long startTime = System.currentTimeMillis();
		List<BackPower> powerList=this.backPowerService.getPowersByPage(null, 2, 3);
		System.out.println("长度："+powerList.size());
		for(BackPower power:powerList){
			System.out.println(power.getPowerName());
		}
		powerList=this.backPowerService.getPowersByPage(null, 1, 4);
		System.out.println("长度："+powerList.size());
		for(BackPower power:powerList){
			System.out.println(power.getPowerName());
		}
	    //request.setAttribute("powerName", power.getPowerName());  
	    //request.setAttribute("path", power.getPath());
	    ModelAndView result=new ModelAndView();
	    //result.setViewName("json");
	    TIMER_LOGGER.info("[/login.html] push time[" + (System.currentTimeMillis() - startTime) +"ms]");
		
	    return result;  
	}
	/** 测试  *//*
	@RequestMapping(value="/myPage/login/login")
	public ModelAndView test(){
		ModelAndView result=new ModelAndView();
		//result.setViewName("xml");
		//appointJsonView(result);
		long startTime = System.currentTimeMillis();
		BackPower power = backPowerService.getOnePower(1);
	    result.addObject("powerName", power.getPowerName());  
	    result.addObject("path", power.getPath());
	    //String xml = XmlUtils.javaBean2Xml(power);
	   // System.out.println(xml);
	    //result.addObject("xml",xml);
		//JaxWsDynamicClientFactory dcf = JaxWsDynamicClientFactory.newInstance();
		//Client client = dcf.createClient(webserviceWSDL);
		//QName name=new QName(baseUrl +"/","Withdraw");
		//Object[] objects=client.invoke(name,xml);
		//return (String) objects[0];
	    TIMER_LOGGER.info("[/login.html] push time[" + (System.currentTimeMillis() - startTime) +"ms]");
	    return result;  
	} */
}
