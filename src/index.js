import refernece from './refernece';
import * as dataloader from './dataloader';
import * as skynet from './sky';

$( document ).ready(function() {
	$(".progress").addClass('invisible');
	var template = $('#hidden-template').html();	
	$('#music-container').append(template);
	// dataloader.displayMusic();
	dataloader.getskyNetData();
});

$("#uplaod-btn" ).click(function() {
	$(".progress").removeClass('invisible');
	const txtSongTitle = $("#txtSongTitle").val();  
	const txtArtist = $("#txtArtist").val();  
	const mediaFile = $("#mediaFile");
	const fileupload = skynet.uploadExample(mediaFile[0].files[0]);
	fileupload.then(data=>{
	var siaId = data.split(":");
	var valeur = 50;
	$('.progress-bar').css('width', valeur+'%').attr('aria-valuenow', valeur);

	const val =  [{
		title: txtSongTitle,
		artist: txtArtist,
		url: 'https://siasky.net/'+siaId[1],
		image: './images/skynet-music.png'
	  }];

	  dataloader.setItems(val);
	  
	  const getcurrentItems =  dataloader.getItems();
	  skynet.updateSkyMusicDb(getcurrentItems).then(data=>{
		var valeur = 100;
		$('.progress-bar').css('width', valeur+'%').attr('aria-valuenow', valeur);
		$('#exampleModal').modal('hide');
		$('.progress-bar').css('width', '0%').attr('aria-valuenow', 0);
		$(".progress").addClass('invisible');
		dataloader.getskyNetData();
	  })
	});	
});




