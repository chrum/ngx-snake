import {ModuleWithProviders, NgModule} from '@angular/core';
import {NgxSnakeComponent} from './ngx-snake.component';


import {BoardComponent} from './components/board/board.component';
import {TileComponent} from './components/tile/tile.component';
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
    exports: [
        NgxSnakeComponent
    ]
})
export class NgxSnakeModule {
    static forRoot(): ModuleWithProviders<NgxSnakeModule> {
        return {
            ngModule: NgxSnakeModule
        };
    }
}
