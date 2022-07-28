const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var fruit_con;

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

  ground = new Ground(200, 690, 600, 20);
  rope = new Rope(6, {x: 245, y: 30});

  var fruit_config = {
    density: 0.001
  }

  fruit = Bodies.circle(300,300,15,fruit_config);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
}

function draw() 
{
  background(51);
  Engine.update(engine);
   
  ground.show();
  rope.show();

  ellipse(fruit.position.x, fruit.position.y, 15, 15);
}




