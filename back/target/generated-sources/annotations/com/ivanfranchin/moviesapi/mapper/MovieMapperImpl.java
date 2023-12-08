package com.meryem.booksapi.mapper;

import com.meryem.moviesapi.model.Book;
import com.meryem.moviesapi.rest.dto.CreateBookRequest;
import com.meryem.moviesapi.rest.dto.BookDto;
import com.meryem.moviesapi.rest.dto.UpdateBookRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-12-08T04:05:06+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 19.0.1 (Oracle Corporation)"
)
@Component
public class BookMapperImpl extends BookMapper {

    @Override
    public Book toBook(CreateBookRequest createBookRequest) {
        if ( createBookRequest == null ) {
            return null;
        }

        Book book = new Book();

        book.setIsbnId( createBookRequest.getIsbnId() );
        book.setTitle( createBookRequest.getTitle() );
        book.setDirector( createBookRequest.getDirector() );
        book.setYear( createBookRequest.getYear() );
        book.setPoster( createBookRequest.getPoster() );

        return book;
    }

    @Override
    public void updateBookFromDto(UpdateBookRequest updateBookRequest, Book book) {
        if ( updateBookRequest == null ) {
            return;
        }

        if ( updateBookRequest.getTitle() != null ) {
            book.setTitle( updateBookRequest.getTitle() );
        }
        if ( updateBookRequest.getDirector() != null ) {
            book.setDirector( updateBookRequest.getDirector() );
        }
        if ( updateBookRequest.getYear() != null ) {
            book.setYear( updateBookRequest.getYear() );
        }
        if ( updateBookRequest.getPoster() != null ) {
            book.setPoster( updateBookRequest.getPoster() );
        }
    }

    @Override
    public BookDto toBookDto(Book book) {
        if ( book == null ) {
            return null;
        }

        String isbnId = null;
        String title = null;
        String director = null;
        String year = null;
        String poster = null;
        List<BookDto.CommentDto> comments = null;

        isbnId = book.getIsbnId();
        title = book.getTitle();
        director = book.getDirector();
        year = book.getYear();
        poster = book.getPoster();
        comments = commentListToCommentDtoList( book.getComments() );

        BookDto bookDto = new BookDto( isbnId, title, director, year, poster, comments );

        return bookDto;
    }

    @Override
    public BookDto.CommentDto toBookDtoCommentDto(Book.Comment comment) {
        if ( comment == null ) {
            return null;
        }

        String username = null;
        String text = null;
        LocalDateTime timestamp = null;

        username = comment.getUsername();
        text = comment.getText();
        timestamp = comment.getTimestamp();

        String avatar = userExtraService.getUserExtra(comment.getUsername()).isPresent() ? userExtraService.getUserExtra(comment.getUsername()).get().getAvatar() : comment.getUsername();

        BookDto.CommentDto commentDto = new BookDto.CommentDto( username, avatar, text, timestamp );

        return commentDto;
    }

    protected List<BookDto.CommentDto> commentListToCommentDtoList(List<Book.Comment> list) {
        if ( list == null ) {
            return null;
        }

        List<BookDto.CommentDto> list1 = new ArrayList<BookDto.CommentDto>( list.size() );
        for ( Book.Comment comment : list ) {
            list1.add( toBookDtoCommentDto( comment ) );
        }

        return list1;
    }
}
