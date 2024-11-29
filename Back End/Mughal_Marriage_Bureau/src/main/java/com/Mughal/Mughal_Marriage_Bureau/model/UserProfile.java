package com.Mughal.Mughal_Marriage_Bureau.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@Data
@Document(collection = "user_profiles")
public class UserProfile {

    @Id
    private String id;
    private String userId; // Reference to the user's ID
    private String firstName;
    private String lastName;
    private  String gender;
    private  String city;
    private String contact;
    private String disability;
    private String address;
    private String income;
    private String caste;
    private int age;
    private String height;
    private String education;
    private String religion;
    private String maritalStatus;
    private String fatherName;
    private String motherName;
    private int siblings;
    private int marriedSiblings;
    private int divorcedSiblings;
    private String parentsAlive;
    private String familyDisabilities;

    @JsonIgnore
    private ObjectId imageId;
    @JsonProperty("imageId") // Add a custom getter for JSON
    public String getImageIdString() {
        return imageId != null ? imageId.toHexString() : null; // Convert ObjectId to string
    }
    @CreatedDate
    private LocalDateTime createdAt; // Automatically stores the creation date
}
