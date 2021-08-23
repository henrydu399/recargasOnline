package co.systemhome.recargasonline.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "RecargasOperador")
public class RecargasOperador implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
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
	

}