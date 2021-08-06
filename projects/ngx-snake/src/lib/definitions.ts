export type GameGrid = Array<Array<TileState>>;

export enum GameState {
    Paused = 0,
    Started = 1,
    Over = 2
}

export enum TileState {
    Free = 'free',
    Head = 'head',
    Body = 'body',
    Tail = 'tail',
    Wall = 'wall',
    Food = 'food'
}

export enum MoveDirections {
    UP,
    RIGHT,
    DOWN,
    LEFT
}
