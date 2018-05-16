import {DocumentStoreService} from './document-store.service';
import {async, TestBed} from '@angular/core/testing';
import {AppConfig} from '../../config/app.config';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SessionService} from '../../auth/session.service';
import {CookieModule} from 'ngx-cookie';

let httpMock: HttpTestingController;
let appConfig: AppConfig;
let service: DocumentStoreService;

const configObject = {
  'dm_store_app_local_endpoint': '/demproxy/dm/',
};

describe('DocumentStoreService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CookieModule.forRoot()],
      declarations: [],
      providers: [AppConfig, DocumentStoreService, SessionService]
    })
      .compileComponents();
  }));

  describe('Test ConvertUrlToProxy', () => {
    beforeEach(() => {
      service = TestBed.get(DocumentStoreService);
      httpMock = TestBed.get(HttpTestingController);
      appConfig = TestBed.get(AppConfig);
      appConfig.load();
      const configRequest = httpMock.expectOne('assets/config.json');
      configRequest.flush(configObject);
    });

    it('ConvertUrlToProxy', () => {
      expect(service.convertUrlToProxy('http://localhost:8080/testUrl'))
        .toEqual('/demproxy/dm/testUrl');
    });

  });

});
