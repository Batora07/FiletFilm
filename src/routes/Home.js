import React, { Component } from 'react';
import { HeaderImg, Searchbar, PosterList, LoadButton } from '../components';

const movies = [
    {
      backdrop_path: './images/Fast_large.jpg',
      id: 475557,
      overview:
        "Dans les années 1980, à Gotham City, Arthur Fleck, un humoriste de stand-up raté, bascule dans la folie et devient le Joker.",
      poster_path: "./images/Fast_small.jpg",
      title: "Joker"
    },
    {
        backdrop_path: './images/Fast_large.jpg',
        id: 475558,
        overview:
          "Dans les années 1980, à Gotham City, Arthur Fleck, un humoriste de stand-up raté, bascule dans la folie et devient le Joker.",
        poster_path: "./images/Fast_small.jpg",
        title: "Joker"
    },
    {
        backdrop_path: './public/images/Fast_large.jpg',
        id: 475559,
        overview:
          "Dans les années 1980, à Gotham City, Arthur Fleck, un humoriste de stand-up raté, bascule dans la folie et devient le Joker.",
        poster_path: "./images/Fast_small.jpg",
        title: "Joker"
    },
    {
        backdrop_path: './images/Fast_large.jpg',
        id: 47554,
        overview:
          "Dans les années 1980, à Gotham City, Arthur Fleck, un humoriste de stand-up raté, bascule dans la folie et devient le Joker.",
        poster_path: "./images/Fast_small.jpg",
        title: "Joker"
    }
  ];

class Home extends Component {
    render(){
        return(
            <div>
                <HeaderImg 
                    title="Fast and Furious"
                    overview="Lorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
                    imgSrc={'./images/Fast_large.jpg'}
                />
                <Searchbar />
                <PosterList movies={movies} />
                <LoadButton loading={false} />
            </div>
        )
    }
}

export { Home };