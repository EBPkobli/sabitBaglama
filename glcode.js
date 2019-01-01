// glcode.js
Qt.include("three.js")
Qt.include("YaziJS.js")
Qt.include("TextMeshClass.js")
Qt.include("KilavuzCizgiJS.js")
Qt.include("baglamaObje.js")

var camera, scene, renderer;
var solIlkBlokMesh;
var blokColor = 0x9a9a9a , frameColor = 0x000000 , frameWitdh = 1;
var blokAralik = 2;
var meshPosY = -10 , meshPosX = -80;
var hatMeshPosY = -10 , hatMeshPosX = 80;
var e_mX , e_mY;
var camYariCap = 185;
var objeGroup = new THREE.Group();

var zeminBlokOBJ , zYKCizgi , zTextYStruct;
var zeminBlok = new THREE.Group();

var solIlkBlokOBJ , sIBXKCizgi , sIBYKCizgi , sIBTextXStruct, sIBTextYStruct;
var sIBTextX2Struct , sIBX2KCizgi;
var solBlok     = new THREE.Group();

var ortaUzunBlokOBJ , oUBTextXStruct , oUBXKCizgi, oUBTextYStruct, oUBYKCizgi;
var ortaBlok    = new THREE.Group();

var sagIlkBlokOBJ , sagIBTextXStruct , sagIBXKCizgi, sagIBTextYStruct, sagIBYKCizgi;
var sagBlok     = new THREE.Group();

var sagSonBlokOBJ , sagSIBTextXStruct , sagSIBXKCizgi, sagSIBTextYStruct, sagSIBYKCizgi;
var sagSonBlok     = new THREE.Group();

var qminTextYStruct , qminYKCizgi;
var qmaxTextYStruct , qmaxYKCizgi;


