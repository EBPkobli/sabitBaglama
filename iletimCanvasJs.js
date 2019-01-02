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

var iHatiSuOBJ , iHSXKCizgi , iHSX2KCizgi , iHSYKCizgi , iHSTextXStruct , iHSTextX2Struct , iHSTextYStruct;
var iletimHatiSu     = new THREE.Group();

var solTOBJ , solTXKCizgi , solTYKCizgi , solTTextXStruct , solTTextYStruct;
var solTrapez     = new THREE.Group();

var sagTOBJ , sagTXKCizgi , sagTYKCizgi , sagTTextXStruct , sagTTextYStruct;
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

    //-----------İLETİM HATTI SU--------------
    var x1 = 60, y1 = 25;

    var iHSParams           = ["iletimHatiSu" , -25 , y1 , x1 , y1 , x1-25 , 0 ,0 , 0]
    var iHSCizgiSayi        = 4;
    var iHSKonum            = new THREE.Vector3(meshPosX,meshPosY,0);
    var iHSFrame            = false;

    iHatiSuOBJ              = new BlokObje(iHSParams,iHSCizgiSayi,suColor,
                                           iHSKonum,iHSFrame,frameColor,frameWitdh,iletimHatiSu);
    yeniBlokObje(iHatiSuOBJ);


    var iHSTextXAdi         = "iletimHatiSuTextX"
    var iHSTextX            = "4y";
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
    var iHSTextX2            = "B";
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

    var iHSTextYAdi         = "iletimHatiSuTextY"
    var iHSTextY            = "y";
    var iHSTextYPosition    = new THREE.Vector3(meshPosX + 35/2 - 5,meshPosY + 12.5 - 5 /*offset*/ , 100);
    var iHSTextYRotation    = new THREE.Vector3(0, 0 , 90);
    var iHSTextYOnRenk      = 0x000000;
    var iHSTextYYanRenk     = 0x000000;
    iHSTextYStruct          = new TextStruct(iHSTextYAdi,iHSTextY, undefined/*daha mesh yok*/ ,iHSTextYPosition ,iHSTextYRotation,iHSTextYYanRenk,iHSTextYOnRenk,iletimHatiSu)
    newCreateText(iHSTextYStruct);


    var iHSYCizgiAdi        = "İletimHatiSuYKCizgi";
    var iHSYKCizgiPos       = new THREE.Vector3(meshPosX + 35/2,meshPosY + 12.5 /*offset*/ , 100)
    var iHSYKCizgiUzunluk   = 25;
    var iHSYKCizgiRotation  = new THREE.Vector3(0, 0 , 0);
    var iHSYKCizgiRenk      = 0xff0000;
    var iHSYKCizgiSize      = 1;
    var iHSYKCizgiArrowRenk = 0x9404c1
    iHSYKCizgi              = new KilavuzCizgi(iHSYCizgiAdi,iHSYKCizgiPos,iHSYKCizgiUzunluk,
                                               iHSYKCizgiRotation,iHSYKCizgiRenk,iHSYKCizgiSize,iHSYKCizgiArrowRenk,iletimHatiSu);


    objeGroup.add(iletimHatiSu);

    //-----------İLETİM HATTI SU SON--------------

    //-----------SOL TRAPEZ--------------

    var x2 = 30, y2 = 30;

    var sTKParams           = ["SolTrapez" , 0 , y2 , x2 , 0]
    var sTKCizgiSayi        = 2;
    var sTKKonum            = new THREE.Vector3(meshPosX - x1 / 2 - x2 / 2 - frameWitdh + 14,meshPosY,0);
    var sTKFrame            = true;

    solTOBJ                 = new BlokObje(sTKParams,sTKCizgiSayi,zeminColor,
                                           sTKKonum,sTKFrame,frameColor,frameWitdh,solTrapez);
    yeniBlokObje(solTOBJ);

    var solTTextXAdi         = "SolTrapezXText"
    var solTTextX            = "1.5y";
    var solTTextXPosition    = new THREE.Vector3(sTKKonum.x + x2/2 - 5,meshPosY - 20 /*offset*/ , 100);
    var solTTextXRotation    = new THREE.Vector3(0, 0 , 0);
    var solTTextXOnRenk      = 0xffffff;
    var solTTextXYanRenk     = 0x000000;
    solTTextXStruct          = new TextStruct(solTTextXAdi,solTTextX, undefined/*daha mesh yok*/ ,solTTextXPosition ,solTTextXRotation,solTTextXYanRenk,solTTextXOnRenk,solTrapez)
    newCreateText(solTTextXStruct);


    var solTXCizgiAdi        = "SolTrapezXKCizgi";
    var solTXKCizgiPos       = new THREE.Vector3(sTKKonum.x +x2/2,meshPosY - 10 /*offset*/ , 100)
    var solTXKCizgiUzunluk   = 30;
    var solTXKCizgiRotation  = new THREE.Vector3(0, 0 , 90);
    var solTXKCizgiRenk      = 0xff0000;
    var solTXKCizgiSize      = 1;
    var solTXKCizgiArrowRenk = 0x9404c1
    solTXKCizgi              = new KilavuzCizgi(solTXCizgiAdi,solTXKCizgiPos,solTXKCizgiUzunluk,
                                                solTXKCizgiRotation,solTXKCizgiRenk,solTXKCizgiSize,solTXKCizgiArrowRenk,solTrapez);

    var solTTextYAdi         = "SolTrapezYText"
    var solTTextY            = "y";
    var solTTextYPosition    = new THREE.Vector3(sTKKonum.x -10 ,meshPosY + y2/2 - 3 /*offset*/ , 100);
    var solTTextYRotation    = new THREE.Vector3(0, 0 , 90);
    var solTTextYOnRenk      = 0x000000;
    var solTTextYYanRenk     = 0x000000;
    solTTextYStruct          = new TextStruct(solTTextYAdi,solTTextY, undefined/*daha mesh yok*/ ,solTTextYPosition ,solTTextYRotation,solTTextYYanRenk,solTTextYOnRenk,solTrapez)
    newCreateText(solTTextYStruct);


    var solTYCizgiAdi        = "SolTrapezYKCizgi";
    var solTYKCizgiPos       = new THREE.Vector3(sTKKonum.x - 5,meshPosY + y2/2 /*offset*/ , 100)
    var solTYKCizgiUzunluk   = 30;
    var solTYKCizgiRotation  = new THREE.Vector3(0, 0 , 0);
    var solTYKCizgiRenk      = 0xff0000;
    var solTYKCizgiSize      = 1;
    var solTYKCizgiArrowRenk = 0x9404c1
    solTYKCizgi              = new KilavuzCizgi(solTYCizgiAdi,solTYKCizgiPos,solTYKCizgiUzunluk,
                                                solTYKCizgiRotation,solTYKCizgiRenk,solTYKCizgiSize,solTYKCizgiArrowRenk,solTrapez);



    objeGroup.add(solTrapez);


    //-----------SOL TRAPEZ SON--------------

    //-----------SAĞ TRAPEZ--------------


    var x3 = 30, y3 = 30;

    var sagTKParams           = ["SağTrapez" , x3 , y3 , x3 , 0 ]
    var sagTKCizgiSayi        = 2;
    var sagTKKonum            = new THREE.Vector3(meshPosX + 35 + frameWitdh,meshPosY,0);
    var sagTKFrame            = true;

    sagTOBJ                 = new BlokObje(sagTKParams,sagTKCizgiSayi,zeminColor,
                                           sagTKKonum,sagTKFrame,frameColor,frameWitdh,solTrapez);
    yeniBlokObje(sagTOBJ);

    var sagTTextXAdi         = "sagTrapezXText"
    var sagTTextX            = "1.5y";
    var sagTTextXPosition    = new THREE.Vector3(sagTKKonum.x + x3/2 - 5,meshPosY - 20 /*offset*/ , 100);
    var sagTTextXRotation    = new THREE.Vector3(0, 0 , 0);
    var sagTTextXOnRenk      = 0xffffff;
    var sagTTextXYanRenk     = 0x000000;
    sagTTextXStruct          = new TextStruct(sagTTextXAdi,sagTTextX, undefined/*daha mesh yok*/ ,sagTTextXPosition ,sagTTextXRotation,sagTTextXYanRenk,sagTTextXOnRenk,sagTrapez)
    newCreateText(sagTTextXStruct);


    var sagTXCizgiAdi        = "sagTrapezXKCizgi";
    var sagTXKCizgiPos       = new THREE.Vector3(sagTKKonum.x +x3/2,meshPosY - 10 /*offset*/ , 100)
    var sagTXKCizgiUzunluk   = 30;
    var sagTXKCizgiRotation  = new THREE.Vector3(0, 0 , 90);
    var sagTXKCizgiRenk      = 0xff0000;
    var sagTXKCizgiSize      = 1;
    var sagTXKCizgiArrowRenk = 0x9404c1
    sagTXKCizgi              = new KilavuzCizgi(sagTXCizgiAdi,sagTXKCizgiPos,sagTXKCizgiUzunluk,
                                                sagTXKCizgiRotation,sagTXKCizgiRenk,sagTXKCizgiSize,sagTXKCizgiArrowRenk,sagTrapez);

    var sagTTextYAdi         = "sagTrapezYText"
    var sagTTextY            = "y";
    var sagTTextYPosition    = new THREE.Vector3(sagTKKonum.x + x3 + 10 ,meshPosY + y3/2 - 3 /*offset*/ , 100);
    var sagTTextYRotation    = new THREE.Vector3(0, 0 , 90);
    var sagTTextYOnRenk      = 0x000000;
    var sagTTextYYanRenk     = 0x000000;
    sagTTextYStruct          = new TextStruct(sagTTextYAdi,sagTTextY, undefined/*daha mesh yok*/ ,sagTTextYPosition ,sagTTextYRotation,sagTTextYYanRenk,sagTTextYOnRenk,sagTrapez)
    newCreateText(sagTTextYStruct);


    var sagTYCizgiAdi        = "sagTrapezYKCizgi";
    var sagTYKCizgiPos       = new THREE.Vector3(sagTKKonum.x + x3 + 5,meshPosY + y3/2 /*offset*/ , 100)
    var sagTYKCizgiUzunluk   = 30;
    var sagTYKCizgiRotation  = new THREE.Vector3(0, 0 , 0);
    var sagTYKCizgiRenk      = 0xff0000;
    var sagTYKCizgiSize      = 1;
    var sagTYKCizgiArrowRenk = 0x9404c1
    sagTYKCizgi              = new KilavuzCizgi(sagTYCizgiAdi,sagTYKCizgiPos,sagTYKCizgiUzunluk,
                                                sagTYKCizgiRotation,sagTYKCizgiRenk,sagTYKCizgiSize,sagTYKCizgiArrowRenk,sagTrapez);




    objeGroup.add(sagTrapez);

    //-----------SAĞ TRAPEZ SON--------------


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
    if(canvas.visible === true){
        var time = Date.now();
        if(time - e_time >=1000){
            e_time = time;
        }
        objeGroup.rotation.y += ( targetRotationY - objeGroup.rotation.y ) * 0.05;
        objeGroup.rotation.x += ( targetRotationX - objeGroup.rotation.x ) * 0.05;
        camera.lookAt(new THREE.Vector3(-camPosX,camPosY,0));
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
    }
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

