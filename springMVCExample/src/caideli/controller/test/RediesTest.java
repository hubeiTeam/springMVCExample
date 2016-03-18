/**
 * 
 */
package caideli.controller.test;

import java.util.List;

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
	   //存储数据到列表中
	      jedis.lpush("tutorial-list", "Redis");
	      jedis.lpush("tutorial-list", "Mongodb");
	      jedis.lpush("tutorial-list", "Mysql");
	     // 获取存储的数据并输出
	     List<String> list = jedis.lrange("tutorial-list", 0 ,3);
	     System.out.println("列表的大小为："+list.size());
	     for(int i=0; i<list.size(); i++) {
	       System.out.println("列表数据为: "+list.get(i));
	     }
	}

}
