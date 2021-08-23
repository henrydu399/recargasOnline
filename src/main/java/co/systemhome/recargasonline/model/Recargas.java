package co.systemhome.recargasonline.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Recargas {
	
	

	@GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid", strategy = "uuid")
		@Id
	private String idTransaccion;
	    
	    private Date fechaTransaccion;
	    
	    private String operador;
	    
	    private double valor;
	    
	    private String persona;
	    
		private String movil;
	    
	    private String user;
	    
	    
	    private String concepto;

		public String getIdTransaccion() {
			return idTransaccion;
		}

		public void setIdTransaccion(String idTransaccion) {
			this.idTransaccion = idTransaccion;
		}

		public Date getFechaTransaccion() {
			return fechaTransaccion;
		}

		public void setFechaTransaccion(Date fechaTransaccion) {
			this.fechaTransaccion = fechaTransaccion;
		}

		public String getOperador() {
			return operador;
		}

		public void setOperador(String operador) {
			this.operador = operador;
		}

		public double getValor() {
			return valor;
		}

		public void setValor(double valor) {
			this.valor = valor;
		}

		public String getPersona() {
			return persona;
		}

		public void setPersona(String persona) {
			this.persona = persona;
		}

		public String getUser() {
			return user;
		}

		public void setUser(String user) {
			this.user = user;
		}

		public String getConcepto() {
			return concepto;
		}

		public void setConcepto(String concepto) {
			this.concepto = concepto;
		}

		public String getMovil() {
			return movil;
		}

		public void setMovil(String movil) {
			this.movil = movil;
		}
	    
	    
	    
	    
	    
	    
	

}
