let dataset = [
  {
    title: 'Dancing Monkey',
    artist: 'Tones And I',
    url: 'https://siasky.net/_BFEVGCEhKJ9Zkh8cVFB0KLn1d8Nrc8vhEkunOC8sLWSJg',
    image: './images/skynet-music.png'

  },
  {
    title: 'I Don\'t Care',
    artist: 'Ed Sheeran',
    url: 'https://siasky.net/AADuF-T_DitX5Y5bONnIlr-Qbs7Nt9P5XlhT9k5z1IiaQw',
    image: './images/skynet-music.png'


  },
  {
    title: 'Girls Like You',
    artist: 'Maroon 5',
    url: 'https://siasky.net/AADUfQjT4a7rRSsX_aGfMHq59EZJxNIavJdLp1Fn5az7Ag',
    image: './images/skynet-music.png'


  }
]

function displayMusic() {
  $.each(dataset, (index, songItem) => {
    $("#songlist").append(`<div class="col-md-4">
        <div class="card mb-4 shadow-sm">
          <img
            src=${songItem.image}
            class="bd-placeholder-img card-img-top"
            alt="Girl in a jacket"
            width="100%"
          />
          <div class="card-body text-center">
            <h5 class="h5 font-weight-bold">
              <a 
                >${songItem.artist}</a
              >
            </h5>
            <p class="mb-0">${songItem.title}</p>

            <audio id=${"music" + index} preload="true">
              <source
                src=${songItem.url}
              />
            </audio>
            <div id="audioplayer">
              <i id=${"pButton" + index} class="fa fa-play pButton"></i>
              <div class="timeline" id=${"timeline" + index}>
                <div class="playhead" id=${"playhead" + index}></div>
              </div>
            </div>
          </div>
        </div>
      </div>`);
    var music = document.getElementById(`${"music" + index}`); // id for audio element
    var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
    var pButton = document.getElementById(`${"pButton" + index}`); // play button
    var playhead = document.getElementById(`${"playhead" + index}`); // playhead
    var timeline = document.getElementById(`${"timeline" + index}`); // timeline
    // timeline width adjusted for playhead
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

    // play button event listenter
    pButton.addEventListener("click", play);

    // timeupdate event listener
    music.addEventListener("timeupdate", timeUpdate, false);

    // makes timeline clickable
    timeline.addEventListener("click", function (event) {
      moveplayhead(event);
      music.currentTime = duration * clickPercent(event);
    }, false);

    // returns click as decimal (.77) of the total timelineWidth
    function clickPercent(event) {
      return (event.clientX - getPosition(timeline)) / timelineWidth;
    }

    // makes playhead draggable
    playhead.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

    // Boolean value so that audio position is updated only when the playhead is released
    var onplayhead = false;

    // mouseDown EventListener
    function mouseDown() {
      onplayhead = true;
      window.addEventListener('mousemove', moveplayhead, true);
      music.removeEventListener('timeupdate', timeUpdate, false);
    }

    // mouseUp EventListener
    // getting input from all mouse clicks
    function mouseUp(event) {
      if (onplayhead == true) {
        moveplayhead(event);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        music.currentTime = duration * clickPercent(event);
        music.addEventListener('timeupdate', timeUpdate, false);
      }
      onplayhead = false;
    }
    // mousemove EventListener
    // Moves playhead as user drags
    function moveplayhead(event) {
      var newMargLeft = event.clientX - getPosition(timeline);

      if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
      }
      if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
      }
      if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
      }
    }

    // timeUpdate
    // Synchronizes playhead position with current point in audio
    function timeUpdate() {
      var playPercent = timelineWidth * (music.currentTime / duration);
      playhead.style.marginLeft = playPercent + "px";
      if (music.currentTime == duration) {
        pButton.className = "pButton";
        pButton.className = "pButton fa fa-play";
      }
    }

    //Play and Pause
    function play() {
      // start music
      if (music.paused) {
        music.play();
        // remove play, add pause
        pButton.className = "pButton";
        pButton.className = "pButton fa fa-pause";
      } else { // pause music
        music.pause();
        // remove pause, add play
        pButton.className = "pButton";
        pButton.className = "pButton fa fa-play";
      }
    }

    // Gets audio file duration
    music.addEventListener("canplaythrough", function () {
      duration = music.duration;
    }, false);

    // getPosition
    // Returns elements left position relative to top-left of viewport
    function getPosition(el) {
      return el.getBoundingClientRect().left;
    }

  });


}
displayMusic()