Qt.include("three.js")
function TextStruct(textAdi,textSelf , meshSelf , textPosition , textRotation , derinlikRenk , kendiRenk , blokGroup){

    this.text           = (textSelf !== undefined) ? textSelf : "BOS";
    this.meshSelf       = meshSelf;
    this.textAdi        = textAdi;
    this.textPosition   = (textPosition !== undefined) ? textPosition : new THREE.Vector3(0,0,0);
    this.textRotation   = (textRotation !== undefined) ? textRotation : new THREE.Vector3(0,0,0);
    this.blokGroup      = blokGroup;

    this.material       = new THREE.MultiMaterial( [
        new THREE.MeshBasicMaterial( { color: (kendiRenk !== undefined) ? kendiRenk : 0xffffff, shading: THREE.FlatShading } ), // front
        new THREE.MeshBasicMaterial( { color: (derinlikRenk !== undefined) ? derinlikRenk : 0x000000, shading: THREE.SmoothShading } ) // side
    ] );


}
