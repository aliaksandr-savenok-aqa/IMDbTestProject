# IMDb Test Automation Framework

A test automation framework for IMDb using Playwright with TypeScript, implementing the Page Object Model (POM) pattern.

## 🎯 Project Overview

This framework is designed to test IMDb functionality with a focus on:
- Movie search and validation
- Top 250 movies navigation and validation

## 🚀 Getting Started

### Running Tests

```bash
# Run all tests
npm test

# Run tests with browser UI visible
npm run test:headed
```

#### Test Reports
```bash
npm run report
```

## 🔧 Configuration

### Playwright Configuration (`playwright.config.ts`)
- **Base URL**: `https://www.imdb.com`
- **Browsers**: Chrome
- **Reporters**: HTML, List, JUnit
- **Timeouts**: Configured for reliable test execution
- **Screenshots**: Captured on failure
- **Videos**: Recorded on failure

### Adding New Tests
1. Create test file in `tests/` directory
2. Import required page objects
3. Follow existing test patterns
4. Use utility functions for validations

### Adding New Page Objects
1. Create page class in `src/pages/`
2. Extend `BasePage` class
3. Define locators using Playwright methods
4. Implement page-specific actions

### Environment Configuration
Modify `playwright.config.ts` for:
- Different base URLs
- Additional browsers
- Custom reporters
- Timeout adjustments