import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Die from './Die';

describe('Die Component', () => {
  const mockSetHeld = vi.fn(); // Mock function for setHeld
  const dieMock = { id: '1', face: 3, isHeld: false }; // Mock die object

  it('renders with correct face value', () => {
    render(<Die die={dieMock} setHeld={mockSetHeld} />);
    
    // Check if the face value is rendered correctly
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('applies correct backgorund color when isHeld is true', () => {
    const dieMockHeld = { ...dieMock, isHeld:true};

    render(<Die die={dieMockHeld} setHeld={mockSetHeld} />);
    expect(screen.getByText('3')).toHaveStyle('background-color: #59E391');
  });

  it('calls setHeld with correct id when clicked', () => {
    render(<Die die={dieMock} setHeld={mockSetHeld} />);
    
    // Simulate a click event on the die
    fireEvent.click(screen.getByText('3'));

    // Check if the setHeld function was called with the correct id
    expect(mockSetHeld).toHaveBeenCalledWith('1');
  })


});