/**
 *
 * TODO
 *
 */
package caideli.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
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
 * @CreatTime ：2015年9月28日 下午5:35:22
 */
@Controller("backUserController")
public class BackUserController extends BaseController {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	@Resource
	private BackUserService backUserService;
	/**日志配置*/
	private Logger TIMER_LOGGER = LoggerFactary.getLogger(LoggerFactary.QUERY_TIME);
	/**
	 * 用户列表
	 * @date 2016年1月6日下午4:27:06
	 * @return
	 */
	@NoLogin
	@RequestMapping(value="/index.html",method=RequestMethod.GET)
	public ModelAndView forwarduserList(){
		ModelAndView result=new ModelAndView();
		long startTime = System.currentTimeMillis();
		List<BackUser> userList =this.backUserService.getAllUsers();
		result.addObject("userList", userList);
		TIMER_LOGGER.info("[/index.html] push time[" + (System.currentTimeMillis() - startTime) +"ms]");	    
		return result;
	}
	/**
	 * 用户列表的json数据
	 * @date 2016年1月6日下午4:27:06
	 * @return
	 */
	@NoLogin
	@RequestMapping(value="/userList.json",method=RequestMethod.GET)
	public ModelAndView forwarduserListjson(Integer currPage){
		ModelAndView result=new ModelAndView();
		long startTime = System.currentTimeMillis();
		super.appointJsonView(result);
		List<BackUser> userList =this.backUserService.getAllUsers();
		Integer count = this.backUserService.getCount(null); 
		result.addObject("datas", userList);
		result.addObject("count", count);
		TIMER_LOGGER.info("[/userList.json] push time[" + (System.currentTimeMillis() - startTime) +"ms]");	    
		return result;
	}
	/**
	 * 登录页面请求
	 * @date 2016年1月7日上午10:04:03
	 * @return
	 */
	@NoLogin
	@RequestMapping(value="/login.html",method=RequestMethod.GET)
	public ModelAndView forwardLogin(){
		ModelAndView result=new ModelAndView();
		long startTime = System.currentTimeMillis();
		TIMER_LOGGER.info("[/login.html] push time[" + (System.currentTimeMillis() - startTime) +"ms]");
		return result;
	}
	/**
	 * 用户列表页面跳转
	 * @date 2016年1月12日下午5:11:20
	 * @return
	 */
	@NoLogin
	@RequestMapping(value="/userList.html",method=RequestMethod.GET)
	public ModelAndView forwardUserList(Integer currPage){
		ModelAndView result=new ModelAndView();
		long startTime = System.currentTimeMillis();
		List<BackUser> userList =this.backUserService.getAllUsers();
		Integer count = this.backUserService.getCount(null); 
		result.addObject("datas", userList);
		result.addObject("count", count);
		result.addObject("currPage", currPage);
		TIMER_LOGGER.info("[/userList.html] push time[" + (System.currentTimeMillis() - startTime) +"ms]");
		return result;
	}

}
