class Element {
    constructor(meshcolor, edgescolor) {
        this.mesh = new THREE.Mesh(new THREE.PolyhedronGeometry([
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
        this.edges = new THREE.EdgesHelper(this.mesh, edgescolor);
        this.edges.material.linewidth = 15;
    }

    addToScene(scene) {
        scene.add(this.mesh);
        scene.add(this.edges);
    }

    move(x, y, z) {
        this.mesh.position.x += x;
        this.mesh.position.y += y;
        this.mesh.position.z += z;

        this.edges.position.x += x;
        this.edges.position.y += y;
        this.edges.position.z += z;
    }
    
}