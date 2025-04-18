import { newE2EPage } from '@stencil/core/testing';

describe('modus-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-checkbox></modus-checkbox>');

    const element = await page.find('modus-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('default renders to no label', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');

    const label = await page.find('modus-checkbox >>> label');
    expect(label).toBeNull();
  });

  it('renders changes to the label', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    const component = await page.find('modus-checkbox');

    component.setProperty('label', 'Hello, world!');
    await page.waitForChanges();

    const label = await page.find('modus-checkbox >>> label');
    expect(label.textContent).toBe('Hello, world!');
  });

  it('renders changes to the disabled prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox label="Hello, World!"></modus-checkbox>');
    const component = await page.find('modus-checkbox');

    component.setProperty('disabled', 'true');
    await page.waitForChanges();

    const input = await page.find('modus-checkbox >>> input');
    expect(input).toHaveAttribute('disabled');

    const checkbox = await page.find('modus-checkbox >>> .checkbox');
    expect(checkbox).toHaveClass('disabled');

    const label = await page.find('modus-checkbox >>> label');
    expect(label).toHaveClass('disabled');
  });

  it('renders changes to the checked prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    const component = await page.find('modus-checkbox');

    component.setProperty('checked', 'true');
    await page.waitForChanges();

    const input = await page.find('modus-checkbox >>> input');
    expect(await input.getProperty('checked')).toBeTruthy();
  });

  it('emits checkboxClick event on checkbox click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    const checkboxClick = await page.spyOnEvent('checkboxClick');
    const element = await page.find('modus-checkbox >>> .modus-checkbox');
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();
    expect(checkboxClick).toHaveReceivedEvent();
  });

  it('does not emit checkboxClick event on disabled checkbox click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox disabled></modus-checkbox>');
    const checkboxClick = await page.spyOnEvent('checkboxClick');
    const element = await page.find('modus-checkbox >>> .modus-checkbox');
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();
    expect(checkboxClick).not.toHaveReceivedEvent();
  });

  it('updates input checked on click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    const modusCheckbox = await page.find('modus-checkbox');
    const element = await page.find('modus-checkbox >>> .modus-checkbox');
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();

    const input = await page.find('modus-checkbox >>> input');
    expect(await modusCheckbox.getProperty('checked')).toBeTruthy();
    expect(await input.getProperty('checked')).toBeTruthy();

    await element.click();
    await page.waitForChanges();

    expect(await modusCheckbox.getProperty('checked')).toBeFalsy();
    expect(await input.getProperty('checked')).toBeFalsy();
  });

  it('updates indeterminate correctly', async () => {
    /*
      Indeterminate cannot be set to true through a click, only programmatically.
      This means, once the user clicks the checkbox, indeterminate is only able to be set again through JS.
      Indeterminate and checked can both be true (with the indeterminate dash taking visual precedence).
      This should not be confused with a "tri-state" where it's either checked, unchecked, or indeterminate.
    */

    const page = await newE2EPage();

    await page.setContent('<modus-checkbox checked="false" indeterminate="true"></modus-checkbox>');
    const modusCheckbox = await page.find('modus-checkbox');
    const element = await page.find('modus-checkbox >>> .modus-checkbox');
    await page.waitForChanges();

    const input = await page.find('modus-checkbox >>> input');
    expect(await modusCheckbox.getProperty('checked')).toBeFalsy();
    expect(await input.getProperty('checked')).toBeFalsy();
    expect(await modusCheckbox.getProperty('indeterminate')).toBeTruthy();
    expect(await input.getProperty('indeterminate')).toBeTruthy();

    await element.click();
    await page.waitForChanges();

    expect(await modusCheckbox.getProperty('checked')).toBeTruthy();
    expect(await input.getProperty('checked')).toBeTruthy();
    expect(await modusCheckbox.getProperty('indeterminate')).toBeFalsy();
    expect(await input.getProperty('indeterminate')).toBeFalsy();

    await element.click();
    await page.waitForChanges();

    expect(await modusCheckbox.getProperty('checked')).toBeFalsy();
    expect(await input.getProperty('checked')).toBeFalsy();
    expect(await modusCheckbox.getProperty('indeterminate')).toBeFalsy();
    expect(await input.getProperty('indeterminate')).toBeFalsy();
  });
  it('renders with medium size', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    const modusCheckbox = await page.find('modus-checkbox');

    expect(await modusCheckbox.getProperty('size')).toBe('medium');
  });

  it('renders with small size property', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox size="small"></modus-checkbox>');
    const modusCheckbox = await page.find('modus-checkbox');

    expect(await modusCheckbox.getProperty('size')).toBe('small');
  });

  it('renders aria-label on alert div when set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox aria-label="test label"></modus-checkbox>');
    let element = await page.find('modus-checkbox >>> input');
    expect(element).toBeDefined();
    expect(element).toHaveAttribute('aria-label');
    expect(element.getAttribute('aria-label')).toEqual('test label');
  });

  it('does not render aria-label on alert div when not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    let element = await page.find('modus-checkbox >>> input');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('does not render aria-label on alert div when set to empty string', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox aria-label=""></modus-checkbox>');
    let element = await page.find('modus-checkbox >>> input');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('selects checkbox on space keydown', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-checkbox></modus-checkbox>');
    const modusCheckbox = await page.find('modus-checkbox');
    const input = await page.find('modus-checkbox >>> input');
    await page.waitForChanges();

    await input.press('Space');
    await page.waitForChanges();

    expect(await modusCheckbox.getProperty('checked')).toBeTruthy();
    expect(await input.getProperty('checked')).toBeTruthy();
  });
});
