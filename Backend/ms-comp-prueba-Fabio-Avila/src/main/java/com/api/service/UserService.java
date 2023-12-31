package com.api.service;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.api.model.User;
import com.api.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService (UserRepository userRepository){
        this.userRepository= userRepository;

    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserId(Long id){
        return userRepository.findById(id).orElse(null) ;
    }

    @Transactional
    public User  saveUser(User user){
        return userRepository.save(user);
    }

    public void deletUser(Long id){
         userRepository.deleteById(id);
    }

    public List<User> searchUsersByKeyword( String keyword){
        return userRepository.searchByKeyword(keyword);
    }
}