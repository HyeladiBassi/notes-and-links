import { pick, omit } from 'lodash';

export interface StorageProps {
  accessToken: string;
  _id: string;
  email: string;
  name: string;
  splashLoaded: boolean;
  [key: string]: any;
}

const KEY = '_LINK_ME_STORAGE_';

class Storage {
  constructor() {}

  save(props: Partial<StorageProps>) {
    const items = localStorage.getItem(KEY);
    if (!items) localStorage.setItem(KEY, JSON.stringify(props));
    else {
      // get storage and access items
      const itemsParsed: StorageProps = JSON.parse(items);
      localStorage.setItem(KEY, JSON.stringify({ ...itemsParsed, ...props }));
    }
    this.log();
  }

  get(props: string | string[]) {
    const items = localStorage.getItem(KEY) ? localStorage.getItem(KEY) : null;
    if (!items) return null;
    const parsed: StorageProps = JSON.parse(items);
    const picked = pick(parsed, props);
    if (typeof props === 'string') {
      return picked[props];
    }
    return picked;
  }

  remove(props: string | string[]) {
    const items = localStorage.getItem(KEY);
    if (!items) return null;
    const itemsParsed = JSON.parse(items);
    const itemsOmitted = omit(itemsParsed, props);
    localStorage.setItem(KEY, JSON.stringify(itemsOmitted));
    this.log();
  }

  clear() {
    localStorage.clear();
    this.log();
    return;
  }

  log() {
    console.info(localStorage.getItem(KEY));
  }
}

const storageService = new Storage();
export default storageService;
