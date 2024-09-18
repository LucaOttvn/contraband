import React, { useEffect } from 'react';
import { PLayer } from '../context';
import { motion } from "framer-motion"
import TextStagger from './TextStagger';


interface ProfileProps {
  player: PLayer
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export default function Profile(props: ProfileProps) {

  return (
    <div className='w-full h-full flex flex-col items-start'>
      <button className='generalButton' onClick={()=>{
        props.setCurrentPage(0)
      }}>Back</button>
      <TextStagger text={props.player.name} title={true}/>
    </div>
  );
}