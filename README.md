# Atrium - Workforce Routing System

<br/>

## Contents

- [Overview](#overview)
- [Features](#features)
- [Installation / Initialisation](#installation--initialisation)
- [Architecture](#architecture)
- [Dependencies](#dependencies)

<br/>

## Overview

### A. Introduction

Companies often lack consistent procedures on assigning the new hires for internal re-training and jobs, leading to high dropout rates, poor role fits and the waste of resources.

The Atrium Platform is a full-stack web application that systematically matches candidates with departments throughout the probation period, while enabling management to monitor assignment outcomes during the probation period.

It provides the structured visibility into assignment outcomes during probation, and enable the management to review and adjust their strategies over time.

<br/>

### B. Origin and Redesign

This project was initially based on [Jonas Schmedtmann's Node.js Bootcamp](https://github.com/jonasschmedtmann/complete-node-bootcamp) 
— an online trip booking platform built with Pug, Express, and MongoDB.

It was subsequently transformed and redesigned into a talent selection platform, with the following changes made upon the original structure:

- **Architecture**: Improved from MVC to Domain-Driven Design with a 4-layer backend division of business logic from data access.
- **Tech stack**: Replaced JavaScript with TypeScript, MongoDB with PostgreSQL, and Pug with React.
- **New additions**: Introduced Redis caching, React Form, Tailwind CSS, Redux and logging.

<br/>

## Features

### A. Weighted Score and Evaluation Mechanism

Calculating candidate scores with configurable factors (e.g. background, interview performance, and training results). Adjustable weightings support flexible and consistent evaluation with comparisons.

### B. Preference-oriented Multi-Round Matching

Matching candidates and departments according to their preferences and department priorities. Unmatched candidates will be reassigned based on remaining quota after serveral rounds of screening.

### C. Comparable Evaluation of selection strategies

Systematically re-running the selection process with different configurations, comparing various outcomes (e.g. passing rate, dropout rate, preference satisfaction) for management decision.

<br/>

## Installation / Initialisation

For project setup, you need to install Node.js v18+, PostgreSQL, and Redis to proceed further.

Please clone the project at the <a href='https://github.com/chkfu/atrium-workforce-routing-system.git'>Github repository</a>.


### A. Server side setup (development environment)

Beginning with a new terminal, and run the CLI with the commands below:

```
$ cd server
$ npm install
$ npm run dev
```

The server will be available at `https://localhost:8080` (or specified).

### B. Client side setup (development environment)

For browser display, please start the second terminal and run the below commands:

```
$ cd client
$ npm install
$ npm run dev
```

The client will be available at `http://localhost:5173` (or specified).

<br/>

## Architecture

Atrium adopts domain-driven architecture with a layered backend to separate request handling, business logic and data access. Business features are organised into independent domain modules for enhancing maintainability and scalability.

<p>
  <img src="docs/charts/chart_design_domain-logic.png" width="100%">
</p>

### A. Request-Response Flow

This project illustrates the request-response lifecycle and highlights the interaction between layers and the integration of Redis caching with the PostgreSQL database:

<p>
  <img src="docs/charts/chart_workflow_request-response.png" width="100%">
</p>

### B. Key Components

- Domain-driven modular organisation
- Layered API architecture (Routes → Controllers → Services → Repositories)
- React + Redux for frontend state management
- PostgreSQL and Redis for persistence and caching

The server-side is organised into seven domain modules to keep logic independent, complying with the design principles of "low coupling, high cohesion" (see architecture.md for more design trade-offs and considerations).

<br/>

## Dependencies

| Scope  | Category          | Package            | Version |
| ------ | ----------------- | ------------------ | ------- |
| Client | Framework         | react              | ^18.3.1 |
| Client | Styling           | tailwindcss        | ^4.2.4  |
| Client | State Management  | redux              | ^4.2.0  |
| Server | Framework         | express            | ^5.2.1  |
| Server | Security          | express-rate-limit | ^8.3.1  |
| Server | Database          | pg                 | ^8.20.0 |
| Server | Cache             | redis              | ^5.12.1 |
| Server | Logging           | winston            | ^3.19.0 |

See `client/package.json` and `server/package.json` for the full package list.

<br/>

<i> Author: kchan </i>
</br>
<i> Last Updated: Jul 20, 2026 </i>
