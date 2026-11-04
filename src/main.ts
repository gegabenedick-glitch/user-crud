import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { addIcons } from 'ionicons';
import {
  addOutline,
  bookOutline,
  bookmarkOutline,
  calendarOutline,
  checkmarkCircleOutline,
  closeOutline,
  createOutline,
  flameOutline,
  libraryOutline,
  peopleOutline,
  personAddOutline,
  refreshOutline,
  searchOutline,
  statsChartOutline,
  trashOutline,
} from 'ionicons/icons';

import { AppModule } from './app/app.module';

addIcons({
  'add-outline': addOutline,
  'book-outline': bookOutline,
  'bookmark-outline': bookmarkOutline,
  'calendar-outline': calendarOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'close-outline': closeOutline,
  'create-outline': createOutline,
  'flame-outline': flameOutline,
  'library-outline': libraryOutline,
  'people-outline': peopleOutline,
  'person-add-outline': personAddOutline,
  'refresh-outline': refreshOutline,
  'search-outline': searchOutline,
  'stats-chart-outline': statsChartOutline,
  'trash-outline': trashOutline,
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
