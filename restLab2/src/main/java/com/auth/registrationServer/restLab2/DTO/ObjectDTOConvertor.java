package com.auth.registrationServer.restLab2.DTO;


import java.util.List;
import java.util.stream.Collectors;


import org.springframework.stereotype.Service;

import com.auth.registrationServer.restLab2.domain.SecurityObject;

@Service
public class ObjectDTOConvertor {

	
	public ObjectDTO toDTO(SecurityObject object) {
			ObjectDTO objectDTO = new ObjectDTO();
			objectDTO.setName(object.getName());
			objectDTO.setRooms(object.getRooms());
			objectDTO.setHalls(object.getHalls());
			return objectDTO;
	}

	public SecurityObject fromDTO(ObjectDTO objectDTO) {
			SecurityObject object = new SecurityObject();
			object.setName(objectDTO.getName());
			object.setHalls(objectDTO.getHalls());
			object.setRooms(objectDTO.getRooms());
			return object;
	}

	

	public List<ObjectDTO> toDTOList(List<SecurityObject> objects) {
		return objects.stream().map(object -> toDTO(object))
				.collect(Collectors.toList());
	}

	public List<Object> fromDTOList(List<ObjectDTO> dtos) {
		return dtos.stream().map(dto -> fromDTO(dto)).collect(Collectors.toList());
	}

}