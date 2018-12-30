import QtQuick 2.4
import QtCanvas3D 1.1
import QtQuick.Window 2.2

import "glcode.js" as GLCode
import "iletimCanvasJs.js" as ICanvas


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
                if(!startButton.enabled)
                    startButton.enabled = true;
                else
                    startButton.enabled = false;
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
            imgPath: "img/talveg.png"
            KeyNavigation.tab: savakKatSayiTxtInput.textFieldSelf
            toolTipText: "Birim Metre"
        }

        Text {
            id : savakKatSayiTxt
            anchors.left: tabanKotuTxt.right
            anchors.leftMargin: 150
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
            imgPath: "img/mindebi.png"
            KeyNavigation.tab: qalinanTextInput.textFieldSelf
            toolTipText: "Birim m³/sn"
        }

        Text {
            id : qalinanText
            y : 5
            anchors.left: savakKatSayiTxt.right
            anchors.leftMargin: 160
            wrapMode: Text.WordWrap
            font { family: robotoRegular.name; pixelSize: 20;}
            text: qsTr("Alınan Debi (Qalınan)")
        }
        KobliTextInput{
            id : qalinanTextInput
            anchors.top: qalinanText.bottom
            anchors.left: qalinanText.left
            anchors.topMargin: 15
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
            imgPath: "img/soil.png"
            KeyNavigation.tab: tabanKotuTxtInput.textFieldSelf
            toolTipText: "Birim kg/cm²"
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
            border.color: "#262626"
            border.width: 1

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
                KeyNavigation.tab: solIlkBlokY.textFieldSelf
                toolTipText: "Birim Metre"
                inputText: "1.5"
                textEnteredColor : "#022f2a"

                textFieldSelf.onTextChanged: {
                  GLCode.changeBoyutOBJ( "ZeminY",textFieldSelf.text );
                }
            }

            KobliTextInput{
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
            }


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
                anchors.left: solIlkBlokY.right
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


        }

        Rectangle{
            id : iletimKanalCanvasRect
            y : 5
            anchors.left: sabitCanvasRect.right
            anchors.leftMargin: 5
            width: parent.width / 2 - 7.5
            height: parent.height - 10
            color : "#cfcfcf"
            border.color: "#262626"
            border.width: 1


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

        }




    }

    /*----------------------------------------



    ---------------------------------------------*/
}
