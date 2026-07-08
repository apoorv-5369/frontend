import React, { useRef} from 'react';

interface ShuffleTextProps {
    text: string;
    className?: string;
}

const ShuffleText: React.FC<ShuffleTextProps> = ({ text, className }) =>{
    const ref = useRef<HTMLHeadingElement>(null);
    const intervalRef = useRef<number | null>(null);
    const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const cleanUp = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (ref.current) {
            ref.current.innerText = text;
        }
    };

    const handleMouseEnter = () => {
        let iteration = 0;

        cleanUp();

        intervalRef.current = window.setInterval(() => {
            if (ref.current) {
                ref.current.innerText = ref.current.innerText
                    .split("")
                    .map((_letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");
            }

            if (iteration >= text.length) {
                cleanUp();
            }

            iteration += 1 / 3;
        }, 30);
    };
    return (
        
        <h1
            ref={ref}
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={cleanUp}
        >
            {text}
        </h1>);
};
export default ShuffleText;