package com.lite_thinking.app.service.impl;

import com.lite_thinking.app.dto.ProductoCreateDTO;
import com.lite_thinking.app.exception.BadRequestException;
import com.lite_thinking.app.exception.NotFoundException;
import com.lite_thinking.app.model.Empresa;
import com.lite_thinking.app.model.Producto;
import com.lite_thinking.app.repository.EmpresaRepository;
import com.lite_thinking.app.repository.ProductoRepository;
import com.lite_thinking.app.service.ProductoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Set;

@Slf4j
@Service
public class ProductoServiceImpl implements ProductoService {

	@Autowired
	private ProductoRepository productoRepository;

	@Autowired
	private EmpresaRepository empresaRepository;

    

	@Override
	public Producto crearProducto(ProductoCreateDTO request) {
		validarRequest(request);

		Empresa empresa = empresaRepository.findById(request.getEmpresaId())
				.orElseThrow(() -> new NotFoundException("Empresa no encontrada"));
		if (empresa.isDeleted()) {
			throw new BadRequestException("No se pueden crear productos para una empresa eliminada");
		}

		Producto producto = new Producto();
		producto.setCodigo(request.getCodigo().trim());
		producto.setNombre(request.getNombre().trim());
		producto.setDescripcion(StringUtils.hasText(request.getDescripcion()) ? request.getDescripcion().trim() : null);
		producto.setPrecio(request.getPrecio());
		producto.setStock(request.getStock());
		producto.setEmpresa(empresa);
        // categorías no se reciben en la petición

		Producto guardado = productoRepository.save(producto);
		log.info("Producto creado con id {} y código {}", guardado.getIdProducto(), guardado.getCodigo());
		return guardado;
	}

	private void validarRequest(ProductoCreateDTO request) {
		if (request == null) {
			throw new BadRequestException("El cuerpo de la solicitud es obligatorio");
		}
		if (!StringUtils.hasText(request.getCodigo())) {
			throw new BadRequestException("El código es obligatorio");
		}
		if (!StringUtils.hasText(request.getNombre())) {
			throw new BadRequestException("El nombre es obligatorio");
		}
		if (request.getPrecio() == null || request.getPrecio().signum() < 0) {
			throw new BadRequestException("El precio debe ser mayor o igual a 0");
		}
		if (request.getStock() == null || request.getStock() < 0) {
			throw new BadRequestException("El stock debe ser mayor o igual a 0");
		}
		if (request.getEmpresaId() == null || request.getEmpresaId() <= 0) {
			throw new BadRequestException("El id de la empresa es obligatorio");
		}
	}

	@Override
	public Page<Producto> listarProductosPorEmpresa(Long empresaId, Pageable pageable) {
		if (empresaId == null || empresaId <= 0) {
			throw new BadRequestException("El id de la empresa es inválido");
		}
		
		Empresa empresa = empresaRepository.findById(empresaId)
				.orElseThrow(() -> new NotFoundException("Empresa no encontrada"));
		
		if (empresa.isDeleted()) {
			throw new BadRequestException("La empresa está eliminada");
		}
		
		return productoRepository.findByEmpresa_IdEmpresa(empresaId, pageable);
	}
}


