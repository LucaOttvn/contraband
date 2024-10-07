import React, { useEffect, useState } from 'react';
import { localStorageItems, pagesNames } from '../enums';
import { Player } from '../context';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig';


interface ProfileProps {
  player: Player
  players: Player[]
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
}

export default function Profile(props: ProfileProps) {

  const playersCollectionRef = collection(db, 'players');
  useEffect(() => {
    onSnapshot(playersCollectionRef, (snapshot: any) => {

      const players = snapshot.docs.map((doc: any) => doc.data());

      props.setPlayers(players)

      console.log("Updated players array:", players);
    });
  }, []);

  return (
    <div className='w-full h-full flex flex-col items-start gap-10'>
      <button className='generalButton' onClick={() => {
        localStorage.removeItem(localStorageItems.playerId)
        props.setCurrentPage(pagesNames.login)
      }}>Logout</button>
      <span>Active players</span>
      {props.players.map((player, index) => {
        return <span key={'player' + index}>{player.name}</span>
      })}
    </div>
  );
}