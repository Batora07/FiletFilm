import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import '../css/LoadButton.css';

library.add(faSpinner);

const Spinner = props => {
    return (
        <FontAwesomeIcon
            icon="spinner"
            pulse
            size="7x"
            className="fa-faSpinner" 
        />
    )
}

export { Spinner };