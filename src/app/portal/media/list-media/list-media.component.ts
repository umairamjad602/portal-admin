import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AbstractBaseComponent } from '@app/core/class/abstract.base.omponent';
import { MediaService } from '@app/portal/media/media.service';
import { ConfirmationDialogService } from '@app/shared/components/confirmation-dialog-component/confirmation-dialog.service';
import { GenericEvent } from '@app/shared/models/generic-event.model';
import { ApplicationEvent } from '@app/shared/services/alert-modal.service';
import { DynamicScriptLoaderService } from '@app/shared/services/dynamic-script-loader.service';
import { MediaFilter, Media, MediasReponse, MediaUploadResponse } from '../models/media.model';

declare var $: any;

@Component({
  selector: 'app-list-media',
  templateUrl: './list-media.component.html',
  styleUrls: ['./list-media.component.scss']
})
export class ListMediaComponent extends AbstractBaseComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input()  public module: string = null;
    @Input()  public module_id: number = null;
    @Input()  public relation_id: number = null;
    @Input()  public view_type = 'list';
    @Input()  public dataImporter = false;
    @Input()  public loadRelatedMedia = true;
    @Input()  public options: any = {setAsLogo: true, setAsDefault: true, deleteMedia: true, previewMedia: true};

    @Output() mediaUploaded = new EventEmitter();

    public mediaFilterForm: UntypedFormGroup;
    public mediaFilers: MediaFilter = null;
    public medias: Media[];

    constructor(
        private mediaService: MediaService,
        private dynamicScriptLoaderService: DynamicScriptLoaderService,
        private confirmationDialogService: ConfirmationDialogService,
        private formBuilder: UntypedFormBuilder,
        private applicationEvent: ApplicationEvent) {
        super();
    }

    ngOnInit() {
        this.subscribe(this.applicationEvent.onGenericEvent.subscribe(this.handleEvent.bind(this)));
        this.initForm();
        if(this.loadRelatedMedia) {
            this.fetchDataAsync();
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    private initForm() {
        this.mediaFilterForm = this.formBuilder.group({
            file_name: ['', []],
            module_id: ['', []],
            brand_id: ['', []],
            relation_id: ['', []],
            created_from: ['', []],
            created_until: ['', []],
        });
    }

    ngAfterViewInit() {
        const scriptsToLoad: string[] = [
          'lightgallery'
        ];
        this.dynamicScriptLoaderService.load(scriptsToLoad).then((scripts) => {});
    }

    private initLightgallery() {
        setTimeout(function() {
            const $initScope = (<any>$)('#js-lightgallery');
            if ($initScope.length) {
                $initScope.justifiedGallery(
                {
                    border: -1,
                    rowHeight: 150,
                    margins: 8,
                    waitThumbnailsLoad: true,
                    randomize: false,
                }).on('jg.complete', function() {
                    $initScope.lightGallery(
                    {
                        thumbnail: true,
                        animateThumb: true,
                        showThumbByDefault: true,
                    });
                });
            }

            $initScope.on('onAfterOpen.lg', function(event: any) {
                $('body').addClass('overflow-hidden');
            });

            $initScope.on('onCloseAfter.lg', function(event: any) {
                $('body').removeClass('overflow-hidden');
            });
        }, 500);
    }

    private fetchMedia() {
        if (this.module_id != null || this.relation_id != null) {
            return this.mediaService.fetchMediaForEntity(this.module_id, this.relation_id);
        } else {
            return this.mediaService.fetchAllMediaAsync(this.mediaFilers);
        }
    }

    public getRowId(row: any) {
        return 'media-' + row.id;
    }

    private async fetchDataAsync() {
        this.loadingStart();
        const mediaForEntityResponse: MediasReponse = await this.fetchMedia();
        this.medias = mediaForEntityResponse.media.data;
        this.initLightgallery();
        this.loadingFinished();
        this.initTooltips();
        this.ready = true;
    }

    private handleEvent(event: GenericEvent) {
        switch (event.name) {
            case 'lightgallery-loaded':
            this.initLightgallery();
            break;
        }
    }

    public isImage(media: Media) {
        return (media.media_is_image === 1);
    }

    public getFileIcon(media: Media) {
        const extension = media.media_extension;
        const icon = 'file.png';
        const extensionIcons: {[index: string]: string} = {
            'pdf': 'pdf.png',
            'xls': 'excel.png',
            'xlsx': 'excel.png',
            'doc': 'excel.png',
            'docx': 'excel.png',
        };

        return extensionIcons[extension] || icon;
    }

    public async delete(media: Media, event: Event) {
        this.confirmationDialogService.confirm('Please confirm..', 'Are you sure you want to delete this record?')
            .then(async (confirmed) => {
                if (confirmed) {
                    try {
                        $(event.target).prop('disabled', true);
                        const respose = await this.mediaService.deleteMediaAsync(media);
                        this.removeElementByClass(this.getRowId(media));
                    } catch (error) {

                    }
                }
        });
    }

    public mediaHasBeenUploaded(event: {file: any; response: MediaUploadResponse}) {
        this.mediaUploaded.emit(event);
        this.fetchDataAsync();
    }

    public async setAsLogo(media: Media, mediaTypeId: number) {
        await this.mediaService.changeMediaType(media.id, mediaTypeId, true);
        $(".dropdown").removeClass('show');
        this.fetchDataAsync();
    }

    public async markAsDefault(media: Media) {
        await this.mediaService.setAsDefault(media.id);
        $(".dropdown").removeClass('show');
        this.fetchDataAsync();
    }

    public initTooltips() {
        setTimeout(function() {
            $('[data-toggle="tooltip"]').tooltip();
        }, 500);
    }
}
