import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { addMovie, removeMovie } from '../actions/movie';

import '../css/Poster.css';
import { faMapMarked } from '@fortawesome/free-solid-svg-icons';

class PosterComponent extends Component {
    state = {
        hover: false
    }

    showOverlay = () =>{
        if(this.state.hover){
            return;
        }
        this.setState({hover: true})
    }

    hideOverlay = () => {
        this.setState({ hover: false })
    }

    remove = () => {
        // à implémenter avec redux
        console.log("remove avec redux");
        this.props.removeM(this.props.id)
    }

    add = () => {
        // à implémenter avec redux
        console.log("add avec redux");
        this.props.addM(this.props.movie)
    }

    render(){
        return (
            <div 
                className="poster"
                onMouseEnter={this.showOverlay}
                onMouseLeave={this.hideOverlay}
            >
                <Link to={{pathname: `/${this.props.id}`}}>
                    {this.props.imgSrc ? (
                        <img className="poster--img" src={this.props.imgSrc} alt="poster" />
                    ) : (
                        <img className="poster--img" src={'./images/no_image.jpg'} alt="poster" />
                    )
                }
                    
                </Link>
                {this.state.hover ? 
                (
                    <div className="poster--overlay">
                        <h3 className="poster--overlay__text">LISTE DE SOUHAITS</h3>
                        {this.props.wished ? 
                            (
                                <FontAwesome onClick={this.remove} className="poster--icon" name="heart" size="3x" />
                            ) : 
                            (
                                <FontAwesome onClick={this.add} className="poster--icon__not" name="heart-o" size="3x" />
                            )
                        }
                    </div>
                ) : null }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addM : movie => dispatch(addMovie(movie)),
        removeM : movieId => dispatch(removeMovie(movieId))
    }
}

const Poster = connect(null, mapDispatchToProps)(PosterComponent);

export { Poster };