function Blob( position ){
	this.position = position;
	this.health = 10;
	this.damage = 1;
	this.damageCooldown = 0;
	this.collisionList = [];
	this.id = "blob"+Math.floor((Math.random() * 100) + 1);
	this.alive = true;
	this.size = 5;

}

function WormBoss( position ){
	this.position = position;
	this.health = 1;
	this.damage = 2;
	this.damageCooldown = 0;
	this.collisionList = [];
	this.id = "WormBoss"+Math.floor((Math.random() * 100) + 1);
	this.alive = true;
	this.size = 20;
	this.currentJumpIndex = 1;
	this.dir = 0;

}

WormBoss.prototype.takeDamage = function( damage ){

	switch(Math.floor((Math.random() * 4) + 1))
	{
		case 1:
			addDialog(this.collisionList[0].GetPosition().x,this.collisionList[0].GetPosition().y,"WormBoss"+this.id,"SCHLURP...");
			break;
		case 2:
			addDialog(this.collisionList[0].GetPosition().x,this.collisionList[0].GetPosition().y,"WormBoss"+this.id,"SCHHHHH!");
			break;
		case 3:
			addDialog(this.collisionList[0].GetPosition().x,this.collisionList[0].GetPosition().y,"WormBoss"+this.id,"Chrrrick chrrrick chrrrick chrrrrick...");
			break;
		case 4:
			addDialog(this.collisionList[0].GetPosition().x,this.collisionList[0].GetPosition().y,"WormBoss"+this.id,"*whimper*");
			break;
	}

	sfx('wormboss_hit');

	this.health -= damage;
	if ( this.health <= 0 )
	{
		sfx('death');
		destroyBodies( this.collisionList );
		var pos = this.collisionList[0].GetPosition();
		setTimeout( function(){
			new Waifu( pos.x, pos.y);
		},5 );
		removeDialog("WormBoss"+this.id);
		this.alive = false;
	}
}
WormBoss.prototype.dealDamage = function( creature ){
	if ( this.damageCooldown > 0 )
	{
		return;
	}
	sfx('wormboss_hurt');
	this.damageCooldown = 20;
	creature.takeDamage( this.damage );
}
WormBoss.prototype.collideWith = function( fixture ){
	
	for ( i=0;i<hero.collisionList.length;i++ )
	{
		if ( hero.collisionList[ i ].fixtures.indexOf( fixture ) != -1 )
		{
			this.dealDamage( fixture.userData );
		}
	}
}
WormBoss.prototype.drawBody = function( bd, ground ){
	
	var prevBody = null;
	var box = new b2PolygonShape();

	box.SetAsBoxXY(0.12 * this.size, 0.24 * this.size);

	
	fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = CATEGORY_BODY;
	fixtureDef.filter.maskBits = MASK_BODY;
	fixtureDef.shape = box;
	fixtureDef.density = 7;
	bd = new b2BodyDef();
	bd.type = b2_dynamicBody;

	bd.position.Set( this.position.x, this.position.y + (0.4 * this.size) );
	
	body = world.CreateBody(bd);
	this.collisionList.push( body );
	this.fixture = body.CreateFixtureFromDef(fixtureDef);
	
	var prevBody = body;
	
	for (var i = 0; i < 3; i++) {
		var jd = new b2RevoluteJointDef();
		jd.collideConnected = false;
		var box = new b2PolygonShape();

		
			
		box.SetAsBoxXY(0.08 * this.size, 0.14 * this.size);

		var fixtureDef = new b2FixtureDef();
		fixtureDef.filter.categoryBits = CATEGORY_NON_BODY;
		fixtureDef.filter.maskBits = MASK_NON_BODY;
		fixtureDef.shape = box;
		fixtureDef.density = 0.0002;
		fixtureDef.friction = 0;
		
		bd = new b2BodyDef();
		bd.type = b2_dynamicBody;		

		var yOffset = this.position.y + ( i * (0.16 * this.size) ) + (0.6 * this.size);
		bd.position.Set( this.position.x, yOffset + (0.05 * this.size) );

		var body = world.CreateBody( bd );
		this.collisionList.push( body );
		var fixture = body.CreateFixtureFromDef( fixtureDef );
		if(i == 2)
		{
			fixture.userData = this;
		}
		var anchor = new b2Vec2(this.position.x, yOffset );
		jd.InitializeAndCreate(prevBody, body, anchor);
		prevBody = body;
	}
	
	this.collisionList[0].SetTransform( this.collisionList[0].GetPosition(), -90 );
	this.addToUpdate();
}
WormBoss.prototype.addToUpdate = function(){
	
	currentScene.updateList.push( createUpdate( function( self ){
		if ( self.iterations == 0 )
		{
			self.iterations = 1;
		}
		updatePositionDialog(self.args.WormBoss.collisionList[0].GetPosition().x,self.args.WormBoss.collisionList[0].GetPosition().y,"WormBoss"+self.args.WormBoss.id);
		if ( self.args.WormBoss.damageCooldown > 0 )
		{
			self.args.WormBoss.damageCooldown--;
		}
	}, 0, 1, { WormBoss: this } ) );
	currentScene.updateList.push( createUpdate( function( self ){
		if ( self.iterations == 0 )
		{
			self.iterations = 1;
			self.delay = 150;
		}
		
		var fixture = self.args.WormBoss.fixture;	
		
		position = self.args.WormBoss.collisionList[ 0 ].GetPosition();
		
		var yForce = 500 * self.args.WormBoss.size * gravity;
		
		if ( self.args.WormBoss.currentJumpIndex == 3 )
		{
			yForce *= 2;
		}
		else
		{
			yForce *= 1;
		}
		var xForce = 0;
		if ( directionFromTo( position.x, hero.collisionList[ 0 ].GetPosition().x ) == "right" ) {
			if(self.args.WormBoss.dir == 0)
			{
				self.args.WormBoss.dir = 1;
				self.args.WormBoss.collisionList[0].SetTransform( self.args.WormBoss.collisionList[0].GetPosition(), 360 );
			}
			
			xForce = 2500 * self.args.WormBoss.size;
			var force = new b2Vec2( xForce, yForce );
			fixture.body.ApplyForce( force, position );
		}
		else{
		
			if(self.args.WormBoss.dir == 1)
			{
				self.args.WormBoss.dir = 0;
				self.args.WormBoss.collisionList[0].SetTransform( self.args.WormBoss.collisionList[0].GetPosition(), -360 );
			}
			
			xForce = -2500 * self.args.WormBoss.size;
			var force = new b2Vec2( xForce, yForce );
			fixture.body.ApplyForce( force, position );
		}
		
		if ( self.args.WormBoss.currentJumpIndex == 3 )
		{
			self.args.WormBoss.currentJumpIndex = 0;
		}
		self.args.WormBoss.currentJumpIndex++;
	}, 0, 150, { WormBoss: this } ) );

}

