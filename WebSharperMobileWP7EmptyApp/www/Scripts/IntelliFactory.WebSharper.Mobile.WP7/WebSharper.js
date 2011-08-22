(function()
{
 var global=this;
 var Ajax,ArrayModule,Class,Core,Dictionary_2,Equals,Map,NewUnion,Runtime,SeqModule,Tupled,WP7,WebSharper,__10,__17,__18,__19,__9,callbackCounter,cookie,fromCharCode,result,setCallbacks;
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
 __9=function(s)
 {
  var _,__1,__2,__3,__4,__5,__6,__7,__8;
  __1=[46];
  _=String.fromCharCode;
  __3=[64];
  __2=String.fromCharCode;
  __4=IntelliFactory.WebSharper.Core.StringUtil.Replace(s,String.fromCharCode.apply.call(_,undefined,__1),String.fromCharCode.apply.call(__2,undefined,__3));
  __6=[44];
  __5=String.fromCharCode;
  __8=[35];
  __7=String.fromCharCode;
  return IntelliFactory.WebSharper.Core.StringUtil.Replace(__4,String.fromCharCode.apply.call(__5,undefined,__6),String.fromCharCode.apply.call(__7,undefined,__8));
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.StringUtil.Replace;
 });
 (function()
 {
  return IntelliFactory.WebSharper.Core.StringUtil;
 });
 Core=function()
 {
  return IntelliFactory.WebSharper.Core;
 };
 fromCharCode=function()
 {
  return String.fromCharCode;
 };
 (function()
 {
  return String.fromCharCode.apply;
 });
 Equals=function()
 {
  return IntelliFactory.WebSharper.Core.Equality.Equals;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.Equality;
 });
 NewUnion=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewUnion;
 };
 SeqModule=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule;
 };
 Tupled=function()
 {
  return IntelliFactory.WebSharper.Runtime.Tupled;
 };
 __10=function(a)
 {
  return function(b)
  {
   return a+","+b;
  };
 };
 Map=function()
 {
  return IntelliFactory.WebSharper.Core.ArrayModule.Map;
 };
 ArrayModule=function()
 {
  return IntelliFactory.WebSharper.Core.ArrayModule;
 };
 setCallbacks=function()
 {
  return IntelliFactory.WebSharper.Mobile.WP7.Ajax.setCallbacks;
 };
 result=function()
 {
  return IntelliFactory.WebSharper.Mobile.WP7.result;
 };
 __17=function(x)
 {
  return x;
 };
 callbackCounter=function()
 {
  return IntelliFactory.WebSharper.Mobile.WP7.Ajax.callbackCounter;
 };
 cookie=function()
 {
  return document.cookie;
 };
 Dictionary_2=function()
 {
  return IntelliFactory.WebSharper.Collections["Dictionary`2"];
 };
 (function()
 {
  return IntelliFactory.WebSharper.Collections;
 });
 __18=function(tupledArg)
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
 __19=function(obj)
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
  var __1,__11,__12,__13,__14,__15,__16,__2,__3,__4,__5,__6,__7,__8,cookies,cookies_1,data_1,headers_1,no,ok,patternInput;
  if((Equals())(headers,(NewUnion())((Core())["FSharpList`1"],0)))
   {
    __4="";
   }
  else
   {
    __1=function(list)
    {
     return(Core()).ListModule.OfSeq((SeqModule()).Map((Tupled())(function(tupledArg)
     {
      var _,k,v;
      k=tupledArg[0];
      v=tupledArg[1];
      _=__9(k)+";";
      return _+__9(v);
     }),list));
    };
    __3=__1(headers);
    __2=function(list)
    {
     return(SeqModule()).Reduce(__10,list);
    };
    __4=__2(__3);
   }
  headers_1=__4;
  cookies=(Ajax()).cookies();
  if((Equals())(cookies,[]))
   {
    __8="";
   }
  else
   {
    __5=function(array)
    {
     return(Map())((Tupled())(function(tupledArg)
     {
      var _,k,v;
      k=tupledArg[0];
      v=tupledArg[1];
      _=__9(k)+";";
      return _+__9(v);
     }),array);
    };
    __7=__5(cookies);
    __6=function(array)
    {
     return(ArrayModule()).Reduce(__10,array);
    };
    __8=__6(__7);
   }
  cookies_1=__8;
  patternInput=(setCallbacks())(cb,fail);
  ok=patternInput[0];
  no=patternInput[1];
  __11=String;
  if(data.indexOf((fromCharCode()).call(__11,46))>-1)
   {
    __12=__9(data);
   }
  else
   {
    __12=data;
   }
  data_1=__12;
  __13=__9(url);
  __14=__9(data_1);
  __15=__9(ok);
  __16=__9(no);
  return callNotify("ajax."+__13+"."+headers_1+"."+cookies_1+"."+__14+"."+__15+"."+__16);
 },Call:function()
 {
  var _;
  _=(Runtime()).NewError("NotSupportedException","Support for synchronous RPC calls was dropped.");
  throw _;
 }});
 (WP7()).WP7MobileProvider=(Class())(function()
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
  var _,__1,height,tupledArg,width;
  tupledArg=[0,0];
  width=tupledArg[0];
  height=tupledArg[1];
  _=(Tupled())(function(tupledArg_1)
  {
   var _arg1,callback,fail;
   callback=tupledArg_1[0];
   fail=tupledArg_1[1];
   _arg1=tupledArg_1[2];
   return __.photoFromCamera(width,height,callback,fail,_arg1);
  });
  __1=(WebSharper()).Control.Concurrent.FromContinuations(function(x)
  {
   return function(y)
   {
    return _([x,y,function(value)
    {
     return void value;
    }]);
   };
  });
  return __17(__1);
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
  var _,__1,__3,__4,__5;
  __1=_this.StorageLoad(k);
  _=function(_arg5)
  {
   return _arg5===""?"[]":_arg5;
  };
  __4=_(__1);
  __3=function(arg00)
  {
   var __2;
   __2=JSON;
   return JSON.parse.call(__2,arg00);
  };
  __5=__3(__4);
  return __17(__5);
 },JsonStorageStore:function(k,v)
 {
  var _this=this;
  var _,arg10;
  _=JSON;
  arg10=JSON.stringify.call(_,v);
  return _this.StorageStore(k,arg10);
 },photoFromCamera:function(width,height,callback,fail)
 {
  var callback_1,fail_1,fail_2,patternInput;
  patternInput=(setCallbacks())(callback,fail);
  fail_1=patternInput[1];
  callback_1=patternInput[0];
  fail_2=__9(fail_1);
  return callNotify("camera."+width.toString()+"."+height.toString()+"."+__9(callback_1)+"."+fail_2);
 }});
 (Ajax()).setCallbacks=function(success,failure)
 {
  var _,__1,cbc;
  cbc=callbackCounter();
  (Ajax()).callbackCounter=callbackCounter()+1;
  _=(Ajax()).callbacks;
  _.set_Item(cbc,success);
  __1=(Ajax()).failureCallbacks;
  __1.set_Item(cbc,failure);
  return["IntelliFactory.WebSharper.Mobile.WP7.Ajax.callbacks.get_Item("+cbc.toString()+")","IntelliFactory.WebSharper.Mobile.WP7.Ajax.failureCallbacks.get_Item("+cbc.toString()+")"];
 };
 (Ajax()).updateAjaxProvider=function()
 {
  return(WebSharper()).Remoting.Config.AjaxProvider=(NewUnion())((Ajax()).AjaxProvider,0);
 };
 (Ajax()).cookies=function()
 {
  var _,__1,__2,__3;
  if(cookie()==="")
   {
    __3=[];
   }
  else
   {
    _=cookie();
    __2=_.split(59);
    __1=function(array)
    {
     return(Map())(function(s)
     {
      var parts;
      parts=s.split(61);
      return[parts[0],parts[1]];
     },array);
    };
    __3=__1(__2);
   }
  return __3;
 };
 (Ajax()).callbacks=new(Dictionary_2())([],(Tupled())(__18),__19);
 (Ajax()).failureCallbacks=new(Dictionary_2())([],(Tupled())(__18),__19);
 (Ajax()).callbackCounter=0;
 (WP7()).ProviderHolder.provider=new(WP7()).WP7MobileProvider();
 (WP7()).EnableWP7Support=function()
 {
  return wp7_init();
 };
 (WP7()).result="";
}());
