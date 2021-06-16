// eslint-disable-next-line
import { Component, Element, Event, EventEmitter, h, Listen, Prop, State } from '@stencil/core';
import { IconTriangleDown } from '../icons/icon-triangle-down';
import { createGuid } from '../../utils/utils';

@Component({
  tag: 'modus-select',
  styleUrl: 'modus-select.scss',
  shadow: true,
})
export class ModusSelect {
  /** (optional) Whether the input gets focus automatically on page load. */
  // @Prop() autofocus: boolean;

  /** (optional) Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** (optional) The input's error text. */
  @Prop() errorText: string;

  /** (optional) The input's helper text. */
  @Prop() helperText: string;

  /** (optional) The input label. */
  @Prop() label: string;

  /** (optional) The number of visible options in a drop-down list. */
  // @Prop() numberOfOptions = 5;

  /** The options for the dropdown list. */
  @Prop() options: unknown[] = [];

  /** The options property to render in the dropdown list. */
  @Prop() optionsDisplayProp: string;

  /** (optional) Whether the input is required. */
  @Prop() required: boolean;

  /** (optional) The input's size. */
  @Prop() size: 'medium' | 'large' = 'medium';

  /** (optional) The input's valid text. */
  @Prop() validText: string;

  /** (optional) The input value. */
  @Prop() value: unknown;

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<unknown>;

  @Element() el: HTMLElement;

  @State() activeItemIndex = 0;

  @State() visible: boolean;

  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large']
  ]);

  @Listen('click', { target: 'document' })
  documentClickHandler(event: MouseEvent): void {
    if (!event.defaultPrevented) {
      if ((event.target as HTMLElement).closest('modus-select')) {
        this.visible = !this.visible;
      } else {
        this.visible = false;
      }

      // Reset activeItemIndex when closed.
      if (!this.visible) {
        this.activeItemIndex = 0;
      }
    }
  }

  @Listen('keydown')
  elementKeydownHandler(event: KeyboardEvent): void {
    if (!this.visible || this.el.shadowRoot.activeElement.tagName !== 'BUTTON') { return; }

    switch (event.key) {
      case 'ArrowDown':
        this.activeItemIndex = this.activeItemIndex + 1 < this.options.length ? this.activeItemIndex + 1 : this.activeItemIndex;
        break;
      case 'ArrowUp':
        this.activeItemIndex = this.activeItemIndex - 1 > 0 ? this.activeItemIndex - 1 : 0;
        break;
      case 'Enter':
        this.value = this.options[this.activeItemIndex];
        this.activeItemIndex = 0;
        break;
      case 'Tab':
        this.visible = false;
        this.activeItemIndex = 0;
        break;
    }
  }

  handleItemSelect(option: unknown): void {
    this.value = option;
    this.valueChange.emit(option);
    (this.el.shadowRoot.querySelector('button') as HTMLElement).focus();
  }

  render(): unknown {
    const buttonClass = `${this.classBySize.get(this.size)} ${this.errorText ? 'error' : this.validText ? 'valid' : ''}`;
    const dropdownListClass = `dropdown-list ${this.visible ? 'visible' : 'hidden'} ${this.classBySize.get(this.size)}`;
    const inputContainerClass = `input-container ${this.visible ? 'dropdown-visible' : ''}`;

    return (
      <div>
        <div class={'label-container'}>
          {this.label ? <label>{this.label}</label> : null}
          {this.required ? <span class="required">*</span> : null}
        </div>
        <div class={inputContainerClass}>
          <button class={buttonClass} disabled={this.disabled} type="button">
            <div class="dropdown-text">{this.value ? this.value[this.optionsDisplayProp] : null}</div>
            <IconTriangleDown size={'12'} />
          </button>
          <div class={dropdownListClass}>
            {
              this.options.map((option, index) =>
              <div
                class={`dropdown-list-item ${index === this.activeItemIndex ? 'active' : ''}`}
                key={createGuid()}
                onClick={() => this.handleItemSelect(option)}
                onMouseEnter={() => this.activeItemIndex = index}>
                {option[this.optionsDisplayProp]}
              </div>
            )}
          </div>
        </div>
        {
          this.errorText ? <label class="sub-text error">{this.errorText}</label> :
          this.validText ? <label class="sub-text valid">{this.validText}</label> :
          this.helperText ? <label class="sub-text helper">{this.helperText}</label> :
          null
        }
      </div>
    );
  }
}