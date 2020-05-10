---
title: Enable dark theme in Gatsby
date: 2020-05-09
description: Dark theme is a cool feature but also the toughest problem for this website. This post introduces a simple but effective way to enable the dark theme in a Gatsby site after a while of experimenting.
tags: ["react", "gatsby", "dark-theme", "tailwindcss"]
---

Dark themes are designed to reduce the luminance emitted by device screens and to improve visual ergonomics by reducing eye strain. However, it is perhaps the most complicated part of building my blog. I, therefore, feel it would be helpful to write down my experience when implementing the feature.

## Requirements

I'd been seeing a couple of blogs with dark theme support. The feature can be easily noticed by a switch to turn the dark theme on or off. Some of them even enable the dark theme as soon as I visit the site based on my machine setting. They are also able to store my preference so the website can render the proper theme when I revisit it. After that, I decided to implement the feature for my blog. It should:

- Have a switch to turn the dark theme on or off.
- Store user preferences so the blog can load it next time the user visits.

That sounds simple, right? No, it's not at least for me.

## Building layout

### Adding a switch

This is the easiest part first so I started with it. Thanks to [react-feather](https://github.com/feathericons/react-feather) I have two cool icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
and <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>. Next, I create a wrapper of them for reusing it in both the desktop navigation menu and the mobile navigation menu:

```tsx
const DarkModeSwitcher: FC = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const handleClick = (): void => {
    const newMode = !darkMode;
    setDarkMode(newMode);
  };

  return (
    <button onClick={handleClick}>
      {darkMode ? <Moon className="moon hidden" /> : <Sun className="sun" />}
    </button>
  );
};

export default DarkModeSwitcher;
```

This simple component uses the function `useState` which is a [React Hook](https://reactjs.org/docs/hooks-intro.html) to change the icon back and forth when there is a click. We will add the functionality to change the color theme later.

### Adding CSS

My website uses [Tailwindcss](https://tailwindcss.com/) which has no support for dark theme out of the box. Therefore, I need to create a CSS file to have different color schemes for light and dark variants. The `vars.css` would look like:

```css
:root {
  --color-background: theme("colors.gray.100");
  --color-foreground: theme("colors.gray.900");
  --color-primary: theme("colors.indigo.600");
  --color-surface: theme("colors.gray.200");
  --color-inline-surface: theme("colors.gray.300");
  --color-divider: theme("colors.gray.300");
  --color-red: theme("colors.red.700");
  --color-pink: theme("colors.pink.700");
  --color-green: theme("colors.green.700");
  --color-gray: theme("colors.gray.700");
  --color-orange: theme("colors.orange.700");
  --color-blue: theme("colors.blue.700");
  --color-yellow: theme("colors.yellow.700");
}

html[lights-out] {
  --color-background: theme("colors.gray.900");
  --color-foreground: theme("colors.gray.100");
  --color-primary: theme("colors.indigo.400");
  --color-surface: theme("colors.gray.800");
  --color-inline-surface: theme("colors.gray.700");
  --color-divider: theme("colors.gray.700");
  --color-red: theme("colors.red.300");
  --color-pink: theme("colors.pink.300");
  --color-green: theme("colors.green.300");
  --color-gray: theme("colors.gray.300");
  --color-orange: theme("colors.orange.300");
  --color-blue: theme("colors.blue.300");
  --color-yellow: theme("colors.yellow.300");
}
```

It has a light color scheme by default and a dark color scheme with the attribute `lights-out`. It means we only need to toggle the HTML attribute to switch from light theme and dark theme. To present that in codes, only one additional line of codes in the function `DarkModeSwitcher` is needed like below:

```tsx
const LIGHTS_OUT = "lights-out";

const handleClick = (): void => {
  const newMode = !darkMode;
  document.documentElement.toggleAttribute(LIGHTS_OUT, newMode); // new codes
  setDarkMode(newMode);
};
```

Having those variables is not enough, we need to use them in our codes. Here is an example of how to use them:

```css
* {
  background-color: var(--color-background);
  color: var(--color-foreground);
}
```

For those who may wonder, I use the default color palette from [TailwindCSS](https://tailwindcss.com/docs/customizing-colors#default-color-palette). Also, I use light gray and dark gray instead of `white` and `black` following [this guideline](https://material.io/design/color/dark-theme.html#properties).

## Storing user preference

For storage solution, I use `localStorage` because of its simplicity. Then there are two parts of the problem left which are storing to `localStorage` and loading from `localStorage`.

### Storing to localStorage

This is the easier part. I only need to add one line of codes to the function `handleClick`:

```tsx
window.localStorage.setItem(LIGHTS_OUT, mode ? "true" : "false");
```

Every time users click on the switch, we store the preference to `localStorage`.

### Loading from localStorage

Loading is trickier. Initially, I thought we only need these lines in the component constructor:

```tsx
const DarkModeSwitcher: FC = () => {
  const storedDarkMode = window.localStorage.getItem(LIGHTS_OUT) === "true"; // new codes
  const [darkMode, setDarkMode] = React.useState(storedDarkMode);
  // other codes
};
```

Then I realized that `gatsby build` would fail because `window` is not available when Gatsby render sites in server side aka [SSR](https://www.gatsbyjs.org/docs/glossary/server-side-rendering/). We could move client-only codes to `componentDidMount` by using the [`useEffect`](https://reactjs.org/docs/hooks-effect.html) hook. However, it would lead to a flickering issue for those we use dark theme because the site is loaded with light theme initially and it changes to dark right after rendered.

[React Context](https://reactjs.org/docs/context.html) then came into the picture. It allows us to have client-only codes in `gatsby-browser.js` and sends the data deep down to our `DarkModeSwitcher`. In detail, we will start with a new Context object to store whether it's in dark mode or not. I add `src/context/theme-mode.tsx` like:

```tsx
import React from "react";

const LIGHTS_OUT = "lights-out";

const getInitialDarkMode = (): boolean => {
  const darkMode = window.localStorage.getItem(LIGHTS_OUT);
  return darkMode === "true";
};

const defaultContext = {
  darkMode: false,
  setDarkMode: (_: boolean): void => {},
};

export const ThemeContext = React.createContext(defaultContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps) => {
  const [darkMode, setDarkModeState] = React.useState(getInitialDarkMode());

  const setDarkMode = (mode: boolean): void => {
    setDarkModeState(mode);
    document.documentElement.toggleAttribute(LIGHTS_OUT, mode);
    window.localStorage.setItem(LIGHTS_OUT, mode ? "true" : "false");
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

The Logic is very similar to our `DarkModeSwitcher` component. However, it introduces `getInitialDarkMode` to load information from `localStorage` and it uses that value as the initial state.

As we can get dark mode information from React Context, `DarkModeSwitcher` becomes simpler:

```tsx
const DarkModeSwitcher: FC = () => {
  const { darkMode, setDarkMode } = React.useContext(ThemeContext);
  const handleClick = (): void => {
    setDarkMode(!darkMode);
  };

  return (
    <button className="focus:outline-none" onClick={handleClick}>
      {darkMode ? <Moon /> : <Sun />}
    </button>
  );
};
```

In order for `DarkModeSwitcher` to load the data from `ThemeContext`, I need to wrap the application inside the Context Provider which means adding below lines to `gatsby-browser.js`:

```js
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
};
```

To wrap up, the website at this stage should have a button to switch from dark theme to light and vice versa. It is also able to store and load user preferences to and from `localStorage` for next visits.

### Flickering on the first load

Before going into the issue, here is how I tested the Gatsby site before production:

```shell
yarn build && yarn serve
```

Basically, it builds the site with production options and serves it under the default port 9000. Heading to `http://localhost:9000`, testing around, I found that the site flicker from the light theme to the dark theme on the first load. The reason is that the site was built without user's preferences and its default theme is the light theme. After loading from `localStorage`, it changes to the dark theme; hence, we see the site changes from the light theme to the dark theme very quickly.

My fix would require some knowledge of Gatsby. The idea is to add a piece of script on top of pre-rendered HTML codes so it is guaranteed to run before rendering the site. The script loads data from `localStorage` and updates the HTML attribute to ensure the site is rendered with the proper theme. In order to achieve this in Gatsby, I use the API `onRenderBody` in `gatsby-ssr.js`. The codes would look like:

```js
export const onRenderBody = ({ setHeadComponents }) => {
  const script = `
  const LIGHTS_OUT = "lights-out";
  const darkMode = window.localStorage.getItem(LIGHTS_OUT) === "true";
  document.documentElement.toggleAttribute(LIGHTS_OUT, darkMode);
  `;
  return setHeadComponents([
    <script
      key={`dark-mode-script`}
      dangerouslySetInnerHTML={{ __html: script }}
    />,
  ]);
};
```

Until now, the solution is complete. There is a switcher in order to turn the dark mode on and off. And the site is loaded with saved preference in local storage for next visit. And most importantly, there is no flickering between the light theme and the dark them when users open the site.

## Reactive CSS

The above approach gives give us a bunch of knowledge in React including `useState`, `useEffect` hooks and Context. However, there is a simpler approach by using CSS and I call it reactive CSS. Instead of maintain a React state, we use CSS to render the switcher properly:
```tsx
  return (
    <button
      onClick={handleClick}
      aria-label="Dark Mode"
    >
      <Moon className="moon" />
      <Sun className="sun" />
    </button>
  );
```
and its style is defined in css file:
```css
html[lights-out] .sun {
  @apply hidden;
}

html[lights-out] .moon {
  @apply block;
}

.moon {
  @apply hidden;
}
```
As the result, `Moon` icon or `Sun` icon will be displayed based on whether there is `lights-out` attribute in the root html or not. We no longer need `ThemeContext` nor `wrapRootElement` api in `gatsby-browser.js`. And `DarkModeSwitcher` no longer require an internal state. Instead, it loads and updates the html attribute directly:
```tsx
const DarkModeSwitcher: FC = () => {
  const handleClick = (): void => {
    const newMode = document.documentElement.toggleAttribute(LIGHTS_OUT);
    window.localStorage.setItem(LIGHTS_OUT, newMode ? "true" : "false");
  };
  return (
    <button>
    // codes
    </button>
  )
}
```
Codes becomes much shorter, hence, easier to maintain.

## Wrap up

I've used quite amount of Reach knowledge as well Gatsby knowledge in order to implement the dark mode. At the end, the ultimate solution come out much simpler.