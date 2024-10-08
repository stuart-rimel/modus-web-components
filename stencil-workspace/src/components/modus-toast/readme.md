# modus-toast



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                      | Type                                                                                    | Default     |
| --------------- | ---------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------- |
| `ariaLabel`     | `aria-label`     | (optional) The toast's aria-label.                                               | `string`                                                                                | `undefined` |
| `delay`         | `delay`          | (optional) Time taken to dismiss the toast                                       | `number`                                                                                | `15000`     |
| `dismissible`   | `dismissible`    | (optional) Whether the toast has a dismiss button.                               | `boolean`                                                                               | `undefined` |
| `retainElement` | `retain-element` | (optional) Whether to retain the element in the DOM after it has been dismissed. | `boolean`                                                                               | `false`     |
| `role`          | `role`           | (optional) Role taken by the toast.  Defaults to 'status'.                       | `string`                                                                                | `'status'`  |
| `showIcon`      | `show-icon`      | (optional) Whether to show the toasts' icon.                                     | `boolean`                                                                               | `true`      |
| `type`          | `type`           | (optional) The toasts' type.                                                     | `"danger" \| "dark" \| "default" \| "primary" \| "secondary" \| "success" \| "warning"` | `'default'` |


## Events

| Event          | Description                                     | Type               |
| -------------- | ----------------------------------------------- | ------------------ |
| `dismissClick` | An event that fires when the toast is dismissed | `CustomEvent<any>` |


----------------------------------------------


