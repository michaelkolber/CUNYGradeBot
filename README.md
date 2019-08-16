# CUNYGradeBot
A Telegram bot for providing Queens College class and professor stats on demand

# Roadmap

## Commands and Parsing
### **/class**
Description: `Get info on a specific class, e.g. "PSCI240 S19 Schafer", or "psych1073 F18 sec2"`

Abilities:
- Find course via dept/number [, semester, professor, section]
- If multiple results, return a summary (and let the user know how to narrow their search)
    - Consider using inline callback buttons or in-message commands to allow user to see info for individual classes, or all classes
- Requires parsing:
    - Department / Course Number:
        - `dept course`
        - `deptCourse`
        - Short dept? E.g. `cs211`
    - Semester
        - `s[emester][ ]['][YY]YY`
        - Minimum required is one letter and 2 year digits. Optionally allow for full semester, space (can get tricky when parsing names, be careful), apostrophe for 2 year digits, or 4 year digits.
    - Professor
        - `lastname`
        - `firstInitial lastname`
        - `lastname, firstInitial`
        - `firstname lastname`
        - `lastname, firstname`
    - Section
        - `sec[tion][ ]secNumb`


### **/professor**
Description: `Get info on a specific professor, e.g. "Zakeri", or "T Kong", or "cohen (MUSIC)"`

Abilities:
    - Find a professor via their last name, first and last name, or name and department. Present a summary, optionally by year (perhaps add buttons for years).
    - Professors with the same first initial, last name, and subject are assumed to be the same professor.
    - Can add `(dept)` after any name to narrow to a specific department, based on the Subject column.
    - If there are multiple results, will prompt the user for which one. Combined summaries aren't very helpful here.
        - Allow users to combine departments, which will combine the professors for each department. E.g.,  professor T KONG teaches classes in MATH and CSIC. Searching for `kong, t (CSCI & MATH)` will yield a summary for teachers matching `T KONG` with a subject of `CSCI` or `MATH`.


### **/help**
Description: Detailed help for all available commands

- Write up a detailed help, similar to this document.



## Database
Probably going to use Redis, as it's super fast for lookups, and the data changes very infrequently.

### To-Do:
- Find a way to load the Excel data into Redis
    - See if Redis can save the DB and load it again instead of having to rebuild each time we start the app.
- Run requests through our parser, make the appropriate Redis queries, build a message, and return to user


## Misc
- Make sure the output looks nice. Remember that the target is mobile.


## Wishlist
- Update results based on edited messages (up to a certain point in history?)
- `/error` reports the message to the creator together with the results. Put it in the error messages too.