package com.colcampo.colcampo.entidades.ProductoDTO;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ProductoDTO {
    private String nombre;
    private String Descripcion;
    private double Precio;
    private int cantidad;
    private String codigoProducto;
    private String Categoria;
    private String Foto;
    private String unidadDeMedida;
    private Integer usuarioId;
    private Integer campesinoId;

}

