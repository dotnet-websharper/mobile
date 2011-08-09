(function()
{
 var global=this;
 var Ajax,Class,Core,Dictionary_2,Runtime,SeqModule,Tupled,WP7,WebSharper,__1,__10,__11,__9,callbackCounter,result,setCallbacks;
 IntelliFactory.WebSharper.Runtime.Declare({IntelliFactory:{WebSharper:{Mobile:{WP7:{WP7MobileProvider:{},ProviderHolder:{},Ajax:{AjaxProvider:{}}}}}}});
 Ajax=function()
 {
  return IntelliFactory.WebSharper.Mobile.WP7.Ajax;
 };
 WP7=function()
 {
  return IntelliFactory.WebSharper.Mobile.WP7;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Mobile;
 });
 WebSharper=function()
 {
  return IntelliFactory.WebSharper;
 };
 Class=function()
 {
  return IntelliFactory.WebSharper.Runtime.Class;
 };
 Runtime=function()
 {
  return IntelliFactory.WebSharper.Runtime;
 };
 __1=function(str)
 {
  return IntelliFactory.WebSharper.Core.StringModule.Map(function(_arg1)
  {
   var _;
   if(_arg1===44)
    {
     _=35;
    }
   else
    {
     _=_arg1===46?64:_arg1;
    }
   return _;
  },str);
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.StringModule.Map;
 });
 (function()
 {
  return IntelliFactory.WebSharper.Core.StringModule;
 });
 Core=function()
 {
  return IntelliFactory.WebSharper.Core;
 };
 (function(_arg1)
 {
  var _;
  if(_arg1===44)
   {
    _=35;
   }
  else
   {
    _=_arg1===46?64:_arg1;
   }
  return _;
 });
 SeqModule=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule;
 };
 Tupled=function()
 {
  return IntelliFactory.WebSharper.Runtime.Tupled;
 };
 setCallbacks=function()
 {
  return IntelliFactory.WebSharper.Mobile.WP7.Ajax.setCallbacks;
 };
 result=function()
 {
  return IntelliFactory.WebSharper.Mobile.WP7.result;
 };
 __9=function(x)
 {
  return x;
 };
 callbackCounter=function()
 {
  return IntelliFactory.WebSharper.Mobile.WP7.Ajax.callbackCounter;
 };
 Dictionary_2=function()
 {
  return IntelliFactory.WebSharper.Collections["Dictionary`2"];
 };
 (function()
 {
  return IntelliFactory.WebSharper.Collections;
 });
 __10=function(tupledArg)
 {
  var a,b;
  a=tupledArg[0];
  b=tupledArg[1];
  return IntelliFactory.WebSharper.Collections["Dictionary`2"].eq(a,b);
 };
 (function()
 {
  return IntelliFactory.WebSharper.Collections["Dictionary`2"].eq;
 });
 __11=function(obj)
 {
  return IntelliFactory.WebSharper.Core.Hashing.Hash(obj);
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.Hashing.Hash;
 });
 (function()
 {
  return IntelliFactory.WebSharper.Core.Hashing;
 });
 (Ajax()).AjaxProvider=(Class())(null,null,{Async:function(url,headers,data,cb,fail)
 {
  var __2,__3,__4,__5,__6,__7,__8,headers_1,no,ok,patternInput;
  __2=function(list)
  {
   return(Core()).ListModule.OfSeq((SeqModule()).Map((Tupled())(function(tupledArg)
   {
    var _,k,v;
    k=tupledArg[0];
    v=tupledArg[1];
    _=__1(k)+";";
    return _+__1(v);
   }),list));
  };
  __4=__2(headers);
  __3=function(list)
  {
   return(SeqModule()).Reduce(function(a)
   {
    return function(b)
    {
     return a+","+b;
    };
   },list);
  };
  headers_1=__3(__4);
  patternInput=(setCallbacks())(cb,fail);
  ok=patternInput[0];
  no=patternInput[1];
  __5=__1(url);
  __6=__1(data);
  __7=__1(ok);
  __8=__1(no);
  return callNotify("ajax."+__5+"."+headers_1+"."+__6+"."+__7+"."+__8);
 },Call:function()
 {
  var _;
  _=(Runtime()).NewError("NotSupportedException","Support for synchronous RPC calls was dropped.");
  throw _;
 }});
 (WP7()).WP7MobileProvider=(Class())(function()
 {
  var _this=this;
  var _,__2,c,matchValue;
  matchValue={$:0};
  if(matchValue.$==1)
   {
    c=matchValue.$0;
    _=[];
    __2=void c.apply(_this,_);
   }
  __2;
 },null,{Alert:function(s)
 {
  return callNotify("alert."+s);
 },Log:function(s)
 {
  return callNotify("log."+s);
 },GetLocation:function()
 {
  callNotify("location.");
  return result();
 },GetAcceleration:function()
 {
  callNotify("acceleration.");
  return result();
 },GetPhotoFromCamera:function()
 {
  var __=this;
  var _,__2;
  _=(Tupled())(function(tupledArg)
  {
   var _arg1,callback,fail;
   callback=tupledArg[0];
   fail=tupledArg[1];
   _arg1=tupledArg[2];
   return __.photoFromCamera(callback,fail,_arg1);
  });
  __2=(WebSharper()).Control.Concurrent.FromContinuations(function(x)
  {
   return function(y)
   {
    return _([x,y,function(value)
    {
     return void value;
    }]);
   };
  });
  return __9(__2);
 },StorageLoad:function(k)
 {
  callNotify("localStorage.load."+k);
  return result();
 },StorageStore:function(k,v)
 {
  return callNotify("localStorage.store."+k+"."+v);
 },JsonStorageLoad:function(k)
 {
  var _this=this;
  var _,__2,__4,__5,__6;
  __2=_this.StorageLoad(k);
  _=function(_arg6)
  {
   return _arg6===""?"[]":_arg6;
  };
  __5=_(__2);
  __4=function(arg00)
  {
   var __3;
   __3=JSON;
   return JSON.parse.call(__3,arg00);
  };
  __6=__4(__5);
  return __9(__6);
 },JsonStorageStore:function(k,v)
 {
  var _this=this;
  var _,arg10;
  _=JSON;
  arg10=JSON.stringify.call(_,v);
  return _this.StorageStore(k,arg10);
 },photoFromCamera:function(callback,fail)
 {
  var callback_1,fail_1,fail_2,patternInput;
  patternInput=(setCallbacks())(callback,fail);
  fail_1=patternInput[1];
  callback_1=patternInput[0];
  fail_2=__1(fail_1);
  return callNotify("camera."+__1(callback_1)+"."+fail_2);
 }});
 (Ajax()).setCallbacks=function(success,failure)
 {
  var _,__2,cbc;
  cbc=callbackCounter();
  (Ajax()).callbackCounter=callbackCounter()+1;
  _=(Ajax()).callbacks;
  _.set_Item(cbc,success);
  __2=(Ajax()).failureCallbacks;
  __2.set_Item(cbc,failure);
  return["IntelliFactory.WebSharper.Mobile.WP7.Ajax.callbacks.get_Item("+cbc.toString()+")","IntelliFactory.WebSharper.Mobile.WP7.Ajax.failureCallbacks.get_Item("+cbc.toString()+")"];
 };
 (Ajax()).updateAjaxProvider=function()
 {
  return(WebSharper()).Remoting.Config.AjaxProvider=(Runtime()).NewUnion((Ajax()).AjaxProvider,0);
 };
 (Ajax()).callbacks=new(Dictionary_2())([],(Tupled())(__10),__11);
 (Ajax()).failureCallbacks=new(Dictionary_2())([],(Tupled())(__10),__11);
 (Ajax()).callbackCounter=0;
 (WP7()).ProviderHolder.provider=new(WP7()).WP7MobileProvider();
 (WP7()).EnableWP7Support=function()
 {
  return wp7_init();
 };
 (WP7()).result="";
}());
