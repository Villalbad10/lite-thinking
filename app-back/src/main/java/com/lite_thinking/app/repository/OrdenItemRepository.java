package com.lite_thinking.app.repository;

import com.lite_thinking.app.model.OrdenItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdenItemRepository extends JpaRepository<OrdenItem, Long> {

}

