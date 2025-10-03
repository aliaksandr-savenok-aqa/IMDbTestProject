import { Page, expect } from '@playwright/test';
import { MenuHeaderPageComponent } from './pageComponents/MenuHeaderPageComponent';

export abstract class BasePage {
    protected page: Page;
    protected menuHeader: MenuHeaderPageComponent;

    constructor(page: Page) {
        this.page = page;
        this.menuHeader = new MenuHeaderPageComponent(page);
    }

    async goto(url: string = ''): Promise<void> {
        await this.page.goto(url);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }
}