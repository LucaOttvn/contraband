import React, { useState, FormEvent, useEffect } from 'react';
import { Player } from '../context';
import TextStagger from './TextStagger';
import { getCollection } from '../../../utils/firestoreQueries'
import { createPlayer } from '../api/queries'


interface LoginProps {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    setPlayer: React.Dispatch<React.SetStateAction<Player>>
    player: Player
}

export default function CharacterCreation(props: LoginProps) {

    function handleSubmit(event: FormEvent) {
        event.preventDefault(); // Prevent the default form submission behavior
        if (props.player.name) {
            props.setCurrentPage(1);
        }
    };
    function handleChange(key: keyof Player, value: string) {
        if (props.player) props.setPlayer(prevState => ({
            ...prevState,
            [key]: value,
        }));
    }


    useEffect(() => {
        console.log(props.player)
    }, [props.player]);

    return (
        <div
            className='w-full h-full flex flex-col items-center gap-10'
        >
            <TextStagger text='Login' title={true} />
            <div className='flex flex-col items-start gap-3'>
                <div className='flex flex-col items-start'>
                    <label htmlFor='name'>Name</label>
                    <input
                        id='name'
                        type='text'
                        className='generalInput'
                        placeholder='Insert name'
                        value={props.player ? props.player.name : ''}
                        onChange={(e) => { handleChange('name', e.target.value) }}
                    />
                </div>
                <div className='flex flex-col items-start'>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        className='generalInput'
                        placeholder='Insert password'
                        value={props.player ? props.player.password : ''}
                        onChange={(e) => { handleChange('password', e.target.value) }}
                    />
                </div>
            </div>

            <button
                onClick={async () => {
                    let players = await getCollection('players') as unknown as Player[]

                    let existingPlayerName = players.find(player => player.name == props.player.name)
                    if (existingPlayerName) {
                        if (existingPlayerName.password == props.player.password) {
                            localStorage.setItem('Player', JSON.stringify(props.player))
                            props.setCurrentPage(1)
                        }
                        else {
                            alert('Wrong password')
                        }
                    }
                    else {
                        await createPlayer(props.player)
                        localStorage.setItem('Player', JSON.stringify(props.player))
                        props.setCurrentPage(1)
                    }


                    console.log(players)
                }}
                className='generalButton'
            >
                Confirm
            </button>
        </div>
    );
}
