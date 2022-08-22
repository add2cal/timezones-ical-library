![Add to Calendar TimeZone iCal Library](https://github.com/add2cal/timezones-ical-library/blob/main/readme-header.png?raw=true)

<br />

# Add to Calendar TimeZones iCal Library

The tool to convert the [IANA (formerly Olson) timezone database files](http://www.iana.org/time-zones) into VTIMEZONE files compatible with the iCalendar specification (RFC2445).

It is based on the awesome tool by Damon Chaplin ([github.com/libical/vzic](https://github.com/libical/vzic)), but only provides the VTIMEZONE part to easily put this into any other iCal generator (like the [add-to-calendar-button](https://github.com/add2cal/add-to-calendar-button)). It is built to be used standalone or as JavaScript module, hosted as npm package.

<br /><br />

---

<br />

## 📦 Installation / Setup

### 1. Update it

**This step is only relevant if you want to build the package from source!**

Simply run `sh update-tzdata.sh tzVersionNumber` with *tzVersionNumber* being the version of the timezone database you want to use (e.g. sh update-tzdata.sh 2022c).

### 2. Use it

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

Licensed under [GPL-3.0](LICENSE).

<br />

## ⚡ Changelog (without minor changes and fixes)

- v1.0 : initial release
