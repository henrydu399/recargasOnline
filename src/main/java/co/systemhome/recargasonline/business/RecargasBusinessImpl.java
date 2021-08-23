package co.systemhome.recargasonline.business;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.system.out.jusgadoapi.util.GSonUtils;
import co.systemhome.recargasonline.dto.RecargaDTO;
import co.systemhome.recargasonline.dto.RecargasOperadorDto;
import co.systemhome.recargasonline.model.Recargas;
import co.systemhome.recargasonline.model.RecargasOperador;
import co.systemhome.recargasonline.repository.RecargasOperadorRepository;
import co.systemhome.recargasonline.repository.RecargasRepository;
import co.systemhome.recargasonline.validation.RecargaValidation;

@Service
public class RecargasBusinessImpl implements IRecargasBusiness {

	@Autowired
	RecargasRepository recargasRespository;
	
	@Autowired
	RecargasOperadorRepository recargasOperadorRepository;
	

	@Autowired
	RecargaValidation recargaValidation;

	   private static final Logger logger = LoggerFactory.getLogger(RecargasBusinessImpl.class);

	
	public void recargar(Recargas recarga) throws Exception {
		logger.info("" + RecargasBusinessImpl.class.getName() + " Metodo : recargar()"+  "", GSonUtils.serialize(recarga));
				try {			
					recarga.setFechaTransaccion(new Date());
					recargasRespository.save(recarga);
				}catch (Exception e) {
					logger.error("" + RecargasBusinessImpl.class.getName() + " Metodo : recargar()"+  "Guardando ", e);
					e.printStackTrace();
					throw e;
				}				
		
	}

	@Override
	public List<RecargaDTO> getRecargasToday() {
		return null;
	}

	@Override
	public List<RecargaDTO> getRecargasAll() {
		List<RecargaDTO>  listRecargasDto = null;
		List<Recargas> listRecargas = recargasRespository.findAll();
		if(listRecargas != null ) {
	      listRecargasDto =  new ArrayList<RecargaDTO>();
			for(Recargas r :  listRecargas) {
				listRecargasDto.add( recargaValidation.builderDto(r));
			}
		}
		return listRecargasDto;
	}

	@Override
	public List<RecargasOperadorDto> getRecargasOperador() {
		List<RecargasOperadorDto> listOut = null;
		List<RecargasOperador> listRecargas = recargasOperadorRepository.getRecargasOperador();
		if ( listRecargas != null) {
			listOut = new ArrayList<RecargasOperadorDto>();
			for( RecargasOperador r : listRecargas) {
				listOut.add(RecargasOperadorDto.builder(r) );
			}
			
		}

		return listOut;
	
	}
	
	

}
