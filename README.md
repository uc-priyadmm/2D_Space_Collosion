# 2D_Space_Collosion

Sometimes the particles go crazy if you keep the webpage up for too long. Refresh in that case.

Simulation of perfectly elastic collisions in 2D space. The program is a simulation of 2D collision, I was curious if I could implement some big boy logic into my programs and this is a humble attempt. I would wish to add different-sized particles with different shapes too. The program runs on monkey logic :

1) Particle is generated


3) Particle in 2D space, has x and y. We are only working with particle position, mass is constant and speed is constant at the starts but the speeds are added or shared at the time of the collision, not really. EXPLAINED LATER 


Particles go woohoo. ( in x and y coordinates)

The actual program is far complex than that, using canvas we can detect particle position in all directions by mapping the x and y coordinates to 'to-x and to-y" and generating an animation. The code uses a closed system with 4 walls and particles can collide between one another or the walls. This is just a very stupid version of https://github.com/mreinstein/collision-2d and many other projects which go into the detail of these things. I believe I have a basic understanding of this topic.

## Demo



  ![](Project3.gif)
  
## Run Locally

Clone the project

```bash
  git clone https://github.com/uc-priyadmm/2D_Space_Collision
```

Host the Webpage Locally using your prefered server.


Alternatively, Run using VSCode LIVE SERVE EXTENSION

```bash
 https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
 ```



  
## Authors

- [@Mayank Mani Priyadarshi](https://www.linkedin.com/in/priyadmm/)

  
## Feedback

If you have any feedback, please reach out to me at priyadmm@mail.uc.edu
