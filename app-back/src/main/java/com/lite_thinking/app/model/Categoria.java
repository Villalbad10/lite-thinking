package com.lite_thinking.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categorias")
public class Categoria {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Long idCategoria;
    
    @Column(nullable = false, unique = true)
    private String nombre;
    
    @Column(length = 500)
    private String descripcion;
    
    @ManyToMany(mappedBy = "categorias", cascade = CascadeType.MERGE)
    private Set<Producto> productos;
}

