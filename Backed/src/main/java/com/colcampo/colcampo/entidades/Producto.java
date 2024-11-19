package com.colcampo.colcampo.entidades;

import org.antlr.v4.runtime.misc.NotNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
@Getter
@Setter
public class Producto {

    private String nombre;
    private String Descripcion;
    private double Precio;
    private int cantidad;
    @SuppressWarnings("deprecation")
    @NotNull
    @Column(unique = true, name = "codigo_producto")
    private String codigoProducto;
    private String Categoria;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String Foto;
    @Column(name = "unidade_de_medida")
    private String unidadDeMedida;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(name = "campesino_id")
    private Campesino campesino;

}
