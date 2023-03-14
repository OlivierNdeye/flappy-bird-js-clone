console.log('[Game Clone] Flappy Bird');

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/morreu.mp3';

const som_DEAD = new Audio();
//som_DEAD.src = './efeitos/morreu.mp3';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d'); 

// Backgroud do Jogo
const planoDeFundo = {
	spriteX: 390,
	spriteY: 0,
	largura: 275,
	altura: 204,
	x: 0,
	y: canvas.height - 204,
	desenha() {
		contexto.fillStyle = '#70c5ce';
		contexto.fillRect(0, 0, canvas.width, canvas.height);
		
		contexto.drawImage(
			sprites,
			planoDeFundo.spriteX, planoDeFundo.spriteY, //sprites X e Y
			planoDeFundo.largura, planoDeFundo.altura, // Tamanho do Recorte de X e Y
			planoDeFundo.x, planoDeFundo.y,
			planoDeFundo.largura, planoDeFundo.altura,
		);
		
		contexto.drawImage(
			sprites,
			planoDeFundo.spriteX, planoDeFundo.spriteY, //sprites X e Y
			planoDeFundo.largura, planoDeFundo.altura, // Tamanho do Recorte de X e Y
			(planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
			planoDeFundo.largura, planoDeFundo.altura,
		);
	}
}

function criaChao() {
	const chao = {
	  spriteX: 0,
	  spriteY: 610,
	  largura: 224,
	  altura: 112,
	  x: 0,
	  y: canvas.height - 112,
	  atualiza() {
		const movimentoDoChao = 1;
		const movimentacao = chao.x - movimentoDoChao;
		const repeteEm = chao.largura / 2;
		
		chao.x = movimentacao % repeteEm;  
	  },
	  desenha() {
		contexto.drawImage(
		  sprites,
		  chao.spriteX, chao.spriteY,
		  chao.largura, chao.altura,
		  chao.x, chao.y,
		  chao.largura, chao.altura,
		);
	
		contexto.drawImage(
		  sprites,
		  chao.spriteX, chao.spriteY,
		  chao.largura, chao.altura,
		  (chao.x + chao.largura), chao.y,
		  chao.largura, chao.altura,
		);
	  },
	};
	return chao
  }

function fazColisao(flappyBird, chao){
	const flappyBirdY = flappyBird.y + flappyBird.altura;
	const chaoY = chao.y;
	
	if(flappyBirdY >= chaoY) {
		return true;
	}
	return false;
}

function criaFlappyBird(){
	const flappyBird = {
		spriteX: 0,
		spriteY: 0,
		largura: 33,
		altura: 24,
		x: 10,
		y: 50,
		pulo: 4.6,
		pula(){
			console.log('Voa Canarinho');
			console.log('[antes]', flappyBird.velocidade);
			flappyBird.velocidade =  - flappyBird.pulo;
			console.log('[depois]', flappyBird.velocidade)
		},
		gravidade: 0.25,
		velocidade: 0,	
	// Declaração de funções	
		atualiza(){		
			if(fazColisao(flappyBird, globais.chao)){
				console.log("Fez colisão");
				som_HIT.play();

			
				mudaParaTela(Telas.GAME_OVER);			
				return;
			}
			
			flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
			flappyBird.y = flappyBird.y + flappyBird.velocidade;
		},

		movimentos: [
			{ spriteX: 0, spriteY: 0, }, // asas para cima
			{ spriteX: 0, spriteY: 26, }, // asas para o meio
			{ spriteX: 0, spriteY: 52, }, // asas para baixo
			{ spriteX: 0, spriteY: 26, }, // asas para o meio
		],
		frameAtual: 0,
		atualizaOFrameAtual(){
			const intervaloDeFrames = 10;
			const passouOIntervalo = frames % intervaloDeFrames === 0;
			//console.log(passouOIntervalo);


			if(passouOIntervalo){
			const baseDoIncremento = 1;
			const incremento = baseDoIncremento + flappyBird.frameAtual;
			const baseRepeticao = flappyBird.movimentos.length;
			flappyBird.frameAtual = incremento % baseRepeticao
			}
			//console.log('incremento', incremento);
			//console.log('baseRepeticao', baseRepeticao);
			// console.log('[frames]', incremento % baseRepeticao);
		},
		desenha(){
			flappyBird.atualizaOFrameAtual();
			const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
			contexto.drawImage(
				sprites,
				spriteX, spriteY, //sprites X e Y
				flappyBird.largura, flappyBird.altura, // Tamanho do Recorte de X e Y
				flappyBird.x, flappyBird.y,
				flappyBird.largura, flappyBird.altura,
			);
		}
	}	

	return flappyBird;
}



//[mesagem de GetReady]
const mensagemGetReady = {
	sX: 134,
	sY: 0,
	w:  174,
	h:  152,
	x:  (canvas.width / 2) - 174 /2,
	y:  50,
	desenha(){
		contexto.drawImage(
			sprites,
			mensagemGetReady.sX, mensagemGetReady.sY,
			mensagemGetReady.w, mensagemGetReady.h,
			mensagemGetReady.x, mensagemGetReady.y,
			mensagemGetReady.w, mensagemGetReady.h
		);
	}
}

//mesagemGameOver()

const mensagemGameOver = {
	sX: 134,
	sY: 153,
	w:  226,
	h:  200,
	x:  (canvas.width / 2) - 226 /2,
	y:  50,
	desenha(){
		contexto.drawImage(
			sprites,
			mensagemGameOver.sX,mensagemGameOver.sY,
			mensagemGameOver.w, mensagemGameOver.h,
			mensagemGameOver.x, mensagemGameOver.y,
			mensagemGameOver.w, mensagemGameOver.h
		);
	}
}

function criaCanos(){
	const canos = {
		largura: 52,
		altura: 400,
		chao: {
			spriteX: 0,
			spriteY: 169,
		},
		
		ceu: {
			spriteX: 52,
			spriteY: 169,
		},
		espaco: 80,
		desenha(){
			
			canos.pares.forEach(function(par) {
				const yRandom = par.y; 
				const espacamentoEntreCanos = 90;
				
				const canoCeuX = par.x;
				const canoCeuY = yRandom;
				
				// [Cano do Céu]
				contexto.drawImage(
					sprites,
					canos.ceu.spriteX, canos.ceu.spriteY,
					canos.largura, canos.altura,
					canoCeuX, canoCeuY,
					canos.largura, canos.altura,
				)
				
				//[Cano do Chão]
				const canoChaoX = par.x;
				const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
				// [Cano do Chao]
				contexto.drawImage(
					sprites,
					canos.chao.spriteX, canos.chao.spriteY,
					canos.largura, canos.altura,
					canoChaoX, canoChaoY,
					canos.largura, canos.altura,
				)
				
				par.canoCeu =  {
					x: canoCeuX,
					y: canos.altura + canoCeuY,
				}
				par.canoChao = {
					x: canoChaoX,
					y: canoChaoY
				}				
			})
		},
		temColisaoComOFlappyBird(par){
			const cabecaDoFlappy = globais.flappyBird.y;
			const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;
			
			if((globais.flappyBird.x + globais.flappyBird.largura) >= par.x){ 				
				if(cabecaDoFlappy <= par.canoCeu.y) {
					return true;					
				}
				
				if(peDoFlappy >= par.canoChao.y){
					return true;
				}
				return false;
			}	
			return false;
		},		
		pares: [],
		atualiza(){
			const passou100Frames = frames % 100 === 0;			
			if(passou100Frames){
				console.log('[passou100Frames]', passou100Frames);
				canos.pares.push({
					x: canvas.width,
					y: -150 * (Math.random() + 1),
				});
			}
			
			canos.pares.forEach(function(par) {
				par.x = par.x - 2;
				
				if(canos.temColisaoComOFlappyBird(par)){
					console.log('Se fudeu');
					som_HIT.play();
					//som_DEAD.play();
					mudaParaTela(Telas.GAME_OVER)
				}
				
				
 				if(par.x + canos.largura <= 0){
					canos.pares.shift();
				} 
			});
			
		}
	}
	return canos;
}


function criaPlacar(){
	const placar = {
		pontuacao: 0,
		desenha(){
			contexto.font = '30px "VT323"';
			contexto.textAlign = 'right';
			contexto.fillStyle = 'white';
			contexto.fillText(placar.pontuacao, canvas.width - 10, 35);
		},
		atualiza(){
			const intervaloDeFrames = 10;
			const passouOIntervalo = frames % intervaloDeFrames === 0;
			
			if(passouOIntervalo){
				placar.pontuacao = placar.pontuacao + 1;   					
			}
		}
	}
	return placar;
}

//
// As telas do Jogo e troca entre telas
//
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela){
	telaAtiva = novaTela;

	if(telaAtiva.inicializa){
		telaAtiva.inicializa();
	}	
}

