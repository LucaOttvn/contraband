'use client'
import React, { useEffect, useState } from "react";
import Login from "./components/Login";

import Profile from "./components/Profile";
import Loader from "./components/Loader";
import { getCollection, updatePlayer } from "../../utils/firestoreQueries";
import { Player, findPlayer } from "./context";
import { pagesNames, dbCollections, localStorageItems, statuses } from "./enums";

export default function Home() {

  const basicPlayer = { name: '', password: '', status: statuses.offline }

  const [player, setPlayer] = useState<Player>(basicPlayer)
  const [currentPage, setCurrentPage] = useState<string>('')
  const [activePlayers, setActivePlayers] = useState<Player[]>([])

  const pages: { [key: string]: React.JSX.Element } = {
    loader: <Loader></Loader>,
    login: <Login setCurrentPage={setCurrentPage} player={player} setPlayer={setPlayer} activePlayers={activePlayers} />,
    profile: <Profile player={player} setCurrentPage={setCurrentPage} setPlayer={setPlayer} activePlayers={activePlayers} setActivePlayers={setActivePlayers} />,
  }

  useEffect(() => {
    (async () => {
      let playersFromDB = await getCollection(dbCollections.players) as unknown as Player[]
      playersFromDB.filter(player => player.status == statuses.online)
      console.log(playersFromDB)
      setActivePlayers(playersFromDB)
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

    if (document.hidden) {
      console.log('User is not using the app');

      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        status: statuses.offline,
      }));

      console.log(player)

    } else {
      console.log('User is using the app');

      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        status: statuses.online,
      }));

    }
  }

  // when the get activeplayers is completed, search for the player.id in there and, if found, set player as it, otherwise return to login
  useEffect(() => {
    if (localStorage.getItem(localStorageItems.playerId) && activePlayers.length > 0) {
      (async () => {
        const foundPlayer = await findPlayer(activePlayers, localStorage.getItem(localStorageItems.playerId)!)
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
  }, [activePlayers]);


  useEffect(() => {
    if (player.id) updatePlayer(player.id, player)
  }, [player]);

  return (
    <div className="h-full center p-5">
      {currentPage != undefined && pages[currentPage]}
    </div>
  );
}
