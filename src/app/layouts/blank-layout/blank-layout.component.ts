import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBlankComponent } from 'src/app/components/nav-blank/nav-blank.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBlankComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss'],
})
export class BlankLayoutComponent {
  goToUp(): void {
    scrollTo(0, 0);
  }
}
