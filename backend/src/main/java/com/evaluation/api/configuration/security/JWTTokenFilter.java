package com.evaluation.api.configuration.security;

import io.jsonwebtoken.ExpiredJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTTokenFilter extends OncePerRequestFilter {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private UserDetailsService userDetailsService;
    private JWTUtil jwtUtil;
    private String tokenHeader;

    public JWTTokenFilter(UserDetailsService userDetailsService, JWTUtil jwtUtil, String tokenHeader) {
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
        this.tokenHeader = tokenHeader;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        authorizeRequest(request);
        chain.doFilter(request, response);
    }

    private void authorizeRequest(HttpServletRequest request) {
        logger.debug("Processando autenticação para '{}'", request.getRequestURL());

        final String requestHeader = request.getHeader(this.tokenHeader);

        if (requestHeader == null || !requestHeader.startsWith("Bearer ")) {
            logger.warn("Falha na autorização. Nenhum token JWT encontrado");
            return;
        }

        String username;
        String authToken = requestHeader.substring(7);

        try {
            username = jwtUtil.getUsernameFromToken(authToken);
        } catch (IllegalArgumentException e) {
            logger.error("Erro ao obter nome de usuário do token", e);
            return;
        } catch (ExpiredJwtException e) {
            logger.warn("O token expirou", e);
            return;
        }

        if (username == null || SecurityContextHolder.getContext().getAuthentication() != null) return;

        logger.debug("O contexto de segurança era nulo, portanto, autorizando o usuário '{}' ...", username);

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

        if (!jwtUtil.validateToken(authToken, userDetails)) {
            logger.error("Não é um token válido!!!");
            return;
        }

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        logger.info("Usuário autorizado '{}', definindo contexto de segurança ...", username);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}