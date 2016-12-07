var checked = [];
var input = document.getElementsByTagName('input');//对每一个input绑定事件
var arr = document.getElementsByClassName('arr');// 小元素
var index = 1;
var phoneNumber;
var name;
var valueD = 0;
var valueI = 0;
var valueS = 0;
var valueC = 0;
//隐藏 其它选项
(function(){
	
	var i;
	var len = arr.length;
	var j;
	
	
	for(i=2;i<input.length-2;i++){
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
			for(j = 2;j<input.length-2;j++){
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
				if(index == arr.length-1){
					statistics();// 统计数据
				}
			}
		})
	}
	for(i=1;i<len;i++){
		arr[i].style.display = 'none';
	}
	for(i=2;i<input.length;i++){
		input[i].className = 'beautifulInput';
	}
})()




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

//手机号相关
function isPhoneno(str)
  {
	  var reg=/[^0-9]/g
	  var len=str.length
	  if (len!=11)
	  {
	  	alert("您输入的手机号码位数不正确！");form1.phone.focus();return false;
	  }
	  // else if(str.substring(0,2)!="13")
	  // {
	  // 	alert("您输入的手机号码不正确！");form1.phone.focus();return false;
	  // }
	  if (reg.test(str))
	  {
	  	alert("手机号码必须是数字！");form1.phone.select();
	  	return false;
	  }
	  else
	  {
	  	return true;
	  }
}
//按键 开始测试
function start(){
	var account = document.getElementsByClassName('account')[0];
	var phonenum = document.getElementsByClassName('password')[0];
	var button = document.getElementsByClassName('button')[0];

	button.addEventListener('click',function(){
		name = account.value;
		phoneNumber = phonenum.value;
		if(isPhoneno(phoneNumber) == true){
				arr[0].style.display = 'none';
				arr[1].style.display = 'block';
		}
	});
}
addLoadEvent(start);

//统计数据
function statistics(){
	var i;
	for(i=2;i<input.length;i++){
		if(input[i].checked == true){
			if(input[i].name.indexOf("Lan")!=-1)//存在 lan的 选项
			{
				switch(input[i].value){
					case 'D':
						valueD--;
						break;
					case 'I':
						valueI--;
						break;
					case 'S':
						valueS--;
						break;
					case 'C':
						valueC--;
						break;
					default:
						break;
				}
			}else if(input[i].name.indexOf("Man")!=-1){
				switch(input[i].value){
					case 'D':
						valueD++;
						break;
					case 'I':
						valueI++;
						break;
					case 'S':
						valueS++;
						break;
					case 'C':
						valueC++;
						break;
					default:
						break;
				}
			}

		}

	}
	setTimeout(function(){
		var section = document.getElementsByTagName('section')[0];
		section.style.display = 'none';
		var idD = document.getElementById('idD');
		var idI = document.getElementById('idI');
		var idS = document.getElementById('idS');
		var idC = document.getElementById('idC');
		var nameZ = document.getElementById('name');
		var phoneP = document.getElementById('phoneP');
		idD.innerHTML = "D："+valueD;
		idI.innerHTML = "I："+valueI;
		idS.innerHTML = "S："+valueS;
		idC.innerHTML = "C："+valueC;
		nameZ.innerHTML = "姓名："+name;
		phoneP.innerHTML = "联系方式："+phoneNumber;
		chart();
		datacharacter();
		window.print();
	}, 500);
	
	// console.log(valueD);
	// console.log(valueI);
	// console.log(valueS);
	// console.log(valueC);
	
}

