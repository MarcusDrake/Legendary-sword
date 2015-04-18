function TestScene() {
	//var data = res.compiledExample;
	this.data = res.test;
	
	camera.position.x = 4;
	camera.position.y = 4;
	camera.position.z = 12;
	
	world.SetContactListener( this );
	
	this.updateList.push( createUpdate( function( self ){
		world.Step(timeStep, velocityIterations, positionIterations);
		if ( self.iterations == 0 )
		{
			self.iterations = 1;
			//changeScene( TestScene );
		}
	}, 100 ) );
}

TestScene.prototype.updateList = [];
TestScene.prototype.player = {};
TestScene.prototype.sword = {};

TestScene.prototype.init = function() {
	this.map = new Map( this.data.grid );
	this.map.readGrid();
}

TestScene.prototype.BeginContact = function( contact ) {
	console.log( contact );
	var fixtureA = contact.GetFixtureA();
	var fixtureB = contact.GetFixtureB();
	if ( fixtureA.userData != undefined && fixtureA.userData != fixtureB.userData )
	{
		console.log( fixtureA, fixtureB );
	}
	
	
};

TestScene.prototype.BeginContactBody = function( contact ) {
	var fixtureA = contact.GetFixtureA();
	var fixtureB = contact.GetFixtureB();
	if ( fixtureA.userData == undefined || fixtureB.userData == undefined )
	{
		return;
	}
	if ( fixtureA.userData.collideWith == undefined || fixtureB.userData.collideWith == undefined )
	{
		return;
	}
	fixtureA.userData.collideWith( fixtureB.userData );
	fixtureB.userData.collideWith( fixtureA.userData );
};
TestScene.prototype.EndContact = function(fixture,particleSystem, index )
{
	console.log( fixture,particleSystem, index, "END" );
}

TestScene.prototype.Keyboard = function( char ) {
	if ( char == "R" ) {
		this.updateList.push( createUpdate( function( self ){
			camera._rotation.y += 0.03;
			console.log(  self.iterations );
			if ( self.iterations == 0 )
			{
				self.iterations = 1;
			}
		}, 1 ) );
	}
}

TestScene.prototype.Step = function() {
	for ( var i = 0; i < this.updateList.length; i++ )
	{
		if ( this.updateList[ i ].run == undefined || this.updateList[ i ].iterations == undefined || this.updateList[ i ].delay == undefined )
		{
			console.log( "THIS IS NOT AN UPDATE OBJECT, SCRAM!" );
			this.updateList.splice( i, 1 );
			continue;
		}
		if ( this.updateList[ i ].delay == 0 )
		{
			this.updateList[ i ].run( this.updateList[ i ] );
		}
		else
		{
			this.updateList[ i ].delay--;
			continue;
		}
		if ( this.updateList[ i ].iterations == 0 )
		{
			this.updateList.splice( i, 1 );	
		}
		else
		{
			this.updateList[ i ].iterations--;
		}
	}
}
