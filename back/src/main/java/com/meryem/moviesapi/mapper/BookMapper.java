package com.meryem.moviesapi.mapper;

import com.meryem.moviesapi.model.Book;
import com.meryem.moviesapi.rest.dto.CreateBookRequest;
import com.meryem.moviesapi.rest.dto.BookDto;
import com.meryem.moviesapi.rest.dto.UpdateBookRequest;
import com.meryem.moviesapi.service.UserExtraService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        uses = UserExtraService.class
)
public abstract class BookMapper {

    @Autowired
    protected UserExtraService userExtraService;

    @Mapping(target = "comments", ignore = true)
    public abstract Book toBook(CreateBookRequest createBookRequest);

    @Mapping(target = "isbnId", ignore = true)
    @Mapping(target = "comments", ignore = true)
    public abstract void updateBookFromDto(UpdateBookRequest updateBookRequest, @MappingTarget Book book);

    public abstract BookDto toBookDto(Book book);

    @Mapping(
            target = "avatar",
            expression = "java( userExtraService.getUserExtra(comment.getUsername()).isPresent() ? userExtraService.getUserExtra(comment.getUsername()).get().getAvatar() : comment.getUsername() )"
    )
    public abstract BookDto.CommentDto toBookDtoCommentDto(Book.Comment comment);
}