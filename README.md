# Gradebot
A Telegram bot for providing Queens College class and professor stats on demand.


# Running Gradebot
## Setup
First, you need to initialize and update the Classbase submodule. To do that, clone this 
repo using `git clone --recurse-submodules https://github.com/michaelkolber/gradebot`. 
This will initialize the submodule inside the `classbase/` directory.

If you've already cloned the repo, you can just run `git submodule update --init` inside 
the repo.

## Starting Gradebot
Make sure you have Docker installed. Then, inside the main directory, run 
`docker-compose up -d`. You can use `docker-compose logs -f` to see the logs in realtime.

To stop Gradebot, run `docker-compose down`. (To make sure everything is cleaned up when 
shutting down Gradebot, run `docker-compose down -v` instead. **This will clear the database.**)

## Populating the Database
Copy your `distribution.csv` file into `classbase/database/data/`. It should be taken from 
the "COMBINED" sheet in the grade distribution Excel file.

Then, run `npm run populate`.


# Info
Gradebot is comprised of two separate components:

1. The chatbot itself. This is implemented in Node.js using the 
[Telegraf](https://github.com/telegraf/telegraf) framework.
2. [Classbase](https://github.com/michaelkolber/classbase), a Postgres-powered database 
and associated Node.js (Express) API of courses and professors in CUNY (right now only 
Queens College). The README in that repo goes into more detail about its construction.

The entire thing is bundled into a series of Docker containers. The code assumes that it 
will be run in Docker, although this should not be difficult to change should the need arise.


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


### To-Do:
- Run requests through our parser, make the appropriate Redis queries, build a message, and return to user
- String sanitization
- Properly handle and return error messages


## Misc
- Make sure the output looks nice. Remember that the target is mobile.


## Wishlist
- Update results based on edited messages (up to a certain point in history?)
- `/error` reports the message to the creator together with the results. Put it in the error messages too.