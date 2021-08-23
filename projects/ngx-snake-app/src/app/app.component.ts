import {Component, ViewChild} from '@angular/core';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {NgxSnakeComponent} from '../../../ngx-snake/src/lib/ngx-snake.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public bw = false;

    @ViewChild('game')
    private _tetris: NgxSnakeComponent;


    constructor(private _hotkeysService: HotkeysService) {
        this._addHotkeys();
    }

    public onGrow() {
        console.log('grow');
    }

    public onGameOver() {
        alert('game over');
    }

    private _addHotkeys() {
        this._hotkeysService.add(new Hotkey('up', (event: KeyboardEvent): boolean => {
            this._tetris.actionUp();
            return false; // Prevent bubbling
        }));

        this._hotkeysService.add(new Hotkey('left', (event: KeyboardEvent): boolean => {
            this._tetris.actionLeft();
            return false; // Prevent bubbling
        }));

        this._hotkeysService.add(new Hotkey('down', (event: KeyboardEvent): boolean => {
            this._tetris.actionDown();
            return false; // Prevent bubbling
        }));

        this._hotkeysService.add(new Hotkey('right', (event: KeyboardEvent): boolean => {
            this._tetris.actionRight();
            return false; // Prevent bubbling
        }));
    }
}
