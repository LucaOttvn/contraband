import React, { useState, FormEvent } from 'react';
import { PLayer } from '../context'; // Assuming PLayer is a type or interface

interface CharacterCreationProps {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    setPlayer: React.Dispatch<React.SetStateAction<PLayer>>
    player: PLayer
}

export default function CharacterCreation(props: CharacterCreationProps) {

    function handleSubmit(event: FormEvent) {
        event.preventDefault(); // Prevent the default form submission behavior
        if (props.player.name) {
            props.setCurrentPage(1);
        }
    };

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.setPlayer(prevPlayer => ({ ...prevPlayer, name: event.target.value }));
    }

    return (
        <form
            className='w-full h-full flex flex-col items-center gap-10'
            onSubmit={handleSubmit}
        >
            <h1>Create your character</h1>
            <div className='flex flex-col items-start'>
                <label htmlFor='name'>Name</label>
                <input
                    id='name'
                    type='text'
                    className='generalInput'
                    placeholder='Insert your name'
                    value={props.player.name}
                    onChange={handleNameChange}
                />
            </div>
            <button
                type='submit'
                className='generalButton'
            >
                Confirm
            </button>
        </form>
    );
}
