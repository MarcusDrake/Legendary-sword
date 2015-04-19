
function Map( grid ) {
	this.grid = grid;
	this.currentAxis = null;
	this.axisOffset = 40;
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
Map.prototype.withinAxisRange = function( x ){
	var maxX = this.currentAxis + this.axisOffset;
	var minX = this.currentAxis - this.axisOffset;
	if ( x > minX && x < maxX )
	{
		return true;
	}
	return false;
}
Map.prototype.shouldDraw = function( x, y ){
	if ( !this.withinAxisRange( x ) )
	{
		return false;
	}
	if ( this.grid[ x ][ y ].content != undefined )
	{
		return false;
	}
	return true;
}
Map.prototype.destroyBlock = function( x, y ){
	if ( this.grid[ x ][ y ].content == undefined )
	{
		return;
	}
	if ( this.grid[ x ][ y ].content.userData == undefined )
	{
		return;
	}
	if ( this.grid[ x ][ y ].content.userData != "block" )
	{
		return;
	}
	
	destroyBody( this.grid[ x ][ y ].content.body );
	this.grid[ x ][ y ].content = undefined;
}
Map.prototype.destroyLiquid = function( x, y ){
	if ( this.grid[ x ][ y ].content == undefined )
	{
		return;
	}
	var shape = new b2CircleShape;
    shape.position = {x:x,y:y};
    shape.radius = 3.5;
    var xf = new b2Transform;
    xf.SetIdentity();
	this.grid[ x ][ y ].content.DestroyParticlesInShape(shape, xf);
	this.grid[ x ][ y ].content = undefined;
}
Map.prototype.destroyRamp = function( x, y ){
	//destroyBody( this.grid[ x ][ y ].content );
	this.grid[ x ][ y ].content = undefined;
}
Map.prototype.readGrid = function(){
	
	for ( var x = 0; x < this.grid.length; x++ )
	{
		for ( var y = 0; y < this.grid[ x ].length; y++ )
		{
			var tile = this.grid[ x ][ y ];
			switch( true ){
				case tile.ground :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createBlock( x, y, TILE_GROUND );
					}
					else if ( !this.withinAxisRange( x ) )
					{
						this.destroyBlock( x, y );
					}
				break;
				case tile.collision :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.grid[ x ][ y ].content = this.createBlock( x, y, TILE_COLLISION );
					}
					else if ( !this.withinAxisRange( x ) )
					{
						this.destroyBlock( x, y );
					}
				break;
				case tile.breakable :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createBlock( x, y, TILE_BREAKABLE );
					}
					else if ( !this.withinAxisRange( x ) )
					{
						this.destroyBlock( x, y );
					}
				break;
				case tile.water :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createLiquid( x, y, LIQUID_WATER );
					}
					else if ( !this.withinAxisRange( x ) )
					{
						this.destroyLiquid( x, y );
					}
				break;
				case tile.lava :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createLiquid( x, y, LIQUID_LAVA );
					}
					else if ( !this.withinAxisRange( x ) )
					{
						this.destroyLiquid( x, y );
					}
				break;
				case tile.chain :
					/*if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createChain( x, y, OBJECT_CHAIN );
					}*/
				break;
				case tile.boulder :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createBoulder( x, y, OBJECT_BOULDER );
					}
					else if ( !this.withinAxisRange( x ) )
					{
						this.destroyBlock( x, y );
					}
				break;
				case tile.rampright :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createRamp( x, y, RAMP_STEEP_RIGHT );
					}
					else if ( !this.withinAxisRange( x ) )
					{
						this.destroyRamp( x, y );
					}
				break;
				case tile.rampleft :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createRamp( x, y, RAMP_STEEP_LEFT );
					}
					else if ( !this.withinAxisRange( x ) )
					{
						this.destroyRamp( x, y );
					}
				break;
				case tile.player :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createCharacter( x, y, CHARACTER_PLAYER );
					}
				break;
				case tile.blob :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createCharacter( x, y, CHARACTER_BLOB );
					}
				case tile.wormboss :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createCharacter( x, y, CHARACTER_WORMBOSS );
					}
				break;
				case tile.blobpet :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createCharacter( x, y, CHARACTER_BLOBPET );
					}
				break;
				case tile.blacksmith :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createCharacter( x, y, CHARACTER_BLACKSMITH );
					}
				case tile.waifu :
					if ( this.shouldDraw( x, y ) )
					{
						this.grid[ x ][ y ].content = this.createCharacter( x, y, CHARACTER_WAIFU );
					}
				break;
			}
		}
	}
}
Map.prototype.createBlock = function( x, y, type ){
	// type = TILE_COLLISION, TILE_GROUND or TILE_BREAKABLE
	var b1 = new b2PolygonShape();
	b1.SetAsBoxXY(0.5, 0.5);
	fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = 0x0001;
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = b1;
	fixtureDef.density = 100;
	this.bd.type = b2_staticBody;
	this.bd.position.Set( x, y );
	switch( type ) {
		case TILE_GROUND :
			
		break;
		case TILE_BREAKABLE :
		
		break;
	}
	var body = world.CreateBody(this.bd);
	var fixture = body.CreateFixtureFromShape( b1 );
	fixture.userData = "block";
	return fixture;
}

