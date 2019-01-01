//Import the declarative plugins
import QtQuick 2.0
import QtQuick.Controls 2.4

//Implementation of the Button control.
Item {
    id: button
    width: parent.width
    height: 100
    property alias buttonText: innerText.text;
    property color color: "#454545"
    property color hoverColor: "#aaaaaa"
    property color pressColor: "slategray"
    property color disabledColor: "#cbcbcb"
    property color mouseOnColor: "#dedede"
    property bool buttonEnabled: true
    property string imgPath: ""
    property int imgSize: 72
    property string toolTipText: ""
    property int fontSize: 10
    property int borderWidth: 1
    property int borderRadius: 5
    property int m_X: 0
    property int m_Y: 0
    property alias m_btnMouseArea: btnMouseArea
    property bool checkableButton: false
    property bool myCheck: false
    scale: (state === "Pressed") ? 0.96 : 1.0
    //objectName: solFrameButton
    onEnabledChanged: {
        if(!button.enabled)
        {
            state = ""
            shaderImg.r = 1.0;
            shaderImg.g = 0;
            shaderImg.b = 0;
        }else
        {
            shaderImg.r = 1.0;
            shaderImg.g = 1.0;
            shaderImg.b = 1.0;
        }
    }

    signal clicked

    //define a scale animation
    Behavior on scale {
        NumberAnimation {
            duration: 100
            easing.type: Easing.InOutQuad
        }
    }



    //Rectangle to draw the button
    Rectangle {
        id: rectangleButton
        anchors.fill: parent
        radius: borderRadius
        color: button.enabled ? button.color : "grey"
        border.width: borderWidth
        border.color: "black"

        Text {
            id: innerText
            font.pointSize: fontSize
            anchors.centerIn: parent
        }
    }


    ToolTip {
        x : button.m_X;
        y : button.m_Y;
        delay: 100
        timeout: 1000
        visible: (button.state=='Hovering') ? true : false
        text: toolTipText
    }

    //change the color of the button in differen button states
    states: [
        State {
            name: "Hovering"
            PropertyChanges {
                target: rectangleButton
                color: hoverColor
            }
        },
        State {
            name: "Pressed"
            PropertyChanges {
                target: rectangleButton
                color: pressColor
            }
        },
        State {
            name: "MouseOn"
            PropertyChanges {
                target: rectangleButton
                color: mouseOnColor
            }
        }
    ]

    ShaderEffect {
        id : shaderImg
        property variant src: btnImg
        property real r: 1
        property real g: 1
        property real b: 1
        property real enableCont: (button.enabled) ? 1 : 0
        scale : (button.state === "MouseOn") ? 1.15 : 1
        anchors.centerIn: parent
        visible: true
        width: imgSize
        height: imgSize

        vertexShader: "qrc:/shaders/butonvertex.vsh"

        fragmentShader: "qrc:/shaders/butonfragment.fsh"

        signal mouseOnMe
        Behavior on scale{
            NumberAnimation{
                duration: 250
                easing.type: Easing.bezierCurve
            }
        }


    }

    Image {
        id: btnImg
        visible: false
        width: imgSize
        height: imgSize
        sourceSize.width: imgSize
        sourceSize.height: imgSize
        source: imgPath
    }

    //define transmission for the states
    transitions: [
        Transition {
            from: ""; to: "Hovering"
            ColorAnimation { duration: 200 }
        },
        Transition {
            from: "*"; to: "Pressed"
            ColorAnimation { duration: 10 }
        },
        Transition {
            from: "*"; to: "MouseOn"

            ColorAnimation { duration: 100 }
        }
    ]

    //Mouse area to react on click events
    MouseArea {
        id : btnMouseArea
        hoverEnabled: true
        anchors.fill: button
        onEntered:
        {
            shaderImg.mouseOnMe();
            button.state = 'MouseOn'
            m_X = mouseX;
            m_Y = mouseY;
        }
        onExited: {
            if(checkableButton){
                if(myCheck)
                {

                }else{
                    button.state=''
                }
            }else{
                button.state=''
            }
        }
        onClicked: {
            if(checkableButton){
                if(myCheck){

                }else
                {
                    myCheck = true;
                    for(var ii = 0;ii<button.parent.children.length;ii++)
                    {
                        if(button.parent.children[ii].objectName === button.objectName)
                        {
                            if(button.parent.children[ii] !== button)
                            {
                                button.parent.children[ii].myCheck = false;
                                button.parent.children[ii].state = "";
                            }
                        }
                    }
                    button.clicked();
                    button.state = "MouseOn"
                }
            }else
            {
                button.clicked();
            }
        }
        onPressed: {
            if(checkableButton){
                if(myCheck){

                }else{

                }
            }else
            {
                button.state="Pressed";
            }


        }
        onReleased: {
            if(checkableButton){
                if(myCheck){

                }else{
                    if (containsMouse)
                        button.state="Hovering";
                    else
                        button.state="";
                }
            }else
            {
                if (containsMouse)
                    button.state="Hovering";
                else
                    button.state="";
            }


        }
    }

    Component.onCompleted: {
        if(button.enabled)
        {
            shaderImg.r = 1.0;
            shaderImg.g = 1.0;
            shaderImg.b = 1.0;
        }else
        {
            shaderImg.r = 1.0;
            shaderImg.g = 0;
            shaderImg.b = 0;
        }
    }
}
