package com.colcampo.colcampo.servicios;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.colcampo.colcampo.entidades.Campesino;
import com.colcampo.colcampo.entidades.Usuario;
import com.colcampo.colcampo.repositorios.CampesinoRepo;
import com.colcampo.colcampo.repositorios.UsuarioRepo;

import jakarta.transaction.Transactional;

@Service
public class CampesinoServices {
    @Autowired
    private CampesinoRepo repo;
    @Autowired
    private UsuarioRepo usuarioRepo;

    @Transactional
    public Campesino save(Campesino campesino) {
        Usuario usuario = usuarioRepo.findById(campesino.getUsuario().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        Optional<Campesino> existente = repo.findByUsuarioId(usuario.getId());
        if (existente.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un perfil para este usuario");
        }

        campesino.setUsuario(usuario);
        return repo.save(campesino);
    }

    @Transactional
    public Campesino obtenerPerfil(int id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Campesino no encontrado"));
    }

    @Transactional
    public Campesino actualizarCampesino(Campesino campesino) {
        Campesino existingCampesino = repo.findById(campesino.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Campesino no encontrado"));
        if (campesino.getNombre() != null) {
            existingCampesino.setNombre(campesino.getNombre());
        }
        if (campesino.getApellido() != null) {
            existingCampesino.setApellido(campesino.getApellido());
        }
        if (campesino.getDireccion() != null) {
            existingCampesino.setDireccion(campesino.getDireccion());
        }
        if (campesino.getNumeroDocumento() != null) {
            existingCampesino.setNumeroDocumento(campesino.getNumeroDocumento());
        }
        if (campesino.getFoto() != null && !campesino.getFoto().isEmpty()) {
            existingCampesino.setFoto(campesino.getFoto());
        }
        Usuario updatedUsuario = campesino.getUsuario();
        Usuario existingUsuario = existingCampesino.getUsuario();
        if (updatedUsuario != null) {
            if (updatedUsuario.getNombreUsuario() != null) {
                existingUsuario.setNombreUsuario(updatedUsuario.getNombreUsuario());
            }
            if (updatedUsuario.getCorreoElectronico() != null) {
                existingUsuario.setCorreoElectronico(updatedUsuario.getCorreoElectronico());
            }
            if (updatedUsuario.getContrasenia() != null) {
                existingUsuario.setContrasenia(updatedUsuario.getContrasenia());
            }
            if (updatedUsuario.getTipoUsuario() != null) {
                existingUsuario.setTipoUsuario(updatedUsuario.getTipoUsuario());
            }
            if (updatedUsuario.isTerminosYCondiciones() != existingUsuario.isTerminosYCondiciones()) {
                existingUsuario.setTerminosYCondiciones(updatedUsuario.isTerminosYCondiciones());
            }
        }
        return repo.save(existingCampesino);
    }

    public Optional<Campesino> findById(int id) {
        return Optional.ofNullable(repo.findById(id).orElse(null));
    }

}
