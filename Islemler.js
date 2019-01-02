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
var Qmin;
var Qalinan;
var savakKS;
var bNetBoy;
var kanalTK;
var suY;
var yerselYK;
var kanalBoy;
var talvegKot;
function baglamaBYBulma(qmin,qalinan,cs,bnb,ktk,sy,yyk,kanalBoyu,Egim,tk)
{
    //------parseFloat------\\
    qmin = parseFloat(qmin);
    Qmin = qmin; // textdoldurucuya aktarmak için
    qalinan = parseFloat(qalinan);
    Qalinan = qalinan;
    cs = parseFloat(cs);
    savakKS = cs;
    bnb = parseFloat(bnb);
    bNetBoy = bnb;
    ktk = parseFloat(ktk);
    kanalTK = ktk;
    sy = parseFloat(sy);
    suY = sy;
    yyk = parseFloat(yyk);
    yerselYK = yyk;
    kanalBoyu = parseFloat(kanalBoyu);
    kanalBoy = kanalBoyu;
    Egim = parseFloat(Egim);
    tk = parseFloat(tk);
    talvegKot = tk;
    //------parseFloat------\\
    qFark           = qmin - qalinan;
    var katSayi     = qFark / (cs*bnb);
    hMin            = Math.pow(katSayi,(1/1.5));
    hMin            = parseFloat(hMin).toFixed(3);
    SurekliYukKaybi = kanalBoyu * Egim;
    baglamaKretKotu = (ktk + sy + yyk - hMin + SurekliYukKaybi);
    baglamaKretKotu = parseFloat(baglamaKretKotu).toFixed(3);
    BY              = baglamaKretKotu - tk;
    BY              = parseFloat(BY).toFixed(3);
}
var hMaks;
var Qmax,membaQmaks,membaQmin;
var HbuyukDeger;
var CLane;
var Lteorik,Lsekil;
var membaBoy,mansapBoy,x1,x2,x3;
var lTlSkontrol;
var lTlSSonuc;
var minSS,maksSS;
var pBoyu1,pBoyu2;
function palplansHesap(qMaks,qMaksH,qMinH,cLane,membaBoyh,mansapBoyh,x1h,x2h,x3h)
{
    qMaks       = parseFloat(qMaks);
    Qmax        = qMaks;
    qMaksH      = parseFloat(qMaksH);
    membaQmaks  = qMaksH;
    qMinH       = parseFloat(qMinH);
    membaQmin   = qMinH;
    cLane       = parseFloat(cLane);
    CLane       = cLane;
    membaBoyh   = parseFloat(membaBoyh);
    membaBoy    = membaBoyh;
    mansapBoyh  = parseFloat(mansapBoyh);
    mansapBoy   = mansapBoyh;
    x1h         = parseFloat(x1h);
    x1          = x1h;
    x2h         = parseFloat(x2h);
    x2          = x2h;
    x3h         = parseFloat(x3h);
    x3          = x3h;


    var katSayi = qMaks/ (savakKS * bNetBoy);
    hMaks       = Math.pow(katSayi,(2/3));
    BY          = parseFloat(BY);
    maksSS      = BY + hMaks - qMaksH;
    maksSS      = parseFloat(maksSS).toFixed(3);
    hMin        = parseFloat(hMin);
    minSS       = BY + hMin - qMinH;
    minSS       = parseFloat(minSS).toFixed(3);
    HbuyukDeger = (maksSS>minSS) ? maksSS : minSS;
    HbuyukDeger = parseFloat(HbuyukDeger).toFixed(3);
    Lteorik     = cLane * HbuyukDeger;
    Lteorik     = parseFloat(Lteorik).toFixed(3);
    Lsekil      = membaBoy + (x1h+x2h+x3h) / 3 + mansapBoy;
    Lsekil      = parseFloat(Lsekil).toFixed(3);
    lTlSkontrol = ((parseFloat(Lteorik) > parseFloat(Lsekil)) ? ">" : "<")
    lTlSSonuc   = ((lTlSkontrol === ">") ? "PALPLANŞ GEREKLİ" : "PALPLANŞA GEREK YOK!");
    if(lTlSkontrol === ">")
    {
        pBoyu1 = (parseFloat(Lteorik) - parseFloat(Lsekil)) / 2;
        pBoyu2 = parseFloat(pBoyu1) / 2;
        pBoyu1 = parseFloat(pBoyu1).toFixed(3);
        pBoyu2 = parseFloat(pBoyu2).toFixed(3);
    }else
    {
        pBoyu1 = 0;
        pBoyu2 = 0;
    }

    hMaks       = parseFloat(hMaks).toFixed(3);
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
