'use client'
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { ContextEntities, Player, Skill, updateLocalStorage } from "./context";
import Profile from "./components/Profile";
import Loader from "./components/Loader";
import { getCollection, updatePlayer } from "../../utils/firestoreQueries";

export default function Home() {

  const [player, setPlayer] = useState<Player>({ name: '', password: '' })
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



    if (localStorage.getItem(ContextEntities.Player)) {
      setPlayer(JSON.parse(localStorage.getItem(ContextEntities.Player)!))
    }

  }, []);

  useEffect(() => {
    console.log(playersFromDB)
  }, [playersFromDB]);

  function choosePage() {
    setCurrentPage(!player.name && !player.password ? 0 : 1)
  }

  useEffect(() => {
    choosePage()
    updatePlayerState()
  }, [player]);

  async function updatePlayerState() {
    let players = await getCollection('players')
    // if a player with that name and psw exists
    let newPlayer = players.find((p: any) => p.name == player.name && p.password == player.password)
    if (newPlayer) updatePlayer(newPlayer!.id, player)
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
