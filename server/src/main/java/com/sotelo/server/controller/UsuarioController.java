package com.sotelo.server.controller;

import com.sotelo.server.config.ApiResponse;
import com.sotelo.server.model.Usuario;
import com.sotelo.server.model.UsuarioRepository;
import com.sotelo.server.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@AllArgsConstructor
@CrossOrigin(origins = {"*"})
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll() {
        return usuarioService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) {
        return usuarioService.getById(id);
    }

    @PostMapping("/save")
    public ResponseEntity<ApiResponse> save(@RequestBody Usuario usuario) {
        usuarioService.save(usuario);
        return new ResponseEntity<>(new ApiResponse(usuario, HttpStatus.OK.value(), "OK"), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> update(@RequestBody Usuario usuario) {
        return usuarioService.update(usuario.nombre, usuario.correo, usuario.telefono);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse> delete(@RequestBody Usuario usuario) {
        return usuarioService.delete(usuario.telefono);
    }
}
