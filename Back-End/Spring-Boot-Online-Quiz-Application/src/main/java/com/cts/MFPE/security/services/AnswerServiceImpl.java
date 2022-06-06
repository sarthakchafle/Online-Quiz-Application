package com.cts.MFPE.security.services;

import com.cts.MFPE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    UserRepository userRepository;


    @Override
    public void saveAnswer(long user_id, long answer_id) {
        userRepository.storeAnswer(user_id, answer_id);
    }


}
