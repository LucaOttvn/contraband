import React, { useEffect, useState } from 'react';
import { dbCollections, localStorageItems, pagesNames, statuses } from '../enums';
import { Player } from '../context';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig';
import { updatePlayer } from '../../../utils/firestoreQueries';
import PlayersList from './PlayersList';


interface ProfileProps {
  player: Player
  players: Player[]
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
}

export default function Profile(props: ProfileProps) {

  const playersCollectionRef = collection(db, dbCollections.players);
  useEffect(() => {
    onSnapshot(playersCollectionRef, (snapshot) => {

      const players = snapshot.docs.map((doc) => {
        const data = doc.data();

        const player: Player = {
          id: doc.id,
          name: data.name,
          password: data.password,
          status: data.status,
        };

        return player;
      });

      props.setPlayers(players);
    });
  }, []);

  function logout() {
    props.setPlayer((prevPlayer) => ({
      ...prevPlayer,
      status: statuses.offline,
    }));
    localStorage.removeItem(localStorageItems.playerId)
    props.setCurrentPage(pagesNames.login)
  }

  return (
    <div className='w-full h-full flex flex-col items-start gap-10'>
      <button className='generalButton' onClick={logout}><img src="/icons/logout.svg" alt="" /></button>

      <span>{props.player.name}</span>
      <PlayersList activePlayers={props.players}/>
      
    </div>
  );
}