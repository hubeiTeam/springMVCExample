/**
 *
 * 登录注册接口
 *
 */
package caideli.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import caideli.annotation.NoLogin;
import caideli.base.BaseController;
import caideli.service.BackUserService;
import caideli.tool.LoggerFactary;

/**
 * @author :caideli
 * @pakageName:caideli.controller
 * @CreatTime ：2015年9月28日 上午11:11:36 
 */
@Scope("prototype")
@Controller("loginController")
public class LoginController extends BaseController {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Resource
	private BackUserService backUserService;
	/**日志配置*/
	private Logger TIMER_LOGGER = LoggerFactary.getLogger(LoggerFactary.QUERY_TIME);
	
	@RequestMapping(value="/backBone/login.html",method = RequestMethod.GET)
	public ModelAndView login(){
		ModelAndView result=new ModelAndView();
		return result;
	}
	@RequestMapping(value="/backBone",method=RequestMethod.GET)
	public ModelAndView back1(){
		ModelAndView result=new ModelAndView();
		super.setView(result, "/backBone/login");
		return result;
	}
	@RequestMapping(value="/",method=RequestMethod.GET)
	public ModelAndView back2(){
		ModelAndView result=new ModelAndView();
		super.setView(result, "/backBone/login");
		return result;
	}
	
	/**
	 * 登录验证
	 * caideli
	 * 2015年9月28日
	 * @param userName
	 * @param userPassword
	 * @return
	 */
	@RequestMapping(value="/backBone/login.json",method=RequestMethod.GET)
	public ModelAndView login(String userName,String userPassword){
		ModelAndView result=new ModelAndView();
		appointJsonView(result);
		long startTime = System.currentTimeMillis();
		if(StringUtils.isEmpty(userName)||StringUtils.isEmpty(userPassword)){
			super.setFailMessage(result,"用户名或密码不允许为空");
			return result;
		}
		Map<String,Object> params=new HashMap<String, Object>();
		params.put("userName", userName);
		params.put("userPassword", userPassword);
		Integer count=0;
		count=this.backUserService.getCount(params);
		if(count<1){
			super.setFailMessage(result,"用户名或密码错误");
			return result;
		}else{
			super.setSuccessful(result, "登录成功");
			request.getSession().setAttribute("userName",userName);
		}
		TIMER_LOGGER.info("[/backBone/login.json] push time[" + (System.currentTimeMillis() - startTime) +"ms]");	    
		return result;
	}
	
	@RequestMapping(value="/backBone/test.html",method=RequestMethod.GET)
	public ModelAndView index(){
		ModelAndView result=new ModelAndView();
		result.addObject("message","成功！");
		return result;
	}
}
