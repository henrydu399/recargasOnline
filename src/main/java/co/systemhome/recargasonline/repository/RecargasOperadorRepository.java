package co.systemhome.recargasonline.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import co.systemhome.recargasonline.model.RecargasOperador;

public interface RecargasOperadorRepository  extends JpaRepository<RecargasOperador, String >{
	
	@Transactional(readOnly = true)
	 @Query(nativeQuery = true, value = " SELECT "
	 		+ " operador, "
	 		+ " SUM(valor)  total, "
	 		+ " COUNT(id_transaccion)  cantidad "
	 		+ " FROM "
	 		+ " recargas "
	 		+ " GROUP BY operador ")
	public List<RecargasOperador> getRecargasOperador();

}
