/**
 * 
 */
package caideli.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import net.sf.json.JSONObject;

/**
 * @author caideli
 * @date 2016年1月21日下午3:10:08
 */
public class MapGetCity {	
	public static void main(String[] args) throws IOException {
		Object[] o = getCoordinate("北京市海淀区中关村大街27号1101-08室");
		System.out.println();
		System.out.println("经纬度："+o[0] + "," + o[1]);
		
		String addr_ip = GetAddrByIp("59.172.76.234");
		System.out.println("据ip的地址："+addr_ip);
		
		String addr_WH = GetAddrByWH("39.983424","%20116.322987");
		System.out.println("据经纬度的地址："+addr_WH);
		
	}
	/**
	 * @param addr
	 *            根据地址查询经纬度
	 * @return
	 * @throws IOException
	 */
	public static Object[] getCoordinate(String addr) throws IOException {
		String lng = null;// 经度
		String lat = null;// 纬度
		String address = null;
		try {
			address = java.net.URLEncoder.encode(addr, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		String key = "f247cdb592eb43ebac6ccd27f796e2d2";
		// 根据经纬度获取地址（已被禁用）
		// String url =
		// "http://api.map.baidu.com/geocoder/v2/?ak=pmCgmADsAsD9rEXkqWNcTzjd&location=30.548397,104.04701&output=json&pois=1";

		String url = String.format("http://api.map.baidu.com/geocoder?address=%s&output=json&key=%s", address, key);
		System.out.println("据地址的URL是：" + url);
		URL myURL = null;
		URLConnection httpsConn = null;
		try {
			myURL = new URL(url);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		InputStreamReader insr = null;
		BufferedReader br = null;
		try {
			httpsConn = (URLConnection) myURL.openConnection();// 不使用代理
			if (httpsConn != null) {
				insr = new InputStreamReader(httpsConn.getInputStream(), "UTF-8");
				br = new BufferedReader(insr);
				String data = null;
				int count = 1;
				System.out.print("数据是：");
				while ((data = br.readLine()) != null) {
					System.out.print(data.trim());
					if (count == 5) {
						// System.out.println(":"+data.indexOf(":")+","+data.indexOf(","));
						if (data.indexOf(":") != -1 && data.indexOf(",") != -1) {
							lng = (String) data.subSequence(data.indexOf(":") + 1, data.indexOf(","));// 经度
						}
						count++;
					} else if (count == 6) {
						if (data.indexOf(":") != -1) {
							lat = data.substring(data.indexOf(":") + 1);// 纬度
						}
						count++;
					} else {
						count++;
					}

				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (insr != null) {
				insr.close();
			}
			if (br != null) {
				br.close();
			}
		}
		return new Object[] { lng, lat };
	}
	
	/**
	 * 根据ip获取经纬度
	 * @date 2016年1月22日下午4:56:13
	 * @param IP 59.172.76.234
	 * @return
	 */
	public static String GetAddrByIp(String IP) {
		String addr = "";
		String url = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip="+IP;
		URL myURL = null;
		System.out.println("据ip的URL是：" + url);
		URLConnection httpsConn = null;
		try {
			myURL = new URL(url);
		} catch (MalformedURLException e) {
			e.printStackTrace();
			return null;
		}
		try {
			httpsConn = (URLConnection) myURL.openConnection();
			if (httpsConn != null) {
				InputStreamReader insr = new InputStreamReader(httpsConn.getInputStream(), "UTF-8");//或者GB2312
				BufferedReader br = new BufferedReader(insr);
				String data = null;
				if ((data = br.readLine()) != null) {
					System.out.println("数据是：" + data);
					System.out.println("数据是：" + convert(data));
					JSONObject jsonObject = JSONObject.fromObject(data);
					addr = jsonObject.getString("country") + jsonObject.getString("province")
							+ jsonObject.getString("city");
				}
				insr.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		return addr;
	}
	
	/**
	 * 根据经纬度判断地址
	 * @date 2016年1月22日下午5:25:51
	 * @param latitude
	 * @param longitude  39.983424,%20116.322987
	 * @return
	 */
	public static String GetAddrByWH(String latitude, String longitude) {
		String addr = "";
		String url = "http://api.map.baidu.com/geocoder?output=json&key=37492c0ee6f924cb5e934fa08c6b1676&location="+latitude+","+longitude;
		URL myURL = null;
		System.out.println("据经纬度的URL是：" + url);
		URLConnection httpsConn = null;
		try {
			myURL = new URL(url);
		} catch (MalformedURLException e) {
			e.printStackTrace();
			return null;
		}
		try {
			httpsConn = (URLConnection) myURL.openConnection();
			if (httpsConn != null) {
				InputStreamReader insr = new InputStreamReader(httpsConn.getInputStream(), "UTF-8");
				BufferedReader br = new BufferedReader(insr);
				StringBuffer data = new StringBuffer();
				String line = null;
				while ((line = br.readLine()) != null) {
					data.append(line.trim());
				}
				System.out.println("数据是：" + data);
				JSONObject result = JSONObject.fromObject(data.toString());
				JSONObject jsonObject = JSONObject.fromObject(result.getString("result"));
				addr = jsonObject.getString("formatted_address");
				insr.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		return addr;
	}
	/**
	 * 将带有unicode的字符串改成汉字
	 * @date 2016年1月22日下午5:13:06
	 * @param utfString
	 * @return
	 */
	public static String convert(String utfString){  
	    StringBuilder sb = new StringBuilder();  
	    int i = -1;  
	    int pos = 0;  
	      
	    while((i=utfString.indexOf("\\u", pos)) != -1){  
	        sb.append(utfString.substring(pos, i));  
	        if(i+5 < utfString.length()){  
	            pos = i+6;  
	            sb.append((char)Integer.parseInt(utfString.substring(i+2, i+6), 16));  
	        }  
	    }  
	      
	    return sb.toString();  
	} 
	
	

}
