import React, { useEffect, useRef, useState } from "react";

export const useGoingUp = (): boolean => {

    const scrollPosition = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
    const [goingUp, setGoingUp] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollY } = window;
            setGoingUp(scrollPosition.current > scrollY);
            scrollPosition.current = scrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return goingUp;
};