import { writable } from 'svelte/store';

export const photos = writable(0);

export const loading = writable(0);

export const error = writable(0);

export const selectedYear = writable(0);