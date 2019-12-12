package com.auth.registrationServer.restLab2.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth.registrationServer.restLab2.domain.SecurityObject;
import com.auth.registrationServer.restLab2.repository.SecurityRepository;

import javassist.NotFoundException;

@Service
public class SecurityService {

	@Autowired
	private SecurityRepository securityRepositry;

	public List<SecurityObject> getAllObjects() {
		try {
			List<SecurityObject> medicalForms = new ArrayList();
			medicalForms.addAll(securityRepositry.findAll());
			return medicalForms;
		} catch (Exception e) {
		}
		return null;
	}

	public SecurityObject getObject(String id) {
		try {
			Optional<SecurityObject> object = securityRepositry.findById(id);
			return object.orElseThrow();
		} catch (Exception e) {

		}
		return null;
	}

	public SecurityObject createObject(SecurityObject object) {
		object = securityRepositry.save(object);
		return object;

	}

	public void deleteMedicalForm(String id) {
		
			try {
				securityRepositry.deleteById(id);
			} catch (Exception e) {
				
			}
		}
		
	
	}


