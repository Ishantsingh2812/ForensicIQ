package com.forensicai.casestudy;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaseStudyService {

    private final CaseStudyRepository caseStudyRepository;

    public CaseStudyService(CaseStudyRepository caseStudyRepository) {
        this.caseStudyRepository = caseStudyRepository;
    }

    public List<CaseStudyEntity> getCaseStudies(String category, String search) {
        List<CaseStudyEntity> list;
        if (category != null && !category.equalsIgnoreCase("All") && !category.isBlank()) {
            list = caseStudyRepository.findByCategoryIgnoreCase(category);
        } else {
            list = caseStudyRepository.findAll();
        }

        if (search != null && !search.isBlank()) {
            String q = search.toLowerCase();
            return list.stream()
                    .filter(c -> c.getTitle().toLowerCase().contains(q) ||
                                 c.getSummary().toLowerCase().contains(q) ||
                                 c.getJurisdiction().toLowerCase().contains(q))
                    .toList();
        }

        return list;
    }

    public Optional<CaseStudyEntity> getBySlug(String slug) {
        return caseStudyRepository.findBySlug(slug);
    }
}
