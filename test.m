function angleArr = test(position)
%TEST Summary of this function goes here
%   Detailed explanation goes here
angleArr = zeros(1,5);
pos = getPosition(angleArr) - [position; 1];
approx = getDerrivativeApproximation(angleArr);
p = -pos(1:3) \ approx;
angleArr = angleArr + p;
positionApprox = getPosition(angleArr);
positionApprox = positionApprox(1:3);
while norm(positionApprox - position(1:3)) > 0.01
    pos = getPosition(angleArr) - [position; 1];
    approx = getDerrivativeApproximation(angleArr);
    p = -pos(1:3) \ approx;
    angleArr = angleArr + p;
    positionApprox = getPosition(angleArr);
    positionApprox = positionApprox(1:3)
end
end

function matrix = getEvenRotationMatrix(angle)

alpha = pi / 180 * angle;

matrix = [
    0.5*(1+cos(alpha)) -0.5*(1-cos(alpha)) sin(alpha)/sqrt(2) 0;
    -0.5*(1-cos(alpha)) 0.5*(1+cos(alpha)) sin(alpha)/sqrt(2) 0;
    -sin(alpha)/sqrt(2) -sin(alpha)/sqrt(2) cos(alpha) 0;
    0 0 0 1;
    ];

end

function matrix = getOddRotationMatrix(angle)

alpha = pi / 180 * angle;

matrix = [
    0.5*(1+cos(alpha)) 0.5*(1-cos(alpha)) sin(alpha)/sqrt(2) 0;
    0.5*(1-cos(alpha)) 0.5*(1+cos(alpha)) -sin(alpha)/sqrt(2) 0;
    -sin(alpha)/sqrt(2) sin(alpha)/sqrt(2) cos(alpha) 0;
    0 0 0 1;
    ];

end

function position = getPosition(angleArr)

L = length(angleArr);
position = [L; 0; 0; 1];

for i = L:-1:1
   if mod(i,2) == 0
       rotationMatrix = getEvenRotationMatrix(angleArr(i));
   else
       rotationMatrix = getOddRotationMatrix(angleArr(i));
   end
   dist = i - 1;
   position = [
       1 0 0 dist;
       0 1 0 0;
       0 0 1 0;
       0 0 0 1] * rotationMatrix * [
       1 0 0 -dist;
       0 1 0 0;
       0 0 1 0;
       0 0 0 1] * position;   
end

end

function derrivativeMatrix = getDerrivativeApproximation(angleArr)

L = length(angleArr);
derrivativeMatrix = zeros(3, L);
h = 0.01;
pos = getPosition(angleArr);

for i = 1:L
    angleArrPlusH = angleArr;
    angleArrPlusH(i) = angleArrPlusH(i) + h;
    tmp = getPosition(angleArrPlusH) - pos;
    derrivativeMatrix(:,i) = tmp(1:3) / h;
end

end
