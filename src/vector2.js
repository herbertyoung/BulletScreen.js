/*

Vector2.js
A JavaScript library for point and 2D vector calculation
By Harbor Young
Email: szuyhb241@gmail.com

*/

// a point with coordinate values
function Point(x, y){
	this.x = x;
	this.y = y;
}
Point.prototype = {
	// calculate a end point of a 2D verctor
	add: function(vector){
		return new Point(this.x + vector.x, this.y + vector.y);
	},
	// calculate a starting point of a 2D verctor
	sub: function(vector){
		return new Point(this.x - vector.x, this.y - vector.y);
	}
};
Point.prototype.constructor = Point;

// a 2D vector represented by coordinates
function Vector2(x, y){
	Point.call(this, x, y);
}
Vector2.prototype = Object.create(Point.prototype);
Vector2.prototype.constructor = Vector2;

// vector addition
Vector2.prototype.add = function(vector){
	return new Vector2(this.x + vector.x, this.y + vector.y);
}
// vector subtraction
Vector2.prototype.sub = function(vector){
	return new Vector2(this.x - vector.x, this.y - vector.y);
}
// vector and scalar multiplication
Vector2.prototype.mult = function(scalar){
	return new Vector2(this.x * scalar, this.y * scalar);
}
// vector and scalar division
Vector2.prototype.div = function(scalar){
	return new Vector2(this.x / scalar, this.y / scalar);
}