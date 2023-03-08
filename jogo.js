console.log('[Game Clone] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d'); 

// Chão do jogo
const chao = {
    spriteX: 0,
	spriteY: 610,
	largura: 224,
	altura: 112,
	x: 0,
	y: canvas.height -112,
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
				
				
				mudaParaTela(Telas.INICIO);
				return;
			}
			
			flappybird.velocidade = flappybird.velocidade + flappybird.gravidade;
			flappybird.y = flappybird.y + flappybird.velocidade;
		},
		desenha(){
			contexto.drawImage(
				sprites,
				flappybird.spriteX, flappybird.spriteY, //sprites X e Y
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

//
// As telas do Jogo e troca entre telas
//
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela){
	telaAtiva = novaTela;

	if(telaAtiva.inicializa){
		inicializa();
	}


}

const Telas = {
	INICIO:{
		inicializa(){
			globais.flappybird = criaFlappybird();
		},
		desenha(){
			planoDeFundo.desenha();
			chao.desenha();
			globais.flappybird.desenha();			
			mensagemGetReady.desenha();
		},
		click(){
			mudaParaTela(Telas.JOGO)
		},
		atualiza(){
			
		}
	}
};


Telas.JOGO = {
	desenha(){
		planoDeFundo.desenha();
		chao.desenha();
		globais.flappybird.desenha();
	},
	click(){
		globais.flappybird.pula();
	},
	atualiza(){
		globais.flappybird.atualiza();
	}
};


function loop() {
	
	telaAtiva.desenha();
	telaAtiva.atualiza();
	
	requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
	if(telaAtiva.click) {
		telaAtiva.click();
	}
});

mudaParaTela(Telas.INICIO);
loop();
