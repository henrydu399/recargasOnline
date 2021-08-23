package co.systemhome.recargasonline.dto;

public class  Operador {
	public static final String TIGO = "TIGO";
	public static final String MOVISTAR = "MOVISTAR";
	public static final String CLARO = "CLARO";
	public static final String UFF = "UFF";
	
	private  String value;
	
	public Operador() {

	}

	public Operador(String value) {
		super();
		this.value = value;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	

}