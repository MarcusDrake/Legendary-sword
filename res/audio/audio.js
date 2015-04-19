

function play(track) {
	switch( track ){
		case 'intro' :
			track = new Audio('./res/audio/intro.mp3')
			track.addEventListener('ended', function() { 
				play('intro_loop'); 
				}, true );
			break;
			
		case 'intro_loop' :
			track = new Audio('./res/audio/intro_loop.mp3')
			track.loop = true;
			break;
			
		case 'stage1' :
			track = new Audio('./res/audio/stage_1.mp3')
			break;
		}		
	track.play();
	}
	
function sfx(sfx) {
	switch( sfx ){
		case 'dead_hero' :
			sfx = new Audio('./res/audio/sfx/dead_hero.wav')
			break;
			
		case 'slash' :
			sfx = new Audio('./res/audio/sfx/slash.wav')
			break;
		
		case 'blob' :
			sfx = new Audio('./res/audio/sfx/blob.wav')
			break;
			
		case 'hurt' :
			sfx = new Audio('./res/audio/sfx/hurt.wav')
			break;
		}		
	sfx.play();
	}
	
	
