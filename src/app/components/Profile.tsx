import React, { useEffect, useState } from 'react';
import { Player, Skill } from '../context';
import SkillsCreation from './SkillsCreation';
import { getCollection, updatePlayer } from '../../../utils/firestoreQueries';

interface ProfileProps {
  player: Player
  setCurrentPage: React.Dispatch<React.SetStateAction<number | undefined>>
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
}

export default function Profile(props: ProfileProps) {

  const [userSkills, setUserSkills] = useState<Skill[]>([{ name: 'Strength', value: 0 }, { name: 'Eloquence', value: 0 }, { name: 'Science', value: 0 }, { name: 'Luck', value: 0 }])

  async function update() {
    
    props.setPlayer(prevState => ({...prevState, skills: userSkills}))
  }

  return (
    <div className='w-full h-full flex flex-col items-start gap-10'>
      <button className='generalButton' onClick={() => {
        localStorage.removeItem('Player')
        props.setCurrentPage(0)
      }}>Logout</button>

      <SkillsCreation player={props.player} userSkills={userSkills} setUserSkills={setUserSkills}/>

      <div className='w-full center'>
        <div className='generalButton' onClick={update}>Save</div>
      </div>
    </div>
  );
}