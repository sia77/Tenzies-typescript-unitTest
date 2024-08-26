import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import {generateRadNum} from './App';

describe('App component', ()=>{

    it("generate random number between min, and max", ()=>{
        const min:number = 1;
        const max:number = 6;
        const result:number = generateRadNum(min, max)
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
    })

})