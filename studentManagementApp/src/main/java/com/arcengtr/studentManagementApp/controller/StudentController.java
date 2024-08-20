package com.arcengtr.studentManagementApp.controller;

import com.arcengtr.studentManagementApp.entity.Student;
import com.arcengtr.studentManagementApp.exception.NotUniqueEmailException;
import com.arcengtr.studentManagementApp.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import javax.naming.Binding;
import java.util.List;

@Controller
public class StudentController {

    private StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
        binder.registerCustomEditor(String.class, stringTrimmerEditor);
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
    public String saveStudent(@Valid @ModelAttribute("student") Student student, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return "createStudent";
        } else {
            try {
                studentService.saveStudent(student);
                return "redirect:/students";
            } catch (DataIntegrityViolationException e) {
                throw new NotUniqueEmailException("Student with this email already exists");
            }

        }
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
