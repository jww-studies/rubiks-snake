class Snake {

    elemSize = 1;
    selectionColor =  0x00FF00;

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
                mesh.position.x += this.elemSize * 2;
            if (i % 2 == 0) { 
            }
            p.add(mesh);
            p = mesh;
        }
        return head;
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

    rotate(i, angle) {
        const index = parseInt(i, 0);
        if(index > 0 && index < this.length) {
            var el = this.head;
            for(var i = 0; i < index; i++) {
                el = el.children[0];
            }
            const direction = i % 2 == 0 ? -1 : 1;
            var v = new THREE.Vector3(1 / Math.sqrt(2), direction / Math.sqrt(2), 0);
            el.rotateOnAxis(v, angle);
        }
    }

    select(i) {
        const index = parseInt(i, 0);
        if(index > 0 && index < this.length) {
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
}