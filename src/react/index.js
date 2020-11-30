// ***********************************
// Webpack imports: 
// ***********************************
import '../sass/main.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';


// ***********************************
// React: 
// ***********************************
import React, {useState,useEffect,useReducer} from 'react';
import {render} from 'react-dom';

import App from './view/App';

render(<App />, document.getElementById('app'));