package com.auth.registrationServer.restLab2.domain;

import java.util.List;

public class Hall {

	private String name;
	private List<Sensor> sensors;
	

	public List<Sensor> getSensors() {
		return sensors;
	}
	public void setSensors(List<Sensor> sensors) {
		this.sensors = sensors;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = "Hall:"+name;
	}
}
