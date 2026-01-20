import '@testing-library/jest-dom';
/**
 * This setupTests.js file is used to configure the testing environment before each test file is run
 * 
 * Here, we are importing '@testing-library/jest-dom' which provides custom matchers for testing DOM nodes
 * Basically, it adds extra assertions to the expect function
 * 
 * For example, after importing this file, we can use assertions like:
 * expect(element).toBeInTheDocument();
 * expect(element).toHaveAttribute();
 * expect(element).toHaveTextContent();
 */