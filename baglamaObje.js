Qt.include("three.js")
Qt.include("KilavuzCizgiJS.js")

var bObjeArray = new Array();
var m_groupArray , m_scene;
var extrudeSettings = {
    steps: 1,
    depth: 100,
    bevelEnabled: true,
    bevelThickness: 100,
    bevelSize: 1,
    bevelSegments: 0
};

function initBlokObje(groupArray,scene)
{
    m_groupArray    = groupArray;
    m_scene         = scene;

}

function yeniBlokObje(blokOBJ,blokGroup)
{
    var Blok        = new THREE.Shape();
    Blok.moveTo( 0,0 );
    var y = 1;
    for(var i = 0; i < blokOBJ.cizgiSayi ; i++)
    {
        Blok.lineTo( blokOBJ.parametre[y++], blokOBJ.parametre[y++] );
    }

    var blokGeo         = new THREE.ExtrudeGeometry( Blok, extrudeSettings );
    var blokMat         = new THREE.MeshBasicMaterial( { color: blokOBJ.blokRenk } );
    var blokMesh        = new THREE.Mesh( blokGeo, blokMat ) ;
    blokMesh.name       = blokOBJ.parametre[0];
    blokMesh.position.x = blokOBJ.blokPos.x;
    blokMesh.position.y = blokOBJ.blokPos.y;
    blokMesh.position.z = blokOBJ.blokPos.z;

    if(blokOBJ.frameKont){
        var frameGeo    = new THREE.EdgesGeometry( blokGeo ); // or WireframeGeometry( geometry )
        var frameMat    = new THREE.LineBasicMaterial( { color: blokOBJ.frameColor, linewidth : blokOBJ.frameWitdh } );
        var frameSelf   = new THREE.LineSegments( frameGeo, frameMat );

        blokMesh.add( frameSelf );
    }
    blokMesh.tip = "BLOK";
    blokOBJ.meshSelf = blokMesh;
    blokOBJ.blokGroup.add( blokMesh );
}
function changeBlokObje(blokOBJ){
    for(var i = 0; i< m_groupArray.children.length; i++){
        for(var j = 0; j< m_groupArray.children[i].children.length; j++)
        {
            if(m_groupArray.children[i].children[j].name === blokOBJ.parametre[0])
            {
                m_scene.remove(m_groupArray);
                delete m_groupArray.children[i].children[j];
                m_groupArray.children[i].children.splice(j,1);
                yeniBlokObje(blokOBJ);
                m_scene.add(m_groupArray);
                return;
            }
        }
    }
}

function BlokObje(params,cizgiSayi,blokRenk,blokPos,frameKont,frameColor,frameWitdh,blokGroup){
    this.parametre  =  params;
    this.cizgiSayi  =  cizgiSayi;
    this.blokRenk   = (blokRenk   !== undefined) ? blokRenk      : new THREE.Color(0x000000);
    this.blokPos    = (blokPos    !== undefined) ? blokPos       : new THREE.Vector3(0,0,0);
    this.frameKont  = (frameKont  !== undefined) ? frameKont     : false;
    this.frameColor = (frameColor !== undefined) ? frameColor    : new THREE.Color(0x000000);
    this.frameWitdh = (frameWitdh !== undefined) ? frameWitdh    : 1;
    this.meshSelf   = undefined;
    this.blokGroup  = blokGroup;
}

