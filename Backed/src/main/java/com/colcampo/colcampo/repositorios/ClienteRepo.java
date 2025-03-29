package com.colcampo.colcampo.repositorios;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.colcampo.colcampo.entidades.Cliente;

@Repository
public interface ClienteRepo extends JpaRepository<Cliente, Integer> {
    Optional<Cliente> findByUsuarioId(int usuarioId);
}
