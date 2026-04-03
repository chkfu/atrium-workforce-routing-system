<!--

Learnt:

The developer-guide.md file use to educate the future developers internally on
how to edit, expand and append the new elements.

It ensures future developers could make changes on the system within the
specific structure.

-->

# DEVELOPMENT GUIDE

<br/>

## Table of Contents

- [I. Overview](#i-overview)
- [II. Environment Setup](#ii-environment-setup)
- [III. Project Structure](#iii-project-structure)
- [IV. Workflow Logic](#iv-workflow-logic)
- [V. User Interface Guide](#v-user-interface-guide)
- [VI. Error Handling](#vi-error-handling)
- [VII. Trouble-shooting](#vii-trouble-shooting)
- [VIII. Testing](#viii-testing)

<br/>

## I. Overview

<br/>

## II. Environment Setup

<br/>

## II. Architecture Rationale

<br/>

## III. Project Structure

<br/>

## IV. Dataabse Setups

### A. Initialise Neon PostGre database

You may check the current postgresql version with:

```
$ psql --version
```

Please run the below CLI instructions at terminal if it has not been installed:

```
$ brew install postgresql@17
$ brew services start postgresql@17

```

Once installed, the initialised codes in `package.json` will be excuted by running:

```
$ npm run db:init
```

Finally, the designated codes will check whether the database and tables are available, in case missing tables leads to system crashes.

<br/>

## V. User Interface Guide

<br/>

## VI Error Handling

<br/>

## VII. Trouble-shooting

<br/>

<i> Author: kchan </i>
</br>
<i> Last Updated: </i>
