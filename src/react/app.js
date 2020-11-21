// ***********************************
// Webpack imports.. 
// ***********************************
import '../sass/main.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// ***********************************
// React: 
// ***********************************
import React, {useState} from 'react';
import ReactDOM from 'react-dom';

// ***********************************
// Components: 
// ***********************************
import Paragraph from './view/Paragraph';

const Count = () => {
    const [num, setNum] = useState(0);

    const calc = () => setNum(num + 1);
    return (
        <div>
            <h1>{num}</h1>
            <Paragraph />
            <button onClick={calc}>Add one</button>
        </div>
    )
}



//ReactDOM.render(<Count />, document.getElementById('root'));


