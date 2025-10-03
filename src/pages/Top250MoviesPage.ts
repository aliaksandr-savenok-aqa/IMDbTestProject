import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Movie } from '../utils/entities/Movie';
import { TestData } from '../utils/TestUtils';

export class Top250MoviesPage extends BasePage {
    readonly moviesList: Locator;

    constructor(page: Page) {
        super(page);

        this.moviesList = this.page.getByRole('link').filter({ hasText: TestData.regexPatterns.movieTitleLink });
    }

    async clickMovieByIndex(index: number): Promise<void> {
        const movieLink = this.moviesList.nth(index - 1);
        await movieLink.click();
    }

    async getMovieByIndex(index: number): Promise<Movie> {
        
        const movieLink = this.moviesList.nth(index - 1);
        const movieName = await this.getMovieNameByIndex(index);
        const movieContainer = movieLink.locator('..').locator('..').filter({ hasText: movieName });
        const releaseYear = await this.getMovieYearFromContainer(movieContainer);
        const rating = await this.getMovieRatingFromContainer(movieContainer);

        return new Movie(movieName, releaseYear, rating);
    }

    async getMovieNameByIndex(index: number): Promise<string> {
        const movieLink = this.moviesList.nth(index - 1);
        const fullTitle = await movieLink.textContent();
        
        if (!fullTitle) {
            throw new Error(`Could not find movie at index ${index}`);
        }

        return fullTitle.replace(TestData.regexPatterns.trimMovieNumber, '').trim();
    }

    async getMovieYearFromContainer(container: Locator): Promise<number> {
        const containerText = await this.getMovieContainerText(container);
        const yearMatch = containerText.match(TestData.regexPatterns.year);
        return yearMatch ? parseInt(yearMatch[0]) : 0;
    }

    async getMovieRatingFromContainer(container: Locator): Promise<number> {
        const containerText = await this.getMovieContainerText(container);
        const ratingMatch = containerText.match(TestData.regexPatterns.rating);
        return ratingMatch ? parseFloat(ratingMatch[1]) : 0;
    }

    async getMovieContainerText(container: Locator): Promise<string> {
        const containerText = await container.textContent();
        if (!containerText) {
            throw new Error(`Could not find movie data content`);
        }
        return containerText;
    }
}