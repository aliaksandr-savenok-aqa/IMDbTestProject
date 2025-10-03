import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { SearchResultsPage } from '../src/pages/SearchResultsPage';
import { MovieDetailsPage } from '../src/pages/MovieDetailsPage';
import { Movie } from '../src/utils/entities/Movie';
import { TestData } from '../src/utils/TestUtils';

test.describe('IMDb Movie Search Tests', () => {
    let homePage: HomePage;
    let searchResultsPage: SearchResultsPage;
    let movieDetailsPage: MovieDetailsPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        searchResultsPage = new SearchResultsPage(page);
        movieDetailsPage = new MovieDetailsPage(page);

        await homePage.navigateToHomePage();
    });

    test('Search and Validate Movie', async ({ page }) => {
        const movieToSearch = new Movie(TestData.movies.hotTubTimeMachine, 2010, 6.4);

        await homePage.searchForMovie(movieToSearch);
        expect(page.url()).toContain(TestData.urls.searchResults);
        expect(searchResultsPage.hasMovieInResults(movieToSearch)).toBeTruthy();

        await searchResultsPage.clickMovieByTitle(movieToSearch);
        expect(page.url()).toContain(TestData.urls.movieDetails);
        expect(movieDetailsPage.movieTitle).toHaveText(movieToSearch.name);
    });
});