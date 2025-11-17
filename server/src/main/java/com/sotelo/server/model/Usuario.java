package com.sotelo.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    public Long id;
    public String nombre;
    public String correo;
    public String telefono;
}
