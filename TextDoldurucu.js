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
function baglamaText()
{

}