Blob.prototype.takeDamage = function( damage ){

	
	switch(Math.floor((Math.random() * 4) + 1))
	{
		case 1:

			addDialog(this.collisionList[0].GetPosition().x,this.collisionList[0].GetPosition().y,this.id,"Gaaaw!");
			break;
		case 2:
			addDialog(this.collisionList[0].GetPosition().x,this.collisionList[0].GetPosition().y,this.id,"Kaaahhkkk!");
			break;
		case 3:
			addDialog(this.collisionList[0].GetPosition().x,this.collisionList[0].GetPosition().y,this.id,"Glurp glurp...");
			break;
		case 4:
			addDialog(this.collisionList[0].GetPosition().x,this.collisionList[0].GetPosition().y,this.id,"*whimper*");

			break;
	}

	setTimeout(function() {removeDialog(this.id);}, 4000);
	sfx('hit');

	this.health -= damage;
	if ( this.health <= 0 )
	{
		destroyBodies( this.collisionList );
		removeDialog(this.id);
		this.alive = false;
	}
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

	box.SetAsBoxXY(0.12 * this.size, 0.24 * this.size);

	
	fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = CATEGORY_BODY;
	fixtureDef.filter.maskBits = MASK_BODY;
	fixtureDef.shape = box;
	fixtureDef.density = 7;
	bd = new b2BodyDef();
	bd.type = b2_dynamicBody;

	bd.position.Set( this.position.x, this.position.y + (0.4 * this.size) );
	
	body = world.CreateBody(bd);
	this.collisionList.push( body );
	this.fixture = body.CreateFixtureFromDef(fixtureDef);
	this.fixture.userData = this;
	var prevBody = body;
	
	for (var i = 0; i < 3; i++) {
		var jd = new b2RevoluteJointDef();
		jd.collideConnected = false;
		var box = new b2PolygonShape();

		box.SetAsBoxXY(0.08 * this.size, 0.14 * this.size);

		var fixtureDef = new b2FixtureDef();
		fixtureDef.filter.categoryBits = CATEGORY_NON_BODY;
		fixtureDef.filter.maskBits = MASK_NON_BODY;
		fixtureDef.shape = box;
		fixtureDef.density = 0.0001;
		fixtureDef.friction = 0;
		bd = new b2BodyDef();
		bd.type = b2_dynamicBody;
		

		var yOffset = this.position.y + ( i * (0.16 * this.size) ) + (0.6 * this.size);
		bd.position.Set( this.position.x, yOffset + (0.05 * this.size) );

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
		updatePositionDialog(self.args.blob.collisionList[0].GetPosition().x,self.args.blob.collisionList[0].GetPosition().y,self.args.blob.id);
		if ( self.args.blob.damageCooldown > 0 )
		{
			self.args.blob.damageCooldown--;
		}
	}, 0, 1, { blob: this } ) );
		currentScene.updateList.push( createUpdate( function( self ){
		if ( self.iterations == 0 )
		{
			self.iterations = 1;
			self.delay = 150;
		}
		var fixture = self.args.blob.fixture;	
		
		position = self.args.blob.collisionList[ 0 ].GetPosition();
		var yForce = 150 * self.args.blob.size * gravity;
		var xForce = 0;
		if ( directionFromTo( position.x, hero.collisionList[ 0 ].GetPosition().x ) == "right" ) {
			xForce = 2500 * self.args.blob.size;
			var force = new b2Vec2( xForce, yForce );
			fixture.body.ApplyForce( force, position );
		}
		else{
			//new b2Vec2( -75 * (force * (self.args.blob.size*12)), calculateForce( 170, self.args.blob.size*12)
			xForce = -2500 * self.args.blob.size;
			var force = new b2Vec2( xForce, yForce );
			fixture.body.ApplyForce( force, position );
		}
	}, 0, 150, { blob: this } ) );

}

