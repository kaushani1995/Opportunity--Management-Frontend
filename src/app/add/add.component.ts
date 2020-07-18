import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { User, Status, Team, Skillset, OppAndSkills, Opportunity, Position } from '../models';
import { Router, ActivatedRoute } from '@angular/router';
import { ServerApisService } from '../server-apis.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  temp: string[] = [];

  visible = true;
  selectable = true;
  removable = true;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  locations: Map<number, string>;
  positions : Map<number, string>;
  users: Map<string, string>;
  statuses: Map<number, string>;
  teams: Map<number, string>;
  skillSet: Skillset[] = [];
  skillMap: Map<string, number> = new Map();

  name = new FormControl('');

  selectedPosition: any;
  selectedHiringManager: any;
  selectedLocation: any;
  selectedTeam: any;
  selectedStatus: any;
  selectedSkills: number[] = [];
  jobDesc = '';

  
  oppObject: OppAndSkills;

  constructor(
    private serverApis: ServerApisService,
    private router: Router,
    private formBuilder: FormBuilder) {

      //this.skillSet.forEach((value: string, key: number) => this.temp.push(value));
  
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.skillSet.map(x => x.name).slice()));
        //map((fruit: string | null) => fruit ? this._filter(fruit) : this.temp.slice()));
  }

  opportunityForm = new FormGroup({
    position: new FormControl('', [Validators.required]),
    team: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    hiringManager: new FormControl('', [Validators.required]),
    skills: new FormControl([], [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(2000), Validators.minLength(10)]),
  });

  add(event): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    const idIndex = this.selectedSkills.indexOf(this.skillMap.get(fruit));

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }

    if (idIndex >= 0) {
      this.selectedSkills.splice(idIndex, 1);
    }

  }

  selected(event): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);

    this.selectedSkills.push(this.skillMap.get(event.option.viewValue));
    // tslint:disable-next-line: no-string-literal
    this.opportunityForm.controls['skills'].setValue(this.selectedSkills.map(x => x));
  }

  

   _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    /*for(let key of this.skillSet){
      this.temp.push(key[1]);
    }
    this.skillSet.forEach((value: string, key: number) => this.temp.push(value));

    return this.temp.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);*/
    return this.skillSet.map(x => x.name).filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit() {
    const opp = new Opportunity();
    opp.jobDesc = this.opportunityForm.value.description;
    opp.idTeam = this.opportunityForm.value.team;
    opp.hiringManager = this.opportunityForm.value.hiringManager;
    opp.idLocation = this.opportunityForm.value.location;
    opp.idStatus = this.opportunityForm.value.status;
    opp.idPosition = this.opportunityForm.value.position;
    opp.createdBy =  localStorage.getItem("EMAIL");
    const oppSkill = new OppAndSkills();
    oppSkill.opportunity = opp;
    oppSkill.skillset = this.opportunityForm.value.skills;
    console.log("Ready to go: ");

    this.serverApis.addOpp(oppSkill).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/home']);
    });

  }


  ngOnInit(): void {

    this.serverApis.getTeams().subscribe(tms => this.teams = tms);

    this.serverApis.getUsers().subscribe(usr => this.users = usr);
    
    this.serverApis.getStatus().subscribe(sts => this.statuses = sts);

    this.serverApis.getLocation().subscribe(lct => this.locations = lct);

    this.serverApis.getPosition().subscribe(pst => this.positions = pst);

    this.serverApis.getSkillsobj().subscribe((skl: Skillset[]) => {
      this.skillSet = skl;
      console.log(this.skillSet);
      this.skillSet.forEach(x => this.skillMap.set(x.name, x.idSkillset));
      //this.skillSet.forEach((value: string, key: number) => this.skillMap.set(value, key));
    });

    
  }

  cancel(){
    this.router.navigate(['/home']);
  }

}
