function getEvenRotationMatrix(alpha) {
    return math.matrix([
        [0.5 * (1 + Math.cos(alpha)), -0.5 * (1 - Math.cos(alpha)), 1 / Math.sqrt(2) * Math.sin(alpha), 0],
        [-0.5 * (1 - Math.cos(alpha)), 0.5 * (1 + Math.cos(alpha)), 1 / Math.sqrt(2) * Math.sin(alpha), 0],
        [-1 / Math.sqrt(2) * Math.sin(alpha), -1 / Math.sqrt(2) * Math.sin(alpha), Math.cos(alpha), 0],
        [0, 0, 0, 1]
    ]);
}

function getOddRotationMatrix(alpha) {
    return math.matrix([
        [0.5 * (1 + Math.cos(alpha)), 0.5 * (1 - Math.cos(alpha)), 1 / Math.sqrt(2) * Math.sin(alpha), 0],
        [0.5 * (1 - Math.cos(alpha)), 0.5 * (1 + Math.cos(alpha)), -1 / Math.sqrt(2) * Math.sin(alpha), 0],
        [-1 / Math.sqrt(2) * Math.sin(alpha), 1 / Math.sqrt(2) * Math.sin(alpha), Math.cos(alpha), 0],
        [0, 0, 0, 1]
    ]);
}

function getPosition(anglesVector, size) {
    if (size > 0) {
        var fullTransformationMatrix = math.identity(4);
        for (var i = 0; i < size; ++i) {
            const alpha = math.subset(anglesVector, math.index(i, 0)) * Math.PI / 180;
            const rotationMatrix = i % 2 == 0 ? getEvenRotationMatrix(alpha) : getOddRotationMatrix(alpha);
            const dist = i + 0.5;
            const translationMatrix1 = math.subset(math.identity(4), math.index(0, 3), -dist);
            const translationMatrix2 = math.subset(math.identity(4), math.index(0, 3), dist);
            fullTransformationMatrix = math.multiply(fullTransformationMatrix, 
                math.multiply(translationMatrix2, 
                    math.multiply(rotationMatrix, translationMatrix1)));
        }
        const result = math.multiply(fullTransformationMatrix, math.matrix([[size], [0], [0], [1]]));
        return math.subset(result, math.index(math.range(0,3), 0));
    }
    return null;
}

function getDerrivativeApproximation(anglesVector, size) {
    const h = 0.5;
    //console.log(math.size(anglesVector));
    var derrivativeMatrix = math.zeros(3, size);
    var pos = math.multiply(getPosition(anglesVector, size), -3);
    for (var i = 0; i < size; i++) {
        const val = math.subset(anglesVector, math.index(i, 0));
        const anglesVector1 = math.subset(anglesVector, math.index(i, 0), val + h);
        const anglesVector2 = math.subset(anglesVector, math.index(i, 0), val + 2 * h);
        var pos1 = math.multiply(getPosition(anglesVector1, size), 4);
        var pos2 = math.multiply(getPosition(anglesVector2, size), -1);
        const F = math.multiply(math.add(math.add(pos, pos1), pos2), 1 / (2 * h));
        derrivativeMatrix = math.subset(derrivativeMatrix, math.index([0, 1, 2], i), math.subset(F, math.index([0, 1, 2], 0)));
    }
    return derrivativeMatrix;
}

function solveLinerarEq(A, b, size) {
    const qr = math.qr(math.transpose(A));
    const R1 = math.subset(qr.R, math.index(math.range(0,3), math.range(0,3)));
    const tmp = math.subset(math.zeros(size,1), 
        math.index(math.range(0,3), 0), 
        math.multiply(math.inv(math.transpose(R1)), b));
    const result = math.multiply(qr.Q, tmp);
    return result;
}

function getShift(anglesVector, position, size) {
    var derrivativeMatrix = getDerrivativeApproximation(anglesVector, size);
    var prevSolution = math.subtract(position, getPosition(anglesVector, size));
    return solveLinerarEq(derrivativeMatrix, prevSolution, size);
}