package com.sixback.eyebird.uncategorized;

import com.sixback.eyebird.util.JwtTokenUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
      String authorizationHeader = request.getHeader("Authorization");

      // JWT가 헤더에 있다면
      if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
          String token = authorizationHeader.substring(7);

          // access token가 유효하다면
          if (jwtTokenUtil.validateToken(token)) {
            String email = jwtTokenUtil.getUserEmail(token);

            UserDetailsImpl userDetailsImpl = userDetailsServiceImpl.loadUserByUsername(email);

            if (userDetailsImpl != null) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetailsImpl, null, null); // UserDetails, password, role
                // 현재 request의 security context에 접근권한 설정
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

            }

          }

      }

      filterChain.doFilter(request, response); // 다음 필터로 넘어가기

    }
}