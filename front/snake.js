class Snake {

    elemSize = 1;
    selectionColor = 0x00FF00;

    constructor(length, color1 = 0xFFFFFF, color2 = 0x0000FF) {
        const tuple = this.generateSnake(length, color1, color2);
        this.head = tuple.head;
        this.tail = tuple.tail;
        this.length = length;
        this.angles = new Array(this.length - 1).fill(0);
    }

    //#region generation

    generateSnake(length, color1 = 0xFFFFFF, color2 = 0x0000FF) {
        var head = this.generateFirstElement(color1);
        var p = head;
        var tail = null;
        for (var i = 1; i < length; i++) {
            var mesh = i % 2 == 0 ?
                this.generateEvenElement(color1)
                : this.generateOddElement(color2);
            mesh.position.x += i == 1 ? this.elemSize / 2 : this.elemSize;
            p.add(mesh);
            p = mesh;
            if (i === length - 1) {
                tail = mesh;
            }
        }
        return { head: head, tail: tail };
    }

    
    generateFirstElement(meshcolor) {
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(0, this.elemSize / 2, - this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(0, this.elemSize / 2, this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(this.elemSize, - this.elemSize / 2, - this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(this.elemSize, - this.elemSize / 2, this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(- this.elemSize, - this.elemSize / 2, - this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(- this.elemSize, - this.elemSize / 2, this.elemSize / 2 * Math.sqrt(2)));
        geometry.faces.push(new THREE.Face3(3, 2, 0));
        geometry.faces.push(new THREE.Face3(3, 0, 1));
        geometry.faces.push(new THREE.Face3(4, 5, 0));
        geometry.faces.push(new THREE.Face3(1, 0, 5));
        geometry.faces.push(new THREE.Face3(1, 5, 3));
        geometry.faces.push(new THREE.Face3(2, 4, 0));
        geometry.faces.push(new THREE.Face3(2, 3, 4));
        geometry.faces.push(new THREE.Face3(3, 5, 4));
        geometry.computeFaceNormals();
        return new THREE.Mesh(geometry,
            new THREE.MeshLambertMaterial({ color: meshcolor }));
    }

    generateEvenElement(meshcolor) {
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(this.elemSize / 2, this.elemSize / 2, - this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(this.elemSize / 2, this.elemSize / 2, this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(this.elemSize / 2 * 3, - this.elemSize / 2, - this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(this.elemSize / 2 * 3, - this.elemSize / 2, this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(- this.elemSize / 2, - this.elemSize / 2, - this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(- this.elemSize / 2, - this.elemSize / 2, this.elemSize / 2 * Math.sqrt(2)));
        geometry.faces.push(new THREE.Face3(3, 2, 0));
        geometry.faces.push(new THREE.Face3(3, 0, 1));
        geometry.faces.push(new THREE.Face3(4, 5, 0));
        geometry.faces.push(new THREE.Face3(1, 0, 5));
        geometry.faces.push(new THREE.Face3(1, 5, 3));
        geometry.faces.push(new THREE.Face3(2, 4, 0));
        geometry.faces.push(new THREE.Face3(2, 3, 4));
        geometry.faces.push(new THREE.Face3(3, 5, 4));
        geometry.computeFaceNormals();
        return new THREE.Mesh(geometry,
            new THREE.MeshLambertMaterial({ color: meshcolor }));
    }

    generateOddElement(meshcolor) {
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(this.elemSize / 2, - this.elemSize / 2, - this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(this.elemSize / 2, - this.elemSize / 2, this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(this.elemSize / 2 * 3, this.elemSize / 2, - this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(this.elemSize / 2 * 3, this.elemSize / 2, this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(- this.elemSize / 2, this.elemSize / 2, - this.elemSize / 2 * Math.sqrt(2)));
        geometry.vertices.push(new THREE.Vector3(- this.elemSize / 2, this.elemSize / 2, this.elemSize / 2 * Math.sqrt(2)));
        geometry.faces.push(new THREE.Face3(0, 2, 3));
        geometry.faces.push(new THREE.Face3(1, 0, 3));
        geometry.faces.push(new THREE.Face3(0, 5, 4));
        geometry.faces.push(new THREE.Face3(5, 0, 1));
        geometry.faces.push(new THREE.Face3(3, 5, 1));
        geometry.faces.push(new THREE.Face3(0, 4, 2));
        geometry.faces.push(new THREE.Face3(4, 3, 2));
        geometry.faces.push(new THREE.Face3(4, 5, 3));
        geometry.computeFaceNormals();
        return new THREE.Mesh(geometry,
            new THREE.MeshLambertMaterial({ color: meshcolor }));
    }

    //#endregion

    //#region scene interaction

    addToScene(scene) {
        scene.add(this.head);
    }

    removeFromScene(scene) {
        scene.remove(this.head);
    }

    //#endregion

    //#region element properties get set

    inRange(value, min, max) {
        return (value - min) * (value - max) <= 0;
    }

    rotate(index, angle) {
        if (this.inRange(index, 0, this.length - 1)) {
            var el = this.head.children[0];
            for (var i = 0; i < index; i++) {
                el = el.children[0];
            }
            const direction = i % 2 != 0 ? -1 : 1;
            var v = new THREE.Vector3(direction / Math.sqrt(2), 1 / Math.sqrt(2), 0);
            el.rotateOnAxis(v, angle);
            el.updateMatrixWorld(true);
        }
    }

    rotateAll(arr) {
        var el = this.head.children[0];
        for (var i = 0; i < arr.length; i++) {
            const direction = i % 2 != 0 ? -1 : 1;
            var v = new THREE.Vector3(direction / Math.sqrt(2), 1 / Math.sqrt(2), 0);
            el.rotateOnAxis(v, (arr[i] - this.angles[i]) * Math.PI / 180);
            el.updateMatrixWorld(true);
            el = el.children[0];
        }
        this.angles = arr;
    }

    setAngle(index, angle) {
        if (this.inRange(index, 0, this.length - 1)) {
            if (this.angles[index] !== angle) {
                this.rotate(index, (angle - this.angles[index]) * Math.PI / 180);
                this.angles[index] = angle;
            }
        }
    }

    getAngle(index) {
        if (this.inRange(index, 0, this.length - 1)) {
            return this.angles[index];
        }
        return 0;
    }

    select(index) {
        if (this.inRange(index, 0, this.length - 1)) {
            if (this.selectedElement != null) {
                this.selectedElement.material.color.setHex(this.oldColor);
            }
            var el = this.head.children[0];
            for (var i = 0; i < index; i++) {
                el = el.children[0];
            }
            this.oldColor = el.material.color.getHex();
            this.selectedElement = el;
            el.material.color.setHex(this.selectionColor);
        }
    }

    //#endregion

    getLastElementPosition() {
        this.head.updateMatrix();
        this.head.updateMatrixWorld(true);
        return this.tail.localToWorld(new THREE.Vector3(this.elemSize / 2, 0, 0));
    }
}