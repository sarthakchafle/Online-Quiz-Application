package com.cts.mfpe.UserService.users.security;

import com.cts.mfpe.UserService.services.UserService;
import com.cts.mfpe.UserService.shared.UserDto;
import com.cts.mfpe.UserService.users.ui.models.LoginRequestModel;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {


    private UserService userService;
    private Environment environment;



    public AuthenticationFilter(UserService userService, Environment environment,AuthenticationManager authenticationManager) {
        super(authenticationManager);
        this.userService = userService;
        this.environment = environment;
    }
    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) throws AuthenticationException {
        try {
            LoginRequestModel creds = new ObjectMapper().readValue(req.getInputStream(), LoginRequestModel.class);

            return getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(creds.getEmail(), creds.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,Authentication auth) throws IOException, ServletException{
        String userName = ((User)auth.getPrincipal()).getUsername();
        UserDto userDetails =  userService.getUserDetailsByEmail(userName);
        String isAdmin = Boolean.toString(userDetails.isAdmin());
        String token = Jwts.builder().setSubject(userDetails.getUserId())
                .setExpiration(new Date(System.currentTimeMillis()+Long.parseLong(environment.getProperty("token.expiration_time"))))
        .signWith(SignatureAlgorithm.HS512,environment.getProperty("token.secret"))
                .compact();

        res.addHeader("token",token);
        res.addHeader("userId",userDetails.getUserId());
        res.addHeader("isAdmin", isAdmin);
    }
}
