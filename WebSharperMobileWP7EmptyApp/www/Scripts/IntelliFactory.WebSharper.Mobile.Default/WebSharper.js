(function()
{
 var global=this;
 var Mobile,WebSharper,localStorage;
 IntelliFactory.WebSharper.Runtime.Declare({IntelliFactory:{WebSharper:{Mobile:{DefaultMobileProvider:{}}}}});
 Mobile=function()
 {
  return IntelliFactory.WebSharper.Mobile;
 };
 WebSharper=function()
 {
  return IntelliFactory.WebSharper;
 };
 localStorage=function()
 {
  return window.localStorage;
 };
 (Mobile()).DefaultMobileProvider=(WebSharper()).Runtime.Class(function()
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
 },null,{Alert:function(s)
 {
  return alert(s);
 },Log:function(s)
 {
  var _;
  _=console;
  return console.log.call(_,s);
 },GetLocation:function()
 {
  return{Lat:0,Long:0};
 },GetAcceleration:function()
 {
  return{X:0,Y:0,Z:-9.81};
 },GetPhotoFromCamera:function()
 {
  var builder_;
  builder_=(WebSharper()).Control.ExtraTopLevelOperators.Do;
  return builder_.Delay(function()
  {
   return builder_.Return("");
  });
 },StorageLoad:function(k)
 {
  var _,_1,__1,__2,x;
  try
  {
   _=localStorage();
   __2=_.getItem(k);
   __1=function(_arg1)
   {
    return _arg1===null?"":_arg1;
   };
   _1=__1(__2);
  }
  catch(x)
  {
   _1="";
  }
  return _1;
 },StorageStore:function(k,v)
 {
  var _;
  _=localStorage();
  return _.setItem(k,v);
 },JsonStorageLoad:function(k)
 {
  var _this=this;
  var _,__1,__3,__4,__5,__6;
  __1=_this.StorageLoad(k);
  _=function(_arg2)
  {
   return _arg2===""?"[]":_arg2;
  };
  __4=_(__1);
  __3=function(arg00)
  {
   var __2;
   __2=JSON;
   return JSON.parse.call(__2,arg00);
  };
  __6=__3(__4);
  __5=function(value)
  {
   return value;
  };
  return __5(__6);
 },JsonStorageStore:function(k,v)
 {
  var _this=this;
  var _,arg10;
  _=JSON;
  arg10=JSON.stringify.call(_,v);
  return _this.StorageStore(k,arg10);
 }});
 (Mobile()).Mobile=new(Mobile()).DefaultMobileProvider();
}());
