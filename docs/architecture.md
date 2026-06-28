<!--

Learnt:

The architecture.md file use to explain the principle of the system design,
answering the questions why certain layer and modules has been built.

The documents will insert the Lucid charts with few lines of descrition,
helping future developer to understanding the system rationale and maintain
efficient codes practice, and follow the established architectural practices.

-->

## ARCHITECTURE

This file records the plans and considerations of thre architecture design

<br/>

## General Design

### A. Overall Design

The Atrium Platform follows Domain-Driven Design, with a modular API pipeline of routes, controllers, services and repositories. Each layer focuses on their module specialties for clarifying boundaries between request handling, business logic and data access.

### B. Module-Based Organisation

RESTful API modules has been grouped into five key categories:

| Module Group     | Description                                       |
| ---------------- | ------------------------------------------------- |
| group_system     | System operational settings related.              |
| group_candidate  | New hires related, and their related information. |
| group_department | Departmental structure and agenda.                |
| group_selection  | Considerations related to pre-training intakes    |
| group_probation  | Considerations related to probational performance |
| group_hiring     | Considerations related to official hiring         |
| group_final      | Final Result of Intakes                           |

These core modules will support the two-tiered workflows for candidate selection as shown in below:

#### (1) Candidate Selection Flow

The multi-stage flow helps to track the candidates’ journey from application to final enrollment. It specifically centralises the raw data, serving for further performance and metrics evaluation in the major intaking periods -  <i>probational selection (phrase 1) and hiring selection (phrase 2)</i>.

<p>
  <img src="docs/charts/chart_domain_logic.png" width="100%">
</p>

### C. Layered Architecture

Each module contains API layers to ensure clear division of responsibilities between application flow and domain logic:

| Layer              | Responsibility                                                            |
| ------------------ | ------------------------------------------------------------------------- |
| Routes Layer       | Defines the API entry points and forward https requests to controllers.   |
| Controllers Layer  | Validates client inputs and https requests, forwarding tasks to services. |
| Services Layer     | Handles core business logics, receiving data for further transformation.  |
| Repositories Layer | Manages queries for direct database access.                               |

Each layer adheres with the single directional relationship, while processing the data with the top-down dependencies.  This model ensures layers to specialise to their logics and responsibilities, preventing over-coupling among the modules.


<br/>

## Project Structure

```
.
├── client/                         # Frontend application
│   ├── src/
│   │   ├── auth/                   # Authentication
│   │   ├── components/             # Shared layout components (Header, Footer, etc.)
│   │   ├── config/                 # Application configuration
│   │   ├── elements/               # Reusable UI components
│   │   ├── pages/                  # Application pages
│   │   ├── redux/                  # Global state management
│   │   ├── utils/                  # Shared types, helpers, and utilities
│   │   └── assets/                 # Static assets
│   └── ...
│
├── server/                         # Backend application
│   ├── src/
│   │   ├── auth/                   # Authentication
│   │   ├── core/                   # Base API classes and templates
│   │   ├── database/               # PostgreSQL, Redis, and database layer
│   │   ├── infra/                  # Infrastructure (logging, middleware, caching, SSL, etc.)
│   │   ├── modules/                # Domain-driven feature modules
│   │   │   └── <module-name>/
│   │   │       ├── *.routes.ts
│   │   │       ├── *.controller.ts
│   │   │       ├── *.service.ts
│   │   │       └── *.repository.ts
│   │   └── util/                   # Shared types, validation, configuration, errors
│   └── ...
│
└── docs/                           # Project documentation
```


<br/>

## Workflow

###  (A) Request-Response Flow

<p>
  <img src="docs/charts/chart_workflow_request-response.png" width="100%">
</p>


###  (B) State Management Flow

<p>
  <img src="docs/charts/chart_workflow_state_management.png" width="100%">
</p>


###  (C) Data Processing Flow

<p>
  <img src="docs/charts/chart_worrkflow_data-processing.png" width="100%">
</p>

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

## Technical Consideration and Limitations

### A. Design Trade-off

#### (1) Managing Complex Modular Structure

- Solution: Converted to layered structure with model, controller, service and repository modules, decoupling functionalities and logics for better maintenance.
- Tradeoff: New features requires to updates in more layers with additional efforts on managing module coordination and ensuring their completeness.

#### (2) Prevent Database Overloading

- Solution: Implemented Redis caching, rate limiting and lock, as the database-level shelter reducing loads and against race competition.
- Tradeoff: Requires additional redis handlers for the querying methods with more complex modular relations, plus extra costs for setup and maintain the redis server.

### B. Limitations

#### (1) Long-term Data Dependency

- The design has limitation handling frequent strategy changes, as each recruitment batch presented as vaiable factors. Lack of data consistency could harm the reliability and failed to match the fair test requirements.

#### (2) Limited refactorisation for Page Interface

- The client-side only adopted minor reusable components, but still yet to established modular structure causing by the complexity from table's specific columns and state management. Future improvements required.

<br/>