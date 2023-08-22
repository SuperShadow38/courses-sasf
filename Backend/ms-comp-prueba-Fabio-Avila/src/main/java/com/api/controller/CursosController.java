package com.api.controller;

import com.api.model.Cursos;
import com.api.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cursos")
@CrossOrigin("*")
public class CursosController {

    @Autowired
    private CursoService cursoService;
    
    
    @GetMapping
    public List<Cursos> getAllCursos() {
        List<Cursos> cursos = cursoService.getAllCursos();
        
        // Filtrar los cursos para que solo se muestren los activos y en construcción
        cursos = cursos.stream()
                .filter(curso -> curso.getEstado() == Cursos.EstadoCurso.ACTIVO ||
                                curso.getEstado() == Cursos.EstadoCurso.EN_CONSTRUCCION)
                .collect(Collectors.toList());
        
        return cursos;
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getCursoById(@PathVariable Long id) {
        Optional<Cursos> curso = cursoService.getCursoById(id);
        if (curso.isPresent()) {
            return ResponseEntity.ok(curso.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso not found");
        }
    }

    @PreAuthorize("hasRole(ROLE_ADMIN) or hasRole(ROLE_CREADOR)")
    @PostMapping
    public ResponseEntity<?> createCurso(@RequestBody Cursos curso) {
        Cursos createdCurso = cursoService.createCurso(curso);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCurso);
    }

    @PreAuthorize("hasRole(ROLE_ADMIN) or hasRole(ROLE_CREADOR)")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCurso(@PathVariable Long id, @RequestBody Cursos curso) {
        Cursos updatedCurso = cursoService.updateCurso(id, curso);
        if (updatedCurso != null) {
            return ResponseEntity.ok(updatedCurso);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso not found");
        }
    }
    
    @PreAuthorize("hasRole(ROLE_ADMIN) or hasRole(ROLE_CREADOR)")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCurso(@PathVariable Long id) {
        boolean deleted = cursoService.deleteCurso(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso not found");
        }
    }
}
