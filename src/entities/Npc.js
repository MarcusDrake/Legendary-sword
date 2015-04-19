function Blacksmith( position ){
	this.position = position;
	this.health = 10;
	this.damage = 1;
	this.damageCooldown = 0;
	this.collisionList = [];
	this.size = 0.3;
}

Blacksmith.prototype.takeDamage = function(){

}
Blacksmith.prototype.dealDamage = function( creature ){
	if ( this.damageCooldown > 0 )
	{
		return;
	}
	this.damageCooldown = 20;
	creature.takeDamage( this.damage );
}
Blacksmith.prototype.collideWith = function( fixture ){

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
}
/*
function makeTextSprite( message, parameters )
{
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 4;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };


	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
    
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;
	
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;
	//roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.
	
	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";

	context.fillText( message, borderThickness, fontsize + borderThickness);
	
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture, useScreenCoordinates: false} );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(100,50,1.0);
	return sprite;	
}*/


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
	circle.radius = 0.25;
	
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
			particleGroup.ApplyForce( new b2Vec2( 110, 170 ), { x: positions[0], y: positions[1] } );
		}
		else{
			particleGroup.ApplyForce( new b2Vec2( -110, 170 ), { x: positions[0], y: positions[1] } );
		}
	}, 0, 100, { particleSystem: particleSystem } ) );
}
