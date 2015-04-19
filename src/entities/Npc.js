function Blacksmith( position ){
	this.position = position;
	this.health = 5;
	this.damage = 1;
	this.damageCooldown = 0;
	this.collisionList = [];
	this.size = 0.3;
	this.id = "blacksmith"+Math.floor((Math.random() * 100) + 1);
	this.alive = true;
	this.depression = 5;
}

Blacksmith.prototype.takeDamage = function(){
	
	console.log("DAMAGE TO Blacksmith");
	this.health -= 1;
	if(this.health == 4)
	{
		addDialog(this.collisionList[0].GetPosition().x,this.collisionList[0].GetPosition().y,"blacksmith"+this.id,"Argh, what are you doing?!");
		setTimeout(function() {addDialog(hero.collisionList[0].GetPosition().x,hero.collisionList[0].GetPosition().y,"hero","Oh i'm sorry that was a mistake");}, 1000);
		setTimeout(function() {removeDialog("hero");}, 5000);
		
	}
	if(this.health == 3)
	{
		addDialog(this.collisionList[0].GetPosition().x,this.collisionList[0].GetPosition().y,"blacksmith"+this.id,"Aaaaa, it hurts so much!!");
		setTimeout(function() {addDialog(hero.collisionList[0].GetPosition().x,hero.collisionList[0].GetPosition().y,"hero","IT'S NOT ME! IT'S NOT ME!");}, 1000);
		setTimeout(function() {removeDialog("hero");}, 5000);

	}
	if(this.health == 2)
	{
		addDialog(this.collisionList[0].GetPosition().x,this.collisionList[0].GetPosition().y,"blacksmith"+this.id,"Ghaaa....");
		setTimeout(function() {addDialog(hero.collisionList[0].GetPosition().x,hero.collisionList[0].GetPosition().y,"hero","OHH GOD!! PLEASE MAKE IT STOP!");}, 1000);
		setTimeout(function() {removeDialog("hero");}, 5000);
		
	}
	
	sfx('hit');

	if ( this.health <= 0 )
	{
		hero.depression += this.depression; 
		updateDepressionBar(hero.depression, hero.maxDepression);
		
		destroyBodies( this.collisionList );
		removeDialog("blacksmith"+this.id);
		
		addDialog(hero.collisionList[0].GetPosition().x,hero.collisionList[0].GetPosition().y,"hero","WHAT HAVE I DONE!? WHY DID I KILL HIM!?");
		setTimeout(function() {removeDialog("hero");}, 5000);
		
		this.alive = false;
	}
	
}
Blacksmith.prototype.dealDamage = function( creature ){

}

Blacksmith.prototype.collideWith = function( fixture ){
	//console.log("blacksmith collide");
}

Blacksmith.prototype.dialog = function()
{

}

Blacksmith.prototype.drawBody = function( x, y ){
	var bodyDef = new b2BodyDef();
	
	//torso
	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	var box = new b2PolygonShape();
	box.SetAsBoxXY(2.5*this.size, 3*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x + 1*this.size, y);
	this.bodyTorso = world.CreateBody(bodyDef);
	var fixture = this.bodyTorso.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

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
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-2.5*this.size, y);
	this.bodyLeftArm = world.CreateBody(bodyDef);
	var fixture = this.bodyLeftArm.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

	jd.enableLimit = true;
	jd.lowerAngle = -180 * Math.PI / 180;
	jd.upperAngle =  180 * Math.PI / 180;
	

	jd.maxMotorTorque = 175.0;
	jd.motorSpeed = -1.0;

	jd.enableMotor = true;

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
	
	//LEft arm hammer
	var box = new b2PolygonShape();
	box.SetAsBoxXY(2*this.size, 0.5*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-4*this.size, y-2*this.size);
	this.bodyLeftArmHammer = world.CreateBody(bodyDef);
	var fixture = this.bodyLeftArmHammer.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	
	jd.enableLimit = true;
	jd.lowerAngle = -0 * Math.PI / 180;
	jd.upperAngle =  0 * Math.PI / 180;
	
	var anchor = new b2Vec2(x-2.5*this.size, y-2*this.size);
	jd.InitializeAndCreate(this.bodyLeftArm, this.bodyLeftArmHammer, anchor);
	
	//LEft arm hammer top
	var box = new b2PolygonShape();
	box.SetAsBoxXY(0.5*this.size, 1.5*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-6*this.size, y-2*this.size);
	this.bodyLeftArmHammerTop = world.CreateBody(bodyDef);
	var fixture = this.bodyLeftArmHammerTop.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	
	jd.enableLimit = true;
	jd.lowerAngle = -0 * Math.PI / 180;
	jd.upperAngle =  0 * Math.PI / 180;
	
	var anchor = new b2Vec2(x-2.5*this.size, y-2*this.size);
	jd.InitializeAndCreate(this.bodyLeftArmHammer, this.bodyLeftArmHammerTop, anchor);
	
	this.collisionList = [
		//TOP INDEX = ORIGIN
		this.bodyTorso,
		this.bodyHead,
		this.bodyLeftLeg,
		this.bodyRightLeg,
		this.bodyLeftArm,
		this.bodyRightArm,
		this.bodyLeftArmHammer,
		this.bodyLeftArmHammerTop
	];
	
	this.addToUpdate();
}

