(function() {

  /* not implemented:
   *   italic
   *   blink
   *   invert
   *   strikethrough
   */
  var ansi2html, declare;
  declare = function(module_name, exports) {
    if (typeof module !== 'undefined') {
      module.exports = exports;
    }
    if (window) {
      window[module_name] = exports;
    }
  };
  ansi2html = function(str) {
    var open, props, style, stylemap, tag;
    props = {};
    open = false;
    stylemap = {
      bold: 'font-weight',
      underline: 'text-decoration',
      color: 'color',
      background: 'background'
    };
    style = function() {
      var style;
      var key, val;
      key = void 0;
      val = void 0;
      style = [];
      for (key in props) {
        val = props[key];
        if (!val) {
          continue;
        }
        if (val === true) {
          style.push(stylemap[key] + ':' + key);
        } else {
          style.push(stylemap[key] + ':' + val);
        }
      }
      return style.join(';');
    };
    tag = function(code) {
      var tag;
      var i, n;
      i = void 0;
      tag = '';
      n = ansi2html.table[code];
      if (open) {
        tag += '</span>';
      }
      open = false;
      if (n) {
        for (i in n) {
          props[i] = n[i];
        }
        tag += '<span style="' + style() + '">';
        open = true;
      } else {
        props = {};
      }
      return tag;
    };
    return str.replace(/\[(\d*;)?(\d+)*m/g, function(match, b1, b2) {
      var code, i, res;
      i = void 0;
      code = void 0;
      res = '';
      if (b2 === '' || b2 === null) {
        b2 = '0';
      }
      i = 1;
      while (i < arguments.length - 2) {
        if (!arguments[i]) {
          i++;
          continue;
        }
        code = parseInt(arguments[i]);
        res += tag(code);
        i++;
      }
      return res;
    }) + tag();
  };
  ansi2html.table = {
    0: null,
    1: {
      bold: true
    },
    3: {
      italic: true
    },
    4: {
      underline: true
    },
    5: {
      blink: true
    },
    6: {
      blink: true
    },
    7: {
      invert: true
    },
    9: {
      strikethrough: true
    },
    23: {
      italic: false
    },
    24: {
      underline: false
    },
    25: {
      blink: false
    },
    27: {
      invert: false
    },
    29: {
      strikethrough: false
    },
    30: {
      color: 'black'
    },
    31: {
      color: 'red'
    },
    32: {
      color: 'green'
    },
    33: {
      color: 'yellow'
    },
    34: {
      color: 'blue'
    },
    35: {
      color: '#800080'
    },
    36: {
      color: '#008080'
    },
    37: {
      color: 'white'
    },
    39: {
      color: null
    },
    40: {
      background: 'black'
    },
    41: {
      background: 'red'
    },
    42: {
      background: 'green'
    },
    43: {
      background: 'yellow'
    },
    44: {
      background: 'blue'
    },
    45: {
      background: '#800080'
    },
    46: {
      background: '#008080'
    },
    47: {
      background: 'white'
    },
    49: {
      background: null
    }
  };
  declare('ansi2html', ansi2html);
})();
