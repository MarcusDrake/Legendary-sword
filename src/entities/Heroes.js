function Sword(){
	this.bodySword;
	this.bodyLower;
	this.size = 0.4;

}/*
function Hero( fixture ){
	this.health = 2;
	this.damage = 0;
	this.fixture = fixture;
}
*/

Sword.prototype.drawBody = function(x,y)
{
	var bodyDef = new b2BodyDef(x,y);
	
	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	
	//Sword
	var box = new b2PolygonShape();
	
	
	box.SetAsBoxXY(0.25*this.size, 6*this.size);
	var fixtureDef = new b2FixtureDef();
	
	fixtureDef.filter.categoryBits = 0xFFFF;
	fixtureDef.filter.maskBits = 0x0002;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	//fixtureDef.restitution=8.0;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-2.5*this.size, y-7*this.size);
	this.bodySword = world.CreateBody(bodyDef);
	this.bodySword.CreateFixtureFromDef(fixtureDef);
	
	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;

	var anchor = new b2Vec2(x-2.5*this.size, y-2*this.size);
	jd.InitializeAndCreate(hero.bodyLeftArm, sword.bodySword, anchor);
	
	/*
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	*/
	
	var box = new b2PolygonShape();
	box.SetAsBoxXY(1*this.size, 0.1*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = 0xFFFF;
	fixtureDef.filter.maskBits = 0x0002;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-2.5*this.size, y-3*this.size);
	this.bodyLower = world.CreateBody(bodyDef);
	this.bodyLower.CreateFixtureFromDef(fixtureDef);

	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	jd.enableLimit = true;
	jd.lowerAngle = 0 * Math.PI / 180;
	jd.upperAngle = 0 * Math.PI / 180;
	
	var anchor = new b2Vec2(x-2-5*this.size, y-2.5*this.size);
	jd.InitializeAndCreate(this.bodyLower, this.bodySword, anchor);
	
	

}

function Hero(){
	 this.health = 2;
	 this.damage = 0;
	
	 this.bodyTorso = null;
	 this.bodyHead = null;
	 this.bodyLeftLeg;
	 this.bodyRightLeg;
	 this.bodyLeftArm;
	 this.bodyRightArm;
	 this.collisionList = [];
	 this.size = 0.4;
}

Hero.prototype.takeDamage = function( damage ){
	this.health -= damage;
	console.log( this.health );
}

Hero.prototype.drawBody = function(x,y){
	var bodyDef = new b2BodyDef();
	
	//torso
	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	var box = new b2PolygonShape();
	box.SetAsBoxXY(2.5*this.size, 3*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = 0x0001;
	fixtureDef.filter.maskBits = 0xFFFF;
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
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x+2.5*this.size, y-5*this.size);
	this.bodyLeftLeg = world.CreateBody(bodyDef);
	var fixture = this.bodyLeftLeg.CreateFixtureFromDef(fixtureDef);
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
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-0.5*this.size, y-5*this.size);
	this.bodyRightLeg = world.CreateBody(bodyDef);
	var fixture = this.bodyRightLeg.CreateFixtureFromDef(fixtureDef);
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
	fixtureDef.filter.categoryBits = 0xFFFF;
	fixtureDef.filter.maskBits = 0x0002;
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
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
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
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
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
}

Hero.prototype.collideWith = function( fixture ){
	
}
Hero.prototype.takeDamage = function( damage ){
	this.health -= damage;
	if ( this.health <= 0 )
	{
		console.log( "DESTROYING" );
		destroyBodies( this.collisionList );
		//this.fixture.body.DestroyFixture(this.fixture);
		
		
		//world.DestroyJoint(this.joint);
	}
}

