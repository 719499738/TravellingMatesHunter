$(function(){
var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
var nebpay = new NebPay();

var dappAddress = "n1yLs1gPbcqhQkSEwtPiba6FT3ucyDyDKZ4";
var txHash = "64a9c43ac678f6d8c787fb0f166ebc871f8b697f46fc25a97e02e79f9020994c";
$("#savebutton").click(function(){
var travellingCity = $("#travellingCity").val();
var travellingDate = $("#datepicker").val();
var phoneNumber = $("#phoneNumber").val();
var weChatNumber = $("#weChatNumber").val();
var remark = $("#remark").val();
if(travellingCity == ""){
alert("请输入你要旅行的城市。");
return;
}
if(travellingDate == ""){
alert("请输入你要旅行的日期。");
return;
}
if(phoneNumber == "" && weChatNumber == ""){
alert("请输入你的电话或者微信号。");
return;
}
var to = dappAddress;
var value = "0";
var callFunction = "save";
var callArgs = "[\"" + travellingCity + "\",\"" + travellingDate + "\",\"" +  phoneNumber + "\",\"" +  weChatNumber + "\",\"" +  remark + "\"]";
nebpay.call(to, value, callFunction, callArgs, {
listener: function(resp){
console.log(JSON.stringify(resp));
}
});
});
$("#searchbutton").click(function(){
var travellingCitySearch = $("#travellingCitySearch").val();
var travellingDateSearch = $("#datepickerSearch").val();

if(travellingCitySearch == ""){
alert("请输入你要查询的城市。");
return;
}
if(travellingDateSearch == ""){
alert("请输入你要查询的日期。");
return;
}
var to = dappAddress;
var value = "0";
var callFunction = "get";
var callArgs = "[\"" + travellingCitySearch+ "\",\"" + travellingDateSearch + "\"]";
nebpay.simulateCall(to, value, callFunction, callArgs, {
listener: function(resp){
//console.log(JSON.stringify(resp.result));
var myArr = JSON.parse(resp.result);

var tempStr = "";
if(myArr.length == 0){
	alert("没有找到符合条件的记录。");
}
for(var i=0;i<myArr.length;i++){
if(i%2 == 0){
tempStr += '<tr class="warning">';
}else{
tempStr += '<tr class="info">';
}
tempStr += '<td >';
tempStr += (i+1);
tempStr += '</td>';
tempStr += '<td>';
tempStr += travellingCitySearch;
tempStr += '</td>';
tempStr += '<td>';
tempStr += travellingDateSearch;
tempStr += '</td>';
tempStr += '<td>';
tempStr += myArr[i].phoneNumber;
tempStr += '</td>';
tempStr += '<td>';
tempStr += myArr[i].weChatNumber;
tempStr += '</td>';
tempStr += '<td>';
tempStr += myArr[i].remark;
tempStr += '</td>';
tempStr += '</tr>';
}
console.log(tempStr);
$("#searchresult").html(tempStr);
$("#recordscount").html(myArr.length + "条记录");
}
});
});

});
