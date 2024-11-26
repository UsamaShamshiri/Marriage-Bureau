package com.Mughal.Mughal_Marriage_Bureau.controller;

import com.Mughal.Mughal_Marriage_Bureau.model.UserProfile;
import com.Mughal.Mughal_Marriage_Bureau.service.ProfileService;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    GridFSBucket gridFSBucket;

    @GetMapping
    public ResponseEntity<List<UserProfile>> getAllUsers() {
        List<UserProfile> users = profileService.getAllUsers();
        return ResponseEntity.ok(users);
    }
@GetMapping("/search/{text}")
public  List<UserProfile> searchUser(@PathVariable String text){
         return profileService.searchUser(text);
}

    @GetMapping("/{id}")
    public ResponseEntity<?> getImage(@PathVariable String id) {
        try {
            GridFSFile gridFSFile = gridFSBucket.find(new Document("_id", new ObjectId(id))).first();
            if (gridFSFile == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
            }

            GridFsResource resource = new GridFsResource(gridFSFile, gridFSBucket.openDownloadStream(gridFSFile.getObjectId()));
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(resource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve image.");
        }
    }
    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {

        profileService.deleteUser(id); // Adjust the service method name accordingly
        return ResponseEntity.noContent().build();
    }
}


