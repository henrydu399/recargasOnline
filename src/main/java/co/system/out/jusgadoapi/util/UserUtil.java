package co.system.out.jusgadoapi.util;

import java.util.Random;

public class UserUtil {
	
	
	public static final String SOCIO = "socio";
	public static final String CLIENTE = "cliente";
	
	
	public  static String generateRandomToken(int len) {
		String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk"
          +"lmnopqrstuvwxyz!@#$%&";
		Random rnd = new Random();
		StringBuilder sb = new StringBuilder(len);
		for (int i = 0; i < len; i++)
			sb.append(chars.charAt(rnd.nextInt(chars.length())));
		return sb.toString();
	}
}
