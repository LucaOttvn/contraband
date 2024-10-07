import React, { useEffect, useState } from 'react';
import { dbCollections, localStorageItems, pagesNames, statuses } from '../enums';
import { Player } from '../context';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig';
import { updatePlayer } from '../../../utils/firestoreQueries';


interface ProfileProps {
  player: Player
  activePlayers: Player[]
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
  setActivePlayers: React.Dispatch<React.SetStateAction<Player[]>>
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

      props.setActivePlayers(players);

      console.log("Updated players array:", players);
    });
  }, []);

  async function logout() {

    props.setPlayer((prevPlayer) => ({
      ...prevPlayer,
      status: statuses.offline,
    }));

    if (props.player.id) {
      let updatedPlayer = await updatePlayer(props.player.id, props.player)
      console.log(updatedPlayer)
    } else {
      alert('player id not exisitg')
    }
    localStorage.removeItem(localStorageItems.playerId)
    props.setCurrentPage(pagesNames.login)
  }

  return (
    <div className='w-full h-full flex flex-col items-start gap-10'>
      <button className='generalButton' onClick={logout}><img src="/icons/logout.svg" alt="" /></button>

      <span>{props.player.name}</span>
      <span className='title'>Active players</span>
      <div className='flex items-start flex-col'>
        {props.activePlayers.map((player, index) => {
          return <span key={'player' + index}>{'- ' + player.name + ' is ' + player.status}</span>
        })}
      </div>
    </div>
  );
}