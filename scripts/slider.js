
//////////////////////////////////////////
//全局变量
var picnum = 0;//当前图片
var picnum_max = 6;
var picpx = -750;//每幅图片像素差
var picpx_now = 0; //当前图片位置
var time;
var movement;
var picmove_pre = 15;//每次移动的像素
////////////////////////////////////////////


var select = document.getElementsByClassName("select");
var imgul = document.getElementById("imgul");
var prebtn = document.getElementById("prebtn");
var nextbtn = document.getElementById("nextbtn");

//////////////////////////////////////////////////////////
//为HTML绑定事件
window.onload = function(){
  select[0].style.backgroundImage = "url(./images/group2/03.jpg)";
  for(var i = 0; i < select.length; ++i){
    select[i].onmouseover = function(){dotmouseover(this);}
  }
  imgul.onmouseover = function(){imageover();}
  imgul.onmouseout = function(){imageout();}
  imgul.onmousewheel = function(){imagewheel();}
  prebtn.onclick = function(){pre();}
  prebtn.onmouseover = function(){buttonover(this);}
  prebtn.onmouseout = function(){buttonout(this);}
  nextbtn.onclick = function(){next();}
  nextbtn.onmouseover = function(){buttonover(this);}
  nextbtn.onmouseout = function(){buttonout(this);}

  setTimeout(auto_move,5000);
}
/////////////////////////////////////////////////////////////////

//图片自动播放
function auto_move(){
  if(picnum == picnum_max - 1){
    premove(0);
    select[picnum].style.backgroundImage = "url(./images/group2/04.jpg)";
    select[0].style.backgroundImage = "url(./images/group2/03.jpg)";
    picnum = 0;
    setTimeout(auto_move,5000);
    return;
  }
  next();
  setTimeout(auto_move,5000);
}

function imageover(){
  $("button").css("opacity","0.2")
}

function imageout(){
  $("button").css("opacity","0")
}

//鼠标滚动事件
function imagewheel(){
  if(event.wheelDelta > 0) pre();
  else if(event.wheelDelta < 0) next();
}

function pre(){
  if(picnum == 0) return;
  clearTimeout(movement);
  final_left = (picnum-1) * picpx;
  picmove(final_left);
  picnum--;
  select[picnum+1].style.backgroundImage = "url(./images/group2/04.jpg)";
  select[picnum].style.backgroundImage = "url(./images/group2/03.jpg)";
}

function next(){
  if(picnum == picnum_max - 1) return;
  clearTimeout(movement);
  final_left = (picnum+1) * picpx;
  picmove(final_left);
  picnum++;
  select[picnum-1].style.backgroundImage = "url(./images/group2/04.jpg)";
  select[picnum].style.backgroundImage = "url(./images/group2/03.jpg)";
}

//图片移动
function picmove(final_left){
  if(picpx_now == final_left) return;
  else if(picpx_now < final_left){
    picpx_now+=picmove_pre;
    $("li").css("left",picpx_now+"px");
    time = 50 / (((picpx_now - final_left) / picpx + 1) ^ 6);
  }
  else{
    picpx_now-=picmove_pre;
    $("li").css("left",picpx_now+"px");
    time = 50 / (((final_left - picpx_now) / picpx + 1) ^ 6);
  }

  var repeat = "picmove(" +  final_left + ")";
  movement = setTimeout(repeat,time);
}


//图片向前移动
function premove(final_left){
  if(picpx_now >= final_left) return;
  picpx_now+=picmove_pre;
  $("li").css("left",picpx_now+"px");
  var repeat = "premove(" +  final_left + ")";
  movement = setTimeout(repeat,time);
}

//图片向后移动
function nextmove(final_left){
  if(picpx_now <= final_left) return;
  picpx_now-=picmove_pre;
  $("li").css("left",picpx_now+"px");
  var repeat = "nextmove(" + final_left + ")";
  movement = setTimeout(repeat,time);
}

function buttonover(e){
  e.style.opacity = 0.7;
}

function buttonout(e){
  e.style.opacity = 0;
}

function dotmouseover(e){
  var picnum_target;
  switch(e.id){
    case "s1" : picnum_target = 0;break;
    case "s2" : picnum_target = 1;break;
    case "s3" : picnum_target = 2;break;
    case "s4" : picnum_target = 3;break;
    case "s5" : picnum_target = 4;break;
    case "s6" : picnum_target = 5;break;
  }

  select[picnum].style.backgroundImage = "url(./images/group2/04.jpg)";//图片变白
  select[picnum_target].style.backgroundImage = "url(./images/group2/03.jpg)";//图片变红

  if(picnum == picnum_target) return;

  time = 1;
  clearTimeout(movement);
  //picmove(picnum_target*picpx);
  if(picnum < picnum_target) nextmove(picnum_target*picpx);
  else premove(picnum_target*picpx);

  picnum = picnum_target;

}
