import React, { useEffect } from 'react';
import { PLayer } from '../context';

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
      <h1 className='w-full center'>{props.player.name}</h1>
    </div>
  );
}