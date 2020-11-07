let dataset = [
    {
        title: 'Dancing Monkey',
        artist: 'Tones And I',
        url: 'https://siasky.net/_BFEVGCEhKJ9Zkh8cVFB0KLn1d8Nrc8vhEkunOC8sLWSJg'

    },
    {
        title: 'I Don\'t Care',
        artist: 'Ed Sheeran',
        url: 'https://siasky.net/AADuF-T_DitX5Y5bONnIlr-Qbs7Nt9P5XlhT9k5z1IiaQw'

    },
    {
        title: 'Girls Like You',
        artist: 'Maroon 5',
        url: 'https://siasky.net/AADUfQjT4a7rRSsX_aGfMHq59EZJxNIavJdLp1Fn5az7Ag'

    }
]

function displayMusic(){
    $.each( dataset, (index, songItem) => {
        $("#songlist" ).append(`<div class="col-md-4">
        <div class="card mb-4 shadow-sm">
          <img
            src="skynet-music.png"
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

            <audio id="music1" preload="true">
              <source
                src=${songItem.url}
              />
            </audio>
            <div id="audioplayer">
              <i id="pButton1" class="fa fa-play pButton"></i>
              <div class="timeline" id="timeline1">
                <div class="playhead" id="playhead1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>`);
      });
   

}
displayMusic()