'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { Player, Skill } from "./context";
import Profile from "./components/Profile";
import Loader from "./components/Loader";
import { getCollection, updatePlayer } from "../../utils/firestoreQueries";

export default function Home() {



  const [player, setPlayer] = useState<Player>({ name: '', password: '' })
  const [fullScreen, setFulScreen] = useState(true)
  const [showingLoader, setShowingLoader] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>()

  const pages: { [key: number]: React.JSX.Element } = {
    0: <Login setCurrentPage={setCurrentPage} player={player} setPlayer={setPlayer} setShowingLoader={setShowingLoader} />,
    1: <Profile player={player} setCurrentPage={setCurrentPage} setPlayer={setPlayer} />,
  }


  useEffect(() => {
    if (localStorage.getItem('Player')) {
      setPlayer(JSON.parse(localStorage.getItem('Player')!))
      setCurrentPage(1)
    } else {
      setCurrentPage(0)
    }

    const handleFullScreenChange = () => {
      setFulScreen(!document.fullscreenElement)
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);


    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };

  }, []);

  useEffect(() => {
    if (showingLoader) {
      setTimeout(() => {
        setShowingLoader(false)
      }, 2000)
    }
  }, [showingLoader]);

  useEffect(() => {
    test()
  }, [player]);

  async function test() {
    let players = await getCollection('players')
    let newPlayer = players.find((p: any) => p.name == player.name && p.password == player.password)
    console.log(player)
    if (newPlayer) updatePlayer(newPlayer!.id, player)
  }

  function goFullScreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div className="h-full center p-5">
      {
        showingLoader ? <Loader /> : currentPage != undefined && pages[currentPage]
      }
    </div>
  );
}
