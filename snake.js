class Snake {

    constructor(length, color1 = 0xFFFFFF, color2 = 0x0000FF) {
        this.array = this.generateArray(length, color1, color2);
    }

    generateArray(length, color1 = 0xFFFFFF, color2 = 0x0000FF) {
        var array = [];
        var yy = 0;
        for (var i = 0; i < length; i++) {
            var mesh = this.generateSingleElement(i % 2 === 0 ? color1 : color2);
            if (i % 2 === 0) { 
                yy += 3.5;
            } else {
                mesh.rotation.x += Math.PI;
            }
            mesh.position.y += yy;
            array.push(mesh);
        }
        return array;
    }

    generateSingleElement(meshcolor) {
        return new THREE.Mesh(new THREE.PolyhedronGeometry([
            -1,-1,-1,
            -1, 1,-1,
             1, 1,-1,
             1,-1,-1,
            -1,-1, 1,
             1,-1, 1
        ], [
            0,1,3, 2,3,1,
            3,5,4, 0,3,4,
            5,2,1, 1,4,5,
            5,3,2, 0,4,1,
        ], 3, 0),
        new THREE.MeshLambertMaterial({color: meshcolor}));
    }

    addToScene(scene) {
        this.array.forEach((el) => scene.add(el));
    }
}