const Telas = {
	INICIO:{
		inicializa(){
			globais.flappyBird = criaFlappyBird();
			globais.chao = criaChao();
			globais.canos = criaCanos();
		},
		desenha(){
			planoDeFundo.desenha();
			globais.flappyBird.desenha();
			globais.chao.desenha();
			mensagemGetReady.desenha();
		},
		click(){
			mudaParaTela(Telas.JOGO)
		},
		atualiza(){
			globais.chao.atualiza();
		}
	}
};


Telas.JOGO = {
	inicializa(){
		globais.placar = criaPlacar();
	}
,
	desenha(){
		planoDeFundo.desenha();
		globais .canos.desenha();
		globais.chao.desenha();
		globais.flappyBird.desenha();
		globais.placar.desenha();
	},
	click(){
		globais.flappyBird.pula();
	},
	atualiza(){
		globais.canos.atualiza();
		globais.chao.atualiza();
		globais.flappyBird.atualiza();
		globais.placar.atualiza();
	}
};

Telas.GAME_OVER = {
	desenha(){
		mensagemGameOver.desenha();
	},
	atualiza(){
		
	},
	click(){
		mudaParaTela(Telas.INICIO)
	}
}


function loop() {
	
	telaAtiva.desenha();
	telaAtiva.atualiza();
	frames = frames + 1;
	
	requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
	if(telaAtiva.click) {
		telaAtiva.click();
	}
});

mudaParaTela(Telas.INICIO);
loop();
