# elsparkcyklar-app
This project is part of the course *vteam* at Blekinge Tekniska Högskolan.
All the background material for this project can be accessed at the course's webpage at [dbwebb.se](https://dbwebb.se/kurser/vteam-v1).

**Table of contents**
- [elsparkcyklar-app](#elsparkcyklar-app)
  - [Clone this repository](#clone-this-repository)
  - [Workflow](#workflow)
    - [Important](#important)
    - [Collection of other useful git commands](#collection-of-other-useful-git-commands)
  - [Run application](#run-application)
  - [Database](#database)

## Clone this repository

```
# clone repo with https
https://github.com/elemoser/elsparkcyklar-app.git

# clone repo with ssh
git clone git@github.com:elemoser/elsparkcyklar-app.git

# initiate version control
git init
```

The easiest way to clone this repository is to do so with an SSH key for your account.
If you are unsure whether you have an SSH key already, you can follow [this guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys?platform=linux) to check your *~/.ssh* file.
If you do not have a SSH key added to your account yet, follow the steps below:

* [create a new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key) 
* [add the key to your account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account#adding-a-new-ssh-key-to-your-account)
* clone repository with `git clone git@github.com:elemoser/elsparkcyklar-app.git`

## Start-up and important notes

### Start app:

From /elsparkcyklar-app run:
```
docker compose up sqlite-db
```

Then:
```
docker compose up dev-server webapp
```

Head to "localhost:5173" and login with your GitHub account to start biking!

### IMPORTANT

Backend is running at localhost:1338. The API is procected by Oauth-tecnology. You can't reach the information unless you are authenticated (logged in). If you are planning to use the API for your own project, you need to comment out this line at ROW 77 in APP.JS:
```
app.use(isAuthenticated);
```
The API-documenatation can be found [here](https://github.com/elemoser/elsparkcyklar-app/wiki).

### Start simulation:

From /elsparkcyklar-app run:
```
docker compose up sqlite-db
```

Then:
```
docker compose up dev-server-test webapp
```

Head to "localhost:5173/simulation" and fill in your desired values. Hit the start-button!

## Workflow

We follow a [branch-based workflow](https://docs.github.com/en/get-started/quickstart/github-flow). We consider **origin/main** to be the main branch where the source code of HEAD always reflects a production-ready state. We consider **origin/develop** to be the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release. When the source code in the develop branch reaches a stable point and is ready to be released, all of the changes should be merged back into main and then tagged with a release number (ex. v1.0).

![Gitflow](gitflow.png "Gitflow")

[Soure: Atlassian](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

**Main branch**
* Only fully tested and approved code is merged into main.
* Only merge code into main from the develop branch.
* Code is merged by means of a pull request, which needs to be approved by a team member.

**Develop branch**
* Develop serves as the integration and testing branch.
* Features and bug fixes are developed in feature branches and merged into develop when ready for integration.
* Continuous Integration (CI) pipelines run on this branch to ensure code quality.

Next to the main and develop branches, our development model uses a variety of supporting branches to aid parallel development between team members, ease tracking of features, prepare for production releases and to assist in quickly fixing live production problems. Unlike the main branches, these branches always have a limited life time, since they will be removed eventually.

**Developement Branches**
* New features, bug fixes and hotfixes are developed in separate feature branches branched off develop.
* Give the branch a short and descriptive name (for example "freature/login-page"). 
* Before merging your developement branch into, create a pull request and ask for code review.

In order to create a development branch for your particular task follow these steps:

1. Start a new feature or bug fix by branching off develop.
1. Regularly pull from develop into your feature branch to stay up-to-date with the latest changes.
1. When your feature or bug fix is ready, create a pull request (PR) to merge it back into develop ([how to set up a PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request#creating-the-pull-request)).
1. Ask at least one of your team mates to review your PR.
    - If the code passes the thorpough testing of the assigned reviewer, the PR is accepted.
    - If the code does needs clarification or does not pass the testing of the reviewer, you will be requested to make changes.
1. Once the PR is accepted by the assigned reviewer, the PR is merged into the develop branch.
1. When no longer needed delete the feature/bug fix branch.

> **_NOTE:_** The default branch is *main*. When setting up your PR, make sure to merge your *feature* branch into the *develop* branch!

### IMPORTANT
Before pushing your changes in a feature branch to GitHub, make sure that your branch holds the latest updates from the *develop* branch.
By always running the following commands before making a new upload we can avoid publishing outdated code.
```
# Make sure you stand in the branch you want to publish
git checkout bugfix

# Get the latest version of *develop*
git pull origin develop --rebase

# This might cause code conflicts. It's kind of the point. Solve them manually...

# After solving the conflicts you can complete the upload as usual
git push -u origin bugfix
```

### Collection of other useful git commands
```
# Creates a new branch called bugfix
git branch bugfix

# Switches to the bugfix branch
git checkout bugfix

# View all local branches
git branch

# Deletes the bugfix branch
git branch -d bugfix

# Pushing the branch and its changes to remote (repo) for the first time
git push -u origin bugfix

# View all remote branches
git branch -r

# View all branches
git branch -a
```

## Run application
Use docker-compose to run the application.

```
# start server
docker-compose up server

# start server in background
docker-compose up -d server

# start server in development mode
# (refreshes after updates)
docker-compose up dev-server

# start database (sqlite)
docker-compose up sqlite-db

# start webapp in development mode
docker-compose up webapp

# shut down all containers
docker-compose down
```
## Database
```
# initiate database creation with docker
docker-compose up sqlite-db

The database (bikr.db) is created when the sqlite-db container is initiated. Use the path ./db:/db" as a volume in docker-compose.yml
to add the database in server or dev-server (backend). 
Initiating the sqlite-db overwrites any existing local db/bikr.db file you may already have upon container initialization.
The database design is based on our first proper database modelling draft on [Miro](https://miro.com/app/board/uXjVNUOg_Os=/).
```
