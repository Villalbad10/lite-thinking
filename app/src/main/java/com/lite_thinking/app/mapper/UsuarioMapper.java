package com.lite_thinking.app.mapper;

import com.lite_thinking.app.dto.UserInfoDTO;
import com.lite_thinking.app.model.Usuario;
import org.springframework.stereotype.Component;

@Component
public class UsuarioMapper {
    
    public UserInfoDTO toUserInfoDTO(Usuario usuario) {
        if (usuario == null) {
            return null;
        }
        
        UserInfoDTO dto = new UserInfoDTO();
        dto.setId(usuario.getIdUser());
        dto.setFullName(usuario.getFullName());
        dto.setEmail(usuario.getEmail());
        dto.setAdmin(usuario.isAdmin());
        
        return dto;
    }
}

