package com.colcampo.colcampo.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.colcampo.colcampo.entidades.Campesino;
import com.colcampo.colcampo.entidades.Producto;
import com.colcampo.colcampo.repositorios.ProductoRepo;

@Service
public class ProductoServices {
    @Autowired
    private ProductoRepo repoProducto;
    @Autowired
    private CampesinoServices campesinoServices;

    public Boolean existerPorNombreOCodigo(String nombre, String codigo) {
        Boolean existePorNombre = repoProducto.findByNombre(nombre).isPresent();
        Boolean existePorCodigo = repoProducto.findBycodigoProducto(codigo).isPresent();
        return existePorNombre || existePorCodigo;
    }

    // CRUD

    // Método post
    public Producto save(Producto producto) {
        return repoProducto.save(producto);
    }

    // Método get
    public List<Producto> findAll() {
        List<Producto> productos = repoProducto.findAll();
        System.out.println("Productos en la base de datos: " + productos);
        return productos;
    }

    // Método put
    public Producto update(Producto producto, int id) {
        producto.setId(id);
        return repoProducto.save(producto);
    }

    // Método delete
    public void deleteById(int id) {
        repoProducto.deleteById(id);
    }

    // Método get por nombre (Buscar por nombre)
    public Producto buscarPorNombre(String nombre) {
        return repoProducto.findByNombre(nombre).orElse(null);
    }

    // Método get por id
    public Producto buscarPorCodigo(String codigoProducto) {
        return repoProducto.findBycodigoProducto(codigoProducto).orElse(null);
    }

    // asociar productos a campesino al completar el perfil
    public void asociarProductosACampesino(int usuarioId, int campesinoId){
        List<Producto> productos = repoProducto.findByUsuarioId(usuarioId);
        Campesino camepesino = campesinoServices.obtenerPerfil(campesinoId);
        for (Producto producto : productos) {
            producto.setCampesino(camepesino);
            repoProducto.save(producto);
        }
    }


}
