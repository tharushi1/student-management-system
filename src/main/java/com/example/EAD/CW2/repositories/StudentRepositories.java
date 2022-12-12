package com.example.EAD.CW2.repositories;

import com.example.EAD.CW2.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StudentRepositories extends JpaRepository<Student,Integer> {
}
