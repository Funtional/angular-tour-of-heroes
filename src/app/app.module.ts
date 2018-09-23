import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeroesComponent} from './heroes/heroes.component';
// Angular 需要知道如何把应用程序的各个部分组合到一起，以及该应用需要哪些其它文件和库。 这些信息被称为元数据（metadata）。
// 有些元数据位于 @Component 装饰器中，你会把它加到组件类上。 另一些关键性的元数据位于 @NgModule 装饰器中。
import {FormsModule} from '@angular/forms';
import {HeroDetailComponent} from './hero-detail/hero-detail.component'; // <-- NgModel lives here

// 注意 AppModule 声明了应用中的所有组件
// 每个组件都必须声明在（且只能声明在）一个 NgModule 中。
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent // HeroesComponent 已经声明在了 @NgModule.declarations 数组中。
  ],
  imports: [
    BrowserModule,
    FormsModule // 把 FormsModule 添加到 @NgModule 元数据的 imports 数组中，这里是该应用所需外部模块的列表。
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
