import React, { useEffect, useState } from 'react';
import {localStorageItems, pagesNames, Player } from '../context';
import SkillsCreation from './SkillsCreation';
import { getCollection, updatePlayer } from '../../../utils/firestoreQueries';
import ProfileOverview from './ProfileOverview';

interface ProfileProps {
  player: Player
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
}

export default function Profile(props: ProfileProps) {

  const [updatingSkills, setUpdatingSkills] = useState<boolean>(false)

  useEffect(() => {
    // if there already are some skills saved go to the detail page, otherwise in the setup one
    setUpdatingSkills(!props.player.skills?.length);
  }, []);

  return (
    <div className='w-full h-full flex flex-col items-start gap-10'>
      <button className='generalButton' onClick={() => {
        localStorage.removeItem(localStorageItems.playerId)
        props.setCurrentPage(pagesNames.login)
      }}>Logout</button>

      {
        updatingSkills ?
          <SkillsCreation player={props.player} setPlayer={props.setPlayer} setUpdatingSkills={setUpdatingSkills}/> :
          <ProfileOverview />
      }

    </div>
  );
}