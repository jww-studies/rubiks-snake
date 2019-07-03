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

function getPosition(anglesVector) {
    if (anglesVector.size()[1] > 0) {
        var fullTransformationMatrix = math.identity(4);
        for (var i = 0; i < anglesVector.size()[1]; ++i) {
            const alpha = anglesVector.get([0, i]) * Math.PI / 180;
            const rotationMatrix = i % 2 == 0 ? getEvenRotationMatrix(alpha) : getOddRotationMatrix(alpha);
            const dist = i + 0.5;
            const translationMatrix1 = math.subset(math.identity(4), math.index(0, 3), -dist);
            const translationMatrix2 = math.subset(math.identity(4), math.index(0, 3), dist);
            fullTransformationMatrix = math.multiply(fullTransformationMatrix, 
                math.multiply(translationMatrix2, 
                    math.multiply(rotationMatrix, translationMatrix1)));
        }
        const result = math.multiply(fullTransformationMatrix, math.matrix([[anglesVector.size()[1]], [0], [0], [1]]));
        return math.subset(result, math.index(0, math.range(0,3)));
    }
    return null;
}