const playMusic = (audioRef) => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current
        .play()
        .catch((error) => console.log("Error playing music:", error));
    }
  };
  
  export default playMusic;
  