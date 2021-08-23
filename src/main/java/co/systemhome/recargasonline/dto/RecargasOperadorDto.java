package co.systemhome.recargasonline.dto;

import java.io.Serializable;

import co.systemhome.recargasonline.model.RecargasOperador;

public class RecargasOperadorDto implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String operador;
	private double total;
	private int cantidad;
	
	public String getOperador() {
		return operador;
	}
	public void setOperador(String operador) {
		this.operador = operador;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public int getCantidad() {
		return cantidad;
	}
	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
	
	public static RecargasOperadorDto builder(RecargasOperador ent) {
		RecargasOperadorDto dto =  new RecargasOperadorDto();
		dto.cantidad = ent.getCantidad();
		dto.operador = ent.getOperador();
		dto.total = ent.getTotal();
		return dto;
	}
	

}
