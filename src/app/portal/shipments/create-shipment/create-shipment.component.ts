import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractBaseComponent } from '@app/core/class/abstract.base.omponent';
import { MediaService } from '@app/portal/media/media.service';
import { DynamicScriptLoaderService } from '@app/shared/services/dynamic-script-loader.service';
import { ToastrService } from '@app/shared/services/toastr.service';
import { CountriesResponse, Country } from '../models/countries.modal';
import { ShipmentService } from '../shipment.service';
declare const $: any;


@Component({
  selector: 'app-create-shipment',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.css']
})
export class CreateShipmentComponent extends AbstractBaseComponent implements OnInit {
  public select2Options: any = {};
  public countries: Country[];
  public country: Country;
  public shipmentForm: FormGroup;
  public from_id = 'from_postalcode_lookup';
  public to_id = 'to_postalcode_lookup';
  public toCodeSelected: any;


  constructor(
    protected shipmentService_: ShipmentService,
    protected toasterService: ToastrService,
    protected formBuilder: FormBuilder,
    private mediaService: MediaService,
    protected dynamicScriptLoaderService: DynamicScriptLoaderService
  ) {
    super();
  }

  ngOnInit() {
    this.select2Options = {
      placeholder: 'Please select an option',
      allowClear: false ,
      events: {
          'select2:select': this.updateDropdownValue.bind(this),
          'select2:unselecting': this.clearDropDownValue.bind(this)
      }
    };
    this.getCountries();
    this.intiForm();
    this.initBinding('');
    this.initBindingToPostalCode('');
  }

  public updateDropdownValue(element: any) {
    const name = $(element.target).attr('name');
    const value = $(element.target).val();
    this.country = this.countries.filter(el => {
      if (el.id == value) {
        return el;
      } else {
        return ;
      }
    })[0];
    this.shipmentForm.controls['to_country'].setValue(this.country.name);
    this.shipmentForm.controls['to_city'].enable();
    this.shipmentForm.controls['to_postal_code'].enable();
    this.shipmentForm.controls['to_state'].enable();
    this.shipmentForm.controls['to_address'].enable();
    this.shipmentForm.controls['to_mobile'].enable();
    this.shipmentForm.controls['to_indentification_num'].enable();
    this.shipmentForm.controls['to_email'].enable();
    this.shipmentForm.controls['to_mobile_code'].setValue('+' + this.country.phonecode);
  }
  public clearDropDownValue(element: any) {
    const name = $(element.target).attr('name');
    // this.eventForm.controls[name].setValue(null);
  }

  private async getCountries() {
    try {
      const response: CountriesResponse = await this.shipmentService_.getCountriesListAsync();
      this.countries = response.countries;
    } catch (error) {
      this.toasterService.toastError(String(error));
    }
  }

  private intiForm() {
    this.shipmentForm = this.formBuilder.group({
      from_name: ['', [Validators.required]],
      from_is_business: [false, []],
      from_company_name: ['', []],
      from_email: ['', []],
      from_mobile: ['', [Validators.required]],
      from_address: ['', [Validators.required]],
      from_address2: ['', [Validators.required]],
      from_mobile_code: ['+92', []],
      from_postal_code: ['', [Validators.required]],
      from_city: ['', [Validators.required]],
      from_province: ['', [Validators.required]],
      from_country: ['PAKISTAN', [Validators.required]],
      from_identification_type: ['', [Validators.required]],
      from_indentification_num: ['', [Validators.required]],
      from_state: ['', [Validators.required]],
      to_name: ['', [Validators.required]],
      to_is_business: [false, []],
      to_company_name: ['', []],
      to_email: ['', []],
      to_mobile: ['', [Validators.required]],
      to_address: ['', [Validators.required]],
      to_address2: ['', [Validators.required]],
      to_mobile_code: ['', []],
      to_postal_code: ['', [Validators.required]],
      to_city: ['', [Validators.required]],
      to_province: ['', [Validators.required]],
      to_country: ['', [Validators.required]],
      to_identification_type: ['', []],
      to_indentification_num: ['', []],
      to_eori_no: ['', []],
      to_state: ['', [Validators.required]],
      type: [, [Validators.required]],
      declared_value: [, [Validators.required]],
      description: ['', [Validators.required]],
      total_weight: ['', []],
      total_packets: ['', []],
      packets: this.formBuilder.array([this.packetFormGroup()])
    });
    this.shipmentForm.controls['from_country'].disable();
    this.shipmentForm.controls['from_mobile_code'].disable();
    this.shipmentForm.controls['to_mobile_code'].disable();
    this.shipmentForm.controls['to_city'].disable();
    this.shipmentForm.controls['to_postal_code'].disable();
    this.shipmentForm.controls['to_state'].disable();
    this.shipmentForm.controls['to_address'].disable();
    this.shipmentForm.controls['to_mobile'].disable();
    this.shipmentForm.controls['to_indentification_num'].disable();
    this.shipmentForm.controls['to_email'].disable();
  }

