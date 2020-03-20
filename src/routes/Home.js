import React, { Component } from 'react';
import { HeaderImg, Searchbar, PosterList, LoadButton } from '../components';

class Home extends Component {
    render(){
      const {mTitle, mDesc, image, movies, loading} = this.props;
        return(
            <div>
                <HeaderImg 
                    title={mTitle}
                    overview={mDesc}
                    imgSrc={image}
                />
                <Searchbar onSearchClick={this.props.onSearchClick} />
                <PosterList movies={movies} />
                <LoadButton loading={loading} onButtonClick={this.props.onButtonClick} />
            </div>
        )
    }
}

export { Home };