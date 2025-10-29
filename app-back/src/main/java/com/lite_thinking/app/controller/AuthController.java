package com.lite_thinking.app.controller;

import com.lite_thinking.app.dto.AuthRequestDTO;
import com.lite_thinking.app.dto.AuthResponseDTO;
import com.lite_thinking.app.dto.UserInfoDTO;
import com.lite_thinking.app.dto.UserRegistrationDTO;
import com.lite_thinking.app.mapper.UsuarioMapper;
import com.lite_thinking.app.model.Usuario;
import com.lite_thinking.app.security.JwtUtil;
import com.lite_thinking.app.service.UsuarioService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/lite/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager,
                          UserDetailsService userDetailsService,
                          JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @Autowired
    private UsuarioService userService;
    
    @Autowired
    private UsuarioMapper usuarioMapper;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequestDTO authRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(),
                            authRequest.getPassword()
                    )
            );

            UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
            String jwt = jwtUtil.generateToken(userDetails);
            
            // Obtener información completa del usuario
            Usuario usuario = userService.findByEmail(authRequest.getEmail());
            UserInfoDTO userInfo = usuarioMapper.toUserInfoDTO(usuario);
            
            // Construir la respuesta con token y información del usuario
            AuthResponseDTO response = new AuthResponseDTO();
            response.setToken(jwt);
            response.setUser(userInfo);

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            log.error("iniciar error " + e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDTO registrationDTO) {
        try {
            log.info("Iniciando registro de usuario: {}", registrationDTO.getEmail());
            Usuario registeredUser = userService.registerUser(registrationDTO);
            log.info("Usuario registrado exitosamente: {}", registeredUser.getIdUser());

            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado exitosamente");
        } catch (Exception e) {
            log.error("Error al registrar usuario: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


}


