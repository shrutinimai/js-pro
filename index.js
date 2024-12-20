function convert(){
let cmVal=Number(document.getElementById("input").value);
let inchVal=cmVal/2.54;
let resul=document.getElementById("result");
result.innerHTML=inchVal.toFixed(2);
}