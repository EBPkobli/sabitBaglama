Qt.include("three.js")

var m_group , m_scene;
function initKilavuzCizgi(group,scene){
    m_group         = group;
    m_scene         = scene;

}

function KilavuzCizgi(adi,konum,uzunluk,aci,renk,size,arrowRenk,blokGroup)
{
    this.adi        = adi;
    this.konum      = (konum !== undefined)     ? konum : new THREE.Vector3(0,0,0)
    this.uzunluk    = (uzunluk !== undefined)   ? uzunluk : 25
    this.aci        = (aci !== undefined)       ? aci   : new THREE.Vector3(0,0,0)
    this.renk       = (renk !== undefined)      ? renk  : 0x000000
    this.arrowRenk  = (arrowRenk !== undefined) ? arrowRenk : 0x009811;
    this.size       = (size !== undefined || size !== 0) ? size : 1
    this.meshSelf   = undefined
    this.blokGroup  = blokGroup;
    this.kCizgi     = kCizgiOlustur(this)


}
function kCizgiOlustur(struct)
{
    var cizgiGrup       = new THREE.Group();
    var silindirGeo     = new THREE.CylinderGeometry( 0.5 * struct.size, 0.5 * struct.size, struct.uzunluk -8 * struct.size, 32 );
    var silindirMat     = new THREE.MeshBasicMaterial( {color: struct.renk} );
    var silindir        = new THREE.Mesh( silindirGeo, silindirMat );
    silindir.name       = struct.adi;
    silindir.position.x = 0;
    silindir.position.y = 0;
    silindir.position.z = 0;
    silindir.rotation.x = 0;
    silindir.rotation.y = 0;
    silindir.rotation.z = 0;

    cizgiGrup.add(silindir)

    var solKoniGeo      = new THREE.CylinderGeometry( 0, 1.5 * struct.size, 4 * struct.size,32, 1 );
    var solKoniMat      = new THREE.MeshBasicMaterial( {color: struct.arrowRenk} );
    var solKoni         = new THREE.Mesh( solKoniGeo, solKoniMat );

    solKoni.position.x  = 0;
    solKoni.position.y  = struct.uzunluk/2 + 1 - 4 * struct.size;
    solKoni.position.z  = 0;
    solKoni.rotation.x  = 0;
    solKoni.rotation.y  = 0;
    solKoni.rotation.z  = 0;

    cizgiGrup.add(solKoni);

    var sagKoniGeo      = new THREE.CylinderGeometry( 0, 1.5 * struct.size, 4 * struct.size, 32, 1 );
    var sagKoniMat      = new THREE.MeshBasicMaterial( {color: struct.arrowRenk} );
    var sagKoni         = new THREE.Mesh( sagKoniGeo, sagKoniMat );

    sagKoni.position.x  = 0;
    sagKoni.position.y  = -struct.uzunluk/2 -1 + 4 * struct.size;
    sagKoni.position.z  = 0;
    sagKoni.rotation.x  = (Math.PI / 180) * 180/*180 derece dön Y Aksında*/;
    sagKoni.rotation.y  = 0;
    sagKoni.rotation.z  = 0;

    cizgiGrup.add(sagKoni);

    cizgiGrup.position.x = struct.konum.x;
    cizgiGrup.position.y = struct.konum.y;
    cizgiGrup.position.z = struct.konum.z;
    cizgiGrup.rotation.x = (Math.PI / 180) * struct.aci.x;
    cizgiGrup.rotation.y = (Math.PI / 180) * struct.aci.y;
    cizgiGrup.rotation.z = (Math.PI / 180) * struct.aci.z;


    cizgiGrup.tip        = "KILAVUZCIZGI"
    struct.meshSelf      = cizgiGrup;
    struct.blokGroup.add(cizgiGrup);
    return cizgiGrup;
}
function changeKilavuzCizgi(struct){
    for(var i = 0; i< m_group.children.length ; i++){
        for(var j = 0 ; j< m_group.children[i].children.length; j++)
        {

            if(m_group.children[i].children[j].children[0] !== undefined){
                if(m_group.children[i].children[j].children[0].name === struct.adi)
                {
                    m_scene.remove(m_group);
                    delete m_group.children[i].children[j];
                    m_group.children[i].children.splice(j,1);
                    kCizgiOlustur(struct);
                    m_scene.add(m_group);
                    return;
                }
            }
        }
    }
}
