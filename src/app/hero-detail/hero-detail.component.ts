import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// The location is an Angular service for interacting with the browser. This service lets you navigate back to the previous view.
import { HeroService } from '../hero.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  private heroEdit: Hero = {
    id: 1,
    name: '',
    title: '',
    description: ''
  };
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  heroForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    title: new FormControl('',[Validators.required, Validators.minLength(3)]),
    description: new FormControl('',[Validators.required, Validators.minLength(10)])
  });


  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }


  updateName() {

      this.heroEdit.id = Number(this.route.snapshot.paramMap.get('id'));;
      this.heroEdit.name = <string>this.heroForm.value.name;
      this.heroEdit.title = <string>this.heroForm.value.title;
      this.heroEdit.description = <string>this.heroForm.value.description;
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.updateName();
    if (this.hero) {
      this.heroService.updateHero(this.heroEdit)
        .subscribe(() => this.goBack());
    }
  }

  onSubmit() {
    if (this.heroForm.valid) {
      console.log(this.heroForm.value);
    } else {
      alert("ERROR!");
    }
  }
}
