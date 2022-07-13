package com.cts.mfpe.UserService.services;

import com.cts.mfpe.UserService.data.ServiceClient;
import com.cts.mfpe.UserService.data.UserEntity;
import com.cts.mfpe.UserService.repository.UsersRepository;
import com.cts.mfpe.UserService.shared.UserDto;
import com.cts.mfpe.UserService.users.ui.models.AlbumResponseModel;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    UsersRepository usersRepository;
    //    RestTemplate restTemplate;
    Environment environment;

    ServiceClient serviceClient;
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UsersRepository usersRepository, BCryptPasswordEncoder bCryptPasswordEncoder, ServiceClient serviceClient, Environment environment) {
        this.usersRepository = usersRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.serviceClient = serviceClient;
        this.environment = environment;
    }

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public UserDto CreateUser(UserDto userDetails) {
        userDetails.setUserId(UUID.randomUUID().toString());
        userDetails.setEncryptedPassword(bCryptPasswordEncoder.encode(userDetails.getPassword()));
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        UserEntity userEntity = modelMapper.map(userDetails, UserEntity.class);
        // userEntity.setEncryptedPassword("test");

        usersRepository.save(userEntity);

        UserDto returnValue = modelMapper.map(userEntity, UserDto.class);
        return returnValue;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = usersRepository.findByEmail(username);
        if (userEntity == null)
            throw new UsernameNotFoundException(username);
        return new User(userEntity.getEmail(), userEntity.getEncryptedPassword(), true, true, true, true, new ArrayList<>());
    }

    @Override
    public UserDto getUserDetailsByEmail(String email) {
        UserEntity userEntity = usersRepository.findByEmail(email);
        if (userEntity == null)
            throw new UsernameNotFoundException(email);
        return new ModelMapper().map(userEntity, UserDto.class);
    }

    @Override
    public UserDto getUserById(String userId) {
        UserEntity userEntity = usersRepository.findByUserId(userId);
        if (userEntity == null) {
            throw new UsernameNotFoundException("User not found");
        }
        UserDto userDto = new ModelMapper().map(userEntity, UserDto.class);
//        String albumsurl = String.format(environment.getProperty("albums.url"), userId);
//        ResponseEntity<List<AlbumResponseModel>> albumsListResponse = restTemplate.exchange(albumsurl, HttpMethod.GET, null, new ParameterizedTypeReference<List<AlbumResponseModel>>() {
//        logger.info("before calling Microservice");

//        List<AlbumResponseModel> albumResponseModelList = serviceClient.getAlbums(userId);
//        logger.info("after calling Microservice");
        // });
//        List<AlbumResponseModel> albumResponseModelList = albumsListResponse.getBody();
//        userDto.setAlbums(albumResponseModelList);
        return userDto;
    }
}
