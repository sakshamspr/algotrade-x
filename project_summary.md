# Project Summary: Algotrade X (Presentation Edition)

Algotrade X is a high-fidelity, presentation-grade fintech frontend designed to showcase a "best-in-class" investment and trading experience. The primary goal is to WOW viewers with a premium interface, sophisticated animations, and a feature-rich simulation of a complete fintech ecosystem.

## Technology Stack

- **Core**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Charting**: Recharts, TradingView Lightweight Charts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM

## Architecture Overview

The project follows a standard React directory structure:

- `src/components`: UI components, categorized into general components and low-level UI primitives.
- `src/pages`: Main view components (Landing, Choice, Risk-based portfolios, Details, etc.).
- `src/services`: API abstraction layers for market data and AI completions.
- `src/store`: Global state management using Zustand.
- `src/data`: Mock data used to simulate backend responses.
- `src/hooks`: Custom React hooks for shared logic.
- `src/lib`: Utility functions and library configurations.
- `src/types`: TypeScript interfaces and types.

## Core Features

1.  **Risk-Based Portfolios**: Separate views for Low, Moderate, and High-risk investment strategies.
2.  **Market Intelligence**: Live tickers, IPO details, fund tracking, and buyback information (simulated).
3.  **Bot X AI Assistant**: A conversational AI interface powered by GROQ (Llama 3) for financial analysis.
4.  **Interactive Charting**: Dynamic stock history charts with multiple timeframes.
5.  **Portfolio Management**: Visual breakdown of holdings, positions, and orders.
6.  **Responsive Design**: A fluid layout that adapts to different screen sizes, wrapped in a unified `AppShell`.

## Current State

The frontend is highly polished with smooth transitions and a modern aesthetic. However, it currently relies heavily on **mock data** within the service layer. The API endpoints are defined but catch errors to return local mock objects, making it ideal for demonstration but requiring backend integration for production use.
