import { useState, useEffect } from 'react';

export const UseScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {

        if (typeof window !== 'undefined') {
            const updatePosition = () => {
                setScrollPosition(window.scrollY);
            };

            window.addEventListener('scroll', updatePosition);
            updatePosition(); 
            return () => window.removeEventListener('scroll', updatePosition);
        }
    }, []);
    

    return typeof window !== 'undefined' ? scrollPosition : 0;
};
