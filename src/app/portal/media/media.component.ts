import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StringMap } from '@app/shared/models/common.model';
import { DynamicScriptLoaderService } from '@app/shared/services/dynamic-script-loader.service';
import { ToastrService } from '@app/shared/services/toastr.service';
import { MediaService } from './media.service';
import { DataImortParseResults, DataImportEntity } from './models/media.model';

@Component({
  selector: 'app-upload-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
    private dropZoneOptions: StringMap[] = [];
    private params: StringMap = {};
    public columns: string[] = [];
    public records: any[] = [];
    public shouldShowColumnRelationshipDesigner = false;
    private columnDesign: any = {};
    private importProcessEntity: DataImportEntity = {};
    @Input()  public module: string = null;
    @Input()  public module_id: number = null;
    @Input()  public relation_id: number = null;
    @Input()  public media_type: number = null;
    @Input()  public media_directory_id: number = null;
    @Input()  public url: string = null;
    @Input()  public multipleUploads = false;
    @Input()  public max_files = 100;
    @Input()  public dropzone_id = '';
    @Input()  public dataImporter = false;
    @Input()  public keep_only_one = false;
    @Output() mediaUploaded = new EventEmitter();

    constructor(
        private dynamicScriptLoaderService: DynamicScriptLoaderService,
        private toastrService: ToastrService,
        private mediaService: MediaService) {
    }

    ngOnInit() {
        this.dynamicScriptLoaderService.load(['dropzone']).then((scripts) => {
            this.initDropZone();
        });
    }

    private initDropZone() {
        if (this.dropzone_id !== '') {
            (<any>$)('#' + this.dropzone_id).dropzone(
                this.getDropZoneOptions()
            );
        } else {
            (<any>$)('.dropzone').dropzone(
                this.getDropZoneOptions()
            );
        }
    }

    protected addDropZoneOption(name: string, value: any) {
        this.dropZoneOptions.push({name, value});
    }

    private getPayload() {
        if (this.module != null) {
            this.params['module'] = this.module;
        }

        if (this.module_id != null) {
            this.params['module_id'] = this.module_id.toString();
        }

        if (this.relation_id != null) {
            this.params['relation_id'] = this.relation_id.toString();
        }

        if (this.media_directory_id != null) {
            this.params['media_directory_id'] = this.media_directory_id.toString();
        }

        if (this.media_type != null) {
            this.params['media_type'] = this.media_type.toString();
        }

        if (this.keep_only_one != null) {
            this.params['keep_only_one'] = this.keep_only_one.toString();
        }

        return this.params;
    }

    private get uploadUrl() {
        const url = (this.url != null) ? this.mediaService.getUploadUrl(this.url) : this.mediaService.getUploadUrl("");
        return url;
    }

    protected getDropZoneOptions() {
        const this_ = this;
        if (this.dropZoneOptions.length === 0 ) {
            return {
                        url: this.uploadUrl,
                        parallelUploads: 1,
                        maxFiles: this.max_files,
                        uploadMultiple: this.multipleUploads,
                        params: this.getPayload(),
                        headers: this.mediaService.getHeaders(),
                        success: function(file: any, response: DataImortParseResults) {
                            if(this_.dataImporter) {
                                this_.showColumnRelationshipDesigner(response);
                            } else {
                                this_.mediaUploaded.emit({file, response});
                            }
                        }
                    };
        } else {
            const dropZoneOptions: StringMap = {};
            this.dropZoneOptions.forEach(option => {
                dropZoneOptions[option.name] = option.value;
            });
            return dropZoneOptions;
        }
    }

    private showColumnRelationshipDesigner(response: DataImortParseResults) {
        if(response !== null && response.id > 0) {
            this.importProcessEntity.file_id = response.id;
            this.importProcessEntity.module_id = this.module_id;
            this.columns = JSON.parse(response.csv_header_fields);
            this.records = JSON.parse(response.csv_data);
            if(this.records.length > 0 ) {
                this.shouldShowColumnRelationshipDesigner = true;
            }
        }
    }

    public setColumnOrder(index: number, event: any) {
        Object.keys(this.columnDesign).forEach(key=> {
            if(this.columnDesign[key] === index) {
                delete(this.columnDesign[key]);
            }
        });

        if(event.target.value !== "") {
            this.columnDesign[event.target.value] = index;
        }
    }

    public async processImport() {
        try {
            if(Object.keys(this.columnDesign).length >0) {
                this.importProcessEntity.header = this.columnDesign;
                const response = await this.mediaService.processImportAsync(this.importProcessEntity);
                this.toastrService.toastSuccess(response.message);
            }
        } catch(error) {

        }
    }

}
