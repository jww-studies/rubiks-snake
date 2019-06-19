class Snake {

    elemSize = 1.16;

    constructor(length, color1 = 0xFFFFFF, color2 = 0x0000FF) {
        this.array = this.generateArray(length, color1, color2);
        this.vectors = [];
        for(var i = 0; i < this.array.length; i++) {
            if (i % 2 == 0) {
                this.vectors.push(new THREE.Vector3(0, 1, 0));
            } else {
                this.vectors.push(new THREE.Vector3(0, 1 / Math.sqrt(2), 1 / Math.sqrt(2)));
            }
        }
    }

    generateArray(length, color1 = 0xFFFFFF, color2 = 0x0000FF) {
        var array = [];
        var yy = 0;
        for (var i = 0; i < length; i++) {
            var mesh = i % 2 === 0 ?
                this.generateEvenElement(color1)
                : this.generateOddElement(color2);
            if (i % 2 === 0) { 
                yy += this.elemSize;
            }
            mesh.position.y += yy;
            array.push(mesh);
        }
        return array;
    }

    generateEvenElement(meshcolor) {
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
        ], 0, 0),
        new THREE.MeshLambertMaterial({color: meshcolor}));
    }

    generateOddElement(meshcolor) {
        return new THREE.Mesh(new THREE.PolyhedronGeometry([
            -1, 1, 1,
            -1,-1, 1,
             1,-1, 1,
             1, 1, 1,
            -1, 1,-1,
             1, 1,-1
        ], [
            0,1,3, 2,3,1,
            3,5,4, 0,3,4,
            5,2,1, 1,4,5,
            5,3,2, 0,4,1,
        ], 0, 0),
        new THREE.MeshLambertMaterial({color: meshcolor}));
    }

    addToScene(scene) {
        this.array.forEach((el) => scene.add(el));
    }

    rotate(index, angle) {
        if(index > 0 && index < this.array.length) {
            var dd = 0;
            for(var i = index; i < this.array.length; i++) {
                var el = this.array[i];
                var v = new THREE.Vector3(0, 1 / Math.sqrt(2), 1 / Math.sqrt(2));
                var v1 = new THREE.Vector3(0, 1, 0);

                el.translateOnAxis(v1, -dd);

                el.rotateOnAxis(this.vectors[index], angle);

                el.translateOnAxis(v1, dd);

                if (i % 2 == 1) {
                    dd += this.elemSize;
                }
            }
        }
    }
}