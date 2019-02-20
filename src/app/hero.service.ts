import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// 注意，这个新的服务导入了 Angular 的 Injectable 符号，并且给这个服务类添加了 @Injectable() 装饰器。
// 它把这个类标记为依赖注入系统的参与者之一。
// HeroService 类将会提供一个可注入的服务，并且它还可以拥有自己的待注入的依赖。 目前它还没有依赖，但是很快就会有了。
// @Injectable() 装饰器会接受该服务的元数据对象，就像 @Component() 对组件类的作用一样。
@Injectable({
  providedIn: 'root'
  // 在要求 Angular 把 HeroService 注入到 HeroesComponent 之前，你必须先把这个服务提供给依赖注入系统。
  // 你可以通过注册提供商来做到这一点。提供商用来创建和交付服务，在这个例子中，它会对 HeroService 类进行实例化，以提供该服务。
  // 通过给 @Injectable 装饰器添加元数据的形式，为该服务把提供商注册到根注入器上。
})

export class HeroService {

  // 添加一个私有的 messageService 属性参数。
  // Angular 将会在创建 HeroService 时把 MessageService 的单例注入到这个属性中。
  constructor(private http: HttpClient, private messageService: MessageService) {
    // 这是一个典型的“服务中的服务”场景：
    // 你把 MessageService 注入到了 HeroService 中，而 HeroService 又被注入到了 HeroesComponent 中。
  }

  private getHeroesUrl = '/api/hero/list';  // URL to web api
  private heroUrl = `/api/hero/`;
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.getHeroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    this.log(`HeroService: fetched hero id=${id}`);
    return this.http.get<Hero>(this.heroUrl + id).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  getHeroOld(id: number): Observable<Hero> {
    // 注意，反引号 ( ` ) 用于定义 JavaScript 的 模板字符串字面量，以便嵌入 id。
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.patch(this.heroUrl + hero.id, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`added hero name=${hero.name}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroUrl}/${id}`;

    // 如果你忘了调用 subscribe()，本服务将不会把这个删除请求发送给服务器。
    // 作为一条通用的规则，Observable 在有人订阅之前什么都不会做。
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.getHeroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}

// 服务是一个广义的概念，它包括应用所需的任何值、函数或特性。狭义的服务是一个明确定义了用途的类。它应该做一些具体的事，并做好。
// Angular 把组件和服务区分开，以提高模块性和复用性。 通过把组件中和视图有关的功能与其他类型的处理分离开，你可以让组件类更加精简、高效。

// 依赖注入（dependency injection）
// DI 被融入 Angular 框架中，用于在任何地方给新建的组件提供服务或所需的其它东西。
// 组件是服务的消费者，也就是说，你可以把一个服务注入到组件中，让组件类得以访问该服务类。
// 在 Angular 中，要把一个类定义为服务，就要用 @Injectable() 装饰器来提供元数据，以便让 Angular 可以把它作为依赖注入到组件中。
// ·注入器是主要的机制。Angular 会在启动过程中为你创建全应用级注入器以及所需的其它注入器。你不用自己创建注入器。
// ·该注入器会创建依赖、维护一个容器来管理这些依赖，并尽可能复用它们。
// ·提供商是一个对象，用来告诉注入器应该如何获取或创建依赖。
// 你的应用中所需的任何依赖，都必须使用该应用的注入器来注册一个提供商，以便注入器可以使用这个提供商来创建新实例。
// 对于服务，该提供商通常就是服务类本身。
// 依赖不一定是服务 —— 它还可能是函数或值。

// 当 Angular 创建组件类的新实例时，它会通过查看该组件类的构造函数，来决定该组件依赖哪些服务或其它依赖项。
// 比如 HeroListComponent 的构造函数中需要 HeroService：
// constructor(private service: HeroService) { }
// 当 Angular 发现某个组件依赖某个服务时，它会首先检查是否该注入器中已经有了那个服务的任何现有实例。
// 如果所请求的服务尚不存在，注入器就会使用以前注册的服务提供商来制作一个，并把它加入注入器中，然后把该服务返回给 Angular。
// 当所有请求的服务已解析并返回时，Angular 可以用这些服务实例为参数，调用该组件的构造函数。

// 提供服务
// 对于要用到的任何服务，你必须至少注册一个提供商。服务可以在自己的元数据中把自己注册为提供商，这样可以让自己随处可用。
// 或者，你也可以为特定的模块或组件注册提供商。要注册提供商，就要在服务的 @Injectable() 装饰器中提供它的元数据，或者在@NgModule() 或 @Component() 的元数据中。
// ·默认情况下，Angular CLI 的 ng generate service 命令会在 @Injectable() 装饰器中提供元数据来把它注册到根注入器中。
// 本教程就用这种方法注册了 HeroService 的提供商：
// @Injectable({
//   providedIn: 'root',
// })
// 当你在根一级提供服务时，Angular 会为 HeroService 创建一个单一的共享实例，并且把它注入到任何想要它的类中。
// 这种在 @Injectable 元数据中注册提供商的方式还让 Angular 能够通过移除那些从未被用过的服务来优化大小。
// ·当你使用特定的 NgModule 注册提供商时，该服务的同一个实例将会对该 NgModule 中的所有组件可用。
// 要想在这一层注册，请用 @NgModule() 装饰器中的 providers 属性：
// @NgModule({
//   providers: [
//    BackendService,
//    Logger
//  ],
//  ...
// })
// ·当你在组件级注册提供商时，你会为该组件的每一个新实例提供该服务的一个新实例。
// 要在组件级注册，就要在 @Component() 元数据的 providers 属性中注册服务提供商。
// @Component({
//   selector:    'app-hero-list',
//   templateUrl: './hero-list.component.html',
//   providers:  [ HeroService ]
// })
