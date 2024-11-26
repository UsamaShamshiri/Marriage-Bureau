package com.Mughal.Mughal_Marriage_Bureau.controller;

import com.Mughal.Mughal_Marriage_Bureau.model.UserProfile;
import com.Mughal.Mughal_Marriage_Bureau.service.ProfileService;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSFile;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Optional;

@RestController
@CrossOrigin
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private GridFsTemplate gridFsTemplate; // Make sure to autowire GridFsTemplate

    @Autowired
    private GridFSBucket gridFSBucket;

    @GetMapping("/api/profile")
    public ResponseEntity<?> getProfile(Principal principal) {
        Optional<UserProfile> profile = profileService.getProfileByUserId(principal.getName());
        if (profile.isPresent()) {
            return ResponseEntity.ok(profile.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile not found");
        }
    }

    @GetMapping("/api/files/{fileId}")
    public void getImage(@PathVariable String fileId, HttpServletResponse response) throws IOException {
        // Use GridFsTemplate to find the file
        GridFSFile gridFSFile = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(fileId)));

        if (gridFSFile != null) {
            Document metadata = gridFSFile.getMetadata(); // Fetch metadata
            if (metadata != null && metadata.getString("contentType") != null) {
                response.setContentType(metadata.getString("contentType"));
            } else {
                response.setContentType("application/octet-stream"); // Fallback content type
            }
            gridFSBucket.downloadToStream(gridFSFile.getObjectId(), response.getOutputStream());
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
    }
    @PostMapping(value = "/api/profile", consumes = "multipart/form-data")
    public ResponseEntity<?> addProfile(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("gender") String gender,
            @RequestParam("contact") String contact,
            @RequestParam("city") String city,
            @RequestParam("disability") String disability,
            @RequestParam("address") String address,
            @RequestParam("income") String income,
            @RequestParam("caste") String caste,
            @RequestParam("age") int age,
            @RequestParam("height") String height,
            @RequestParam("education") String education,
            @RequestParam("religion") String religion,
            @RequestParam("maritalStatus") String maritalStatus,
            @RequestParam("fatherName") String fatherName,
            @RequestParam("motherName") String motherName,
            @RequestParam("siblings") int siblings,
            @RequestParam("marriedSiblings") int marriedSiblings,
            @RequestParam("divorcedSiblings") int divorcedSiblings,
            @RequestParam("parentsAlive") String parentsAlive,
            @RequestParam("familyDisabilities") String familyDisabilities,
            @RequestParam("image") MultipartFile image,

            Principal principal
    ) {
        try {
            UserProfile profile = profileService.createProfile(principal.getName(), firstName, lastName,gender, city,contact, disability,
                    address, income, caste, age, height, education, religion, maritalStatus, fatherName, motherName,
                    siblings, marriedSiblings, divorcedSiblings, parentsAlive, familyDisabilities, image);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile");
        }
    }
    @PutMapping(value = "/api/profile", consumes = "multipart/form-data")
    public ResponseEntity<?> UpdateProfile(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("gender") String gender,
            @RequestParam("contact") String contact,
            @RequestParam("city") String city,
            @RequestParam("disability") String disability,
            @RequestParam("address") String address,
            @RequestParam("income") String income,
            @RequestParam("caste") String caste,
            @RequestParam("age") int age,
            @RequestParam("height") String height,
            @RequestParam("education") String education,
            @RequestParam("religion") String religion,
            @RequestParam("maritalStatus") String maritalStatus,
            @RequestParam("fatherName") String fatherName,
            @RequestParam("motherName") String motherName,
            @RequestParam("siblings") int siblings,
            @RequestParam("marriedSiblings") int marriedSiblings,
            @RequestParam("divorcedSiblings") int divorcedSiblings,
            @RequestParam("parentsAlive") String parentsAlive,
            @RequestParam("familyDisabilities") String familyDisabilities,
            @RequestParam("image") MultipartFile image,

            Principal principal
    ) {
        try {
            UserProfile profile = profileService.updateProfile(principal.getName(), firstName, lastName,gender, city,contact, disability,
                    address, income, caste, age, height, education, religion, maritalStatus, fatherName, motherName,
                    siblings, marriedSiblings, divorcedSiblings, parentsAlive, familyDisabilities, image);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update profile");
        }
    }



}
