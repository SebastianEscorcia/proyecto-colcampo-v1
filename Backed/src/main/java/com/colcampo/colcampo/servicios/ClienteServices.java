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
        Usuario usuario = cliente.getUsuario();

        if (usuario == null || usuario.getCorreoElectronico() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El usuario es obligatorio");
        }

        Optional<Usuario> usuarioExistenteOpt = usuarioRepo.findByCorreoElectronico(usuario.getCorreoElectronico());

        if (usuarioExistenteOpt.isPresent()) {
            cliente.setUsuario(usuarioExistenteOpt.get());
        } else {
            usuario.setTipoUsuario("cliente");
            usuarioRepo.save(usuario);
            cliente.setUsuario(usuario);
        }

        return repo.save(cliente);
    }

    @Transactional
    public Cliente obtenerPerfil(int id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));
    }

    @Transactional
    public Cliente actualizarCliente(Cliente cliente) {
        Cliente existente = repo.findById(cliente.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente no encontrado"));

        if (cliente.getNombre() != null)
            existente.setNombre(cliente.getNombre());
        if (cliente.getApellido() != null)
            existente.setApellido(cliente.getApellido());
        if (cliente.getDireccion() != null)
            existente.setDireccion(cliente.getDireccion());
        if (cliente.getNumeroDocumento() != null)
            existente.setNumeroDocumento(cliente.getNumeroDocumento());
        if (cliente.getFoto() != null && !cliente.getFoto().isEmpty())
            existente.setFoto(cliente.getFoto());

        Usuario usuarioActualizado = cliente.getUsuario();
        Usuario usuarioExistente = existente.getUsuario();

        if (usuarioActualizado != null && usuarioExistente != null) {
            if (usuarioActualizado.getNombreUsuario() != null)
                usuarioExistente.setNombreUsuario(usuarioActualizado.getNombreUsuario());

            if (usuarioActualizado.getCorreoElectronico() != null)
                usuarioExistente.setCorreoElectronico(usuarioActualizado.getCorreoElectronico());

            if (usuarioActualizado.getContrasenia() != null)
                usuarioExistente.setContrasenia(usuarioActualizado.getContrasenia());

            if (usuarioActualizado.getTipoUsuario() != null)
                usuarioExistente.setTipoUsuario(usuarioActualizado.getTipoUsuario());

            usuarioExistente.setTerminosYCondiciones(usuarioActualizado.isTerminosYCondiciones());
        }
        System.out.println("Datos recibidos para actualizar cliente: " + cliente);

        return repo.save(existente);
    }

    @Transactional
    public Cliente obtenerPerfilPorUsuarioId(int usuarioId) {
        return repo.findByUsuarioId(usuarioId)
                .orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Perfil del cliente no encontrado"));
    }

}
