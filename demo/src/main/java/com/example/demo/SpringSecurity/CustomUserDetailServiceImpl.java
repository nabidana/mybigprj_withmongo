package com.example.demo.SpringSecurity;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Users.Domain.Userinfo;
import com.example.demo.Users.Repository.UserinfoRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailServiceImpl implements UserDetailsService{

    private final PasswordEncoder passwordEncoder;
    private final UserinfoRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //log.info(username);
        //log.info(userRepository.findById(username).toString());
        return userRepository.findById(username)
            .map(this::createUserDetails)
            .orElseThrow( () -> new UsernameNotFoundException("해당하는 사용자를 찾을 수 없습니다."));
    }
    
    private UserDetails createUserDetails(Userinfo user){
        if(user.isEnabled()){
            return User.builder()
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .roles(user.getUserRole())
                .build();
        }else{
            return new Userinfo();
        }
    }

}
