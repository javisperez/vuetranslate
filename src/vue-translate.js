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
                    locale() {
                        if (!this.locales[this.current])
                            return null;

                        return this.locales[this.current];
                    }
                },

                methods: {
                    setLang(val) {
                        this.current = val;
                        this.$emit('translate:language', val);
                    },

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