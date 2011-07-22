(function()
{
 var global=this;
 var Class,CombineLatest,Control,Core,Dictionary_2,Disposable,FSharpList_1,HotStream_1,New,New1,NewRecord,NewUnion,New_1,Observable_1,Observer_1,Of,Reactive,Return,Runtime,Select,SeqModule,__4,__7,__9;
 IntelliFactory.WebSharper.Runtime.Declare({IntelliFactory:{Reactive:{Reactive:{Reactive:{},"Observer`1":{},"Observable`1":{},"HotStream`1":{},Disposable:{}}}}});
 Reactive=function()
 {
  return IntelliFactory.Reactive.Reactive;
 };
 (function()
 {
  return IntelliFactory.Reactive;
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
 Return=function()
 {
  return IntelliFactory.Reactive.Reactive["Observable`1"].Return;
 };
 Observable_1=function()
 {
  return IntelliFactory.Reactive.Reactive["Observable`1"];
 };
 Select=function()
 {
  return IntelliFactory.Reactive.Reactive["Observable`1"].Select;
 };
 CombineLatest=function()
 {
  return IntelliFactory.Reactive.Reactive["Observable`1"].CombineLatest;
 };
 New1=function()
 {
  return IntelliFactory.Reactive.Reactive["Observer`1"].New1;
 };
 Observer_1=function()
 {
  return IntelliFactory.Reactive.Reactive["Observer`1"];
 };
 Of=function()
 {
  return IntelliFactory.WebSharper.Control.Observer.Of;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Control.Observer;
 });
 Control=function()
 {
  return IntelliFactory.WebSharper.Control;
 };
 HotStream_1=function()
 {
  return IntelliFactory.Reactive.Reactive["HotStream`1"];
 };
 NewUnion=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewUnion;
 };
 FSharpList_1=function()
 {
  return IntelliFactory.WebSharper.Core["FSharpList`1"];
 };
 Core=function()
 {
  return IntelliFactory.WebSharper.Core;
 };
 New=function()
 {
  return IntelliFactory.Reactive.Reactive["Observable`1"].New;
 };
 Dictionary_2=function()
 {
  return IntelliFactory.WebSharper.Collections["Dictionary`2"];
 };
 (function()
 {
  return IntelliFactory.WebSharper.Collections;
 });
 SeqModule=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule;
 };
 __4=function(value)
 {
  return void value;
 };
 NewRecord=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewRecord;
 };
 New_1=function()
 {
  return IntelliFactory.Reactive.Reactive.Disposable.New;
 };
 Disposable=function()
 {
  return IntelliFactory.Reactive.Reactive.Disposable;
 };
 __7=function(arg00)
 {
  return IntelliFactory.Reactive.Reactive["Observable`1"].New(arg00);
 };
 __9=function(arg0)
 {
  return{$:1,$0:arg0};
 };
 (Reactive()).Reactive=(Class())(function()
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
 },null,{Return:function(x)
 {
  return(Return())(x);
 },Never:function()
 {
  return(Observable_1()).Never();
 },Select:function(io,f)
 {
  return(Select())(io,f);
 },Choose:function(io,f)
 {
  return(Observable_1()).Choose(io,f);
 },Where:function(io,f)
 {
  return(Observable_1()).Where(io,f);
 },Concat:function(io1,io2)
 {
  return(Observable_1()).Concat(io1,io2);
 },Merge:function(io1,io2)
 {
  return(Observable_1()).Merge(io1,io2);
 },Switch:function(io)
 {
  return(Observable_1()).Switch(io);
 },SelectMany:function(io)
 {
  return(Observable_1()).SelectMany(io);
 },CollectLatest:function(io)
 {
  return(Observable_1()).CollectLatest(io);
 },CombineLatest:function(io1,io2,f)
 {
  return(CombineLatest())(io1,io2,f);
 },Heat:function(io)
 {
  return(Observable_1()).Heat(io);
 },Aggregate:function(io,s,a)
 {
  return(Observable_1()).Aggregate(io,s,a);
 },Drop:function(io,count)
 {
  return(Observable_1()).Drop(io,count);
 },Sequence:function(ios)
 {
  return(Observable_1()).Sequence(ios);
 }});
 (Reactive())["Observable`1"]=(Class())(null,null,{Subscribe:function(o)
 {
  var _this=this;
  return _this.OnSubscribe(o);
 },Subscribe2:function(onNext,onComplete)
 {
  var _this=this;
  var _,__1;
  __1=(New1())(onNext,onComplete);
  _=_this.OnSubscribe;
  return _(__1);
 }});
 (Reactive())["HotStream`1"]=(Class())(null,null,{Trigger:function(v)
 {
  var _this=this;
  var _,__1,__2,__3;
  _=_this.Latest;
  __1={$:1,$0:v};
  _.contents=__1;
  __2=_this.Event;
  __3=__2.event;
  return __3.Trigger(v);
 },Subscribe:function(o)
 {
  var _this=this;
  var _,__1,__2;
  if(_this.Latest.contents.$==1)
   {
    _=o.OnNext(_this.Latest.contents.$0);
   }
  _;
  __1=_this.Event.event;
  __2=function(v)
  {
   return o.OnNext(v);
  };
  return __1.Subscribe((Of())(__2));
 }});
 (Reactive())["Observer`1"]=(Class())(null,null,{OnNext:function(t)
 {
  var _this=this;
  return _this.OnNext(t);
 },OnCompleted:function()
 {
  var _this=this;
  return _this.OnCompleted(undefined);
 },OnError:function()
 {
 }});
 (Reactive()).Disposable=(Class())(null,null,{Dispose:function()
 {
  var _this=this;
  return _this.Dispose(undefined);
 }});
 (Observable_1()).Heat=function(io)
 {
  var _,formStream;
  formStream=(HotStream_1()).New();
  _=function(arg00)
  {
   return formStream.Trigger(arg00);
  };
  io.Subscribe((Of())(_));
  return formStream;
 };
 (Observable_1()).Sequence=function(ios_1)
 {
  var sequence;
  sequence=function(ios)
  {
   var _,rest,x,xs;
   if(ios.$==1)
    {
     xs=ios.$1;
     x=ios.$0;
     rest=sequence(xs);
     _=(CombineLatest())(x,rest,function(x_1)
     {
      return function(y)
      {
       return(NewUnion())(FSharpList_1(),1,x_1,y);
      };
     });
    }
   else
    {
     _=(Return())((NewUnion())(FSharpList_1(),0));
    }
   return _;
  };
  return(Select())(sequence((Core()).ListModule.OfSeq(ios_1)),function(source)
  {
   return source;
  });
 };
 (Observable_1()).CollectLatest=function(outer)
 {
  return(New())(function(o)
  {
   var __6,dict,index;
   dict=new(Dictionary_2())([],(Runtime()).Tupled(function(tupledArg)
   {
    var a,b;
    a=tupledArg[0];
    b=tupledArg[1];
    return(Dictionary_2()).eq(a,b);
   }),function(obj)
   {
    return(Core()).Hashing.Hash(obj);
   });
   index={contents:0};
   __6=function(inner)
   {
    var _,__3,__5,currentIndex;
    _=index.contents+1;
    index.contents=_;
    currentIndex=index.contents;
    __3=function(value)
    {
     var __1,__2;
     dict.set_Item(currentIndex,value);
     __2=(SeqModule()).Delay(function()
     {
      return(SeqModule()).Map(function(pair)
      {
       return pair.Value;
      },dict);
     });
     __1=function(arg00)
     {
      return o.OnNext(arg00);
     };
     return __1(__2);
    };
    __5=inner.Subscribe((Of())(__3));
    return __4(__5);
   };
   return outer.Subscribe((Of())(__6));
  });
 };
 (Observable_1()).New=function(f)
 {
  return(NewRecord())(Observable_1(),{OnSubscribe:f});
 };
 (Observable_1()).Return=function(x)
 {
  var f;
  f=function(o)
  {
   o.OnNext(x);
   o.OnCompleted();
   return(New_1())(__4);
  };
  return(New())(f);
 };
 (Observable_1()).Never=function()
 {
  return(New())(function()
  {
   return(New_1())(__4);
  });
 };
 (Observable_1()).Select=function(io,f)
 {
  var __1;
  __1=function(o1)
  {
   var _;
   _=function(v)
   {
    return o1.OnNext(f(v));
   };
   return io.Subscribe((Of())(_));
  };
  return __7(__1);
 };
 (Observable_1()).Where=function(io,f)
 {
  var __2;
  __2=function(o1)
  {
   var __1;
   __1=function(v)
   {
    var _;
    if(f(v))
     {
      _=o1.OnNext(v);
     }
    return _;
   };
   return io.Subscribe((Of())(__1));
  };
  return __7(__2);
 };
 (Observable_1()).Choose=function(io,f)
 {
  var __2;
  __2=function(o1)
  {
   var __1;
   __1=function(v)
   {
    var _,matchValue,v_1;
    matchValue=f(v);
    if(matchValue.$==0)
     ;
    else
     {
      v_1=matchValue.$0;
      _=o1.OnNext(v_1);
     }
    return _;
   };
   return io.Subscribe((Of())(__1));
  };
  return __7(__2);
 };
 (Observable_1()).Drop=function(io,count)
 {
  var __3;
  __3=function(o1)
  {
   var __2,index;
   index={contents:0};
   __2=function(v)
   {
    var _,__1;
    _=index.contents+1;
    index.contents=_;
    if(index.contents>count)
     {
      __1=o1.OnNext(v);
     }
    return __1;
   };
   return io.Subscribe((Of())(__2));
  };
  return __7(__3);
 };
 (Observable_1()).Merge=function(io1,io2)
 {
  var __8;
  __8=function(o)
  {
   var __2,__3,__5,__6,completed1,completed2,disp1,disp2;
   completed1={contents:false};
   completed2={contents:false};
   __3=(New1())(function(arg00)
   {
    return o.OnNext(arg00);
   },function()
   {
    var _,__1;
    completed1.contents=true;
    if(completed1.contents)
     {
      _=completed2.contents;
     }
    else
     {
      _=false;
     }
    if(_)
     {
      __1=o.OnCompleted();
     }
    return __1;
   });
   __2=function(arg00)
   {
    return io1.Subscribe(arg00);
   };
   disp1=__2(__3);
   __6=(New1())(function(arg00)
   {
    return o.OnNext(arg00);
   },function()
   {
    var _,__1;
    completed2.contents=true;
    if(completed1.contents)
     {
      _=completed2.contents;
     }
    else
     {
      _=false;
     }
    if(_)
     {
      __1=o.OnCompleted();
     }
    return __1;
   });
   __5=function(arg00)
   {
    return io2.Subscribe(arg00);
   };
   disp2=__5(__6);
   return(New_1())(function()
   {
    disp1.Dispose();
    return disp2.Dispose();
   });
  };
  return __7(__8);
 };
 (Observable_1()).Concat=function(io1,io2)
 {
  var __3;
  __3=function(o)
  {
   var _,innerDisp,outerDisp;
   _={$:0};
   innerDisp={contents:_};
   outerDisp=io1.Subscribe((New1())(function(arg00)
   {
    return o.OnNext(arg00);
   },function()
   {
    var __1,__2;
    __1=io2.Subscribe(o);
    __2=__9(__1);
    return innerDisp.contents=__2;
   }));
   return(New_1())(function()
   {
    var __1,__2;
    if(innerDisp.contents.$==1)
     {
      __1=innerDisp.contents.$0;
      __2=__1.Dispose();
     }
    __2;
    return outerDisp.Dispose();
   });
  };
  return __7(__3);
 };
 (Observable_1()).Range=function(start,count)
 {
  var _;
  _=function(o)
  {
   (Runtime()).Iterate(start,start+count,function(i)
   {
    return o.OnNext(i);
   });
   return(New_1())(__4);
  };
  return __7(_);
 };
 (Observable_1()).CombineLatest=function(io1,io2,f)
 {
  var __5;
  __5=function(o)
  {
   var _,__1,d1,d2,lv1,lv2,o1,o2,onNext,onNext_1,update;
   _={$:0};
   lv1={contents:_};
   __1={$:0};
   lv2={contents:__1};
   update=function()
   {
    var __2,__3,matchValue,v1,v2;
    matchValue=[lv1.contents,lv2.contents];
    if(matchValue[0].$==1)
     {
      if(matchValue[1].$==1)
       {
        v1=matchValue[0].$0;
        v2=matchValue[1].$0;
        __2=o.OnNext((f(v1))(v2));
       }
      __3=__2;
     }
    return __3;
   };
   onNext=function(x)
   {
    var __2;
    __2={$:1,$0:x};
    lv1.contents=__2;
    return update(undefined);
   };
   o1=(New1())(onNext,__4);
   onNext_1=function(y)
   {
    var __2;
    __2={$:1,$0:y};
    lv2.contents=__2;
    return update(undefined);
   };
   o2=(New1())(onNext_1,__4);
   d1=io1.Subscribe(o1);
   d2=io2.Subscribe(o2);
   return(New_1())(function()
   {
    d1.Dispose();
    return d2.Dispose();
   });
  };
  return __7(__5);
 };
 (Observable_1()).Switch=function(io)
 {
  return(New())(function(o)
  {
   var _,__10,disp,index;
   index={contents:0};
   _={$:0};
   disp={contents:_};
   __10=function(o1)
   {
    var __1,__2,__3,__6,__8,currentIndex,d;
    __1=index.contents+1;
    index.contents=__1;
    if(disp.contents.$==1)
     {
      __2=disp.contents.$0;
      __3=__2.Dispose();
     }
    __3;
    currentIndex=index.contents;
    __6=function(v)
    {
     var __5;
     if(currentIndex===index.contents)
      {
       __5=o.OnNext(v);
      }
     return __5;
    };
    __8=o1.Subscribe((Of())(__6));
    d=__9(__8);
    return disp.contents=d;
   };
   return io.Subscribe((Of())(__10));
  });
 };
 (Observable_1()).SelectMany=function(io)
 {
  return(New())(function(o)
  {
   var __2,d_1,disp;
   disp={contents:__4};
   __2=function(o1)
   {
    var _,__1,d;
    _=function(v)
    {
     return o.OnNext(v);
    };
    d=o1.Subscribe((Of())(_));
    __1=function()
    {
     disp.contents(undefined);
     return d.Dispose();
    };
    return disp.contents=__1;
   };
   d_1=io.Subscribe((Of())(__2));
   return(New_1())(function()
   {
    disp.contents(undefined);
    return d_1.Dispose();
   });
  });
 };
 (Observable_1()).Aggregate=function(io,seed,acc)
 {
  return(New())(function(o)
  {
   var __1,state;
   state={contents:seed};
   __1=function(value)
   {
    var _;
    _=(acc(state.contents))(value);
    state.contents=_;
    return o.OnNext(state.contents);
   };
   return io.Subscribe((Of())(__1));
  });
 };
 (HotStream_1()).New=function()
 {
  var _;
  _={$:0};
  return(NewRecord())(HotStream_1(),{Latest:{contents:_},Event:new(Control())["FSharpEvent`1"]()});
 };
 (Observer_1()).New1=function(onNext,onComplete)
 {
  return(NewRecord())(Observer_1(),{OnNext:onNext,OnCompleted:onComplete});
 };
 (Disposable()).New=function(d)
 {
  return(NewRecord())(Disposable(),{Dispose:d});
 };
 (Reactive()).Default=new(Reactive()).Reactive();
}());
