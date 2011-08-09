(function()
{
 var global=this;
 var Append,ArrayModule,Char,CharEnumerator,Class,Compare,Comparison,Core,Create,Delay,Empty,EnumerateThenFinally,EnumerateWhile,Enumerator,Equality,Equals,Exists,Exists2,FSharpList_1,Fields,Fold,Force,Hash,HashCounter,Hashing,Initialize,InitializeInfinite,IsDigit,IsHighSurrogate,IsLetter,IsLowSurrogate,Iterate,IterateIndexed,LazyExtensions,ListModule,Map,Map2,Map_1,New,NewError,NewUnion,OfArray,OptionModule,Reduce,Runtime,RuntimeHelpers,SeqModule,StringModule,Tupled,__162,__163,__164,__165,__166,__2,__5,__8,abs,apply,checkLength,checkRange,fromCharCode,insufficient,nonEmpty,prototype;
 IntelliFactory.WebSharper.Runtime.Declare({String:{prototype:{}},IntelliFactory:{WebSharper:{Core:{StringUtil:{},StringModule:{},String:{},SeqModule:{},RuntimeHelpers:{},OptionModule:{},ListModule:{},LazyExtensions:{},Hashing:{},"FSharpList`1":{},Equality:{},Enumerator:{},DateTime:{},Comparison:{},CharEnumerator:{},Char:{},ArrayModule:{},Array:{}}}},Array:{prototype:{}}});
 Core=function()
 {
  return IntelliFactory.WebSharper.Core;
 };
 (function()
 {
  return IntelliFactory.WebSharper;
 });
 Class=function()
 {
  return IntelliFactory.WebSharper.Runtime.Class;
 };
 Runtime=function()
 {
  return IntelliFactory.WebSharper.Runtime;
 };
 Compare=function()
 {
  return IntelliFactory.WebSharper.Core.Comparison.Compare;
 };
 Comparison=function()
 {
  return IntelliFactory.WebSharper.Core.Comparison;
 };
 Equals=function()
 {
  return IntelliFactory.WebSharper.Core.Equality.Equals;
 };
 Equality=function()
 {
  return IntelliFactory.WebSharper.Core.Equality;
 };
 NewError=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewError;
 };
 CharEnumerator=function()
 {
  return IntelliFactory.WebSharper.Core.CharEnumerator;
 };
 New=function()
 {
  return IntelliFactory.WebSharper.Core.Enumerator.New;
 };
 Enumerator=function()
 {
  return IntelliFactory.WebSharper.Core.Enumerator;
 };
 Tupled=function()
 {
  return IntelliFactory.WebSharper.Runtime.Tupled;
 };
 __2=function()
 {
 };
 Char=function()
 {
  return IntelliFactory.WebSharper.Core.Char;
 };
 fromCharCode=function()
 {
  return String.fromCharCode;
 };
 apply=function()
 {
  return String.fromCharCode.apply;
 };
 __5=function(exn)
 {
  throw exn;
 };
 __8=function(x)
 {
  return x;
 };
 IsDigit=function()
 {
  return IntelliFactory.WebSharper.Core.Char.IsDigit;
 };
 IsHighSurrogate=function()
 {
  return IntelliFactory.WebSharper.Core.Char.IsHighSurrogate;
 };
 IsLetter=function()
 {
  return IntelliFactory.WebSharper.Core.Char.IsLetter;
 };
 IsLowSurrogate=function()
 {
  return IntelliFactory.WebSharper.Core.Char.IsLowSurrogate;
 };
 ArrayModule=function()
 {
  return IntelliFactory.WebSharper.Core.ArrayModule;
 };
 Hashing=function()
 {
  return IntelliFactory.WebSharper.Core.Hashing;
 };
 abs=function()
 {
  return Math.abs;
 };
 Iterate=function()
 {
  return IntelliFactory.WebSharper.Runtime.Iterate;
 };
 HashCounter=function()
 {
  return IntelliFactory.WebSharper.Core.Hashing.HashCounter;
 };
 Fields=function()
 {
  return IntelliFactory.WebSharper.Runtime.Fields;
 };
 Force=function()
 {
  return IntelliFactory.WebSharper.Core.LazyExtensions.Force;
 };
 LazyExtensions=function()
 {
  return IntelliFactory.WebSharper.Core.LazyExtensions;
 };
 Create=function()
 {
  return IntelliFactory.WebSharper.Core.LazyExtensions.Create;
 };
 prototype=function()
 {
  return Array.prototype;
 };
 Hash=function()
 {
  return IntelliFactory.WebSharper.Core.Hashing.Hash;
 };
 checkLength=function()
 {
  return IntelliFactory.WebSharper.Core.ArrayModule.checkLength;
 };
 checkRange=function()
 {
  return IntelliFactory.WebSharper.Core.ArrayModule.checkRange;
 };
 nonEmpty=function()
 {
  return IntelliFactory.WebSharper.Core.ArrayModule.nonEmpty;
 };
 SeqModule=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule;
 };
 Exists2=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Exists2;
 };
 ListModule=function()
 {
  return IntelliFactory.WebSharper.Core.ListModule;
 };
 NewUnion=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewUnion;
 };
 FSharpList_1=function()
 {
  return IntelliFactory.WebSharper.Core["FSharpList`1"];
 };
 OfArray=function()
 {
  return IntelliFactory.WebSharper.Core.ListModule.OfArray;
 };
 OptionModule=function()
 {
  return IntelliFactory.WebSharper.Core.OptionModule;
 };
 RuntimeHelpers=function()
 {
  return IntelliFactory.WebSharper.Core.RuntimeHelpers;
 };
 Map2=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Map2;
 };
 Delay=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Delay;
 };
 Append=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Append;
 };
 EnumerateWhile=function()
 {
  return IntelliFactory.WebSharper.Core.RuntimeHelpers.EnumerateWhile;
 };
 Empty=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Empty;
 };
 EnumerateThenFinally=function()
 {
  return IntelliFactory.WebSharper.Core.RuntimeHelpers.EnumerateThenFinally;
 };
 __162=function(getEnumerator)
 {
  return{GetEnumerator:getEnumerator};
 };
 __163=function(arg0)
 {
  return{$:1,$0:arg0};
 };
 Fold=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Fold;
 };
 __164=function(s)
 {
  return function(x)
  {
   return s+x;
  };
 };
 insufficient=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.insufficient;
 };
 Map=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Map;
 };
 Reduce=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Reduce;
 };
 InitializeInfinite=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.InitializeInfinite;
 };
 IterateIndexed=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.IterateIndexed;
 };
 Map_1=function()
 {
  return IntelliFactory.WebSharper.Core.ArrayModule.Map;
 };
 Exists=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Exists;
 };
 StringModule=function()
 {
  return IntelliFactory.WebSharper.Core.StringModule;
 };
 Initialize=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Initialize;
 };
 __165=function(s)
 {
  return IntelliFactory.WebSharper.Core.StringModule.join(s);
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.StringModule.join;
 });
 __166=function(s)
 {
  return s===null?"":s;
 };
 (Core()).String=(Class())(null,null,{CompareTo:function(s)
 {
  var _this=this;
  return(Compare())(_this,s);
 },GetEnumerator:function()
 {
  var _this=this;
  var _;
  if((Equals())(_this,null))
   {
    _=(NewError())("ArgumentNullException","string");
    throw _;
   }
  return new(CharEnumerator())(_this);
 }});
 (Core())["FSharpList`1"]=(Class())(null,null,{GetEnumerator:function()
 {
  var _this=this;
  return(New())({$:0},_this,function(e)
  {
   var _,matchValue,x,xs;
   matchValue=e.s;
   if(matchValue.$==0)
    {
     _=false;
    }
   else
    {
     xs=matchValue.$1;
     x=matchValue.$0;
     e.c=x;
     e.s=xs;
     _=true;
    }
   return _;
  });
 }});
 (Core()).DateTime=(Class())(function(epoch_1,kind_1)
 {
  var _this=this;
  return((Tupled())(function(tupledArg)
  {
   var _,__1,c,epoch,kind,matchValue;
   epoch=tupledArg[0];
   kind=tupledArg[1];
   matchValue={$:0};
   if(matchValue.$==1)
    {
     c=matchValue.$0;
     _=[];
     __1=void c.apply(_this,_);
    }
   __1;
   _this.epoch=epoch;
   _this.kind=kind;
  }))([epoch_1,kind_1]);
 },null,{GetHashCode:function()
 {
  var _this=this;
  return _this.epoch;
 },Equals:function(other)
 {
  var _this=this;
  return other.epoch==_this.epoch;
 }});
 (Core()).CharEnumerator=(Class())(function(s)
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
  _this.s=s;
  _this.pos=-1;
 },null,{get_Current:function()
 {
  var _this=this;
  return _this.current();
 },MoveNext:function()
 {
  var _this=this;
  return _this.moveNext();
 },Reset:function()
 {
  var _this=this;
  return _this.pos=-1;
 },Dispose:__2,current:function()
 {
  var _this=this;
  var _,__1,__3,__4;
  if(_this.pos<0)
   {
    _=(NewError())("InvalidOperationException","Enumeration not started");
    throw _;
   }
  else
   {
    if(_this.pos>=_this.s.length)
     {
      __1=(NewError())("InvalidOperationException","Enumeration ended");
      throw __1;
     }
   }
  __3=_this.s;
  __4=_this.pos;
  return __3.charCodeAt(__4);
 },moveNext:function()
 {
  var _this=this;
  var _;
  if(_this.pos<_this.s.length-1)
   {
    _this.pos=_this.pos+1;
    _=true;
   }
  else
   {
    _=false;
   }
  return _;
 }});
 (Core()).DateTime.GetItem=function(_this,key)
 {
  var _,__1,__3,__4,date,kind,pfx;
  kind=_this.kind;
  pfx="get"+((Equals())(kind,1)?"UTC":"");
  _=_this.epoch;
  date=new Date(_);
  __1=pfx+key;
  __4=[];
  __3=date[__1];
  return date[__1].apply.call(__3,date,__4);
 };
 (Char()).ConvertFromUtf32=function(n)
 {
  var _,__1,__3;
  __3=[n];
  _=fromCharCode();
  __1=[];
  return(apply()).call(_,undefined,__1.concat(__3));
 };
 (Char()).ConvertToUtf322=function(s,idx)
 {
  var _,__1,__3,__4,__6,__7;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __7=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __6=__5(__3);
     }
    else
     {
      __4=function(x)
      {
       return x.charCodeAt(idx);
      };
      __6=__4(s);
     }
    __7=__6;
   }
  return __7;
 };
 (Char()).GetNumericValue=function(c)
 {
  var _,__1;
  if(c>=48)
   {
    _=c<=57;
   }
  else
   {
    _=false;
   }
  if(_)
   {
    __1=__8(c);
   }
  else
   {
    __1=-1;
   }
  return __1;
 };
 (Char()).GetNumericValue2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(Char()).GetNumericValue(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).IsControl=function(c)
 {
  var _,__1,__3;
  if(c>=0)
   {
    _=c<=31;
   }
  else
   {
    _=false;
   }
  if(_)
   {
    __3=true;
   }
  else
   {
    if(c>=128)
     {
      __1=c<=159;
     }
    else
     {
      __1=false;
     }
    __3=__1;
   }
  return __3;
 };
 (Char()).IsControl2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(Char()).IsControl(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).IsDigit=function(c)
 {
  var _;
  if(c>=48)
   {
    _=c<=57;
   }
  else
   {
    _=false;
   }
  return _;
 };
 (Char()).IsDigit2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(IsDigit())(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).IsHighSurrogate=function(c)
 {
  var _;
  if(c>=55296)
   {
    _=c<=56319;
   }
  else
   {
    _=false;
   }
  return _;
 };
 (Char()).IsHighSurrogate2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(IsHighSurrogate())(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).IsLetter=function(c)
 {
  var _;
  if(c>=65)
   {
    _=c<=122;
   }
  else
   {
    _=false;
   }
  return _;
 };
 (Char()).IsLetter2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(IsLetter())(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).IsLetterOrDigit=function(c)
 {
  var _;
  if((IsLetter())(c))
   {
    _=true;
   }
  else
   {
    _=(IsDigit())(c);
   }
  return _;
 };
 (Char()).IsLetterOrDigit2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(Char()).IsLetterOrDigit(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).IsLower=function(c)
 {
  var _;
  if(c>=97)
   {
    _=true;
   }
  else
   {
    _=c>=122;
   }
  return _;
 };
 (Char()).IsLower2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(Char()).IsLower(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).IsLowSurrogate=function(c)
 {
  var _;
  if(c>=56320)
   {
    _=c<=57343;
   }
  else
   {
    _=false;
   }
  return _;
 };
 (Char()).IsLowSurrogate2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(IsLowSurrogate())(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).IsNumber=function(c)
 {
  var _;
  if(c>=48)
   {
    _=true;
   }
  else
   {
    _=c>=57;
   }
  return _;
 };
 (Char()).IsNumber2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(Char()).IsNumber(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).IsPunctuation=function(c)
 {
  var _,__1,__10,__100,__101,__102,__103,__104,__105,__106,__107,__108,__109,__11,__110,__111,__112,__113,__114,__115,__116,__117,__118,__119,__12,__120,__121,__122,__123,__124,__125,__126,__127,__128,__129,__13,__130,__131,__132,__133,__134,__135,__136,__137,__138,__139,__14,__140,__141,__142,__143,__144,__145,__146,__147,__148,__149,__15,__150,__151,__152,__153,__154,__155,__156,__157,__158,__159,__16,__160,__161,__17,__18,__19,__20,__21,__22,__23,__24,__25,__26,__27,__28,__29,__3,__30,__31,__32,__33,__34,__35,__36,__37,__38,__39,__4,__40,__41,__42,__43,__44,__45,__46,__47,__48,__49,__50,__51,__52,__53,__54,__55,__56,__57,__58,__59,__6,__60,__61,__62,__63,__64,__65,__66,__67,__68,__69,__7,__70,__71,__72,__73,__74,__75,__76,__77,__78,__79,__80,__81,__82,__83,__84,__85,__86,__87,__88,__89,__9,__90,__91,__92,__93,__94,__95,__96,__97,__98,__99;
  if(c===1548)
   {
    _=true;
   }
  else
   {
    _=c===1549;
   }
  if(_)
   {
    __1=true;
   }
  else
   {
    __1=c===1563;
   }
  if(__1)
   {
    __3=true;
   }
  else
   {
    __3=c===6468;
   }
  if(__3)
   {
    __4=true;
   }
  else
   {
    __4=c===6469;
   }
  if(__4)
   {
    __6=true;
   }
  else
   {
    __6=c===12336;
   }
  if(__6)
   {
    __7=true;
   }
  else
   {
    __7=c===1566;
   }
  if(__7)
   {
    __9=true;
   }
  else
   {
    __9=c===1567;
   }
  if(__9)
   {
    __10=true;
   }
  else
   {
    __10=c===6622;
   }
  if(__10)
   {
    __11=true;
   }
  else
   {
    __11=c===6623;
   }
  if(__11)
   {
    __12=true;
   }
  else
   {
    __12=c===12349;
   }
  if(__12)
   {
    __13=true;
   }
  else
   {
    __13=c===58;
   }
  if(__13)
   {
    __14=true;
   }
  else
   {
    __14=c===59;
   }
  if(__14)
   {
    __15=true;
   }
  else
   {
    __15=c===6686;
   }
  if(__15)
   {
    __16=true;
   }
  else
   {
    __16=c===6687;
   }
  if(__16)
   {
    __17=true;
   }
  else
   {
    __17=c===12448;
   }
  if(__17)
   {
    __18=true;
   }
  else
   {
    __18=c===63;
   }
  if(__18)
   {
    __19=true;
   }
  else
   {
    __19=c===64;
   }
  if(__19)
   {
    __20=true;
   }
  else
   {
    __20=c===1748;
   }
  if(__20)
   {
    __21=true;
   }
  else
   {
    __21=c===12539;
   }
  if(__21)
   {
    __22=true;
   }
  else
   {
    __22=c===95;
   }
  if(__22)
   {
    __23=true;
   }
  else
   {
    __23=c===64830;
   }
  if(__23)
   {
    __24=true;
   }
  else
   {
    __24=c===64831;
   }
  if(__24)
   {
    __25=true;
   }
  else
   {
    __25=c===123;
   }
  if(__25)
   {
    __26=true;
   }
  else
   {
    __26=c===2404;
   }
  if(__26)
   {
    __27=true;
   }
  else
   {
    __27=c===2405;
   }
  if(__27)
   {
    __28=true;
   }
  else
   {
    __28=c===125;
   }
  if(__28)
   {
    __29=true;
   }
  else
   {
    __29=c===2416;
   }
  if(__29)
   {
    __30=true;
   }
  else
   {
    __30=c===161;
   }
  if(__30)
   {
    __31=true;
   }
  else
   {
    __31=c===3572;
   }
  if(__31)
   {
    __32=true;
   }
  else
   {
    __32=c===8317;
   }
  if(__32)
   {
    __33=true;
   }
  else
   {
    __33=c===8318;
   }
  if(__33)
   {
    __34=true;
   }
  else
   {
    __34=c===171;
   }
  if(__34)
   {
    __35=true;
   }
  else
   {
    __35=c===8333;
   }
  if(__35)
   {
    __36=true;
   }
  else
   {
    __36=c===8334;
   }
  if(__36)
   {
    __37=true;
   }
  else
   {
    __37=c===65123;
   }
  if(__37)
   {
    __38=true;
   }
  else
   {
    __38=c===173;
   }
  if(__38)
   {
    __39=true;
   }
  else
   {
    __39=c===9001;
   }
  if(__39)
   {
    __40=true;
   }
  else
   {
    __40=c===9002;
   }
  if(__40)
   {
    __41=true;
   }
  else
   {
    __41=c===65128;
   }
  if(__41)
   {
    __42=true;
   }
  else
   {
    __42=c===183;
   }
  if(__42)
   {
    __43=true;
   }
  else
   {
    __43=c===65130;
   }
  if(__43)
   {
    __44=true;
   }
  else
   {
    __44=c===65131;
   }
  if(__44)
   {
    __45=true;
   }
  else
   {
    __45=c===187;
   }
  if(__45)
   {
    __46=true;
   }
  else
   {
    __46=c===3973;
   }
  if(__46)
   {
    __47=true;
   }
  else
   {
    __47=c===191;
   }
  if(__47)
   {
    __48=true;
   }
  else
   {
    __48=c===4048;
   }
  if(__48)
   {
    __49=true;
   }
  else
   {
    __49=c===4049;
   }
  if(__49)
   {
    __50=true;
   }
  else
   {
    __50=c===894;
   }
  if(__50)
   {
    __51=true;
   }
  else
   {
    __51=c===903;
   }
  if(__51)
   {
    __52=true;
   }
  else
   {
    __52=c===4347;
   }
  if(__52)
   {
    __53=true;
   }
  else
   {
    __53=c===65306;
   }
  if(__53)
   {
    __54=true;
   }
  else
   {
    __54=c===65307;
   }
  if(__54)
   {
    __55=true;
   }
  else
   {
    __55=c===10748;
   }
  if(__55)
   {
    __56=true;
   }
  else
   {
    __56=c===10749;
   }
  if(__56)
   {
    __57=true;
   }
  else
   {
    __57=c===65311;
   }
  if(__57)
   {
    __58=true;
   }
  else
   {
    __58=c===65312;
   }
  if(__58)
   {
    __59=true;
   }
  else
   {
    __59=c===1417;
   }
  if(__59)
   {
    __60=true;
   }
  else
   {
    __60=c===1418;
   }
  if(__60)
   {
    __61=true;
   }
  else
   {
    __61=c===5741;
   }
  if(__61)
   {
    __62=true;
   }
  else
   {
    __62=c===5742;
   }
  if(__62)
   {
    __63=true;
   }
  else
   {
    __63=c===1470;
   }
  if(__63)
   {
    __64=true;
   }
  else
   {
    __64=c===5787;
   }
  if(__64)
   {
    __65=true;
   }
  else
   {
    __65=c===5788;
   }
  if(__65)
   {
    __66=true;
   }
  else
   {
    __66=c===11518;
   }
  if(__66)
   {
    __67=true;
   }
  else
   {
    __67=c===11519;
   }
  if(__67)
   {
    __68=true;
   }
  else
   {
    __68=c===65343;
   }
  if(__68)
   {
    __69=true;
   }
  else
   {
    __69=c===1472;
   }
  if(__69)
   {
    __70=true;
   }
  else
   {
    __70=c===65371;
   }
  if(__70)
   {
    __71=true;
   }
  else
   {
    __71=c===1475;
   }
  if(__71)
   {
    __72=true;
   }
  else
   {
    __72=c===5941;
   }
  if(__72)
   {
    __73=true;
   }
  else
   {
    __73=c===5942;
   }
  if(__73)
   {
    __74=true;
   }
  else
   {
    __74=c===11804;
   }
  if(__74)
   {
    __75=true;
   }
  else
   {
    __75=c===11805;
   }
  if(__75)
   {
    __76=true;
   }
  else
   {
    __76=c===65373;
   }
  if(__76)
   {
    __77=true;
   }
  else
   {
    __77=c===1478;
   }
  if(__77)
   {
    __78=true;
   }
  else
   {
    __78=c===1523;
   }
  if(__78)
   {
    __79=true;
   }
  else
   {
    __79=c===1524;
   }
  if(__79)
   {
    __81=true;
   }
  else
   {
    if(c>=33)
     {
      __80=c<=35;
     }
    else
     {
      __80=false;
     }
    __81=__80;
   }
  if(__81)
   {
    __83=true;
   }
  else
   {
    if(c>=6144)
     {
      __82=c<=6154;
     }
    else
     {
      __82=false;
     }
    __83=__82;
   }
  if(__83)
   {
    __85=true;
   }
  else
   {
    if(c>=12308)
     {
      __84=c<=12319;
     }
    else
     {
      __84=false;
     }
    __85=__84;
   }
  if(__85)
   {
    __87=true;
   }
  else
   {
    if(c>=37)
     {
      __86=c<=42;
     }
    else
     {
      __86=false;
     }
    __87=__86;
   }
  if(__87)
   {
    __89=true;
   }
  else
   {
    if(c>=44)
     {
      __88=c<=47;
     }
    else
     {
      __88=false;
     }
    __89=__88;
   }
  if(__89)
   {
    __91=true;
   }
  else
   {
    if(c>=1642)
     {
      __90=c<=1645;
     }
    else
     {
      __90=false;
     }
    __91=__90;
   }
  if(__91)
   {
    __93=true;
   }
  else
   {
    if(c>=7002)
     {
      __92=c<=7008;
     }
    else
     {
      __92=false;
     }
    __93=__92;
   }
  if(__93)
   {
    __95=true;
   }
  else
   {
    if(c>=91)
     {
      __94=c<=93;
     }
    else
     {
      __94=false;
     }
    __95=__94;
   }
  if(__95)
   {
    __97=true;
   }
  else
   {
    if(c>=1792)
     {
      __96=c<=1805;
     }
    else
     {
      __96=false;
     }
    __97=__96;
   }
  if(__97)
   {
    __99=true;
   }
  else
   {
    if(c>=8208)
     {
      __98=c<=8231;
     }
    else
     {
      __98=false;
     }
    __99=__98;
   }
  if(__99)
   {
    __101=true;
   }
  else
   {
    if(c>=43124)
     {
      __100=c<=43127;
     }
    else
     {
      __100=false;
     }
    __101=__100;
   }
  if(__101)
   {
    __103=true;
   }
  else
   {
    if(c>=2039)
     {
      __102=c<=2041;
     }
    else
     {
      __102=false;
     }
    __103=__102;
   }
  if(__103)
   {
    __105=true;
   }
  else
   {
    if(c>=8240)
     {
      __104=c<=8259;
     }
    else
     {
      __104=false;
     }
    __105=__104;
   }
  if(__105)
   {
    __107=true;
   }
  else
   {
    if(c>=8261)
     {
      __106=c<=8273;
     }
    else
     {
      __106=false;
     }
    __107=__106;
   }
  if(__107)
   {
    __109=true;
   }
  else
   {
    if(c>=65040)
     {
      __108=c<=65049;
     }
    else
     {
      __108=false;
     }
    __109=__108;
   }
  if(__109)
   {
    __111=true;
   }
  else
   {
    if(c>=8275)
     {
      __110=c<=8286;
     }
    else
     {
      __110=false;
     }
    __111=__110;
   }
  if(__111)
   {
    __113=true;
   }
  else
   {
    if(c>=65072)
     {
      __112=c<=65106;
     }
    else
     {
      __112=false;
     }
    __113=__112;
   }
  if(__113)
   {
    __115=true;
   }
  else
   {
    if(c>=65108)
     {
      __114=c<=65121;
     }
    else
     {
      __114=false;
     }
    __115=__114;
   }
  if(__115)
   {
    __117=true;
   }
  else
   {
    if(c>=3663)
     {
      __116=c<=3675;
     }
    else
     {
      __116=false;
     }
    __117=__116;
   }
  if(__117)
   {
    __119=true;
   }
  else
   {
    if(c>=3844)
     {
      __118=c<=3858;
     }
    else
     {
      __118=false;
     }
    __119=__118;
   }
  if(__119)
   {
    __121=true;
   }
  else
   {
    if(c>=3898)
     {
      __120=c<=3901;
     }
    else
     {
      __120=false;
     }
    __121=__120;
   }
  if(__121)
   {
    __123=true;
   }
  else
   {
    if(c>=10088)
     {
      __122=c<=10101;
     }
    else
     {
      __122=false;
     }
    __123=__122;
   }
  if(__123)
   {
    __125=true;
   }
  else
   {
    if(c>=10181)
     {
      __124=c<=10182;
     }
    else
     {
      __124=false;
     }
    __125=__124;
   }
  if(__125)
   {
    __127=true;
   }
  else
   {
    if(c>=65281)
     {
      __126=c<=65283;
     }
    else
     {
      __126=false;
     }
    __127=__126;
   }
  if(__127)
   {
    __129=true;
   }
  else
   {
    if(c>=10214)
     {
      __128=c<=10219;
     }
    else
     {
      __128=false;
     }
    __129=__128;
   }
  if(__129)
   {
    __131=true;
   }
  else
   {
    if(c>=65285)
     {
      __130=c<=65290;
     }
    else
     {
      __130=false;
     }
    __131=__130;
   }
  if(__131)
   {
    __133=true;
   }
  else
   {
    if(c>=4170)
     {
      __132=c<=4175;
     }
    else
     {
      __132=false;
     }
    __133=__132;
   }
  if(__133)
   {
    __135=true;
   }
  else
   {
    if(c>=10627)
     {
      __134=c<=10648;
     }
    else
     {
      __134=false;
     }
    __135=__134;
   }
  if(__135)
   {
    __137=true;
   }
  else
   {
    if(c>=65292)
     {
      __136=c<=65295;
     }
    else
     {
      __136=false;
     }
    __137=__136;
   }
  if(__137)
   {
    __139=true;
   }
  else
   {
    if(c>=10712)
     {
      __138=c<=10715;
     }
    else
     {
      __138=false;
     }
    __139=__138;
   }
  if(__139)
   {
    __141=true;
   }
  else
   {
    if(c>=1370)
     {
      __140=c<=1375;
     }
    else
     {
      __140=false;
     }
    __141=__140;
   }
  if(__141)
   {
    __143=true;
   }
  else
   {
    if(c>=4961)
     {
      __142=c<=4968;
     }
    else
     {
      __142=false;
     }
    __143=__142;
   }
  if(__143)
   {
    __145=true;
   }
  else
   {
    if(c>=11513)
     {
      __144=c<=11516;
     }
    else
     {
      __144=false;
     }
    __145=__144;
   }
  if(__145)
   {
    __147=true;
   }
  else
   {
    if(c>=65339)
     {
      __146=c<=65341;
     }
    else
     {
      __146=false;
     }
    __147=__146;
   }
  if(__147)
   {
    __149=true;
   }
  else
   {
    if(c>=5867)
     {
      __148=c<=5869;
     }
    else
     {
      __148=false;
     }
    __149=__148;
   }
  if(__149)
   {
    __151=true;
   }
  else
   {
    if(c>=11776)
     {
      __150=c<=11799;
     }
    else
     {
      __150=false;
     }
    __151=__150;
   }
  if(__151)
   {
    __153=true;
   }
  else
   {
    if(c>=6100)
     {
      __152=c<=6102;
     }
    else
     {
      __152=false;
     }
    __153=__152;
   }
  if(__153)
   {
    __155=true;
   }
  else
   {
    if(c>=12289)
     {
      __154=c<=12291;
     }
    else
     {
      __154=false;
     }
    __155=__154;
   }
  if(__155)
   {
    __157=true;
   }
  else
   {
    if(c>=65375)
     {
      __156=c<=65381;
     }
    else
     {
      __156=false;
     }
    __157=__156;
   }
  if(__157)
   {
    __159=true;
   }
  else
   {
    if(c>=6104)
     {
      __158=c<=6106;
     }
    else
     {
      __158=false;
     }
    __159=__158;
   }
  if(__159)
   {
    __161=true;
   }
  else
   {
    if(c>=12296)
     {
      __160=c<=12305;
     }
    else
     {
      __160=false;
     }
    __161=__160;
   }
  return __161;
 };
 (Char()).IsPunctuation2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(Char()).IsPunctuation(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).IsSeparator=function(c)
 {
  var _,__1,__3,__4;
  __3=new RegExp("\\s");
  __1=__8(c);
  _=function(arg00)
  {
   return(Char()).ConvertFromUtf32(arg00);
  };
  __4=_(__1);
  return __3.test(__4);
 };
 (Char()).IsSeparator2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(Char()).IsSeparator(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).IsSurrogate=function(c)
 {
  var _;
  if(c>=55296)
   {
    _=c<=57343;
   }
  else
   {
    _=false;
   }
  return _;
 };
 (Char()).IsSurrogate2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(Char()).IsSurrogate(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).IsSurrogatePair=function(hs,ls)
 {
  var _;
  if((IsHighSurrogate())(hs))
   {
    _=(IsLowSurrogate())(ls);
   }
  else
   {
    _=false;
   }
  return _;
 };
 (Char()).IsSurrogatePair2=function(s,idx)
 {
  var _,__1,__10,__11,__12,__3,__4,__6,__7,__9,hs,ls;
  if(idx+1>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __12=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __11=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      hs=__8(__6);
      __7=idx+1;
      __9=s.charCodeAt(__7);
      __10=__8(__9);
      ls=__8(__10);
      __11=(Char()).IsSurrogatePair(hs,ls);
     }
    __12=__11;
   }
  return __12;
 };
 (Char()).IsUpper=function(c)
 {
  var _;
  if(c>=65)
   {
    _=true;
   }
  else
   {
    _=c>=90;
   }
  return _;
 };
 (Char()).IsUpper2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(Char()).IsUpper(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).IsWhiteSpace=function(c)
 {
  var _,__1,__10,__11,__12,__13,__14,__15,__16,__17,__18,__19,__20,__21,__22,__23,__24,__25,__26,__27,__3,__4,__6,__7,__9;
  if(c===32)
   {
    _=true;
   }
  else
   {
    _=c===5760;
   }
  if(_)
   {
    __1=true;
   }
  else
   {
    __1=c===6158;
   }
  if(__1)
   {
    __3=true;
   }
  else
   {
    __3=c===8192;
   }
  if(__3)
   {
    __4=true;
   }
  else
   {
    __4=c===8193;
   }
  if(__4)
   {
    __6=true;
   }
  else
   {
    __6=c===8194;
   }
  if(__6)
   {
    __7=true;
   }
  else
   {
    __7=c===8195;
   }
  if(__7)
   {
    __9=true;
   }
  else
   {
    __9=c===8196;
   }
  if(__9)
   {
    __10=true;
   }
  else
   {
    __10=c===8197;
   }
  if(__10)
   {
    __11=true;
   }
  else
   {
    __11=c===8198;
   }
  if(__11)
   {
    __12=true;
   }
  else
   {
    __12=c===8199;
   }
  if(__12)
   {
    __13=true;
   }
  else
   {
    __13=c===8200;
   }
  if(__13)
   {
    __14=true;
   }
  else
   {
    __14=c===8201;
   }
  if(__14)
   {
    __15=true;
   }
  else
   {
    __15=c===8202;
   }
  if(__15)
   {
    __16=true;
   }
  else
   {
    __16=c===8239;
   }
  if(__16)
   {
    __17=true;
   }
  else
   {
    __17=c===8287;
   }
  if(__17)
   {
    __18=true;
   }
  else
   {
    __18=c===12288;
   }
  if(__18)
   {
    __19=true;
   }
  else
   {
    __19=c===8232;
   }
  if(__19)
   {
    __20=true;
   }
  else
   {
    __20=c===8233;
   }
  if(__20)
   {
    __21=true;
   }
  else
   {
    __21=c===9;
   }
  if(__21)
   {
    __22=true;
   }
  else
   {
    __22=c===10;
   }
  if(__22)
   {
    __23=true;
   }
  else
   {
    __23=c===11;
   }
  if(__23)
   {
    __24=true;
   }
  else
   {
    __24=c===12;
   }
  if(__24)
   {
    __25=true;
   }
  else
   {
    __25=c===13;
   }
  if(__25)
   {
    __26=true;
   }
  else
   {
    __26=c===133;
   }
  if(__26)
   {
    __27=true;
   }
  else
   {
    __27=c===160;
   }
  return __27;
 };
 (Char()).IsWhiteSpace2=function(s,idx)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9;
  if(idx>=s.length)
   {
    _=true;
   }
  else
   {
    _=idx<0;
   }
  if(_)
   {
    __1=(NewError())("ArgumentOutOfRangeException","");
    __11=__5(__1);
   }
  else
   {
    if(s===null)
     {
      __3=(NewError())("ArgumentNullException","");
      __10=__5(__3);
     }
    else
     {
      __4=s.charCodeAt(idx);
      __6=__8(__4);
      __9=__8(__6);
      __7=function(arg00)
      {
       return(Char()).IsWhiteSpace(arg00);
      };
      __10=__7(__9);
     }
    __11=__10;
   }
  return __11;
 };
 (Char()).Parse=function(s)
 {
  var _,__1,__10,__6,__7,__9;
  if(s.length!==1)
   {
    _=(NewError())("FormatException","");
    __10=__5(_);
   }
  else
   {
    if(s===null)
     {
      __1=(NewError())("ArgumentNullException","");
      __9=__5(__1);
     }
    else
     {
      __7=__8(s);
      __6=function(x)
      {
       var __3,__4;
       __3=x.charCodeAt(0);
       __4=__8(__3);
       return __8(__4);
      };
      __9=__6(__7);
     }
    __10=__9;
   }
  return __10;
 };
 (Core()).Array.Reverse1=function(array,offset,length)
 {
  var b;
  b=(ArrayModule()).GetSubArray(array,offset,length);
  b.reverse();
  return function(count)
  {
   return(ArrayModule()).CopyTo(b,0,array,offset,count);
  };
 };
 (Hashing()).Hash=function(o)
 {
  var _,__1,__3,__4,__6,__7,__9,h,matchValue;
  if(o===null)
   {
    __9=0;
   }
  else
   {
    matchValue=typeof o;
    if(matchValue==="undefined")
     {
      __7=0;
     }
    else
     {
      if(matchValue==="boolean")
       {
        __6=o?1:0;
       }
      else
       {
        if(matchValue==="number")
         {
          __4=o;
         }
        else
         {
          if(matchValue==="string")
           {
            __3=(Hashing()).HashString(o);
           }
          else
           {
            if("GetHashCode"in o)
             {
              __1=o.GetHashCode();
             }
            else
             {
              if(o.hasOwnProperty("$hash"))
               {
                _=o.$hash;
               }
              else
               {
                h=(Hashing()).HashUnique();
                o.$hash=h;
                _=h;
               }
              __1=_;
             }
            __3=__1;
           }
          __4=__3;
         }
        __6=__4;
       }
      __7=__6;
     }
    __9=__7;
   }
  return __9;
 };
 (Hashing()).HashMix=function(x,y)
 {
  var _,__1;
  __1=(x<<5)+x+y;
  _=Math;
  return-(abs()).call(_,__1);
 };
 (Hashing()).HashString=function(s)
 {
  var __1,hash;
  hash=5381;
  (Iterate())(0,s.length-1,function(i)
  {
   var _;
   _=(hash<<5)+hash;
   hash=_+Number(s.charCodeAt(i));
  });
  __1=Math;
  return-(abs()).call(__1,hash);
 };
 (Hashing()).HashUnique=function()
 {
  (Hashing()).HashCounter=HashCounter()+1;
  return HashCounter();
 };
 (Hashing()).HashCounter=0;
 (Equality()).Equals=function(a,b)
 {
  var _,__1,__10,__11,__3,__4,__6,__7,__9,matchValue;
  if(a===b)
   {
    __11=true;
   }
  else
   {
    matchValue=typeof a;
    if(matchValue==="object")
     {
      if(a===null)
       {
        __9=false;
       }
      else
       {
        if(b===null)
         {
          __7=false;
         }
        else
         {
          if("Equals"in a)
           {
            __6=a.Equals(b);
           }
          else
           {
            _=Runtime();
            __3=(Fields()).call(_,a);
            __1=Runtime();
            __4=(Fields()).call(__1,b);
            __6=__3.Equals(__4);
           }
          __7=__6;
         }
        __9=__7;
       }
      __10=__9;
     }
    else
     {
      __10=false;
     }
    __11=__10;
   }
  return __11;
 };
 (Comparison()).Compare=function(a,b)
 {
  var _,__1,__10,__11,__12,__13,__14,__15,__16,__3,__4,__6,__7,__9,matchValue;
  if(a===b)
   {
    __16=0;
   }
  else
   {
    matchValue=typeof a;
    if(matchValue==="undefined")
     {
      __15=typeof b==="undefined"?0:-1;
     }
    else
     {
      if(matchValue==="function")
       {
        _=new Error("Cannot compare function values.");
        throw _;
       }
      else
       {
        if(matchValue==="boolean")
         {
          __13=a<b?-1:1;
         }
        else
         {
          if(matchValue==="number")
           {
            __12=a<b?-1:1;
           }
          else
           {
            if(matchValue==="string")
             {
              __11=a<b?-1:1;
             }
            else
             {
              if(a===null)
               {
                __10=-1;
               }
              else
               {
                if(b===null)
                 {
                  __9=1;
                 }
                else
                 {
                  if("CompareTo"in a)
                   {
                    __7=a.CompareTo(b);
                   }
                  else
                   {
                    __1=Runtime();
                    __4=(Fields()).call(__1,a);
                    __3=Runtime();
                    __6=(Fields()).call(__3,b);
                    __7=__4.CompareTo(__6);
                   }
                  __9=__7;
                 }
                __10=__9;
               }
              __11=__10;
             }
            __12=__11;
           }
          __13=__12;
         }
        __14=__13;
       }
      __15=__14;
     }
    __16=__15;
   }
  return __16;
 };
 (Enumerator()).New=function(dispose,state,next)
 {
  var dispose_1,disposed,e,e_1,e_2;
  disposed={contents:false};
  dispose_1=function()
  {
   var _,__1,d;
   if(!disposed.contents)
    {
     disposed.contents=true;
     if(dispose.$==0)
      ;
     else
      {
       d=dispose.$0;
       _=d(undefined);
      }
     __1=_;
    }
   return __1;
  };
  e=function()
  {
   var get_Current;
   get_Current=function()
   {
    return((Force())(e_1)).c;
   };
   return{s:state,c:undefined,MoveNext:function()
   {
    return next((Force())(e_1));
   },Dispose:dispose_1,get_Current:get_Current};
  };
  e_1=(Create())(e);
  e_2=(Force())(e_1);
  return e_2;
 };
 (prototype()).GetHashCode=function()
 {
  var obj=this;
  var h;
  h=-34948909;
  (Iterate())(0,obj.length-1,function(i)
  {
   h=(Hashing()).HashMix(h,(Hash())(obj[i]));
  });
  return h;
 };
 (prototype()).Equals=function(other)
 {
  var _this=this;
  var _,__1,__3,eq,i;
  if(_this instanceof Array)
   {
    _=_this.length===other.length;
   }
  else
   {
    _=false;
   }
  if(_)
   {
    eq=true;
    i=0;
    if(eq)
     {
      __1=i<_this.length;
     }
    else
     {
      __1=false;
     }
    while(__1)
     {
      if(!(Equals())(_this[i],other[i]))
       {
        eq=false;
       }
      i=i+1;
      if(eq)
       {
        __1=i<_this.length;
       }
      else
       {
        __1=false;
       }
     }
    __3=eq;
   }
  else
   {
    __3=false;
   }
  return __3;
 };
 (prototype()).CompareTo=function(other)
 {
  var _this=this;
  var _,__1,__3,cmp,i;
  if(_this.length<other.length)
   {
    __3=-1;
   }
  else
   {
    if(_this.length>other.length)
     {
      __1=1;
     }
    else
     {
      cmp=0;
      i=0;
      if(cmp===0)
       {
        _=i<_this.length;
       }
      else
       {
        _=false;
       }
      while(_)
       {
        cmp=(Compare())(_this[i],other[i]);
        i=i+1;
        if(cmp===0)
         {
          _=i<_this.length;
         }
        else
         {
          _=false;
         }
       }
      __1=cmp;
     }
    __3=__1;
   }
  return __3;
 };
 (prototype()).GetEnumerator=function()
 {
  var _this=this;
  var __1,__3;
  __1=function(next)
  {
   return(New())({$:0},-1,next);
  };
  __3=function(e)
  {
   var _;
   if(e.s+1<_this.length)
    {
     e.s=e.s+1;
     e.c=_this[e.s];
     _=true;
    }
   else
    {
     _=false;
    }
   return _;
  };
  return __1(__3);
 };
 (ArrayModule()).Zip3=function(arr1,arr2,arr3)
 {
  var _,res;
  (checkLength())(arr1,arr2);
  (checkLength())(arr2,arr3);
  _=arr1.length;
  res=Array(_);
  (Iterate())(0,arr1.length-1,function(i)
  {
   var __1;
   __1=[arr1[i],arr2[i],arr3[i]];
   return res[i]=__1;
  });
  return res;
 };
 (ArrayModule()).checkLength=function(arr1,arr2)
 {
  var _;
  if(arr1.length!==arr2.length)
   {
    _=new Error("Arrays differ in length.");
    throw _;
   }
 };
 (ArrayModule()).Zip=function(arr1,arr2)
 {
  var _,res;
  (checkLength())(arr1,arr2);
  _=arr1.length;
  res=Array(_);
  (Iterate())(0,arr1.length-1,function(i)
  {
   var __1;
   __1=[arr1[i],arr2[i]];
   return res[i]=__1;
  });
  return res;
 };
 (ArrayModule()).Unzip3=function(arr)
 {
  var x,y,z;
  x=[];
  y=[];
  z=[];
  (Iterate())(0,arr.length-1,function(i)
  {
   var a,b,c,matchValue;
   matchValue=arr[i];
   c=matchValue[2];
   b=matchValue[1];
   a=matchValue[0];
   x.push(a);
   y.push(b);
   return z.push(c);
  });
  return[x,y,z];
 };
 (ArrayModule()).Unzip=function(arr)
 {
  var x,y;
  x=[];
  y=[];
  (Iterate())(0,arr.length-1,function(i)
  {
   var a,b,patternInput;
   patternInput=arr[i];
   b=patternInput[1];
   a=patternInput[0];
   x.push(a);
   return y.push(b);
  });
  return[x,y];
 };
 (ArrayModule()).GetSubArray=function(arr,start,length)
 {
  (checkRange())(arr,start,length);
  return arr.slice(start,start+length);
 };
 (ArrayModule()).checkRange=function(arr,start,size)
 {
  var _,__1,__3,msg;
  if(size<0)
   {
    _=true;
   }
  else
   {
    _=start<0;
   }
  if(_)
   {
    __1=true;
   }
  else
   {
    __1=arr.length<start+size;
   }
  if(__1)
   {
    msg="size"+": "+"Index was outside the bounds of the array.";
    __3=(NewError())("ArgumentException",msg);
    throw __3;
   }
 };
 (ArrayModule()).SortWith=function(comparer,arr)
 {
  var _,f;
  f=(Tupled())(function(tupledArg)
  {
   var x,y;
   x=tupledArg[0];
   y=tupledArg[1];
   return(comparer(x))(y);
  });
  _=arr.slice(0,arr.length);
  return _.sort(f);
 };
 (ArrayModule()).SortInPlaceWith=function(comparer,arr)
 {
  var f;
  f=(Tupled())(function(tupledArg)
  {
   var x,y;
   x=tupledArg[0];
   y=tupledArg[1];
   return(comparer(x))(y);
  });
  return arr.sort(f);
 };
 (ArrayModule()).SortInPlaceBy=function(f,arr)
 {
  var f_1;
  f_1=(Tupled())(function(tupledArg)
  {
   var _,__1,x,y;
   x=tupledArg[0];
   y=tupledArg[1];
   _=f(x);
   __1=f(y);
   return(Compare())(_,__1);
  });
  return arr.sort(f_1);
 };
 (ArrayModule()).SortBy=function(f,arr)
 {
  var __3,f_1;
  f_1=(Tupled())(function(tupledArg)
  {
   var _,__1,x,y;
   x=tupledArg[0];
   y=tupledArg[1];
   _=f(x);
   __1=f(y);
   return(Compare())(_,__1);
  });
  __3=arr.slice(0,arr.length);
  return __3.sort(f_1);
 };
 (ArrayModule()).Set=function(arr,index,value)
 {
  return arr[index]=value;
 };
 (ArrayModule()).ScanBack=function(f,arr,zero)
 {
  var _,len,ret;
  len=arr.length;
  _=1+len;
  ret=Array(_);
  ret[len]=zero;
  (Iterate())(0,len-1,function(i)
  {
   var __1,__3;
   __1=len-i-1;
   __3=(f(arr[len-i-1]))(ret[len-i]);
   return ret[__1]=__3;
  });
  return ret;
 };
 (ArrayModule()).Scan=function(f,zero,arr)
 {
  var _,ret;
  _=1+arr.length;
  ret=Array(_);
  ret[0]=zero;
  (Iterate())(0,arr.length-1,function(i)
  {
   var __1,__3;
   __1=i+1;
   __3=(f(ret[i]))(arr[i]);
   return ret[__1]=__3;
  });
  return ret;
 };
 (ArrayModule()).ReduceBack=function(f,arr)
 {
  var acc,len;
  (nonEmpty())(arr);
  len=arr.length;
  acc=arr[len-1];
  (Iterate())(2,len,function(i)
  {
   acc=(f(arr[len-i]))(acc);
  });
  return acc;
 };
 (ArrayModule()).nonEmpty=function(arr)
 {
  var _,msg;
  if(arr.length===0)
   {
    msg="arr"+": "+"The input array was empty.";
    _=(NewError())("ArgumentException",msg);
    throw _;
   }
 };
 (ArrayModule()).Reduce=function(f,arr)
 {
  var acc;
  (nonEmpty())(arr);
  acc=arr[0];
  (Iterate())(1,arr.length-1,function(i)
  {
   acc=(f(acc))(arr[i]);
  });
  return acc;
 };
 (ArrayModule()).Permute=function(f,arr)
 {
  var ret;
  ret=arr.slice(0,arr.length);
  (Iterate())(0,arr.length-1,function(i)
  {
   var _,__1;
   _=f(i);
   __1=arr[i];
   return ret[_]=__1;
  });
  return ret;
 };
 (ArrayModule()).Partition=function(f,arr)
 {
  var ret1,ret2;
  ret1=[];
  ret2=[];
  (Iterate())(0,arr.length-1,function(i)
  {
   var _,__1,__3;
   if(f(arr[i]))
    {
     _=arr[i];
     __3=ret1.push(_);
    }
   else
    {
     __1=arr[i];
     __3=ret2.push(__1);
    }
   return __3;
  });
  return[ret1,ret2];
 };
 (ArrayModule()).OfSeq=function(xs)
 {
  var _,_1,_enum,q,x;
  q=[];
  _enum=xs.GetEnumerator();
  try
  {
   while(_enum.MoveNext())
    {
     _=_enum.get_Current();
     q.push(_);
    }
   _1=q;
  }
  finally
  {
   _enum.Dispose();
  }
  return _1;
 };
 (ArrayModule()).MapIndexed2=function(f,arr1,arr2)
 {
  var _,res;
  (checkLength())(arr1,arr2);
  _=arr1.length;
  res=Array(_);
  (Iterate())(0,arr1.length-1,function(i)
  {
   var __1;
   __1=((f(i))(arr1[i]))(arr2[i]);
   return res[i]=__1;
  });
  return res;
 };
 (ArrayModule()).MapIndexed=function(f,arr)
 {
  var _,y;
  _=arr.length;
  y=Array(_);
  (Iterate())(0,arr.length-1,function(i)
  {
   var __1;
   __1=(f(i))(arr[i]);
   return y[i]=__1;
  });
  return y;
 };
 (ArrayModule()).Map2=function(f,arr1,arr2)
 {
  var _,r;
  (checkLength())(arr1,arr2);
  _=arr2.length;
  r=Array(_);
  (Iterate())(0,arr2.length-1,function(i)
  {
   var __1;
   __1=(f(arr1[i]))(arr2[i]);
   return r[i]=__1;
  });
  return r;
 };
 (ArrayModule()).Map=function(f,arr)
 {
  var _,r;
  _=arr.length;
  r=Array(_);
  (Iterate())(0,arr.length-1,function(i)
  {
   var __1;
   __1=f(arr[i]);
   return r[i]=__1;
  });
  return r;
 };
 (ArrayModule()).IterateIndexed2=function(f,arr1,arr2)
 {
  (checkLength())(arr1,arr2);
  return(Iterate())(0,arr1.length-1,function(i)
  {
   return((f(i))(arr1[i]))(arr2[i]);
  });
 };
 (ArrayModule()).IterateIndexed=function(f,arr)
 {
  return(Iterate())(0,arr.length-1,function(i)
  {
   return(f(i))(arr[i]);
  });
 };
 (ArrayModule()).Iterate2=function(f,arr1,arr2)
 {
  (checkLength())(arr1,arr2);
  return(Iterate())(0,arr1.length-1,function(i)
  {
   return(f(arr1[i]))(arr2[i]);
  });
 };
 (ArrayModule()).Iterate=function(f,arr)
 {
  return(Iterate())(0,arr.length-1,function(i)
  {
   return f(arr[i]);
  });
 };
 (ArrayModule()).Initialize=function(size,f)
 {
  var _,msg,r;
  if(size<0)
   {
    msg="size"+": "+"Negative size given.";
    _=(NewError())("ArgumentException",msg);
    throw _;
   }
  r=Array(size);
  (Iterate())(0,size-1,function(i)
  {
   var __1;
   __1=f(i);
   return r[i]=__1;
  });
  return r;
 };
 (ArrayModule()).ForAll2=function(f,arr1,arr2)
 {
  (checkLength())(arr1,arr2);
  return(SeqModule()).ForAll2(f,arr1,arr2);
 };
 (ArrayModule()).FoldBack2=function(f,arr1,arr2,zero)
 {
  var accum,len;
  (checkLength())(arr1,arr2);
  len=arr1.length;
  accum=zero;
  (Iterate())(1,len,function(i)
  {
   accum=((f(arr1[len-i]))(arr2[len-i]))(accum);
  });
  return accum;
 };
 (ArrayModule()).FoldBack=function(f,arr,zero)
 {
  var acc,len;
  acc=zero;
  len=arr.length;
  (Iterate())(1,len,function(i)
  {
   acc=(f(arr[len-i]))(acc);
  });
  return acc;
 };
 (ArrayModule()).Fold2=function(f,zero,arr1,arr2)
 {
  var accum;
  (checkLength())(arr1,arr2);
  accum=zero;
  (Iterate())(0,arr1.length-1,function(i)
  {
   accum=((f(accum))(arr1[i]))(arr2[i]);
  });
  return accum;
 };
 (ArrayModule()).Fold=function(f,zero,arr)
 {
  var acc;
  acc=zero;
  (Iterate())(0,arr.length-1,function(i)
  {
   acc=(f(acc))(arr[i]);
  });
  return acc;
 };
 (ArrayModule()).Filter=function(f,arr)
 {
  var r;
  r=[];
  (Iterate())(0,arr.length-1,function(i)
  {
   var _,__1;
   if(f(arr[i]))
    {
     _=arr[i];
     __1=r.push(_);
    }
   return __1;
  });
  return r;
 };
 (ArrayModule()).Fill=function(arr,start,length,value)
 {
  (checkRange())(arr,start,length);
  return(Iterate())(start,start+length-1,function(i)
  {
   return arr[i]=value;
  });
 };
 (ArrayModule()).Exists2=function(f,arr1,arr2)
 {
  (checkLength())(arr1,arr2);
  return(Exists2())(f,arr1,arr2);
 };
 (ArrayModule()).Create=function(size,value)
 {
  var r;
  r=Array(size);
  (Iterate())(0,size-1,function(i)
  {
   return r[i]=value;
  });
  return r;
 };
 (ArrayModule()).Choose=function(f,arr)
 {
  var q;
  q=[];
  (Iterate())(0,arr.length-1,function(i)
  {
   var _,matchValue,x;
   matchValue=f(arr[i]);
   if(matchValue.$==0)
    ;
   else
    {
     x=matchValue.$0;
     _=q.push(x);
    }
   return _;
  });
  return q;
 };
 (ArrayModule()).CopyTo=function(arr1,start1,arr2,start2,length)
 {
  (checkRange())(arr1,start1,length);
  (checkRange())(arr2,start2,length);
  return(Iterate())(0,length-1,function(i)
  {
   var _,__1;
   _=start2+i;
   __1=arr1[start1+i];
   return arr2[_]=__1;
  });
 };
 (LazyExtensions()).Create=function(f)
 {
  var get,x;
  x={Value:undefined,Got:false,Get:f};
  get=function()
  {
   var _;
   if(x.Got)
    {
     _=x.Value;
    }
   else
    {
     x.Got=true;
     x.Value=f(undefined);
     _=x.Value;
    }
   return _;
  };
  x.Get=get;
  return x;
 };
 (LazyExtensions()).CreateFromValue=function(v)
 {
  var x;
  x={Value:v,Got:true,Get:function()
  {
   return v;
  }};
  x.Get=function()
  {
   return x.Value;
  };
  return x;
 };
 (LazyExtensions()).Force=function(x)
 {
  return x.Get(undefined);
 };
 (ListModule()).OfArray=function(arr)
 {
  var r;
  r=(NewUnion())(FSharpList_1(),0);
  (Iterate())(0,arr.length-1,function(i)
  {
   r=(NewUnion())(FSharpList_1(),1,arr[arr.length-i-1],r);
  });
  return r;
 };
 (ListModule()).OfSeq=function(s)
 {
  var _,e,r;
  r=[];
  e=s.GetEnumerator();
  while(e.MoveNext())
   {
    _=e.get_Current();
    r.unshift(_);
   }
  r.reverse();
  return(OfArray())(r);
 };
 (OptionModule()).Bind=function(f,x)
 {
  var _,x_1;
  if(x.$==0)
   {
    _={$:0};
   }
  else
   {
    x_1=x.$0;
    _=f(x_1);
   }
  return _;
 };
 (OptionModule()).Exists=function(p,x)
 {
  var _,x_1;
  if(x.$==0)
   {
    _=false;
   }
  else
   {
    x_1=x.$0;
    _=p(x_1);
   }
  return _;
 };
 (OptionModule()).Fold=function(f,s,x)
 {
  var _,x_1;
  if(x.$==0)
   {
    _=s;
   }
  else
   {
    x_1=x.$0;
    _=(f(s))(x_1);
   }
  return _;
 };
 (OptionModule()).FoldBack=function(f,x,s)
 {
  var _,x_1;
  if(x.$==0)
   {
    _=s;
   }
  else
   {
    x_1=x.$0;
    _=(f(x_1))(s);
   }
  return _;
 };
 (OptionModule()).ForAll=function(p,x)
 {
  var _,x_1;
  if(x.$==0)
   {
    _=true;
   }
  else
   {
    x_1=x.$0;
    _=p(x_1);
   }
  return _;
 };
 (OptionModule()).Iterate=function(p,x)
 {
  var _,x_1;
  if(x.$==0)
   ;
  else
   {
    x_1=x.$0;
    _=p(x_1);
   }
  return _;
 };
 (OptionModule()).Map=function(f,x)
 {
  var _,x_1;
  if(x.$==0)
   {
    _={$:0};
   }
  else
   {
    x_1=x.$0;
    _={$:1,$0:f(x_1)};
   }
  return _;
 };
 (OptionModule()).ToArray=function(x)
 {
  var _,x_1;
  if(x.$==0)
   {
    _=[];
   }
  else
   {
    x_1=x.$0;
    _=[x_1];
   }
  return _;
 };
 (OptionModule()).ToList=function(x)
 {
  var _,x_1;
  if(x.$==0)
   {
    _=(NewUnion())(FSharpList_1(),0);
   }
  else
   {
    x_1=x.$0;
    _=(OfArray())([x_1]);
   }
  return _;
 };
 (RuntimeHelpers()).EnumerateWhile=function(f,s)
 {
  var __4;
  __4=function()
  {
   var d,e_1,e_2,e_3,next;
   next=function(en)
   {
    var _,__1,__3,e,matchValue;
    matchValue=en.s;
    if(matchValue.$==1)
     {
      e=matchValue.$0;
      if(e.MoveNext())
       {
        en.c=e.get_Current();
        _=true;
       }
      else
       {
        e.Dispose();
        en.s={$:0};
        _=next(en);
       }
      __3=_;
     }
    else
     {
      if(f(undefined))
       {
        en.s={$:1,$0:s.GetEnumerator()};
        __1=next(en);
       }
      else
       {
        __1=false;
       }
      __3=__1;
     }
    return __3;
   };
   e_1=function()
   {
    return(New())({$:1,$0:d},{$:0},next);
   };
   e_2=(Create())(e_1);
   d=function()
   {
    var _,matchValue,x;
    matchValue=((Force())(e_2)).s;
    if(matchValue.$==0)
     ;
    else
     {
      x=matchValue.$0;
      _=x.Dispose();
     }
    return _;
   };
   e_3=(Force())(e_2);
   return e_3;
  };
  return{GetEnumerator:__4};
 };
 (RuntimeHelpers()).EnumerateThenFinally=function(s,f)
 {
  var __1;
  __1=function()
  {
   var d,e;
   e=s.GetEnumerator();
   d=function()
   {
    e.Dispose();
    return f(undefined);
   };
   return(New())({$:1,$0:d},undefined,function(en)
   {
    var _;
    if(e.MoveNext())
     {
      en.c=e.get_Current();
      _=true;
     }
    else
     {
      _=false;
     }
    return _;
   });
  };
  return{GetEnumerator:__1};
 };
 (SeqModule()).Zip3=function(s1,s2,s3)
 {
  return(Map2())(function(x)
  {
   return(Tupled())(function(tupledArg)
   {
    var y,z;
    y=tupledArg[0];
    z=tupledArg[1];
    return[x,y,z];
   });
  },s1,(SeqModule()).Zip(s2,s3));
 };
 (SeqModule()).Zip=function(s1,s2)
 {
  return(Map2())(function(x)
  {
   return function(y)
   {
    return[x,y];
   };
  },s1,s2);
 };
 (SeqModule()).Windowed=function(windowSize,s)
 {
  var _,msg;
  if(windowSize<=0)
   {
    msg="windowSize"+": "+"The input must be non-negative.";
    _=(NewError())("ArgumentException",msg);
    throw _;
   }
  return(Delay())(function()
  {
   var __3,__4;
   __4=s.GetEnumerator();
   __3=function(e)
   {
    var q;
    q=[];
    return(Append())((EnumerateWhile())(function()
    {
     var __1;
     if(q.length<windowSize)
      {
       __1=e.MoveNext();
      }
     else
      {
       __1=false;
      }
     return __1;
    },(Delay())(function()
    {
     var __1;
     __1=e.get_Current();
     q.push(__1);
     return(Empty())();
    })),(Delay())(function()
    {
     return(Append())([q],(Delay())(function()
     {
      return(EnumerateWhile())(function()
      {
       return e.MoveNext();
      },(Delay())(function()
      {
       var __1;
       void q.shift();
       __1=e.get_Current();
       q.push(__1);
       return[q];
      }));
     }));
    }));
   };
   return(EnumerateThenFinally())(__3(__4),function()
   {
    return __4.Dispose();
   });
  });
 };
 (SeqModule()).Unfold=function(f,s)
 {
  var __4;
  __4=function()
  {
   var __1,__3;
   __1=function(next)
   {
    return(New())({$:0},s,next);
   };
   __3=function(e)
   {
    var _,matchValue,s_1,t;
    matchValue=f(e.s);
    if(matchValue.$==0)
     {
      _=false;
     }
    else
     {
      t=matchValue.$0[0];
      s_1=matchValue.$0[1];
      e.c=t;
      e.s=s_1;
      _=true;
     }
    return _;
   };
   return __1(__3);
  };
  return __162(__4);
 };
 (SeqModule()).TryPick=function(f,s)
 {
  var _,_1,e,r,x;
  e=s.GetEnumerator();
  try
  {
   r={$:0};
   if((Equals())(r,{$:0}))
    {
     _=e.MoveNext();
    }
   else
    {
     _=false;
    }
   while(_)
    {
     r=f(e.get_Current());
     if((Equals())(r,{$:0}))
      {
       _=e.MoveNext();
      }
     else
      {
       _=false;
      }
    }
   _1=r;
  }
  finally
  {
   e.Dispose();
  }
  return _1;
 };
 (SeqModule()).TryFindIndex=function(ok,s)
 {
  var _,_1,__1,e,i,loop,x,x_1;
  e=s.GetEnumerator();
  try
  {
   loop=true;
   i=0;
   if(loop)
    {
     _=e.MoveNext();
    }
   else
    {
     _=false;
    }
   while(_)
    {
     x=e.get_Current();
     if(ok(x))
      {
       loop=false;
      }
     else
      {
       i=i+1;
      }
     if(loop)
      {
       _=e.MoveNext();
      }
     else
      {
       _=false;
      }
    }
   if(loop)
    {
     __1={$:0};
    }
   else
    {
     __1={$:1,$0:i};
    }
   _1=__1;
  }
  finally
  {
   e.Dispose();
  }
  return _1;
 };
 (SeqModule()).TryFind=function(ok,s)
 {
  var _,_1,e,r,x,x_1;
  e=s.GetEnumerator();
  try
  {
   r={$:0};
   if(r.$==0)
    {
     _=e.MoveNext();
    }
   else
    {
     _=false;
    }
   while(_)
    {
     x=e.get_Current();
     if(ok(x))
      {
       r={$:1,$0:x};
      }
     if(r.$==0)
      {
       _=e.MoveNext();
      }
     else
      {
       _=false;
      }
    }
   _1=r;
  }
  finally
  {
   e.Dispose();
  }
  return _1;
 };
 (SeqModule()).Truncate=function(n,s)
 {
  return(Delay())(function()
  {
   var __3,__4;
   __4=s.GetEnumerator();
   __3=function(e)
   {
    var i;
    i={contents:0};
    return(EnumerateWhile())(function()
    {
     var _;
     if(e.MoveNext())
      {
       _=i.contents<n;
      }
     else
      {
       _=false;
      }
     return _;
    },(Delay())(function()
    {
     var _,__1;
     _=i.contents+1;
     i.contents=_;
     __1=e.get_Current();
     return[__1];
    }));
   };
   return(EnumerateThenFinally())(__3(__4),function()
   {
    return __4.Dispose();
   });
  });
 };
 (SeqModule()).ToArray=function(s)
 {
  var _,e,enumerator,q,x;
  q=[];
  enumerator=s.GetEnumerator();
  try
  {
   while(enumerator.MoveNext())
    {
     e=enumerator.get_Current();
     q.push(e);
    }
  }
  finally
  {
   enumerator.Dispose();
  }
  _;
  return q;
 };
 (SeqModule()).TakeWhile=function(f,s)
 {
  return(Delay())(function()
  {
   var __1,__3;
   __3=s.GetEnumerator();
   __1=function(e)
   {
    return(EnumerateWhile())(function()
    {
     var _;
     if(e.MoveNext())
      {
       _=f(e.get_Current());
      }
     else
      {
       _=false;
      }
     return _;
    },(Delay())(function()
    {
     var _;
     _=e.get_Current();
     return[_];
    }));
   };
   return(EnumerateThenFinally())(__1(__3),function()
   {
    return __3.Dispose();
   });
  });
 };
 (SeqModule()).Take=function(n,s)
 {
  var __4;
  __4=function()
  {
   var _,e;
   e=s.GetEnumerator();
   _=function()
   {
    return e.Dispose();
   };
   return(New())(__163(_),0,function(_enum)
   {
    var __1,__3;
    if(_enum.s>=n)
     {
      __3=false;
     }
    else
     {
      if(e.MoveNext())
       {
        _enum.s=_enum.s+1;
        _enum.c=e.get_Current();
        __1=true;
       }
      else
       {
        e.Dispose();
        _enum.s=n;
        __1=false;
       }
      __3=__1;
     }
    return __3;
   });
  };
  return{GetEnumerator:__4};
 };
 (SeqModule()).SumBy=function(f,s_1)
 {
  return(Fold())(function(s)
  {
   return function(x)
   {
    return s+f(x);
   };
  },0,s_1);
 };
 (SeqModule()).Sum=function(s)
 {
  return(Fold())(__164,0,s);
 };
 (SeqModule()).SortBy=function(f,s)
 {
  return(Delay())(function()
  {
   var array;
   array=(ArrayModule()).OfSeq(s);
   (ArrayModule()).SortInPlaceBy(f,array);
   return array;
  });
 };
 (SeqModule()).Sort=function(s)
 {
  return(SeqModule()).SortBy(__8,s);
 };
 (SeqModule()).SkipWhile=function(f,s)
 {
  var __1;
  __1=function()
  {
   var _,e;
   e=s.GetEnumerator();
   if(e.MoveNext())
    {
     _=f(e.get_Current());
    }
   else
    {
     _=false;
    }
   while(_)
    {
     __2();
     if(e.MoveNext())
      {
       _=f(e.get_Current());
      }
     else
      {
       _=false;
      }
    }
   return e;
  };
  return{GetEnumerator:__1};
 };
 (SeqModule()).Skip=function(n,s)
 {
  var __1;
  __1=function()
  {
   var e;
   e=s.GetEnumerator();
   (Iterate())(1,n,function()
   {
    var _;
    if(!e.MoveNext())
     {
      _=(insufficient())();
     }
    return _;
   });
   return e;
  };
  return{GetEnumerator:__1};
 };
 (SeqModule()).insufficient=function()
 {
  var _;
  _=new Error("The input sequence has an insufficient number of elements.");
  throw _;
 };
 (SeqModule()).Scan=function(f,x,s)
 {
  var __6;
  __6=function()
  {
   var __3,__4,en;
   en=s.GetEnumerator();
   __3=function(next)
   {
    var _;
    _=function()
    {
     return en.Dispose();
    };
    return(New())(__163(_),false,next);
   };
   __4=function(e)
   {
    var _,__1;
    if(e.s)
     {
      if(en.MoveNext())
       {
        e.c=(f(e.c))(en.get_Current());
        _=true;
       }
      else
       {
        _=false;
       }
      __1=_;
     }
    else
     {
      e.c=x;
      e.s=true;
      __1=true;
     }
    return __1;
   };
   return __3(__4);
  };
  return __162(__6);
 };
 (SeqModule()).Reduce=function(f,source)
 {
  var _,_1,e,msg,r,x;
  e=source.GetEnumerator();
  try
  {
   if(!e.MoveNext())
    {
     msg="source"+": "+"The input sequence was empty";
     _=(NewError())("ArgumentException",msg);
     throw _;
    }
   r=e.get_Current();
   while(e.MoveNext())
    {
     r=(f(r))(e.get_Current());
    }
   _1=r;
  }
  finally
  {
   e.Dispose();
  }
  return _1;
 };
 (SeqModule()).ReadOnly=function(s)
 {
  var _;
  _=function()
  {
   return s.GetEnumerator();
  };
  return{GetEnumerator:_};
 };
 (SeqModule()).Pick=function(p,s)
 {
  var _,__1,matchValue;
  matchValue=(SeqModule()).TryPick(p,s);
  if(matchValue.$==0)
   {
    _=new Error("KeyNotFoundException");
    throw _;
   }
  else
   {
    __1=matchValue.$0;
   }
  return __1;
 };
 (SeqModule()).Pairwise=function(s)
 {
  var _,__1;
  __1=(SeqModule()).Windowed(2,s);
  _=function(source)
  {
   return(Map())(function(x)
   {
    return[x[0],x[1]];
   },source);
  };
  return _(__1);
 };
 (SeqModule()).Get=function(index,s)
 {
  var _,_1,__1,e,msg,pos,x;
  if(index<0)
   {
    msg="index"+": "+"negative index requested";
    _=(NewError())("ArgumentException",msg);
    throw _;
   }
  pos=-1;
  e=s.GetEnumerator();
  try
  {
   while(pos<index)
    {
     if(!e.MoveNext())
      {
       __1=(insufficient())();
      }
     __1;
     pos=pos+1;
    }
   _1=e.get_Current();
  }
  finally
  {
   e.Dispose();
  }
  return _1;
 };
 (SeqModule()).Min=function(s)
 {
  return(Reduce())(function(x)
  {
   return function(y)
   {
    return(Compare())(x,y)<1?x:y;
   };
  },s);
 };
 (SeqModule()).Max=function(s)
 {
  return(Reduce())(function(x)
  {
   return function(y)
   {
    return(Compare())(x,y)>-1?x:y;
   };
  },s);
 };
 (SeqModule()).MinBy=function(f,s)
 {
  return(Reduce())(function(x)
  {
   return function(y)
   {
    return(Compare())(f(x),f(y))<1?x:y;
   };
  },s);
 };
 (SeqModule()).MaxBy=function(f,s)
 {
  return(Reduce())(function(x)
  {
   return function(y)
   {
    return(Compare())(f(x),f(y))>-1?x:y;
   };
  },s);
 };
 (SeqModule()).Map2=function(f,s1,s2)
 {
  var __6;
  __6=function()
  {
   var __3,__4,d,e1,e2;
   e1=s1.GetEnumerator();
   e2=s2.GetEnumerator();
   d=function()
   {
    e1.Dispose();
    return e2.Dispose();
   };
   __3=function(next)
   {
    return(New())({$:1,$0:d},undefined,next);
   };
   __4=function(e)
   {
    var _,__1;
    if(e1.MoveNext())
     {
      _=e2.MoveNext();
     }
    else
     {
      _=false;
     }
    if(_)
     {
      e.c=(f(e1.get_Current()))(e2.get_Current());
      __1=true;
     }
    else
     {
      __1=false;
     }
    return __1;
   };
   return __3(__4);
  };
  return __162(__6);
 };
 (SeqModule()).MapIndexed=function(f,s)
 {
  return(Map2())(f,(InitializeInfinite())(__8),s);
 };
 (SeqModule()).Map=function(f,s)
 {
  var __4;
  __4=function()
  {
   var __1,__3,en;
   en=s.GetEnumerator();
   __1=function(next)
   {
    return(New())({$:1,$0:function()
    {
     return en.Dispose();
    }},undefined,next);
   };
   __3=function(e)
   {
    var _;
    if(en.MoveNext())
     {
      e.c=f(en.get_Current());
      _=true;
     }
    else
     {
      _=false;
     }
    return _;
   };
   return __1(__3);
  };
  return __162(__4);
 };
 (SeqModule()).Length=function(s)
 {
  var _,e,i,x;
  i=0;
  e=s.GetEnumerator();
  try
  {
   while(e.MoveNext())
    {
     i=i+1;
    }
   _=i;
  }
  finally
  {
   e.Dispose();
  }
  return _;
 };
 (SeqModule()).IterateIndexed=function(p,s)
 {
  var _,e,i,x;
  i=0;
  e=s.GetEnumerator();
  try
  {
   while(e.MoveNext())
    {
     (p(i))(e.get_Current());
     i=i+1;
    }
  }
  finally
  {
   e.Dispose();
  }
  return _;
 };
 (SeqModule()).Iterate2=function(p,s1,s2)
 {
  var _,_1,_2,e1,e2,x,x_1;
  e1=s1.GetEnumerator();
  try
  {
   e2=s2.GetEnumerator();
   try
   {
    if(e1.MoveNext())
     {
      _=e2.MoveNext();
     }
    else
     {
      _=false;
     }
    while(_)
     {
      (p(e1.get_Current()))(e2.get_Current());
      if(e1.MoveNext())
       {
        _=e2.MoveNext();
       }
      else
       {
        _=false;
       }
     }
   }
   finally
   {
    e2.Dispose();
   }
   _2=_1;
  }
  finally
  {
   e1.Dispose();
  }
  return _2;
 };
 (SeqModule()).Iterate=function(p,s)
 {
  return(IterateIndexed())(function()
  {
   return function(x)
   {
    return p(x);
   };
  },s);
 };
 (SeqModule()).IsEmpty=function(s)
 {
  var _,e,x;
  e=s.GetEnumerator();
  try
  {
   _=!e.MoveNext();
  }
  finally
  {
   e.Dispose();
  }
  return _;
 };
 (SeqModule()).InitializeInfinite=function(f)
 {
  var __3;
  __3=function()
  {
   var _,__1;
   _=function(next)
   {
    return(New())({$:0},0,next);
   };
   __1=function(e)
   {
    e.c=f(e.s);
    e.s=e.s+1;
    return true;
   };
   return _(__1);
  };
  return __162(__3);
 };
 (SeqModule()).Initialize=function(n,f)
 {
  return(SeqModule()).Take(n,(InitializeInfinite())(f));
 };
 (SeqModule()).Head=function(s)
 {
  var _,_1,e,x;
  e=s.GetEnumerator();
  try
  {
   if(e.MoveNext())
    {
     _=e.get_Current();
    }
   else
    {
     _=(insufficient())();
    }
   _1=_;
  }
  finally
  {
   e.Dispose();
  }
  return _1;
 };
 (SeqModule()).GroupBy=function(f,s)
 {
  return(Delay())(function()
  {
   var _,_1,__1,__3,__4,__6,c,d,d1,e,h,k,keys,x;
   d={};
   d1={};
   keys=[];
   e=s.GetEnumerator();
   try
   {
    while(e.MoveNext())
     {
      c=e.get_Current();
      k=f(c);
      h=(Hash())(k);
      if(!d1.hasOwnProperty(h))
       {
        _=keys.push(k);
       }
      _;
      d1[h]=k;
      if(d.hasOwnProperty(h))
       {
        __1=d[h];
        __4=__1.push(c);
       }
      else
       {
        __3=[c];
        __4=d[h]=__3;
       }
      __4;
     }
    __6=function(array)
    {
     return(Map_1())(function(k_1)
     {
      return[k_1,d[(Hash())(k_1)]];
     },array);
    };
    _1=__6(keys);
   }
   finally
   {
    e.Dispose();
   }
   return _1;
  });
 };
 (SeqModule()).ForAll2=function(p,s1,s2)
 {
  return!(Exists2())(function(x)
  {
   return function(y)
   {
    return!(p(x))(y);
   };
  },s1,s2);
 };
 (SeqModule()).ForAll=function(p,s)
 {
  return!(Exists())(function(x)
  {
   return!p(x);
  },s);
 };
 (SeqModule()).Fold=function(f,x,s)
 {
  var _,e,r,x_1;
  r=x;
  e=s.GetEnumerator();
  try
  {
   while(e.MoveNext())
    {
     r=(f(r))(e.get_Current());
    }
   _=r;
  }
  finally
  {
   e.Dispose();
  }
  return _;
 };
 (SeqModule()).FindIndex=function(p,s)
 {
  var _,__1,matchValue;
  matchValue=(SeqModule()).TryFindIndex(p,s);
  if(matchValue.$==0)
   {
    _=(NewError())("KeyNotFoundException","");
    throw _;
   }
  else
   {
    __1=matchValue.$0;
   }
  return __1;
 };
 (SeqModule()).Find=function(p,s)
 {
  var _,__1,matchValue;
  matchValue=(SeqModule()).TryFind(p,s);
  if(matchValue.$==0)
   {
    _=(NewError())("KeyNotFoundException","");
    throw _;
   }
  else
   {
    __1=matchValue.$0;
   }
  return __1;
 };
 (SeqModule()).Filter=function(f,s)
 {
  var __3;
  __3=function()
  {
   var _,__1,_enum;
   _enum=s.GetEnumerator();
   _=function(next)
   {
    return(New())({$:1,$0:function()
    {
     return _enum.Dispose();
    }},undefined,next);
   };
   __1=function(e)
   {
    var c,loop,res;
    loop=_enum.MoveNext();
    c=_enum.get_Current();
    res=false;
    while(loop)
     {
      if(f(c))
       {
        e.c=c;
        res=true;
        loop=false;
       }
      else
       {
        if(_enum.MoveNext())
         {
          c=_enum.get_Current();
         }
        else
         {
          loop=false;
         }
       }
     }
    return res;
   };
   return _(__1);
  };
  return __162(__3);
 };
 (SeqModule()).Exists2=function(p,s1,s2)
 {
  var _,_1,_2,__1,e1,e2,r,x,x_1;
  e1=s1.GetEnumerator();
  try
  {
   e2=s2.GetEnumerator();
   try
   {
    r=false;
    if(!r)
     {
      _=e1.MoveNext();
     }
    else
     {
      _=false;
     }
    if(_)
     {
      __1=e2.MoveNext();
     }
    else
     {
      __1=false;
     }
    while(__1)
     {
      r=(p(e1.get_Current()))(e2.get_Current());
      if(!r)
       {
        _=e1.MoveNext();
       }
      else
       {
        _=false;
       }
      if(_)
       {
        __1=e2.MoveNext();
       }
      else
       {
        __1=false;
       }
     }
    _1=r;
   }
   finally
   {
    e2.Dispose();
   }
   _2=_1;
  }
  finally
  {
   e1.Dispose();
  }
  return _2;
 };
 (SeqModule()).Exists=function(p,s)
 {
  var _,_1,e,r,x;
  e=s.GetEnumerator();
  try
  {
   r=false;
   if(!r)
    {
     _=e.MoveNext();
    }
   else
    {
     _=false;
    }
   while(_)
    {
     r=p(e.get_Current());
     if(!r)
      {
       _=e.MoveNext();
      }
     else
      {
       _=false;
      }
    }
   _1=r;
  }
  finally
  {
   e.Dispose();
  }
  return _1;
 };
 (SeqModule()).Empty=function()
 {
  var _;
  _=function()
  {
   return(New())({$:0},undefined,function()
   {
    return false;
   });
  };
  return{GetEnumerator:_};
 };
 (SeqModule()).DistinctBy=function(f,s)
 {
  var __10;
  __10=function()
  {
   var __7,__9,_enum,dispose,seen;
   _enum=s.GetEnumerator();
   seen={};
   dispose=function()
   {
    return _enum.Dispose();
   };
   __7=function(next)
   {
    return(New())({$:1,$0:dispose},undefined,next);
   };
   __9=function(e)
   {
    var __1,__3,__4,__6,check,cur,h,has;
    if(_enum.MoveNext())
     {
      cur=_enum.get_Current();
      h=function(c)
      {
       var _;
       _=f(c);
       return(Hash())(_);
      };
      check=function(c)
      {
       var _;
       _=h(c);
       return seen.hasOwnProperty(_);
      };
      has=check(cur);
      if(has)
       {
        __1=_enum.MoveNext();
       }
      else
       {
        __1=false;
       }
      while(__1)
       {
        cur=_enum.get_Current();
        has=check(cur);
        if(has)
         {
          __1=_enum.MoveNext();
         }
        else
         {
          __1=false;
         }
       }
      if(has)
       {
        _enum.Dispose();
        __4=false;
       }
      else
       {
        __3=h(cur);
        seen[__3]=undefined;
        e.c=cur;
        __4=true;
       }
      __6=__4;
     }
    else
     {
      __6=false;
     }
    return __6;
   };
   return __7(__9);
  };
  return __162(__10);
 };
 (SeqModule()).Delay=function(f)
 {
  var __1;
  __1=function()
  {
   var _;
   _=f(undefined);
   return _.GetEnumerator();
  };
  return{GetEnumerator:__1};
 };
 (SeqModule()).CountBy=function(f,s)
 {
  var __6,__7;
  __6=function(generator)
  {
   return(Delay())(generator);
  };
  __7=function()
  {
   var _,_1,__1,__3,__4,d,e,h,k,keys,x;
   d={};
   e=s.GetEnumerator();
   try
   {
    keys=[];
    while(e.MoveNext())
     {
      k=f(e.get_Current());
      h=(Hash())(k);
      if(d.hasOwnProperty(h))
       {
        _=d[h]+1;
        __1=d[h]=_;
       }
      else
       {
        keys.push(k);
        __1=d[h]=1;
       }
      __1;
     }
    __3=function(array)
    {
     return(Map_1())(function(k_1)
     {
      return[k_1,d[(Hash())(k_1)]];
     },array);
    };
    __4=__3(keys);
    _1=__8(__4);
   }
   finally
   {
    e.Dispose();
   }
   return _1;
  };
  return __6(__7);
 };
 (SeqModule()).Concat=function(ss)
 {
  return(Fold())(function(source1)
  {
   return function(source2)
   {
    return(Append())(source1,source2);
   };
  },(Empty())(),ss);
 };
 (SeqModule()).CompareWith=function(f,s1,s2)
 {
  var _,_1,_2,e1,e2,loop,matchValue,r,x,x_1;
  e1=s1.GetEnumerator();
  try
  {
   e2=s2.GetEnumerator();
   try
   {
    r=0;
    loop=true;
    if(loop)
     {
      _=r===0;
     }
    else
     {
      _=false;
     }
    while(_)
     {
      matchValue=[e1.MoveNext(),e2.MoveNext()];
      if(matchValue[0])
       {
        if(matchValue[1])
         {
          r=(f(e1.get_Current()))(e2.get_Current());
         }
        else
         {
          r=1;
         }
       }
      else
       {
        if(matchValue[1])
         {
          r=-1;
         }
        else
         {
          loop=false;
         }
       }
      if(loop)
       {
        _=r===0;
       }
      else
       {
        _=false;
       }
     }
    _1=r;
   }
   finally
   {
    e2.Dispose();
   }
   _2=_1;
  }
  finally
  {
   e1.Dispose();
  }
  return _2;
 };
 (SeqModule()).Collect=function(f,s)
 {
  return(SeqModule()).Concat((Map())(f,s));
 };
 (SeqModule()).Choose=function(f,s)
 {
  var __1;
  __1=function(source)
  {
   return(SeqModule()).Collect(function(x)
   {
    var _,matchValue,v;
    matchValue=f(x);
    if(matchValue.$==0)
     {
      _=(NewUnion())(FSharpList_1(),0);
     }
    else
     {
      v=matchValue.$0;
      _=(OfArray())([v]);
     }
    return _;
   },source);
  };
  return __1(s);
 };
 (SeqModule()).Cache=function(s)
 {
  var __4,_enum,cache;
  cache=[];
  _enum=s.GetEnumerator();
  __4=function()
  {
   var next;
   next=function(e)
   {
    var _,__1,__3;
    if(e.s+1<cache.length)
     {
      e.s=e.s+1;
      e.c=cache[e.s];
      __3=true;
     }
    else
     {
      if(_enum.MoveNext())
       {
        e.s=e.s+1;
        e.c=_enum.get_Current();
        _=e.c;
        cache.push(_);
        __1=true;
       }
      else
       {
        __1=false;
       }
      __3=__1;
     }
    return __3;
   };
   return(New())({$:0},0,next);
  };
  return __162(__4);
 };
 (SeqModule()).AverageBy=function(f,s)
 {
  var patternInput;
  patternInput=(Fold())((Tupled())(function(tupledArg)
  {
   return function(x)
   {
    return[tupledArg[0]+1,tupledArg[1]+f(x)];
   };
  }),[0,0],s);
  return patternInput[1]/patternInput[0];
 };
 (SeqModule()).Average=function(s)
 {
  var patternInput;
  patternInput=(Fold())((Tupled())(function(tupledArg)
  {
   return function(x)
   {
    return[tupledArg[0]+1,tupledArg[1]+x];
   };
  }),[0,0],s);
  return patternInput[1]/patternInput[0];
 };
 (SeqModule()).Append=function(s1,s2)
 {
  var __4;
  __4=function()
  {
   var dispose,e1,e2,next;
   e1=s1.GetEnumerator();
   e2=s2.GetEnumerator();
   next=function(e)
   {
    var _,__1,__3;
    if(e.s)
     {
      if(e2.MoveNext())
       {
        e.c=e2.get_Current();
        _=true;
       }
      else
       {
        _=false;
       }
      __3=_;
     }
    else
     {
      if(e1.MoveNext())
       {
        e.c=e1.get_Current();
        __1=true;
       }
      else
       {
        e.s=true;
        __1=next(e);
       }
      __3=__1;
     }
    return __3;
   };
   dispose=function()
   {
    e1.Dispose();
    return e2.Dispose();
   };
   return(New())({$:1,$0:dispose},false,next);
  };
  return __162(__4);
 };
 (Core()).StringUtil.Replace=function(subject_1,search,replace)
 {
  var loop;
  loop=function(subject)
  {
   var _,matchValue;
   matchValue=subject.replace(search,replace);
   if(matchValue===subject)
    {
     _=matchValue;
    }
   else
    {
     _=loop(matchValue);
    }
   return _;
  };
  return loop(subject_1);
 };
 String.prototype.GetEnumerator=function()
 {
  var s=this;
  var _;
  if(s===null)
   {
    _=(NewError())("ArgumentNullException","string");
    throw _;
   }
  return new(CharEnumerator())(s);
 };
 (StringModule()).Replicate=function(count,s)
 {
  var _,__1,msg,s_1;
  if(count<0)
   {
    msg="count"+": "+"Count must be non negative";
    _=(NewError())("ArgumentException",msg);
    throw _;
   }
  s_1=s===null?"":s;
  __1=(Initialize())(count,function()
  {
   return s_1;
  });
  return __165(__1);
 };
 (StringModule()).join=function(s)
 {
  var _;
  _=function(source)
  {
   return(Fold())(__164,"",source);
  };
  return _(s);
 };
 (StringModule()).Map=function(f,s)
 {
  var __3,__4;
  __4=__166(s);
  __3=function(s_1)
  {
   return(StringModule()).Collect(function(x)
   {
    var _,__1,value;
    value=f(x);
    __1=[value];
    _=fromCharCode();
    return(apply()).call(_,undefined,__1);
   },s_1);
  };
  return __3(__4);
 };
 (StringModule()).Collect=function(f,s)
 {
  var _,__1,__3;
  __1=__166(s);
  _=function(source)
  {
   return(Map())(f,source);
  };
  __3=_(__1);
  return __165(__3);
 };
 (StringModule()).Length=function(s)
 {
  return(s===null?"":s).length;
 };
 (StringModule()).IterateIndexed=function(f,s)
 {
  var _,__1;
  __1=__166(s);
  _=function(source)
  {
   return(IterateIndexed())(f,source);
  };
  return _(__1);
 };
 (StringModule()).Iterate=function(f,s)
 {
  var _,__1;
  __1=__166(s);
  _=function(source)
  {
   return(SeqModule()).Iterate(f,source);
  };
  return _(__1);
 };
 (StringModule()).Initialize=function(count,f)
 {
  var _,__1,msg;
  if(count<0)
   {
    msg="count"+": "+"Count must be non negative";
    _=(NewError())("ArgumentException",msg);
    throw _;
   }
  __1=(Initialize())(count,f);
  return __165(__1);
 };
 (StringModule()).ForAll=function(f,s)
 {
  var _,__1;
  __1=__166(s);
  _=function(source)
  {
   return(SeqModule()).ForAll(f,source);
  };
  return _(__1);
 };
 (StringModule()).Exists=function(f,s)
 {
  var _,__1;
  __1=__166(s);
  _=function(source)
  {
   return(Exists())(f,source);
  };
  return _(__1);
 };
 (StringModule()).Concat=function(separator,strings)
 {
  var _,__1,__3,__4,matchValue,s;
  if((Equals())(strings,null))
   {
    _=(NewError())("ArgumentNullException","strings");
    throw _;
   }
  s=separator===null?"":separator;
  matchValue=(ListModule()).OfSeq(strings);
  if(matchValue.$==1)
   {
    if(matchValue.$1.$==0)
     {
      __3=matchValue.$0;
     }
    else
     {
      __1=function(source)
      {
       return(Reduce())(function(acc)
       {
        return function(v)
        {
         return acc+s+v;
        };
       },source);
      };
      __3=__1(matchValue);
     }
    __4=__3;
   }
  else
   {
    __4="";
   }
  return __4;
 };
}());