Blacksmith.prototype.addToUpdate = function(){
	
	currentScene.updateList.push( createUpdate( function( self ){
		if ( self.iterations == 0 )
		{
			self.iterations = 1;
		}
		updatePositionDialog(self.args.blacksmith.collisionList[0].GetPosition().x,self.args.blacksmith.collisionList[0].GetPosition().y,"blacksmith"+self.args.blacksmith.id);
	}, 0, 1, { blacksmith: this } ) );
}


function BlobPet(){
	this.health = 10;
	this.damage = 1;
}
BlobPet.prototype.takeDamage = function(){

}
BlobPet.prototype.dealDamage = function( creature ){
	creature.takeDamage( this.damage );
}

BlobPet.prototype.drawBody = function( x, y ){
	circle = new b2CircleShape();
	circle.position.Set( 0, 0 );
	circle.radius = 0.45;
	
	var particleSystem = world.CreateParticleSystem(currentScene.map.psd);
	pgd = new b2ParticleGroupDef();
	pgd.flags = b2_elasticParticle | b2_tensileParticle;
	pgd.groupFlags = b2_solidParticleGroup;
	pgd.shape = circle;
	pgd.color.Set(255, 0, 255, 255);
	pgd.position.Set( x, y );
	var particleGroup = particleSystem.CreateParticleGroup(pgd);
	particleGroup.userData = new Blob();
	currentScene.updateList.push( createUpdate( function( self ){
		if ( self.iterations == 0 )
		{
			self.iterations = 1;
			self.delay = 100;
		}
		var particleSystem = self.args.particleSystem;	
		
		var positions = particleSystem.GetPositionBuffer();
		
		sfx('blob');
		if ( directionFromTo( positions[ 0 ], hero.collisionList[ 0 ].GetPosition().x ) == "right" ) {
			particleGroup.ApplyForce( new b2Vec2( 110, 170 * (gravity/10) ), { x: positions[0], y: positions[1] } );
		}
		else{
			particleGroup.ApplyForce( new b2Vec2( -110, 170 * (gravity/10) ), { x: positions[0], y: positions[1] } );
		}
	}, 0, 100, { particleSystem: particleSystem } ) );
}


function commonNpc( position ){
	this.position = position;
	this.health = 10;
	this.damage = 1;
	this.damageCooldown = 0;
	this.collisionList = [];
	this.size = 0.04*Math.floor((Math.random() * 8) + 1);
	this.id = "commonNpc"+Math.floor((Math.random() * 100) + 1);
}

commonNpc.prototype.takeDamage = function(){

}
commonNpc.prototype.dealDamage = function( creature ){
	if ( this.damageCooldown > 0 )
	{
		return;
	}
	this.damageCooldown = 20;
	creature.takeDamage( this.damage );
}
commonNpc.prototype.collideWith = function( fixture ){

}

commonNpc.prototype.dialog = function()
{


}
commonNpc.prototype.drawBody = function( x, y ){
	var bodyDef = new b2BodyDef();
	
	//torso
	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	var box = new b2PolygonShape();
	box.SetAsBoxXY(2.5*this.size, 3*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x + 1*this.size, y);
	this.bodyTorso = world.CreateBody(bodyDef);
	var fixture = this.bodyTorso.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

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
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-2.5*this.size, y);
	this.bodyLeftArm = world.CreateBody(bodyDef);
	var fixture = this.bodyLeftArm.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

	jd.enableLimit = true;
	jd.lowerAngle = -180 * Math.PI / 180;
	jd.upperAngle =  180 * Math.PI / 180;
	

	jd.maxMotorTorque = 175.0;
	jd.motorSpeed = -1.0;

	jd.enableMotor = true;

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
		this.bodyRightArm,
	];
	
	this.addToUpdate();
}

commonNpc.prototype.addToUpdate = function(){
	
	currentScene.updateList.push( createUpdate( function( self ){
		if ( self.iterations == 0 )
		{
			self.iterations = 1;
		}
		updatePositionDialog(self.args.blacksmith.collisionList[0].GetPosition().x,self.args.blacksmith.collisionList[0].GetPosition().y,"blacksmith"+self.args.blacksmith.id);
	}, 0, 1, { blacksmith: this } ) );
}

function Waifu( position ){
	this.position = position;
	this.health = 10;
	this.damage = 1;
	this.damageCooldown = 0;
	this.collisionList = [];
	this.size = 0.4;
	this.id = "Waifu"+Math.floor((Math.random() * 100) + 1);
}

Waifu.prototype.takeDamage = function(){

}
Waifu.prototype.dealDamage = function( creature ){
	
}
Waifu.prototype.collideWith = function( fixture ){

}

