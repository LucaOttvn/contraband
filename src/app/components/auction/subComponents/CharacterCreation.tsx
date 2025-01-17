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
        <div className='center flex-col gap-3'>
            <TextStagger text='Auction - character selection' title={true} />
            <TextStagger text='Choose at least one character per type' title={false} />
            <div className='flex items-center w-full flex-col mt-5 gap-4'>
                {characterCategories.map((char, index) => {
                    return <div key={'characterCategory' + index} className='characterCategory start gap-3 w-1/2' onClick={() => {
                        props.setCurrentSubPage({ page: auctionSubPages.itemsTable, characterType: characterCategories[index].type})
                    }}>
                        <img src={"/imgs/" + char.type + ".png"} width={70} />
                        <TextStagger text={char.name} title={false} />
                    </div>
                })}
            </div>
        </div>
    );
}
