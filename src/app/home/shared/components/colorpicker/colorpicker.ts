import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Colorpicker extends Vue {

    public canvas: HTMLCanvasElement = null;
    public pixel: Uint8ClampedArray = null;
    public magnifierGlassStyle: any = {};
    public magnifierColorStyle: any = {};
    public showMagnifierGlass: boolean = false;

    @Prop({ default: 4, type: Number })
    public zoom: number;

    @Prop({ default: 50, type: Number })
    public magnifierGlassWidth: number;

    @Prop({ default: 50, type: Number })
    public magnifierGlassHeight: number;

    @Prop({ default: false, type: Boolean })
    public colorLabel: boolean;

    @Watch('$attrs.src', { immediate: true })
    public onImageSourceUpdate(newImageSource: string) {
        this.createCanvas(newImageSource);
        this.createMagnifyingGlass(newImageSource);
    }

    get imageWidth(): number {
        return parseInt(this.$attrs.width, 10);
    }

    get imageHeight(): number {
        return parseInt(this.$attrs.height, 10);
    }

    get label(): string {
        if (this.pixel) {
            const r = this.pixel[0];
            const g = this.pixel[1];
            const b = this.pixel[2];
            return `r:${r} g:${g} b:${b} ${RGBToHex(r, g, b)}`;
        }
        return '';
    }

    get showMagnifierColor(): boolean {
        return this.pixel && this.colorLabel;
    }

    get magnifierColorSquareStyle() {
        if (this.pixel) {
            return {
                backgroundColor: `rgb(${this.pixel[0]},${this.pixel[1]},${this.pixel[2]})`,
            };
        }
        return {};
    }

    public mousemove(event: MouseEvent) {
        if (this.canvas) {
            this.showMagnifierGlass = true;
            this.pixel = this.canvas.getContext('2d')!.getImageData(event.offsetX, event.offsetY, 1, 1).data;
            this.$emit('color-update', { r: this.pixel[0], g: this.pixel[1], b: this.pixel[2] });
            Vue.set(this.magnifierGlassStyle, 'left', `${event.offsetX - this.magnifierGlassWidth}px`);
            Vue.set(this.magnifierGlassStyle, 'top', `${event.offsetY - this.magnifierGlassHeight}px`);
            Vue.set(this.magnifierColorStyle, 'left', `${event.offsetX - this.magnifierGlassWidth - 100}px`);
            Vue.set(this.magnifierColorStyle, 'top', `${event.offsetY + this.magnifierGlassHeight + 5}px`);

            Vue.set(
                this.magnifierGlassStyle,
                'backgroundPosition',
                `-${
                (event.offsetX * this.zoom) - this.magnifierGlassWidth
                }px -${
                (event.offsetY * this.zoom) - this.magnifierGlassHeight
                }px`,
            );
        }
    }

    private createCanvas(imageSource: string) {
        const canvas = document.createElement('canvas');
        canvas.width = this.imageWidth;
        canvas.height = this.imageHeight;
        const context = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSource;
        img.onload = () => {
            context!.drawImage(img, 0, 0, this.imageWidth, this.imageHeight);
        };
        this.canvas = canvas;
    }

    private createMagnifyingGlass(imageSource: string) {
        Vue.set(this.magnifierGlassStyle, 'backgroundImage', `url('${imageSource}')`);
        Vue.set(this.magnifierGlassStyle, 'backgroundRepeat', 'no-repeat');
        Vue.set(this.magnifierGlassStyle,
            'backgroundSize',
            `${this.imageWidth * this.zoom}px ${this.imageHeight * this.zoom}px`);
    }
}

function RGBToHex(r: number, g: number, b: number) {
    let rString = r.toString(16);
    let gString = g.toString(16);
    let bString = b.toString(16);

    if (rString.length === 1) {
        rString = '0' + rString;
    }
    if (gString.length === 1) {
        gString = '0' + gString;
    }
    if (bString.length === 1) {
        bString = '0' + bString;
    }

    return '#' + rString + gString + bString;
}
