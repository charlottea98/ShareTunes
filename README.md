[Find hosted application here!](https://coffee-app-60321.web.app/)

**Short description of your project:**

We have created a musical sharing website where you can create a profile
and share your favourite music with friends. 

**What you have done:**
Currently you can create a new user as well as log in to your profile.
There you can see a homepage , profile page and feed page. Currently the feed
page is not implemented. From the homepage you can search for a song which
will fetch all songs including the searchword and show them. 

**What you still plan to do:**
We plan for the users to be able to customize their profile pages more and make
posts that will show on the feed for other users. We will also make it available
for users to browse through other user profiles. 

**Your project file structure (short description/purpose of each file):**

In our current skeleton we have an outer src-folder. In this folder we the app.tsx files
handling the navigation on the site as well as all essential firebase and react files. This folder also includes two subfolders,  components and contexts.  We have also separated our Profile, Feed and Home views which in turn is further broken down into its tinier components.


In components we have both common components that will be reused such as buttons as well as a folder with all the different pages that you can access on the site. In the context folder we keep context files which act as a global states. Currently we only have a context for logged in users making sure what user is logged in at the moment but we might add more contexts later. 
