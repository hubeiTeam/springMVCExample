package caideli.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import caideli.annotation.NoLogin;
import caideli.base.BaseController;
import caideli.bean.BackUser;
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
	
	@NoLogin
	@RequestMapping(value="/myHome/login.html",method = RequestMethod.GET)
	public ModelAndView login(){
		ModelAndView result=new ModelAndView();
		return result;
	}
	@NoLogin
	@RequestMapping(value="/myHome/login",method = RequestMethod.GET)
	public ModelAndView login1(){
		ModelAndView result=new ModelAndView();
		return result;
	}
	@RequestMapping(value="/back",method=RequestMethod.GET)
	public ModelAndView back1(){
		ModelAndView result=new ModelAndView();
		super.setView(result, "/myHome/login");
		return result;
	}
	@RequestMapping(value="/",method=RequestMethod.GET)
	public ModelAndView back2(){
		ModelAndView result=new ModelAndView();
		super.setView(result, "/login");
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
	@NoLogin
	@RequestMapping(value="/myHome/login.json",method=RequestMethod.POST)
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
		BackUser user = new BackUser();
		
		List<BackUser> userAdminList = this.backUserService.getUsersByPage(params, -1, -1);
		BackUser userAdmin = null;
		if(CollectionUtils.isNotEmpty(userAdminList)){
			userAdmin = userAdminList.get(0);
		}
		if(count<1){
			super.setFailMessage(result,"用户名或密码错误");
			return result;
		}else{
			super.setSuccessful(result, "登录成功");
			result.addObject("userAdmin", userName);
			user.setUserName(userName);
			user.setUserPassword(userPassword);
			request.getSession().setAttribute("userAdmin",user);
		}
		TIMER_LOGGER.info("[/myHome/login.json] push time[" + (System.currentTimeMillis() - startTime) +"ms]");	    
		return result;
	}
	
	/**index访问接口**/
	@RequestMapping(value="/myHome/index.html",method = RequestMethod.GET)
	public ModelAndView index(){
		ModelAndView result=new ModelAndView();
		long startTime = System.currentTimeMillis();
		TIMER_LOGGER.info("[/myHome/index.html] push time[" + (System.currentTimeMillis() - startTime) +"ms]");
		return result;
	}
	/**判断登录的用户session是否消失**/
	@RequestMapping(value="/back/isLogin.json",method = RequestMethod.GET)
	public ModelAndView isLogin(HttpServletRequest request){
		ModelAndView result=new ModelAndView();
		long startTime = System.currentTimeMillis();
		appointJsonView(result);
		Boolean flag=true;
		if(request.getSession().getAttribute("userAdmin")==null){
			flag=false;
		}
		result.addObject("flag",flag);
		TIMER_LOGGER.info("[/back/isLogin.json] push time[" + (System.currentTimeMillis() - startTime) +"ms]");
		return result;
	}
}
