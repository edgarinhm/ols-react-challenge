import{r as l,j as e}from"./index-CYOHl2KT.js";const b="rgb(255, 255, 255)",c="rgb(0, 0, 0)",i="rgb(204, 204, 204)",y="rgb(199, 23, 23)",h="rgb(254, 131, 0)",u="rgb(0, 128, 0)",z="0",m="900",k="1000",p="1005",_="1030",v="1035",B="1040",w="1050",x="1100",q="1200",P="1500",j="950",M="_card_38qla_73",S="_cardBody_38qla_85",N="_header_38qla_91",$="_standard_38qla_99",f="_warning_38qla_102",C="_inProgress_38qla_107",A="_success_38qla_112",a={white:b,black:c,"light-black":"rgb(34, 34, 34)","translucid-black":"rgba(0, 0, 0, 0.06)","ghost-grey":"rgb(243, 243, 243)","bg-grey":"rgb(237, 237, 237)","note-blue":"rgb(237, 246, 253)","light-grey":"rgb(224, 224, 224)","very-light-grey":"rgb(206, 206, 206)","hover-grey":"rgb(216, 216, 216)",grey:i,"med-grey":"rgb(151, 151, 151)","greyish-brown":"rgb(74, 74, 74)","dark-grey":"rgb(112, 112, 112)","body-grey":"rgb(84, 86, 91)","pinkish-grey":"rgb(204, 204, 204)","inactive-grey":"rgb(187, 187, 187)",red:y,"light-red":"rgb(247, 220, 220)","light-orange":"rgb(255, 236, 217)",orange:h,"yellow-orange":"rgb(254, 191, 0)","bright-green":"rgb(209, 239, 62)","es-green":"rgb(136, 192, 75)","dark-green":"rgb(78, 108, 46)","strong-green":"rgb(145, 199, 23)","light-grayish-green":"rgb(244, 250, 232)","light-blue":"rgb(116, 193, 255)","light-grayish-blue":"rgb(207, 232, 250)","es-blue":"rgb(15, 138, 231)","med-blue":"#0b68ad","dark-blue":"rgb(11, 93, 155)","light-green-hover":"rgb(173, 212, 132)","mostly-desaturated-dark-blue":"rgb(87, 102, 117)","menu-black":"rgb(51, 51, 51)","pale-green":"rgb(244, 250, 232)","grid-bg-grey":"rgb(247, 247, 246)","royal-blue":"rgb(0, 102, 255)","light-green":"rgb(234, 245, 225)","breakline-gray":"rgb(206, 206, 206)","dark-red":"rgb(139, 0, 0)","dark-orange":"rgb(255, 140, 0)",green:u,"medium-light-orange":"rgb(203, 105, 0)","dark-moderate-blue":"rgb(75, 73, 172)","dark-grayish-blue":"rgb(163, 164, 165)","very-light-gray":"rgb(227, 227, 227)","very-pale-white-blue":"rgb(245, 247, 255)","card-tale":"rgb(125, 160, 250)","card-dark-blue":"rgb(71, 71, 161)","card-light-blue":"rgb(121, 120, 233)","card-light-danger":"rgb(121, 120, 233)","very-light-gray-mostly-white":"rgb(245, 245, 245)","slightly-desaturated-green":"rgb(171, 210, 129)",zBase:z,zBackground:m,zPopover:k,zAgentNotes:p,zPaymentPanelOverlay:_,zStoreMessagingDisclaimer:v,zModalBackground:B,zModal:w,zTooltip:x,zSpinner:q,zBanner:P,zComponentSpinner:j,card:M,cardBody:S,header:N,standard:$,warning:f,inProgress:C,success:A},D=g=>{const n=`modal-dialog-content-${l.useId()}`.replaceAll(":",""),{width:t="750px",children:s,ariaDescribedBy:o,ariaLabelledBy:d}=g;return e.jsx("div",{className:a.card,style:{width:t},"data-qa":"card-dialog",role:"dialog","aria-labelledby":d,"aria-describedby":o,children:e.jsx("div",{className:a.cardBody,id:n,tabIndex:-1,children:s})})},I=g=>{const{title:r,type:n="standard",id:t}=g;return e.jsx("div",{className:`${a.header} ${a[n]}`,children:typeof r=="function"?r():e.jsx("h3",{"data-qa":`modal-dialog-${r}`,id:t,children:r})})};D.Header=I;export{D as C};