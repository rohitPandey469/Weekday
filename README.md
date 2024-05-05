# Weekday - Steps for setup
Step-1: git clone url
Step-2: npm install or yarn install
Step-3: npm run dev

Important-
1. The Filter takes little time to load - so please wait.
2. The Remote and Stack filter doesn't work as not provided in the API
3. Deployed link : [https://weekday-task.netlify.app/](https://weekday-task.netlify.app)
4. Posted 12 days ago is only fixed data in the whole page

Points About Project-
1. Two actions used 
    - fetchJobs(offsetValue, loaderOff)
    - fetchJobsbasedOnFilter(filterParams,offsetValue, loaderOff)
    - The Offsetvalue is used to fetch the next batch and concate with already jobs present if offsetValue == 0 then don't concate
    - The filterParams is having values and if any value present then filter the jobs based on that here concate aswell for load more
2. Infinite Scroll as user reaches the end of the page fetch new batch and add it to the existing ones.
3. When any value in the filters change then fetchJobs with offset 0 - additional check if any filter having value then dispatched fetchJobsBasedOnFilter action else fetchJobs action.
4. Similarly, for handleScroll which activates only when reaches at the bottom of the page - if any filters having value then called first action else the normal action.
5. As soon as any filter value change it starts fetching the jobs with those filters.


