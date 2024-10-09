import React from 'react';
import { Player } from '../context';
import TextStagger from './microComponents/TextStagger';

interface PlayersListProps {
    activePlayers: Player[]
}

export default function PlayersList(props: PlayersListProps) {
    return (
        <div>
            <div className='w-full center mb-5'><TextStagger text='Players' title={true} /></div>
            <div className='flex items-start flex-col'>
                {props.activePlayers.map((player, index) => {
                    return <TextStagger key={'player' + index} text={'- ' + player.name + ' is ' + player.status} title={false}/>
                })}
            </div>
        </div>
    );
}