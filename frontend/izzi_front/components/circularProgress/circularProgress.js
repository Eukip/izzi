import React from 'react';
import CSS from './circularProgress.module.scss'

const CircularProgress = () => {
    return (
        <div className={CSS.loader}>
            <svg className={CSS.circular}>
                <circle className={CSS.path} cx="50" cy="50" r="20" fill="none" stroke-width="5"
                        stroke-miterlimit="10"></circle>
            </svg>
        </div>
    );
};

export default CircularProgress;