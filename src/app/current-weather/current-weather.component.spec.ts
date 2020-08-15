import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CurrentWeatherComponent } from './current-weather.component'
import { WeatherService } from '../weather/weather.service'
// import { WeatherServiceFake } from '../weather/weather.service.fake'
import { injectSpy } from 'angular-unit-test-helper'
import { of } from 'rxjs'
import { fakeWeather } from '../weather/weather.service.fake'
import { By } from '@angular/platform-browser'

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent
  let fixture: ComponentFixture<CurrentWeatherComponent>
  let weatherServiceMock: jasmine.SpyObj<WeatherService>

  beforeEach(async(() => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getCurrentWeather',
    ])

    TestBed.configureTestingModule({
      providers: [{ provide: WeatherService, useValue: weatherServiceSpy }],
      declarations: [CurrentWeatherComponent],
    }).compileComponents()
    weatherServiceMock = injectSpy(WeatherService)
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of())
    // Act
    fixture.detectChanges() // triggers ngOnInit
    // Assert
    expect(component).toBeTruthy()
  })

  it('should get currentWeather from weatherService', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of())
    // Act
    fixture.detectChanges() // triggers ngOnInit
    // Assert
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1)
  })

  it('should eagerly load currentWeath in Bethesda from weatherservice', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather))
    // Act
    fixture.detectChanges() // triggers ngOnInit
    // Assert
    expect(component.current).toBeDefined()
    expect(component.current.city).toEqual('Bethesda')
    expect(component.current.temperature).toEqual(280.32)
    // Assert on DOM
    const debugE1 = fixture.debugElement
    const titleE1: HTMLElement = debugE1.query(By.css('span')).nativeElement
    expect(titleE1.textContent).toContain('Bethesda')
  })
})
