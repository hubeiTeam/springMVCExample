/**
 *
 * TODO
 *
 */
package caideli.interceptor;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import caideli.annotation.NoLogin;




/**登录拦截器
 * @author :caideli
 * @pakageName:caideli.interceptor
 * @CreatTime ：2015年9月29日 上午10:36:10 
 */
public class LoginInterceptor implements MethodInterceptor {
	
	//无需登录验证的方法
	private static String[] NOLOGIN_METHOD={"login"}; 
	@Override
	public Object invoke(MethodInvocation invocation) throws Throwable {
		//包含了的过
		if(this.isExist(NOLOGIN_METHOD, invocation.getMethod().getName())){
			return invocation.proceed();
		}
		//含有注解过
		if(this.findAnnotation(invocation)!=null){
			return invocation.proceed();
		}
		//登录过了的过
		HttpServletRequest request=((ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes()).getRequest();
		if(this.isLogin(request)){
			return invocation.proceed();
		}
		ModelAndView result=new ModelAndView();
		result.setViewName("/backBone/login");
		return result;
	}
	
	/**
	 * 判断字符串数组中是否包含一字符串
	 * caideli
	 * 2015年10月8日
	 * @param bases
	 * @param value
	 * @return true:包含，false:不包含
	 */
	private Boolean isExist(String[] bases,String value){
		for(String base:bases){
			if(StringUtils.endsWith(base, value)){
				return true;
			}
		}
		return false;
	}
	/**
	 * 判断是否登录
	 * caideli
	 * 2015年10月8日
	 * @param request
	 * @return
	 */
	private Boolean isLogin(HttpServletRequest request){
		if(request.getSession().getAttribute("userName")!=null){
			return true;
		}
		return false;
	}
	/**
	 * 查询方法里面是否含有无需登录注解
	 * caideli
	 * 2015年10月8日
	 * @param invocation
	 * @return
	 */
	private NoLogin findAnnotation(MethodInvocation invocation){
		Method method=invocation.getMethod();
		NoLogin annotation=method.getAnnotation(NoLogin.class);
		if(annotation==null){
			try {
				method=invocation.getThis().getClass().getMethod(method.getName(), method.getParameterTypes());
				annotation=method.getAnnotation(NoLogin.class);
			} catch (NoSuchMethodException e) {
				
				e.printStackTrace();
			} catch (SecurityException e) {
				
				e.printStackTrace();
			}
			
		}
		return annotation;
	}
}
