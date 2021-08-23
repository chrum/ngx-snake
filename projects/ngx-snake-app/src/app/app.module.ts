import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgxSnakeModule} from '../../../ngx-snake/src/lib/ngx-snake.module';
import {HotkeyModule} from 'angular2-hotkeys';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HotkeyModule.forRoot(),
        NgxSnakeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
