# How to User Test the Anonymous Post Feature
1. Clone the `fall23-nodebb-op` Github repository.
2. Run the appropriate setup guide from https://cmu-313.github.io/projects/P1/1_checkpoint/#repository-setup
3. Create a new NodeBB account.
4. Click on a category (e.g. General Discussion)
5. Click on the "New Topic" button to write a new topic. (This also works for post replies.)
6. Either check the box for "Post as Anonymous" before submitting your post.
7. If you checked the box, see that your username displays as "Anonymous" rather than your name.
8. If you edit the post and uncheck the box, see that your username is now shown.

# Where to Find the Automated Tests
The automated tests for this feature are found in `test/unit_test.js`. These tests check the behavior of
* The displayed name is unaffected for a post where the box is unchecked
* The displayed name is "Anonymous" when the isAnon feature is checked
* The displayed name returns to the normal display name when the feature is unchecked again.
* This feature works for posts as well as topics.

which was all of the criteria we were looking for, in addition to the fact that the changes were actually reflected in the UI.
