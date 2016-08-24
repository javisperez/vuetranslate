Vue.use(VueTranslate);

Vue.component('sample-header', {
    name: 'sample-header',

    locales: {
        es_DO: {
            'Welcome to Vue Translate!': 'Bienvenido a Vue Translate!',
            'Try changing the language to': 'Prueba cambiando el idioma a',
            'English': 'Inglés',
            'Spanish': 'Español'
        }
    },

    methods: {
        setLang(lang) {
            this.$translate.setLang(lang);
        }
    },

    template: `<header>
            <div v-translate>
                <slot></slot>
            </div>
            <div>
                {{ t('Try changing the language to') }}:
                <span @click="setLang('en_US')" v-translate :class="{'current': $translate.current === 'en_US'}">English</span>
                <span @click="setLang('es_DO')" v-translate :class="{'current': $translate.current === 'es_DO'}">Spanish</span>
            </div>
        </header>`
});

Vue.component('sample-content', {
    name: 'sample-content',

    locales: {
        es_DO: {
            'Hello there!': 'Hola!',
            'While this, is.': 'Mientras que este, si.',
            'Reactivity': 'Reactividad',
            'And it\'s completely reactive, let\'s try with dynamic content!': 'Y es completamente reactivo, probemos con contenido dinámico!',
            'Or even computed properties.': 'O incluso con propiedades computadas.',
            '(Remember to change the language to spanish to see the translations)': '(Reacuerda cambiar el idioma a inglés para que veas la traducción)',
            'hello world': 'hola mundo',
            'Hello world': 'Hola mundo',
            'Hello World': 'Hola Mundo',
            'HELLO WORLD': 'HOLA MUNDO',
        }
    },

    data() {
        return {
            sampleInput: '',
            computedInput: ''
        };
    },

    computed: {
        translatedInput() {
            return this.t(this.computedInput);
        }
    },

    template: `<section class="sample-content">
                <h1 v-translate>Hello there!</h1>
                <p class="no-translation">This text is not being translated.</p>
                <p v-translate>While this, is.</p>

                <h2 v-translate>Reactivity</h2>

                <div class="form input">
                    <label v-translate>And it's completely reactive, let's try with dynamic content!</label>
                    <small v-translate>(Remember to change the language to spanish to see the translations)</small>

                    <input type="text" v-model="sampleInput" placeholder="Try typing 'hello world'" />
                </div>

                <div class="form result">{{ t(sampleInput) }}</div>

                <div class="form input">
                    <label v-translate>Or even computed properties.</label>
                    <small v-translate>(Remember to change the language to spanish to see the translations)</small>

                    <input type="text" v-model="computedInput" placeholder="Try typing 'hello world' again" />
                </div>

                <div class="form result">{{ translatedInput }}</div>
        </section>`
})

new Vue({

    created() {
        this.$translate.setLang('en_US');
    },

    template: `<div>
            <sample-header>Welcome to Vue Translate!</sample-header>

            <sample-content></sample-content>
        </div>`

}).$mount('#app');