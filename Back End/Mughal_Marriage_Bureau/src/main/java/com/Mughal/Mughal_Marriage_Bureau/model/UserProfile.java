package com.Mughal.Mughal_Marriage_Bureau.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

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

    // Getters and setters

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


    // Getters and Setters for all fields

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }



    public ObjectId getImageId() {
        return imageId;
    }

    public void setImageId(ObjectId imageId) {
        this.imageId = imageId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getDisability() {
        return disability;
    }

    public void setDisability(String disability) {
        this.disability = disability;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getIncome() {
        return income;
    }

    public void setIncome(String income) {
        this.income = income;
    }

    public String getCaste() {
        return caste;
    }

    public void setCaste(String caste) {
        this.caste = caste;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getMotherName() {
        return motherName;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public int getSiblings() {
        return siblings;
    }

    public void setSiblings(int siblings) {
        this.siblings = siblings;
    }

    public int getMarriedSiblings() {
        return marriedSiblings;
    }

    public void setMarriedSiblings(int marriedSiblings) {
        this.marriedSiblings = marriedSiblings;
    }

    public int getDivorcedSiblings() {
        return divorcedSiblings;
    }

    public void setDivorcedSiblings(int divorcedSiblings) {
        this.divorcedSiblings = divorcedSiblings;
    }


    public String getParentsAlive() {
        return parentsAlive;
    }

    public void setParentsAlive(String parentsAlive) {
        this.parentsAlive = parentsAlive;
    }

    public String getFamilyDisabilities() {
        return familyDisabilities;
    }

    public void setFamilyDisabilities(String familyDisabilities) {
        this.familyDisabilities = familyDisabilities;
    }
}
