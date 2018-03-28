webpackJsonp([1],{128:function(t,e,s){"use strict";var r=s(3),n=s(154),o=s(149),i=s.n(o);r.a.use(n.a),e.a=new n.a({routes:[{path:"/",name:"MainPage",component:i.a}]})},129:function(t,e,s){function r(t){s(139)}var n=s(2)(s(133),s(151),r,null,null);t.exports=n.exports},130:function(t,e,s){"use strict";function r(t){this._configKey=t}var n=s(136),o=s.n(n);r.prototype.load=function(){return JSON.parse(localStorage.getItem(this._configKey)||'{ "pivotToken": "" }')},r.prototype.save=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};localStorage.setItem(this._configKey,o()(t))},e.a=r},131:function(t,e,s){"use strict";var r=s(146),n=s.n(r),o=s(4),i=s.n(o),a=void 0;a=function(t){this.apiToken=t,this.baseUrl="https://www.pivotaltracker.com/services/v5/"},a.prototype.updateStory=function(t,e,s,r){this.api("put","projects/"+t+"/stories/"+e,{json:s},r)},a.prototype.getStory=function(t,e){this.api("get","/stories/"+t,{},e)},a.prototype.getProjects=function(t){this.api("get","/projects",{},t)},a.prototype.getStories=function(t,e,s,r,n,o){this.paginated("projects/"+t+"/stories",n||0,o||128,e,s,r)},a.prototype.getActivity=function(t,e,s,r,n,o){this.paginated("projects/"+t+"/activity",n||0,o||128,e,s,r)},a.prototype.getStoryActivity=function(t,e,s,r){this.api("get","projects/"+t+"/stories/"+e+"/activity",{qs:r||{}},s)},a.prototype.getMyActivity=function(t,e){this.api("get","my/activity",{qs:e||{}},t)},a.prototype.getTasks=function(t,e,s){this.api("get","projects/"+t+"/stories/"+e+"/tasks",{},s)},a.prototype.addTask=function(t,e,s,r,n){this.api("post","projects/"+t+"/stories/"+e+"/tasks",{body:{description:s,position:r}},n)},a.prototype.getIterations=function(t,e,s,r,n,o){this.paginated("projects/"+t+"/iterations",n||0,o||128,e,s,r)},a.prototype.getCurrentIterations=function(t,e){this.api("get","projects/"+t+"/iterations",{qs:{scope:"current",date_format:"millis"}},function(t,s){i.a.isFunction(e)&&(t||!s?e(t):e(!1,s))})},a.prototype.getMemberships=function(t,e){this.api("get","projects/"+t+"/memberships",{},e)},a.prototype.getComments=function(t,e,s){this.api("get","projects/"+t+"/stories/"+e+"/comments",{},s)},a.prototype.exportStories=function(t,e){this.api("post","stories/export",{body:n.a.stringify({"ids[]":t})},e)},a.prototype.getLabels=function(t,e){this.api("get","projects/"+t+"/labels",{},e)},a.prototype.getStoryLabels=function(t,e,s){this.api("get","projects/"+t+"/stories/"+e+"/labels",{},s)},a.prototype.addStoryLabel=function(t,e,s,r){this.api("post","projects/"+t+"/stories/"+e+"/labels",{body:{name:s}},r)},a.prototype.createLabel=function(t,e,s){this.api("post","projects/"+t+"/labels",{body:{name:e}},s)},a.prototype.createStory=function(t,e,s){this.api("post","projects/"+t+"/stories",{body:e},s)},a.prototype.paginated=function(t,e,s,r,n,o){var a=this,c={qs:i.a.extend({offset:e,limit:s,envelope:!0},r)};this.api("get",t,c,function(i,c){i||!c.pagination?o&&o(i||c):(e+=c.pagination.returned,n&&n(c.data,c.pagination,function(i){if(i)o&&o(i);else{var u=c.pagination.total-e;u>0?a.paginated(t,e,Math.min(u,s),r,n,o):o&&o()}}))})},a.prototype.api=function(t,e,s,r){var o=new window.XMLHttpRequest;s.qs?o.open(t,""+this.baseUrl+e+"?"+n.a.stringify(s.qs)):o.open(t,""+this.baseUrl+e),o.responseType="json",o.setRequestHeader("X-TrackerToken",this.apiToken),o.onload=function(){i.a.isFunction(r)&&r(void 0,o.response)},o.onerror=function(t){console.error("Houston, we've got a problem.",t,o),i.a.isFunction(r)&&r(t)},o.send()},e.a=a},132:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s(3),n=s(129),o=s.n(n),i=s(128);r.a.config.productionTip=!1,new r.a({el:"#app",router:i.a,template:"<App/>",components:{App:o.a}})},133:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},134:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s(131),n=s(130),o=s(0),i=s.n(o),a=s(4),c=s.n(a),u=s(150),l=s.n(u),p=new n.a("pivot-board"),d=function(t,e){var s={labels:[],created:[],updated:[],accepted:[],todo:[],burn:[]},r=void 0;for(r=e.start;r<=e.finish;r+=864e5)s.labels.push(i()(r).format("D MMM")),s.created.push(e.stories.reduce(function(t,e){return e.created_at<=r?t+(e.estimate||0):t},0)),s.updated.push(e.stories.reduce(function(t,e){return e.updated_at<=r?t+(e.estimate||0):t},0)),s.accepted.push(e.stories.reduce(function(t,e){return e.accepted_at<=r?t+(e.estimate||0):t},0)),s.todo.push(s.created[s.created.length-1]-s.accepted[s.accepted.length-1]);var n=-1;for(r=e.finish;r>=e.start;r-=864e5){var o=i()(r).weekday();o>0&&o<6&&n++,s.burn.unshift(n<0?0:n)}var a=1/s.burn[0];for(r=0;r<s.burn.length;r++)s.burn[r]=s.created[r]*s.burn[r]*a;var c={labels:s.labels,series:[s.created,s.burn,s.todo]};t.update(c)};e.default={name:"main-page",components:{"story-card":l.a},data:function(){return{config:p.load(),connected:!1,pivotal:void 0,error:"",iterationCount:1,mainChart:void 0,projects:void 0,stories:void 0,selectedProject:void 0}},watch:{iterationCount:function(){this.selectProject(this.selectedProject)}},computed:{monitoring:function(){return this.config.connect},todoStories:function(){return(this.stories||[]).filter(function(t){return["planned","rejected"].includes(t.current_state)})},devStories:function(){return(this.stories||[]).filter(function(t){return["started","finished"].includes(t.current_state)})},qaStories:function(){return(this.stories||[]).filter(function(t){return["delivered"].includes(t.current_state)})},doneStories:function(){return(this.stories||[]).filter(function(t){return["accepted"].includes(t.current_state)})}},methods:{setToken:function(){p.save(this.config),this.connect()},disconnect:function(){this.connected=!1,this.projects=void 0,this.stories=void 0,this.selectProject(void 0)},selectIteration:function(t){t?(this.stories=t.stories,d(this.mainChart,t)):this.stories=void 0},selectProject:function(t){var e=this;this.selectedProject=t,this.selectIteration(void 0),t&&this.pivotal.getIterations(t.id,{scope:"done_current",date_format:"millis",offset:1-this.iterationCount},function(t){if(c.a.isError(t))return void console.error("selectedProject",t);var s={start:t[0].start,finish:t[0].finish,stories:[]};t.forEach(function(t){s.start=Math.min(s.start,t.start),s.finish=Math.max(s.finish,t.finish),s.stories=s.stories.concat(t.stories)}),e.selectIteration(s)})},connect:function(){var t=this;if(!this.config.pivotToken)return void this.disconnect();this.error={},this.connected=!0,this.pivotal=new r.a(this.config.pivotToken),this.pivotal.getProjects(function(e,s){if(e||s.error)return t.error=e||s,console.error(t.error),void t.disconnect();s&&s.length>0&&(t.projects=s,t.selectProject(s[0]))})}},updated:function(){var t=document.querySelector(".ct-chart");t&&t.__chartist__&&t.__chartist__.update()},mounted:function(){this.connect(),this.mainChart=new window.Chartist.Line(".ct-chart",{labels:["new"],series:[[0,30,60,90,0,100]]},{axisY:{onlyInteger:!0}})}}},135:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"story-card",props:["story"],data:function(){return{}},methods:{cardStyle:function(t){switch(t.current_state){case"planned":return"card-outline-primary";case"rejected":return"card-outline-danger";case"started":return"card-outline-primary";case"finished":return"card-outline-warning";case"delivered":return"card-outline-primary";case"accepted":return"card-outline-success";default:return"card-outline-secondary"}},cardGlyph:function(t){switch(t.story_type){case"bug":return"fas fa-bug";case"chore":return"fas fa-cog";case"feature":return"fas fa-star";case"release":return"fas fa-flag-checkered";default:return"fas fa-question"}}},mounted:function(){}}},139:function(t,e){},140:function(t,e){},141:function(t,e){},142:function(t,e,s){function r(t){return s(n(t))}function n(t){var e=o[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var o={"./af":5,"./af.js":5,"./ar":12,"./ar-dz":6,"./ar-dz.js":6,"./ar-kw":7,"./ar-kw.js":7,"./ar-ly":8,"./ar-ly.js":8,"./ar-ma":9,"./ar-ma.js":9,"./ar-sa":10,"./ar-sa.js":10,"./ar-tn":11,"./ar-tn.js":11,"./ar.js":12,"./az":13,"./az.js":13,"./be":14,"./be.js":14,"./bg":15,"./bg.js":15,"./bm":16,"./bm.js":16,"./bn":17,"./bn.js":17,"./bo":18,"./bo.js":18,"./br":19,"./br.js":19,"./bs":20,"./bs.js":20,"./ca":21,"./ca.js":21,"./cs":22,"./cs.js":22,"./cv":23,"./cv.js":23,"./cy":24,"./cy.js":24,"./da":25,"./da.js":25,"./de":28,"./de-at":26,"./de-at.js":26,"./de-ch":27,"./de-ch.js":27,"./de.js":28,"./dv":29,"./dv.js":29,"./el":30,"./el.js":30,"./en-au":31,"./en-au.js":31,"./en-ca":32,"./en-ca.js":32,"./en-gb":33,"./en-gb.js":33,"./en-ie":34,"./en-ie.js":34,"./en-il":35,"./en-il.js":35,"./en-nz":36,"./en-nz.js":36,"./eo":37,"./eo.js":37,"./es":40,"./es-do":38,"./es-do.js":38,"./es-us":39,"./es-us.js":39,"./es.js":40,"./et":41,"./et.js":41,"./eu":42,"./eu.js":42,"./fa":43,"./fa.js":43,"./fi":44,"./fi.js":44,"./fo":45,"./fo.js":45,"./fr":48,"./fr-ca":46,"./fr-ca.js":46,"./fr-ch":47,"./fr-ch.js":47,"./fr.js":48,"./fy":49,"./fy.js":49,"./gd":50,"./gd.js":50,"./gl":51,"./gl.js":51,"./gom-latn":52,"./gom-latn.js":52,"./gu":53,"./gu.js":53,"./he":54,"./he.js":54,"./hi":55,"./hi.js":55,"./hr":56,"./hr.js":56,"./hu":57,"./hu.js":57,"./hy-am":58,"./hy-am.js":58,"./id":59,"./id.js":59,"./is":60,"./is.js":60,"./it":61,"./it.js":61,"./ja":62,"./ja.js":62,"./jv":63,"./jv.js":63,"./ka":64,"./ka.js":64,"./kk":65,"./kk.js":65,"./km":66,"./km.js":66,"./kn":67,"./kn.js":67,"./ko":68,"./ko.js":68,"./ky":69,"./ky.js":69,"./lb":70,"./lb.js":70,"./lo":71,"./lo.js":71,"./lt":72,"./lt.js":72,"./lv":73,"./lv.js":73,"./me":74,"./me.js":74,"./mi":75,"./mi.js":75,"./mk":76,"./mk.js":76,"./ml":77,"./ml.js":77,"./mr":78,"./mr.js":78,"./ms":80,"./ms-my":79,"./ms-my.js":79,"./ms.js":80,"./mt":81,"./mt.js":81,"./my":82,"./my.js":82,"./nb":83,"./nb.js":83,"./ne":84,"./ne.js":84,"./nl":86,"./nl-be":85,"./nl-be.js":85,"./nl.js":86,"./nn":87,"./nn.js":87,"./pa-in":88,"./pa-in.js":88,"./pl":89,"./pl.js":89,"./pt":91,"./pt-br":90,"./pt-br.js":90,"./pt.js":91,"./ro":92,"./ro.js":92,"./ru":93,"./ru.js":93,"./sd":94,"./sd.js":94,"./se":95,"./se.js":95,"./si":96,"./si.js":96,"./sk":97,"./sk.js":97,"./sl":98,"./sl.js":98,"./sq":99,"./sq.js":99,"./sr":101,"./sr-cyrl":100,"./sr-cyrl.js":100,"./sr.js":101,"./ss":102,"./ss.js":102,"./sv":103,"./sv.js":103,"./sw":104,"./sw.js":104,"./ta":105,"./ta.js":105,"./te":106,"./te.js":106,"./tet":107,"./tet.js":107,"./tg":108,"./tg.js":108,"./th":109,"./th.js":109,"./tl-ph":110,"./tl-ph.js":110,"./tlh":111,"./tlh.js":111,"./tr":112,"./tr.js":112,"./tzl":113,"./tzl.js":113,"./tzm":115,"./tzm-latn":114,"./tzm-latn.js":114,"./tzm.js":115,"./ug-cn":116,"./ug-cn.js":116,"./uk":117,"./uk.js":117,"./ur":118,"./ur.js":118,"./uz":120,"./uz-latn":119,"./uz-latn.js":119,"./uz.js":120,"./vi":121,"./vi.js":121,"./x-pseudo":122,"./x-pseudo.js":122,"./yo":123,"./yo.js":123,"./zh-cn":124,"./zh-cn.js":124,"./zh-hk":125,"./zh-hk.js":125,"./zh-tw":126,"./zh-tw.js":126};r.keys=function(){return Object.keys(o)},r.resolve=n,t.exports=r,r.id=142},149:function(t,e,s){function r(t){s(140)}var n=s(2)(s(134),s(152),r,"data-v-68776ea4",null);t.exports=n.exports},150:function(t,e,s){function r(t){s(141)}var n=s(2)(s(135),s(153),r,"data-v-e723abce",null);t.exports=n.exports},151:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},staticRenderFns:[]}},152:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"main"},[s("div",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[t._v("Loading...")]),t._v(" "),s("section",{staticClass:"serverapp"},[s("header",{staticClass:"header"},[s("nav",{staticClass:"navbar navbar-expand-sm navbar-light bg-light"},[s("a",{staticClass:"navbar-brand"},[t._v("Pivotal Board")]),t._v(" "),s("form",{directives:[{name:"show",rawName:"v-show",value:t.projects,expression:"projects"}],staticClass:"form-inline"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.projects,expression:"projects"}],staticClass:"input-group"},[t._m(0),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.iterationCount,expression:"iterationCount"}],staticClass:"form-control",staticStyle:{"text-align":"center"},attrs:{type:"number",min:"1",max:"9"},domProps:{value:t.iterationCount},on:{input:function(e){e.target.composing||(t.iterationCount=e.target.value)}}}),t._v(" "),t._m(1)])]),t._v(" "),s("ul",{directives:[{name:"show",rawName:"v-show",value:t.projects,expression:"projects"}],staticClass:"nav nav-pills"},t._l(t.projects,function(e,r){return s("li",{key:e.id,staticClass:"nav-item"},[s("a",{staticClass:"nav-link",class:{active:e==t.selectedProject},attrs:{href:"#"},on:{click:function(s){t.selectProject(e)}}},[t._v(t._s(e.name))])])})),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.connected,expression:"!connected"}],staticClass:"input-group"},[t._m(2),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.config.pivotToken,expression:"config.pivotToken"}],staticClass:"form-control",attrs:{autofocus:"",autocomplete:"off",placeholder:"Enter token here"},domProps:{value:t.config.pivotToken},on:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.setToken()},input:function(e){e.target.composing||t.$set(t.config,"pivotToken",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"ml-auto justify-content-end"},[s("button",{directives:[{name:"show",rawName:"v-show",value:!t.connected,expression:"!connected"}],staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){t.setToken()}}},[t._v("\n              Connect\n          ")]),t._v(" "),s("button",{directives:[{name:"show",rawName:"v-show",value:t.connected,expression:"connected"}],staticClass:"btn btn-light",attrs:{type:"button"},on:{click:function(e){t.disconnect()}}},[t._v("\n              Disconnect\n          ")])])])]),t._v(" "),s("main",[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.connected,expression:"!connected"}],staticClass:"row"},[t._m(3)]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.error.possible_fix,expression:"error.possible_fix"}],staticClass:"alert alert-danger",attrs:{role:"alert"}},[s("strong",[t._v(t._s(t.error.error))]),t._v(" "+t._s(t.error.possible_fix)+"\n      ")]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.error.message,expression:"error.message"}],staticClass:"alert alert-danger",attrs:{role:"alert"}},[s("strong",[t._v(t._s(t.error.name))]),t._v(" "+t._s(t.error.message)+"\n      ")]),t._v(" "),s("div",[s("h1",[t._v("Stories")]),t._v(" "),s("div",[s("div",{staticClass:"left"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.stories,expression:"stories"}],staticClass:"scrum-board"},[s("div",{staticClass:"scrum-group"},[s("h2",[t._v("Todo")]),t._v(" "),t._l(t.todoStories,function(t,e){return s("story-card",{key:t.id,attrs:{story:t}})})],2),t._v(" "),s("div",{staticClass:"scrum-group"},[s("h2",[t._v("Dev")]),t._v(" "),t._l(t.devStories,function(t,e){return s("story-card",{key:t.id,attrs:{story:t}})})],2),t._v(" "),s("div",{staticClass:"scrum-group"},[s("h2",[t._v("QA")]),t._v(" "),t._l(t.qaStories,function(t,e){return s("story-card",{key:t.id,attrs:{story:t}})})],2),t._v(" "),s("div",{staticClass:"scrum-group"},[s("h2",[t._v("Done")]),t._v(" "),t._l(t.doneStories,function(t,e){return s("story-card",{key:t.id,attrs:{story:t}})})],2)])]),t._v(" "),t._m(4)])])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text"},[t._v("Show")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"input-group-append"},[s("span",{staticClass:"input-group-text"},[t._v("Iterations")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"input-group-prepend"},[s("span",{staticClass:"input-group-text"},[t._v("Pivotal API Token")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-sm-12"},[s("a",{attrs:{href:"https://www.pivotaltracker.com/profile"}},[t._v("Get your API Token from your PivotalTracker Profile page")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"right"},[s("div",{staticClass:"ct-chart ct-square"})])}]}},153:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"card-title"},[s("a",{staticClass:"left",attrs:{href:t.story.url}},[t._v(t._s(t.story.id))]),t._v(" "),s("span",{class:t.cardGlyph(t.story)}),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.story.estimate,expression:"story.estimate"}],staticClass:"right badge badge-primary"},[t._v(t._s(t.story.estimate))]),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:!t.story.estimate,expression:"!story.estimate"}],staticClass:"right badge badge-primary"},[t._v("-")])]),t._v(" "),s("p",{staticClass:"card-text"},[t._v(t._s(t.story.name))]),t._v(" "),s("div")])])},staticRenderFns:[]}}},[132]);
//# sourceMappingURL=app.dcbb0805e3380a5120eb.js.map