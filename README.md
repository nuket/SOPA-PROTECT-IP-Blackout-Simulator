January 1, 2012
Originally written by Max Vilimpoc, this file is released to the public domain.
All copyright rights are hereby disclaimed.

This is what SOPA and PROTECT-IP will make the Internet look like.

http://en.wikipedia.org/wiki/SOPA
http://en.wikipedia.org/wiki/PROTECT_IP_Act

Requirements to use this:

   Zepto or jQuery, loaded before this script.

Styling information for users:

div.blackoutOverlay { background-color: #000; color: #fff; z-index: 1000; opacity: 1; }

   Mutable: background-color, color, z-index, opacity
 Immutable: position, overflow

div.blackoutOverlay a { color: red; }

   Mutable: all CSS properties (though you probably don't want to mess with anything other
            than the color and pseudo-classes)

Exempting certain DIVs from being blacked out

   Make sure they have the CSS class "blackoutExempt" set.