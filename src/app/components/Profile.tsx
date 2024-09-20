import React, { useEffect } from 'react';
import { Player } from '../context';
import { motion } from "framer-motion"
import TextStagger from './TextStagger';


interface ProfileProps {
  player: Player
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export default function Profile(props: ProfileProps) {

  return (
    <div className='w-full h-full flex flex-col items-start'>
      <button className='generalButton' onClick={()=>{
        localStorage.removeItem('Player')
        props.setCurrentPage(0)
      }}>Logout</button>
      <TextStagger text={props.player.name} title={true}/>
    </div>
  );
}