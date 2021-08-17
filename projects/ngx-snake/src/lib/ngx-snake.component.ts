import {Component, Input, OnInit} from '@angular/core';
import {GameManagerService} from './services/game-manager.service';

@Component({
    selector: 'ngx-snake',
    template: `
        <ngx-snake-board
            [data]="grid$ | async"></ngx-snake-board>
    `,
    styles: []
})
export class NgxSnakeComponent implements OnInit {
    @Input() boardHeight: number = 10;
    @Input() boardWidth: number = 10;

    public grid$ = this._manager.grid$;

    constructor(
        private _manager: GameManagerService
    ) {
    }

    ngOnInit(): void {
        this._manager.initialize(this.boardHeight, this.boardWidth);
    }

    public actionUp() { this._manager.up(); }
    public actionRight() { this._manager.right(); }
    public actionDown() { this._manager.down(); }
    public actionLeft() { this._manager.left(); }


    public actionStart() {
        this._manager.start();
    }

    public actionStop() {
        this._manager.pause();
    }

    public actionReset() {
        this._manager.reset();
    }

}
