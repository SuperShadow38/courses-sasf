package com.api.service;

import com.api.model.Cursos;
import com.api.repository.CursosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoService {

    @Autowired
    private CursosRepository cursosRepository;

    public List<Cursos> getAllCursos() {
        return cursosRepository.findAll();
    }

    public Optional<Cursos> getCursoById(Long id) {
        return cursosRepository.findById(id);
    }

    public Cursos createCurso(Cursos curso) {
        return cursosRepository.save(curso);
    }

    public Cursos updateCurso(Long id, Cursos curso) {
        if (cursosRepository.existsById(id)) {
            curso.setId(id);
            return cursosRepository.save(curso);
        }
        return null; // Manejo de error si el curso no existe
    }

    public boolean deleteCurso(Long id) {
        Optional<Cursos> cursoOptional = cursosRepository.findById(id);
        if (cursoOptional.isPresent()) {
            cursosRepository.delete(cursoOptional.get());
            return true; // Indicate successful deletion
        } else {
            return false; // Indicate course not found
        }
    }
}
