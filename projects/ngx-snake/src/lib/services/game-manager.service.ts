import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, ReplaySubject} from 'rxjs';
import {GameGrid, MoveDirections, TileState} from '../definitions';
import {filter, switchMap, tap} from 'rxjs/operators';

interface SnakePart {
    x: number, y: number
}

@Injectable()
export class GameManagerService {
    private _grid: GameGrid = [];
    private _grid$ = new ReplaySubject<GameGrid>(1);
    public grid$ = this._grid$.asObservable();

    private _gridSize = {
        h: 10,
        w: 10
    }

    private _snake: Array<SnakePart> = [];
    private _moveDir: MoveDirections = MoveDirections.RIGHT;

    private _interval$ = new BehaviorSubject(300);
    private _paused = true;
    private _playable = true;
    public signal$ = this._interval$
        .asObservable()
        .pipe(
            switchMap((period) => interval(period)),
            filter(() => !this._paused),
            tap(() => this._gameCycle())
        );

    initialize(height: number, width: number) {
        this._gridSize.w = width;
        this._gridSize.h = height;

        this._buildEmptyGrid();
        this._initSnake();
        this._drawSnake();

        this._gridChanged();

        this.signal$.subscribe(() => {
        })
    }

    public start() {
        if (this._playable) {
            this._paused = false;
        }
    }

    public changeSpeed(period: number): void {
        this._interval$.next(period);
    }

    public pause() {
        this._paused = true;
    }

    public reset() {
        this.pause();
        this._playable = true;
        this._moveDir = MoveDirections.RIGHT;

        this._buildEmptyGrid();
        this._initSnake();
        this._drawSnake();

        this._gridChanged();
    }

    public up() {       this._moveDir !== MoveDirections.DOWN   ? this._moveDir = MoveDirections.UP : this._moveDir }
    public right() {    this._moveDir !== MoveDirections.LEFT   ? this._moveDir = MoveDirections.RIGHT : this._moveDir }
    public down() {     this._moveDir !== MoveDirections.UP     ? this._moveDir = MoveDirections.DOWN : this._moveDir }
    public left() {     this._moveDir !== MoveDirections.RIGHT  ? this._moveDir = MoveDirections.LEFT : this._moveDir }

    private _endGame() {
        this._playable = false;
        this.pause();

        alert('game over');
    }

    private _buildEmptyGrid() {
        const newGrid = [];
        for(let y = 0; y <= this._gridSize.h; y++) {
            const row = [];
            for(let x = 0; x <= this._gridSize.w; x++) {
                row.push(TileState.Free);
            }

            newGrid.push(row);
        }

        this._grid =  newGrid;
    }

    private _gridChanged() {
        this._grid$.next(this._grid)
    }

    private _initSnake() {
        this._snake = [];

        const xCenter = Math.floor(this._gridSize.w / 2);
        const yCenter = Math.floor(this._gridSize.h / 2);

        this._snake.push({ x: xCenter, y: yCenter });
        this._snake.push({ x: xCenter - 1, y: yCenter });
        this._snake.push({ x: xCenter - 2, y: yCenter });
    }

    private _drawSnake() {
        for(const part of this._snake) {
            this._grid[part.y][part.x] = TileState.Body;
        }
    }

    private _gameCycle() {
        const head = this._snake[0];
        let newHead: SnakePart;
        if (this._moveDir === MoveDirections.UP) {
            newHead = { x: head.x, y: head.y - 1 };

        } else if (this._moveDir === MoveDirections.RIGHT) {
            newHead = { x: head.x + 1, y: head.y };

        } else if (this._moveDir === MoveDirections.DOWN) {
            newHead = { x: head.x, y: head.y + 1 };

        } else {
            // Moving left
            newHead = { x: head.x - 1, y: head.y };
        }

        if (this._willCrash(newHead)) {
            return this._endGame();
        }

        // position new head
        this._snake.unshift(newHead);

        if (this._willGrow() === false) {
            // drop old tail
            this._snake.pop();
        }

        this._buildEmptyGrid();
        this._drawSnake();
        this._gridChanged();
    }

    /**
     * Checks if field is not currently occupied (is free to take)
     * @param newHead
     * @private
     */
    private _willCrash(newHead: SnakePart): boolean {
        // Gets out of the board
        if (newHead.x < 0 || newHead.y < 0 || newHead.x > this._gridSize.w || newHead.y > this._gridSize.h) {
            return true;
        }

        const CRASHABLE_FIELDS: Array<TileState> = [
            TileState.Body,
            TileState.Wall
        ];
        if (CRASHABLE_FIELDS.includes(this._grid[newHead.y][newHead.x])) {
            return true;
        }

        // If crashing with tail then check if tail will move...
        if (this._grid[newHead.y][newHead.x] === TileState.Tail && this._willGrow()) {
            return true;
        }

        return false;
    }

    private _willGrow(): boolean {
        return false;
    }
}
