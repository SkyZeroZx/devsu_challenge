import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProductComponent } from './create-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../../../services/product';

describe('CreateProductComponent', () => {
	let component: CreateProductComponent;
	let fixture: ComponentFixture<CreateProductComponent>;
	let productService: ProductService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CreateProductComponent],
			imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
			providers: [ProductService]
		}).compileComponents();
		productService = TestBed.inject(ProductService);
		fixture = TestBed.createComponent(CreateProductComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
