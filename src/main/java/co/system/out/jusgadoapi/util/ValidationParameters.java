package co.system.out.jusgadoapi.util;

public class ValidationParameters {
	
	private static final String NULL = "null";
	private static final String UNDEFINED = "undefined";
	
	public static final String HEADER_STRING = "Authorization";
	public static final String TOKEN_PREFIX = "Bearer ";

	public static final String FALSE = "false";
	
	
	
	/*
	 * Metodo que valida que no sea:
	 *  undefined
	 *  null
	 *  vacio
	 */
	public static boolean isValideParameter(String parameter, boolean isUser ) {
		
		if(isUser) {
			if(parameter != null && !parameter.isEmpty() && !parameter.equals(UNDEFINED) && !parameter.equals(FALSE) && !parameter.equals(NULL)   ) {
				return true;
			}else {
				return false;
			}
		}else {
			if(parameter != null && !parameter.isEmpty()  && !parameter.equals(UNDEFINED)  && !parameter.equals(NULL)  ) {
				return true;
			}else {
				return false;
			}
		}

		
	}

}
