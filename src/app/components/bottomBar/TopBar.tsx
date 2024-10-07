import React from 'react';
import './style.scss'
import { Player } from '@/app/context';
import { localStorageItems, pagesNames, statuses, topBarPages } from '@/app/enums';

interface BottomBarProps {
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

export default function BottomBar(props: BottomBarProps) {

  let topBarButtons = [topBarPages.logout, topBarPages.players, topBarPages.player]

  function logout() {
    props.setPlayer((prevPlayer) => ({
      ...prevPlayer,
      status: statuses.offline,
    }));
    localStorage.removeItem(localStorageItems.playerId)
    props.setCurrentPage(pagesNames.login)
  }



  return (
    <div id='bottomBar' className='w-full flex justify-between items-center'>

      {topBarButtons.map((button, index) => {
        return <button className='h-full p-5 center' onClick={() => {
          if (button == topBarPages.logout) {
            logout()
          }
          else {
            props.setCurrentPage(button)
          }
        }}>
          <img src={"/icons/" + button + ".svg"} alt="" />
        </button>
      })}
    </div>
  );
}