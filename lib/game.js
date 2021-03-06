// shouldnt be a global :(
$('*').on('contextmenu', function(){ return false; });
 
var particleColors = [
  new b2ParticleColor(0xff, 0x00, 0x00, 0xff), // red
  new b2ParticleColor(0x00, 0xff, 0x00, 0xff), // green
  new b2ParticleColor(0x00, 0x00, 0xff, 0xff), // blue
  new b2ParticleColor(0xff, 0x8c, 0x00, 0xff), // orange
  new b2ParticleColor(0x00, 0xce, 0xd1, 0xff), // turquoise
  new b2ParticleColor(0xff, 0x00, 0xff, 0xff), // magenta
  new b2ParticleColor(0xff, 0xd7, 0x00, 0xff), // gold
  new b2ParticleColor(0x00, 0xff, 0xff, 0xff) // cyan
];
var res = {};
var container;
var world = null;
var threeRenderer;
var renderer;
var camera;
var scene;
var objects = [];
var garbageBodies = [];
var garbageJoints = [];
var zoom = 1;
var mouseJoint;

var sword;
var hero;

var timeStep = 1.0 / 60.0;
var velocityIterations = 8;
var positionIterations = 3;

var currentScene = {};
var nextScene = true;
var projector = new THREE.Projector();
var planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
var g_groundBody = null;
var cameraDefaults = { 
	x: 0, 
	y: 0, 
	z: 100 
};
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var gravity = 20;
var threeRenderer;

function printErrorMsg(msg) {
  var domElement = document.createElement('div');
  domElement.style.textAlign = 'center';
  domElement.innerHTML = msg;
  document.body.appendChild(domElement);
}

function initGame() {
  camera = new THREE.PerspectiveCamera(70
    , windowWidth / windowHeight
    , 1, 1000);

  try {
    threeRenderer = new THREE.WebGLRenderer();
  } catch( error ) {
    printErrorMsg('<p>Sorry, your browser does not support WebGL.</p>'
                + '<p>This testbed application uses WebGL to quickly draw'
                + ' LiquidFun particles.</p>'
                + '<p>LiquidFun can be used without WebGL, but unfortunately'
                + ' this testbed cannot.</p>'
                + '<p>Have a great day!</p>');
    return;
  }
  mouseJoint = null;

  threeRenderer.setClearColor(0xEEEEEE);
  threeRenderer.setSize(windowWidth, windowHeight);

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 100;
  scene = new THREE.Scene();
  camera.lookAt(scene.position);

  document.body.appendChild( threeRenderer.domElement);
  $( 'canvas' ).attr( 'id', 'world' );

  // hack
  renderer = new Renderer();
  
  world = new b2World(new b2Vec2(0, gravity-(gravity*2)));
  console.log( gravity );
  game = Game();
  changeScene();
}

function createWorld(){
	
}

var blacksmith;

function Game(obj) {
  // Init world
  //GenerateOffsets();
  //Init
  var that = this;
  document.addEventListener('keypress', function(event) {
    
	if (currentScene.Keyboard !== undefined) {
      currentScene.Keyboard(String.fromCharCode(event.which) );
    }
  });
  document.addEventListener('keyup', function(event) {
    if (currentScene.KeyboardUp !== undefined) {
      currentScene.KeyboardUp(String.fromCharCode(event.which) );
    }
  });

  document.addEventListener('mousedown', function(event) {
    switch ( event.which )
    {
		case 1:
			//LMB
			if ( sword != undefined )
			{
				sword.active = true;
			}
			break;
		case 3:
			//RMB
			if ( hero != undefined )
			{
				console.log("jump!");
				hero.jump();
			}
			break;
	}
    var p = getMouseCoords(event);
    var queryCallback = new QueryCallback(p);
    if (currentScene.MouseDown !== undefined) {
      currentScene.MouseDown(p);
    }
    if ( queryCallback.fixture ) 
    {
		//CLICK HITS A FIXTURE
    }

  });

  document.addEventListener('mousemove', function(event) {
   var p = getMouseCoords(event);
	
	
    if (mouseJoint && hero.alive == true ) {
      mouseJoint.SetTarget(p);
    }
    
  });

  document.addEventListener('mouseup', function(event) {
    if (currentScene.MouseUp !== undefined) {
      currentScene.MouseUp(getMouseCoords(event));
    }
    switch ( event.which )
    {
		case 1:
			//LMB
			if ( sword != undefined )
			{
				sword.active = false;
			}
			break;
		case 3:
			//RMB
			break;
	}
  });

  window.addEventListener( 'resize', onWindowResize, false );
 
  render();
  


return this;
}

var changeScene = function( scene ) {
	$('#letterbox-top').show();
	$('#letterbox-bottom').show();
	if ( nextScene == undefined ) {
		return false;
	}
	if ( currentScene != {} ) {
		ResetWorld();
	}
	
	currentScene = new TestScene();
	nextScene = undefined;
	currentScene.init();
}

var queueScene = function(){
		/*
	currentScene.updateList = [];
	mouseJoint = undefined;
	for ( var x = 0; x < currentScene.map.grid.length; x++ )
	{
		for ( var y = 0; y < currentScene.map.grid[ x ].length; y++ )
		{
			currentScene.map.grid[ x ][ y ].content = undefined;
		}
	}
	for( i = 0; i< dialogList.length; i++)
	{
		dialog = dialogList[i];
		removeDialog( dialog[2] );
	}
	*/
	//$('.textbox').remove();
	$('#swordTakeButton').hide();
	setTimeout(function() {
		$('#letterbox-full').fadeIn(1500, function(){
			location.reload();
			nextScene = true;
			
		});
	}, 1500);	
}

