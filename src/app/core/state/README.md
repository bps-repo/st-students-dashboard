# NGRX State Management

This directory contains the NGRX state management implementation for the application.

## Installation

To install the necessary NGRX packages, run the following command:

```bash
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools @ngrx/router-store --save
```

## Structure

The state management is organized as follows:

- `index.ts` - Exports all state-related functionality
- `app.state.ts` - Defines the root state interface
- `reducers/` - Contains all reducers
- `actions/` - Contains all actions
- `effects/` - Contains all effects
- `selectors/` - Contains all selectors

## Features

The state management is divided into the following features:

- Auth - For managing authentication state
- Units - For managing units state
- Alerts - For managing alerts state
