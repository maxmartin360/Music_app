var playlist = [];
var videoIndex = 0;

$(document).ready( function() {

	$(".mood :input, .genre :input" ).click(function(e){
		e.preventDefault;
		console.log($(this).attr('id'));
		$(this).toggleClass('selected');
	});
	


	$('#play').click(function(event){
		 event.preventDefault();
		 var mood = $('.mood > .selected').val();
		 var genre = $('.genre > .selected').val();
		 var searchTerm = (mood + '/' + genre + '/music')
		 console.log(searchTerm);
		 getRequest(searchTerm);
		 
		});


	function getRequest(searchTerm){
	  var params = {
	    part:'snippet',
	    q: searchTerm,
	    key: "AIzaSyB-63HCIKMMvaqtkSIO59oM13XJrQYK8Uc"
 	 };
     url = 'https://www.googleapis.com/youtube/v3/search';

     $.getJSON(url, params, function(data){
	    console.log("");
	    showResults(data.items);
	    var tag = document.createElement('script');

    	tag.src = "https://www.youtube.com/iframe_api";
    	var firstScriptTag = document.getElementsByTagName('script')[0];
    	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    	$('.search-results').show('slow');
		$('.content-box').hide('slow');
		playVideo();
	  });
	}
		
	function showResults(results){
		var html = "";
		playlist = [];
		videoIndex = 0;
	 	$.each(results, function(index,value){
	 		html += '<div class="description-wrap">';
	 		html += 	'<div class="next-image" style="text-decoration: none;">';
	 		html += 		'<a style="text-decoration: none;" href="https://www.youtube.com/watch?v=' + value.id.videoId + '">';
	 		html += 		'<img  src="' + value.snippet.thumbnails.default.url + '"/>';
	 		html += 		'</a>';
	 		html +=		'</div>';
	 		html += 	'<div class="next-title" style="text-decoration: none;">';
	 		html += 		'<a href="https://www.youtube.com/watch?v=' + value.id.videoId + '">';
	 		html += 		'<div class="titles" style="overflow: hidden;">' + value.snippet.title + '</div>';
	 		html += 		'</a>';
	 		html += 	'</div>';
			html += '</div>';
			playlist.push(value.id.videoId);
		    
	   //console.log(value.Title);
	 	 });
	  $('#title-info').html(html);
	};

	


	$('#reset').click(function(e){
		e.preventDefault
		$('.search-results').hide('slow');
		$('.content-box').show('slow');
		$(".mood :input, .genre :input" ).removeClass("selected")
		player.stopVideo();
		var playlist = [];
		var videoIndex = 0;
		var searchTerm = null;
		var results = null;
		player.clearVideo();
	})

	$('#rewind, #play, #pause, #forward, #reset').hover(function(){
		$(this).css('color', '#333333');
		}, function() {
		$(this).css('color', '#7f8c8d');	
	});
	
	$('#pause').click(function(e){
		player.pauseVideo();
	});

	$('#forward').click(function(e){
			nextVideo();
	});

	$('#rewind').click(function(e){
			previousVideo();
	});	
		
});

var player;
      function onYouTubeIframeAPIReady() {
      	player == null;
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: playlist[0],
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

function onPlayerReady(event) {
event.target.playVideo();
};


function onPlayerStateChange(event) {
		if (event.data == YT.PlayerState.ENDED) {
			nextVideo();
		 };
	};


function nextVideo(){
	if(videoIndex == 4) {
		return;
	}  
	stopVideo();
	player.clearVideo();
	videoIndex ++;
	player.loadVideoById(playlist[videoIndex], 0, "large");
	playVideo();
};

function stopVideo() {
player.stopVideo();
};

function playVideo() {
	if (player != undefined && player.getVideoData()['video_id'] != playlist[videoIndex]) {
		player.loadVideoById(playlist[videoIndex], 0, "large");
	} 

	if (player != undefined) player.playVideo();
};

function previousVideo() {
	if(videoIndex == 0) {
		return;
	} 
	stopVideo();
	player.clearVideo();
	videoIndex --;
	player.loadVideoById(playlist[videoIndex], 0, "large");
	playVideo();
}
