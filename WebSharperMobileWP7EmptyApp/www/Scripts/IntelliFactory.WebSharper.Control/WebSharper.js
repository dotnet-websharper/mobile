(function()
{
 var global=this;
 var ArrayModule,Bind,Choose,Choose_1,Class,Concurrent,Control,Core,Delay,Event,EventModule,Event_1,FSharpEvent_1,FSharpList_1,Filter,Filter_1,Fork,HotStream,HotStream_1,Iterate,ListModule,New,NewRecord,NewUnion,New_1,Observable,ObservableModule,Observer,Of,Return,Run,TryFinally,TryWith,Tupled,__12,__13,__14,__15,__16,__4,__5,__6;
 IntelliFactory.WebSharper.Runtime.Declare({IntelliFactory:{WebSharper:{Control:{Observer:{},ObservableModule:{},Observable:{},HotStream:{"HotStream`1":{}},"FSharpEvent`1":{},ExtraTopLevelOperators:{},EventModule:{},Event:{"Event`1":{}},Concurrent:{Scheduler:{},ConcurrentBuilder:{}},AsyncBuilder:{}}}}});
 HotStream=function()
 {
  return IntelliFactory.WebSharper.Control.HotStream;
 };
 Control=function()
 {
  return IntelliFactory.WebSharper.Control;
 };
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
 Of=function()
 {
  return IntelliFactory.WebSharper.Control.Observer.Of;
 };
 Observer=function()
 {
  return IntelliFactory.WebSharper.Control.Observer;
 };
 Concurrent=function()
 {
  return IntelliFactory.WebSharper.Control.Concurrent;
 };
 __4=function()
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
 Bind=function()
 {
  return IntelliFactory.WebSharper.Control.Concurrent.Bind;
 };
 Delay=function()
 {
  return IntelliFactory.WebSharper.Control.Concurrent.Delay;
 };
 Return=function()
 {
  return IntelliFactory.WebSharper.Control.Concurrent.Return;
 };
 __5=function(x)
 {
  return x;
 };
 TryFinally=function()
 {
  return IntelliFactory.WebSharper.Control.Concurrent.TryFinally;
 };
 TryWith=function()
 {
  return IntelliFactory.WebSharper.Control.Concurrent.TryWith;
 };
 __6=function(f)
 {
  return f();
 };
 Event=function()
 {
  return IntelliFactory.WebSharper.Control.Event;
 };
 Iterate=function()
 {
  return IntelliFactory.WebSharper.Runtime.Iterate;
 };
 ArrayModule=function()
 {
  return IntelliFactory.WebSharper.Core.ArrayModule;
 };
 Core=function()
 {
  return IntelliFactory.WebSharper.Core;
 };
 ListModule=function()
 {
  return IntelliFactory.WebSharper.Core.ListModule;
 };
 NewRecord=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewRecord;
 };
 Event_1=function()
 {
  return IntelliFactory.WebSharper.Control.Event["Event`1"];
 };
 HotStream_1=function()
 {
  return IntelliFactory.WebSharper.Control.HotStream["HotStream`1"];
 };
 FSharpEvent_1=function()
 {
  return IntelliFactory.WebSharper.Control["FSharpEvent`1"];
 };
 __12=function(x)
 {
  throw x;
 };
 Observable=function()
 {
  return IntelliFactory.WebSharper.Control.Observable;
 };
 __14=function(f)
 {
  return IntelliFactory.WebSharper.Control.Observable.New(f);
 };
 New_1=function()
 {
  return IntelliFactory.WebSharper.Control.Observable.New;
 };
 New=function()
 {
  return IntelliFactory.WebSharper.Control.Observer.New;
 };
 __13=function(value)
 {
  return void value;
 };
 NewUnion=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewUnion;
 };
 FSharpList_1=function()
 {
  return IntelliFactory.WebSharper.Core["FSharpList`1"];
 };
 __15=function(arg0)
 {
  return{$:1,$0:arg0};
 };
 ObservableModule=function()
 {
  return IntelliFactory.WebSharper.Control.ObservableModule;
 };
 Choose=function()
 {
  return IntelliFactory.WebSharper.Control.Observable.Choose;
 };
 Filter=function()
 {
  return IntelliFactory.WebSharper.Control.Observable.Filter;
 };
 Tupled=function()
 {
  return IntelliFactory.WebSharper.Runtime.Tupled;
 };
 __16=function(arg0)
 {
  return{$:0,$0:arg0};
 };
 Run=function()
 {
  return IntelliFactory.WebSharper.Control.Concurrent.Run;
 };
 Fork=function()
 {
  return IntelliFactory.WebSharper.Control.Concurrent.Fork;
 };
 EventModule=function()
 {
  return IntelliFactory.WebSharper.Control.EventModule;
 };
 Choose_1=function()
 {
  return IntelliFactory.WebSharper.Control.EventModule.Choose;
 };
 Filter_1=function()
 {
  return IntelliFactory.WebSharper.Control.EventModule.Filter;
 };
 (HotStream())["HotStream`1"]=(Class())(null,null,{Trigger:function(v)
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
 (Concurrent()).ConcurrentBuilder=(Class())(__4,null,{Bind:function(x,f)
 {
  return(Bind())(x,f);
 },Delay:function(f)
 {
  return(Delay())(f);
 },Return:function(x)
 {
  return(Return())(x);
 },ReturnFrom:__5,Combine:function(a,b)
 {
  return(Bind())(a,function()
  {
   return b;
  });
 },TryFinally:function(a,f)
 {
  return(TryFinally())(a,f);
 },TryWith:function(a,f)
 {
  return(TryWith())(a,f);
 },Zero:function()
 {
  return(Return())(undefined);
 }});
 (Concurrent()).Scheduler=(Class())(function()
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
  _this.MAX_TIME=40;
  _this.idle=true;
  _this.robin=[];
 },null,{Fork:function(action)
 {
  var _this=this;
  var __3;
  __3=function()
  {
   var _,__1,__2;
   _=_this.robin;
   _.push(action);
   if(_this.idle)
    {
     _this.idle=false;
     __1=function()
     {
      return _this.tick();
     };
     __2=setTimeout(__1,0);
    }
   return __2;
  };
  return __6(__3);
 },tick:function()
 {
  var _this=this;
  var __9;
  __9=function()
  {
   var _,__1,__2,__3,__7,__8,loop,matchValue,t,tm;
   _=new Date();
   t=_.getTime();
   loop=true;
   while(loop)
    {
     __1=new Date();
     tm=__1.getTime()-t;
     if(tm>_this.MAX_TIME)
      {
       __2=function()
       {
        return _this.tick();
       };
       setTimeout(__2,0);
       loop=false;
      }
     else
      {
       matchValue=_this.robin.length;
       if(matchValue===0)
        {
         _this.idle=true;
         loop=false;
        }
       else
        {
         __3=_this.robin;
         __7=(__3.shift())(undefined);
        }
       __8=__7;
      }
     __8;
    }
  };
  return __6(__9);
 }});
 (Event())["Event`1"]=(Class())(null,null,{Trigger:function(x)
 {
  var _this=this;
  return(Iterate())(0,_this.Handlers.length-1,function(i)
  {
   return _this.Handlers[i](x);
  });
 },AddHandler:function(h)
 {
  var _this=this;
  var _;
  _=_this.Handlers;
  return _.push(h);
 },RemoveHandler:function(h)
 {
  var _this=this;
  var __1,__10,__11,__2,__3,__7,__8,__9,n,x_1;
  __2=_this.Handlers;
  __1=function(array)
  {
   return(ArrayModule()).MapIndexed(function(i)
   {
    return function(x)
    {
     var _;
     if((Core()).Equality.Equals(x,h))
      {
       _={$:1,$0:i};
      }
     else
      {
       _={$:0};
      }
     return _;
    };
   },array);
  };
  __7=__1(__2);
  __3=function(array)
  {
   return(ArrayModule()).Choose(__5,array);
  };
  __9=__3(__7);
  __8=function(array)
  {
   return(ListModule()).OfArray(array);
  };
  x_1=__8(__9);
  if(x_1.$==1)
   {
    n=x_1.$0;
    __10=_this.Handlers;
    __11=__10.splice(n,1);
   }
  return __11;
 },Subscribe:function(observer)
 {
  var _this=this;
  var _,h;
  h=function(x)
  {
   return observer.OnNext(x);
  };
  _this.AddHandler(h);
  _=function()
  {
   return _this.RemoveHandler(h);
  };
  return{Dispose:_};
 }});
 (Control())["FSharpEvent`1"]=(Class())(function()
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
  _this.event=(NewRecord())(Event_1(),{Handlers:[]});
 },null,{});
 (Control()).AsyncBuilder=(Class())(__4,null,{Zero:function()
 {
  var _;
  _=(Return())(undefined);
  return __5(_);
 },Bind:function(x,f)
 {
  var _;
  _=(Bind())(x,function(v)
  {
   return f(v);
  });
  return __5(_);
 },Delay:function(f)
 {
  var _;
  _=(Delay())(function()
  {
   return f(undefined);
  });
  return __5(_);
 },Return:function(x)
 {
  var _;
  _=(Return())(x);
  return __5(_);
 },ReturnFrom:__5,Combine:function(a,b)
 {
  var _;
  _=(Bind())(a,function()
  {
   return b;
  });
  return __5(_);
 },TryFinally:function(a,f)
 {
  var _,f_1;
  f_1=function(arg10)
  {
   return f(arg10);
  };
  _=(TryFinally())(a,f_1);
  return __5(_);
 },TryWith:function(a,f)
 {
  var _,f_1;
  f_1=function(arg10)
  {
   return f(arg10);
  };
  _=(TryWith())(a,f_1);
  return __5(_);
 },Using:function(x,f)
 {
  var _this=this;
  return _this.TryFinally(f(x),function()
  {
   return x.Dispose();
  });
 }});
 (HotStream_1()).New=function()
 {
  var _;
  _={$:0};
  return(NewRecord())(HotStream_1(),{Latest:{contents:_},Event:new(FSharpEvent_1())()});
 };
 (Observer()).Of=function(f)
 {
  return{OnNext:function(x)
  {
   return f(x);
  },OnError:__12,OnCompleted:function()
  {
  }};
 };
 (Observer()).New=function(f,e,c)
 {
  return{OnNext:f,OnError:e,OnCompleted:c};
 };
 (Observable()).Merge=function(io1,io2)
 {
  var __10;
  __10=function(o)
  {
   var __2,__3,__7,__8,__9,completed1,completed2,disp1,disp2;
   completed1={contents:false};
   completed2={contents:false};
   __3=(New())(function(arg00)
   {
    return o.OnNext(arg00);
   },__13,function()
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
   __8=(New())(function(arg00)
   {
    return o.OnNext(arg00);
   },__13,function()
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
   __7=function(arg00)
   {
    return io2.Subscribe(arg00);
   };
   disp2=__7(__8);
   __9=function()
   {
    disp1.Dispose();
    return disp2.Dispose();
   };
   return{Dispose:__9};
  };
  return __14(__10);
 };
 (Observable()).Map=function(f,io)
 {
  var __2;
  __2=function(o1)
  {
   var _,__1,on;
   on=function(v)
   {
    return o1.OnNext(f(v));
   };
   _=function(arg00)
   {
    return io.Subscribe(arg00);
   };
   __1=(New())(on,function(arg00)
   {
    return o1.OnError(arg00);
   },function()
   {
    return o1.OnCompleted();
   });
   return _(__1);
  };
  return __14(__2);
 };
 (Observable()).Filter=function(f,io)
 {
  var __3;
  __3=function(o1)
  {
   var __1,__2,on;
   on=function(v)
   {
    var _;
    if(f(v))
     {
      _=o1.OnNext(v);
     }
    return _;
   };
   __1=function(arg00)
   {
    return io.Subscribe(arg00);
   };
   __2=(New())(on,function(arg00)
   {
    return o1.OnError(arg00);
   },function()
   {
    return o1.OnCompleted();
   });
   return __1(__2);
  };
  return __14(__3);
 };
 (Observable()).Choose=function(f,io)
 {
  var __3;
  __3=function(o1)
  {
   var __1,__2,on;
   on=function(v)
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
   __1=function(arg00)
   {
    return io.Subscribe(arg00);
   };
   __2=(New())(on,function(arg00)
   {
    return o1.OnError(arg00);
   },function()
   {
    return o1.OnCompleted();
   });
   return __1(__2);
  };
  return __14(__3);
 };
 (Observable()).Sequence=function(ios_1)
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
     _=(Observable()).CombineLatest(x,rest,function(x_1)
     {
      return function(y)
      {
       return(NewUnion())(FSharpList_1(),1,x_1,y);
      };
     });
    }
   else
    {
     _=(Observable()).Return((NewUnion())(FSharpList_1(),0));
    }
   return _;
  };
  return sequence((ListModule()).OfSeq(ios_1));
 };
 (Observable()).CombineLatest=function(io1,io2,f)
 {
  var __8;
  __8=function(o)
  {
   var _,__1,__7,d1,d2,lv1,lv2,o1,o2,onNext,onNext_1,update;
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
   o1=(New())(onNext,__13,__13);
   onNext_1=function(y)
   {
    var __2;
    __2={$:1,$0:y};
    lv2.contents=__2;
    return update(undefined);
   };
   o2=(New())(onNext_1,__13,__13);
   d1=io1.Subscribe(o1);
   d2=io2.Subscribe(o2);
   __7=function()
   {
    d1.Dispose();
    return d2.Dispose();
   };
   return{Dispose:__7};
  };
  return __14(__8);
 };
 (Observable()).Return=function(x)
 {
  var f;
  f=function(o)
  {
   o.OnNext(x);
   o.OnCompleted();
   return{Dispose:__13};
  };
  return(New_1())(f);
 };
 (Observable()).Aggregate=function(io,seed,acc)
 {
  return(New_1())(function(o)
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
 (Observable()).New=function(f)
 {
  return{Subscribe:f};
 };
 (Observable()).SelectMany=function(io)
 {
  return(New_1())(function(o)
  {
   var __2,__3,d_1,disp;
   disp={contents:__13};
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
   __3=function()
   {
    disp.contents(undefined);
    return d_1.Dispose();
   };
   return{Dispose:__3};
  });
 };
 (Observable()).Switch=function(io)
 {
  return(New_1())(function(o)
  {
   var _,__10,disp,index;
   index={contents:0};
   _={$:0};
   disp={contents:_};
   __10=function(o1)
   {
    var __1,__2,__3,__8,__9,currentIndex,d;
    __1=index.contents+1;
    index.contents=__1;
    if(disp.contents.$==1)
     {
      __2=disp.contents.$0;
      __3=__2.Dispose();
     }
    __3;
    currentIndex=index.contents;
    __8=function(v)
    {
     var __7;
     if(currentIndex===index.contents)
      {
       __7=o.OnNext(v);
      }
     return __7;
    };
    __9=o1.Subscribe((Of())(__8));
    d=__15(__9);
    return disp.contents=d;
   };
   return io.Subscribe((Of())(__10));
  });
 };
 (Observable()).Range=function(start,count)
 {
  var _;
  _=function(o)
  {
   (Iterate())(start,start+count,function(i)
   {
    return o.OnNext(i);
   });
   return{Dispose:__13};
  };
  return __14(_);
 };
 (Observable()).Concat=function(io1,io2)
 {
  var __8;
  __8=function(o)
  {
   var _,__3,__7,innerDisp,outerDisp;
   _={$:0};
   innerDisp={contents:_};
   outerDisp=io1.Subscribe((New())(function(arg00)
   {
    return o.OnNext(arg00);
   },__13,function()
   {
    var __1,__2;
    __1=io2.Subscribe(o);
    __2=__15(__1);
    return innerDisp.contents=__2;
   }));
   __3=function(dispose)
   {
    return{Dispose:dispose};
   };
   __7=function()
   {
    var __1,__2;
    if(innerDisp.contents.$==1)
     {
      __1=innerDisp.contents.$0;
      __2=__1.Dispose();
     }
    __2;
    return outerDisp.Dispose();
   };
   return __3(__7);
  };
  return __14(__8);
 };
 (Observable()).Drop=function(count,io)
 {
  var __7;
  __7=function(o1)
  {
   var __2,__3,index,on;
   index={contents:0};
   on=function(v)
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
   __2=function(arg00)
   {
    return io.Subscribe(arg00);
   };
   __3=(New())(on,function(arg00)
   {
    return o1.OnError(arg00);
   },function()
   {
    return o1.OnCompleted();
   });
   return __2(__3);
  };
  return __14(__7);
 };
 (Observable()).Never=function()
 {
  return(New_1())(function()
  {
   return{Dispose:__13};
  });
 };
 (Observable()).Of=function(f)
 {
  return(New_1())(function(o)
  {
   var _;
   _=f(function(x)
   {
    return o.OnNext(x);
   });
   return{Dispose:_};
  });
 };
 (ObservableModule()).Split=function(f,e)
 {
  var __1,__2,left,right;
  __1=function(source)
  {
   return(Choose())(function(x)
   {
    var _,matchValue,x_1;
    matchValue=f(x);
    if(matchValue.$==0)
     {
      x_1=matchValue.$0;
      _={$:1,$0:x_1};
     }
    else
     {
      _={$:0};
     }
    return _;
   },source);
  };
  left=__1(e);
  __2=function(source)
  {
   return(Choose())(function(x)
   {
    var _,matchValue,x_1;
    matchValue=f(x);
    if(matchValue.$==1)
     {
      x_1=matchValue.$0;
      _={$:1,$0:x_1};
     }
    else
     {
      _={$:0};
     }
    return _;
   },source);
  };
  right=__2(e);
  return[left,right];
 };
 (ObservableModule()).Scan=function(fold,seed,e)
 {
  var f,state;
  state={contents:seed};
  f=function(value)
  {
   var _;
   _=(fold(state.contents))(value);
   state.contents=_;
   return state.contents;
  };
  return(Observable()).Map(f,e);
 };
 (ObservableModule()).Partition=function(f,e)
 {
  var _;
  _=function(x)
  {
   return!f(x);
  };
  return[(Filter())(f,e),(Filter())(_,e)];
 };
 (ObservableModule()).Pairwise=function(e)
 {
  var _,__1,__7,__8,collector;
  __1=[{$:0},{$:0}];
  collector=(Tupled())(function(tupledArg)
  {
   return function(n)
   {
    return[tupledArg[1],{$:1,$0:n}];
   };
  });
  _=(Tupled())(function(state)
  {
   return function(source)
   {
    return(ObservableModule()).Scan(collector,state,source);
   };
  });
  __8=(_(__1))(e);
  __7=function(source)
  {
   return(Choose())((Tupled())(function(_arg2)
   {
    var __2,__3,x,y;
    if(_arg2[0].$==1)
     {
      if(_arg2[1].$==1)
       {
        x=_arg2[0].$0;
        y=_arg2[1].$0;
        __2={$:1,$0:[x,y]};
       }
      else
       {
        __2={$:0};
       }
      __3=__2;
     }
    else
     {
      __3={$:0};
     }
    return __3;
   }),source);
  };
  return __7(__8);
 };
 (Concurrent()).Return=function(x)
 {
  return{$:0,$0:function(k)
  {
   return k({$:0,$0:x});
  }};
 };
 (Concurrent()).TryWith=function(_arg6,f)
 {
  var __2,run;
  run=_arg6.$0;
  __2=function(k)
  {
   return run(function(_arg5)
   {
    var _,__1,e,x,x_1;
    if(_arg5.$==1)
     {
      e=_arg5.$0;
      try
      {
       _=(Run())(f(e),k);
      }
      catch(x)
      {
       _=k({$:1,$0:x});
      }
      __1=_;
     }
    else
     {
      x_1=_arg5.$0;
      __1=k({$:0,$0:x_1});
     }
    return __1;
   });
  };
  return __16(__2);
 };
 (Concurrent()).TryFinally=function(_arg5,f)
 {
  var __1,run;
  run=_arg5.$0;
  __1=function(k)
  {
   return run(function(r)
   {
    var _,x;
    try
    {
     f(undefined);
     _=k(r);
    }
    catch(x)
    {
     _=k({$:1,$0:x});
    }
    return _;
   });
  };
  return __16(__1);
 };
 (Concurrent()).Bind=function(_arg4,f)
 {
  var __2,run;
  run=_arg4.$0;
  __2=function(k)
  {
   return run(function(_arg5)
   {
    var __1,e,x;
    if(_arg5.$==1)
     {
      e=_arg5.$0;
      __1=k({$:1,$0:e});
     }
    else
     {
      x=_arg5.$0;
      __1=(Fork())(function()
      {
       var _,x_1;
       try
       {
        _=(Run())(f(x),k);
       }
       catch(x_1)
       {
        _=k({$:1,$0:x_1});
       }
       return _;
      });
     }
    return __1;
   });
  };
  return __16(__2);
 };
 (Concurrent()).Delay=function(mk)
 {
  var __1;
  __1=function(k)
  {
   var _,x;
   try
   {
    _=(Run())(mk(undefined),k);
   }
   catch(x)
   {
    _=k({$:1,$0:x});
   }
   return _;
  };
  return __16(__1);
 };
 (Concurrent()).Start=function(c)
 {
  return(Concurrent()).StartWithContinuations(c,__13,__12);
 };
 (Concurrent()).Parallel=function(cs)
 {
  var cs_1;
  cs_1=(ArrayModule()).OfSeq(cs);
  return{$:0,$0:function(k)
  {
   var a,accept,n,o;
   n=cs_1.length;
   o={contents:n};
   a=(ArrayModule()).Create(n,undefined);
   accept=function(i)
   {
    return function(x)
    {
     var __8;
     __8=function()
     {
      var _,__1,__2,__3,__7,e,e_1,matchValue,n_1,x_1,x_2;
      matchValue=[o.contents,x];
      if(matchValue[0]===0)
       ;
      else
       {
        if(matchValue[0]===1)
         {
          if(matchValue[1].$==1)
           {
            e=matchValue[1].$0;
            o.contents=0;
            _=k({$:1,$0:e});
           }
          else
           {
            x_1=matchValue[1].$0;
            a[i]=x_1;
            o.contents=0;
            _=k({$:0,$0:a});
           }
          __3=_;
         }
        else
         {
          if(matchValue[1].$==1)
           {
            e_1=matchValue[1].$0;
            o.contents=0;
            __2=k({$:1,$0:e_1});
           }
          else
           {
            x_2=matchValue[1].$0;
            n_1=matchValue[0];
            a[i]=x_2;
            __1=n_1-1;
            __2=o.contents=__1;
           }
          __3=__2;
         }
        __7=__3;
       }
      return __7;
     };
     return __8();
    };
   };
   return(ArrayModule()).IterateIndexed(function(i)
   {
    return function(_arg1)
    {
     var run;
     run=_arg1.$0;
     return(Fork())(function()
     {
      return run(accept(i));
     });
    };
   },cs_1);
  }};
 };
 (Concurrent()).StartChild=function(_arg8)
 {
  var __8,r;
  r=_arg8.$0;
  __8=function(k_1)
  {
   var _,__7,cached,queue,r2;
   _={$:0};
   cached={contents:_};
   queue=[];
   (Fork())(function()
   {
    var __3;
    __3=function(res)
    {
     var __1,__2;
     __1={$:1,$0:res};
     cached.contents=__1;
     __2=function()
     {
      while(queue.length>0)
       {
        (queue.shift())(res);
       }
     };
     return __6(__2);
    };
    return r(__3);
   });
   r2=function(k)
   {
    var __1,__2,matchValue,x;
    matchValue=cached.contents;
    if(matchValue.$==0)
     {
      __1=function()
      {
       return queue.push(k);
      };
      __2=__6(__1);
     }
    else
     {
      x=matchValue.$0;
      __2=k(x);
     }
    return __2;
   };
   __7={$:0,$0:{$:0,$0:r2}};
   return k_1(__7);
  };
  return __16(__8);
 };
 (Concurrent()).AwaitEvent=function(e)
 {
  return{$:0,$0:function(k)
  {
   var _,__2,__3,sub;
   _=undefined;
   sub={contents:_};
   __2=function(x)
   {
    var __1;
    __1=sub.contents;
    __1.Dispose();
    return k({$:0,$0:x});
   };
   __3=e.Subscribe((Of())(__2));
   return sub.contents=__3;
  }};
 };
 (Concurrent()).FromContinuations=function(subscribe)
 {
  return{$:0,$0:function(k)
  {
   return(subscribe(function(a)
   {
    return k({$:0,$0:a});
   }))(function(e)
   {
    return k({$:1,$0:e});
   });
  }};
 };
 (Concurrent()).StartWithContinuations=function(c,s,f)
 {
  return(Fork())(function()
  {
   return(Run())(c,function(res)
   {
    var _,exn,x;
    if(res.$==1)
     {
      exn=res.$0;
      _=f(exn);
     }
    else
     {
      x=res.$0;
      _=s(x);
     }
    return _;
   });
  });
 };
 (Concurrent()).Sleep=function(ms)
 {
  return{$:0,$0:function(k)
  {
   var _;
   _=function()
   {
    return k({$:0,$0:undefined});
   };
   return setTimeout(_,ms);
  }};
 };
 (Concurrent()).Ignore=function(c)
 {
  return(Concurrent()).Map(__13,c);
 };
 (Concurrent()).Catch=function(_arg7)
 {
  var __8,run;
  run=_arg7.$0;
  __8=function(k)
  {
   var _1,__3,__7,x_1;
   try
   {
    __3=function(res)
    {
     var _,__1,__2,e,x;
     if(res.$==1)
      {
       e=res.$0;
       _={$:0,$0:{$:1,$0:e}};
       __2=k(_);
      }
     else
      {
       x=res.$0;
       __1={$:0,$0:{$:0,$0:x}};
       __2=k(__1);
      }
     return __2;
    };
    _1=run(__3);
   }
   catch(x_1)
   {
    __7={$:0,$0:{$:1,$0:x_1}};
    _1=k(__7);
   }
   return _1;
  };
  return __16(__8);
 };
 (Concurrent()).Fork=function(action)
 {
  var _;
  _=(Concurrent()).Scheduler1;
  return _.Fork(action);
 };
 (Concurrent()).Run=function(_arg2,x)
 {
  var run;
  run=_arg2.$0;
  return run(x);
 };
 (Concurrent()).Map=function(f,_arg3)
 {
  var __2,run;
  run=_arg3.$0;
  __2=function(k)
  {
   return run(function(_arg5)
   {
    var _,__1,e,v,x;
    if(_arg5.$==1)
     {
      e=_arg5.$0;
      __1=k({$:1,$0:e});
     }
    else
     {
      v=_arg5.$0;
      try
      {
       _=k({$:0,$0:f(v)});
      }
      catch(x)
      {
       _=k({$:1,$0:x});
      }
      __1=_;
     }
    return __1;
   });
  };
  return __16(__2);
 };
 (Concurrent()).Scheduler1=new(Concurrent()).Scheduler();
 (Concurrent()).Do=new(Concurrent()).ConcurrentBuilder();
 (Control()).ExtraTopLevelOperators.Do=new(Control()).AsyncBuilder();
 (EventModule()).Split=function(f,e)
 {
  var __1,__2;
  __1=function(sourceEvent)
  {
   return(Choose_1())(function(x)
   {
    var _,matchValue,x_1;
    matchValue=f(x);
    if(matchValue.$==0)
     {
      x_1=matchValue.$0;
      _={$:1,$0:x_1};
     }
    else
     {
      _={$:0};
     }
    return _;
   },sourceEvent);
  };
  __2=function(sourceEvent)
  {
   return(Choose_1())(function(x)
   {
    var _,matchValue,x_1;
    matchValue=f(x);
    if(matchValue.$==1)
     {
      x_1=matchValue.$0;
      _={$:1,$0:x_1};
     }
    else
     {
      _={$:0};
     }
    return _;
   },sourceEvent);
  };
  return[__1(e),__2(e)];
 };
 (EventModule()).Scan=function(fold,seed,e)
 {
  var f,state;
  state={contents:seed};
  f=function(value)
  {
   var _;
   _=(fold(state.contents))(value);
   state.contents=_;
   return state.contents;
  };
  return(EventModule()).Map(f,e);
 };
 (EventModule()).Partition=function(f,e)
 {
  return[(Filter_1())(f,e),(Filter_1())(function(x)
  {
   return!f(x);
  },e)];
 };
 (EventModule()).Pairwise=function(e)
 {
  var _,__7,buf,ev;
  _={$:0};
  buf={contents:_};
  ev=(NewRecord())(Event_1(),{Handlers:[]});
  __7=function(x)
  {
   var __1,__2,__3,matchValue,old;
   matchValue=buf.contents;
   if(matchValue.$==1)
    {
     old=matchValue.$0;
     __1={$:1,$0:x};
     buf.contents=__1;
     __3=ev.Trigger([old,x]);
    }
   else
    {
     __2={$:1,$0:x};
     __3=buf.contents=__2;
    }
   return __3;
  };
  void e.Subscribe((Of())(__7));
  return ev;
 };
 (EventModule()).Merge=function(e1,e2)
 {
  var _,__1,r;
  r=(NewRecord())(Event_1(),{Handlers:[]});
  _=function(arg00)
  {
   return r.Trigger(arg00);
  };
  void e1.Subscribe((Of())(_));
  __1=function(arg00)
  {
   return r.Trigger(arg00);
  };
  void e2.Subscribe((Of())(__1));
  return r;
 };
 (EventModule()).Map=function(f,e)
 {
  var _,r;
  r=(NewRecord())(Event_1(),{Handlers:[]});
  _=function(x)
  {
   return r.Trigger(f(x));
  };
  void e.Subscribe((Of())(_));
  return r;
 };
 (EventModule()).Filter=function(ok,e)
 {
  var __1,r;
  r=(NewRecord())(Event_1(),{Handlers:[]});
  __1=function(x)
  {
   var _;
   if(ok(x))
    {
     _=r.Trigger(x);
    }
   return _;
  };
  void e.Subscribe((Of())(__1));
  return r;
 };
 (EventModule()).Choose=function(c,e)
 {
  var __2,r;
  r=new(FSharpEvent_1())();
  __2=function(x)
  {
   var _,__1,matchValue,y;
   matchValue=c(x);
   if(matchValue.$==0)
    ;
   else
    {
     y=matchValue.$0;
     _=r.event;
     __1=_.Trigger(y);
    }
   return __1;
  };
  void e.Subscribe((Of())(__2));
  return r.event;
 };
}());
