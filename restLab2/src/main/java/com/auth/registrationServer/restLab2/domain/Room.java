package com.auth.registrationServer.restLab2.domain;

import java.util.List;

public class Room {
	
	private String name;
	private List<Sensor> sensors;
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = "Room:" + name;
	}
	public List<Sensor> getSensors() {
		return sensors;
	}
	public void setSensors(List<Sensor> sensors) {
		this.sensors = sensors;
	}
}
