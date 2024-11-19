package com.colcampo.colcampo.entidades.JWT;



import com.colcampo.colcampo.entidades.Usuario;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AuthResponse {
    private String token;
    private Usuario usuario;
    private String mensaje;
    public AuthResponse(String mensaje) {
        this.mensaje = mensaje;
    }

    public AuthResponse(String token, Usuario usuario) {
        this.token = token;
        this.usuario = usuario;
        this.mensaje = null;
    }

    
}
