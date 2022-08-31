
#
# You will need to set this to the directory that the Olson timezone data
# files are in.
#
OLSON_DIR ?= tzdata

# This is used to create unique IDs for each VTIMEZONE component.
# The prefix is put before each timezone city name. It should start and end
# with a '/'. The first part, i.e. 'myorganization.org' below, should be
# a unique vendor ID, e.g. use a hostname. The part after that can be
# anything you want. We use a date and version number for libical. The %D
# gets expanded to today's date. There is also a vzic-merge.pl which can be
# used to merge changes into a master set of VTIMEZONEs. If a VTIMEZONE has
# changed, it bumps the version number on the end of this prefix. */
TZID_PREFIX ?= /timezones-ical-library/

#
# You shouldn't need to change the rest of the file.
#

GLIB_CFLAGS = `pkg-config --cflags glib-2.0`
GLIB_LDADD = `pkg-config --libs glib-2.0`

CFLAGS = -g -DOLSON_DIR=\"$(OLSON_DIR)\" -DTZID_PREFIX='"$(TZID_PREFIX)"' $(GLIB_CFLAGS) $(LIBICAL_CFLAGS)

OBJECTS = vzic.o vzic-parse.o vzic-dump.o vzic-output.o

all: vzic

vzic: $(OBJECTS)
	$(CC) $(OBJECTS) $(GLIB_LDADD) -o vzic


# Dependencies.
$(OBJECTS): vzic.h
vzic.o vzic-parse.o: vzic-parse.h
vzic.o vzic-dump.o: vzic-dump.h
vzic.o vzic-output.o: vzic-output.h

clean:
	-rm -rf vzic $(OBJECTS) *~ ChangesVzic RulesVzic ZonesVzic RulesPerl ZonesPerl

.PHONY: clean perl-dump


