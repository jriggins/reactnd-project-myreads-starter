## Tasks

Project Rubric: https://review.udacity.com/#!/rubrics/918/view

1. UI Skeleton
    1. Main
        1. Factor out book to component
        1. Factor Shelf
            1. Currently Reading Shelf
            1. Want to Read Shelf
            1. Read Shelf
    1. Search
        1. Use Router
        1. / for main page (be sure to use 'exact' here)
        1. /search for search page
1. Behavior
    1. Main
        1. Get list of books from API
        1. Convert book JSON to Book Component
        1. Filter list to Currently Reading
        1. Filter list to Want to Read
        1. Filter list to Read
        1. Sync book context menu and shelf value
        1. Ensure information is persisted between browser refreshes
    1. Search
        1. incremental
        1. Search results are not shown when all of the text is deleted out of the search input box.
        1. Invalid queries are handled and prior search results are not shown.
        1. The search works correctly when a book does not have a thumbnail or an author. (To test this, try searching for "poetry" and "biography"). (It's fine to filter out books with missing thumbnails.)
        1. The user is able to search for multiple words, such as “artificial intelligence.”
        1. Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.
        1. If a book is assigned to a shelf on the main page and that book appears on the search page, the correct shelf should be selected on the search page. If that book's shelf is changed on the search page, that change should be reflected on the main page as well. The option "None" should be selected if a book has not been assigned to a shelf.
        1. When an item is categorized on the search page and the user navigates to the main page, it appears on that shelf in the main page.
    1. Code
        1. Make sure there are no errors or warnings in console
        1. Use setState wisely. Pass state from parents down
        1. Break out into components
