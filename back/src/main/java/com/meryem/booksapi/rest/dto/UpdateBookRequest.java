package com.meryem.moviesapi.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class UpdateBookRequest {

    @Schema(example = "Resident Evil: Apocalypse")
    private String title;

    @Schema(example = "Paul W.S. Anderson", description = "Set \"N/A\" if the director of the book is unknown")
    private String director;

    @Schema(example = "2004", description = "Set \"N/A\" if the year of the book is unknown")
    private String year;

    @Schema(example = "https://m.media-amazon.com/images/M/MV5BMTc1NTUxMzk0Nl5BMl5BanBnXkFtZTcwNDQ1MDIzMw@@._V1_SX300.jpg")
    private String poster;
}