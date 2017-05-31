const chess = document.getElementById('chess');
const context = chess.getContext('2d');
let me = true;
let chessBoard = [];
const check = document.getElementById('check');
let over = false;
const reload = document.getElementById('reload');
let wins = [];//赢的方法数组
let myWin = [];
let aiWin = [];
for(let i = 0;i < 15;i += 1){
	wins[i] = [];
	for(let j = 0;j < 15; j += 1){
		wins[i][j] = [];		
	}
}

var	count = 0;//统计赢的数据

for(let i = 0;i < 15;i += 1){
	for(let j = 0;j < 11;j += 1){
		for(let k = 0;k < 5;k += 1){
			wins[i][j+k][count] = true;
		}
		count += 1;
	}
}
for(let i = 0;i < 11;i += 1){
	for(let j = 0;j < 15;j += 1){
		for(let k = 0;k < 5;k += 1){
			wins[i+k][j][count] = true;
		}
		count += 1;
	}
}
for(let i = 0;i < 11;i += 1){
	for(let j = 0;j < 11;j += 1){
		for(let k = 0;k < 5;k += 1){
			wins[i+k][j+k][count] = true;
		}
		count += 1;
	}
}
for(let i = 0;i < 11;i += 1){
	for(let j = 14;j > 3;j -= 1){
		for(let k = 0;k < 5;k += 1){
			wins[i+k][j-k][count] = true;
		}
		count += 1;
	}
}

for(let i = 0 ;i < count;i += 1){
	myWin[i] = 0;
	aiWin[i] = 0;
}

for(let i = 0;i < 15;i += 1){
	chessBoard[i] = [];
	for(let j = 0;j < 15; j += 1){
		chessBoard[i][j] = 0 ;		
	}
}


const logo = new Image();
logo.src = "img/chess.jpg";
logo.onload = function(){
	context.drawImage(logo,190,180,80,80);
	drawChessBoard();	
}


const drawChessBoard = function(){
	for(let i = 0;i < 15;i += 1){
	context.moveTo(15 + i*30, 15); //垂直方向画线,(x,y)
	context.lineTo(15 + i*30, 435);
	context.stroke();
	context.moveTo(15, 15 + i*30);
	context.lineTo(435, 15 + i*30);//水平方向画线
	context.stroke();
	context.strokeStyle = "#999";
}
}

const oneStep = function(i,j,me){
	context.beginPath();
	context.arc(15+ 30*i,15+ j*30,13,0,2*Math.PI);
	context.closePath();
	const gradient = context.createRadialGradient(15+ i*30+2,15+j*30-2,13,15+ i*30+2,15+j*30-2,0);
	if(me){
		gradient.addColorStop(0,"#0a0a0a");
		gradient.addColorStop(1,"#636763");
	}
	else{
		gradient.addColorStop(0,"#d1d1d1");
		gradient.addColorStop(1,"#f9f9f9");
	}
	context.fillStyle = gradient;
	context.fill();
}

chess.onclick = function(e){
	const x = e.offsetX;
	const y = e.offsetY;
	const i = Math.floor(x / 30);
	const j = Math.floor(y / 30);
	
	if(chessBoard[i][j] == 0 && !over){
		oneStep(i,j,me);
		if(me){
			chessBoard[i][j] = 1;
		}
		else{	
			chessBoard[i][j] = 2;
		}
		me = !me;
		for(let k = 0 ;k < count;k += 1){
			if(wins[i][j][k]){
				myWin[k]++;
				aiWin[k] = 6;
				if(myWin[k] == 5){
					alert("u win!")
					over = true;
				}
			}
		}
		if(!over){
			aiGO();
		}
	}
}

