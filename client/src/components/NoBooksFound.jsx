import React from 'react';

const card = {
    margin: 100,
    paddingTop: 50,
    paddingBottom: 100
};

const NoBooksFound = () => {
    return (
        <div class="row">
            <div class="col s12 m4 offset-m4">
                <div class="card z-depth-5" style={card}>
                    <h4>No books found . . .</h4>
                </div>
            </div>
        </div>
    );
};

export default NoBooksFound;
