import {Component, OnInit} from '@angular/core';
import {Hero} from './hero';

@Component({ // @Component 是个装饰器函数，用于为该组件指定 Angular 所需的元数据。
             //   selector— 组件的选择器（CSS 元素选择器）
             //   templateUrl— 组件模板文件的位置。
             //   styleUrls— 组件私有 CSS 样式表文件的位置。
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

// 始终要 export 这个组件类，以便在其它地方（比如 AppModule）导入它。
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() {
  }

  // ngOnInit 是一个生命周期钩子，Angular 在创建完组件后很快就会调用 ngOnInit。这里是放置初始化逻辑的好地方。
  ngOnInit() {
  }

}
