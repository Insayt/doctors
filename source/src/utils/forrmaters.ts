export function fio(arg: any) {
  const { firstName = '', lastName = '', middleName = '' } = arg || {};
  return `${lastName} ${firstName} ${middleName}`.trim();
}

export function bytesToSize(bytes: number): string {
  const k = 1000;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes <= 0) {
    return '0 Bytes';
  }
  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(k))), 10);

  if (!sizes[i]) {
    return '0 Bytes';
  }

  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}
