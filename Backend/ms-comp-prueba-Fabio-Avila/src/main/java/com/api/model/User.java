package com.api.model;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.api.audit.Auditable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;




@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@EntityListeners({AuditingEntityListener.class})
//extends Auditable 
public class User extends Auditable implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuarios", length = 20, unique = true)
    private String usuario;

    @Column(name = "nombre")
    private String nombre_de_usuario;

    @Column(name = "apellido")
    private String apellido_de_usuario;

    @Email
    @Column(unique = true)
    private String email;

    private String clave;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_usuario")
    private EstadoUsuario estadoUsuario;

    public enum EstadoUsuario {
        ACTIVO,
        INACTIVO
    }
}