// Cria referências aos elementos do DOM usando IDs
const musicName = document.getElementById('music-name');
const nameArtist = document.getElementById('artist');
const cover = document.getElementById('cover');
const song = document.getElementById('audio');
const play = document.getElementById('play');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const progress = document.getElementById('progress');
const containerProgress = document.getElementById('container_progress');
const shuffle = document.getElementById('shuffle');
const repeat = document.getElementById('repeat');
const minDuration = document.getElementById('minDuration');
const minTotal = document.getElementById('minTotalDuration');
const buttonLike = document.getElementById('button-like'); 

// Define objetos de músicas com nome, artista, arquivo e se foram curtidas
const mar = {
    musicName : 'Mar',
    artist : 'Bea Duarte',
    file : 'Bea-Duarte-Mar',
    liked : false
};

const queen = {
    musicName : 'Queen',
    artist : 'Loren Gray',
    file : 'Loren-Gray-Queen',
    liked : false
};

const worldSmallestViolin = {
    musicName : 'World Smallest Violin',
    artist : 'AJR',
    file : 'World-Smallest-Violin-AJR',
    liked : false
};

// Variáveis de controle de estado
let isPlaying = false;
let isshuffle = false;
let isRepeat = false;

// Recupera a playlist do localStorage ou usa uma padrão
const playlist = JSON.parse(localStorage.getItem('playlist')) ?? [mar, queen, worldSmallestViolin];

// Cria uma cópia da playlist original para o shuffle
let radomPlaylist = [...playlist];
let index = 0;

// Função para reproduzir a música
function playMusic(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
};

// Função para pausar a música
function pauseMusic(){
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    song.pause();
    isPlaying = false;
};

// Alterna entre reproduzir e pausar
function playOrPause(){
    if(isPlaying === true){
        pauseMusic();
    }else{
        playMusic();
    }
};

// Inicializa os detalhes da música atual
function initializeMusic(){
 cover.src =`image/${radomPlaylist[index].file}.png`;
 song.src = `audio/${radomPlaylist[index].file}.mp3`;
 musicName.innerText = radomPlaylist[index].musicName;
 artist.innerText = radomPlaylist[index].artist;
 likedClickedRender();

 // Altera o estilo da página de acordo com a música
 document.body.classList.remove('mar', 'queen', 'violin');
 if(radomPlaylist[index].file === 'Bea-Duarte-Mar'){
    document.body.classList.add('mar');
 }else if(radomPlaylist[index].file === 'Loren-Gray-Queen'){
    document.body.classList.add('queen');
 }else{
    document.body.classList.add('violin');
 }
};

// Atualiza o botão de curtir com base no status "liked" da música
function likedClickedRender(){
    if(radomPlaylist[index].liked === true){
        buttonLike.querySelector('.bi').classList.remove('bi-heart');
        buttonLike.querySelector('.bi').classList.add('bi-heart-fill');
        buttonLike.classList.add('like-active');
    }else{
        buttonLike.querySelector('.bi').classList.add('bi-heart');
        buttonLike.querySelector('.bi').classList.remove('bi-heart-fill');
        buttonLike.classList.remove('like-active');
    }
};

// Função para tocar a música anterior
function previousMusic(){
    if (index === 0) {
        index = radomPlaylist.length - 1;
    }else{
        index -= 1;
    }
    initializeMusic();
    playMusic();
};

// Função para tocar a próxima música
function nextMusic(){
    if (index === radomPlaylist.length - 1) {
        index = 0;
    }else{
        index += 1; 
    }
    initializeMusic();
    playMusic();
};

// Atualiza a barra de progresso da música em reprodução
function progressMusic(){
    const barwidth = (song.currentTime/song.duration) * 100; // Calcula percentual da música tocada
    progress.style.setProperty('--progress', `${barwidth}%`); // Atualiza o CSS da barra de progresso
    minDuration.innerText = hourMinSeg(song.currentTime); // Exibe o tempo decorrido
}

// Função para saltar para uma parte da música quando o usuário clica na barra de progresso
function jumpTo(event){
    const width = containerProgress.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width) * song.duration;
    song.currentTime = jumpToTime;
}

// Embaralha a playlist (função de shuffle)
function shuffleArray(preShuffleArray){
    for(i = preShuffleArray.length - 1; i >= 0; i--){
        let  sort = Math.floor(Math.random() * (i + 1));
        let num = preShuffleArray[i];
        preShuffleArray[i] = preShuffleArray[sort];
        preShuffleArray[sort] = num;
    }
}

// Ativa/desativa o shuffle
function shuffleClicked(){
    if(isshuffle === false){
        isshuffle = true;
        shuffleArray(radomPlaylist);
        shuffle.classList.add('button-active');
    }else{
        isshuffle = false;
        radomPlaylist = [...playlist];
        shuffle.classList.remove('button-active');
    }
}

// Ativa/desativa o repeat
function repeatClicked(){
    if(isRepeat === false){
        isRepeat = true;
        repeat.classList.add('button-active');
    }else{
        isRepeat = false;
        repeat.classList.remove('button-active');
    }
}

// Verifica se deve repetir a música ou tocar a próxima
function nextOrRepeat(){
    if(isRepeat === true){
        playMusic();
    }else{
        nextMusic();
    }
}

// Converte o tempo em segundos para o formato de horas, minutos e segundos
function hourMinSeg(originalTime) {
    const hora = Math.floor(originalTime / 3600);
    const minute = Math.floor((originalTime - hora * 3600) / 60);
    const seg = Math.floor(originalTime - hora * 3600 - minute * 60);

    return `${hora.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0' )}:${seg.toString().padStart(2, '0')}`;
}

// Atualiza a duração total da música
function updateTotal(){
    minTotal.innerText = hourMinSeg(song.duration);
}

// Função para curtir/descurtir a música
function likedButtonClicked(){
    if(radomPlaylist[index].liked === false){
        radomPlaylist[index].liked = true;
    }else{
        radomPlaylist[index].liked = false;
    }
    likedClickedRender();
    localStorage.setItem('playlist', JSON.stringify(playlist)); // Salva o status da playlist no localStorage
}

// Inicializa a música quando a página é carregada
initializeMusic();

// Event listeners para controlar a reprodução e interações
play.addEventListener('click',playOrPause);
previous.addEventListener('click',previousMusic);
next.addEventListener('click', nextMusic);
song.addEventListener('timeupdate', progressMusic);
song.addEventListener('ended',nextOrRepeat);
song.addEventListener('loadedmetadata',updateTotal);
containerProgress.addEventListener('click', jumpTo);
shuffle.addEventListener('click', shuffleClicked);
repeat.addEventListener('click',repeatClicked);
buttonLike.addEventListener('click',likedButtonClicked);
