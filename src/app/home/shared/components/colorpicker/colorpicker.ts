import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Colorpicker extends Vue {

    public canvas: HTMLCanvasElement = null;
    public pixel: Uint8ClampedArray = null;
    public magnifierGlassStyle: any = {};
    public magnifierGlassWidth: number = 0;
    public magnifierGlassHeight: number = 0;
    public showMagnifierGlass: boolean = false;

    @Prop({ default: 2, type: Number })
    public zoom: number;

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

    public mousemove(event: MouseEvent) {
        if (this.canvas) {
            this.showMagnifierGlass = true;
            this.pixel = this.canvas.getContext('2d')!.getImageData(event.offsetX, event.offsetY, 1, 1).data;
            this.$emit('color-update', { r: this.pixel[0], g: this.pixel[1], b: this.pixel[2] });
            Vue.set(this.magnifierGlassStyle, 'left', `${event.offsetX - 50}px`);
            Vue.set(this.magnifierGlassStyle, 'top', `${event.offsetY - 50}px`);
            Vue.set(
                this.magnifierGlassStyle,
                'backgroundPosition',
                `-${event.offsetX * this.zoom}px -${event.offsetY * this.zoom}px`,
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
