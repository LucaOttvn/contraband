import React, { useEffect, useState } from 'react';
import './style.scss'
import CharacterCreation from './subComponents/CharacterCreation';
import { characterCategories, characters, Player, SubPage } from '@/app/context';
import ItemsTable from './subComponents/ItemsTable';
import { auctionSubPages } from '@/app/enums';

interface AuctionProps {
    setCurrentSubPage: React.Dispatch<React.SetStateAction<SubPage | undefined>>
    currentSubPage?: SubPage
}

export default function Auction(props: AuctionProps) {

    const subPages: { [key: string]: React.JSX.Element } = {
        characterCreation: <CharacterCreation setCurrentSubPage={props.setCurrentSubPage} />,
        itemsTable: <ItemsTable title={props.currentSubPage?.characterType != undefined ? characterCategories[props.currentSubPage.characterType].name : ''} list={props.currentSubPage?.characterType != undefined ? characters[props.currentSubPage.characterType] : []} />
    }

    useEffect(() => {
      props.setCurrentSubPage({page: auctionSubPages.characterCreation})
    }, []);

    return (
        <div>
            {(props.currentSubPage && props.currentSubPage.page) && subPages[props.currentSubPage.page]}
        </div>
    );
}