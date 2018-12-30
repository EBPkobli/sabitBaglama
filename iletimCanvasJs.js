// glcode.js
Qt.include("three.js")
Qt.include("YaziJS.js")
Qt.include("TextMeshClass.js")
Qt.include("KilavuzCizgiJS.js")
Qt.include("baglamaObje.js")

var camera, scene, renderer;

var suColor = 0x00AAFF , zeminColor = 0x926829 , frameColor = 0x000000 , frameWitdh = 1;
var blokAralik = 2;
var meshPosY = -10 , meshPosX = -30;
var camYariCap = 170;
var objeGroup = new THREE.Group();
var evntSource;

var iHatiSuOBJ , iHSXKCizgi , iHSX2KCizgi , iHSTextXStruct , iHSTextX2Struct;
var iletimHatiSu     = new THREE.Group();

var solTOBJ , solTXKCizgi , solTYKCizgi , solTTextXStruct , solTTextYStruct;
var solTrapez     = new THREE.Group();

var sagTOBJ , sagTXKCizgi , sagTXKCizgi , sagTTextXStruct , sagTTextYStruct;
var sagTrapez     = new THREE.Group();


function initializeGL(canvas , eventSource) {

    window.innerWidth = canvas.width;
    window.innerHeight = canvas.height;
    eventSource.mouseDown.connect(onDocumentMouseDown);
    eventSource.mouseWheel.connect(onDocumentMouseWheel);
    evntSource = eventSource;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 100, canvas.width/canvas.height, 0.1, 1000 );
    renderer = new THREE.Canvas3DRenderer({ canvas: canvas, antialias: true, devicePixelRatio: canvas.devicePixelRatio, clearDepth: true });
    renderer.setSize( canvas.width, canvas.height );
    renderer.setClearColor( 0x696969, 1);
    renderer.gammaInput     = true;
    renderer.gammaOutput    = true;
    renderer.antialias      = true;

    //*---- INIT ----*\\
    initBlokObje(objeGroup,scene);
    initKilavuzCizgi(objeGroup,scene);
    initYazi(objeGroup,scene);
    //*---- INIT ----*\\

    var x1 = 60, y1 = 25;

    var iHSParams           = ["iletimHatiSu" , -25 , y1 , x1 , y1 , x1-25 , 0 ,0 , 0]
    var iHSCizgiSayi        = 4;
    var iHSKonum            = new THREE.Vector3(meshPosX,meshPosY,-1);
    var iHSFrame            = true;

    iHatiSuOBJ              = new BlokObje(iHSParams,iHSCizgiSayi,suColor,
                                 iHSKonum,iHSFrame,frameColor,frameWitdh,iletimHatiSu);
    yeniBlokObje(iHatiSuOBJ);


    var iHSTextXAdi         = "iletimHatiSuTextX"
    var iHSTextX            = "3.5m";
    var iHSTextXPosition    = new THREE.Vector3(iHSKonum.x + 35 / 2 -5,meshPosY - 20 /*offset*/ , 100);
    var iHSTextXRotation    = new THREE.Vector3(0, 0 , 0);
    var iHSTextXOnRenk      = 0xffffff;
    var iHSTextXYanRenk     = 0x000000;
    iHSTextXStruct          = new TextStruct(iHSTextXAdi,iHSTextX, undefined/*daha mesh yok*/ ,iHSTextXPosition ,iHSTextXRotation,iHSTextXYanRenk,iHSTextXOnRenk,iletimHatiSu)
    newCreateText(iHSTextXStruct);


    var iHSXCizgiAdi        = "İletimHatiSuXKCizgi";
    var iHSXKCizgiPos       = new THREE.Vector3(iHSKonum.x + 35 / 2,meshPosY - 10 /*offset*/ , 100)
    var iHSXKCizgiUzunluk   = 35;
    var iHSXKCizgiRotation  = new THREE.Vector3(0, 0 , 90);
    var iHSXKCizgiRenk      = 0xff0000;
    var iHSXKCizgiSize      = 1;
    var iHSXKCizgiArrowRenk = 0x9404c1
    iHSXKCizgi              = new KilavuzCizgi(iHSXCizgiAdi,iHSXKCizgiPos,iHSXKCizgiUzunluk,
                                  iHSXKCizgiRotation,iHSXKCizgiRenk,iHSXKCizgiSize,iHSXKCizgiArrowRenk,iletimHatiSu);


    var iHSTextX2Adi         = "iletimHatiSuTextX2"
    var iHSTextX2            = "8.5m";
    var iHSTextX2Position    = new THREE.Vector3(iHSKonum.x + 35 / 2 -5,meshPosY + y1 + 10 /*offset*/ , 100);
    var iHSTextX2Rotation    = new THREE.Vector3(0, 0 , 0);
    var iHSTextX2OnRenk      = 0xffffff;
    var iHSTextX2YanRenk     = 0x000000;
    iHSTextX2Struct          = new TextStruct(iHSTextX2Adi,iHSTextX2, undefined/*daha mesh yok*/ ,iHSTextX2Position ,iHSTextX2Rotation,iHSTextX2YanRenk,iHSTextX2OnRenk,iletimHatiSu)
    newCreateText(iHSTextX2Struct);


    var iHSX2CizgiAdi        = "İletimHatiSuX2KCizgi";
    var iHSX2KCizgiPos       = new THREE.Vector3(iHSKonum.x + 35 / 2,meshPosY + y1 + 5 /*offset*/ , 100)
    var iHSX2KCizgiUzunluk   = 85;
    var iHSX2KCizgiRotation  = new THREE.Vector3(0, 0 , 90);
    var iHSX2KCizgiRenk      = 0xff0000;
    var iHSX2KCizgiSize      = 1;
    var iHSX2KCizgiArrowRenk = 0x9404c1
    iHSX2KCizgi              = new KilavuzCizgi(iHSX2CizgiAdi,iHSX2KCizgiPos,iHSX2KCizgiUzunluk,
                                  iHSX2KCizgiRotation,iHSX2KCizgiRenk,iHSX2KCizgiSize,iHSX2KCizgiArrowRenk,iletimHatiSu);

    objeGroup.add(iletimHatiSu);


    var x2 = 10, y2 = 35;

    var sTKParams           = ["iletimHatiSu" , -10 , y2 , x2+14 , 0]
    var sTKCizgiSayi        = 2;
    var sTKKonum            = new THREE.Vector3(meshPosX - x1 / 2 - x2 / 2 - frameWitdh + 14,meshPosY,0);
    var sTKFrame            = true;

    solTOBJ                 = new BlokObje(sTKParams,sTKCizgiSayi,zeminColor,
                                 sTKKonum,sTKFrame,frameColor,frameWitdh,solTrapez);
    yeniBlokObje(solTOBJ);

    objeGroup.add(solTrapez);



    var x3 = 10, y3 = 35;

    var sagTKParams           = ["iletimHatiSu" , x3+20 , y3-3 , x3+14 , 0 ]
    var sagTKCizgiSayi        = 2;
    var sagTKKonum            = new THREE.Vector3(meshPosX + x1 / 2 + x3 / 2 + frameWitdh,meshPosY,0);
    var sagTKFrame            = true;

    sagTOBJ                 = new BlokObje(sagTKParams,sagTKCizgiSayi,zeminColor,
                                 sagTKKonum,sagTKFrame,frameColor,frameWitdh,solTrapez);
    yeniBlokObje(sagTOBJ);

    objeGroup.add(sagTrapez);


    yaziYukle();
    scene.add(objeGroup);


    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = camYariCap;
    camera.lookAt(0,0,0);
}
function resizeGL(canvas) {
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(canvas.devicePixelRatio);
    renderer.setSize(canvas.width, canvas.height);
}
var e_time = 0;
var tX = 0 , tY = 0 , tZ = 0;
function paintGL(canvas) {
    var time = Date.now();
    if(time - e_time >=1000){
        e_time = time;
    }
    objeGroup.rotation.y += ( targetRotationY - objeGroup.rotation.y ) * 0.05;
    objeGroup.rotation.x += ( targetRotationX - objeGroup.rotation.x ) * 0.05;
    camera.lookAt(new THREE.Vector3(-camPosX,camPosY,0));
    camera.updateProjectionMatrix();
    //changeText(0,"Halit")
    //changeText(1,"KUBILAY")
    renderer.render(scene, camera);
}

