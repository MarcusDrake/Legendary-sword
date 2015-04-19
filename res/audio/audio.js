

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
	track.volume = 0.5;
	track.play();
	}
	
function sfx(sfx) {
	var randFloat = Math.random();
	switch( sfx ){
		case 'dead_hero' :
			sfx = new Audio('./res/audio/sfx/dead_hero.wav')
			break;
			
		case 'hit' :
			sfx = new Audio('./res/audio/sfx/hit.wav')
			break;
			
		case 'slash' :
			sfx = new Audio('./res/audio/sfx/slash.wav')
			break;
		
		case 'blob' :
			if (randFloat < 0.5) {
				sfx = new Audio('./res/audio/sfx/blob.wav')
			} else if (randFloat < 1) {
				sfx = new Audio('./res/audio/sfx/blob2.wav')
			}
			break;
			
		case 'hurt' :
			if (randFloat < 0.5) {
				sfx = new Audio('./res/audio/sfx/hurt.wav')
			} else if (randFloat < 1) {
				sfx = new Audio('./res/audio/sfx/hurt2.wav')
			}
			break;
		}
	sfx.volume = 1;
	sfx.play();
	}
	
	
