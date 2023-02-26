import React ,{ useState ,useRef} from "react";
//import styles 
import "./styles/app.scss"

//adding components 
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
// import util

import data from "./data"

  
function App() {
 //Ref 
 const audioRef=useRef(null);


 //States
  const [songInfo,SetSongIfno]=useState({
    currentSong:0,
    duration:0,
    animationPercentage:0,
})
  const [songs,setSongs]=useState(data());
  const [currentSong,setCurrentSong]=useState(songs[0]);  
  const [isPlaying,setIsPlaying]=useState(false);
const [libraryStatus,setLibraryStatus]=useState(false)

  //handlers 
  const timeUpdateHandler =(e)=>{
    const  current=e.target.currentTime;
    const duration=e.target.duration;
    console.log(duration);
    //Calculate Percentage 
    const roundedCurrent=Math.round(current);
    const roundedDuration=Math.round(duration);
    const animation=Math.round((roundedCurrent/roundedDuration)*100)
  
    SetSongIfno({...songInfo,currentTime:current,duration:duration,animationPercentage:animation})
}
const songEndHandler = async () => { 
  let currentIndex=songs.findIndex((song)=>song.id===currentSong.id);
  await setCurrentSong(songs[(currentIndex +1 ) % songs.length ]);
  if(isPlaying) audioRef.current.play();

}

  return (
  <div className={`App ${libraryStatus? "library-active":""} `}>
 <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
<Song currentSong={currentSong} isPlaying={isPlaying} />   
<Player
 SetSongIfno={SetSongIfno} 
 songInfo={songInfo} 
 audioRef={audioRef} 
 isPlaying={isPlaying}  
 setIsPlaying={setIsPlaying}
currentSong={currentSong}
songs={songs}
setCurrentSong={setCurrentSong}
setSongs={setSongs}
  />
<Library
libraryStatus={libraryStatus} 
 audioRef={audioRef} 
 songs={songs} 
 setCurrentSong={setCurrentSong}
 isPlaying={isPlaying}
 setSongs={setSongs}
 />
<audio
 onLoadedMetadata={timeUpdateHandler}
  onTimeUpdate={timeUpdateHandler}
   ref={audioRef} 
   src={currentSong.audio}
   onEnded={songEndHandler}
   >

   </audio>

 
 </div>
  );
}

export default App;
