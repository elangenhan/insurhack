import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChatPage } from '../pages/chat/chat';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail/detail';
import { LoginPage } from '../pages/login/login';
import { StartPage } from '../pages/start/start';
import { ModalContentPage } from '../pages/start/start';

@NgModule({
  declarations: [
    MyApp,
    ChatPage,
    ProfilePage,
    HomePage,
    TabsPage,
    DetailPage,
    LoginPage,
    StartPage,
    ModalContentPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    ProfilePage,
    HomePage,
    TabsPage,
    DetailPage,
    LoginPage,
    StartPage,
    ModalContentPage,
    TabsPage
  ],
  providers: []
})
export class AppModule {}
