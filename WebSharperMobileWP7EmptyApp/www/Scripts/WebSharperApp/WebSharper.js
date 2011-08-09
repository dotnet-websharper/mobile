(function()
{
 var global=this;
 var Async,Attr,Attr_1,Call,Class,Client,Client_1,Data,Delay,Do,Events,FSharpList_1,JQueryMobile,ListModule,LoginPage,LoginPage_1,MainPage,Mobile,Mobile_1,NewUnion,OfArray,OnAfterRender,OptionsPage,Runtime,SeqModule,Tags,TestPages,WordPages,__102,__17,__55,mobile,op_MinusLess;
 IntelliFactory.WebSharper.Runtime.Declare({SampleWebsiteO:{SampleSiteO:{Client:{Page2Control:{},Page1Control:{},IndexControl:{}}}},SampleWebsite:{WordPages:{},TestPages:{},OptionsPage:{},MainPage:{},LoginPage:{},JQueryMobileViewer:{},JQueryMobile:{},Data:{}}});
 Client=function()
 {
  return SampleWebsiteO.SampleSiteO.Client;
 };
 (function()
 {
  return SampleWebsiteO.SampleSiteO;
 });
 Class=function()
 {
  return IntelliFactory.WebSharper.Runtime.Class;
 };
 Runtime=function()
 {
  return IntelliFactory.WebSharper.Runtime;
 };
 (function()
 {
  return IntelliFactory.WebSharper;
 });
 Mobile=function()
 {
  return IntelliFactory.WebSharper.Mobile.Mobile;
 };
 Mobile_1=function()
 {
  return IntelliFactory.WebSharper.Mobile;
 };
 OfArray=function()
 {
  return IntelliFactory.WebSharper.Core.ListModule.OfArray;
 };
 ListModule=function()
 {
  return IntelliFactory.WebSharper.Core.ListModule;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core;
 });
 Tags=function()
 {
  return IntelliFactory.WebSharper.Html.Implementation.Tags;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Html.Implementation;
 });
 (function()
 {
  return IntelliFactory.WebSharper.Html;
 });
 NewUnion=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewUnion;
 };
 FSharpList_1=function()
 {
  return IntelliFactory.WebSharper.Core["FSharpList`1"];
 };
 Events=function()
 {
  return IntelliFactory.WebSharper.Html.EventsPervasives.Events;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Html.EventsPervasives;
 });
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
 Async=function()
 {
  return IntelliFactory.WebSharper.Remoting.Client.Async;
 };
 Client_1=function()
 {
  return IntelliFactory.WebSharper.Remoting.Client;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Remoting;
 });
 __17=function(arg00)
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
 OnAfterRender=function()
 {
  return IntelliFactory.WebSharper.Html.Operators.OnAfterRender;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Html.Operators;
 });
 JQueryMobile=function()
 {
  return SampleWebsite.JQueryMobile;
 };
 Data=function()
 {
  return SampleWebsite.Data;
 };
 Call=function()
 {
  return IntelliFactory.WebSharper.Remoting.Client.Call;
 };
 TestPages=function()
 {
  return SampleWebsite.TestPages;
 };
 op_MinusLess=function()
 {
  return IntelliFactory.WebSharper.Html.Operators.op_MinusLess;
 };
 Attr=function()
 {
  return IntelliFactory.WebSharper.Html.Implementation.HTML5.Attr;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Html.Implementation.HTML5;
 });
 Attr_1=function()
 {
  return IntelliFactory.WebSharper.Html.Implementation.Attr;
 };
 Delay=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Delay;
 };
 SeqModule=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule;
 };
 __55=function(value)
 {
  return void value;
 };
 OptionsPage=function()
 {
  return SampleWebsite.OptionsPage;
 };
 MainPage=function()
 {
  return SampleWebsite.MainPage;
 };
 mobile=function()
 {
  return jQuery.mobile;
 };
 LoginPage=function()
 {
  return SampleWebsite.LoginPage;
 };
 __102=function(value)
 {
  return value.toString();
 };
 WordPages=function()
 {
  return SampleWebsite.WordPages;
 };
 LoginPage_1=function()
 {
  return SampleWebsite.LoginPage.LoginPage;
 };
 (Client()).Page1Control=(Class())(null,null,{get_Body:function()
 {
  var _,__1,__10,__11,__12,__13,__14,__15,__16,__2,__3,__4,__5,__6,__7,__8,__9,acc,accT,copyOfStruct,copyOfStruct_1,copyOfStruct_2,copyOfStruct_3,copyOfStruct_4,loc,locT;
  _=Mobile();
  _.Alert("Hello!");
  __1=Mobile();
  loc=__1.GetLocation();
  copyOfStruct=loc.Lat;
  __2="Lat: "+copyOfStruct.toString()+"; Long: ";
  copyOfStruct_1=loc.Long;
  locT=__2+copyOfStruct_1.toString();
  __3=Mobile();
  acc=__3.GetAcceleration();
  copyOfStruct_2=acc.X;
  __4="X: "+copyOfStruct_2.toString()+"; Y: ";
  copyOfStruct_3=acc.Y;
  __5=__4+copyOfStruct_3.toString()+"; Z: ";
  copyOfStruct_4=acc.Z;
  accT=__5+copyOfStruct_4.toString();
  __6=Tags();
  __8=(NewUnion())(FSharpList_1(),0);
  __7=Tags();
  __9=Tags();
  __11=(NewUnion())(FSharpList_1(),0);
  __10=Tags();
  __12=Mobile();
  __14="The message is: "+__12.StorageLoad("message");
  __13=Tags();
  __16=(OfArray())([__6.text(locT),__7.NewTag("br",__8),__9.text(accT),__10.NewTag("br",__11),__13.text(__14)]);
  __15=Tags();
  return __15.NewTag("p",__16);
 }});
 (Client()).Page2Control=(Class())(null,null,{get_Body:function()
 {
  var _,_1,__1,__10,__11,__12,__13,__14,__15,__16,__18,__19,__2,__20,__3,__6,__7,__8,__9,x;
  try
  {
   _=Mobile();
   _.StorageStore("message","Hello from page 2!");
   __1=Tags();
   __3=(OfArray())([__1.text("Click me!")]);
   __2=Tags();
   __7=__2.NewTag("p",__3);
   __6=function(arg10)
   {
    var __4;
    __4=Events();
    return __4.OnClick(function(_this)
    {
     return function()
     {
      var __5,builder_;
      builder_=Do();
      __5=builder_.Delay(function()
      {
       return builder_.Bind((Async())(null,"[[0,\"WebSharperApp\",\"SampleWebsiteO.SampleSiteO+Client\"],{\"methodDefinition\":{\"isStaticMethod\":true,\"methodGenerics\":0,\"methodName\":\"g\",\"methodSignature\":[1,[0,\"mscorlib\",\"System.Int32\"],[0]]},\"methodArguments\":[0]}]",[12]),function(_arg1)
       {
        _this.set_Text(_arg1);
        return builder_.Zero();
       });
      });
      return __17(__5);
     };
    },arg10);
   };
   __6(__7);
   __8=Tags();
   __10=(OfArray())([__8.text("Client control page ")]);
   __9=Tags();
   __12=__9.NewTag("i",__10);
   __11=function(w)
   {
    return(OnAfterRender())(function(_this)
    {
     var __5,builder_;
     builder_=Do();
     __5=builder_.Delay(function()
     {
      return builder_.Bind((Async())(null,"[[0,\"WebSharperApp\",\"SampleWebsiteO.SampleSiteO+Client\"],{\"methodDefinition\":{\"isStaticMethod\":true,\"methodGenerics\":0,\"methodName\":\"f\",\"methodSignature\":[1,[0,\"mscorlib\",\"System.Int32\"],[0]]},\"methodArguments\":[0]}]",[-1]),function(_arg2)
      {
       var __4;
       __4=_this.get_Text();
       _this.set_Text(__4+_arg2.toString());
       return builder_.Zero();
      });
     });
     return __17(__5);
    },w);
   };
   __11(__12);
   __14=(OfArray())([__7,__12]);
   __13=Tags();
   _1=__13.Div(__14);
  }
  catch(x)
  {
   __15=x.message;
   __18="Error: "+__15.toString();
   __16=Tags();
   __20=(OfArray())([__16.text(__18)]);
   __19=Tags();
   _1=__19.Div(__20);
  }
  return _1;
 }});
 (Client()).IndexControl=(Class())(null,null,{get_Body:function()
 {
  var _,__1,__2,__3,__4;
  _=Mobile();
  if(_.StorageLoad("message")!=="Hello from page 2!")
   {
    __1=Mobile();
    __2=__1.StorageStore("message","Go to page 2.");
   }
  __2;
  __4=(NewUnion())(FSharpList_1(),0);
  __3=Tags();
  return __3.Div(__4);
 }});
 SampleWebsite.JQueryMobileViewer=(Class())(null,null,{get_Body:function()
 {
  return(JQueryMobile()).Main();
 }});
 (Data()).GetWords=function()
 {
  return(OfArray())([{Word:"a",Translations:(OfArray())(["a1","a2"])},{Word:"b",Translations:(OfArray())(["b1","b2"])},{Word:"c",Translations:(OfArray())(["c1","c2"])},{Word:"d",Translations:(OfArray())(["d1","d2"])},{Word:"e",Translations:(OfArray())(["e1","e2"])}]);
 };
 (Data()).Login=function(email,password)
 {
  return(Call())(null,"[[0,\"WebSharperApp\",\"SampleWebsite.Data+Rpc\"],{\"methodDefinition\":{\"isStaticMethod\":true,\"methodGenerics\":0,\"methodName\":\"Login\",\"methodSignature\":[1,[0,\"mscorlib\",\"System.String\"],[1,[0,\"mscorlib\",\"System.String\"],[0]]]},\"methodArguments\":[0]}]",[email,password]);
 };
 (Data()).MakeTest=function()
 {
  return(Call())(null,"[[0,\"WebSharperApp\",\"SampleWebsite.Data+Rpc\"],{\"methodDefinition\":{\"isStaticMethod\":true,\"methodGenerics\":0,\"methodName\":\"MakeTest\",\"methodSignature\":[0]},\"methodArguments\":[0]}]",[]);
 };
 (Data()).AddWord=function(word)
 {
  return(Client_1()).Send(null,"[[0,\"WebSharperApp\",\"SampleWebsite.Data+Rpc\"],{\"methodDefinition\":{\"isStaticMethod\":true,\"methodGenerics\":0,\"methodName\":\"AddWord\",\"methodSignature\":[1,[0,\"WebSharperApp\",\"SampleWebsite.Data+Word\"],[0]]},\"methodArguments\":[0]}]",[word]);
 };
 (TestPages()).TestMePage=function()
 {
  var _,__1,__10,__11,__12,__13,__14,__15,__16,__18,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__44,__45,__46,__47,__48,__49,__5,__50,__51,__52,__53,__54,__6,__7,__8,__9,content,header;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __5=(OfArray())([__3.text("Test Me")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__5)]));
  __6=Attr();
  __8=(OfArray())([__6.NewAttr("data-"+"role","content")]);
  __7=Tags();
  __9=Attr();
  __11=(OfArray())([__9.NewAttr("data-"+"role","fieldcontain")]);
  __10=Tags();
  __12=Attr_1();
  __14=(OfArray())([__12.NewAttr("style","text-align: center")]);
  __13=Tags();
  __15=Tags();
  __16=Attr_1();
  __19=(OfArray())([__16.NewAttr("style","text-align: center")]);
  __18=Tags();
  __20=Tags();
  __21=Attr_1();
  __23=(OfArray())([__21.NewAttr("class","ui-grid-a")]);
  __22=Tags();
  __24=Attr_1();
  __26=(OfArray())([__24.NewAttr("class","ui-block-a")]);
  __25=Tags();
  __27=Attr();
  __28=Attr();
  __30=(OfArray())([__27.NewAttr("data-"+"role","button"),__28.NewAttr("data-"+"transition","pop")]);
  __29=Tags();
  __31=Attr();
  __32=Attr();
  __33=Attr_1();
  __34=Tags();
  __35=Attr_1();
  __37=(OfArray())([__35.NewAttr("class","ui-block-b")]);
  __36=Tags();
  __38=Attr();
  __40=(OfArray())([__38.NewAttr("data-"+"role","button")]);
  __39=Tags();
  __41=Attr();
  __42=Attr();
  __43=Attr_1();
  __44=Tags();
  content=(op_MinusLess())(__7.Div(__8),(OfArray())([(op_MinusLess())(__10.Div(__11),(OfArray())([(op_MinusLess())(__13.NewTag("h4",__14),(OfArray())([__15.text("Test number")])),(op_MinusLess())(__18.NewTag("h3",__19),(OfArray())([__20.text("20")]))])),(op_MinusLess())(__22.Div(__23),(OfArray())([(op_MinusLess())(__25.Div(__26),(OfArray())([(op_MinusLess())(__29.NewTag("a",__30),(OfArray())([__31.NewAttr("data-"+"theme","d"),__32.NewAttr("data-"+"icon","delete"),__33.NewAttr("href","#indexPage"),__34.text("Cancel test")]))])),(op_MinusLess())(__36.Div(__37),(OfArray())([(op_MinusLess())(__39.NewTag("a",__40),(OfArray())([__41.NewAttr("data-"+"theme","a"),__42.NewAttr("data-"+"icon","check"),__43.NewAttr("href","#test-page"),__44.text("Start test")]))]))]))]));
  __45=Attr();
  __47=(OfArray())([__45.NewAttr("data-"+"role","footer")]);
  __46=Tags();
  __48=Tags();
  __50=(OfArray())([__48.text("IntelliFactory.com")]);
  __49=Tags();
  (op_MinusLess())(__46.Div(__47),(OfArray())([__49.NewTag("h4",__50)]));
  __51=Attr_1();
  __52=Attr();
  __54=(OfArray())([__51.NewAttr("id","test-me-page"),__52.NewAttr("data-"+"role","page")]);
  __53=Tags();
  return(op_MinusLess())(__53.Div(__54),(OfArray())([header,content]));
 };
 (TestPages()).TestPage=function()
 {
  var _,__1,__2,__3,__37,__38,__39,__4,__40,__41,__42,__43,__44,__45,__46,__47,__48,__49,__5,__50,__51,__52,__53,__54,__56,__57,__58,__59,__60,__61,__62,__63,__64,content,header,selectionTest,testContainer;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __5=(OfArray())([__3.text("Test")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__5)]));
  selectionTest=function(word)
  {
   return function(label)
   {
    return function(questions)
    {
     var __18,__19,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__30,__31,__32,__33,__34,__35,__36,radio;
     radio=function(name)
     {
      return function(id)
      {
       return function(text)
       {
        var __10,__11,__12,__13,__14,__15,__16,__6,__7,__8,__9;
        __6=Attr_1();
        __7=Attr_1();
        __8=Attr_1();
        __10=(OfArray())([__6.NewAttr("id",id),__7.NewAttr("name",name),__8.NewAttr("type","radio")]);
        __9=Tags();
        __11=Attr_1();
        __13=(OfArray())([__11.NewAttr("for",id)]);
        __12=Tags();
        __14=Tags();
        __16=(OfArray())([__9.NewTag("input",__10),(op_MinusLess())(__12.NewTag("label",__13),(OfArray())([__14.text(text)]))]);
        __15=Tags();
        return __15.Div(__16);
       };
      };
     };
     __18=Attr();
     __20=(OfArray())([__18.NewAttr("data-"+"role","fieldcontain")]);
     __19=Tags();
     __21=Attr();
     __23=(OfArray())([__21.NewAttr("data-"+"role","fieldcontain")]);
     __22=Tags();
     __24=Attr_1();
     __26=(OfArray())([__24.NewAttr("style","text-align: center")]);
     __25=Tags();
     __27=Tags();
     __28=Attr();
     __30=(OfArray())([__28.NewAttr("data-"+"role","controlgroup")]);
     __29=Tags();
     __31=Tags();
     __33=(OfArray())([__31.text(label)]);
     __32=Tags();
     __34=(Delay())(function()
     {
      return(SeqModule()).Collect((Runtime()).Tupled(function(matchValue)
      {
       var __6,id,n,t;
       t=matchValue[2];
       n=matchValue[0];
       id=matchValue[1];
       __6=((radio(n))(id))(t);
       return[__6];
      }),questions);
     });
     __36=(ListModule()).OfSeq(__34);
     __35=Tags();
     return(op_MinusLess())(__19.Div(__20),(OfArray())([(op_MinusLess())(__22.Div(__23),(OfArray())([(op_MinusLess())(__25.NewTag("h3",__26),(OfArray())([__27.text(word)]))])),(op_MinusLess())(__29.NewTag("fieldset",__30),(OfArray())([__32.NewTag("legend",__33),__35.Div(__36)]))]));
    };
   };
  };
  __37=Attr_1();
  __39=(OfArray())([__37.NewAttr("id","test-container")]);
  __38=Tags();
  testContainer=__38.Div(__39);
  __40=Attr();
  __42=(OfArray())([__40.NewAttr("data-"+"role","content")]);
  __41=Tags();
  __43=Attr_1();
  __45=(OfArray())([__43.NewAttr("id","test-result")]);
  __44=Tags();
  __46=Attr();
  __47=Attr();
  __49=(OfArray())([__46.NewAttr("data-"+"role","button"),__47.NewAttr("data-"+"transition","pop")]);
  __48=Tags();
  __50=Attr_1();
  __51=Tags();
  __53=(op_MinusLess())(__41.Div(__42),(OfArray())([testContainer,__44.Div(__45),(op_MinusLess())(__48.NewTag("a",__49),(OfArray())([__50.NewAttr("href","#indexPage"),__51.text("Ok")]))]));
  __52=function(w)
  {
   return(OnAfterRender())(function()
   {
    var __10,__6,__7,__8,__9;
    __6=jQuery("#test-container");
    __7=__6.hide();
    __55(__7);
    __8=testContainer["HtmlProvider@22"];
    __8.Clear(testContainer.Body);
    testContainer.AppendI(((selectionTest("fa"))("a"))((OfArray())([["b","1","1"],["b","2","3"]])));
    __9=jQuery("#test-container");
    __10=__9.fadeIn();
    return __55(__10);
   },w);
  };
  __52(__53);
  content=__53;
  __54=Attr();
  __57=(OfArray())([__54.NewAttr("data-"+"role","footer")]);
  __56=Tags();
  __58=Tags();
  __60=(OfArray())([__58.text("IntelliFactory.com")]);
  __59=Tags();
  (op_MinusLess())(__56.Div(__57),(OfArray())([__59.NewTag("h4",__60)]));
  __61=Attr_1();
  __62=Attr();
  __64=(OfArray())([__61.NewAttr("id","test-page"),__62.NewAttr("data-"+"role","page")]);
  __63=Tags();
  return(op_MinusLess())(__63.Div(__64),(OfArray())([header,content]));
 };
 (OptionsPage()).OptionsPage=function()
 {
  var _,__1,__100,__101,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__44,__45,__46,__47,__48,__49,__5,__50,__51,__52,__53,__54,__56,__57,__58,__59,__60,__61,__62,__63,__64,__65,__66,__67,__68,__69,__70,__71,__72,__73,__74,__75,__76,__77,__78,__79,__80,__81,__82,__83,__84,__85,__86,__87,__88,__89,__90,__91,__92,__93,__94,__95,__96,__97,__98,__99,checkbox,content,header;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __5=(OfArray())([__3.text("Options")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__5)]));
  checkbox=function(name)
  {
   return function(text)
   {
    var __10,__11,__12,__13,__14,__15,__16,__18,__6,__7,__8,__9;
    __6=Attr_1();
    __7=Attr_1();
    __8=Attr_1();
    __9=Attr_1();
    __11=(OfArray())([__6.NewAttr("id",name),__7.NewAttr("name",name),__8.NewAttr("type","checkbox"),__9.NewAttr("class","custom")]);
    __10=Tags();
    __12=Attr_1();
    __14=(OfArray())([__12.NewAttr("for",name)]);
    __13=Tags();
    __15=Tags();
    __18=(OfArray())([__10.NewTag("input",__11),(op_MinusLess())(__13.NewTag("label",__14),(OfArray())([__15.text(text)]))]);
    __16=Tags();
    return __16.Div(__18);
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
  __44=Tags();
  __46=(OfArray())([__44.text("Select tests:")]);
  __45=Tags();
  __47=Attr();
  __49=(OfArray())([__47.NewAttr("data-"+"role","fieldcontain")]);
  __48=Tags();
  __50=Attr_1();
  __52=(OfArray())([__50.NewAttr("for","repeat-unknown")]);
  __51=Tags();
  __53=Tags();
  __54=Attr_1();
  __56=Attr_1();
  __57=Attr();
  __59=(OfArray())([__54.NewAttr("id","repeat-unknown"),__56.NewAttr("name","repeat-unknown"),__57.NewAttr("data-"+"role","slider")]);
  __58=Tags();
  __62=Tags();
  __60=Attr_1();
  __61=Tags();
  __63=(OfArray())([__60.NewAttr("value","on"),__61.text("Yes")]);
  __66=Tags();
  __64=Attr_1();
  __65=Tags();
  __67=(OfArray())([__64.NewAttr("value","off"),__65.text("No")]);
  __68=Attr_1();
  __70=(OfArray())([__68.NewAttr("class","ui-body ui-body-b")]);
  __69=Tags();
  __71=Attr_1();
  __73=(OfArray())([__71.NewAttr("class","ui-grid-a")]);
  __72=Tags();
  __74=Attr_1();
  __76=(OfArray())([__74.NewAttr("class","ui-block-a")]);
  __75=Tags();
  __77=Attr_1();
  __78=Attr();
  __79=Attr();
  __81=(OfArray())([__77.NewAttr("type","submit"),__78.NewAttr("data-"+"theme","d"),__79.NewAttr("data-"+"icon","delete")]);
  __80=Tags();
  __82=Tags();
  __83=Attr_1();
  __85=(OfArray())([__83.NewAttr("class","ui-block-b")]);
  __84=Tags();
  __86=Attr_1();
  __87=Attr();
  __88=Attr();
  __90=(OfArray())([__86.NewAttr("type","submit"),__87.NewAttr("data-"+"theme","a"),__88.NewAttr("data-"+"icon","check")]);
  __89=Tags();
  __91=Tags();
  content=(op_MinusLess())(__20.Div(__21),(OfArray())([(op_MinusLess())(__24.NewTag("form",__25),(OfArray())([(op_MinusLess())(__27.Div(__28),(OfArray())([(op_MinusLess())(__30.NewTag("label",__31),(OfArray())([__32.text("Test size:")])),__39.NewTag("input",__40)])),(op_MinusLess())(__42.Div(__43),(OfArray())([__45.NewTag("legend",__46),(checkbox("e-to-h-sel"))("English -> Hungarian selection"),(checkbox("h-to-e-sel"))("Hungarian -> English selection"),(checkbox("e-to-h-sim-sel"))("English -> Hungarian similar selection"),(checkbox("e-to-h-type"))("English -> Hungarian type"),(checkbox("h-to-e-type"))("Hungarian -> English selection")])),(op_MinusLess())(__48.Div(__49),(OfArray())([(op_MinusLess())(__51.NewTag("label",__52),(OfArray())([__53.text("Repeat unknown:")])),(op_MinusLess())(__58.NewTag("select",__59),(OfArray())([__62.NewTag("option",__63),__66.NewTag("option",__67)]))])),(op_MinusLess())(__69.Div(__70),(OfArray())([(op_MinusLess())(__72.NewTag("fieldset",__73),(OfArray())([(op_MinusLess())(__75.Div(__76),(OfArray())([(op_MinusLess())(__80.NewTag("button",__81),(OfArray())([__82.text("Cancel")]))])),(op_MinusLess())(__84.Div(__85),(OfArray())([(op_MinusLess())(__89.NewTag("button",__90),(OfArray())([__91.text("Save")]))]))]))]))]))]));
  __92=Attr();
  __94=(OfArray())([__92.NewAttr("data-"+"role","footer")]);
  __93=Tags();
  __95=Tags();
  __97=(OfArray())([__95.text("IntelliFactory.com")]);
  __96=Tags();
  (op_MinusLess())(__93.Div(__94),(OfArray())([__96.NewTag("h4",__97)]));
  __98=Attr_1();
  __99=Attr();
  __101=(OfArray())([__98.NewAttr("id","options-page"),__99.NewAttr("data-"+"role","page")]);
  __100=Tags();
  return(op_MinusLess())(__100.Div(__101),(OfArray())([header,content]));
 };
 (MainPage()).MainPage=function()
 {
  var _,__1,__10,__11,__12,__13,__14,__15,__16,__18,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__44,__45,__48,__49,__5,__50,__51,__52,__53,__54,__56,__57,__58,__59,__6,__60,__61,__62,__63,__64,__65,__66,__67,__7,__8,__9,addNewWord,content,footer,header;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __5=(OfArray())([__3.text("MobyDict")]);
  __4=Tags();
  __6=Attr_1();
  __7=Attr();
  __8=Attr();
  __10=(OfArray())([__6.NewAttr("class","ui-btn-left"),__7.NewAttr("data-"+"rel","dialog"),__8.NewAttr("data-"+"transition","pop")]);
  __9=Tags();
  __11=Attr_1();
  __12=Tags();
  __13=Attr();
  __14=Attr_1();
  __15=Attr();
  __16=Attr();
  __19=(OfArray())([__13.NewAttr("data-"+"icon","gear"),__14.NewAttr("class","ui-btn-right"),__15.NewAttr("data-"+"rel","dialog"),__16.NewAttr("data-"+"transition","flip")]);
  __18=Tags();
  __20=Attr_1();
  __21=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__5),(op_MinusLess())(__9.NewTag("a",__10),(OfArray())([__11.NewAttr("href","#login-page"),__12.text("Login")])),(op_MinusLess())(__18.NewTag("a",__19),(OfArray())([__20.NewAttr("href","#options-page"),__21.text("Options")]))]));
  __22=Attr();
  __24=(OfArray())([__22.NewAttr("data-"+"role","footer")]);
  __23=Tags();
  __25=Tags();
  __27=(OfArray())([__25.text("IntelliFactory.com")]);
  __26=Tags();
  footer=(op_MinusLess())(__23.Div(__24),(OfArray())([__26.NewTag("h4",__27)]));
  __28=Attr();
  __30=(OfArray())([__28.NewAttr("data-"+"role","fieldcontain")]);
  __29=Tags();
  __31=Attr_1();
  __32=Attr_1();
  __33=Attr_1();
  __34=Attr_1();
  __35=Attr();
  __37=(OfArray())([__31.NewAttr("id","new-word"),__32.NewAttr("name","new-word"),__33.NewAttr("type","text"),__34.NewAttr("style","width:70%; display:inline"),__35.NewAttr("placeholder","new word...")]);
  __36=Tags();
  __38=Attr_1();
  __39=Attr();
  __40=Attr();
  __41=Attr();
  __42=Attr();
  __44=(OfArray())([__38.NewAttr("href","#new-word-page"),__39.NewAttr("data-"+"role","button"),__40.NewAttr("data-"+"inline","true"),__41.NewAttr("data-"+"rel","dialog"),__42.NewAttr("data-"+"transition","pop")]);
  __43=Tags();
  __45=Tags();
  __49=(op_MinusLess())(__43.NewTag("a",__44),(OfArray())([__45.text("Add")]));
  __48=function(arg10)
  {
   var __46;
   __46=Events();
   return __46.OnClick(function()
   {
    return function()
    {
     var __47;
     __47=mobile();
     return __47.changePage("#new-word-page","pop");
    };
   },arg10);
  };
  __48(__49);
  addNewWord=(op_MinusLess())(__29.Div(__30),(OfArray())([__36.NewTag("input",__37),__49]));
  __50=Attr();
  __52=(OfArray())([__50.NewAttr("data-"+"role","content")]);
  __51=Tags();
  __53=Attr();
  __56=(OfArray())([__53.NewAttr("data-"+"role","button")]);
  __54=Tags();
  __57=Attr_1();
  __58=Tags();
  __59=Attr();
  __61=(OfArray())([__59.NewAttr("data-"+"role","button")]);
  __60=Tags();
  __62=Attr_1();
  __63=Tags();
  content=(op_MinusLess())(__51.Div(__52),(OfArray())([addNewWord,(op_MinusLess())(__54.NewTag("a",__56),(OfArray())([__57.NewAttr("href","#my-words"),__58.text("My words")])),(op_MinusLess())(__60.NewTag("a",__61),(OfArray())([__62.NewAttr("href","#test-me-page"),__63.text("Test me")]))]));
  __64=Attr_1();
  __65=Attr();
  __67=(OfArray())([__64.NewAttr("id","main-page"),__65.NewAttr("data-"+"role","page")]);
  __66=Tags();
  return(op_MinusLess())(__66.Div(__67),(OfArray())([header,content,footer]));
 };
 (LoginPage()).LoginPage=function()
 {
  var _,__1,__10,__11,__12,__13,__14,__15,__16,__18,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__44,__45,__46,__47,__48,__49,__5,__50,__51,__52,__53,__54,__56,__57,__58,__59,__6,__60,__68,__69,__7,__70,__71,__72,__73,__74,__75,__76,__77,__78,__79,__8,__9,content,header;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __5=(OfArray())([__3.text("Login")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__5)]));
  __6=Attr();
  __8=(OfArray())([__6.NewAttr("data-"+"role","content")]);
  __7=Tags();
  __9=Attr();
  __11=(OfArray())([__9.NewAttr("data-"+"role","fieldcontain")]);
  __10=Tags();
  __12=Attr_1();
  __14=(OfArray())([__12.NewAttr("for","email")]);
  __13=Tags();
  __15=Tags();
  __16=Attr_1();
  __18=Attr_1();
  __19=Attr_1();
  __20=Attr_1();
  __22=(OfArray())([__16.NewAttr("id","email"),__18.NewAttr("name","email"),__19.NewAttr("type","text"),__20.NewAttr("value","")]);
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
  __35=(OfArray())([__30.NewAttr("id","password"),__31.NewAttr("name","password"),__32.NewAttr("type","password"),__33.NewAttr("value","")]);
  __34=Tags();
  __36=Attr_1();
  __38=(OfArray())([__36.NewAttr("class","ui-body ui-body-b")]);
  __37=Tags();
  __39=Attr_1();
  __41=(OfArray())([__39.NewAttr("class","ui-grid-a")]);
  __40=Tags();
  __42=Attr_1();
  __44=(OfArray())([__42.NewAttr("class","ui-block-a")]);
  __43=Tags();
  __45=Attr_1();
  __46=Attr();
  __47=Attr();
  __49=(OfArray())([__45.NewAttr("type","submit"),__46.NewAttr("data-"+"theme","d"),__47.NewAttr("data-"+"icon","delete")]);
  __48=Tags();
  __50=Tags();
  __51=Attr_1();
  __53=(OfArray())([__51.NewAttr("class","ui-block-b")]);
  __52=Tags();
  __54=Attr_1();
  __56=Attr();
  __57=Attr();
  __59=(OfArray())([__54.NewAttr("type","submit"),__56.NewAttr("data-"+"theme","a"),__57.NewAttr("data-"+"icon","check")]);
  __58=Tags();
  __60=Tags();
  __69=(op_MinusLess())(__58.NewTag("button",__59),(OfArray())([__60.text("Log In")]));
  __68=function(arg10)
  {
   var __61;
   __61=Events();
   return __61.OnClick(function()
   {
    return function()
    {
     var __62,__63,__64,__65,__66,__67,email,password;
     __62=jQuery("#email");
     __63=__62.val();
     email=__102(__63);
     __64=jQuery("#password");
     __65=__64.val();
     password=__102(__65);
     if((Data()).Login(email,password))
      {
       __66=mobile();
       __67=__66.changePage("#main-page","pop");
      }
     return __67;
    };
   },arg10);
  };
  __68(__69);
  content=(op_MinusLess())(__7.Div(__8),(OfArray())([(op_MinusLess())(__10.Div(__11),(OfArray())([(op_MinusLess())(__13.NewTag("label",__14),(OfArray())([__15.text("Email:")])),__21.NewTag("input",__22)])),(op_MinusLess())(__24.Div(__25),(OfArray())([(op_MinusLess())(__27.NewTag("label",__28),(OfArray())([__29.text("Password:")])),__34.NewTag("input",__35)])),(op_MinusLess())(__37.Div(__38),(OfArray())([(op_MinusLess())(__40.NewTag("fieldset",__41),(OfArray())([(op_MinusLess())(__43.Div(__44),(OfArray())([(op_MinusLess())(__48.NewTag("button",__49),(OfArray())([__50.text("Cancel")]))])),(op_MinusLess())(__52.Div(__53),(OfArray())([__69]))]))]))]));
  __70=Attr();
  __72=(OfArray())([__70.NewAttr("data-"+"role","footer")]);
  __71=Tags();
  __73=Tags();
  __75=(OfArray())([__73.text("IntelliFactory.com")]);
  __74=Tags();
  (op_MinusLess())(__71.Div(__72),(OfArray())([__74.NewTag("h4",__75)]));
  __76=Attr_1();
  __77=Attr();
  __79=(OfArray())([__76.NewAttr("id","login-page"),__77.NewAttr("data-"+"role","page")]);
  __78=Tags();
  return(op_MinusLess())(__78.Div(__79),(OfArray())([header,content]));
 };
 (WordPages()).MyWordsPage=function()
 {
  var LIs,_,__1,__13,__14,__15,__16,__18,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__4,__5,content,header,words;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __5=(OfArray())([__3.text("My words")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__5)]));
  words=(Data()).GetWords();
  LIs=(Delay())(function()
  {
   return(SeqModule()).Map(function(word)
   {
    var __10,__11,__12,__6,__7,__8,__9;
    __6=Attr_1();
    __8=(OfArray())([__6.NewAttr("href","#view-word-page")]);
    __7=Tags();
    __10=word.Word;
    __9=Tags();
    __12=(OfArray())([(op_MinusLess())(__7.NewTag("a",__8),(OfArray())([__9.text(__10)]))]);
    __11=Tags();
    return __11.NewTag("li",__12);
   },words);
  });
  __13=Attr();
  __15=(OfArray())([__13.NewAttr("data-"+"role","content")]);
  __14=Tags();
  __16=Attr();
  __18=Attr();
  __19=Attr();
  __21=(OfArray())([__16.NewAttr("data-"+"role","listview"),__18.NewAttr("data-"+"filter","true"),__19.NewAttr("data-"+"split-theme","c")]);
  __20=Tags();
  content=(op_MinusLess())(__14.Div(__15),(OfArray())([(op_MinusLess())(__20.NewTag("ul",__21),LIs)]));
  __22=Attr();
  __24=(OfArray())([__22.NewAttr("data-"+"role","footer")]);
  __23=Tags();
  __25=Tags();
  __27=(OfArray())([__25.text("Page Footer")]);
  __26=Tags();
  (op_MinusLess())(__23.Div(__24),(OfArray())([__26.NewTag("h4",__27)]));
  __28=Attr_1();
  __29=Attr();
  __31=(OfArray())([__28.NewAttr("id","my-words"),__29.NewAttr("data-"+"role","page")]);
  __30=Tags();
  __33=(op_MinusLess())(__30.Div(__31),(OfArray())([header,content]));
  __32=function(w)
  {
   return(OnAfterRender())(function()
   {
    var __6,__7,__8;
    __6=jQuery("#my-words ul li");
    __7=function()
    {
     return alert("fa");
    };
    __8=__6.click(__7);
    return __55(__8);
   },w);
  };
  __32(__33);
  return __33;
 };
 (WordPages()).NewWordPage=function()
 {
  var _,__1,__10,__11,__12,__13,__14,__15,__16,__18,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__44,__45,__46,__47,__48,__49,__5,__50,__51,__52,__53,__54,__56,__57,__58,__59,__6,__60,__61,__62,__63,__64,__65,__66,__67,__68,__69,__7,__70,__71,__72,__73,__74,__75,__8,__85,__86,__87,__88,__89,__9,__90,__91,__92,__93,__94,__95,__96,__97,__98,content,header;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __5=(OfArray())([__3.text("New word")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__5)]));
  __6=Attr();
  __8=(OfArray())([__6.NewAttr("data-"+"role","content")]);
  __7=Tags();
  __9=Attr();
  __11=(OfArray())([__9.NewAttr("data-"+"role","fieldcontain")]);
  __10=Tags();
  __12=Attr_1();
  __14=(OfArray())([__12.NewAttr("for","word")]);
  __13=Tags();
  __15=Tags();
  __16=Attr_1();
  __18=Attr_1();
  __19=Attr_1();
  __20=Attr_1();
  __22=(OfArray())([__16.NewAttr("id","word"),__18.NewAttr("name","word"),__19.NewAttr("type","text"),__20.NewAttr("value","")]);
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
  __44=Attr_1();
  __45=Attr_1();
  __46=Attr_1();
  __48=(OfArray())([__43.NewAttr("id","word-translation2"),__44.NewAttr("name","word-translation2"),__45.NewAttr("type","text"),__46.NewAttr("value","")]);
  __47=Tags();
  __49=Attr_1();
  __51=(OfArray())([__49.NewAttr("class","ui-body ui-body-b")]);
  __50=Tags();
  __52=Attr_1();
  __54=(OfArray())([__52.NewAttr("class","ui-grid-a")]);
  __53=Tags();
  __56=Attr_1();
  __58=(OfArray())([__56.NewAttr("class","ui-block-a")]);
  __57=Tags();
  __59=Attr_1();
  __60=Attr();
  __61=Attr();
  __62=Attr();
  __63=Attr();
  __65=(OfArray())([__59.NewAttr("href","#main-page"),__60.NewAttr("data-"+"role","button"),__61.NewAttr("data-"+"theme","d"),__62.NewAttr("data-"+"icon","delete"),__63.NewAttr("data-"+"rel","back")]);
  __64=Tags();
  __66=Tags();
  __67=Attr_1();
  __69=(OfArray())([__67.NewAttr("class","ui-block-b")]);
  __68=Tags();
  __70=Attr();
  __71=Attr();
  __72=Attr();
  __74=(OfArray())([__70.NewAttr("data-"+"role","button"),__71.NewAttr("data-"+"theme","a"),__72.NewAttr("data-"+"icon","check")]);
  __73=Tags();
  __75=Tags();
  __86=(op_MinusLess())(__73.NewTag("a",__74),(OfArray())([__75.text("Save")]));
  __85=function(arg10)
  {
   var __76;
   __76=Events();
   return __76.OnClick(function()
   {
    return function()
    {
     var __77,__78,__79,__80,__81,__82,__83,__84,translation1,translation2,word;
     __77=jQuery("#new-word-page #word");
     __78=__77.val();
     word=__102(__78);
     __79=jQuery("#new-word-page #word-translation1");
     __80=__79.val();
     translation1=__102(__80);
     __81=jQuery("#new-word-page #word-translation2");
     __82=__81.val();
     translation2=__102(__82);
     __83=word+translation1+translation2;
     alert(__83);
     __84=mobile();
     return __84.changePage("#main-page","pop",true,false);
    };
   },arg10);
  };
  __85(__86);
  __88=(op_MinusLess())(__50.Div(__51),(OfArray())([(op_MinusLess())(__53.NewTag("fieldset",__54),(OfArray())([(op_MinusLess())(__57.Div(__58),(OfArray())([(op_MinusLess())(__64.NewTag("a",__65),(OfArray())([__66.text("Cancel")]))])),(op_MinusLess())(__68.Div(__69),(OfArray())([__86]))]))]));
  __87=function(w)
  {
   return(OnAfterRender())(function()
   {
    var __81,__82,__83;
    __81=jQuery("#new-word-page");
    __82=function()
    {
     var __76,__77,__78,__79,__80;
     __78=jQuery("#new-word-page #word");
     __76=jQuery("#main-page #new-word");
     __77=__76.val();
     __79=__102(__77);
     __80=__78.val(__79);
     return __55(__80);
    };
    __83=__81.live("pageshow",__82);
    return __55(__83);
   },w);
  };
  __87(__88);
  content=(op_MinusLess())(__7.Div(__8),(OfArray())([(op_MinusLess())(__10.Div(__11),(OfArray())([(op_MinusLess())(__13.NewTag("label",__14),(OfArray())([__15.text("Word:")])),__21.NewTag("input",__22)])),(op_MinusLess())(__24.Div(__25),(OfArray())([(op_MinusLess())(__27.NewTag("label",__28),(OfArray())([__29.text("Translation #1:")])),__34.NewTag("input",__35)])),(op_MinusLess())(__37.Div(__38),(OfArray())([(op_MinusLess())(__40.NewTag("label",__41),(OfArray())([__42.text("Translation #2:")])),__47.NewTag("input",__48)])),__88]));
  __89=Attr();
  __91=(OfArray())([__89.NewAttr("data-"+"role","footer")]);
  __90=Tags();
  __92=Tags();
  __94=(OfArray())([__92.text("IntelliFactory.com")]);
  __93=Tags();
  (op_MinusLess())(__90.Div(__91),(OfArray())([__93.NewTag("h4",__94)]));
  __95=Attr_1();
  __96=Attr();
  __98=(OfArray())([__95.NewAttr("id","new-word-page"),__96.NewAttr("data-"+"role","page")]);
  __97=Tags();
  return(op_MinusLess())(__97.Div(__98),(OfArray())([header,content]));
 };
 (WordPages()).ViewWordPage=function()
 {
  var _,__1,__10,__11,__12,__13,__14,__15,__16,__18,__19,__2,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__44,__45,__46,__47,__48,__49,__5,__50,__51,__52,__53,__54,__6,__7,__8,__9,content,header;
  _=Attr();
  __2=(OfArray())([_.NewAttr("data-"+"role","header")]);
  __1=Tags();
  __3=Tags();
  __5=(OfArray())([__3.text("Word")]);
  __4=Tags();
  header=(op_MinusLess())(__1.Div(__2),(OfArray())([__4.NewTag("h1",__5)]));
  __6=Attr();
  __8=(OfArray())([__6.NewAttr("data-"+"role","content")]);
  __7=Tags();
  __9=Attr();
  __11=(OfArray())([__9.NewAttr("data-"+"role","fieldcontain")]);
  __10=Tags();
  __12=Attr_1();
  __14=(OfArray())([__12.NewAttr("style","text-align: center")]);
  __13=Tags();
  __15=Tags();
  __16=Attr();
  __19=(OfArray())([__16.NewAttr("data-"+"role","fieldcontain")]);
  __18=Tags();
  __20=Attr_1();
  __22=(OfArray())([__20.NewAttr("for","word-translation1")]);
  __21=Tags();
  __23=Tags();
  __24=Attr_1();
  __26=(OfArray())([__24.NewAttr("style","text-align: center")]);
  __25=Tags();
  __27=Tags();
  __28=Attr();
  __30=(OfArray())([__28.NewAttr("data-"+"role","fieldcontain")]);
  __29=Tags();
  __31=Attr_1();
  __33=(OfArray())([__31.NewAttr("for","word-translation2")]);
  __32=Tags();
  __34=Tags();
  __35=Attr_1();
  __37=(OfArray())([__35.NewAttr("style","text-align: center")]);
  __36=Tags();
  __38=Tags();
  __39=Attr();
  __40=Attr();
  __42=(OfArray())([__39.NewAttr("data-"+"role","button"),__40.NewAttr("data-"+"transition","pop")]);
  __41=Tags();
  __43=Attr_1();
  __44=Tags();
  content=(op_MinusLess())(__7.Div(__8),(OfArray())([(op_MinusLess())(__10.Div(__11),(OfArray())([(op_MinusLess())(__13.NewTag("h3",__14),(OfArray())([__15.text("Word")]))])),(op_MinusLess())(__18.Div(__19),(OfArray())([(op_MinusLess())(__21.NewTag("label",__22),(OfArray())([__23.text("Translation #1:")])),(op_MinusLess())(__25.NewTag("h4",__26),(OfArray())([__27.text("Translation1")]))])),(op_MinusLess())(__29.Div(__30),(OfArray())([(op_MinusLess())(__32.NewTag("label",__33),(OfArray())([__34.text("Translation #2:")])),(op_MinusLess())(__36.NewTag("h4",__37),(OfArray())([__38.text("Translation2")]))])),(op_MinusLess())(__41.NewTag("a",__42),(OfArray())([__43.NewAttr("href","#indexPage"),__44.text("Ok")]))]));
  __45=Attr();
  __47=(OfArray())([__45.NewAttr("data-"+"role","footer")]);
  __46=Tags();
  __48=Tags();
  __50=(OfArray())([__48.text("IntelliFactory.com")]);
  __49=Tags();
  (op_MinusLess())(__46.Div(__47),(OfArray())([__49.NewTag("h4",__50)]));
  __51=Attr_1();
  __52=Attr();
  __54=(OfArray())([__51.NewAttr("id","view-word-page"),__52.NewAttr("data-"+"role","page")]);
  __53=Tags();
  return(op_MinusLess())(__53.Div(__54),(OfArray())([header,content]));
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
  __3=(OfArray())([(JQueryMobile()).IndexPage(),(MainPage()).MainPage(),(WordPages()).MyWordsPage(),(TestPages()).TestMePage(),(TestPages()).TestPage(),(LoginPage_1())(),(OptionsPage()).OptionsPage(),(WordPages()).NewWordPage(),__1]);
  __2=Tags();
  return __2.Div(__3);
 };
 (JQueryMobile()).IndexPage=function()
 {
  return(LoginPage_1())();
 };
 (Client()).support=(Mobile_1()).WP7.EnableWP7Support();
}());
