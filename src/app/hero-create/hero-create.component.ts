import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { Location } from '@angular/common';
// The location is an Angular service for interacting with the browser. This service lets you navigate back to the previous view.
import { HeroService } from '../hero.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.css']
})
export class HeroCreateComponent implements OnInit {

   heroes: Hero[] = [];


  getHeroes():void{
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  @Input() hero?: Hero;


  constructor(
    private heroService: HeroService,
    private location: Location
  ) {}

  heroForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    title: new FormControl('',[Validators.required, Validators.minLength(3)]),
    description: new FormControl('',[Validators.required, Validators.minLength(10)])
  });


  ngOnInit(): void {

  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    if (this.heroForm.valid) {
      console.log(this.heroForm.value);
    } else {
      alert("ERROR!");
    }
  }
  add(name: any,title: any, description: any): void {

    name = name.trim();
    title = title.trim();
    if (!name) { return; }
    this.heroService.addHero({ name, title, description } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.goBack();
      });
  }

}
