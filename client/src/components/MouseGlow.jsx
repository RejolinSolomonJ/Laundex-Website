import { useEffect, useState } from 'react';

const MouseGlow = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
            aria-hidden="true"
        >
            <div
                className="absolute w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-[100px] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out will-change-transform"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
            />
        </div>
    );
};

export default MouseGlow;
