import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'detail/:id', component: HeroDetailComponent},
];
// {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
// 添加默认路由
// 这个路由会把一个与空路径“完全匹配”的 URL 重定向到路径为 '/dashboard' 的路由。

// 你将会使用 RouterModule 中的 Routes 类来配置路由器，所以还要从 @angular/router 库中导入这两个符号。
// 添加一个 @NgModule.exports 数组，其中放上 RouterModule 。
// 导出 RouterModule 让路由器的相关指令可以在 AppModule 中的组件中使用。
@NgModule({
  // 你必须首先初始化路由器，并让它开始监听浏览器中的地址变化。
  // 把 RouterModule 添加到 @NgModule.imports 数组中，并用 routes 来配置它。
  // 你只要调用 imports 数组中的 RouterModule.forRoot() 函数就行了。
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
