package co.systemhome.recargasonline.business;

import java.util.List;

import org.springframework.stereotype.Service;

import co.systemhome.recargasonline.dto.RecargaDTO;
import co.systemhome.recargasonline.dto.RecargasOperadorDto;
import co.systemhome.recargasonline.model.Recargas;



public interface IRecargasBusiness {
	
	
	public void recargar(Recargas recarga) throws Exception;
	
	public List<RecargaDTO>  getRecargasToday() ;
	
	public List<RecargaDTO>  getRecargasAll() ;
	
	public List<RecargasOperadorDto> getRecargasOperador();
}
