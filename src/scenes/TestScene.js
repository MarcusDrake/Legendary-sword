function TestScene() {
	
	var data = res.compiledExample;
	
    
	camera.position.x = 4;
	camera.position.y = 4;
	camera.position.z = 12;

	var bd = new b2BodyDef();
	var ground = world.CreateBody(bd);
	bd.type = b2_dynamicBody;
	bd.allowSleep = false;
	bd.position.Set(0, 1);
	var body = world.CreateBody(bd);
	var psd = new b2ParticleSystemDef();
	psd.radius = 0.045;
	psd.dampingStrength = 0.2;
	var particleSystem = world.CreateParticleSystem(psd);
	for ( var x = 0; x < data.grid.length; x++ )
	{
		for ( var y = 0; y < data.grid[ x ].length; y++ )
		{
			var tile = data.grid[ x ][ y ];
			if ( tile.collision == true )
			{
				var b1 = new b2PolygonShape();
				b1.SetAsBoxXY(0.5, 0.5);
				bd.type = b2_kinematicBody;
				bd.position.Set( x, y );
				var body = world.CreateBody(bd);
				body.CreateFixtureFromShape( b1 );
			}
			if ( tile.water == true )
			{
				var box = new b2PolygonShape();
				box.SetAsBoxXYCenterAngle(0.5, 0.5, new b2Vec2(x + 0, y + 0), 0);

				var particleGroupDef = new b2ParticleGroupDef();
				particleGroupDef.shape = box;
				var particleGroup = particleSystem.CreateParticleGroup(particleGroupDef);
			}
			if ( tile.chain == true )
			{
				var prevBody = body;
				for (var i = 0; i < 10; i++) {
					var jd = new b2RevoluteJointDef();
					jd.collideConnected = false;
					var box = new b2PolygonShape();
					box.SetAsBoxXY(0.04, 0.08);
					var fixtureDef = new b2FixtureDef();
					fixtureDef.shape = box;
					fixtureDef.density = 5;
					fixtureDef.friction = 0.2;
					bd.type = b2_dynamicBody;
					
					var yOffset = y - ( i * 0.08 ) + 0.3;
					bd.position.Set( x, yOffset + 0.05 );
					var body = world.CreateBody(bd);
					body.CreateFixtureFromDef(fixtureDef);

					var anchor = new b2Vec2(x, yOffset );
					jd.InitializeAndCreate(prevBody, body, anchor);
					prevBody = body;
				}
			}
			if ( tile.boulder == true )
			{
				var circle = new b2CircleShape();
				circle.radius = 0.4;
				fd = new b2FixtureDef();
				fd.shape = circle;
				fd.density = 100;
				bd = new b2BodyDef();
				bd.type = b2_dynamicBody;
				bd.position.Set( x, y );
				
				
                /*context.save();
                context.translate(x, y);
                context.rotate(b.GetAngle());
                context.drawImage(image, -25, -25);
                context.restore();
				*/
				
				body = world.CreateBody(bd);
				body.CreateFixtureFromDef(fd);
			}
			if ( tile.rampright == true )
			{
				var shape = new b2PolygonShape();
				shape.vertices[0] = new b2Vec2(0.5 + x, -0.5 + y);
				shape.vertices[1] = new b2Vec2(0.5 + x, 0.5 + y),
				shape.vertices[2] = new b2Vec2(-0.5 + x, -0.5 + y);
				ground.CreateFixtureFromShape(shape, 0);
			}
			if ( tile.rampleft == true )
			{
				var shape = new b2PolygonShape();
				shape.vertices[0] = new b2Vec2(0.5 + x, -0.5 + y);
				shape.vertices[1] = new b2Vec2(-0.5 + x, -0.5 + y),
				shape.vertices[2] = new b2Vec2(-0.5 + x, 0.5 + y);
				ground.CreateFixtureFromShape(shape, 0);
			}
		}
	}
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
