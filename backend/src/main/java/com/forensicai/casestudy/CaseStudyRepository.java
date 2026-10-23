package com.forensicai.casestudy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CaseStudyRepository extends JpaRepository<CaseStudyEntity, String> {
    Optional<CaseStudyEntity> findBySlug(String slug);
    List<CaseStudyEntity> findByCategoryIgnoreCase(String category);
}
