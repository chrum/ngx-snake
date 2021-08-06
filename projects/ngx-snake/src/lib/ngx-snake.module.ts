import {NgModule} from '@angular/core';
import {NgxSnakeComponent} from './ngx-snake.component';


import {BoardComponent} from './components/board/board.component';
import {TileComponent} from './components/tile/tile.component';
import {GameManagerService} from './services/game-manager.service';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        NgxSnakeComponent,
        BoardComponent,
        TileComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [
        GameManagerService
    ],
    exports: [
        NgxSnakeComponent
    ]
})
export class NgxSnakeModule {
}
