package com.colcampo.colcampo.entidades;

import org.antlr.v4.runtime.misc.NotNull;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "cliente")
@Getter
@Setter
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @SuppressWarnings("deprecation")
    @NotNull
    private String nombre;

    private String apellido;

    private String direccion;

    @SuppressWarnings("deprecation")
    @NotNull
    @Column(name = "numero_documento")
    private String numeroDocumento;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String foto;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
}
