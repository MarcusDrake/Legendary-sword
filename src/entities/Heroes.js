function Sword(){
	this.bodySword;
	this.bodyLower;
	this.size = 0.4;
	this.active = false;
	this.damageCooldown = 0;
	this.damage = 5;
	this.addToUpdate();
}
Sword.prototype.addToUpdate = function(){
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
}
Sword.prototype.BeginContactBody = function( fixtureA, fixtureB )
{
	if ( this.active == true )
	{
		var target = fixtureA;
		if ( fixtureA == this.swordSensor )
		{
			target = fixtureB;
		}
		if ( target.userData != undefined )
		{
			if ( target.userData.alive == undefined )
			{
				return;
			}
			if ( target.userData == hero )
			{
				return;
			}
			this.dealDamage( target.userData );
		}
	}
}
Sword.prototype.dealDamage = function( creature ){
	if ( this.damageCooldown > 0 )
	{
		return;
	}
	this.damageCooldown = 20;
	creature.takeDamage( this.damage );
}
Sword.prototype.drawBody = function(x,y,sensor)
{
	bodyDef = new b2BodyDef(x,y);
	
	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	
	//Sword
	fixtureDef = new b2FixtureDef();
	
	var categoryBits = CATEGORY_DEFAULT;
	var maskBits = MASK_DEFAULT;
	
	if ( sensor != undefined )
	{
		sensor = true;
		categoryBits = CATEGORY_SWORD;
		maskBits = MASK_SWORD;
	}
	fixtureDef.filter.categoryBits = categoryBits;
	fixtureDef.filter.maskBits = maskBits;
	fixtureDef.shape = this.getBox();
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	if ( sensor != undefined )
	{
		fixtureDef.isSensor = sensor;
	}
	
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-2.5*this.size, y-7*this.size);
	this.bodySword = world.CreateBody(bodyDef);
	this.swordSensor = this.bodySword.CreateFixtureFromDef(fixtureDef);
	
}
Sword.prototype.drawGuard = function( x, y, multiplierY, sensor ){
	var categoryBits = CATEGORY_DEFAULT;
	var maskBits = MASK_DEFAULT;
	
	if ( sensor != undefined )
	{
		sensor = true;
		categoryBits = CATEGORY_SWORD;
		maskBits = MASK_SWORD;
	}
	var box = new b2PolygonShape();
	box.SetAsBoxXYCenterAngle(1*this.size, 0.1*this.size, { x: x-17.5*this.size, y: y-multiplierY*this.size }, 0 );
	var fixtureDef = new b2FixtureDef();
	
	fixtureDef.filter.categoryBits = categoryBits;
	fixtureDef.filter.maskBits = maskBits;
	fixtureDef.shape = box;
	if ( sensor != undefined )
	{
		fixtureDef.isSensor = sensor;
	}
	this.bodySword.CreateFixtureFromDef(fixtureDef);
	this.swordSensor.detail = "legendary_blade";
}
Sword.prototype.getBox = function(){
	var box = new b2PolygonShape();
	box.SetAsBoxXY(0.25*this.size, 6*this.size);
	return box;
}
Sword.prototype.connectToHero = function()
{
	removeDialog( "hero" );
	destroyBody( this.bodySword )
	var heroPos = hero.getOrigin();
	x = heroPos.x;
	y = heroPos.y;
	this.drawBody(x,y,true);
	this.drawGuard(x,y,8,true);
	
	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;

	var anchor = new b2Vec2(x-2.5*this.size, y-2*this.size);
	jd.InitializeAndCreate(hero.bodyLeftArm, sword.bodySword, anchor);
	createMouseJoint();
	hero.active = true;
}

