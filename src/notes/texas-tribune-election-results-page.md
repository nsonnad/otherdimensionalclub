---
layout: note
title: Texas Tribune election results page
date: 2026-03-18
description: 
medium: Django/Javascript data pipeline
image: 2026/tribune-elections-1.png
tags: 
external: 
categories:
  - code
  - data
  - journalism
---

I was contracted by the lovely folks over at the [Texas Tribune](https://www.texastribune.org) to manage their election results page for the 2026 Texas primaries. See the [final result here](https://apps.texastribune.org/features/2026/primary-election-results-2026/).

{% clickableImage "2026/tribune-elections-1.png" "Screenshot of the election results page with a map of US Senate results" "Screenshot of the election results page with a map of US Senate results" %}

The results page is made up of a data pipeline that pulls live data from the Associated Press [Elections API](https://developer.ap.org/ap-elections-api/) into the Tribune's Django app. The data is then processed into a JSON file that is read by a JavaScript frontend.

I can't take credit for the system and design as it was created by a previous Tribune employee. However I was tasked with understanding how the pipeline works in order to get it up and running smoothly on election night. Which I did! There were virtually no hiccups while election results came in. I also made several changes to the frontend as requested, like supporting more options in how the page can be embedded throughout the rest of the Tribune's election coverage.

{% clickableImage "2026/tribune-elections-2.png" "Screenshot of the election results page with a table of Agriculture Commissioner results" "Screenshot of the election results page with a table of Agriculture Commissioner results" %}

Overall, the project went very smoothly and I got some good experience working with live election data.
