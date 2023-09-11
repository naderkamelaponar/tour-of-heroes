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
  constructor(private heroService:HeroService,){}
  add(name:string)  :void{
    name=name.trim()
    if(!name){return;}
    this.heroService.addHero({name}as Hero)
    .subscribe(h=>{
      this.heroes.push(h)
    })
  }
  getHeros():void{
    this.heroService.getHeroes().subscribe(
      heroes=>this.heroes=heroes
    );
  }
  delete(hero:Hero):void{
    this.heroes=this.heroes.filter(h=>{return h!==hero})
    this.heroService.deleteHero(hero.id).subscribe();
  }
  ngOnInit():void{
    this.getHeros()
  }

  
}
