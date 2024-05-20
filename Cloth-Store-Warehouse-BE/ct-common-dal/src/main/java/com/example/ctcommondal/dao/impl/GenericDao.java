package com.example.ctcommondal.dao.impl;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.hibernate.Session;

public class GenericDao {
    @PersistenceContext
    private EntityManager entityManager;

    protected Session getSession() {
        return entityManager.unwrap(Session.class);
    }
}
