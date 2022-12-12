package com.example.EAD.CW2.controller;


import com.example.EAD.CW2.models.Student;
import com.example.EAD.CW2.repositories.StudentRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.source.InvalidConfigurationPropertyValueException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:63342/")
@RestController
public class controller {
    @Autowired
    StudentRepositories StudentRepo;

    @RequestMapping(value = "/")
    public String index(){
        return "index";
    }

    @GetMapping(path = "/all" )
    public List<Student> getAllDetails(){

        return  StudentRepo.findAll();

        //http:localhost:8080/api/all
    }

    @PostMapping(path = "/create",consumes={"application/json"})
    public String createDetail(@RequestBody Student student)
    {
        StudentRepo.save(student);
            return "sucessfully saved!";
    }


    // delete student rest api
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteStudent(@PathVariable int id){
        Student Student = StudentRepo.findById(id)
                .orElseThrow(() -> {
                    return new InvalidConfigurationPropertyValueException("Student not exist " , StudentRepo,"");
                });

        StudentRepo.delete(Student);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


    // get student by id rest api
    @GetMapping("/find/{id}")
    public ResponseEntity<Student> getCarById(@PathVariable int id) {
        Student Student = StudentRepo.findById(id)
                .orElseThrow(() -> new InvalidConfigurationPropertyValueException("student not exist " ,StudentRepo,""));
        return ResponseEntity.ok(Student);
    }

    // update student by id rest api
    @PutMapping("/update/{id}")
    public ResponseEntity<Student> updateEmployee(@PathVariable int id, @RequestBody Student Object){
        Student student = StudentRepo.findById(id)
                .orElseThrow(() -> new InvalidConfigurationPropertyValueException("Student not exist " , StudentRepo,""));

        student.setId(student.getId());
        student.setFirstName(student.getFirstName());
        student.setLastName(student.getLastName());
        student.setEmail(student.getEmail());
        student.setDepartment(student.getDepartment());
        student.setNic(student.getNic());



        Student updatedStudent = StudentRepo.save(student);
        return ResponseEntity.ok(updatedStudent);
    }



    }


