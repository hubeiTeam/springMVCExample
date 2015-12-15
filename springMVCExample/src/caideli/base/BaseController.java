package caideli.base;

import java.io.Serializable;


import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.servlet.ModelAndView;

public class BaseController implements Serializable {


	/**  */
	private static final long serialVersionUID = 1L;

	protected static String FAIL = "fail";

	protected static String SUCCESSFUL = "successful";
	/** 閲嶅畾鍚�*/
	private final String REDIRECT = "redirect:";

	protected static String ADMIN_NAME = "admin_name";
	/** request */
	@Autowired
	protected HttpServletRequest request;
	/** session */
	@Autowired
	protected HttpSession session;
	
	/**
	 * set淇℃伅
	 * 
	 * @param modelAndView
	 * @param message
	 */
	protected void setFailMessage(ModelAndView result, String message,int...code) {
		result.addObject("status", FAIL);
		result.addObject("message", message);
		if(code.length !=0){
			result.addObject("failCode", code[0]);
		}
	}

	/**
	 * @param modelAndView
	 * @param status
	 */
	protected void setSuccessful(ModelAndView result, String message) {
		result.addObject("status", SUCCESSFUL);
		result.addObject("message", message);
	}

	/**
	 * 閲嶅畾鍚�params涓虹┖鍙仛璺宠浆)
	 * 
	 * @param model
	 * @param url
	 *            濡俢amp.htm
	 * @param params
	 *            鍙傛暟闆嗗悎锛宬ey鍙傛暟鍚嶏紝value鍙傛暟
	 */
	protected void setRedirect(ModelAndView result, String url,
			Map<String, Object> params) {
		if (result == null) {
			throw new RuntimeException("result涓虹┖锛");
		}
		if (StringUtils.isEmpty(url)) {
			throw new RuntimeException("閲嶅畾鍚憉rl涓虹┖锛�");
		}
		if (CollectionUtils.isEmpty(params)) {
			result.setViewName(REDIRECT + url);
			return;
		} else {
			StringBuilder uri = new StringBuilder(REDIRECT + url + "?");
			for (Map.Entry<String, Object> o : params.entrySet()) {
				uri.append(o.getKey()).append("=").append(o.getValue())
						.append("&");
			}
			uri = new StringBuilder(uri.substring(0, uri.lastIndexOf("&")));
			result.setViewName(uri.toString());
		}
	}

	/**
	 * get client real ip address
	 * <p>need tengine proxy settings</p>
	 * <tengine>
	 * 		location /{
	 * 			 proxy_set_header X-Real-IP $remote_addr;
     *      	 proxy_set_header Host $host;
	 * 		}
	 * </tengine>
	 * @return
	 */
	public String getClientAddress() {
		String ipAddress = request.getHeader("X-Real-IP");
		return ipAddress;
	}
	
	/**
	 * 鎸囧畾瑙嗗浘绫诲埆涓簀son 閰嶅悎瑙ｆ瀽鍣ㄤ娇鐢�
	 * 
	 * @param result
	 * @param viewType
	 */
	protected void appointJsonView(ModelAndView result) {
		result.setViewName("json");
	}

	protected void setView(ModelAndView result, String viewName) {
		result.setViewName(viewName);
	}
	
}
