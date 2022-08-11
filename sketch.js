//Configurações da biblioteca
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

//Criação das variáveis
let engine;
let world;
var ground;
var rope;
var fruit;
var fruit_con;
var imagemFundo, comida, coelho;
var spriteCoelho;
var button;
var piscando;
var comendo;
var triste;

//Função para carregar os arquivos
function preload(){
  //Carregando imagens
  imagemFundo = loadImage("background.png");
  comida = loadImage("cenoura.png");
  coelho = loadImage("Rabbit-01.png");
  //Carregando animações
  piscando = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  comendo = loadAnimation("eat_0.png","eat_1.png","eat_2.png", "eat_3.png", "eat_4.png");
  triste = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  //Configurações das animações
  piscando.playing = true;
  comendo.playing = true;
  triste.playing = true;
  comendo.looping = false;
  triste.looping = false;
}

//Função para configurações
function setup() 
{
  //Criando a tela
  createCanvas(500,700);
  //Configuração da biblioteca Matter
  engine = Engine.create();
  world = engine.world;
  //Configuração de posição dos elementos
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

  //Velocidade das animações
  piscando.frameDelay = 15;
  comendo.frameDelay = 15;

  //Criando o chão
  ground = new Ground(200, 690, 600, 20);
  //Criando a corda
  rope = new Rope(6, {x: 245, y: 30});

  //Configurando a cenoura
  var fruit_config = {
    density: 0.001
  }
  //Criando a cenoura
  fruit = Bodies.circle(300,300,15,fruit_config);
  //Adicionando a cenoura à corda
  Matter.Composite.add(rope.body, fruit);
  //Ligando a corda com a cenoura
  fruit_con = new Link(rope, fruit);

  //Criando o sprite do coelho
  spriteCoelho = createSprite(250,630,100,100);
  //Adicionando imagem ao sprite do coelho
  spriteCoelho.addImage(coelho);
  //Ajustando a escala (tamanho) do coelho
  spriteCoelho.scale = 0.2;
  //Adicionar as animações do coelho
  spriteCoelho.addAnimation("piscando", piscando);
  spriteCoelho.addAnimation("comendo", comendo);
  spriteCoelho.addAnimation("triste", triste);
  //Mudar para a animação piscando
  spriteCoelho.changeAnimation("piscando");

  //Criando a imagem para ser o botão
  button = createImg("cut_button.png");
  //Definindo a posição do botão
  button.position(220,30);
  //Definindo o tamanho do botão
  button.size(50,50);
  //Quando o botão é clicado, chama a função
  button.mouseClicked(derrubarComida);
}

//Função de desenho
function draw() 
{
  //Colocando as configurações do fundo
  background(51);
  image(imagemFundo, width/2, height/2, 500, 700);

  //Atualizando a parte de física do jogo
  Engine.update(engine);
  
  //Mostra o chão e a corda
  ground.show();
  rope.show();

  //Coloca a imagem da cenoura
  if(fruit !== null){
    image(comida, fruit.position.x, fruit.position.y, 50, 80);
  }

  //Se a cenoura colidiu com o coelho, ele vai comer
  if(verColisao(fruit, spriteCoelho) === true){
    spriteCoelho.changeAnimation("comendo");
  }

  //Se a cenoura colidiu com o chão, ele vai ficar triste
  if(fruit !== null && fruit.position.y >= 650){
    spriteCoelho.changeAnimation("triste");
    fruit = null;
  }
  
  //Desenha todos os sprites
  drawSprites();
}

//Função para derrubar a comida
function derrubarComida(){
  //Quebra a corda
  rope.break();
  //Corta a ligação entre a cenoura e a corda
  fruit_con.cortar();
  fruit_con = null;
}

//Função para ver a colisão da cenoura com o coelho
function verColisao(cenoura, coelho){
  //Se a cenoura existe
  if(cenoura !== null){
    //Calcula a distância entre a cenoura e o coelho
    var distancia = dist(cenoura.position.x, cenoura.position.y, 
                         coelho.position.x, coelho.position.y);
    //Se a distância for menor ou igual a 80
    if(distancia <= 80){
      //Apaga a cenoura
      World.remove(engine.world, fruit);
      fruit = null;
      //Retorna um valor verdadeiro
      return true;
      //Senão
    } else {
      //Retorna um valor falso
      return false
    }
  }
}


