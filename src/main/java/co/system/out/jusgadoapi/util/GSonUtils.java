package co.system.out.jusgadoapi.util;

import java.lang.reflect.Type;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
/**
 * Utilidades usando la libreria gson
 *
 * @author Faber Murillo
 * @since 22/06/2020
 */
public class GSonUtils {

    /**
     * Convierte un objeto a json
     *
     * @param src
     * @return
     */
    public static String serialize(Object src) {
        Gson gson = new Gson();
        return gson.toJson(src);
    }

    /**
     * Convierte un objeto a otro objeto
     *
     * @param src
     * @param dClass
     * @param <D>
     * @return
     */
    public static <D> D toObject(Object src, Class<D> dClass) {
        Gson gson = new Gson();
        String srcJson = gson.toJson(src);
        return gson.fromJson(srcJson, dClass);
    }

    /**
     * Convierte un objeto a otro objeto
     *
     * @param srcJson
     * @param dClass
     * @param <D>
     * @return
     */
    public static <D> D toObject(String srcJson, Class<D> dClass) {
        Gson gson = new Gson();
        return gson.fromJson(srcJson, dClass);
    }
    
    
    public static <T> List<T>  toList(String src, Class<T> clazz) {
		Gson gson = new Gson();
		 Type typeOfT = TypeToken.getParameterized(List.class, clazz).getType();
		return gson.fromJson(src,typeOfT);
	}

}

