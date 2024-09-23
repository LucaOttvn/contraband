import React, { useEffect, useState } from 'react';

interface DurationSelectorProps {
    currentTotal: number
    setCurrentTotal: React.Dispatch<React.SetStateAction<number>>
}

export default function DurationSelector(props: DurationSelectorProps) {

    const [currentValue, setCurrentValue] = useState(0)

    return (
        <div className='center gap-2'>
            <div className='generalButton' onClick={() => {
                if (currentValue > 0) {
                    setCurrentValue(currentValue - 1)
                    props.setCurrentTotal(props.currentTotal + 1)
                }
            }}>-</div>
            <span className='px-2 text-center' style={{ border: 'solid 1px var(--green)', width: '3rem' }}>{currentValue}</span>
            <div className='generalButton' onClick={() => {
                if (currentValue < props.currentTotal) {
                    setCurrentValue(currentValue + 1)
                    props.setCurrentTotal(props.currentTotal - 1)
                }
            }}>+</div>
        </div>
    );
}