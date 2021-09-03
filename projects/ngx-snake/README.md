# ngx-snake

Snake game as an angular component

***ngx-snake*** is actually only the ***core of the game***... YOU need to add everything around it (controls, score...)  yourself :)


Check the demo [here](http://chrum.it/pages/ngx-snake)

## Using it:
#### Install:

```bash
npm install ngx-snake
```

#### Import
```javascript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgxSnakeModule} from 'ngx-snake';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        NgxSnakeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

#### Add/Connect to your fancy control interface
```html
    <ngx-snake #game></ngx-snake>

<button (click)="game.actionStart()">Start</button>
<button (click)="game.actionStop()">Stop</button>
<button (click)="game.actionReset()">Reset</button>
<button (click)="game.actionUp()">Up</button>
<button (click)="game.actionLeft()">Left</button>
<button (click)="game.actionRight()">Right</button>
<button (click)="game.actionDown()">Down</button>
```

#### Inputs

Name  | Default | Type | Description
--- | --- | --- | ---
boardHeight | 10 | number | Board height
boardWidth | 10 | number | Board width



#### Outputs

Name  | Description
--- | ---
foodEaten | Called whenever our sweet snake gained some weight ;)
gameOver | :( collision! snake didn't make it (remember about reset button)

#### Public methods
- `actionStart`
- `actionStop`
- `actionReset`
- `actionUp`
- `actionRight`
- `actionDown`
- `actionLeft`

which can be used like:
```html
<button (click)="onRotateButtonPressed()">Rotate</button>
```
```typescript
...
export class SnakeContainingComponent {
    @ViewChild(NgxSnakeComponent)
    private _snake: NgxSnakeComponent;

    public onRotateButtonPressed() {
        this._snake.actionRotate();
    }
}
```
OR
```html
<ngx-snake #game></ngx-snake>

<button (click)="game.actionRotate()">Rotate</button>
```

### Styling

To change colors and tiles (to **black and white** for example) define styles with colors like
```scss
ngx-snake {
    ngx-snake-tile {
        background: #ffffff;
        &.free {
            div {
                background: #ffffff;
            }
        }
    }
}
```
for full example (and all class names) [go here](https://github.com/chrum/ngx-snake/blob/master/projects/ngx-snake-app/src/styles.scss)

## Development


Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Authors

[Chrystian Ruminowicz](http://chrum.it)

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
