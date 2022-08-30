![Add to Calendar TimeZone iCal Library](https://github.com/add2cal/timezones-ical-library/blob/main/readme-header.png?raw=true)

<br />

# Add to Calendar TimeZones iCal Library

The tool to convert the [IANA (formerly Olson) timezone database files](http://www.iana.org/time-zones) into VTIMEZONE blocks, compatible with the iCalendar specification (RFC2445).

It is based on the awesome tool by Damon Chaplin ([github.com/libical/vzic](https://github.com/libical/vzic)), but only provides the VTIMEZONE part to easily put this into any other iCal generator (like the [add-to-calendar-button](https://github.com/add2cal/add-to-calendar-button)). It is built to be used standalone or as JavaScript module, hosted as npm package.

<br /><br />

---

<br />

## 📦 Installation / Setup

### 1. Update it

**This step is only relevant if you want to build the package from source!**

(Requires Node.js as well as Linux as operating system.)

Run 

```
sudo sh update-tzdata.sh tzVersionNumber
```

with *tzVersionNumber* being the version of the timezone database you want to use (e.g. sudo sh update-tzdata.sh 2022c).

<br />

### 2. Load it

There are basically 2 options how you can use the script.

#### A. VanillaJS

You can use the VanillaJS version from the dist folder or simply the jsDelivr CDN:

```
<script src="https://cdn.jsdelivr.net/npm/timzones-ical-library"></script>
```

#### B. npm package

```
npm install timezones-ical-library
```

After the installation, you can then either ...
- require the package (commonJS) or ...
- import the module (ES) via `import { tzlib_get_ical_block } from 'timezones-ical-library';`.

### 3. Use it

Use `tzlib_get_ical_block(tzName)` function to return the proper iCal VTIMEZONE block for a given timezone string (tzName).

Use `tzlib_get_timezones()` to retrieve a list of all available timezone strings. You can pass `true` to retrieve a JSON formatted string instead of an array.

<br /><br />

---

<br />

## 🙌 Contributing

Anyone is welcome to contribute, but mind the [guidelines](.github/CONTRIBUTING.md):

- [Bug reports](.github/CONTRIBUTING.md#bugs)
- [Feature requests](.github/CONTRIBUTING.md#features)
- [Pull requests](.github/CONTRIBUTING.md#pull-requests)

<br />

## 📃 Copyright and License

Licensed under [Apache-2.0](LICENSE).

<br />

## ⚡ Changelog (without minor changes and fixes)

- v1.0 : initial release
