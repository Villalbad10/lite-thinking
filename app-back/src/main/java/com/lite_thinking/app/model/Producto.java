package com.lite_thinking.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "productos")
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long idProducto;
    
    @Column(nullable = false)
    private String codigo;

    @Column(nullable = false)
    private String nombre;
    
    @Column(length = 1000)
    private String descripcion;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;
    
    @Column(nullable = false)
    private Integer stock;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_empresa", nullable = false)
    private Empresa empresa;
    
    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
        name = "producto_categoria",
        joinColumns = @JoinColumn(name = "id_producto"),
        inverseJoinColumns = @JoinColumn(name = "id_categoria")
    )
    private Set<Categoria> categorias;
    
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<OrdenItem> ordenItems;
}

