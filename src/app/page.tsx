'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import CharacterCreation from "./components/Login";
import { Player } from "./context";
import Profile from "./components/Profile";


export default function Home() {



  const [player, setPlayer] = useState<Player>(localStorage.getItem('Player') ? JSON.parse(localStorage.getItem('Player')!) : {name: '', password: ''})
  const [fullScreen, setFulScreen] = useState(true)
  const [currentPage, setCurrentPage] = useState(player ? 1 : 0)


  const pages: { [key: number]: React.JSX.Element } = {
    0: <CharacterCreation setCurrentPage={setCurrentPage} player={player} setPlayer={setPlayer} />,
    1: <Profile player={player} setCurrentPage={setCurrentPage} />,
  }


  useEffect(() => {
    player ? setCurrentPage(1) : setCurrentPage(0)

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setFulScreen(false)
      } else {
        setFulScreen(true)
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);


    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };

  }, []);

  function goFullScreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div className="h-full center p-5">
      {!fullScreen ? (
        <button onClick={goFullScreen}>Start</button>
      ) : (
        pages[currentPage]
      )}
    </div>
  );
}
