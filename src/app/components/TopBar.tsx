import React from 'react';
import { Player } from '@/app/context';
import { localStorageItems, pagesNames, statuses } from '@/app/enums';

interface BottomBarProps {
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

export default function BottomBar(props: BottomBarProps) {

  let topBarButtons = ['logout', pagesNames.playersList, pagesNames.auction]

  function logout() {
    props.setPlayer((prevPlayer) => ({
      ...prevPlayer,
      status: statuses.offline,
    }));
    localStorage.removeItem(localStorageItems.playerId)
    props.setCurrentPage(pagesNames.login)
  }

  return (
    <div id='bottomBar' className='w-full start gap-2 p-2'>
      {topBarButtons.map((button, index) => {
        return <button key={' topBarBtn' + index} className='generalButton h-full center' style={{width: '2.5rem', height: '2.5rem'}} onClick={() => {
          if (button == 'logout') {
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