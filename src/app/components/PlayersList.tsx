import React from 'react';
import { Player } from '../context';

interface PlayersListProps { 
  activePlayers: Player[]
}

export default function PlayersList(props: PlayersListProps) {
    return (
        <div>
            <span className='title'>Players</span>
            <div className='flex items-start flex-col'>
                {props.activePlayers.map((player, index) => {
                    return <span key={'player' + index}>{'- ' + player.name + ' is ' + player.status}</span>
                })}
            </div>
        </div>
    );
}