import { screen } from '@testing-library/react';
import { renderAt } from './utils';

// The legacy flat URLs must keep working after the /events/qompute restructure,
// so old links / QR codes / search results don't break. Each old path should
// land on its nested page.
describe('legacy redirects', () => {
  it('redirects /speakers to the nested speakers page', async () => {
    renderAt('/speakers');
    expect(await screen.findByRole('heading', { name: /talks and panels/i })).toBeInTheDocument();
  });

  it('redirects /schedule to the nested schedule page', async () => {
    renderAt('/schedule');
    expect(await screen.findByRole('heading', { name: /how the event flows/i })).toBeInTheDocument();
  });

  it('redirects /registration to the nested register page', async () => {
    renderAt('/registration');
    expect(await screen.findByRole('heading', { name: /sign up for qompute in la/i })).toBeInTheDocument();
  });

  it('redirects /resources to the nested resources page', async () => {
    renderAt('/resources');
    expect(await screen.findByRole('heading', { name: /learn quantum before you compete/i })).toBeInTheDocument();
  });

  it('redirects /faq to the nested faq page', async () => {
    renderAt('/faq');
    expect(await screen.findByRole('heading', { name: /frequently asked questions/i })).toBeInTheDocument();
  });

  it('redirects /events to the qompute landing', async () => {
    renderAt('/events');
    expect(await screen.findByRole('heading', { name: /qompute in la/i })).toBeInTheDocument();
  });
});
