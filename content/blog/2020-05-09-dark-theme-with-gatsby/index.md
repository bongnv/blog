---
title: Enable dark theme in Gatsby
date: 2020-05-09
description: Dark theme is a cool feature but also the toughest problem for this website. This post introduces a simple but effective way to enable dark theme in a Gatsby site after a while of experimenting.
tags: ["react", "gatsby", "dark-theme"]
---

Dark themes are designed to reduce the luminance emitted by device screens and to improve visual ergonomics by reducing eye strain. However, it maybe the most complicated part of building my blog. I therefore feel it would be helpful to write down my experience when implement the feature.

## Requirements

I'd been seeing a couple of blogs with dark theme support. The feature can be easily noticed by a switch to turn the dark theme on or off. Some of them even enable the dark theme as soon as I visit the site based on my machine setting. They are also able to store my preference so the website can render the proper theme when I revisit it. After that, I decided to implement the feature for my blog. It should:

- Have a switch to turn the dark theme on or off.
- Store user preferences so the blog can load it next time the user visits.

That sounds simple, right? No it's not at least for me.

## Adding a switch

This is the easiest part first so I started with it. Thanks to [react-feather](https://github.com/feathericons/react-feather) I have two cool icons: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
and <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>. I'm going to have a wrapper of them because I can easily reuse it for both desktop navigation menu and mobile navigation menu.
