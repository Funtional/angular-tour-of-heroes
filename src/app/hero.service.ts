import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';

// 注意，这个新的服务导入了 Angular 的 Injectable 符号，并且给这个服务类添加了 @Injectable() 装饰器。 它把这个类标记为依赖注入系统的参与者之一。
// HeroService 类将会提供一个可注入的服务，并且它还可以拥有自己的待注入的依赖。 目前它还没有依赖，但是很快就会有了。
// @Injectable() 装饰器会接受该服务的元数据对象，就像 @Component() 对组件类的作用一样。
@Injectable({
  providedIn: 'root'
  // 在要求 Angular 把 HeroService 注入到 HeroesComponent 之前，你必须先把这个服务提供给依赖注入系统。
  // 你可以通过注册提供商来做到这一点。提供商用来创建和交付服务，在这个例子中，它会对 HeroService 类进行实例化，以提供该服务。
  // 通过给 @Injectable 装饰器添加元数据的形式，为该服务把提供商注册到根注入器上。？
})
export class HeroService {

  constructor() {
  }

  // getHeroes(): Hero[] {
  //   return HEROES;
  // }
  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }
}
