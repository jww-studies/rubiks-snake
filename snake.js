class Snake {

    elemSize = 1.16;

    constructor(length, color1 = 0xFFFFFF, color2 = 0x0000FF) {
        this.head = this.generateSnake(length, color1, color2);
        this.length = length;
    }

    generateSnake(length, color1 = 0xFFFFFF, color2 = 0x0000FF) {
        var head = this.generateEvenElement(color1);
        var p = head;
        for (var i = 1; i < length; i++) {
            var mesh = i % 2 == 0 ?
                this.generateEvenElement(color1)
                : this.generateOddElement(color2);
            if (i % 2 == 0) { 
                mesh.position.y += this.elemSize;
            }
            p.add(mesh);
            p = mesh;
        }
        return head;
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
        scene.add(this.head);
    }

    rotate(index, angle) {
        if(index > 0 && index < this.length) {
            var el = this.head;
            for(var i = 0; i < index; i++) {
                el = el.children[0];
            }
            var v = index % 2 == 0 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(0, 1 / Math.sqrt(2), 1 / Math.sqrt(2));
            el.rotateOnAxis(v, angle);
        }
    }
}