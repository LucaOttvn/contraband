import React from 'react';
import { Player } from '@/app/context';
import { localStorageItems, pagesNames, statuses } from '@/app/enums';

interface BottomBarProps {
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

export default function BottomBar(props: BottomBarProps) {

  let topBarButtons = [pagesNames.settings, pagesNames.playersList, pagesNames.auction]

  

  return (
    <div id='bottomBar' className='w-full start gap-2 p-2'>
      {topBarButtons.map((button, index) => {
        return <button key={' topBarBtn' + index} className='generalButton h-full center' style={{ width: '2.5rem', height: '2.5rem' }} onClick={() => {
          props.setCurrentPage(button)
        }}>
          <img src={"/icons/" + button + ".svg"} alt="" />
        </button>
      })}
    </div>
  );
}