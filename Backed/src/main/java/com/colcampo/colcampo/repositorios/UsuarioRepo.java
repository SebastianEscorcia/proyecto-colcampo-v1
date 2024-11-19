package com.colcampo.colcampo.repositorios;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.colcampo.colcampo.entidades.Usuario;



@Repository
public interface UsuarioRepo extends JpaRepository<Usuario , Integer> {
    Optional<Usuario> findByCorreoElectronico(String correoElectronico);
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);
    
    
}
