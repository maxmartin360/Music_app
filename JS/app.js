var playlist = [];
var videoIndex = 1;

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

		 var searchTerm = (mood + '/' + genre)
		 console.log(searchTerm)
		 getRequest(searchTerm);
		 $('.search-results').show('slow');
		 $('.content-box').hide('slow');
		
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
	  });
	}
		
	function showResults(results){
		var html = "";
		playlist = [];
		videoIndex = 1;
	 	$.each(results, function(index,value){
		    html += '<p>' + value.snippet.title + '</p>';
			html += '<img class="image" src="' + value.snippet.thumbnails.default.url + '"/>';
			playlist.push(value.id.videoId);
		    
	   //console.log(value.Title);
	 	 });
	  $('#title-info').html(html);
	};

	

	$(function(){
		$('#reset').click(function(e){
			e.preventDefault
			$('.search-results').hide('slow');
			$('.content-box').show('slow');
			$(".mood :input, .genre :input" ).removeClass("selected")
			player.stopVideo()
			player.clearVideo();
		});
	})
});

var player;
      function onYouTubeIframeAPIReady() {
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
      }

      
      function onPlayerStateChange(event) {
      	console.log(event.data);
        if (event.data == YT.PlayerState.(-1) ) {
        	setTimeout(stopVideo)
        }
      }

function stopVideo() {
  	$('#reset').click(function(e){
    player.stopVideo();
    player.clearVideo();
    $('.search-results').hide('slow');
	$('.content-box').show('slow');
	$(".mood :input, .genre :input" ).removeClass("selected");
    });
};


/*		$('#reset').click(function(e){
			e.preventDefault
			$('.search-results').hide('slow');
			$('.content-box').show('slow');
			$(".mood :input, .genre :input" ).removeClass("selected")
			player.stopVideo()
		});
*/


