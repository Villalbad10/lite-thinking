package com.lite_thinking.app.controller;

import com.lite_thinking.app.dto.EmpresaCreateDTO;
import com.lite_thinking.app.model.Empresa;
import com.lite_thinking.app.service.EmpresaService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/lite/empresa")
public class EmpresaController {

	@Autowired
	private  EmpresaService empresaService;

	@PostMapping("/save")
	public ResponseEntity<Empresa> crear(@Valid @RequestBody EmpresaCreateDTO request) {
		log.info("Solicitud para crear empresa con NIT {}", request.getNit());
		Empresa creada = empresaService.crearEmpresa(request);
		return ResponseEntity.status(HttpStatus.CREATED).body(creada);
	}


	@GetMapping("/list")
	public ResponseEntity<Page<Empresa>> listar(Pageable pageable) {
		Page<Empresa> empresas = empresaService.listarEmpresas(pageable);
		return ResponseEntity.ok(empresas);
	}
}


