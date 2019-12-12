package com.auth.registrationServer.restLab2.domain;

import java.util.List;

public class Sensor {

	private String name;
	private List<String> settings;
	private List<String> notifications;
	private boolean systemNotificationsOn;
	private boolean notificationsOn;


	
	
	
	public void addSettings(String setting) {
		this.settings.add(setting);
		
	}
	public void addNotifications(String notification) {
		this.notifications.add(notification);
		
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<String> getNotifications() {
		return notifications;
	}

	public void setNotifications(List<String> notifications) {
		this.notifications = notifications;
	}

	public List<String> getSettings() {
		return settings;
	}

	public void setSettings(List<String> settings) {
		this.settings = settings;
	}

	public boolean isSystemNotificationsOn() {
		return systemNotificationsOn;
	}

	public void setSystemNotificationsOn(boolean systemNotificationsOn) {
		this.systemNotificationsOn = systemNotificationsOn;
	}

	public boolean isNotificationsOn() {
		return notificationsOn;
	}

	public void setNotificationsOn(boolean notificationsOn) {
		this.notificationsOn = notificationsOn;
	}
}
