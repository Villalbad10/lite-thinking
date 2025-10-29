package com.lite_thinking.app.service;

import com.lite_thinking.app.dto.ProductoCreateDTO;
import com.lite_thinking.app.model.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductoService {

	Producto crearProducto(ProductoCreateDTO request);

	Page<Producto> listarProductosPorEmpresa(Long empresaId, Pageable pageable);
}


