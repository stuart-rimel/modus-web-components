# modus-chip



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                    | Type                   | Default     |
| --------------- | ---------------- | ------------------------------------------------------------------------------ | ---------------------- | ----------- |
| `active`        | `active`         | (optional) Whether the chip is active.                                         | `boolean`              | `false`     |
| `advancedChip`  | `advanced-chip`  | (optional) Whether the chip is in advanced state                               | `boolean`              | `undefined` |
| `ariaLabel`     | `aria-label`     | (optional) The chip's aria-label.                                              | `string`               | `undefined` |
| `chipId`        | `chip-id`        | (optional) the chip's id                                                       | `string`               | `undefined` |
| `chipStyle`     | `chip-style`     | (optional) The chip's style.                                                   | `"outline" \| "solid"` | `'solid'`   |
| `disabled`      | `disabled`       | (optional) Whether the chip is disabled.                                       | `boolean`              | `false`     |
| `hasError`      | `has-error`      | (optional) Whether the chip has an error.                                      | `boolean`              | `false`     |
| `imageUrl`      | `image-url`      | (optional) The image's url.                                                    | `string`               | `undefined` |
| `maxWidth`      | `max-width`      | (optional) Maximum width for the Chip's text and shows ellipsis when truncated | `string`               | `undefined` |
| `showCheckmark` | `show-checkmark` | (optional) Whether to show the checkmark.                                      | `boolean`              | `false`     |
| `showClose`     | `show-close`     | (optional) Whether to show the close icon.                                     | `boolean`              | `false`     |
| `size`          | `size`           | (optional) The chip's size.                                                    | `"medium" \| "small"`  | `'medium'`  |
| `value`         | `value`          | (optional) The chip's value.                                                   | `string`               | `undefined` |


## Events

| Event        | Description                              | Type               |
| ------------ | ---------------------------------------- | ------------------ |
| `chipClick`  | An event that fires on chip click.       | `CustomEvent<any>` |
| `closeClick` | An event that fires on close icon click. | `CustomEvent<any>` |


## Shadow Parts

| Part           | Description |
| -------------- | ----------- |
| `"chipbutton"` |             |


## Dependencies

### Used by

 - [modus-autocomplete](../modus-autocomplete)

### Graph
```mermaid
graph TD;
  modus-autocomplete --> modus-chip
  style modus-chip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


