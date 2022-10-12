import { Injectable } from '@angular/core';
import { BaseAPIClass } from '@app/core/class/baseAPI.class';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { DataImportEntity, Media, MediaFilter, MediasReponse } from './models/media.model';
import { environment } from '@env/environment';
@Injectable({ providedIn: 'root' })
export class MediaService extends BaseAPIClass {

    private readonly URL_UPLOAD_MEDIA: string = 'documents/upload';
    private readonly URL_MEDIA_BY_ENTITY: string = 'media/entity';
    private readonly URL_ALL_MEDIA: string = 'media/list';
    private readonly URL_MEDIA: string = 'media';
    private readonly URL_PROCESS_IMPORT: string = 'import_process';
    constructor(
    protected override httpClient: HttpClient,

    protected override authenticationService: AuthenticationService) {
        super(httpClient, authenticationService);
    }

    public getUploadUrl(url: string) {
        const otherUrl = (url === "")? this.URL_UPLOAD_MEDIA: url;
        return environment.serverUrl + otherUrl;
    }

    public getHeaders() {
        return this.getAuthHeadersAsync();
    }

    public async fetchMediaForEntity(moduleId: number, entityId: number) {
        return await this.getAsync<MediasReponse>(this.URL_MEDIA_BY_ENTITY + '/' + moduleId + '/' + entityId,
        null, {}, false).toPromise();
    }

    public async fetchAllMediaAsync(filters: MediaFilter) {
        return await this.getAsync<MediasReponse>(this.URL_ALL_MEDIA, filters, {}, false).toPromise();
    }

    public async deleteMediaAsync(media: Media) {
        return await this.deleteAsync<MediasReponse>(this.URL_MEDIA + '/' + 'delete/' + media.id , media, {}, false).toPromise();
    }

    public async processImportAsync(data: DataImportEntity) {
        return await this.postAsync<any>(environment.serverUrl + this.URL_PROCESS_IMPORT , data, {}, false).toPromise();
    }

    public async changeMediaType(mediaId: number, typeId: number, keepOnlyOne: boolean) {
        return await this.postAsync<MediasReponse>(this.URL_MEDIA + '/' + 'change_type', {media_id: mediaId , type_id: typeId, keep_only_one: keepOnlyOne}).toPromise();
    }

    public async setAsDefault(mediaId: number) {
        return await this.postAsync<MediasReponse>(this.URL_MEDIA + '/' + 'set_as_default', {media_id: mediaId}).toPromise();
    }

}
