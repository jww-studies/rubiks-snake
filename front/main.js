DEFAULT_LENGHT = 24;
const X = ko.observable(0);
const Y = ko.observable(0);
const Z = ko.observable(0);
const selectedId = ko.observable(0);
const angle = ko.observable(0);
var len = DEFAULT_LENGHT;
var snake;

function run() {
    const mainDiv = document.getElementById('main-div');
    const selection = document.getElementById('select-id');
    const engine = new Engine(mainDiv.offsetWidth, window.innerHeight);
    mainDiv.appendChild(engine.renderer.domElement);
    window.addEventListener('resize', 
        () => engine.resizeScene(mainDiv.offsetWidth, window.innerHeight));
        
    const render = function() {
        requestAnimationFrame(render);
        engine.onRequestAnimationFrame(engine);
    }
    
    const viewModel = new function ViewModel() {
        this.angleValue = angle;
        this.xValue = X;
        this.yValue = Y;
        this.zValue = Z;
        this.selectedValue = selectedId;
    };
    ko.applyBindings(viewModel);
    
    snake = setSnake(DEFAULT_LENGHT, engine.scene);
             
    angle.subscribe( (newValue) => {
        if(newValue > 180) {
            angle(180);
        }
        if(newValue < -180) {
            angle(-180);
        }
        if(newValue >= -180 && newValue <= 180) {
            const index = selectedId();
            snake.setAngle(index, newValue);
            updatePositionLabel(snake.getLastElementPosition());
        }
    });

    selectedId.subscribe( (newSelected) => {
        angle(snake.getAngle(newSelected));
        snake.select(newSelected);
    });
    
    $('#submit-form').submit((e) => {
        e.preventDefault();
        if(document.getElementById('snake-len').value) {
            len = document.getElementById('snake-len').value;
        }
        snake = setSnake(len, engine.scene);
        angle(0);
    });

    document.getElementById('solve-btn').addEventListener('click', solve);

    render();
}

function setSnake(lenght, scene) {
    if (scene.children[1]) {
        scene.remove(scene.children[1]);
    }
    setDropdown(lenght);
    const s = new Snake(lenght);
    s.addToScene(scene);
    s.select(0);

    updatePositionLabel(s.getLastElementPosition());

    return s;
}

function updatePositionLabel(v) {
    X(Math.round(v.x * 100) / 100);
    Y(Math.round(v.y * 100) / 100);
    Z(Math.round(v.z * 100) / 100);
}

function setDropdown(length) {
    var selection = document.getElementById('select-id');
    var first = selection.firstElementChild; 
    while (first) { 
        first.remove(); 
        first = selection.firstElementChild; 
    }
    for (var i = 0; i < length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerHTML = 'Element ' + (i  + 1);
        selection.appendChild(option);
    }
}

function solve() {
    document.getElementById('solve-btn').setAttribute('disabled', true);
    
    $.get(
        "https://snakesolverfunc.azurewebsites.net/api/Solve",
        {x : X(), y: Y(), z: Z(), len: len - 1},
        function(data) {
           var anglesArray = data;
           if(anglesArray == null) {
               alert("Last element cannot be in given position");
           } else {
               snake.rotateAll(anglesArray);
               angle(snake.getAngle(selectedId()));
           }
           document.getElementById('solve-btn').removeAttribute('disabled');
        }
    ).fail(function() {
        alert('There was an error during solving'); // or whatever
    });;
}
