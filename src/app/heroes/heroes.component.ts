import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

// 组件的元数据告诉 Angular 到哪里获取它需要的主要构造块，以创建和展示这个组件及其视图。
// 具体来说，它把一个模板（无论是直接内联在代码中还是引用的外部文件）和该组件关联起来。
// 该组件及其模板，共同描述了一个视图。
@Component({ // @Component 是个装饰器函数，用于为该组件指定 Angular 所需的元数据。
             //   selector— 组件的选择器（CSS 元素选择器）
  //   templateUrl— 组件模板文件的位置。 这个模板定义了该组件的宿主视图。
             //   styleUrls— 组件私有 CSS 样式表文件的位置。
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

// 始终要 export 这个组件类，以便在其它地方（比如 AppModule）导入它。
export class HeroesComponent implements OnInit {
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };

  heroes: Hero[];

  // selectedHero: Hero;

  // 这个参数同时做了两件事：1. 声明了一个私有 heroService 属性，2. 把它标记为一个 HeroService 的注入点。
  // 当 Angular 创建 HeroesComponent 时，依赖注入系统就会把这个 heroService 参数设置为 HeroService 的单例对象。
  constructor(private heroService: HeroService) {
  }

  // ngOnInit 是一个生命周期钩子，Angular 在创建完组件后很快就会调用 ngOnInit。这里是放置初始化逻辑的好地方。
  ngOnInit() {
    this.getHeroes();
    // 你固然可以在构造函数中调用 getHeroes()，但那不是最佳实践。
    // 让构造函数保持简单，只做初始化操作，比如把构造函数的参数赋值给属性。
    // 构造函数不应该做任何事。 它肯定不能调用某个函数来向远端服务（比如真实的数据服务）发起 HTTP 请求。
    // 而是选择在 ngOnInit 生命周期钩子中调用 getHeroes()，
    // 之后交由 Angular 处理，它会在构造出 HeroesComponent 的实例之后的某个合适的时机调用 ngOnInit。
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  // 可观察（Observable）的数据
  getHeroes(): void {
    // this.heroes = this.heroService.getHeroes();
    // 这在真实的应用中几乎是不可能的。 现在能这么做，只是因为目前该服务返回的是模拟数据。
    // 不过很快，该应用就要从远端服务器获取英雄数据了，而那天生就是异步操作。
    // HeroService 必须等服务器给出响应， 而 getHeroes() 不能立即返回英雄数据， 浏览器也不会在该服务等待期间停止响应。
    // HeroService.getHeroes() 必须具有某种形式的异步函数签名。
    // 它可以使用回调函数，可以返回 Promise（承诺），也可以返回 Observable（可观察对象）
    // 这节课，HeroService.getHeroes() 将会返回 Observable，
    // 因为它最终会使用 Angular 的 HttpClient.get 方法来获取英雄数据，而 HttpClient.get() 会返回 Observable。
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    // this.heroService.addHero({ name } as Hero)
    //   .subscribe(hero => {
    //     this.heroes.push(hero);
    //   });
    this.heroService.addHero({name} as Hero)
      .subscribe(() => {
        this.getHeroes();
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
