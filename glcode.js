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
var meshPosY = -10 , meshPosX = -65;
var hatMeshPosY = -10 , hatMeshPosX = 80;
var e_mX , e_mY;
var camYariCap = 170;
var objeGroup = new THREE.Group();

var solIlkBlokOBJ , sIBXKCizgi , sIBYKCizgi , sIBTextXStruct, sIBTextYStruct;
var solBlok     = new THREE.Group();

var ortaUzunBlokOBJ , oUBTextXStruct , oUBXKCizgi, oUBTextYStruct, oUBYKCizgi;
var ortaBlok    = new THREE.Group();

var sagIlkBlokOBJ , sagIBTextXStruct , sagIBXKCizgi, sagIBTextYStruct, sagIBYKCizgi;
var sagBlok     = new THREE.Group();

var sagSonBlokOBJ , sagSIBTextXStruct , sagSIBXKCizgi, sagSIBTextYStruct, sagSIBYKCizgi;
var sagSonBlok     = new THREE.Group();


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
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    //*---- INIT ----*\\
    initBlokObje(objeGroup,scene);
    initKilavuzCizgi(objeGroup,scene);
    initYazi(objeGroup,scene);
    //*---- INIT ----*\\



    //----------------------------------- Sol İlk Blok -----------------------------------\\
    var x1 = 25, y1 = 35;
    var tepeX1              = 6;
    var tepeInisY1          = 10;
    var sIBParams           = ["SolIlkBlok" , 0 , y1 , tepeX1 , y1 , x1 , tepeInisY1 , x1 , 0 , 0 , 0]
    var sIBCizgiSayi        = 5;
    var sIBKonum            = new THREE.Vector3(meshPosX,meshPosY,0);
    var sIBFrame            = true;

    solIlkBlokOBJ           = new BlokObje(sIBParams,sIBCizgiSayi,blokColor,
                                 sIBKonum,sIBFrame,frameColor,frameWitdh,solBlok);
    yeniBlokObje(solIlkBlokOBJ);



    var sIBTextXAdi         = "SolBlokXText"
    var sIBTextX            = "2.5m";
    var sIBTextXPosition    = new THREE.Vector3(sIBKonum.x + x1 / 2 -5,meshPosY - 20 /*offset*/ , 100);
    var sIBTextXRotation    = new THREE.Vector3(0, 0 , 0);
    var sIBTextXOnRenk      = 0xffffff;
    var sIBTextXYanRenk     = 0x000000;
    sIBTextXStruct          = new TextStruct(sIBTextXAdi,sIBTextX, undefined/*daha mesh yok*/ ,sIBTextXPosition ,sIBTextXRotation,sIBTextXYanRenk,sIBTextXOnRenk,solBlok)
    newCreateText(sIBTextXStruct);

    var sIBXCizgiAdi        = "SolIlkBlokX";
    var sIBXKCizgiPos       = new THREE.Vector3(sIBKonum.x + x1 / 2,meshPosY - 10 /*offset*/ , 100)
    var sIBXKCizgiUzunluk   = 25;
    var sIBXKCizgiRotation  = new THREE.Vector3(0, 0 , 90);
    var sIBXKCizgiRenk      = 0xff0000;
    var sIBXKCizgiSize      = 0.85;
    var sIBXKCizgiArrowRenk = 0x9404c1
    sIBXKCizgi              = new KilavuzCizgi(sIBXCizgiAdi,sIBXKCizgiPos,sIBXKCizgiUzunluk,
                                  sIBXKCizgiRotation,sIBXKCizgiRenk,sIBXKCizgiSize,sIBXKCizgiArrowRenk,solBlok);



    var sIBTextYAdi         = "SolBlokYText"
    var sIBTextY            = "3.5m";
    var sIBTextYPosition    = new THREE.Vector3(sIBKonum.x - x1/2,meshPosY + 10 /*offset*/ , 100);
    var sIBTextYRotation    = new THREE.Vector3(0, 0 , 90);
    var sIBTextYOnRenk      = 0xffffff;
    var sIBTextYYanRenk     = 0x000000;
    sIBTextYStruct          = new TextStruct(sIBTextYAdi,sIBTextY, undefined/*daha mesh yok*/ ,sIBTextYPosition ,sIBTextYRotation,sIBTextYYanRenk,sIBTextYOnRenk,solBlok)
    newCreateText(sIBTextYStruct);

    var sIBYCizgiAdi        = "SolIlkBlokY";
    var sIBYKCizgiPos       = new THREE.Vector3(sIBKonum.x - x1 / 2 +5,meshPosY +35/2 /*offset*/ , 100)
    var sIBYKCizgiUzunluk   = 35;
    var sIBYKCizgiRotation  = new THREE.Vector3(0, 0 , 0);
    var sIBYKCizgiRenk      = 0xff0000;
    var sIBYKCizgiSize      = 0.65;
    var sIBYKCizgiArrowRenk = 0x147461
    sIBYKCizgi              = new KilavuzCizgi(sIBYCizgiAdi,sIBYKCizgiPos,sIBYKCizgiUzunluk,
                                  sIBYKCizgiRotation,sIBYKCizgiRenk,sIBYKCizgiSize,sIBYKCizgiArrowRenk,solBlok);

    objeGroup.add(solBlok);

    //----------------------------------- Sol İlk Blok SON-----------------------------------\\


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

    var x3 = 15, y3 = 15;
    var sagIBParams           = ["SagIlkBlok" , 0 , y3-5 , x3-10 , y3 , x3 , y3, x3, y3+2, x3+2,y3+2, x3+2 , 0 , 0 , 0]
    var sagIBCizgiSayi        = 7;
    var sagIBKonum            = new THREE.Vector3(ouBKonum.x + x2 + 5 , meshPosY,0);
    var sagIBFrame            = true;
    sagIlkBlokOBJ             = new BlokObje(sagIBParams,sagIBCizgiSayi,blokColor,
                                 sagIBKonum,sagIBFrame,frameColor,frameWitdh,sagBlok);
    yeniBlokObje(sagIlkBlokOBJ);


    var sagIBTextXAdi         = "SagIlkBlokXText"
    var sagIBTextX            = "1.5m";
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


    var sagIBTextYAdi         = "SagIlkBlokYText"
    var sagIBTextY            = "1.5m";
    var sagIBTextYPosition    = new THREE.Vector3(sagIBKonum.x + x3 / 2,meshPosY +2 /*offset*/ , 102)
    var sagIBTextYRotation    = new THREE.Vector3(0, 0 , 90);
    var sagIBTextYOnRenk      = 0x000000;
    var sagIBTextYYanRenk     = 0x000000;
    sagIBTextYStruct          = new TextStruct(sagIBTextYAdi,sagIBTextY , undefined ,sagIBTextYPosition ,sagIBTextYRotation,sagIBTextYYanRenk,sagIBTextYOnRenk,sagBlok);
    newCreateText(sagIBTextYStruct);


    var sagIBYCizgiAdi        = "SagIlkBlokY";
    var sagIBYKCizgiPos       = new THREE.Vector3(sagIBKonum.x + x3 / 2 +3,meshPosY+7.5 /*offset*/ , 102)
    var sagIBYKCizgiUzunluk   = 15;
    var sagIBYKCizgiRotation  = new THREE.Vector3(0, 0 , 0);
    var sagIBYKCizgiRenk      = 0xff0000;
    var sagIBYKCizgiSize      = 0.65;
    var sagIBYKArrowRenk      = 0x19485d

    sagIBYKCizgi = new KilavuzCizgi(sagIBYCizgiAdi,sagIBYKCizgiPos,sagIBYKCizgiUzunluk,sagIBYKCizgiRotation,
                                      sagIBYKCizgiRenk,sagIBYKCizgiSize,sagIBYKArrowRenk,sagBlok);

    objeGroup.add(sagBlok);

    //----------------------------------- SAG ILK SON BLOK -----------------------------------\\
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
function changeBoyutOBJ(hangiNesne,newBoyut){

    if(newBoyut === 0 || newBoyut === undefined || newBoyut === "") return;

    switch(hangiNesne)
    {
    case "SIBX":
        //Şimdilik
        var eklenecekFark               = (parseFloat(newBoyut*10) - solIlkBlokOBJ.parametre[5]);
        for(var i = 1; i <objeGroup.children.length;i++)
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
    case "SIBY":
        //BLok Objesi---
        solIlkBlokOBJ.parametre[2]      = newBoyut * 10;
        solIlkBlokOBJ.parametre[4]      = newBoyut * 10;
        changeBlokObje(solIlkBlokOBJ);
        //--------------

        //Kılavuz Çizgi
        sIBYKCizgi.uzunluk              = parseFloat(newBoyut) * 10;
        sIBYKCizgi.konum.y              = solIlkBlokOBJ.blokPos.y + newBoyut * 10 / 2;
        changeKilavuzCizgi(sIBYKCizgi);
        //-----------

        //TextSturct--------
        sIBTextYStruct.text             = newBoyut + "m";
        sIBTextYStruct.textPosition.y   = solIlkBlokOBJ.blokPos.y + solIlkBlokOBJ.parametre[2] / 2 -5;
        changeText(sIBTextYStruct);
        //TextSturct--------
        break;

    case "OUBX":
        //Şimdilik
        var eklenecekFark               = (parseFloat(newBoyut*10) - ortaUzunBlokOBJ.parametre[5]);
        for(var i = 2; i <objeGroup.children.length;i++)
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
        //Şimdilik
        var eklenecekFark                   = (parseFloat(newBoyut*10) - sagIlkBlokOBJ.parametre[5]);
        //BLok Objesi---
        sagIlkBlokOBJ.parametre[5]          = newBoyut * 10;
        sagIlkBlokOBJ.parametre[7]          = newBoyut * 10;
        sagIlkBlokOBJ.parametre[9]          = newBoyut * 10 + 2;
        sagIlkBlokOBJ.parametre[11]         = newBoyut * 10 + 2;
        changeBlokObje(sagIlkBlokOBJ);
        //--------------

        //Kılavuz Çizgi
        sagIBXKCizgi.uzunluk              = parseFloat(newBoyut) * 10;
        sagIBXKCizgi.konum.x              = sagIlkBlokOBJ.blokPos.x + newBoyut * 10 / 2;
        changeKilavuzCizgi(sagIBXKCizgi);
        //-----------

        //Kılavuz Çizgi
        sagIBYKCizgi.konum.x               = sagIlkBlokOBJ.blokPos.x + sagIlkBlokOBJ.parametre[5] / 2 +3;
        changeKilavuzCizgi(sagIBYKCizgi);
        //-----------

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
    case "SAGIBY":
        //BLok Objesi---
        sagIlkBlokOBJ.parametre[4]       = newBoyut * 10;
        sagIlkBlokOBJ.parametre[6]       = newBoyut * 10;
        sagIlkBlokOBJ.parametre[8]       = newBoyut * 10 + 2;
        sagIlkBlokOBJ.parametre[10]      = newBoyut * 10 + 2;
        changeBlokObje(sagIlkBlokOBJ);
        //--------------

        //Kılavuz Çizgi
        sagIBYKCizgi.uzunluk               = parseFloat(newBoyut) * 10;
        sagIBYKCizgi.konum.y               = sagIlkBlokOBJ.blokPos.y + newBoyut * 10 / 2;
        changeKilavuzCizgi(sagIBYKCizgi);
        //-----------

        //TextSturct--------
        sagIBTextYStruct.text             = newBoyut + "m";
        sagIBTextYStruct.textPosition.y   = sagIlkBlokOBJ.blokPos.y + sagIlkBlokOBJ.parametre[4] / 2 -5;
        changeText(sagIBTextYStruct);
        //TextSturct--------
        break;
    }


}


