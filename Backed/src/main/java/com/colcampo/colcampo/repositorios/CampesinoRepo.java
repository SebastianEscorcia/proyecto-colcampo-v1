package com.colcampo.colcampo.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.colcampo.colcampo.entidades.Campesino;
@Repository
public interface CampesinoRepo extends JpaRepository<Campesino, Integer> {
    
}

