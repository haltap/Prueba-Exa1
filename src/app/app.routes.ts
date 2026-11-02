import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { PersonaComponent } from './persona/persona';
export const routes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'persona', component: PersonaComponent},
{path: '', redirectTo: 'login', pathMatch: 'full'},
{path:'**', redirectTo:'login'}

];
