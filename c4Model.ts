import {Location, PlantUMLWriter, StructurizrClient, Workspace} from 'structurizr-typescript';
import * as fs from 'fs';

const WORKSPACE_ID = 52865;
const API_KEY = '5f21848b-4627-497c-955d-be7b2342f488';
const API_SECRET = '907d55d8-b17f-4092-b353-dba53715ea3f';

const workspace = new Workspace();
workspace.name = 'MG Service';

const user = workspace.model.addPerson('Marek', 'Mechanik, użytkownik aplikacji', Location.External);

const app = workspace.model.addSoftwareSystem('MG Service App', 'Aplikacja do zarządzania warsztatem samochodowym', Location.Internal);

user.uses(app, 'używa');

const systemContext = workspace.views.createSystemContextView(
  app,
  'system-context',
  'Diagram kontekstu systemu dla warsztatu samochodowego');
systemContext.addNearestNeighbours(app);
systemContext.addAllPeople();

const angularApp = app.addContainer(
  'Aplikacja frontendowa',
  'Dostarcza funkcjonalność zarządzania warsztatem przez użytkownika',
  'Angular');

const facadeApp = app.addContainer(
  'Fasada API',
  'Dostarcza funkcjonalność zarządzania warsztatem poprzez JSON/HTTPS API',
  'Angular Services');

const db = app.addContainer(
  'Baza danych',
  'Przechowuje informacje o pojazdach, klientach, naprawach, etc',
  'MongoDB');

user.uses(angularApp, 'używa');
angularApp.uses(facadeApp, 'używa', 'JSON/HTTPS');
facadeApp.uses(db, 'czyta/zapisuje', 'JSON/HTTPS');

const containerView = workspace.views.createContainerView(app, 'containers', 'Diagram kontenerów systemu dla warsztatu samochodowego');
containerView.addPerson(user);
containerView.addAllContainers();

const vehiclesComponent = angularApp.addComponent('Pojazdy', 'Pozwala na zarządzanie pojazdami i historią napraw', 'Angular');
const clientsComponent = angularApp.addComponent('Klienci', 'Pozwala na zarządzanie klientami', 'Angular');
const servicesComponent = angularApp.addComponent('Usługi', 'Pozwala na zarządzanie listą oferowanych usług', 'Angular');

user.uses(vehiclesComponent, 'używa');
user.uses(clientsComponent, 'używa');
user.uses(servicesComponent, 'używa');

vehiclesComponent.uses(facadeApp, 'używa', 'JSON/HTTPS');
clientsComponent.uses(facadeApp, 'używa', 'JSON/HTTPS');
servicesComponent.uses(facadeApp, 'używa', 'JSON/HTTPS');

const componentView = workspace.views.createComponentView(angularApp, 'components', 'Diagram komponentów aplikacji frontendowej');
componentView.addAllComponents();
componentView.addPerson(user);
componentView.addAllContainers();

// Now either write the workspace to the Structurizr backend...
const structurizrClient = new StructurizrClient(API_KEY, API_SECRET);
structurizrClient
  .putWorkspace(WORKSPACE_ID, workspace)
  .then((response) => console.log('structurizr done', response))
  .catch(e => console.log('error', e));

// ... or render it as PlantUML
const plantUmlExport = new Promise((resolve, reject) => {
  const plantUML = new PlantUMLWriter().toPlantUML(workspace);
  fs.writeFile('c4Model.puml', plantUML, e => {
    if (e) {
      reject(e);
    }
    resolve();
  });
});
plantUmlExport
  .then(() => console.log('plantUml done'))
  .catch(e => console.log('error', e));
