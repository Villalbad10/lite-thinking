package com.lite_thinking.app.service.impl;

import com.lite_thinking.app.dto.EmpresaCreateDTO;
import com.lite_thinking.app.exception.BadRequestException;
import com.lite_thinking.app.exception.ConflictException;
import com.lite_thinking.app.model.Empresa;
import com.lite_thinking.app.repository.EmpresaRepository;
import com.lite_thinking.app.service.EmpresaService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Slf4j
@Service
public class EmpresaServiceImpl implements EmpresaService {

	@Autowired
	private  EmpresaRepository empresaRepository;

	@Override
	public Empresa crearEmpresa(EmpresaCreateDTO request) {
		validarRequest(request);

		if (empresaRepository.existsByNit(request.getNit())) {
			log.info("entra nit ", request.getNit());
			throw new BadRequestException("Ya existe una empresa con el mismo NIT");
		}
		if (empresaRepository.existsByNombre(request.getNombre())) {
			throw new ConflictException("Ya existe una empresa con el mismo nombre");
		}

		Empresa empresa = new Empresa();
		empresa.setNit(request.getNit().trim());
		empresa.setNombre(request.getNombre().trim());
		empresa.setDireccion(request.getDireccion().trim());
		empresa.setTelefono(request.getTelefono());

		Empresa guardada = empresaRepository.save(empresa);
		log.info("Empresa creada con id {} y NIT {}", guardada.getIdEmpresa(), guardada.getNit());
		return guardada;
	}

	@Override
	public Page<Empresa> listarEmpresas(Pageable pageable) {
		return empresaRepository.findAll(pageable);
	}

	private void validarRequest(EmpresaCreateDTO request) {
		if (request == null) {
			throw new BadRequestException("El cuerpo de la solicitud es obligatorio");
		}
		if (!StringUtils.hasText(request.getNit())) {
			throw new BadRequestException("El NIT es obligatorio");
		}
		if (!StringUtils.hasText(request.getNombre())) {
			throw new BadRequestException("El nombre es obligatorio");
		}
		if (!StringUtils.hasText(request.getDireccion())) {
			throw new BadRequestException("La dirección es obligatoria");
		}
	}
}


