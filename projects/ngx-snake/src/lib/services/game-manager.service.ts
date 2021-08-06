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
    private _moveDirection: MoveDirections = MoveDirections.RIGHT;

    private _interval$ = new BehaviorSubject(300);
    private _paused = true;
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
        this._grid = this._buildEmptyGrid();
        this._initSnake();
        this._drawSnake();

        this._gridChanged();

        this.signal$.subscribe(() => {
        })
    }

    public start() {
        this._paused = false;
    }

    public changeSpeed(period: number): void {
        this._interval$.next(period);
    }

    public pause() {
        this._paused = true;
    }

    public up() { this._moveDirection = MoveDirections.UP; }
    public right() { this._moveDirection = MoveDirections.RIGHT; }
    public down() { this._moveDirection = MoveDirections.DOWN; }
    public left() { this._moveDirection = MoveDirections.LEFT; }

    private _buildEmptyGrid() {
        const newGrid = [];
        for(let y = 0; y <= this._gridSize.h; y++) {
            const row = [];
            for(let x = 0; x <= this._gridSize.w; x++) {
                row.push(TileState.Free);
            }

            newGrid.push(row);
        }

        return newGrid;
    }

    private _gridChanged() {
        this._grid$.next(this._grid)
    }

    private _initSnake() {
        const xCenter = Math.floor(this._gridSize.w / 2);
        const yCenter = Math.floor(this._gridSize.h / 2);

        this._snake.push({ x: xCenter, y: yCenter });
        this._snake.push({ x: xCenter - 1, y: yCenter });
        this._snake.push({ x: xCenter - 2, y: yCenter });
    }

    private _drawSnake(oldTail?: SnakePart) {
        for(const part of this._snake) {
            this._grid[part.y][part.x] = TileState.Body;
        }

        if (oldTail) {
            this._grid[oldTail.y][oldTail.x] = TileState.Free;
        }
    }

    private _gameCycle() {
        const head = this._snake[0];
        if (this._moveDirection === MoveDirections.UP) {
            this._snake.unshift({ x: head.x, y: head.y - 1 });

        } else if (this._moveDirection === MoveDirections.RIGHT) {
            this._snake.unshift({ x: head.x + 1, y: head.y });

        } else if (this._moveDirection === MoveDirections.DOWN) {
            this._snake.unshift({ x: head.x, y: head.y + 1 });

        } else if (this._moveDirection === MoveDirections.LEFT) {
            this._snake.unshift({ x: head.x - 1, y: head.y });
        }

        this._drawSnake(this._snake.pop());
        this._gridChanged();
    }
}
