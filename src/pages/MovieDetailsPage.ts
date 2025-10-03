import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { TestData } from '../utils/TestUtils';
import { Movie } from '../utils/entities/Movie';

export class MovieDetailsPage extends BasePage {
    readonly movieTitle: Locator;

    constructor(page: Page) {
        super(page);
        
        this.movieTitle = this.page.getByRole('heading', { level: 1 });
    }

    async getMovieInfo(): Promise<Movie> {
        const name = await this.getMovieName();
        const releaseYear = await this.getReleaseYear();
        const rating = await this.getRating();

        return new Movie(name, releaseYear, rating);
    }

    async getMovieName(): Promise<string> {
        const titleText = await this.movieTitle.textContent();
        
        if (!titleText) {
            throw new Error('Could not find movie title on the page');
        }

        return titleText.trim();
    }

    async getReleaseYear(): Promise<number> {
        const yearLinks = this.page.getByRole('link').filter({ hasText: TestData.regexPatterns.year });
        const yearText = await yearLinks.first().textContent();
        
        if (!yearText) {
            throw new Error('Could not find release year on the page');
        }

        return parseInt(yearText.trim());
    }

    async getRating(): Promise<number> {
        const mainContent = this.page.getByRole('main');
        const contentText = await mainContent.textContent();
        
        if (!contentText) {
            throw new Error('Could not find main content on the page');
        }

        const ratingMatch = contentText.match(TestData.regexPatterns.rating);
        
        if (!ratingMatch || !ratingMatch[1]) {
            throw new Error('Could not find movie rating on the page');
        }

        return parseFloat(ratingMatch[1]);
    }

}