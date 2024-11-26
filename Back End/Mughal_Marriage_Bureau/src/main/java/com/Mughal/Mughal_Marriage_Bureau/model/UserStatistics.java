package com.Mughal.Mughal_Marriage_Bureau.model;
public class UserStatistics {
    private long totalUsers;
    private long usersCreatedLast30Days;

    public UserStatistics(long totalUsers, long usersCreatedLast30Days) {
        this.totalUsers = totalUsers;
        this.usersCreatedLast30Days = usersCreatedLast30Days;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public long getUsersCreatedLast30Days() {
        return usersCreatedLast30Days;
    }
}
