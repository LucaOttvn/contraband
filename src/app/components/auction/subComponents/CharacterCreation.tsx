import React from 'react';
import TextStagger from '../../microComponents/TextStagger';
import { auctionSubPages, CharacterTypes } from '@/app/enums';
import { characterCategories, characters, SubPage } from '@/app/context';

interface CharacterCreationProps {
    setCurrentSubPage: React.Dispatch<React.SetStateAction<SubPage | undefined>>
    currentSubPage?: SubPage
}


export default function CharacterCreation(props: CharacterCreationProps) {

    return (
        <div className='center flex-col'>
            <TextStagger text='Auction - character selection' title={true} />
            <div className='flex items-center w-full flex-col mt-5 gap-4'>
                {characterCategories.map((char, index) => {
                    return <div key={'characterCategory' + index} className='characterCategory start gap-3 w-1/2' onClick={() => {
                        props.setCurrentSubPage({ page: auctionSubPages.itemsTable, characterType: props.currentSubPage?.characterType})
                    }}>
                        <img src={"/imgs/" + char.icon + ".png"} width={70} />
                        <TextStagger text={char.name} title={false} />
                    </div>
                })}
            </div>
        </div>
    );
}
