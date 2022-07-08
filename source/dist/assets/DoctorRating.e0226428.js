var K=Object.defineProperty,Y=Object.defineProperties;var Z=Object.getOwnPropertyDescriptors;var R=Object.getOwnPropertySymbols;var G=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var T=(e,t,u)=>t in e?K(e,t,{enumerable:!0,configurable:!0,writable:!0,value:u}):e[t]=u,k=(e,t)=>{for(var u in t||(t={}))G.call(t,u)&&T(e,u,t[u]);if(R)for(var u of R(t))X.call(t,u)&&T(e,u,t[u]);return e},A=(e,t)=>Y(e,Z(t));var c=(e,t,u)=>(T(e,typeof t!="symbol"?t+"":t,u),u);import{Y as N,Z as y,$,a0 as x,a1 as ee,a2 as te,a3 as ue,e as F,O as Q,H as se,a4 as ae,U as oe,_ as L,V as z,a5 as B,r as p,o as f,k as C,n as v,w as h,u as M,t as b,l as m,I as j,f as P,m as re,W as _,z as ie,A as le,D as ne,R as ce,M as de,K as pe,S as me,p as fe,s as ve,F as he,J as be}from"./vendor.825dd2c3.js";import{c as _e}from"./index.1178ea57.js";import{f as ge}from"./date.7878141a.js";import{a as we,g as ye}from"./index.056d9d85.js";import{N as S}from"./notify.a97b9367.js";import{f as De}from"./forrmaters.4a830e90.js";import"./index.16741bc9.js";const q=[{label:"\u0412 \u043E\u0447\u0435\u0440\u0435\u0434\u0438",name:"New"},{label:"\u041E\u0446\u0435\u043D\u0435\u043D\u043D\u044B\u0435",name:"Completed"}];var W=(e=>(e.New="New",e.Completed="Completed",e))(W||{});function H(){const e=y([]),t=y([]),u=y([]),o=$(()=>e.value.map(s=>s.value)),a=$(()=>e.value.map(s=>s.label));return N(u,s=>t.value=s),{selected:e,list:t,cache:u,selectedIds:o,selectedNames:a,filter:s=>t.value=u.value.filter(l=>l.label.toLowerCase().includes(s.toLowerCase()))}}function Be(){const{selected:e,list:t,cache:u,selectedIds:o,filter:a}=H();return N(u,s=>t.value=s),{list:t,selected:e,selectedIds:o,filter:a,fetch:async s=>{try{const l=(s==null?void 0:s.length)?s:void 0,d=await we({DoctorSpecialitiesIds:l});u.value=d.map(r=>({label:De(r),value:r.doctorId||"",specialityIds:(r.specialities||[]).map(w=>w.specialityId)}))}catch{S.error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0432\u0441\u0435\u0445 \u0432\u0440\u0430\u0447\u0435\u0439")}}}}function Ce(){const{selected:e,list:t,cache:u,selectedIds:o,selectedNames:a,filter:i}=H();return{list:t,selected:e,selectedIds:o,selectedNames:a,filter:i,fetch:async()=>{try{const l=await ye();u.value=l.map(d=>({label:d.specialityName||"",value:d.specialityId}))}catch{S.error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u0434\u043B\u044F \u0442\u0435\u043B\u0435\u043C\u0435\u0434\u0438\u0446\u0438\u043D\u044B")}}}}function J(){const e=y(q),t=y(),u=x(),o=ee(),a=()=>t.value=u.query.currentTab||q[0].name,i=l=>o.push({query:A(k({},u.query),{currentTab:l})}),s=$(()=>u.query.currentTab);return N(t,i),te(()=>a()),ue(()=>i()),{list:e,current:t,fromRouteQuery:s,enum:W}}var Ie=Object.defineProperty,Ee=Object.getOwnPropertyDescriptor,I=(e,t,u,o)=>{for(var a=o>1?void 0:o?Ee(t,u):t,i=e.length-1,s;i>=0;i--)(s=e[i])&&(a=(o?s(t,u,a):s(a))||a);return o&&a&&Ie(t,u,a),a};let g=class extends z{constructor(){super(...arguments);c(this,"interviews");c(this,"page");c(this,"maxPage");c(this,"tabs",B(J));c(this,"interviewsColumns",[{key:"status",label:"\u0421\u0442\u0430\u0442\u0443\u0441"},{key:"doctor",label:"\u0412\u0440\u0430\u0447"},{key:"intervieweeSpecialityName",label:"\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C"},{key:"creationDate",label:"\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F"}])}get currentPage(){return this.page}set currentPage(e){this.$emit("update:page",e)}isExpiredDate(e){const t=new Date(e),u=new Date;return u.setDate(u.getDate()-7),+t<+u}openConsultationInNewTab(e){if(this.tabs.fromRouteQuery===this.tabs.enum.Completed)return;const t=this.$router.resolve({name:"doc-consultations",query:{consultationId:e.activityId,interviewId:e.interviewId}});window.open(t.href,"_blank")}get formats(){return{date:u=>ge(new Date(u)),status:u=>Object.fromEntries(this.tabs.list.map(a=>[a.name,a.label]))[u]}}};I([F({type:Array,required:!0})],g.prototype,"interviews",2);I([F({type:Number,required:!0})],g.prototype,"page",2);I([F({type:Number,required:!0})],g.prototype,"maxPage",2);g=I([Q({components:{BTable:se,BPagination:ae,BBadge:oe}})],g);const Te=g,$e={class:"table-of-interviews__td-name"},Pe={class:"table-of-interviews__td-specialty"};function Ne(e,t,u,o,a,i){const s=p("b-badge"),l=p("BTable"),d=p("BPagination");return f(),C("div",{class:j(["table-of-interviews",{"table-of-interviews--complete":e.tabs.fromRouteQuery===e.tabs.enum.Completed}])},[v(l,{class:"table-of-interviews__table",columns:e.interviewsColumns,items:e.interviews,onClickRow:e.openConsultationInNewTab},{td_status:h(({item:{status:r}})=>[v(s,{class:"table-of-interviews__td-status",size:"xs",color:r===e.tabs.enum.New?"$b-support-201":"$b-base-02","text-color":r===e.tabs.enum.New?"$b-support-204":"$b-base-07"},{default:h(()=>[M(b(e.formats.status(r)),1)]),_:2},1032,["color","text-color"])]),td_doctor:h(({item:{intervieweeFirstName:r,intervieweeMiddleName:w,intervieweeLastName:E}})=>[m("div",$e,b(E)+" "+b(r)+" "+b(w),1)]),td_intervieweeSpecialityName:h(({item:{intervieweeSpecialityName:r}})=>[m("div",Pe,b(r),1)]),td_creationDate:h(({item:{creationDate:r}})=>[m("div",{class:j(["table-of-interviews__td-date",{"table-of-interviews__td-date--expired":e.isExpiredDate(r)&&e.tabs.fromRouteQuery!==e.tabs.enum.Completed}])},b(e.formats.date(r)),3)]),_:1},8,["columns","items","onClickRow"]),e.interviewsColumns.length&&e.maxPage>1?(f(),P(d,{key:0,modelValue:e.currentPage,"onUpdate:modelValue":t[0]||(t[0]=r=>e.currentPage=r),max:e.maxPage},null,8,["modelValue","max"])):re("",!0)],2)}var Fe=L(Te,[["render",Ne],["__scopeId","data-v-34df81ce"]]),Se="/img/rating-empty.svg";var Ve=Object.defineProperty,Oe=Object.getOwnPropertyDescriptor,V=(e,t,u,o)=>{for(var a=o>1?void 0:o?Oe(t,u):t,i=e.length-1,s;i>=0;i--)(s=e[i])&&(a=(o?s(t,u,a):s(a))||a);return o&&a&&Ve(t,u,a),a};const U=20;let D=class extends z{constructor(){super(...arguments);c(this,"date",null);c(this,"tabs",B(J));c(this,"doctors",B(Be));c(this,"specialties",B(Ce));c(this,"page",1);c(this,"totalCount",0);c(this,"interviews",[])}async updateDoctorsBySpecialty(){await this.doctors.fetch(this.specialties.selectedIds);const e=this.doctors.selected.filter(t=>t.specialityIds.some(u=>this.specialties.selectedIds.includes(u)));this.doctors.selected=e}get maxPage(){return Math.ceil(this.totalCount/U)}async getInterviews(){const e={status:this.tabs.current,page:this.page,count:U};this.specialties.selected.length&&(e.specialityNames=this.specialties.selectedNames),this.doctors.selected.length&&(e.doctorsIds=this.doctors.selectedIds),this.date&&(typeof this.date=="object"&&this.date.to?(e.dateFrom=this.date.from,e.dateTo=this.date.to):e.date=this.date);try{const{data:t,totalCount:u}=await _e(e);t&&(this.interviews=t,this.totalCount=u)}catch{S.error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0432\u0441\u0435\u0445 \u043E\u0446\u0435\u043D\u0449\u0438\u043A\u043E\u0432")}}get isShowClearFilterButton(){return this.specialties.selected.length||this.doctors.selected.length||this.date}clearFilter(){this.doctors.selected=[],this.specialties.selected=[],this.date=null}mounted(){Promise.all([this.doctors.fetch(),this.specialties.fetch()]).then(()=>this.getInterviews())}};V([_("specialties.selectedIds")],D.prototype,"updateDoctorsBySpecialty",1);V([_("tabs.current"),_("page"),_("date"),_("doctors.selected"),_("specialties.selected")],D.prototype,"getInterviews",1);D=V([Q({components:{BBtn:ne,BTab:ce,BTabs:de,BSelect:pe,BDatepicker:me,TableOfInterviews:Fe}})],D);const Re=D,O=e=>(fe("data-v-7c2a7d68"),e=e(),ve(),e),ke={class:"doctor-rating"},Ae={class:"doctor-rating__head"},je=O(()=>m("div",{class:"doctor-rating__title"},"\u041E\u0446\u0435\u043D\u043A\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438",-1)),qe={class:"doctor-rating__filter"},Ue={class:"doctor-rating__filter-inputs"},Qe=M(" \u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440 "),Le={key:0,class:"doctor-rating__empty"},ze=O(()=>m("img",{width:"165",height:"165",src:Se},null,-1)),Me=O(()=>m("div",{class:"doctor-rating__empty-title"},"\u041D\u0435\u0442 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0439 \u043D\u0430 \u043E\u0446\u0435\u043D\u043A\u0443",-1)),We=[ze,Me];function He(e,t,u,o,a,i){const s=p("BTab"),l=p("BTabs"),d=p("BSelect"),r=p("BDatepicker"),w=p("BBtn"),E=p("TableOfInterviews");return f(),C("div",ke,[m("div",Ae,[je,v(l,{modelValue:e.tabs.current,"onUpdate:modelValue":t[0]||(t[0]=n=>e.tabs.current=n),class:"doctor-rating__tabs"},{default:h(()=>[(f(!0),C(he,null,be(e.tabs.list,n=>(f(),P(s,{key:n.name,name:n.name,label:n.label},null,8,["name","label"]))),128))]),_:1},8,["modelValue"])]),m("div",qe,[m("div",Ue,[v(d,{ref:"test",modelValue:e.specialties.selected,"onUpdate:modelValue":t[1]||(t[1]=n=>e.specialties.selected=n),placeholder:"\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C","search-placeholder":"\u041F\u043E\u0438\u0441\u043A \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438",options:e.specialties.list,"filter-fn":e.specialties.filter,multiple:""},null,8,["modelValue","options","filter-fn"]),v(d,{modelValue:e.doctors.selected,"onUpdate:modelValue":t[2]||(t[2]=n=>e.doctors.selected=n),placeholder:"\u0412\u0440\u0430\u0447","search-placeholder":"\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u043D\u0430\u0431\u0438\u0440\u0430\u0442\u044C \u0438\u043C\u044F",options:e.doctors.list,"filter-fn":e.doctors.filter,multiple:""},null,8,["modelValue","options","filter-fn"]),v(r,{modelValue:e.date,"onUpdate:modelValue":t[3]||(t[3]=n=>e.date=n),value:e.date,placeholder:"\u0414\u0430\u0442\u0430",range:""},null,8,["modelValue","value"])]),ie(v(w,{type:"ghost",onClick:e.clearFilter},{default:h(()=>[Qe]),_:1},8,["onClick"]),[[le,e.isShowClearFilterButton]])]),e.interviews.length?(f(),P(E,{key:1,page:e.page,"onUpdate:page":t[4]||(t[4]=n=>e.page=n),interviews:e.interviews,"max-page":e.maxPage},null,8,["page","interviews","max-page"])):(f(),C("div",Le,We))])}var tt=L(Re,[["render",He],["__scopeId","data-v-7c2a7d68"]]);export{tt as default};
