function Blob( position ){
	this.position = position;
	this.health = 10;
	this.damage = 1;
	this.damageCooldown = 0;
	this.collisionList = [];
}
Blob.prototype.takeDamage = function(){

}
Blob.prototype.dealDamage = function( creature ){
	if ( this.damageCooldown > 0 )
	{
		return;
	}
	this.damageCooldown = 20;
	creature.takeDamage( this.damage );
}
Blob.prototype.collideWith = function( fixture ){
	for ( i=0;i<hero.collisionList.length;i++ )
	{
		if ( hero.collisionList[ i ].fixtures.indexOf( fixture ) != -1 )
		{
			this.dealDamage( fixture.userData );
		}
	}
}
Blob.prototype.drawBody = function( bd, ground ){
	var prevBody = null;
	var box = new b2PolygonShape();
	box.SetAsBoxXY(0.12, 0.24);
	
	fd = new b2FixtureDef();
	fd.shape = box;
	fd.density = 7;
	bd = new b2BodyDef();
	bd.type = b2_dynamicBody;
	bd.position.Set( this.position.x, this.position.y + 0.3 );
	
	body = world.CreateBody(bd);
	this.collisionList.push( body );
	this.fixture = body.CreateFixtureFromDef(fd);
	this.fixture.userData = this;
	var prevBody = body;
	
	for (var i = 0; i < 3; i++) {
		var jd = new b2RevoluteJointDef();
		jd.collideConnected = false;
		var box = new b2PolygonShape();
		box.SetAsBoxXY(0.08, 0.16);
		var fixtureDef = new b2FixtureDef();
		fixtureDef.shape = box;
		fixtureDef.density = 0.0001;
		fixtureDef.friction = 0;
		bd = new b2BodyDef();
		bd.type = b2_dynamicBody;
		
		var yOffset = this.position.y + ( i * 0.16 ) + 0.6;
		bd.position.Set( this.position.x, yOffset + 0.05 );
		var body = world.CreateBody( bd );
		this.collisionList.push( body );
		var fixture = body.CreateFixtureFromDef( fixtureDef );
		var anchor = new b2Vec2(this.position.x, yOffset );
		jd.InitializeAndCreate(prevBody, body, anchor);
		prevBody = body;
	}
	this.addToUpdate();
}
Blob.prototype.addToUpdate = function(){
	currentScene.updateList.push( createUpdate( function( self ){
		if ( self.iterations == 0 )
		{
			self.iterations = 1;
		}
		if ( self.args.blob.damageCooldown > 0 )
		{
			self.args.blob.damageCooldown--;
		}
	}, 0, 1, { blob: this } ) );
	currentScene.updateList.push( createUpdate( function( self ){
		if ( self.iterations == 0 )
		{
			self.iterations = 1;
			self.delay = 100;
		}
		var fixture = self.args.blob.fixture;	
		
		position = self.args.blob.collisionList[ 0 ].GetPosition();
		
		var force = 2;
		if ( directionFromTo( position.x, hero.collisionList[ 0 ].GetPosition().x ) == "right" ) {
			fixture.body.ApplyForce( new b2Vec2( 75 * force, 85 * force ), { x: position.x, y: position.y } );
		}
		else{
			fixture.body.ApplyForce( new b2Vec2( -75 * force, 85 * force ), { x: position.x, y: position.y } );
		}
	}, 0, 100, { blob: this } ) );
}
