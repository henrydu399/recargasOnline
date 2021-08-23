package co.systemhome.recargasonline.dto;

import java.io.Serializable;
import java.util.Date;

public class RecargaDTO implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String transationID;
	private Date fechaTransation;
	private String concepto;
	private String movil;
	private double valor;
	private Operador operador;
	private String user;
	private String numeroIdentificacion;
	
	

	public String getTransationID() {
		return transationID;
	}

	public void setTransationID(String transationID) {
		this.transationID = transationID;
	}

	public String getConcepto() {
		return concepto;
	}

	public void setConcepto(String concepto) {
		this.concepto = concepto;
	}

	public double getValor() {
		return valor;
	}

	public void setValor(double valor) {
		this.valor = valor;
	}

	public Operador getOperador() {
		return operador;
	}

	public void setOperador(Operador operador) {
		this.operador = operador;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public Date getFechaTransation() {
		return fechaTransation;
	}

	public void setFechaTransation(Date fechaTransation) {
		this.fechaTransation = fechaTransation;
	}

	public String getNumeroIdentificacion() {
		return numeroIdentificacion;
	}

	public void setNumeroIdentificacion(String numeroIdentificacion) {
		this.numeroIdentificacion = numeroIdentificacion;
	}

	public String getMovil() {
		return movil;
	}

	public void setMovil(String movil) {
		this.movil = movil;
	}


	
	
	
	

}
