/**
 *
 * springMVCExamplecaideli.controllerError.java
 * Error
 * 
 */
package caideli.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import caideli.base.BaseController;

/**
 * @author :caideli
 * @CreatTime ：2015年10月8日 下午5:57:57 
 */
@Controller("errorController")
public class ErrorController extends BaseController {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 其它报错（空指针异常）
	 * caideli
	 * 2015年10月8日
	 * @return
	 */
	@RequestMapping(value="/backBone/error/error.html",method=RequestMethod.GET)
	public ModelAndView fowardError(){
		ModelAndView result=new ModelAndView();
		return result;
	}
	/**
	 * 404报错跳转页面
	 * caideli
	 * 2015年10月8日
	 * @return
	 */
	@RequestMapping(value="/backBone/error/error404.html",method=RequestMethod.GET)
	public ModelAndView fowardError404(){
		ModelAndView result=new ModelAndView();
		return result;
	}
}
