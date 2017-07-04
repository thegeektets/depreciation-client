import {AuthComponent} from './components/auth.component';
import {PasswordResetComponent} from './components/password_reset.component';
import {PasswordResetChangeComponent} from './components/password_reset_change.component';



export const AuthRoutes = [
    { path: 'auth/login',  component: AuthComponent },
    { path: 'password/reset',  component: PasswordResetComponent },
    { path: 'password/reset/:uid/:token',  component: PasswordResetChangeComponent },

];
