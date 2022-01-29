package co.systemhome.recargasonline;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	@Configuration
	@EnableWebSecurity
	@EnableGlobalMethodSecurity(securedEnabled = true)
	class WebSecurityConfig extends WebSecurityConfigurerAdapter {

		@Override
		protected void configure(HttpSecurity http) throws Exception {

			http.cors()
			.and()
			.csrf()
			.disable()
			.authorizeRequests()
			.antMatchers(HttpMethod.GET, "/")
					.permitAll().antMatchers(HttpMethod.GET, "/app.js")
					.permitAll().antMatchers(HttpMethod.GET, "/favicon.ico")
					.permitAll().antMatchers(HttpMethod.GET, "/css/**")
					.permitAll().antMatchers(HttpMethod.GET, "/webfonts/**")
					.permitAll().antMatchers(HttpMethod.GET, "/js/**")
					.permitAll().antMatchers(HttpMethod.GET, "/componentes/**").permitAll()
					.antMatchers(HttpMethod.GET, "/lib/**").permitAll().antMatchers(HttpMethod.GET, "/servicios/**")
					.permitAll().antMatchers(HttpMethod.POST, "/usuario/login").permitAll()
					.antMatchers(HttpMethod.POST, "/recargas/recargar/").permitAll()
					.antMatchers(HttpMethod.GET, "/recargas/**").permitAll().antMatchers(HttpMethod.GET, "/platos/**")
					.permitAll().antMatchers(HttpMethod.GET, "/TipoDocumento/**").permitAll()
					.antMatchers(HttpMethod.POST, "/user/create/**").permitAll()
					.antMatchers(HttpMethod.GET, "/user/validate/**").permitAll()

					.anyRequest().authenticated().and();

		}
		
		 @Bean
		    CorsConfigurationSource corsConfigurationSource() {
		        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
		        return source;
		    }

	}

	/*
	 * @Configuration
	 * 
	 * @EnableWebMvc public class WebConfig implements WebMvcConfigurer {
	 * 
	 * @Override public void addCorsMappings(CorsRegistry registry) {
	 * registry.addMapping("/**"); }
	 * 
	 * 
	 * @Override public void addViewControllers(ViewControllerRegistry registry) {
	 * registry.addRedirectViewController("/", "index.html"); }
	 * 
	 * }
	 */

}
