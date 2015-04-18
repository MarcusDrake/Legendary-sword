function Hero(){
	this.health = 10;
	this.damage = 0;
}
Hero.prototype.takeDamage = function( damage ){
	this.health -= damage;
	console.log( this.health );
}
