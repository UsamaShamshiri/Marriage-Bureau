package com.Mughal.Mughal_Marriage_Bureau.controller;

import com.Mughal.Mughal_Marriage_Bureau.model.UserStatistics;
import com.Mughal.Mughal_Marriage_Bureau.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class StatisticsController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/api/admin/statistics")
    public ResponseEntity<?> getUserStatistics() {
        long totalUsers = profileService.getTotalUsers();
        // Example: Get the count of users created after 30 days from now
        long usersCreatedLast30Days = profileService.getUsersCreatedAfter(LocalDateTime.now().minusDays(30));

        return ResponseEntity.ok(new UserStatistics(totalUsers, usersCreatedLast30Days));
    }
}
