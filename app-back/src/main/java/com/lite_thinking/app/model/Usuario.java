package com.lite_thinking.app.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Usuarios")
@EqualsAndHashCode(callSuper = false)
public class Usuario{

    @Id
    @Column(name = "id_user")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "admin")
    private boolean admin = false;

    @Column(name = "deleted", insertable = false, nullable = false, columnDefinition = "Boolean default false")
    private Boolean deleted = false;
}
