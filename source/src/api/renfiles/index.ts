import http from '../index';
import { RenFileData } from '@/api/renfiles/types/v1';

const RENFILES_SERVICE = '/api/renfiles/v1';
const cacheFiles: any = {};

function setFileOptions(value: any) {
  const defaultOptions = {
    noCache: false,
    preview: false,
    scale: 0.5,
  };
  const options =
    typeof value === 'string'
      ? Object.assign({}, defaultOptions, { fileId: value })
      : Object.assign({}, defaultOptions, value);

  const allowScale = [0.5, 0.4, 0.3, 0.2, 0.1];
  options.scale = allowScale.includes(options.scale) ? options.scale : 0.5;
  return options;
}

export async function getFile(value: any) {
  const options = setFileOptions(value);
  const { noCache, preview, scale, fileId } = options;
  const keyCacheFile = !preview ? fileId : fileId + '_' + scale;
  const fileRequest =
    !noCache && cacheFiles[keyCacheFile] ? cacheFiles[keyCacheFile] : null;
  const saveCachedRequest = (cachedRequest: any) => {
    if (noCache) {
      return;
    }
    cacheFiles[keyCacheFile] = cachedRequest;
  };
  if (fileRequest) {
    return fileRequest;
  }
  const load = http
    .get(`${RENFILES_SERVICE}/file/${fileId}${preview ? '/preview' : ''}`, {
      params: {
        scale: preview ? scale : undefined,
      },
      responseType: 'arraybuffer',
    })
    .then((res) => {
      const blob = new Blob([res.data]);
      const url = URL.createObjectURL(blob);
      saveCachedRequest(Promise.resolve(url));
      return url;
    });
  saveCachedRequest(load);
  return load;
}

export async function postFile(formData: FormData): Promise<RenFileData> {
  const { data } = await http.post(`${RENFILES_SERVICE}/file`, formData);
  return data;
}
