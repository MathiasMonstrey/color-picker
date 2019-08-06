import store from '@/store';
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';

@Module({
    dynamic: true,
    store,
    name: 'Home-state',
    namespaced: true,
})
class HomeState extends VuexModule {

}

export const HomeStateModule = getModule(HomeState);
