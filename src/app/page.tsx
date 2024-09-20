'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { Player } from "./context";
import Profile from "./components/Profile";


export default function Home() {



  const [player, setPlayer] = useState<Player>({ name: '', password: '' })
  const [fullScreen, setFulScreen] = useState(true)
  const [currentPage, setCurrentPage] = useState<number>()


  const pages: { [key: number]: React.JSX.Element } = {
    0: <Login setCurrentPage={setCurrentPage} player={player} setPlayer={setPlayer} />,
    1: <Profile player={player} setCurrentPage={setCurrentPage} />,
  }


  useEffect(() => {
    if (localStorage.getItem('Player')) {
      setPlayer(JSON.parse(localStorage.getItem('Player')!))
      setCurrentPage(1)
    } else { 
      setCurrentPage(0)
    }

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
        currentPage != undefined && pages[currentPage]
      )}
    </div>
  );
}
