const APPLICATION_KEY = "4c4a26461d6f15e7a78d3901da32c6477d07bf934637b8e919f5c96ff94af541";
const CLIENT_KEY = "00bf89dd5e58e6f092ba948eaffbe0f9a6ed819d7af409f5beb22a37f464fbbc";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "TestClass";
let TestClass = ncmb.DataStore(DBName);

// データの保存
function save(time){
let test = new TestClass();
let key = "clearTime";
//let value = "Hello, NCMB!";
let value = time;
test.set(key,parseInt(value));
test.save()
.then(function(){
console.log('成功');
})
.catch(function(err){
console.log('エラー発生:'+ err);
});
load();
}

function load(){
  let value = timer;
  TestClass
  .order("clearTime")
  .fetchAll()
  .then(function(results){
    if(parseInt(value)-1<results[0].clearTime){
      alert("ハイスコア:"+score.textContent);
    }
  })
  .catch(function(err){
    console.log("error"+err);
  })
}

// データの読み込み
// function load(time){
// TestClass
// .order('clearTime')
// .fetchAll()
// .then(function(results){
// if(time < results[0].clearTime){
// alert("ハイスコア" + time + "秒");
// }
// })
// .catch(function(err){
// console.log('エラー発生:'+ err);
// });
// }
let timer = null;
const MAX =1;
let ii = 1;
let eTime;

function init() {
if (timer == null) {
start = new Date();
time();
gameStart();
}
}

function gameStart() {
let size = 5;
let qNum = Math.floor(Math.random()*q.length);

for (let i =0; i<size*size; i++){
let s = document.createElement("span");
s.textContent = q[qNum][0];
s.setAttribute("id","num"+i);
s.addEventListener("click",function(){
if (this.textContent == q[qNum][1]){
//alert("正解");
correct.play();
while(cells.firstChild){
cells.removeChild(cells.firstChild);
}
if(ii!=MAX){
gameStart();
ii++;
} else {
//alert("クリア！クリアタイム：" + eTime + "秒");
save(timer);
// load(timer);
clearTimeout(timer);
}



} else {
wrong.play();
}
});
cells.appendChild(s);
if (i% size == size -1){
const br =document.createElement("br");
cells.appendChild(br);
}
}
let p = Math.floor(Math.random()*size*size);
let ans = document.getElementById("num" + p);
ans.textContent = q[qNum][1];
}



function time() {
let now = new Date();
eTime = parseInt((now.getTime() -start.getTime())/1000);
score.textContent = eTime;
timer = setTimeout("time()",1000);
}
