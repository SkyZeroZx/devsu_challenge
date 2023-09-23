import { swRegistrationOptions } from '@/core/config/service-worker';
import { interceptorsProviders } from '@/core/interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
		ServiceWorkerModule.register('ngsw-worker.js', swRegistrationOptions)
	],
	providers: [...interceptorsProviders, provideClientHydration()],
	bootstrap: [AppComponent]
})
export class AppModule {}
