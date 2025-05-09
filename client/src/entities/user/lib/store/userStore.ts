import { makeAutoObservable, observable, action } from 'mobx';
import { type TUser } from '../../model/types';

class UserStore {

    @observable user: TUser = {
        name: '',
        email: '',
        phone: '',
        avatar: '',
    }

    constructor() {
        makeAutoObservable(this)
    }

    @action setUser = (user: Partial<TUser>) => {
        this.user = Object.assign(this.user, user);
    }
}

export default new UserStore();
