=======
# How to User Test the Anonymous Post Feature
1. Clone the `fall23-nodebb-op` Github repository.
2. Run the appropriate setup guide from https://cmu-313.github.io/projects/P1/1_checkpoint/#repository-setup
3. Log into NodeBB using the admin account information you received upon setup.
4. As an admin, click on the gears icon labeled 'Admin' at the top of the page.
5. Click on 'Extend' in the navigation bar. Click on 'Plugins' in the dropdown that appears.
6. Either in 'Installed' or 'Find Plugins' look for nodebb-plugin-composer-op and make sure it is installed and activated.
7. Return to localhost:4567 or the forum view.
8. Click on a category (e.g. General Discussion)
9. Click on the "New Topic" button to write a new topic. (This also works for post replies.)
10. You can check the box for "Post as Anonymous" before submitting your post or leave it unchecked.
11. If you checked the box, see that your username displays as "Anonymous" rather than your name.

# Where to Find the Automated Tests
The automated tests for this feature are found in `test/unit_test.js`. These tests check the behavior of
* Topic posts storing correctly if the post is anonymous or not.
* Post reply storing correctly if the reply is anonymous or not.

We had trouble actually running the tests, so these tests are just the general structure that we wanted but they do not run. We also could not figure out how to test UI changes besides with manual checking.

