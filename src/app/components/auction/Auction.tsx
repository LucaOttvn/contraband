import React, { useState } from 'react';
import TextStagger from '../microComponents/TextStagger';
import './style.scss'
import CharacterCreation from './subComponents/CharacterCreation';
import { Player } from '@/app/context';
import ItemsTable from './subComponents/ItemsTable';
import { auctionSubPages } from '@/app/enums';

interface AuctionProps { }

export default function Auction(props: AuctionProps) {

    const [currentSubPage, setCurrentSubPage] = useState(auctionSubPages.characterCreation)

    const subPages: { [key: string]: React.JSX.Element } = {
        characterCreation: <CharacterCreation setCurrentSubPage={setCurrentSubPage}/>,
        itemsTable: <ItemsTable list={[]} />
    }


    return (
        <div>
            {subPages[currentSubPage]}
        </div>
    );
}