const image = document.querySelector('img');
const titulo = document.getElementById('titulo');
const artista = document.getElementById('artista');

const progressContainer = document.getElementById('progressBar');
const progress = document.getElementById('progress');

const tiempoActual = document.getElementById('tiempoActual');
const duracion = document.getElementById('tiempoDuracion');

const music = document.querySelector('audio');
const  prevBtn = document.getElementById('prev');
const  playBtn = document.getElementById('play');
const  nextBtn = document.getElementById('next');

const songs =[
    {
        name: 'song3',
        displayName: 'ME ENAMORAS',
        artista: 'NICKY JAM',
    },
    {
       name: 'song2',
       displayName: '¿QUE NOS PASO?',
       artista: 'Anuel AA',

    },
];

/* FUNCION PLAY*/
let isPlaying = false;
 function playSong(){
    isPlaying =true;
    playBtn.setAttribute('name','pause');
    playBtn.setAttribute('titulo','pause');
    music.play();
 }

 /* */
 function pauseSong(){
    isPlaying =false;
    playBtn.setAttribute('name','pause');
    playBtn.setAttribute('titulo','pause');
    music.pause();
 }

 playBtn.addEventListener('click',()=> (isPlaying ? pauseSong() : playSong()));

 function loadSong(song){
    titulo.textContent = song.displayName;
    artista.textContent = song.artista;
    music.src = `musica/${song.name}.mp3`;
    image.src = `imagenes/${song.name}.jpg`;
 }

 let songIndex = 0;

 function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.lenght -1;
    }
    loadSong(songs[songIndex]);
    playSong();
 }

 function nextSong(){
    songIndex++
    if (songIndex > songs.lenght -1){
        songIndex =0;

    }
    loadSong(songs[songIndex]);
    playSong();

 }

 loadSong(songs[songIndex]); 

 function  updateProgressBar(e){
    if(isPlaying){
        const{ duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width =  `${progressPercent}%` ;
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }

        if(durationSeconds){
           duracion.textContent = `${durationMinutes} : ${durationSeconds}`;
        }

        const currentMinutes  = Math.floor(currentTime / 60);
        let currentSeconds =  Math.floor(currentTime  % 60);
         
        if(currentSeconds < 10){
        currentSeconds = `0${currentSeconds}`
        }
        if(currentSeconds){
            tiempoActual.textContent = `${currentMinutes} : ${currentSeconds}`;
        }
 
        }
    }

    function setProgressBar(e){
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const { duration }= music;
        music.currentTime = (clickX / width) * duration;

    }

    prevBtn.addEventListener('click',prevSong);
    nextBtn.addEventListener('click',nextSong);
    music.addEventListener('ended' ,nextSong);
    music.addEventListener('timeupdate',updateProgressBar);
    progressContainer.addEventListener('click',setProgressBar)

 