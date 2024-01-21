import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        children: [
            {
                path: 'auth',
                component: AuthorizationComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