function Orc( position ){
	this.position = position;
	this.health = 10;
	this.damage = 1;
	this.damageCooldown = 0;
	this.collisionList = [];
}
Orc.prototype.takeDamage = function(){

}
Orc.prototype.dealDamage = function( creature ){
	if ( this.damageCooldown > 0 )
	{
		return;
	}
	this.damageCooldown = 20;
	creature.takeDamage( this.damage );
}
Orc.prototype.collideWith = function( fixture ){
	for ( i=0;i<hero.collisionList.length;i++ )
	{
		if ( hero.collisionList[ i ].fixtures.indexOf( fixture ) != -1 )
		{
			this.dealDamage( fixture.userData );
		}
	}
}
Orc.prototype.drawBody = function( bd, ground ){
	
	this.addToUpdate();
}
Orc.prototype.addToUpdate = function(){
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
		
		
		var force = 1600;
		if ( directionFromTo( position.x, hero.collisionList[ 0 ].GetPosition().x ) == "right" ) {
			fixture.body.ApplyForce( new b2Vec2( (75 * force) * this.size, (85 * force) * this.size ), { x: position.x, y: position.y } );
		}
		else{
			fixture.body.ApplyForce( new b2Vec2( (-75 * force) * this.size, (85 * force) * this.size ), { x: position.x, y: position.y } );
		}
	}, 0, 100, { blob: this } ) );
}
