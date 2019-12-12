package com.auth.registrationServer.restLab2.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth.registrationServer.restLab2.DTO.ObjectDTO;
import com.auth.registrationServer.restLab2.DTO.ObjectDTOConvertor;
import com.auth.registrationServer.restLab2.domain.SecurityObject;
import com.auth.registrationServer.restLab2.service.SecurityService;



@RestController
@CrossOrigin
@RequestMapping("/object")
public class SecurityController {
	@Autowired
	private SecurityService securityService;
	
	@Autowired
	private ObjectDTOConvertor convertor;
	/**
	 * @param objectDTO
	 * @param result
	 * @return
	 */
	@PostMapping()
	public ResponseEntity<ObjectDTO> createObject(
			@RequestBody Object name , BindingResult result) {
			SecurityObject object = securityService.getObject("5df18f07115a8b07bc586666");
			object.setName(name.getName());
			object.setId(object.getName());
			securityService.createObject(object);
			return new ResponseEntity<>(null, HttpStatus.CREATED);
	
	}
	@GetMapping("{id}")
	public ResponseEntity<ObjectDTO> getObject(@PathVariable String id) {
		SecurityObject object = securityService.getObject(id);
		
			return new ResponseEntity<ObjectDTO>(convertor.toDTO(object), HttpStatus.OK);

	}
	@GetMapping
	public ResponseEntity<List<ObjectDTO>> getMedicalForms() {
			List<SecurityObject> objects = securityService.getAllObjects();
			
			return new ResponseEntity<List<ObjectDTO>>(convertor.toDTOList(objects), HttpStatus.OK);
	
	}
}
