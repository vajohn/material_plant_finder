import {Component, OnInit} from '@angular/core';
import {PlantService} from '../../../services/plants/plant.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  submitted = false;
  PlantSearch: FormGroup;
  dataToSend;
  dataSource;
  displayedColumns: string[] = ['common_name', 'plant_type', 'bloom_time', 'flower_color', 'soil_type', 'habitat_value'];
  seasons: string[] = ['Summer', 'Winter', 'Spring', 'Autumn'];
  plantTypes: string[] = ['Shrub', 'Tree', 'Perennial', 'Grass'];
  locations: string[] = ['Garden', 'Roof', 'Sidewalk'];
  habitat: string[] = ['Pollinator', 'Cover', 'Fruit', 'Nesting', 'Greens', 'Buds'];

  constructor(private ps: PlantService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.PlantSearch = this.formBuilder.group({
      bloom_time: ['', Validators.required],
      plant_type: [''],
      appropriate_location: [''],
      habitat_value: ['']
    });
    this.ps.getAllPlants(0, 10).subscribe(data => {
      this.dataSource = data;
    });
  }

  get f() {
    return this.PlantSearch.controls;
  }

  onSearch() {
    this.submitted = true;
    if (this.PlantSearch.invalid) {
      return;
    }

    this.filter();

    this.ps.getSearchPlants(this.dataToSend).subscribe(d => this.dataSource = d);
  }

  private filter() {
    this.dataToSend = this.PlantSearch.value;

    if (this.f.habitat_value.value === '') {
      delete this.dataToSend.habitat_value;
    }
    if (this.f.appropriate_location.value === '') {
      delete this.dataToSend.appropriate_location;
    }
    if (this.f.plant_type.value === '') {
      delete this.dataToSend.plant_type;
    }

    this.dataToSend.$limit = '10';
  }
}
