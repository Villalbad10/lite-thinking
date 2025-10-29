# Modelo Entidad-Relación

## Descripción General

Este documento describe el modelo de base de datos para el sistema de gestión de pedidos, que incluye las siguientes entidades:

- **Empresa**: Empresa que maneja las órdenes
- **Productos**: Productos que se pueden vender
- **Categorías**: Categorías de productos
- **Clientes**: Clientes que realizan pedidos
- **Órdenes**: Pedidos de clientes
- **OrdenItem**: Items individuales de una orden (tabla de unión con información adicional)

## Entidades y Atributos

### 1. Empresa

Tabla: `empresas`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| idEmpresa | Long | Identificador único (PK, columna: id_empresa) |
| nombre | String | Nombre de la empresa |
| descripcion | String | Descripción de la empresa |
| direccion | String | Dirección de la empresa |
| telefono | String | Teléfono de la empresa |
| email | String | Email de la empresa |
| nit | String | Número de identificación tributaria (único) |

**Relaciones:**
- Una Empresa puede tener muchas Órdenes (One-to-Many)
- Una Empresa puede tener muchos Productos (One-to-Many)

### 2. Categoria

Tabla: `categorias`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| idCategoria | Long | Identificador único (PK, columna: id_categoria) |
| nombre | String | Nombre de la categoría |
| descripcion | String | Descripción de la categoría |

**Relaciones:**
- Una Categoría puede estar relacionada con muchos Productos (Many-to-Many)

### 3. Producto

Tabla: `productos`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| idProducto | Long | Identificador único (PK, columna: id_producto) |
| nombre | String | Nombre del producto |
| descripcion | String | Descripción del producto |
| precio | BigDecimal | Precio del producto |
| stock | Integer | Cantidad en stock |
| codigo | String | Código del producto |
| id_empresa | Long | Referencia a la empresa (FK) |

**Relaciones:**
- Un Producto pertenece a una Empresa (Many-to-One)
- Un Producto puede pertenecer a múltiples Categorías (Many-to-Many) - **Requirement 1 ✓**
- Un Producto puede estar en muchos OrdenItem

### 4. Cliente

Tabla: `clientes`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| idCliente | Long | Identificador único (PK, columna: id_cliente) |
| nombre | String | Nombre del cliente |
| apellido | String | Apellido del cliente |
| email | String | Email del cliente |
| telefono | String | Teléfono del cliente |
| direccion | String | Dirección del cliente |
| ciudad | String | Ciudad del cliente |

**Relaciones:**
- Un Cliente puede tener múltiples Órdenes (One-to-Many) - **Requirement 2 ✓**

### 5. Orden

Tabla: `ordenes`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| idOrden | Long | Identificador único (PK, columna: id_orden) |
| numeroOrden | String | Número único de la orden |
| fechaOrden | LocalDateTime | Fecha y hora de la orden |
| total | BigDecimal | Total de la orden |
| estado | EstadoOrden | Estado de la orden (enum) |
| id_cliente | Long | Referencia al cliente (FK) |
| id_empresa | Long | Referencia a la empresa (FK) |

**Estados posibles:**
- PENDIENTE
- CONFIRMADA
- EN_PROCESO
- ENVIADA
- ENTREGADA
- CANCELADA

**Relaciones:**
- Una Orden pertenece a un Cliente (Many-to-One)
- Una Orden pertenece a una Empresa (Many-to-One)
- Una Orden puede tener muchos OrdenItem (One-to-Many)

### 6. OrdenItem

Tabla: `orden_items`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| idOrdenItem | Long | Identificador único (PK, columna: id_orden_item) |
| id_orden | Long | Referencia a la orden (FK) |
| id_producto | Long | Referencia al producto (FK) |
| cantidad | Integer | Cantidad del producto |
| precioUnitario | BigDecimal | Precio unitario del producto |
| subtotal | BigDecimal | Subtotal del item (cantidad × precio) |

**Relaciones:**
- Un OrdenItem pertenece a una Orden (Many-to-One)
- Un OrdenItem pertenece a un Producto (Many-to-One)

Esta tabla permite que una Orden tenga múltiples Productos - **Requirement 3 ✓**

## Diagrama de Relaciones

```
┌─────────────┐
│  Empresa    │
└──────┬──────┘
       │ 1:N (órdenes)
       │ 1:N (productos)
       │
       ▼
┌─────────────┐      N:1    ┌─────────────┐     1:N    ┌──────────────┐
│   Orden     │◄────────────│   Cliente   │            │  OrdenItem   │
└──────┬──────┘             └─────────────┘            └──────┬───────┘
       │ 1:N                                                  │ N:1
       │                                                      │
       │                                                      ▼
       │                                                   ┌─────────────┐
       │                                                   │  Producto   │◄──┐
       └──────────────────────────────────────────────────┘      │      │
                                                                 │ N:1  │ N:N
                                                                 │      │
                                                                 │      │
                                                                 ▼      ▼
                                                         ┌─────────────┐
                                                         │  Categoria  │
                                                         └─────────────┘
```

## Tablas de Unión (Join Tables)

### 1. producto_categoria

Tabla de unión para la relación Many-to-Many entre Producto y Categoria.

| Campo | Tipo |
|-------|------|
| id_producto | Long (FK) |
| id_categoria | Long (FK) |

### 2. orden_items (ya es una entidad completa)

La tabla `orden_items` funciona como la tabla de unión enriquecida entre Orden y Producto, ya que incluye campos adicionales como cantidad, precio unitario y subtotal.

## Cumplimiento de Requisitos

✓ **Un Producto puede pertenecer a múltiples Categorías**
- Implementado mediante relación Many-to-Many con la tabla de unión `producto_categoria`

✓ **Un Cliente puede tener múltiples Órdenes**
- Implementado mediante relación One-to-Many (Cliente → Orden)

✓ **Las órdenes pueden tener múltiples Productos**
- Implementado mediante la tabla intermedia `OrdenItem` que relaciona Orden con Producto, permitiendo almacenar información adicional como cantidad, precio unitario y subtotal

## Arquitectura de Código

### Paquetes de Modelo

- `com.lite_thinking.app.model` - Entidades JPA
- `com.lite_thinking.app.repository` - Repositorios Spring Data JPA

### Entidades Creadas

1. `Empresa.java` - Entidad Empresa
2. `Categoria.java` - Entidad Categoría
3. `Producto.java` - Entidad Producto
4. `Cliente.java` - Entidad Cliente
5. `Orden.java` - Entidad Orden
6. `OrdenItem.java` - Entidad Item de Orden

### Repositorios Creados

1. `EmpresaRepository.java`
2. `CategoriaRepository.java`
3. `ProductoRepository.java`
4. `ClienteRepository.java`
5. `OrdenRepository.java`
6. `OrdenItemRepository.java`

## Ventajas del Diseño

1. **Normalización**: El modelo está normalizado para evitar redundancias
2. **Flexibilidad**: Permite múltiples categorías por producto y múltiples productos por orden
3. **Trazabilidad**: La tabla OrdenItem permite rastrear precios históricos
4. **Escalabilidad**: Fácil de extender con nuevas funcionalidades
5. **Integridad**: Uso de claves foráneas y constraints para mantener la integridad referencial

