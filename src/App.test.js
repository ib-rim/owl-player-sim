import { render, screen } from '@testing-library/react';
import App from './App';

test('renders help button', () => {
    render(<App />);
    const helpButton = screen.getByText("?");
    expect(helpButton).toBeInTheDocument();
});

test('renders mental stat bar', () => {
    render(<App />);
    const statBar = screen.getByText('Mental');
    expect(statBar).toBeInTheDocument();
});

test('renders game sense stat bar', () => {
    render(<App />);
    const statBar = screen.getByText('Game Sense');
    expect(statBar).toBeInTheDocument();
});

test('renders mechanics stat bar', () => {
    render(<App />);
    const statBar = screen.getByText('Mechanics');
    expect(statBar).toBeInTheDocument();
});

test('renders physical health stat bar', () => {
    render(<App />);
    const statBar = screen.getByText('Physical Health');
    expect(statBar).toBeInTheDocument();
});

test('renders scrim button', () => {
    render(<App />);
    const actionButton = screen.getByText(/scrim/i);
    expect(actionButton).toBeInTheDocument();
});

test('renders exercise button', () => {
    render(<App />);
    const actionButton = screen.getByText(/exercise/i);
    expect(actionButton).toBeInTheDocument();
});

test('renders relax button', () => {
    render(<App />);
    const actionButton = screen.getByText(/relax/i);
    expect(actionButton).toBeInTheDocument();
});

test('renders ranked button', () => {
    render(<App />);
    const actionButton = screen.getByText(/ranked/i);
    expect(actionButton).toBeInTheDocument();
});

test('renders change player name button', () => {
    render(<App />);
    const actionButton = screen.getByText(/change player name/i);
    expect(actionButton).toBeInTheDocument();
});