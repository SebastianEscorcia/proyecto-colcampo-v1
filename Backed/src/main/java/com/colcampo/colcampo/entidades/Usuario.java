    package com.colcampo.colcampo.entidades;


import org.antlr.v4.runtime.misc.NotNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.Getter;
import lombok.Setter;




@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
public class Usuario{
    @SuppressWarnings("deprecation")
    @NotNull
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column (name = "nombre_usuario")
    private String nombreUsuario;
    private String contrasenia;
    @Column (name = "correo_electronico")
    private String correoElectronico;
    @Column (name = "tipo_usuario")
    private String tipoUsuario;
    @Column (name = "terminos_y_condiciones")
    private boolean terminosYCondiciones;
    public Usuario orElse(Object object) {
        
        throw new UnsupportedOperationException("Unimplemented method 'orElse'");
    }
    
}
