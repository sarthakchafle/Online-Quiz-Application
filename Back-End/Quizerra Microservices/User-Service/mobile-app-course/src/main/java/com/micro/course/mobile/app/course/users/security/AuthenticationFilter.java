package com.micro.course.mobile.app.course.users.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.micro.course.mobile.app.course.services.UserService;
import com.micro.course.mobile.app.course.shared.UserDto;
import com.micro.course.mobile.app.course.users.ui.models.LoginRequestModel;
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
import javax.servlet.http.HttpServlet;
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
        String token = Jwts.builder().setSubject(userDetails.getUserId())
                .setExpiration(new Date(System.currentTimeMillis()+Long.parseLong(environment.getProperty("token.expiration_time"))))
        .signWith(SignatureAlgorithm.HS512,environment.getProperty("token.secret"))
                .compact();

        res.addHeader("token",token);
        res.addHeader("userId",userDetails.getUserId());

    }
}
