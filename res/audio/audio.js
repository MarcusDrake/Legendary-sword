
var currentTrack = undefined;
function play(track) {
	if ( currentTrack != undefined )
	{
		currentTrack.pause();
		currentTrack.currentTime = 0;
	}
	switch( track ){
		case 'intro' :
			track = new Audio('./res/audio/intro.mp3')
			track.addEventListener('ended', function() { 
				play('intro_loop'); 
				}, false );
			break;
			
		case 'intro_loop' :
			track = new Audio('./res/audio/intro_loop.mp3')
			track.addEventListener('ended', function() {
				this.currentTime = 0;
				this.play();
			}, false);
			break;
			
		case 'stage1' :
			track = new Audio('./res/audio/stage_1.mp3')
			break;
			
		case 'stage2' :
			track = new Audio('./res/audio/stage_2.mp3')
			break;
		}
	track.volume = 0.5;
	track.play();
	currentTrack = track;
	}
	
function sfx(sfx) {
	var randFloat = Math.random();
	switch( sfx ){
		case 'menu_select' :
			sfx = new Audio('./res/audio/sfx/menu_select.wav')
			break;
		
		case 'dead_hero' :
			sfx = new Audio('./res/audio/sfx/dead_hero.wav')
			break;
			
		case 'hit' :
			sfx = new Audio('./res/audio/sfx/hit.wav')
			break;
			
		case 'slash' :
			if (randFloat < 0.5) {
				sfx = new Audio('./res/audio/sfx/slash.wav')
			} else {
				sfx = new Audio('./res/audio/sfx/slash2.wav')
			}
			break;
		
		case 'blob' :
			if (randFloat < 0.5) {
				sfx = new Audio('./res/audio/sfx/blob.wav')
			} else {
				sfx = new Audio('./res/audio/sfx/blob2.wav')
			}
			break;
			
		case 'hurt' :
			if (randFloat < 0.5) {
				sfx = new Audio('./res/audio/sfx/hurt.wav')
			} else {
				sfx = new Audio('./res/audio/sfx/hurt2.wav')
			}
			break;
			
		case 'death' :
			sfx = new Audio('./res/audio/sfx/death.wav')
			break;
		
		//TODO: Update WormBoss sounds
		case 'wormboss_hit' :
			if (randFloat < 0.5) {
				sfx = new Audio('./res/audio/sfx/hurt.wav')
			} else {
				sfx = new Audio('./res/audio/sfx/hurt2.wav')
			}
			break;
		//TODO: Update WormBoss sounds	
		case 'wormboss_hurt' :
			if (randFloat < 0.5) {
				sfx = new Audio('./res/audio/sfx/wormboss_hurt.wav')
			} else if (randFloat < 1) {
				sfx = new Audio('./res/audio/sfx/hurt2.wav')
			}
			break;
		}
	sfx.volume = 1;
	sfx.play();
	}
