package com.auth.registrationServer.restLab2;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@ComponentScan(basePackages = "com.auth.registrationServer.restLab2")
public class SwaggerConfig {
	private static final String SWAGGER_API_VERSION = "1.0";
	private static final String LICENSE_TEXT = "Only for Object Service";
	private static final String title = "MedicalCard REST API";
	private static final String description = "RESTful API for Object";

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title(title).description(description).license(LICENSE_TEXT)
				.version(SWAGGER_API_VERSION).build();
	}

	@Bean
	public Docket productsApi() {
		return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).pathMapping("/").select()
				.paths(PathSelectors.regex("/.*")).build().securitySchemes(Arrays.asList(apiKey()))
				.globalOperationParameters(commonParameters());
	}

	private List<Parameter> commonParameters() {
		List<Parameter> parameters = new ArrayList<Parameter>();
		parameters.add(new ParameterBuilder().name("Authorization").description("token for authorization")
				.modelRef(new ModelRef("string")).parameterType("header").required(false).build());
		return parameters;
	}

	private ApiKey apiKey() {
		return new ApiKey("Authorization", "Authorization", "header");
	}
	
}