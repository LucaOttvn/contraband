import { motion } from 'framer-motion';
import React from 'react';

interface TextStaggerProps {
    text: string
    title: boolean
}

export default function TextStagger(props: TextStaggerProps) {

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.05, // Adjust delay for staggering effect
                duration: 0
            }
        })
    };

    return (
        <motion.div
            className={'staggered-text w-full text-center flex flex-wrap justify-center ' + (props.title ? ' title' : '')}
            initial='hidden'
            animate='visible'
        >
            {props.text.split('').map((char, index) => (
                <motion.span
                    key={index}
                    variants={textVariants}
                    custom={index}
                >
                    {char}
                </motion.span>
            ))}
        </motion.div>
    );
}