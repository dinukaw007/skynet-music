import refernece from './refernece';
import * as dataloader from './dataloader';

$( document ).ready(function() {
	$(".progress").addClass('invisible');
	var template = $('#hidden-template').html();	
	$('#music-container').append(template);
	dataloader.displayMusic();
});

$("#uplaod-btn" ).click(function() {
	$(".progress").removeClass('invisible');

	const txtSongTitle = $("#txtSongTitle").val();  
	const txtArtist = $("#txtArtist").val();  
	// const exampleFormControlFile1 = document.getElementById("exampleFormControlFile1");

	var valeur = 100;
	$('.progress-bar').css('width', valeur+'%').attr('aria-valuenow', valeur);
	let val =  [{
		title: txtSongTitle,
		artist: txtArtist,
		url: 'https://siasky.net/AADUfQjT4a7rRSsX_aGfMHq59EZJxNIavJdLp1Fn5az7Ag',
		image: './images/skynet-music.png'
	  }];
	  dataloader.setItems(val);
	  $('#exampleModal').modal('hide');
	  $('.progress-bar').css('width', '0%').attr('aria-valuenow', 0);
	  $(".progress").addClass('invisible');
});




