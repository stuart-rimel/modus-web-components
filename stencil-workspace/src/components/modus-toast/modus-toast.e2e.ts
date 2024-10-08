import { newE2EPage } from '@stencil/core/testing';

describe('modus-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast></modus-toast>');
    const element = await page.find('modus-toast');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to type', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast></modus-toast>');
    const component = await page.find('modus-toast');
    let element = await page.find('modus-toast >>> svg.icon-info');
    expect(element).toBeDefined();

    component.setProperty('type', 'warning');
    await page.waitForChanges();
    element = await page.find('modus-toast >>> svg.icon-warning');
    expect(element).toBeDefined();
  });

  it('renders changes to showIcon', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast></modus-toast>');
    const component = await page.find('modus-toast');
    let element = await page.find('modus-toast >>> svg.icon-info');
    expect(element).toBeDefined();

    component.setProperty('showIcon', 'false');
    await page.waitForChanges();
    element = await page.find('modus-toast >>> svg.icon-info');
    expect(element).toBeNull();
  });

  it('renders changes to dismissible', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast></modus-toast>');
    const component = await page.find('modus-toast');
    let element = await page.find('modus-toast >>> svg.icon-close');
    expect(element).toBeNull();

    component.setProperty('dismissible', 'true');
    await page.waitForChanges();
    element = await page.find('modus-toast >>> svg.icon-close');
    expect(element).toBeDefined();
  });

  it('emits dismissClick event on icon close click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast dismissible></modus-toast>');
    const dismissClick = await page.spyOnEvent('dismissClick');
    const element = await page.find('modus-toast >>> svg.icon-close');

    await element.click();
    await page.waitForChanges();
    expect(dismissClick).toHaveReceivedEvent();
  });

  it('renders aria-label on div when set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast aria-label="test label"></modus-toast>');
    const element = await page.find('modus-toast >>> .modus-toast');
    expect(element).toBeDefined();
    expect(element).toHaveAttribute('aria-label');
    expect(element.getAttribute('aria-label')).toEqual('test label');
  });

  it('does not render aria-label on div when not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast></modus-toast>');
    const element = await page.find('modus-toast >>> .modus-toast');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('does not render aria-label on div when set to empty string', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast aria-label=""></modus-toast>');
    const element = await page.find('modus-toast >>> .modus-toast');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('emits dismissClick event after 15000ms', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast></modus-toast>');
    const dismissClick = await page.spyOnEvent('dismissClick');

    await page.waitForTimeout(15000);
    expect(dismissClick).toHaveReceivedEvent();
  });

  it('emits dismissClick event after 15000ms', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast delay="10000"></modus-toast>');
    const dismissClick = await page.spyOnEvent('dismissClick');

    await page.waitForTimeout(10000);
    expect(dismissClick).toHaveReceivedEvent();
  });

  it('retains the element from the DOM when retainElement is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast retainElement="true" delay="1000"></modus-toast>');
    const dismissClick = await page.spyOnEvent('dismissClick');

    await page.waitForTimeout(1000);
    expect(dismissClick).toHaveReceivedEvent();

    const element = await page.find('modus-toast >>> .modus-toast');
    expect(element).toBeDefined();
  });

  it('removes the element in the DOM when retainElement is false', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast retainElement="false" delay="1000"></modus-toast>');
    const dismissClick = await page.spyOnEvent('dismissClick');

    await page.waitForTimeout(1000);
    expect(dismissClick).toHaveReceivedEvent();

    const element = await page.find('modus-toast >>> .modus-toast');
    expect(element).toBeNull();
  });
});
