import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingHtml: string = `
    <svg height="50" width="50">
      <circle cx="25" cy="25" r="15"></circle>
    </svg>
    <p>Loading...</p>
  `;

  private loadingElm: HTMLDivElement;

  constructor() { 
    this.loadingElm = document.createElement('div');
    this.loadingElm.classList.add('loading')
    this.loadingElm.innerHTML = this.loadingHtml;
  }

  showLoading() {
    const main = document.querySelector('main') as HTMLDivElement;
    main.appendChild(this.loadingElm);
  }

  hideLoading() {
    document.querySelector('.loading').remove();
  }


}
