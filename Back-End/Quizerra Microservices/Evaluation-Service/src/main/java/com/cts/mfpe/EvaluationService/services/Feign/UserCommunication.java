package com.cts.mfpe.EvaluationService.services.Feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "userComm", url = "http://localhost:8299/users-service/users/f/")
public interface UserCommunication {
    @GetMapping("/exists/")
    boolean ifExists(@RequestBody @RequestParam String id);
}