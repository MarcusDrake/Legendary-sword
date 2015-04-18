function Sword(){
	this.bodySword;
	this.bodyLower;
	this.size = 0.4;

}

Sword.prototype.drawBody = function(x,y)
{
	var bodyDef = new b2BodyDef(x,y);
	
	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	  
	//Sword
	var box = new b2PolygonShape();
	box.SetAsBoxXY(0.25*this.size, 6*this.size);
	var fixtureDef = new b2FixtureDef();
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
	
	
	
	
	var box = new b2PolygonShape();
	box.SetAsBoxXY(1*this.size, 0.1*this.size);
	var fixtureDef = new b2FixtureDef();
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
	 this.health = 10;
	 this.damage = 0;
	
	 this.bodyTorso = null;
	 this.bodyHead = null;
	 this.bodyLeftLeg;
	 this.bodyRightLeg;
	 this.bodyLeftArm;
	 this.bodyRightArm;
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
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x + 1*this.size, y);
	this.bodyTorso = world.CreateBody(bodyDef);
	this.bodyTorso.CreateFixtureFromDef(fixtureDef);


	//Left leg
	jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	var box = new b2PolygonShape();
	box.SetAsBoxXY(1*this.size, 2*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x+2.5*this.size, y-5*this.size);
	this.bodyLeftLeg = world.CreateBody(bodyDef);
	this.bodyLeftLeg.CreateFixtureFromDef(fixtureDef);

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
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-0.5*this.size, y-5*this.size);
	this.bodyRightLeg = world.CreateBody(bodyDef);
	this.bodyRightLeg.CreateFixtureFromDef(fixtureDef);

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
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-2.5*this.size, y);
	this.bodyLeftArm = world.CreateBody(bodyDef);
	this.bodyLeftArm.CreateFixtureFromDef(fixtureDef);

	var anchor = new b2Vec2(x-2.5*this.size, y+2*this.size);
	jd.InitializeAndCreate(this.bodyTorso, this.bodyLeftArm, anchor);
	
	//Right arm
	var box = new b2PolygonShape();
	box.SetAsBoxXY(1*this.size, 2*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x+4.5*this.size, y);
	this.bodyRightArm = world.CreateBody(bodyDef);
	this.bodyRightArm.CreateFixtureFromDef(fixtureDef);

	jd.enableLimit = true;
	jd.lowerAngle = 0 * Math.PI / 180;
	jd.upperAngle = 180 * Math.PI / 180;
	
	var anchor = new b2Vec2(x+4.5*this.size, y+2*this.size);
	jd.InitializeAndCreate(this.bodyTorso, this.bodyRightArm, anchor);
  
	//head
	var box = new b2PolygonShape();
	box.SetAsBoxXY(1.5*this.size, 1.5*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x+1*this.size, y+4.5*this.size);
	this.bodyHead = world.CreateBody(bodyDef);
	this.bodyHead.CreateFixtureFromDef(fixtureDef);

	jd.enableLimit = true;
	jd.lowerAngle = -5 * Math.PI / 180;
	jd.upperAngle = 5 * Math.PI / 180;
	
	var anchor = new b2Vec2(x+1*this.size, y+5*this.size);
	jd.InitializeAndCreate(this.bodyTorso, this.bodyHead, anchor);
	
	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
}
