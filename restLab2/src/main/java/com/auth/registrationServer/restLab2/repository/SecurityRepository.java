package com.auth.registrationServer.restLab2.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.auth.registrationServer.restLab2.domain.SecurityObject;


public interface SecurityRepository extends MongoRepository<SecurityObject, String> {
	List<SecurityObject> findAllByName(String name);
	Optional<SecurityObject> findOneByName(String name);
}
