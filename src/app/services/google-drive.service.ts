import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

declare var google: any;
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {
  private CLIENT_ID = '710914295170-vcjdbrdrhurr4cjbu1vaa0i01naalb6e.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyAAAZhFMJsaoQnmtrvRP7G4kFVBteVKG1I';
  private DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
    'https://www.googleapis.com/discovery/v1/apis/docs/v1/rest'
  ];
  private SCOPES = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/documents';

  private tokenClient: any;
  private gapiInited = false;
  private gisInited = false;
  private MODELS_FOLDER_ID = '1L3LVTcbsGorAPsuoZP_GTFKmADbP9sPg'; // Substitua pelo ID da pasta "Modelos de Contratos"
  private CONTRACTS_FOLDER_ID = '17ErU31o_s6Q9JOs5jZXA0VkJzET4xWaF'; // Substitua pelo ID da pasta "Contratos"

  constructor() { }

  loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => this.gapiLoaded();
    document.body.appendChild(script);
  }

  loadGis() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => this.gisLoaded();
    document.body.appendChild(script);
  }

  gapiLoaded() {
    gapi.load('client', () => this.initializeGapiClient());
  }

  async initializeGapiClient() {
    await gapi.client.init({
      apiKey: this.API_KEY,
      discoveryDocs: this.DISCOVERY_DOCS,
    });
    this.gapiInited = true;
    this.maybeEnableButtons();
  }

  gisLoaded() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: '', // defined later
    });
    this.gisInited = true;
    this.maybeEnableButtons();
  }

  maybeEnableButtons() {
    if (this.gapiInited && this.gisInited) {
      (document.getElementById('authorize_button') as HTMLButtonElement).style.visibility = 'visible';
    }
  }

  handleAuthClick() {
    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      (document.getElementById('signout_button') as HTMLButtonElement).style.visibility = 'visible';
      (document.getElementById('authorize_button') as HTMLButtonElement).innerText = 'Refresh';
      await this.listFiles();
    };

    if (gapi.client.getToken() === null) {
      this.tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      this.tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token, () => {
        gapi.client.setToken('');
        (document.getElementById('content') as HTMLElement).innerText = '';
        (document.getElementById('authorize_button') as HTMLButtonElement).innerText = 'Authorize';
        (document.getElementById('signout_button') as HTMLButtonElement).style.visibility = 'hidden';
      });
    }
  }

  async listFiles() {
    let response;
    try {
      response = await gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': 'files(id, name)',
        'q': `'${this.MODELS_FOLDER_ID}' in parents`
      });
    } catch (err) {
      console.error('Error listing files:', err);
      return;
    }
    const files = response.result.files;
    if (!files || files.length == 0) {
      (document.getElementById('content') as HTMLElement).innerText = 'No files found.';
      return;
    }
    const output = files.reduce(
      (str: string, file: any) => `${str}${file.name} (${file.id})\n`,
      'Files:\n');
    (document.getElementById('content') as HTMLElement).innerText = output;
  }

  async copyFile(fileId: string, newFileName: string, variables: { [key: string]: string }) {
    let response;
    try {
      console.log('Copying file with ID:', fileId); // Adiciona log
      response = await gapi.client.drive.files.copy({
        fileId: fileId,
        resource: {
          name: newFileName,
          parents: [this.CONTRACTS_FOLDER_ID]
        }
      });
    } catch (err) {
      console.error('Error copying file:', err);
      return;
    }
    console.log('File copied:', response.result);
    const newFileId = response.result.id;
    (document.getElementById('content') as HTMLElement).innerText = 'File copied: ' + response.result.name + ' (' + response.result.id + ')';

    // Modify the copied document
    await this.modifyDocumentContent(newFileId, variables);

    // Make the copied file public
    try {
      console.log('Setting permissions for file ID:', newFileId); // Adiciona log
      await gapi.client.drive.permissions.create({
        fileId: newFileId,
        resource: {
          role: 'reader',
          type: 'anyone'
        }
      });
      console.log('File permissions updated to public.');
    } catch (err) {
      console.error('Error setting file permissions:', err);
      return;
    }
  }
  async modifyDocumentContent(documentId: string, variables: { [key: string]: string }) {
    const requests = [];
    for (const [key, value] of Object.entries(variables)) {
      requests.push({
        replaceAllText: {
          containsText: {
            text: `{{${key}}}`,
            matchCase: true,
          },
          replaceText: value,
        }
      });
    }

    try {
      const response = await gapi.client.docs.documents.batchUpdate({
        documentId: documentId,
        resource: {
          requests: requests
        },
      });
      console.log('Document modified:', response.result);
      (document.getElementById('content') as HTMLElement).innerText += '\nDocument modified: ' + response.result.documentId;
    } catch (err) {
      console.error('Error modifying document:', err);
    }
  }
}
