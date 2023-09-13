import {
  Component,
  Prop,
  Listen,
  State,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Element,
} from '@stencil/core';
import { IconHorizontalEllipsis } from '../../../../icons/icon-horizontal-ellipsis';
import { KEYBOARD_ENTER, KEYBOARD_ESCAPE, KEYBOARD_SPACE } from '../../../modus-table.constants';
import { Table } from '@tanstack/table-core';
import { ModusTableToolbarOptions } from '../../../models/modus-table.models';

@Component({
  tag: 'modus-table-dropdown-menu',
  styleUrl: './modus-table-dropdown-menu.scss',
  shadow: true,
})
export class ModusTableDropdownMenu {
  @Element() element: HTMLElement; // Remove if not utilized

  /** Table data. */
  @Prop() table: Table<unknown>;

  /** dropdown menu options. */
  @Prop() options: ModusTableToolbarOptions;

  /** Dropdown visibility state */
  @State() show = false;

  @Listen('click', { target: 'document' })
  handleClickOutside(event: MouseEvent): void {
    // Closing the dropdown when click outside
    const withinBoundaries: EventTarget[] = event.composedPath();
    if (!withinBoundaries.find((item) => item['className'] === 'dropdown-menu-container')) {
      this.show = false;
    }
  }

  menuIconContainerRef: HTMLDivElement;

  handleIconKeyDown(event: KeyboardEvent) {
    const eventKey = event.key.toLowerCase();
    if (eventKey === KEYBOARD_ENTER || eventKey === KEYBOARD_SPACE) {
      this.show = true;
      event.preventDefault();
    } else if (eventKey === KEYBOARD_ESCAPE) {
      this.show = false;
      event.preventDefault();
    }
  }

  handleDropdownKeyDown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === KEYBOARD_ESCAPE) {
      this.show = false;
      this.menuIconContainerRef.focus();
      event.preventDefault();
    }
  }

  render(): void {
    return (
      <div class="dropdown-menu-container">
        <div
          tabIndex={0}
          class="dropdown-menu-icon"
          onClick={() => (this.show = !this.show)}
          onKeyDown={(event) => this.handleIconKeyDown(event)}
          ref={(el) => (this.menuIconContainerRef = el as HTMLDivElement)}>
          <IconHorizontalEllipsis size="20" />
        </div>
        <div onKeyDown={(event) => this.handleDropdownKeyDown(event)} class={`dropdown-menu ${this.show ? 'visible' : ''}`}>
          <modus-table-columns-visibility
            table={this.table}
            columnsVisibility={this.options?.columnsVisibility}
            showDropdown={this.show}
            menuIconContainerRef={this.menuIconContainerRef}
            toggleDropdown={(show: boolean) => (this.show = show)}
          />
        </div>
      </div>
    );
  }
}