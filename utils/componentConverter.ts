import { parse as babelParse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import generate from '@babel/generator';
import { parse as vueSFCParse } from '@vue/compiler-sfc';

interface ParsedComponent {
    imports: string[];
    refs: string[];
    methods: string[];
    props: string[];
    emits: string[];
    computed: string[];
    template: string;
}

export class VueConverter {
    public convert(source: string): string {
        const parsedComponent = this.parseComponent(source);
        return this.generateOptionsAPI(parsedComponent);
    }

    private parseComponent(source: string): ParsedComponent {
        // Parse Vue SFC
        const { descriptor } = vueSFCParse(source);
        const scriptContent = descriptor.scriptSetup?.content || '';
        const templateContent = descriptor.template?.content || '';

        const ast = babelParse(scriptContent, {
            sourceType: 'module',
            plugins: ['typescript'],
        });

        const parsed: ParsedComponent = {
            imports: [],
            refs: [],
            methods: [],
            props: [],
            emits: [],
            computed: [],
            template: templateContent,
        };

        traverse(ast, {
            ImportDeclaration: (path) => {
                parsed.imports.push(generate(path.node).code);
            },
            VariableDeclaration: (path) => {
                const declaration = path.node.declarations[0];
                if (t.isCallExpression(declaration.init) && t.isIdentifier(declaration.init.callee, { name: 'ref' })) {
                    parsed.refs.push(generate(path.node).code);
                }
            },
            ExpressionStatement: (path) => {
                if (
                    t.isCallExpression(path.node.expression) &&
                    t.isIdentifier(path.node.expression.callee, { name: 'defineProps' })
                ) {
                    parsed.props.push(generate(path.node).code);
                }
                if (
                    t.isCallExpression(path.node.expression) &&
                    t.isIdentifier(path.node.expression.callee, { name: 'defineEmits' })
                ) {
                    parsed.emits.push(generate(path.node).code);
                }
            },
            FunctionDeclaration: (path) => {
                parsed.methods.push(generate(path.node).code);
            },
        });

        return parsed;
    }

    private generateOptionsAPI(parsed: ParsedComponent): string {
        return `
import { defineComponent, ref, computed } from 'vue';

${parsed.imports.join('\n')}

export default defineComponent({
  name: 'ConvertedComponent',

  props: {
    ${parsed.props.join('\n')}
  },

  emits: [${parsed.emits.map((e) => `'${e}'`).join(', ')}],

  data() {
    return {
      ${parsed.refs.join(',\n')}
    };
  },

  computed: {
    ${parsed.computed.join(',\n')}
  },

  methods: {
    ${parsed.methods.join(',\n')}
  },

  template: \`
    ${parsed.template}
  \`
});
`.trim();
    }
}

// Example usage:
const sourceCode = `
<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{ title: string }>();
const emit = defineEmits(['increment']);

const count = ref(0);
const increment = () => {
  count.value++;
  emit('increment', count.value);
};

const doubleCount = computed(() => count.value * 2);
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
`;

const converter = new VueConverter();
console.log(converter.convert(sourceCode));
