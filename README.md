

# Autocomplete Component

This is a simple autocomplete component built using React and Typescript. It allows the user to enter a search term and suggests matches based on data provided through a mock data.

## Installation

To use this component in your own project, follow these steps:

- Clone this repository to your local machine.
- Navigate to the root directory of the project in your terminal.
- Run npm install to install all dependencies. (react, react-dom and react-script)
- Run npm start and navigate to localhost:3000

## Component Features


The Autocomplete component has the following features:

- Real-time suggestions as the user types
- Keyboard navigation using arrow keys
- Selection of items using keyboard or mouse click
- Debouncing to limit API requests
- Optional maximum number of suggestions to display


## Usage


- onSearch: A function that is called every time the user types in the input field. It receives a string parameter representing the current value of the input field and should return a Promise that resolves to an array of AutoCompleteOptionItem objects. These objects represent the suggestions to be displayed in the dropdown list.

- onSelect: A function that is called when the user selects an item from the dropdown list. It receives an AutoCompleteOptionItem object representing the selected item.

- placeholder: A string representing the placeholder text to be displayed in the input field.

- debounceTime: A number representing the debounce time in milliseconds for the onSearch function. This means that the onSearch function will be called only after this amount of time has passed since the user's last keystroke.

- maxSuggestions: A number representing the maximum number of suggestions to be displayed in the dropdown list.


To use the autocomplete component in your project, simply import the `Autocomplete` component from `src/components/autocomplete` and use it in your own React component. Here's an example:

```
import { useState } from "react";
import Autocomplete, { AutoCompleteOptionItem } from "./components/autocomplete";
import db from "./db/db.json";

function App() {
  const [selectedItem, setSelectedItem] = useState<AutoCompleteOptionItem | null>();

  const _onSearch = (value: string): Promise<AutoCompleteOptionItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filterResults = db.filter((result) =>
          result.name.toLowerCase().includes(value.toLowerCase())
        );
        resolve(filterResults);
      }, 1000);
    });
  };

  const _onSelect = (item: AutoCompleteOptionItem | null) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <Autocomplete
        onSearch={_onSearch}
        onSelect={_onSelect}
        placeholder="Search for a users..."
        debounceTime={300}
        maxSuggestions={10}
      />
    </div>
  );
}
```
