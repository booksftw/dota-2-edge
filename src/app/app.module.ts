import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { GameOnComponent } from './game-on/game-on.component';
import { HeroTableComponent } from './game-on/hero-table/hero-table.component';
import {AddDataService} from './shared/addData.service';
import {FormsModule} from '@angular/forms';
import {GetDataService} from './shared/getData.service';

import {environment} from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEntryComponent } from './dashboard/add-entry/add-entry.component';
import { UpdateEntryComponent } from './dashboard/update-entry/update-entry.component';
import { HomeComponent } from './home/home.component';
import {TestService} from './shared/test.service';
import { UpdateHeroDetailsComponent } from './dashboard/update-entry/update-hero-details/update-hero-details.component';
import {UpdateDataService} from './shared/updateData.service';
import { UpdateHeroAllComponent } from './dashboard/update-entry/update-hero-all/update-hero-all.component';
import { HeroSelectedTableComponent } from './game-on/hero-selected-table/hero-selected-table.component';
import {GameHeroManagerService} from './shared/game-hero-manager.service';
import { HeroSuggestionsComponent } from './game-on/hero-suggestions/hero-suggestions.component';
import {HeroSelectionHighlightDirective} from './shared/heroSelectionHighlight.directive';
import {AuthService} from './shared/auth-service';
import { AuthGuard } from './shared/auth-guard.service';
import { LoginComponent } from './home/login/login.component';
import { ErrorComponent } from './error/error.component';


const appRoutes = [
  {path: '', canActivate: [AuthGuard], component: HomeComponent },
  {path: 'login', component: LoginComponent},
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent, children: [
      {path: 'add', component: AddEntryComponent},
      {path: 'update', component: UpdateEntryComponent},
      {path: 'update/all-heroes', component: UpdateHeroAllComponent},
      {path: 'update/:heroId', component: UpdateHeroDetailsComponent},
    ]},
  { path: 'game', canActivate: [AuthGuard], component: GameOnComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    GameOnComponent,
    HeroTableComponent,
    DashboardComponent,
    AddEntryComponent,
    UpdateEntryComponent,
    HomeComponent,
    UpdateHeroDetailsComponent,
    UpdateHeroAllComponent,
    HeroSelectedTableComponent,
    HeroSuggestionsComponent,
    HeroSelectionHighlightDirective,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule

  ],
  providers: [AddDataService, GetDataService, UpdateDataService, GameHeroManagerService , AuthService, AuthGuard , TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
