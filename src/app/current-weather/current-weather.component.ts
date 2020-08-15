import { Component, OnInit } from '@angular/core'

import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather

  constructor(private weatherservice: WeatherService) {}

  ngOnInit(): void {
    this.weatherservice
      .getCurrentWeather('Athens', 'GR')
      .subscribe((data) => (this.current = data))
  }
}
