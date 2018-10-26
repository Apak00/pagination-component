import React from 'react';
import {render} from 'react-dom';
import ExampleComponent from '../../src';

const App = () => (
    <div>
        <div>EXAMPLE</div>
        <ExampleComponent
            onPageChange={pageNumber => console.log("Page number is: ", pageNumber)}
            itemCount={224}
            itemPerPage={10}/>
    </div>
);
render(<App/>, document.getElementById("root"));
