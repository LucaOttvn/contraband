'use client'
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Loader from "./components/Loader";
import { getCollection, updatePlayer } from "../../utils/firestoreQueries";
import { Player, SubPage, findPlayer } from "./context";
import { pagesNames, dbCollections, localStorageItems, statuses, auctionSubPages } from "./enums";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import PlayersList from "./components/PlayersList";
import PlayerDetail from "./components/PlayerDetail";
import Auction from "./components/auction/Auction";
import Settings from "./components/Settings";
import TopBar from "./components/TopBar";

export default function Home() {

  const basicPlayer = { name: '', password: '', status: statuses.offline, wallet: 0}

  const [player, setPlayer] = useState<Player>(basicPlayer)
  const [currentPage, setCurrentPage] = useState<string>('')
  const [players, setPlayers] = useState<Player[]>([])

  const [currentSubPage, setCurrentSubPage] = useState<SubPage | undefined>(undefined)

  const pages: { [key: string]: React.JSX.Element } = {
    loader: <Loader></Loader>,
    login: <Login setCurrentPage={setCurrentPage} player={player} setPlayer={setPlayer} players={players} />,
    playersList: <PlayersList activePlayers={players} />,
    playerDetail: <PlayerDetail />,
    auction: <Auction setCurrentSubPage={setCurrentSubPage} currentSubPage={currentSubPage}/>,
    settings: <Settings setPlayer={setPlayer} setCurrentPage={setCurrentPage} />,
  }

  const playersCollectionRef = collection(db, dbCollections.players);

  useEffect(() => {
    (async () => {
      let playersFromDB = await getCollection(dbCollections.players) as unknown as Player[]
      playersFromDB.filter(player => player.status == statuses.online)
      console.log(playersFromDB)
      setPlayers(playersFromDB)
    })()

    onSnapshot(playersCollectionRef, (snapshot) => {
      const players = snapshot.docs.map((doc) => {
        const data = doc.data();
        const player: Player = {
          id: doc.id,
          name: data.name,
          password: data.password,
          status: data.status,
          wallet: data.wallet
        };

        return player;
      });
      setPlayers(players);
    });

    document.addEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  async function handleVisibilityChange() {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      status: document.hidden ? statuses.offline : statuses.online,
    }));
  }

  // when the get players is completed, search for the player.id and, if found, set player as it, otherwise return to login
  useEffect(() => {
    if (localStorage.getItem(localStorageItems.playerId) && players.length > 0) {
      (async () => {
        const foundPlayer = await findPlayer(players, localStorage.getItem(localStorageItems.playerId)!)
        if (foundPlayer) {
          setPlayer(foundPlayer)
          setCurrentPage(pagesNames.playersList)
        }
        else {
          localStorage.removeItem(localStorageItems.playerId)
          setPlayer(basicPlayer)
          setCurrentPage(pagesNames.login)
        }
      })()
    }
    if (!localStorage.getItem(localStorageItems.playerId)) {
      setCurrentPage(pagesNames.login)
    }
  }, [players]);

  useEffect(() => {
    if (player.id) {
      console.log(player)
      updatePlayer(player.id, player)
    }
  }, [player]);

  useEffect(() => {
    setCurrentSubPage(undefined)
  }, [currentPage]);

  return (
    <div className="h-full flex flex-col items-start relative">
      {currentPage != pagesNames.login && <TopBar currentSubPage={currentSubPage} setCurrentSubPage={setCurrentSubPage} currentPage={currentPage} setCurrentPage={setCurrentPage} setPlayer={setPlayer} player={player}/>}
      <div className="p-5 w-full">
        {currentPage != undefined && pages[currentPage]}
      </div>
    </div>
  );
}
