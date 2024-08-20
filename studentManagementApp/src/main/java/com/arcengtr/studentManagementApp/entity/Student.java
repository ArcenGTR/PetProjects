package com.arcengtr.studentManagementApp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull(message = "First name is required")
    @Size(max = 60, message = "Too long, max length of First Name is 60 symbols")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull(message = "Last name is required")
    @Size(max = 60, message = "Too long, max length of Last Name is 60 symbols")
    @Column(name = "last_name")
    private String lastName;

    @NotNull(message = "Email is required")
    @Size(max = 60, message = "Too long, max length of Email is 60 symbols")
    @Column(name = "email", unique = true)
    private String email;

    public Student(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email=" + email +
                '}';
    }
}
