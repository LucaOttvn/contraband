import React from 'react';
import TextStagger from './microComponents/TextStagger';
import { Player } from '../context';
import { localStorageItems, pagesNames, statuses } from '../enums';

interface SettingsProps { 
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

export default function Settings(props: SettingsProps) {

    function logout() {
        props.setPlayer((prevPlayer) => ({
            ...prevPlayer,
            status: statuses.offline,
        }));
        localStorage.removeItem(localStorageItems.playerId)
        props.setCurrentPage(pagesNames.login)
    }
    return (
        <div className='start gap-3'>
            <button className='generalButton' onClick={logout}>
                <img src="/icons/logout.svg" alt="" />
            </button>
            <TextStagger text='Logout' title={false} />
        </div>
    );
}