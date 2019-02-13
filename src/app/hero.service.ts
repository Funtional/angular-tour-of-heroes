import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

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

  // 添加一个私有的 messageService 属性参数。
  // Angular 将会在创建 HeroService 时把 MessageService 的单例注入到这个属性中。
  constructor(private http: HttpClient, private messageService: MessageService) {
    // 这是一个典型的“服务中的服务”场景：
    // 你把 MessageService 注入到了 HeroService 中，而 HeroService 又被注入到了 HeroesComponent 中。
  }

  private getHeroesUrl = '/api/hero/list';  // URL to web api
  private getHeroUrl = `/api/hero/`;
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

  getHeroByApi(id: number): Observable<Hero> {
    this.log(`HeroService: fetched hero id=${id}`);
    return this.http.get<Hero>(this.getHeroUrl + id).pipe(
      tap(_ => this.log('fetched heroes'))
    );
  }

  getHero(id: number): Observable<Hero> {
    // 注意，反引号 ( ` ) 用于定义 JavaScript 的 模板字符串字面量，以便嵌入 id。
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
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
