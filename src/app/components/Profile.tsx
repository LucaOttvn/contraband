import React, { useEffect, useState } from 'react';
import { Player } from '../context';
import TextStagger from './TextStagger';
import DurationSelector from './microComponents/DurationSelector';



interface ProfileProps {
  player: Player
  setCurrentPage: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function Profile(props: ProfileProps) {

  const skills = ['Strength', 'Eloquence', 'Science', 'Luck']
  const [currentTotal, setCurrentTotal] = useState(30)

  return (
    <div className='w-full h-full flex flex-col items-start gap-10'>
      <button className='generalButton' onClick={() => {
        localStorage.removeItem('Player')
        props.setCurrentPage(0)
      }}>Logout</button>
      <TextStagger text={props.player.name + "'s skills set"} title={true} />
      <div><TextStagger text={'Available points: ' + currentTotal} title={false} /></div>

      {/* skills inputs */}
      <div className='w-full center flex-wrap gap-10'>
        {skills.map((skill, skillIndex) => {
          return (
            <div className='center flex-col'>
              <span>{skill}</span>
              <DurationSelector currentTotal={currentTotal} setCurrentTotal={setCurrentTotal}/>
            </div>
          )
        })}
      </div>

    </div>
  );
}