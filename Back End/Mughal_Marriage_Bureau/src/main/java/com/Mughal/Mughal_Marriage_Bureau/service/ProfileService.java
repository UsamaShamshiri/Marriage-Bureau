package com.Mughal.Mughal_Marriage_Bureau.service;

import com.Mughal.Mughal_Marriage_Bureau.model.UserProfile;
import com.Mughal.Mughal_Marriage_Bureau.repository.UserProfileRepository;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {
private  final MongoTemplate mongoTemplate;
    private final UserProfileRepository profileRepository;
    private final GridFSBucket gridFSBucket;
    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    MongoClient mongoClient;
    @Autowired
    MongoConverter converter;
    public ProfileService(UserProfileRepository profileRepository, GridFSBucket gridFSBucket,MongoTemplate mongoTemplate) {
        this.profileRepository = profileRepository;
        this.gridFSBucket = gridFSBucket;
        this.mongoTemplate =mongoTemplate;
    }

    public Optional<UserProfile> getProfileByUserId(String userId) {
        return profileRepository.findByUserId(userId);
    }
    public UserProfile createProfile(String userId, String firstName, String lastName,String gender,String city,
                                     String contact, String disability, String address,
                                     String income, String caste, int age, String height, String education, String religion,
                                     String maritalStatus, String fatherName, String motherName, int siblings,
                                     int marriedSiblings, int divorcedSiblings, String parentsAlive,
                                     String familyDisabilities, MultipartFile image) throws IOException {
        ObjectId imageId = gridFSBucket.uploadFromStream(image.getOriginalFilename(), image.getInputStream());

        UserProfile profile = profileRepository.findByUserId(userId).orElse(new UserProfile());
        profile.setUserId(userId);
        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        profile.setGender(gender);
        profile.setCity(city);
        profile.setContact(contact);
        profile.setDisability(disability);
        profile.setAddress(address);
        profile.setIncome(income);
        profile.setCaste(caste);
        profile.setAge(age);
        profile.setHeight(height);
        profile.setEducation(education);
        profile.setReligion(religion);
        profile.setMaritalStatus(maritalStatus);
        profile.setFatherName(fatherName);
        profile.setMotherName(motherName);
        profile.setSiblings(siblings);
        profile.setMarriedSiblings(marriedSiblings);
        profile.setDivorcedSiblings(divorcedSiblings);
        profile.setParentsAlive(parentsAlive);
        profile.setFamilyDisabilities(familyDisabilities);
        profile.setImageId(imageId);

        return profileRepository.save(profile);
    }
    public UserProfile updateProfile(String userId, String firstName, String lastName,String gender,String city, String contact, String disability, String address,
                                     String income, String caste, int age, String height, String education, String religion,
                                     String maritalStatus, String fatherName, String motherName, int siblings,
                                     int marriedSiblings, int divorcedSiblings, String parentsAlive,
                                     String familyDisabilities, MultipartFile image) throws IOException {

//        ObjectId imageId = gridFSBucket.uploadFromStream(image.getOriginalFilename(), image.getInputStream());

        UserProfile profile = profileRepository.findByUserId(userId).get();

        profile.setUserId(userId);
        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        profile.setGender(gender);
        profile.setCity(city);
        profile.setContact(contact);
        profile.setDisability(disability);
        profile.setAddress(address);
        profile.setIncome(income);
        profile.setCaste(caste);
        profile.setAge(age);
        profile.setHeight(height);
        profile.setEducation(education);
        profile.setReligion(religion);
        profile.setMaritalStatus(maritalStatus);
        profile.setFatherName(fatherName);
        profile.setMotherName(motherName);
        profile.setSiblings(siblings);
        profile.setMarriedSiblings(marriedSiblings);
        profile.setDivorcedSiblings(divorcedSiblings);
        profile.setParentsAlive(parentsAlive);
        profile.setFamilyDisabilities(familyDisabilities);
        if (image != null && !image.isEmpty()) {
            // Delete old image from GridFS
            ObjectId oldImageId = profile.getImageId();
            if (oldImageId != null) {
                gridFSBucket.delete(oldImageId);
            }

            // Upload the new image to GridFS
            GridFSUploadOptions options = new GridFSUploadOptions().chunkSizeBytes(255 * 1024);
            ObjectId newImageId = gridFSBucket.uploadFromStream(image.getOriginalFilename(), image.getInputStream(), options);
            profile.setImageId(newImageId); // Set new image ID
        }


        return profileRepository.save(profile);
    }

    public List<UserProfile> getAllUsers() {
        return profileRepository.findAll();
    }
public  List<UserProfile> searchUser(String text){
    final List<UserProfile> Employees = new ArrayList<>();

    MongoDatabase database = mongoClient.getDatabase("Mughal_Marriage_Bureau");
    MongoCollection<Document> collection = database.getCollection("user_profiles");
    AggregateIterable<Document> result = collection.aggregate(  Arrays.asList(
            new Document("$search",
                    new Document("text",
                            new Document("query", text)
                                    .append("path", Arrays.asList("firstName", "lastName", "contact","city","gender")))),
            new Document("$sort",
                    new Document("age", 1L))
            ));

    result.forEach(docs -> Employees.add(converter.read(UserProfile.class, docs)));
    System.out.println(Employees);
    return Employees;

}


    public void deleteUser(String id) {
        // Fetch user profile to get imageId
        UserProfile user = profileRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        // Delete the image from GridFS
        if (user.getImageId() != null) {
            gridFsTemplate.delete(new Query(Criteria.where("_id").is(user.getImageId())));
        }

        // Delete the user profile
        profileRepository.deleteById(id);
    }
    public long getTotalUsers() {
        return profileRepository.count();
    }

    public long getUsersCreatedAfter(LocalDateTime dateTime) {

        return profileRepository.countByCreatedAtAfter(dateTime);
    }
}




