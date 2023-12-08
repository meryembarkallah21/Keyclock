package com.meryem.moviesapi.service;

import com.meryem.moviesapi.model.Book;

import java.util.List;

public interface BookService {

    Book validateAndGetBook(String isbnId);

    List<Book> getBooks();

    Book saveBook(Book book);

    void deleteBook(Book book);
}