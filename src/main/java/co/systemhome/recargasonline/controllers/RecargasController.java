package co.systemhome.recargasonline.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import co.systemhome.recargasonline.business.IRecargasBusiness;
import co.systemhome.recargasonline.dto.RecargaDTO;
import co.systemhome.recargasonline.dto.RecargasOperadorDto;
import co.systemhome.recargasonline.model.Recargas;
import co.systemhome.recargasonline.validation.RecargaValidation;

@CrossOrigin
@RestController
public class RecargasController {

	@Autowired
	IRecargasBusiness recargaBusiness;
	
	 
		@Autowired
		RecargaValidation recargaValidation;
	
	@PostMapping("recargas/recargar")
	public  ResponseEntity<Object> recargar(@RequestBody RecargaDTO recarga)  {
		
			try {
				if( recargaValidation.isvalid(recarga)) {				
					try {
						Recargas recargaEntity = recargaValidation.builderRecarga(recarga);	
						recargaBusiness.recargar(recargaEntity);
						return ResponseEntity.status(200).build();
					} catch (Exception e) {
						return ResponseEntity.status(500).body("Error gistrando  recarga");
					}
				}else {
					return ResponseEntity.status(500).body("error validando recarga");		
				}
			} catch (Exception e) {
				return ResponseEntity.status(500).body(e.getMessage());	
			
			}
		
		
	}
	
	@GetMapping("recargas/getToday")
	public List<RecargaDTO> getRecargasToday() {
		return null;
	}
	
	
	@GetMapping("recargas/all")
	public  List<RecargaDTO> getRecargasAll() {
		return recargaBusiness.getRecargasAll();
	}
	
	@GetMapping("recargas/operador")
	public  List<RecargasOperadorDto> getRecargasOperador() {
		return recargaBusiness.getRecargasOperador();
	}
	
}
