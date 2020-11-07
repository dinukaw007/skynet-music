import bar from './musci-player';
import refernece from './refernece';


$( document ).ready(function() {
	$(".progress").addClass('invisible');
	var template = $('#hidden-template').html();	
	$('#music-container').append(template);
});

$("#uplaod-btn" ).click(function() {
	$(".progress").removeClass('invisible');
	var valeur = 100;
	$('.progress-bar').css('width', valeur+'%').attr('aria-valuenow', valeur);
});




