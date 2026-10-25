package com.forensicai.lawyer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LawyerRepository extends JpaRepository<LawyerListingEntity, String> {
    List<LawyerListingEntity> findByCityIgnoreCase(String city);
    List<LawyerListingEntity> findByIsLegalAid(boolean isLegalAid);
}
