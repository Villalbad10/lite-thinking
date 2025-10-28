package com.lite_thinking.app.service;

import com.lite_thinking.app.dto.UserRegistrationDTO;
import com.lite_thinking.app.model.Usuario;
import com.lite_thinking.app.model.Usuario;


public interface UsuarioService {

    Usuario registerUser(UserRegistrationDTO registrationDTO);
}
