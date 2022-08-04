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

//Função para carregar os arquivos
function preload(){
  //Carregando imagens
  imagemFundo = loadImage("background.png");
  comida = loadImage("cenoura.png");
  coelho = loadImage("Rabbit-01.png");
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
  spriteCoelho = createSprite(250,650,100,100);
  //Adicionando imagem ao sprite do coelho
  spriteCoelho.addImage(coelho);
  //Ajustando a escala (tamanho) do coelho
  spriteCoelho.scale = 0.2;

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
  image(comida, fruit.position.x, fruit.position.y, 50, 80);

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





