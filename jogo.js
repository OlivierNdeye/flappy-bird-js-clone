console.log('[Game Clone] Flappy Bird');

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/bateu.mp3';

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

				setTimeout(() =>{
					mudaParaTela(Telas.INICIO);			
					
				},  500);
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
		},
		desenha(){
			planoDeFundo.desenha();
			globais.chao.desenha();
			globais.flappyBird.desenha();
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
	desenha(){
		planoDeFundo.desenha();
		globais.chao.desenha();
		globais.flappyBird.desenha();
	},
	click(){
		globais.flappyBird.pula();
	},
	atualiza(){
		globais.flappyBird.atualiza();
	}
};


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
