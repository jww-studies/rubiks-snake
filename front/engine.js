class Engine {

    constructor(sceneWidth, sceneHeight) {
        const dist = 20;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75,
            sceneWidth / sceneHeight,
            0.1,
            1000
        );
        this.camera.position.set(-dist, dist, -dist);

        this.light = new THREE.PointLight(0xFFFFFF);
        this.scene.add(this.light);
        this.light.position.set(
            this.camera.position.x,
            this.camera.position.y,
            this.camera.position.z);

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setClearColor("#e5e5e5");
        this.renderer.setSize(sceneWidth, sceneHeight);

        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    }

    resizeScene(width, height) {
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    onRequestAnimationFrame() {
        this.light.position.set(
            this.camera.position.x, 
            this.camera.position.y, 
            this.camera.position.z);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}