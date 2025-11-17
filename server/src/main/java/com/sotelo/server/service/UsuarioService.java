package com.sotelo.server.service;

import com.sotelo.server.config.ApiResponse;
import com.sotelo.server.model.Usuario;
import com.sotelo.server.model.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public ResponseEntity<ApiResponse> getAll() {
        return new ResponseEntity<>(new ApiResponse(usuarioRepository.findAll(), HttpStatus.OK.value(), "OK"), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponse> getById(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return new ResponseEntity<>(new ApiResponse(usuario, HttpStatus.OK.value(), "OK"), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponse> save(Usuario usuario) {
        Optional<Usuario> findTel = usuarioRepository.findByTelefono(usuario.getTelefono());
        Optional<Usuario> findCor = usuarioRepository.findByCorreo(usuario.getCorreo());
        if (findTel.isPresent() || findCor.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST.value(), findTel.isPresent() ? "El número de telefono ya se encuentra registrado" : "El correo electrónico ya se encuentra registrado"), HttpStatus.BAD_REQUEST);
        }

        Usuario save = usuarioRepository.save(usuario);

        return new ResponseEntity<>(new ApiResponse(save, HttpStatus.OK.value(), "Usuario registrado"), HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<ApiResponse> delete(String telefono) {
        Optional<Usuario> findTel = usuarioRepository.findByTelefono(telefono);
        if (findTel.isPresent()) {
            usuarioRepository.delete(findTel.get());
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK.value(), "Usuario eliminado"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND.value(), "Usuario no encontrado"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> update(String nombre, String correo, String telefono) {
        Optional<Usuario> findCor = usuarioRepository.findByCorreo(correo);
        if (findCor.isPresent()) {
            findCor.get().setNombre(nombre);
            findCor.get().setTelefono(telefono);
            usuarioRepository.save(findCor.get());
            return new ResponseEntity<>(new ApiResponse(HttpStatus.OK.value(), "Usuario actualizado"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND.value(), "Usuario no encontrado"), HttpStatus.OK);
        }
    }

}
