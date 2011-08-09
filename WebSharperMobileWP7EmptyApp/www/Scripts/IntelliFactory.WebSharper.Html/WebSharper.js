(function()
{
 var global=this;
 var Attribute,Class,Element,Events,HTML5,Html,Html5Provider,HtmlProvider_1,Implementation,JQueryHtmlProvider,Operators,Runtime,__2,__4,__5,__6,__7,__9;
 IntelliFactory.WebSharper.Runtime.Declare({IntelliFactory:{WebSharper:{Html:{Text:{},TagBuilder:{},Operators:{},Implementation:{JQueryHtmlProvider:{},HTML5:{}},Html5TagBuilder:{},Html5AttributeBuilder:{},EventsPervasives:{},Events:{JQueryEventSupport:{}},Element:{},DeprecatedTagBuilder:{},DeprecatedAttributeBuilder:{},AttributeBuilder:{},Attribute:{}}}}});
 Implementation=function()
 {
  return IntelliFactory.WebSharper.Html.Implementation;
 };
 Html=function()
 {
  return IntelliFactory.WebSharper.Html;
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
 __2=function()
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
 __4=function(node,name)
 {
  var _;
  _=jQuery(node);
  return _.attr(name);
 };
 Events=function()
 {
  return IntelliFactory.WebSharper.Html.Events;
 };
 __5=function(HtmlProvider)
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
  _this.HtmlProvider=HtmlProvider;
 };
 __6=function(name,value)
 {
  var _this=this;
  return IntelliFactory.WebSharper.Html.Attribute.New(_this.HtmlProvider,name,value);
 };
 (function()
 {
  return IntelliFactory.WebSharper.Html.Attribute.New;
 });
 Attribute=function()
 {
  return IntelliFactory.WebSharper.Html.Attribute;
 };
 __7=function(name,children)
 {
  var _this=this;
  var _,el,enumerator,pl,x;
  el=IntelliFactory.WebSharper.Html.Element.New(_this.HtmlProvider,name);
  enumerator=children.GetEnumerator();
  try
  {
   while(enumerator.MoveNext())
    {
     pl=enumerator.get_Current();
     el.AppendI(pl);
    }
  }
  finally
  {
   enumerator.Dispose();
  }
  _;
  return el;
 };
 (function()
 {
  return IntelliFactory.WebSharper.Html.Element.New;
 });
 Element=function()
 {
  return IntelliFactory.WebSharper.Html.Element;
 };
 __9=function()
 {
 };
 Operators=function()
 {
  return IntelliFactory.WebSharper.Html.Operators;
 };
 HTML5=function()
 {
  return IntelliFactory.WebSharper.Html.Implementation.HTML5;
 };
 JQueryHtmlProvider=function()
 {
  return IntelliFactory.WebSharper.Html.Implementation.JQueryHtmlProvider;
 };
 Html5Provider=function()
 {
  return IntelliFactory.WebSharper.Html.Implementation.HTML5.Html5Provider;
 };
 HtmlProvider_1=function()
 {
  return IntelliFactory.WebSharper.Html.Implementation.HtmlProvider;
 };
 (Implementation()).JQueryHtmlProvider=(Class())(__2,null,{CreateTextNode:function(str)
 {
  var _;
  _=document;
  return _.createTextNode(str);
 },CreateAttribute:function(str)
 {
  var _;
  _=document;
  return _.createAttribute(str);
 },CreateElement:function(name)
 {
  var _;
  _=document;
  return _.createElement(name);
 },AppendAttribute:function(node,attr)
 {
  var _this=this;
  var name,value;
  name=attr.nodeName;
  value=attr.nodeValue;
  return _this.SetAttribute(node,name,value);
 },AppendNode:function(node,el)
 {
  var _,__1;
  _=jQuery(node);
  __1=jQuery(el);
  return _.append(__1);
 },GetText:function(node)
 {
  var _;
  _=jQuery(node);
  return _.text();
 },SetText:function(node,text)
 {
  var _;
  _=jQuery(node);
  return _.text(text);
 },AddClass:function(node,cls)
 {
  var _;
  _=jQuery(node);
  return _.addClass(cls);
 },Clear:function(node)
 {
  var _;
  _=jQuery(node);
  return _.empty();
 },GetHtml:function(node)
 {
  var _;
  _=jQuery(node);
  return _.html();
 },SetHtml:function(node,text)
 {
  var _;
  _=jQuery(node);
  return _.html(text);
 },GetValue:function(node)
 {
  var _,__1,__3;
  __1=function(arg10)
  {
   return arg10;
  };
  _=jQuery(node);
  __3=_.val();
  return __1(__3);
 },SetValue:function(node,value)
 {
  var _;
  _=jQuery(node);
  return _.val(value);
 },Remove:function(node)
 {
  var _;
  _=jQuery(node);
  return _.remove();
 },SetAttribute:function(node,name,value)
 {
  var _;
  _=jQuery(node);
  return _.attr(name,value);
 },HasAttribute:function(node,name)
 {
  var _;
  _=jQuery(node);
  return _.attr(name)==null;
 },GetAttribute:__4,GetProperty:__4,SetProperty:function(node,name,value)
 {
  var _;
  _=jQuery(node);
  return _.prop(name,value);
 },RemoveAttribute:function(node,name)
 {
  var _;
  _=jQuery(node);
  return _.removeAttr(name);
 },SetCss:function(node,name,prop)
 {
  var _;
  _=jQuery(node);
  return _.css(name,prop);
 },SetStyle:function(node,style)
 {
  var _;
  _=jQuery(node);
  return _.attr("style",style);
 },RemoveClass:function(node,cls)
 {
  var _;
  _=jQuery(node);
  return _.removeClass(cls);
 },OnLoad:function(node,f)
 {
  var _;
  _=jQuery(node);
  return _.ready(f);
 },OnDocumentReady:function(f)
 {
  var _,__1;
  _=document;
  __1=jQuery(_);
  return __1.ready(f);
 }});
 (Events()).JQueryEventSupport=(Class())(__2,null,{OnMouse:function(name,f,el)
 {
  var _,__1,h;
  h=function(ev)
  {
   return(f(el))({X:ev.pageX,Y:ev.pageY});
  };
  _=el.get_Body();
  __1=jQuery(_);
  return __1.bind(name,h);
 },OnBlur:function(f,el)
 {
  var _,__1,__3;
  _=el.get_Body();
  __1=jQuery(_);
  __3=function()
  {
   return f(el);
  };
  return __1.bind("blur",__3);
 },OnChange:function(f,el)
 {
  var _,__1,__3;
  _=el.get_Body();
  __1=jQuery(_);
  __3=function()
  {
   return f(el);
  };
  return __1.bind("change",__3);
 },OnClick:function(f,el)
 {
  var _this=this;
  return _this.OnMouse("click",f,el);
 },OnDoubleClick:function(f,el)
 {
  var _this=this;
  return _this.OnMouse("dblclick",f,el);
 },OnMouseDown:function(f,el)
 {
  var _this=this;
  return _this.OnMouse("mousedown",f,el);
 },OnMouseEnter:function(f,el)
 {
  var _this=this;
  return _this.OnMouse("mouseenter",f,el);
 },OnMouseLeave:function(f,el)
 {
  var _this=this;
  return _this.OnMouse("mouseleave",f,el);
 },OnMouseMove:function(f,el)
 {
  var _this=this;
  return _this.OnMouse("mousemove",f,el);
 },OnMouseOut:function(f,el)
 {
  var _this=this;
  return _this.OnMouse("mouseout",f,el);
 },OnKeyDown:function(f,el)
 {
  var _,__1,h;
  h=function(ev)
  {
   return(f(el))({KeyCode:ev.keyCode});
  };
  _=el.get_Body();
  __1=jQuery(_);
  return __1.bind("keydown",h);
 },OnKeyPress:function(f,el)
 {
  var _,__1,__3;
  _=el.get_Body();
  __1=jQuery(_);
  __3=function(arg)
  {
   return(f(el))({CharacterCode:arg.which});
  };
  return __1.keypress(__3);
 },OnKeyUp:function(f,el)
 {
  var _,__1,h;
  h=function(ev)
  {
   return(f(el))({KeyCode:ev.keyCode});
  };
  _=el.get_Body();
  __1=jQuery(_);
  return __1.bind("keyup",h);
 },OnFocus:function(f,el)
 {
  var _,__1,__3;
  _=el.get_Body();
  __1=jQuery(_);
  __3=function()
  {
   return f(el);
  };
  return __1.bind("focus",__3);
 },OnLoad:function(f,el)
 {
  var _,__1,__3;
  _=el.get_Body();
  __1=jQuery(_);
  __3=function()
  {
   return f(el);
  };
  return __1.bind("load",__3);
 },OnUnLoad:function(f,el)
 {
  var _,__1,__3;
  _=el.get_Body();
  __1=jQuery(_);
  __3=function()
  {
   return f(el);
  };
  return __1.bind("unload",__3);
 },OnResize:function(f,el)
 {
  var _,__1,__3;
  _=el.get_Body();
  __1=jQuery(_);
  __3=function()
  {
   return f(el);
  };
  return __1.bind("resize",__3);
 },OnScroll:function(f,el)
 {
  var _,__1,__3;
  _=el.get_Body();
  __1=jQuery(_);
  __3=function()
  {
   return f(el);
  };
  return __1.bind("scroll",__3);
 },OnSelect:function(f,el)
 {
  var _,__1,__3;
  _=el.get_Body();
  __1=jQuery(_);
  __3=function()
  {
   return f(el);
  };
  return __1.bind("select",__3);
 },OnSubmit:function(f,el)
 {
  var _,__1,__3;
  _=el.get_Body();
  __1=jQuery(_);
  __3=function()
  {
   return f(el);
  };
  return __1.bind("submit",__3);
 },OnError:function(f,el)
 {
  var _,__1,__3;
  _=el.get_Body();
  __1=jQuery(_);
  __3=function()
  {
   return f(el);
  };
  return __1.bind("error",__3);
 }});
 (Html()).AttributeBuilder=(Class())(__5,null,{get_CheckBox:function()
 {
  var _this=this;
  return _this.NewAttr("type","checkbox");
 },get_Hidden:function()
 {
  var _this=this;
  return _this.NewAttr("type","hidden");
 },get_Radio:function()
 {
  var _this=this;
  return _this.NewAttr("type","radio");
 },get_Reset:function()
 {
  var _this=this;
  return _this.NewAttr("type","reset");
 },get_Submit:function()
 {
  var _this=this;
  return _this.NewAttr("type","submit");
 },get_Password:function()
 {
  var _this=this;
  return _this.NewAttr("type","password");
 },get_TextField:function()
 {
  var _this=this;
  return _this.NewAttr("type","textfield");
 },NewAttr:__6});
 (Html()).DeprecatedAttributeBuilder=(Class())(__5,null,{NewAttr:__6});
 (Html()).Html5AttributeBuilder=(Class())(__5,null,{NewAttr:__6});
 (Html()).TagBuilder=(Class())(__5,null,{NewTag:__7,text:function(data)
 {
  return(Runtime()).NewRecord((Html()).Text,{text:data});
 },Div:function(x)
 {
  var _this=this;
  return _this.NewTag("div",x);
 }});
 (Html()).DeprecatedTagBuilder=(Class())(__5,null,{NewTag:__7});
 (Html()).Html5TagBuilder=(Class())(__5,null,{NewTag:__7});
 (Html()).Element=(Class())(function(HtmlProvider)
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
  _this["HtmlProvider@22"]=HtmlProvider;
 },null,{get_Text:function()
 {
  var _this=this;
  var _;
  _=_this["HtmlProvider@22"];
  return _.GetText(_this.Body);
 },set_Text:function(x)
 {
  var _this=this;
  var objectArg;
  objectArg=_this["HtmlProvider@22"];
  return(function(arg00)
  {
   return function(arg10)
   {
    return objectArg.SetText(arg00,arg10);
   };
  }(_this.Body))(x);
 },get_Html:function()
 {
  var _this=this;
  var _;
  _=_this["HtmlProvider@22"];
  return _.GetHtml(_this.Body);
 },set_Html:function(x)
 {
  var _this=this;
  var objectArg;
  objectArg=_this["HtmlProvider@22"];
  return(function(arg00)
  {
   return function(arg10)
   {
    return objectArg.SetHtml(arg00,arg10);
   };
  }(_this.Body))(x);
 },get_Value:function()
 {
  var _this=this;
  var _;
  _=_this["HtmlProvider@22"];
  return _.GetValue(_this.Body);
 },set_Value:function(x)
 {
  var _this=this;
  var objectArg;
  objectArg=_this["HtmlProvider@22"];
  return(function(arg00)
  {
   return function(arg10)
   {
    return objectArg.SetValue(arg00,arg10);
   };
  }(_this.Body))(x);
 },get_Id:function()
 {
  var _this=this;
  var _,__1,__3,__8,id,newId,objectArg,objectArg_1;
  objectArg=_this["HtmlProvider@22"];
  id=(function(arg00)
  {
   return function(arg10)
   {
    return objectArg.GetProperty(arg00,arg10);
   };
  }(_this.Body))("id");
  if(id===undefined)
   {
    _=true;
   }
  else
   {
    _=id==="";
   }
  if(_)
   {
    __1=Math;
    __3=Math;
    newId="id"+Math.round.call(__1,Math.random.call(__3)*100000000);
    objectArg_1=_this["HtmlProvider@22"];
    (((function(arg00)
    {
     return function(arg10)
     {
      return function(arg20)
      {
       return objectArg_1.SetProperty(arg00,arg10,arg20);
      };
     };
    }(_this.Body))("id"))(newId));
    __8=newId;
   }
  else
   {
    __8=id;
   }
  return __8;
 },OnLoad:function(f)
 {
  var _this=this;
  var objectArg;
  objectArg=_this["HtmlProvider@22"];
  return(function(arg00)
  {
   return function(arg10)
   {
    return objectArg.OnLoad(arg00,arg10);
   };
  }(_this.Body))(f);
 },get_HtmlProvider:function()
 {
  var _this=this;
  return _this["HtmlProvider@22"];
 },AppendI:function(pl)
 {
  var _this=this;
  var _,__1,attr,objectArg,objectArg_1,r;
  if((pl.get_Body()).nodeType===2)
   {
    attr=pl.get_Body();
    objectArg=_this["HtmlProvider@22"];
    _=(function(arg00)
    {
     return function(arg10)
     {
      return objectArg.AppendAttribute(arg00,arg10);
     };
    }(_this.Body))(attr);
   }
  else
   {
    objectArg_1=_this["HtmlProvider@22"];
    _=(function(arg00)
    {
     return function(arg10)
     {
      return objectArg_1.AppendNode(arg00,arg10);
     };
    }(_this.Body))(pl.get_Body());
   }
  _;
  if(_this.IsRendered)
   {
    __1=pl.Render();
   }
  else
   {
    r=_this.RenderInternal;
    __1=_this.RenderInternal=function()
    {
     r(undefined);
     return pl.Render();
    };
   }
  return __1;
 },AppendN:function(node)
 {
  var _this=this;
  var objectArg;
  objectArg=_this["HtmlProvider@22"];
  return(function(arg00)
  {
   return function(arg10)
   {
    return objectArg.AppendNode(arg00,arg10);
   };
  }(_this.Body))(node);
 },get_Item:function(name)
 {
  var _this=this;
  var objectArg,objectArg_1;
  objectArg=_this["HtmlProvider@22"];
  ((function(arg00)
  {
   return function(arg10)
   {
    return objectArg.GetAttribute(arg00,arg10);
   };
  }(_this.Body))(name));
  objectArg_1=_this["HtmlProvider@22"];
  return(function(arg00)
  {
   return function(arg10)
   {
    return objectArg_1.GetAttribute(arg00,arg10);
   };
  }(_this.Body))(name);
 },set_Item:function(name,value)
 {
  var _this=this;
  var objectArg;
  objectArg=_this["HtmlProvider@22"];
  return((function(arg00)
  {
   return function(arg10)
   {
    return function(arg20)
    {
     return objectArg.SetAttribute(arg00,arg10,arg20);
    };
   };
  }(_this.Body))(name))(value);
 },Render:function()
 {
  var _this=this;
  var _;
  if(!_this.IsRendered)
   {
    _this.RenderInternal(undefined);
    _=_this.IsRendered=true;
   }
  return _;
 },get_Body:function()
 {
  var _this=this;
  return _this.Body;
 }});
 (Html()).Attribute=(Class())(__5,null,{get_Body:function()
 {
  var _this=this;
  var _,attr;
  _=_this.HtmlProvider;
  attr=_.CreateAttribute(_this.Name);
  attr.nodeValue=_this.Value;
  return attr;
 },Render:__9});
 (Html()).Text=(Class())(null,null,{get_Body:function()
 {
  var _this=this;
  var _,__1;
  _=document;
  __1=_this.text;
  return _.createTextNode(__1);
 },Render:__9});
 (Element()).New=function(html,name)
 {
  var _,dom,el;
  el=new(Element())(html);
  _=document;
  dom=_.createElement(name);
  el.RenderInternal=function(value)
  {
   return void value;
  };
  el.Body=dom;
  el.IsRendered=false;
  return el;
 };
 (Attribute()).New=function(htmlProvider,name,value)
 {
  var a;
  a=new(Attribute())(htmlProvider);
  a.Name=name;
  a.Value=value;
  return a;
 };
 (Operators()).OnBeforeRender=function(f,w)
 {
  var _,__1,r;
  r=w.Render;
  _=function(value)
  {
   return w.Render=value;
  };
  __1=function()
  {
   f(w);
   return r.apply(w);
  };
  return _(__1);
 };
 (Operators()).OnAfterRender=function(f,w)
 {
  var _,__1,r;
  r=w.Render;
  _=function(value)
  {
   return w.Render=value;
  };
  __1=function()
  {
   r.apply(w);
   return f(w);
  };
  return _(__1);
 };
 (Operators()).op_MinusLess=function(el,inner)
 {
  var _,enumerator,pl,x;
  enumerator=inner.GetEnumerator();
  try
  {
   while(enumerator.MoveNext())
    {
     pl=enumerator.get_Current();
     el.AppendI(pl);
    }
  }
  finally
  {
   enumerator.Dispose();
  }
  _;
  return el;
 };
 (HTML5()).Html5Provider=new(JQueryHtmlProvider())();
 (HTML5()).Tags=new(Html()).Html5TagBuilder(Html5Provider());
 (HTML5()).Attr=new(Html()).Html5AttributeBuilder(Html5Provider());
 (Implementation()).HtmlProvider=new(JQueryHtmlProvider())();
 (Implementation()).Attr=new(Html()).AttributeBuilder(HtmlProvider_1());
 (Implementation()).Tags=new(Html()).TagBuilder(HtmlProvider_1());
 (Implementation()).DeprecatedHtml=new(Html()).DeprecatedTagBuilder(HtmlProvider_1());
 (Html()).EventsPervasives.Events=new(Events()).JQueryEventSupport();
}());
