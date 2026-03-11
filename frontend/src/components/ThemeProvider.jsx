
// store se koyi bhi chij lane ke liye useSelector ka use hota hai

import React from 'react';
import { useSelector } from 'react-redux';

const ThemeProvider = ({children}) => {
    const {theme} = useSelector(state => state.theme)
    return (
        <div className={theme}>
            <div className="bg-gray-200 text-gray-800 dark:text-gray-200 dark:bg-[rbg(16,23,42)]">
                {children}
            </div>
        </div>
    )
};

export default  ThemeProvider;