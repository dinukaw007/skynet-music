import * as skynet from './sky';

let dataset = [];

function addItemsToDisplayMusic(items, inc) {
  $('#songlist').empty();
  $.each(items, (index, songItem) => {
    let incIdVal = index + inc;
    $('#songlist').append(`<div class="col-md-4">
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

            <audio id=${'music' + incIdVal} preload="true">
              <source
                src=${songItem.url}
              />
            </audio>
            <div id="audioplayer">
              <i id=${'pButton' + incIdVal} class="fa fa-play pButton"></i>
              <div class="timeline" id=${'timeline' + incIdVal}>
                <div class="playhead" id=${'playhead' + incIdVal}></div>
              </div>
            </div>
          </div>
        </div>
      </div>`);
    var music = document.getElementById(`${'music' + incIdVal}`); // id for audio element
    var duration = music.duration; // Duration of audio clip, calculated here for embedding purposes
    var pButton = document.getElementById(`${'pButton' + incIdVal}`); // play button
    var playhead = document.getElementById(`${'playhead' + incIdVal}`); // playhead
    var timeline = document.getElementById(`${'timeline' + incIdVal}`); // timeline
    // timeline width adjusted for playhead
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

    // play button event listenter
    pButton.addEventListener('click', play);

    // timeupdate event listener
    music.addEventListener('timeupdate', timeUpdate, false);

    // makes timeline clickable
    timeline.addEventListener(
      'click',
      function (event) {
        moveplayhead(event);
        music.currentTime = duration * clickPercent(event);
      },
      false
    );

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
        playhead.style.marginLeft = newMargLeft + 'px';
      }
      if (newMargLeft < 0) {
        playhead.style.marginLeft = '0px';
      }
      if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + 'px';
      }
    }

    // timeUpdate
    // Synchronizes playhead position with current point in audio
    function timeUpdate() {
      var playPercent = timelineWidth * (music.currentTime / duration);
      playhead.style.marginLeft = playPercent + 'px';
      if (music.currentTime == duration) {
        pButton.className = 'pButton';
        pButton.className = 'pButton fa fa-play';
      }
    }

    //Play and Pause
    function play() {
      // start music
      if (music.paused) {
        music.play();
        // remove play, add pause
        pButton.className = 'pButton';
        pButton.className = 'pButton fa fa-pause';
      } else {
        // pause music
        music.pause();
        // remove pause, add play
        pButton.className = 'pButton';
        pButton.className = 'pButton fa fa-play';
      }
    }

    // Gets audio file duration
    music.addEventListener(
      'canplaythrough',
      function () {
        duration = music.duration;
      },
      false
    );

    // getPosition
    // Returns elements left position relative to top-left of viewport
    function getPosition(el) {
      return el.getBoundingClientRect().left;
    }
  });
}

// export function displayMusic() {
//   const items = getItems();
//   addItemsToDisplayMusic(items, 0);
// }

export function getItems() {
  return dataset;
}

function emptyCurrentDataSet() {
  var originalLength = dataset.length;
  for (var i = originalLength; i > 0; i--) {
    dataset.pop();
  }
}

export function getskyNetData() {
  emptyCurrentDataSet();
  skynet.getSkyMusicDb().then((response) => {
    dataset.push(...response.data);
    addItemsToDisplayMusic(response.data,0);
  });
}

export function setItems(item) {
  dataset.push(...item);
  // addItemsToDisplayMusic(item, dataset.length + 1);
}
