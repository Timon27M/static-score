import { makeAutoObservable, observable, action } from 'mobx';
import { type TUser } from '../../model/types';

class UserStore {

    @observable user: TUser & {isLoggedIn: boolean} = {
        name: '',
        email: '',
        phone: '',
        avatar: '',
        isLoggedIn: false,
    }

    constructor() {
        makeAutoObservable(this)
    }

    @action setUser = (user: Partial<TUser & {isLoggedIn: boolean}>) => {
        this.user = Object.assign(this.user, user);
    }
}

export default new UserStore();
