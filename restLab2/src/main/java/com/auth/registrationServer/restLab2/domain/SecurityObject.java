package com.auth.registrationServer.restLab2.domain;

import java.util.List;

import org.springframework.data.annotation.Id;

public class SecurityObject {

@Id
private String id;
private String name;
private List<Room> rooms;
private List<Hall> halls;


public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public List<Room> getRooms() {
	return rooms;
}
public void setRooms(List<Room> rooms) {
	this.rooms = rooms;
}
public List<Hall> getHalls() {
	return halls;
}
public void setHalls(List<Hall> halls) {
	this.halls = halls;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
}
