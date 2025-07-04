package com.micro.course.mobile.app.course.shared;

import com.micro.course.mobile.app.course.users.ui.models.AlbumResponseModel;

import java.io.Serializable;
import java.util.List;

public class UserDto implements Serializable {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String userId;
    private List<AlbumResponseModel> albums;

    public List<AlbumResponseModel> getAlbums() {
        return albums;
    }

    public void setAlbums(List<AlbumResponseModel> albums) {
        this.albums = albums;
    }

    private String encryptedPassword;

    public UserDto(String firstName, String lastName, String email, String password, String userId, String encryptedPassword) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.userId = userId;
        this.encryptedPassword = encryptedPassword;
    }

    public UserDto() {
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEncryptedPassword() {
        return encryptedPassword;
    }

    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }
}
