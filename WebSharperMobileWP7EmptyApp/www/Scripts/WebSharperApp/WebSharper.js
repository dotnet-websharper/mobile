(function()
{
 var global=this;
 var ActivateDictionary,Append,Async,Attr,Attr_1,Data,Delay,DictionaryPages,Do,Empty,Equals,Events,Exists,FSharpList_1,Find,FindIndex,Get,IS_RPC,InitializeData,Iterate,JQueryMobile,Length,LoadFullDictionary,LoginPage,MainPage,Map,Mobile,Mobile_1,NewUnion,OfArray,OfSeq,OnAfterRender,Operators,OptionsPage,Runtime,SeqModule,Tags,TestPages,Translations,Tupled,WordPages,Words,_0,_0_1,_0_2,__44,__46,__49,__5,__53,back,dictionaries,history,mobile,newEditState,op_MinusLess,sampleDictionaryEnToHu;
 IntelliFactory.WebSharper.Runtime.Declare({SampleWebsite:{WordPages:{},TestPages:{},SampleSite:{MobileClient:{}},OptionsPage:{},MainPage:{},LoginPage:{},JQueryMobileViewer:{},JQueryMobile:{},DictionaryPages:{},Data:{}}});
 Runtime=function()
 {
  return IntelliFactory.WebSharper.Runtime;
 };
 (function()
 {
  return IntelliFactory.WebSharper;
 });
 JQueryMobile=function()
 {
  return SampleWebsite.JQueryMobile;
 };
 Data=function()
 {
  return SampleWebsite.Data;
 };
 Do=function()
 {
  return IntelliFactory.WebSharper.Control.ExtraTopLevelOperators.Do;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Control.ExtraTopLevelOperators;
 });
 (function()
 {
  return IntelliFactory.WebSharper.Control;
 });
 IS_RPC=function()
 {
  return SampleWebsite.Data.IS_RPC;
 };
 Async=function()
 {
  return IntelliFactory.WebSharper.Remoting.Client.Async;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Remoting.Client;
 });
 (function()
 {
  return IntelliFactory.WebSharper.Remoting;
 });
 _0=function()
 {
  return SampleWebsite.Data.activeDictionary.$0;
 };
 (function()
 {
  return SampleWebsite.Data.activeDictionary;
 });
 NewUnion=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewUnion;
 };
 FSharpList_1=function()
 {
  return IntelliFactory.WebSharper.Core["FSharpList`1"];
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core;
 });
 Words=function()
 {
  return SampleWebsite.Data.activeDictionary.$0.Words;
 };
 Find=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Find;
 };
 SeqModule=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule;
 };
 Mobile=function()
 {
  return IntelliFactory.WebSharper.Mobile.Mobile;
 };
 Mobile_1=function()
 {
  return IntelliFactory.WebSharper.Mobile;
 };
 dictionaries=function()
 {
  return SampleWebsite.Data.dictionaries;
 };
 Length=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Length;
 };
 Get=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Get;
 };
 LoadFullDictionary=function()
 {
  return SampleWebsite.Data.LoadFullDictionary;
 };
 OfArray=function()
 {
  return IntelliFactory.WebSharper.Core.ListModule.OfArray;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.ListModule;
 });
 sampleDictionaryEnToHu=function()
 {
  return SampleWebsite.Data.sampleDictionaryEnToHu;
 };
 ActivateDictionary=function()
 {
  return SampleWebsite.Data.ActivateDictionary;
 };
 __5=function(arg00)
 {
  var _;
  _=IntelliFactory.WebSharper.Control.ExtraTopLevelOperators.Do;
  return _.Return(arg00);
 };
 TestPages=function()
 {
  return SampleWebsite.TestPages;
 };
 op_MinusLess=function()
 {
  return IntelliFactory.WebSharper.Html.Operators.op_MinusLess;
 };
 Operators=function()
 {
  return IntelliFactory.WebSharper.Html.Operators;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Html;
 });
 Attr=function()
 {
  return IntelliFactory.WebSharper.Html.Implementation.HTML5.Attr;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Html.Implementation.HTML5;
 });
 (function()
 {
  return IntelliFactory.WebSharper.Html.Implementation;
 });
 Tags=function()
 {
  return IntelliFactory.WebSharper.Html.Implementation.Tags;
 };
 Attr_1=function()
 {
  return IntelliFactory.WebSharper.Html.Implementation.Attr;
 };
 __44=function(test)
 {
  var count;
  count=function(acu)
  {
   return function(_arg1)
   {
    var _,l,rest;
    if(_arg1.$==0)
     {
      _=acu;
     }
    else
     {
      l=_arg1.$0.$1;
      rest=_arg1.$1;
      _=(count(acu+IntelliFactory.WebSharper.Core.SeqModule.Length(l)))(rest);
     }
    return _;
   };
  };
  return(count(0))(test);
 };
 OnAfterRender=function()
 {
  return IntelliFactory.WebSharper.Html.Operators.OnAfterRender;
 };
 __46=function(value)
 {
  return value.toString();
 };
 __49=function(arg00)
 {
  ({$:0});
  return IntelliFactory.WebSharper.Control.Concurrent.Start(arg00);
 };
 (function()
 {
  return IntelliFactory.WebSharper.Control.Concurrent.Start;
 });
 (function()
 {
  return IntelliFactory.WebSharper.Control.Concurrent;
 });
 __53=function(value)
 {
  return void value;
 };
 Delay=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Delay;
 };
 Map=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Map;
 };
 OfSeq=function()
 {
  return IntelliFactory.WebSharper.Core.ListModule.OfSeq;
 };
 Events=function()
 {
  return IntelliFactory.WebSharper.Html.EventsPervasives.Events;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Html.EventsPervasives;
 });
 Equals=function()
 {
  return IntelliFactory.WebSharper.Core.Equality.Equals;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.Equality;
 });
 Tupled=function()
 {
  return IntelliFactory.WebSharper.Runtime.Tupled;
 };
 Exists=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Exists;
 };
 FindIndex=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.FindIndex;
 };
 _0_1=function()
 {
  return SampleWebsite.Data.activeTest.$0;
 };
 (function()
 {
  return SampleWebsite.Data.activeTest;
 });
 OptionsPage=function()
 {
  return SampleWebsite.OptionsPage;
 };
 DictionaryPages=function()
 {
  return SampleWebsite.DictionaryPages;
 };
 history=function()
 {
  return window.history;
 };
 back=function()
 {
  return window.history.back;
 };
 MainPage=function()
 {
  return SampleWebsite.MainPage;
 };
 Append=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Append;
 };
 Empty=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Empty;
 };
 mobile=function()
 {
  return jQuery.mobile;
 };
 Iterate=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Iterate;
 };
 InitializeData=function()
 {
  return SampleWebsite.Data.InitializeData;
 };
 LoginPage=function()
 {
  return SampleWebsite.LoginPage;
 };
 WordPages=function()
 {
  return SampleWebsite.WordPages;
 };
 newEditState=function()
 {
  return SampleWebsite.Data.newEditState;
 };
 _0_2=function()
 {
  return SampleWebsite.Data.activeWord.$0;
 };
 (function()
 {
  return SampleWebsite.Data.activeWord;
 });
 Translations=function()
 {
  return SampleWebsite.Data.activeWord.$0.Translations;
 };
 SampleWebsite.JQueryMobileViewer=(Runtime()).Class(null,null,{get_Body:function()
 {
  return(JQueryMobile()).Main();
 }});
 (Data()).AddWord=function(dict,word)
 {
  var builder_;
  builder_=Do();
  return builder_.Delay(function()
  {
   var _;
   if(IS_RPC())
    {
     _=builder_.Bind((Async())(null,"[[0,\"WebSharperApp\",\"SampleWebsite.Data+Rpc\"],{\"methodDefinition\":{\"isStaticMethod\":true,\"methodGenerics\":0,\"methodName\":\"AddWord\",\"methodSignature\":[1,[0,\"mscorlib\",\"System.Int32\"],[1,[0,\"WebSharperApp\",\"SampleWebsite.Data+Word\"],[0]]]},\"methodArguments\":[0]}]",[dict.Id,word]),function(_arg3)
     {
      (_0()).Words=(NewUnion())(FSharpList_1(),1,word,Words());
      word.Id=_arg3;
      return builder_.Zero();
     });
    }
   else
    {
     (_0()).Words=(NewUnion())(FSharpList_1(),1,word,Words());
     word.Id=9;
     _=builder_.Zero();
    }
   return builder_.Combine(_,builder_.Delay(function()
   {
    return builder_.Return(undefined);
   }));
  });
 };
 (Data()).UpdateWord=function(dict,word)
 {
  var _,__1,builder_,w_1;
  __1=dict.Words;
  _=function(list)
  {
   return(Find())(function(w)
   {
    return w.Id===word.Id;
   },list);
  };
  w_1=_(__1);
  w_1.OriginalWord=word.OriginalWord;
  w_1.Translations=word.Translations;
  builder_=Do();
  return builder_.Delay(function()
  {
   var __2;
   if(IS_RPC())
    {
     __2=builder_.Bind((Async())(null,"[[0,\"WebSharperApp\",\"SampleWebsite.Data+Rpc\"],{\"methodDefinition\":{\"isStaticMethod\":true,\"methodGenerics\":0,\"methodName\":\"UpdateWord\",\"methodSignature\":[1,[0,\"mscorlib\",\"System.Int32\"],[1,[0,\"WebSharperApp\",\"SampleWebsite.Data+Word\"],[0]]]},\"methodArguments\":[0]}]",[dict.Id,w_1]),function()
     {
      return builder_.Zero();
     });
    }
   else
    {
     __2=builder_.Zero();
    }
   return builder_.Combine(__2,builder_.Delay(function()
   {
    return builder_.Return(undefined);
   }));
  });
 };
 (Data()).GetWord=function(dict,word)
 {
  var _,__1;
  __1=dict.Words;
  _=function(list)
  {
   return(Find())(function(w)
   {
    return word===w.OriginalWord;
   },list);
  };
  return _(__1);
 };
 (Data()).Login=function(email,password)
 {
  var _,__1,__2,__3,__4,k;
  _=Mobile();
  _.Alert("Login js before");
  if(IS_RPC())
   {
    __1=Mobile();
    __1.Alert("Login js rpc before");
    k=(Async())(null,"[[0,\"WebSharperApp\",\"SampleWebsite.Data+Rpc\"],{\"methodDefinition\":{\"isStaticMethod\":true,\"methodGenerics\":0,\"methodName\":\"Login\",\"methodSignature\":[1,[0,\"mscorlib\",\"System.String\"],[1,[0,\"mscorlib\",\"System.String\"],[0]]]},\"methodArguments\":[0]}]",[email,password]);
    __2=Mobile();
    __2.Alert("Login js rpc after");
    __4=k;
   }
  else
   {
    __3=Do();
    __4=__3.Return(true);
   }
  return __4;
 };
 (Data()).InitializeData=function()
 {
  var builder_;
  builder_=Do();
  return builder_.Delay(function()
  {
   var __3;
   if(IS_RPC())
    {
     __3=builder_.Bind((Data()).GetDictionariesInfos(),function(_arg7)
     {
      var _,__1,__2,activeDict;
      (Data()).dictionaries=_arg7;
      _=dictionaries();
      if((Length())(_)>0)
       {
        __1=dictionaries();
        activeDict=(Get())(0,__1);
        (Data()).activeDictionary={$:1,$0:activeDict};
        __2=builder_.Bind((LoadFullDictionary())(activeDict),function()
        {
         return builder_.Return(undefined);
        });
       }
      else
       {
        __2=builder_.Zero();
       }
      return __2;
     });
    }
   else
    {
     (Data()).dictionaries=(OfArray())([sampleDictionaryEnToHu(),(Data()).sampleDictionaryHuToEn]);
     __3=builder_.Bind((ActivateDictionary())(sampleDictionaryEnToHu()),function()
     {
      return builder_.Return(undefined);
     });
    }
   return __3;
  });
 };
 (Data()).ActivateDictionary=function(dict)
 {
  var builder_;
  builder_=Do();
  return builder_.Delay(function()
  {
   var _;
   if(dict.IsLoaded===false)
    {
     _=builder_.Bind((LoadFullDictionary())(dict),function()
     {
      return builder_.Return(undefined);
     });
    }
   else
    {
     _=builder_.Zero();
    }
   return builder_.Combine(_,builder_.Delay(function()
   {
    (Data()).activeDictionary={$:1,$0:dict};
    return builder_.Zero();
   }));
  });
 };
 (Data()).AddDictionary=function(dict)
 {
  var builder_;
  (Data()).dictionaries=(NewUnion())(FSharpList_1(),1,dict,dictionaries());
  builder_=Do();
  return builder_.Delay(function()
  {
   var _;
   if(IS_RPC())
    {
     _=builder_.Bind((Async())(null,"[[0,\"WebSharperApp\",\"SampleWebsite.Data+Rpc\"],{\"methodDefinition\":{\"isStaticMethod\":true,\"methodGenerics\":0,\"methodName\":\"AddDictionary\",\"methodSignature\":[1,[0,\"WebSharperApp\",\"SampleWebsite.Data+Dictionary\"],[0]]},\"methodArguments\":[0]}]",[dict]),function(_arg2)
     {
      dict.Id=_arg2;
      return builder_.Zero();
     });
    }
   else
    {
     dict.Id=9;
     _=builder_.Zero();
    }
   return _;
  });
 };
 (Data()).MakeTest=function(dict)
 {
  var _,__1;
  if(IS_RPC())
   {
    __1=(Async())(null,"[[0,\"WebSharperApp\",\"SampleWebsite.Data+Rpc\"],{\"methodDefinition\":{\"isStaticMethod\":true,\"methodGenerics\":0,\"methodName\":\"MakeTest\",\"methodSignature\":[1,[0,\"WebSharperApp\",\"SampleWebsite.Data+Dictionary\"],[0]]},\"methodArguments\":[0]}]",[dict]);
   }
  else
   {
    _=(OfArray())([{$:0,$0:{FromLang:"English",ToLang:"Hungarian"},$1:(OfArray())([{Id:5,OriginalWord:"ma",Translations:(OfArray())(["a1","a2"])},{Id:5,OriginalWord:"mb",Translations:(OfArray())(["b1","b2"])},{Id:5,OriginalWord:"mc",Translations:(OfArray())(["c1","c2"])},{Id:5,OriginalWord:"md",Translations:(OfArray())(["d1","d2"])},{Id:5,OriginalWord:"me",Translations:(OfArray())(["e1","e2"])}])},{$:0,$0:{FromLang:"Hungarian",ToLang:"English"},$1:(OfArray())([{Id:5,OriginalWord:"fa",Translations:(OfArray())(["a1","a2"])},{Id:5,OriginalWord:"fb",Translations:(OfArray())(["b1","b2"])},{Id:5,OriginalWord:"fc",Translations:(OfArray())(["c1","c2"])},{Id:5,OriginalWord:"fd",Translations:(OfArray())(["d1","d2"])},{Id:5,OriginalWord:"fe",Translations:(OfArray())(["e1","e2"])}])},{$:1,$0:{FromLang:"Hungarian",ToLang:"English"},$1:(OfArray())([[{Id:5,OriginalWord:"sa",Translations:(OfArray())(["sa1s","sa2s"])},(OfArray())(["sa1s","sa2s","sa3s"])],[{Id:5,OriginalWord:"sb",Translations:(OfArray())(["sb1s"])},(OfArray())(["sb1s","sb2s","sb3s"])]])}]);
    __1=__5(_);
   }
  return __1;
 };
 (Data()).GetDictionariesInfos=function()
 {
  var _,__1;
  if(IS_RPC())
   {
    __1=(Async())(null,"[[0,\"WebSharperApp\",\"SampleWebsite.Data+Rpc\"],{\"methodDefinition\":{\"isStaticMethod\":true,\"methodGenerics\":0,\"methodName\":\"GetDictionariesInfo\",\"methodSignature\":[0]},\"methodArguments\":[0]}]",[]);
   }
  else
   {
    _=(NewUnion())(FSharpList_1(),0);
    __1=__5(_);
   }
  return __1;
 };
 (Data()).LoadFullDictionary=function(dictToLoad)
 {
  var builder_;
  builder_=Do();
  return builder_.Delay(function()
  {
   var _;
   if(IS_RPC())
    {
     _=builder_.Bind((Async())(null,"[[0,\"WebSharperApp\",\"SampleWebsite.Data+Rpc\"],{\"methodDefinition\":{\"isStaticMethod\":true,\"methodGenerics\":0,\"methodName\":\"LoadFullDictionary\",\"methodSignature\":[1,[0,\"WebSharperApp\",\"SampleWebsite.Data+Dictionary\"],[0]]},\"methodArguments\":[0]}]",[dictToLoad]),function(_arg1)
     {
      dictToLoad.Words=_arg1.Words;
      dictToLoad.IsLoaded=true;
      return builder_.Zero();
     });
    }
   else
    {
     _=builder_.Zero();
    }
   return _;
  });
 };
 (Data()).NONOIGetWords=function()
 {
  return(OfArray())([{Id:1,OriginalWord:"a",Translations:(OfArray())(["a1","a2"])},{Id:2,OriginalWord:"b",Translations:(OfArray())(["b1","b2"])},{Id:3,OriginalWord:"c",Translations:(OfArray())(["c1","c2"])},{Id:4,OriginalWord:"d",Translations:(OfArray())(["d1","d2"])},{Id:5,OriginalWord:"e",Translations:(OfArray())(["e1","e2"])}]);
 };
 (Data()).IS_RPC=true;
 (Data()).newEditState={$:0};
 (Data()).dictionaries=(NewUnion())(FSharpList_1(),0);
 (Data()).activeDictionary={$:0};
 (Data()).activeWord={$:0};
 (Data()).activeTest={$:0};
 (Data()).sampleDictionaryHuToEn={Id:1,FromLanguage:"Hungarian",ToLanguage:"English",Words:(OfArray())([{Id:5,OriginalWord:"Hma",Translations:(OfArray())(["a1","a2"])},{Id:5,OriginalWord:"Hmb",Translations:(OfArray())(["b1","b2"])},{Id:5,OriginalWord:"Hmc",Translations:(OfArray())(["c1","c2"])},{Id:5,OriginalWord:"Hmd",Translations:(OfArray())(["d1","d2"])},{Id:5,OriginalWord:"Hme",Translations:(OfArray())(["e1","e2"])},{Id:5,OriginalWord:"Hfa",Translations:(OfArray())(["a1","a2"])},{Id:5,OriginalWord:"Hfb",Translations:(OfArray())(["b1","b2"])},{Id:5,OriginalWord:"Hfc",Translations:(OfArray())(["c1","c2"])},{Id:5,OriginalWord:"Hfd",Translations:(OfArray())(["d1","d2"])},{Id:5,OriginalWord:"Hfe",Translations:(OfArray())(["e1","e2"])}]),IsLoaded:true};
 (Data()).sampleDictionaryEnToHu={Id:2,FromLanguage:"English",ToLanguage:"Hungarian",Words:(OfArray())([{Id:5,OriginalWord:"Ema",Translations:(OfArray())(["a1","a2"])},{Id:5,OriginalWord:"Emb",Translations:(OfArray())(["b1","b2"])},{Id:5,OriginalWord:"Emc",Translations:(OfArray())(["c1","c2"])},{Id:5,OriginalWord:"Emd",Translations:(OfArray())(["d1","d2"])},{Id:5,OriginalWord:"Eme",Translations:(OfArray())(["e1","e2"])},{Id:5,OriginalWord:"Efa",Translations:(OfArray())(["a1","a2"])},{Id:5,OriginalWord:"Efb",Translations:(OfArray())(["b1","b2"])},{Id:5,OriginalWord:"Efc",Translations:(OfArray())(["c1","c2"])},{Id:5,OriginalWord:"Efd",Translations:(OfArray())(["d1","d2"])},{Id:5,OriginalWord:"Efe",Translations:(OfArray())(["e1","e2"])}]),IsLoaded:true};
 (TestPages()).TestMePage=function()
 {
  var _,__1,__10,__11,__12,__13,__14,__15,__16,__17,__18,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__55,__56,__57,__58,__59,__6,__60,__61,__62,__63,__64,__65,__66,__67,__7,__8,__9,content,createTest,header,testSizeH3;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __6=(OfArray())([__3.text("Test Me")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__6)]));
  __7=Attr_1();
  __9=(OfArray())([__7.NewAttr("style","text-align: center")]);
  __8=Tags();
  testSizeH3=__8.NewTag("h3",__9);
  createTest=function()
  {
   var builder_;
   builder_=Do();
   return builder_.Delay(function()
   {
    return builder_.Bind((Data()).MakeTest(_0()),function(_arg9)
    {
     (Data()).activeTest={$:1,$0:_arg9};
     return builder_.Return(_arg9);
    });
   });
  };
  __10=Attr();
  __12=(OfArray())([__10.NewAttr("data-"+"role","content")]);
  __11=Tags();
  __13=Attr();
  __15=(OfArray())([__13.NewAttr("data-"+"role","fieldcontain")]);
  __14=Tags();
  __16=Attr_1();
  __18=(OfArray())([__16.NewAttr("style","text-align: center")]);
  __17=Tags();
  __19=Tags();
  __20=Attr_1();
  __22=(OfArray())([__20.NewAttr("class","ui-grid-a")]);
  __21=Tags();
  __23=Attr_1();
  __25=(OfArray())([__23.NewAttr("class","ui-block-a")]);
  __24=Tags();
  __26=Attr_1();
  __27=Attr();
  __28=Attr();
  __29=Attr();
  __30=Attr();
  __31=Tags();
  __33=(OfArray())([__26.NewAttr("href","#main-page"),__27.NewAttr("data-"+"role","button"),__28.NewAttr("data-"+"theme","d"),__29.NewAttr("data-"+"icon","delete"),__30.NewAttr("data-"+"rel","back"),__31.text("Cancel test")]);
  __32=Tags();
  __34=Attr_1();
  __36=(OfArray())([__34.NewAttr("class","ui-block-b")]);
  __35=Tags();
  __37=Attr();
  __39=(OfArray())([__37.NewAttr("data-"+"role","button")]);
  __38=Tags();
  __40=Attr();
  __41=Attr();
  __42=Attr_1();
  __43=Tags();
  __56=(op_MinusLess())(__11.Div(__12),(OfArray())([(op_MinusLess())(__14.Div(__15),(OfArray())([(op_MinusLess())(__17.NewTag("h4",__18),(OfArray())([__19.text("Test size")])),testSizeH3])),(op_MinusLess())(__21.Div(__22),(OfArray())([(op_MinusLess())(__24.Div(__25),(OfArray())([__32.NewTag("a",__33)])),(op_MinusLess())(__35.Div(__36),(OfArray())([(op_MinusLess())(__38.NewTag("a",__39),(OfArray())([__40.NewAttr("data-"+"theme","a"),__41.NewAttr("data-"+"icon","check"),__42.NewAttr("href","#test-page"),__43.text("Start test")]))]))]))]));
  __55=function(w)
  {
   return(OnAfterRender())(function()
   {
    var __51,__52,__54;
    __51=jQuery("#test-me-page");
    __52=function()
    {
     var __50,builder_;
     builder_=Do();
     __50=builder_.Delay(function()
     {
      return builder_.Bind(createTest(undefined),function(_arg10)
      {
       var __45,__47,__48,objectArg,testSize;
       testSize=__44(_arg10);
       __45=testSizeH3["HtmlProvider@22"];
       __45.Clear(testSizeH3.Body);
       __48=__46(testSize);
       objectArg=testSizeH3["HtmlProvider@22"];
       __47=testSizeH3["HtmlProvider@22"];
       ((function(arg00)
       {
        return function(arg10)
        {
         return objectArg.AppendNode(arg00,arg10);
        };
       }(testSizeH3.Body))(__47.CreateTextNode(__48)));
       return builder_.Zero();
      });
     });
     return __49(__50);
    };
    __54=__51.live("pagebeforeshow",__52);
    return __53(__54);
   },w);
  };
  __55(__56);
  content=__56;
  __57=Attr();
  __59=(OfArray())([__57.NewAttr("data-"+"role","footer")]);
  __58=Tags();
  __60=Tags();
  __62=(OfArray())([__60.text("IntelliFactory.com")]);
  __61=Tags();
  (op_MinusLess())(__58.Div(__59),(OfArray())([__61.NewTag("h4",__62)]));
  __63=Attr_1();
  __64=Attr();
  __65=Attr();
  __67=(OfArray())([__63.NewAttr("id","test-me-page"),__64.NewAttr("data-"+"role","page"),__65.NewAttr("data-"+"add-back-btn","true")]);
  __66=Tags();
  return(op_MinusLess())(__66.Div(__67),(OfArray())([header,content]));
 };
 (TestPages()).TestPage=function()
 {
  var _,__1,__2,__3,__4,__57,__58,__59,__6,__60,__61,__62,__63,__64,__65,__66,__67,__68,__69,__7,__70,__71,__72,__73,__74,__75,__76,__8,__9,content,header,runSelectionTest,runSummary,runTestGroup,runTypeTest,showSelectionTest,showSummary,showTypeTest,testContainer,testCorrect_1,testCurrent,testCurrentDiv,testSize,updateTestCurrent;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __6=(OfArray())([__3.text("Test")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__6)]));
  __7=Attr_1();
  __9=(OfArray())([__7.NewAttr("id","test-current")]);
  __8=Tags();
  testCurrentDiv=__8.Div(__9);
  testCurrent={contents:0};
  testSize={contents:0};
  testCorrect_1={contents:0};
  updateTestCurrent=function(no)
  {
   return function()
   {
    var __10,__11,__12,__13,copyOfStruct,objectArg;
    __10=testCurrentDiv["HtmlProvider@22"];
    __10.Clear(testCurrentDiv.Body);
    __11=no.toString()+" / ";
    copyOfStruct=testSize.contents;
    __13=__11+copyOfStruct.toString();
    objectArg=testCurrentDiv["HtmlProvider@22"];
    __12=testCurrentDiv["HtmlProvider@22"];
    return(function(arg00)
    {
     return function(arg10)
     {
      return objectArg.AppendNode(arg00,arg10);
     };
    }(testCurrentDiv.Body))(__12.CreateTextNode(__13));
   };
  };
  showSelectionTest=function(word)
  {
   return function(label)
   {
    return function(answers)
    {
     return function(cont)
     {
      var __10,__11,__12,__25,__26,__27,__28,__29,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__40,__41,__42,__43,__45,__47,__48,__50,__51,__52,__54,__55,__56,radio,testResult;
      __10=Attr_1();
      __12=(OfArray())([__10.NewAttr("id","test-result")]);
      __11=Tags();
      testResult=__11.Div(__12);
      radio=function(id)
      {
       return function(name)
       {
        return function(text)
        {
         var __13,__14,__15,__16,__17,__18,__19,__20,__21,__22,__23,__24;
         __13=Attr_1();
         __14=Attr_1();
         __15=Attr_1();
         __16=Attr_1();
         __18=(OfArray())([__13.NewAttr("id",id),__14.NewAttr("name",name),__15.NewAttr("type","radio"),__16.NewAttr("value",id)]);
         __17=Tags();
         __19=Attr_1();
         __21=(OfArray())([__19.NewAttr("for",id)]);
         __20=Tags();
         __22=Tags();
         __24=(OfArray())([__17.NewTag("input",__18),(op_MinusLess())(__20.NewTag("label",__21),(OfArray())([__22.text(text)]))]);
         __23=Tags();
         return __23.Div(__24);
        };
       };
      };
      __25=Attr();
      __27=(OfArray())([__25.NewAttr("data-"+"role","fieldcontain")]);
      __26=Tags();
      __28=Attr();
      __30=(OfArray())([__28.NewAttr("data-"+"role","fieldcontain")]);
      __29=Tags();
      __31=Attr_1();
      __33=(OfArray())([__31.NewAttr("style","text-align: center")]);
      __32=Tags();
      __34=Tags();
      __35=Attr();
      __37=(OfArray())([__35.NewAttr("data-"+"role","controlgroup")]);
      __36=Tags();
      __38=Tags();
      __40=(OfArray())([__38.text(label)]);
      __39=Tags();
      __41=Attr_1();
      __43=(OfArray())([__41.NewAttr("id","selection")]);
      __42=Tags();
      __45=(Delay())(function()
      {
       return(Map())(function(a)
       {
        return((radio(a))("sel-answer"))(a);
       },answers);
      });
      __47=Attr_1();
      __48=Attr();
      __50=Attr();
      __52=(OfArray())([__47.NewAttr("id","ok-button"),__48.NewAttr("data-"+"role","button"),__50.NewAttr("data-"+"transition","pop")]);
      __51=Tags();
      __54=Tags();
      __56=(op_MinusLess())(__51.NewTag("a",__52),(OfArray())([__54.text("Ok")]));
      __55=function(arg10)
      {
       var __13;
       __13=Events();
       return __13.OnClick(function()
       {
        return function()
        {
         var __14,__15,__16,__17,selection;
         __14=jQuery("input:radio[name=sel-answer]:checked");
         selection=__14.val();
         if(!(Equals())(selection,undefined))
          {
           __15=jQuery("#test-page fieldset input:radio");
           __16=__15.attr("disabled","true");
           __53(__16);
           __17=cont([testResult,jQuery("#test-page #ok-button"),__46(selection)]);
          }
         return __17;
        };
       },arg10);
      };
      __55(__56);
      return(op_MinusLess())(__26.Div(__27),(OfArray())([(op_MinusLess())(__29.Div(__30),(OfArray())([(op_MinusLess())(__32.NewTag("h3",__33),(OfArray())([__34.text(word)]))])),(op_MinusLess())(__36.NewTag("fieldset",__37),(OfArray())([__39.NewTag("legend",__40),(op_MinusLess())(__42.Div(__43),(OfSeq())(__45))])),testResult,__56]));
     };
    };
   };
  };
  showTypeTest=function(word)
  {
   return function(label)
   {
    return function(cont)
    {
     var __10,__11,__12,__13,__14,__15,__16,__17,__18,__19,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__40,__41,__50,__51,testCorrect,testResult;
     __10=Attr_1();
     __12=(OfArray())([__10.NewAttr("id","test-result")]);
     __11=Tags();
     testResult=__11.Div(__12);
     __13=Attr_1();
     __15=(OfArray())([__13.NewAttr("id","test-correct")]);
     __14=Tags();
     testCorrect=__14.Div(__15);
     __16=Attr();
     __18=(OfArray())([__16.NewAttr("data-"+"role","fieldcontain")]);
     __17=Tags();
     __19=Attr();
     __21=(OfArray())([__19.NewAttr("data-"+"role","fieldcontain")]);
     __20=Tags();
     __22=Attr_1();
     __24=(OfArray())([__22.NewAttr("style","text-align: center")]);
     __23=Tags();
     __25=Tags();
     __26=Attr_1();
     __28=(OfArray())([__26.NewAttr("for","translation")]);
     __27=Tags();
     __29=Tags();
     __30=Attr_1();
     __31=Attr_1();
     __32=Attr_1();
     __33=Attr_1();
     __35=(OfArray())([__30.NewAttr("id","translation"),__31.NewAttr("name","translation"),__32.NewAttr("type","text"),__33.NewAttr("value","")]);
     __34=Tags();
     __36=Attr_1();
     __37=Attr();
     __38=Attr();
     __40=(OfArray())([__36.NewAttr("id","ok-button"),__37.NewAttr("data-"+"role","button"),__38.NewAttr("data-"+"transition","pop")]);
     __39=Tags();
     __41=Tags();
     __51=(op_MinusLess())(__39.NewTag("a",__40),(OfArray())([__41.text("Ok")]));
     __50=function(arg10)
     {
      var __42;
      __42=Events();
      return __42.OnClick(function()
      {
       return function()
       {
        var __43,__45,__47,__48;
        __43=jQuery("#test-page #translation");
        __45=__43.attr("disabled","true");
        __53(__45);
        __47=jQuery("#test-page #translation");
        __48=__47.val();
        return cont([testResult,jQuery("#test-page #ok-button"),__46(__48)]);
       };
      },arg10);
     };
     __50(__51);
     return(op_MinusLess())(__17.Div(__18),(OfArray())([(op_MinusLess())(__20.Div(__21),(OfArray())([(op_MinusLess())(__23.NewTag("h3",__24),(OfArray())([__25.text(word)]))])),(op_MinusLess())(__27.NewTag("label",__28),(OfArray())([__29.text(label)])),__34.NewTag("input",__35),testResult,testCorrect,__51]));
    };
   };
  };
  showSummary=(Tupled())(function(tupledArg)
  {
   var __10,__11,__12,__13,__14,__15,__16,__17,__18,__19,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__30,__31,__32,__33,__35,__36,__37,__38,__39,__40,__41,__42,__43,__45,__47,__48,__50,__51,__52,__54,copyOfStruct,testCorrect,testSize_1;
   testSize_1=tupledArg[0];
   testCorrect=tupledArg[1];
   __10=Attr_1();
   __12=(OfArray())([__10.NewAttr("style","text-align: center")]);
   __11=Tags();
   __13=Tags();
   __15=(OfArray())([(op_MinusLess())(__11.NewTag("h3",__12),(OfArray())([__13.text("Test summary")]))]);
   __14=Tags();
   __16=Tags();
   __18=(OfArray())([__16.text("Test size")]);
   __17=Tags();
   __19=Attr_1();
   __21=(OfArray())([__19.NewAttr("style","text-align: center")]);
   __20=Tags();
   __23=testSize_1.toString();
   __22=Tags();
   __25=(OfArray())([__17.NewTag("h4",__18),(op_MinusLess())(__20.NewTag("span",__21),(OfArray())([__22.text(__23)]))]);
   __24=Tags();
   __26=Tags();
   __28=(OfArray())([__26.text("Correct")]);
   __27=Tags();
   __29=Attr_1();
   __31=(OfArray())([__29.NewAttr("style","text-align: center")]);
   __30=Tags();
   __32=testCorrect.toString()+" ( ";
   __33=Number(testCorrect)/Number(testSize_1);
   __36=__33*Number(100);
   __35=function(arg00)
   {
    var __34;
    __34=Math;
    return Math.floor.call(__34,arg00);
   };
   copyOfStruct=__35(__36);
   __38=__32+copyOfStruct.toString()+"% )";
   __37=Tags();
   __40=(OfArray())([__27.NewTag("h4",__28),(op_MinusLess())(__30.NewTag("span",__31),(OfArray())([__37.text(__38)]))]);
   __39=Tags();
   __41=Attr();
   __43=(OfArray())([__41.NewAttr("data-"+"role","fieldscontain")]);
   __42=Tags();
   __45=Attr_1();
   __47=Attr();
   __50=(OfArray())([__45.NewAttr("href","#main-page"),__47.NewAttr("data-"+"role","button")]);
   __48=Tags();
   __51=Tags();
   __54=(OfArray())([__14.Div(__15),__24.Div(__25),__39.Div(__40),(op_MinusLess())(__42.Div(__43),(OfArray())([(op_MinusLess())(__48.NewTag("a",__50),(OfArray())([__51.text("Main page")]))]))]);
   __52=Tags();
   return __52.Div(__54);
  });
  __57=Attr_1();
  __58=Attr_1();
  __60=(OfArray())([__57.NewAttr("id","test-container"),__58.NewAttr("style","text-align: center")]);
  __59=Tags();
  testContainer=__59.Div(__60);
  runSelectionTest=(Tupled())(function(tupledArg)
  {
   return function(cont)
   {
    var showQues;
    showQues=function(qs)
    {
     var __34,__35,__36,__37,__38,__39,__40,__41,__42,__43,__45,__47,__48,__50,ans,inst,q,restQs,w;
     if(qs.$==0)
      {
       __50=cont(undefined);
      }
     else
      {
       w=qs.$0[0];
       restQs=qs.$1;
       ans=qs.$0[1];
       inst="to "+tupledArg[0].ToLang;
       q=(((showSelectionTest(w.OriginalWord))(inst))(ans))((Tupled())(function(tupledArg_1)
       {
        var __10,__11,__12,__13,__14,__15,__16,__17,__18,__21,__22,__23,__24,__25,__26,__27,__28,__29,__30,__31,__32,__33,indexCorrect,indexCorrect_1,indexIncorrect,objectArg,objectArg_1,objectArg_2,objectArg_3,okButton,sel,testResult;
        testResult=tupledArg_1[0];
        okButton=tupledArg_1[1];
        sel=tupledArg_1[2];
        __11=w.Translations;
        __10=function(list)
        {
         return(Exists())(function(t)
         {
          return t===sel;
         },list);
        };
        if(__10(__11))
         {
          objectArg=testResult["HtmlProvider@22"];
          __12=testResult["HtmlProvider@22"];
          ((function(arg00)
          {
           return function(arg10)
           {
            return objectArg.AppendNode(arg00,arg10);
           };
          }(testResult.Body))(__12.CreateTextNode("Correct!")));
          objectArg_1=testResult["HtmlProvider@22"];
          ((function(arg00)
          {
           return function(arg10)
           {
            return objectArg_1.AddClass(arg00,arg10);
           };
          }(testResult.Body))("test-correct"));
          __13=function(list)
          {
           return(FindIndex())(function(a)
           {
            return a===sel;
           },list);
          };
          indexCorrect=__13(ans);
          __14="label.ui-btn:eq("+indexCorrect.toString()+")";
          __15=jQuery(__14);
          __16=__15.addClass("test-correct");
          __53(__16);
          __17=testCorrect_1.contents+1;
          __29=testCorrect_1.contents=__17;
         }
        else
         {
          objectArg_2=testResult["HtmlProvider@22"];
          __18=testResult["HtmlProvider@22"];
          ((function(arg00)
          {
           return function(arg10)
           {
            return objectArg_2.AppendNode(arg00,arg10);
           };
          }(testResult.Body))(__18.CreateTextNode("Wrong!")));
          objectArg_3=testResult["HtmlProvider@22"];
          ((function(arg00)
          {
           return function(arg10)
           {
            return objectArg_3.AddClass(arg00,arg10);
           };
          }(testResult.Body))("test-incorrect"));
          __21=function(list_1)
          {
           return(FindIndex())(function(a)
           {
            var __19,__20;
            __20=w.Translations;
            __19=function(list)
            {
             return(Exists())(function(t)
             {
              return t===a;
             },list);
            };
            return __19(__20);
           },list_1);
          };
          indexCorrect_1=__21(ans);
          __22=function(list)
          {
           return(FindIndex())(function(a)
           {
            return a===sel;
           },list);
          };
          indexIncorrect=__22(ans);
          __23="label.ui-btn:eq("+indexCorrect_1.toString()+")";
          __24=jQuery(__23);
          __25=__24.addClass("test-correct");
          __53(__25);
          __26="label.ui-btn:eq("+indexIncorrect.toString()+")";
          __27=jQuery(__26);
          __28=__27.addClass("test-incorrect");
          __29=__53(__28);
         }
        __29;
        __30=okButton.text("Next");
        __53(__30);
        __31=okButton.unbind("click");
        __53(__31);
        __32=function()
        {
         var __19;
         __19=testContainer["HtmlProvider@22"];
         __19.Clear(testContainer.Body);
         return showQues(restQs);
        };
        __33=okButton.click(__32);
        return __53(__33);
       }));
       __34=testCurrent.contents+1;
       testCurrent.contents=__34;
       (updateTestCurrent(testCurrent.contents))(testSize.contents);
       __35=testContainer["HtmlProvider@22"];
       __35.Clear(testContainer.Body);
       __36=testContainer.Body;
       __37=jQuery(__36);
       __38=__37.hide();
       __53(__38);
       testContainer.AppendI(q);
       __39=testContainer.Body;
       __40=jQuery(__39);
       __41=__40.fadeIn("slow");
       __53(__41);
       __42=jQuery("#test-container");
       __43=__42.trigger("create");
       __53(__43);
       __45=jQuery("#test-page #selection");
       __47=__45.focus();
       __48=__53(__47);
       __50=__53(__48);
      }
     return __50;
    };
    return showQues(tupledArg[1]);
   };
  });
  runTypeTest=(Tupled())(function(tupledArg)
  {
   return function(cont)
   {
    var showQues;
    showQues=function(qs)
    {
     var __30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__40,__41,__42,__43,inst,q,restQs,w;
     if(qs.$==0)
      {
       __43=cont(undefined);
      }
     else
      {
       w=qs.$0;
       restQs=qs.$1;
       inst="to "+tupledArg[0].ToLang;
       q=((showTypeTest(w.OriginalWord))(inst))((Tupled())(function(tupledArg_1)
       {
        var __10,__11,__12,__13,__14,__15,__16,__17,__18,__19,__20,__21,__22,__23,__24,__25,__26,__28,__29,objectArg,objectArg_1,objectArg_2,objectArg_3,okButton,sel,testResult;
        testResult=tupledArg_1[0];
        okButton=tupledArg_1[1];
        sel=tupledArg_1[2];
        __11=w.Translations;
        __10=function(list)
        {
         return(Exists())(function(t)
         {
          return t===sel;
         },list);
        };
        if(__10(__11))
         {
          objectArg=testResult["HtmlProvider@22"];
          __12=testResult["HtmlProvider@22"];
          ((function(arg00)
          {
           return function(arg10)
           {
            return objectArg.AppendNode(arg00,arg10);
           };
          }(testResult.Body))(__12.CreateTextNode("Correct!")));
          objectArg_1=testResult["HtmlProvider@22"];
          ((function(arg00)
          {
           return function(arg10)
           {
            return objectArg_1.AddClass(arg00,arg10);
           };
          }(testResult.Body))("test-correct"));
          __13=testCorrect_1.contents+1;
          testCorrect_1.contents=__13;
          __14=jQuery("#test-page #translation");
          __15=__14.addClass("test-correct");
          __24=__53(__15);
         }
        else
         {
          objectArg_2=testResult["HtmlProvider@22"];
          __16=testResult["HtmlProvider@22"];
          ((function(arg00)
          {
           return function(arg10)
           {
            return objectArg_2.AppendNode(arg00,arg10);
           };
          }(testResult.Body))(__16.CreateTextNode("Wrong!")));
          objectArg_3=testResult["HtmlProvider@22"];
          ((function(arg00)
          {
           return function(arg10)
           {
            return objectArg_3.AddClass(arg00,arg10);
           };
          }(testResult.Body))("test-incorrect"));
          __19=jQuery("#test-page #test-correct");
          __18=w.Translations;
          __17=function(list)
          {
           return(SeqModule()).Fold(function(txt)
           {
            return function(tra)
            {
             return txt+" "+tra;
            };
           },"Correct: ",list);
          };
          __20=__17(__18);
          __21=__19.append(__20);
          __53(__21);
          __22=jQuery("#test-page #translation");
          __23=__22.addClass("test-incorrect");
          __24=__53(__23);
         }
        __24;
        __25=okButton.text("Next");
        __53(__25);
        __26=okButton.unbind("click");
        __53(__26);
        __28=function()
        {
         var __27;
         __27=testContainer["HtmlProvider@22"];
         __27.Clear(testContainer.Body);
         return showQues(restQs);
        };
        __29=okButton.click(__28);
        return __53(__29);
       }));
       __30=testCurrent.contents+1;
       testCurrent.contents=__30;
       (updateTestCurrent(testCurrent.contents))(testSize.contents);
       __31=testContainer["HtmlProvider@22"];
       __31.Clear(testContainer.Body);
       __32=testContainer.Body;
       __33=jQuery(__32);
       __34=__33.hide();
       __53(__34);
       testContainer.AppendI(q);
       __35=testContainer.Body;
       __36=jQuery(__35);
       __37=__36.fadeIn("slow");
       __53(__37);
       __38=jQuery("#test-container");
       __39=__38.trigger("create");
       __53(__39);
       __40=jQuery("#test-page #translation");
       __41=__40.focus();
       __42=__53(__41);
       __43=__53(__42);
      }
     return __43;
    };
    return showQues(tupledArg[1]);
   };
  });
  runSummary=function()
  {
   var __10,__11,__12,__13,__14;
   __10=testCurrentDiv.Body;
   __11=jQuery(__10);
   __12=__11.hide();
   __53(__12);
   testContainer.AppendI(showSummary([testSize.contents,testCorrect_1.contents]));
   __13=jQuery("#test-container");
   __14=__13.trigger("create");
   return __53(__14);
  };
  runTestGroup=function(_arg10)
  {
   var __10,__11,__12,__13,dir,dir_1,qs,qs_1,rest,rest_1;
   if(_arg10.$==0)
    {
     __13=runSummary(undefined);
    }
   else
    {
     if(_arg10.$0.$==0)
      {
       dir=_arg10.$0.$0;
       qs=_arg10.$0.$1;
       rest=_arg10.$1;
       __10=testContainer["HtmlProvider@22"];
       __10.Clear(testContainer.Body);
       __12=(runTypeTest([dir,qs]))(function()
       {
        return runTestGroup(rest);
       });
      }
     else
      {
       dir_1=_arg10.$0.$0;
       qs_1=_arg10.$0.$1;
       rest_1=_arg10.$1;
       __11=testContainer["HtmlProvider@22"];
       __11.Clear(testContainer.Body);
       __12=(runSelectionTest([dir_1,qs_1]))(function()
       {
        return runTestGroup(rest_1);
       });
      }
     __13=__12;
    }
   return __13;
  };
  __61=Attr();
  __63=(OfArray())([__61.NewAttr("data-"+"role","content")]);
  __62=Tags();
  __65=(op_MinusLess())(__62.Div(__63),(OfArray())([testCurrentDiv,testContainer]));
  __64=function(w)
  {
   return(OnAfterRender())(function()
   {
    var __15,__16,__17;
    __15=jQuery("#test-page");
    __16=function()
    {
     var __10,__11,__12,__13,__14;
     __10=testContainer["HtmlProvider@22"];
     __10.Clear(testContainer.Body);
     __11=testCurrentDiv.Body;
     __12=jQuery(__11);
     __13=__12.show();
     __53(__13);
     testCurrent.contents=0;
     __14=__44(_0_1());
     testSize.contents=__14;
     (updateTestCurrent(0))(testSize.contents);
     return runTestGroup(_0_1());
    };
    __17=__15.live("pagebeforeshow",__16);
    return __53(__17);
   },w);
  };
  __64(__65);
  content=__65;
  __66=Attr();
  __68=(OfArray())([__66.NewAttr("data-"+"role","footer")]);
  __67=Tags();
  __69=Tags();
  __71=(OfArray())([__69.text("IntelliFactory.com")]);
  __70=Tags();
  (op_MinusLess())(__67.Div(__68),(OfArray())([__70.NewTag("h4",__71)]));
  __72=Attr_1();
  __73=Attr();
  __74=Attr();
  __76=(OfArray())([__72.NewAttr("id","test-page"),__73.NewAttr("data-"+"role","page"),__74.NewAttr("data-"+"add-back-btn","true")]);
  __75=Tags();
  return(op_MinusLess())(__75.Div(__76),(OfArray())([header,content]));
 };
 (OptionsPage()).OptionsPage=function()
 {
  var _,__1,__100,__101,__102,__103,__104,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__45,__47,__48,__50,__51,__52,__54,__55,__56,__57,__58,__59,__6,__60,__61,__62,__63,__64,__65,__66,__67,__68,__69,__70,__71,__72,__73,__74,__75,__76,__77,__78,__79,__80,__81,__82,__83,__84,__85,__86,__87,__88,__89,__90,__91,__92,__93,__94,__95,__96,__97,__98,__99,checkbox,content,header;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __6=(OfArray())([__3.text("Options")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__6)]));
  checkbox=function(name)
  {
   return function(text)
   {
    var __10,__11,__12,__13,__14,__15,__16,__17,__18,__7,__8,__9;
    __7=Attr_1();
    __8=Attr_1();
    __9=Attr_1();
    __10=Attr_1();
    __12=(OfArray())([__7.NewAttr("id",name),__8.NewAttr("name",name),__9.NewAttr("type","checkbox"),__10.NewAttr("class","custom")]);
    __11=Tags();
    __13=Attr_1();
    __15=(OfArray())([__13.NewAttr("for",name)]);
    __14=Tags();
    __16=Tags();
    __18=(OfArray())([__11.NewTag("input",__12),(op_MinusLess())(__14.NewTag("label",__15),(OfArray())([__16.text(text)]))]);
    __17=Tags();
    return __17.Div(__18);
   };
  };
  __19=Attr();
  __21=(OfArray())([__19.NewAttr("data-"+"role","content")]);
  __20=Tags();
  __22=Attr_1();
  __23=Attr_1();
  __25=(OfArray())([__22.NewAttr("action","#"),__23.NewAttr("method","get")]);
  __24=Tags();
  __26=Attr();
  __28=(OfArray())([__26.NewAttr("data-"+"role","fieldcontain")]);
  __27=Tags();
  __29=Attr_1();
  __31=(OfArray())([__29.NewAttr("for","test-size")]);
  __30=Tags();
  __32=Tags();
  __33=Attr_1();
  __34=Attr_1();
  __35=Attr_1();
  __36=Attr_1();
  __37=Attr();
  __38=Attr();
  __40=(OfArray())([__33.NewAttr("id","test-size"),__34.NewAttr("name","test-size"),__35.NewAttr("type","range"),__36.NewAttr("value","5"),__37.NewAttr("min","5"),__38.NewAttr("max","100")]);
  __39=Tags();
  __41=Attr();
  __43=(OfArray())([__41.NewAttr("data-"+"role","controlgroup")]);
  __42=Tags();
  __45=Tags();
  __48=(OfArray())([__45.text("Select tests:")]);
  __47=Tags();
  __50=Attr();
  __52=(OfArray())([__50.NewAttr("data-"+"role","fieldcontain")]);
  __51=Tags();
  __54=Attr_1();
  __56=(OfArray())([__54.NewAttr("for","repeat-unknown")]);
  __55=Tags();
  __57=Tags();
  __58=Attr_1();
  __59=Attr_1();
  __60=Attr();
  __62=(OfArray())([__58.NewAttr("id","repeat-unknown"),__59.NewAttr("name","repeat-unknown"),__60.NewAttr("data-"+"role","slider")]);
  __61=Tags();
  __65=Tags();
  __63=Attr_1();
  __64=Tags();
  __66=(OfArray())([__63.NewAttr("value","on"),__64.text("Yes")]);
  __69=Tags();
  __67=Attr_1();
  __68=Tags();
  __70=(OfArray())([__67.NewAttr("value","off"),__68.text("No")]);
  __71=Attr_1();
  __73=(OfArray())([__71.NewAttr("class","ui-body ui-body-b")]);
  __72=Tags();
  __74=Attr_1();
  __76=(OfArray())([__74.NewAttr("class","ui-grid-a")]);
  __75=Tags();
  __77=Attr_1();
  __79=(OfArray())([__77.NewAttr("class","ui-block-a")]);
  __78=Tags();
  __80=Attr_1();
  __81=Attr();
  __82=Attr();
  __84=(OfArray())([__80.NewAttr("type","submit"),__81.NewAttr("data-"+"theme","d"),__82.NewAttr("data-"+"icon","delete")]);
  __83=Tags();
  __85=Tags();
  __86=Attr_1();
  __88=(OfArray())([__86.NewAttr("class","ui-block-b")]);
  __87=Tags();
  __89=Attr_1();
  __90=Attr();
  __91=Attr();
  __93=(OfArray())([__89.NewAttr("type","submit"),__90.NewAttr("data-"+"theme","a"),__91.NewAttr("data-"+"icon","check")]);
  __92=Tags();
  __94=Tags();
  content=(op_MinusLess())(__20.Div(__21),(OfArray())([(op_MinusLess())(__24.NewTag("form",__25),(OfArray())([(op_MinusLess())(__27.Div(__28),(OfArray())([(op_MinusLess())(__30.NewTag("label",__31),(OfArray())([__32.text("Test size:")])),__39.NewTag("input",__40)])),(op_MinusLess())(__42.Div(__43),(OfArray())([__47.NewTag("legend",__48),(checkbox("e-to-h-sel"))("English -> Hungarian selection"),(checkbox("h-to-e-sel"))("Hungarian -> English selection"),(checkbox("e-to-h-sim-sel"))("English -> Hungarian similar selection"),(checkbox("e-to-h-type"))("English -> Hungarian type"),(checkbox("h-to-e-type"))("Hungarian -> English selection")])),(op_MinusLess())(__51.Div(__52),(OfArray())([(op_MinusLess())(__55.NewTag("label",__56),(OfArray())([__57.text("Repeat unknown:")])),(op_MinusLess())(__61.NewTag("select",__62),(OfArray())([__65.NewTag("option",__66),__69.NewTag("option",__70)]))])),(op_MinusLess())(__72.Div(__73),(OfArray())([(op_MinusLess())(__75.NewTag("fieldset",__76),(OfArray())([(op_MinusLess())(__78.Div(__79),(OfArray())([(op_MinusLess())(__83.NewTag("button",__84),(OfArray())([__85.text("Cancel")]))])),(op_MinusLess())(__87.Div(__88),(OfArray())([(op_MinusLess())(__92.NewTag("button",__93),(OfArray())([__94.text("Save")]))]))]))]))]))]));
  __95=Attr();
  __97=(OfArray())([__95.NewAttr("data-"+"role","footer")]);
  __96=Tags();
  __98=Tags();
  __100=(OfArray())([__98.text("IntelliFactory.com")]);
  __99=Tags();
  (op_MinusLess())(__96.Div(__97),(OfArray())([__99.NewTag("h4",__100)]));
  __101=Attr_1();
  __102=Attr();
  __104=(OfArray())([__101.NewAttr("id","options-page"),__102.NewAttr("data-"+"role","page")]);
  __103=Tags();
  return(op_MinusLess())(__103.Div(__104),(OfArray())([header,content]));
 };
 (DictionaryPages()).NewDictionaryPage=function()
 {
  var _,__1,__10,__11,__12,__13,__14,__15,__16,__17,__18,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__45,__47,__48,__50,__51,__52,__54,__55,__56,__57,__58,__59,__6,__60,__61,__62,__63,__64,__65,__7,__73,__74,__75,__76,__77,__78,__79,__8,__80,__81,__82,__83,__84,__85,__86,__9,content,header;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __6=(OfArray())([__3.text("New dictionary")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__6)]));
  __7=Attr();
  __9=(OfArray())([__7.NewAttr("data-"+"role","content")]);
  __8=Tags();
  __10=Attr();
  __12=(OfArray())([__10.NewAttr("data-"+"role","fieldcontain")]);
  __11=Tags();
  __13=Attr_1();
  __15=(OfArray())([__13.NewAttr("for","from-language")]);
  __14=Tags();
  __16=Tags();
  __17=Attr_1();
  __18=Attr_1();
  __19=Attr_1();
  __20=Attr_1();
  __22=(OfArray())([__17.NewAttr("id","from-language"),__18.NewAttr("name","from-language"),__19.NewAttr("type","text"),__20.NewAttr("value","")]);
  __21=Tags();
  __23=Attr();
  __25=(OfArray())([__23.NewAttr("data-"+"role","fieldcontain")]);
  __24=Tags();
  __26=Attr_1();
  __28=(OfArray())([__26.NewAttr("for","to-language")]);
  __27=Tags();
  __29=Tags();
  __30=Attr_1();
  __31=Attr_1();
  __32=Attr_1();
  __33=Attr_1();
  __35=(OfArray())([__30.NewAttr("id","to-language"),__31.NewAttr("name","to-language"),__32.NewAttr("type","text"),__33.NewAttr("value","")]);
  __34=Tags();
  __36=Attr_1();
  __38=(OfArray())([__36.NewAttr("class","ui-body ui-body-b")]);
  __37=Tags();
  __39=Attr_1();
  __41=(OfArray())([__39.NewAttr("class","ui-grid-a")]);
  __40=Tags();
  __42=Attr_1();
  __45=(OfArray())([__42.NewAttr("class","ui-block-a")]);
  __43=Tags();
  __47=Attr_1();
  __48=Attr();
  __50=Attr();
  __51=Attr();
  __52=Attr();
  __55=(OfArray())([__47.NewAttr("href","#main-page"),__48.NewAttr("data-"+"role","button"),__50.NewAttr("data-"+"theme","d"),__51.NewAttr("data-"+"icon","delete"),__52.NewAttr("data-"+"rel","back")]);
  __54=Tags();
  __56=Tags();
  __57=Attr_1();
  __59=(OfArray())([__57.NewAttr("class","ui-block-b")]);
  __58=Tags();
  __60=Attr();
  __61=Attr();
  __62=Attr();
  __64=(OfArray())([__60.NewAttr("data-"+"role","button"),__61.NewAttr("data-"+"theme","a"),__62.NewAttr("data-"+"icon","check")]);
  __63=Tags();
  __65=Tags();
  __74=(op_MinusLess())(__63.NewTag("a",__64),(OfArray())([__65.text("Save")]));
  __73=function(arg10)
  {
   var __66;
   __66=Events();
   return __66.OnClick(function()
   {
    return function()
    {
     var __67,__68,__69,__70,__71,__72,builder_,fromLanguage,toLanguage;
     __67=jQuery("#new-dictionary-page #from-language");
     __68=__67.val();
     fromLanguage=__46(__68);
     __69=jQuery("#new-dictionary-page #to-language");
     __70=__69.val();
     toLanguage=__46(__70);
     builder_=Do();
     __71=builder_.Delay(function()
     {
      return builder_.Bind((Data()).AddDictionary({Id:0,FromLanguage:fromLanguage,ToLanguage:toLanguage,Words:(NewUnion())(FSharpList_1(),0),IsLoaded:false}),function()
      {
       return builder_.Return(undefined);
      });
     });
     __49(__71);
     __72=history();
     return(back()).call(__72);
    };
   },arg10);
  };
  __73(__74);
  __76=(op_MinusLess())(__37.Div(__38),(OfArray())([(op_MinusLess())(__40.NewTag("fieldset",__41),(OfArray())([(op_MinusLess())(__43.Div(__45),(OfArray())([(op_MinusLess())(__54.NewTag("a",__55),(OfArray())([__56.text("Cancel")]))])),(op_MinusLess())(__58.Div(__59),(OfArray())([__74]))]))]));
  __75=function(w)
  {
   return(OnAfterRender())(function()
   {
    var __70,__71,__72;
    __70=jQuery("#new-dictionary-page");
    __71=function()
    {
     var __66,__67,__68,__69;
     __66=jQuery("#new-dictionary-page #from-language");
     __67=__66.val("");
     __53(__67);
     __68=jQuery("#new-dictionary-page #to-language");
     __69=__68.val("");
     __53(__69);
    };
    __72=__70.live("pagebeforeshow",__71);
    return __53(__72);
   },w);
  };
  __75(__76);
  content=(op_MinusLess())(__8.Div(__9),(OfArray())([(op_MinusLess())(__11.Div(__12),(OfArray())([(op_MinusLess())(__14.NewTag("label",__15),(OfArray())([__16.text("From language:")])),__21.NewTag("input",__22)])),(op_MinusLess())(__24.Div(__25),(OfArray())([(op_MinusLess())(__27.NewTag("label",__28),(OfArray())([__29.text("To language:")])),__34.NewTag("input",__35)])),__76]));
  __77=Attr();
  __79=(OfArray())([__77.NewAttr("data-"+"role","footer")]);
  __78=Tags();
  __80=Tags();
  __82=(OfArray())([__80.text("IntelliFactory.com")]);
  __81=Tags();
  (op_MinusLess())(__78.Div(__79),(OfArray())([__81.NewTag("h4",__82)]));
  __83=Attr_1();
  __84=Attr();
  __86=(OfArray())([__83.NewAttr("id","new-dictionary-page"),__84.NewAttr("data-"+"role","page")]);
  __85=Tags();
  return(op_MinusLess())(__85.Div(__86),(OfArray())([header,content]));
 };
 (MainPage()).MainPage=function()
 {
  var _,__1,__10,__11,__12,__2,__3,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__45,__47,__48,__50,__51,__52,__54,__55,__56,__57,__58,__59,__6,__60,__61,__62,__63,__64,__65,__66,__67,__68,__69,__7,__70,__71,__72,__73,__74,__75,__76,__77,__78,__79,__8,__80,__81,__88,__89,__9,addNewWord,chooseDict,content,dictLangSelect,footer,getDictLangOptions,header;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __6=(OfArray())([__3.text("MobyDict")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__6)]));
  __7=Attr();
  __9=(OfArray())([__7.NewAttr("data-"+"role","footer")]);
  __8=Tags();
  __10=Tags();
  __12=(OfArray())([__10.text("IntelliFactory.com")]);
  __11=Tags();
  footer=(op_MinusLess())(__8.Div(__9),(OfArray())([__11.NewTag("h4",__12)]));
  getDictLangOptions=function()
  {
   var __31,dicts;
   dicts=dictionaries();
   __31=(Delay())(function()
   {
    return(Map())(function(dict)
    {
     var __26,__27,__28,__29,__30;
     __27=Tags();
     __26=(Delay())(function()
     {
      var __13,__14,__15,__16;
      __14=Attr_1();
      __13=dict.Id;
      __15=__13.toString();
      __16=__14.NewAttr("value",__15);
      return(Append())([__16],(Delay())(function()
      {
       var __17,__18,__19,__20;
       __18=Attr_1();
       __17=dict.Id;
       __19="dict-lang-opt"+__17.toString();
       __20=__18.NewAttr("id",__19);
       return(Append())([__20],(Delay())(function()
       {
        var __21,__22,__23;
        if(dict.Id===(_0()).Id)
         {
          __21=Attr_1();
          __22=__21.NewAttr("selected","selected");
          __23=[__22];
         }
        else
         {
          __23=(Empty())();
         }
        return(Append())(__23,(Delay())(function()
        {
         var __24,__25;
         __24=Attr_1();
         __25=__24.NewAttr("name","dict-langs");
         return[__25];
        }));
       }));
      }));
     });
     __28=(OfSeq())(__26);
     __30=dict.FromLanguage+" to "+dict.ToLanguage;
     __29=Tags();
     return(op_MinusLess())(__27.NewTag("option",__28),(OfArray())([__29.text(__30)]));
    },dicts);
   });
   return(OfSeq())(__31);
  };
  __32=Attr_1();
  __33=Attr();
  __34=Attr_1();
  __36=(OfArray())([__32.NewAttr("id","dictionary-language"),__33.NewAttr("data-"+"native-menu","false"),__34.NewAttr("name","dictionary-language")]);
  __35=Tags();
  dictLangSelect=__35.NewTag("select",__36);
  __37=Attr_1();
  __38=Attr();
  __40=(OfArray())([__37.NewAttr("id","choose-dict"),__38.NewAttr("data-"+"role","fieldcontain")]);
  __39=Tags();
  chooseDict=(op_MinusLess())(__39.Div(__40),(OfArray())([dictLangSelect]));
  __41=Attr_1();
  __42=Attr();
  __45=(OfArray())([__41.NewAttr("id","add-new-word"),__42.NewAttr("data-"+"role","fieldcontain")]);
  __43=Tags();
  __47=Attr_1();
  __48=Attr_1();
  __50=Attr_1();
  __51=Attr_1();
  __52=Attr();
  __55=(OfArray())([__47.NewAttr("id","new-word"),__48.NewAttr("name","new-word"),__50.NewAttr("type","text"),__51.NewAttr("style","width:70%; display:inline"),__52.NewAttr("placeholder","new word")]);
  __54=Tags();
  __56=Attr();
  __57=Attr();
  __58=Attr();
  __59=Attr();
  __61=(OfArray())([__56.NewAttr("data-"+"role","button"),__57.NewAttr("data-"+"inline","true"),__58.NewAttr("data-"+"rel","dialog"),__59.NewAttr("data-"+"transition","pop")]);
  __60=Tags();
  __62=Tags();
  __64=(op_MinusLess())(__60.NewTag("a",__61),(OfArray())([__62.text("Add")]));
  __63=function(arg10)
  {
   var __13;
   __13=Events();
   return __13.OnClick(function()
   {
    return function()
    {
     var __14;
     (Data()).newEditState={$:0};
     __14=mobile();
     return __14.changePage("#new-edit-word-page","pop");
    };
   },arg10);
  };
  __63(__64);
  addNewWord=(op_MinusLess())(__43.Div(__45),(OfArray())([__54.NewTag("input",__55),__64]));
  __65=Attr();
  __67=(OfArray())([__65.NewAttr("data-"+"role","content")]);
  __66=Tags();
  __68=Attr();
  __70=(OfArray())([__68.NewAttr("data-"+"role","button")]);
  __69=Tags();
  __71=Attr_1();
  __72=Tags();
  __73=Attr();
  __75=(OfArray())([__73.NewAttr("data-"+"role","button")]);
  __74=Tags();
  __76=Attr_1();
  __77=Tags();
  content=(op_MinusLess())(__66.Div(__67),(OfArray())([chooseDict,addNewWord,(op_MinusLess())(__69.NewTag("a",__70),(OfArray())([__71.NewAttr("href","#my-words-page"),__72.text("My words")])),(op_MinusLess())(__74.NewTag("a",__75),(OfArray())([__76.NewAttr("href","#test-me-page"),__77.text("Test me")]))]));
  __78=Attr_1();
  __79=Attr();
  __81=(OfArray())([__78.NewAttr("id","main-page"),__79.NewAttr("data-"+"role","page")]);
  __80=Tags();
  __89=(op_MinusLess())(__80.Div(__81),(OfArray())([header,content,footer]));
  __88=function(w)
  {
   return(Operators()).OnBeforeRender(function()
   {
    var __28,__29,__30,__31,__82,__83,__84,__85,__86,__87;
    __28=jQuery("#main-page");
    __29=function()
    {
     var __13,__14,__15,__16,__17,__18,__19,__20,__21,__22,__23,__24,__25,__26,__27,addNewDictOption;
     __13=jQuery("#main-page #new-word");
     __14=__13.val("");
     __53(__14);
     __15=dictLangSelect["HtmlProvider@22"];
     __15.Clear(dictLangSelect.Body);
     __17=getDictLangOptions(undefined);
     __16=function(list)
     {
      return(Iterate())(function(o)
      {
       return dictLangSelect.AppendI(o);
      },list);
     };
     __16(__17);
     __23=Tags();
     __18=Attr_1();
     __19=__46(0);
     __20=Attr_1();
     __21="dict-lang-opt"+__46(0);
     __22=Attr_1();
     __24=(OfArray())([__18.NewAttr("value",__19),__20.NewAttr("id",__21),__22.NewAttr("name","dict-langs")]);
     __25=Tags();
     addNewDictOption=(op_MinusLess())(__23.NewTag("option",__24),(OfArray())([__25.text("add new dictionary")]));
     dictLangSelect.AppendI(addNewDictOption);
     __26=dictLangSelect.Body;
     __27=jQuery(__26);
     __27.selectmenu("refresh");
    };
    __30=__28.live("pagebeforeshow",__29);
    __53(__30);
    __31=jQuery("#main-page");
    __82=function()
    {
     return function()
     {
      return(InitializeData())();
     };
    };
    __83=__31.live("pagebeforecreate",__82);
    __53(__83);
    __84=dictLangSelect.Body;
    __85=jQuery(__84);
    __86=function()
    {
     var __13,__14,__15,__16,__17,__18,__19,__20,__21,__22,dict,dictId;
     __13=jQuery("select#dictionary-language option:selected");
     __14=__13.val();
     __16=__46(__14);
     __15=function(value)
     {
      return Number(value);
     };
     dictId=__15(__16);
     if(dictId===0)
      {
       __17=mobile();
       __18=__17.changePage("#new-dictionary-page","pop");
       __22=__53(__18);
      }
     else
      {
       __20=dictionaries();
       __19=function(list)
       {
        return(Find())(function(d)
        {
         return d.Id===dictId;
        },list);
       };
       dict=__19(__20);
       __21=(ActivateDictionary())(dict);
       __22=__49(__21);
      }
     return __22;
    };
    __87=__85.change(__86);
    return __53(__87);
   },w);
  };
  __88(__89);
  return __89;
 };
 (LoginPage()).LoginPage=function()
 {
  var _,__1,__10,__11,__12,__13,__14,__15,__16,__17,__18,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__45,__47,__48,__50,__51,__52,__54,__6,__7,__71,__72,__73,__74,__75,__76,__77,__78,__79,__8,__80,__81,__82,__9,content,header;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __6=(OfArray())([__3.text("Login")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__6)]));
  __7=Attr();
  __9=(OfArray())([__7.NewAttr("data-"+"role","content")]);
  __8=Tags();
  __10=Attr();
  __12=(OfArray())([__10.NewAttr("data-"+"role","fieldcontain")]);
  __11=Tags();
  __13=Attr_1();
  __15=(OfArray())([__13.NewAttr("for","email")]);
  __14=Tags();
  __16=Tags();
  __17=Attr_1();
  __18=Attr_1();
  __19=Attr_1();
  __20=Attr_1();
  __22=(OfArray())([__17.NewAttr("id","email"),__18.NewAttr("name","email"),__19.NewAttr("type","text"),__20.NewAttr("value","a")]);
  __21=Tags();
  __23=Attr();
  __25=(OfArray())([__23.NewAttr("data-"+"role","fieldcontain")]);
  __24=Tags();
  __26=Attr_1();
  __28=(OfArray())([__26.NewAttr("for","password")]);
  __27=Tags();
  __29=Tags();
  __30=Attr_1();
  __31=Attr_1();
  __32=Attr_1();
  __33=Attr_1();
  __35=(OfArray())([__30.NewAttr("id","password"),__31.NewAttr("name","password"),__32.NewAttr("type","password"),__33.NewAttr("value","a")]);
  __34=Tags();
  __36=Attr_1();
  __38=(OfArray())([__36.NewAttr("class","ui-body ui-body-b")]);
  __37=Tags();
  __39=Attr_1();
  __41=(OfArray())([__39.NewAttr("class","ui-grid-a")]);
  __40=Tags();
  __42=Attr_1();
  __45=(OfArray())([__42.NewAttr("class","ui-block-b")]);
  __43=Tags();
  __47=Attr_1();
  __48=Attr();
  __50=Attr();
  __52=(OfArray())([__47.NewAttr("type","submit"),__48.NewAttr("data-"+"theme","a"),__50.NewAttr("data-"+"icon","check")]);
  __51=Tags();
  __54=Tags();
  __72=(op_MinusLess())(__51.NewTag("button",__52),(OfArray())([__54.text("Log In")]));
  __71=function(arg10)
  {
   var __55;
   __55=Events();
   return __55.OnClick(function()
   {
    return function()
    {
     var __56,__57,__58,__59,__70,builder_,email,password;
     __56=jQuery("#email");
     __57=__56.val();
     email=__46(__57);
     __58=jQuery("#password");
     __59=__58.val();
     password=__46(__59);
     builder_=Do();
     __70=builder_.Delay(function()
     {
      var __60;
      __60=Mobile();
      __60.Alert("Login async before");
      return builder_.Bind((Data()).Login(email,password),function(_arg13)
      {
       var __61,__62,__69;
       __61=Mobile();
       __61.Alert("Login async after");
       if(_arg13)
        {
         __62=Mobile();
         __62.Alert("Login init data before");
         __69=builder_.Bind((InitializeData())(),function()
         {
          var __63,__64,__65,__66,__67,__68;
          __63=Mobile();
          __63.Alert("Login init data after");
          __64=mobile();
          __64.changePage("#main-page","pop");
          __65=jQuery("#login-page");
          __66=__65.hide();
          __53(__66);
          __67=jQuery("#main-page");
          __68=__67.show();
          __53(__68);
          return builder_.Zero();
         });
        }
       else
        {
         __69=builder_.Zero();
        }
       return builder_.Combine(__69,builder_.Delay(function()
       {
        return builder_.Return(undefined);
       }));
      });
     });
     return __49(__70);
    };
   },arg10);
  };
  __71(__72);
  content=(op_MinusLess())(__8.Div(__9),(OfArray())([(op_MinusLess())(__11.Div(__12),(OfArray())([(op_MinusLess())(__14.NewTag("label",__15),(OfArray())([__16.text("Email:")])),__21.NewTag("input",__22)])),(op_MinusLess())(__24.Div(__25),(OfArray())([(op_MinusLess())(__27.NewTag("label",__28),(OfArray())([__29.text("Password:")])),__34.NewTag("input",__35)])),(op_MinusLess())(__37.Div(__38),(OfArray())([(op_MinusLess())(__40.NewTag("fieldset",__41),(OfArray())([(op_MinusLess())(__43.Div(__45),(OfArray())([__72]))]))]))]));
  __73=Attr();
  __75=(OfArray())([__73.NewAttr("data-"+"role","footer")]);
  __74=Tags();
  __76=Tags();
  __78=(OfArray())([__76.text("IntelliFactory.com")]);
  __77=Tags();
  (op_MinusLess())(__74.Div(__75),(OfArray())([__77.NewTag("h4",__78)]));
  __79=Attr_1();
  __80=Attr();
  __82=(OfArray())([__79.NewAttr("id","login-page"),__80.NewAttr("data-"+"role","page")]);
  __81=Tags();
  return(op_MinusLess())(__81.Div(__82),(OfArray())([header,content]));
 };
 (WordPages()).MyWordsPage=function()
 {
  var _,__1,__14,__15,__16,__17,__18,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__38,__39,__4,__6,content,getWordList,header,wordList;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __6=(OfArray())([__3.text("My words")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__6)]));
  getWordList=function()
  {
   var words;
   words=Words();
   return(Delay())(function()
   {
    return(Map())(function(word)
    {
     var __10,__11,__12,__13,__7,__8,__9,arg10;
     arg10=word.OriginalWord;
     __7=Attr();
     __9=(OfArray())([__7.NewAttr("data-"+"word",arg10)]);
     __8=Tags();
     __11=word.OriginalWord;
     __10=Tags();
     __13=(OfArray())([(op_MinusLess())(__8.NewTag("a",__9),(OfArray())([__10.text(__11)]))]);
     __12=Tags();
     return __12.NewTag("li",__13);
    },words);
   });
  };
  __14=Attr();
  __15=Attr();
  __16=Attr();
  __17=Attr();
  __19=(OfArray())([__14.NewAttr("data-"+"role","listview"),__15.NewAttr("data-"+"filter","true"),__16.NewAttr("data-"+"filter-placeholder","search words..."),__17.NewAttr("data-"+"split-theme","c")]);
  __18=Tags();
  wordList=__18.NewTag("ul",__19);
  __20=Attr();
  __22=(OfArray())([__20.NewAttr("data-"+"role","content")]);
  __21=Tags();
  content=(op_MinusLess())(__21.Div(__22),(OfArray())([wordList]));
  __23=Attr();
  __25=(OfArray())([__23.NewAttr("data-"+"role","footer")]);
  __24=Tags();
  __26=Tags();
  __28=(OfArray())([__26.text("Page Footer")]);
  __27=Tags();
  (op_MinusLess())(__24.Div(__25),(OfArray())([__27.NewTag("h4",__28)]));
  __29=Attr_1();
  __30=Attr();
  __31=Attr();
  __33=(OfArray())([__29.NewAttr("id","my-words-page"),__30.NewAttr("data-"+"role","page"),__31.NewAttr("data-"+"add-back-btn","true")]);
  __32=Tags();
  __39=(op_MinusLess())(__32.Div(__33),(OfArray())([header,content]));
  __38=function(w_1)
  {
   return(OnAfterRender())(function()
   {
    var __10,__11,__12,__35,__36,__37;
    __10=jQuery("#my-words-page ul li a");
    __11=function()
    {
     var _this=this;
     var __7,__8,__9,w,word;
     __7=jQuery(_this);
     __8=__7.data("word");
     w=__46(__8);
     word=(Data()).GetWord(_0(),w);
     (Data()).activeWord={$:1,$0:word};
     __9=mobile();
     return __9.changePage("#view-word-page");
    };
    __12=__10.live("click",__11);
    __53(__12);
    __35=jQuery("#my-words-page");
    __36=function()
    {
     var __13,__34,__7,__8,__9;
     __7=wordList["HtmlProvider@22"];
     __7.Clear(wordList.Body);
     __9=getWordList(undefined);
     __8=function(source)
     {
      return(Iterate())(function(w)
      {
       return wordList.AppendI(w);
      },source);
     };
     __8(__9);
     __13=wordList.Body;
     __34=jQuery(__13);
     return __34.listview("refresh");
    };
    __37=__35.live("pagebeforeshow",__36);
    return __53(__37);
   },w_1);
  };
  __38(__39);
  return __39;
 };
 (WordPages()).NewEditWordPage=function()
 {
  var _,__1,__10,__11,__116,__117,__118,__119,__12,__120,__121,__122,__123,__124,__125,__126,__127,__13,__14,__15,__16,__17,__18,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__45,__47,__48,__50,__51,__52,__54,__55,__56,__57,__58,__59,__6,__60,__61,__62,__63,__64,__65,__66,__67,__68,__69,__7,__70,__71,__72,__73,__74,__75,__76,__77,__78,__8,__9,__92,__93,content,header,pageTitle;
  _=Tags();
  __2=(OfArray())([_.text("New word")]);
  __1=Tags();
  pageTitle=__1.NewTag("h1",__2);
  __3=Attr();
  __6=(OfArray())([__3.NewAttr("data-"+"role","header")]);
  __4=Tags();
  header=(op_MinusLess())(__4.Div(__6),(OfArray())([pageTitle]));
  __7=Attr();
  __9=(OfArray())([__7.NewAttr("data-"+"role","content")]);
  __8=Tags();
  __10=Attr();
  __12=(OfArray())([__10.NewAttr("data-"+"role","fieldcontain")]);
  __11=Tags();
  __13=Attr_1();
  __15=(OfArray())([__13.NewAttr("for","word")]);
  __14=Tags();
  __16=Tags();
  __17=Attr_1();
  __18=Attr_1();
  __19=Attr_1();
  __20=Attr_1();
  __22=(OfArray())([__17.NewAttr("id","word"),__18.NewAttr("name","word"),__19.NewAttr("type","text"),__20.NewAttr("value","")]);
  __21=Tags();
  __23=Attr();
  __25=(OfArray())([__23.NewAttr("data-"+"role","fieldcontain")]);
  __24=Tags();
  __26=Attr_1();
  __28=(OfArray())([__26.NewAttr("for","word-translation1")]);
  __27=Tags();
  __29=Tags();
  __30=Attr_1();
  __31=Attr_1();
  __32=Attr_1();
  __33=Attr_1();
  __35=(OfArray())([__30.NewAttr("id","word-translation1"),__31.NewAttr("name","word-translation1"),__32.NewAttr("type","text"),__33.NewAttr("value","")]);
  __34=Tags();
  __36=Attr();
  __38=(OfArray())([__36.NewAttr("data-"+"role","fieldcontain")]);
  __37=Tags();
  __39=Attr_1();
  __41=(OfArray())([__39.NewAttr("for","word-translation2")]);
  __40=Tags();
  __42=Tags();
  __43=Attr_1();
  __45=Attr_1();
  __47=Attr_1();
  __48=Attr_1();
  __51=(OfArray())([__43.NewAttr("id","word-translation2"),__45.NewAttr("name","word-translation2"),__47.NewAttr("type","text"),__48.NewAttr("value","")]);
  __50=Tags();
  __52=Attr_1();
  __55=(OfArray())([__52.NewAttr("class","ui-body ui-body-b")]);
  __54=Tags();
  __56=Attr_1();
  __58=(OfArray())([__56.NewAttr("class","ui-grid-a")]);
  __57=Tags();
  __59=Attr_1();
  __61=(OfArray())([__59.NewAttr("class","ui-block-a")]);
  __60=Tags();
  __62=Attr_1();
  __63=Attr();
  __64=Attr();
  __65=Attr();
  __66=Attr();
  __68=(OfArray())([__62.NewAttr("href","#main-page"),__63.NewAttr("data-"+"role","button"),__64.NewAttr("data-"+"theme","d"),__65.NewAttr("data-"+"icon","delete"),__66.NewAttr("data-"+"rel","back")]);
  __67=Tags();
  __69=Tags();
  __70=Attr_1();
  __72=(OfArray())([__70.NewAttr("class","ui-block-b")]);
  __71=Tags();
  __73=Attr();
  __74=Attr();
  __75=Attr();
  __77=(OfArray())([__73.NewAttr("data-"+"role","button"),__74.NewAttr("data-"+"theme","a"),__75.NewAttr("data-"+"icon","check")]);
  __76=Tags();
  __78=Tags();
  __93=(op_MinusLess())(__76.NewTag("a",__77),(OfArray())([__78.text("Save")]));
  __92=function(arg10)
  {
   var __79;
   __79=Events();
   return __79.OnClick(function()
   {
    return function()
    {
     var __80,__81,__82,__83,__84,__85,__91,builder_,translation1,translation2,word;
     __80=jQuery("#new-edit-word-page #word");
     __81=__80.val();
     word=__46(__81);
     __82=jQuery("#new-edit-word-page #word-translation1");
     __83=__82.val();
     translation1=__46(__83);
     __84=jQuery("#new-edit-word-page #word-translation2");
     __85=__84.val();
     translation2=__46(__85);
     builder_=Do();
     __91=builder_.Delay(function()
     {
      var __88,__89,__90;
      if((Equals())(newEditState(),{$:0}))
       {
        __88=(Delay())(function()
        {
         var __86;
         if(translation1.length!==0)
          {
           __86=[translation1];
          }
         else
          {
           __86=(Empty())();
          }
         return(Append())(__86,(Delay())(function()
         {
          var __87;
          if(translation2.length!==0)
           {
            __87=[translation2];
           }
          else
           {
            __87=(Empty())();
           }
          return __87;
         }));
        });
        __90=builder_.Bind((Data()).AddWord(_0(),{Id:0,OriginalWord:word,Translations:(OfSeq())(__88)}),function()
        {
         var __86;
         __86=history();
         (back()).call(__86);
         return builder_.Zero();
        });
       }
      else
       {
        __89=(Delay())(function()
        {
         var __86;
         if(translation1.length!==0)
          {
           __86=[translation1];
          }
         else
          {
           __86=(Empty())();
          }
         return(Append())(__86,(Delay())(function()
         {
          var __87;
          if(translation2.length!==0)
           {
            __87=[translation2];
           }
          else
           {
            __87=(Empty())();
           }
          return __87;
         }));
        });
        __90=builder_.Bind((Data()).UpdateWord(_0(),{Id:(_0_2()).Id,OriginalWord:word,Translations:(OfSeq())(__89)}),function()
        {
         var __86;
         __86=history();
         (back()).call(__86);
         return builder_.Zero();
        });
       }
      return builder_.Combine(__90,builder_.Delay(function()
      {
       return builder_.Return(undefined);
      }));
     });
     return __49(__91);
    };
   },arg10);
  };
  __92(__93);
  __117=(op_MinusLess())(__54.Div(__55),(OfArray())([(op_MinusLess())(__57.NewTag("fieldset",__58),(OfArray())([(op_MinusLess())(__60.Div(__61),(OfArray())([(op_MinusLess())(__67.NewTag("a",__68),(OfArray())([__69.text("Cancel")]))])),(op_MinusLess())(__71.Div(__72),(OfArray())([__93]))]))]));
  __116=function(w)
  {
   return(OnAfterRender())(function()
   {
    var __113,__114,__115;
    __113=jQuery("#new-edit-word-page");
    __114=function()
    {
     var __100,__101,__102,__103,__104,__105,__106,__107,__108,__109,__110,__111,__112,__79,__80,__81,__82,__83,__84,__85,__86,__87,__88,__89,__90,__91,__94,__95,__96,__97,__98,__99,objectArg,objectArg_1;
     __79=jQuery("#new-edit-word-page #word");
     __80=__79.val("");
     __53(__80);
     __81=jQuery("#new-edit-word-page #word-translation1");
     __82=__81.val("");
     __53(__82);
     __83=jQuery("#new-edit-word-page #word-translation2");
     __84=__83.val("");
     __53(__84);
     if((Equals())(newEditState(),{$:0}))
      {
       __87=jQuery("#new-edit-word-page #word");
       __85=jQuery("#main-page #new-word");
       __86=__85.val();
       __88=__46(__86);
       __89=__87.val(__88);
       __53(__89);
       __90=pageTitle["HtmlProvider@22"];
       __90.Clear(pageTitle.Body);
       objectArg=pageTitle["HtmlProvider@22"];
       __91=pageTitle["HtmlProvider@22"];
       __111=(function(arg00)
       {
        return function(arg10)
        {
         return objectArg.AppendNode(arg00,arg10);
        };
       }(pageTitle.Body))(__91.CreateTextNode("New word"));
      }
     else
      {
       __94=jQuery("#new-edit-word-page #word");
       __95=(_0_2()).OriginalWord;
       __96=__94.val(__95);
       __53(__96);
       __97=Translations();
       if((Length())(__97)>0)
        {
         __99=jQuery("#new-edit-word-page #word-translation1");
         __98=Translations();
         __100=(Get())(0,__98);
         __101=__99.val(__100);
         __102=__53(__101);
        }
       __102;
       __103=Translations();
       if((Length())(__103)>1)
        {
         __105=jQuery("#new-edit-word-page #word-translation2");
         __104=Translations();
         __106=(Get())(1,__104);
         __107=__105.val(__106);
         __108=__53(__107);
        }
       __108;
       __109=pageTitle["HtmlProvider@22"];
       __109.Clear(pageTitle.Body);
       objectArg_1=pageTitle["HtmlProvider@22"];
       __110=pageTitle["HtmlProvider@22"];
       __111=(function(arg00)
       {
        return function(arg10)
        {
         return objectArg_1.AppendNode(arg00,arg10);
        };
       }(pageTitle.Body))(__110.CreateTextNode("Edit word"));
      }
     __112=__111;
     return __53(__112);
    };
    __115=__113.live("pagebeforeshow",__114);
    return __53(__115);
   },w);
  };
  __116(__117);
  content=(op_MinusLess())(__8.Div(__9),(OfArray())([(op_MinusLess())(__11.Div(__12),(OfArray())([(op_MinusLess())(__14.NewTag("label",__15),(OfArray())([__16.text("Word:")])),__21.NewTag("input",__22)])),(op_MinusLess())(__24.Div(__25),(OfArray())([(op_MinusLess())(__27.NewTag("label",__28),(OfArray())([__29.text("Translation #1:")])),__34.NewTag("input",__35)])),(op_MinusLess())(__37.Div(__38),(OfArray())([(op_MinusLess())(__40.NewTag("label",__41),(OfArray())([__42.text("Translation #2:")])),__50.NewTag("input",__51)])),__117]));
  __118=Attr();
  __120=(OfArray())([__118.NewAttr("data-"+"role","footer")]);
  __119=Tags();
  __121=Tags();
  __123=(OfArray())([__121.text("IntelliFactory.com")]);
  __122=Tags();
  (op_MinusLess())(__119.Div(__120),(OfArray())([__122.NewTag("h4",__123)]));
  __124=Attr_1();
  __125=Attr();
  __127=(OfArray())([__124.NewAttr("id","new-edit-word-page"),__125.NewAttr("data-"+"role","page")]);
  __126=Tags();
  return(op_MinusLess())(__126.Div(__127),(OfArray())([header,content]));
 };
 (WordPages()).ViewWordPage=function()
 {
  var _,__1,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__45,__47,__48,__50,__51,__52,__54,__55,__56,__57,__58,__59,__6,__60,__61,__62,__63,__64,__65,__66,__67,__68,__69,content,header,translations,translationsDiv,wordH3;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __6=(OfArray())([__3.text("Word")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__6)]));
  translations=function(word)
  {
   var __10,__11,__12,__17,__18,__7,__8,__9;
   __7=Attr_1();
   __9=(OfArray())([__7.NewAttr("style","text-align: center")]);
   __8=Tags();
   __10=Tags();
   __12=(OfArray())([__10.text("translations")]);
   __11=Tags();
   __18=(Delay())(function()
   {
    return(Map())(function(translation)
    {
     var __13,__14,__15,__16;
     __13=Attr_1();
     __15=(OfArray())([__13.NewAttr("style","text-align: center")]);
     __14=Tags();
     __16=Tags();
     return(op_MinusLess())(__14.NewTag("h4",__15),(OfArray())([__16.text(translation)]));
    },word.Translations);
   });
   __17=Tags();
   return(op_MinusLess())(__8.Div(__9),(OfArray())([__11.NewTag("span",__12),__17.Div(__18)]));
  };
  __19=Attr_1();
  __20=Attr_1();
  __22=(OfArray())([__19.NewAttr("id","word"),__20.NewAttr("style","text-align: center")]);
  __21=Tags();
  __23=Tags();
  wordH3=(op_MinusLess())(__21.NewTag("h3",__22),(OfArray())([__23.text("Word")]));
  __24=Attr();
  __26=(OfArray())([__24.NewAttr("data-"+"role","fieldcontain")]);
  __25=Tags();
  translationsDiv=__25.Div(__26);
  __27=Attr();
  __29=(OfArray())([__27.NewAttr("data-"+"role","content")]);
  __28=Tags();
  __31=(OfArray())([wordH3]);
  __30=Tags();
  __32=Attr_1();
  __34=(OfArray())([__32.NewAttr("class","ui-grid-a")]);
  __33=Tags();
  __35=Attr_1();
  __37=(OfArray())([__35.NewAttr("class","ui-block-a")]);
  __36=Tags();
  __38=Attr();
  __40=(OfArray())([__38.NewAttr("data-"+"role","button")]);
  __39=Tags();
  __41=Tags();
  __43=(op_MinusLess())(__36.Div(__37),(OfArray())([(op_MinusLess())(__39.NewTag("a",__40),(OfArray())([__41.text("Edit")]))]));
  __42=function(arg10)
  {
   var __7;
   __7=Events();
   return __7.OnClick(function()
   {
    return function()
    {
     var __8;
     (Data()).newEditState={$:1};
     __8=mobile();
     return __8.changePage("#new-edit-word-page","pop");
    };
   },arg10);
  };
  __42(__43);
  __45=Attr_1();
  __48=(OfArray())([__45.NewAttr("class","ui-block-b")]);
  __47=Tags();
  __50=Attr_1();
  __51=Attr();
  __52=Attr();
  __55=(OfArray())([__50.NewAttr("href","#my-words-page"),__51.NewAttr("data-"+"role","button"),__52.NewAttr("data-"+"rel","back")]);
  __54=Tags();
  __56=Tags();
  content=(op_MinusLess())(__28.Div(__29),(OfArray())([__30.Div(__31),translationsDiv,(op_MinusLess())(__33.Div(__34),(OfArray())([__43,(op_MinusLess())(__47.Div(__48),(OfArray())([(op_MinusLess())(__54.NewTag("a",__55),(OfArray())([__56.text("Ok")]))]))]))]));
  __57=Attr();
  __59=(OfArray())([__57.NewAttr("data-"+"role","footer")]);
  __58=Tags();
  __60=Tags();
  __62=(OfArray())([__60.text("IntelliFactory.com")]);
  __61=Tags();
  (op_MinusLess())(__58.Div(__59),(OfArray())([__61.NewTag("h4",__62)]));
  __63=Attr_1();
  __64=Attr();
  __65=Attr();
  __67=(OfArray())([__63.NewAttr("id","view-word-page"),__64.NewAttr("data-"+"role","page"),__65.NewAttr("data-"+"add-back-btn","true")]);
  __66=Tags();
  __69=(op_MinusLess())(__66.Div(__67),(OfArray())([header,content]));
  __68=function(w)
  {
   return(OnAfterRender())(function()
   {
    var __14,__15,__16;
    __14=jQuery("#view-word-page");
    __15=function()
    {
     var __10,__11,__12,__13,__7,__8,__9,objectArg,word;
     word=_0_2();
     __7=jQuery("#view-word-page #word");
     __8=word.OriginalWord;
     __9=__7.html(__8);
     __53(__9);
     __10=wordH3["HtmlProvider@22"];
     __10.Clear(wordH3.Body);
     __12=word.OriginalWord;
     objectArg=wordH3["HtmlProvider@22"];
     __11=wordH3["HtmlProvider@22"];
     ((function(arg00)
     {
      return function(arg10)
      {
       return objectArg.AppendNode(arg00,arg10);
      };
     }(wordH3.Body))(__11.CreateTextNode(__12)));
     __13=translationsDiv["HtmlProvider@22"];
     __13.Clear(translationsDiv.Body);
     return translationsDiv.AppendI(translations(word));
    };
    __16=__14.live("pagebeforeshow",__15);
    return __53(__16);
   },w);
  };
  __68(__69);
  return __69;
 };
 (JQueryMobile()).Main=function()
 {
  var _,__1,__2,__3;
  __1=(WordPages()).ViewWordPage();
  _=function(w)
  {
   return(OnAfterRender())(function()
   {
   },w);
  };
  _(__1);
  __3=(OfArray())([(LoginPage()).LoginPage(),(MainPage()).MainPage(),(WordPages()).MyWordsPage(),(DictionaryPages()).NewDictionaryPage(),(TestPages()).TestMePage(),(TestPages()).TestPage(),(OptionsPage()).OptionsPage(),(WordPages()).NewEditWordPage(),__1]);
  __2=Tags();
  return __2.Div(__3);
 };
 SampleWebsite.SampleSite.MobileClient.support=(Mobile_1()).WP7.EnableWP7Support();
}());
