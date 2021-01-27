# Kart Racing Game Built In TypeScript with Three JS

## Hello and welcome.

[Live app](https://kart-racer.netlify.com)

[Repo](https://github.com/Bilalm354/kart-racer)

## Gameplay 

### Controls 
- WASD and arrow keys for driving 
- Space bar - turbo
- In create mode click mouse where you want to place a new cube or delete an existing cube

## Planning

Since I am working on my own and noone is using the site I have found it much nicer to add TODOs as comments in my code and pick them up as I go while working on master rather than doing any large planning and working issues on separate branches. But the links below were used earlier and still contain some future plans.

Project board: https://github.com/Bilalm354/kart-racer/projects/1

Issues: https://github.com/Bilalm354/kart-racer/issues

## Tech Stack 
- TypeScript
- React 
- Node 
- Express 
- ThreeJs
- WebGL
- Socket io

## Notes

### Coordinate System
- x is left and right.  
- y is forward and back.  
- z is up and down. 

## Structure 

The app is split into client and server directories. 

### Client

The client side is written in Typescript and uses React, Threejs and Bootstrap. 

### Server

The server side uses Node, Express, Apollo, GraphQl, Mongoose and MongoDB.

Looking to add socket io for multiplayer. 

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

# Contact

*   Github: github.com/bilalm354
*   Email: bilalm354@gmail.com
*   Discord: bilzone97#2770
