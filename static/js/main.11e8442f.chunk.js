(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{38:function(t,e,a){t.exports=a(70)},44:function(t,e,a){},63:function(t,e,a){},68:function(t,e,a){},69:function(t,e,a){},70:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(33),o=a(12),s=(a(43),a(44),a(5)),c=a(6),l=a(8),u=a(7),h=a(9),m=a(13),d=a(14),p=a(2),g=a.n(p),f=a(18),v=a.n(f);function b(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},a=(new g.a.Synth).toMaster();g.a.Transport.stop(),g.a.Transport.cancel(),function(t,e,a){function n(t){return function(a){return e.triggerAttackRelease(function(t){return console.log(y[t]),y[t]}(t),"8n")}}var r=0;t.forEach(function(t){g.a.Transport.scheduleOnce(n(t.relative_value),parseFloat(r*g.a.Time("1m"))),r+=t.duration}),g.a.Transport.scheduleOnce(a,parseFloat(r*g.a.Time("1m")))}(t,a,e),g.a.Transport.start()}var y={"-7":"C4","-6":"D4","-5":"E4","-4":"F4","-3":"G4","-2":"A4","-1":"B4",0:"C5",1:"D5",2:"E5",3:"F5",4:"G5",5:"A5",6:"B5",7:"C6"},w=a(36),E=a(16),_=a.n(E),k=function(t){function e(){var t,a;Object(s.a)(this,e);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).state={hovernote:null},a.getHoverArray=function(){return null===a.state.hovernote?a.props.notes:[].concat(Object(w.a)(a.props.notes),[{relative_value:a.state.hovernote,duration:a.props.selectedDuration}])},a}return Object(h.a)(e,t),Object(c.a)(e,[{key:"svgRender",value:function(){var t=this,e=_()("#svg"+this.props.keyId.toString());_.a.load("http://127.0.0.1:5000/resources/stem_up/eighth_note.svg",function(a){_.a.load("http://127.0.0.1:5000/resources/stem_up/quarter_note.svg",function(n){_.a.load("http://127.0.0.1:5000/resources/stem_up/half_note.svg",function(r){_.a.load("http://127.0.0.1:5000/resources/whole_note.svg",function(i){e.clear();var o=[a.select("g"),n.select("g"),r.select("g"),i.select("g")];if(e.rect(0,0,t.props.width,t.props.height).attr({fill:"#FFF",stroke:"#000",strokeWidth:"5"}),t.drawLine(0,e),t.drawLine(1,e),t.drawLine(2,e),t.drawLine(3,e),t.drawLine(4,e),t.props.editable)for(var s=-7;s<=7;s++)t.drawBoundingBox(1.25+-.5*s,s,e);t.drawNotes(e,o,t.getHoverArray())})})})})}},{key:"drawNotes",value:function(t,e,a){var n=this,r=0;a.forEach(function(a){n.drawNote(t,e,r,a),r+=1})}},{key:"drawNote",value:function(t,e,a,n){var r=100+a*this.lineHeight()*2,i=this.C_position()-n.relative_value*(this.lineHeight()/2),o=null;switch(n.duration){case.125:o=e[0].clone();break;case.25:o=e[1].clone();break;case.5:o=e[2].clone();break;case 1:o=e[3].clone()}o.attr({transform:"translate(".concat(r,", ").concat(i,")"),pointerEvents:"none",fill:"rgb(3,100,3)"}),t.append(o),this.props.comparison&&t.ellipse(r,30,6,6).attr({fill:n.correct?"#4ED81A":"#FF336E"}),this.drawLedgerLines(t,a,n)}},{key:"drawLedgerLines",value:function(t,e,a){var n=100+e*this.lineHeight()*2;a.relative_value<-6&&t.line(n-15,this.calculateLineHeight(5),n+15,this.calculateLineHeight(5)).attr({stroke:"#000",strokeWidth:"2"}),a.relative_value>4&&t.line(n-15,this.calculateLineHeight(-1),n+15,this.calculateLineHeight(-1)).attr({stroke:"#000",strokeWidth:"2"}),a.relative_value>6&&t.line(n-15,this.calculateLineHeight(-2),n+15,this.calculateLineHeight(-2)).attr({stroke:"#000",strokeWidth:"2"})}},{key:"drawLine",value:function(t,e){e.line(this.props.marginX,this.calculateLineHeight(t),this.props.width-this.props.marginX,this.calculateLineHeight(t)).attr({stroke:"#000",strokeWidth:"2"})}},{key:"drawBoundingBox",value:function(t,e,a){var n=this,r=a.rect(this.props.marginX,this.calculateLineHeight(t),this.props.width-2*this.props.marginX,this.lineHeight()/2).attr({fill:"rgba(50,50,50,.0)"}),i=a.group(r);i.mousedown(function(){n.props.addNote(e)}),i.hover(function(){n.setState({hovernote:e})},function(){n.setState({hovernote:null})})}},{key:"lineHeight",value:function(){return this.props.height/20}},{key:"calculateLineHeight",value:function(t){return t*this.lineHeight()+this.props.height/2.75}},{key:"C_position",value:function(){return this.calculateLineHeight(3)-3*this.lineHeight()/2}},{key:"componentDidMount",value:function(){this.svgRender()}},{key:"componentDidUpdate",value:function(){this.svgRender()}},{key:"render",value:function(){var t="svg"+this.props.keyId.toString();return r.a.createElement("svg",{className:"sheetmusic",style:this.props.style,width:this.props.width,height:this.props.height,id:t})}}]),e}(r.a.Component);k.defaultProps={marginX:30,editable:!0,comparison:!1};var j=k,O=function(t){function e(){var t,a;Object(s.a)(this,e);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).state={playing:!1},a.play=function(){a.emitStop(),a.setState({playing:!0}),b(a.props.music,function(){a.emitStop()})},a.stop=function(){a.emitStop(),g.a.Transport.stop()},a.emitStop=function(){a.props.emit("stop")},a}return Object(h.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.listener=this.props.addListener("stop",function(){t.setState({playing:!1})}),this.props.playOnLoad&&this.play()}},{key:"render",value:function(){return r.a.createElement("button",{className:"red",onClick:this.state.playing?this.stop:this.play},this.state.playing?"Pause":"Play")}}]),e}(r.a.Component);O.defaultProps={playOnLoad:!1};var N=Object(d.Emitter)(O),S=(Object(d.Emitter)(O),a(63),function(t){function e(){var t,a;Object(s.a)(this,e);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).state={loading:!0,first_time:!1,redirect:!1,actual_song:[],user_song:[],selected_duration:.25},a.addNote=function(t){a.setState({user_song:a.state.user_song.concat({relative_value:t,duration:a.state.selected_duration})})},a.undo=function(){a.setState({user_song:a.state.user_song.slice(0,-1)})},a.setDuration=function(t){a.setState({selected_duration:t})},a.submit=function(){a.props.setPost({user:a.state.user_song,actual:a.state.actual_song}),a.setState({redirect:!0}),g.a.Transport.stop()},a}return Object(h.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){var t=this;v.a.get("http://127.0.0.1:5000/api/get").then(function(t){return t.data}).then(function(e){t.setState({actual_song:e.notes,user_song:[e.notes[0]],loading:!1})}),null===localStorage.getItem("first_time")&&(localStorage.setItem("first_time",!1),this.setState({first_time:!0}))}},{key:"render",value:function(){var t=this;return this.state.redirect?r.a.createElement(m.a,{to:"/compare"}):this.state.loading?null:r.a.createElement("div",{className:"pt-3"},r.a.createElement("div",{className:"flexbar mt-3 mb-2"},r.a.createElement("h2",{className:"font-weight-bold m-0"},"Transcriboid"),r.a.createElement("div",{className:"d-flex align-items-end"},this.state.first_time&&r.a.createElement("p",{className:"my-0 mx-2 text-muted font-weight-bold"},"click here to play the song."),r.a.createElement(N,{music:this.state.actual_song}))),r.a.createElement(j,{keyId:1,width:window.innerWidth-20,height:window.innerHeight/2,marginX:40,addNote:this.addNote,notes:this.state.user_song,selectedDuration:this.state.selected_duration}),r.a.createElement("div",{className:"flexbar my-2"},r.a.createElement("div",null,r.a.createElement("button",{className:"medium thin",onClick:function(){return t.setDuration(.125)}},"Eighth"),r.a.createElement("button",{className:"medium thin",onClick:function(){return t.setDuration(.25)}},"Quarter"),r.a.createElement("button",{className:"medium thin",onClick:function(){return t.setDuration(.5)}},"Half"),r.a.createElement("button",{className:"medium thin",onClick:function(){return t.setDuration(1)}},"Whole")),r.a.createElement("div",null,r.a.createElement("button",{className:"medium thin red",onClick:this.undo},"Undo"),r.a.createElement("button",{className:"medium thin red",onClick:this.submit},"Submit"))))}}]),e}(r.a.Component)),L=(a(68),a(69),function(t){function e(){return Object(s.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return r.a.createElement("div",{id:"main"},r.a.createElement("div",null,r.a.createElement("h1",{className:"font-weight-bold"},"Transcriboid"),r.a.createElement("p",{className:"m-0 text-center font-weight-normal"},"A randomly generated transcription trainer.")),r.a.createElement(o.b,{to:"/main"},r.a.createElement("button",{className:"large"},"Start")),r.a.createElement("p",{className:"madetag"},"Made by Ethan Leba, 2019"))}}]),e}(r.a.Component)),H=function(t){function e(){var t,a;Object(s.a)(this,e);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).state={loading:!0,redirect_home:!1,redirect_main:!1,actual_song:[],corrected_song:[]},a.getAmtCorrect=function(){return a.state.corrected_song.filter(function(t){return t.correct}).length},a.getTotal=function(){return a.state.actual_song.length},a.handlePlayAgain=function(){g.a.Transport.stop(),a.setState({redirect_main:!0})},a.handleBackToStart=function(){g.a.Transport.stop(),a.setState({redirect_home:!0})},a.getPct=function(){return Math.floor(a.getAmtCorrect()/a.getTotal()*100)},a}return Object(h.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.props.hasPost()?v.a.post("api/compare",this.props.popPost()).then(function(e){t.setState({actual_song:e.data.actual,corrected_song:e.data.corrected,loading:!1}),console.log(e)}).catch(function(t){console.log(t)}):this.setState({redirect_home:!0})}},{key:"render",value:function(){return this.state.redirect_home?r.a.createElement(m.a,{to:"/"}):this.state.redirect_main?r.a.createElement(m.a,{to:"/main"}):this.state.loading?null:r.a.createElement("div",{className:"h-100 row align-items-center"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"flexbar my-2"},r.a.createElement("h3",{className:"m-0 font-weight-bold"},"Actual Transcription"),r.a.createElement(N,{music:this.state.actual_song})),r.a.createElement(j,{keyId:1,width:window.innerWidth-20,height:window.innerHeight/3,notes:this.state.actual_song,editable:!1}),r.a.createElement("div",{className:"flexbar my-2"},r.a.createElement("h3",{className:"m-0 font-weight-bold"},"Your Transcription (",this.getPct(),"% correct)"),r.a.createElement(N,{music:this.state.corrected_song})),r.a.createElement(j,{keyId:2,width:window.innerWidth-20,height:window.innerHeight/3,notes:this.state.corrected_song,editable:!1,comparison:!0}),r.a.createElement("div",{className:"flexbar flexcenter my-2"},r.a.createElement("button",{className:"medium",onClick:this.handleBackToStart},"Quit"),r.a.createElement("button",{className:"medium red",onClick:this.handlePlayAgain},"Try again"))))}}]),e}(r.a.Component),C=a(37),P=function(t){var e=t.component,a=Object(C.a)(t,["component"]);return r.a.createElement(m.b,Object.assign({},a,{render:function(t){return function(t){for(var e=arguments.length,a=new Array(e>1?e-1:0),n=1;n<e;n++)a[n-1]=arguments[n];var i=Object.assign.apply(Object,[{}].concat(a));return r.a.createElement(t,i)}(e,t,a)}}))},T=function(t){function e(){var t,a;Object(s.a)(this,e);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).state={post_object:[],has_post:!1},a.setPost=function(t){a.setState({post_object:t,has_post:!0})},a.popPost=function(){var t=a.state.post_object;return a.setState({post_object:[],has_post:!1}),t},a.hasPost=function(){return a.state.has_post},a}return Object(h.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return r.a.createElement(m.d,null,r.a.createElement(m.b,{exact:!0,path:"/",component:L}),r.a.createElement(P,{path:"/main",component:S,setPost:this.setPost}),r.a.createElement(P,{path:"/compare",component:H,popPost:this.popPost,hasPost:this.hasPost}))}}]),e}(r.a.Component),A=Object(d.Emitter)(function(t){t.emit;return r.a.createElement(T,null)}),D=Object(d.EmitterProvider)(A);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));Object(i.render)(r.a.createElement(o.a,null,r.a.createElement(D,null)),document.querySelector("#root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[38,1,2]]]);
//# sourceMappingURL=main.11e8442f.chunk.js.map