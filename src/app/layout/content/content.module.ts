import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent, HeaderComponent } from './components';
import { ContentComponent } from './content.component';

@NgModule({
	declarations: [ContentComponent, HeaderComponent, FooterComponent],
	imports: [CommonModule, RouterModule, NgOptimizedImage]
})
export class ContentModule {}
