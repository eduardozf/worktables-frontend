Monday.com Integration Project
==============================

This project integrates a custom UI into a monday.com board to display and interact with data fetched from monday.com itself and from a custom [REST API](https://github.com/eduardozf/worktables-backend)  .

Project Overview
----------------

The project consists of two main components:

-   **Front-end:** A React application that runs within the monday.com environment, fetching and displaying data from the board.
-   **Back-end:** A small REST API that fetches weather data from a third-party APIs based on user interactions with the front-end.

Getting Started
---------------

To set up the project locally and integrate it with your monday.com account, follow these steps:

1.  **Clone the repository:**

    ```cmd
    git clone https://github.com/eduardozf/worktables-frontend.git
    cd worktables-frontend
    ```

3.  **Install dependencies:**

    ```cmd
    npm install
    ```

5.  **Run the front-end application:**
    ```cmd
    npm start
    ```

    This will start the front-end application at `http://localhost:3000`.

7.  **Access the monday.com Board:**

    -   Use the provided credentials by Worktable's to log in and navigate to the "DEVELOP HERE" board view.

Front-end Requirements
----------------------

### Features

-   **Search Bar:** Allows users to input text to filter country information displayed on the UI.
-   **Filtered Results:** Displays countries based on the search input. Clicking on a country opens detailed information.
-   **Modal for Detailed Information:** Displays country statistics and weather data fetched from the back-end API in a modal or similar UI element.
-   **Smooth User Experience:** Smooth transitions and interactions across different screen sizes.
-   **Error Handling:** Basic error handling for API calls and user inputs.
-   **Clean and Modular Code:** Followed best practices for React application development.
-   **Responsiveness:** Works well on all screen sizes.
-   **monday.com UI Components:** Utilized UI elements from monday.com's React UI Components Library.

### Implementation Details

-   **Framework:** Built using React JS.
-   **Language:** TypeScript for type-safe development.
-   **API Integration:** Fetches country data from monday.com using the monday.com JavaScript SDK. Weather data fetched via the custom back-end API.
