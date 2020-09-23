/*---date---*/
var mujic=json_date()
/*---option---*/
function random(n){
  num=Math.floor(Math.random()*(n+1)) ;
  return num
}

/*---seting---*/
var box_h=3
var box_w=7
var skip=random(1)+1
const mujic_list=Object.keys(mujic)
var stand=box_h*box_w

for (var i = 0; i < box_w; i++) {
  var span = document.createElement("span");

  var inner_cel=""
  for (var ii = 0; ii < box_h; ii++) {
    var calc=(ii*skip+i*box_h)%mujic_list.length
    inner_cel=inner_cel+'<div class="elem"><img src="http://img.youtube.com/vi/'+mujic[mujic_list[calc]]["img_id"]+
    '/mqdefault.jpg" alt="" data-x="'+i+
    '" data-y="'+ii+'" data-id="'+mujic_list[calc]+
    '" data-name="'+mujic[mujic_list[calc]]["name"]+'" data-art="'+mujic[mujic_list[calc]]["artist"]+'"></div>'
  }
  span.innerHTML=inner_cel

  var box_in = document.getElementById("cube_box");
  box_in.appendChild(span);// 追加
}
m_box=document.getElementById("cube_box").children


function left_mover(y){
  for (var i = 0; i < m_box.length; i++) {
    console.log(m_box.length)
    m_box[i].children[y].classList.add('move_w');/*横列に動きをつける*/
  }
  setTimeout( function() {
    for (var q = 0; q < m_box.length-1; q++) {
      console.log(m_box[q].children[y].innerHTML)
      console.log(m_box[q+1].children[y].innerHTML)
      m_box[q].children[y].innerHTML=m_box[q+1].children[y].innerHTML;
    }
    /*---new_cel---*/
    /*m_box[m_box.length-1].children[y].innerHTML=m_box[random(m_box.length-1)].children[random(m_box[0].children.length-1)].innerHTML;*/
    stand=(stand+1)%mujic_list.length
    m_box[m_box.length-1].children[y].innerHTML='<img src="http://img.youtube.com/vi/'+mujic[mujic_list[stand]]["img_id"]+
    '/mqdefault.jpg" alt="" data-x="'+y+
    '" data-y="'+0+'" data-id="'+mujic_list[stand]+
    '" data-name="'+mujic[mujic_list[stand]]["name"]+'" data-art="'+mujic[mujic_list[stand]]["artist"]+'">'
    m_box[m_box.length-1].children[y].children[0].dataset.y=y
    console.log(m_box[y].children.length)

    //classの除去
    for (var z = 0; z < m_box.length; z++) {
      m_box[z].children[y].classList.remove('move_w');
    }
  },1000);
}
/*---start---*/
for (var i = 0; i < m_box.length; i++) {
  for (var ii = 0; ii < m_box[i].children.length; ii++) {
  m_box[i].children[ii].addEventListener("scroll",function(event){
    if (event.target.scrollLeft !== (event.target.scrollLeft - event.target.scrollLeft)) return;//特定条件外のアクションを返す
    console.log("list{}:"+event.target.scrollLeft)
    left_mover(event.target.children[0].dataset.y)
  })
  m_box[i].children[ii].addEventListener("click",function(event){
   var get = event.target.dataset
   if (get.id != before_id){
   before_id=get.id
   document.getElementById("side").children[0].innerHTML='<img src="http://img.youtube.com/vi/'+ get.id + '/mqdefault.jpg" alt="">'
   document.getElementById("side").children[1].innerHTML='<div><span>'+get.name+'</span></div><hr><div><span>'+get.art+'</span></div>'
   document.getElementById("player").innerHTML='<iframe src="https://www.youtube.com/embed/'+
   get.id +'?fs=0&disablekb=0&controls=0&loop=1&playlist=' + get.id +
   '"frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

  }},false);
 }
}