function initializeGL(canvas , eventSource) {

    window.innerWidth = canvas.width;
    window.innerHeight = canvas.height;
    eventSource.mouseDown.connect(onDocumentMouseDown);
    eventSource.mouseWheel.connect(onDocumentMouseWheel);
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


    //----------------------------------- Sol İlk Blok -----------------------------------\\
    var x1 = 60, y1 = 75;
    var tepeX1              = 20;
    var tepeInisY1          = 10;
    var sIBParams           = ["SolIlkBlok" , 0 , y1 , tepeX1 , y1 , x1 , tepeInisY1 , x1 , 0 , 0 , 0]
    var sIBCizgiSayi        = 5;
    var sIBKonum            = new THREE.Vector3(meshPosX,meshPosY,0);
    var sIBFrame            = true;

    solIlkBlokOBJ           = new BlokObje(sIBParams,sIBCizgiSayi,blokColor,
                                 sIBKonum,sIBFrame,frameColor,frameWitdh,solBlok);
    yeniBlokObje(solIlkBlokOBJ);



    var sIBTextXAdi         = "SolBlokXText"
    var sIBTextX            = "6m";
    var sIBTextXPosition    = new THREE.Vector3(sIBKonum.x + x1 / 2 -5,meshPosY - 20 /*offset*/ , 100);
    var sIBTextXRotation    = new THREE.Vector3(0, 0 , 0);
    var sIBTextXOnRenk      = 0xffffff;
    var sIBTextXYanRenk     = 0x000000;
    sIBTextXStruct          = new TextStruct(sIBTextXAdi,sIBTextX, undefined/*daha mesh yok*/ ,sIBTextXPosition ,sIBTextXRotation,sIBTextXYanRenk,sIBTextXOnRenk,solBlok)
    newCreateText(sIBTextXStruct);

    var sIBXCizgiAdi        = "SolIlkBlokX";
    var sIBXKCizgiPos       = new THREE.Vector3(sIBKonum.x + x1 / 2,meshPosY - 10 /*offset*/ , 100)
    var sIBXKCizgiUzunluk   = 60;
    var sIBXKCizgiRotation  = new THREE.Vector3(0, 0 , 90);
    var sIBXKCizgiRenk      = 0xff0000;
    var sIBXKCizgiSize      = 0.85;
    var sIBXKCizgiArrowRenk = 0x9404c1
    sIBXKCizgi              = new KilavuzCizgi(sIBXCizgiAdi,sIBXKCizgiPos,sIBXKCizgiUzunluk,
                                  sIBXKCizgiRotation,sIBXKCizgiRenk,sIBXKCizgiSize,sIBXKCizgiArrowRenk,solBlok);

    var sIBTextX2Adi         = "SolBlokX2Text"
    var sIBTextX2            = "2m";
    var sIBTextX2Position    = new THREE.Vector3(sIBKonum.x + tepeX1 / 2 -5,meshPosY +y1 + 10 /*offset*/ , 100);
    var sIBTextX2Rotation    = new THREE.Vector3(0, 0 , 0);
    var sIBTextX2OnRenk      = 0xffffff;
    var sIBTextX2YanRenk     = 0x000000;
    sIBTextX2Struct          = new TextStruct(sIBTextX2Adi,sIBTextX2, undefined/*daha mesh yok*/ ,sIBTextX2Position ,sIBTextX2Rotation,sIBTextX2YanRenk,sIBTextX2OnRenk,solBlok)
    newCreateText(sIBTextX2Struct);

    var sIBX2CizgiAdi        = "SolIlkBlokX2";
    var sIBX2KCizgiPos       = new THREE.Vector3(sIBKonum.x + tepeX1 / 2,meshPosY +y1 + 5/*offset*/ , 100)
    var sIBX2KCizgiUzunluk   = 25;
    var sIBX2KCizgiRotation  = new THREE.Vector3(0, 0 , 90);
    var sIBX2KCizgiRenk      = 0xff0000;
    var sIBX2KCizgiSize      = 0.85;
    var sIBX2KCizgiArrowRenk = 0x2d7fc8
    sIBX2KCizgi              = new KilavuzCizgi(sIBX2CizgiAdi,sIBX2KCizgiPos,sIBX2KCizgiUzunluk,
                                  sIBX2KCizgiRotation,sIBX2KCizgiRenk,sIBX2KCizgiSize,sIBX2KCizgiArrowRenk,solBlok);


    var sIBTextYAdi         = "SolBlokYText"
    var sIBTextY            = "BY";
    var sIBTextYPosition    = new THREE.Vector3(sIBKonum.x - 10 ,meshPosY + y1 / 2 - 5 + 10 , 100);
    var sIBTextYRotation    = new THREE.Vector3(0, 0 , 90);
    var sIBTextYOnRenk      = 0xffffff;
    var sIBTextYYanRenk     = 0x000000;
    sIBTextYStruct          = new TextStruct(sIBTextYAdi,sIBTextY, undefined/*daha mesh yok*/ ,sIBTextYPosition ,sIBTextYRotation,sIBTextYYanRenk,sIBTextYOnRenk,solBlok)
    newCreateText(sIBTextYStruct);

    var sIBYCizgiAdi        = "SolIlkBlokY";
    var sIBYKCizgiPos       = new THREE.Vector3(sIBKonum.x - 5,meshPosY + y1 / 2 + 10 /*offset*/ , 100)
    var sIBYKCizgiUzunluk   = 60;
    var sIBYKCizgiRotation  = new THREE.Vector3(0, 0 , 0);
    var sIBYKCizgiRenk      = 0xff0000;
    var sIBYKCizgiSize      = 0.65;
    var sIBYKCizgiArrowRenk = 0x147461
    sIBYKCizgi              = new KilavuzCizgi(sIBYCizgiAdi,sIBYKCizgiPos,sIBYKCizgiUzunluk,
                                  sIBYKCizgiRotation,sIBYKCizgiRenk,sIBYKCizgiSize,sIBYKCizgiArrowRenk,solBlok);

    objeGroup.add(solBlok);

    //----------------------------------- Sol İlk Blok SON-----------------------------------\\



    //----------------------------------- Zemin Blok -----------------------------------\\

    var zx = 30, zy = 15;
    var zParams           = ["Zemin" , 0 , zy , zx , zy , zx , 0]
    var zCizgiSayi        = 4;
    var zKonum            = new THREE.Vector3(meshPosX-32,meshPosY,0);
    var zFrame            = true;
    var zeminColor        = 0x9b7653

    zeminBlokOBJ           = new BlokObje(zParams,zCizgiSayi,zeminColor,
                                 zKonum,zFrame,frameColor,frameWitdh,zeminBlok);
    yeniBlokObje(zeminBlokOBJ);

    var zTextYAdi         = "ZeminBlokYText"
    var zTextY            = "1.5m";
    var zTextYPosition    = new THREE.Vector3(sIBKonum.x - 10,meshPosY + zy / 2 - 5 , 100);
    var zTextYRotation    = new THREE.Vector3(0, 0 , 90);
    var zTextYOnRenk      = 0x000000;
    var zTextYYanRenk     = 0x000000;
    zTextYStruct          = new TextStruct(zTextYAdi,zTextY, undefined/*daha mesh yok*/ ,zTextYPosition ,zTextYRotation,zTextYYanRenk,zTextYOnRenk,zeminBlok)
    newCreateText(zTextYStruct);

    var zYCizgiAdi        = "ZeminBlokY";
    var zYKCizgiPos       = new THREE.Vector3(sIBKonum.x - 5,meshPosY + zy / 2 /*offset*/ , 100)
    var zYKCizgiUzunluk   = 15;
    var zYKCizgiRotation  = new THREE.Vector3(0, 0 , 0);
    var zYKCizgiRenk      = 0xff0000;
    var zYKCizgiSize      = 0.65;
    var zYKCizgiArrowRenk = 0x022f2a
    zYKCizgi              = new KilavuzCizgi(zYCizgiAdi,zYKCizgiPos,zYKCizgiUzunluk,
                                  zYKCizgiRotation,zYKCizgiRenk,zYKCizgiSize,zYKCizgiArrowRenk,zeminBlok);


    objeGroup.add(zeminBlok)

    //----------------------------------- Zemin Blok SON -----------------------------------\\




    //----------------------------------- Orta Blok -----------------------------------\\
    var x2 = 85, y2 = 10;
    var ouBParams           = ["OrtaUzunBlok" , 0 , y2 , x2 , y2 , x2 , 0 , 0 , 0]
    var ouBCizgiSayi        = 4;
    var ouBKonum            = new THREE.Vector3(sIBKonum.x + x1 + 5/*1 birim uzaklık*/,meshPosY,0);
    var ouBFrame            = true;
    ortaUzunBlokOBJ         = new BlokObje(ouBParams,ouBCizgiSayi,blokColor,
                                 ouBKonum,ouBFrame,frameColor,frameWitdh,ortaBlok);
    yeniBlokObje(ortaUzunBlokOBJ);


    var oUBTextXAdi         = "OrtaBlokXText"
    var oUBTextX            = "8.5m";
    var oUBTextXPosition    = new THREE.Vector3(ouBKonum.x + x2 / 2 -5,meshPosY - 20 /*offset*/ , 100)
    var oUBTextXRotation    = new THREE.Vector3(0, 0 , 0);
    var oUBTextXOnRenk      = 0xffffff;
    var oUBTextXYanRenk     = 0x000000;
    oUBTextXStruct          = new TextStruct(oUBTextXAdi,oUBTextX , undefined ,oUBTextXPosition ,oUBTextXRotation,oUBTextXYanRenk,oUBTextXOnRenk,ortaBlok);
    newCreateText(oUBTextXStruct);

    var oUBXCizgiAdi        = "OrtaBlokX";
    var oUBXKCizgiPos       = new THREE.Vector3(ouBKonum.x + x2 / 2,meshPosY - 10 /*offset*/ , 100)
    var oUBXKCizgiUzunluk   = 85;
    var oUBXKCizgiRotation  = new THREE.Vector3(0, 0 , 90);
    var oUBXKCizgiRenk      = 0xff0000;
    var oUBXKCizgiSize      = 1;
    var oUBXKArrowRenk      = 0x539823

    oUBXKCizgi = new KilavuzCizgi(oUBXCizgiAdi,oUBXKCizgiPos,oUBXKCizgiUzunluk,oUBXKCizgiRotation,
                                      oUBXKCizgiRenk,oUBXKCizgiSize,oUBXKArrowRenk,ortaBlok);

    var oUBTextYAdi         = "OrtaBlokYText"
    var oUBTextY            = "1m";
    var oUBTextYPosition    = new THREE.Vector3(ouBKonum.x + x2 / 2,meshPosY+2 /*offset*/ , 102)
    var oUBTextYRotation    = new THREE.Vector3(0, 0 , 90);
    var oUBTextYOnRenk      = 0x000000;
    var oUBTextYYanRenk     = 0x000000;
    oUBTextYStruct          = new TextStruct(oUBTextYAdi,oUBTextY , undefined ,oUBTextYPosition ,oUBTextYRotation,oUBTextYYanRenk,oUBTextYOnRenk,ortaBlok);
    newCreateText(oUBTextYStruct);


    var oUBYCizgiAdi        = "OrtaBlokY";
    var oUBYKCizgiPos       = new THREE.Vector3(ouBKonum.x + x2 / 2 +10,meshPosY+5 /*offset*/ , 102)
    var oUBYKCizgiUzunluk   = 10;
    var oUBYKCizgiRotation  = new THREE.Vector3(0, 0 , 0);
    var oUBYKCizgiRenk      = 0xff0000;
    var oUBYKCizgiSize      = 0.65;
    var oUBYKArrowRenk      = 0x111111

    oUBYKCizgi = new KilavuzCizgi(oUBYCizgiAdi,oUBYKCizgiPos,oUBYKCizgiUzunluk,oUBYKCizgiRotation,
                                      oUBYKCizgiRenk,oUBYKCizgiSize,oUBYKArrowRenk,ortaBlok);

    objeGroup.add(ortaBlok);

    //----------------------------------- Orta Blok SON-----------------------------------\\


    //----------------------------------- SAG ILK BLOK -----------------------------------\\

    var x3 = 15, y3 = 10;
    var sagIBParams           = ["SagIlkBlok" , 0 , y3-5 , x3-10 , y3 , x3 , y3 , x3 , 0]
    var sagIBCizgiSayi        = 4;
    var sagIBKonum            = new THREE.Vector3(ouBKonum.x + x2 + 5 , meshPosY,0);
    var sagIBFrame            = true;
    sagIlkBlokOBJ             = new BlokObje(sagIBParams,sagIBCizgiSayi,blokColor,
                                 sagIBKonum,sagIBFrame,frameColor,frameWitdh,sagBlok);
    yeniBlokObje(sagIlkBlokOBJ);


    var sagIBTextXAdi         = "SagIlkBlokXText"
    var sagIBTextX            = "1m";
    var sagIBTextXPosition    = new THREE.Vector3(sagIBKonum.x + x3 / 2 -5,meshPosY - 20 /*offset*/ , 100)
    var sagIBTextXRotation    = new THREE.Vector3(0, 0 , 0);
    var sagIBTextXOnRenk      = 0xffffff;
    var sagIBTextXYanRenk     = 0x000000;
    sagIBTextXStruct          = new TextStruct(sagIBTextXAdi,sagIBTextX , undefined ,sagIBTextXPosition ,sagIBTextXRotation,sagIBTextXYanRenk,sagIBTextXOnRenk,sagBlok);
    newCreateText(sagIBTextXStruct);


    var sagIBXCizgiAdi        = "SagIlkBlokX";
    var sagIBXKCizgiPos       = new THREE.Vector3(sagIBKonum.x + x3 / 2,meshPosY - 10 /*offset*/ , 100)
    var sagIBXKCizgiUzunluk   = 15;
    var sagIBXKCizgiRotation  = new THREE.Vector3(0, 0 , 90);
    var sagIBXKCizgiRenk      = 0xff0000;
    var sagIBXKCizgiSize      = 0.65;
    var sagIBXKArrowRenk      = 0x815148

    sagIBXKCizgi = new KilavuzCizgi(sagIBXCizgiAdi,sagIBXKCizgiPos,sagIBXKCizgiUzunluk,sagIBXKCizgiRotation,
                                      sagIBXKCizgiRenk,sagIBXKCizgiSize,sagIBXKArrowRenk,sagBlok);


 /*   var sagIBTextYAdi         = "SagIlkBlokYText"
    var sagIBTextY            = "1m";
    var sagIBTextYPosition    = new THREE.Vector3(sagIBKonum.x + x3 / 2,meshPosY +2, 102)
    var sagIBTextYRotation    = new THREE.Vector3(0, 0 , 90);
    var sagIBTextYOnRenk      = 0x000000;
    var sagIBTextYYanRenk     = 0x000000;
    sagIBTextYStruct          = new TextStruct(sagIBTextYAdi,sagIBTextY , undefined ,sagIBTextYPosition ,sagIBTextYRotation,sagIBTextYYanRenk,sagIBTextYOnRenk,sagBlok);
    newCreateText(sagIBTextYStruct);


    var sagIBYCizgiAdi        = "SagIlkBlokY";
    var sagIBYKCizgiPos       = new THREE.Vector3(sagIBKonum.x + x3 / 2 + 3,meshPosY + y2 / 2  , 102)
    var sagIBYKCizgiUzunluk   = 10;
    var sagIBYKCizgiRotation  = new THREE.Vector3(0, 0 , 0);
    var sagIBYKCizgiRenk      = 0xff0000;
    var sagIBYKCizgiSize      = 0.65;
    var sagIBYKArrowRenk      = 0x19485d

    sagIBYKCizgi = new KilavuzCizgi(sagIBYCizgiAdi,sagIBYKCizgiPos,sagIBYKCizgiUzunluk,sagIBYKCizgiRotation,
                                      sagIBYKCizgiRenk,sagIBYKCizgiSize,sagIBYKArrowRenk,sagBlok);
*/
    objeGroup.add(sagBlok);

    //----------------------------------- SAG ILK SON BLOK -----------------------------------\\

    //----------------------------------- SAG SON BLOK -----------------------------------\\

    var x4 = 25, y4 = 15;
    var sagSIBParams           = ["SagSonBlok" , 0 , y4 , x4 , y4, x4 , 0]
    var sagSIBCizgiSayi        = 3;
    var sagSIBKonum            = new THREE.Vector3(sagIBKonum.x + x3 + 2 , meshPosY,0);
    var sagSIBFrame            = true;
    sagSonBlokOBJ             = new BlokObje(sagSIBParams,sagSIBCizgiSayi,blokColor,
                                 sagSIBKonum,sagSIBFrame,frameColor,frameWitdh,sagSonBlok);
    yeniBlokObje(sagSonBlokOBJ);


    var sagSIBTextYAdi         = "SagSonBlokYText"
    var sagSIBTextY            = "1.5m";
    var sagSIBTextYPosition    = new THREE.Vector3(sagSIBKonum.x + x4 / 4,meshPosY +2 /*offset*/ , 102)
    var sagSIBTextYRotation    = new THREE.Vector3(0, 0 , 90);
    var sagSIBTextYOnRenk      = 0x000000;
    var sagSIBTextYYanRenk     = 0x000000;
    sagSIBTextYStruct          = new TextStruct(sagSIBTextYAdi,sagSIBTextY , undefined ,sagSIBTextYPosition ,sagSIBTextYRotation,sagSIBTextYYanRenk,sagSIBTextYOnRenk,sagSonBlok);
    newCreateText(sagSIBTextYStruct);


    var sagSIBYCizgiAdi        = "SagSonBlokY";
    var sagSIBYKCizgiPos       = new THREE.Vector3(sagSIBKonum.x + x4 / 4 + 3,meshPosY + y4 / 2 /*offset*/ , 102)
    var sagSIBYKCizgiUzunluk   = 15;
    var sagSIBYKCizgiRotation  = new THREE.Vector3(0, 0 , 0);
    var sagSIBYKCizgiRenk      = 0xff0000;
    var sagSIBYKCizgiSize      = 0.65;
    var sagSIBYKArrowRenk      = 0x8c0031

    sagSIBYKCizgi = new KilavuzCizgi(sagSIBYCizgiAdi,sagSIBYKCizgiPos,sagSIBYKCizgiUzunluk,sagSIBYKCizgiRotation,
                                      sagSIBYKCizgiRenk,sagSIBYKCizgiSize,sagSIBYKArrowRenk,sagSonBlok);


    var qminTextYAdi         = "QminYText"
    var qminTextY            = "1m";
    var qminTextYPosition    = new THREE.Vector3(sagSIBTextYPosition.x,meshPosY + y4 + 2 /*offset*/ , 102)
    var qminTextYRotation    = new THREE.Vector3(0, 0 , 90);
    var qminTextYOnRenk      = 0xffffff;
    var qminTextYYanRenk     = 0x000000;
    qminTextYStruct          = new TextStruct(qminTextYAdi,qminTextY , undefined ,qminTextYPosition ,qminTextYRotation,qminTextYYanRenk,qminTextYOnRenk,sagSonBlok);
    newCreateText(qminTextYStruct);


    var qminYCizgiAdi        = "QminY";
    var qminYKCizgiPos       = new THREE.Vector3(sagSIBYKCizgiPos.x,meshPosY + y4 + y4 / 2 /*offset*/ , 102)
    var qminYKCizgiUzunluk   = 10;
    var qminYKCizgiRotation  = new THREE.Vector3(0, 0 , 0);
    var qminYKCizgiRenk      = 0xff0000;
    var qminYKCizgiSize      = 0.65;
    var qminYKArrowRenk      = 0x5da9b5

    qminYKCizgi = new KilavuzCizgi(qminYCizgiAdi,qminYKCizgiPos,qminYKCizgiUzunluk,qminYKCizgiRotation,
                                      qminYKCizgiRenk,qminYKCizgiSize,qminYKArrowRenk,sagSonBlok);

    var qmaxTextYAdi         = "QmaxYText"
    var qmaxTextY            = "1.5m";
    var qmaxTextYPosition    = new THREE.Vector3(sagSIBTextYPosition.x + x4 / 2,meshPosY + y4 + 2 /*offset*/ , 102)
    var qmaxTextYRotation    = new THREE.Vector3(0, 0 , 90);
    var qmaxTextYOnRenk      = 0xffffff;
    var qmaxTextYYanRenk     = 0x000000;
    qmaxTextYStruct          = new TextStruct(qmaxTextYAdi,qmaxTextY , undefined ,qmaxTextYPosition ,qmaxTextYRotation,qmaxTextYYanRenk,qmaxTextYOnRenk,sagSonBlok);
    newCreateText(qmaxTextYStruct);


    var qmaxYCizgiAdi        = "QmaxY";
    var qmaxYKCizgiPos       = new THREE.Vector3(sagSIBYKCizgiPos.x + x4 / 2,meshPosY + y4 + y4 / 2 /*offset*/ , 102)
    var qmaxYKCizgiUzunluk   = 15;
    var qmaxYKCizgiRotation  = new THREE.Vector3(0, 0 , 0);
    var qmaxYKCizgiRenk      = 0xff0000;
    var qmaxYKCizgiSize      = 0.65;
    var qmaxYKArrowRenk      = 0x2c768a

    qmaxYKCizgi = new KilavuzCizgi(qmaxYCizgiAdi,qmaxYKCizgiPos,qmaxYKCizgiUzunluk,qmaxYKCizgiRotation,
                                      qmaxYKCizgiRenk,qmaxYKCizgiSize,qmaxYKArrowRenk,sagSonBlok);



    objeGroup.add(sagSonBlok);

    //----------------------------------- SAG SON SON BLOK -----------------------------------\\

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

    eventSource.mouseMove.connect(onDocumentMouseMove);
    eventSource.mouseUp.connect(onDocumentMouseUp);
    eventSource.mouseOut.connect(onDocumentMouseOut);
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
    eventSource.mouseMove.disconnect(onDocumentMouseMove);
    eventSource.mouseUp.disconnect(onDocumentMouseUp);
    eventSource.mouseOut.disconnect(onDocumentMouseOut);

}

