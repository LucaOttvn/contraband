'use client'
import React, { useEffect, useState } from "react";
import Login from "./components/Login";

import Main from "./components/Main";
import Loader from "./components/Loader";
import { getCollection, updatePlayer } from "../../utils/firestoreQueries";
import { Player, findPlayer } from "./context";
import { pagesNames, dbCollections, localStorageItems, statuses } from "./enums";

export default function Home() {

  const basicPlayer = { name: '', password: '', status: statuses.offline }

  const [player, setPlayer] = useState<Player>(basicPlayer)
  const [currentPage, setCurrentPage] = useState<string>('')
  const [players, setPlayers] = useState<Player[]>([])

  const pages: { [key: string]: React.JSX.Element } = {
    loader: <Loader></Loader>,
    login: <Login setCurrentPage={setCurrentPage} player={player} setPlayer={setPlayer} players={players} />,
    profile: <Main player={player} setCurrentPage={setCurrentPage} setPlayer={setPlayer} players={players} setPlayers={setPlayers} />,
  }

  useEffect(() => {
    (async () => {
      let playersFromDB = await getCollection(dbCollections.players) as unknown as Player[]
      playersFromDB.filter(player => player.status == statuses.online)
      console.log(playersFromDB)
      setPlayers(playersFromDB)
    })()

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // window.addEventListener('focus', () => {
    //   console.log('User is active in the app');
    //   // Set user status to online
    // });

    // window.addEventListener('blur', () => {
    //   console.log('User is away from the app');
    //   // Set user status to offline
    // });
  }, []);

  async function handleVisibilityChange() {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      status: document.hidden ? statuses.offline : statuses.online,
    }));
  }

  // when the get players is completed, search for the player.id in there and, if found, set player as it, otherwise return to login
  useEffect(() => {
    if (localStorage.getItem(localStorageItems.playerId) && players.length > 0) {
      (async () => {
        const foundPlayer = await findPlayer(players, localStorage.getItem(localStorageItems.playerId)!)
        if (foundPlayer) {
          setPlayer(foundPlayer)
          setCurrentPage(pagesNames.profile)
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


  return (
    <div className="h-full center p-5">
      {currentPage != undefined && pages[currentPage]}
    </div>
  );
}
