package com.meryem.moviesapi.service;

import com.meryem.moviesapi.exception.BookNotFoundException;
import com.meryem.moviesapi.model.Book;
import com.meryem.moviesapi.repository.BookRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public Book validateAndGetBook(String isbnId) {
        return bookRepository.findById(isbnId).orElseThrow(() -> new BookNotFoundException(isbnId));
    }

    @Override
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(Book book) {
        bookRepository.delete(book);
    }
}