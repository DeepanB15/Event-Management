package com.example.events.controller;

import com.example.events.model.Event;
import com.example.events.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepo;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        event.setRegistered(0);
        return eventRepo.save(event);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable String id, @RequestBody Event updatedEvent) {
        updatedEvent.setId(id);
        return eventRepo.save(updatedEvent);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable String id) {
        eventRepo.deleteById(id);
    }
}
