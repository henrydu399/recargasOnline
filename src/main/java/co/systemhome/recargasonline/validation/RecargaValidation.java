package co.systemhome.recargasonline.validation;

import org.springframework.stereotype.Component;

import co.systemhome.recargasonline.dto.Operador;
import co.systemhome.recargasonline.dto.RecargaDTO;

import co.systemhome.recargasonline.enums.ErrorGeneric;
import co.systemhome.recargasonline.model.Recargas;


@Component
public class RecargaValidation {

	
	public boolean  isvalid(RecargaDTO _dto) throws Exception {
		
		if(_dto != null) {
			
			if( _dto.getConcepto() == null ||  _dto.getConcepto().isEmpty()) {
				 throw new Exception(ErrorGeneric.ERROR_VALOR_CONCEPTO.name()) ; 
			}
			
			if( _dto.getMovil() == null || _dto.getMovil().isEmpty() ) {
				 throw new Exception(ErrorGeneric.ERROR_NUMERO_MOVIL.name()) ; 
			}else {
				try {
					long numero =  Long.parseLong(_dto.getMovil());
				}catch (Exception e) {
					throw new Exception(ErrorGeneric.ERROR_NUMERO_MOVIL_NO_ES_NUMERO.name()) ; 
				}
			}
			
			if( _dto.getValor() == 0d) {
				 throw new Exception(ErrorGeneric.ERROR_VALOR.name()) ; 
			}
			
			if( _dto.getOperador() == null ) {
				 throw new Exception(ErrorGeneric.ERROR_VALOR_OPERADOR.name()) ; 
			}else {
				boolean isValid = false;
				if (_dto.getOperador().getValue().equals(Operador.CLARO ) || 
						_dto.getOperador().getValue().equals(Operador.MOVISTAR )  ||
						_dto.getOperador().getValue().equals(Operador.TIGO )  ||
						_dto.getOperador().getValue().equals(Operador.UFF ) 
				  ) {
					isValid = true;
				}
				if( isValid== false) {
					 throw new Exception(ErrorGeneric.ERROR_VALOR_OPERADOR_NO_EXISTE.name()) ;
				}
			}
			
			if( _dto.getNumeroIdentificacion() == null || _dto.getNumeroIdentificacion().isEmpty()) {
				 throw new Exception(ErrorGeneric.ERROR_NUMERO_IDENTIFICACION_REQUERIDO.name()) ;
			}
			

			
		}else {
			 throw new Exception(ErrorGeneric.ERROR_DATOS_ENTRADA.name()) ; 
		}
		
		return true;
	}
	
	public Recargas builderRecarga(RecargaDTO _dto) {
		
		Recargas recarga = new Recargas();
		recarga.setConcepto(_dto.getConcepto());
		recarga.setValor(_dto.getValor());
		recarga.setOperador(_dto.getOperador().getValue());
		recarga.setPersona(_dto.getNumeroIdentificacion());
		recarga.setMovil( _dto.getMovil());
		
		if( _dto.getUser() != null) {
			recarga.setUser(_dto.getUser());
		}
		
		return recarga;
		
		
	}
	
	public RecargaDTO builderDto(Recargas r) {
		RecargaDTO dto = new RecargaDTO();
		dto.setConcepto(r.getConcepto());
		dto.setValor(r.getValor());
		dto.setFechaTransation(r.getFechaTransaccion());
		Operador op =  new Operador();
		op.setValue(r.getOperador());
		dto.setOperador(op);
		dto.setTransationID(r.getIdTransaccion());
		dto.setUser(r.getUser());
		dto.setNumeroIdentificacion( r.getPersona());
		dto.setMovil(r.getMovil());
		return dto;
		
	}


	
	
	
	
}
