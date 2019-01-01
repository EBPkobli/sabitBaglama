import QtQuick 2.0
import QtQuick.Controls 2.4

Rectangle{
    id : myTextArea
    width: 200
    height: 40
    color: "#dedede"
    border.width: 1
    border.color: "#111111"
    radius: 5
    clip: true

    property string imgPath: ""
    property string inputText: ""
    property alias textFieldSelf:myTextInput
    property color textEnteredColor: "#269a26"
    property color textSelectedColor: "#26269a"
    property color textEmptyColor: "#111111"
    property string toolTipText: "Metre"
    property bool basKont: false

    FontLoader { id: robotoRegular; source: "fonts/Roboto-Regular.ttf" }

    ToolTip {
        x : myTextArea.width - width / 3
        y : myTextArea.height / 4
        delay: 100
        timeout: 5000
        visible: (basKont) ? true : false
        text: toolTipText
    }

    Image{
        id: textImg
        x : 8
        y : 8
        visible: true
        width: 24
        height: 24
        sourceSize.width: 48
        sourceSize.height: 48
        antialiasing: true
        source: imgPath
    }

    states: [
        State {
            name: "textEntered"
            PropertyChanges {
                target: myTextArea
                border.color: textEnteredColor
            }
        },
        State {
            name: "textEmpty"
            PropertyChanges {
                target: myTextArea
                border.color: textEmptyColor
            }
        },
        State {
            name: "textSelected"
            PropertyChanges {
                target: myTextArea
                border.color: textSelectedColor
            }
        }
    ]

    transitions: [
        Transition {
            from: "*"; to: "textEntered"
            ColorAnimation { duration: 200 }
        },
        Transition {
            from: "*"; to: "textEmpty"
            ColorAnimation { duration: 200 }
        },
        Transition {
            from: "*"; to: "textSelected"
            ColorAnimation { duration: 200 }
        }
    ]

    TextInput{
        selectByMouse: true
        validator : RegExpValidator { regExp : /[0-9]+\.[0-9]+/ }
        maximumLength: 12
        id : myTextInput
        clip : true
        width: 160
        height: 40
        x : 40
        y : parent.height/4
        color: "#000000"
        wrapMode: Text.WordWrap
        text: inputText

        font { family: robotoRegular.name; pixelSize: 18;}
        onTextChanged: {
            if(myTextInput.length == 0)
            {
                myTextArea.state = "textEmpty";
            }else{
                myTextArea.state = "textEntered";
            }
        }
        onFocusChanged: {
            if(focus){
                basKont = true;
                if(myTextArea.state === "textEmpty")
                {
                    myTextArea.state = "textSelected"
                }
            }else{
                basKont = false;
                if(myTextArea.state === "textSelected")
                {
                    if(myTextInput.length == 0)
                    {
                        myTextArea.state = "textEmpty"
                    }
                }
            }
        }
    }
    Component.onCompleted: {
        if(myTextInput.text !== "" && myTextInput.text !== undefined)
        {
            myTextArea.state = "textEntered"
        }else{
            myTextArea.state = "textEmpty";
        }
    }
}
