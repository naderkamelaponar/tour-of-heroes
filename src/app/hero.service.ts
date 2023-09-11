import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  /** getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService : fetched heroes');
    return heroes;
  } */
  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(a=>{
        this.log('fetched heroes')
      }),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
    
  }
  getHero(id:Number):Observable<Hero>{
    return this.http.get<Hero>(this.heroesUrl+`/${id}`)
    .pipe(
      tap(a=>{
        this.log('fetched hero id: '+a.id)
      }),
      catchError(this.handleError<Hero>('getHeroe id :'+id))
    );
  }
  httpOptions={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  updateHero(hero:Hero):Observable<any>{
    return this.http.put(this.heroesUrl,hero,this.httpOptions).pipe(
      tap(a=>{
        console.log(a)
        this.log(`updated hero :${hero.id}`)
      }),
      catchError(this.handleError<any>('HeroUpdate'))
    )
  }/** POST: add a new hero to the server */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}
deleteHero(id:number):Observable<any>{
  return this.http.delete(this.heroesUrl+`/${id}`,this.httpOptions).pipe(
    tap(()=>{
      this.log(`deleted hero id=${id}`),
      catchError(this.handleError<Hero>(`deleteHero`))
    })
  )
}
searchHeroes(term:string):Observable<Hero[]>{
  if(!term.trim()){return of([])}
  return this.http.get<Hero[]>(this.heroesUrl+`/?name=${term}`)
  .pipe(
    tap(t=>{
      t.length?
      this.log('found heroes matching '+term):
      this.log('NO heroes matching '+term),
      catchError(this.handleError<Hero[]>('searchHeroes',[]))
    })
  )
}
  constructor(private messageService:MessageService,private http: HttpClient) { }
  private heroesUrl='api/heroes';
  private log(message:string){
    this.messageService.add(message);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
