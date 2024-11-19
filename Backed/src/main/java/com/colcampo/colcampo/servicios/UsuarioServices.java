package com.colcampo.colcampo.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.colcampo.colcampo.entidades.Usuario;
import com.colcampo.colcampo.repositorios.UsuarioRepo;

@Service
public class UsuarioServices {
    @Autowired
    private UsuarioRepo repo;


    public boolean existePorCorreoOUsuario(String correoElectronico, String nombreUsuario) {
        
        boolean existePorCorreo = repo.findByCorreoElectronico(correoElectronico).isPresent();

        
        boolean existePorUsuario = repo.findByNombreUsuario(nombreUsuario).isPresent();

        
        return existePorCorreo || existePorUsuario;
    }
    //CRUD
    //post
    public Usuario save (Usuario usuario){
        return repo.save(usuario);
    }
    //Leer
    public List<Usuario> findAll(){
        return repo.findAll();
    }
    //Actualizar (Put)
    public Usuario update(Usuario usuario, int id){
        usuario.setId(id);
        return repo.save(usuario);
    }
    //Borrar (Delete)
    public void deleteById(int id){
        repo.deleteById(id);
    }
    //Buscar por id
    public Usuario findById(int id){
        return repo.findById(id).orElse(null);
    }
    public Usuario findByNombreUsuario(String nombreUsuario) { return repo.findByNombreUsuario(nombreUsuario).orElse(null); }



}
