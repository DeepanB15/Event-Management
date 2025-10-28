package com.example.events.controller;

import com.example.events.model.User;
import com.example.events.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @GetMapping
    public List<User> getAll() {
        return userRepo.findAll();
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        return userRepo.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Staff ID or Email"));
    }

    @PutMapping("/register/{id}")
    public User registerEvent(@PathVariable String id, @RequestBody String eventId) {
        User user = userRepo.findById(id).orElseThrow();
        if (!user.getRegisteredEvents().contains(eventId)) {
            user.getRegisteredEvents().add(eventId);
        }
        return userRepo.save(user);
    }
}
