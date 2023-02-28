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

var m_char;
var f_char;

var gender;

async function createCharCustomize() {

    canvas = document.getElementById("canvas_main");
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);
    //scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    scene.clearColor = new BABYLON.Color3(0.2, 0, 0.6);

    //
    // Character
    //

    // create male
    const { meshes: m_meshes, animationGroups: m_animationGroups } = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/glb/", "m_char.glb", scene);
   
    var m_headCnt = -1, m_bodyCnt = -1, m_legCnt = -1;
    for (var i = 1; i < m_meshes.length; i++) {
        if (m_meshes[i].name.includes("head_"))
            m_headCnt++;
        if (m_meshes[i].name.includes("body_"))
            m_bodyCnt++;
        if (m_meshes[i].name.includes("leg_"))
            m_legCnt++;
    }
    m_char = new Character(m_meshes, m_animationGroups, m_headCnt, m_bodyCnt, m_legCnt);
    m_animationGroups[1].play(true);
    m_meshes[0].scaling.scaleInPlace(1.5);

    // create female
    const { meshes: f_meshes, animationGroups: f_animationGroups } = await BABYLON.SceneLoader.ImportMeshAsync("", "/assets/glb/", "f_char.glb", scene);

    var f_headCnt = -1, f_bodyCnt = -1, f_legCnt = -1;
    for (var i = 1; i < f_meshes.length; i++) {

        if (f_meshes[i].name.includes("head_"))
            f_headCnt++;
        if (f_meshes[i].name.includes("body_"))
            f_bodyCnt++;
        if (f_meshes[i].name.includes("leg_"))
            f_legCnt++;
    }
    f_char = new Character(f_meshes, f_animationGroups, f_headCnt, f_bodyCnt, f_legCnt);
    f_animationGroups[1].play(true);
    f_meshes[0].scaling.scaleInPlace(1.5);

    //..
    SetGender(Math.floor(Math.random() * 2));

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

    // run the render loop
    engine.runRenderLoop(function(){
        scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        engine.resize();
    });
}

function updateCharacter() {

    // enable inital setup
    var char = (gender == Gender.Male) ? m_char : f_char;
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
}

// 0 male, 1 female
function SetGender(gender) {

    this.gender = gender;

    m_char.meshes[0].setEnabled(this.gender == Gender.Male);
    f_char.meshes[0].setEnabled(this.gender == Gender.Female);

    updateCharacter();
}