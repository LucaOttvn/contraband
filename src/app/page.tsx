'use client'
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Loader from "./components/Loader";
import { getCollection, updatePlayer } from "../../utils/firestoreQueries";
import { Player, SubPage, basicPlayer, findPlayer } from "./context";
import { pagesNames, dbCollections, localStorageItems, statuses, auctionSubPages } from "./enums";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import PlayersList from "./components/PlayersList";
import PlayerDetail from "./components/PlayerDetail";
import Auction from "./components/auction/Auction";
import Settings from "./components/Settings";
import TopBar from "./components/TopBar";

export default function Home() {


  const [player, setPlayer] = useState<Player>(basicPlayer)
  const [currentPage, setCurrentPage] = useState<string>('')
  const [players, setPlayers] = useState<Player[]>([])

  const [currentSubPage, setCurrentSubPage] = useState<SubPage | undefined>(undefined)

  const pages: { [key: string]: React.JSX.Element } = {
    loader: <Loader></Loader>,
    login: <Login setCurrentPage={setCurrentPage} player={player} setPlayer={setPlayer} players={players} />,
    playersList: <PlayersList activePlayers={players} />,
    playerDetail: <PlayerDetail />,
    auction: <Auction setCurrentSubPage={setCurrentSubPage} currentSubPage={currentSubPage} player={player} setPlayer={setPlayer} />,
    settings: <Settings setPlayer={setPlayer} setCurrentPage={setCurrentPage} />,
  }

  const playersCollectionRef = collection(db, dbCollections.players);

  useEffect(() => {
    (async () => {
      let playersFromDB = await getCollection(dbCollections.players) as unknown as Player[]
      playersFromDB.filter(player => player.status == statuses.online)
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

    // setCurrentPage(localStorage.getItem(localStorageItems.playerId) ? pagesNames.playersList : pagesNames.login)

    document.addEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  async function handleVisibilityChange() {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      status: document.hidden ? statuses.offline : statuses.online,
    }));
  }

  // the player has a name only when it's logged in so, when he has one, he's redirected to the playersList page
  useEffect(() => {
    if (player.id) {
      updatePlayer(player.id, player)
    }
    if (player.name) setCurrentPage(pagesNames.playersList)
  }, [player.name]);


  // when the get players is completed, search for the player.id and, if found, set player as it, otherwise return to login
  useEffect(() => {
    if (players[0]) (async () => {
      console.log(players)
      if (localStorage.getItem(localStorageItems.playerId)) {
        const foundPlayer = await findPlayer(players, localStorage.getItem(localStorageItems.playerId)!)
        if (foundPlayer) setPlayer(foundPlayer)
      } else {
        setCurrentPage(pagesNames.login)
      }
    })()
  }, [players]);

  useEffect(() => {
    setCurrentSubPage(undefined)
  }, [currentPage]);

  return (
    <div className="h-full flex flex-col items-start relative">
      {currentPage != pagesNames.login && <TopBar currentSubPage={currentSubPage} setCurrentSubPage={setCurrentSubPage} currentPage={currentPage} setCurrentPage={setCurrentPage} setPlayer={setPlayer} player={player} />}
      <div className="p-5 w-full">
        {currentPage != undefined && pages[currentPage]}
      </div>
    </div>
  );
}
