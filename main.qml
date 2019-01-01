import QtQuick 2.4
import QtCanvas3D 1.1
import QtQuick.Window 2.2

import "glcode.js" as GLCode
import "iletimCanvasJs.js" as ICanvas
import "Islemler.js" as Islem
import "TextDoldurucu.js" as TxtDoldurucu
import "HataKontrol.js" as Kontrol


Window {
    id : anaEkran
    title: qsTr("baglamaHesap")
    width: 1280
    height: 720
    minimumWidth: 1280
    minimumHeight: 720
    visible: true


    FontLoader { id: robotoRegular; source: "fonts/Roboto-Regular.ttf" }

    Rectangle{
        id: sagFrame
        height: parent.height
        width: parent.width / 10
        color: "#262626"
        SagFrameButton
        {
            id : hesapButton
            imgPath: "img/gear.png"
            toolTipText: "<b>Hesap</b>"
            m_btnMouseArea.onClicked: {
                hesapMenu.visible = true;
                designMenu.visible = false;
            }
            checkableButton: true
            myCheck: true
            state : "MouseOn"

        }
        SagFrameButton
        {
            id : designButton
            anchors.top: hesapButton.bottom
            anchors.topMargin: 1
            imgPath: "img/design.png"
            toolTipText: "<b>Dizayn</b>"
            m_btnMouseArea.onClicked: {
                hesapMenu.visible = false;
                designMenu.visible = true;
                focus = sabitCanvas3D;
            }
            checkableButton: true
        }
        SagFrameButton
        {
            id : analizButton
            anchors.top: designButton.bottom
            anchors.topMargin: 1
            imgPath: "img/analiz.png"
            toolTipText: "<b>Analiz</b>"
            m_btnMouseArea.onClicked: {

                if(!startButton.enabled){

                    //---İletim Kanal Hesap---\\
                    var tX = solTrapezX.textFieldSelf.text;
                    var tY = solTrapezY.textFieldSelf.text;
                    var ta = suBlokX1.textFieldSelf.text;
                    var qa = qalinanTextInput.textFieldSelf.text;
                    var mk = manningTextInput.textFieldSelf.text;
                    var j  = egimTxtInput.textFieldSelf.text;
                    var hp = havaPayiTextInput.textFieldSelf.text;
                    if(Kontrol.iletimCanvasCozumKontrol(tX,tY,ta,qa,mk,j,hp))return;
                    Islem.iletimCanvasCozum(tX,tY,ta,qa,mk,j,hp)

                    TxtDoldurucu.initDoldurucu(Islem);
                    TxtDoldurucu.iletimKanalText(qRJFormul,iletimAlan,
                                                 iletimCevre,iletimCap,qRJSonuc,
                                                 ySonuc,tabanSonuc
                                                 ,bSonuc,kanalUstKotSonuc)
                    sabitCanvas3D2.height = parent.height / 1.7;
                    sabitCanvas3D.height = parent.height / 1.7;
                    var xonuc = parseFloat(Islem.tX * Islem.iletimY).toFixed(3);
                    var yonuc = parseFloat(Islem.tY * Islem.iletimY).toFixed(3);
                    ICanvas.changeBoyutOBJ( "SolTX",xonuc,true);
                    ICanvas.changeBoyutOBJ( "SolTY",yonuc,true);

                    ICanvas.changeBoyutOBJ( "SagTX",xonuc,true);
                    ICanvas.changeBoyutOBJ( "SagTY",yonuc,true);

                    ICanvas.changeBoyutOBJ( "SuX1",Islem.tabanSonuc,true);
                    ICanvas.changeBoyutOBJ( "SuX2",Islem.GenislikSonuc,true);
                    ICanvas.changeBoyutOBJ( "SuY", yonuc,true);
                    //---İletim Kanal Hesap---\\

                    //---Bağlama Hesap---\\
                    var qmin = qminTextInput.textFieldSelf.text
                    var qal  = qalinanTextInput.textFieldSelf.text;
                    var cs   = savakKatSayiTxtInput.textFieldSelf.text;
                    var bnb  = baglamaNetBoyuTxtInput.textFieldSelf.text;
                    var ktk  = tabanKotuTxtInput.textFieldSelf.text;
                    var sy   = yonuc;
                    var yyk  = yerselYukTxtInput.textFieldSelf.text;
                    var kb   = iletimKanalTxtInput.textFieldSelf.text;
                    var egim = j;
                    var tk   = talvegKotTxtInput.textFieldSelf.text;
                    Islem.baglamaBYBulma(qmin,qal,cs,bnb,ktk,sy,yyk,kb,egim,tk);
                    console.log(Islem.BY);

                    //---Bağlama Hesap---\\
                    startButton.enabled = true;
                    iletimCanvasTextInputlar.visible = false;
                    iletimCanvasSonuc.visible = true;
                    baglamaSonuc.visible = true;
                }else{
                    sabitCanvas3D2.height = parent.height / 1.5;
                    sabitCanvas3D.height = parent.height / 1.5;

                    ICanvas.changeBoyutOBJ( "SolTX",solTrapezX.textFieldSelf.text);
                    ICanvas.changeBoyutOBJ( "SolTY",solTrapezY.textFieldSelf.text);

                    ICanvas.changeBoyutOBJ( "SagTX",solTrapezX.textFieldSelf.text);
                    ICanvas.changeBoyutOBJ( "SagTY",solTrapezY.textFieldSelf.text);

                    ICanvas.changeBoyutOBJ( "SuX1",suBlokX1.textFieldSelf.text);
                    ICanvas.changeBoyutOBJ( "SuX2","B");
                    ICanvas.changeBoyutOBJ( "SuY", solTrapezY.textFieldSelf.text);

                    startButton.enabled = false;
                    iletimCanvasTextInputlar.visible = true;
                    iletimCanvasSonuc.visible = false;
                    baglamaSonuc.visible = false;
                }
            }

        }
        SagFrameButton
        {
            id : startButton
            anchors.top: analizButton.bottom
            anchors.topMargin: 1
            imgPath: "img/start.png"
            toolTipText: "<b>Başlat</b>"
            enabled: false
        }

        SagFrameButton
        {
            id : acButon
            anchors.bottom: parent.bottom
            imgPath: "img/open.png"
            toolTipText: "<b>İçeri Aktar</b>"

        }

        SagFrameButton
        {
            id : kaydetButon
            anchors.bottom: acButon.top
            anchors.bottomMargin: 1
            imgPath: "img/save.png"
            toolTipText: "<b>Kaydet</b>"

        }




    }

    Rectangle{
        id : hesapMenu
        width: parent.width - sagFrame.width
        height: parent.height
        anchors.left: sagFrame.right
        color: "#cfcfcf"
        visible: true

        Text {
            x : 10
            y : 5
            id: tabanKotuTxt
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Çıkış Taban Kotu")
        }
        KobliTextInput{
            id : tabanKotuTxtInput
            anchors.top: tabanKotuTxt.bottom
            anchors.topMargin: 15
            x : 10
            inputText: "600"
            imgPath: "img/height.png"
            KeyNavigation.tab: iletimKanalTxtInput.textFieldSelf
            toolTipText: "Birim : Metre"
        }
        Text {
            id : iletimKanalTxt
            anchors.top: tabanKotuTxtInput.bottom
            anchors.topMargin: 30
            x : 10
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("İletim Kanalı Boyu")
        }
        KobliTextInput{
            id : iletimKanalTxtInput
            x : 10
            anchors.top: iletimKanalTxt.bottom
            anchors.topMargin: 15
            inputText: "10000"
            imgPath: "img/pipe.png"
            KeyNavigation.tab: egimTxtInput.textFieldSelf
            toolTipText: "Birim Metre"
        }

        Text {
            id : egimTxt
            anchors.top: iletimKanalTxtInput.bottom
            anchors.topMargin: 30
            x : 10
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Eğimi Giriniz (J)")
        }
        KobliTextInput{
            id : egimTxtInput
            x : 10
            anchors.top: egimTxt.bottom
            anchors.topMargin: 15
            imgPath: "img/triangle.png"
            inputText: "0.0005"
            KeyNavigation.tab: yerselYukTxtInput.textFieldSelf
            toolTipText: "Birimsiz."
        }

        Text {
            id : yerselYukTxt
            anchors.top: egimTxtInput.bottom
            anchors.topMargin: 30
            x : 10
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Yersel Yük Kayıpları")
        }
        KobliTextInput{
            id : yerselYukTxtInput
            x : 10
            anchors.top: yerselYukTxt.bottom
            anchors.topMargin: 15
            inputText: "0.40"
            imgPath: "img/yerselyuk.png"
            KeyNavigation.tab: talvegKotTxtInput.textFieldSelf
            toolTipText: "Birim Metre"
        }

        Text {
            id : talvegKotTxt
            anchors.top: yerselYukTxtInput.bottom
            anchors.topMargin: 30
            x : 10
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Bağlamanın Talveg Kotu")
        }
        KobliTextInput{
            id : talvegKotTxtInput
            x : 10
            anchors.top: talvegKotTxt.bottom
            anchors.topMargin: 15
            inputText: "595"
            imgPath: "img/talveg.png"
            KeyNavigation.tab: savakKatSayiTxtInput.textFieldSelf
            toolTipText: "Birim Metre"
        }

        Text {
            id : savakKatSayiTxt
            anchors.left: tabanKotuTxt.right
            anchors.leftMargin: 120
            y : 5
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Savak Katsayısı")
        }
        KobliTextInput{
            id : savakKatSayiTxtInput
            anchors.top: savakKatSayiTxt.bottom
            anchors.left: savakKatSayiTxt.left
            anchors.topMargin: 15
            inputText: "2.0"
            imgPath: "img/savak.png"
            KeyNavigation.tab: laneKatSayiTxtInput.textFieldSelf
            toolTipText: "Birimsiz."
        }

        Text {
            id : laneKatSayiTxt
            anchors.top : savakKatSayiTxtInput.bottom
            anchors.topMargin: 30
            anchors.left: savakKatSayiTxt.left
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Lane Katsayısı")
        }
        KobliTextInput{
            id : laneKatSayiTxtInput
            anchors.top: laneKatSayiTxt.bottom
            anchors.left: laneKatSayiTxt.left
            anchors.topMargin: 15
            inputText: "4.0"
            imgPath: "img/katsayi.png"
            KeyNavigation.tab: baglamaNetBoyuTxtInput.textFieldSelf
            toolTipText: "Birimsiz."
        }

        Text {
            id : baglamaNetBoyuTxt
            anchors.top : laneKatSayiTxtInput.bottom
            anchors.topMargin: 30
            anchors.left: savakKatSayiTxt.left
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Bağlamanın Net Boyu")
        }
        KobliTextInput{
            id : baglamaNetBoyuTxtInput
            anchors.top: baglamaNetBoyuTxt.bottom
            anchors.left: baglamaNetBoyuTxt.left
            anchors.topMargin: 15
            inputText: "50"
            imgPath: "img/height.png"
            KeyNavigation.tab: qmaksTextInput.textFieldSelf
            toolTipText: "Birim Metre"
        }

        Text {
            id : qmaksText
            anchors.top : baglamaNetBoyuTxtInput.bottom
            anchors.topMargin: 30
            anchors.left: savakKatSayiTxt.left
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Maksimum Debi (Qmaks)")
        }
        KobliTextInput{
            id : qmaksTextInput
            anchors.top: qmaksText.bottom
            anchors.left: qmaksText.left
            anchors.topMargin: 15
            inputText: "200"
            imgPath: "img/maksdebi.png"
            KeyNavigation.tab: qminTextInput.textFieldSelf
            toolTipText: "Birim m³/sn"
        }

        Text {
            id : qminText
            anchors.top : qmaksTextInput.bottom
            anchors.topMargin: 30
            anchors.left: savakKatSayiTxt.left
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Minimum Debi (Qmin)")
        }
        KobliTextInput{
            id : qminTextInput
            anchors.top: qminText.bottom
            anchors.left: qminText.left
            anchors.topMargin: 15
            inputText: "30"
            imgPath: "img/mindebi.png"
            KeyNavigation.tab: qalinanTextInput.textFieldSelf
            toolTipText: "Birim m³/sn"
        }

        Text {
            id : qalinanText
            y : 5
            anchors.left: savakKatSayiTxt.right
            anchors.leftMargin: 120
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Alınan Debi (Qalınan)")
        }
        KobliTextInput{
            id : qalinanTextInput
            anchors.top: qalinanText.bottom
            anchors.left: qalinanText.left
            anchors.topMargin: 15
            inputText: "10"
            imgPath: "img/aldebi.png"
            KeyNavigation.tab: bhaTextInput.textFieldSelf
            toolTipText: "Birim m³/sn"
        }

        Text {
            id : bhaText
            anchors.top : qalinanTextInput.bottom
            anchors.topMargin: 30
            anchors.left: qalinanText.left
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Malzeme Birim Hacim Ağırlık")
        }
        KobliTextInput{
            id : bhaTextInput
            anchors.top: bhaText.bottom
            anchors.left: bhaText.left
            anchors.topMargin: 15
            inputText: "2.4"
            imgPath: "img/bha.png"
            KeyNavigation.tab: surtunmeKSTextInput.textFieldSelf
            toolTipText: "Birim t/m³"
        }

        Text {
            id : surtunmeKSText
            anchors.top : bhaTextInput.bottom
            anchors.topMargin: 30
            anchors.left: bhaTextInput.left
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Sürtünme Katsayısı (f)")
        }
        KobliTextInput{
            id : surtunmeKSTextInput
            anchors.top: surtunmeKSText.bottom
            anchors.left: surtunmeKSText.left
            anchors.topMargin: 15
            inputText: "0.75"
            imgPath: "img/katsayi.png"
            KeyNavigation.tab: manningTextInput.textFieldSelf
            toolTipText: "Birimsiz"
        }

        Text {
            id : manningText
            anchors.top : surtunmeKSTextInput.bottom
            anchors.topMargin: 30
            anchors.left: surtunmeKSTextInput.left
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Manning katsayısı")
        }
        KobliTextInput{
            id : manningTextInput
            anchors.top: manningText.bottom
            anchors.left: manningText.left
            anchors.topMargin: 15
            inputText: "0.012"
            imgPath: "img/katsayi.png"
            KeyNavigation.tab: zeminEmnTextInput.textFieldSelf
            toolTipText: "Birim m³/sn"
        }

        Text {
            id : zeminEmnText
            anchors.top : manningTextInput.bottom
            anchors.topMargin: 30
            anchors.left: manningTextInput.left
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Zemin Emniyet Gerilmesi")
        }
        KobliTextInput{
            id : zeminEmnTextInput
            anchors.top: zeminEmnText.bottom
            anchors.left: zeminEmnText.left
            anchors.topMargin: 15
            inputText: "15"
            imgPath: "img/soil.png"
            KeyNavigation.tab: havaPayiTextInput.textFieldSelf
            toolTipText: "Birim kg/cm²"
        }

        Text {
            id : havaPayiText
            y : 5
            anchors.left: qalinanText.right
            anchors.leftMargin: 120
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Hava Payı")
        }

        KobliTextInput{
            id : havaPayiTextInput
            anchors.top: havaPayiText.bottom
            anchors.left: havaPayiText.left
            anchors.topMargin: 15
            inputText: "0.15"
            imgPath: "img/yon.png"
            KeyNavigation.tab: tabanKotuTxtInput.textFieldSelf
            toolTipText: "Birim Metre"
        }


    }
    Rectangle{
        id : designMenu
        width: parent.width - sagFrame.width
        height: parent.height
        anchors.left: sagFrame.right
        color: "#cfcfcf"
        visible: false



        Rectangle{
            id : sabitCanvasRect
            x : 5
            y : 5
            width: parent.width / 2 - 7.5
            height: parent.height - 10
            color : "#cfcfcf"
            //border.color: "#262626"
            //border.width: 1

            Text {
                id : sabitCanvasText
                y  : 2
                wrapMode: Text.WordWrap
                font { family: robotoRegular.name; pixelSize: 25;}
                color : "#262626"
                anchors.horizontalCenter: parent.horizontalCenter
                text: qsTr("Sabit Bağlama Dizayn")
            }

            Canvas3D {
                id: sabitCanvas3D
                x : 2
                anchors.top: sabitCanvasText.bottom
                anchors.topMargin: 10
                width: parent.width - 4
                height: parent.height / 1.5
                focus: true
                onInitializeGL: {
                    GLCode.initializeGL(sabitCanvas3D,eventSource);
                }

                onPaintGL: {
                    GLCode.paintGL(sabitCanvas3D);
                    //mWheel = 0;

                }

                onResizeGL: {
                    GLCode.resizeGL(sabitCanvas3D);
                }

                ControlEventSource {
                    anchors.fill: parent
                    focus: true
                    id: eventSource
                }
            }


            KobliTextInput{
                id : solIlkBlokX1
                x : 10
                width: 150

                anchors.top: sabitCanvas3D.bottom
                anchors.topMargin: 5
                imgPath: "img/yon.png"
                KeyNavigation.tab: solIlkBlokX2.textFieldSelf
                toolTipText: "Birim Metre"
                inputText: "6"
                textEnteredColor : "#9404c1"

                textFieldSelf.onTextChanged: {
                    GLCode.changeBoyutOBJ( "SIBX1",textFieldSelf.text );
                }
            }

            KobliTextInput{
                id : solIlkBlokX2
                x : 10
                width: 150
                anchors.top: solIlkBlokX1.bottom
                anchors.topMargin: 5
                imgPath: "img/yon.png"
                KeyNavigation.tab: zeminY.textFieldSelf
                toolTipText: "Birim Metre"
                inputText: "2"
                textEnteredColor : "#2d7fc8"

                textFieldSelf.onTextChanged: {
                    GLCode.changeBoyutOBJ( "SIBX2",textFieldSelf.text );
                }
            }

            KobliTextInput{
                id : zeminY
                x : 10
                width: 150
                anchors.top: solIlkBlokX2.bottom
                anchors.topMargin: 5
                imgPath: "img/yon.png"
                KeyNavigation.tab: ortaBlokX.textFieldSelf
                toolTipText: "Birim Metre"
                inputText: "1.5"
                textEnteredColor : "#022f2a"

                textFieldSelf.onTextChanged: {
                    GLCode.changeBoyutOBJ( "ZeminY",textFieldSelf.text );
                }
            }
            //burası
            /*KobliTextInput{
                id : solIlkBlokY
                x : 10
                width: 150
                anchors.top: zeminY.bottom
                anchors.topMargin: 5
                imgPath: "img/yon.png"
                KeyNavigation.tab: ortaBlokX.textFieldSelf
                toolTipText: "Birim Metre"
                inputText: "3"
                textEnteredColor : "#147461"

                textFieldSelf.onTextChanged: {
                    GLCode.changeBoyutOBJ( "SIBY",textFieldSelf.text );
                }
            }*/


            KobliTextInput{
                id : ortaBlokX
                width: 150
                anchors.top: sabitCanvas3D.bottom
                anchors.topMargin: 5
                anchors.left: solIlkBlokX1.right
                anchors.leftMargin: parent.width / 12
                imgPath: "img/yon.png"
                KeyNavigation.tab: ortaBlokY.textFieldSelf
                toolTipText: "Birim Metre"
                inputText: "8.5"
                textEnteredColor : "#539823"
                textFieldSelf.onTextChanged: {
                    GLCode.changeBoyutOBJ( "OUBX",textFieldSelf.text );
                }
            }

            KobliTextInput{
                id : ortaBlokY
                x : 2
                width: 150
                anchors.top: ortaBlokX.bottom
                anchors.topMargin: 5
                imgPath: "img/yon.png"
                anchors.left: solIlkBlokX1.right
                anchors.leftMargin: parent.width / 12
                KeyNavigation.tab: sagBlokX.textFieldSelf
                toolTipText: "Birim Metre"

                inputText: "1"
                textEnteredColor : "#111111"
                textFieldSelf.onTextChanged: {
                    GLCode.changeBoyutOBJ( "OUBY",textFieldSelf.text );
                }
            }

            KobliTextInput{
                id : sagBlokX
                x : 2
                width: 150
                anchors.top: sabitCanvas3D.bottom
                anchors.topMargin: 5
                anchors.left: ortaBlokX.right
                anchors.leftMargin: parent.width / 12
                imgPath: "img/yon.png"
                KeyNavigation.tab: sagSBlokY.textFieldSelf
                toolTipText: "Birim Metre"
                inputText: "1"
                textEnteredColor : "#815148"
                textFieldSelf.onTextChanged: {
                    GLCode.changeBoyutOBJ( "SAGIBX",textFieldSelf.text );
                }
            }

            KobliTextInput{
                id : sagSBlokY
                x : 2
                width: 150
                anchors.top: sagBlokX.bottom
                anchors.topMargin: 5
                anchors.left: ortaBlokX.right
                anchors.leftMargin: parent.width / 12
                imgPath: "img/yon.png"
                KeyNavigation.tab: qminY.textFieldSelf
                toolTipText: "Birim Metre"
                inputText: "1.5"
                textEnteredColor : "#8c0031"
                textFieldSelf.onTextChanged: {
                    GLCode.changeBoyutOBJ( "SAGSIBY",textFieldSelf.text );
                }
            }

            KobliTextInput{
                id : qminY
                x : 2
                width: 150
                anchors.top: sagSBlokY.bottom
                anchors.topMargin: 5
                anchors.left: ortaBlokX.right
                anchors.leftMargin: parent.width / 12
                imgPath: "img/yon.png"
                KeyNavigation.tab: qmaxY.textFieldSelf
                toolTipText: "Birim Metre"
                inputText: "1"
                textEnteredColor : "#5da9b5"
                textFieldSelf.onTextChanged: {
                    GLCode.changeBoyutOBJ( "qminY",textFieldSelf.text );
                }
            }

            KobliTextInput{
                id : qmaxY
                x : 2
                width: 150
                anchors.top: qminY.bottom
                anchors.topMargin: 5
                anchors.left: ortaBlokX.right
                anchors.leftMargin: parent.width / 12
                imgPath: "img/yon.png"
                KeyNavigation.tab: solIlkBlokX1.textFieldSelf
                toolTipText: "Birim Metre"
                inputText: "1.5"
                textEnteredColor : "#2c768a"
                textFieldSelf.onTextChanged: {
                    GLCode.changeBoyutOBJ( "qmaxY",textFieldSelf.text );
                }
            }
            Rectangle{
                id : baglamaSonuc
                width: parent.width - 4
                height: sabitCanvasRect.height - sabitCanvas3D.height -5
                x : 2
                z : 0
                color : "transparent"
                anchors.top: sabitCanvas3D.bottom
                anchors.topMargin: 5
                visible: false


                Text {
                    id : qFarkText
                    x : 2
                    wrapMode: Text.WordWrap
                    font { family: robotoRegular.name; pixelSize: 14;}
                }
                Text{
                    id : qCBHFormul
                    x : 2
                    anchors.top: qFarkText.bottom
                    anchors.topMargin : parent.height / 26
                    wrapMode: Text.WordWrap
                    font { family: robotoRegular.name; pixelSize: 14;}

                }
                Text{
                    id : bKretKotu
                    x : 2
                    anchors.top: qCBHFormul.bottom
                    anchors.topMargin : parent.height / 26
                    wrapMode: Text.WordWrap
                    font { family: robotoRegular.name; pixelSize: 14;}

                }
                Text{
                    id : bYukseklik
                    x : 2
                    anchors.top: bKretKotu.bottom
                    anchors.topMargin : parent.height / 26
                    wrapMode: Text.WordWrap
                    font { family: robotoRegular.name; pixelSize: 14;}
                }
            }

        }

        Rectangle{
            id : iletimKanalCanvasRect
            y : 5
            anchors.left: sabitCanvasRect.right
            anchors.leftMargin: 5
            width: parent.width / 2 - 7.5
            height: parent.height - 10
            color : "#cfcfcf"
            //border.color: "#262626"
           // border.width: 1


            Text {
                id : iletimCanvasText
                y  : 2
                wrapMode: Text.WordWrap
                font { family: robotoRegular.name; pixelSize: 25;}
                color : "#262626"
                anchors.horizontalCenter: parent.horizontalCenter
                text: qsTr("İletim Kanalı Dizayn")
            }

            Canvas3D {
                id: sabitCanvas3D2
                x : 2
                z : 1
                anchors.top: iletimCanvasText.bottom
                anchors.topMargin: 10
                width: parent.width - 4
                height: parent.height / 1.5
                focus: true
                onInitializeGL: {
                    ICanvas.initializeGL(sabitCanvas3D2,eventSource2);
                }

                onPaintGL: {
                    ICanvas.paintGL(sabitCanvas3D2);
                    //mWheel = 0;

                }

                onResizeGL: {
                    ICanvas.resizeGL(sabitCanvas3D2);
                }

                ControlEventSource {
                    anchors.fill: sabitCanvas3D2
                    focus: true
                    id: eventSource2
                }
            }
            Rectangle{
                id : iletimCanvasTextInputlar
                width: parent.width - 4
                height: iletimKanalCanvasRect.height - sabitCanvas3D2.height -5
                x : 2
                z : 0
                color : "transparent"
                anchors.top: sabitCanvas3D2.bottom
                anchors.topMargin: 5

                KobliTextInput{
                    id : solTrapezX
                    x : 10
                    width: 150


                    imgPath: "img/yon.png"
                    KeyNavigation.tab: solTrapezY.textFieldSelf
                    toolTipText: "Birimsiz (Oran)"
                    inputText: "1.5"
                    textEnteredColor : "#9404c1"

                    textFieldSelf.onTextChanged: {
                        sagTrapezX.textFieldSelf.text = textFieldSelf.text
                        ICanvas.changeBoyutOBJ( "SolTX",textFieldSelf.text );
                    }
                }
                KobliTextInput{
                    id : solTrapezY
                    x : 10
                    width: 150
                    anchors.top: solTrapezX.bottom
                    anchors.topMargin: 5
                    imgPath: "img/yon.png"
                    KeyNavigation.tab: suBlokX1.textFieldSelf
                    toolTipText: "Birimsiz (Oran)"
                    inputText: "1"
                    textEnteredColor : "#2d7fc8"

                    textFieldSelf.onTextChanged: {
                        sagTrapezY.textFieldSelf.text   = textFieldSelf.text;
                        suBlokY.textFieldSelf.text      = textFieldSelf.text;
                        ICanvas.changeBoyutOBJ( "SolTY",textFieldSelf.text );
                    }
                }

                KobliTextInput{
                    id : suBlokX1
                    width: 150
                    anchors.left: solTrapezX.right
                    anchors.leftMargin: parent.width / 12
                    imgPath: "img/yon.png"
                    KeyNavigation.tab: suBlokY.textFieldSelf
                    toolTipText: "Birim Metre"
                    inputText: "4"
                    textEnteredColor : "#539823"
                    textFieldSelf.onTextChanged: {
                        ICanvas.changeBoyutOBJ( "SuX1",textFieldSelf.text );
                    }
                }

                /*KobliTextInput{
                    id : suBlokX2
                    width: 150
                    anchors.top: suBlokX1.bottom
                    anchors.topMargin: 5
                    anchors.left: solTrapezX.right
                    anchors.leftMargin: parent.width / 12
                    imgPath: "img/yon.png"
                    KeyNavigation.tab: suBlokY.textFieldSelf
                    toolTipText: "Birim Metre"
                    inputText: "8.5"
                    textEnteredColor : "#2d7fc8"

                    textFieldSelf.onTextChanged: {
                      ICanvas.changeBoyutOBJ( "SuX2",textFieldSelf.text );
                    }
                }
                */
                KobliTextInput{
                    id : suBlokY
                    x : 10
                    width: 150
                    anchors.top: suBlokX1.bottom
                    anchors.topMargin: 5
                    anchors.left: solTrapezX.right
                    anchors.leftMargin: parent.width / 12
                    imgPath: "img/yon.png"
                    KeyNavigation.tab: sagTrapezX.textFieldSelf
                    toolTipText: "Birim Metre"
                    inputText: "1"
                    textEnteredColor : "#2d7fc8"

                    textFieldSelf.onTextChanged: {
                        solTrapezY.textFieldSelf.text   = textFieldSelf.text;
                        sagTrapezY.textFieldSelf.text   = textFieldSelf.text;
                        ICanvas.changeBoyutOBJ( "SuY",textFieldSelf.text );
                    }
                }

                KobliTextInput{
                    id : sagTrapezX
                    x : 2
                    width: 150
                    anchors.left: suBlokX1.right
                    anchors.leftMargin: parent.width / 12
                    imgPath: "img/yon.png"
                    KeyNavigation.tab: sagTrapezY.textFieldSelf
                    toolTipText: "Birimsiz (Oran)"
                    inputText: "1.5"
                    textEnteredColor : "#815148"
                    textFieldSelf.onTextChanged: {
                        solTrapezX.textFieldSelf.text = textFieldSelf.text;
                        ICanvas.changeBoyutOBJ( "SagTX",textFieldSelf.text );
                    }
                }
                KobliTextInput{
                    id : sagTrapezY
                    x : 2
                    width: 150
                    anchors.top: sagTrapezX.bottom
                    anchors.topMargin: 5
                    anchors.left: suBlokX1.right
                    anchors.leftMargin: parent.width / 12
                    imgPath: "img/yon.png"
                    KeyNavigation.tab: solTrapezX.textFieldSelf
                    toolTipText: "Birimsiz (Oran)"
                    inputText: "1"
                    textEnteredColor : "#8c0031"
                    textFieldSelf.onTextChanged: {
                        solTrapezY.textFieldSelf.text   = textFieldSelf.text;
                        suBlokY.textFieldSelf.text      = textFieldSelf.text;
                        ICanvas.changeBoyutOBJ( "SagTY",textFieldSelf.text );
                    }
                }
            }

            Rectangle{
                id : iletimCanvasSonuc
                width: parent.width - 4
                height: iletimKanalCanvasRect.height - sabitCanvas3D2.height -5
                x : 2
                z : 0
                color : "transparent"
                anchors.top: sabitCanvas3D2.bottom
                anchors.topMargin: 5
                visible: false


                Text {
                    id : qRJFormul
                    x : 2
                    wrapMode: Text.WordWrap
                    font { family: robotoRegular.name; pixelSize: 14;}
                }
                Text{
                    id : iletimAlan
                    x : 2
                    anchors.top: qRJFormul.bottom
                    anchors.topMargin : parent.height / 26
                    wrapMode: Text.WordWrap
                    font { family: robotoRegular.name; pixelSize: 14;}

                }
                Text{
                    id : iletimCevre
                    x : 2
                    anchors.top: iletimAlan.bottom
                    anchors.topMargin : parent.height / 26
                    wrapMode: Text.WordWrap
                    font { family: robotoRegular.name; pixelSize: 14;}

                }
                Text{
                    id : iletimCap
                    x : 2
                    anchors.top: iletimCevre.bottom
                    anchors.topMargin : parent.height / 26
                    wrapMode: Text.WordWrap
                    font { family: robotoRegular.name; pixelSize: 14;}
                }
                Text{
                    id : qRJSonuc
                    x : 2
                    anchors.top: iletimCap.bottom
                    anchors.topMargin : parent.height / 26
                    wrapMode: Text.WordWrap
                    font { family: robotoRegular.name; pixelSize: 14;}
                }
                Text{
                    id : ySonuc
                    x : 2
                    anchors.top: qRJSonuc.bottom
                    anchors.topMargin : parent.height / 26
                    wrapMode: Text.WordWrap
                    font { family: robotoRegular.name; pixelSize: 14;}
                }
                Text{
                    id : tabanSonuc
                    x : 2
                    anchors.top: ySonuc.bottom
                    anchors.topMargin : parent.height / 26
                    wrapMode: Text.WordWrap
                    font { family: robotoRegular.name; pixelSize: 14;}
                }
                Text{
                    id : bSonuc
                    x : 2
                    anchors.top: tabanSonuc.bottom
                    anchors.topMargin : parent.height / 26
                    wrapMode: Text.WordWrap
                    font { family: robotoRegular.name; pixelSize: 14;}
                }
                Text{
                    id : kanalUstKotSonuc
                    x : 2
                    anchors.top: bSonuc.bottom
                    anchors.topMargin : parent.height / 26
                    wrapMode: Text.WordWrap
                    font { family: robotoRegular.name; pixelSize: 14;}
                }
            }








        }




    }

    /*----------------------------------------



    ---------------------------------------------*/
}