function onDocumentMouseOut() {
    eventSource.mouseMove.disconnect(onDocumentMouseMove);
    eventSource.mouseUp.disconnect(onDocumentMouseUp);
    eventSource.mouseOut.disconnect(onDocumentMouseOut);
}
function changeBoyutOBJ(hangiNesne,newBoyut,Sonuc){
    if(Sonuc === 0 || Sonuc === undefined || Sonuc === "") Sonuc = false;
    if(newBoyut === 0 || newBoyut === undefined || newBoyut === "" || parseFloat(newBoyut) <= 0) return;
    if(solIlkBlokOBJ === undefined) return;
    switch(hangiNesne)
    {
    case "ZeminY":
        var eklenecekFark               = (parseFloat(newBoyut*10) - zeminBlokOBJ.parametre[2]);


        //BLok Objesi---
        solIlkBlokOBJ.parametre[2]      += eklenecekFark;
        solIlkBlokOBJ.parametre[4]      += eklenecekFark;
        changeBlokObje(solIlkBlokOBJ);
        //--------------

        //Kılavuz Çizgi
        sIBYKCizgi.konum.y              += eklenecekFark
        changeKilavuzCizgi(sIBYKCizgi);
        //-----------

        //TextSturct--------
        sIBTextYStruct.textPosition.y   += eklenecekFark
        changeText(sIBTextYStruct);
        //TextSturct--------

        //Kılavuz Çizgi
        sIBX2KCizgi.konum.y             = meshPosY +solIlkBlokOBJ.parametre[2] + 5;
        changeKilavuzCizgi(sIBX2KCizgi);
        //-----------

        //TextSturct--------
        sIBTextX2Struct.textPosition.y  = meshPosY +solIlkBlokOBJ.parametre[2] + 10;
        changeText(sIBTextX2Struct);
        //TextSturct--------

        //BLok Objesi---
        zeminBlokOBJ.parametre[2]       = parseFloat(newBoyut) * 10;
        zeminBlokOBJ.parametre[4]       = parseFloat(newBoyut) * 10;
        changeBlokObje(zeminBlokOBJ);
        //BLok Objesi---

        //Kılavuz Çizgi
        zYKCizgi.uzunluk              = parseFloat(newBoyut) * 10;
        zYKCizgi.konum.y             = meshPosY + parseFloat(newBoyut) * 10 / 2
        changeKilavuzCizgi(zYKCizgi);
        //-----------

        //TextSturct--------
        zTextYStruct.text = newBoyut + "m";
        zTextYStruct.textPosition.y   = meshPosY + parseFloat(newBoyut) * 10 / 2 - 5;
        changeText(zTextYStruct);
        //TextSturct--------

        break;
    case "SIBX1":
        var eklenecekFark               = (parseFloat(newBoyut*10) - solIlkBlokOBJ.parametre[5]);
        for(var i = 2; i <objeGroup.children.length;i++)
        {
            objeGroup.children[i].position.x             += eklenecekFark;
        }
        //BLok Objesi---
        solIlkBlokOBJ.parametre[5]      = newBoyut * 10;
        solIlkBlokOBJ.parametre[7]      = newBoyut * 10;
        changeBlokObje(solIlkBlokOBJ);
        //--------------

        //Kılavuz Çizgi
        sIBXKCizgi.uzunluk              = parseFloat(newBoyut) * 10;
        sIBXKCizgi.konum.x              = solIlkBlokOBJ.blokPos.x + newBoyut * 10 / 2;
        changeKilavuzCizgi(sIBXKCizgi);
        //-----------

        //TextSturct--------
        sIBTextXStruct.text = newBoyut + "m";
        sIBTextXStruct.textPosition.x   = solIlkBlokOBJ.blokPos.x + solIlkBlokOBJ.parametre[5] / 2 -5;
        changeText(sIBTextXStruct);
        //TextSturct--------
        break;
    case "SIBX2":
        //BLok Objesi---
        solIlkBlokOBJ.parametre[3]      = newBoyut * 10;
        changeBlokObje(solIlkBlokOBJ);
        //--------------

        //Kılavuz Çizgi
        sIBX2KCizgi.uzunluk              = parseFloat(newBoyut) * 10;
        sIBX2KCizgi.konum.x              = solIlkBlokOBJ.blokPos.x + newBoyut * 10 / 2;
        changeKilavuzCizgi(sIBX2KCizgi);
        //-----------

        //TextSturct--------
        sIBTextX2Struct.text = newBoyut + "m";
        sIBTextX2Struct.textPosition.x   = solIlkBlokOBJ.blokPos.x + solIlkBlokOBJ.parametre[3] / 2 -5;
        changeText(sIBTextX2Struct);
        //TextSturct--------
        break;
    case "SIBY":
        var newText;
        if(Sonuc === false)
        {
            newBoyut = 9;
            newText  ="BY";
        }else{
            newText  = newBoyut + "m";
        }

        //BLok Objesi---
        solIlkBlokOBJ.parametre[2]      = newBoyut * 10 + zeminBlokOBJ.parametre[2];
        solIlkBlokOBJ.parametre[4]      = newBoyut * 10 + zeminBlokOBJ.parametre[2];
        changeBlokObje(solIlkBlokOBJ);
        //--------------

        //Kılavuz Çizgi
        sIBYKCizgi.uzunluk              = parseFloat(newBoyut) * 10;
        sIBYKCizgi.konum.y              = solIlkBlokOBJ.blokPos.y+ zeminBlokOBJ.parametre[2] + newBoyut * 10 / 2;
        changeKilavuzCizgi(sIBYKCizgi);
        //-----------

        //TextSturct--------
        sIBTextYStruct.text             = newText
        sIBTextYStruct.textPosition.y   = solIlkBlokOBJ.blokPos.y + zeminBlokOBJ.parametre[2] / 2 + solIlkBlokOBJ.parametre[2] / 2 -5;
        changeText(sIBTextYStruct);
        //TextSturct--------

        //Kılavuz Çizgi
        sIBX2KCizgi.konum.y             = meshPosY +solIlkBlokOBJ.parametre[2] + 5;
        changeKilavuzCizgi(sIBX2KCizgi);
        //-----------

        //TextSturct--------
        sIBTextX2Struct.textPosition.y  = meshPosY +solIlkBlokOBJ.parametre[2] + 10;
        changeText(sIBTextX2Struct);
        //TextSturct--------

        break;

    case "OUBX":
        //Şimdilik
        var eklenecekFark               = (parseFloat(newBoyut*10) - ortaUzunBlokOBJ.parametre[5]);
        for(var i = 3; i <objeGroup.children.length;i++)
        {
            objeGroup.children[i].position.x             += eklenecekFark;
        }
        //BLok Objesi---
        ortaUzunBlokOBJ.parametre[3]      = newBoyut * 10;
        ortaUzunBlokOBJ.parametre[5]      = newBoyut * 10;
        changeBlokObje(ortaUzunBlokOBJ);
        //--------------

        //Kılavuz Çizgi
        oUBXKCizgi.uzunluk              = parseFloat(newBoyut) * 10;
        oUBXKCizgi.konum.x              = ortaUzunBlokOBJ.blokPos.x + newBoyut * 10 / 2;
        changeKilavuzCizgi(oUBXKCizgi);
        //-----------

        //Kılavuz Çizgi
        oUBYKCizgi.konum.x              = ortaUzunBlokOBJ.blokPos.x + ortaUzunBlokOBJ.parametre[5] / 2 +3
        changeKilavuzCizgi(oUBYKCizgi);
        //-----------


        //TextSturct--------
        oUBTextXStruct.text = newBoyut + "m";
        oUBTextXStruct.textPosition.x   = ortaUzunBlokOBJ.blokPos.x + ortaUzunBlokOBJ.parametre[5] / 2 -5;
        changeText(oUBTextXStruct);
        //TextSturct--------


        //TextSturct--------
        oUBTextYStruct.textPosition.x   = ortaUzunBlokOBJ.blokPos.x + ortaUzunBlokOBJ.parametre[5] / 2
        changeText(oUBTextYStruct);
        //TextSturct--------




        break;
    case "OUBY":
        //BLok Objesi---
        ortaUzunBlokOBJ.parametre[2]      = newBoyut * 10;
        ortaUzunBlokOBJ.parametre[4]      = newBoyut * 10;
        changeBlokObje(ortaUzunBlokOBJ);
        //--------------

        //Kılavuz Çizgi
        oUBYKCizgi.uzunluk              = parseFloat(newBoyut) * 10;
        oUBYKCizgi.konum.y              = ortaUzunBlokOBJ.blokPos.y + newBoyut * 10 / 2;
        changeKilavuzCizgi(oUBYKCizgi);
        //-----------

        //TextSturct--------
        oUBTextYStruct.text             = newBoyut + "m";
        oUBTextYStruct.textPosition.y   = ortaUzunBlokOBJ.blokPos.y + ortaUzunBlokOBJ.parametre[2] / 2 -5;
        changeText(oUBTextYStruct);
        //TextSturct--------
        break;

    case "SAGIBX":
        var eklenecekFark                   = (parseFloat(newBoyut*10) - sagIlkBlokOBJ.parametre[5]);

        for(var i = 4; i <objeGroup.children.length;i++)
        {
            objeGroup.children[i].position.x             += eklenecekFark;
        }
        //BLok Objesi---
        sagIlkBlokOBJ.parametre[5]          = newBoyut * 10;
        sagIlkBlokOBJ.parametre[7]          = newBoyut * 10;
        changeBlokObje(sagIlkBlokOBJ);
        //--------------

        //Kılavuz Çizgi
        sagIBXKCizgi.uzunluk              = parseFloat(newBoyut) * 10;
        sagIBXKCizgi.konum.x              = sagIlkBlokOBJ.blokPos.x + newBoyut * 10 / 2;
        changeKilavuzCizgi(sagIBXKCizgi);
        //-----------

        /*//Kılavuz Çizgi
        sagIBYKCizgi.konum.x               = sagIlkBlokOBJ.blokPos.x + sagIlkBlokOBJ.parametre[5] / 2 +3;
        changeKilavuzCizgi(sagIBYKCizgi);
        //-----------
        */
        //TextSturct--------
        sagIBTextXStruct.text = newBoyut + "m";
        sagIBTextXStruct.textPosition.x   = sagIlkBlokOBJ.blokPos.x + sagIlkBlokOBJ.parametre[5] / 2 -5;
        changeText(sagIBTextXStruct);
        //TextSturct--------

        //TextSturct--------
        sagIBTextYStruct.textPosition.x   = sagIlkBlokOBJ.blokPos.x + sagIlkBlokOBJ.parametre[5] / 2
        changeText(sagIBTextYStruct);
        //TextSturct--------

        break;
    case "SAGSIBY":
        //BLok Objesi---
        sagSonBlokOBJ.parametre[2]       = newBoyut * 10;
        sagSonBlokOBJ.parametre[4]       = newBoyut * 10;
        changeBlokObje(sagSonBlokOBJ);
        sagIlkBlokOBJ.parametre[4]       = newBoyut * 10 - 5;
        sagIlkBlokOBJ.parametre[6]       = newBoyut * 10 - 5;
        changeBlokObje(sagIlkBlokOBJ);
        //--------------

        //Kılavuz Çizgi
        sagSIBYKCizgi.uzunluk             = parseFloat(newBoyut) * 10;
        sagSIBYKCizgi.konum.y             = meshPosY + parseFloat(newBoyut) * 10 / 2;
        changeKilavuzCizgi(sagSIBYKCizgi);
        //-----------

        //TextSturct--------
        sagSIBTextYStruct.text             = newBoyut + "m";
        sagSIBTextYStruct.textPosition.y   = meshPosY + parseFloat(newBoyut) * 10 / 2 - 5;
        changeText(sagSIBTextYStruct);
        //TextSturct--------

        //Kılavuz Çizgi
        qminYKCizgi.konum.y             = meshPosY + parseFloat(newBoyut) * 10 + qminYKCizgi.uzunluk/2;
        changeKilavuzCizgi(qminYKCizgi);
        //-----------

        //TextSturct--------
        qminTextYStruct.textPosition.y   = meshPosY +parseFloat(newBoyut) * 10 + qminYKCizgi.uzunluk/2;
        changeText(qminTextYStruct);
        //TextSturct--------

        //Kılavuz Çizgi
        qmaxYKCizgi.konum.y             = meshPosY + parseFloat(newBoyut) * 10 + qmaxYKCizgi.uzunluk/2;
        changeKilavuzCizgi(qmaxYKCizgi);
        //-----------

        //TextSturct--------
        qmaxTextYStruct.textPosition.y   = meshPosY +parseFloat(newBoyut) * 10-5 + qmaxYKCizgi.uzunluk /2;
        changeText(qmaxTextYStruct);
        //TextSturct--------
        break;
    case "qminY":

        //Kılavuz Çizgi
        qminYKCizgi.uzunluk             = parseFloat(newBoyut) * 10
        qminYKCizgi.konum.y             = meshPosY+ sagSonBlokOBJ.parametre[2] + parseFloat(newBoyut) * 10 / 2;
        changeKilavuzCizgi(qminYKCizgi);
        //-----------

        //TextSturct--------
        qminTextYStruct.text             = newBoyut + "m";
        qminTextYStruct.textPosition.y   = meshPosY + sagSonBlokOBJ.parametre[2] + parseFloat(newBoyut) * 10 / 2 - 4;
        changeText(qminTextYStruct);
        //TextSturct--------

        break;
    case "qmaxY":

        //Kılavuz Çizgi
        qmaxYKCizgi.uzunluk             = parseFloat(newBoyut) * 10
        qmaxYKCizgi.konum.y             = meshPosY + sagSonBlokOBJ.parametre[2] + parseFloat(newBoyut) * 10 / 2;
        changeKilavuzCizgi(qmaxYKCizgi);
        //-----------

        //TextSturct--------
        qmaxTextYStruct.text             = newBoyut + "m";
        qmaxTextYStruct.textPosition.y   = meshPosY + sagSonBlokOBJ.parametre[2] + parseFloat(newBoyut) * 10 / 2 - 4;
        changeText(qmaxTextYStruct);
        //TextSturct--------

        break;
    }


}


