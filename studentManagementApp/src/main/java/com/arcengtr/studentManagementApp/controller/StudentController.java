package com.arcengtr.studentManagementApp.controller;

import com.arcengtr.studentManagementApp.entity.Student;
import com.arcengtr.studentManagementApp.service.StudentService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class StudentController {

    private StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public String listOfStudents(Model model) {
        List<Student> students = studentService.getListOfStudents();
        model.addAttribute("students", students);

        return "students";
    }

    @GetMapping("/students/new")
    public String newStudent(Model model) {
        Student student = new Student();
        model.addAttribute("student", student);

        return "createStudent";
    }

    @PostMapping("/students/save")
    public String saveStudent(@ModelAttribute("student") Student student) {
        studentService.saveStudent(student);

        return "redirect:/students";
    }

    @GetMapping("/students/edit")
    public String updateStudent(@ModelAttribute("studentId") Integer studentId, Model model) {
        model.addAttribute("student", studentService.getStudentById(studentId));

        return "editStudent";
    }

    @GetMapping("/students/delete")
    public String deleteStudent(@ModelAttribute("studentId") Integer studentId, Model model) {
        studentService.deleteStudent(studentId);

        return "redirect:/students";
    }
}
