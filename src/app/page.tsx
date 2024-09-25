'use client'
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { findPlayer, localStorageItems, Player, Skill, updateLocalStorage } from "./context";
import Profile from "./components/Profile";
import Loader from "./components/Loader";
import { getCollection, updatePlayer } from "../../utils/firestoreQueries";

export default function Home() {

  const basicPlayer = { name: '', password: '' }

  const [player, setPlayer] = useState<Player>(basicPlayer)
  const [showingLoader, setShowingLoader] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [playersFromDB, setPlayersFromDB] = useState<Player[]>([])


  const pages: { [key: number]: React.JSX.Element } = {
    0: <Login setCurrentPage={setCurrentPage} player={player} setPlayer={setPlayer} setShowingLoader={setShowingLoader} playersFromDB={playersFromDB} />,
    1: <Profile player={player} setCurrentPage={setCurrentPage} setPlayer={setPlayer} />,
  }

  useEffect(() => {

    (async () => {
      setPlayersFromDB(await getCollection('players') as unknown as Player[])
    })()

  }, []);

  useEffect(() => {
    if (localStorage.getItem(localStorageItems.playerId) && playersFromDB.length > 0) {
      (async () => {
        console.log(playersFromDB)
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
    setCurrentPage(!player.name && !player.password ? 0 : 1)
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

  useEffect(() => {
    if (showingLoader) {
      setTimeout(() => {
        setShowingLoader(false)
      }, 2000)
    }
  }, [showingLoader]);

  return (
    <div className="h-full center p-5">
      {
        showingLoader ? <Loader /> : currentPage != undefined && pages[currentPage]
      }
    </div>
  );
}
