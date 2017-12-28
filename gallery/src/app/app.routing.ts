import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {GalleryComponent} from "./components/gallery/gallery.component";
import {ImagesComponent} from "./components/images/images.component";

const appRoutes: Routes = [
    {
    path: '',
    component: GalleryComponent,
    },
    {
    path: ':category',
    component: ImagesComponent,

    }


];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: false});