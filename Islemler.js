var tX , tY , ta , Qa , mks , j , hp;
var tabxYuk , txxty;
var hipoTrap;
var iletimAlan;
var iletimCevre;
var iletimCap;
var iletimY;
var tabanSonuc;
var GenislikSonuc;
var YukseklikSonuc;

function iletimCanvasCozum(trapezX,trapezY,taban,Qalinan,manningKS,Egim,HavaPayi)
{

    trapezX     = parseFloat(trapezX);
    trapezY     = parseFloat(trapezY);
    taban       = parseFloat(taban);
    Qalinan     = parseFloat(Qalinan);
    manningKS   = parseFloat(manningKS);
    Egim        = parseFloat(Egim);
    HavaPayi    = parseFloat(HavaPayi);
    trapezX     = parseFloat(trapezX);

    //Burada yaptığım değişken aktarmaya gerek yok hatta zararlı bile
    //Hafızadan ekstra gereksiz yer açılıyor fakat
    //Yazmamı kolaylaştırıyor yani bu değerleri QML 'imde basit bir şekilde
    //Çağırmış oluyorum bu sayede daha okunur kodlama yapıyorum fakat
    //Hızından yaklaşık bu da 0.000001 lik kısmında fedakarlik ediyorum
    tX              = trapezX;
    tY              = trapezY;
    ta              = taban;
    Qa              = Qalinan;
    mks             = manningKS;
    j               = Egim;
    hp              = HavaPayi;
    tabxYuk         = taban*trapezY;
    txxty           = trapezX * trapezY;
    hipoTrap        = hipotenusBul(trapezX,trapezY);

    //---------------------------
    iletimAlan      = taban * trapezY + trapezX * trapezY;
    iletimCevre     = taban + (hipoTrap * 2);
    iletimCap       = iletimAlan / iletimCevre;
    iletimCap       = parseFloat(iletimCap).toFixed(3);
    var yKatSayi    = 1 / manningKS * Math.pow(iletimCap,(2/3)) * Math.pow(Egim,0.5) * iletimAlan;
    console.log(yKatSayi);
    var yBoluQ      = parseFloat(Qalinan) / yKatSayi;
    var katSayi     = 3 / 8;
    iletimY         = Math.pow(yBoluQ,katSayi);
    iletimY         = parseFloat(iletimY).toFixed(3);
    tabanSonuc      = taban * iletimY;
    GenislikSonuc   = tabanSonuc + trapezX * 2 * iletimY;
    GenislikSonuc   = parseFloat(GenislikSonuc).toFixed(3);
    YukseklikSonuc  = trapezY * iletimY + HavaPayi;
    YukseklikSonuc   = parseFloat(YukseklikSonuc).toFixed(3);
}
var qFark;
var hMin;
var baglamaKretKotu;
var SurekliYukKaybi;
var BY;
function baglamaBYBulma(qmin,qalinan,cs,bnb,ktk,sy,yyk,kanalBoyu,Egim,tk)
{
    //------parseFloat------\\
    qmin = parseFloat(qmin);
    qalinan = parseFloat(qalinan);
    cs = parseFloat(cs);
    bnb = parseFloat(bnb);
    ktk = parseFloat(ktk);
    sy = parseFloat(sy);
    yyk = parseFloat(yyk);
    kanalBoyu = parseFloat(kanalBoyu);
    Egim = parseFloat(Egim);
    tk = parseFloat(tk);
    //------parseFloat------\\
    qFark           = qmin - qalinan;
    qFark           = parseFloat(qFark).toFixed(3);
    var katSayi     = qFark / (cs*bnb);
    hMin            = Math.pow(katSayi,(1/1.5));
    hMin            = parseFloat(hMin).toFixed(3);
    SurekliYukKaybi = kanalBoyu * Egim;
    baglamaKretKotu = (ktk + sy + yyk - hMin + SurekliYukKaybi);
    baglamaKretKotu = parseFloat(baglamaKretKotu).toFixed(3);
    BY              = baglamaKretKotu - tk;
    BY              = parseFloat(BY).toFixed(3);
    console.log("BY = "+BY)
}

function hipotenusBul(s1,s2)
{
    s1              = parseFloat(s1);

    s2              = parseFloat(s2);

    s1              = Math.pow(s1,2); //karesi

    s2              = Math.pow(s2,2); //karesi

    var t           = s1+s2; //kare toplamı

    var hipotenus   = Math.pow(t,0.5);

    return  parseFloat(hipotenus).toFixed(3);
}
