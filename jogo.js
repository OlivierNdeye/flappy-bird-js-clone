console.log('[Game Clone] Flappy Bird');

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/efeitos_bateu.mp3'; 

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

// Chão do jogo
function criaChao(){
		const chao = {
		spriteX: 0,
		spriteY: 610,
		largura: 224,
		altura: 112,
		x: 0,
		y: canvas.height -112,
		atualiza(){
			const movimentoDoChao = 1;
			const repeteEm = chao.largura / 2;
			const movimentacao = chao.x - movimentoDoChao;
			
			/* console.log('[chao.x]', chao.x);
			console.log('[repeteEm]', repeteEm);
			console.log('[movimentacao]', movimentacao % repeteEm); */

		chao.x = movimentacao % repeteEm; 
		},
		desenha() {
			contexto.drawImage(
				sprites,
				chao.spriteX, chao.spriteY, //sprites X e Y
				chao.largura, chao.altura, // Tamanho do Recorte de X e Y
				chao.x, chao.y,
				chao.largura, chao.altura,
			);
			
			contexto.drawImage(
				sprites,
				chao.spriteX, chao.spriteY, //sprites X e Y
				chao.largura, chao.altura, // Tamanho do Recorte de X e Y
				(chao.x + chao.largura), chao.y,
				chao.largura, chao.altura,
			);
		},
	};
	return chao;
}



function fazColisao(){
	const flappybirdY = flappybird.y + flappybird.altura;
	const chaoY = chao.y;
	
	if(flappybirdY >= chaoY) {
		return true;
	}
	return false;
}
function criaFlappybird() {
	const flappybird = {
		spriteX: 0,
		spriteY: 0,
		largura: 33,
		altura: 24,
		x: 10,
		y: 50,
		pulo: 4.6,
		gravidade: 0.25,
		velocidade: 0,
		
	// Declaração de funções	
		pula(){
			console.log('Voa Canarinho');
			console.log('[antes]', flappybird.velocidade);
			flappybird.velocidade =  - flappybird.pulo;
			console.log('[depois]', flappybird.velocidade)
		},
		atualiza(){		
			if(fazColisao(flappybird, chao)){
				console.log("Fez colisão");
					som_HIT.play();

				setTimeout(() => {
					mudaParaTela(Telas.INICIO);
				}, 50);
								
				return;
			}
			
			flappybird.velocidade = flappybird.velocidade + flappybird.gravidade;
			flappybird.y = flappybird.y + flappybird.velocidade;
		},		
		movimentos: [
		 { spriteX: 0, spriteY: 0,}, // asa para cima
		 { spriteX: 0, spriteY: 26,}, // asa parada 
		 { spriteX: 0, spriteY: 52,}, // asa para baixo
 		 { spriteX: 0, spriteY: 26,}, // asa parada 

		],
		frameAtual: 0,
		atualizaOFrameAtual(){
			const intervaloDeFrames = 10;
			const passouOIntervalo = frames % intervaloDeFrames === 0;
			
			if(passouOIntervalo) {
				const baseDoIncremento = 1;
				const incremento = baseDoIncremento + flappybird.frameAtual;
				const baseRepeticao = flappybird.movimentos.length;
				flappybird.frameAtual =  incremento % baseRepeticao				
			}
		},
		desenha(){
			flappybird.atualizaOFrameAtual();
			const { spriteX, spriteY } = flappybird.movimentos[flappybird.frameAtual];
			contexto.drawImage(
				sprites,
				spriteX, spriteY, //sprites X e Y
				flappybird.largura, flappybird.altura, // Tamanho do Recorte de X e Y
				flappybird.x, flappybird.y,
				flappybird.largura, flappybird.altura,
			);
		}
	}	
	return flappybird;
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


function criarCanos(){
	const canos = {
		largura: 52,
		altura: 400,
		chao:{
			spriteX: 0,
			spriteY: 169,
		},
		ceu:{
			spriteX: 52,
			spriteY: 169,
		},
		espaço:80,
		desenha(){	
			canos.pares.forEach(function(par){
				const yRandom = -200;
				const espacamentoEntreCanos = 90;
				
				const canoCeuX = 220;
				const canoCeuY = yRandom;
				
			//cano do Céu
				contexto.drawImage(
					sprites,
					canos.ceu.spriteX, canos.ceu.spriteY,
					canos.largura, canos.altura,
					canoCeuX, canoCeuY,
					canos.largura, canos.altura,
				)
				
				//cano do chao
				const canoChaoX = 220;
				const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom; 
				contexto.drawImage(
					sprites,
					canos.chao.spriteX, canos.chao.spriteY,
					canos.largura, canos.altura,
					canoChaoX, canoChaoY,
					canos.largura, canos.altura,
				)			
			})	
		},
		
		pare: [{
			x: 200,
			y: 100,
		}],
		atualiza(){
			const passou100Frames = frames % 100 === 0;
			if(passou100Frames){
				console.log("passou 100")
			}
			
			
		}
	}
	
	return canos;
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
			flappybird = criaFlappybird();
			chao = criaChao();
			canos = criarCanos();
		},
		desenha(){
			planoDeFundo.desenha();
			chao.desenha();
			flappybird.desenha();
			canos.desenha();
			//mensagemGetReady.desenha();
		},
		click(){
			mudaParaTela(Telas.JOGO)
		},
		atualiza(){
			chao.atualiza();
			canos.atualiza();
		}
	}
};


Telas.JOGO = {
	desenha(){
		planoDeFundo.desenha();
		chao.desenha();
		flappybird.desenha();
	},
	click(){
		flappybird.pula();
	},
	atualiza(){
		flappybird.atualiza();
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
