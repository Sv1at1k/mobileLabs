package com.auth.registrationServer.restLab2.DTO;

import java.util.List;

import com.auth.registrationServer.restLab2.domain.Hall;
import com.auth.registrationServer.restLab2.domain.Room;


public class ObjectDTO {
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

}
