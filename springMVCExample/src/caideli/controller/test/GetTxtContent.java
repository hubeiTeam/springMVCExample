/**
 * 
 */
package caideli.controller.test;

import java.io.BufferedReader;
import java.io.File;

import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.FileInputStream;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

/**
 * @author caideli
 * @date 2016年3月18日上午11:08:41
 */
public class GetTxtContent {

	/**
	 * @date 2016年3月18日上午11:08:41
	 * @param args
	 */
	public static void main(String[] args) {
		File file = new File("D:\\zhanghu.txt");//找到系统的文件
		String result="";
		Map<String,Object> txtMap = new HashMap<>();
		try {
			//BufferedReader br = new BufferedReader(new FileReader(file));// 构造一个BufferedReader类来读取文件
			BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
			String s = null;
			while ((s = br.readLine()) != null) {// 使用readLine方法，一次读一行
				String[] strs = s.split(";");
				if(StringUtils.isNotEmpty(strs[0].trim())&&StringUtils.isNotEmpty(strs[1].trim())){
					txtMap.put(strs[0].trim(), strs[1].trim());	
				}			
			}
			br.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		for (Map.Entry en : txtMap.entrySet()) {
			System.out.println(en.getKey() + ":" + en.getValue());
		}
	}
}
