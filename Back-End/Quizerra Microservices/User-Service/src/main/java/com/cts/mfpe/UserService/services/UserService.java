package com.cts.mfpe.UserService.services;


import com.cts.mfpe.UserService.shared.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    UserDto CreateUser(UserDto userDetails);
    UserDto getUserDetailsByEmail(String email);

    UserDto getUserById(String userId);
}