Map.prototype.createLiquid = function( x, y, type ){
	var box = new b2PolygonShape();
	box.SetAsBoxXYCenterAngle(0.4, 0.4, new b2Vec2( x, y ), 0);
	this.particleSystem.SetRadius( 0.2 );
	var particleGroupDef = new b2ParticleGroupDef();
	particleGroupDef.shape = box;
	
	switch( type ) {
		case LIQUID_WATER :
			particleGroupDef.color.Set(0, 64, 255, 128);
		break;
		case LIQUID_LAVA :
			particleGroupDef.color.Set(255, 16, 0, 128);
			particleGroupDef.flags = b2_tensileParticle | b2_viscousParticle;
		break;
	}
	var particleGroup = this.particleSystem.CreateParticleGroup(particleGroupDef);
	return this.particleSystem;
}
Map.prototype.createBoulder = function( x, y, type ){
	var circle = new b2CircleShape();
	circle.radius = 0.6;
	fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = CATEGORY_DEFAULT;
	fixtureDef.filter.maskBits = MASK_DEFAULT;
	fixtureDef.shape = circle;
	fixtureDef.density = 100;
	bd = new b2BodyDef();
	bd.type = b2_dynamicBody;
	bd.position.Set( x, y );
	body = world.CreateBody(bd);
	
	var fixture = body.CreateFixtureFromDef(fixtureDef);
	fixture.userData = "block";
	return body;
}
Map.prototype.createChain = function( x, y, type ){
	var prevBody = this.ground;
	for (var i = 0; i < 10; i++) {
		var jd = new b2RevoluteJointDef();
		jd.collideConnected = false;
		var box = new b2PolygonShape();
		box.SetAsBoxXY(0.04, 0.08);
		var fixtureDef = new b2FixtureDef();
		fixtureDef.filter.categoryBits = CATEGORY_DEFAULT;
		fixtureDef.filter.maskBits = MASK_DEFAULT;
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
	return this.ground;
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
	fixture.userData = "block";
	return fixture;
}
Map.prototype.createCharacter = function( x, y, type ){
	var character = undefined;
	switch ( type )
	{
		case CHARACTER_PLAYER :
			
			sword = new Sword();
			currentScene.updateList.push( createUpdate( function( self ){
				hero = new Hero();
				
				hero.drawBody(self.args.x,self.args.y+10);
				currentScene.updateList.push( createUpdate( function( self ){
					hero.proclaimCause();
					$('#swordTakeButton').show();
				}, 0, 100 ) );
			}, 0, 50, {x:x,y:y} ) );
			
			sword.drawBody(x,y+3.7);
			sword.drawGuard(x,y+10,29);
			character = hero;
			
			break;
		case CHARACTER_BLOB :
			var character = new Blob( {x:x,y:y} );
			character.drawBody( this.bd, this.ground );
			break;
		case CHARACTER_WORMBOSS :
			var character = new WormBoss( {x:x,y:y} );
			character.drawBody( this.bd, this.ground );
			break;
			
		case  CHARACTER_BLACKSMITH :
			character = new Blacksmith();
			character.drawBody( x, y+1 );
			break;
		case  CHARACTER_WAIFU :
			console.log( "RUN" );
			
			character = new Waifu();
			character.drawBody( x, y+1 );
			break;
		case  CHARACTER_BLOBPET :
			character = new BlobPet();
			character.drawBody( x, y+1 );
			break;
	}
	return sword;
}
Map.prototype.updateAxis = function(){
	if ( this.currentAxis == null )
	{
		this.currentAxis = 6;
		this.readGrid();
		return;
	}
	if ( hero == undefined )
	{
		return;
	}
	if ( hero.collisionList[ 0 ].GetPosition().x != this.currentAxis )
	{
		this.currentAxis = sword.bodySword.GetPosition().x;
		this.readGrid();
	}
	
}

var bloodParticleSystem;
function createBlood(x,y)
{
	if(bloodParticleSystem !== undefined)
		world.DestroyParticleSystem(bloodParticleSystem);
	
	this.body = world.CreateBody(this.bd);
	this.psd = new b2ParticleSystemDef();
	
	this.psd.radius = 0.045;
	this.psd.dampingStrength = 0.2;
	bloodParticleSystem = world.CreateParticleSystem(this.psd);

	var box = new b2PolygonShape();
	box.SetAsBoxXYCenterAngle(0.5, 0.5, new b2Vec2( x, y ), 0);
	bloodParticleSystem.SetRadius( 0.13 );
	var particleGroupDef = new b2ParticleGroupDef();
	particleGroupDef.shape = box;

			
	particleGroupDef.color.Set(255, 0, 0, 128);

	var particleGroup = bloodParticleSystem.CreateParticleGroup(particleGroupDef);
}
