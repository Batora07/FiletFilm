import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import '../css/SearchBar.css';

class Searchbar extends Component{
    state = {
        value: "",
    }

    handleChange = e =>{
        this.setState({value : e.target.value })
    }

    render(){
        const { value } = this.state;
        return(
            <div className="searchBar--container">
                <div className="searchBar">
                    <input 
                        className="searchBar--input" 
                        type="text" 
                        placeholder="Rechercher un Film" 
                        value={value}
                        onChange={this.handleChange}
                    />
                    <div 
                        className="searchBar--submit"
                        onClick={() => this.props.onSearchClick(value)}
                    >
                        <FontAwesome className="searchIcon" name="search" />
                    </div>
                </div>
            </div>
        )
    }
}

export { Searchbar };