package com.arcengtr.studentManagementApp.service;

import com.arcengtr.studentManagementApp.entity.Student;

import java.util.List;

public interface StudentService {
    List<Student> getListOfStudents();
    void saveStudent(Student student);
    Student getStudentById(int id);
    void updateStudent(Student student);
    void deleteStudent(int id);
}
