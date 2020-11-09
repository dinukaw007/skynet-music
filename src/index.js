import refernece from './refernece';
import * as dataloader from './dataloader';
import * as skynet from './sky';

$(document).ready(function () {
  $('.progress').addClass('invisible');
  var template = $('#hidden-template').html();
  $('#music-container').append(template);
  // dataloader.displayMusic();
  dataloader.getskyNetData();
});

$('#uplaod-btn').click(function () {
  $('.progress').removeClass('invisible');

  const txtSongTitle = $('#txtSongTitle').val();
  const txtArtist = $('#txtArtist').val();
  const mediaFile = $('#mediaFile');
  updateProgressBar(0);
  if (
    !stringIsEmpty(txtSongTitle) &&
    !stringIsEmpty(txtArtist) &&
    mediaFile[0].files.length !== 0
  ) {
    updateProgressBar(25);
    if (ismp3(mediaFile[0].files[0].name)) {
      const fileupload = skynet.uploadExample(mediaFile[0].files[0]);
      fileupload
        .catch((err) => {
          updateProgressBar(0);
          showToast('Something went wrong please upload again');
        })
        .then((data) => {
          var siaId = data.split(':');
          updateProgressBar(50);
          const val = [
            {
              title: txtSongTitle,
              artist: txtArtist,
              url: 'https://siasky.net/' + siaId[1],
              image: './images/skynet-music.png',
            },
          ];
          dataloader.setItems(val);
          const getcurrentItems = dataloader.getItems();
          skynet
            .updateSkyMusicDb(getcurrentItems)
            .catch((err) => {
              updateProgressBar(0);
              showToast('Something went wrong please upload again');
            })
            .then((data) => {
              updateProgressBar(100);
              $('#exampleModal').modal('hide');
              $('.progress-bar').css('width', '0%').attr('aria-valuenow', 0);
              $('.progress').addClass('invisible');
              dataloader.getskyNetData();
            });
        });
    } else {
      // showToast('You can upload mp3 files only');
      updateProgressBar(0);
      $('#fileUpladinvalidfeedback').empty();
      $('#fileUpladinvalidfeedback').append('You can upload .mp3 and .flac files only');
    }
  } else {
    showToast('Please check the from validation');
  }
});

// $('#alertBtn').click(function () {
//   showToast('Append Message');
// });

function showToast(message) {  
  $('#toastContainer').append(
    ` <div
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-delay="2000"
    style="position: absolute; top: 1rem; right: 1rem"
  >
    <div class="toast-header">
      <strong class="mr-auto">Skynet Music Notification</strong>
      <button
        type="button"
        class="ml-2 mb-1 close"
        data-dismiss="toast"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body"></div>
  </div>`
  );
  $('.toast-body').empty();
  $('.toast-body').append('<span>' + message + '<span>');
  $('.toast').toast('show');

  setTimeout(function() {
    $('#toastContainer').empty();
}, 3000);
}

function updateProgressBar(valeur) {
  $('.progress-bar')
    .css('width', valeur + '%')
    .attr('aria-valuenow', valeur);
}

function stringIsEmpty(str) {
  if (
    typeof str == 'undefined' ||
    !str ||
    str.length === 0 ||
    str === '' ||
    !/[^\s]/.test(str) ||
    /^\s*$/.test(str) ||
    str.replace(/\s/g, '') === ''
  )
    return true;
  else return false;
}

function ismp3(icon) {
  const ext = ['.mp3','.flac'];
  return ext.some((el) => icon.endsWith(el));
}

$('#exampleModal').on('hidden.bs.modal', function (e) {
  $('#fileUpladinvalidfeedback').empty();
  $('#txtSongTitle').val('');
  $('#txtArtist').val('');
  $('#mediaFile').val('');
});

$('form').submit(function (event) {
  event.preventDefault();
});

$('input[type=file]').on('change', function () {
  const mediaFile = $('#mediaFile');

  if (ismp3(mediaFile[0].files[0].name)) {
	$('#fileUpladinvalidfeedback').empty();
  } else {
    $('#fileUpladinvalidfeedback').empty();
    $('#fileUpladinvalidfeedback').append('You can upload .mp3 and .flac files only');
  }
});
