import { Group, Mesh, Vector3 } from "three"

export class Track {
    ground: Mesh[];
    walls: Group[];
    startingPosition: Vector3;
    constructor() {
        this.ground = [];
        this.walls = [];
        this.startingPosition = new Vector3();
}
}

// TODO: remove track creator. 