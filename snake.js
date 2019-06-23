class Snake {

    elemSize = 1;
    selectionColor =  0x00FF00;

    constructor(length, color1 = 0xFFFFFF, color2 = 0x0000FF) {
        const tuple = this.generateSnake(length, color1, color2);
        this.head = tuple.head;
        this.tail = tuple.tail;
        this.length = length;
        this.angles = new Array(this.length).fill(0);
    }

    generateSnake(length, color1 = 0xFFFFFF, color2 = 0x0000FF) {
        var head = this.generateEvenElement(color1);
        var p = head;
        var tail = null;
        for (var i = 1; i < length; i++) {
            var mesh = i % 2 == 0 ?
                this.generateEvenElement(color1)
                : this.generateOddElement(color2);
                mesh.position.x += this.elemSize * 2;
            p.add(mesh);
            p = mesh;
            if(i === length - 1) {
                tail = mesh;
            }
        }
        return {head: head, tail: tail};
    }

    generateEvenElement(meshcolor) {
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( 1, 1,-Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3( 1, 1, Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3( 3,-1,-Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3( 3,-1, Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(-1,-1,-Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(-1,-1, Math.sqrt(2)));
        geometry.faces.push(new THREE.Face3(3,2,0));
        geometry.faces.push(new THREE.Face3(3,0,1));
        geometry.faces.push(new THREE.Face3(4,5,0));
        geometry.faces.push(new THREE.Face3(1,0,5));
        geometry.faces.push(new THREE.Face3(1,5,3));
        geometry.faces.push(new THREE.Face3(2,4,0));
        geometry.faces.push(new THREE.Face3(2,3,4));
        geometry.faces.push(new THREE.Face3(3,5,4));
        geometry.computeFaceNormals();
        return new THREE.Mesh(geometry,
        new THREE.MeshLambertMaterial({color: meshcolor}));
    }

    generateOddElement(meshcolor) {
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3( 1,-1,-Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3( 1,-1, Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3( 3, 1,-Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3( 3, 1, Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(-1, 1,-Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(-1, 1, Math.sqrt(2)));
        geometry.faces.push(new THREE.Face3(0,2,3));
        geometry.faces.push(new THREE.Face3(1,0,3));
        geometry.faces.push(new THREE.Face3(0,5,4));
        geometry.faces.push(new THREE.Face3(5,0,1));
        geometry.faces.push(new THREE.Face3(3,5,1));
        geometry.faces.push(new THREE.Face3(0,4,2));
        geometry.faces.push(new THREE.Face3(4,3,2));
        geometry.faces.push(new THREE.Face3(4,5,3));
        geometry.computeFaceNormals();
        return new THREE.Mesh(geometry,
        new THREE.MeshLambertMaterial({color: meshcolor}));
    }

    addToScene(scene) {
        scene.add(this.head);
    }

    removeFromScene(scene) {
        scene.remove(this.head);
    }

    rotate(index, angle) {
        //const index = parseInt(i, 0);
        if(index > 0 && index < this.length) {
            var el = this.head;
            for(var i = 0; i < index; i++) {
                el = el.children[0];
            }
            const direction = i % 2 == 0 ? -1 : 1;
            var v = new THREE.Vector3(direction / Math.sqrt(2), 1 / Math.sqrt(2), 0);
            el.rotateOnAxis(v, angle);
            el.updateMatrixWorld(true);
        }
    }

    setAngle(index, angle) {
        if(parseInt(index, 0) > 0 && parseInt(index, 0) < this.length) {
            if(this.angles[index] !== angle) {
                this.rotate(index, (angle - this.angles[index]) * Math.PI / 180);
                this.angles[index] = angle;
            }
        }
    }

    getAngle(index) {
        if(parseInt(index, 0) > 0 && parseInt(index, 0) < this.length) {
            return this.angles[index];
        }
        return 0;
    }

    select(index) {
        if(parseInt(index, 0) > 0 && parseInt(index, 0) < this.length) {
            if (this.selectedElement != null) {
                this.selectedElement.material.color.setHex(this.oldColor);
            }
            var el = this.head;
            for(var i = 0; i < index; i++) {
                el = el.children[0];
            }
            this.oldColor = el.material.color.getHex();
            this.selectedElement = el;
            el.material.color.setHex(this.selectionColor);
        }
    }

    getEvenRotationMatrix(alpha) {
        return math.matrix([[0.5 * (1 + Math.cos(alpha)), -0.5 * (1 - Math.cos(alpha)), 1 / Math.sqrt(2) * Math.sin(alpha), 0],
                            [-0.5 * (1 - Math.cos(alpha)), 0.5 * (1 + Math.cos(alpha)), 1 / Math.sqrt(2) * Math.sin(alpha), 0],
                            [-1 / Math.sqrt(2) * Math.sin(alpha), -1 / Math.sqrt(2) * Math.sin(alpha), Math.cos(alpha), 0],
                            [0, 0, 0, 1]]);
    }

    getOddRotationMatrix(alpha) {
        return math.matrix([[0.5 * (1 + Math.cos(alpha)), 0.5 * (1 - Math.cos(alpha)), 1 / Math.sqrt(2) * Math.sin(alpha), 0],
                            [0.5 * (1 - Math.cos(alpha)), 0.5 * (1 + Math.cos(alpha)), -1 / Math.sqrt(2) * Math.sin(alpha), 0],
                            [-1 / Math.sqrt(2) * Math.sin(alpha), 1 / Math.sqrt(2) * Math.sin(alpha), Math.cos(alpha), 0],
                            [0, 0, 0, 1]]);
    }

    getLastElementPosition(manuallyCalculated = false) {
        console.log(this.length);
        if(manuallyCalculated) {
            var resultMatrix = math.identity(4);
            for (var i = 1; i < this.length; ++i) {
                const ang = this.angles[i] * Math.PI / 180;
                const rotationMatrix = i % 2 == 0 ? this.getEvenRotationMatrix(ang) : this.getOddRotationMatrix(ang);
                const translationMatrix1 = math.subset(math.identity(4), math.index(0, 3), -2 * i);
                const translationMatrix2 = math.subset(math.identity(4), math.index(0, 3), 2 * i);
                const tmp = math.multiply(translationMatrix2, math.multiply(rotationMatrix, translationMatrix1));
                resultMatrix = math.multiply(resultMatrix, tmp);
            }
            const lastElement = math.multiply(resultMatrix, math.matrix([[2 * (this.length - 1)], [0], [0], [1]]));
            return new THREE.Vector3(math.subset(lastElement, math.index(0,0)), math.subset(lastElement, math.index(1,0)), math.subset(lastElement, math.index(2,0)));
        } else {
            this.head.updateMatrix();
            this.head.updateMatrixWorld(true);
            return this.tail.localToWorld(new THREE.Vector3(0,0,0));
        }
    }

    
}