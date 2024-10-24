(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{6782:(e,t,i)=>{Promise.resolve().then(i.bind(i,9641))},9641:(e,t,i)=>{"use strict";i.d(t,{default:()=>y});var s=i(7437),o=i(2265);class l{constructor(e,t){this.kind=e,this.color=t}}function a(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"pawn";return new l(e,"black")}function n(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"pawn";return new l(e,"white")}class r{movePiece(e,t,i,s){let o=this.fields[e][t];this.fields[i][s]=o,this.fields[e][t]=0,o instanceof l&&"king"===o.kind&&("white"===o.color?this.whiteKingPosition={row:i,col:s}:this.blackKingPosition={row:i,col:s})}isKingInCheck(e){let t="white"===e?this.whiteKingPosition:this.blackKingPosition;for(let i=0;i<8;i++)for(let s=0;s<8;s++){let o=this.fields[i][s];if(o instanceof l&&o.color!==e&&this.isMoveValid(o,i,s,t.row,t.col))return!0}return!1}constructor(){this.fields=[[a("rook"),a("knight"),a("bishop"),a("queen"),a("king"),a("bishop"),a("knight"),a("rook")],[a(),a(),a(),a(),a(),a(),a(),a()],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[n(),n(),n(),n(),n(),n(),n(),n()],[n("rook"),n("knight"),n("bishop"),n("queen"),n("king"),n("bishop"),n("knight"),n("rook")]],this.whiteKingPosition={row:7,col:4},this.blackKingPosition={row:0,col:4},this.isPathClear=(e,t,i,s)=>{let o=i>e?1:-1,l=s>t?1:-1;e===i&&(o=0),t===s&&(l=0);let a=e+o,n=t+l;for(;a!==i||n!==s;){if(0!==this.fields[a][n])return!1;a+=o,n+=l}return!0},this.movesPutKingInCheck=(e,t,i,s,o)=>{let l=new r;return l.fields=this.fields.map(e=>e.slice()),l.movePiece(t,i,s,o),!!l.isKingInCheck(e.color)},this.isCheckmate=e=>{for(let t=0;t<8;t++)for(let i=0;i<8;i++){let s=this.fields[t][i];if(s instanceof l&&s.color===e){for(let o=0;o<8;o++)for(let l=0;l<8;l++)if(this.isMoveValid(s,t,i,o,l)&&!this.movesPutKingInCheck(s,t,i,o,l))return console.log("Move found:",s,t,i,o,l),console.log("King in check:",this.isKingInCheck(e)),!1}}return!0},this.isStalemate=e=>{for(let t=0;t<8;t++)for(let i=0;i<8;i++){let s=this.fields[t][i];if(s instanceof l&&s.color===e){for(let e=0;e<8;e++)for(let o=0;o<8;o++)if(this.isMoveValid(s,t,i,e,o)&&!this.movesPutKingInCheck(s,t,i,e,o))return!1}}return!0},this.isMoveValid=(e,t,i,s,o)=>{let a=Math.abs(t-s),n=Math.abs(i-o);if("white"===e.color&&0!==this.fields[s][o]&&"white"===this.fields[s][o].color||"black"===e.color&&0!==this.fields[s][o]&&"black"===this.fields[s][o].color)return!1;switch(e.kind){case"pawn":if("white"===e.color&&(6===t&&4===s&&i===o&&0===this.fields[s][o]||1===a&&t>s&&i===o&&0===this.fields[s][o]||s===t-1&&1===n&&0!==this.fields[s][o])||"black"===e.color&&(1===t&&3===s&&i===o||1===a&&t<s&&i===o&&0===this.fields[s][o]||s===t+1&&1===n&&0!==this.fields[s][o]))return this.isPathClear(t,i,s,o);break;case"rook":if(t===s||i===o)return this.isPathClear(t,i,s,o);break;case"knight":if(2===a&&1===n||1===a&&2===n)return!0;break;case"bishop":if(a===n)return this.isPathClear(t,i,s,o);break;case"queen":if(a===n||t===s||i===o)return this.isPathClear(t,i,s,o);break;case"king":if("white"===e.color){if(7===t&&7===s&&4===i&&6===o&&0!==this.fields[7][7]&&"rook"===this.fields[7][7].kind&&"white"===this.fields[7][7].color&&0===this.fields[7][5]&&0===this.fields[7][6])return this.fields[7][7]=0,this.fields[7][5]=new l("rook","white"),!0;if(7===t&&7===s&&4===i&&2===o&&0!==this.fields[7][0]&&"rook"===this.fields[7][0].kind&&"white"===this.fields[7][0].color&&0===this.fields[7][1]&&0===this.fields[7][2]&&0===this.fields[7][3])return this.fields[7][0]=0,this.fields[7][3]=new l("rook","white"),!0}if("black"===e.color){if(0===t&&0===s&&4===i&&6===o&&0!==this.fields[0][7]&&"rook"===this.fields[0][7].kind&&"black"===this.fields[0][7].color&&0===this.fields[0][5]&&0===this.fields[0][6])return this.fields[0][7]=0,this.fields[0][5]=new l("rook","black"),!0;if(0===t&&0===s&&4===i&&2===o&&0!==this.fields[0][0]&&"rook"===this.fields[0][0].kind&&"black"===this.fields[0][0].color&&0===this.fields[0][1]&&0===this.fields[0][2]&&0===this.fields[0][3])return this.fields[0][0]=0,this.fields[0][3]=new l("rook","black"),!0}if(a<=1&&n<=1)return!0}}}}var c=i(6648),d=i(7591),h=i(7025),f=i(4839),u=i(6164);function g(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];return(0,u.m6)((0,f.W)(t))}let k=d.fC;d.xz;let w=d.h_;d.x8;let p=o.forwardRef((e,t)=>{let{className:i,...o}=e;return(0,s.jsx)(d.aV,{ref:t,className:g("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",i),...o})});p.displayName=d.aV.displayName;let m=o.forwardRef((e,t)=>{let{className:i,children:o,...l}=e;return(0,s.jsxs)(w,{children:[(0,s.jsx)(p,{}),(0,s.jsxs)(d.VY,{ref:t,className:g("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",i),...l,children:[o,(0,s.jsxs)(d.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,s.jsx)(h.Z,{className:"h-4 w-4"}),(0,s.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});m.displayName=d.VY.displayName;let b=o.forwardRef((e,t)=>{let{className:i,...o}=e;return(0,s.jsx)(d.Dx,{ref:t,className:g("text-lg font-semibold leading-none tracking-tight",i),...o})});b.displayName=d.Dx.displayName,o.forwardRef((e,t)=>{let{className:i,...o}=e;return(0,s.jsx)(d.dk,{ref:t,className:g("text-sm text-muted-foreground",i),...o})}).displayName=d.dk.displayName;let x=e=>{let{isOpen:t,onClose:i,promotePawn:o}=e;return(0,s.jsx)(k,{open:t,onOpenChange:i,children:(0,s.jsxs)(m,{children:[(0,s.jsx)(b,{className:"text-lg font-semibold mb-4 justify-center place-self-center text-white",children:"Select a Piece for Promotion"}),(0,s.jsxs)("div",{className:"flex space-x-4 justify-center items-center",children:[(0,s.jsx)("button",{onClick:()=>o("queen"),className:"p-2 bg-gray-300 hover:bg-gray-400",children:"Queen"}),(0,s.jsx)("button",{onClick:()=>o("rook"),className:"p-2 bg-gray-300 hover:bg-gray-400",children:"Rook"}),(0,s.jsx)("button",{onClick:()=>o("bishop"),className:"p-2 bg-gray-300 hover:bg-gray-400",children:"Bishop"}),(0,s.jsx)("button",{onClick:()=>o("knight"),className:"p-2 bg-gray-300 hover:bg-gray-400",children:"Knight"})]})]})})},v=i(357).env.NEXT_PUBLIC_BASE_PATH||"";function y(){let[e,t]=(0,o.useState)(new r),[i,a]=(0,o.useState)(null),[n,d]=(0,o.useState)(!1),[h,f]=(0,o.useState)(null),[u,g]=(0,o.useState)("white"),k=(s,o)=>{let l=e.fields[s][o];if(i){let l=e.fields[i.row][i.col];if(0!=l&&e.isMoveValid(l,i.row,i.col,s,o)&&!e.movesPutKingInCheck(l,i.row,i.col,s,o)){e.movePiece(i.row,i.col,s,o),w(l,s,o),g("white"===u?"black":"white");let a="white"===u?"black":"white";e.isCheckmate(a)?(alert(a+" is checkmated -- "+u+" wins!"),t(new r)):e.isStalemate(a)&&(alert(a+" is stalemated -- it's a draw"),t(new r))}a(null)}else 0!=l&&l.color===u?a({row:s,col:o}):a(null)},w=(t,i,s)=>{"pawn"===t.kind&&(0===i||7===i)&&(f({piece:t,row:i,col:s}),d(!0),e.fields[i][s]=new l("queen",t.color))};return(0,s.jsx)("div",{className:"flex justify-center items-center h-screen",children:(0,s.jsxs)("div",{className:"w-[600px] h-[600px] grid grid-rows-8 grid-cols-8 shadow-2xl",children:[(()=>{let t=[];for(let o=0;o<8;o++)for(let l=0;l<8;l++){let a=(o+l)%2==0,n=e.fields[o][l],r=(null==i?void 0:i.row)===o&&(null==i?void 0:i.col)===l;t.push((0,s.jsx)("div",{onClick:()=>k(o,l),className:"w-[75px] h-[75px] ".concat(a?"bg-gray-400":"bg-gray-700"," ").concat(r?"border-4 border-yellow-500":""),children:0!==n&&(0,s.jsx)(c.default,{src:"".concat(v,"/pieces/").concat(n.color,"_").concat(n.kind,".png"),width:75,height:75,alt:"chess piece"})},"".concat(o,"-").concat(l)))}return t})(),(0,s.jsx)(x,{isOpen:n,onClose:()=>d(!1),promotePawn:t=>{h&&(e.fields[h.row][h.col]=new l(t,h.piece.color)),d(!1),f(null)}})]})})}}},e=>{var t=t=>e(e.s=t);e.O(0,[256,130,215,744],()=>t(6782)),_N_E=e.O()}]);