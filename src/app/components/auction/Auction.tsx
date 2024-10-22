import React, { useEffect, useState } from 'react';
import './style.scss'
import CharacterCreation from './subComponents/CharacterCreation';
import { characterCategories, characters, Player, SubPage } from '@/app/context';
import ItemsTable from './subComponents/ItemsTable';
import { auctionSubPages, CharacterTypes } from '@/app/enums';

interface AuctionProps {
    setCurrentSubPage: React.Dispatch<React.SetStateAction<SubPage | undefined>>
    currentSubPage?: SubPage
    setPlayer: React.Dispatch<React.SetStateAction<Player>>
    player: Player
}

export default function Auction(props: AuctionProps) {

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    let subPages: { [key: string]: React.JSX.Element } = {
        characterCreation: <CharacterCreation setCurrentSubPage={props.setCurrentSubPage} />,
        itemsTable:
            <ItemsTable
                title={props.currentSubPage ? characterCategories.find(c => c.name == props.currentSubPage!.characterType)?.name : ''}
                list={characters.filter(char => char.type == props.currentSubPage?.characterType) as any}
                setSelectedItems={setSelectedItems}
                selectedItems={selectedItems}
                player={props.player}
                setPlayer={props.setPlayer}
            />
    }

    useEffect(() => {
        props.setCurrentSubPage({ page: auctionSubPages.characterCreation })
    }, []);

    return (
        <div>
            {(props.currentSubPage && props.currentSubPage.page) && subPages[props.currentSubPage.page]}
        </div>
    );
}