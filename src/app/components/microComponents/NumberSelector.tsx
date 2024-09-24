import { Skill } from '@/app/context';
import React, { useEffect, useState } from 'react';

interface NumberSelectorProps {
    currentTotal: number
    setCurrentTotal: React.Dispatch<React.SetStateAction<number>>
    setUserSkills?: React.Dispatch<React.SetStateAction<Skill[]>>
    index: number
}

export default function NumberSelector(props: NumberSelectorProps) {

    const [currentValue, setCurrentValue] = useState(0)

    useEffect(() => {
        if (props.setUserSkills) {
            props.setUserSkills(prevState =>
                prevState.map((skill, i) =>
                    i === props.index ? { ...skill, value: currentValue } : skill
                )
            );
        }

    }, [currentValue]);

    return (
        <div className='center gap-2'>
            <div className='generalButton' onClick={() => {
                if (currentValue > 0 && props.currentTotal != undefined) {
                    setCurrentValue(currentValue - 1)
                    props.setCurrentTotal(props.currentTotal + 1)
                }
            }}>-</div>
            <span className='px-2 text-center' style={{ border: 'solid 1px var(--green)', width: '3rem' }}>{currentValue}</span>
            <div className='generalButton' onClick={() => {
                if (props.currentTotal != undefined && props.currentTotal > 0) {
                    setCurrentValue(currentValue + 1)
                    props.setCurrentTotal(props.currentTotal - 1)
                }
            }}>+</div>
        </div>
    );
}