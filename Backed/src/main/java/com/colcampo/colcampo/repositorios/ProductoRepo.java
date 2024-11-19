package com.colcampo.colcampo.repositorios;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.colcampo.colcampo.entidades.Producto;
@Repository
public interface ProductoRepo extends JpaRepository <Producto, Integer>{
    Optional<Producto> findByNombre(String nombre);
    Optional<Producto> findBycodigoProducto(String codigoProducto);
    List<Producto> findByUsuarioId(int usuarioId);
}
