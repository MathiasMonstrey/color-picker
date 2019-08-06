import store from '@/store';
import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';

@Module({
    dynamic: true,
    store,
    name: 'Error-state',
    namespaced: true,
})
class ErrorState extends VuexModule {

}

export const ErrorStateModule = getModule(ErrorState);