function Hero(){

	 this.health = 15;
	 this.maxHealth = 15;

	 this.damage = 0;
	
	 this.bodyTorso = null;
	 this.bodyHead = null;
	 this.bodyLeftLeg;
	 this.bodyRightLeg;
	 this.bodyLeftArm;
	 this.bodyRightArm;
	 this.collisionList = [];
	 this.size = 0.4;
	 this.alive = true;
	 this.legContactList = [];
	 this.depression = 0;
	 this.maxDepression = 10;
	 this.active = false;
}
Hero.prototype.getOrigin = function()
{
	var pos = this.bodyTorso.GetPosition();
	return {x: pos.x - (1*this.size), y:pos.y }
}
Hero.prototype.drawBody = function(x,y){
	var bodyDef = new b2BodyDef();
	//torso
	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	var box = new b2PolygonShape();
	box.SetAsBoxXY(2.5*this.size, 3*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = CATEGORY_BODY;
	fixtureDef.filter.maskBits = MASK_BODY;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.fixedRotation = true; 
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x + 1*this.size, y);
	this.bodyTorso = world.CreateBody(bodyDef);
	var fixture = this.bodyTorso.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

	var bodyDef = new b2BodyDef();
	//Left leg
	jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	var box = new b2PolygonShape();
	box.SetAsBoxXY(1*this.size, 2*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = CATEGORY_BODY;
	fixtureDef.filter.maskBits = MASK_BODY;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x+2.5*this.size, y-5*this.size);
	this.bodyLeftLeg = world.CreateBody(bodyDef);
	var fixture = this.bodyLeftLeg.CreateFixtureFromDef(fixtureDef);
	this.fixtureLeftLeg = fixture;
	fixture.userData = this;

	jd.enableLimit = true;
	jd.lowerAngle = -45 * Math.PI / 180;
	jd.upperAngle =  45 * Math.PI / 180;
  
	var anchor = new b2Vec2(x+2.5*this.size, y-3*this.size);
	jd.InitializeAndCreate(this.bodyTorso, this.bodyLeftLeg, anchor);
	
	//Right leg
	jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	var box = new b2PolygonShape();
	box.SetAsBoxXY(1*this.size, 2*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = CATEGORY_BODY;
	fixtureDef.filter.maskBits = MASK_BODY;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-0.5*this.size, y-5*this.size);
	this.bodyRightLeg = world.CreateBody(bodyDef);
	var fixture = this.bodyRightLeg.CreateFixtureFromDef(fixtureDef);
	this.fixtureRightLeg = fixture;
	fixture.userData = this;

	jd.enableLimit = true;
	jd.lowerAngle = -45 * Math.PI / 180;
	jd.upperAngle =  45 * Math.PI / 180;
	
	var anchor = new b2Vec2(x-0.5*this.size, y-3*this.size);
	jd.InitializeAndCreate(this.bodyTorso, this.bodyRightLeg, anchor);
	
	//left arm
	jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	var box = new b2PolygonShape();
	box.SetAsBoxXY(1*this.size, 2*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = CATEGORY_NON_BODY;
	fixtureDef.filter.maskBits = MASK_NON_BODY;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-2.5*this.size, y);
	this.bodyLeftArm = world.CreateBody(bodyDef);
	var fixture = this.bodyLeftArm.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

	var anchor = new b2Vec2(x-2.5*this.size, y+2*this.size);
	jd.InitializeAndCreate(this.bodyTorso, this.bodyLeftArm, anchor);
	
	//Right arm
	var box = new b2PolygonShape();
	box.SetAsBoxXY(1*this.size, 2*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = CATEGORY_NON_BODY;
	fixtureDef.filter.maskBits = MASK_NON_BODY;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x+4.5*this.size, y);
	this.bodyRightArm = world.CreateBody(bodyDef);
	var fixture = this.bodyRightArm.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

	jd.enableLimit = true;
	jd.lowerAngle = 0 * Math.PI / 180;
	jd.upperAngle = 180 * Math.PI / 180;
	
	var anchor = new b2Vec2(x+4.5*this.size, y+2*this.size);
	jd.InitializeAndCreate(this.bodyTorso, this.bodyRightArm, anchor);
  
	//head
	var box = new b2PolygonShape();
	box.SetAsBoxXY(1.5*this.size, 1.5*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = CATEGORY_NON_BODY;
	fixtureDef.filter.maskBits = MASK_NON_BODY;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x+1*this.size, y+4.5*this.size);
	this.bodyHead = world.CreateBody(bodyDef);
	var fixture = this.bodyHead.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

	jd.enableLimit = true;
	jd.lowerAngle = -5 * Math.PI / 180;
	jd.upperAngle = 5 * Math.PI / 180;
	
	var anchor = new b2Vec2(x+1*this.size, y+5*this.size);
	jd.InitializeAndCreate(this.bodyTorso, this.bodyHead, anchor);
	
	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	
	this.collisionList = [
		//TOP INDEX = ORIGIN
		this.bodyTorso,
		this.bodyHead,
		this.bodyLeftLeg,
		this.bodyRightLeg,
		this.bodyLeftArm,
		this.bodyRightArm
	];
	
	this.addToUpdate();
}
Hero.prototype.proclaimCause = function()
{
	// TODO: Text/story update.
	addDialog(this.collisionList[0].GetPosition().x,this.collisionList[0].GetPosition().y,"hero","I found the <strong>Legendary Sword</strong>, I will take it and save my wife!");
}
Hero.prototype.addToUpdate = function(){
	
	currentScene.updateList.push( createUpdate( function( self ){
		if ( self.iterations == 0 )
		{
			self.iterations = 1;
		}
		updatePositionDialog(self.args.hero.collisionList[0].GetPosition().x-5,self.args.hero.collisionList[0].GetPosition().y+7,"hero");
		
		if(self.args.hero.depression >= self.args.hero.maxDepression)
		{
			addDialog(self.args.hero.collisionList[0].GetPosition().x-5,self.args.hero.collisionList[0].GetPosition().y+8,"hero","PLEASE KILL ME!!!!");
		}
	}, 0, 1, { hero: this } ) );
}
Hero.prototype.updateCanJump = function( beginContact, fixtureA, fixtureB ){

	var target = undefined;
	if ( fixtureA == this.fixtureLeftLeg || fixtureA == this.fixtureRightLeg )
	{
		target = fixtureB;
	}
	if ( fixtureB == this.fixtureLeftLeg || fixtureB == this.fixtureRightLeg )
	{
		target = fixtureA;
	}
	if ( target == undefined )
	{
		return;
	}
	
	if ( target.userData == undefined )
	{
		return;
	}
	if ( target.userData != "block" )
	{
		return;
	}
	if ( !beginContact )
	{
		var index = this.legContactList.indexOf( target );
		if ( index == -1 )
		{
			return;
		}
		this.legContactList.splice( index, 1 )
		return;
	}
	this.legContactList.push( target )
}
Hero.prototype.jump = function( fixture ){
	if ( this.legContactList.length == 0 || !this.active )
	{
		return;
	}
	var pos = this.bodyTorso.GetPosition();
	this.bodyTorso.ApplyForce( new b2Vec2( 0, 300000 * this.size * (gravity/10) ), { x: pos.x, y: pos.y } );
}
Hero.prototype.collideWith = function( fixture ){
	
}
Hero.prototype.takeDamage = function( damage ){
	this.health -= damage;
	this.addblood = true;

	sfx('hurt');

	updateHealthBar(this.health, this.maxHealth);
	if ( this.health <= 0 )
	{
		
		destroyBodies( this.collisionList );

		destroyJoint( mouseJoint );
		this.alive = false;
		queueScene();
		sfx('dead_hero');
		//this.fixture.body.DestroyFixture(this.fixture);
		
		
		//world.DestroyJoint(this.joint);
	}
}

