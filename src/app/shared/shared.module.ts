import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  AppBarModule,
  ChannelValueModule,
  DrawerModule,
  EmptyStateModule,
  HeroModule,
  InfoListItemModule,
  ListItemTagModule,
  ScoreCardModule,
  SpacerModule,
  ThreeLinerModule,
} from '@brightlayer-ui/angular-components';

const MATERIAL = [
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatToolbarModule,
  MatTooltipModule,
];

const BRIGHTLAYER = [
  AppBarModule,
  ChannelValueModule,
  DrawerModule,
  EmptyStateModule,
  HeroModule,
  InfoListItemModule,
  ListItemTagModule,
  ScoreCardModule,
  SpacerModule,
  ThreeLinerModule,
];

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...MATERIAL,
    ...BRIGHTLAYER,
  ],
})
export class SharedModule {}
