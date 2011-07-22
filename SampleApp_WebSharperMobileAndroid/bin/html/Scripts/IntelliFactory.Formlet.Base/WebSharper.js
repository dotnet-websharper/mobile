(function()
{
 var global=this;
 var Append,Base,Class,Compare,Count,DeepFlipEdit,Delete,Edit_1,Equals,FSharpList_1,Fold,Form_2,Formlet_2,Map,NewRecord,NewUnion,OfArray,OfSeq,ReplacedTree,Result_1,SeqModule,Set,Transform,Tree,Tree_1,WebSharper,__10,__13,__2,__21,__3,__5,__8,__9;
 IntelliFactory.WebSharper.Runtime.Declare({IntelliFactory:{Formlet:{Base:{Validator:{},Tree:{"Tree`1":{},"Edit`1":{}},"Result`1":{},LayoutUtils:{},"Formlet`2":{},"FormletProvider`1":{},"FormletBuilder`1":{},"Form`2":{},D:{}}}}});
 Tree=function()
 {
  return IntelliFactory.Formlet.Base.Tree;
 };
 Base=function()
 {
  return IntelliFactory.Formlet.Base;
 };
 (function()
 {
  return IntelliFactory.Formlet;
 });
 Class=function()
 {
  return IntelliFactory.WebSharper.Runtime.Class;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Runtime;
 });
 WebSharper=function()
 {
  return IntelliFactory.WebSharper;
 };
 __2=function()
 {
  var _this=this;
  var _;
  _=_this.get_Sequence();
  return _.GetEnumerator();
 };
 Append=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Append;
 };
 SeqModule=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core;
 });
 NewUnion=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewUnion;
 };
 Tree_1=function()
 {
  return IntelliFactory.Formlet.Base.Tree["Tree`1"];
 };
 OfArray=function()
 {
  return IntelliFactory.WebSharper.Core.ListModule.OfArray;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.ListModule;
 });
 __3=function(value)
 {
  return value;
 };
 Compare=function()
 {
  return IntelliFactory.WebSharper.Core.Comparison.Compare;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.Comparison;
 });
 Equals=function()
 {
  return IntelliFactory.WebSharper.Core.Equality.Equals;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Core.Equality;
 });
 NewRecord=function()
 {
  return IntelliFactory.WebSharper.Runtime.NewRecord;
 };
 Form_2=function()
 {
  return IntelliFactory.Formlet.Base["Form`2"];
 };
 Set=function()
 {
  return IntelliFactory.Formlet.Base.Tree.Set;
 };
 Formlet_2=function()
 {
  return IntelliFactory.Formlet.Base["Formlet`2"];
 };
 __5=function(value)
 {
  return void value;
 };
 FSharpList_1=function()
 {
  return IntelliFactory.WebSharper.Core["FSharpList`1"];
 };
 Map=function()
 {
  return IntelliFactory.Formlet.Base["Result`1"].Map;
 };
 Result_1=function()
 {
  return IntelliFactory.Formlet.Base["Result`1"];
 };
 __8=function(arg0)
 {
  return IntelliFactory.WebSharper.Runtime.NewUnion(IntelliFactory.Formlet.Base.Tree["Edit`1"],1,arg0);
 };
 Edit_1=function()
 {
  return IntelliFactory.Formlet.Base.Tree["Edit`1"];
 };
 __9=function(arg0)
 {
  return IntelliFactory.WebSharper.Runtime.NewUnion(IntelliFactory.Formlet.Base.Tree["Edit`1"],2,arg0);
 };
 Delete=function()
 {
  return IntelliFactory.Formlet.Base.Tree.Delete;
 };
 __10=function(f)
 {
  return f.State;
 };
 __13=function(arg0)
 {
  return{$:1,$0:arg0};
 };
 OfSeq=function()
 {
  return IntelliFactory.WebSharper.Core.ListModule.OfSeq;
 };
 __21=function()
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
 ReplacedTree=function()
 {
  return IntelliFactory.Formlet.Base.Tree.ReplacedTree;
 };
 Fold=function()
 {
  return IntelliFactory.WebSharper.Core.SeqModule.Fold;
 };
 Count=function()
 {
  return IntelliFactory.Formlet.Base.Tree.Count;
 };
 DeepFlipEdit=function()
 {
  return IntelliFactory.Formlet.Base.Tree.DeepFlipEdit;
 };
 Transform=function()
 {
  return IntelliFactory.Formlet.Base.Tree.Transform;
 };
 (Tree())["Edit`1"]=(Class())(null,null,{get_Sequence:function()
 {
  var _this=this;
  var edit;
  edit=_this.$0;
  return edit.get_Sequence();
 },GetEnumerator:__2,GetEnumerator:__2});
 (Tree())["Tree`1"]=(Class())(null,null,{get_Sequence:function()
 {
  var _this=this;
  var _,__1,x,x_1,y;
  if(_this.$==1)
   {
    x=_this.$0;
    __1=[x];
   }
  else
   {
    if(_this.$==2)
     {
      y=_this.$1;
      x_1=_this.$0;
      _=(Append())(x_1.get_Sequence(),y.get_Sequence());
     }
    else
     {
      _=(SeqModule()).Empty();
     }
    __1=_;
   }
  return __1;
 },Map:function(f)
 {
  var _this=this;
  var _,__1,left,right,t;
  if(_this.$==1)
   {
    t=_this.$0;
    __1=(NewUnion())(Tree_1(),1,f(t));
   }
  else
   {
    if(_this.$==2)
     {
      right=_this.$1;
      left=_this.$0;
      _=(NewUnion())(Tree_1(),2,left.Map(f),right.Map(f));
     }
    else
     {
      _=(NewUnion())(Tree_1(),0);
     }
    __1=_;
   }
  return __1;
 },GetEnumerator:__2,GetEnumerator:__2});
 (Base()).Validator=(Class())(function(VP)
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
  _this.VP=VP;
 },null,{Validate:function(f,msg,flet)
 {
  var __4;
  __4=flet.MapResult(function(res)
  {
   var _,__1,fs,v;
   if(res.$==1)
    {
     fs=res.$0;
     __1={$:1,$0:fs};
    }
   else
    {
     v=res.$0;
     if(f(v))
      {
       _={$:0,$0:v};
      }
     else
      {
       _={$:1,$0:(OfArray())([msg])};
      }
     __1=_;
    }
   return __1;
  });
  return __3(__4);
 },Is:function(f,m,flet)
 {
  var _this=this;
  return _this.Validate(f,m,flet);
 },IsNotEmpty:function(msg,flet)
 {
  var _this=this;
  return _this.Validate(function(s)
  {
   return s!=="";
  },msg,flet);
 },IsRegexMatch:function(regex,msg,flet)
 {
  var _this=this;
  return _this.Validate(function(x)
  {
   var objectArg;
   objectArg=_this.VP;
   return(function(arg00)
   {
    return function(arg10)
    {
     return objectArg.Matches(arg00,arg10);
    };
   }(regex))(x);
  },msg,flet);
 },IsEmail:function(msg)
 {
  var _this=this;
  return function(arg20)
  {
   return _this.IsRegexMatch("^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$",msg,arg20);
  };
 },IsInt:function(msg)
 {
  var _this=this;
  return function(arg20)
  {
   return _this.IsRegexMatch("^-?\\d+$",msg,arg20);
  };
 },IsFloat:function(msg)
 {
  var _this=this;
  return function(arg20)
  {
   return _this.IsRegexMatch("^\\s*(\\+|-)?((\\d+(\\.\\d+)?)|(\\.\\d+))\\s*$",msg,arg20);
  };
 },IsTrue:function(msg,flet)
 {
  var _this=this;
  return _this.Validate(__3,msg,flet);
 },IsGreaterThan:function(min,msg,flet)
 {
  var _this=this;
  return _this.Validate(function(i)
  {
   return(Compare())(i,min)==1;
  },msg,flet);
 },IsLessThan:function(max,msg,flet)
 {
  var _this=this;
  return _this.Validate(function(i)
  {
   return(Compare())(i,max)==-1;
  },msg,flet);
 },IsEqual:function(value,msg,flet)
 {
  var _this=this;
  return _this.Validate(function(i)
  {
   return(Equals())(i,value);
  },msg,flet);
 },IsNotEqual:function(value,msg,flet)
 {
  var _this=this;
  return _this.Validate(function(i)
  {
   return!(Equals())(i,value);
  },msg,flet);
 }});
 (Base())["FormletBuilder`1"]=(Class())(function(F)
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
  _this.F=F;
 },null,{Return:function(x)
 {
  var _this=this;
  var _;
  _=_this.F;
  return _.Return(x);
 },Bind:function(x,f)
 {
  var _this=this;
  var objectArg;
  objectArg=_this.F;
  return(function(arg00)
  {
   return function(arg10)
   {
    return objectArg.Bind(arg00,arg10);
   };
  }(x))(f);
 },Delay:function(f)
 {
  var _this=this;
  var _;
  _=_this.F;
  return _.Delay(f);
 },ReturnFrom:__3});
 (Base())["FormletProvider`1"]=(Class())(function(U)
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
  _this.U=U;
  _this.L=new(Base()).LayoutUtils({Reactive:_this.U.Reactive});
 },null,{BuildForm:function(formlet)
 {
  var _this=this;
  var _,__1,body,d,form,matchValue;
  form=formlet.Build();
  matchValue=(formlet.get_Layout()).Apply(form.Body);
  if(matchValue.$==1)
   {
    d=matchValue.$0[1];
    body=matchValue.$0[0];
    _=_this.U.Reactive;
    __1=(NewRecord())(Form_2(),{Body:_.Return((Set())(body)),Dispose:function()
    {
     form.Dispose(undefined);
     return d.Dispose();
    },Notify:form.Notify,State:form.State});
   }
  else
   {
    __1=form;
   }
  return __1;
 },New:function(build)
 {
  var _this=this;
  var _;
  _=_this.L;
  return(NewRecord())(Formlet_2(),{Layout:_.Default(),Build:build,Utils:_this.U});
 },FromState:function(state)
 {
  var _this=this;
  var __1,__4;
  __1=function(arg00)
  {
   return _this.New(arg00);
  };
  __4=function()
  {
   var _;
   _=_this.U.Reactive;
   return(NewRecord())(Form_2(),{Body:_.Never(),Dispose:__5,Notify:__5,State:state});
  };
  return __1(__4);
 },WithLayout:function(layout,formlet)
 {
  var _this=this;
  return(NewRecord())(Formlet_2(),{Layout:layout,Build:function()
  {
   return formlet.Build();
  },Utils:_this.U});
 },InitWith:function(value,formlet)
 {
  var _this=this;
  var __1,__4,__6,__7;
  __1=function(arg00)
  {
   return _this.New(arg00);
  };
  __4=function()
  {
   var _,form,objectArg,state;
   form=formlet.Build();
   objectArg=_this.U.Reactive;
   _=_this.U.Reactive;
   state=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg.Concat(arg00,arg10);
    };
   }(_.Return({$:0,$0:value})))(form.State);
   return(NewRecord())(Form_2(),{Body:form.Body,Dispose:form.Dispose,Notify:form.Notify,State:state});
  };
  __7=__1(__4);
  __6=function(arg10)
  {
   return _this.WithLayout(formlet.get_Layout(),arg10);
  };
  return __6(__7);
 },ReplaceFirstWithFailure:function(formlet)
 {
  var _this=this;
  var __1,__4,__6,__7;
  __1=function(arg00)
  {
   return _this.New(arg00);
  };
  __4=function()
  {
   var _,form,objectArg,objectArg_1,state,state_1;
   form=formlet.Build();
   objectArg=_this.U.Reactive;
   state=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg.Drop(arg00,arg10);
    };
   }(form.State))(1);
   objectArg_1=_this.U.Reactive;
   _=_this.U.Reactive;
   state_1=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg_1.Concat(arg00,arg10);
    };
   }(_.Return({$:1,$0:(NewUnion())(FSharpList_1(),0)})))(state);
   return(NewRecord())(Form_2(),{Body:form.Body,Dispose:form.Dispose,Notify:form.Notify,State:state_1});
  };
  __7=__1(__4);
  __6=function(arg10)
  {
   return _this.WithLayout(formlet.get_Layout(),arg10);
  };
  return __6(__7);
 },InitWithFailure:function(formlet)
 {
  var _this=this;
  var __1,__4,__6,__7;
  __1=function(arg00)
  {
   return _this.New(arg00);
  };
  __4=function()
  {
   var _,form,objectArg,state;
   form=formlet.Build();
   objectArg=_this.U.Reactive;
   _=_this.U.Reactive;
   state=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg.Concat(arg00,arg10);
    };
   }(_.Return({$:1,$0:(NewUnion())(FSharpList_1(),0)})))(form.State);
   return(NewRecord())(Form_2(),{Body:form.Body,Dispose:form.Dispose,Notify:form.Notify,State:state});
  };
  __7=__1(__4);
  __6=function(arg10)
  {
   return _this.WithLayout(formlet.get_Layout(),arg10);
  };
  return __6(__7);
 },ApplyLayout:function(formlet)
 {
  var _this=this;
  var __4,__6;
  __4=function(arg00)
  {
   return _this.New(arg00);
  };
  __6=function()
  {
   var _,__1,body,body_1,form,matchValue;
   form=formlet.Build();
   matchValue=(formlet.get_Layout()).Apply(form.Body);
   if(matchValue.$==0)
    {
     __1=form.Body;
    }
   else
    {
     body=matchValue.$0[0];
     _=_this.U.Reactive;
     __1=_.Return((Set())(body));
    }
   body_1=__1;
   return(NewRecord())(Form_2(),{Body:body_1,Dispose:form.Dispose,Notify:form.Notify,State:form.State});
  };
  return __4(__6);
 },AppendLayout:function(layout,formlet)
 {
  var _this=this;
  var _,__1;
  __1=_this.ApplyLayout(formlet);
  _=function(arg10)
  {
   return _this.WithLayout(layout,arg10);
  };
  return _(__1);
 },MapBody:function(f,formlet)
 {
  var _this=this;
  var layout;
  layout={Apply:function(o)
  {
   var _,__1,body,body_1,d,d_1,matchValue,matchValue_1;
   matchValue=(formlet.get_Layout()).Apply(o);
   if(matchValue.$==0)
    {
     matchValue_1=_this.U.DefaultLayout.Apply(o);
     if(matchValue_1.$==0)
      {
       _={$:0};
      }
     else
      {
       d=matchValue_1.$0[1];
       body=matchValue_1.$0[0];
       _={$:1,$0:[f(body),d]};
      }
     __1=_;
    }
   else
    {
     d_1=matchValue.$0[1];
     body_1=matchValue.$0[0];
     __1={$:1,$0:[f(body_1),d_1]};
    }
   return __1;
  }};
  return _this.WithLayout(layout,formlet);
 },WithLayoutOrDefault:function(formlet)
 {
  var _this=this;
  return _this.MapBody(__3,formlet);
 },MapResult:function(f,formlet)
 {
  var _this=this;
  var Build;
  Build=function()
  {
   var form,objectArg,state;
   form=formlet.Build();
   objectArg=_this.U.Reactive;
   state=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg.Select(arg00,arg10);
    };
   }(form.State))(function(x)
   {
    return f(x);
   });
   return(NewRecord())(Form_2(),{Body:form.Body,Dispose:form.Dispose,Notify:form.Notify,State:state});
  };
  return(NewRecord())(Formlet_2(),{Layout:formlet.get_Layout(),Build:Build,Utils:_this.U});
 },Map:function(f,formlet)
 {
  var _this=this;
  return _this.MapResult(function(arg10)
  {
   return(Map())(f,arg10);
  },formlet);
 },Apply:function(f,x)
 {
  var _this=this;
  var _,__1;
  _=function(arg00)
  {
   return _this.New(arg00);
  };
  __1=function()
  {
   var body,f_1,left,objectArg,objectArg_1,objectArg_2,objectArg_3,right,state,x_1;
   f_1=_this.BuildForm(f);
   x_1=_this.BuildForm(x);
   objectArg=_this.U.Reactive;
   left=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg.Select(arg00,arg10);
    };
   }(f_1.Body))(__8);
   objectArg_1=_this.U.Reactive;
   right=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg_1.Select(arg00,arg10);
    };
   }(x_1.Body))(__9);
   objectArg_2=_this.U.Reactive;
   body=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg_2.Merge(arg00,arg10);
    };
   }(left))(right);
   objectArg_3=_this.U.Reactive;
   state=((function(arg00)
   {
    return function(arg10)
    {
     return function(arg20)
     {
      return objectArg_3.CombineLatest(arg00,arg10,arg20);
     };
    };
   }(x_1.State))(f_1.State))(function(r)
   {
    return function(f_2)
    {
     return(Result_1()).Apply(f_2,r);
    };
   });
   return(NewRecord())(Form_2(),{Body:body,Dispose:function()
   {
    x_1.Dispose(undefined);
    return f_1.Dispose(undefined);
   },Notify:function(o)
   {
    x_1.Notify(o);
    return f_1.Notify(o);
   },State:state});
  };
  return _(__1);
 },Return:function(x)
 {
  var _this=this;
  var __4,__6;
  __4=function(arg00)
  {
   return _this.New(arg00);
  };
  __6=function()
  {
   var _,__1;
   _=_this.U.Reactive;
   __1=_this.U.Reactive;
   return(NewRecord())(Form_2(),{Body:_.Never(),Dispose:__3,Notify:__5,State:__1.Return({$:0,$0:x})});
  };
  return __4(__6);
 },FailWith:function(fs)
 {
  var _this=this;
  var __4,__6;
  __4=function(arg00)
  {
   return _this.New(arg00);
  };
  __6=function()
  {
   var _,__1;
   _=_this.U.Reactive;
   __1=_this.U.Reactive;
   return(NewRecord())(Form_2(),{Body:_.Never(),Dispose:__3,Notify:__5,State:__1.Return({$:1,$0:fs})});
  };
  return __4(__6);
 },ReturnEmpty:function(x)
 {
  var _this=this;
  var __4,__6;
  __4=function(arg00)
  {
   return _this.New(arg00);
  };
  __6=function()
  {
   var _,__1;
   _=_this.U.Reactive;
   __1=_this.U.Reactive;
   return(NewRecord())(Form_2(),{Body:_.Return((Delete())()),Dispose:__3,Notify:__5,State:__1.Return({$:0,$0:x})});
  };
  return __4(__6);
 },Never:function()
 {
  var _this=this;
  var __4,__6;
  __4=function(arg00)
  {
   return _this.New(arg00);
  };
  __6=function()
  {
   var _,__1;
   _=_this.U.Reactive;
   __1=_this.U.Reactive;
   return(NewRecord())(Form_2(),{Body:_.Never(),Dispose:__5,Notify:__5,State:__1.Never()});
  };
  return __4(__6);
 },Empty:function()
 {
  var _this=this;
  var __4,__6;
  __4=function(arg00)
  {
   return _this.New(arg00);
  };
  __6=function()
  {
   var _,__1;
   _=_this.U.Reactive;
   __1=_this.U.Reactive;
   return(NewRecord())(Form_2(),{Body:_.Return((Delete())()),Dispose:__5,Notify:__5,State:__1.Never()});
  };
  return __4(__6);
 },EmptyForm:function()
 {
  var _this=this;
  var _,__1;
  _=_this.U.Reactive;
  __1=_this.U.Reactive;
  return(NewRecord())(Form_2(),{Body:_.Never(),Dispose:__5,Notify:__5,State:__1.Never()});
 },Join:function(formlet)
 {
  var _this=this;
  var __11,__12;
  __11=function(arg00)
  {
   return _this.New(arg00);
  };
  __12=function()
  {
   var __1,__4,__6,__7,body,dispose,form1,formStream,notify,objectArg,objectArg_1,objectArg_2,objectArg_4,objectArg_5,objectArg_6,objectArg_7,right,state,value;
   form1=_this.BuildForm(formlet);
   objectArg=_this.U.Reactive;
   __4=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg.Select(arg00,arg10);
    };
   }(form1.State))(function(res)
   {
    var _,innerF;
    if(res.$==1)
     {
      _=_this.EmptyForm();
     }
    else
     {
      innerF=res.$0;
      _=_this.BuildForm(innerF);
     }
    return _;
   });
   objectArg_1=_this.U.Reactive;
   __1=function(arg00)
   {
    return objectArg_1.Heat(arg00);
   };
   formStream=__1(__4);
   objectArg_2=_this.U.Reactive;
   value=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg_2.Select(arg00,arg10);
    };
   }(formStream))(function(f)
   {
    var _,_delete,objectArg_3;
    _=_this.U.Reactive;
    _delete=_.Return((Delete())());
    objectArg_3=_this.U.Reactive;
    return(function(arg00)
    {
     return function(arg10)
     {
      return objectArg_3.Concat(arg00,arg10);
     };
    }(_delete))(f.Body);
   });
   objectArg_4=_this.U.Reactive;
   __6=_this.U.Reactive;
   right=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg_4.Select(arg00,arg10);
    };
   }(__6.Switch(value)))(__9);
   objectArg_5=_this.U.Reactive;
   objectArg_6=_this.U.Reactive;
   body=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg_5.Merge(arg00,arg10);
    };
   }((function(arg00)
   {
    return function(arg10)
    {
     return objectArg_6.Select(arg00,arg10);
    };
   }(form1.Body))(__8)))(right);
   __7=_this.U.Reactive;
   objectArg_7=_this.U.Reactive;
   state=__7.Switch((function(arg00)
   {
    return function(arg10)
    {
     return objectArg_7.Select(arg00,arg10);
    };
   }(formStream))(__10));
   notify=function(o)
   {
    return form1.Notify(o);
   };
   dispose=function()
   {
    return form1.Dispose(undefined);
   };
   return(NewRecord())(Form_2(),{Body:body,Dispose:dispose,Notify:notify,State:state});
  };
  return __11(__12);
 },Switch:function(formlet)
 {
  var _this=this;
  var __15,__16;
  __15=function(arg00)
  {
   return _this.New(arg00);
  };
  __16=function()
  {
   var _,__1,__11,__12,__14,__7,body,dispose,form1,formStream,formlet_1,notify,objectArg,objectArg_1,objectArg_2,objectArg_3,objectArg_4,state;
   __1=_this.WithLayoutOrDefault(formlet);
   _=function(arg00)
   {
    return _this.ApplyLayout(arg00);
   };
   formlet_1=_(__1);
   form1=_this.BuildForm(formlet_1);
   objectArg=_this.U.Reactive;
   __11=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg.Choose(arg00,arg10);
    };
   }(form1.State))(function(res)
   {
    var __4,__6,innerF;
    if(res.$==1)
     {
      __6={$:0};
     }
    else
     {
      innerF=res.$0;
      __4=_this.BuildForm(innerF);
      __6=__13(__4);
     }
    return __6;
   });
   objectArg_1=_this.U.Reactive;
   __7=function(arg00)
   {
    return objectArg_1.Heat(arg00);
   };
   formStream=__7(__11);
   objectArg_2=_this.U.Reactive;
   __12=_this.U.Reactive;
   objectArg_3=_this.U.Reactive;
   body=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg_2.Concat(arg00,arg10);
    };
   }(form1.Body))(__12.Switch((function(arg00)
   {
    return function(arg10)
    {
     return objectArg_3.Select(arg00,arg10);
    };
   }(formStream))(function(f)
   {
    return f.Body;
   })));
   __14=_this.U.Reactive;
   objectArg_4=_this.U.Reactive;
   state=__14.Switch((function(arg00)
   {
    return function(arg10)
    {
     return objectArg_4.Select(arg00,arg10);
    };
   }(formStream))(__10));
   notify=function(o)
   {
    return form1.Notify(o);
   };
   dispose=function()
   {
    return form1.Dispose(undefined);
   };
   return(NewRecord())(Form_2(),{Body:body,Dispose:dispose,Notify:notify,State:state});
  };
  return __15(__16);
 },FlipBody:function(formlet)
 {
  var _this=this;
  var _,__1,__4,__6;
  _=function(arg00)
  {
   return _this.New(arg00);
  };
  __1=function()
  {
   var body,form,objectArg;
   form=formlet.Build();
   objectArg=_this.U.Reactive;
   body=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg.Select(arg00,arg10);
    };
   }(form.Body))(function(edit)
   {
    return(Tree()).FlipEdit(edit);
   });
   return(NewRecord())(Form_2(),{Body:body,Dispose:form.Dispose,Notify:form.Notify,State:form.State});
  };
  __6=_(__1);
  __4=function(arg10)
  {
   return _this.WithLayout(formlet.get_Layout(),arg10);
  };
  return __4(__6);
 },SelectMany:function(formlet)
 {
  var _this=this;
  var __12,__14;
  __12=function(arg00)
  {
   return _this.New(arg00);
  };
  __14=function()
  {
   var __11,__4,__6,__7,allBodies,body,dispose,form1,formStream,incrTag,left,notify,objectArg,objectArg_1,objectArg_2,objectArg_3,objectArg_5,objectArg_6,objectArg_7,right,state,stateStream,tag;
   form1=_this.BuildForm(formlet);
   objectArg=_this.U.Reactive;
   __6=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg.Choose(arg00,arg10);
    };
   }(form1.State))(function(res)
   {
    var _,__1,innerF;
    if(res.$==1)
     {
      __1={$:0};
     }
    else
     {
      innerF=res.$0;
      _=_this.BuildForm(innerF);
      __1=__13(_);
     }
    return __1;
   });
   objectArg_1=_this.U.Reactive;
   __4=function(arg00)
   {
    return objectArg_1.Heat(arg00);
   };
   formStream=__4(__6);
   objectArg_2=_this.U.Reactive;
   left=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg_2.Select(arg00,arg10);
    };
   }(form1.Body))(__8);
   tag={contents:__8};
   incrTag=function()
   {
    var _,f;
    f=tag.contents;
    _=function(x)
    {
     var arg0;
     arg0=f(x);
     return(NewUnion())(Edit_1(),2,arg0);
    };
    return tag.contents=_;
   };
   objectArg_3=_this.U.Reactive;
   allBodies=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg_3.Select(arg00,arg10);
    };
   }(formStream))(function(f)
   {
    var objectArg_4,tagLocal;
    incrTag(undefined);
    tagLocal=tag.contents;
    objectArg_4=_this.U.Reactive;
    return(function(arg00)
    {
     return function(arg10)
     {
      return objectArg_4.Select(arg00,arg10);
     };
    }(f.Body))(tagLocal);
   });
   __7=_this.U.Reactive;
   right=__7.SelectMany(allBodies);
   objectArg_5=_this.U.Reactive;
   body=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg_5.Merge(arg00,arg10);
    };
   }(left))(right);
   objectArg_6=_this.U.Reactive;
   stateStream=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg_6.Select(arg00,arg10);
    };
   }(formStream))(__10);
   objectArg_7=_this.U.Reactive;
   __11=_this.U.Reactive;
   state=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg_7.Select(arg00,arg10);
    };
   }(__11.CollectLatest(stateStream)))(function(arg00)
   {
    return(Result_1()).Sequence(arg00);
   });
   notify=function(o)
   {
    return form1.Notify(o);
   };
   dispose=function()
   {
    return form1.Dispose(undefined);
   };
   return(NewRecord())(Form_2(),{Body:body,Dispose:dispose,Notify:notify,State:state});
  };
  return __12(__14);
 },WithNotificationChannel:function(formlet)
 {
  var _this=this;
  var _,__1,__4,__6;
  _=function(arg00)
  {
   return _this.New(arg00);
  };
  __1=function()
  {
   var Notify,form,objectArg,state;
   form=formlet.Build();
   objectArg=_this.U.Reactive;
   state=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg.Select(arg00,arg10);
    };
   }(form.State))(function(arg10)
   {
    return(Map())(function(v)
    {
     return[v,form.Notify];
    },arg10);
   });
   Notify=form.Notify;
   return(NewRecord())(Form_2(),{Body:form.Body,Dispose:form.Dispose,Notify:Notify,State:state});
  };
  __6=_(__1);
  __4=function(arg10)
  {
   return _this.WithLayout(formlet.get_Layout(),arg10);
  };
  return __4(__6);
 },Replace:function(formlet,f)
 {
  var _this=this;
  var _,__1,__4;
  _=function(arg10)
  {
   return _this.Map(function(value)
   {
    return f(value);
   },arg10);
  };
  __4=_(formlet);
  __1=function(arg00)
  {
   return _this.Switch(arg00);
  };
  return __1(__4);
 },Deletable:function(formlet)
 {
  var _this=this;
  var arg10;
  arg10=function(value)
  {
   var _,value_1;
   if(value.$==1)
    {
     value_1=value.$0;
     _=_this.Return({$:1,$0:value_1});
    }
   else
    {
     _=_this.ReturnEmpty({$:0});
    }
   return _;
  };
  return _this.Replace(formlet,arg10);
 },WithCancelation:function(formlet,cancelFormlet)
 {
  var _this=this;
  var __4,__6,compose,f,f1,f2,f3;
  compose=function(r1)
  {
   return function(r2)
   {
    var _,__1,fs,matchValue,s;
    matchValue=[r1,r2];
    if(matchValue[1].$==0)
     {
      __1={$:0,$0:{$:0}};
     }
    else
     {
      if(matchValue[0].$==1)
       {
        fs=matchValue[0].$0;
        _={$:1,$0:fs};
       }
      else
       {
        s=matchValue[0].$0;
        _={$:0,$0:{$:1,$0:s}};
       }
      __1=_;
     }
    return __1;
   };
  };
  f1=_this.Return(compose);
  f2=_this.LiftResult(formlet);
  f3=_this.LiftResult(cancelFormlet);
  f=_this.Apply(f1,f2);
  __6=_this.Apply(f,f3);
  __4=function(arg10)
  {
   return _this.MapResult(function(arg00)
   {
    return(Result_1()).Join(arg00);
   },arg10);
  };
  return __4(__6);
 },Bind:function(formlet,f)
 {
  var _this=this;
  var _,__1,__4;
  _=function(arg10)
  {
   return _this.Map(f,arg10);
  };
  __4=_(formlet);
  __1=function(arg00)
  {
   return _this.Join(arg00);
  };
  return __1(__4);
 },Delay:function(f)
 {
  var _this=this;
  var Build,_;
  Build=function()
  {
   return _this.BuildForm(f(undefined));
  };
  _=_this.L;
  return(NewRecord())(Formlet_2(),{Layout:_.Delay(function()
  {
   var __1;
   __1=f(undefined);
   return __1.get_Layout();
  }),Build:Build,Utils:_this.U});
 },Sequence:function(fs)
 {
  var _this=this;
  var _,f,fComp,fRest,fs_1,fs_2;
  fs_1=(OfSeq())(fs);
  if(fs_1.$==1)
   {
    fs_2=fs_1.$1;
    f=fs_1.$0;
    fComp=_this.Return(function(v)
    {
     return function(vs)
     {
      return(NewUnion())(FSharpList_1(),1,v,vs);
     };
    });
    fRest=_this.Sequence(fs_2);
    _=_this.Apply(_this.Apply(fComp,f),fRest);
   }
  else
   {
    _=_this.Return((NewUnion())(FSharpList_1(),0));
   }
  return _;
 },LiftResult:function(formlet)
 {
  var _this=this;
  return _this.MapResult(function(arg0)
  {
   return{$:0,$0:arg0};
  },formlet);
 },WithNotification:function(notify,formlet)
 {
  var _this=this;
  var _,__1,__4,__6;
  _=function(arg00)
  {
   return _this.New(arg00);
  };
  __1=function()
  {
   var Notify,form;
   form=_this.BuildForm(formlet);
   Notify=function(obj)
   {
    form.Notify(obj);
    return notify(obj);
   };
   return(NewRecord())(Form_2(),{Body:form.Body,Dispose:form.Dispose,Notify:Notify,State:form.State});
  };
  __6=_(__1);
  __4=function(arg10)
  {
   return _this.WithLayout(formlet.get_Layout(),arg10);
  };
  return __4(__6);
 },BindWith:function(hF,formlet,f)
 {
  var _this=this;
  var __19,__20;
  __19=function(arg00)
  {
   return _this.New(arg00);
  };
  __20=function()
  {
   var _,__1,__11,__12,__14,__15,__16,__17,__18,__4,__6,__7,bLeft,bRight,combB,form,formlet_1,left,matchValue,objectArg,objectArg_1,objectArg_2,right;
   formlet_1=_this.Bind(formlet,f);
   form=formlet_1.Build();
   objectArg=_this.U.Reactive;
   __1=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg.Where(arg00,arg10);
    };
   }(form.Body))(function(edit)
   {
    return edit.$==1?true:false;
   });
   _=_this.U.DefaultLayout.Apply;
   left=_(__1);
   objectArg_1=_this.U.Reactive;
   __6=(function(arg00)
   {
    return function(arg10)
    {
     return objectArg_1.Where(arg00,arg10);
    };
   }(form.Body))(function(edit)
   {
    return edit.$==2?true:false;
   });
   __4=_this.U.DefaultLayout.Apply;
   right=__4(__6);
   matchValue=[left,right];
   if(matchValue[0].$==1)
    {
     if(matchValue[1].$==1)
      {
       bLeft=matchValue[0].$0[0];
       bRight=matchValue[1].$0[0];
       __11=(hF(bLeft))(bRight);
       __7=function(value)
       {
        return(Set())(value);
       };
       __14=__7(__11);
       objectArg_2=_this.U.Reactive;
       __12=function(arg00)
       {
        return objectArg_2.Return(arg00);
       };
       __16=__12(__14);
      }
     else
      {
       __15=_this.U.Reactive;
       __16=__15.Never();
      }
     __18=__16;
    }
   else
    {
     __17=_this.U.Reactive;
     __18=__17.Never();
    }
   combB=__18;
   return(NewRecord())(Form_2(),{Body:combB,Dispose:form.Dispose,Notify:form.Notify,State:form.State});
  };
  return __19(__20);
 }});
 (Base())["Formlet`2"]=(Class())(null,null,{get_Layout:function()
 {
  var _this=this;
  return _this.Layout;
 },Build:function()
 {
  var _this=this;
  return _this.Build(undefined);
 },MapResult:function(f)
 {
  var _this=this;
  return(NewRecord())(Formlet_2(),{Layout:_this.Layout,Build:function()
  {
   var form,objectArg,state;
   form=_this.Build(undefined);
   objectArg=_this.Utils.Reactive;
   ((function(arg00)
   {
    return function(arg10)
    {
     return objectArg.Select(arg00,arg10);
    };
   }(form.State))(function(x)
   {
    return f(x);
   }));
   state=form.State;
   return(NewRecord())(Form_2(),{Body:form.Body,Dispose:form.Dispose,Notify:form.Notify,State:state});
  },Utils:_this.Utils});
 }});
 (Base())["Form`2"]=(Class())(null,null,{Dispose:function()
 {
  var _this=this;
  return _this.Dispose(undefined);
 }});
 (Base()).LayoutUtils=(Class())(__21,null,{Default:function()
 {
  return{Apply:function()
  {
   return{$:0};
  }};
 },Delay:function(f)
 {
  return{Apply:function(x)
  {
   return(f(undefined)).Apply(x);
  }};
 },New:function(container)
 {
  return{Apply:function(event)
  {
   var _,__6,disp,panel,tree;
   panel=container(undefined);
   _=(NewUnion())(Tree_1(),0);
   tree={contents:_};
   __6=function(edit)
   {
    var __1,__4,deletedTree,off,patternInput;
    deletedTree=(ReplacedTree())(edit,tree.contents);
    __1=(Tree()).Apply(edit,tree.contents);
    tree.contents=__1;
    patternInput=(Tree()).Range(edit,tree.contents);
    off=patternInput[0];
    panel.Remove(deletedTree.get_Sequence());
    __4=function(source)
    {
     return(SeqModule()).IterateIndexed(function(i)
     {
      return function(e)
      {
       return(panel.Insert(off+i))(e);
      };
     },source);
    };
    return __4(edit);
   };
   disp=event.Subscribe((WebSharper()).Control.Observer.Of(__6));
   return{$:1,$0:[panel.Body,disp]};
  }};
 }});
 (Base()).D=(Class())(__21,null,{Dispose:function()
 {
 }});
 (Result_1()).Join=function(res)
 {
  var _,fs;
  if(res.$==1)
   {
    fs=res.$0;
    _={$:1,$0:fs};
   }
  else
   {
    _=res.$0;
   }
  return _;
 };
 (Result_1()).Apply=function(f,r)
 {
  var _,__1,__4,f_1,fs,fs1,fs2,fs_1,matchValue,v;
  matchValue=[f,r];
  if(matchValue[0].$==1)
   {
    if(matchValue[1].$==1)
     {
      fs1=matchValue[0].$0;
      fs2=matchValue[1].$0;
      _={$:1,$0:(OfSeq())((Append())(fs1,fs2))};
     }
    else
     {
      fs=matchValue[0].$0;
      _={$:1,$0:fs};
     }
    __4=_;
   }
  else
   {
    if(matchValue[1].$==1)
     {
      fs_1=matchValue[1].$0;
      __1={$:1,$0:fs_1};
     }
    else
     {
      f_1=matchValue[0].$0;
      v=matchValue[1].$0;
      __1={$:0,$0:f_1(v)};
     }
    __4=__1;
   }
  return __4;
 };
 (Result_1()).OfOption=function(o)
 {
  var _,v;
  if(o.$==0)
   {
    _={$:1,$0:(NewUnion())(FSharpList_1(),0)};
   }
  else
   {
    v=o.$0;
    _={$:0,$0:v};
   }
  return _;
 };
 (Result_1()).Map=function(f,res)
 {
  var _,fs,v;
  if(res.$==1)
   {
    fs=res.$0;
    _={$:1,$0:fs};
   }
  else
   {
    v=res.$0;
    _={$:0,$0:f(v)};
   }
  return _;
 };
 (Result_1()).Sequence=function(rs_1)
 {
  var merge;
  merge=function(rs)
  {
   return function(r)
   {
    var _,__1,__4,__6,fs,fs1,fs2,v,vs;
    if(rs.$==1)
     {
      fs1=rs.$0;
      if(r.$==1)
       {
        fs2=r.$0;
        _={$:1,$0:(OfSeq())((Append())(fs1,fs2))};
       }
      else
       {
        _={$:1,$0:fs1};
       }
      __6=_;
     }
    else
     {
      vs=rs.$0;
      if(r.$==1)
       {
        fs=r.$0;
        __4={$:1,$0:fs};
       }
      else
       {
        v=r.$0;
        __1=(OfArray())([v]);
        __4={$:0,$0:(OfSeq())((Append())(vs,__1))};
       }
      __6=__4;
     }
    return __6;
   };
  };
  return(Fold())(merge,{$:0,$0:(NewUnion())(FSharpList_1(),0)},rs_1);
 };
 (Tree()).Set=function(value)
 {
  return(NewUnion())(Edit_1(),0,(NewUnion())(Tree_1(),1,value));
 };
 (Tree()).FlipEdit=function(edit)
 {
  var _,__1,e,e_1,t;
  if(edit.$==1)
   {
    e=edit.$0;
    __1=(NewUnion())(Edit_1(),2,e);
   }
  else
   {
    if(edit.$==2)
     {
      e_1=edit.$0;
      _=(NewUnion())(Edit_1(),1,e_1);
     }
    else
     {
      t=edit.$0;
      _=(NewUnion())(Edit_1(),0,t);
     }
    __1=_;
   }
  return __1;
 };
 (Tree()).Delete=function()
 {
  return(NewUnion())(Edit_1(),0,(NewUnion())(Tree_1(),0));
 };
 (Tree()).ReplacedTree=function(edit,input)
 {
  var _,__1,__4,__6,edit_1,edit_2,l,r;
  if(edit.$==1)
   {
    edit_1=edit.$0;
    if(input.$==2)
     {
      l=input.$0;
      _=(ReplacedTree())(edit_1,l);
     }
    else
     {
      _=(ReplacedTree())((NewUnion())(Edit_1(),1,edit_1),(NewUnion())(Tree_1(),2,(NewUnion())(Tree_1(),0),input));
     }
    __6=_;
   }
  else
   {
    if(edit.$==2)
     {
      edit_2=edit.$0;
      if(input.$==2)
       {
        r=input.$1;
        __1=(ReplacedTree())(edit_2,r);
       }
      else
       {
        __1=(ReplacedTree())((NewUnion())(Edit_1(),2,edit_2),(NewUnion())(Tree_1(),2,input,(NewUnion())(Tree_1(),0)));
       }
      __4=__1;
     }
    else
     {
      __4=input;
     }
    __6=__4;
   }
  return __6;
 };
 (Tree()).Apply=function(edit_3,input_1)
 {
  var apply;
  apply=function(edit)
  {
   return function(input)
   {
    var _,__1,__4,__6,edit_1,edit_2,l,l_1,r,r_1;
    if(edit.$==1)
     {
      edit_1=edit.$0;
      if(input.$==2)
       {
        r=input.$1;
        l=input.$0;
        _=(NewUnion())(Tree_1(),2,(apply(edit_1))(l),r);
       }
      else
       {
        _=(apply((NewUnion())(Edit_1(),1,edit_1)))((NewUnion())(Tree_1(),2,(NewUnion())(Tree_1(),0),input));
       }
      __6=_;
     }
    else
     {
      if(edit.$==2)
       {
        edit_2=edit.$0;
        if(input.$==2)
         {
          r_1=input.$1;
          l_1=input.$0;
          __1=(NewUnion())(Tree_1(),2,l_1,(apply(edit_2))(r_1));
         }
        else
         {
          __1=(apply((NewUnion())(Edit_1(),2,edit_2)))((NewUnion())(Tree_1(),2,input,(NewUnion())(Tree_1(),0)));
         }
        __4=__1;
       }
      else
       {
        __4=edit.$0;
       }
      __6=__4;
     }
    return __6;
   };
  };
  return(apply(edit_3))(input_1);
 };
 (Tree()).Range=function(edit_3,input_1)
 {
  var range;
  range=function(edit)
  {
   return function(input)
   {
    return function(offset)
    {
     var _,__1,__4,__6,edit_1,edit_2,l,l_1,r;
     if(edit.$==1)
      {
       edit_1=edit.$0;
       if(input.$==2)
        {
         l=input.$0;
         _=((range(edit_1))(l))(offset);
        }
       else
        {
         _=((range(edit_1))((NewUnion())(Tree_1(),0)))(offset);
        }
       __6=_;
      }
     else
      {
       if(edit.$==2)
        {
         edit_2=edit.$0;
         if(input.$==2)
          {
           r=input.$1;
           l_1=input.$0;
           __1=((range(edit_2))(r))(offset+(Count())(l_1));
          }
         else
          {
           __1=((range(edit_2))((NewUnion())(Tree_1(),0)))(offset+(Count())(input));
          }
         __4=__1;
        }
       else
        {
         __4=[offset,(Count())(input)];
        }
       __6=__4;
      }
     return __6;
    };
   };
  };
  return((range(edit_3))(input_1))(0);
 };
 (Tree()).DeepFlipEdit=function(edit)
 {
  var _,__1,e,e_1,t;
  if(edit.$==1)
   {
    e=edit.$0;
    __1=(NewUnion())(Edit_1(),2,(DeepFlipEdit())(e));
   }
  else
   {
    if(edit.$==2)
     {
      e_1=edit.$0;
      _=(NewUnion())(Edit_1(),1,(DeepFlipEdit())(e_1));
     }
    else
     {
      t=edit.$0;
      _=(NewUnion())(Edit_1(),0,t);
     }
    __1=_;
   }
  return __1;
 };
 (Tree()).Transform=function(f,edit)
 {
  var _,__1,__4,__6,e,e_1,t;
  if(edit.$==1)
   {
    e=edit.$0;
    _=(Transform())(f,e);
    __6=__8(_);
   }
  else
   {
    if(edit.$==2)
     {
      e_1=edit.$0;
      __1=(Transform())(f,e_1);
      __4=__9(__1);
     }
    else
     {
      t=edit.$0;
      __4=(NewUnion())(Edit_1(),0,f(t));
     }
    __6=__4;
   }
  return __6;
 };
 (Tree()).FromSequence=function(vs)
 {
  var _,__1;
  __1=(NewUnion())(Tree_1(),0);
  _=function(state_1)
  {
   return function(source)
   {
    return(Fold())(function(state)
    {
     return function(v)
     {
      return(NewUnion())(Tree_1(),2,state,(NewUnion())(Tree_1(),1,v));
     };
    },state_1,source);
   };
  };
  return(_(__1))(vs);
 };
 (Tree()).Count=function(t_2)
 {
  var count;
  count=function(n)
  {
   return function(t)
   {
    return function(_arg1)
    {
     var _,__1,a,b,k,t_1,ts;
     if(_arg1.$==2)
      {
       b=_arg1.$1;
       a=_arg1.$0;
       __1=((count(n))((NewUnion())(FSharpList_1(),1,b,t)))(a);
      }
     else
      {
       k=_arg1.$==0?0:1;
       if(t.$==1)
        {
         ts=t.$1;
         t_1=t.$0;
         _=((count(n+k))(ts))(t_1);
        }
       else
        {
         _=n+k;
        }
       __1=_;
      }
     return __1;
    };
   };
  };
  return((count(0))((NewUnion())(FSharpList_1(),0)))(t_2);
 };
 (Tree()).ShowEdit=function(edit_1)
 {
  var showE;
  showE=function(edit)
  {
   var _,__1,l,r;
   if(edit.$==1)
    {
     l=edit.$0;
     __1="Left > "+showE(l);
    }
   else
    {
     if(edit.$==2)
      {
       r=edit.$0;
       _="Right > "+showE(r);
      }
     else
      {
       _="Replace";
      }
     __1=_;
    }
   return __1;
  };
  return showE(edit_1);
 };
}());
