# Kart Racing Game Built In TypeScript with Three JS

Update: the track is created by adding meshes of cubes and asigning them to a constant then adding that to the scene. I am working on instead saving tracks as coordinates and creating and adding to the scene as late as possible. This will also making it possible to save to json files and make it possible to create tracks and directly save to json. This makes sense dw about it. 

## Hello and welcome.

[Live app](https://kart-racer.netlify.com)

[Repo](https://github.com/Bilalm354/kart-racer)

## Gameplay 
### Controls 
- WASD and arrow keys for driving 
- Space bar - turbo
- In create mode click mouse where you want to place a new cube


## Tech Stack 
- TypeScript
- React 
- Node 
- Express 
- ThreeJs
- WebGL

## Notes

x is left and right.  

y is forward and back.  

z is up and down. 

## Structure 

The app is split into client and server directories. 

### Client

The client side is written in Typescript and uses React, Threejs and Bootstrap. 

### Server

The server side uses Node, Express, Apollo, GraphQl, Mongoose and MongoDB.

## Dev

### Client

Run locally with
 `cd client`
 `npm run start`
Produce a production build by running
 `cd client`
 `npm run build`

### Server

cd into server directory 
 `cd server`
Run locally with 
 `npm start`

## Deployment 

### Client

The client side is deployed on Netlify with continuous deploymemt from the Github repo. 

#### Build Settings

Repository: github.com/Bilalm354/kart-racer

Base directory: `./client`

Build command: `npm run build`

Publish directory: `./client/dist`

Deploy log visibility: `Logs are public`

Builds: `Active`

### Server

I plan to deploy a backend to Digital Ocean. This will be responsible for Leaderboards, personal best times, custom tracks or vehicles etc. 

## Documentation

Checkout the master branch and run `npm run docs` to generate docs using typedoc.

## Contact

*   Discord: bilzone97#2770
*   Email: bilalm354@gmail.com
*   Github: github.com/bilalm354
