var appr_canvas;
var appr_engine;
var appr_scene;

var appr_m_char;
var appr_f_char;

var appr_gender;

async function createAppearance() {

    appr_canvas = document.getElementById("canvas_appearance");
    appr_engine = new BABYLON.Engine(appr_canvas, true);
    appr_scene = new BABYLON.Scene(appr_engine);
    //appr_scene.clearColor = new BABYLON.Color3(0.2, 0, 0.6);
    appr_scene.clearColor = new BABYLON.Color3(26/255, 43/255, 104/255);

    //
    // Character
    //

    // create male
    const { meshes: m_meshes, animationGroups: m_animationGroups } = await BABYLON.SceneLoader.ImportMeshAsync("", "./assets/glb/", "m_char.glb", appr_scene);
   
    var m_headCnt = -1, m_bodyCnt = -1, m_legCnt = -1;
    for (var i = 1; i < m_meshes.length; i++) {
        if (m_meshes[i].name.includes("head_"))
            m_headCnt++;
        if (m_meshes[i].name.includes("body_"))
            m_bodyCnt++;
        if (m_meshes[i].name.includes("leg_"))
            m_legCnt++;
    }
    appr_m_char = new Character(m_meshes, m_animationGroups, m_headCnt, m_bodyCnt, m_legCnt);
    m_animationGroups[1].play(true);
    m_meshes[0].scaling.scaleInPlace(2);

    // create female
    const { meshes: f_meshes, animationGroups: f_animationGroups } = await BABYLON.SceneLoader.ImportMeshAsync("", "./assets/glb/", "f_char.glb", appr_scene);

    var f_headCnt = -1, f_bodyCnt = -1, f_legCnt = -1;
    for (var i = 1; i < f_meshes.length; i++) {

        if (f_meshes[i].name.includes("head_"))
            f_headCnt++;
        if (f_meshes[i].name.includes("body_"))
            f_bodyCnt++;
        if (f_meshes[i].name.includes("leg_"))
            f_legCnt++;
    }
    appr_f_char = new Character(f_meshes, f_animationGroups, f_headCnt, f_bodyCnt, f_legCnt);
    f_animationGroups[1].play(true);
    f_meshes[0].scaling.scaleInPlace(2);

    //..
    SetGender(Gender.Male);

    //
    // Light
    //
    var light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), appr_scene);

    //
    //CAMERA
    //
    var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(60), 0, new BABYLON.Vector3(0, 1.5, 0), appr_scene);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 5;
    camera.lowerBetaLimit = 1.5;
    camera.upperBetaLimit = 1.5;
    camera.attachControl(appr_canvas, true);
    camera.inputs.attached.pointers.buttons = [1]; //wheel click change position for camera

    // run the render loop
    appr_engine.runRenderLoop(function(){
        appr_scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', function(){
        appr_engine.resize();
    });
}

function updateCharacter() {

    // enable inital setup
    var char = (appr_gender == Gender.Male) ? appr_m_char : appr_f_char;
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

    appr_gender = gender;

    appr_m_char.meshes[0].setEnabled(appr_gender == Gender.Male);
    appr_f_char.meshes[0].setEnabled(appr_gender == Gender.Female);

    updateCharacter();
}

function disposeAppearance() {
    appr_engine.dispose();
    appr_scene.dispose();
}

// index : head=0, body=1, leg=2
function onCustomizeSelect(index, direction) {

    var char = (appr_gender == Gender.Male) ? appr_m_char : appr_f_char;

    switch(index){
        case 0:
            direction == 0 ? char.desiredHead-- : char.desiredHead++;
            if (char.desiredHead < 0)
                char.desiredHead =  char.headCnt;
            if (char.desiredHead > char.headCnt)
                char.desiredHead = 0;
            break;
        case 1:
            direction == 0 ? char.desiredBody-- : char.desiredBody++;
            if (char.desiredBody < 0)
                char.desiredBody =  char.bodyCnt;
            if (char.desiredBody > char.bodyCnt)
                char.desiredBody = 0;
            break;
        case 2:
            direction == 0 ? char.desiredLeg-- : char.desiredLeg++;
            if (char.desiredLeg < 0)
                char.desiredLeg =  char.legCnt;
            if (char.desiredLeg > char.legCnt)
                char.desiredLeg = 0;
            break;
    }

    updateCharacter();
}