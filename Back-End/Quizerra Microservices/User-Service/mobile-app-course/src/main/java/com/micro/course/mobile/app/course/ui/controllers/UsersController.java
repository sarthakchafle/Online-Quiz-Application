package com.micro.course.mobile.app.course.ui.controllers;

import com.micro.course.mobile.app.course.repository.UsersRepository;
import com.micro.course.mobile.app.course.services.UserService;
import com.micro.course.mobile.app.course.shared.UserDto;
import com.micro.course.mobile.app.course.users.ui.models.CreateUserRequestModel;
import com.micro.course.mobile.app.course.users.ui.models.CreateUserResponseModel;
import com.micro.course.mobile.app.course.users.ui.models.UserResponseModel;
import com.netflix.discovery.converters.Auto;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")

public class UsersController {

    @Autowired
    UserService userService;
    @Autowired
    Environment environment;

    @Autowired
    UsersRepository usersRepository;

    @GetMapping("/status/check")
    public String status() {
        return "working on port " + environment.getProperty("server.port") + "with token= "+environment.getProperty("token.secret");
    }

    @PostMapping(consumes = {MediaType.APPLICATION_XML_VALUE,MediaType.APPLICATION_JSON_VALUE},
    produces = {MediaType.APPLICATION_XML_VALUE,MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity createUser(@Valid @RequestBody CreateUserRequestModel userDetials) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        UserDto userDto = modelMapper.map(userDetials, UserDto.class);
        UserDto createdUser = userService.CreateUser(userDto);
//        userService.CreateUser(userDto);
        CreateUserResponseModel returnValue = modelMapper.map(createdUser,CreateUserResponseModel.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(returnValue);
    }

    @GetMapping(value = "/{userId}",produces = {MediaType.APPLICATION_JSON_VALUE})
//    @PreAuthorize("principal==#emailId")
    public ResponseEntity<UserResponseModel>getUser(@PathVariable ("userId")String userId){
        UserDto userDto = userService.getUserById(userId);
        UserResponseModel returnValue = new ModelMapper().map(userDto,UserResponseModel.class);

        return ResponseEntity.status(HttpStatus.OK).body(returnValue);
    }

    @GetMapping("/f/exists/")
    @ResponseBody
    public boolean existsByUserId(@RequestParam String id) {
        return usersRepository.existsByUserId(id);
    }
}
