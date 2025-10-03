import { Locator, Page, expect } from '@playwright/test';

export class MenuHeaderPageComponent {
    readonly page: Page;
    readonly menuOption: Locator;
    readonly top250MoviesOption: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuOption = page.getByLabel('Open navigation drawer');
        this.top250MoviesOption = page.getByLabel('Go to Top 250 movies');
    }

    async navigateToTop250Movies() {
        await this.menuOption.click();
        await this.top250MoviesOption.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}