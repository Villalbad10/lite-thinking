package com.lite_thinking.app.controller;

import com.lite_thinking.app.dto.ProductoCreateDTO;
import com.lite_thinking.app.model.Producto;
import com.lite_thinking.app.service.ProductoService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/lite/producto")
public class ProductoController {

	@Autowired
	private ProductoService productoService;

	@PostMapping("/save")
	public ResponseEntity<Producto> crear(@Valid @RequestBody ProductoCreateDTO request) {
		log.info("Solicitud para crear producto con código {}", request.getCodigo());
		Producto creado = productoService.crearProducto(request);
		return ResponseEntity.status(HttpStatus.CREATED).body(creado);
	}

	@GetMapping("/list/{empresaId}")
	public ResponseEntity<Page<Producto>> listarPorEmpresa(
			@PathVariable("empresaId") Long empresaId,
			Pageable pageable) {
		log.info("Solicitud para listar productos de la empresa {}", empresaId);
		Page<Producto> productos = productoService.listarProductosPorEmpresa(empresaId, pageable);
		return ResponseEntity.ok(productos);
	}
}


