import { swRegistrationOptions } from '@/core/config/service-worker';
import { interceptorsProviders } from '@/core/interceptor';
import { SpinnerComponent, ToastModule } from '@/shared/ui';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { ContentModule } from './layout';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		ContentModule,
		HttpClientModule,
		SpinnerComponent,
		ToastModule,
		RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking', useHash: true }),
		ServiceWorkerModule.register('ngsw-worker.js', swRegistrationOptions)
	],
	providers: [...interceptorsProviders, provideClientHydration()],
	bootstrap: [AppComponent]
})
export class AppModule {}
