package com.colcampo.colcampo.repositorios;

import com.colcampo.colcampo.entidades.Cliente;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepo extends JpaRepository<Cliente, Integer> {
    Optional<Cliente> findByUsuarioId(int usuarioId);
}

