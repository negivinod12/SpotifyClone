let Index = 0;
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSong = document.getElementById("masterSong");
let songItems = Array.from(document.getElementsByClassName("song-lists"));
let playButtons = document.getElementsByClassName("play");

masterSong.innerText = "Competition And Currency";

//array containing all details of songs
let songs = [
    {songName: "Competition And Currency", filePath: "songs/Competition And Currency.mp3", coverPath: "cover/cover 1.jpg"},
    {songName: "Obvious", filePath: "songs/Obvious.mp3", coverPath: "cover/cover 1.jpg"},
    {songName: "Duniya Cold", filePath: "songs/Duniya Cold.mp3", coverPath: "cover/cover 1.jpg"},
    {songName: "Day Dreamer", filePath: "songs/Day Dreamer.mp3", coverPath: "cover/cover 1.jpg"},
    {songName: "Bandana", filePath: "songs/Bandana.mp3", coverPath: "cover/cover 2.jpg"}
];

// Change cover path and song name for different songs
songItems.forEach((e, i) => {
    e.getElementsByTagName("img")[0].src = songs[i].coverPath;
    e.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Initialize the audio element
let audioElement = new Audio(songs[0].filePath);

// Handle play/pause for the main player
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = '1';
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = '0';
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.value = progress.toFixed(2);
});

// Change progress bar update
progressBar.addEventListener('change', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Helper function to reset all play buttons
const makeAllPlays = () => {
    Array.from(playButtons).forEach((e) => {
        e.classList.remove('fa-circle-pause');
        e.classList.add('fa-circle-play');
    });
};

// Handle individual song play/pause
let currentIndex = null;

Array.from(playButtons).forEach((element) => {
    element.addEventListener('click', (e) => {
        const songIndex = parseInt(e.target.id);

        if (currentIndex !== null && currentIndex !== songIndex) {
            // Reset the previous song's play button
            document.getElementById(currentIndex).classList.remove('fa-circle-pause');
            document.getElementById(currentIndex).classList.add('fa-circle-play');
            audioElement.pause();
        }

        // If the same song is playing, pause it
        if (currentIndex === songIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity = '0';
        } else {
            // Play the selected song
            audioElement.src = songs[songIndex].filePath;
            audioElement.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterSong.innerText = songs[songIndex].songName;
            gif.style.opacity = '1';
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            currentIndex = songIndex;
        }

        audioElement.onended = () => {
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity = '0';
        };
    });
});

// next song
document.getElementById('next').addEventListener('click', () => {
    if (Index < songs.length - 1) {
        Index++;
    } else {
        Index = 0;
    }
    path = songs[Index].filePath;
    masterSong.innerText = songs[Index].songName;
    audioElement.currentTime = 0; // if songs are changed it should start from 0
    audioElement.src = path;
    audioElement.play();
    gif.style.opacity = '1';
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

//previous song
document.getElementById('previous').addEventListener('click', () => {
    if (Index > 0) {
        Index--;
    } else {
        Index = songs.length - 1;
    }
    path = songs[Index].filePath;
    masterSong.innerText = songs[Index].songName;
    audioElement.currentTime = 0; // if songs are changed it should start from 0
    audioElement.src = path;
    audioElement.play();
    gif.style.opacity = '1';
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

//to play next song when one is ended with 2 seconds delay
audioElement.addEventListener('ended', () => {
    currentIndex++;
    if (currentIndex < songs.length) {
        setTimeout(() => {
            audioElement.src = songs[currentIndex].filePath;
            audioElement.play();
            // Update UI or perform any actions related to the next song
            console.log(`Now playing: ${songs[currentIndex].songName}`);
        }, 2000);
    }else{
        audioElement.src = songs[0].filePath;
        audioElement.play();
    }
});
