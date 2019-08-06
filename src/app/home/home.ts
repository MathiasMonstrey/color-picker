import { Component, Prop, Vue } from 'vue-property-decorator';
import Colorpicker from './shared/components/colorpicker/colorpicker';

@Component({ components: { Colorpicker } })
export default class Home extends Vue {
    public imageSrc = require('@/app/home/assets/city.jpg');
    public currentColor: string = '';

    public updateColor({ r, g, b }: { r: string, g: string, b: string }) {
        this.currentColor = `rgb(${r},${g},${b})`;
    }
}
