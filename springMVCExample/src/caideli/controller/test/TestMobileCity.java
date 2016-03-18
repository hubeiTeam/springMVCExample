/**
 * 
 */
package caideli.controller.test;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class TestMobileCity {
	/**
	 * @author caideli
	 * @date 2016年1月19日上午11:38:57
	 */
	/**
	 * 测试手机号码是来自哪个城市的，利用淘宝的API
	 * 
	 * @param mobileNumber
	 *            手机号码
	 * @return
	 * @throws MalformedURLException
	 */
	public static String calcMobileCity(String mobileNumber) throws MalformedURLException {
		String jsonString = null;
		JSONArray array = null;
		JSONObject jsonObject = null;
		//String urlString = "http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=" + mobileNumber;
		String urlString = "http://virtual.paipai.com/extinfo/GetMobileProductInfo?amount=10000&callname=getPhoneNumInfoExtCallback&mobile="+mobileNumber;
		StringBuffer sb = new StringBuffer();
		BufferedReader buffer;
		URL url = new URL(urlString);
		try {
			InputStream in = url.openStream();

			// 解决乱码问题
			buffer = new BufferedReader(new InputStreamReader(in, "GB2312"));
			String line = null;
			while ((line = buffer.readLine()) != null) {
				sb.append(line);
			}
			in.close();
			buffer.close();
			// System.out.println(sb.toString());
			jsonString = sb.toString();
			System.out.println("json数据："+jsonString);
			// 替换掉“__GetZoneResult_ = ”，让它能转换为JSONArray对象
			//jsonString = jsonString.replaceAll("^[__]\\w{14}+[_ = ]+", "[");
			// System.out.println(jsonString+"]");
			//String jsonString2 = jsonString + "]";
			// 把STRING转化为json对象
			//jsonString=jsonString.replace("{","");
			//jsonString=jsonString.replace("}","");
			jsonString=jsonString.replace("getPhoneNumInfoExtCallback(","");/*
			jsonString=jsonString.replace(");<!--[if !IE]>|xGv00|6741027ad78d9b06f5642b25ebcb1536<![endif]-->", "");*/
			System.out.println("转换时对象："+jsonString);
			//array = JSONArray.fromObject(jsonString);
			//jsonObject = new JSONObject(jsonString);
			jsonObject = JSONObject.fromObject(jsonString);
			//jsonObject.getString("province");
			// 获取JSONArray的JSONObject对象，便于读取array里的键值对
			//jsonObject = array.getJSONObject(0);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonObject.getString("province")+"_"+jsonObject.getString("cityname");
	}

	/**
	 * 计算多个号码的归属地
	 * 
	 * @param mobileNumbers
	 *            号码列表
	 * @return
	 * @throws MalformedURLException
	 */
	public static JSONObject calcMobilesCities(List<String> mobileNumbers) throws MalformedURLException {
		JSONObject jsonNumberCity = new JSONObject();
		for (String mobileNumber : mobileNumbers) {
			jsonNumberCity.put(mobileNumber, calcMobileCity(mobileNumber));
			;
		}
		return jsonNumberCity;
	}

	public static void main(String[] args) throws Exception {
		String testMobileNumber = "18356464656";
		System.out.println(calcMobileCity(testMobileNumber));
		/*List<String> mobileList = new ArrayList<String>();
		for (int i = 1350345; i < 1350388; i++) {
			mobileList.add(String.valueOf(i));
		}*/
		//System.out.println(calcMobilesCities(mobileList).toString());
	}
}
