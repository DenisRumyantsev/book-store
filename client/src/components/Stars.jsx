import React from 'react';

const Stars = (star) => {
    const result = [];
    if (star === null) {
        for (let number = 0; number < 5; number++) {
            result.push(<i class="material-icons" style={{ color: 'silver' }}>star</i>);
        }
    } else {
        result.push(<i class="material-icons" style={{ color: 'orangered' }}>star</i>);
        for (let number = 1; number < 5; number++) {
            result.push(
                <>
                    {star < number + 0.25 && <i class="material-icons" style={{ color: 'orangered' }}>star_border</i>}
                    {star >= number + 0.25 && star < number + 0.75 && <i class="material-icons" style={{ color: 'orangered' }}>star_half</i>}
                    {star >= number + 0.75 && <i class="material-icons" style={{ color: 'orangered' }}>star</i>}
                </>
            );
        }
        result.push(<i> ({Math.round(star * 100) / 100})</i>);
    }
    return result;
};

export default Stars;