var ResetWorld = function() {
  if (world !== null) {
    while (world.joints.length > 0) {
      world.DestroyJoint(world.joints[0]);
    }
    while (world.bodies.length > 0) {
		var body = world.bodies[0];
		while (body.fixtures.length > 0) {
			body.DestroyFixture(body.fixtures[0]);
		}
		world.DestroyBody(body);
    }
    while (world.particleSystems.length > 0) {
      world.DestroyParticleSystem(world.particleSystems[0]);
    }
  }
  camera.position.x = cameraDefaults.x;
  camera.position.y = cameraDefaults.y;
  camera.position.z = cameraDefaults.z;
  world = new b2World(new b2Vec2(0, gravity-(gravity*2)));
};

var render = function() {
  renderer.currentVertex = 0;
    Step();
  
  if(sword !== undefined)
  {
	camera.position.x = sword.bodySword.GetPosition().x;
	camera.position.y = sword.bodySword.GetPosition().y;

	camera.position.z = 25*zoom;
	
	removeTextBox();
	
	for(var i = 0; i < dialogList.length; i++)
	{
		
		drawTextBox(dialogList[i][0],dialogList[i][1],dialogList[i][2],dialogList[i][3]);
	}
	
  }

  renderer.draw();

  threeRenderer.render(scene, camera);
  requestAnimationFrame(render);
};

var Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);
  if( currentScene.Step != undefined ){
	currentScene.Step();  
  }
  takeOutGarbage();
  addBloodEffects();
  if ( nextScene != undefined )
  {
	  hero = undefined;
	  sword = undefined;
	  ResetWorld();
	  changeScene( nextScene );
  }
};

function addBloodEffects()
{
	if(hero !== undefined && hero.addblood)
	{
		createBlood(hero.bodyTorso.GetPosition().x, hero.bodyTorso.GetPosition().y);
		hero.addblood = false;
	}
}
/**@constructor*/
function QueryCallback(point) {
  this.point = point;
  this.fixture = null;
}

/**@return bool*/
QueryCallback.prototype.ReportFixture = function(fixture) {
  var body = fixture.body;
  if (body.GetType() === b2_dynamicBody) {
    var inside = fixture.TestPoint(this.point);
    if (inside) {
      this.fixture = fixture;
      return true;
    }
  }
  return false;
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  threeRenderer.setSize( window.innerWidth, window.innerHeight );
}

function getMouseCoords(event) {
  var mouse = new THREE.Vector3();
  mouse.x = (event.clientX / windowWidth) * 2 - 1;
  mouse.y = -(event.clientY / windowHeight) * 2 + 1;
  mouse.z = 0.5;

  projector.unprojectVector(mouse, camera);
  var dir = mouse.sub(camera.position).normalize();
  var distance = -camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar(distance));
  var p = new b2Vec2(pos.x, pos.y);
  return p;
}

function createUpdate( f, i, d, a ){
	var update = {
		run: undefined,
		iterations: -1,
		delay: 0,
		args: a
	};
	if ( f != undefined )
	{
		update.run = f;
	}
	if ( i != undefined )
	{
		update.iterations = i;
	}
	if ( d != undefined )
	{
		update.delay = d;
	}
	return update;
}
destroyBody = function(body){
	if ( garbageBodies.indexOf( body ) == -1 )
	{
		garbageBodies.push( body );
		
	}
}
destroyBodies = function(bodyList){
	for ( i = 0; i<bodyList.length; i++  )
	{
		destroyBody( bodyList[i] );
	}
}
destroyJoint = function(joint){
	if ( garbageJoints.indexOf( joint ) == -1 )
	{
		garbageJoints.push( joint );
	}
}
destroyJoints = function(jointList){
	for ( i = 0; i<jointList.length; i++  )
	{
		destroyJoint( jointList[i] );
	}
}

takeOutGarbage = function(){
  for ( i = 0; i < garbageBodies.length; i++ )
  {
	  world.DestroyBody( garbageBodies[ i ] );
  }
  garbageBodies = [];
  for ( i = 0; i < garbageJoints.length; i++ )
  {
	  world.DestroyJoint( garbageJoints[ i ] );
  }
  garbageJoints = [];
}

function lineDistance( x1,y1, x2,y2 )
{
  var xs = 0;
  var ys = 0;
 
  xs = x2 - x1;
  xs = xs * xs;
 
  ys = y2 - y1;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}


function createMouseJoint()
{
	if ( mouseJoint != undefined || sword == undefined )
	{
		return;
	}
	var p = {x: sword.bodySword.GetPosition().x, y: sword.bodySword.GetPosition().y-10*sword.size};
    var aabb = new b2AABB;
    var d = new b2Vec2;
	
    d.Set(0.01, 0.01);
    b2Vec2.Sub(aabb.lowerBound, p, d);
    b2Vec2.Add(aabb.upperBound, p, d);


	var bd = new b2BodyDef;
	g_groundBody = world.CreateBody(bd);
  
	var md = new b2MouseJointDef;
	md.bodyA = g_groundBody;
	md.bodyB = sword.bodySword;
	md.target = p;
	md.maxForce = 150 * sword.bodySword.GetMass();
	mouseJoint = world.CreateJoint(md);
	sword.bodySword.SetAwake(true);
}
