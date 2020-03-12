import {Component, OnInit} from '@angular/core';
import {PlantService} from '../../../services/plants/plant.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['common_name', 'plant_type', 'bloom_time', 'flower_color', 'soil_type', 'habitat_value'];
  dataSource;
  currentPage = 0;

  constructor(private ps: PlantService) {
  }

  ngOnInit(): void {
    this.ps.getAllPlants().subscribe(data => {
      this.dataSource = data;
    });
  }

  paginator(option: string) {
    switch (option) {
      case 'next':
        this.currentPage += 1;
        break;
      case 'previous':
        this.currentPage -= 1;
        break;
      default:
        this.currentPage -= 1;
    }

    this.ps.getAllPlants(this.currentPage).subscribe(data => {
      this.dataSource = data;
    });
  }
}
