import * as Client from './types';



function checkResponse(response: Response) {
  if (response.ok) {
    return response;
  } else {
    console.error('Service error', response);
    throw new Error(`FATAL_${response.status}`);
  }
}

export default class FormServiceImpl implements Client.FormService {
  private baseUrl: string;
  private csrf?: Client.Csrf;
  private tenantId: string;

  constructor(init: Client.Config) {
    this.baseUrl = init.transport.apiUrl;
    this.csrf = init.transport.csrf;
    this.tenantId = init.transport.tenantId;
  }

  doFetch(url: string, method: string, body: Client.Form | Client.Tag | Client.Questionnaire | undefined = undefined) {
    const headers: HeadersInit = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    };

    if (this.csrf) {
      headers[this.csrf.headerName] = this.csrf.token;
    }
    const options: RequestInit = {
      method,
      credentials: 'include',
      headers
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    if (this.tenantId) {
      if (url.indexOf('?') >= 0) {
        url = url + `&tenantId=${this.tenantId}`;
      } else {
        url = url + `?tenantId=${this.tenantId}`;
      }
    }
    return fetch(url, options)
      .then(response => checkResponse(response))
      .then(response => response.json());
  }

  loadForm(formId: Client.FormId, tagName?: string): Promise<Client.Form> {
    let url = this.baseUrl + '/forms/' + formId;
    if (tagName && tagName !== 'LATEST') {
      url += `?rev=${tagName}`;
    }
    return this.doFetch(url, 'get');
  }

  saveForm(formData: Client.Form, dryRun = false) {
    return this.doFetch(`${this.baseUrl}/forms/${formData._id}${dryRun ? '?dryRun=true' : ''}`, 'put', formData);
  }

  duplicateItem(formData: Client.Form, itemId: string) {
    return this.doFetch(this.baseUrl + '/forms/actions/itemCopy?itemId=' + itemId, 'post', formData);
  }

  changeItemId(formData: Client.Form, oldId: string, newId: string) {
    return this.doFetch(`${this.baseUrl}/forms/${formData._id}?oldId=${oldId}&newId=${newId}`, 'put', formData);
  }

  createSession(formId: Client.FormId, language: string, context?: {}) {
    let session: any = {
      metadata: {
        formId,
        formRev: 'LATEST',
        language
      },
    };
    if (context) {
      session.context = context;
    }
    return this.doFetch(`${this.baseUrl}/questionnaires`, 'post', session);
  }

  loadVersions(formName: string) {
    return this.doFetch(`${this.baseUrl}/forms/${formName}/tags`, "GET");
  }

  createTag(formName: string, tagName: string, tagDescription: string, formId: Client.FormId | null = null) {
    let tagData: any = {
      name: tagName,
      description: tagDescription,
      formName
    };
    if (formId) {
      tagData.formId = formId;
    }
    let url = `${this.baseUrl}/forms/${formName}/tags`;
    if (!formId) {
      url += '?snapshot=true';
    }
    return this.doFetch(url, 'post', tagData);
  }

}