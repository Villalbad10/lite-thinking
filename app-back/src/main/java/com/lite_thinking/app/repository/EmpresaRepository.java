package com.lite_thinking.app.repository;

import com.lite_thinking.app.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
	boolean existsByNit(String nit);

	boolean existsByNombre(String nombre);

	Page<Empresa> findAllByDeletedFalse(Pageable pageable);

	boolean existsByNitAndIdEmpresaNot(String nit, Long idEmpresa);

	boolean existsByNombreAndIdEmpresaNot(String nombre, Long idEmpresa);
}

