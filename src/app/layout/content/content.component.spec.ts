import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentComponent } from './content.component';
import { HeaderComponent, FooterComponent } from './components';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContentComponent', () => {
	let component: ContentComponent;
	let fixture: ComponentFixture<ContentComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ContentComponent, HeaderComponent, FooterComponent],
			imports: [RouterTestingModule]
		}).compileComponents();

		fixture = TestBed.createComponent(ContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
