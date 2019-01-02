var Islem;
function initDoldurucu(IslemJS)
{
    Islem = IslemJS
}
function iletimKanalText(QFormul,A,U,R,QSonuc,YSonuc,tabanSonuc,BSonuc,KustKotYuk)//,R,Qa,b,B,ustKot)
{
    QFormul.text    = "Q = k x R ^ ( 2 / 3 ) * J ^ ( 1 / 2 ) * A";
    A.text          = "A = " + Islem.tabxYuk + "y² + "+ Islem.txxty + "y² = " + Islem.iletimAlan + "y²";
    U.text          = "U = " + Islem.ta + "y + " + Islem.hipoTrap + "y + " + Islem.hipoTrap + "y = " + Islem.iletimCevre +"y";
    R.text          = "R = A / U = "+ Islem.iletimAlan+"y²" + " / " + Islem.iletimCevre +"y = "+ Islem.iletimCap + "y";
    QSonuc.text     = "Q = Qa = "+Islem.Qa + " = 1 / ( "+ Islem.mks +" ) x ( "+ Islem.iletimCap +"y ) ^ (2 / 3) * "+ Islem.j +" ^ (1 / 2 ) * "+ Islem.iletimAlan +"y²"
    YSonuc.text     = "<b> y = "+Islem.iletimY +"m </b>";
    tabanSonuc.text = "Taban = "+Islem.ta + " x " + Islem.iletimY+" = "+ Islem.tabanSonuc+"m";
    BSonuc.text     = "B = " + Islem.tabanSonuc +"m + "+"2 x " + Islem.tX + " x "+Islem.iletimY + " = " + Islem.GenislikSonuc+"m";
    KustKotYuk.text = "Kanal üst kotu yüksekliği: "+Islem.tY+"y + "+Islem.hp+"m(Hava Payı)"+" = " + Islem.tY + " x " +Islem.iletimY + "m + "+ Islem.hp + "m ="+ Islem.YukseklikSonuc+"m";
}
function baglamaText(qFark,qCBH,bkkF,bkk,by)
{
    qFark.text      = "Q = Qmin - Qalınan => "+Islem.Qmin + " - "+ Islem.Qalinan + " = "+ Islem.qFark + " m³/sn";
    qCBH.text       = "Q = C x b x H ^ ( 3 / 2) => "+Islem.qFark + " = " + Islem.savakKS + " x "+ Islem.bNetBoy + " x H ^ (1.5) => H = "+ Islem.hMin +" = Hmin";
    bkkF.text       = "Bağlama Kret Kotu  = Kanal T. K. + Su Yüks. + Yersel Yük K. + Sürekli Yük K. - Savak Yüks."
    bkk.text        = "Bağlama Kret Kotu  = "+Islem.kanalTK+" + "+Islem.suY+" + "+Islem.yerselYK+" + "+ Islem.kanalBoy + " x " + Islem.j + " - " + Islem.hMin;
    by.text         = "Bağlama yüksekliği = BY = BKK - Talveg Kotu = "+ Islem.baglamaKretKotu + " - " + Islem.talvegKot + " = <b>" + Islem.BY +"m</b>";

}
function palplansText(qAciklama,hMaksT,maksSuSS,minSuSS,aciklamaText,gMinBagB,mevcutBagB,compareText,pBoyu,pBoyu2)
{
    qAciklama.text      = "Maks debi halinde taşkın olduğundan, sulama ihtiyacı yoktur; alınan debi <b>Qa = 0'dır</b>";
    hMaksT.text         = "Qmaks = "+ Islem.Qmax +" = "+ Islem.savakKS+" x "+ Islem.bNetBoy + " x H ^ ( 3 / 2 ) => "+ Islem.hMaks +"m";
    maksSuSS.text       = "Maksimum Su Seviyesi ΔH1 = "+ Islem.BY + " + " + Islem.hMaks + " - "+ Islem.membaQmaks + " = " + Islem.maksSS+"m";
    minSuSS.text        = "Minimum  Su Seviyesi ΔH2 = "+ Islem.BY + " + " + Islem.hMin + " - " + Islem.membaQmin + " = " + Islem.minSS+"m";
    aciklamaText.text   = "Emniyetli tarafta kalmak için büyük değer seçilir, ΔH = " + Islem.HbuyukDeger+"m";
    gMinBagB.text       = "Gerekli minimum bağlama boyu => Lteorik = C<sub>lane</sub> x ΔH<sub>maks</sub> = " + Islem.CLane +" x "+ Islem.HbuyukDeger + " = " + Islem.Lteorik + "m";
    mevcutBagB.text     = "Mevcut bağlama boyu => Lşekil = "+ Islem.membaBoy +" + ( "+Islem.x1+" + "+Islem.x2 +" + " + Islem.x3 + " ) / 3 + " + Islem.mansapBoy + " = "+ Islem.Lsekil+"m";
    compareText.text    = "Lteorik "+Islem.lTlSkontrol+" Lgerçek => "+"<b>"+Islem.lTlSSonuc+"</b>";
    if(Islem.lTlSSonuc === "PALPLANŞ GEREKLİ")
    {
        pBoyu.text      = "Lp = ( Lt- Lş ) / 2 =  ( "+Islem.Lteorik+" - "+Islem.Lsekil+" ) / 2 = "+ Islem.pBoyu1+"m";
        pBoyu2.text     = " (Lp)memba = (Lp)mansap = Lp / 2 = " + Islem.pBoyu2+"m";
    }
}

