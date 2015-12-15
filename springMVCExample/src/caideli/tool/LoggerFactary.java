/**
 * @date 2014年6月20日 下午2:48:16
 * @author lim
 * @version V1.0 
 */
package caideli.tool;

import org.apache.log4j.Logger;

/**
 * 日志工厂
 * @date 2014年6月20日 下午2:48:16
 * @author lim
 * @version V1.0 
 */
public class LoggerFactary {
	
	
	/** 用户日志 */
	public static final String USER_LOGGER = "userinfo";
	/** 管理员日志 */
	public static final String ADMIN_LOGGER = "admininfo";
	/** 锁日志 */
	public static final String LOCK_LOGGER = "lockinfo";
	/** 岗位信息 */
	public static final String POST_LOGGER = "postinfo";
	/** 推送消息 */
	public static final String PUSH_LOGGER = "pushinfo";
	/** 保单日志 */
	public static final String INSURE_LOGGER = "insureinfo";
	/** 订单日志 */
	public static final String ORDER_LOGGER = "orderinfo";
	/** 信誉日志 */
	public static final String HONESTY_LOGGER = "honestyinfo";
	/** 核查日志 */
	public static final String VERIFICATION_LOGGER = "verificationinfo";
	/** 查询时间 */
	public static final String QUERY_TIME = "querytimeinfo";
	/** 补助日志 */
	public static final String SUBSIDY_LOGGER = "subsidyinfo";
	/** 支付宝 */
	public static final String ALIPAY_LOGGER = "alipayinfo";
	/** 邮件日志 */
	public static final String EMAIL_LOGGER = "emailinfo";
	/** 用户城市日志 */
	public static final String USER_CITY_LOGGER = "usercityinfo";
	
	public static Logger getLogger(String logName){
		return Logger.getLogger(logName);
	}
}
