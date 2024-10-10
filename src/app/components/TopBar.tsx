import React from 'react';
import { Player, SubPage } from '@/app/context';
import { auctionSubPages, pagesNames } from '@/app/enums';

interface TopBarProps {
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
  setCurrentSubPage: React.Dispatch<React.SetStateAction<SubPage | undefined>>
  currentPage: string
  currentSubPage?: SubPage
}

export default function TopBar(props: TopBarProps) {

  let topBarButtons = [pagesNames.playersList, pagesNames.auction, pagesNames.settings]

  return (
    <div id='TopBar' className='w-full start gap-2 p-2'>
      <button className='generalButton' disabled={props.currentSubPage == undefined || props.currentSubPage.page == auctionSubPages.characterCreation} style={{ width: '2.5rem', height: '2.5rem' }} 
      onClick={()=>{
        if (props.currentPage == pagesNames.auction) {
          props.setCurrentSubPage({page: auctionSubPages.characterCreation})
        }
      }}
      ><img src="/icons/back.svg"/></button>
      {topBarButtons.map((button, index) => {
        return <button key={'topBarBtn' + index} className={props.currentPage == button ? ' clicked ' : ' ' + ' generalButton h-full center'} style={{ width: '2.5rem', height: '2.5rem' }} onClick={() => {
          props.setCurrentPage(button)
        }}>
          <img src={"/icons/" + button + ".svg"} alt="" />
        </button>
      })}
    </div>
  );
}