// function checkWin(){
// 	for(let i = 0; i < 15; i += 1){
// 		for(let j = 0;j < 15; j += 1){
// 			if(chessBoard[i][j] == 1&&chessBoard[i][j+1] == 1&&chessBoard[i][j+2] == 1&&chessBoard[i][j+3] == 1&&chessBoard[i][j+4] == 1||
// 				chessBoard[i][j] == 1&&chessBoard[i+1][j] == 1&&chessBoard[i+2][j] == 1&&chessBoard[i+3][j] == 1&&chessBoard[i+4][j] == 1||
// 				chessBoard[i][j] == 1&&chessBoard[i+1][j+1] == 1&&chessBoard[i+2][j+2] == 1&&chessBoard[i+3][j+3] == 1&&chessBoard[i+4][j+4] == 1||
// 				chessBoard[i][j] == 1&&chessBoard[i+1][j-1] == 1&&chessBoard[i+2][j-2] == 1&&chessBoard[i+3][j-3] == 1&&chessBoard[i+4][j-4] == 1){
// 				check.innerHTML = "黑棋获胜";
// 				now = false;
// 				if(confirm("黑旗获胜，再来一把？")){
// 					location.reload();
// 				}
// 			}
// 			else if(chessBoard[i][j] == 2&&chessBoard[i][j+1] == 2&&chessBoard[i][j+2] == 2&&chessBoard[i][j+3] == 2&&chessBoard[i][j+4] == 2||
// 				chessBoard[i][j] == 2&&chessBoard[i+1][j] == 2&&chessBoard[i+2][j] == 2&&chessBoard[i+3][j] == 2&&chessBoard[i+4][j] == 2||
// 				chessBoard[i][j] == 2&&chessBoard[i+1][j+1] == 2&&chessBoard[i+2][j+2] == 2&&chessBoard[i+3][j+3] == 2&&chessBoard[i+4][j+4] == 2||
// 				chessBoard[i][j] == 2&&chessBoard[i+1][j-1] == 2&&chessBoard[i+2][j-2] == 2&&chessBoard[i+3][j-3] == 2&&chessBoard[i+4][j-4] == 2){
// 				check.innerHTML = "白棋获胜";
// 				now = false;
// 				if(confirm("白旗获胜，再来一把？")){
// 					location.reload();
// 				}
// 			}
// 	}
// }
// }
	
const aiGO = function(){
	let myScore = [];
	let aiScore = [];
	let max = 0;
	var u = 0, v = 0 ;
	for(let i = 0; i < 15;i += 1){
		myScore[i] = [];
		aiScore[i] = [];
		for(let j = 0 ;j < 15; j += 1){
			myScore[i][j] = 0;
			aiScore[i][j] = 0;
		}
	}
	for(let i = 0;i < 15; i += 1){
		for(let j =0 ;j < 15;j += 1){
			if(chessBoard[i][j] == 0){
				for(let k = 0 ;k < count;k += 1){
					if(wins[i][j][k]){
						if(myWin[k] == 1){
							myScore[i][j] += 200;
						}
						else if(myWin[k] == 2){
							myScore[i][j] += 400;
						}
						else if(myWin[k] == 3){
							myScore[i][j] += 2000;
						}
						else if(myWin[k] == 4){
							myScore[i][j] += 10000;
						}
						if(aiWin[k] == 1){
							aiScore[i][j] += 220;
						}
						else if(aiWin[k] == 2){
							aiScore[i][j] += 420;
						}
						else if(aiWin[k] == 3){
							aiScore[i][j] += 2100;
						}
						else if(aiWin[k] == 4){
							aiScore[i][j] += 20000;
						}

					}
					if(myScore[i][j] > max){
						max = myScore[i][j];
						u = i;
						v = j;
					}
					else if (myScore[i][j] == max){
						if(aiScore[i][j] > aiScore[u][v]){
							u = i;
							v = j;
						}
					}

					if(aiScore[i][j] > max){
						max = aiScore[i][j];
						u = i;
						v = j;
					}
					else if (aiScore[i][j] == max){
						if(myScore[i][j] > myScore[u][v]){
							u = i;
							v = j;
						}
					}

				}
			}
			console.log(aiScore[i][j]+","+myScore[i][j]);
		}
	}
	oneStep(u,v,false);
	chessBoard[u][v] = 2;
	for(let k = 0 ;k < count;k += 1){
		if(wins[u][v][k]){
			aiWin[k]++;
			myWin[k] = 6;
			if(aiWin[k] == 5){
				alert("aiGo win!")
				over = true;
			}
		}
	}
	if(!over){
		me =! me;
	}
}