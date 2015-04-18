//DONT FUCKING CHANGE THESE!!!

function Map( grid ) {
	this.grid = grid;

	this.bd = new b2BodyDef();
	this.ground = world.CreateBody(this.bd);
	this.bd.allowSleep = false;
	this.bd.position.Set(0, 1);
	this.body = world.CreateBody(this.bd);
	this.psd = new b2ParticleSystemDef();
	
	this.psd.radius = 0.045;
	this.psd.dampingStrength = 0.2;
	this.particleSystem = world.CreateParticleSystem(this.psd);
}
Map.prototype.readGrid = function(){
	
	for ( var x = 0; x < this.grid.length; x++ )
	{
		for ( var y = 0; y < this.grid[ x ].length; y++ )
		{
			var tile = this.grid[ x ][ y ];
			switch( true ){
				case tile.ground :
					this.createBlock( x, y, TILE_GROUND );
				break;
				case tile.collision :
					this.createBlock( x, y, TILE_COLLISION );
				break;
				case tile.breakable :
					this.createBlock( x, y, TILE_BREAKABLE );
				break;
				case tile.water :
					this.createLiquid( x, y, LIQUID_WATER );
				break;
				case tile.chain :
					this.createChain( x, y, OBJECT_CHAIN );
				break;
				case tile.boulder :
					this.createBoulder( x, y, OBJECT_BOULDER );
				break;
				case tile.rampright :
					this.createRamp( x, y, RAMP_STEEP_RIGHT );
				break;
				case tile.rampleft :
					this.createRamp( x, y, RAMP_STEEP_LEFT );
				break;
				case tile.player :
					this.createCharacter( x, y, CHARACTER_PLAYER );
				break;
				case tile.blob :
					this.createCharacter( x, y, CHARACTER_BLOB );
				break;
			}
		}
	}
}
Map.prototype.createBlock = function( x, y, type ){
	var b1 = new b2PolygonShape();
	b1.SetAsBoxXY(0.5, 0.5);
	this.bd.type = b2_kinematicBody;
	this.bd.position.Set( x, y );
	var body = world.CreateBody(this.bd);
	var fixture = body.CreateFixtureFromShape( b1 );
	switch( type ) {
		case TILE_GROUND :
		
		break;
		case TILE_BREAKABLE :
		
		break;
	}
}

Map.prototype.createLiquid = function( x, y, type ){
	var box = new b2PolygonShape();
	box.SetAsBoxXYCenterAngle(0.5, 0.5, new b2Vec2(x + 0, y + 0), 0);

	var particleGroupDef = new b2ParticleGroupDef();
	particleGroupDef.shape = box;
	var particleGroup = this.particleSystem.CreateParticleGroup(particleGroupDef);
}
Map.prototype.createBoulder = function( x, y, type ){
	var circle = new b2CircleShape();
	circle.radius = 0.4;
	fd = new b2FixtureDef();
	fd.shape = circle;
	fd.density = 100;
	bd = new b2BodyDef();
	bd.type = b2_dynamicBody;
	bd.position.Set( x, y );
	
	body = world.CreateBody(bd);
	
	var fixture = body.CreateFixtureFromDef(fd);
}
Map.prototype.createChain = function( x, y, type ){
	var prevBody = this.ground;
	for (var i = 0; i < 10; i++) {
		var jd = new b2RevoluteJointDef();
		jd.collideConnected = false;
		var box = new b2PolygonShape();
		box.SetAsBoxXY(0.04, 0.08);
		var fixtureDef = new b2FixtureDef();
		fixtureDef.shape = box;
		fixtureDef.density = 5;
		fixtureDef.friction = 0.2;
		bd = new b2BodyDef();
		bd.type = b2_dynamicBody;
		
		var yOffset = y - ( i * 0.08 ) + 0.3;
		bd.position.Set( x, yOffset + 0.05 );
		var body = world.CreateBody( bd );
		var fixture = body.CreateFixtureFromDef( fixtureDef );

		var anchor = new b2Vec2(x, yOffset );
		jd.InitializeAndCreate(prevBody, body, anchor);
		prevBody = body;
	}
}
Map.prototype.createRamp = function( x, y, type ){
	switch ( type )
	{
		case RAMP_STEEP_RIGHT :
			var shape = new b2PolygonShape();
			shape.vertices[0] = new b2Vec2(0.5 + x, -0.5 + y);
			shape.vertices[1] = new b2Vec2(0.5 + x, 0.5 + y),
			shape.vertices[2] = new b2Vec2(-0.5 + x, -0.5 + y);
			var fixture = this.ground.CreateFixtureFromShape(shape, 0);
			break;
		case RAMP_STEEP_LEFT :
			var shape = new b2PolygonShape();
			shape.vertices[0] = new b2Vec2(0.5 + x, -0.5 + y);
			shape.vertices[1] = new b2Vec2(-0.5 + x, -0.5 + y),
			shape.vertices[2] = new b2Vec2(-0.5 + x, 0.5 + y);
			var fixture = this.ground.CreateFixtureFromShape(shape, 0);
			break;
	}
}
Map.prototype.createCharacter = function( x, y, type ){
	switch ( type )
	{
		case CHARACTER_PLAYER :
			
			hero = new Hero();
			sword = new Sword();
			
			hero.drawBody(x,y+10);
			sword.drawBody(x,y+10);
		
			
			break;
		case CHARACTER_BLOB :
			var blob = new Blob( {x:x,y:y} );
			blob.drawBody( this.bd, this.ground );
			break;
	}
	
}
