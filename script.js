

const audio =
    document.getElementById("audio");

const playBtn =
    document.getElementById("playBtn");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const shuffleBtn =
    document.getElementById("shuffleBtn");

const repeatBtn =
    document.getElementById("repeatBtn");

const muteBtn =
    document.getElementById("muteBtn");

const volume =
    document.getElementById("volume");

const volumeValue =
    document.getElementById("volumeValue");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const songTitle =
    document.getElementById("songTitle");

const artist =
    document.getElementById("artist");

const albumCover =
    document.getElementById("albumCover");

const favoriteBtn =
    document.getElementById("favoriteBtn");

const songList =
    document.getElementById("songList");

const searchInput =
    document.getElementById("searchInput");

const emptyMessage =
    document.getElementById("emptyMessage");

const songCount =
    document.getElementById("songCount");

const speed =
    document.getElementById("speed");

const themeBtn =
    document.getElementById("themeBtn");

const visualizer =
    document.getElementById("visualizer");



const songs = [

    {
        title: "Dreams",
        artist: "Luna Waves",
        src: "songs/song1.mp3",
        color:
            "linear-gradient(135deg,#667eea,#764ba2)"
    },

    {
        title: "Night Drive",
        artist: "Neon Sky",
        src: "songs/song2.mp3",
        color:
            "linear-gradient(135deg,#141e30,#243b55)"
    },

    {
        title: "Lost Memories",
        artist: "Silent Echo",
        src: "songs/song3.mp3",
        color:
            "linear-gradient(135deg,#ff758c,#ff7eb3)"
    },

    {
        title: "Ocean Waves",
        artist: "Blue Horizon",
        src: "songs/song4.mp3",
        color:
            "linear-gradient(135deg,#00c6ff,#0072ff)"
    },

    {
        title: "Midnight",
        artist: "Dark Avenue",
        src: "songs/song5.mp3",
        color:
            "linear-gradient(135deg,#232526,#414345)"
    },

    {
        title: "Sunset",
        artist: "Golden Hour",
        src: "songs/song6.mp3",
        color:
            "linear-gradient(135deg,#f7971e,#ffd200)"
    }

];




let currentSong = 0;

let isPlaying = false;

let shuffleMode = false;

let repeatMode = false;

let favorites =
    JSON.parse(
        localStorage.getItem("favorites")
    ) || [];




function loadSong(index) {

    const song = songs[index];

    songTitle.textContent =
        song.title;

    artist.textContent =
        song.artist;

    audio.src =
        song.src;

    albumCover.style.background =
        song.color;

    progress.value = 0;

    currentTime.textContent =
        "0:00";

    duration.textContent =
        "0:00";

    updatePlaylist();

    updateFavoriteButton();

}


function playSong() {

    audio.play()
        .then(() => {

            isPlaying = true;

            playBtn.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

            visualizer.classList.add(
                "playing"
            );

        })
        .catch(() => {

            alert(
                "Please add MP3 songs inside the songs folder."
            );

        });

}




function pauseSong() {

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';

    visualizer.classList.remove(
        "playing"
    );

}



playBtn.addEventListener(
    "click",
    () => {

        if (isPlaying) {

            pauseSong();

        } else {

            playSong();

        }

    }
);



function nextSong() {

    if (shuffleMode) {

        let randomSong;

        do {

            randomSong =
                Math.floor(
                    Math.random() *
                    songs.length
                );

        } while (
            randomSong === currentSong &&
            songs.length > 1
        );

        currentSong =
            randomSong;

    } else {

        currentSong++;

        if (
            currentSong >=
            songs.length
        ) {

            currentSong = 0;

        }

    }

    loadSong(currentSong);

    playSong();

}


nextBtn.addEventListener(
    "click",
    nextSong
);


previousBtn.addEventListener(
    "click",
    () => {

        currentSong--;

        if (currentSong < 0) {

            currentSong =
                songs.length - 1;

        }

        loadSong(currentSong);

        playSong();

    }
);

shuffleBtn.addEventListener(
    "click",
    () => {

        shuffleMode =
            !shuffleMode;

        shuffleBtn.classList.toggle(
            "active",
            shuffleMode
        );

    }
);



repeatBtn.addEventListener(
    "click",
    () => {

        repeatMode =
            !repeatMode;

        repeatBtn.classList.toggle(
            "active",
            repeatMode
        );

    }
);


audio.addEventListener(
    "ended",
    () => {

        if (repeatMode) {

            audio.currentTime = 0;

            playSong();

        } else {

            nextSong();

        }

    }
);



audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) {
            return;
        }

        const percent =
            (audio.currentTime /
                audio.duration) *
            100;

        progress.value =
            percent;

        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

    }
);



audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(
                audio.duration
            );

    }
);



progress.addEventListener(
    "input",
    () => {

        if (!audio.duration) {
            return;
        }

        audio.currentTime =
            (progress.value / 100) *
            audio.duration;

    }
);



volume.addEventListener(
    "input",
    () => {

        audio.volume =
            volume.value;

        const percent =
            Math.round(
                volume.value * 100
            );

        volumeValue.textContent =
            percent + "%";

        updateVolumeIcon();

    }
);



muteBtn.addEventListener(
    "click",
    () => {

        audio.muted =
            !audio.muted;

        updateVolumeIcon();

    }
);


function updateVolumeIcon() {

    if (
        audio.muted ||
        audio.volume === 0
    ) {

        muteBtn.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';

    } else if (
        audio.volume < 0.5
    ) {

        muteBtn.innerHTML =
            '<i class="fa-solid fa-volume-low"></i>';

    } else {

        muteBtn.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';

    }

}



speed.addEventListener(
    "change",
    () => {

        audio.playbackRate =
            Number(speed.value);

    }
);


favoriteBtn.addEventListener(
    "click",
    () => {

        if (
            favorites.includes(
                currentSong
            )
        ) {

            favorites =
                favorites.filter(
                    index =>
                        index !==
                        currentSong
                );

        } else {

            favorites.push(
                currentSong
            );

        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(
                favorites
            )
        );

        updateFavoriteButton();

    }
);


function updateFavoriteButton() {

    if (
        favorites.includes(
            currentSong
        )
    ) {

        favoriteBtn.classList.add(
            "active"
        );

        favoriteBtn.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

    } else {

        favoriteBtn.classList.remove(
            "active"
        );

        favoriteBtn.innerHTML =
            '<i class="fa-regular fa-heart"></i>';

    }

}


function updatePlaylist(
    filteredSongs = songs
) {

    songList.innerHTML = "";

    if (
        filteredSongs.length === 0
    ) {

        emptyMessage.style.display =
            "block";

        return;

    }

    emptyMessage.style.display =
        "none";


    filteredSongs.forEach(
        (song) => {

            const originalIndex =
                songs.indexOf(song);


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "song-item";


            if (
                originalIndex ===
                currentSong
            ) {

                item.classList.add(
                    "active"
                );

            }


            item.innerHTML = `

                <span class="song-number">
                    ${String(
                        originalIndex + 1
                    ).padStart(2,"0")}
                </span>

                <div
                    class="song-icon"
                    style="
                        background:
                        ${song.color}
                    "
                >

                    <i class="fa-solid fa-music"></i>

                </div>

                <div class="song-details">

                    <h3>
                        ${song.title}
                    </h3>

                    <p>
                        ${song.artist}
                    </p>

                </div>

                <span class="song-duration">
                    <i class="fa-solid fa-music"></i>
                </span>

            `;


            item.addEventListener(
                "click",
                () => {

                    currentSong =
                        originalIndex;

                    loadSong(
                        currentSong
                    );

                    playSong();

                }
            );


            songList.appendChild(
                item
            );

        }
    );

}



searchInput.addEventListener(
    "input",
    () => {

        const value =
            searchInput.value
                .toLowerCase()
                .trim();


        const filtered =
            songs.filter(
                song =>

                    song.title
                        .toLowerCase()
                        .includes(value)

                    ||

                    song.artist
                        .toLowerCase()
                        .includes(value)
            );


        songCount.textContent =
            `${filtered.length} Songs`;


        updatePlaylist(
            filtered
        );

    }
);



themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        const light =
            document.body.classList.contains(
                "light"
            );


        if (light) {

            themeBtn.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

            localStorage.setItem(
                "theme",
                "light"
            );

        } else {

            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

    }
);

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            if (isPlaying) {

                pauseSong();

            } else {

                playSong();

            }

        }


        if (
            event.code ===
            "ArrowRight"
        ) {

            nextSong();

        }


        if (
            event.code ===
            "ArrowLeft"
        ) {

            previousBtn.click();

        }


        if (
            event.key.toLowerCase() ===
            "m"
        ) {

            muteBtn.click();

        }

    }
);

function formatTime(time) {

    if (
        isNaN(time) ||
        !isFinite(time)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            time / 60
        );


    const seconds =
        Math.floor(
            time % 60
        );


    return `${minutes}:${String(
        seconds
    ).padStart(2,"0")}`;

}


const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (
    savedTheme ===
    "light"
) {

    document.body.classList.add(
        "light"
    );

    themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

}


audio.volume = 0.7;

volume.value = 0.7;

volumeValue.textContent =
    "70%";

loadSong(0);