import { RouterModule, Routes } from '@angular/router';
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  {path : '', component : SearchComponent}
];

export const routing = RouterModule.forRoot(routes);
