# DevSu Angular Code Challenge By Jaime Burgos Tejada

<p align="center">
<a href="https://sonarcloud.io/summary/overall?id=SkyZeroZx_devsu_challenge" target="_blank">
  <img src="https://sonarcloud.io/api/project_badges/measure?project=SkyZeroZx_devsu_challenge&metric=alert_status" alt="Quality Gate" />
</a>
<a href="https://sonarcloud.io/summary/overall?id=SkyZeroZx_devsu_challenge" target="_blank">
  <img src="https://sonarcloud.io/api/project_badges/measure?project=SkyZeroZx_devsu_challenge&metric=coverage" alt="Coverage" />
</a>

 <a href="https://sonarcloud.io/summary/overall?id=SkyZeroZx_devsu_challenge" target="_blank">
  <img src="https://sonarcloud.io/api/project_badges/measure?project=SkyZeroZx_devsu_challenge&metric=vulnerabilities" alt="Vulnerabilities" />
</a>

 <a href="https://sonarcloud.io/summary/overall?id=SkyZeroZx_devsu_challenge" target="_blank">
  <img src="https://sonarcloud.io/api/project_badges/measure?project=SkyZeroZx_devsu_challenge&metric=bugs" alt="Bugs" />
</a>

 <a href="https://sonarcloud.io/summary/overall?id=SkyZeroZx_devsu_challenge" target="_blank">
  <img src="https://sonarcloud.io/api/project_badges/measure?project=SkyZeroZx_devsu_challenge&metric=security_rating" alt="Security Rating"  />
</a>

 <a href="https://sonarcloud.io/summary/overall?id=SkyZeroZx_devsu_challenge" target="_blank">
  <img src="https://sonarcloud.io/api/project_badges/measure?project=SkyZeroZx_devsu_challenge&metric=code_smells" alt="Code Smells"  />
</a>

 <a href="https://sonarcloud.io/summary/overall?id=SkyZeroZx_devsu_challenge" target="_blank">
  <img src="https://sonarcloud.io/api/project_badges/measure?project=SkyZeroZx_devsu_challenge&metric=sqale_rating" alt="Maintainability Rating"  />
</a>
<img src="https://badgen.net/badge/Built%20With/TypeScript/bl" alt="Build With TypeScript" />
<img src="https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg" alt="Build With VSCode" />
</p>

Se desarrollo el reto tecnico con todas funcionalidades y extras indicados.

Se tuvo en cuenta calidad de codigo y reusabilidad se crearon components de UI con posibilidad reutilizarlo como librerias , siendo esto posible gracias NX.

Se tuvo en consideración el performance haciendo uso de ChangeDetection Strategy y uso de OnPush , adicionalmente se uso signals.

Puede ver una demo en el enlace : https://devsu-challenge.skyzerozx.com/#/product

# Stack

- Angular 16
- Prettier : Formateador de codigo
- Docker / Docker Compose : Contenerización de la aplicación para un facil despliegue
- Nginx : Servidor de proxy inverso en conjunto con brotli para una mejor compresion de la SPA entrega
- Jest : Para creación de Uni Test
- SonarQube/SonarCloud : Para analisis y calidad de codigo
- Nx : Gestion de monorepositorio y configuraciones iniciales (Linters)
- Husky :Git Hooks para ejecutar lint y realiza pre commits
- GitHub Actions : Implementacion de CI y ejecución de unit test en pipeline
- PWA : Se agrego funcionalidad de PWA adicionalmente dado la consideración de un diseño responsive y facilmente adaptable a mobile
- Cypress : Se crearon pruebas E2E para validar el funcionamiento en un entorno más cercano al real

# Instalación

Para ejecutar un entorno de desarrollo

Previamente ejecutar el siguiente comando para descargar los "node_modules" para el funcionamiento correcto del proyecto

```
 npm install
```

# Desarollo

Para ejecutar en desarollo ejecutar el comando , validando previamente la configuración correcta de fichero `environment`

## Entorno Local

Ejecutar el siguiente comando

```
 npm run start
```

## PWA

Para ejecutar como PWA(Progressive Web App) , previamente debe tenerse instalado la libreria http-serve

```
 npm install --global http-server
```

Ejecutar el siguiente comando

```
 npm run start:pwa:dev
```

Este comando se encuentra configurado en el archivo package.json de la raiz del proyecto por default ejecuta el puerto 8080

## Docker

Para ejecutar en un contenedor docker bajo nginx ejecutar el siguiente comando.

Recordar tener previamente instalador docker y uso de docker compose.

```
 docker compose -f "docker-compose.yaml" up -d --build
```

## Unit Test

Para ejecutar todos los Unit Test desarrollados en Jest y reporte de cobertura de codigo ejecutar el comando

```
 npm run test
```

La carpeta con la cobertura del codigo se creara en la raiz del proyecto

El cual se encuentra en la siguiente ruta coverage/devsu-challenge/lcov-report/index.html el cual se puede visualizar el reporte visual

![Coverage Unit Test](/docs/test/unit-test-coverage.jpg)

## E2E Testing

Los test fueron construido con cypress con typescript , para ejecutarlo en modo desarrollo con la GUI de cypress ejecutar

Configurar el fichero `cypress.config.ts` con la variable de entorno necesarias

```
 npm run e2e:watch
```

Para ejecutar en modo headless las pruebas e2e ejecutar el comando

```
 npm run e2e
```

![E2E Testing](/docs/test/e2e-testing.jpg)

Nota : Por falta de tiempo solo se realizaron algunos test e2e , quedando pendiente su integración al pipeline de github actions asi como un coverage propio

# Analisis de Codigo

Pre requisitos

En la raiz del proyecto se tiene el archivo sonar-project.properties el cual tiene las propiedades necesarias para ejecutarlo sobre un SonarQube

Configurar los apartados : sonar.host.url , sonar.login sonar.password con los datos de su instancia correspondiente o usar SonarCloud con su token correspondiente

![SonarQube Properties](/docs/sonar/sonar-properties.jpg)

```
 Sonaqube >= 9.X
```

Las pruebas fueron realizas sobre SonarQube 10.0 para ejecutar el analisis de codigo ejecutar el comando para la instancia local:

```
npm run sonarqube
```

Reporte de Cobertura en SonarQube

![SonarQube Result 1](/docs/sonar/sonar-result-1.jpg)

![SonarQube Result 2](/docs/sonar/sonar-result-2.jpg)

Reporte de Cobetura en SonarCloud

![SonarCloud Result 1](/docs/sonar/sonar-cloud-result-1.jpg)

![SonarCloud Result 2](/docs/sonar/sonar-cloud-result-2.jpg)

## Integración Continua - Despligue

Se realizo un CI con SonarCloud para ejecuta de manera automatica los test

Se creo la carpeta `.github/workflows` con el archivo `ci.yml` que contiene los pasos para desplegar mediante GitHub Actions nuestro CI

Adicionalmente se generan artifacts con los reportes y evidencias de nuestro CI para posterior conservación

![CI 1](/docs/ci/ci-1.jpg)

![CI 1](/docs/ci/ci-2.jpg)

## Versionado 📌

Usamos [GIT](https://git-scm.com/) para el versionado.

## Autor✒️

- **Jaime Burgos Tejada** - _Developer_
- [SkyZeroZx](https://github.com/SkyZeroZx)
- Email : jaimeburgostejada@gmail.com