var window = new FakeWindow(0,0);
var mouseX = 0;
var mouseY = 0;
var mouseXOnMouseDown = 0;
var mouseYOnMouseDown = 0;
var targetRotationX = 0;
var targetRotationY = 0;
var targetRotationXOnMouseDown = 0;
var targetRotationYOnMouseDown = 0;
var butonClick = 1;
var camPosX = 0 , camPosY = 0 , camPosOldX = 0 , camPosOldY = 0;
function FakeWindow(awidth, aheight) {
    this.innerWidth = awidth;
    this.innerHeight = aheight;
}
function onDocumentMouseWheel(angelX,angelY)
{
    camera.position.z += (angelY>0) ? -10 : 10;
}

function onDocumentMouseDown( x, y, buttons ) {

    evntSource.mouseMove.connect(onDocumentMouseMove);
    evntSource.mouseUp.connect(onDocumentMouseUp);
    evntSource.mouseOut.connect(onDocumentMouseOut);
    mouseXOnMouseDown = x - window.innerWidth / 2;
    mouseYOnMouseDown = y - window.innerHeight / 2;
    if(buttons/*sol click*/ === 1){
        targetRotationXOnMouseDown = targetRotationY;
        targetRotationYOnMouseDown = targetRotationX;
        butonClick = 1;
    }else if(buttons/*sağ click*/ === 2)
    {

        camPosOldX = camPosX;
        camPosOldY = camPosY;
        butonClick = 2;
    }
}

function onDocumentMouseMove( x, y ) {

    mouseX = x - window.innerWidth / 2;
    mouseY = y - window.innerHeight / 2;
    if(butonClick === 1){
        targetRotationY = targetRotationXOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
        targetRotationX = targetRotationYOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.02;
    }else if(butonClick === 2)
    {
        camPosX = camPosOldX + ( mouseX - mouseXOnMouseDown ) * 0.5;
        camPosY = camPosOldY + ( mouseY - mouseYOnMouseDown ) * 0.5;
    }
}

function onDocumentMouseUp( x, y ) {
    evntSource.mouseMove.disconnect(onDocumentMouseMove);
    evntSource.mouseUp.disconnect(onDocumentMouseUp);
    evntSource.mouseOut.disconnect(onDocumentMouseOut);

}

function onDocumentMouseOut() {
    evntSource.mouseMove.disconnect(onDocumentMouseMove);
    evntSource.mouseUp.disconnect(onDocumentMouseUp);
    evntSource.mouseOut.disconnect(onDocumentMouseOut);
}


