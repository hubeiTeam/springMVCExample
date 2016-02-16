/**
 * 
 */
package caideli.controller.test;

import redis.clients.jedis.Jedis;

/**
 * @author caideli
 * @date 2016年2月16日下午3:29:54
 */
public class RediesTest {

	/**
	 * @date 2016年2月16日下午3:29:54
	 * @param args
	 */
	public static void main(String[] args) {
		//连接本地的 Redis 服务
	      Jedis jedis = new Jedis("localhost");
	      System.out.println("Connection to server sucessfully");
	      //查看服务是否运行
	      System.out.println("Server is running: "+jedis.ping());
	      //设置 redis 字符串数据
	      jedis.set("123", "haha");
	     // 获取存储的数据并输出
	     System.out.println("存入的数据是: "+ jedis.get("123"));

	}

}
