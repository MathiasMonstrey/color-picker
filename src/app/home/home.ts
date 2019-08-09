import { Component, Prop, Vue } from 'vue-property-decorator';
import Colorpicker from './shared/components/colorpicker/colorpicker';

@Component({ components: { Colorpicker } })
export default class Home extends Vue {
    public imageSrc1 = require('@/app/home/assets/city.jpg');
    public imageSrc2 = require('@/app/home/assets/rick-morty.jpg');
    public currentColor: string = '';

    public updateColor({ r, g, b }: { r: string, g: string, b: string }) {
        this.currentColor = `rgb(${r},${g},${b})`;
    }
}
