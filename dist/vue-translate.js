/**
 * VueTranslate plugin v1.1.0
 *
 * Handle basic translations in VueJS
 *
 * This is a plugin to handle basic translations for a component in VueJS. * @author Javis Perez <javisperez@gmail.com>
 * https://github.com/javisperez/vuetranslate
 * Released under the MIT License.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

// We need a vue instance to handle reactivity
var vm = null;

// The plugin
var VueTranslate = {

    // Install the method

    install: function (Vue) {
        var _Vue$mixin;

        var version = Vue.version[0];

        if (!vm) {
            vm = new Vue({
                data: function () {
                    return {
                        current: '',
                        locales: {}
                    };
                },


                computed: {
                    locale: function () {
                        if (!this.locales[this.current]) return null;

                        return this.locales[this.current];
                    }
                },

                methods: {
                    setLang: function (val) {
                        this.current = val;
                    },
                    setLocales: function (locales) {
                        if (!locales) return;

                        var newLocale = Object.create(this.locales);

                        for (var key in locales) {
                            if (!newLocale[key]) newLocale[key] = {};

                            Vue.util.extend(newLocale[key], locales[key]);
                        }

                        this.locales = Object.create(newLocale);
                    },
                    text: function (t) {
                        if (!this.locale || !this.locale[t]) {
                            return t;
                        }

                        return this.locale[t];
                    }
                }
            });

            Vue.prototype.$translate = vm;
        }

        // Mixin to read locales and add the translation method and directive
        Vue.mixin((_Vue$mixin = {}, _Vue$mixin[version === '1' ? 'init' : 'beforeCreate'] = function () {
            this.$translate.setLocales(this.$options.locales);
        }, _Vue$mixin.methods = {
            t: function (t) {
                return this.$translate.text(t);
            }
        }, _Vue$mixin.directives = {
            translate: function (el) {
                if (!el.$translateKey) el.$translateKey = el.innerText;

                var text = this.$translate.text(el.$translateKey);

                el.innerText = text;
            }.bind(vm)
        }, _Vue$mixin));
    }
};

if (typeof exports === 'object') {
    module.exports = VueTranslate; // CommonJS
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        return VueTranslate;
    }); // AMD
} else if (window.Vue) {
    window.VueTranslate = VueTranslate; // Browser (not required options)
    Vue.use(VueTranslate);
}

})));