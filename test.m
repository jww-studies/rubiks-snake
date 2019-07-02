function angleArr = test(position, len)

angleArr = zeros(1, len);

acc = 1;

while acc > 0.02
    pos = getPosition(angleArr) - [position; 1];
    approx = getDerrivativeApproximation(angleArr, 1);
    p = -pos(1:3) \ approx;
    angleArr = angleArr + p;
    positionApprox = getPosition(angleArr);
    positionApprox = positionApprox(1:3)
    acc = norm(positionApprox - position(1:3));
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
   dist = i - 0.5;
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

function derrivativeMatrix = getDerrivativeApproximation(angleArr, h)

L = length(angleArr);
derrivativeMatrix = zeros(3, L);
pos = getPosition(angleArr);

for i = 1:L
    angleArr1 = angleArr;
    angleArr2 = angleArr;
    angleArr1(i) = angleArr1(i) + h;
    angleArr2(i) = angleArr2(i) + 2 * h;
    tmp = -3 * pos + 4 * getPosition(angleArr1) - getPosition(angleArr2);
    derrivativeMatrix(:,i) = tmp(1:3) / h / 2;
end

end
