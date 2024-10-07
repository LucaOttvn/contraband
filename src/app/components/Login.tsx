import React, { useState, FormEvent, useEffect, useRef } from 'react';

import TextStagger from './TextStagger';
import { addPlayer, getCollection } from '../../../utils/firestoreQueries'
import { Player } from '../context';
import { pagesNames, localStorageItems } from '../enums';

interface LoginProps {
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
    setPlayer: React.Dispatch<React.SetStateAction<Player>>
    player: Player
    players: Player[]
}

export default function Login(props: LoginProps) {

    const formRef = useRef(null);

    async function submit(e: any) {
        e.preventDefault()

        props.setCurrentPage(pagesNames.loader)

        let formData
        if (formRef.current) formData = Object.fromEntries(new FormData(formRef.current).entries())

        if (formData) {
            if (formData.name && formData.password) {

                let existingPlayer = props.players.find(player => player.name == formData.name)

                if (existingPlayer) {
                    if (formData.password != existingPlayer.password) {
                        alert('Wrong password')
                    }
                    else {
                        nextPage(existingPlayer)
                    }
                }
                else {
                    let newPlayer = await addPlayer(formData as unknown as Player)
                    if (newPlayer) {
                        nextPage(newPlayer)
                    }
                    else {
                        console.log('Player creation failed')
                    }
                }
            }
            else {
                alert('Name or password are missing')
            }
        }
    }

    function nextPage(result: Player) {
        props.setPlayer(result)
        localStorage.setItem(localStorageItems.playerId, result.id!)
        props.setCurrentPage(pagesNames.profile)
    }

    return (
        <div
            className='w-full h-full flex flex-col items-center gap-10'
        >
            <TextStagger text='Login' title={true} />
            <form ref={formRef} onSubmit={submit} className='center flex-col gap-10'>
                <div className='flex flex-col items-start gap-3'>
                    <div className='flex flex-col items-start'>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            className='generalInput'
                            placeholder='Insert name'
                            defaultValue={props.player ? props.player.name : ''}
                        />
                    </div>
                    <div className='flex flex-col items-start'>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            className='generalInput'
                            placeholder='Insert password'
                            defaultValue={props.player ? props.player.password : ''}
                        />
                    </div>
                </div>
                <button type="submit" className='generalButton'>Submit</button>
            </form>
        </div>
    );
}
