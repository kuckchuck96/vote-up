import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateVoteComponent } from './components/create-vote/create-vote.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ViewVoteComponent } from './components/view-vote/view-vote.component';
import { RouterModule, Routes } from '@angular/router';
import { PasscodeModalComponent } from './components/passcode-modal/passcode-modal.component';
import { AppLoaderComponent } from './components/app-loader/app-loader.component';
import { AboutComponent } from './components/about/about.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full' },
  { path: 'create', component: CreateVoteComponent },
  { path: 'view/:id', component: ViewVoteComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CreateVoteComponent,
    NavBarComponent,
    ViewVoteComponent,
    PasscodeModalComponent,
    AppLoaderComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
