package com.gl.lms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "userData")
@Setter
@Getter
@NoArgsConstructor
public class  Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="name",nullable = false, unique = true)
    private String name;

    @Column(name="email",nullable = false, unique = true)
    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "library_cards_id", nullable = false)
    private LibraryCards libraryCards;

    @Column(name = "is_demo", columnDefinition = "boolean default false")
    private boolean isDemo = false;

}
