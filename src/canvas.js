const Gender = {
    Male    : 0,
    Female  : 1,
}

class Character {
    constructor(meshes, animationGroups, headCnt, bodyCnt, legCnt) {
        this.meshes = meshes;
        this.animationGroups = animationGroups;
        this.headCnt = headCnt;
        this.bodyCnt = bodyCnt;
        this.legCnt = legCnt;
        this.desiredHead = Math.floor(Math.random() * 10);
        this.desiredBody = Math.floor(Math.random() * 10);
        this.desiredLeg = Math.floor(Math.random() * 10);
    }
}

var canvas;
var engine;
var scene;

var char;

var gender;

async function createCharCustomize() {

    canvas = document.getElementById("canvas_main");
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);
    //scene.clearColor = new BABYLON.Color3(0.2, 0, 0.6);
    //scene.clearColor = new BABYLON.Color3(26/255, 43/255, 104/255);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    //
    // Character
    //
    gender = Math.floor(Math.random() * 2);

    // create male
    const { meshes, animationGroups } = await BABYLON.SceneLoader.ImportMeshAsync("", "./assets/glb/", gender == Gender.Male ? "m_char.glb" : "f_char.glb", scene);

    var headCnt = -1, bodyCnt = -1, legCnt = -1;
    for (var i = 1; i < meshes.length; i++) {
        if (meshes[i].name.includes("head_"))
            headCnt++;
        if (meshes[i].name.includes("body_"))
            bodyCnt++;
        if (meshes[i].name.includes("leg_"))
            legCnt++;
    }
    char = new Character(meshes, animationGroups, headCnt, bodyCnt, legCnt);
    animationGroups[1].play(true);
    meshes[0].scaling.scaleInPlace(1.5);

    for (var i = 1; i < char.meshes.length; i++) {

        if (char.meshes[i].name == ("head_" + char.desiredHead) == false
            && char.meshes[i].name == ("body_" + char.desiredBody) == false
            && char.meshes[i].name == ("leg_" + char.desiredLeg) == false
            && (char.meshes[i].name == "base") == false) {
            char.meshes[i].setEnabled(false);
        } else {
            char.meshes[i].setEnabled(true);
        }
    }

    //
    // Light
    //
    var light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    //
    //CAMERA
    //
    var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(60), 0, new BABYLON.Vector3(0, 1.5, 0), scene);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 5;
    camera.lowerBetaLimit = 1.5;
    camera.upperBetaLimit = 1.5;
    camera.attachControl(canvas, true);
    camera.inputs.attached.pointers.buttons = [1]; //wheel click change position for camera
    camera.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    // run the render loop
    engine.runRenderLoop(function() {
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function() {
        engine.resize();
    });
}