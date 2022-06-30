package com.micro.course.mobile.app.course.services;

import com.micro.course.mobile.app.course.shared.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    UserDto CreateUser(UserDto userDetails);
    UserDto getUserDetailsByEmail(String email);

    UserDto getUserById(String userId);
}
