/**
 *
 * TODO
 *
 */
package caideli.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

import caideli.base.BaseController;
import caideli.service.BackUserService;

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
	
	
}
