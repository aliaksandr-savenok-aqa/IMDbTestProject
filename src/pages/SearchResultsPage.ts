import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Movie } from '../utils/entities/Movie';

export class SearchResultsPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async clickMovieByTitle(movie: Movie): Promise<void> {
        const movieLink = this.getMovieLinkLocator(movie);
        await movieLink.click();
        await this.waitForPageLoad();
    }

    async hasMovieInResults(movie: Movie): Promise<boolean> {
        try {
            const movieLink = this.getMovieLinkLocator(movie);
            await movieLink.waitFor({ state: 'visible', timeout: 5000 });
            
            return true;
        } catch (error) {
            return false;
        }
    }

    private getMovieLinkLocator(movie: Movie): Locator {
    return this.page.getByRole('link', { 
        name: new RegExp(movie.name, 'i') 
    }).first();
    }
}