package com.Mughal.Mughal_Marriage_Bureau.repository;

import com.Mughal.Mughal_Marriage_Bureau.model.UserProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserProfileRepository extends MongoRepository<UserProfile, String> {
   Optional<UserProfile> findByUserId(String userId);
   long countByCreatedAtAfter(LocalDateTime dateTime);
}