  packetFormGroup() {
    return this.formBuilder.group({
      box: ['', []],
      weight: [, [Validators.required]],
      length: [, [Validators.required]],
      width: [, [Validators.required]],
      height: [, [Validators.required]],
      dinmentions: [, [Validators.required]],
      quantity: [1, [Validators.required]],
      weight_unit: [8, [Validators.required]],
    })
  }

  private escapeMarkup(markup: any) {
    return markup;
  }

  private formatRepo(data: any) {
    if (data.loading) {
        return 'Loading...';
    }
    const markup = '<div class="select2-result-repository__title fw-100">' + data.postal_code + ' (' +  data.city + ')' +'</div>';
    return markup;
  }

  private processResults(data: any) {
    return {
      results: data
    };
  }

  public setFromSelected(data: any) {
    this.shipmentForm.controls['from_postal_code'].setValue(data.postal_code);
    this.shipmentForm.controls['from_city'].setValue(data.city);
    this.shipmentForm.controls['from_state'].setValue(data.state);
  }

  private initBinding(personName: string | null) {
    const this_ = this;
    this.dynamicScriptLoaderService.load(['select2']).then((scripts) => {
    setTimeout(function() {
      const $select2: any = (<any>$)('#' + this_.from_id);
      $select2.select2({dropdownParent: $('.modal')});
      $select2.select2({
          ajax:
          {
            url: '/api/lookup/postal-code',
            dataType: 'json',
            delay: 500,
            headers: this_.mediaService.getHeaders(),
            data: function(params: any) {
                return {
                    country_code: 'PK',
                    postal_code: params.term,
                    type: 'any'
                };
            },
            processResults: this_.processResults,
            cache: true
          },
          placeholder: 'Search for people',
          escapeMarkup: this_.escapeMarkup,
          minimumInputLength: 3,
          templateResult: this_.formatRepo,
          templateSelection: function(selection: any) {
            if (selection.id !== '') {
                personName = null;
            }
            if (selection.id === '' && personName === null) {
              return selection.text;
            } else if (selection.id !== '' && personName === null) {
              this_.setFromSelected(selection);
              return selection.postal_code;
            }else if (personName !== null) {
              return personName;
            }
          }
        });
    }, 500);
  });
}

public setTOSelected(data: any) {
  this.shipmentForm.controls['to_postal_code'].setValue(data.postal_code);
  this.shipmentForm.controls['to_city'].setValue(data.city);
  this.shipmentForm.controls['to_state'].setValue(data.state);
}

private initBindingToPostalCode(personName: string | null) {
  const this_ = this;
  this.dynamicScriptLoaderService.load(['select2']).then((scripts) => {
  setTimeout(function() {
    const $select2: any = (<any>$)('#' + this_.to_id);
    $select2.select2({dropdownParent: $('.modal')});
    $select2.select2({
        ajax:
        {
          url: '/api/lookup/postal-code',
          dataType: 'json',
          delay: 500,
          headers: this_.mediaService.getHeaders(),
          data: function(params: any) {
              return {
                  country_code: this_.country.iso,
                  postal_code: params.term,
                  type: 'any'
              };
          },
          processResults: this_.processResults,
          cache: true
        },
        placeholder: 'Search for people',
        escapeMarkup: this_.escapeMarkup,
        minimumInputLength: 3,
        templateResult: this_.formatRepo,
        templateSelection: function(selection: any) {
          if (selection.id !== '') {
              personName = null;
          }
          if (selection.id === '' && personName === null) {
            return selection.text;
          } else if (selection.id !== '' && personName === null) {
            this_.setTOSelected(selection);
            return selection.postal_code;
          }else if (personName !== null) {
            return personName;
          }
        }
      });
    }, 500);
  });
}




}