function changeBoyutOBJ(hangiNesne,newBoyut,Sonuc){

    if(Sonuc === undefined || Sonuc === 0 || Sonuc === "") Sonuc = false;
    if(newBoyut === 0 || newBoyut === undefined || newBoyut === "" || parseFloat(newBoyut) <= 0) return;
    if(iHSTextXStruct === undefined) return;
    newBoyut = (newBoyut==="1") ? "" : newBoyut;
    switch(hangiNesne)
    {
    case "SuX1":
        //TextSturct--------
        iHSTextXStruct.text             = newBoyut + ((Sonuc === true) ? "m" : "y");
        changeText(iHSTextXStruct);
        //TextSturct--------
        break;
    case "SuX2":
        //TextSturct--------
        iHSTextX2Struct.text             = newBoyut+ ((Sonuc === true) ? "m" : "");
        changeText(iHSTextX2Struct);
        //TextSturct--------
        break;
    case "SuY":
        //TextSturct--------
        iHSTextYStruct.text             = newBoyut + ((Sonuc === true) ? "m" : "y");
        changeText(iHSTextYStruct);
        //TextSturct--------
        break;

    case "SolTX":
        //TextSturct--------
        solTTextXStruct.text             = newBoyut + ((Sonuc === true) ? "m" : "y");
        changeText(solTTextXStruct);
        //TextSturct--------
        break;

    case "SolTY":
        //TextSturct--------
        solTTextYStruct.text             = newBoyut + ((Sonuc === true) ? "m" : "y");
        changeText(solTTextYStruct);
        //TextSturct--------
        break;

    case "SagTX":
        //TextSturct--------
        sagTTextXStruct.text             = newBoyut + ((Sonuc === true) ? "m" : "y");
        changeText(sagTTextXStruct);
        //TextSturct--------
        break;


    case "SagTY":
        //TextSturct--------
        sagTTextYStruct.text             = newBoyut + ((Sonuc === true) ? "m" : "y");
        changeText(sagTTextYStruct);
        //TextSturct--------
        break;
    }
}




