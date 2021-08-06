import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import {TileState} from '../../definitions';

@Component({
    selector: 'ngx-snake-tile',
    template: ``,
    styleUrls: ['./tile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent implements OnInit {
    @Input() state: TileState;

    constructor(
        public el: ElementRef,
        private _renderer: Renderer2
    ) {
    }

    ngOnInit() {
        if (this.state) {
            console.log(this.state);
            this._renderer.addClass(this.el.nativeElement, this.state);
        }

    }

}
