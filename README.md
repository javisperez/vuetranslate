## VueTranslate

A VueJS (1.x, 2.0+) plugin for basic translations.

### What is this?

Is a plugin to handle basic translations for your components, it adds a mixin and a directive to handle it the most comfortable way.

### Like Vue-i18n?

Yes and no, Vue-i18n is a great plugin and is a lot more complete than this. This handle translations too, but is a more basic idea and smaller file (is just *one* file!).

### What to expect?

Just translations, it is that simple.

## Example
```javascript
import Vue from 'vue';
import VueTranslate from 'vue-translate-plugin';

Vue.use(VueTranslate);

var myComp = Vue.extend({
	template: `<div>
	        {{ t('Hello World') }}
	        <span v-translate>How are you?</span>
	    </div>`,
    
    mounted() {
        // Define what language you want to use.
        // This can be called in something like a header with a language selector menu
        // Or any other case, doesnt need to be called in all components, but
        // at least in one, so it sets the global language of the plugin
    	this.$translate.setLang('es_DO');
    },

    // The translations itself, keyed by language or anything else you one
    locales: {
    	es_DO: {
        	'Hello World': 'Hola Mundo',
        	'How are you?': 'Como estás?'
        }
    }
});

var vm = new Vue({
	el: '#app',
	
	components: {myComp},
	
	template: `<div>
	    <my-comp></my-comp>
	</div>`
});
```

