import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { Top250MoviesPage } from '../src/pages/Top250MoviesPage';
import { MovieDetailsPage } from '../src/pages/MovieDetailsPage';
import { TestData } from '../src/utils/TestUtils';

test.describe('IMDb Top 250 Movies Tests', () => {
    let homePage: HomePage;
    let top250Page: Top250MoviesPage;
    let movieDetailsPage: MovieDetailsPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        top250Page = new Top250MoviesPage(page);
        movieDetailsPage = new MovieDetailsPage(page);

        await homePage.navigateToHomePage();
    });

    test('Navigate Top 250 Movies and Validate First Movie', async ({ page }) => {
        await homePage.navigateToTop250Movies();
        expect(page.url()).toContain(TestData.urls.top250);
        const firstMovieFromList = await top250Page.getMovieByIndex(1);

        await top250Page.clickMovieByIndex(1);
        expect(page.url()).toContain(TestData.urls.movieDetails);
        const movieFromDetails = await movieDetailsPage.getMovieInfo();

        expect(firstMovieFromList.equals(movieFromDetails)).toBeTruthy();
    });
});