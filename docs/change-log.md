<!--

Learnt:

The CHANGRLOG.md file records the version-based changes of the system. It
store the trace that how the development teams add, edit, fix and remove
in each release.

While Git commit messages records the details of subsequent changes; however,
this files groups relevant changes into a clearer and human-recognisable
summaries for further maintenance.

-->

# CHANGELOG

This file records the major version changes of the projects.

<br/>

## [1.0.5] - Jul 7, 2026  - In Progress

<i>Objective: build basic authentication and implement id-specific sub-page of candidates, staff and department table </i>

### Added

- implemented redux for the shared state management among the webpages.
- implemented candidate details and education section at profile candidate page.
- provided new content for setup and maintenance guides at `developer-guide.md`.
- implemented user sign-up and log-in for authentication at the server-side.

### Edited

- refactored duplicated methods and yup schema under `utils/` folder for reusability.
- improved file structure of the `pages/` folder with reasonable page categorisation.
- refactored duplicated subsection section into reusable forms for record creation at profile candidate page.
- extracted architecture details from `architecture.md` and distilled content into architecture section at `readme.md`.

### Fixed

- fixed bug on creating candidate education record by eliminating score-related code.

<br/>

## [1.0.4] - Jun 19, 2026 

<i>Objective: implement CRUD management for core pages of manage candidate, manage staff and manage department.</i>

### Added

- initialised `client/` for the frontend building, empowered by tailwind-CSS and React.
- created data flow and UML diagram to outline the project and database structure.
- created user interfaces and basic CRUD functionalities for manage candidates page.
- created sorting methods and user interface for manage candidates page.
- created filtering methods and user interface for manage candidates page.
- replicated the basic setting to staff and department pages, with specific columns, params and state management.

### Edited

- re-organised `modules/` folder with categorised groups, improve better project structure for maintenance.
- split codebase of manage candidates page into modules, as future file management practice for huge webpages.
- updated `README.md` with core content of project objective, features, installation, architecture and dependencies.
- modularised the manage candidates page with extracted configuration and reusable element.
- adjusted the height of header for layout styling.

### Fixed

- fixed form create and form updates size with scrollable setting.

<br/>

## [1.0.3] - Apr 17, 2026

<i>Objective: implement authentication and candidate selection APIs with secure access control and validation.</i>

### Added

- setup redis database connection for fast cache memory, improving effectiveness of frequent and repeated queries.
- created routes, controllers and repositories for candidate-supported, selection-supported and probation-supported tables.
- implemented lock mechanism at`CacheService.ts` to prevent race condition with redis caching.
- implemented redis store with rate limit for cyber security and prefix for session management.

### Edited

- restructured the project into domain-driven design architecture to improve project maintenance.
- improved `BaseController.ts` and `BaseRepository.ts` with abstraction, preventing mistakenly use base classes.
- stremlined repeated codes with iterative route building at `server.ts`.
- disabled direct password-access methods at `SysUserController`, preventing inappropriate disclosure of confidential information.
- extracted service class at `CacheService.ts` for centralising cache management of the server side.

### Fixed

- fixed sendCommand syntax caused by specific format requried in node-redis, resumed redis client connection.

### Delete

- remove draft schema `schema_draft.sql` after finalised version is confirmed.

<br/>

## [1.0.2] - Apr 12, 2026

<i>Objective: establish core API architecture with centralised error handling and structured logging.</i>

### Added

- setup postgre database schema for regulating record inputs.
- setup centralised logging, global error handlers and its middlewares.
- setup centralised types and enums management.
- created basic crud for table `departments` and `staff`.

### Edited

- improved logging mechanism with rotation setting.
- improved error handling with fatal, sepcific postgre and operational errors.
- refactored the duplicated repository codes under centralised class at `BaseRepository.ts`.
- refactored the duplicated controller codes under centralised class at `BaseController.ts`.
- extended affiliated controllers and repositories for each table, inherited from their base classes.
- refined sql queries to prevent direct sql injection.
- re-organised file structure for the server side.

### Fixed

- fixed postgre warning of ssl related settings at `pool.ts`.

### Delete

- removed controller and repositories scripts for table `departments` and `staff`.

<br/>

## [1.0.1] - Apr 4, 2026

<i>Objective: initialise backend service with database connectivity and secure server configuration.</i>

### Added

- setup express server with https, ssl/tls and security settings.
- setup neon postgre database connection and structure of schema, routes, controllers and services.
- created wrapper function `handle_async` to streamlined repeated try-catch procedures.
- created centralised collection for reused types at `/types`.

### Fixed

- resolved bug of `create` methods not in async by implementing promise at departments controller.

<br/>

## [1.0.0] - Mar 28, 2026

<i>Objective: setup the project base.</i>

### Added

- create `server` and `docs` folders for project initialisation.
