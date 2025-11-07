# Folder Structure Guide

This document explains the organization of all project folders based on the PRD.

---

## 📁 Folder Organization

### `1-Product-Overview/`
Product-level documentation and strategy
- **Purpose/** - Product purpose and vision
- **Core-Value/** - Value proposition and messaging
- **Success-Metrics/** - Metrics tracking and analytics

### `2-User-Flows/`
User experience flows and scenarios
- **Happy-Path/** - Ideal user journey
- **Edge-Cases/** - Error handling and edge cases

### `3-Frontend-Components/`
All frontend React/Next.js components
- **Landing-Page/** - Main entry point component
- **Score-Display/** - Score and breakdown display
- **Email-Gate/** - Email capture modal
- **Before-After-Rewrite/** - Side-by-side comparison
- **Upgrade-Prompt/** - Upgrade/payment modal

### `4-Backend-Components/`
N8N workflows and backend logic
- **Analysis-Workflow/** - Score analysis workflow
- **Rewrite-Workflow/** - AI rewrite workflow
- **Usage-Tracking/** - Usage tracking logic

### `5-Data-Storage/`
Data storage configuration
- **Google-Sheets/** - Google Sheets setup and configuration
- **Email-Storage/** - Email storage logic

### `6-Integrations/`
Third-party service integrations
- **OpenAI/** - OpenAI API integration
- **Stripe/** - Payment integration
- **Google-Sheets/** - Google Sheets API integration

### `7-Technical-Specs/`
Technical specifications and architecture
- **Tech-Stack/** - Technology stack decisions
- **API-Endpoints/** - API documentation
- **Environment-Variables/** - Environment configuration
- **Deployment/** - Deployment guides

### `8-Implementation-Phases/`
Phase-by-phase implementation
- **Phase-1-MVP/** - MVP deliverables
- **Phase-2-Polish/** - Polish and optimization
- **Phase-3-Monetization/** - Payment integration

### `9-N8N-Setup/`
N8N workflow setup and configuration
- **Analysis-Workflow/** - Analysis workflow setup
- **Rewrite-Workflow/** - Rewrite workflow setup
- **Google-Sheets-Setup/** - Google Sheets configuration

### `10-Testing/`
Testing documentation and test files
- **Unit-Tests/** - Component and function tests
- **Integration-Tests/** - API and workflow tests
- **E2E-Tests/** - End-to-end user flow tests

### `11-Documentation/`
Additional documentation
- **API-Docs/** - API documentation
- **User-Guides/** - User-facing documentation
- **Deployment-Guides/** - Deployment instructions

---

## 📋 How to Use This Structure

1. **When working on a component:** Navigate to the relevant folder in `3-Frontend-Components/` or `4-Backend-Components/`
2. **When documenting flows:** Add files to `2-User-Flows/`
3. **When setting up integrations:** Use `6-Integrations/`
4. **When testing:** Store test files in `10-Testing/`
5. **When documenting:** Add to `11-Documentation/`

---

## 🎯 Quick Reference

| What You're Working On | Folder Location |
|----------------------|----------------|
| Frontend component | `3-Frontend-Components/[Component-Name]/` |
| N8N workflow | `4-Backend-Components/[Workflow-Name]/` |
| API documentation | `7-Technical-Specs/API-Endpoints/` |
| Integration setup | `6-Integrations/[Service-Name]/` |
| Test files | `10-Testing/[Test-Type]/` |
| Deployment guides | `7-Technical-Specs/Deployment/` |

---

## 📝 Notes

- Each folder contains a README.md explaining its purpose
- Store related files in their respective folders
- Keep this structure organized as the project grows
- Reference the PRD in `planning/PRD.md` for detailed specifications







