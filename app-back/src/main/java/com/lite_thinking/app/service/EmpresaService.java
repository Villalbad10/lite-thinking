package com.lite_thinking.app.service;

import com.lite_thinking.app.dto.EmpresaCreateDTO;
import com.lite_thinking.app.model.Empresa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EmpresaService {

	Empresa crearEmpresa(EmpresaCreateDTO request);

	Page<Empresa> listarEmpresas(Pageable pageable);
}


