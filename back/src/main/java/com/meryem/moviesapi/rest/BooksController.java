package com.meryem.moviesapi.rest;

import com.meryem.moviesapi.mapper.BookMapper;
import com.meryem.moviesapi.model.Book;
import com.meryem.moviesapi.rest.dto.AddCommentRequest;
import com.meryem.moviesapi.rest.dto.CreateBookRequest;
import com.meryem.moviesapi.rest.dto.BookDto;
import com.meryem.moviesapi.rest.dto.UpdateBookRequest;
import com.meryem.moviesapi.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import static com.meryem.moviesapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/books")
public class BooksController {

    private final BookService bookService;
    private final BookMapper bookMapper;

    @GetMapping
    public List<BookDto> getBooks() {
        return bookService.getBooks().stream().map(bookMapper::toBookDto).toList();
    }

    @GetMapping("/{isbnId}")
    public BookDto getBook(@PathVariable String isbnId) {
        Book book = bookService.validateAndGetBook(isbnId);
        return bookMapper.toBookDto(book);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public BookDto createBook(@Valid @RequestBody CreateBookRequest createBookRequest) {
        Book book = bookMapper.toBook(createBookRequest);
        book = bookService.saveBook(book);
        return bookMapper.toBookDto(book);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PutMapping("/{isbnId}")
    public BookDto updateBook(@PathVariable String isbnId, @Valid @RequestBody UpdateBookRequest updateBookRequest) {
        Book book = bookService.validateAndGetBook(isbnId);
        bookMapper.updateBookFromDto(updateBookRequest, book);
        book = bookService.saveBook(book);
        return bookMapper.toBookDto(book);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{isbnId}")
    public BookDto deleteBook(@PathVariable String isbnId) {
        Book book = bookService.validateAndGetBook(isbnId);
        bookService.deleteBook(book);
        return bookMapper.toBookDto(book);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{isbnId}/comments")
    public BookDto addBookComment(@PathVariable String isbnId,
                                    @Valid @RequestBody AddCommentRequest addCommentRequest,
                                    Principal principal) {
        Book book = bookService.validateAndGetBook(isbnId);
        Book.Comment comment = new Book.Comment(principal.getName(), addCommentRequest.getText(), LocalDateTime.now());
        book.getComments().add(0, comment);
        book = bookService.saveBook(book);
        return bookMapper.toBookDto(book);
    }
}