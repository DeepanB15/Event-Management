package com.example.events.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "events")
public class Event {
    @Id
    private String id;
    private String title;
    private String date;
    private String location;
    private int spots;
    private int registered;
    private String category;

    public Event() {}

    public Event(String title, String date, String location, int spots, String category) {
        this.title = title;
        this.date = date;
        this.location = location;
        this.spots = spots;
        this.registered = 0;
        this.category = category;
    }

    // --- Getters and Setters ---
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public int getSpots() { return spots; }
    public void setSpots(int spots) { this.spots = spots; }

    public int getRegistered() { return registered; }
    public void setRegistered(int registered) { this.registered = registered; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
