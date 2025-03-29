package com.colcampo.colcampo.servicios;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.colcampo.colcampo.entidades.Cliente;
import com.colcampo.colcampo.entidades.Usuario;
import com.colcampo.colcampo.repositorios.ClienteRepo;
import com.colcampo.colcampo.repositorios.UsuarioRepo;

import jakarta.transaction.Transactional;

@Service
public class ClienteServices {

    @Autowired
    private ClienteRepo repo;

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Transactional
    public Cliente save(Cliente cliente) {
        Usuario usuario = usuarioRepo.findById(cliente.getUsuario().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        Optional<Cliente> existente = repo.findByUsuarioId(usuario.getId());
        if (existente.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ya existe un perfil para este usuario");
        }

        cliente.setUsuario(usuario);
        return repo.save(cliente);
    }

    @Transactional
    public Cliente actualizarCliente(Cliente cliente) {
        Cliente existente = repo.findById(cliente.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));

        if (cliente.getNombre() != null) {
            existente.setNombre(cliente.getNombre());
        }
        if (cliente.getApellido() != null) {
            existente.setApellido(cliente.getApellido());
        }
        if (cliente.getDireccion() != null) {
            existente.setDireccion(cliente.getDireccion());
        }
        if (cliente.getNumeroDocumento() != null) {
            existente.setNumeroDocumento(cliente.getNumeroDocumento());
        }
        if (cliente.getFoto() != null && !cliente.getFoto().isEmpty()) {
            existente.setFoto(cliente.getFoto());
        }

        Usuario updatedUsuario = cliente.getUsuario();
        Usuario existingUsuario = existente.getUsuario();
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

        return repo.save(existente);
    }

    public Optional<Cliente> findById(int id) {
        return repo.findById(id);
    }

    @Transactional
    public Cliente obtenerPerfilPorUsuarioId(int usuarioId) {
        return repo.findByUsuarioId(usuarioId)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Perfil de cliente no encontrado"));
    }
}
