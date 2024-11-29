package com.Mughal.Mughal_Marriage_Bureau.model;

import lombok.Data;

@Data
public class UserStatistics {
    private long totalUsers;
    private long usersCreatedLast30Days;

    public UserStatistics(long totalUsers, long usersCreatedLast30Days) {
        this.totalUsers = totalUsers;
        this.usersCreatedLast30Days = usersCreatedLast30Days;
    }

}
