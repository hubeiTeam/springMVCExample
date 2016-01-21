iChart.Label=iChart.extend(iChart.Component,{configure:function(){iChart.Label.superclass.configure.apply(this,arguments);this.type="label";this.set({text:"",line_height:12,line_thickness:1,sign:"square",sign_size:12,padding:"2 5",offsety:2,sign_space:5,background_color:"#efefef",text_with_sign_color:!1});this.atomic=!0;this.registerEvent()},isEventValid:function(a,b){return{valid:iChart.inRange(b.labelx,b.labelx+b.get(b.W),a.x)&&iChart.inRange(b.labely,b.labely+b.get(b.H),a.y)}},text:function(a){a&&this.push("text",a);this.push(this.W,this.T.measureText(this.get("text"))+this.get("hpadding")+this.get("sign_size")+this.get("sign_space"))},localizer:function(a){var b=a.get("quadrantd"),d=a.get("line_points"),c=a.get("smooth"),b=1<=b&&2>=b,e=a.get("labelx"),f=a.get("labely");a.labelx=e+(b?-a.get(a.W)-c:c);a.labely=f-a.get(a.H)/2;d[2]={x:e,y:f};d[3]={x:d[2].x+(b?-c:c),y:d[2].y}},doLayout:function(a,b,d,c){c.push("labelx",c.get("labelx")+a/d);c.push("labely",c.get("labely")+b/d);c.get("line_points").each(function(c,d){c.x+=a;c.y+=b;return 1==d},c);c.localizer(c)},doDraw:function(a){var b=a.get("line_points"),d=a.get("sign_size"),c=a.labelx+a.get("padding_left"),e=a.labely+a.get("padding_top");a.T.label(b,a.get("line_thickness"),a.get("border.color"));a.T.box(a.labelx,a.labely,a.get(a.W),a.get(a.H),a.get("border"),a.get("f_color"),!1,a.get("shadow"));a.T.textStyle(a.L,a.O,a.get("fontStyle"));b=a.get("color");a.get("text_with_sign_color")&&(b=a.get("scolor"));"square"==a.get("sign")?a.T.box(c,e,d,d,0,a.get("scolor")):a.get("sign")&&a.T.round(c+d/2,e+d/2,d/2,a.get("scolor"));a.T.fillText(a.get("text"),c+d+a.get("sign_space"),e,a.get("textwidth"),b)},doConfig:function(){iChart.Label.superclass.doConfig.call(this);var a=this._();a.T.textFont(a.get("fontStyle"));a.get("fontsize")>a.get("line_height")&&a.push("line_height",a.get("fontsize"));a.get("sign")||(a.push("sign_size",0),a.push("sign_space",0));a.push(a.H,a.get("line_height")+a.get("vpadding"));a.text();a.localizer(a)}});