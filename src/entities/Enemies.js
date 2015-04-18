function Blob(){
	this.health = 10;
	this.damage = 1;
}
Blob.prototype.takeDamage = function(){

}
Blob.prototype.dealDamage = function( creature ){
	creature.takeDamage( this.damage );
}
