package com.lite_thinking.app.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductoCreateDTO {

	@NotBlank(message = "El código es obligatorio")
	@Size(max = 100, message = "El código no debe exceder 100 caracteres")
	private String codigo;

	@NotBlank(message = "El nombre es obligatorio")
	@Size(max = 200, message = "El nombre no debe exceder 200 caracteres")
	private String nombre;

	@Size(max = 1000, message = "La descripción no debe exceder 1000 caracteres")
	private String descripcion;

	@NotNull(message = "El precio es obligatorio")
	@Min(value = 0, message = "El precio no puede ser negativo")
	private BigDecimal precio;

	@NotNull(message = "El stock es obligatorio")
	@Min(value = 0, message = "El stock no puede ser negativo")
	private Integer stock;

	@NotNull(message = "El id de la empresa es obligatorio")
	private Long empresaId;

}


