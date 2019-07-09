# Rubik's Snake
It's web application showing 3D model of Rubik's snake which allows to:

 - set rotation angles of particular elements,
 - get position of last element according to the first one
 - solve reverse problem - rotate particular elements to move last element to given position

Reverse problem is solved by iterative Newton method with accuracy 0.01 (norm of subtraction of accurate result and approximation).
Limit for iterations ins solving is constant and equal to 2000.

Used technologies:

 - **frontend:**
	 - pure JavaScript with HTML
	 - Bootstrap for styling
	 - ThreeJS graphics engine
 - **backend:**
	 - C#  (.NET Core)
	 - Math.NET Numerics Library for solving
	 - Azure Functions for deployment 

Deployed application is available under address:
http://rubiks-snake.s3-website.eu-central-1.amazonaws.com/
