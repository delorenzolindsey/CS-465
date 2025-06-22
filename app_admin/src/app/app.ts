import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { Navbar } from './navbar/navbar';


@Component({
  selector: 'app-root',
  //standalone: true,
  imports: [CommonModule, RouterOutlet, TripListing, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected title = 'Travlr Getaways Admin';
}
