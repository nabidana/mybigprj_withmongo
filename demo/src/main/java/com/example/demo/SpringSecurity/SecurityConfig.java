package com.example.demo.SpringSecurity;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity(debug = false)
@RequiredArgsConstructor
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
         http
            .httpBasic().disable()
            .cors().disable()
            .csrf(csrf -> csrf.disable())
            .formLogin((formLogin) ->
                 formLogin
                     .usernameParameter("userId")
                     .passwordParameter("userPassword")
                     .loginPage("/login")
                     .failureUrl("/loginfailed")
                     .loginProcessingUrl("/dologin")
                     .defaultSuccessUrl("/")
             )
             .logout((logout) ->
                 logout.deleteCookies("remove")
                     .invalidateHttpSession(false)
                     .logoutUrl("/logout")
                     .logoutSuccessUrl("/")
             )
            .authorizeHttpRequests(request ->
                request
                .requestMatchers("/add", "/delete", "/useraccount**", "/inputGame",
                                    "/modifygame**").hasRole("ADMIN")
                .requestMatchers("/buy", "/myitem**", "/addcart", "/deletecart**").hasRole("USER")
                .requestMatchers("/modifyuser**").hasAnyRole("ADMIN","USER")
                .requestMatchers("/**").permitAll()
                //.anyRequest().authenticated()
                //.anyRequest().permitAll()
            )
            .exceptionHandling( exceptionHandling ->
                exceptionHandling.accessDeniedPage("/err")
            )
            .requestCache( (cache) -> 
                cache.disable()
            )
            ;
            //.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());

            return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
