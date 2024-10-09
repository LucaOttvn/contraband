import React from 'react';
import TextStagger from '../microComponents/TextStagger';
import './style.scss'

interface AuctionProps { }

interface CharacterCategory {
    name: string,
    icon: string
}

export default function Auction(props: AuctionProps) {

    let characterCategories: CharacterCategory[] = [
        { name: 'Pilots', icon: 'pilot' },
        { name: 'Doctors', icon: 'doctor' },
        { name: 'Engineers', icon: 'engineer' },
        { name: 'Traders', icon: 'trader' },
    ]

    return (
        <div className='center flex-col'>
            <TextStagger text='Auction - character selection' title={true} />
            <div className='flex items-center w-full flex-col mt-5 gap-4'>
                {characterCategories.map((char, index) => {
                    return <div className='characterCategory start gap-3 w-1/2'>
                        <img src={"/imgs/" + char.icon + ".png"} width={70} />
                        <TextStagger text={char.name} title={false} />
                    </div>
                })}
            </div>
        </div>
    );
}