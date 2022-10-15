import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'flot-charts', src: 'assets/theme/js/statistics/flot/flot.bundle.js' },
  { name: 'datatables-bundle', src: 'assets/theme/js/datagrid/datatables/datatables.bundle.js' },
  { name: 'treant', src: 'assets/theme/js/raphael.js' },
  { name: 'raphael', src: 'assets/theme/js/treant.js' },
  { name: 'dropzone', src: 'assets/theme/js/formplugins/dropzone/dropzone.js' },
  { name: 'select2', src: 'assets/theme/js/formplugins/select2/select2.bundle.js' },
  { name: 'summernote', src: 'assets/theme/js/formplugins/summernote/summernote.js' },
  { name: 'lightgallery', src: 'assets/theme/js/miscellaneous/lightgallery/lightgallery.bundle.js' },
  { name: 'input-mask', src: 'assets/theme/js/formplugins/inputmask/inputmask.bundle.js' },
  { name: "moment", src: "assets/theme/js/dependency/moment/moment.js"},
  { name: 'datepicker', src: 'assets/theme/js/formplugins/bootstrap-datepicker/bootstrap-datepicker.js' },
  { name: 'daterangepicker', src: 'assets/theme/js/formplugins/bootstrap-daterangepicker/bootstrap-daterangepicker.js' },
  { name: 'scrollbar', src: "assets/css/vendors/scrollbar.css"},
  { name: 'scrollable', src: "assets/css/vendors/scrollable.css"}
];

declare var document: any;
@Injectable({providedIn: 'root'})
export class DynamicScriptLoaderService {
    private scripts: any = [];
    constructor() {
        ScriptStore.forEach((script: any) => {
            this.scripts[script.name] = { loaded: false, src: script.src };
        });
    }

    isLoaded(scriptName: string) {
        return this.scripts[scriptName].loaded;
    }

    load(scripts: string[]) {
        const promises: any[] = [];
        scripts.forEach((script) => promises.push(this.loadScript(script)));
        return Promise.all(promises);
    }

    loadScript(name: string) {
        return new Promise((resolve, reject) => {
          if (!this.scripts[name].loaded) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = this.scripts[name].src;
            if (script.readyState) {
                script.onreadystatechange = () => {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        this.scripts[name].loaded = true;
                        resolve({script: name, loaded: true, status: 'Loaded'});
                    }
                };
            } else {
                script.onload = () => {
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                };
            }
            script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
            document.getElementsByTagName('head')[0].appendChild(script);
          } else {
            resolve({ script: name, loaded: true, status: 'Already Loaded' });
          }
        });
    }
}