//生成图表
function chart() {
		var chart = new CanvasJS.Chart("chartContainer", {
			title: {
				text: "DISC表格图"
			},
			axisY: {
				interval: 10
			},
			data: [{
				type: "line",
				dataPoints: [
				  { y: valueD, label: "D" },
				  { y: valueI, label: "I" },
				  { y: valueS, label: "S" },
				  { y: valueC, label: "C" },
				]
			}]
		});
		chart.render();
}
//排序规则函数
function sortNumber(a,b){
	return a - b;
}
//生成对应数据
function datacharacter(){
	var i;
	var temp=[];
	var temp_int;
	var characterP = document.getElementById('characterP');
	var characterT = document.getElementById('characterT');
	var j;
	var k;

	temp[0] = valueD;
	temp[1] = valueI;
	temp[2] = valueC;
	temp[3] = valueS;
	temp.sort(sortNumber);

	if(temp[3] == valueD){// D高
		characterT.innerHTML = "<b>D高：力量型！—具有领导能力</b><br>\
<b>特点：</b>外向、行动者、乐观。喜欢做主、行动力强、行动速度、思考力稍弱、喜欢做目标、不达目的不罢休、充满自信、意志坚定、有活力、做事主动、不易气馁、是推动别人行动的人、粗线条、不容易适应环境（不过由于行动力很强 所以往往做事会有很大成就 ）。 <br/>\
<b>优点：</b>是一个坚定果敢的人，酷好变化，喜欢控制，干劲十足，独立自主，超级自信。在工作方面，你是一个务实和讲究效率的人，目标明确，眼光全面，组织力强，行动迅速，解决问题不过夜，果敢坚持到底，在反对声中成长。但是，因为过于强调结果，你往往容易忽视细节，处理问题不够细致。<br>\
<b>缺点：</b>爱管人、喜欢支使他人的特点使得你能够带动团队进步，但也容易激起同事的反感。\
不易看到别人的需求，只看到自己的需求 做错事后很容易原谅自己。由于你比较不会顾及别人的感受，所以显得粗鲁、霸道、没有耐心、穷追不舍、不会放松。你不习惯与别人进行感情上的交流，不会恭维人，不喜欢眼泪，匮乏同情心。 固执、易争吵、好斗、说话极易伤害别人、具有强迫性、很容易支配别人、无耐性、专横、经常人际关系差 （这类人总觉得自己是对的，不太需要朋友，并且这类人天生行动力强，但是即使是正确的事情，也因为性格问题，说话伤害到别人，而得不到别人的支持和认同）。<br>\
<b>注意点：</b>这类型严重者会很独断、霸道、容易让别人感到压力、相处很累。<br>\
<b>自我规划：</b>  1。减轻对别人的压力 学会放松 要缓和 2。尝试接受别人的号召和意见 尝试耐心和低调 3。停止争吵让别人也感觉到放松  4。学习包容 学会道歉 学会坦然接受自己的错误 放开胸怀（当一个力量型的人学会承认错误 那么他便成功了）  <br> \
"
		if(temp[0] == valueI){//高D  低I
			characterP.innerHTML = "<b>高d  低i: 效率</b><br>\
Efficiency－高效性（效率）：高 Dominance 和 低 Influence，在分析表中发现显示高支配及低影响的DISC子特征。有效率的人是直接而独断，但对个人事务不太关心。他们对事务的看法客观而重分析，并且会不计一切地朝目标迈进。他们需要看见结果，并且会为了追求结果而在品质和细节上妥协。\
"
		}else if(temp[0] == valueC){//高D  低C
			characterP.innerHTML = "<b>高d  低c: 独立</b><br>\
 Independence－独立性：高 Dominance 和 低 Compliance，在分析表中发现显示高支配及低服从的DISC子特征。这种类型的人通常受挫于原则或规定；他们喜欢依己见行事，并居于权威的地位。这种子特征常见于企业家作风。\
"
		}else if(temp[0] == valueS){//高D  低S
			characterP.innerHTML = "<b>高d  低s：行动、自我激励</b><br>\
Self-motivation－自我激励（自动）：高 Dominance 和 低 Steadiness，在分析表中发现显示高支配及低稳健的DISC子特征。行动是这个子特征的重要成份。这种类型的人觉得随时都需要活跃，对于不愿或不能跟随他快速步调的人感到不耐。他们对新情势反应快速，但从不会忘记自己的目标与企图。\
"
		}

	}else if(temp[3] == valueI){//I高
		characterT.innerHTML = "<b>I高  活泼型！—团队活动组织人<b><br>\
<b>特点：</b>外向、多言、乐观。一群人里面说话最多的,天生希望成为注意力的中心，具有很强的好奇心、热情、热心具有表达能力、精力充沛、具有干劲（但是却缺乏毅力 所以常常这干干 那干干）、好表现、粗线条、轻许诺（因为热心所以常常答应别人 但是由于记忆差 所以常常答应后就忘记了） 、以自己的快乐为主。<br>\
<b>优点：</b>在工作方面，你是一个热情的推动者，总有新主意，色彩丰富，说干就干，能够鼓励和带领他人一起积极投入工作。在人际关系方面，你容易交上朋友，朋友也多。你关爱朋友，也被朋友称赞。你爱当主角，爱受欢迎喜欢控制谈话内容。<br>\
<b>缺点：</b>以自己为中心、独霸主题、爱打断别人的谈话、不注意记忆、变化无常。这类人易交朋友，但深切的朋友却不多，喜好多却不精，缺乏毅力。容易生气，爱抱怨，大嗓门，不成熟。遇到困难容易失去信心，杂乱无章，做事不彻底，爱走神儿，爱找借口。<br>\
<b>切入点：</b>如果跟这类型的人交往,一定要多夸奖他,多鼓励他,多给他说话的机会.<br>\
<b>自我规划：</b>1。管住自己的嘴  2。控制自己的表现欲望  3。对自己的评价不要过高 关心自己的同时也要关心别人 4。培养记忆力  5，不要太善变，要脚踏实地,要做就要把一件事作完整。<br>\
"
		if(temp[0] == valueD){ //高I  低D
			characterP.innerHTML = "<b>高I 低d：友好</b><br>\
Friendliness－友好：高 Influence 和 低 Dominance，在分析表中发现显示高影响及低支配的DISC子特征。「友善」的人喜欢说话沟通是这种类型最强的要素。他们活泼外向，但对于一般的工作不容易专心，而且很容易为了社交机会而分心。\
"
		}else if(temp[0] == valueS){//高I 低S
			characterP.innerHTML ="<b>高I  低s：热情</b><br>\
Enthusiasm－热情（热忱）：高 Influence 和 低 Steadiness，在分析表中发现显示高影响及低稳健的DISC子特征。这是一种外向的子特征，与友善有许多相同之处，但是多加了些活力和速度。这种有生命力的作风会在话题中强烈显示他们的兴趣，而他们热情的本性也是对其他人的一种激励因子。\
"
		}else if(temp[0] == valueC){//高I 低C
			characterP.innerHTML = "<b>高I  低c：自信</b><br>\
Self-confidence－自信：高 Influence 和 低 Compliance，在分析表中发现显示高影响及低服从的DISC子特征。「自信」分析表所表示的人极少会缺乏自信，而且几乎在任何社交场合都能处之泰然。他们很容易和陌生人打成一片，也不怕主动与人接触。他们有时会变得过度自信，而造成他们冲动行事。"
		}
	}else if(temp[3] == valueS){//高 S
	 	characterT.innerHTML = "<b>S高和平型！—知足而不愿前进的人</b><br>\
<b>特点：</b>内向、旁观者、悲观。性格低调、易相处、很轻松、平和、无异议、耐心、适应力强、无攻击性、很好的聆听者、具有外交手段（说话绕弯 不直接）、人际关系好（和事老）、所以朋友很多、不爱生气。<br> \
<b>优点：</b>是一个温和主义者，悠闲，平和，有耐心，感情内藏，待人和蔼，乐于倾听，遇事冷静，随遇而安。在工作方面，你能够按部就班地管理事务，胜任工作并能够持之以恒。你奉行中庸之道，平和可亲，一方面习惯于避免冲突，另一方面也能处变不惊。<br>\
<b>缺点：</b>不容易兴奋、拒绝改变、喜欢一成不变、目标感不强、看似懒惰、不愿承担责任、回避压力、沉默（不愿意沟通 即使内心波涛汹涌...所以这类型的爱人，常常都不会说：我爱你） 马虎、无主见（需要力量型的人 给于指导，但不要施加压力），不善于做决定。总是慢吞吞的，很难被鼓动，懒惰，马虎，得过且过。由于害怕承担风险和责任，宁愿站在一边旁观。很多时候，你总是焉有主意，有话不说，或折衷处理。<br>\
<b>切入点：</b>和这类型的人交往 一定要鼓励他 促进他 注意点：这类型过分时会毫无主见 做事漫不经心 <br>\
<b>自我规划：</b> 1.让自己快乐起来 给自己尝试新鲜的事物和思想 2.明确生活的责任 不要得过且过  3.有意识接受督促（找个力量型或完美型） 4.多表达、沟通。<br>\
";
		if(temp[0] == valueD){//高S  低D
			characterP.innerHTML = "<b>高s  低d—耐心</b><br>\
Patience－耐性：高 Steadiness 和 低 Dominance，在分析表中发现显示高稳健及低支配的DISC子特征。这类型的人的个性不疾不徐，能在别人觉得反复或无聊的情况中工作。他们的作风顺从，相信有些事是他们无法改变的。\
"
		}else if(temp[0] == valueI){//高S 低I
			characterP.innerHTML ="<b>高s  低i—深思熟虑</b><br>\
Thoughtfulness－深思熟虑：高 Steadiness 和 低 Influence，在分析表中发现显示高稳健及低影响的DISC子特征。「缜密」的人会小心规划他们的用词和行动，而且大都不会鲁奔行事。这类型的人最不擅长处理期限和其它时间方面的限制。他们的优点是工作方面的可靠和稳。\
"
		}else if(temp[0] == valueC){//高S 低C
			characterP.innerHTML = "<b>高s  低c—执着、高忠诚性</b><br>\
Persistence－执着：高 Steadiness 和 低 Compliance，在分析表中发现显示高稳健及低服从的DISC子特征。有「毅力」的人特别不擅于应付改变。他们一旦适应了现状之后，就很难突破而去适应新的情况。这表示他们会尽一切力量来维持事物的现状，在维护他们目前的环境和社交圈时，会显示出极大的忠诚和韧性。\
"
		}
	}else if(temp[3] == valueC){//高C
		characterT.innerHTML = "<b>C高  完美型！—专业性人才</b><br>\
<b>特点：</b>内向、思考者、悲观以思考为主。深思熟虑、严肃、有目标并且目标感很强、追求完美、有艺术天分、沉闷、关注细节、完美主义、高标准、想得多但做得少、做事前一定要先想个计划、有条理、有组织、交友慎重（但一旦交往 就会很忠诚的对待朋友）、关心别人、为别人牺牲是自己的意愿 （所以这类型的人一生一定有几个特别好的朋友 一辈子的朋友那种）情感丰富容易感动、也容易受伤。<br>\
<b>优点：</b>是一个性格深沉的人，严肃认真，目的性强，善于分析，愿意思考人生与工作的意义，喜欢美丽，对他敏感，理想主义。在工作方面，你是一个完美主义者，高标准，计划性强，注重细节，讲究条理，整洁，能够发现问题并制订解决问题的办法，喜欢图表和清单，坚持己见，善始善终。<br>\
<b>缺点：</b>行动力弱、优柔寡断、容易抑郁（常常是因为要求过高了、当达不到时候就会很失望）、容易自惭自愧、悲观、天生消极、易受环境影响、情绪化。你也很可能是一个优柔寡断的人，习惯于收集信息资料和做分析，却很难投入到实际运作的工作中来。你容易自我否定，因此需要别人的认同。同时，你也习惯于挑剔别人，不能忍受别人的工作做不好。怀疑别人，喜欢批评人事，却不喜欢别人的反对。<br>\
<b>注意点：</b>这类型的人太容易思考、过分时会情绪低落。\
<b>切入点：</b>如果想和着类型的人交往，一定要先打动他，但是不要进攻尽力，要一点一点的建立信任和感情。这类型的人一旦认同你后，会很忠诚、忠心。<br>\
<b>自我规划：</b> 1。要快乐起来（没人喜欢郁闷的人） 2。不要太容易受伤害 不要太敏感  3。 不要把时间都用来规划上面 而不去行动发  4，不要那么高标准的要求别人 他不是你 要放松下来 要去发现别人的优点 <br>";
		if(temp[0] == valueD){//高C 低D
			characterP.innerHTML = "<b>高c 低d—高配合度<b/><br>\
Cooperativeness－合作性（配合）：高 Compliance 和 低 Dominance，在分析表中发现显示高服从及低支配的DISC子特征。这是典型的「墨守成规型」子特征，它所对应的人需要能够绝对确定他们的地位，并且喜欢以既有的规定和程序为架构来支持他们的意见。他们被称为配合型是因为他们在这方面的个人作风常需要主管、同事和友人的实际支持，所以他们会尽量和别人维持有效的工作关系。\
";
		}else if(temp[0] == valueI){//高C 低I
			characterP.innerHTML = "<b>高c  低i—谨慎</b><br>\
Accuracy－精确性：高 Compliance 和 低 Influence，在分析表中发现显示高服从及低影响的DISC子特征，并且有时会称为「谨慎」。拥有这种子特征的人非常不喜欢犯错-他们会反复地检查工作，并且会纠正别人工作中的错误，不论别人有没有要他这样做。这种对于确定性的需要表示他们除非万不得已，否则很少愿意冒任何风险。他们在沟通时也是非常谨慎，除了必要的信息外，极少会泄露有关自己的事情。";

		}else if(temp[0] == valueS){//高C 低S
			characterP.innerHTML = "<b>高c  低s—敏感</b><br>\
Sensitivity－敏感性：高 Compliance 和 低 Steadiness，在分析表中发现显示高服从及低稳健的DISC子特征。这种类型的人对于周遭环境和其中发生的变化极其敏锐，时常会注意到别人所错过或忽略的细微枝节。它本身是一个正面的因子，但它会让人很容易觉得无聊也很容易分心。";

		}

	}
}


