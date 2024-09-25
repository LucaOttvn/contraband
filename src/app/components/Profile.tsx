import React, { useEffect, useState } from 'react';
import {localStorageItems, pagesNames, Player } from '../context';

interface ProfileProps {
  player: Player
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
}

export default function Profile(props: ProfileProps) {

  return (
    <div className='w-full h-full flex flex-col items-start gap-10'>
      <button className='generalButton' onClick={() => {
        localStorage.removeItem(localStorageItems.playerId)
        props.setCurrentPage(pagesNames.login)
      }}>Logout</button>

   
    </div>
  );
}