import React, { Component } from 'react';

import { VideoPlayer, MvPlayerList, Spinner } from '../components/';
import { API_KEY, API_URL, IMAGE_BASE_URL, BACKDROP_SIZE } from '../config';
import { calcTime } from '../utils/helpers';

import '../css/MoviePlayer.css';
import axios from 'axios';
import _ from 'lodash';
import { renderLogin } from '../utils/helpers';
import firebase from 'firebase';

const flag = renderLogin();

let newMovies = [];

class MoviePlayer extends Component {
    state = {
        movies : [],
        selectedMovie: {},
        loading: true,
        flag: flag
    };

    async componentDidMount() {
        if(!this.state.flag){
            this.props.history.push({pathname: '/login'});
            return;
        }
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("user", user);
            const thisUser = user;
            if(!user){
                this.props.history.push({pathname: '/login'});
                return;
            }    
        })

        setTimeout(() => {                   
            const user = firebase.auth().currentUser;         
            if (user) {
                //const user = firebase.auth().currentUser;
                let dbRef;
                dbRef = firebase.database().ref(`users/${user.uid}`)
                dbRef.on('value', async snapshot => {
                    const data = snapshot.val();
                    console.log('data', data);
                    if(data){
                        const targetDate = data.validUntil;
                        const now = new Date().getTime();
                        // paiement pas encore expiré
                        if(targetDate > now){
                            console.log('abonnement valide');

                            const oldMovies = JSON.parse(localStorage.getItem('movies'));
                            const results = await this.getNewMovies(oldMovies);
                            newMovies = oldMovies.map((oldMovie, index) => {
                                return {
                                    id: oldMovie.id,
                                    position: index + 1,
                                    title: oldMovie.title,
                                    duration: results[index],
                                    imageUrl: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${oldMovie.backdrop_path}`,
                                    videoUrl: `https://123files.club/imdb/tmdb/movie/?id=`+oldMovie.id
                                }
                            })

                            const id = this.props.match.params.id;

                            if(id){
                                const selectedMovie = this.getSelectedMovie(newMovies, id);
                                this.setState({
                                    loading: false,
                                    movies: [...newMovies],
                                    selectedMovie
                                })
                            }
                            else {
                                const selectedMovie = newMovies[0];
                                this.setState({
                                    loading: false,
                                    movies: [...newMovies],
                                    selectedMovie
                                })
                                this.props.history.push({
                                    pathname: `/player/${selectedMovie.id}`
                                })
                            }
                        } else {
                            // paiement expiré
                            this.props.history.push({pathname: '/payment'});
                        }
                    } else {
                        this.props.history.push({pathname: '/payment'});
                    }
                })
            }  
            // user not logged in                                   
            else {
                this.props.history.push({pathname: "/login"});
            }
        }, 3000);       
    }

    componentDidUpdate(prevProps){
        console.log('component did update');
        if(prevProps.match.params.id !== this.props.match.params.id){
            const id = this.props.match.params.id;
            const selectedMovie = this.getSelectedMovie(newMovies, id);
            this.setState({selectedMovie});
        }
    }

    getSelectedMovie = (movies, movieId) => {
        const selectedMovie = _.find(movies, { id: parseInt(movieId, 10)});
        return selectedMovie;
    }

    handleEnded = () => {
        console.log("video ended");
        const { movies, selectedMovie } = this.state;
        const movieIndex = movies.findIndex(movie => selectedMovie.id === movie.id);
        const nextMovieIndex = movieIndex === movies.length - 1 ? 0 : movieIndex + 1;
        const newSelectedMovie = movies[nextMovieIndex];
        this.props.history.push({pathname: `/player/{newSelectedMovie.id}`});
        this.setState({selectedMovie: newSelectedMovie});
    }

    getTime = movieId => {
        return new Promise((resolve, reject) => {
            const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`;
            axios.get(url)
                .then(data => {
                    const duration = data.data.runtime;
                    resolve(duration)
                })
                .catch(e => {
                    console.log('e', e);
                    reject('error', e);
                })
        })
    }

    getNewMovies = async oldMovies => {
        let promises = [];
        for(let i = 0 ; i < oldMovies.length; i++){
            const element = oldMovies[i];
            const id = element.id;
            const time = await this.getTime(id);
            promises.push(calcTime(time));
        }
        return Promise.all(promises);
    }

    render(){
        const { movies, selectedMovie } = this.state;
        return(
            <div className="moviePlayer">
                {this.state.loading ? 
                (
                    <Spinner />
                ) : (
                        <>
                        <VideoPlayer 
                            videoUrl={selectedMovie.videoUrl}
                            imageUrl={selectedMovie.imageUrl}
                            handleEnded={this.handleEnded}
                        />
                        <MvPlayerList 
                            movies={movies}
                            selectedMovie = {selectedMovie}
                        />
                        </>
                )
            }
                
            </div>
        )
    }
}

export { MoviePlayer };