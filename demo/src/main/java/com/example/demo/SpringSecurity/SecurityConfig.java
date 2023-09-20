package com.example.demo.SpringSecurity;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity(debug = false)
@RequiredArgsConstructor
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        return http
            .httpBasic().disable()
            .cors().disable()
            .csrf().disable()
            .formLogin((formLogin) ->
                 formLogin
                     .usernameParameter("userId")
                     .passwordParameter("userPassword")
                     .loginPage("/login")
                     .failureUrl("/loginfailed")
                     .loginProcessingUrl("/dologin")
                     .defaultSuccessUrl("/")
             )
            .authorizeHttpRequests(request ->
                request
                .requestMatchers("/add", "/delete", "useraccount").hasRole("ADMIN")
                .requestMatchers("/buy", "/myitem").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/**").permitAll()
                //.anyRequest().authenticated()
                //.anyRequest().permitAll()
            )
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
