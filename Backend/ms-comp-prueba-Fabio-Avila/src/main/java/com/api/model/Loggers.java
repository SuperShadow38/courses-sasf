package com.api.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usuarios_roles")
public class Loggers {

    @Id
    @Column(name = "usuarios", length = 20, unique = true)
    private String usuario;

    @Email
    @Column(name = "email_usuarios", length = 30, unique = true)
    private String email_usuarios;

    @Column(name = "clave")
    private String contraseña_usuarios;

    @Column(name = "nombre")
    private String nombre_de_usuario;

    @Column(name = "apellido")
    private String apellido_de_usuario;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_usuario")
    private EstadoUsuario estadoUsuario;

    public enum EstadoUsuario {
        ACTIVO,
        INACTIVO
    }

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<LoggersRoles> roles;


    
    @Override
    public String toString() {
        return "Loggers [usuario=" + usuario + ", email_usuarios=" + email_usuarios + ", contraseña_usuarios="
                + contraseña_usuarios + ", roles=" + roles + "]";
    }

    
    
}
