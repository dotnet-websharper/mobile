(function()
{
 var global=this;
 var AjaxProvider,Client,Config,Core,EndPoint,MakeHeaders,NewUnion,Parse,Request,Runtime,Tupled,WebSharper,__3,map,stringify;
 IntelliFactory.WebSharper.Runtime.Declare({IntelliFactory:{WebSharper:{Remoting:{Config:{Default:{}},Client:{}}}}});
 Config=function()
 {
  return IntelliFactory.WebSharper.Remoting.Config;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Remoting;
 });
 WebSharper=function()
 {
  return IntelliFactory.WebSharper;
 };
 Runtime=function()
 {
  return IntelliFactory.WebSharper.Runtime;
 };
 Request=function()
 {
  return IntelliFactory.WebSharper.Remoting.Config.Request;
 };
 Tupled=function()
 {
  return IntelliFactory.WebSharper.Runtime.Tupled;
 };
 Core=function()
 {
  return IntelliFactory.WebSharper.Core;
 };
 NewUnion=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewUnion;
 };
 Client=function()
 {
  return IntelliFactory.WebSharper.Remoting.Client;
 };
 __3=function(value)
 {
  return void value;
 };
 AjaxProvider=function()
 {
  return IntelliFactory.WebSharper.Remoting.Config.AjaxProvider;
 };
 EndPoint=function()
 {
  return IntelliFactory.WebSharper.Remoting.Config.EndPoint;
 };
 MakeHeaders=function()
 {
  return IntelliFactory.WebSharper.Remoting.Client.MakeHeaders;
 };
 stringify=function()
 {
  return JSON.stringify;
 };
 Parse=function()
 {
  return IntelliFactory.WebSharper.Remoting.Client.Parse;
 };
 map=function()
 {
  return IntelliFactory.WebSharper.Remoting.Client.map;
 };
 (Config()).Default=(Runtime()).Class(null,null,{Async:function(url,headers,data,ok,no)
 {
  return(Request())(true,url,headers,data,ok,no);
 },Call:function(url,headers,data)
 {
  var _,result;
  _=undefined;
  result={contents:_};
  (Request())(false,url,headers,data,function(x)
  {
   return result.contents=x;
  },function(e)
  {
   throw e;
  });
  return result.contents;
 }});
 (Config()).Request=function(async,url,headers,data,ok,no)
 {
  var _,xhr;
  xhr=new XMLHttpRequest();
  xhr.open("POST",url,async);
  _=(Tupled())(function(tupledArg)
  {
   var k,v;
   k=tupledArg[0];
   v=tupledArg[1];
   return xhr.setRequestHeader(k,v);
  });
  (Core()).SeqModule.Iterate(_,headers);
  xhr.onreadystatechange=function()
  {
   var __1,__2;
   if((Core()).Equality.Equals(xhr.readyState,4))
    {
     if(xhr.status===200)
      {
       __1=ok(xhr.responseText);
      }
     else
      {
       __1=no(new Error("Invalid response code."));
      }
     __2=__1;
    }
   return __2;
  };
  return xhr.send(data);
 };
 (Config()).EndPoint="?";
 (Config()).AjaxProvider=(NewUnion())((Config()).Default,0);
 (Client()).Send=function(t,m,args)
 {
  var _,__1;
  _=AjaxProvider();
  __1=JSON;
  return _.Async(EndPoint(),(MakeHeaders())(t,m),(stringify()).call(__1,args),__3,__3);
 };
 (Client()).MakeHeaders=function(t,m)
 {
  var _,hs;
  hs=(Core()).ListModule.OfArray([["content-type","application/json"],["X-WebSharper-Rpc",m]]);
  if(t)
   {
    _=(NewUnion())((Core())["FSharpList`1"],1,["X-WebSharper-Rpc-Handler",t],hs);
   }
  else
   {
    _=hs;
   }
  return _;
 };
 (Client()).Async=function(t,m,args)
 {
  var __2,__4;
  __2=function(arg00)
  {
   var _,__1;
   __1=(WebSharper()).Control.Concurrent.FromContinuations(function(x)
   {
    return function(y)
    {
     return arg00([x,y,__3]);
    };
   });
   _=function(x)
   {
    return x;
   };
   return _(__1);
  };
  __4=(Tupled())(function(tupledArg)
  {
   var _,__1,onErr,onOk;
   onOk=tupledArg[0];
   onErr=tupledArg[1];
   _=AjaxProvider();
   __1=JSON;
   return _.Async(EndPoint(),(MakeHeaders())(t,m),(stringify()).call(__1,args),function(resp)
   {
    return onOk((Parse())(resp));
   },onErr);
  });
  return __2(__4);
 };
 (Client()).Parse=function(x)
 {
  var _,decode,json,types;
  _=JSON;
  json=JSON.parse.call(_,x);
  types=json.types;
  (Runtime()).Iterate(0,types.length-1,function(i)
  {
   var __1;
   __1=(Client()).lookup(types[i]);
   return types[i]=__1;
  });
  decode=function(x_1)
  {
   var __1,__2,__4,__5,__6,__7,matchValue,matchValue_1,o,t,ti;
   if(x_1==null)
    {
     __7=x_1;
    }
   else
    {
     matchValue=typeof x_1;
     if(matchValue==="object")
      {
       if(!(x_1 instanceof Array))
        {
         o=(map())(decode,x_1.v);
         ti=x_1.t;
         if(typeof ti==="undefined")
          {
           __4=o;
          }
         else
          {
           matchValue_1=types[ti];
           if(matchValue_1.$==0)
            {
             __2=o;
            }
           else
            {
             t=matchValue_1.$0;
             __1=Runtime();
             __2=(Runtime()).Coerce.call(__1,o,t);
            }
           __4=__2;
          }
         __5=__4;
        }
       else
        {
         __5=(map())(decode,x_1);
        }
       __6=__5;
      }
     else
      {
       __6=(map())(decode,x_1);
      }
     __7=__6;
    }
   return __7;
  };
  return decode(json.value);
 };
 (Client()).Call=function(t,m,args)
 {
  var _,__1,__2,__4,arg20;
  _=JSON;
  arg20=(stringify()).call(_,args);
  __1=AjaxProvider();
  __4=__1.Call(EndPoint(),(MakeHeaders())(t,m),arg20);
  __2=function(x)
  {
   return(Parse())(x);
  };
  return __2(__4);
 };
 (Client()).lookup=function(x)
 {
  var _,__1,i,r;
  r=global;
  i=0;
  if(r)
   {
    _=i<x.length;
   }
  else
   {
    _=false;
   }
  while(_)
   {
    r=r[x[i]];
    i=i+1;
    if(r)
     {
      _=i<x.length;
     }
    else
     {
      _=false;
     }
   }
  if(r)
   {
    __1={$:1,$0:r};
   }
  else
   {
    __1={$:0};
   }
  return __1;
 };
 (Client()).map=function(f,x)
 {
  var _1,__1,__2,matchValue,r;
  if(x instanceof Array)
   {
    __2=(Core()).ArrayModule.Map(f,x);
   }
  else
   {
    matchValue=typeof x;
    if(matchValue==="object")
     {
      r={};
      for(_1 in x)if(function(y)
      {
       var _;
       _=f(x[y]);
       r[y]=_;
       return false;
      }(_1))
       break;
      __1=r;
     }
    else
     {
      __1=x;
     }
    __2=__1;
   }
  return __2;
 };
}());
