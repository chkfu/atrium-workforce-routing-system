# Atrium - Workforce Routing System

<br/>

## Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Workflow](#workflow)
- [Installation / Initialisation](#installation--initialisation)
- [Technical Consideration and Limitations](#technical-consideration-and-limitations)
- [Dependencies](#dependencies)

<br/>

## Overview

Companies often lack consistent procedures on assigning the new hires for internal re-training and jobs, leading to high dropout rates, poor role fits and the waste of resources.

The Atrium Platform is a full-stack web application that systematically matches candidates with departments throughout the probation period, while enabling management to monitor assignment outcomes during the probation period.

It gives top management the structured visibility into assignment outcomes during probation, and lets them make smart changes to how things work.

<br/>

## Features

### A. Weighted Score and Evaluation Mechanism

Calculating candidate scores with configurable factors (e.g. background, interview performance, and training results). Adjustable weightings support flexible and consistent evaluation with comparisons.

### B. Preference-oriented Multi-Round Matching

Matching candidates and departments according to their preferences and department priorities. Unmatched candidates will be reassigned based on remaining quota after serveral rounds of screening.

### C. Comparable Evaluation of selection strategies

Systematically re-running the selection process with different configurations, comparing various outcomes (e.g. passing rate, dropout rate, preference satisfaction) for management decision.

<br/>

## Architecture

Atrium adopts domain-driven architecture with a layered backend to separate request handling, business logic and data access. Business features are organised into independent domain modules for enhancing maintainability and scalability.

### A. Request-Response Flow

This project illustrates the request-response lifecycle andhighlights the interaction between layers and the integration of Redis caching with the PostgreSQL database:

<p>
  <img src="docs/charts/chart_workflow_request-response.png" width="100%">
</p>

### B. Key Components

- Domain-driven modular organisation
- Layered API architecture (Routes → Controllers → Services → Repositories)
- React + Redux for frontend state management
- PostgreSQL and Redis for persistence and caching

For detailed architecture, module responsibilities, workflows, and design considerations, see **`architecture.md`**.

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
<i> Last Updated: Jun 27, 2026 </i>
