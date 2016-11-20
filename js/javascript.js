var checked = [];
var input = document.getElementsByTagName('input');//对每一个input绑定事件
var arr = document.getElementsByClassName('arr');// 小元素
var index = 0;
//隐藏 其它选项
(function(){
	
	var i;
	var len = arr.length;
	var j;
	
	
	for(i=0;i<input.length;i++){
		input[i].addEventListener('click', function(){
			var num= 0;//记录次数  8个中的
			var temp = 0;
			// 重复的不可以选择
			if(this.name.indexOf('Lan') != -1)//如果是Lan
			{
				for(j=0;j<input.length;j++){
					if(this == input[j]){
						input[j-4].checked = false; 
					}
				}	
			}else if(this.name.indexOf('Man') !=-1){//如果是Man
				for(j=0;j<input.length;j++){
					if(this == input[j]){
						input[j+4].checked = false; 
					}
				}	
			}

			console.log(this.name);
			//跳转
			for(j = 0;j<input.length;j++){
				if(this.name == input[j].name){
					if(this.name.indexOf('Lan')!= -1){
						temp = j-4;
						break;
					}else if(this.name.indexOf('Man')!= -1){
						temp = j;
						break;
					}
				}
			}
			for(j = temp;j<temp+8;j++){
				if(input[j].checked == true){
					num++;
					console.log(input[j]);
				}
			}
			console.log(num);
			if(num == 2){
				arr[index++].style.display = 'none';
				arr[index].style.display = 'block';
			}
		})
	}
	for(i=1;i<len;i++){
		arr[i].style.display = 'none';
	}
})()

function jump(){

}
//  
function change(){
	var input = document.getElementsByTagName('input');
	var i;

	for(i = 0;i<input.length;i++){
		var inputName = input[i].name
	}
	// if(input[])
}
// function ()


//通用性函数
//window.onload 后添加的函数
  function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}