Waifu.prototype.dialog = function()
{


}
Waifu.prototype.drawBody = function( x, y ){
	var bodyDef = new b2BodyDef();
	x -= 0.8;
	//torso
	var jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	
	var box = new b2PolygonShape();
	//var xMod = 12.1;
	//var yMod = 3.5;
	var xMod = 5.65;
	var yMod = 2.45;
	x -= xMod;
	y -= yMod;
	console.log( x );
	console.log( y );
	box.vertices[0] = new b2Vec2(x + 0.6, y -1 );
	box.vertices[1] = new b2Vec2(x - 0.6, y -1 ),
	box.vertices[2] = new b2Vec2(x, y + 1 );
	
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x + (1*this.size), y);
	this.bodyTorso = world.CreateBody(bodyDef);
	var fixture = this.bodyTorso.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

	//Boobs
	
	var circle = new b2CircleShape();
	circle.radius = 0.5
	circle.position = new b2Vec2( x-0.4, y + 0.2 );
	fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = CATEGORY_DEFAULT;
	fixtureDef.filter.maskBits = MASK_DEFAULT;
	fixtureDef.density = 0.0001;
	fixtureDef.shape = circle;
	var boobFixture = this.bodyTorso.CreateFixtureFromDef(fixtureDef);
	
	circle = new b2CircleShape();
	circle.radius = 0.5
	circle.position = new b2Vec2( x+0.4, y + 0.2  );
	fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = CATEGORY_DEFAULT;
	fixtureDef.filter.maskBits = MASK_DEFAULT;
	fixtureDef.density = 0.0001;
	fixtureDef.shape = circle;
	
	boobFixture = this.bodyTorso.CreateFixtureFromDef(fixtureDef);

	x += xMod;
	y += yMod;
	//Left leg
	jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	var box = new b2PolygonShape();
	box.SetAsBoxXY(0.7*this.size, 2*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = box;
	fixtureDef.density = 40;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x+2.2*this.size, y-5*this.size);
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
	box.SetAsBoxXY(0.7*this.size, 2*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = box;
	fixtureDef.density = 40;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-0.2*this.size, y-5*this.size);
	this.bodyRightLeg = world.CreateBody(bodyDef);
	var fixture = this.bodyRightLeg.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

	jd.enableLimit = true;
	jd.lowerAngle = -45 * Math.PI / 180;
	jd.upperAngle =  45 * Math.PI / 180;
	
	var anchor = new b2Vec2(x-0.5*this.size, y-3*this.size);
	jd.InitializeAndCreate(this.bodyTorso, this.bodyRightLeg, anchor);
	
	//left arm
	xMod = 1.5;
	jd = new b2RevoluteJointDef();
	jd.collideConnected = false;
	var box = new b2PolygonShape();
	box.SetAsBoxXY(0.7*this.size, 2*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x-xMod*this.size, y);
	this.bodyLeftArm = world.CreateBody(bodyDef);
	var fixture = this.bodyLeftArm.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

	jd.enableLimit = true;
	jd.lowerAngle = -180 * Math.PI / 180;
	jd.upperAngle =  180 * Math.PI / 180;
	

	jd.maxMotorTorque = 175.0;
	jd.motorSpeed = -1.0;

	//jd.enableMotor = true;

	var anchor = new b2Vec2(x-xMod*this.size, y+2*this.size);
	jd.InitializeAndCreate(this.bodyTorso, this.bodyLeftArm, anchor);
	
	//Right arm
	xMod = 3.5;
	var box = new b2PolygonShape();
	box.SetAsBoxXY(0.7*this.size, 2*this.size);
	var fixtureDef = new b2FixtureDef();
	fixtureDef.filter.categoryBits = 0x0001
	fixtureDef.filter.maskBits = 0xFFFF;
	fixtureDef.shape = box;
	fixtureDef.density = 20;
	fixtureDef.friction = 0.2;
	bodyDef.type = b2_dynamicBody;
	bodyDef.position.Set(x+xMod*this.size, y);
	this.bodyRightArm = world.CreateBody(bodyDef);
	var fixture = this.bodyRightArm.CreateFixtureFromDef(fixtureDef);
	fixture.userData = this;

	jd.enableLimit = true;
	jd.lowerAngle = 0 * Math.PI / 180;
	jd.upperAngle = 180 * Math.PI / 180;
	
	var anchor = new b2Vec2(x+xMod*this.size, y+2*this.size);
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
		this.bodyRightArm,
	];
	
}

Waifu.prototype.addToUpdate = function(){
	
	currentScene.updateList.push( createUpdate( function( self ){
		if ( self.iterations == 0 )
		{
			self.iterations = 1;
		}
		updatePositionDialog(self.args.blacksmith.collisionList[0].GetPosition().x,self.args.blacksmith.collisionList[0].GetPosition().y,"blacksmith"+self.args.blacksmith.id);
	}, 0, 1, { blacksmith: this } ) );
}
