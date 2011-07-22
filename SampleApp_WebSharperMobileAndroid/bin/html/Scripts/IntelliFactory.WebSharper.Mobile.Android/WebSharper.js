(function()
{
 var global=this;
 var Class,Mobile,__2,localStorage;
 IntelliFactory.WebSharper.Runtime.Declare({IntelliFactory:{WebSharper:{Mobile:{Android:{Mobile:{IStorage:{},IGenericStorage:{}}}}}}});
 Mobile=function()
 {
  return IntelliFactory.WebSharper.Mobile.Android.Mobile;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Mobile.Android;
 });
 (function()
 {
  return IntelliFactory.WebSharper.Mobile;
 });
 (function()
 {
  return IntelliFactory.WebSharper;
 });
 Class=function()
 {
  return IntelliFactory.WebSharper.Runtime.Class;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Runtime;
 });
 __2=function()
 {
  var _this=this;
  var _,__1,c,matchValue;
  matchValue={$:0};
  if(matchValue.$==1)
   {
    c=matchValue.$0;
    _=[];
    __1=void c.apply(_this,_);
   }
  __1;
 };
 localStorage=function()
 {
  return window.localStorage;
 };
 (Mobile()).IGenericStorage=(Class())(__2,null,{get_Item:function(v)
 {
  var _,__3,__4,__5,__6;
  _=localStorage();
  __4=_.getItem(v);
  __3=function(arg00)
  {
   var __1;
   __1=JSON;
   return JSON.parse.call(__1,arg00);
  };
  __6=__3(__4);
  __5=function(value)
  {
   return value;
  };
  return __5(__6);
 },set_Item:function(k,v)
 {
  var _,__1,__3;
  __1=localStorage();
  _=JSON;
  __3=JSON.stringify.call(_,v);
  return __1.setItem(k,__3);
 }});
 (Mobile()).IStorage=(Class())(__2,null,{get_Item:function(v)
 {
  var _;
  _=localStorage();
  return _.getItem(v);
 },set_Item:function(k,v)
 {
  var _;
  _=localStorage();
  return _.setItem(k,v);
 }});
 (Mobile()).GetLocation=function()
 {
  var _,s;
  _=websharperBridge;
  s=websharperBridge.location.call(_);
  return eval(""+s);
 };
 (Mobile()).GetAcceleration=function()
 {
  var _,s;
  _=websharperBridge;
  s=websharperBridge.acceleration.call(_);
  return eval(""+s);
 };
 (Mobile()).Storage=new(Mobile()).IStorage();
 (Mobile()).GenericStorage=new(Mobile()).IGenericStorage();
}());
