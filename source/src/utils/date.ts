import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

enum Formats {
  backend = 'yyyy-MM-DDTHH:mm:ssZZ',
  date = 'dd.MM.yyyy',
  datepicker = 'yyyy/MM/DD',
  time = 'HH:mm',
}

export function formatDate(date: number | Date, template = 'date') {
  const formatString = Formats[template as keyof typeof Formats];
  return format(date, formatString || template, { locale: ru });
}
