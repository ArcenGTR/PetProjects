package com.arcengtr.studentManagementApp.repository;

import com.arcengtr.studentManagementApp.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}
