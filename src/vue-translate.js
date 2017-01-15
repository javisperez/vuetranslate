// We need a vue instance to handle reactivity
var vm = null;

// The plugin
const VueTranslate = {

    // Install the method
    install(Vue) {
        const version = Vue.version[0];

        if (!vm) {
            vm = new Vue({
                data() {
                    return {
                        current: '',
                        locales: {}
                    };
                },

                computed: {
                    // Current selected language
                    lang() {
                        return this.current;
                    },

                    // Current locale values
                    locale() {
                        if (!this.locales[this.current])
                            return null;

                        return this.locales[this.current];
                    }
                },

                methods: {
                    // Set a language as current
                    setLang(val) {
                        if (this.current !== val) {
                            if (this.current === '') {
                                this.$emit('language:init', val);
                            } else {
                                this.$emit('language:changed', val);
                            }
                        }

                        this.current = val;

                        this.$emit('language:modified', val);
                    },

                    // Set a locale tu use
                    setLocales(locales) {
                        if (!locales)
                            return;

                        let newLocale = Object.create(this.locales);

                        for (let key in locales) {
                            if (!newLocale[key])
                                newLocale[key] = {};

                            Vue.util.extend(newLocale[key], locales[key]);
                        }

                        this.locales = Object.create(newLocale);

                        this.$emit('locales:loaded', locales);
                    },

                    text(t) {
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
        Vue.mixin({
            [version === '1' ? 'init' : 'beforeCreate']() {
                this.$translate.setLocales(this.$options.locales);
            },

            methods: {
                // An alias for the .$translate.text method
                t(t) {
                    return this.$translate.text(t);
                }
            },

            directives: {
                translate: function (el) {
                    if (!el.$translateKey)
                        el.$translateKey = el.innerText;

                    let text = this.$translate.text(el.$translateKey);

                    el.innerText = text;
                }.bind(vm)
            }
        });

        // Global method for loading locales
        Vue.locales = (locales) => {
            vm.$translate.setLocales(locales);
        };
    }
};

if (typeof exports === 'object') {
    module.exports = VueTranslate; // CommonJS
} else if (typeof define === 'function' && define.amd) {
    define([], function () { return VueTranslate; }); // AMD
} else if (window.Vue) {
    window.VueTranslate = VueTranslate; // Browser (not required options)
    Vue.use(VueTranslate);
}