console.log('[Game Clone] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d'); 

const flappybird = {
	spriteX: 0,
	spriteY: 0,
	largura: 33,
	altura: 24,
	x: 10,
	y: 50,
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


function loop() {
	
	flappybird.desenha();

	requestAnimationFrame(loop);
}

loop();

//function colission(){}