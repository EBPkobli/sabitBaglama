Qt.include("three.js")
Qt.include("TextMeshClass.js")

THREE.Cache.enabled = true;

var m_scene;
var m_group;
var textArray = new Array();
var text = "three.js",

        height = 0.01,
        size = 4,
        curveSegments = 1,
        bevelThickness = 0.1,
        bevelSize = 0.01,
        bevelSegments = 1,
        bevelEnabled = true,
        font = undefined,
        fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
        fontWeight = "regular"; // normal bold

var mirror = true;

var fontMap = {

    "helvetiker": 0,
    "optimer": 1,
    "gentilis": 2,
    "droid sans": 3,
    "droid serif": 4
};

var weightMap = {

    "regular": 0,
    "bold": 1

};

function initYazi(myGroup , scene) {

    m_scene     = scene;
    m_group     = myGroup;
}



function yaziYukle() {

    var loader = new THREE.FontLoader();
    loader.load( 'qrc:/' + fontName + '_' + fontWeight + '.typeface.js', function ( response ) {

        font = response;
        for(var i = 0; i<textArray.length; i++)
        {
            createText(textArray[i]);
        }
    } );

}
function newCreateText(textStruct)
{
    textArray.push(textStruct)
}

function createText(textStruct)
{
    if(font === undefined){

    }

    var textGeo = new THREE.TextGeometry( textStruct.text, {
                                         font: font,
                                         size: size,
                                         height: height,
                                         curveSegments: curveSegments,

                                         bevelThickness: bevelThickness,
                                         bevelSize: bevelSize,
                                         bevelEnabled: bevelEnabled,

                                         material: 0,
                                         extrudeMaterial: 1

                                     });

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();
    var textMesh = new THREE.Mesh( textGeo, textStruct.material );
    textMesh.name       = textStruct.textAdi;
    textMesh.position.x = textStruct.textPosition.x;
    textMesh.position.y = textStruct.textPosition.y;
    textMesh.position.z = textStruct.textPosition.z;
    textMesh.rotation.x = textStruct.textRotation.x * Math.PI / 180;
    textMesh.rotation.y = textStruct.textRotation.y * Math.PI / 180;
    textMesh.rotation.z = textStruct.textRotation.z * Math.PI / 180;
    textMesh.tip        = "TEXT"
    textStruct.meshSelf = textMesh;

    textStruct.blokGroup.add(textStruct.meshSelf)
    return textStruct.meshSelf;
}

function changeText( textStruct ) {
    for(var ii = 0; ii<m_group.children.length; ii++){
        for(var jj = 0 ; jj <m_group.children[ii].children.length; jj++)
        {
            if(m_group.children[ii].children[jj].name === textStruct.textAdi)
            {
                m_scene.remove(m_group);
                delete m_group.children[ii].children[jj];
                m_group.children[ii].children.splice(jj,1);
                createText(textStruct);
                m_scene.add(m_group);
                return;
            }
        }


    }
}

function changeFont() {
    /*
    if ( fontName == "helvetiker" ) {

        fontName = "optimer";

    } else if ( fontName == "optimer" ) {

        fontName = "gentilis";

    } else if ( fontName == "gentilis" ) {

        fontName = "droid_sans";

    } else if ( fontName == "droid_sans" ) {

        fontName = "droid_serif";

    } else {

        fontName = "helvetiker";

    }

    loadFont();
*/
}

function changeWeight() {
    /*
    if ( fontWeight == "bold" ) {

        fontWeight = "regular";

    } else {

        fontWeight = "bold";
    }

    loadFont();
    */
}


