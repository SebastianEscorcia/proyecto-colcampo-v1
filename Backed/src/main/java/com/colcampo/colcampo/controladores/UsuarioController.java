package com.colcampo.colcampo.controladores;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.colcampo.colcampo.entidades.Usuario;
import com.colcampo.colcampo.entidades.JWT.AuthResponse;
import com.colcampo.colcampo.entidades.JWT.JwtUtil;
import com.colcampo.colcampo.servicios.UsuarioServices;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioServices usuarioServices;
    @Autowired
    private JwtUtil jwUtil;

    // Post
    @PostMapping("/registro")
    public ResponseEntity<AuthResponse> save(@RequestBody Usuario usuario) {
        if (usuarioServices.existePorCorreoOUsuario(usuario.getCorreoElectronico(), usuario.getNombreUsuario())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new AuthResponse("El nombre de usuario o correo ya están en uso"));
        }
        
        Usuario guardarUsuario = usuarioServices.save(usuario);
        String token = jwUtil.generateToken(usuario.getNombreUsuario());
        AuthResponse authResponse = new AuthResponse(token, guardarUsuario);

        return ResponseEntity.status(HttpStatus.CREATED).body(authResponse);
    }

    @GetMapping("/perfil")
    public ResponseEntity<Usuario> getPerfil(@RequestHeader("Authorization") String token) {
        String username = jwUtil.extractUsername(token.replace("Bearer ", " "));
        Usuario usuario = usuarioServices.findByNombreUsuario(username);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody Usuario usuario) {
        Usuario usuarioExistente = usuarioServices.findByNombreUsuario(usuario.getNombreUsuario());
        if (usuarioExistente != null && usuarioExistente.getContrasenia().equals(usuario.getContrasenia())) {
            String token = jwUtil.generateToken(usuarioExistente.getNombreUsuario());
            return ResponseEntity.ok(new AuthResponse(token, usuarioExistente));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Credenciales inválidas"));
    }

    

    // get
    @GetMapping("/todos")
    public List<Usuario> findAll() {
        return usuarioServices.findAll();
    }

    // Actualizar (Put)
    @PutMapping("/actualizar/{id}")
    public Usuario update(@RequestBody Usuario usuario, @PathVariable int id) {
        usuario.setId(id);
        return usuarioServices.save(usuario);
    }

    // Borrar (Delete)
    @DeleteMapping("/eliminar/{id}")
    public void delete(@PathVariable int id) {
        usuarioServices.deleteById(id);
    }

    // Buscar por id
    public Usuario findById(int id) {
        return usuarioServices.findById(id).orElse(null);
    }

    // manejar perfil

}
