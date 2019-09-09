/****************************************************
# string     
# Page/Class name : string
# Author : Dilip Kumar Shaw
# Created Date : 11/07/2019
# Functionality : toBoolean, contain, isDigit, toPlural, toSlug, ucwords, isPatternMatch, rTrim, lTrim
# Purpose : This is a custom string related functions.
*****************************************************/
//==================================================================

_.mixin({

    toBoolean: function (value) {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return !_.isEmpty(value)
    },

    contain: function (string, s) {
        return (string.indexOf(s) >= 0);
    },

    isDigit: function (s) {
        return !isNaN(s);
    },

    toPlural: function (string, revert) {

        var plural = {
            '(quiz)$': "$1zes",
            '^(ox)$': "$1en",
            '([m|l])ouse$': "$1ice",
            '(matr|vert|ind)ix|ex$': "$1ices",
            '(x|ch|ss|sh)$': "$1es",
            '([^aeiouy]|qu)y$': "$1ies",
            '(hive)$': "$1s",
            '(?:([^f])fe|([lr])f)$': "$1$2ves",
            '(shea|lea|loa|thie)f$': "$1ves",
            'sis$': "ses",
            '([ti])um$': "$1a",
            '(tomat|potat|ech|her|vet)o$': "$1oes",
            '(bu)s$': "$1ses",
            '(alias)$': "$1es",
            '(octop)us$': "$1i",
            '(ax|test)is$': "$1es",
            '(us)$': "$1es",
            '([^s]+)$': "$1s"
        };

        var singular = {
            '(quiz)zes$': "$1",
            '(matr)ices$': "$1ix",
            '(vert|ind)ices$': "$1ex",
            '^(ox)en$': "$1",
            '(alias)es$': "$1",
            '(octop|vir)i$': "$1us",
            '(cris|ax|test)es$': "$1is",
            '(shoe)s$': "$1",
            '(o)es$': "$1",
            '(bus)es$': "$1",
            '([m|l])ice$': "$1ouse",
            '(x|ch|ss|sh)es$': "$1",
            '(m)ovies$': "$1ovie",
            '(s)eries$': "$1eries",
            '([^aeiouy]|qu)ies$': "$1y",
            '([lr])ves$': "$1f",
            '(tive)s$': "$1",
            '(hive)s$': "$1",
            '(li|wi|kni)ves$': "$1fe",
            '(shea|loa|lea|thie)ves$': "$1f",
            '(^analy)ses$': "$1sis",
            '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': "$1$2sis",
            '([ti])a$': "$1um",
            '(n)ews$': "$1ews",
            '(h|bl)ouses$': "$1ouse",
            '(corpse)s$': "$1",
            '(us)es$': "$1",
            's$': ""
        };

        var irregular = {
            'move': 'moves',
            'foot': 'feet',
            'goose': 'geese',
            'sex': 'sexes',
            'child': 'children',
            'man': 'men',
            'tooth': 'teeth',
            'person': 'people'
        };

        var uncountable = [
            'sheep',
            'fish',
            'deer',
            'moose',
            'series',
            'species',
            'money',
            'rice',
            'information',
            'equipment'
        ];

        // save some time in the case that singular and plural are the same
        if (uncountable.indexOf(string.toLowerCase()) >= 0)
            return string;

        // check for irregular forms
        for (word in irregular) {
            if (revert) {
                var pattern = new RegExp(irregular[word] + '$', 'i');
                var replace = word;
            } else {
                var pattern = new RegExp(word + '$', 'i');
                var replace = irregular[word];
            }
            if (pattern.test(string)) {
                return string.replace(pattern, replace);
            }
        }

        if (revert) {
            var array = singular;
        } else {
            var array = plural
        };

        // check for matches using regular expressions
        for (reg in array) {
            var pattern = new RegExp(reg, 'i');

            if (pattern.test(string)) {
                return string.replace(pattern, array[reg]);
            }
        }

        return string;
    },

    toSlug: function (string) {
        return string.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    },

    ucwords: function (string) {
        str = string.toLowerCase();
        return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
            function ($1) {
                return $1.toUpperCase();
            });
    },

    isPatternMatch: function (string, pattern) {
        var pattern = pattern.toString().replace('*', '+');
        if (string.match(pattern)) {
            return true;
        }
        return false;
    },

    rTrim: function (string, s) {
        if (s == undefined)
            s = '\\s';

        s = _.isArray(s) ? s : [s];

        _.each(s, (v) => {
            string = string.replace(new RegExp("[" + s + "]*$"), '');
        });
        return string;
    },

    lTrim: function (string, s) {
        if (s == undefined)
            s = '\\s';

        s = _.isArray(s) ? s : [s];

        _.each(s, (v) => {
            string = string.replace(new RegExp("^[" + v + "]*"), '');
        });
        return string;
    }
});
//==================================================================