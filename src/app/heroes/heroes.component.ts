import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent {
  heroes:Hero[] = [];
  selectedHero?:Hero;
  onSelect(hero:Hero):void{
    this.selectedHero=hero;
  }
  getHeros():void{
    this.heroService.getHeroes().subscribe(
      heroes=>this.heroes=heroes
    );
  }
  ngOnInit():void{
    this.getHeros()
  }
  constructor(private heroService:HeroService){}
}
