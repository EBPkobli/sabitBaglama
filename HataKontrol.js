function iletimCanvasCozumKontrol(trapezX,trapezY,taban,Qalinan,manningKS,Egim,HavaPayi)
{
    var kontrol = false;
    if(trapezX === undefined || trapezX === "" || trapezX === 0)
    {
        console.log("Trapez X Boş Bırakamazsınız!");
        //kontrol = true;
    }
    if(trapezY === undefined || trapezY === "" || trapezY === 0)
    {
        console.log("Trapez Y Boş Bırakamazsınız!");
        //kontrol = true;
    }
    if(taban === undefined || taban === "" || taban === 0)
    {
        console.log("Tabanı Boş Bırakamazsınız!");
        //kontrol = true;
    }
    if(Qalinan === undefined || Qalinan === "" || Qalinan === 0)
    {
        console.log("Qalinan Boş Bırakamazsınız!");
        //kontrol = true;
    }
    if(manningKS === undefined || manningKS === "" || manningKS === 0)
    {
        console.log("Manning Katsayısını Boş Bırakamazsınız!");
        //kontrol = true;
    }
    if(Egim === undefined || Egim === "" || Egim === 0)
    {
        console.log("Eğimi Boş Bırakamazsınız!");
        //kontrol = true;
    }
    if(HavaPayi === undefined || HavaPayi === "" || HavaPayi === 0)
    {
        console.log("Hava Payını Boş Bırakamazsınız!");
        //kontrol = true;
    }

    return kontrol;
}


