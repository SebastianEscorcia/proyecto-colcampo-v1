package com.colcampo.colcampo.controladores;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.colcampo.colcampo.entidades.Cliente;
import com.colcampo.colcampo.servicios.ClienteServices;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteServices clienteServices;

    @PostMapping("/perfil")
    public ResponseEntity<Cliente> registrarCliente(@RequestBody Cliente cliente) {
        if (cliente.getUsuario().getCorreoElectronico() == null
                || cliente.getUsuario().getNombreUsuario() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Correo electrónico y nombre de usuario son obligatorios");
        }

        Cliente nuevoCliente = clienteServices.save(cliente);
        return ResponseEntity.ok(nuevoCliente);
    }


    @GetMapping("/perfil/{usuarioId}")
    public ResponseEntity<Cliente> obtenerPerfilPorUsuarioId(@PathVariable int usuarioId) {
        Cliente cliente = clienteServices.obtenerPerfilPorUsuarioId(usuarioId);
        return ResponseEntity.ok(cliente);
    }

    @PutMapping("/perfil/actualizar")
    public ResponseEntity<Cliente> actualizarPerfilCliente(@RequestBody Map<String, Object> request) {
        ObjectMapper mapper = new ObjectMapper();
        Cliente cliente = mapper.convertValue(request, Cliente.class);
        Cliente actualizado = clienteServices.actualizarCliente(cliente);
        return ResponseEntity.ok(actualizado);
    }
}
