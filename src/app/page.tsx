'use client'
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { dbCollections, findPlayer, localStorageItems, pagesNames, Player, Skill, updateLocalStorage } from "./context";
import Profile from "./components/Profile";
import Loader from "./components/Loader";
import { getCollection, updatePlayer } from "../../utils/firestoreQueries";

export default function Home() {

  const basicPlayer = { name: '', password: '' }

  const [player, setPlayer] = useState<Player>(basicPlayer)

  const [currentPage, setCurrentPage] = useState<string>(pagesNames.loader)
  const [playersFromDB, setPlayersFromDB] = useState<Player[]>([])


  const pages: { [key: string]: React.JSX.Element } = {
    loader: <Loader></Loader>,
    login: <Login setCurrentPage={setCurrentPage} player={player} setPlayer={setPlayer} playersFromDB={playersFromDB} />,
    profile: <Profile player={player} setCurrentPage={setCurrentPage} setPlayer={setPlayer} />,
  }



  useEffect(() => {
    (async () => {
      setPlayersFromDB(await getCollection(dbCollections.players) as unknown as Player[])
    })()

  }, []);

  // when the get playersFromDB is completed, search for the player.id in there and, if found, set player as it, otherwise return to login
  useEffect(() => {
    if (localStorage.getItem(localStorageItems.playerId) && playersFromDB.length > 0) {
      (async () => {
        const foundPlayer = await findPlayer(playersFromDB, localStorage.getItem(localStorageItems.playerId)!)
        if (foundPlayer) {
          setPlayer(foundPlayer)
        }
        else {
          localStorage.removeItem(localStorageItems.playerId)
          setPlayer(basicPlayer)
        }
      })()
      // setPlayer
    }
  }, [playersFromDB]);

  function choosePage() {
    setCurrentPage(!player.name && !player.password ? pagesNames.login : pagesNames.profile)
  }

  useEffect(() => {
    choosePage()
  }, [player]);

  async function updatePlayerState() {
    // if a player with that name and psw exists
    if (player.id) {
      let newPlayer: Player | undefined = await findPlayer(playersFromDB, player.id)
      if (newPlayer && newPlayer.id) updatePlayer(newPlayer!.id!, player)
    }
  }


  return (
    <div className="h-full center p-5">
      {currentPage != undefined && pages[currentPage]}
    </div>
  );
}
