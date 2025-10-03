import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Movie } from '../utils/entities/Movie';

export class HomePage extends BasePage {

    private searchInput: Locator;
    private searchButton: Locator;

    constructor(page: Page) {
        super(page);
        
        this.searchInput = this.page.getByPlaceholder('Search IMDb');
        this.searchButton = this.page.getByRole('button', { name: 'Submit search' });
    }

    async navigateToHomePage(): Promise<void> {
        await this.goto();
        await this.waitForPageLoad();
    }

    async searchForMovie(movie: Movie): Promise<void> {
        await this.searchInput.fill(movie.name);
        await this.searchButton.click();
        await this.waitForPageLoad();
    }

    async navigateToTop250Movies(): Promise<void> {

        await this.menuHeader.navigateToTop250Movies();
        await this.waitForPageLoad();
    }
}