import {RegisterComponent} from './components/register.component';
import {ProfileComponent} from './components/profile.component/';

export const AccountRoutes = [
    { path: 'account/register',  component: RegisterComponent },
    { path: 'user/profile', component: ProfileComponent}
];
