package com.micro.course.mobile.app.course.users.ui.models;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CreateUserRequestModel{

    @NotNull(message = "firstname cannot be null")
    @Size(min = 2,message = "Firstname cannot be less than 2 characters")
    private String firstName;
    @NotNull(message = "lastname cannot be null")
    @Size(min = 2,message = "Firstname cannot be less than 2 characters")
    private String lastName;
    @NotNull(message = "password cannot be null")
    @Size(min = 6,message = "Firstname cannot be less than 6 characters and greater than 16")
    private String password;
    @NotNull(message = "email cannot be null")
    @Email
    private String email;

    public CreateUserRequestModel(String firstName, String lastName, String password, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
    }

    public CreateUserRequestModel() {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
