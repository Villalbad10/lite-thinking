package com.lite_thinking.app.service.impl;

import com.lite_thinking.app.dto.UserRegistrationDTO;
import com.lite_thinking.app.exception.ConflictException;
import com.lite_thinking.app.model.Usuario;
import com.lite_thinking.app.repository.UsuarioRepository;
import com.lite_thinking.app.service.UsuarioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UsuarioServiceImpl implements UsuarioService {
    @Autowired
    private UsuarioRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public Usuario registerUser(UserRegistrationDTO registrationDTO) {
        if (userRepository.findByEmail(registrationDTO.getEmail()).isPresent()) {
            throw new ConflictException("El usuario ya existe");
        }

        Usuario newUser = new Usuario();
        newUser.setEmail(registrationDTO.getEmail());
        newUser.setFullName(registrationDTO.getFullName());

        String encodedPassword = passwordEncoder.encode(registrationDTO.getPassword());
        newUser.setPassword(encodedPassword);
        newUser.setDeleted(false);
        log.info("usuario a guardar " + newUser);
        return userRepository.save(newUser);
    }

}
