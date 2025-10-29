package com.lite_thinking.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class EmpresaCreateDTO {

	@NotBlank(message = "El NIT es obligatorio")
	@Size(max = 50, message = "El NIT no debe exceder 50 caracteres")
	private String nit;

	@NotBlank(message = "El nombre es obligatorio")
	@Size(max = 150, message = "El nombre no debe exceder 150 caracteres")
	private String nombre;

	@NotBlank(message = "La dirección es obligatoria")
	@Size(max = 255, message = "La dirección no debe exceder 255 caracteres")
	private String direccion;

	private String telefono;
}


