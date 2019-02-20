import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeroesComponent} from './heroes/heroes.component';
// Angular 需要知道如何把应用程序的各个部分组合到一起，以及该应用需要哪些其它文件和库。
// 这些信息被称为元数据（metadata）。
// 有些元数据位于 @Component 装饰器中，你会把它加到组件类上。 另一些关键性的元数据位于 @NgModule 装饰器中。
import {FormsModule} from '@angular/forms'; // <-- NgModel lives here
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {MessagesComponent} from './messages/messages.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {HeroSearchComponent} from './hero-search/hero-search.component';

// 注意 AppModule 声明了应用中的所有组件
// 每个组件都必须声明在（且只能声明在）一个 NgModule 中。
// @NgModule 元数据
// @NgModule() 装饰器是一个函数，它接受一个元数据对象，该对象的属性用来描述这个模块。
@NgModule({
  // declarations（可声明对象表）—— 那些属于本 NgModule 的组件、指令、管道。
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent // HeroesComponent 已经声明在了 @NgModule.declarations 数组中。
  ],
  // exports（导出表） —— 那些能在其它模块的组件模板中使用的可声明对象的子集。
  imports: [
    BrowserModule,
    // 把 FormsModule 添加到 @NgModule 元数据的 imports 数组中，这里是该应用所需外部模块的列表。
    // imports（导入表） —— 那些导出了本模块中的组件模板所需的类的其它模块。
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, {dataEncapsulation: false}
    // )
  ],
  // providers —— 本模块向全局服务中贡献的那些服务的创建器。 这些服务能被本应用中的任何部分使用。
  // （你也可以在组件级别指定服务提供商，这通常是首选方式。）
  providers: [],
  // bootstrap —— 应用的主视图，称为根组件。它是应用中所有其它视图的宿主。
  // 只有根模块才应该设置这个 bootstrap 属性。
  bootstrap: [AppComponent]
})

// 把 AppComponent 放到 exports 中是为了演示导出的语法，这在本例子中实际上是没必要的。
// 根模块没有任何理由导出任何东西，因为其它模块永远不需要导入根模块。
export class AppModule { }

// NgModule 为其中的组件提供了一个编译上下文环境。
// 根模块总会有一个根组件，并在引导期间创建它。
// 但是，任何模块都能包含任意数量的其它组件，这些组件可以通过路由器加载，也可以通过模板创建。
// 那些属于这个 NgModule 的组件会共享同一个编译上下文环境。
