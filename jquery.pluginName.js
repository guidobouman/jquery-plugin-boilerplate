// Utility for creating objects in older browsers
if ( typeof Object.create !== 'function' ) {
  Object.create = function( obj ) {

    function F() {}
    F.prototype = obj;
    return new F();

  };
}

/*!
 * jQuery Plugin Boilerplate
 * Version 0.1.0
 *
 * Requires:
 * - jQuery 1.7.1 or higher (Works with the API changes from 1.9.1 too)
 *
 * https://github.com/guidobouman/jquery-plugin-boilerplate
 *
 * Copyright 2013, Guido Bouman
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Date: Wed Feb 13 16:05:00 2013 +0100
 */
(function($, window, document, undefined)
{
  var pluginName = 'highlightSnap';
  var storageName = 'plugin_' + pluginName;

  var pluginObject = {

    exampleVariable: 0,

    init: function(options, element) {

      var self = this;

      self.$window = $(window);
      self.$document = $(document);

      self.element = element;
      self.$element = $(element);

      self.options = $.extend(true, {}, $.fn[pluginName].options, options);

      self.bind();

      return self;

    },

    bind: function() {

      var self = this;

      // Do binds
      self.bindProxied(self.$element, 'click', self.exampleMethod);

    },

    bindProxied: function($element, event, method) {

      var self = this;

      $element.on(event + self.options.namespace, $.proxy(function(e)
      {
        return method.call(self, e);
      }, self));

    },

    destroy: function() {

      var self = this;

      // Remove all binds from element
      self.$element.off(self.options.namespace);

      // Remove plugin instance from object
      self.$element.removeData(storageName);

    },

    exampleMethod: function(e) {

      var self = this;

      self.exampleVariable++;
      alert('Clicked ' + self.exampleVariable + ' times!');

    }

  };

  $.fn[pluginName] = function(options) {

    var args = Array.prototype.slice.call(arguments);

    return this.each(function() {

      var pluginInstance = $.data(this, storageName);
      if(typeof options === 'object' || options === 'init' || ! options) {
        if(!pluginInstance) {
          if(options === 'init') {
            options = args[1] || {};
          }

          pluginInstance = Object.create(pluginObject).init(options, this);
          $.data(this, storageName, pluginInstance);
        } else {
          $.error('Plugin is already initialized for this object.');
          return;
        }
      } else if(!pluginInstance) {
        $.error('Plugin is not initialized for this object yet.');
        return;
      } else if(pluginInstance[options]) {
        var method = options;
        options = args.slice(1);
        pluginInstance[method].apply(pluginInstance, options);
      } else {
        $.error('Method ' +  options + ' does not exist on jQuery.panelSnap.');
        return;
      }

    });

  };

  $.fn[pluginName].options = {
    key: 'value'
  };

})(jQuery, window, document);
